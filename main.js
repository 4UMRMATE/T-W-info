feather.replace(); // Feather Icons

let API = '61fd11eeb0d574f59074a1d50f7cb18d';
document.addEventListener('DOMContentLoaded', () => {
    let city = 'Tbilisi';
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('date-dayname').innerHTML = moment().format('dddd');
            document.getElementById('date-day').innerHTML = moment().format('ll');
            document.getElementById('location').innerHTML = data.name+", "+data.sys.country;
            document.getElementById('weather-temp').innerHTML = data.main.temp+"°C";
            document.getElementById('temp1').innerHTML = data.main.temp+"°C";
            document.getElementById('weather-desc').innerHTML = data.weather[0].description;
            document.getElementById('visibility').innerHTML = (data.visibility/1000)+" km";
            document.getElementById('humidity').innerHTML = data.main.humidity+" %";
            document.getElementById('wind').innerHTML = (data.wind.speed*18)/5+" km/h";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
