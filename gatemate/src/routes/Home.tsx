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
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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
      <WeatherBanner className={"flex flex-row gap-8 basis-11/12 "}>
        <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
        <div className={"flex flex-col items-center gap-1 text-xs"}>
          <Combobox className="max-w-xs" openOnFocus={true}>
            <ComboboxInput
              className="bg-Corp2 rounded-md p-2"
              placeholder={"Fayetteville"}
              spellCheck={false}
            />
            <ComboboxPopover className="bg-Corp2 p-2">
              <ComboboxList defaultValue={"Hello"}>
                <ComboboxOption
                  className="hover:bg-slate-500 rounded-md"
                  value="Fayetteville"
                  onClick={() => {
                    setWeatherArea("Fayetteville");
                  }}
                />
                <ComboboxOption
                  className="hover:bg-slate-500 rounded-md"
                  value="Simsboro"
                  onClick={() => setWeatherArea("Simsboro")}
                />
                <ComboboxOption
                  className="hover:bg-slate-500 rounded-md"
                  value="Magnolia"
                  onClick={() => setWeatherArea("Magnolia")}
                />
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>
        <FontAwesomeIcon icon={faGripLinesVertical} size={"2xl"} />
        {weatherArea === "Fayetteville" ? (
          <div className="flex flex-row gap-6 items-center">
            <FontAwesomeIcon icon={faTemperatureHalf} size={"2x"} />
            <div className="flex flex-row gap-1">
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
            <div className="flex flex-row gap-1">
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
            <div className="flex flex-row gap-1">
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
      <UserBanner userName={"Welcome Jeremiah"} className={"basis-1/12"} />
    </div>
  );
}

function Map() {
  return (
    // <div className="flex flex-col gap-2">
    <div>
      <GLMap />
    </div>
    // {/* </div> */}
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
    <div className={"flex flex-row gap-2 font-Arvo font-bold"}>
      <div className="border-4 border-solid rounded-3xl border-Corp3">
        <Map />
      </div>
      <div className={"items-center rounded-xl p-5  bg-Corp3"}>
        <FieldAnalysis />
      </div>
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

export default Home;
