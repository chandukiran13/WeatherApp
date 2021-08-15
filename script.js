const tempElement = document.querySelector(".tempValue p");
const descElement = document.querySelector(".tempDescription p");
const locationElement = document.querySelector(".location p");

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

// C to F conversion
function celsiusToFahrenheit(temp){
    return (temp * 9/5) + 32;
}

tempElement.addEventListener("click", function(){
    if(weather.temp.value === undefined) return;
    
    if(weather.temp.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temp.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temp.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temp.value}°<span>C</span>`;
        weather.temp.unit = "celsius"
    }
});