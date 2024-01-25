async function getWeather(location:string){
  const apiKey: string = process.env.weather_api_key ?? "";
  const apiUrl: string = process.env.weather_api_url ?? "";

  // Default to Fayetteville
  let lat = 36.061932;
  let lon = -94.160583;

  const lats = {
    Simsboro: 35.025371,
    Magnolia: 33.267076,
  }

  const lons = {
    Simsboro: -90.373155,
    Magnolia: -93.239384,
  } 

  if (location === "Simsboro") {
    lat = lats.Simsboro;
    lon = lons.Simsboro;
  } 

  if (location === "Magnolia") {
    lat = lats.Magnolia;
    lon = lons.Magnolia;
  }


  try {
    const response: Response = await fetch(
      `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    );

    if (!response.ok) {
      console.log(`Bad Response: ${response.status}`);
    }

    const weatherJson: any = await response.json();

    // Returning daily weather for the next 7 days (including today)
    return weatherJson.daily;
  } catch (error: any) {
    console.error("Error fetching weather data:", error.message);
  }
}

export default getWeather;
