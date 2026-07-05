import type { CleanWeatherData } from "./api.js";

const dashboard = document.querySelector<HTMLDivElement>('#weather-dashboard-container');

export function renderToDashboard(result: PromiseSettledResult<CleanWeatherData>[]): void {
    if (!dashboard) return;

    const errorIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
    const retryIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v5h-5"/></svg>';

    dashboard.innerHTML = "";

    result.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';

        if (item.status === "fulfilled") {
            const data = item.value;

            card.innerHTML = `
                   <div class="sky">
                        <img src="${data.iconUrl}" alt="${data.description}">
                        <div class="cityName">${data.cityName}</div>
                        <div class="country">${data.country}</div>
                    </div>
                    <div class="body">
                        <div class="temp-row">
                        <div class="temp">${data.temperature}°<span>C</span></div>
                        <div class="description">${data.description}</div>
                        </div>
                        <div class="divider"></div>
                        <div class="humidity-row">
                        <span class="label">${data.humidityIcon} Humidity</span>
                        <span class="value">${data.humidity}%</span>
                        </div>
                    </div>
            `;
        } else {
            card.classList.add('error-card');
            card.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">${errorIcon}</div>
                    <div class="error-title">Couldn't load City</div>
                    <div class="error-subtext">Something went wrong while fetching this forecast.</div>
                    <button class="retry-btn" type="button">${retryIcon} Retry</button>
                </div>
            `;
        }

        dashboard.appendChild(card);
    });
}

export function toggleLoader(show: boolean): void{
    const loader = document.getElementById('loaderOverlay')
    
    if(!loader) return

    loader.style.display = show ? "flex" : "none"
}