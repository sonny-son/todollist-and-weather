const API_KEY="8e7f4f3b5fd74f10c6b7194420f8781b"
const COORDS="coords"
//weather type
const weather=document.querySelector(".weather"), 
    cloud=document.querySelector(".cloud"),
    weatherInfo=weather.querySelector(".weather-info");

function paintWeather(name,temp,hum,speed){
    console.log(name)
    const weatherName=weather.querySelectorAll(`.${name}`);
    console.log(weatherName)
    weatherName[0].classList.add("showing");
    weatherName[1].classList.add("showing");
    weatherName[1].innerText=`${name}`
    const weatherTemp=weatherInfo.querySelector(".weather-temp");
    weatherTemp.innerText=`${temp}`
    const weatherHum=weatherInfo.querySelector(".weather-hum");
    weatherHum.innerText=`${hum}`
    const weatherSpeed=weatherInfo.querySelector(".weather-speed");
    weatherSpeed.innerText=`${speed}`
}

function getWeather(lat,lon){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `).then(function (response){
        return response.json();
    }).then(function(json){
        const weatherName= json.weather[0].main;
        const currentTemp=json.main.temp;
        const humidity=json.main.humidity;
        const windSpeed=json.wind.speed;
        paintWeather(weatherName,currentTemp,humidity,windSpeed)
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