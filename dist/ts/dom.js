const dashboard = document.querySelector('#weather-dashboard-container');
export function renderToDashboard(result) {
    if (!dashboard)
        return;
    const errorIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
    const retryIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v5h-5"/></svg>';
    dashboard.innerHTML = "";
    result.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';
        if (item.status === "fulfilled") {
            const data = item.value;
            const visual = weatherVisual(data.description);
            card.innerHTML = `
                   <div class="sky ${visual.className}" style="${visual.gradient}">
                        ${visual.decor}
                        
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
        }
        else {
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
export function toggleLoader(show) {
    const loader = document.getElementById('loaderOverlay');
    if (!loader)
        return;
    loader.style.display = show ? "flex" : "none";
}
// Put this function helper at the bottom of your dom.ts file
function weatherVisual(description) {
    const d = description.toLowerCase();
    if (d.includes("night")) {
        return { className: "default", gradient: "background: linear-gradient(160deg, #274472 0%, #0f1c38 100%);", decor: "" };
    }
    if (d.includes("sun") || d.includes("clear")) {
        return { className: "sunny", gradient: "", decor: '<div class="sun-decor"></div>' };
    }
    if (d.includes("cloud")) { // Simplify: .includes("cloud") catches "cloudy" and "partly cloudy" automatically!
        return { className: "cloudy", gradient: "", decor: '<div class="cloud-decor cloud1"></div><div class="cloud-decor cloud2"></div>' };
    }
    if (d.includes("rain") || d.includes("drizzle") || d.includes("storm") || d.includes("snow") || d.includes("mist") || d.includes("fog")) {
        return { className: "default", gradient: "background: linear-gradient(160deg, #57768c 0%, #2f4a5c 100%);", decor: "" };
    }
    // Default daytime clear/blue sky fallback
    return { className: "default", gradient: "background: linear-gradient(160deg, #7fb8e8 0%, #3f7fc9 100%);", decor: "" };
}
//# sourceMappingURL=dom.js.map