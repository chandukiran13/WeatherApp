const tempElement = document.querySelector("button");
const descElement = document.querySelector("h3");
const locationElement = document.querySelector("h5");

const weather = {};

weather.temp = {
    unit : "celsius"
}

const KELVIN = 273;

const key = "8e2487f06e40e18330ac4adc6c2e5e45";

getWeather("nandyal");
function getWeather(city_name){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temp.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    tempElement.innerHTML = `${weather.temp.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}


function celsiusToFahrenheit(){
    if (weather.temp.unit == "celsius"){
        let fahrenheit = (weather.temp.value * 9/5) + 32;
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temp.unit = "fahrenheit"
    }else{
        tempElement.innerHTML = `${weather.temp.value}°<span>C</span>`;
        weather.temp.unit = "celsius"
    }
}

