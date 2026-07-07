import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container-tight py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <div className="grid place-items-center w-10 h-10 rounded-lg bg-white/10">
              <ShieldCheck className="w-5 h-5 text-orange-brand" strokeWidth={2.5} />
            </div>
            <div className="leading-none">
              <div className="font-extrabold">NORTH TEXAS</div>
              <div className="text-xs tracking-[0.2em] text-orange-brand font-semibold">ROOFING</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            North Texas' trusted roofing experts. Premium replacement, repairs,
            and storm restoration since 2004. Licensed, insured, locally owned.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="w-9 h-9 grid place-items-center rounded-md bg-white/10 hover:bg-orange-brand transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {["Roof Replacement", "Roof Repairs", "Storm Damage", "Insurance Claims", "Gutters", "Siding", "Painting"].map(s => (
              <li key={s}><a href="#services" className="hover:text-orange-brand transition">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Service Areas</h4>
          <ul className="space-y-2 text-sm">
            {["Frisco", "Plano", "McKinney", "Allen", "Prosper", "Dallas", "Fort Worth"].map(s => (
              <li key={s}>{s}, TX</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><Phone className="w-4 h-4 mt-0.5 text-orange-brand shrink-0" /><a href="tel:+19725550199" className="hover:text-orange-brand">(972) 555-0199</a></li>
            <li className="flex items-start gap-2.5"><Mail className="w-4 h-4 mt-0.5 text-orange-brand shrink-0" /><a href="mailto:info@ntxroofing.com" className="hover:text-orange-brand">info@ntxroofing.com</a></li>
            <li className="flex items-start gap-2.5"><MapPin className="w-4 h-4 mt-0.5 text-orange-brand shrink-0" />1200 Legacy Dr, Frisco, TX</li>
            <li className="flex items-start gap-2.5"><Clock className="w-4 h-4 mt-0.5 text-orange-brand shrink-0" />Mon–Sat: 7am–7pm<br />24/7 Emergency</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tight py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} North Texas Roofing. All rights reserved. Licensed & Insured.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-orange-brand">Privacy Policy</a>
            <a href="#" className="hover:text-orange-brand">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
