import { useState } from 'react';

const AccessSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject details:\n${formData.details}`
    );
    window.location.href = `mailto:hello@kuonstudio.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] text-[#141413]">
            Tell us what you need built.
          </h2>
          <p className="mt-4 text-lg text-[#141413]/70">
            Send 3–5 sentences: what it does, who uses it, and when you need it.
            We reply within 2 business days with next steps or an honest no.
          </p>
          <ul className="mt-6 space-y-2 text-[#141413]/70">
            <li>— Prefer email? hello@kuonstudio.com</li>
            <li>— Based in Jakarta, working remotely across Indonesia.</li>
            <li>— Current availability: 1 project slot per month.</li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e8e6dc] rounded-2xl p-6 md:p-8 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block font-display font-semibold text-[15px] text-[#141413] mb-2">
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              autoComplete="name"
              className="field"
              placeholder="Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-display font-semibold text-[15px] text-[#141413] mb-2">
              Work email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
              className="field"
              placeholder="you@company.com"
            />
            <p className="mt-1.5 text-sm text-[#141413]/60">
              Only used to reply to your inquiry.
            </p>
          </div>

          <div>
            <label htmlFor="details" className="block font-display font-semibold text-[15px] text-[#141413] mb-2">
              Project details
            </label>
            <textarea
              id="details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              required
              rows={5}
              className="field resize-y"
              placeholder="What should it do, who uses it, and what is the deadline?"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Send inquiry
          </button>
          <p className="text-sm text-[#141413]/60">
            Opens your email app addressed to hello@kuonstudio.com.
          </p>
        </form>
      </div>
    </section>
  );
};

export default AccessSection;
