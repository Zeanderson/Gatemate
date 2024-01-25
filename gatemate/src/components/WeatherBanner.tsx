import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type BannerProps = {
    className?: string
    children: React.ReactNode
}

export function WeatherBanner(props: BannerProps) {
    return (
        <div className={"items-center rounded-xl bg-indigo-950 py-5 pl-5 max-w-[98rem] " + props.className}> 
            <FontAwesomeIcon icon={faCloudSunRain} size="2x"/>
            <h1>Weather</h1>
            {props.children}
        </div>
    )
}

export default WeatherBanner;