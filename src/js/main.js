import { API } from "./api.js";
import { userCoords } from "./getCoordenates.js";
import { icons } from "./icons.js";

const elements = {
    body: document.getElementById("body"),
    inpSearch: document.getElementById("inpSearch"),
    autoCompleteEl: document.getElementById("autoComplete"),
    conditionEl: document.getElementById("condition"),
    cityEl: document.getElementById("city"),
    iconLgEl: document.getElementById("icon-lg"),
    currentTempEl: document.getElementById("currentTemp"),
    hourEl: document.getElementById("hour"),
    completeDateEl: document.getElementById("complete-date"),
    humidityEl: document.getElementById("humidity"),
    windEl: document.getElementById("wind"),
    visibilityEl: document.getElementById("visibility"),
    pressureEl: document.getElementById("pressure"),
    scrollBtnLeft: document.getElementById("btn--scroll-left"),
    scrollBtnRight: document.getElementById("btn--scroll-right"),
    nextDaysContainerEl: document.getElementById("card__next-days"),
};
const scrollAmount = 375;
let delay;
let timerClock;

elements.scrollBtnLeft.addEventListener("click", () => {
    elements.nextDaysContainerEl.scrollBy({ left: -scrollAmount });
});
elements.scrollBtnRight.addEventListener("click", () => {
    elements.nextDaysContainerEl.scrollBy({ left: scrollAmount });
});

async function getUserCurrentCoords() {
    const userCurrentCoords = await userCoords();
    const lat = userCurrentCoords.coords.latitude;
    const lon = userCurrentCoords.coords.longitude;
    return { lat, lon };
}

async function searchCitySuggestions() {
    const inpValue = elements.inpSearch.value;
    elements.autoCompleteEl.innerHTML = "";
    if (inpValue.length >= 2) {
        const cities = await API.autoCompleteCity(inpValue);
        cities.forEach((city) => renderAutocomplete(city.name, city.region, city.country, city.url));
        elements.autoCompleteEl.classList.remove("hidden");
    }
}

async function getWeatherInfo(city) {
    const weatherInfo = await API.getWeatherInfo(city);
    return {
        city: weatherInfo.location.name,
        region: weatherInfo.location.region,
        country: weatherInfo.location.country,
        timezone: weatherInfo.location.tz_id,
        date: weatherInfo.location.localtime,
        // current
        tempC: weatherInfo.current.temp_c,
        conditionText: weatherInfo.current.condition.text,
        conditionIcon: getIconPath(weatherInfo.current.condition.code, weatherInfo.current.is_day),
        humidity: weatherInfo.current.humidity,
        wind: weatherInfo.current.wind_kph,
        visibility: weatherInfo.current.vis_km,
        pressure: weatherInfo.current.pressure_mb,
        isDay: weatherInfo.current.is_day,
        // forecast
        forecasts: weatherInfo.forecast.forecastday,
    };
}

async function handleSearch(url) {
    if (elements.inpSearch.value !== "") {
        const data = await getWeatherInfo(url);
        renderWeather(data);
    }
    elements.inpSearch.value = "";
}

async function handleWeatherUserCurrentLocation() {
    const userLocation = await getUserCurrentCoords();
    if (userLocation) {
        let lat = userLocation.lat;
        let lon = userLocation.lon;
        const data = await getWeatherInfo(`${lat},${lon}`);
        startClock(data.timezone);
        renderWeather(data);
    }
}

function renderWeather(data) {
    elements.conditionEl.innerText = data.conditionText;
    elements.iconLgEl.setAttribute("src", data.conditionIcon);
    elements.cityEl.innerText = `${data.city} - ${data.region}, ${data.country}`;
    elements.currentTempEl.innerText = `${data.tempC.toFixed(0)}°C`;
    elements.completeDateEl.innerText = formatDate(data.date, "long");
    elements.humidityEl.innerText = `${data.humidity}%`;
    elements.windEl.innerText = `${data.wind.toFixed(0)} km/h`;
    elements.visibilityEl.innerText = `${data.visibility.toFixed(0)} km`;
    elements.pressureEl.innerText = `${data.pressure} hPa`;
    elements.nextDaysContainerEl.replaceChildren();
    if (!data.isDay) {
        elements.body.classList.add("body-night");
        elements.autoCompleteEl.classList.add("autocomplete-night");
    } else {
        elements.body.classList.remove("body-night");
        elements.autoCompleteEl.classList.remove("autocomplete-night");
    }
    data.forecasts.slice(2).forEach((forecast) => {
        const card = createElement("div", "card__next-day-forecast");
        const cardWeekday = createElement("p", "card__week-day");
        const cardDate = createElement("p", "card__date");
        const cardImg = createElement("img", "card__icon card__icon--sm");
        const cardMaxTemp = createElement("p", "card__max-temp");
        const cardMinTemp = createElement("p", "card__min-temp");
        cardImg.setAttribute("src", getIconPath(forecast.day.condition.code, 1));
        cardWeekday.textContent = formatDate(forecast.date, "onlyWeekDay");
        cardDate.textContent = formatDate(forecast.date, "short");
        cardMaxTemp.textContent = forecast.day.maxtemp_c.toFixed(0) + "°C";
        cardMinTemp.textContent = forecast.day.mintemp_c.toFixed(0) + "°C";
        card.append(cardWeekday, cardDate, cardImg, cardMaxTemp, cardMinTemp);
        elements.nextDaysContainerEl.appendChild(card);
    });
    startClock(data.timezone);
}

function startClock(timezone) {
    const render = () => {
        const now = new Date();
        const timerFormated = new Intl.DateTimeFormat("us-EN", {
            timeStyle: "short",
            timeZone: timezone,
        }).format(now);
        elements.hourEl.textContent = timerFormated;
    };
    render();
    if (timerClock) clearInterval(timerClock);
    timerClock = setInterval(render, 1000);
}

function renderAutocomplete(city, region, country, url) {
    const li = createElement("li", "search-bar__autocomplete-item");
    li.textContent = `${city} - ${region}, ${country}`;
    elements.autoCompleteEl.appendChild(li);
    li.addEventListener("click", () => {
        elements.inpSearch.value = `${city} - ${region}, ${country}`;
        elements.autoCompleteEl.classList.add("hidden");
        handleSearch(url);
    });
}

function createElement(el, className) {
    const element = document.createElement(el);
    element.className = className;
    return element;
}

function formatDate(dateString, size) {
    const date = new Date(dateString);
    const options = {
        long: {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
        },
        short: {
            day: "numeric",
            month: "numeric",
        },
        onlyWeekDay: {
            weekday: "short",
        },
    };
    return date.toLocaleDateString("en-us", options[size]);
}

function getIconPath(code, isDay) {
    const iconName = icons[code];
    return `./src/assets/icons/animation-ready/${isDay ? iconName : iconName.replace("day", "night")}.svg`;
}

handleWeatherUserCurrentLocation();

elements.inpSearch.addEventListener("focus", () => {
    if (elements.inpSearch.value !== "") {
        clearTimeout(delay);
        delay = setTimeout(() => {
            searchCitySuggestions();
        }, 300);
    }
});
elements.inpSearch.addEventListener("input", () => {
    if (inpSearch.value.length < 2) {
        elements.autoCompleteEl.classList.add("hidden");
    }
    clearTimeout(delay);
    delay = setTimeout(() => {
        searchCitySuggestions();
    }, 300);
});
elements.inpSearch.addEventListener("blur", () => {
    setTimeout(() => {
        elements.autoCompleteEl.classList.add("hidden");
    }, 200);
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});

// ESSA AQUI GEMINI É A MINHA VERSÃO MAIS RECENTE
