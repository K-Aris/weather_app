const btnWeather = document.getElementById("btnWeather");
const txtCity = document.getElementById("txtCity"); 
const resultOut = document.getElementById("result");
const key = ""; //Add key here 

btnWeather.onclick = function() {
    const city = txtCity.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    console.log(url);
    fetch(url).then(response => {
    response.json().then(json => {
        let data = json;
        let output = formatResponse(data);
        resultOut.innerHTML = output;  
    });     
    }); 
}; 

function kelvinToFahrenheit(kTemp){
    const fTemp = kTemp * (9/5) -459.67; 
    return fTemp; 
}

function msToMPH(ms) {
    return (Math.round(ms * 2.237)); 
}

function degreeToDirection(degree) {
    if (degree < 75 && degree > 65) {
        return "East"; 
    } else {
        return "I don't know where the wind is coming from!"; 
    }
}

function formatResponse(data) {
    let conditions = ""
    if(data.weather.length > 1) {
        for( var i = 0; i < data.weather.length; i++) {
            conditions += data.weather[i].main;
            if (i != (data.weather.length -1)) {
                conditions += " and ";
            }
        }
    } else {
        conditions += data.weather[0].main; 
    }
    let out = `<p>Current Conditions for ${data.name}</p>
    <p>Temperature: ${Math.round(kelvinToFahrenheit(data.main.temp))}F</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Pressure: ${data.main.pressure}mb</p>
    <p>Wind: ${degreeToDirection(data.wind.deg)} at ${msToMPH(data.wind.speed)}MPH < /p>
    <p>${conditions}</p>`;
    return(out); 
}