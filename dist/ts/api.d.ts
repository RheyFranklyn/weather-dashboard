export interface CleanWeatherData {
    cityName: string;
    country: string;
    temperature: number;
    description: string;
    humidity: number;
    iconUrl: string;
    humidityIcon: string;
}
export declare function getWeather(city: string): Promise<CleanWeatherData>;
//# sourceMappingURL=api.d.ts.map