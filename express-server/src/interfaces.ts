import { Document, Model } from "mongoose";
/*
* IF YOU WANT TO ADD A TYPE: 
  Suppose you want to add a type with name <type>. Then: 
    In ./interfaces.ts: 
    [1] Define the interface with name I<type>
    [2] Define the Document interface by extending both Document and the interface with name I<type>Doc
    [3] Define the Model interface by extending Model with generic parameter equal to your document 
        interface and name it I<type>Model. Declare a builder function which takes a single argument of 
        your interface from [1], and returns an instance of your document interface from [2]. 
    In ./models.ts: 
    [1] Import your interfaces from ./interfaces.ts 
    [2] Define the Schema using generic parameter equal to your document interface with name <type>Schema 
    [3] Define a static Schema method which 
    [4] Define the Model using the generic parameters equal to your document interface and model 
        interface with arguments equal to the collection name (should be the plural of <type>) and the 
        schema from [2], and name the model <type> 

    Alternatively: 

    [1] Send Ben a message on Discord to add it 

* See ./datasources/db.ts for information on how to use these types in code 
*/

// TODO: Add restrictions for fields based on what we need, e.g. forcing a field to be unique,
// TODO: adding bounds to a field, etc.

// * Interface Definitions
export interface IDailyWeather {
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
}

export interface IWeatherData {
  presentDay: {
    weather: IDailyWeather;
  };
  day1: {
    weather: IDailyWeather;
  };
  day2: {
    weather: IDailyWeather;
  };
  day3: {
    weather: IDailyWeather;
  };
  day4: {
    weather: IDailyWeather;
  };
  day5: {
    weather: IDailyWeather;
  };
  day6: {
    weather: IDailyWeather;
  };
  day7: {
    weather: IDailyWeather;
  };
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  fields: IField[];
}

export interface ISessionUser {
  email: string;
}

export interface IGate {
  gateId: number;
  idealWaterLevel: number;
  threshold: number;
  actualWaterLevel: number;
  connectionError: boolean;
  lowBattery: boolean;
  status: string;
  location: { lat: number; lon: number };
}

export interface ITrafficReturn {
  userId: number;
  fieldId: number;
  gates: IGate[];
}

export interface IField {
  fieldId: number;
  location: { lat: number; lon: number }[];
  Gates: IGate[];
}

// * Document Definitions

export interface IDailyWeatherDoc extends IDailyWeather, Document { }
export interface IWeatherDataDoc extends IWeatherData, Document { }
export interface IUserDoc extends IUser, Document { }
export interface IGateDoc extends IGate, Document { }
export interface ITrafficReturnDoc extends ITrafficReturn, Document { }
export interface IFieldDoc extends IField, Document { }

// * Model Definitions and declaration of builder methods

export interface IDailyWeatherModel extends Model<IDailyWeatherDoc> {
  buildDailyWeather(args: IDailyWeather): IDailyWeatherDoc;
}

export interface IWeatherDataModel extends Model<IWeatherDataDoc> {
  buildWeatherData(args: IWeatherData): IWeatherDataDoc;
}

export interface IUserModel extends Model<IUserDoc> {
  buildUser(args: IUser): IUserDoc;
}

export interface IGateModel extends Model<IGateDoc> {
  buildGate(args: IGate): IGateDoc;
}

export interface ITrafficReturnModel extends Model<ITrafficReturnDoc> {
  buildTrafficReturn(args: ITrafficReturn): ITrafficReturnDoc;
}

export interface IFieldModel extends Model<IFieldDoc> {
  buildTrafficReturn(args: IField): IFieldDoc;
}
