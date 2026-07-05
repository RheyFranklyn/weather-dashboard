const Base_URL = "https://api.weatherapi.com/v1/current.json";
const api_key = "05a55ba00ad847bfb8733946260507";
export async function getWeather(city) {
    const response = await fetch(`${Base_URL}?key=${api_key}&q=${city}&aqi=no`);
    if (!response.ok) {
        throw new Error(`Weather data fetch failed: ${response.statusText}`);
    }
    const data = await response.json();
    return {
        cityName: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        humidity: data.current.humidity,
        iconUrl: `https:${data.current.condition.icon}`,
        humidityIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7s6.5 7 6.5 11.3a6.5 6.5 0 0 1-13 0C5.5 9.7 12 2.7 12 2.7Z"/></svg>`
    };
}
//# sourceMappingURL=api.js.map