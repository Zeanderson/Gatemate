type BannerProps = {
  className?: string;
  children: React.ReactNode;
};

export function WeatherBanner(props: BannerProps) {
  return (
    <div
      className={
        "items-center rounded-xl bg-Corp3 py-5 pl-5 " + props.className
      }
    >
      {props.children}
    </div>
  );
}

export default WeatherBanner;
