import filsDuSemnozWide from "./assets/img/fils-du-semnoz-wide.jpg";
import filsDuSemnozImg from "./assets/img/fils-du-semnoz.jpg";
import jamImg from "./assets/img/jam.jpg";
import luneBasseWide from "./assets/img/lune-basse-wide.jpg";
import luneBasseImg from "./assets/img/lune-basse.jpg";
import mathisOrayWide from "./assets/img/mathis-oray-wide.jpg";
import mathisOrayImg from "./assets/img/mathis-oray.jpg";
import mcFierWide from "./assets/img/mc-fier-wide.jpg";
import mcFierImg from "./assets/img/mc-fier.jpg";
import nadiaKWide from "./assets/img/nadia-k-wide.jpg";
import nadiaKImg from "./assets/img/nadia-k.jpg";
import rivage74Wide from "./assets/img/rivage-74-wide.jpg";
import rivage74Img from "./assets/img/rivage-74.jpg";
import talefreWide from "./assets/img/talefre-wide.jpg";
import talefreImg from "./assets/img/talefre.jpg";

// Données de démonstration. En production, elles viendront de Supabase
// (voir supabase/schema.sql) : artists, venues, events, follows, donations.

export const APP_NAME = "HAT";
/** Lancement national. La ville affichée est la position de l'utilisateur
 *  (ici Annecy pour la démo, les données de test étant situées autour d'Annecy). */
export const USER_CITY = "Annecy";

export type Genre = "rock" | "electro" | "jazz" | "chanson" | "hiphop" | "pop";
export type When = "soir" | "weekend" | "semaine" | "plus-tard";

export interface Artist {
  id: string;
  name: string;
  initials: string;
  genre: string;
  genreKey: Genre;
  city: string;
  /** Couleur de la vignette dans le feed */
  tileBg: string;
  tileFg: string;
  /** Couleur de profil choisie par l'artiste (bannière) */
  accent: string;
  acceptsDonations: boolean;
  /** Visuel carte (16:10) et bannière de profil */
  photo: string;
  banner: string;
  isNew: boolean;
  followers: number;
  tags: string[];
  links: { label: string; url: string }[];
}

export interface EventItem {
  id: string;
  artistId: string;
  /** Date ISO (AAAA-MM-JJ) */
  date: string;
  time: string;
  venue: string;
  city: string;
  /** Distance depuis la position de l'utilisateur, déjà formatée */
  distance: string | null;
  when: When;
  kind: string;
}

export const artists: Artist[] = [
  {
    id: "lune-basse",
    photo: luneBasseImg,
    banner: luneBasseWide,
    name: "Lune Basse",
    initials: "LB",
    genre: "Dream pop",
    genreKey: "pop",
    city: "Annecy",
    tileBg: "#F34213",
    tileFg: "#161032",
    accent: "#F34213",
    acceptsDonations: true,
    isNew: true,
    followers: 128,
    tags: ["Dream pop", "Shoegaze", "Synthés"],
    links: [
      { label: "Instagram", url: "https://www.instagram.com/" },
      { label: "Bandcamp", url: "https://bandcamp.com/" },
    ],
  },
  {
    id: "talefre",
    photo: talefreImg,
    banner: talefreWide,
    name: "Talèfre",
    initials: "TA",
    genre: "Post-rock",
    genreKey: "rock",
    city: "Annecy",
    tileBg: "#161032",
    tileFg: "#F34213",
    accent: "#161032",
    acceptsDonations: true,
    isNew: true,
    followers: 64,
    tags: ["Post-rock", "Instrumental"],
    links: [{ label: "Bandcamp", url: "https://bandcamp.com/" }],
  },
  {
    id: "rivage-74",
    photo: rivage74Img,
    banner: rivage74Wide,
    name: "Rivage 74",
    initials: "R7",
    genre: "Électro",
    genreKey: "electro",
    city: "Annecy-le-Vieux",
    tileBg: "#136F63",
    tileFg: "#FFFBFF",
    accent: "#136F63",
    acceptsDonations: false,
    isNew: false,
    followers: 211,
    tags: ["House", "DJ set"],
    links: [{ label: "SoundCloud", url: "https://soundcloud.com/" }],
  },
  {
    id: "nadia-k",
    photo: nadiaKImg,
    banner: nadiaKWide,
    name: "Nadia K.",
    initials: "NK",
    genre: "Soul / Jazz",
    genreKey: "jazz",
    city: "Annecy",
    tileBg: "#F34213",
    tileFg: "#161032",
    accent: "#F34213",
    acceptsDonations: true,
    isNew: true,
    followers: 97,
    tags: ["Soul", "Jazz", "Voix"],
    links: [{ label: "Instagram", url: "https://www.instagram.com/" }],
  },
  {
    id: "fils-du-semnoz",
    photo: filsDuSemnozImg,
    banner: filsDuSemnozWide,
    name: "Les Fils du Semnoz",
    initials: "FS",
    genre: "Folk rock",
    genreKey: "rock",
    city: "Annecy",
    tileBg: "#E4F0EE",
    tileFg: "#136F63",
    accent: "#136F63",
    acceptsDonations: true,
    isNew: false,
    followers: 342,
    tags: ["Folk", "Rock"],
    links: [{ label: "Spotify", url: "https://open.spotify.com/" }],
  },
  {
    id: "mathis-oray",
    photo: mathisOrayImg,
    banner: mathisOrayWide,
    name: "Mathis Oray",
    initials: "MO",
    genre: "Chanson",
    genreKey: "chanson",
    city: "Cran-Gevrier",
    tileBg: "#F6EFF6",
    tileFg: "#161032",
    accent: "#161032",
    acceptsDonations: true,
    isNew: true,
    followers: 45,
    tags: ["Chanson", "Guitare-voix"],
    links: [{ label: "Instagram", url: "https://www.instagram.com/" }],
  },
  {
    id: "mc-fier",
    photo: mcFierImg,
    banner: mcFierWide,
    name: "MC Fier",
    initials: "MF",
    genre: "Hip-hop",
    genreKey: "hiphop",
    city: "Seynod",
    tileBg: "#161032",
    tileFg: "#FFFBFF",
    accent: "#161032",
    acceptsDonations: false,
    isNew: false,
    followers: 156,
    tags: ["Rap", "Boom bap"],
    links: [{ label: "YouTube", url: "https://www.youtube.com/" }],
  },
];

export const events: EventItem[] = [
  {
    id: "e1",
    artistId: "talefre",
    date: "2026-10-10",
    time: "21:30",
    venue: "Le Brise Glace (club)",
    city: "Annecy",
    distance: "2,1 km",
    when: "soir",
    kind: "Concert",
  },
  {
    id: "e2",
    artistId: "rivage-74",
    date: "2026-10-10",
    time: "23:00",
    venue: "Bar partenaire",
    city: "Annecy-le-Vieux",
    distance: "3,4 km",
    when: "soir",
    kind: "DJ set",
  },
  {
    id: "e3",
    artistId: "lune-basse",
    date: "2026-10-16",
    time: "21:00",
    venue: "Le Brise Glace",
    city: "Annecy",
    distance: "2,1 km",
    when: "semaine",
    kind: "Concert",
  },
  {
    id: "e4",
    artistId: "nadia-k",
    date: "2026-10-17",
    time: "19:00",
    venue: "Jardins de l'Europe",
    city: "Annecy",
    distance: "800 m",
    when: "weekend",
    kind: "Plein air",
  },
  {
    id: "e5",
    artistId: "fils-du-semnoz",
    date: "2026-10-17",
    time: "20:30",
    venue: "Bar partenaire, Vieille Ville",
    city: "Annecy",
    distance: "900 m",
    when: "weekend",
    kind: "Concert",
  },
  {
    id: "e6",
    artistId: "mathis-oray",
    date: "2026-10-18",
    time: "17:00",
    venue: "Café-concert",
    city: "Cran-Gevrier",
    distance: "4,0 km",
    when: "weekend",
    kind: "Concert",
  },
  {
    id: "e7",
    artistId: "mc-fier",
    date: "2026-10-22",
    time: "20:30",
    venue: "Salle municipale",
    city: "Seynod",
    distance: "5,2 km",
    when: "semaine",
    kind: "Concert",
  },
  {
    id: "e8",
    artistId: "lune-basse",
    date: "2026-11-07",
    time: "20:30",
    venue: "Bonlieu Scène nationale",
    city: "Annecy",
    distance: "1,3 km",
    when: "plus-tard",
    kind: "Première partie",
  },
  {
    id: "e9",
    artistId: "lune-basse",
    date: "2026-11-21",
    time: "21:00",
    venue: "Bar partenaire, Vieille Ville",
    city: "Annecy",
    distance: "900 m",
    when: "plus-tard",
    kind: "Set acoustique",
  },
  {
    id: "e10",
    artistId: "lune-basse",
    date: "2026-12-05",
    time: "19:00",
    venue: "[Festival]",
    city: "Chambéry",
    distance: null,
    when: "plus-tard",
    kind: "Festival",
  },
  {
    id: "e11",
    artistId: "talefre",
    date: "2026-11-14",
    time: "21:00",
    venue: "Bar partenaire, Vieille Ville",
    city: "Annecy",
    distance: "900 m",
    when: "plus-tard",
    kind: "Concert",
  },
];

/** Le concert auquel l'utilisateur a assisté hier (déclenche la proposition de don). */
export const lastAttended = { artistId: "lune-basse", venue: "Le Brise Glace", label: "hier soir" };

const MONTHS = [
  "JAN",
  "FÉV",
  "MARS",
  "AVR",
  "MAI",
  "JUIN",
  "JUIL",
  "AOÛT",
  "SEPT",
  "OCT",
  "NOV",
  "DÉC",
];
const WEEKDAYS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  return {
    day: String(d || "").padStart(2, "0"),
    month: MONTHS[(m || 1) - 1],
    weekday: WEEKDAYS[date.getDay()],
  };
}

export function formatTime(t: string) {
  return t.replace(":", "h");
}

export function whenLabel(ev: EventItem) {
  if (ev.when === "soir") return `Ce soir · ${formatTime(ev.time)}`;
  const f = formatDate(ev.date);
  const wd = f.weekday.charAt(0).toUpperCase() + f.weekday.slice(1);
  return `${wd} ${Number(f.day)} · ${formatTime(ev.time)}`;
}

/** Visuels des dates sponsorisées (démo). */
export const sponsoredPhoto = jamImg;
