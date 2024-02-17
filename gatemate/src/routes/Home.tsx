import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserBanner from "../components/UserBanner";
import { useState } from "react";
import WeatherBanner from "../components/WeatherBanner";
import GLMap from "../components/Map";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faCloudBolt,
  faCloudShowersHeavy,
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
  date: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  description: string;
  main: string;
  rain: number;
  pop: number;
};

type weatherData = dailyWeather[];
type weatherIconType = {
  weather: string;
};

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

function WeatherIcon({ weather }: weatherIconType) {
  if (weather === "Thunderstorm") {
    return <FontAwesomeIcon icon={faCloudBolt} />;
  }
  if (weather === "Drizzle") {
    return <FontAwesomeIcon icon={faCloudRain} />;
  }
  if (weather === "Rain") {
    return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  }
  if (weather === "Snow") {
    return <FontAwesomeIcon icon={faSnowflake} />;
  }
  if (weather === "Clear") {
    return <FontAwesomeIcon icon={faSun} />;
  }
  if (weather === "Clouds") {
    return <FontAwesomeIcon icon={faCloudSun} />;
  }
  return <FontAwesomeIcon icon={faCloudSun} />;
}

function Header() {
  const dayClassName =
    "flex flex-row text-sm items-center gap-2 border border-solid rounded-md p-2 bg-Corp2 ";
  const colClassName = "flex flex-col items-center gap-1";
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

  const date1 = new Date(fayWeather[0].date * 1000);
  const day1 = date1.toLocaleDateString("en-US", { weekday: "short" });

  const date2 = new Date(fayWeather[1].date * 1000);
  const day2 = date2.toLocaleDateString("en-US", { weekday: "short" });

  const date3 = new Date(fayWeather[2].date * 1000);
  const day3 = date3.toLocaleDateString("en-US", { weekday: "short" });

  const date4 = new Date(fayWeather[3].date * 1000);
  const day4 = date4.toLocaleDateString("en-US", { weekday: "short" });

  const date5 = new Date(fayWeather[4].date * 1000);
  const day5 = date5.toLocaleDateString("en-US", { weekday: "short" });

  const date6 = new Date(fayWeather[5].date * 1000);
  const day6 = date6.toLocaleDateString("en-US", { weekday: "short" });

  const date7 = new Date(fayWeather[6].date * 1000);
  const day7 = date7.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className={"flex flex-row gap-2 font-Arvo font-bold"}>
      <WeatherBanner className={"flex flex-row gap-8 basis-11/12 "}>
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
        {weatherArea === "Fayetteville" ? (
          <div className="flex flex-row gap-10 items-center">
            <div className={dayClassName}>
              <div className={colClassName}>
                <p>{day1}</p>
                <WeatherIcon weather={fayWeather[0].main} />
                <p>{fayWeather[0].temp.day + " ℉"}</p>
              </div>
              <div className={colClassName}>
                <p>{fayWeather[0].pop * 100 + "% of rain"}</p>
                <p>{fayWeather[0].rain.toFixed(2) + " inches"}</p>
              </div>
            </div>

            <div className={dayClassName}>
              <div className={colClassName}>
                <p>{day2}</p>
                <WeatherIcon weather={fayWeather[1].main} />
                <p>{fayWeather[1].temp.day + " ℉"}</p>
              </div>
              <div className={colClassName}>
                <p>{fayWeather[1].pop * 100 + "% of rain"}</p>
                <p>{fayWeather[1].rain.toFixed(2) + " inches"}</p>
              </div>
            </div>

            <div className={dayClassName}>
              <div className={colClassName}>
                <p>{day3}</p>
                <WeatherIcon weather={fayWeather[2].main} />
                <p>{fayWeather[2].temp.day + " ℉"}</p>
              </div>
              <div className={colClassName}>
                <p>{fayWeather[2].pop * 100 + "% of rain"}</p>
                <p>{fayWeather[2].rain.toFixed(2) + " inches"}</p>
              </div>
            </div>

            <div className={dayClassName}>
              <div className={colClassName}>
                <p>{day4}</p>
                <WeatherIcon weather={fayWeather[3].main} />
                <p>{fayWeather[3].temp.day + " ℉"}</p>
              </div>
              <div className={colClassName}>
                <p>{fayWeather[3].pop * 100 + "% of rain"}</p>
                <p>{fayWeather[3].rain.toFixed(2) + " inches"}</p>
              </div>
            </div>

            <div className={dayClassName}>
              <div className={colClassName}>
                <p>{day5}</p>
                <WeatherIcon weather={fayWeather[4].main} />
                <p>{fayWeather[4].temp.day + " ℉"}</p>
              </div>
              <div className={colClassName}>
                <p>{fayWeather[4].pop * 100 + "% of rain"}</p>
                <p>{fayWeather[4].rain.toFixed(2) + " inches"}</p>
              </div>
            </div>

            <div className={dayClassName}>
              <div className={colClassName}>
                <p>{day6}</p>
                <WeatherIcon weather={fayWeather[5].main} />
                <p>{fayWeather[5].temp.day + " ℉"}</p>
              </div>
              <div className={colClassName}>
                <p>{fayWeather[5].pop * 100 + "% of rain"}</p>
                <p>{fayWeather[5].rain.toFixed(2) + " inches"}</p>
              </div>
            </div>

            <div className={dayClassName}>
              <div className={colClassName}>
                <p>{day7}</p>
                <WeatherIcon weather={fayWeather[6].main} />
                <p>{fayWeather[6].temp.day + " ℉"}</p>
              </div>
              <div className={colClassName}>
                <p>{fayWeather[6].pop * 100 + "% of rain"}</p>
                <p>{fayWeather[6].rain.toFixed(2) + " inches"}</p>
              </div>
            </div>
          </div>
        ) : null}

        {weatherArea === "Simsboro" ? (
          <div className="flex flex-row gap-6 items-center">
            <p>{simWeather[0].temp.day + " ℉"}</p>
            <p>{simWeather[0].rain * 100 + "% chance of rainfall"}</p>
          </div>
        ) : null}

        {weatherArea === "Magnolia" ? (
          <div className="flex flex-row gap-6 items-center">
            <p>{magWeather[0].temp.day + " ℉"}</p>
            <p>{magWeather[0].rain * 100 + "% chance of rainfall"}</p>
          </div>
        ) : null}
      </WeatherBanner>
      <UserBanner userName={"Welcome Jeremiah"} className={"basis-1/12"} />
    </div>
  );
}

function Map() {
  return (
    <div>
      <GLMap />
    </div>
  );
}

function Body() {
  return (
    <div className={"flex flex-row gap-2 font-Arvo font-bold"}>
      <div className="border-4 border-solid rounded-3xl border-Corp3">
        <Map />
      </div>
      <div className={"items-center rounded-xl p-5 bg-Corp3"}>
        <AnalysisBox />
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
