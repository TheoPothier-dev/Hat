import { useEffect, useState } from "react";

// Routage par ancre (#feed, #artiste-lune-basse, #don-lune-basse, #studio).
// Simple et compatible avec un hébergement statique ; à remplacer par le
// routeur de Next.js lors du passage en production.

export type Route =
  | { name: "landing" }
  | { name: "feed" }
  | { name: "studio" }
  | { name: "agenda" }
  | { name: "artist"; id: string }
  | { name: "don"; id: string };

export function parse(hash: string): Route {
  const h = hash.replace(/^#/, "");
  if (h === "feed") return { name: "feed" };
  if (h === "studio") return { name: "studio" };
  if (h === "agenda") return { name: "agenda" };
  if (h.startsWith("artiste-")) return { name: "artist", id: h.slice(8) };
  if (h.startsWith("don-")) return { name: "don", id: h.slice(4) };
  return { name: "landing" };
}

export const href = {
  landing: "#accueil",
  feed: "#feed",
  studio: "#studio",
  agenda: "#agenda",
  artist: (id: string) => `#artiste-${id}`,
  don: (id: string) => `#don-${id}`,
};

export function useRoute() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
