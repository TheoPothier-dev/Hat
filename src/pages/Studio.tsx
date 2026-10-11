import { type FormEvent, useState } from "react";
import { DateBadge, DonTag, Icon, type IconName, Logo } from "../components/ui";
import { formatDate, formatTime } from "../data";
import { href } from "../router";
import { STUDIO_ARTIST_ID, useStore } from "../store";

const SWATCHES = [
  { hex: "#F34213", label: "Orange", ink: "#161032" },
  { hex: "#136F63", label: "Vert lac", ink: "#FFFBFF" },
  { hex: "#161032", label: "Nuit", ink: "#FFFBFF" },
  { hex: "#F6EFF6", label: "Clair", ink: "#161032" },
];

const GENRES = [
  "Dream pop",
  "Rock",
  "Post-rock",
  "Électro",
  "Jazz & soul",
  "Chanson",
  "Hip-hop",
  "Folk",
];

const input =
  "min-h-12 rounded-[14px] border-[1.5px] border-line-strong bg-paper px-3.5 text-base font-medium text-ink";
const smallInput =
  "min-h-[46px] rounded-xl border-[1.5px] border-line-strong bg-paper px-3 text-[15px] text-ink";

function SideLink({
  to,
  icon,
  label,
  active = false,
}: { to: string; icon: IconName; label: string; active?: boolean }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        if (to.startsWith("#studio-")) {
          e.preventDefault();
          document.getElementById(to.slice(1))?.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className={`flex min-h-12 flex-[1_1_160px] items-center gap-2.5 rounded-[14px] px-3.5 text-ink no-underline ${
        active ? "bg-mist font-bold" : "font-semibold hover:bg-mist"
      }`}
    >
      <Icon name={icon} className={active ? "text-flame" : "text-muted"} />
      {label}
    </a>
  );
}

export function Studio() {
  const { state, updateStudio, eventsOf, addEvent, removeEvent, artist } = useStore();
  const p = state.studio;
  const me = artist(STUDIO_ARTIST_ID);
  const dates = eventsOf(STUDIO_ARTIST_ID);
  const swatch = SWATCHES.find((s) => s.hex === p.accent) ?? SWATCHES[0];
  const received = state.donations.filter((d) => d.artistId === STUDIO_ARTIST_ID);
  const total = received.reduce((s, d) => s + d.amount, 0);

  const [newDate, setNewDate] = useState("2026-11-28");
  const [newTime, setNewTime] = useState("21:00");
  const [newVenue, setNewVenue] = useState("");
  const [newCity, setNewCity] = useState("Annecy");

  const submitDate = (e: FormEvent) => {
    e.preventDefault();
    if (!newDate || !newVenue.trim()) return;
    addEvent({
      date: newDate,
      time: newTime || "20:00",
      venue: newVenue.trim(),
      city: newCity.trim() || "Annecy",
      distance: null,
      when: "plus-tard",
      kind: "Concert",
    });
    setNewVenue("");
  };

  const next = dates[0];

  return (
    <div className="min-h-screen bg-paper pb-28 md:pb-0">
      <header className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3.5">
            <Logo light />
            <span className="rounded-full border-[1.5px] border-flame px-2.5 py-1 text-xs font-bold tracking-[0.06em] text-[#F9A68C] uppercase">
              Studio artiste
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={href.artist(STUDIO_ARTIST_ID)}
              className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-paper px-[18px] font-semibold text-paper no-underline"
            >
              Voir mon profil public
            </a>
            <a
              href={href.feed}
              className="hidden px-2 font-semibold text-paper no-underline sm:inline"
            >
              Feed
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-8 px-4 py-8 sm:px-8">
        <nav aria-label="Studio" className="flex flex-[1_1_200px] flex-wrap content-start gap-1.5">
          <SideLink to="#studio-profil" icon="user" label="Mon profil" active />
          <SideLink to="#studio-dons" icon="music" label="Mes dons" />
          <SideLink to="#studio-agenda" icon="calendar" label="Mon agenda" />
        </nav>

        <main className="flex min-w-0 flex-[999_1_560px] flex-col gap-8">
          <section
            id="studio-profil"
            className="flex scroll-mt-6 flex-col gap-6 rounded-[28px] border-[1.5px] border-line p-6 sm:p-8"
          >
            <div>
              <h1 className="m-0 font-display text-[clamp(30px,3vw,38px)] font-extrabold tracking-[-0.03em]">
                Personnalise ton profil
              </h1>
              <p className="mt-1.5 mb-0 text-muted">
                C'est ce que verront les gens qui te découvrent dans leur feed.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-[18px]">
              <label htmlFor="st-name" className="flex flex-col gap-2 text-[15px] font-semibold">
                Nom de scène
                <input
                  id="st-name"
                  className={input}
                  value={p.name}
                  onChange={(e) => updateStudio({ name: e.target.value })}
                />
              </label>
              <label htmlFor="st-genre" className="flex flex-col gap-2 text-[15px] font-semibold">
                Style principal
                <select
                  id="st-genre"
                  className={input}
                  value={p.genre}
                  onChange={(e) => updateStudio({ genre: e.target.value })}
                >
                  {GENRES.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="st-city" className="flex flex-col gap-2 text-[15px] font-semibold">
                Ville
                <input
                  id="st-city"
                  className={input}
                  value={p.city}
                  onChange={(e) => updateStudio({ city: e.target.value })}
                />
              </label>
            </div>

            <label htmlFor="st-bio" className="flex flex-col gap-2 text-[15px] font-semibold">
              Bio
              <textarea
                id="st-bio"
                rows={4}
                value={p.bio}
                onChange={(e) => updateStudio({ bio: e.target.value })}
                placeholder="Raconte ton univers en quelques lignes…"
                className="resize-y rounded-[14px] border-[1.5px] border-line-strong bg-paper px-3.5 py-3 text-base leading-normal font-normal text-ink"
              />
            </label>

            <fieldset className="m-0 min-w-0 border-0 p-0">
              <legend className="mb-3 p-0 text-[15px] font-semibold">Couleur de ton profil</legend>
              <div className="flex flex-wrap gap-3">
                {SWATCHES.map((s) => {
                  const on = s.hex === swatch.hex;
                  return (
                    <button
                      key={s.hex}
                      type="button"
                      aria-label={s.label}
                      aria-pressed={on}
                      onClick={() => updateStudio({ accent: s.hex })}
                      className="size-13 rounded-full border-[3px] border-paper"
                      style={{ background: s.hex, boxShadow: `0 0 0 ${on ? 3 : 1.5}px #161032` }}
                    />
                  );
                })}
              </div>
            </fieldset>

            <div
              id="studio-dons"
              className="flex scroll-mt-6 flex-wrap items-center gap-x-6 gap-y-4 rounded-[20px] border-[1.5px] border-[#F7C9B8] bg-[#FDF1EC] px-[22px] py-5"
            >
              <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-1">
                <div className="text-[17px] font-bold">Accepter les dons du public</div>
                <div className="text-sm leading-normal text-muted">
                  Après chaque date, les spectateurs présents pourront te soutenir directement. Un
                  tag « Dons acceptés » s'affiche sur ton profil et ta carte.
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={p.acceptsDonations}
                aria-label="Accepter les dons"
                onClick={() => updateStudio({ acceptsDonations: !p.acceptsDonations })}
                className={`flex h-9 w-16 flex-none rounded-full p-1 transition-colors ${
                  p.acceptsDonations ? "justify-end bg-lake" : "justify-start bg-[#9C93A8]"
                }`}
              >
                <span className="size-7 rounded-full bg-paper shadow" />
              </button>
              {p.acceptsDonations && (
                <>
                  <label
                    htmlFor="st-payout"
                    className="flex flex-[1_1_100%] flex-col gap-1.5 text-sm font-semibold"
                  >
                    Compte de versement
                    <input
                      id="st-payout"
                      className={smallInput}
                      placeholder="[Connexion du compte de paiement]"
                    />
                  </label>
                  <div className="flex flex-[1_1_100%] flex-wrap gap-x-6 gap-y-1 text-sm">
                    <span>
                      Dons reçus : <strong>{received.length}</strong>
                    </span>
                    <span>
                      Total : <strong>{String(total).replace(".", ",")} €</strong>
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
              {(
                [
                  ["image", "Photo de profil"],
                  ["banner", "Bannière"],
                  ["music", "Ajouter un son"],
                ] as [IconName, string][]
              ).map(([icon, label]) => (
                <button
                  key={label}
                  type="button"
                  className="flex min-h-[110px] flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-line-strong bg-paper font-semibold text-ink hover:border-ink"
                >
                  <Icon name={icon} size={26} className="text-flame" />
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section
            id="studio-agenda"
            className="flex scroll-mt-6 flex-col gap-[22px] rounded-[28px] bg-mist p-6 sm:p-8"
          >
            <div>
              <h2 className="m-0 font-display text-[32px] font-extrabold tracking-[-0.03em]">
                Mon agenda
              </h2>
              <p className="mt-1.5 mb-0 text-muted">
                Chaque date publiée apparaît dans le feed des gens autour du lieu, et tes abonnés
                sont prévenus.
              </p>
            </div>

            <form
              onSubmit={submitDate}
              className="flex flex-col gap-4 rounded-[22px] bg-paper p-[22px]"
            >
              <div className="text-[17px] font-bold">Ajouter une date</div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-3.5">
                <label htmlFor="nd-date" className="flex flex-col gap-1.5 text-sm font-semibold">
                  Date
                  <input
                    id="nd-date"
                    type="date"
                    className={smallInput}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </label>
                <label htmlFor="nd-time" className="flex flex-col gap-1.5 text-sm font-semibold">
                  Heure
                  <input
                    id="nd-time"
                    type="time"
                    className={smallInput}
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                </label>
                <label htmlFor="nd-venue" className="flex flex-col gap-1.5 text-sm font-semibold">
                  Lieu
                  <input
                    id="nd-venue"
                    className={smallInput}
                    placeholder="Salle, bar, festival…"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                  />
                </label>
                <label htmlFor="nd-city" className="flex flex-col gap-1.5 text-sm font-semibold">
                  Ville
                  <input
                    id="nd-city"
                    className={smallInput}
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={!newVenue.trim()}
                className="min-h-12 self-start rounded-full bg-flame px-6 text-base font-bold text-ink hover:bg-[#ff5a2b] disabled:opacity-50"
              >
                Publier la date
              </button>
            </form>

            <div className="flex flex-col gap-2.5">
              {dates.length === 0 && <p className="m-0 text-muted">Aucune date publiée.</p>}
              {dates.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[18px] bg-paper px-[18px] py-3.5"
                >
                  <DateBadge iso={d.date} />
                  <div className="min-w-0 flex-[1_1_200px]">
                    <div className="font-bold">
                      {d.venue}, {d.city}
                    </div>
                    <div className="text-sm text-muted">
                      {formatDate(d.date).weekday} · {formatTime(d.time)}
                    </div>
                  </div>
                  <span className="rounded-full bg-lake-mist px-3 py-1.5 text-[13px] font-bold text-lake-deep">
                    Publiée
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEvent(d.id)}
                    aria-label={`Retirer la date du ${formatDate(d.date).day} ${formatDate(d.date).month}`}
                    className="inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-line-strong bg-paper text-muted hover:text-ink"
                  >
                    <Icon name="close" size={16} strokeWidth={2.4} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 md:sticky md:top-6">
          <div className="text-[13px] font-bold tracking-[0.08em] text-muted uppercase">
            Aperçu dans le feed
          </div>
          <article className="overflow-hidden rounded-3xl border-[1.5px] border-line bg-paper">
            <div className="relative h-[140px] bg-ink">
              {me && (
                <img src={me.banner} alt="" className="absolute inset-0 size-full object-cover" />
              )}
              <div
                className="absolute inset-x-0 bottom-0 h-1.5"
                style={{ background: swatch.hex }}
              />
            </div>
            <div className="flex flex-col gap-3 px-5 pb-5">
              {me && (
                <img
                  src={me.photo}
                  alt=""
                  className="relative -mt-9 size-[72px] rounded-full border-4 border-paper object-cover"
                  style={{ objectPosition: "50% 35%" }}
                />
              )}
              <div>
                <div className="font-display text-[26px] font-extrabold tracking-[-0.02em]">
                  {p.name || "Ton nom de scène"}
                </div>
                <div className="text-sm text-muted">
                  {p.genre} · {p.city}
                </div>
              </div>
              <DonTag accepts={p.acceptsDonations} />
              <div className="text-sm">
                <strong>Prochaine date :</strong>{" "}
                {next
                  ? `${Number(formatDate(next.date).day)} ${formatDate(next.date).month.toLowerCase()} · ${next.venue}`
                  : "aucune"}
              </div>
              <div className="flex min-h-[46px] items-center justify-center rounded-full bg-ink font-bold text-paper">
                + Suivre
              </div>
            </div>
          </article>
          <a href={href.artist(STUDIO_ARTIST_ID)} className="font-bold">
            Ouvrir mon profil complet →
          </a>
        </aside>
      </div>
    </div>
  );
}
