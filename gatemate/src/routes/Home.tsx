import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import UserBanner from '../components/UserBanner';
import WeatherBanner from '../components/WeatherBanner';

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

function Header() {
    const results = fetchWeather()

    // If results are loading or undefined we can not render the data, therefore we need to return some sort of "loading" component to the user
    if (results.isLoading || results === undefined) {
        return <div>{"Loading"}</div>
    }

    return (
        <div className={'flex flex-row gap-2 font-Arvo font-bold'}>
                <UserBanner userName={"Farmer Jeff"} settingsLink={'/'} signOutLink={'/'} className={'basis-1/4'}/>
                <WeatherBanner className={'basis-3/4'}>
                    <div className={'flex flex-row gap-2'}>
                        {results.data.map((weather: Weather,index: number) => {
                            return (
                                <div className={'flex flex-row gap-1'} key={index}>
                                    <h2>{weather.city}</h2>
                                    <p>Temperature: {weather.temperature}</p>
                                    <p>Humidity: {weather.humidity}</p>
                                </div>
                            )
                        })}
                    </div>
                </WeatherBanner>
        </div>
        // <div>
        //     {"Hello everyone"}
        // </div>
    )
}

function FieldMap() {
    return (
        <div>
            <h1>{"Field Map"}</h1>
        </div>
    )
}

function FieldAnalysis() {
    return (
        <div>
            <h1>{"Field Analysis"}</h1>
        </div>
    )
}





// The "Top Level" component ( really the bottom function on the page ) is the one that is exported, and usually we do not want ~logic there 
// We only want to render the data, so we create a new component called Weather that will handle the logic and rendering of the data ( This keeps organzation clean, and debugging easy )

function Home() {
    return (
    <div className={'flex flex-col gap-2 p-2'}>
        <Header/>
        <FieldMap/>
        <FieldAnalysis/>
    </div>
    )
}

export default Home;
