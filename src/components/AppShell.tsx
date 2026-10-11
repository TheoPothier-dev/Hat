import type { ReactNode } from "react";
import { USER_CITY } from "../data";
import { type Route, href } from "../router";
import { Icon, type IconName, Logo } from "./ui";

function NavLink({ to, active, children }: { to: string; active: boolean; children: ReactNode }) {
  return (
    <a
      href={to}
      aria-current={active ? "page" : undefined}
      className={`px-3.5 py-3 no-underline ${
        active
          ? "border-b-[2.5px] border-flame font-bold text-ink"
          : "font-medium text-muted hover:text-ink"
      }`}
    >
      {children}
    </a>
  );
}

/** En-tête de l'application (feed, profil, don). */
export function AppHeader({ route }: { route: Route }) {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-20 border-b-[1.5px] border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-8">
        <Logo />
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-4 font-semibold text-ink"
        >
          <Icon name="pin" className="text-flame" />
          {USER_CITY} · 15 km
          <Icon name="chevronDown" size={14} strokeWidth={2.4} />
        </button>
        <label className="hidden min-h-11 min-w-0 flex-[1_1_240px] items-center gap-2.5 rounded-full bg-mist px-4 md:flex">
          <Icon name="search" className="text-muted" />
          <span className="sr-only">Rechercher</span>
          <input
            id="search"
            type="search"
            placeholder="Un artiste, un lieu, un style…"
            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
          />
        </label>
        <nav aria-label="Application" className="ml-auto hidden items-center gap-1 md:flex">
          <NavLink to={href.feed} active={route.name === "feed"}>
            Feed
          </NavLink>
          <NavLink to={href.agenda} active={route.name === "agenda"}>
            Mon agenda
          </NavLink>
          <NavLink to={href.studio} active={route.name === "studio"}>
            Espace artiste
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function Tab({
  to,
  icon,
  label,
  active,
}: { to: string; icon: IconName; label: string; active: boolean }) {
  return (
    <a
      href={to}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-13 flex-col items-center justify-center gap-1 text-xs no-underline ${
        active ? "font-bold text-ink" : "font-semibold text-muted"
      }`}
    >
      <Icon name={icon} size={22} className={active ? "text-flame" : undefined} />
      {label}
    </a>
  );
}

/** Barre d'onglets en bas d'écran, sur mobile uniquement. */
export function MobileTabBar({ route }: { route: Route }) {
  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t-[1.5px] border-line bg-paper px-2 pt-2 pb-[calc(10px+env(safe-area-inset-bottom,0px))] md:hidden"
    >
      <Tab to={href.feed} icon="home" label="Feed" active={route.name === "feed"} />
      <Tab to={href.agenda} icon="calendar" label="Agenda" active={route.name === "agenda"} />
      <Tab
        to={href.don("lune-basse")}
        icon="music"
        label="Soutenir"
        active={route.name === "don"}
      />
      <Tab to={href.studio} icon="user" label="Artiste" active={route.name === "studio"} />
    </nav>
  );
}
