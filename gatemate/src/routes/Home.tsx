import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

function fetchWeather() {
    return useQuery({
        queryKey: ['weather'],
        queryFn: async () => {
            const data = await axios.get('/api/v1/home/weather')
            return data
        }
    })
}

function Weather() {
    const { isLoading, data } = fetchWeather()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
                {data?.data?.weather?.map((item: any) => () => {
                    return (
                        <div>
                            <h2>{item.main}</h2>
                            <p>{item.description}</p>
                        </div>
                    )
                })}
        </div>
    )
}


function Home() {
    return (
    <div>
        <h1>Welcome to the Homepage</h1>
        <Weather />
    </div>
    )
}

export default Home;
