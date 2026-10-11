import { useState } from "react";
import { AdSlot, DateBadge, DonTag, FollowButton, Heart, Icon, Pill } from "../components/ui";
import { formatDate, formatTime } from "../data";
import { href } from "../router";
import { useStore } from "../store";

const TABS = [
  ["agenda", "Agenda"],
  ["sons", "Sons"],
  ["about", "À propos"],
] as const;

export function ArtistPage({ id }: { id: string }) {
  const { artist, eventsOf, isFollowing, inAgenda, toggleAgenda, state } = useStore();
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("agenda");
  const a = artist(id);

  if (!a) {
    return (
      <div className="mx-auto max-w-[720px] px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-extrabold">Artiste introuvable</h1>
        <a href={href.feed} className="font-bold text-lake">
          Retour au feed
        </a>
      </div>
    );
  }

  const dates = eventsOf(a.id);
  const next = dates.find((d) => d.distance);
  const followers = a.followers + (isFollowing(a.id) ? 1 : 0);
  const bio = a.id === "lune-basse" && state.studio.bio ? state.studio.bio : null;

  return (
    <div className="pb-28 md:pb-20">
      <div aria-hidden="true" className="relative h-[200px] overflow-hidden bg-ink sm:h-[300px]">
        <img src={a.banner} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-2" style={{ background: a.accent }} />
      </div>

      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="relative -mt-[72px] flex flex-wrap items-end gap-x-8 gap-y-6">
          <img
            src={a.photo}
            alt={`Photo de ${a.name}`}
            className="size-32 flex-none rounded-full border-[6px] border-paper bg-ink object-cover sm:size-40"
            style={{ objectPosition: "50% 35%" }}
          />
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-2 pb-2">
            <div className="flex flex-wrap gap-2">
              {a.isNew && <Pill>Nouveau talent</Pill>}
              <DonTag accepts={a.acceptsDonations} />
            </div>
            <h1 className="m-0 font-display text-[clamp(42px,5vw,68px)] leading-[0.95] font-extrabold tracking-[-0.04em]">
              {a.name}
            </h1>
            <div className="flex flex-wrap gap-x-[18px] gap-y-1.5 text-base text-muted">
              <span>{a.genre}</span>
              <span>{a.city}</span>
              <span>
                <strong className="text-ink">{followers}</strong> abonnés
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 pb-2">
            <FollowButton
              artistId={a.id}
              variant="flame"
              label="+ Suivre gratuitement"
              className="min-h-13 px-7 text-base"
            />
            <button
              type="button"
              aria-label="Partager le profil"
              className="inline-flex size-13 items-center justify-center rounded-full border-[1.5px] border-line-strong bg-paper text-ink"
            >
              <Icon name="share" size={20} />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-start gap-10">
          <main className="flex min-w-0 flex-[999_1_600px] flex-col gap-6">
            <div
              role="tablist"
              aria-label="Sections du profil"
              className="flex flex-wrap gap-1 border-b-[1.5px] border-line"
            >
              {TABS.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`-mb-[1.5px] min-h-12 border-b-[3px] bg-transparent px-[18px] text-base ${
                    tab === key
                      ? "border-flame font-bold text-ink"
                      : "border-transparent font-semibold text-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "agenda" && (
              <div className="flex flex-col gap-3">
                {dates.length === 0 && (
                  <p className="text-muted">Aucune date annoncée pour l'instant.</p>
                )}
                {dates.map((d) => {
                  const saved = inAgenda(d.id);
                  return (
                    <article
                      key={d.id}
                      className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[20px] border-[1.5px] border-line px-5 py-[18px]"
                    >
                      <DateBadge iso={d.date} size="lg" />
                      <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-1">
                        <div className="font-display text-[22px] font-extrabold tracking-[-0.02em]">
                          {d.venue}
                        </div>
                        <div className="text-[15px] text-muted">
                          {formatTime(d.time)} · {d.city} · {d.kind}
                        </div>
                        {d.distance && (
                          <div className="flex items-center gap-1.5 text-sm font-bold text-lake">
                            <Icon name="pin" size={15} strokeWidth={2.4} />
                            {d.distance} de toi
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          aria-pressed={saved}
                          onClick={() => toggleAgenda(d.id)}
                          className={`min-h-11 rounded-full border-[1.5px] bg-paper px-4 font-bold ${
                            saved
                              ? "border-lake text-lake"
                              : "border-line-strong text-ink hover:border-ink"
                          }`}
                        >
                          {saved ? "Dans mon agenda ✓" : "+ Mon agenda"}
                        </button>
                        <button
                          type="button"
                          className="inline-flex min-h-11 items-center rounded-full bg-ink px-[18px] font-bold text-paper"
                        >
                          Billetterie
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {tab === "sons" && (
              <div className="flex flex-col gap-3">
                {[
                  ["[Titre 1]", "3:42"],
                  ["[Titre 2]", "4:10"],
                  ["[Live au Brise Glace]", "5:03"],
                ].map(([t, l]) => (
                  <div
                    key={t}
                    className="flex items-center gap-4 rounded-[20px] border-[1.5px] border-line px-[18px] py-3.5"
                  >
                    <button
                      type="button"
                      aria-label={`Écouter ${t}`}
                      className="inline-flex size-12 flex-none items-center justify-center rounded-full bg-flame text-ink"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M7 4.5v15l13-7.5z" />
                      </svg>
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold">{t}</div>
                      <svg
                        aria-hidden="true"
                        width="100%"
                        height="22"
                        viewBox="0 0 300 22"
                        preserveAspectRatio="none"
                        fill="none"
                        stroke="#D8D0DF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <path d="M3 11v0M12 7v8M21 3v16M30 8v6M39 5v12M48 9v4M57 4v14M66 7v8M75 2v18M84 8v6M93 5v12M102 9v4M111 6v10M120 3v16M129 8v6M138 5v12M147 9v4M156 4v14M165 7v8M174 2v18M183 8v6M192 5v12M201 9v4M210 6v10M219 3v16M228 8v6M237 5v12M246 9v4M255 4v14M264 7v8M273 9v4M282 6v10M291 10v2" />
                      </svg>
                    </div>
                    <span className="flex-none text-sm text-muted">{l}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "about" && (
              <div className="flex max-w-[680px] flex-col gap-4 text-[17px] leading-relaxed">
                <p className="m-0 whitespace-pre-line">
                  {bio ??
                    "[Bio de l'artiste, écrite depuis son espace : son histoire, son univers, ses influences, ce qu'on vit en venant le voir sur scène.]"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-mist px-3.5 py-2 text-sm font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </main>

          <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
            {a.acceptsDonations ? (
              <section className="flex flex-col gap-3.5 rounded-3xl border-2 border-flame p-6">
                <div className="flex items-center gap-2.5">
                  <Heart size={22} />
                  <h2 className="m-0 font-display text-[22px] font-extrabold tracking-[-0.02em]">
                    Tu étais au concert ?
                  </h2>
                </div>
                <p className="m-0 text-[15px] leading-normal text-muted">
                  Soutiens {a.name} avec un don. C'est ce qui l'aide à continuer à jouer près de
                  chez toi.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 10].map((v) => (
                    <a
                      key={v}
                      href={`${href.don(a.id)}`}
                      onClick={() => {
                        try {
                          sessionStorage.setItem("don-preset", String(v));
                        } catch {
                          /* ignoré */
                        }
                      }}
                      className={`flex min-h-12 items-center justify-center rounded-[14px] border-[1.5px] font-bold no-underline ${
                        v === 5
                          ? "border-ink bg-ink text-paper"
                          : "border-line-strong text-ink hover:border-ink"
                      }`}
                    >
                      {v} €
                    </a>
                  ))}
                </div>
                <a
                  href={href.don(a.id)}
                  className="inline-flex min-h-13 items-center justify-center rounded-full bg-flame text-base font-bold text-ink no-underline hover:bg-[#ff5a2b]"
                >
                  Faire un don
                </a>
              </section>
            ) : (
              <section className="flex flex-col gap-2 rounded-3xl border-[1.5px] border-line p-6">
                <h2 className="m-0 font-display text-xl font-extrabold">Soutenir {a.name}</h2>
                <p className="m-0 text-[15px] leading-normal text-muted">
                  Cet artiste n'a pas activé les dons. Le meilleur soutien reste de venir le voir et
                  de le suivre.
                </p>
              </section>
            )}

            {next && (
              <section className="flex flex-col gap-3.5 rounded-3xl bg-ink p-6 text-paper">
                <div className="text-[13px] font-bold tracking-[0.08em] text-[#F9A68C] uppercase">
                  Prochaine date près de toi
                </div>
                <div className="font-display text-[28px] leading-[1.05] font-extrabold tracking-[-0.02em]">
                  {formatDate(next.date).weekday} {Number(formatDate(next.date).day)}{" "}
                  {formatDate(next.date).month.toLowerCase()}
                  <br />
                  {next.venue}
                </div>
                <div className="text-[15px] text-on-ink-muted">
                  {formatTime(next.time)} · à {next.distance}
                </div>
              </section>
            )}

            <section className="flex flex-col gap-2 rounded-3xl border-[1.5px] border-line p-6">
              <h2 className="m-0 mb-1.5 font-display text-xl font-extrabold">Écouter ailleurs</h2>
              {a.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center justify-between border-b border-line font-semibold text-ink no-underline last:border-b-0"
                >
                  {l.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </section>
            <AdSlot />
          </aside>
        </div>
      </div>
    </div>
  );
}
