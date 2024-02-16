type BannerProps = {
  className?: string;
  children: React.ReactNode;
};

export function WeatherBanner(props: BannerProps) {
  return (
    <div
      className={
        "items-center rounded-xl bg-Corp3 py-3 pl-3 " + props.className
      }
    >
      {props.children}
    </div>
  );
}

export default WeatherBanner;
