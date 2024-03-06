import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserBanner from "../components/UserBanner";
import WeatherBanner from "../components/WeatherBanner";
import GLMap from "../components/Map";
import ClipLoader from "react-spinners/ClipLoader";
import AnalysisBox from "../components/Analysis";
import "@reach/combobox/styles.css";

function checkSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await axios.get("/api/v1/user/session");
      return data.data;
    },
  });
}

function getUser() {
  //TODO - Get user data
}

function Header() {
  return (
    <div className={"flex flex-row gap-2 font-Arvo font-bold"}>
      {/* <WeatherBanner className={"basis-11/12"} /> */}
      <UserBanner userName={"Welcome Jeremiah"} className={"basis-1/12"} />
    </div>
  );
}

function Body() {
  return (
    <div className={"flex flex-row gap-2 font-Arvo font-bold"}>
      <GLMap className="basis-10/12" />
      <AnalysisBox className="basis-2/12" />
    </div>
  );
}

// The "Top Level" component ( really the bottom function on the page ) is the one that is exported, and usually we do not want ~logic there
// We only want to render the data, so we create a new component called Weather that will handle the logic and rendering of the data ( This keeps organzation clean, and debugging easy )

function Home() {
  const session = checkSession();

  if (session.isLoading || session.data === undefined) {
    return <ClipLoader />;
  }

  // Session found can move on!
  if (session.data.status === "200") {
    return (
      <div className="flex flex-col gap-2 p-2">
        <Header />
        <Body />
      </div>
    );
  }

  // Session not found, go back to sign-in
  if (session.data.status === "404") {
    window.location.href = `/`;
  }
}

export default Home;
