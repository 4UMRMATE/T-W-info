feather.replace(); // Feather Icons

let cityImage = document.querySelector(".weather-side").style;

let API = '61fd11eeb0d574f59074a1d50f7cb18d';
document.addEventListener('DOMContentLoaded', () => {
    let city = "Tbilisi";
        cityImage.backgroundImage = "url('img/tbilisi.jpg')";

    let locChange = document.getElementById('lb'),      // Display Text Input and Vice Versa
        enterCityName = document.getElementById('send-button'),
        textInput = document.getElementById('textInput');

    locChange.addEventListener('click', () => {
        document.getElementById('lic').style.cssText = 'display: flex;';
        document.getElementById('lb').style.cssText = 'display: none;';
    });
    enterCityName.addEventListener("click", () => {
        document.getElementById('lb').style.cssText = 'display: flex;';
        document.getElementById('lic').style.cssText = 'display: none;';
        city = document.querySelector('#textInput').value;
        fetchData();
    });

    let cityTextInput = document.getElementById("textInput")
    cityTextInput.addEventListener("keydown", function(event){
        city = document.querySelector("#textInput").value;
        if (event.key == "Enter"){
            fetchData();
            document.getElementById('lb').style.cssText = 'display: flex;';
            document.getElementById('lic').style.cssText = 'display: none;';
            document.querySelector('#textInput').value = "";
            city = city.toLowerCase(); // Convert City Name (string) to LowerCase to Find cityBackImage
            cityImage.backgroundImage = `url('img/${city}.jpg')`;
            console.log(cityImage.backgroundImage)
        }
    }, true);

    function fetchData(){
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`)
        .then(response => response.json())
        .then(data => {
            let iconId = data['weather'][0]['icon'];
            document.getElementById("wc").attributes[2].value = `icons/`+`${iconId}`+ `-l.png`;
            document.getElementById("day-icon").attributes[1].value = `icons/`+`${iconId}`+ `-d.png`;
            document.getElementById('date-dayname').innerHTML = moment().format('dddd');
            document.getElementById('date-day').innerHTML = moment().format('ll');
            document.getElementById('location').innerHTML = data.name+", "+data.sys.country;
            let fixedTemp = data.main.temp.toFixed(0); // fix decimal number
            document.getElementById('weather-temp').innerHTML = fixedTemp+"°C";
            document.getElementById('temp1').innerHTML = fixedTemp+"°C";
            document.getElementById('weather-desc').innerHTML = data.weather[0].description;
            document.getElementById('visibility').innerHTML = (data.visibility/1000)+" km";
            document.getElementById('humidity').innerHTML = data.main.humidity+" %";
            let convertMStoKMH = data.wind.speed * 18 / 5; //convert m/s to km/h
            let fixedWindSpeed = convertMStoKMH.toFixed(2); // fix decimal number
            document.getElementById('wind').innerHTML = fixedWindSpeed+" km/h";
        })
        .catch((error) => {
            alert('Enter Correct City', error);
        });
    }

    fetchData();
});
