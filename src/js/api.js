import { apiKey } from "../environment/key.js";

async function getWeatherInfo(city) {
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=9&aqi=no&alerts=no`;
        const response = await fetch(url);
        const results = await response.json();
        return results;
    } catch (error) {
        alert("Erro ao buscar informações do clima: " + error.message);
    }
}

async function autoCompleteCity(city) {
    try {
        const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`;
        const response = await fetch(url);
        const results = await response.json();
        return results;
    } catch (error) {
        alert("Erro ao buscar nomes para o autocomplete! " + error.message);
    }
}

export const API = { getWeatherInfo, autoCompleteCity };
