import { useState } from 'react';

const AccessSection = () => {
  const [formData, setFormData] = useState({
    codename: '',
    signal: '',
    mission: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(`UPLINK REQUEST: ${formData.codename}`);
    const body = encodeURIComponent(`CODENAME: ${formData.codename}\nSIGNAL: ${formData.signal}\n\nMISSION BRIEF:\n${formData.mission}`);
    window.location.href = `mailto:hello@kuonstudios.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="access" className="py-20 md:py-32 px-5 md:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Terminal header */}
        <div className="terminal-container border border-border/50 bg-card/30 backdrop-blur-sm">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-muted" />
              <div className="w-3 h-3 rounded-full bg-muted" />
            </div>
            <span className="font-mono text-xs text-muted-foreground ml-4 tracking-wider">
              SECURE_UPLINK.EXE
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-5 md:p-8">
            {/* Section label */}
            <p className="font-mono text-sm text-accent tracking-widest mb-4">
              [ ACCESS TERMINAL ]
            </p>

            {/* Main headline */}
            <h2 className="font-sans font-extrabold text-[clamp(1.75rem,6vw,3rem)] tracking-tight mb-6 md:mb-8">
              INITIATE UPLINK
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Codename field */}
              <div>
                <label className="block font-mono text-xs text-muted-foreground tracking-widest mb-2">
                  CODENAME_
                </label>
                <input
                  type="text"
                  value={formData.codename}
                  onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                  required
                  className="w-full bg-background border border-border/50 px-4 py-3 min-h-[48px] font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Enter identifier..."
                  data-hover
                />
              </div>

              {/* Signal frequency field */}
              <div>
                <label className="block font-mono text-xs text-muted-foreground tracking-widest mb-2">
                  SIGNAL_FREQUENCY_
                </label>
                <input
                  type="email"
                  value={formData.signal}
                  onChange={(e) => setFormData({ ...formData, signal: e.target.value })}
                  required
                  className="w-full bg-background border border-border/50 px-4 py-3 min-h-[48px] font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@frequency.com"
                  data-hover
                />
              </div>

              {/* Mission brief field */}
              <div>
                <label className="block font-mono text-xs text-muted-foreground tracking-widest mb-2">
                  MISSION_BRIEF_
                </label>
                <textarea
                  value={formData.mission}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-background border border-border/50 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Describe your mission parameters..."
                  data-hover
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn-red-outline w-full mt-4 min-h-[48px]"
                data-hover
              >
                TRANSMIT DATA
              </button>
            </form>

            {/* Status line */}
            <div className="mt-8 pt-6 border-t border-border/30 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">
                SECURE CHANNEL ACTIVE • ENCRYPTION: AES-256
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessSection;
