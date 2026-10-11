import { type ReactNode, useState } from "react";
import {
  APP_NAME,
  type Artist,
  type EventItem,
  formatDate,
  sponsoredPhoto,
  whenLabel,
} from "../data";
import { href } from "../router";
import { useStore } from "../store";

const ICONS = {
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  check: <path d="M5 12l5 5L20 7" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  home: <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20c1-3.5 3.8-5.5 7-5.5s6 2 7 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.8c1.7.8 2.9 2.6 3.5 5.2" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  share: <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13" />,
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="9" cy="9" r="2" />
      <path d="M21 15l-5-5L5 21" />
    </>
  ),
  banner: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M12 9v6M9 12h6" />
    </>
  ),
  map: <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14" />,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 18,
  className,
  strokeWidth = 2.2,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}

export function Heart({
  size = 14,
  className = "text-flame",
}: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

/** Symbole HAT : le chapeau retourné qui reçoit une pièce (logo C). */
export function HatMark({ size = 34, light = false }: { size?: number; light?: boolean }) {
  const body = light ? "#FFFBFF" : "#161032";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M30 48 H70 L66 88 H34 Z" fill={body} />
      <path d="M30.4 52 H69.6 L68.8 60 H31.2 Z" fill="#136F63" />
      <path d="M10 46 Q50 36 90 46 Q50 56 10 46 Z" fill={body} />
      <circle cx="50" cy="20" r="11" fill="#F34213" />
    </svg>
  );
}

export function Logo({ light = false, size = "md" }: { light?: boolean; size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <a
      href={href.landing}
      aria-label={`${APP_NAME}, accueil`}
      className={`inline-flex items-center gap-1.5 font-display leading-none font-extrabold tracking-[-0.05em] no-underline ${
        light ? "text-paper" : "text-ink"
      } ${lg ? "text-[34px]" : "text-[30px]"}`}
    >
      <HatMark size={lg ? 40 : 34} light={light} />
      <span className="pb-1">hat</span>
    </a>
  );
}

/** Tag indiquant si l'artiste accepte les dons. */
export function DonTag({ accepts, onDark = false }: { accepts: boolean; onDark?: boolean }) {
  if (accepts) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-bold ${
          onDark ? "bg-paper text-ink" : "bg-flame-mist text-flame-deep"
        }`}
      >
        <Heart size={13} />
        Dons acceptés
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center self-start rounded-full border-[1.5px] px-2.5 py-[3px] text-xs font-semibold ${
        onDark ? "border-on-ink-muted text-on-ink-muted" : "border-line-strong text-muted"
      }`}
    >
      Dons non activés
    </span>
  );
}

export function Pill({
  children,
  tone = "lake",
}: { children: ReactNode; tone?: "lake" | "ink" | "outline" }) {
  const cls =
    tone === "lake"
      ? "bg-lake text-paper"
      : tone === "ink"
        ? "bg-ink text-paper"
        : "border-[1.5px] border-current";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${cls}`}>
      {children}
    </span>
  );
}

export function FollowButton({
  artistId,
  variant = "ink",
  className = "",
  label = "+ Suivre",
}: {
  artistId: string;
  variant?: "ink" | "flame" | "onDark";
  className?: string;
  label?: string;
}) {
  const { isFollowing, toggleFollow } = useStore();
  const on = isFollowing(artistId);
  const base = `min-h-11 rounded-full px-5 font-bold transition-colors ${className}`;
  if (on) {
    const followed =
      variant === "onDark"
        ? "border-2 border-paper bg-transparent text-paper"
        : "border-[1.5px] border-lake bg-paper text-lake";
    return (
      <button
        type="button"
        aria-pressed="true"
        onClick={() => toggleFollow(artistId)}
        className={`${base} ${followed}`}
      >
        Abonné ✓
      </button>
    );
  }
  const idle =
    variant === "ink"
      ? "bg-ink text-paper hover:bg-[#2a2150]"
      : "bg-flame text-ink hover:bg-[#ff5a2b]";
  return (
    <button
      type="button"
      aria-pressed="false"
      onClick={() => toggleFollow(artistId)}
      className={`${base} ${idle}`}
    >
      {label}
    </button>
  );
}

/** Vignette en attendant la vraie photo de l'artiste. */
export function ArtistVisual({
  artist,
  className = "",
  children,
}: {
  artist: Pick<Artist, "tileBg" | "tileFg"> & { photo?: string };
  className?: string;
  children?: ReactNode;
}) {
  if (artist.photo) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ background: artist.tileBg }}
      >
        <img
          src={artist.photo}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        {children}
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: artist.tileBg }}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full opacity-30"
        viewBox="0 0 300 150"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke={artist.tileFg}
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M40 75v0M70 55v40M100 30v90M130 50v50M160 20v110M190 45v60M220 60v30M250 40v70" />
      </svg>
      {children}
    </div>
  );
}

export function Avatar({
  artist,
  size = 44,
}: {
  artist: Pick<Artist, "initials" | "tileBg" | "tileFg"> & { photo?: string };
  size?: number;
}) {
  if (artist.photo) {
    return (
      <img
        src={artist.photo}
        alt=""
        className="flex-none rounded-full object-cover"
        style={{ width: size, height: size, objectPosition: "50% 35%" }}
      />
    );
  }
  return (
    <span
      className="inline-flex flex-none items-center justify-center rounded-full font-display font-extrabold"
      style={{
        width: size,
        height: size,
        background: artist.tileBg,
        color: artist.tileFg,
        fontSize: size * 0.34,
      }}
    >
      {artist.initials}
    </span>
  );
}

export function DateBadge({ iso, size = "md" }: { iso: string; size?: "md" | "lg" }) {
  const f = formatDate(iso);
  return (
    <div className={`flex-none text-center leading-[1.05] ${size === "lg" ? "w-16" : "w-13"}`}>
      <div className="text-xs font-bold text-flame-date">{f.month}</div>
      <div
        className={`font-display font-extrabold ${size === "lg" ? "text-[34px] tracking-[-0.03em]" : "text-2xl"}`}
      >
        {f.day}
      </div>
      {size === "lg" && <div className="text-[13px] text-muted">{f.weekday}</div>}
    </div>
  );
}

export function EventCard({ ev }: { ev: EventItem }) {
  const { artist } = useStore();
  const a = artist(ev.artistId);
  if (!a) return null;
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border-[1.5px] border-line bg-paper">
      <ArtistVisual artist={a} className="flex h-[150px] items-start justify-between p-3.5">
        <span className="relative rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-ink">
          {whenLabel(ev)}
        </span>
        {a.isNew && (
          <span className="relative rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-paper">
            Nouveau
          </span>
        )}
      </ArtistVisual>
      <div className="flex flex-1 flex-col gap-2.5 p-[18px]">
        <div>
          <h3 className="m-0 font-display text-[22px] font-extrabold tracking-[-0.02em]">
            {a.name}
          </h3>
          <div className="text-sm text-muted">{a.genre}</div>
        </div>
        <DonTag accepts={a.acceptsDonations} />
        <div className="flex items-start gap-2 text-sm">
          <Icon name="pin" size={16} className="mt-0.5 flex-none text-lake" />
          <span>
            {ev.venue} · <strong>{ev.distance}</strong>
          </span>
        </div>
        <div className="mt-auto flex gap-2 pt-1.5">
          <FollowButton artistId={a.id} className="flex-1" />
          <a
            href={href.artist(a.id)}
            aria-label={`Voir le profil de ${a.name}`}
            className="inline-flex size-11 flex-none items-center justify-center rounded-full border-[1.5px] border-line-strong text-ink hover:border-ink"
          >
            <Icon name="arrowRight" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Emplacement publicitaire display (régie), toujours signalé « Publicité ». */
export function AdSlot() {
  return (
    <aside aria-label="Publicité" className="flex flex-col items-center gap-1.5">
      <span className="self-start text-[11px] font-bold tracking-[0.08em] text-muted uppercase">
        Publicité
      </span>
      <div className="flex h-[250px] w-full max-w-[300px] flex-col items-center justify-center gap-1 rounded-2xl border-[1.5px] border-dashed border-line-strong bg-mist text-center text-sm text-muted">
        <strong className="text-ink">Emplacement display</strong>
        <span>300 × 250 · régie publicitaire</span>
      </div>
    </aside>
  );
}

/** Date sponsorisée achetée par un lieu : carte native, signalée « Sponsorisé ». */
export function SponsoredCard() {
  const [saved, setSaved] = useState(false);
  const [why, setWhy] = useState(false);
  return (
    <article
      aria-label="Date sponsorisée"
      className="flex flex-wrap overflow-hidden rounded-3xl border-[1.5px] border-line bg-paper"
    >
      <ArtistVisual
        artist={{ tileBg: "#136F63", tileFg: "#FFFBFF", photo: sponsoredPhoto }}
        className="flex min-h-[150px] flex-[1_1_220px] items-start p-3.5"
      >
        <span className="relative rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-ink">
          Jeu. 15 · 20h30
        </span>
      </ArtistVisual>
      <div className="flex min-w-0 flex-[2_1_300px] flex-col gap-2.5 px-5 py-[18px]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold tracking-[0.06em] text-muted uppercase">
            Sponsorisé · [Bar partenaire]
          </span>
          <button
            type="button"
            aria-expanded={why}
            aria-label="Pourquoi je vois ça ?"
            onClick={() => setWhy(!why)}
            className="size-8 flex-none rounded-full border-[1.5px] border-line-strong bg-paper text-sm font-bold text-muted"
          >
            i
          </button>
        </div>
        {why && (
          <p className="m-0 rounded-xl bg-mist px-3 py-2 text-[13px] text-muted">
            Ce lieu a payé pour mettre cette date en avant auprès des personnes à moins de 15 km.
          </p>
        )}
        <h3 className="m-0 font-display text-2xl font-extrabold tracking-[-0.02em]">
          Jam session ouverte
        </h3>
        <div className="flex items-start gap-2 text-sm">
          <Icon name="pin" size={16} className="mt-0.5 flex-none text-lake" />
          <span>
            [Bar partenaire], Vieille Ville · <strong>1,1 km</strong> · Entrée libre
          </span>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => setSaved(!saved)}
            className={`min-h-11 rounded-full border-[1.5px] px-[18px] font-bold ${
              saved ? "border-lake bg-paper text-lake" : "border-ink bg-ink text-paper"
            }`}
          >
            {saved ? "Dans mon agenda ✓" : "+ Mon agenda"}
          </button>
        </div>
      </div>
    </article>
  );
}
