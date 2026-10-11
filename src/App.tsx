import { AppHeader, MobileTabBar } from "./components/AppShell";
import { Agenda } from "./pages/Agenda";
import { ArtistPage } from "./pages/Artist";
import { DonPage } from "./pages/Don";
import { Feed } from "./pages/Feed";
import { Landing } from "./pages/Landing";
import { Studio } from "./pages/Studio";
import { useRoute } from "./router";

export function App() {
  const route = useRoute();

  if (route.name === "landing") return <Landing />;

  return (
    <>
      {route.name !== "studio" && <AppHeader route={route} />}
      {route.name === "feed" && <Feed />}
      {route.name === "agenda" && <Agenda />}
      {route.name === "studio" && <Studio />}
      {route.name === "artist" && <ArtistPage key={route.id} id={route.id} />}
      {route.name === "don" && <DonPage key={route.id} id={route.id} />}
      <MobileTabBar route={route} />
    </>
  );
}
