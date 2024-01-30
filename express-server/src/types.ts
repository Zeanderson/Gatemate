/*
* IF YOU WANT TO ADD A TYPE: 
    IF the type you want to add will be stored in the database, then you must complete the following steps: 
    [1.] The type must be extended by the type "collectionName". 
    [2.] The type must be added to the union type "validDBType". 
    [3.] The name of the type must be added as a string into the list "validCollectionNames". 

    After these steps, all database operations defined in db.ts will work on this type. Please consult db.ts 
    for the reasons why we do this. 
    EXAMPLE: If we have the type Spell defined as: 

    export type Spell = {
      name: string, 
      damage: number, 
    }

    Then we would extend it: 

    export type Spell = collectionName & {
      name: string, 
      damage: number, 
    }

    add it to the union type: 

    export type validDBType = ExampleType1 | ExampleType2 | Spell; 

    and add the name to the list: 

    export const validCollectionNames = ["ExampleType1", "ExampleType2", "Spell"]; 
*/

type collectionName = {
  collectionName: string 
}

export type validDBType           =   dailyWeather |  weatherData |  User; 
export const validCollectionNames = ["dailyWeather", "weatherData", "User"]; 

export type dailyWeather = collectionName & {
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

export type weatherData = collectionName & {
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

export type User = collectionName & {
  email: string;
  password: string;
};
