import { Schema, model } from 'mongoose';
import {
    IDailyWeather, IWeatherData, IUser, IGate, ITrafficReturn, 
    IDailyWeatherDoc, IWeatherDataDoc, IUserDoc, IGateDoc, ITrafficReturnDoc, 
    IDailyWeatherModel, IWeatherDataModel, IUserModel, IGateModel, ITrafficReturnModel 
}
from './interfaces'; 

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

// * Schema Definitions 

const DailyWeatherSchema: Schema<IDailyWeatherDoc> = new Schema(
    {
        dt: Date, 
        sunrise: Number, 
        sunset: Number, 
        temp: {
        day: Number, 
        min: Number, 
        max: Number, 
        night: Number, 
        eve: Number, 
        morn: Number
        }, 
        feels_like: {
        day: Number, 
        night: Number, 
        eve: Number, 
        morn: Number, 
        }, 
        pressure: Number, 
        humidity: Number, 
        dew_point: Number, 
        wind_speed: Number, 
        wind_deg: Number, 
        weather: [
        {
            id: Number,
            main: String,
            description: String,
            icon: String,
        }
        ],
        clouds: Number,
        pop: Number,
        rain: Number,
        uvi: Number,
    }, 
    {
        strict: "throw", 
        strictQuery: false 
    }
);

const WeatherDataSchema = new Schema<IWeatherDataDoc>(
    {
        presentDay: {
        weather: DailyWeatherSchema,
        },
        day1: {
        weather: DailyWeatherSchema,
        },
        day2: {
        weather: DailyWeatherSchema,
        },
        day3: {
        weather: DailyWeatherSchema,
        },
        day4: {
        weather: DailyWeatherSchema,
        },
        day5: {
        weather: DailyWeatherSchema,
        },
        day6: {
        weather: DailyWeatherSchema,
        },
        day7: {
        weather: DailyWeatherSchema,
        },
    }, 
    {
        strict: "throw", 
        strictQuery: false 
    }
);

const UserSchema = new Schema<IUserDoc>(
    {
        email: String, 
        password: String, 
    }, 
    {
        strict: "throw", 
        strictQuery: false 
    }
);

const GateSchema = new Schema<IGateDoc>(
    {
        idealWaterLevel: Number,
        threshold: Number,
        actualWaterLevel: Number,
        connectionError: Schema.Types.Boolean,
        lowBattery: Schema.Types.Boolean,
        status: String
    }, 
    {
        strict: "throw", 
        strictQuery: false 
    }
); 

const TrafficReturnSchema = new Schema<ITrafficReturnDoc>(
    {
        userId: Number,
        fieldId: Number,
        gates: [GateSchema],
    }, 
    {
        strict: "throw", 
        strictQuery: false 
    }
);

// * Static Method Definitions 

DailyWeatherSchema.statics.buildDailyWeather = (args: IDailyWeather) => {
    return new DailyWeather(args); 
}

WeatherDataSchema.statics.buildWeatherData = (args: IWeatherData) => {
    return new WeatherData(args); 
}

UserSchema.statics.buildUser = (args: IUser) => {
    return new User(args); 
}

GateSchema.statics.buildGate = (args: IGate) => {
    return new Gate(args); 
}

TrafficReturnSchema.statics.buildTrafficReturn = (args: ITrafficReturn) => {
    return new TrafficReturn(args); 
}

//* Model Instantiations 

export const DailyWeather = model<IDailyWeatherDoc, IDailyWeatherModel>("daily_weather", DailyWeatherSchema);
export const WeatherData = model<IWeatherDataDoc, IWeatherDataModel>("weather_data", WeatherDataSchema); 
export const User = model<IUserDoc, IUserModel>("users", UserSchema); 
export const Gate = model<IGateDoc, IGateModel>("gates", GateSchema); 
export const TrafficReturn = model<ITrafficReturnDoc, ITrafficReturnModel>("traffic_returns", TrafficReturnSchema); 