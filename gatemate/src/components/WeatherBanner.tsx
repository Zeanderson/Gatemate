type BannerProps = {
    className?: string
    children: React.ReactNode
}

export function WeatherBanner(props: BannerProps) {
    return (
        <div className={"rounded-xl bg-indigo-950 py-5 pl-5 " + props.className}> 
            {props.children}
        </div>
    )
}

export default WeatherBanner;