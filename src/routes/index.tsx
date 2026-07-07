import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award, CheckCircle2, ChevronDown, CloudRain, Droplets, FileText, Flame, HandCoins, Hammer, HardHat, Home, Mail, MapPin, Paintbrush, Phone, Ruler, Shield, ShieldCheck, Sparkles, Star, Sun, Timer, Umbrella, Users, Wrench, Zap
} from "lucide-react";
import { toast } from "sonner";

import heroImg from "@/assets/hero-roof.jpg";
import crewImg from "@/assets/crew-working.jpg";
import beforeImg from "@/assets/before-roof.jpg";
import afterImg from "@/assets/after-roof.jpg";

import { Counter } from "@/components/site/Counter";
import { BeforeAfter } from "@/components/site/BeforeAfter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "North Texas Roofing — Premium Roofing, Storm Restoration & Insurance Claims" },
      { name: "description", content: "Premium roof replacement, repairs, and storm damage restoration across North Texas. 20+ years, 10,000+ roofs, 500+ five-star reviews. Free inspections. Licensed & insured." },
      { property: "og:title", content: "North Texas Roofing — Premium Roofing Experts" },
      { property: "og:description", content: "Premium roof replacement, storm restoration, and insurance claim experts serving Frisco, Plano, McKinney, Dallas & all of North Texas." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as { rel: string; as: string; href: string; fetchpriority: string },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  { icon: Home, title: "Roof Replacement", desc: "Full tear-off and premium re-roof with lifetime workmanship warranty." },
  { icon: Wrench, title: "Roof Repairs", desc: "Fast, precise repairs for leaks, missing shingles, and flashing failures." },
  { icon: CloudRain, title: "Storm Damage", desc: "Hail and wind restoration with documented damage assessment." },
  { icon: FileText, title: "Insurance Claims", desc: "We handle adjuster meetings, scopes, and supplements — end-to-end." },
  { icon: Droplets, title: "Leak Detection", desc: "Diagnostic inspections that find the source, not just the symptom." },
  { icon: Ruler, title: "Gutters", desc: "Seamless aluminum gutters, guards, and downspouts sized to your roof." },
  { icon: Hammer, title: "Siding", desc: "James Hardie & premium vinyl siding replacement and repair." },
  { icon: Paintbrush, title: "Exterior Painting", desc: "Long-lasting exterior finishes with prep done the right way." },
  { icon: Flame, title: "Fence Staining", desc: "Restore and protect wood fences with premium oil-based stains." },
  { icon: Sun, title: "Solar Screens", desc: "Custom solar screens that cut heat gain and lower cooling bills." },
];

const WHY = [
  { icon: ShieldCheck, title: "Licensed Professionals", desc: "Fully licensed, bonded, and insured for your protection." },
  { icon: Award, title: "Premium Materials", desc: "GAF Master Elite & Owens Corning Platinum certified." },
  { icon: Timer, title: "Fast Turnaround", desc: "Most re-roofs completed in a single day." },
  { icon: Sparkles, title: "Clean Job Sites", desc: "Magnetic nail sweeps and daily cleanup, every project." },
  { icon: Shield, title: "Lifetime Workmanship", desc: "The strongest workmanship warranty in North Texas." },
  { icon: FileText, title: "Insurance Assistance", desc: "Claim experts who fight for full, fair scopes." },
  { icon: HandCoins, title: "Financing Available", desc: "0% interest and low monthly payment options." },
  { icon: Users, title: "Locally Owned", desc: "Family-owned in North Texas since 2004." },
];

const ROOF_LAYERS = [
  { name: "Ridge Cap", desc: "Sealed, high-profile caps that finish the roofline and protect the ridge from wind uplift." },
  { name: "Ventilation", desc: "Balanced intake and exhaust ventilation that extends shingle life and lowers attic temps." },
  { name: "Shingles", desc: "Architectural asphalt shingles engineered for Texas hail and 130+ mph wind." },
  { name: "Starter Strip", desc: "Factory-adhesive starter strips that lock the first course against wind blow-off." },
  { name: "Underlayment", desc: "Synthetic underlayment — stronger, lighter, and more tear-resistant than felt." },
  { name: "Leak Barrier", desc: "Self-adhering ice & water shield at valleys, eaves, and every penetration." },
];

const GALLERY = [
  { cat: "Roof Replacement", label: "Frisco — Complete Re-Roof", img: heroImg },
  { cat: "Storm Damage", label: "Plano — Hail Restoration", img: afterImg },
  { cat: "Commercial", label: "McKinney Office Park", img: crewImg },
  { cat: "Before & After", label: "Allen — Ridge Repair", img: beforeImg },
  { cat: "Residential", label: "Prosper Custom Home", img: heroImg },
  { cat: "Drone Photos", label: "Dallas Aerial Inspection", img: afterImg },
];
const GALLERY_CATS = ["All", "Roof Replacement", "Storm Damage", "Commercial", "Before & After", "Residential", "Drone Photos"];

const REVIEWS = [
  { name: "Sarah Mitchell", city: "Frisco, TX", stars: 5, text: "After the May hailstorm, North Texas Roofing handled everything — inspection, insurance adjuster meeting, the whole scope. New roof in one day. The crew was professional and the cleanup was spotless." },
  { name: "David Chen", city: "Plano, TX", stars: 5, text: "Best contractor experience we've ever had. Zero pressure, honest quote, and the workmanship is second to none. Neighbors have asked for their number three times already." },
  { name: "Amanda Rodriguez", city: "McKinney, TX", stars: 5, text: "They caught wind damage two other roofers missed. My insurance approved a full replacement thanks to their documentation. Highly recommend." },
  { name: "James Thornton", city: "Allen, TX", stars: 5, text: "Fast, clean, and communicative. Foreman walked us through everything before, during, and after. Roof looks incredible." },
];

const AREAS = [
  { city: "Frisco", projects: 1240, rating: 5.0 },
  { city: "Plano", projects: 1580, rating: 4.9 },
  { city: "McKinney", projects: 980, rating: 5.0 },
  { city: "Allen", projects: 720, rating: 4.9 },
  { city: "Prosper", projects: 410, rating: 5.0 },
  { city: "Dallas", projects: 2100, rating: 4.9 },
  { city: "Fort Worth", projects: 890, rating: 4.9 },
  { city: "Denton", projects: 560, rating: 5.0 },
];

const TIMELINE = [
  { title: "Free Inspection", desc: "Certified inspector documents storm damage with photos and measurements." },
  { title: "Documentation", desc: "We build a complete damage report and scope of work for your carrier." },
  { title: "Insurance Meeting", desc: "We meet the adjuster on-site to walk the roof and defend the scope." },
  { title: "Approval", desc: "Once approved, you pick materials and colors from premium options." },
  { title: "Installation", desc: "Most roofs installed in a single day by our certified in-house crew." },
  { title: "Final Inspection", desc: "Post-install QA including magnetic sweep and photo documentation." },
  { title: "Warranty Registered", desc: "Manufacturer + lifetime workmanship warranty registered in your name." },
];

const FAQ = [
  { q: "How long does a roof replacement take?", a: "Most residential re-roofs are completed in a single day. Larger or steeper roofs may take two days. We'll give you an exact timeline before we start." },
  { q: "Do you handle the insurance claim for me?", a: "Yes. We meet the adjuster on-site, provide full documentation, and manage supplements. You pay only your deductible." },
  { q: "What warranty do you offer?", a: "Manufacturer warranties up to lifetime on shingles, plus our lifetime workmanship warranty — the strongest in North Texas." },
  { q: "How do I know if my roof has hail damage?", a: "Most hail damage isn't visible from the ground. We offer free professional inspections with photo documentation of any damage found." },
  { q: "What brands of shingles do you install?", a: "We're a GAF Master Elite and Owens Corning Platinum certified contractor and install both premium lines." },
  { q: "Do you offer financing?", a: "Yes — we offer 0% interest options and flexible monthly payment plans through our lending partners." },
];

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <BeforeAfterSection />
      <Services />
      <WhyChoose />
      <RoofingSystem />
      <Gallery />
      <VideoShowcase />
      <Reviews />
      <ServiceAreas />
      <InsuranceProcess />
      <Financing />
      <FAQSection />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-dvh flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Beautiful Texas home with new premium roof at sunset"
          className="w-full h-full object-cover animate-ken-burns"
          fetchPriority="high"
          width={1920}
          height={1088}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
      </div>

      <div className="container-tight relative z-10 py-32 md:py-40 text-white">
        <div className="max-w-3xl">
          <span className="reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5 text-orange-brand" /> 24/7 EMERGENCY STORM RESPONSE
          </span>
          <h1 className="reveal reveal-delay-1 mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95]">
            North Texas' <span className="text-orange-brand">Trusted</span><br />Roofing Experts
          </h1>
          <p className="reveal reveal-delay-2 mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
            Premium roof replacement, repairs, storm restoration, and insurance claim assistance — done right the first time.
          </p>

          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md bg-orange-brand text-white font-bold shadow-glow hover:opacity-90 transition">
              Get Free Inspection <span aria-hidden>→</span>
            </a>
            <a href="tel:+19725550199" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold hover:bg-white hover:text-navy transition">
              <Phone className="w-4 h-4" /> Call (972) 555-0199
            </a>
          </div>

          <div className="reveal reveal-delay-4 mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <Badge icon={Star} label="5.0 · 500+ Reviews" />
            <Badge icon={ShieldCheck} label="Licensed & Insured" />
            <Badge icon={MapPin} label="Locally Owned" />
            <Badge icon={FileText} label="Insurance Claim Experts" />
          </div>
        </div>
      </div>

      <a href="#stats" aria-label="Scroll to content" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] tracking-[0.3em] font-semibold">SCROLL</span>
          <ChevronDown className="w-5 h-5 animate-scroll-hint" />
        </div>
      </a>
    </section>
  );
}

function Badge({ icon: Icon, label }: { icon: typeof Star; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-orange-brand fill-orange-brand" />
      <span className="font-semibold text-white/90">{label}</span>
    </div>
  );
}

function Stats() {
  const items = [
    { n: 20, s: "+", l: "Years Experience" },
    { n: 500, s: "+", l: "Five-Star Reviews" },
    { n: 10000, s: "+", l: "Roofs Completed" },
    { n: 100, s: "%", l: "Satisfaction Commitment" },
  ];
  return (
    <section id="stats" className="bg-navy text-white py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="container-tight relative grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((it) => (
          <div key={it.l} className="text-center">
            <div className="text-4xl md:text-6xl font-extrabold text-orange-brand tabular-nums">
              <Counter to={it.n} suffix={it.s} />
            </div>
            <div className="mt-2 text-xs md:text-sm uppercase tracking-widest text-white/70 font-semibold">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, desc, center = true }: { eyebrow: string; title: string; desc?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto mb-14" : "max-w-3xl mb-14"}>
      <span className="text-xs font-bold tracking-[0.3em] text-orange-brand">{eyebrow}</span>
      <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl text-navy">{title}</h2>
      {desc && <p className="mt-4 text-lg text-muted-foreground">{desc}</p>}
    </div>
  );
}

function BeforeAfterSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-tight">
        <SectionHeader eyebrow="OUR WORK" title="Before & After" desc="Drag the slider to see real transformations from recent projects across North Texas." />
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <BeforeAfter before={beforeImg} after={afterImg} beforeAlt="Damaged roof before" afterAlt="New roof after" />
          <div>
            <div className="text-xs font-bold tracking-widest text-orange-brand">FRISCO, TX</div>
            <h3 className="text-3xl md:text-4xl mt-2 text-navy">Complete Storm Restoration</h3>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              After a major hail event, this Frisco home needed a full tear-off and re-roof. We handled the insurance claim end-to-end and installed a premium architectural shingle system in a single day.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-muted-foreground">Service</dt><dd className="font-bold text-navy">Full Replacement</dd></div>
              <div><dt className="text-muted-foreground">Completed</dt><dd className="font-bold text-navy">June 2026</dd></div>
              <div><dt className="text-muted-foreground">Materials</dt><dd className="font-bold text-navy">GAF Timberline HDZ</dd></div>
              <div><dt className="text-muted-foreground">Duration</dt><dd className="font-bold text-navy">1 Day</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="container-tight">
        <SectionHeader eyebrow="WHAT WE DO" title="Complete Roofing & Exterior Services" desc="One trusted team for every exterior project on your home." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative bg-white rounded-xl p-6 border border-border hover:border-orange transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="w-12 h-12 rounded-lg gradient-orange grid place-items-center text-white shadow-glow group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-brand hover:gap-2 transition-all">
                Learn more <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section id="why" className="py-20 md:py-28 bg-white">
      <div className="container-tight">
        <SectionHeader eyebrow="WHY NORTH TEXAS ROOFING" title="Built on Craftsmanship & Trust" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group p-6 rounded-xl border border-border bg-secondary/40 hover:bg-navy hover:text-white transition-all">
              <Icon className="w-8 h-8 text-orange-brand" strokeWidth={2} />
              <h3 className="mt-4 text-lg font-bold text-navy group-hover:text-white">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground group-hover:text-white/75">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoofingSystem() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 md:py-28 bg-navy-deep text-white overflow-hidden">
      <div className="container-tight">
        <SectionHeader
          eyebrow="THE ANATOMY"
          title="Our Complete Roofing System"
          desc="Every roof we install is a full system — not just shingles. Explore each layer."
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {ROOF_LAYERS.map((layer, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={layer.name}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="absolute left-0 right-0 group"
                    style={{ top: `${i * 16}%`, height: "14%" }}
                  >
                    <div
                      className={`h-full w-full rounded-md flex items-center justify-center font-bold text-sm md:text-base transition-all ${
                        isActive
                          ? "bg-orange-brand text-white shadow-glow scale-105 z-10"
                          : "bg-white/10 border border-white/20 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      {layer.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest text-orange-brand">LAYER {active + 1} OF {ROOF_LAYERS.length}</div>
            <h3 className="text-4xl md:text-5xl font-extrabold mt-2">{ROOF_LAYERS[active].name}</h3>
            <p className="mt-4 text-white/75 text-lg leading-relaxed">{ROOF_LAYERS[active].desc}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {ROOF_LAYERS.map((l, i) => (
                <button
                  key={l.name}
                  onClick={() => setActive(i)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    active === i ? "bg-orange-brand text-white" : "bg-white/10 hover:bg-white/20 text-white/80"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = filter === "All" ? GALLERY : GALLERY.filter(g => g.cat === filter);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-secondary">
      <div className="container-tight">
        <SectionHeader eyebrow="GALLERY" title="Recent Projects" desc="A curated selection of roof replacements, storm restorations, and commercial work." />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {GALLERY_CATS.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filter === c ? "bg-navy text-white" : "bg-white text-navy hover:bg-navy/10 border border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {items.map((g, i) => (
            <button
              key={i}
              onClick={() => setLightbox(g.img)}
              className="group relative w-full overflow-hidden rounded-xl bg-navy block"
              style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "4/3" : "1/1" }}
            >
              <img src={g.img} alt={g.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/20 to-transparent opacity-70 group-hover:opacity-90 transition" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white">
                <div className="text-xs font-bold tracking-widest text-orange-brand">{g.cat.toUpperCase()}</div>
                <div className="text-lg font-bold mt-1">{g.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] bg-black/90 grid place-items-center p-6 cursor-zoom-out">
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-lg shadow-elegant" />
        </div>
      )}
    </section>
  );
}

function VideoShowcase() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-tight">
        <SectionHeader eyebrow="WATCH" title="See The Craft In Action" desc="Drone inspections, time-lapse installs, and testimonials from real customers." />
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { title: "Drone Roof Inspection", desc: "Aerial hail damage assessment", img: heroImg },
            { title: "Time-lapse Re-Roof", desc: "Complete tear-off & install in one day", img: crewImg },
            { title: "Customer Testimonial", desc: "The Mitchell family — Frisco, TX", img: afterImg },
          ].map((v, i) => (
            <div key={i} className="group relative aspect-video rounded-xl overflow-hidden shadow-elegant cursor-pointer">
              <img src={v.img} alt={v.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/60 transition" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="w-16 h-16 rounded-full bg-orange-brand shadow-glow grid place-items-center group-hover:scale-110 transition">
                  <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[10px] border-y-transparent ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="font-bold text-lg">{v.title}</div>
                <div className="text-sm text-white/80">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-secondary">
      <div className="container-tight">
        <SectionHeader eyebrow="CUSTOMER REVIEWS" title="What North Texas Homeowners Say" />
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-sm border border-border">
            <div className="w-10 h-10 rounded bg-[#4285F4] text-white grid place-items-center font-black">G</div>
            <div><div className="flex items-center gap-1 text-orange-brand">{Array(5).fill(0).map((_,i)=><Star key={i} className="w-4 h-4 fill-current"/>)}</div><div className="text-xs text-muted-foreground">Google · 500+ reviews</div></div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-sm border border-border">
            <div className="w-10 h-10 rounded bg-orange-brand text-white grid place-items-center font-black">H</div>
            <div><div className="flex items-center gap-1 text-orange-brand">{Array(5).fill(0).map((_,i)=><Star key={i} className="w-4 h-4 fill-current"/>)}</div><div className="text-xs text-muted-foreground">HomeAdvisor · Top Rated</div></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy text-white grid place-items-center font-bold">
                  {r.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-navy">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}</div>
                </div>
                <div className="ml-auto flex text-orange-brand">
                  {Array(r.stars).fill(0).map((_,i)=><Star key={i} className="w-4 h-4 fill-current"/>)}
                </div>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAreas() {
  const [active, setActive] = useState(AREAS[0]);
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-tight">
        <SectionHeader eyebrow="WHERE WE WORK" title="Serving All of North Texas" />
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8">
          <div className="grid grid-cols-2 gap-2">
            {AREAS.map((a) => (
              <button
                key={a.city}
                onClick={() => setActive(a)}
                className={`text-left p-4 rounded-lg border transition ${
                  active.city === a.city
                    ? "bg-navy text-white border-navy shadow-elegant"
                    : "bg-white border-border hover:border-orange"
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <MapPin className="w-4 h-4 text-orange-brand" />
                  {a.city}, TX
                </div>
                <div className={`text-xs mt-1 ${active.city === a.city ? "text-white/70" : "text-muted-foreground"}`}>
                  {a.projects}+ projects
                </div>
              </button>
            ))}
          </div>
          <div className="relative rounded-xl overflow-hidden bg-navy min-h-[400px] shadow-elegant">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,#F97316_0%,transparent_50%),radial-gradient(circle_at_70%_60%,#F97316_0%,transparent_40%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="relative h-full p-8 flex flex-col justify-end text-white">
              <div className="text-xs font-bold tracking-widest text-orange-brand">SERVICE AREA</div>
              <h3 className="text-4xl font-extrabold mt-2">{active.city}, Texas</h3>
              <div className="mt-4 flex gap-6 text-sm">
                <div><div className="text-2xl font-bold text-orange-brand">{active.projects}+</div><div className="text-white/70">Roofs Completed</div></div>
                <div><div className="text-2xl font-bold text-orange-brand">{active.rating.toFixed(1)}★</div><div className="text-white/70">Average Rating</div></div>
              </div>
              <a href="#contact" className="mt-6 inline-flex w-fit items-center gap-2 px-5 py-3 rounded-md bg-orange-brand font-bold hover:opacity-90 transition">
                Request Estimate in {active.city} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsuranceProcess() {
  return (
    <section id="insurance" className="py-20 md:py-28 bg-navy-deep text-white">
      <div className="container-tight">
        <SectionHeader eyebrow="STORM DAMAGE" title="Insurance Claim Process" desc="We handle every step so you don't have to." />
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-brand/30" />
          <div className="space-y-8 md:space-y-0">
            {TIMELINE.map((s, i) => (
              <div key={s.title} className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                <div className={`md:[direction:ltr] p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className="text-orange-brand text-xs font-bold tracking-widest">STEP {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-2xl font-extrabold mt-2">{s.title}</h3>
                  <p className="mt-2 text-white/75">{s.desc}</p>
                </div>
                <div className="hidden md:flex justify-center relative">
                  <div className="w-14 h-14 rounded-full bg-orange-brand text-white grid place-items-center font-bold text-lg shadow-glow z-10">
                    {i + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Financing() {
  const [amount, setAmount] = useState(15000);
  const [months, setMonths] = useState(60);
  const rate = 0.079 / 12;
  const monthly = (amount * rate) / (1 - Math.pow(1 + rate, -months));

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-tight">
        <SectionHeader eyebrow="FINANCING" title="Affordable Monthly Payments" desc="0% interest options and flexible plans through our lending partners." />
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-elegant border border-border">
          <div className="p-8 md:p-10 bg-white">
            <div>
              <label className="text-sm font-bold text-navy flex justify-between"><span>Project Amount</span><span className="text-orange-brand">${amount.toLocaleString()}</span></label>
              <input type="range" min={5000} max={50000} step={500} value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full mt-2 accent-orange-500" />
            </div>
            <div className="mt-6">
              <label className="text-sm font-bold text-navy flex justify-between"><span>Term Length</span><span className="text-orange-brand">{months} months</span></label>
              <input type="range" min={12} max={120} step={12} value={months} onChange={(e) => setMonths(+e.target.value)} className="w-full mt-2 accent-orange-500" />
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-brand" />No prepayment penalties</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-brand" />0% interest promotional options</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-brand" />All major credit cards accepted</li>
            </ul>
          </div>
          <div className="p-8 md:p-10 bg-navy text-white flex flex-col justify-center">
            <div className="text-xs tracking-widest font-bold text-orange-brand">ESTIMATED MONTHLY</div>
            <div className="text-6xl font-extrabold mt-2 tabular-nums">${Math.round(monthly).toLocaleString()}<span className="text-lg text-white/60 font-medium">/mo</span></div>
            <p className="mt-3 text-sm text-white/70">Based on 7.9% APR. Actual rate depends on credit approval.</p>
            <a href="#contact" className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-orange-brand font-bold hover:opacity-90 transition">
              Apply for Financing →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container-tight max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Common Questions" />
        <div className="space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="bg-white rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left p-5 md:p-6 gap-4 hover:bg-secondary/50 transition"
                >
                  <span className="font-bold text-navy text-lg">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-orange-brand shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-6 text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  return (
    <section id="contact" className="py-20 md:py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="container-tight relative grid lg:grid-cols-[1fr_1.4fr] gap-12">
        <div className="text-white">
          <span className="text-xs font-bold tracking-[0.3em] text-orange-brand">GET IN TOUCH</span>
          <h2 className="mt-3 text-4xl md:text-5xl">Request Your Free Inspection</h2>
          <p className="mt-4 text-white/75 text-lg">No pressure, no gimmicks. A certified inspector will assess your roof and give you an honest report — usually within 24 hours.</p>

          <div className="mt-8 space-y-4">
            <a href="tel:+19725550199" className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="w-11 h-11 rounded-lg gradient-orange grid place-items-center shadow-glow"><Phone className="w-5 h-5 text-white"/></div>
              <div><div className="text-xs text-white/60">Call us anytime</div><div className="font-bold">(972) 555-0199</div></div>
            </a>
            <a href="mailto:info@ntxroofing.com" className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="w-11 h-11 rounded-lg gradient-orange grid place-items-center shadow-glow"><Mail className="w-5 h-5 text-white"/></div>
              <div><div className="text-xs text-white/60">Email</div><div className="font-bold">info@ntxroofing.com</div></div>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="w-11 h-11 rounded-lg gradient-orange grid place-items-center shadow-glow"><MapPin className="w-5 h-5 text-white"/></div>
              <div><div className="text-xs text-white/60">Office</div><div className="font-bold">1200 Legacy Dr, Frisco, TX</div></div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitting(true);
            setTimeout(() => {
              setSubmitting(false);
              toast.success("Request received!", { description: "Our team will reach out within one business day." });
              (e.target as HTMLFormElement).reset();
            }, 900);
          }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-elegant grid gap-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" required><input required name="name" className="input" placeholder="Jane Doe" /></Field>
            <Field label="Phone" required><input required name="phone" type="tel" className="input" placeholder="(972) 555-0199" /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email" required><input required name="email" type="email" className="input" placeholder="you@email.com" /></Field>
            <Field label="Property Address"><input name="address" className="input" placeholder="123 Main St, Frisco, TX" /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Service Needed">
              <select name="service" className="input">
                <option>Free Inspection</option>
                <option>Roof Replacement</option>
                <option>Roof Repair</option>
                <option>Storm Damage / Insurance</option>
                <option>Gutters</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Preferred Contact">
              <select name="contact_method" className="input">
                <option>Phone</option>
                <option>Text</option>
                <option>Email</option>
              </select>
            </Field>
          </div>
          <Field label="Message">
            <textarea name="message" rows={4} className="input" placeholder="Tell us about your project..." />
          </Field>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" disabled={submitting} className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-md bg-orange-brand text-white font-bold shadow-glow hover:opacity-90 transition disabled:opacity-60">
              {submitting ? "Sending..." : "Request Inspection →"}
            </button>
            <a href="tel:+19725550199" className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-md border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition">
              <Umbrella className="w-4 h-4" /> Emergency
            </a>
          </div>
          <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted about your inspection. We never share your info.</p>
        </form>
      </div>

      <style>{`
        .input { width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border); border-radius: 0.5rem; font-size: 0.95rem; background: white; color: var(--foreground); }
        .input:focus { outline: none; border-color: var(--orange); box-shadow: 0 0 0 3px oklch(from var(--orange) l c h / 0.15); }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold tracking-wide text-navy uppercase">
        {label} {required && <span className="text-orange-brand">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

// Keep HardHat imported to avoid tree-shake warnings if unused; suppress via ref
void HardHat;
