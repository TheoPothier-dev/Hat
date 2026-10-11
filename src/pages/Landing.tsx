import { HatMark, Heart, Icon, Logo } from "../components/ui";
import { APP_NAME, artists } from "../data";

const lune = artists[0];
const semnoz = artists[4];
import { href } from "../router";

const btnFlame =
  "inline-flex min-h-14 items-center gap-2.5 rounded-full bg-flame px-7 text-[17px] font-bold text-ink no-underline hover:bg-[#ff5a2b]";
const btnOutline =
  "inline-flex min-h-14 items-center rounded-full border-2 border-ink px-7 text-[17px] font-bold text-ink no-underline hover:bg-ink hover:text-paper";

const steps = [
  {
    n: "01",
    color: "text-flame",
    title: "Trouve ce qui joue près de toi",
    text: "Ton feed est trié par distance et par date : ce soir, ce week-end, à pied ou à vélo.",
  },
  {
    n: "02",
    color: "text-lake",
    title: "Vas-y, écoute en vrai",
    text: "Horaires, lieu, prix, itinéraire : tout est sur la fiche de la date, sans quitter l'app.",
  },
  {
    n: "03",
    color: "text-flame",
    title: "Suis et soutiens l'artiste",
    text: "Tu as aimé le concert ? Abonne-toi gratuitement pour connaître ses prochaines dates, et fais-lui un don directement depuis l'app.",
    dark: true,
  },
];

const artistPoints = [
  ["Un profil à ton image", "couleur, photos, extraits, liens vers tes plateformes."],
  ["Ton agenda mis en avant", "chaque date apparaît dans le feed des gens autour du lieu."],
  ["Tes abonnés prévenus", "dès que tu joues près de chez eux."],
  [
    "Des dons après chaque date",
    "si tu les actives, ton public peut te soutenir à la sortie du concert.",
  ],
];

export function Landing() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-8">
        <Logo size="lg" />
        <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-2">
          <a
            href="#feed"
            className="hidden px-3.5 py-3 font-medium text-ink no-underline sm:inline"
          >
            Le feed
          </a>
          <a
            href={href.studio}
            className="hidden px-3.5 py-3 font-medium text-ink no-underline sm:inline"
          >
            Pour les artistes
          </a>
          <a
            href={href.feed}
            className="rounded-full bg-ink px-5 py-3 font-semibold text-paper no-underline"
          >
            Ouvrir l'app
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-4 pt-8 pb-24 sm:px-8">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
          <div className="inline-flex items-center gap-2 self-start rounded-full border-[1.5px] border-ink px-3.5 py-2 text-sm font-semibold">
            <Icon name="pin" size={16} className="text-flame" />
            Partout en France
          </div>
          <h1 className="m-0 font-display text-[clamp(46px,7vw,92px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            Les artistes près de chez toi, <span className="text-flame">avant tout le monde.</span>
          </h1>
          <p className="m-0 max-w-[540px] text-xl leading-normal text-pretty text-muted">
            Un concert au bar du coin, une première scène, un DJ set en plein air : {APP_NAME} te
            montre les nouveaux talents qui jouent près de chez toi. Tu as aimé ? Suis l'artiste et
            soutiens-le directement.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={href.feed} className={btnFlame}>
              Voir ce qui joue ce soir
              <Icon name="arrowRight" strokeWidth={2.4} />
            </a>
            <a href={href.studio} className={btnOutline}>
              Je suis artiste
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px] py-6">
          <div className="flex w-[min(380px,100%)] rotate-2 items-center gap-4 self-end rounded-3xl bg-ink p-5 text-paper shadow-[0_24px_48px_-24px_rgba(22,16,50,0.5)]">
            <img
              src={lune.photo}
              alt=""
              className="size-[72px] flex-none rounded-2xl object-cover"
            />
            <div className="flex min-w-0 flex-col gap-1">
              <div className="text-xs font-bold tracking-[0.08em] text-[#F9A68C] uppercase">
                Ven. 16 oct. · 21h00
              </div>
              <div className="font-display text-2xl font-extrabold tracking-[-0.02em]">
                Lune Basse
              </div>
              <div className="text-sm text-on-ink-muted">Le Brise Glace · à 2,1 km</div>
            </div>
          </div>
          <div className="flex w-[min(360px,100%)] -rotate-[2.5deg] flex-col gap-3.5 self-start rounded-3xl border-2 border-ink bg-paper p-5">
            <img src={semnoz.photo} alt="" className="h-28 w-full rounded-2xl object-cover" />
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-lake px-2.5 py-1.5 text-xs font-bold text-paper">
                Nouveau talent
              </span>
              <span className="text-[13px] text-muted">Sam. 17 oct.</span>
            </div>
            <div className="font-display text-[26px] font-extrabold tracking-[-0.02em]">
              Les Fils du Semnoz
            </div>
            <div className="text-[15px] text-muted">Folk rock · Vieille Ville, bar partenaire</div>
            <div className="flex min-h-12 items-center justify-center rounded-full bg-ink font-bold text-paper">
              + Suivre l'artiste
            </div>
          </div>
          <div className="flex rotate-[1.5deg] items-center gap-3 self-center rounded-full bg-flame px-5 py-3.5 font-bold text-ink">
            <Heart size={18} className="text-ink" />
            Tu as aimé hier soir ? Soutiens Talèfre
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-10 gap-y-3 px-4 py-7 sm:px-8">
          <div className="flex flex-col gap-1">
            <div className="font-display text-[28px] font-extrabold tracking-[-0.02em]">
              Partout en France, dès le lancement.
            </div>
            <div className="text-[15px] text-on-ink-muted">
              Paris, Lyon, Marseille, Bordeaux, Lille, Nantes, Annecy… et ta ville.
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {["Salles", "Bars & cafés-concerts", "Scènes en plein air", "Festivals"].map((l) => (
              <span
                key={l}
                className="rounded-full border-[1.5px] border-muted px-4 py-2.5 font-medium"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1240px] flex-col gap-12 px-4 py-28 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <h2 className="m-0 max-w-[640px] font-display text-[clamp(36px,4.5vw,56px)] leading-none font-extrabold tracking-[-0.035em]">
            Trouve. Écoute. Soutiens.
          </h2>
          <p className="m-0 max-w-[420px] text-lg leading-normal text-muted">
            Pas d'algorithme mondial : ton feed part de là où tu es, et des artistes qui montent
            dans ta ville.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          {steps.map((s) => (
            <article
              key={s.n}
              className={`flex flex-col gap-4 rounded-[28px] p-8 ${s.dark ? "bg-ink text-paper" : "bg-mist"}`}
            >
              <div className={`font-display text-[64px] leading-none font-extrabold ${s.color}`}>
                {s.n}
              </div>
              <h3 className="m-0 font-display text-[26px] font-extrabold tracking-[-0.02em]">
                {s.title}
              </h3>
              <p
                className={`m-0 text-base leading-relaxed ${s.dark ? "text-on-ink-muted" : "text-muted"}`}
              >
                {s.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="artistes" className="bg-lake text-paper">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-16 px-4 py-28 sm:px-8">
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-7">
            <div className="text-sm font-bold tracking-[0.1em] uppercase">Pour les artistes</div>
            <h2 className="m-0 font-display text-[clamp(36px,4.5vw,60px)] leading-none font-extrabold tracking-[-0.035em]">
              Ton profil. Ton agenda. Ta communauté.
            </h2>
            <ul className="m-0 flex list-none flex-col gap-[18px] p-0 text-lg leading-snug">
              {artistPoints.map(([t, d]) => (
                <li key={t} className="flex items-start gap-3.5">
                  <Icon name="check" size={22} strokeWidth={2.4} className="mt-0.5 flex-none" />
                  <span>
                    <strong>{t}</strong> : {d}
                  </span>
                </li>
              ))}
            </ul>
            <a href={href.studio} className={`${btnFlame} self-start`}>
              Créer mon profil artiste
            </a>
          </div>
          <div aria-hidden="true" className="flex min-w-0 flex-[1_1_400px] justify-center">
            <div className="w-[min(400px,100%)] overflow-hidden rounded-[28px] bg-paper text-ink shadow-[0_32px_64px_-28px_rgba(22,16,50,0.6)]">
              <img src={lune.banner} alt="" className="h-[120px] w-full object-cover" />
              <div className="flex flex-col gap-3.5 px-6 pb-6">
                <img
                  src={lune.photo}
                  alt=""
                  className="relative -mt-11 size-[88px] rounded-full border-4 border-paper object-cover"
                  style={{ objectPosition: "50% 35%" }}
                />
                <div>
                  <div className="font-display text-[28px] font-extrabold tracking-[-0.02em]">
                    Lune Basse
                  </div>
                  <div className="text-[15px] text-muted">Dream pop · Annecy</div>
                </div>
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-flame-mist px-3 py-1.5 text-[13px] font-bold text-flame-deep">
                  <Heart size={14} /> Dons acceptés
                </span>
                {[
                  ["OCT", "16", "Le Brise Glace", "21h00 · Annecy"],
                  ["NOV", "07", "Bonlieu", "20h30 · Annecy"],
                ].map(([m, d, v, t]) => (
                  <div
                    key={d}
                    className="flex items-center gap-3.5 rounded-2xl border-[1.5px] border-line p-3"
                  >
                    <div className="w-13 flex-none text-center leading-[1.05]">
                      <div className="text-xs font-bold text-flame-date">{m}</div>
                      <div className="font-display text-2xl font-extrabold">{d}</div>
                    </div>
                    <div className="text-[15px]">
                      <strong>{v}</strong>
                      <br />
                      <span className="text-muted">{t}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1240px] flex-col items-center gap-7 px-4 py-32 text-center sm:px-8">
        <h2 className="m-0 max-w-[900px] font-display text-[clamp(38px,6vw,80px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
          Ce soir, quelqu'un joue pour la première fois{" "}
          <span className="text-flame">à deux rues de chez toi.</span>
        </h2>
        <a
          href={href.feed}
          className="inline-flex min-h-14 items-center rounded-full bg-ink px-8 text-[17px] font-bold text-paper no-underline"
        >
          Ouvrir {APP_NAME}
        </a>
      </section>

      <footer className="border-t-[1.5px] border-line">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:px-8">
          <span className="inline-flex items-center gap-1 font-display text-2xl leading-none font-extrabold tracking-[-0.05em] text-ink">
            <HatMark size={28} />
            <span className="pb-0.5">hat</span>
          </span>
          <span>Prototype · données de démonstration</span>
        </div>
      </footer>
    </div>
  );
}
