import { renderToDashboard, toggleLoader } from "./dom.js";
import { getWeather } from "./api.js";
async function loadDefaultWeather() {
    const dashboard = document.querySelector('#weather-dashboard-container');
    const defaultLocations = ["Londdon", "New York", "Tokyo"];
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
                <div class="error-card">
                    <h3>Application Error</h3>
                    <p>Something went wrong initializing the dashboard. Please try again later.</p>
                </div>
            `;
        }
        toggleLoader(false);
    }
}
loadDefaultWeather();
//# sourceMappingURL=app.js.map