import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserBanner from "../components/UserBanner";
import { useState } from "react";
import WeatherBanner from "../components/WeatherBanner";
import GLMap from "../components/Map";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLinesVertical,
  faTemperatureHalf,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import AnalysisBox from "../components/Analysis";

type dailyWeather = {
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
    }
  ];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
};

type weatherData = [dailyWeather];

function fetchWeather(weatherArea: string, queryKey: string) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const data = await axios.get(`/api/v1/home/weather?input=${weatherArea}`);
      return data.data;
    },
  });
}

function Header() {
  const [weatherArea, setWeatherArea] = useState("Fayetteville");

  const fayettevilleWeather = fetchWeather("Fayetteville", "fay");
  const simsboroWeather = fetchWeather("Simsboro", "sim");
  const magnoliaWeather = fetchWeather("Magnolia", "mag");

  // If results are loading or undefined we can not rende r the data, therefore we need to return some sort of "loading" component to the user
  if (
    fayettevilleWeather.isLoading ||
    fayettevilleWeather === undefined ||
    simsboroWeather.isLoading ||
    simsboroWeather === undefined ||
    magnoliaWeather.isLoading ||
    magnoliaWeather === undefined
  ) {
    return <ClipLoader />;
  }

  const fayWeather: weatherData = fayettevilleWeather.data;
  const simWeather: weatherData = simsboroWeather.data;
  const magWeather: weatherData = magnoliaWeather.data;

  return (
    <div className={"flex flex-row gap-2 font-Arvo font-bold"}>
      <UserBanner
        userName={"Farmer Jeff"}
        settingsLink={"/"}
        signOutLink={"/"}
        className={"basis-1/4"}
      />
      <WeatherBanner className={"basis-3/4 flex flex-row gap-8 "}>
        <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
        <div className={"flex flex-col items-center gap-1 text-xs"}>
          <button
            className={`border border-solid border-gray-500 rounded-xl p-2 hover:bg-blue-500 ${
              weatherArea === "Fayetteville" ? "bg-blue-500" : ""
            }`}
            onClick={() => setWeatherArea("Fayetteville")}
          >
            Fayetteville, AR
          </button>
          <button
            className={`border border-solid border-gray-500 rounded-xl p-2 hover:bg-blue-500 ${
              weatherArea === "Simsboro" ? "bg-blue-500" : ""
            }`}
            onClick={() => setWeatherArea("Simsboro")}
          >
            Simsboro, AR{" "}
          </button>
          <button
            className={`border border-solid border-gray-500 rounded-xl p-2 hover:bg-blue-500 ${
              weatherArea === "Magnolia" ? "bg-blue-500" : ""
            }`}
            onClick={() => setWeatherArea("Magnolia")}
          >
            Magnolia, AR{" "}
          </button>
        </div>
        <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
        {weatherArea === "Fayetteville" ? (
          <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon icon={faTemperatureHalf} size={"2x"} />
            <div className="flex flex-col gap-1">
              <p>{"High: " + fayWeather[0].temp.max + "°F"}</p>
              <p>{"Low: " + fayWeather[0].temp.min + "°F"}</p>
              <p>{"Feels Like: " + fayWeather[0].feels_like.day + "°F"}</p>
            </div>
            <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
            <div className="flex flex-row">{fayWeather[0].summary}</div>
            <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
            <FontAwesomeIcon icon={faDroplet} size={"2x"} />
            <div className="flex flex-row gap-1">
              <p>{"Chance of rain: " + fayWeather[0].pop * 100 + "%"}</p>
            </div>
          </div>
        ) : null}

        {weatherArea === "Simsboro" ? (
          <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon icon={faTemperatureHalf} size={"2x"} />
            <div className="flex flex-col gap-1">
              <p>{"High: " + simWeather[0].temp.max + "°F"}</p>
              <p>{"Low: " + simWeather[0].temp.min + "°F"}</p>
              <p>{"Feels Like: " + simWeather[0].feels_like.day + "°F"}</p>
            </div>
            <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
            <div className="flex flex-row">{simWeather[0].summary}</div>
            <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
            <FontAwesomeIcon icon={faDroplet} size={"2x"} />
            <div className="flex flex-row gap-1">
              <p>{"Chance of rain: " + simWeather[0].pop * 100 + "%"}</p>
            </div>
          </div>
        ) : null}

        {weatherArea === "Magnolia" ? (
          <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon icon={faTemperatureHalf} size={"2x"} />
            <div className="flex flex-col gap-1">
              <p>{"High: " + magWeather[0].temp.max + "°F"}</p>
              <p>{"Low: " + magWeather[0].temp.min + "°F"}</p>
              <p>{"Feels Like: " + magWeather[0].feels_like.day + "°F"}</p>
            </div>
            <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
            <div className="flex flex-row">{magWeather[0].summary}</div>
            <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
            <FontAwesomeIcon icon={faDroplet} size={"2x"} />
            <div className="flex flex-row gap-1">
              <p>{"Chance of rain: " + magWeather[0].pop * 100 + "%"}</p>
            </div>
          </div>
        ) : null}
      </WeatherBanner>
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

// The "Top Level" component ( really the bottom function on the page ) is the one that is exported, and usually we do not want ~logic there
// We only want to render the data, so we create a new component called Weather that will handle the logic and rendering of the data ( This keeps organzation clean, and debugging easy )

function Home() {
  return (
    <div className={"flex flex-col gap-2 p-2"}>
      <Header />
      <Body />
    </div>
  );
}

export default Home;
