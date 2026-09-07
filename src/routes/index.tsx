import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Plus, Camera, Check } from "lucide-react";
import heroImg from "@/assets/editorial-hero.jpg";
import lookImg from "@/assets/editorial-look.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RÊCHE — The Closet Issue" },
      {
        name: "description",
        content:
          "Style the wardrobe you already own. Build your avatar, match looks to your board, track cost-per-wear and list what you never wear.",
      },
      { property: "og:title", content: "RÊCHE — The Closet Issue" },
      {
        property: "og:description",
        content:
          "Twelve pieces, forty combinations. From your closet, not a cart.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const wardrobe = [
  { id: 1, name: "Cream wool blazer", tag: "outerwear", worn: 4 },
  { id: 2, name: "Washed grey tee", tag: "top", worn: 11 },
  { id: 3, name: "Straight-leg denim", tag: "bottom", worn: 9 },
  { id: 4, name: "Silk slip skirt", tag: "bottom", worn: 2 },
  { id: 5, name: "Leather loafers", tag: "shoes", worn: 7 },
  { id: 6, name: "Ribbed tank, ecru", tag: "top", worn: 6 },
];

const looks = [
  {
    id: "a",
    title: "Quiet Tuesday",
    pieces: ["Cream wool blazer", "Washed grey tee", "Straight-leg denim"],
  },
  {
    id: "b",
    title: "Off-duty, still sharp",
    pieces: ["Ribbed tank, ecru", "Silk slip skirt", "Leather loafers"],
  },
];

const secondhand = [
  { id: 1, name: "Wool-blend trench", material: "92% wool", price: "€38", source: "Sellpy" },
  { id: 2, name: "Cotton poplin shirt", material: "100% cotton", price: "€14", source: "Vinted" },
  { id: 3, name: "Leather belt, tan", material: "full-grain leather", price: "€19", source: "Sellpy" },
];

const nav = ["Wardrobe", "Looks", "Secondhand", "Board"];

const RARE_WEAR_THRESHOLD = 3;

type Measurements = { bust: string; waist: string; hips: string };

function AvatarSetup() {
  const [height, setHeight] = useState("");
  const [frontPhoto, setFrontPhoto] = useState(false);
  const [sidePhoto, setSidePhoto] = useState(false);
  const [estimated, setEstimated] = useState<Measurements | null>(null);
  const [manual, setManual] = useState<Measurements>({ bust: "", waist: "", hips: "" });

  const ready = height.trim() !== "" && frontPhoto && sidePhoto;

  function runEstimate() {
    if (!ready) return;
    const next = { bust: "86", waist: "68", hips: "94" };
    setEstimated(next);
    setManual(next);
  }

  const slot = (label: string, filled: boolean, onToggle: () => void) => (
    <button
      onClick={onToggle}
      className={`kicker flex aspect-[3/4] w-full cursor-pointer flex-col items-center justify-center gap-3 border transition-colors ${
        filled
          ? "border-primary text-primary"
          : "border-rule text-muted-foreground hover:border-foreground hover:text-foreground"
      }`}
    >
      {filled ? (
        <Check className="size-5" strokeWidth={1.5} />
      ) : (
        <Camera className="size-5" strokeWidth={1.5} />
      )}
      {label}
    </button>
  );

  return (
    <section className="mx-auto max-w-[1240px] border-t border-rule px-6 py-16 md:px-12">
      <p className="kicker text-primary">Your measurements, your face</p>
      <h3 className="mt-6 font-display text-4xl italic md:text-6xl">Build your avatar</h3>
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Two photos, standing straight, good light. We use them once to estimate your
        measurements — refine anything below, nothing is guessed silently.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-[repeat(2,minmax(0,140px))_1fr]">
        {slot("Front", frontPhoto, () => setFrontPhoto(!frontPhoto))}
        {slot("Side", sidePhoto, () => setSidePhoto(!sidePhoto))}

        <div>
          <label className="kicker block text-muted-foreground" htmlFor="height">
            Height (cm) — required to scale the photos
          </label>
          <input
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            inputMode="numeric"
            placeholder="e.g. 168"
            className="mt-3 w-[140px] border border-foreground bg-background px-3 py-2.5 text-[15px] outline-none focus:border-primary"
          />

          <div className="mt-6">
            <button
              onClick={runEstimate}
              disabled={!ready}
              className="kicker inline-flex cursor-pointer items-center gap-2 border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:border-rule disabled:text-muted-foreground disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
            >
              Estimate my measurements
            </button>
          </div>

          {estimated && (
            <div className="mt-10 border-t border-rule pt-8">
              <p className="kicker text-primary">Estimate — ±2 cm, refine below</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {(["bust", "waist", "hips"] as const).map((k) => (
                  <div key={k}>
                    <label className="kicker block text-muted-foreground" htmlFor={`m-${k}`}>
                      {k}
                    </label>
                    <input
                      id={`m-${k}`}
                      value={manual[k]}
                      onChange={(e) => setManual({ ...manual, [k]: e.target.value })}
                      inputMode="numeric"
                      className="mt-3 w-full border border-foreground bg-background px-2.5 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Tap any field to correct it — your input always wins over the estimate.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [activeLook, setActiveLook] = useState(looks[0]!.id);
  const [binIds, setBinIds] = useState<number[]>([]);
  const current = looks.find((l) => l.id === activeLook)!;

  function toggleBin(id: number) {
    setBinIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const binned = wardrobe.filter((i) => binIds.includes(i.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Masthead */}
      <header className="mx-auto max-w-[1240px] px-6 pt-10 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-5">
          <h1 className="font-display text-[15vw] leading-[0.78] tracking-[-0.03em] md:text-[9rem]">
            RÊCHE
          </h1>
          <nav className="flex flex-wrap gap-7 pb-2">
            {nav.map((item) => (
              <a
                key={item}
                href="#"
                className="kicker text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <p className="kicker mt-4 text-primary">The Closet Issue</p>
      </header>

      {/* Hero tear-sheet */}
      <section className="mx-auto grid max-w-[1240px] gap-12 px-6 py-16 md:grid-cols-[minmax(0,42%)_1fr] md:px-12 md:py-24">
        <figure className="grain">
          <img
            src={heroImg}
            width={1024}
            height={1408}
            alt="Model in a cream wool blazer, grey tee and straight-leg denim against a paper backdrop"
            className="w-full object-cover"
          />
          <span className="grain-overlay" />
          <figcaption className="kicker mt-3 text-muted-foreground">Fig. 01</figcaption>
        </figure>

        <div className="flex flex-col justify-center">
          <p className="kicker text-primary">From your closet, not a cart</p>
          <h2 className="mt-6 font-display text-[2.75rem] italic leading-[0.95] tracking-[-0.02em] md:text-[5.25rem]">
            The girl who already owns it.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Twelve pieces, forty combinations. Your board sets the mood — a little grain, a
            little attitude. Nothing here is a suggestion to buy.
          </p>
        </div>
      </section>

      <AvatarSetup />

      {/* Board-matched look */}
      <section className="mx-auto max-w-[1240px] border-t border-rule px-6 py-16 md:px-12">
        <div className="flex flex-wrap gap-10 border-b border-rule">
          {looks.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLook(l.id)}
              className={`-mb-px cursor-pointer border-b-2 pb-3 font-display text-xl transition-colors ${
                activeLook === l.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.title}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,40%)_1fr]">
          <figure className="grain">
            <img
              src={lookImg}
              width={1024}
              height={1280}
              loading="lazy"
              alt={`Rendered try-on for ${current.title}`}
              className="w-full object-cover"
            />
            <span className="grain-overlay" />
            <figcaption className="kicker mt-3 text-muted-foreground">Rendered try-on</figcaption>
          </figure>

          <div>
            <p className="kicker text-primary">Matched to your board</p>
            <ul className="mt-6">
              {current.pieces.map((p) => (
                <li
                  key={p}
                  className="flex items-baseline justify-between border-b border-rule py-5"
                >
                  <span className="font-display text-2xl">{p}</span>
                  <span className="kicker text-muted-foreground">From your closet</span>
                </li>
              ))}
            </ul>
            <button className="kicker mt-10 inline-flex cursor-pointer items-center gap-2 border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background">
              Save this look <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      {/* Wardrobe contact sheet */}
      <section className="mx-auto max-w-[1240px] border-t border-rule px-6 py-16 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-4xl italic md:text-6xl">Neglected, not forgotten</h3>
          <p className="kicker text-muted-foreground">Sorted by cost-per-wear</p>
        </div>

        <ol className="mt-12 grid grid-cols-1 border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-3">
          {[...wardrobe]
            .sort((a, b) => a.worn - b.worn)
            .map((item) => {
              const rare = item.worn <= RARE_WEAR_THRESHOLD;
              const inBin = binIds.includes(item.id);
              return (
                <li key={item.id} className="border-r border-b border-rule p-6">
                  <span className="kicker text-primary">{String(item.id).padStart(2, "0")}</span>
                  <p className="mt-16 font-display text-2xl leading-tight">{item.name}</p>
                  {rare && !inBin && (
                    <p className="kicker mt-3 text-primary">Rarely worn</p>
                  )}
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="kicker text-muted-foreground">{item.tag}</span>
                    <span className="kicker text-foreground">Worn {item.worn}×</span>
                  </div>
                  <button
                    onClick={() => toggleBin(item.id)}
                    className={`kicker mt-6 cursor-pointer underline transition-colors ${
                      inBin ? "text-muted-foreground" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {inBin ? "Move back to closet" : "Add to sell bin"}
                  </button>
                </li>
              );
            })}
        </ol>

        <button className="kicker mt-10 inline-flex cursor-pointer items-center gap-2 border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background">
          <Plus className="size-3.5" strokeWidth={1.5} /> Add a piece
        </button>
      </section>

      {/* The sell bin */}
      {binned.length > 0 && (
        <section className="mx-auto max-w-[1240px] border-t border-rule px-6 py-16 md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5">
            <h3 className="font-display text-4xl italic md:text-5xl">
              The bin — {binned.length} {binned.length === 1 ? "piece" : "pieces"}
            </h3>
            <p className="kicker text-primary">Ready to list</p>
          </div>

          <ul>
            {binned.map((item) => (
              <li
                key={item.id}
                className="flex items-baseline justify-between border-b border-rule py-5"
              >
                <span className="font-display text-2xl">{item.name}</span>
                <span className="kicker text-muted-foreground">Worn {item.worn}× total</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="kicker cursor-pointer border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background">
              List on Sellpy
            </button>
            <button className="kicker cursor-pointer border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background">
              List on Vinted
            </button>
          </div>
        </section>
      )}

      {/* Secondhand */}
      <section className="mx-auto max-w-[1240px] border-t border-rule px-6 py-16 md:px-12">
        <h3 className="font-display text-4xl italic md:text-6xl">Fills the gaps, secondhand</h3>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Only natural fibers make this list. No polyester, no acrylic — just the pieces your
          wardrobe is actually missing.
        </p>

        <div className="mt-12 grid gap-px border-t border-rule md:grid-cols-3">
          {secondhand.map((item) => (
            <article key={item.id} className="border-b border-rule py-8 md:border-b-0 md:pr-8">
              <h4 className="font-display text-3xl leading-tight">{item.name}</h4>
              <p className="kicker mt-4 text-muted-foreground">{item.material}</p>
              <p className="mt-6 font-display text-xl text-primary">
                {item.price} · {item.source}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-4 border-t border-rule px-6 py-12 md:px-12">
        <p className="font-display text-3xl tracking-[-0.02em]">RÊCHE</p>
        <p className="kicker text-muted-foreground">Your closet, already iconic</p>
      </footer>
    </div>
  );
}
