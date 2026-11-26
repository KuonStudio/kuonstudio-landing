import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { componentTagger } from "lovable-tagger";

function loadLocalKuonEnv(): { apiUrl: string; apiKey: string } {
  let apiUrl =
    process.env.KUON_API_URL ||
    "https://8000-agrbr7h3tj3mllx3kbndcqyuwm.instabox.tech";
  let apiKey = process.env.KUON_API_KEY || "";

  if (!apiKey) {
    const candidates = [
      path.resolve(__dirname, ".dev.vars"),
      path.join(os.homedir(), ".config", "kuon", "instabox-staging.env"),
    ];
    for (const filePath of candidates) {
      if (!fs.existsSync(filePath)) continue;
      const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if ((key === "KUON_API_URL" || key === "KUON_STAGING_URL") && val) {
          apiUrl = val;
        }
        if (key === "KUON_API_KEY" && val) {
          apiKey = val;
        }
      }
      if (apiKey) break;
    }
  }
  return { apiUrl: apiUrl.replace(/\/+$/, ""), apiKey };
}

function kuonDevProxyPlugin(): Plugin {
  return {
    name: "kuon-dev-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/kuon/")) {
          next();
          return;
        }
        const { apiUrl, apiKey } = loadLocalKuonEnv();
        const urlPath = req.url.split("?")[0];

        if (urlPath === "/api/kuon/health" && req.method === "GET") {
          try {
            const upstream = await fetch(`${apiUrl}/health`, {
              signal: AbortSignal.timeout(8000),
            });
            const text = await upstream.text();
            res.statusCode = upstream.ok ? 200 : 503;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(
              upstream.ok
                ? text
                : JSON.stringify({ error: { code: "waking_up", message: "Server standby." } })
            );
          } catch {
            res.statusCode = 503;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: { code: "waking_up", message: "Server standby." } }));
          }
          return;
        }

        if (urlPath === "/api/kuon/chat" && req.method === "POST") {
          if (!apiKey) {
            res.statusCode = 503;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(
              JSON.stringify({
                error: {
                  code: "not_configured",
                  message: "Set KUON_API_KEY in .dev.vars to test live chat locally.",
                },
              })
            );
            return;
          }
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          }
          try {
            const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
            const mode = parsed.mode === "general" ? "general" : "business";
            const upstreamPayload: Record<string, unknown> = {
              model: "kuon-1",
              messages: parsed.messages,
              stream: parsed.stream !== false,
              temperature: 0.0,
              max_tokens: mode === "general" ? 96 : 180,
            };
            if (mode === "business") {
              upstreamPayload.x_kuon_mode = "business";
            }
            const upstream = await fetch(`${apiUrl}/v1/chat/completions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify(upstreamPayload),
              signal: AbortSignal.timeout(45000),
            });
            res.statusCode = upstream.status;
            const ctype = upstream.headers.get("Content-Type") || "application/json";
            res.setHeader("Content-Type", ctype);
            if (ctype.includes("text/event-stream")) {
              res.setHeader("Cache-Control", "no-cache");
            }
            if (!upstream.body) {
              res.end();
              return;
            }
            const reader = upstream.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(Buffer.from(value));
            }
            res.end();
          } catch {
            res.statusCode = 503;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(
              JSON.stringify({
                error: {
                  code: "waking_up",
                  message: "Kuon 1 server is waking up. Please try again shortly.",
                },
              })
            );
          }
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && kuonDevProxyPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
