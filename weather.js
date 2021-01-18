const API_KEY="8e7f4f3b5fd74f10c6b7194420f8781b"
const COORDS="coords"
//weather type
const weather=document.querySelector(".weather"), 
    cloud=document.querySelector(".cloud"),
    weatherInfo=weather.querySelector(".weather-info");

function paintWeather(name,city,temp,hum,speed){
    const weatherName=weather.querySelectorAll(`.${name}`);
    weatherName[0].classList.add("showing");
    weatherName[1].classList.add("showing");
    weatherName[1].innerText=`${name}`
    const weatherCity=weatherInfo.querySelector(".city");
    weatherCity.innerText=`@${city}`;
    const weatherTemp=weatherInfo.querySelector(".weather-temp");
    weatherTemp.innerText=`Temp: ${temp}\`C`
    const weatherHum=weatherInfo.querySelector(".weather-hum");
    weatherHum.innerText=`Huminity: ${hum}%`
    const weatherSpeed=weatherInfo.querySelector(".weather-speed");
    weatherSpeed.innerText=`Windspeed: ${speed}mph`
}

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `).then(function (response){
        return response.json();
    }).then(function(json){
        const city=json.name;
        const weatherName= json.weather[0].main;
        const currentTemp=json.main.temp;
        const humidity=json.main.humidity;
        const windSpeed=json.wind.speed;
        paintWeather(weatherName,city,currentTemp,humidity,windSpeed)
    })
    
}
function savePosition(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function positionError(){
    console.log("Can't get position")
}
function positionSucess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    savePosition(coordsObj);
    getWeather(latitude,longitude);
}
function getPosition(){
    navigator.geolocation.getCurrentPosition(positionSucess,positionError);
}

function init(){
    const loadedPosition =localStorage.getItem(COORDS)
    if (loadedPosition===null){
        getPosition();
    }else{
        const parsedPosition=JSON.parse(loadedPosition);
        getWeather(parsedPosition.latitude,parsedPosition.longitude);
    }
}
init();