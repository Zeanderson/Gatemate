import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
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
import { FaChevronDown } from "react-icons/fa";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

type BannerProps = {
  className?: string;
};

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

function WeatherBar(weather: weatherData) {
  const dayClassName =
    "flex flex-row text-sm items-center gap-3 rounded-md p-2 bg-Corp2 ";

  const colClassName = "flex flex-col items-center gap-1";

  const date1 = new Date(weather[0].date * 1000);
  const day1 = date1.toLocaleDateString("en-US", { weekday: "short" });

  const date2 = new Date(weather[1].date * 1000);
  const day2 = date2.toLocaleDateString("en-US", { weekday: "short" });

  const date3 = new Date(weather[2].date * 1000);
  const day3 = date3.toLocaleDateString("en-US", { weekday: "short" });

  const date4 = new Date(weather[3].date * 1000);
  const day4 = date4.toLocaleDateString("en-US", { weekday: "short" });

  const date5 = new Date(weather[4].date * 1000);
  const day5 = date5.toLocaleDateString("en-US", { weekday: "short" });

  const date6 = new Date(weather[5].date * 1000);
  const day6 = date6.toLocaleDateString("en-US", { weekday: "short" });

  const date7 = new Date(weather[6].date * 1000);
  const day7 = date7.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="flex flex-row gap-10 items-center">
      <div className={dayClassName}>
        <div className={colClassName}>
          <p>{day1}</p>
          <WeatherIcon weather={weather[0].main} />
          <p>{weather[0].temp.day + " ℉"}</p>
        </div>
        <div className={colClassName}>
          <p>{(weather[0].pop * 100).toFixed(1) + "% of rain"}</p>
          <p>{weather[0].rain.toFixed(2) + " inches"}</p>
        </div>
      </div>

      <div className={dayClassName}>
        <div className={colClassName}>
          <p>{day2}</p>
          <WeatherIcon weather={weather[1].main} />
          <p>{weather[1].temp.day + " ℉"}</p>
        </div>
        <div className={colClassName}>
          <p>{(weather[1].pop * 100).toFixed(1) + "% of rain"}</p>
          <p>{weather[1].rain.toFixed(2) + " inches"}</p>
        </div>
      </div>

      <div className={dayClassName}>
        <div className={colClassName}>
          <p>{day3}</p>
          <WeatherIcon weather={weather[2].main} />
          <p>{weather[2].temp.day + " ℉"}</p>
        </div>
        <div className={colClassName}>
          <p>{(weather[2].pop * 100).toFixed(1) + "% of rain"}</p>
          <p>{weather[2].rain.toFixed(2) + " inches"}</p>
        </div>
      </div>

      <div className={dayClassName}>
        <div className={colClassName}>
          <p>{day4}</p>
          <WeatherIcon weather={weather[3].main} />
          <p>{weather[3].temp.day + " ℉"}</p>
        </div>
        <div className={colClassName}>
          <p>{(weather[3].pop * 100).toFixed(1) + "% of rain"}</p>
          <p>{weather[3].rain.toFixed(2) + " inches"}</p>
        </div>
      </div>

      <div className={dayClassName}>
        <div className={colClassName}>
          <p>{day5}</p>
          <WeatherIcon weather={weather[4].main} />
          <p>{weather[4].temp.day + " ℉"}</p>
        </div>
        <div className={colClassName}>
          <p>{(weather[4].pop * 100).toFixed(1) + "% of rain"}</p>
          <p>{weather[4].rain.toFixed(2) + " inches"}</p>
        </div>
      </div>

      <div className={dayClassName}>
        <div className={colClassName}>
          <p>{day6}</p>
          <WeatherIcon weather={weather[5].main} />
          <p>{weather[5].temp.day + " ℉"}</p>
        </div>
        <div className={colClassName}>
          <p>{(weather[5].pop * 100).toFixed(1) + "% of rain"}</p>
          <p>{weather[5].rain.toFixed(2) + " inches"}</p>
        </div>
      </div>

      <div className={dayClassName}>
        <div className={colClassName}>
          <p>{day7}</p>
          <WeatherIcon weather={weather[6].main} />
          <p>{weather[6].temp.day + " ℉"}</p>
        </div>
        <div className={colClassName}>
          <p>{(weather[6].pop * 100).toFixed(1) + "% of rain"}</p>
          <p>{weather[6].rain.toFixed(2) + " inches"}</p>
        </div>
      </div>
    </div>
  );
}

export function WeatherBanner(props: BannerProps) {
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
  //TODO Chevron actually does NOT make a clickable dropdown, but its there for show fix this :)
  return (
    <div
      className={
        props.className +
        " flex flex-row gap-8 items-center rounded-xl bg-Corp3 py-3 pl-3"
      }
    >
      <div
        className={
          "flex flex-row items-center gap-1 text-xs bg-Corp2 rounded-md p-2 "
        }
      >
        <Combobox className="lg:max-w-xs" openOnFocus={true}>
          <ComboboxInput
            className="bg-Corp2"
            spellCheck={false}
            placeholder="Fayetteville"
          />
          <ComboboxPopover className="bg-Corp2 p-2">
            <ComboboxList>
              <ComboboxOption
                className="hover:bg-slate-500 rounded-md transition-colors "
                value="Fayetteville"
                onClick={() => {
                  setWeatherArea("Fayetteville");
                }}
              />
              <ComboboxOption
                className="hover:bg-slate-500 rounded-md transition-colors "
                value="Simsboro"
                onClick={() => setWeatherArea("Simsboro")}
              />
              <ComboboxOption
                className="hover:bg-slate-500 rounded-md transition-colors "
                value="Magnolia"
                onClick={() => setWeatherArea("Magnolia")}
              />
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <FaChevronDown />
      </div>
      {weatherArea === "Fayetteville" ? <WeatherBar {...fayWeather} /> : null}

      {weatherArea === "Simsboro" ? <WeatherBar {...simWeather} /> : null}

      {weatherArea === "Magnolia" ? <WeatherBar {...magWeather} /> : null}
    </div>
  );
}

export default WeatherBanner;
