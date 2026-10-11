import { useState } from "react";
import {
  AdSlot,
  ArtistVisual,
  Avatar,
  DateBadge,
  DonTag,
  EventCard,
  FollowButton,
  Heart,
  Icon,
  Pill,
  SponsoredCard,
} from "../components/ui";
import { USER_CITY, formatTime, lastAttended } from "../data";
import { href } from "../router";
import { useStore } from "../store";

const FILTERS = [
  ["all", "Tout"],
  ["soir", "Ce soir"],
  ["weekend", "Ce week-end"],
  ["rock", "Rock"],
  ["electro", "Électro"],
  ["jazz", "Jazz & soul"],
  ["chanson", "Chanson"],
  ["hiphop", "Hip-hop"],
] as const;

type FilterKey = (typeof FILTERS)[number][0];

export function PostConcertBanner() {
  const { artist } = useStore();
  const [hidden, setHidden] = useState(false);
  const a = artist(lastAttended.artistId);
  if (!a || hidden || !a.acceptsDonations) return null;
  return (
    <section
      aria-label="Après le concert"
      className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-3xl bg-lake p-5 text-paper sm:px-6"
    >
      <span className="inline-flex size-13 flex-none items-center justify-center rounded-full bg-paper">
        <Heart size={24} className="text-flame" />
      </span>
      <div className="min-w-0 flex-[1_1_260px]">
        <div className="font-display text-[22px] font-extrabold tracking-[-0.02em]">
          Tu étais au concert de {a.name} {lastAttended.label} ?
        </div>
        <div className="text-[15px] text-[#DDEFEC]">
          {lastAttended.venue} · Si tu as aimé, tu peux soutenir l'artiste directement.
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <a
          href={href.don(a.id)}
          className="inline-flex min-h-12 items-center rounded-full bg-flame px-5.5 font-bold text-ink no-underline hover:bg-[#ff5a2b]"
        >
          Faire un don
        </a>
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="min-h-12 rounded-full border-[1.5px] border-paper bg-transparent px-4.5 font-semibold text-paper"
        >
          Plus tard
        </button>
      </div>
    </section>
  );
}

export function Feed() {
  const { events, artist, artists, state, inAgenda } = useStore();
  const [filter, setFilter] = useState<FilterKey>("all");

  const featured = events.find((e) => e.artistId === "lune-basse");
  const featuredArtist = featured ? artist(featured.artistId) : undefined;

  // Une seule carte par artiste : sa prochaine date.
  const nextByArtist = events.filter(
    (e, i, all) =>
      all.findIndex((x) => x.artistId === e.artistId) === i && e.artistId !== "lune-basse",
  );
  const shown = nextByArtist.filter((e) => {
    if (filter === "all") return true;
    if (filter === "soir" || filter === "weekend") return e.when === filter;
    return artist(e.artistId)?.genreKey === filter;
  });

  const followed = artists.filter((a) => state.follows.includes(a.id));
  const agenda = events.filter((e) => inAgenda(e.id)).slice(0, 3);

  return (
    <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-10 px-4 pt-8 pb-28 sm:px-8 md:pb-16">
      <main className="flex min-w-0 flex-[999_1_640px] flex-col gap-8">
        <PostConcertBanner />

        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold tracking-[0.08em] text-lake uppercase">
            Samedi 10 octobre · {USER_CITY}
          </div>
          <h1 className="m-0 font-display text-[clamp(34px,4vw,52px)] leading-none font-extrabold tracking-[-0.035em]">
            Près de toi, cette semaine
          </h1>
        </div>

        {featured && featuredArtist && (
          <article className="flex flex-wrap overflow-hidden rounded-[28px] bg-ink text-paper">
            <ArtistVisual
              artist={featuredArtist}
              className="flex min-h-[240px] flex-[1_1_300px] items-end p-6"
            ></ArtistVisual>
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[18px] p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Pill>Nouveau talent</Pill>
                <span className="rounded-full border-[1.5px] border-muted px-3 py-1 text-xs font-semibold">
                  1re date dans ta ville
                </span>
                <DonTag accepts={featuredArtist.acceptsDonations} onDark />
              </div>
              <div>
                <h2 className="m-0 font-display text-[44px] leading-none font-extrabold tracking-[-0.03em]">
                  {featuredArtist.name}
                </h2>
                <div className="mt-1.5 text-base text-on-ink-muted">
                  {featuredArtist.genre} · {featuredArtist.city}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-base">
                <div className="flex items-center gap-2.5">
                  <Icon name="calendar" className="text-flame" />
                  Ven. 16 octobre · {formatTime(featured.time)}
                </div>
                <div className="flex items-center gap-2.5">
                  <Icon name="pin" className="text-flame" />
                  {featured.venue} · à {featured.distance}
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-2.5">
                <FollowButton artistId={featuredArtist.id} variant="flame" />
                <a
                  href={href.artist(featuredArtist.id)}
                  className="inline-flex min-h-11 items-center rounded-full bg-paper px-5 font-bold text-ink no-underline"
                >
                  Voir le profil
                </a>
              </div>
            </div>
          </article>
        )}

        {/* biome-ignore lint/a11y/useSemanticElements: groupe de boutons-filtres, pas un formulaire */}
        <div role="group" aria-label="Filtres" className="flex flex-wrap gap-2">
          {FILTERS.map(([key, label]) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(key)}
                className={`min-h-11 rounded-full border-[1.5px] px-[18px] font-semibold ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line-strong bg-paper text-ink hover:border-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <SponsoredCard />

        {shown.length === 0 ? (
          <div className="rounded-3xl border-[1.5px] border-dashed border-line-strong p-10 text-center text-muted">
            Rien dans ce filtre pour l'instant autour de toi. Élargis le rayon ou essaie un autre
            style.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-5">
            {shown.map((e) => (
              <EventCard key={e.id} ev={e} />
            ))}
          </div>
        )}
      </main>

      <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-6">
        <section
          aria-label="Carte"
          className="overflow-hidden rounded-3xl border-[1.5px] border-line"
        >
          <div className="relative h-[240px] bg-lake-mist">
            <svg
              aria-hidden="true"
              className="absolute inset-0 size-full"
              viewBox="0 0 320 260"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
            >
              <path
                d="M150 20c30 10 40 40 35 70s20 50 15 85-30 60-55 60-30-30-25-60-25-45-15-80 15-85 45-75z"
                fill="#9FCBC4"
              />
              <path d="M0 70h320M0 150h320M90 0v260M240 0v260" stroke="#CFE3DF" strokeWidth="2" />
            </svg>
            {[
              ["40%", "18%"],
              ["22%", "30%"],
              ["68%", "26%"],
              ["14%", "62%"],
              ["30%", "44%"],
            ].map(([l, t], i) => (
              <span
                key={l + t}
                className={`absolute size-[18px] rounded-full border-[3px] border-paper ${i === 4 ? "bg-ink" : "bg-flame"}`}
                style={{ left: l, top: t }}
              />
            ))}
            <span className="absolute bottom-3 left-3 rounded-full bg-paper px-2.5 py-1.5 text-xs font-bold">
              Carte · {USER_CITY} &amp; lac
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 px-[18px] py-4 text-[15px]">
            <span>
              <strong>{events.filter((e) => e.distance).length} dates</strong> à moins de 15 km
            </span>
          </div>
        </section>

        <AdSlot />

        <section className="flex flex-col gap-3.5 rounded-3xl bg-mist p-[22px]">
          <div className="flex items-center justify-between">
            <h2 className="m-0 font-display text-[22px] font-extrabold tracking-[-0.02em]">
              Mon agenda
            </h2>
            <a href={href.agenda} className="text-sm font-bold text-lake">
              Tout voir
            </a>
          </div>
          {agenda.length === 0 && (
            <p className="m-0 text-[15px] text-muted">
              Ajoute des dates depuis le profil d'un artiste.
            </p>
          )}
          {agenda.map((e) => (
            <a
              key={e.id}
              href={href.artist(e.artistId)}
              className="flex items-center gap-3.5 rounded-2xl bg-paper p-3 text-ink no-underline"
            >
              <DateBadge iso={e.date} />
              <span className="min-w-0 text-[15px]">
                <strong>{artist(e.artistId)?.name}</strong>
                <br />
                <span className="text-muted">
                  {formatTime(e.time)} · {e.venue}
                </span>
              </span>
            </a>
          ))}
        </section>

        <section className="flex flex-col gap-3.5 rounded-3xl border-[1.5px] border-line p-[22px]">
          <h2 className="m-0 font-display text-[22px] font-extrabold tracking-[-0.02em]">
            Artistes suivis
          </h2>
          {followed.length === 0 && (
            <p className="m-0 text-[15px] text-muted">
              Tu ne suis personne pour l'instant. Après un concert qui t'a plu, appuie sur « Suivre
              ».
            </p>
          )}
          {followed.map((a) => (
            <a
              key={a.id}
              href={href.artist(a.id)}
              className="flex min-h-12 items-center gap-3 text-ink no-underline"
            >
              <Avatar artist={a} />
              <span className="min-w-0 text-[15px]">
                <strong>{a.name}</strong>
                <br />
                <span className="text-muted">{a.genre}</span>
              </span>
            </a>
          ))}
        </section>
      </aside>
    </div>
  );
}
