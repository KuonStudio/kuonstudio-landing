#!/usr/bin/env bash
# Read-only stats for src/lib/proof.ts. Run on the VPS as a user in the docker group:
#   bash proof-stats.sh
# Mounts the Selisik and Cadence data volumes read-only and only runs SELECT.
set -euo pipefail

vol() { docker volume ls -q | grep -E "(^|_)$1\$" | head -1; }
SEL=$(vol selisik-data)
CAD=$(vol cadence-data)
echo "volumes: selisik=$SEL cadence=$CAD"

docker run --rm -i -v "$SEL":/sel:ro -v "$CAD":/cad:ro python:3.12-alpine python - <<'PY'
import glob, sqlite3

def q(db, sql):
    # immutable=1 reads a live WAL database from the read-only mount without creating -shm.
    con = sqlite3.connect(f"file:{db}?mode=ro&immutable=1", uri=True)
    try:
        return con.execute(sql).fetchall()
    except sqlite3.Error as e:
        return [("error", str(e))]
    finally:
        con.close()

for db in sorted(glob.glob("/sel/**/*.db", recursive=True)):
    if db.endswith("auth.db"):
        continue
    print(f"\n== Selisik {db}")
    print("hasil pencarian per status:", q(db, "SELECT filter_status, COUNT(*) FROM search_results GROUP BY 1"))
    print("alasan dibuang (top 8):", q(db, "SELECT filter_reason, COUNT(*) FROM search_results WHERE filter_status != 'analyzed' GROUP BY 1 ORDER BY 2 DESC LIMIT 8"))
    print("lead per status:", q(db, "SELECT status, COUNT(*) FROM leads GROUP BY 1"))
    print("lead skor 1-5 vs 6-10:", q(db, "SELECT viability_score <= 5, COUNT(*) FROM leads GROUP BY 1"))
    print("lead dengan kontak:", q(db, "SELECT COUNT(*) FROM leads WHERE contact_phone != '' OR contact_email != ''"))
    print("jumlah scan, pertama, terakhir:", q(db, "SELECT COUNT(*), MIN(at), MAX(at) FROM scan_runs"))

for db in sorted(glob.glob("/cad/**/*.db", recursive=True)):
    print(f"\n== Cadence {db}")
    print("ide tersimpan:", q(db, "SELECT COUNT(*), MIN(created_at) FROM ideas"))
    print("naskah per status:", q(db, "SELECT status, COUNT(*) FROM briefs GROUP BY 1"))
    print("produksi per status:", q(db, "SELECT status, COUNT(*) FROM produksi GROUP BY 1"))
PY
