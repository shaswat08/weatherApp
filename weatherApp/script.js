const weatherForm = document.querySelector(".weather-form")
const inputBox = document.querySelector(".input-box");
const card = document.querySelector(".card");
const apiKey = "78ff250df015b5d27479c8f0292b23a9";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = inputBox.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        }

        catch(error){
            console.error(error);
            displayError(error);
        }
    }

    else{
        displayError("Enter a valid city name");
    }

});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Couldn't fetch Data");
    }

    return await response.json();
};

function displayWeather(data){
    const {name: city, main: {temp, humidity}, weather: [{id, description}]} = data;

    card.textContent = ""

    const cityName = document.createElement("h2");
    const tempDisplay = document.createElement("p");
    const humidDisplay = document.createElement("p");
    const weatherDesc = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityName.textContent = city;
    cityName.classList.add("city-name");
    card.style.display = "flex";
    card.appendChild(cityName);

    tempDisplay.textContent = `${(temp - 273.6).toFixed(1)}°C`;
    tempDisplay.classList.add("temp-display");
    card.style.display = "flex";
    card.appendChild(tempDisplay);

    humidDisplay.textContent = humidity;
    humidDisplay.classList.add("humid-display");
    card.style.display = "flex";
    card.appendChild(humidDisplay);

    weatherDesc.textContent = description;
    weatherDesc.classList.add("weather-desc");
    card.style.display = "flex";
    card.appendChild(weatherDesc);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weather-emoji");
    card.style.display = "flex";
    card.appendChild(weatherEmoji);
};

function getWeatherEmoji(weatherId){

    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈";
        case(weatherId >= 300 && weatherId < 400):
            return "☔";
        case(weatherId >= 500 && weatherId < 600):
            return "🌧";
        case(weatherId >= 600 && weatherId < 700):
            return "❄";
        case(weatherId >= 700 && weatherId < 800):
            return "🌫";
        case weatherId === 800:
            return "🌞";
        case(weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "?";
    }

};

function displayError(message){
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error-display");
    errorMsg.textContent = message;
    card.textContent = "";
    card.appendChild(errorMsg);
    card.style.display = "flex";
};