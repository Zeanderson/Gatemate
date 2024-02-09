import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import GLMap from "../components/Map";
import AnalysisBox from "../components/Analysis";
import WeatherBanner from "../components/WeatherBanner";
import UserBanner from "../components/UserBanner";

function checkSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await axios.get("/api/v1/user/session");
      return data.data;
    },
  });
}

function Header() {
  return (
    <div className="flex flex-row gap-2 font-Arvo font-bold">
      <WeatherBanner className={"flex flex-row gap-8 basis-11/12 "}>
        <div>{"Weather"}</div>
      </WeatherBanner>
      <UserBanner userName={"Field 1"} className={"basis-1/12"} />
    </div>
  );
}

function Map() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <GLMap />
      </div>
    </div>
  );
}

function FieldAnalysis() {
  return (
    <div>
      <AnalysisBox />
    </div>
  );
}

function Body() {
  return (
    <div className={"flex flex-row gap-2 font-Arvo font-bold min-h-2xl"}>
      <div className={"bg-indigo-950 items-center rounded-xl p-5 basis-2/3"}>
        <Map />
      </div>
      <div className={"bg-indigo-950 items-center rounded-xl p-5 basis-1/3"}>
        <FieldAnalysis />
      </div>
    </div>
  );
}

function FieldPage() {
  const session = checkSession();

  if (session.isLoading || session.data === undefined) {
    return <ClipLoader />;
  }

  // Session found can move on!
  if (session.data.status === "200") {
    return (
      <div className={"flex flex-col gap-2 p-2"}>
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

export default FieldPage;
