//TODO This is where calls to our database will be made
type WeatherData = {
    city: string;
    temperature: number;
    humidity: number;
}

export const fetchWeatherData = async (query = ""): Promise < WeatherData[] > => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const weatherData = [
        {
            "city": "New York",
            "temperature": 25,
            "humidity": 70
        },
        {
            "city": "London",
            "temperature": 18,
            "humidity": 80
        },
        {
            "city": "Tokyo",
            "temperature": 30,
            "humidity": 60
        },
        {
            "city": "Paris",
            "temperature": 22,
            "humidity": 75
        },
        {
            "city": "Sydney",
            "temperature": 28,
            "humidity": 65
        },
    ]

    return weatherData;
}