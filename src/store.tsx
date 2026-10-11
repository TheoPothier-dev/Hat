import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { type Artist, type EventItem, artists as baseArtists, events as baseEvents } from "./data";

// État de démonstration partagé entre les écrans (abonnements, agenda, dons,
// profil modifié dans le Studio). Il remplace temporairement le back-end.

export const STUDIO_ARTIST_ID = "lune-basse";

export interface Donation {
  artistId: string;
  amount: number;
  message: string;
  at: string;
}

interface StudioProfile {
  name: string;
  genre: string;
  city: string;
  bio: string;
  accent: string;
  acceptsDonations: boolean;
}

interface State {
  follows: string[];
  agenda: string[];
  donations: Donation[];
  studio: StudioProfile;
  addedEvents: EventItem[];
  removedEvents: string[];
}

const STORAGE_KEY = "hat-demo-v1";

const studioBase = baseArtists.find((a) => a.id === STUDIO_ARTIST_ID) as Artist;

const initialState: State = {
  follows: ["fils-du-semnoz"],
  agenda: ["e4", "e7"],
  donations: [],
  studio: {
    name: studioBase.name,
    genre: studioBase.genre,
    city: studioBase.city,
    bio: "",
    accent: studioBase.accent,
    acceptsDonations: studioBase.acceptsDonations,
  },
  addedEvents: [],
  removedEvents: [],
};

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...initialState, ...JSON.parse(raw) };
  } catch {
    /* stockage indisponible : on repart de l'état initial */
  }
  return initialState;
}

interface Store {
  artists: Artist[];
  events: EventItem[];
  state: State;
  artist: (id: string) => Artist | undefined;
  eventsOf: (artistId: string) => EventItem[];
  isFollowing: (id: string) => boolean;
  toggleFollow: (id: string) => void;
  follow: (id: string) => void;
  inAgenda: (eventId: string) => boolean;
  toggleAgenda: (eventId: string) => void;
  donate: (d: Omit<Donation, "at">) => void;
  updateStudio: (patch: Partial<StudioProfile>) => void;
  addEvent: (ev: Omit<EventItem, "id" | "artistId">) => void;
  removeEvent: (eventId: string) => void;
  reset: () => void;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignoré */
    }
  }, [state]);

  const store = useMemo<Store>(() => {
    const artists = baseArtists.map((a) =>
      a.id === STUDIO_ARTIST_ID
        ? {
            ...a,
            name: state.studio.name || a.name,
            genre: state.studio.genre,
            city: state.studio.city,
            accent: state.studio.accent,
            acceptsDonations: state.studio.acceptsDonations,
          }
        : a,
    );
    const events = [...baseEvents, ...state.addedEvents]
      .filter((e) => !state.removedEvents.includes(e.id))
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

    const toggleIn = (list: string[], id: string) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

    return {
      artists,
      events,
      state,
      artist: (id) => artists.find((a) => a.id === id),
      eventsOf: (artistId) => events.filter((e) => e.artistId === artistId),
      isFollowing: (id) => state.follows.includes(id),
      toggleFollow: (id) => setState((s) => ({ ...s, follows: toggleIn(s.follows, id) })),
      follow: (id) =>
        setState((s) => (s.follows.includes(id) ? s : { ...s, follows: [...s.follows, id] })),
      inAgenda: (eventId) => state.agenda.includes(eventId),
      toggleAgenda: (eventId) => setState((s) => ({ ...s, agenda: toggleIn(s.agenda, eventId) })),
      donate: (d) =>
        setState((s) => ({
          ...s,
          donations: [...s.donations, { ...d, at: new Date().toISOString() }],
        })),
      updateStudio: (patch) => setState((s) => ({ ...s, studio: { ...s.studio, ...patch } })),
      addEvent: (ev) =>
        setState((s) => ({
          ...s,
          addedEvents: [
            ...s.addedEvents,
            { ...ev, id: `new-${Date.now()}`, artistId: STUDIO_ARTIST_ID },
          ],
        })),
      removeEvent: (eventId) =>
        setState((s) => ({ ...s, removedEvents: [...s.removedEvents, eventId] })),
      reset: () => setState(initialState),
    };
  }, [state]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const s = useContext(StoreContext);
  if (!s) throw new Error("useStore doit être utilisé dans <StoreProvider>");
  return s;
}
