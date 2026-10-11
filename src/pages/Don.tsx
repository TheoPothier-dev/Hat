import { type FormEvent, useState } from "react";
import { Avatar, DateBadge, DonTag, FollowButton, Heart, Icon } from "../components/ui";
import { formatTime, lastAttended } from "../data";
import { href } from "../router";
import { useStore } from "../store";

const AMOUNTS = [2, 5, 10, 20];

function readPreset() {
  try {
    const v = Number(sessionStorage.getItem("don-preset"));
    sessionStorage.removeItem("don-preset");
    return AMOUNTS.includes(v) ? v : 5;
  } catch {
    return 5;
  }
}

const euro = (n: number) => `${String(n).replace(".", ",")} €`;

export function DonPage({ id }: { id: string }) {
  const { artist, eventsOf, donate, follow } = useStore();
  const a = artist(id);
  const [amount, setAmount] = useState(readPreset);
  const [custom, setCustom] = useState("");
  const [message, setMessage] = useState("");
  const [alsoFollow, setAlsoFollow] = useState(true);
  const [done, setDone] = useState<number | null>(null);

  if (!a) {
    return (
      <div className="mx-auto max-w-[480px] px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold">Artiste introuvable</h1>
        <a href={href.feed} className="font-bold text-lake">
          Retour au feed
        </a>
      </div>
    );
  }

  const attended = lastAttended.artistId === a.id;
  const customValue = Number.parseFloat(custom.replace(",", "."));
  const value = custom !== "" && customValue > 0 ? Math.round(customValue * 100) / 100 : amount;
  const next = eventsOf(a.id).find((e) => e.distance);

  if (!a.acceptsDonations) {
    return (
      <div className="mx-auto flex max-w-[480px] flex-col gap-6 px-4 pt-10 pb-28">
        <a
          href={href.artist(a.id)}
          className="inline-flex items-center gap-2 font-bold text-ink no-underline"
        >
          <Icon name="arrowLeft" /> {a.name}
        </a>
        <h1 className="m-0 font-display text-[32px] leading-tight font-extrabold tracking-[-0.03em]">
          {a.name} n'a pas activé les dons
        </h1>
        <DonTag accepts={false} />
        <p className="m-0 text-muted">
          Tu peux le soutenir en le suivant : tu seras prévenu de ses prochaines dates.
        </p>
        <FollowButton artistId={a.id} variant="flame" className="self-start" />
      </div>
    );
  }

  if (done !== null) {
    return (
      <div className="flex min-h-[calc(100vh-74px)] justify-center bg-lake px-4 pt-10 pb-28 text-paper md:pb-16">
        <div className="flex w-full max-w-[480px] flex-col gap-6">
          <span className="flex size-22 items-center justify-center rounded-full bg-paper">
            <Heart size={44} />
          </span>
          <h1 className="m-0 font-display text-[44px] leading-none font-extrabold tracking-[-0.04em]">
            Merci !
          </h1>
          <p className="m-0 text-lg leading-normal">
            {a.name} a reçu ton don de <strong>{euro(done)}</strong>. Tu fais partie de ceux qui
            l'aident à continuer.
          </p>
          {next && (
            <div className="flex items-center gap-3.5 rounded-[18px] bg-paper p-4 text-ink">
              <DateBadge iso={next.date} />
              <div className="min-w-0 text-sm">
                <span className="text-muted">Sa prochaine date</span>
                <br />
                <strong className="text-base">{next.venue}</strong> · {formatTime(next.time)}
              </div>
            </div>
          )}
          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={href.artist(a.id)}
              className="flex min-h-14 items-center justify-center rounded-full bg-flame font-bold text-ink no-underline"
            >
              Voir le profil de {a.name}
            </a>
            <a
              href={href.feed}
              className="flex min-h-14 items-center justify-center rounded-full border-[1.5px] border-paper font-bold text-paper no-underline"
            >
              Retour au feed
            </a>
          </div>
        </div>
      </div>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!(value > 0)) return;
    donate({ artistId: a.id, amount: value, message });
    if (alsoFollow) follow(a.id);
    setDone(value);
    window.scrollTo(0, 0);
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto flex max-w-[480px] flex-col gap-6 px-4 pt-8 pb-44 md:pb-16"
    >
      <div className="flex items-center justify-between">
        <a
          href={href.artist(a.id)}
          aria-label="Retour au profil"
          className="inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-line-strong text-ink"
        >
          <Icon name="arrowLeft" strokeWidth={2.4} />
        </a>
        <span className="text-[13px] font-bold tracking-[0.08em] text-lake uppercase">
          {attended ? "Après le concert" : "Soutenir"}
        </span>
        <span className="w-11" />
      </div>

      <div className="flex items-center gap-3.5 rounded-[20px] bg-ink p-3.5 text-paper">
        <Avatar artist={a} size={60} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="font-display text-[22px] font-extrabold tracking-[-0.02em]">{a.name}</div>
          <div className="text-[13px] text-on-ink-muted">
            {attended
              ? `${lastAttended.label.charAt(0).toUpperCase()}${lastAttended.label.slice(1)} · ${lastAttended.venue}`
              : `${a.genre} · ${a.city}`}
          </div>
          <DonTag accepts onDark />
        </div>
      </div>

      <h1 className="m-0 font-display text-[34px] leading-[1.02] font-extrabold tracking-[-0.035em]">
        Tu as aimé ?<br />
        <span className="text-flame">Soutiens l'artiste.</span>
      </h1>

      <fieldset className="m-0 flex min-w-0 flex-col gap-2.5 border-0 p-0">
        <legend className="mb-2.5 p-0 text-[15px] font-bold">Montant du don</legend>
        <div className="grid grid-cols-4 gap-2">
          {AMOUNTS.map((v) => {
            const sel = custom === "" && amount === v;
            return (
              <button
                key={v}
                type="button"
                aria-pressed={sel}
                onClick={() => {
                  setAmount(v);
                  setCustom("");
                }}
                className={`min-h-14 rounded-2xl border-[1.5px] font-display text-xl font-extrabold ${
                  sel
                    ? "border-2 border-ink bg-ink text-paper"
                    : "border-line-strong bg-paper text-ink hover:border-ink"
                }`}
              >
                {v} €
              </button>
            );
          })}
        </div>
        <label
          htmlFor="custom-amount"
          className="flex min-h-13 items-center gap-2.5 rounded-2xl border-[1.5px] border-line-strong px-3.5 text-sm font-semibold"
        >
          <span className="flex-none">Autre montant</span>
          <input
            id="custom-amount"
            type="number"
            min="1"
            step="0.5"
            inputMode="decimal"
            placeholder="0"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="min-w-0 flex-1 border-0 bg-transparent text-right text-lg font-bold text-ink outline-none"
          />
          <span className="flex-none font-bold">€</span>
        </label>
      </fieldset>

      <label htmlFor="don-message" className="flex flex-col gap-2 text-[15px] font-bold">
        <span>
          Un mot pour l'artiste{" "}
          <span className="text-[13px] font-medium text-muted">(facultatif)</span>
        </span>
        <textarea
          id="don-message"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Le dernier morceau, quelle claque…"
          className="resize-none rounded-2xl border-[1.5px] border-line-strong bg-paper px-3.5 py-3 text-[15px] font-normal text-ink"
        />
      </label>

      <label
        htmlFor="also-follow"
        className="flex min-h-11 items-center gap-3 text-[15px] font-semibold"
      >
        <input
          id="also-follow"
          type="checkbox"
          checked={alsoFollow}
          onChange={(e) => setAlsoFollow(e.target.checked)}
          className="size-[22px] accent-lake"
        />
        Suivre {a.name} pour ses prochaines dates
      </label>

      <div className="fixed inset-x-0 bottom-[calc(70px+env(safe-area-inset-bottom,0px))] z-20 border-t-[1.5px] border-line bg-paper px-4 pt-3.5 pb-3 md:static md:border-0 md:p-0">
        <div className="mx-auto flex max-w-[480px] flex-col gap-2.5">
          <button
            type="submit"
            disabled={!(value > 0)}
            className="min-h-14 rounded-full bg-flame text-[17px] font-extrabold text-ink hover:bg-[#ff5a2b] disabled:opacity-50"
          >
            Donner {euro(value)}
          </button>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
            <Icon name="lock" size={13} />
            Paiement sécurisé · [part reversée à l'artiste]
          </div>
        </div>
      </div>
    </form>
  );
}
