import { renderToDashboard, toggleLoader } from "./dom.js";
import { getWeather } from "./api.js";
const errorIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
const retryIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v5h-5"/></svg>';
async function loadDefaultWeather() {
    const dashboard = document.querySelector('#weather-dashboard-container');
    const defaultLocations = ["Canada", "New York", "Tokyo"];
    toggleLoader(true);
    try {
        const promises = defaultLocations.map((item) => getWeather(item));
        const result = await Promise.allSettled(promises);
        renderToDashboard(result);
        toggleLoader(false);
    }
    catch (error) {
        if (dashboard) {
            dashboard.innerHTML = dashboard.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">${errorIcon}</div>
                    <div class="error-title">Couldn't load City</div>
                    <div class="error-subtext">Something went wrong initializing the dashboard. Please try again later.</div>
                    <button class="retry-btn" type="button">${retryIcon} Retry</button>
                </div>
            `;
        }
        toggleLoader(false);
    }
}
loadDefaultWeather();
//# sourceMappingURL=app.js.map