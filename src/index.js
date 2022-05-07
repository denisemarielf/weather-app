import { fromUnixTime, format, locale} from 'date-fns'

const cityInput =  document.getElementById('city-input');
const form = document.querySelector('form');
const unitsOfMeasurement = document.querySelectorAll(".unit-of-measurement")
const lenghtUnit = document.getElementById('lenght-unit')
const buttonsUnit = document.querySelectorAll("#metric,#imperial")

buttonsUnit.forEach((button => {
    button.addEventListener('click', function(){
        if (button.getAttribute('id') === 'metric') {
            info.unit = 'metric';
            getWeather(info.cityInput, info.unit)
            button.setAttribute('class', 'selected')
            buttonsUnit[1].removeAttribute('class')
        } else {
            info.unit = 'imperial'
            getWeather(info.cityInput, info.unit);
            button.setAttribute('class', 'selected')
            buttonsUnit[0].removeAttribute('class')
        }
    })
}))

function setUnitOfMeasurement(unitOfMeasurement) {
    unitsOfMeasurement.forEach((unit) => {
        unit.innerHTML= unitOfMeasurement;
    })
}

let info = {
    cityInput: 'buenos aires',
    unit: 'metric',
}


async function getWeather(city, unit) {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + unit + '&APPID=bf4889f5db8bf85d0f2f84f48098efff', {mode: 'cors'})
        const weatherData = await response.json();
            info.city = weatherData.name,
            info.country = weatherData.sys.country,
            info.main = weatherData.weather[0].main,
            info.description = weatherData.weather[0].description,
            info.temp = Math.floor(weatherData.main.temp),
            info.tempMax= "MAX " + Math.floor(weatherData.main.temp_max),
            info.tempMin = "MIN " + Math.floor(weatherData.main.temp_min),
            info.feelsLike = Math.floor(weatherData.main.feels_like),
            info.humidity = weatherData.main.humidity + " %",
            info.pressure = weatherData.main.pressure + " mb",
            info.sunrise = format(fromUnixTime(weatherData.sys.sunrise), "p"),
            info.sunset = format(fromUnixTime(weatherData.sys.sunset), "p"),
            info.wind = weatherData.wind.speed;
            info.date = format(new Date(), "iiii', 'HH:mm")
            info.visibility = weatherData.visibility;
        displayWeather()
        return weatherData;
    }
    catch (error){
        document.querySelector('small').style.display = 'flex';
    }
}

getWeather(info.cityInput, info.unit)

function displayWeather(){
    document.getElementById('temp').innerHTML=info.temp;
    document.getElementById('date').innerHTML=info.date;
    document.getElementById('main').innerHTML=info.main;
    document.getElementById('description').innerHTML=info.description;
    document.querySelector('#city-container>p').innerHTML=info.city+", "+info.country;
    document.getElementById('max-temp').innerHTML=info.tempMax;
    document.getElementById('min-temp').innerHTML=info.tempMin;
    document.getElementById('wind').innerHTML=info.wind;
    document.getElementById('humidity').innerHTML=info.humidity;
    document.getElementById('visibility').innerHTML=info.visibility;
    document.getElementById('sunrise').innerHTML=info.sunrise;
    document.getElementById('sunset').innerHTML=info.sunset;
    document.getElementById('pressure').innerHTML=info.pressure;
    document.querySelector('img').src="images/"+info.main.toLowerCase()+".png";
    document.querySelector('small').style.display = 'none';
    if(info.unit === 'metric') {
        setUnitOfMeasurement('°C')
        lenghtUnit.innerHTML = 'km/h'
    }else{
        setUnitOfMeasurement('°F')
            lenghtUnit.innerHTML = "mph"
    }
    
}


form.addEventListener('submit', function(e){
    e.preventDefault()
    info.cityInput = cityInput.value;
    getWeather(info.cityInput, info.unit)
    form.reset();
})

 