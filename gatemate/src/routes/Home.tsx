import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

type Weather = {
    city: string
    temperature: number
    humidity: number
}

function fetchWeather() {
    return useQuery({
        queryKey: ['weather'],
        queryFn: async () => {
            const data = await axios.get('/api/v1/home/weather')
            return data.data
        }
    })
}

function Weather() {
    const results = fetchWeather()

    // If results are loading or undefined we can not render the data, therefore we need to return some sort of "loading" component to the user
    if (results.isLoading || results === undefined) {
        return <div>{"Loading"}</div>
    }

    return (
        <div>
            <h1>Weather</h1>
            {results.data.map((weather: Weather,index: number) => {
                return (
                    <div key={index}>
                        <h2>{weather.city}</h2>
                        <p>Temperature: {weather.temperature}</p>
                        <p>Humidity: {weather.humidity}</p>
                    </div>
                )
            })}
        </div>
    )
}

// The "Top Level" component ( really the bottom function on the page ) is the one that is exported, and usually we do not want ~logic there 
// We only want to render the data, so we create a new component called Weather that will handle the logic and rendering of the data ( This keeps organzation clean, and debugging easy )

function Home() {
    return (
    <div>
        <h1>Welcome to the Homepage</h1>
        <Weather />
    </div>
    )
}

export default Home;
