export type dailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
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
  wind_deg: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
};

export type weatherData = {
  presentDay: {
    weather: dailyWeather;
  };
  day1: {
    weather: dailyWeather;
  };
  day2: {
    weather: dailyWeather;
  };
  day3: {
    weather: dailyWeather;
  };
  day4: {
    weather: dailyWeather;
  };
  day5: {
    weather: dailyWeather;
  };
  day6: {
    weather: dailyWeather;
  };
  day7: {
    weather: dailyWeather;
  };
};

export type User = {
  email: string;
  password: string;
};
