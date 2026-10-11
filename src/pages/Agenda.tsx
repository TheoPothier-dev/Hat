import { Avatar, DateBadge, Heart } from "../components/ui";
import { formatTime } from "../data";
import { href } from "../router";
import { useStore } from "../store";

export function Agenda() {
  const { events, artist, artists, inAgenda, toggleAgenda, state } = useStore();
  const saved = events.filter((e) => inAgenda(e.id));
  const followed = artists.filter((a) => state.follows.includes(a.id));
  const donations = [...state.donations].reverse();

  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-10 px-4 pt-8 pb-28 sm:px-8 md:pb-16">
      <h1 className="m-0 font-display text-[clamp(34px,4vw,48px)] leading-none font-extrabold tracking-[-0.035em]">
        Mon agenda
      </h1>

      <section className="flex flex-col gap-3">
        <h2 className="m-0 font-display text-2xl font-extrabold">Mes prochaines dates</h2>
        {saved.length === 0 && (
          <p className="m-0 text-muted">
            Rien de prévu. Ajoute une date depuis le profil d'un artiste avec « + Mon agenda ».
          </p>
        )}
        {saved.map((e) => {
          const a = artist(e.artistId);
          return (
            <div
              key={e.id}
              className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[20px] border-[1.5px] border-line px-[18px] py-3.5"
            >
              <DateBadge iso={e.date} />
              <a
                href={href.artist(e.artistId)}
                className="min-w-0 flex-[1_1_220px] text-ink no-underline"
              >
                <div className="font-display text-xl font-extrabold">{a?.name}</div>
                <div className="text-sm text-muted">
                  {formatTime(e.time)} · {e.venue} · {e.city}
                </div>
              </a>
              <button
                type="button"
                onClick={() => toggleAgenda(e.id)}
                className="min-h-11 rounded-full border-[1.5px] border-line-strong bg-paper px-4 font-semibold text-ink hover:border-ink"
              >
                Retirer
              </button>
            </div>
          );
        })}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="m-0 font-display text-2xl font-extrabold">Artistes suivis</h2>
        {followed.length === 0 && <p className="m-0 text-muted">Tu ne suis encore personne.</p>}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-3">
          {followed.map((a) => (
            <a
              key={a.id}
              href={href.artist(a.id)}
              className="flex items-center gap-3 rounded-[18px] border-[1.5px] border-line p-3 text-ink no-underline hover:border-ink"
            >
              <Avatar artist={a} size={48} />
              <span className="min-w-0">
                <strong>{a.name}</strong>
                <br />
                <span className="text-sm text-muted">{a.genre}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="m-0 font-display text-2xl font-extrabold">Mes soutiens</h2>
        {donations.length === 0 && (
          <p className="m-0 text-muted">
            Après un concert, tu peux soutenir l'artiste avec un don. Tes dons apparaîtront ici.
          </p>
        )}
        {donations.map((d) => (
          <div key={d.at} className="flex items-center gap-3 rounded-[18px] bg-flame-mist p-3.5">
            <Heart size={18} />
            <span className="min-w-0 flex-1">
              <strong>{String(d.amount).replace(".", ",")} €</strong> à {artist(d.artistId)?.name}
              {d.message && <span className="block text-sm text-flame-deep">« {d.message} »</span>}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
