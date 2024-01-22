export async function getWeather(lat: number, lon: number): Promise<any> {
  const apiKey: string = process.env.weather_api_key ?? "";
  const apiUrl: string = process.env.weather_api_url ?? "";

  try {
    const response: Response = await fetch(
      `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
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
