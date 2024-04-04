


const weatherIcons = document.querySelectorAll(".icon-styling");
const iconAndInfo = document.querySelector(".iconAndInfo");

const inputField = document.getElementById("city-input");
inputField.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        getWeather();
    }
});

function getWeather() {

    const apiKey = "YOUR-API-KEY-HERE";
    let cityName = document.getElementById("city-input").value.trim().toLowerCase();



    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.location.name.toLowerCase() !== cityName.toLowerCase()) {
                throw new Error("City not found");
            }

            const isDay = data.current.is_day;
            var weatherType = data.current.condition.text.toLowerCase().replace(/\s/g, "-");
            console.log('a: ' + weatherType);
            console.log('x: ' + isDay)
            console.log('x: ' + typeof (isDay))
            weatherIcons.forEach(icon => {
                icon.classList.remove("show");
                icon.classList.add("hide");
            });

            function checkDay() {

                if (isDay == 0 && weatherType.includes('-')) {
                    weatherType = weatherType + "-night";
                    console.log('1: ' + weatherType);
                    return weatherType;
                } else if (isDay == 1 && weatherType.includes('-')) {
                    weatherType = weatherType + "-night";
                    console.log('2: ' + weatherType);
                    return weatherType;
                } else if (isDay == 0 && weatherType == 'clear') {
                    console.log('4: ' + weatherType);
                    weatherType = weatherType + "-night";
                    return weatherType;
                } else if (isDay == 1 && weatherType == 'clear') {
                    console.log('5: ' + weatherType);
                    weatherType = weatherType + "-day";
                    return weatherType;
                } else if (isDay == 1 && weatherType == 'overcast') {
                    console.log('6: ' + weatherType);
                    weatherType = weatherType + "-day";
                    return weatherType;
                } else if (isDay == 0 && weatherType == 'overcast') {
                    console.log('7: ' + weatherType);
                    weatherType = weatherType + "-night";
                    return weatherType;
                } else if (isDay == 1 && weatherType == 'sunny') {
                    console.log('8: ' + weatherType);
                    weatherType = weatherType + "-day";
                    return weatherType;
                } else if (isDay == 0 && weatherType == 'sunny') {
                    console.log('9: ' + weatherType);
                    weatherType = weatherType + "-night";
                    return weatherType;
                } else if (isDay == 1 && weatherType == 'fair') {
                    console.log('10: ' + weatherType);
                    weatherType = weatherType + "-day";
                    return weatherType;
                } else if (isDay == 0 && weatherType == 'fair') {
                    console.log('11: ' + weatherType);
                    weatherType = weatherType + "-night";
                    return weatherType;
                } else if (isDay == 1 && weatherType == 'rainy') {
                    console.log('12: ' + weatherType);
                    weatherType = weatherType + "-day";
                    return weatherType;
                } else if (isDay == 0 && weatherType == 'rainy') {
                    console.log('13: ' + weatherType);
                    weatherType = weatherType + "-night";
                    return weatherType;
                } else if (!weatherType.includes('-')) {
                    console.log('3: ' + weatherType);
                    weatherType = weatherType;
                    return weatherType;
                }
                else {
                    console.log('....')
                }
            }
            checkDay();


            weatherIcons.forEach(function icon(e) {
                if (e.id == weatherType) {
                    e.classList.remove("hide");
                    e.classList.add("show");
                    console.log('true');
                    console.log('b: ' + weatherType);
                    console.log('c: ' + e.id);
                }
            })


            const country = data.location.country;
            const tempCelsius = data.current.temp_c;
            const windSpeed = data.current.wind_kph;
            const time = data.location.localtime.split(" ")[1];
            const countryy = `Country: ${country}`;
            document.querySelector(".weather-country").textContent = countryy;
            const tempature = `Tempature: ${tempCelsius}° Celsius`;
            document.querySelector(".weather-temp").textContent = tempature;
            const windSpeedd = `Wind Speed: ${windSpeed}km/h`;
            document.querySelector(".weather-windSpeed").textContent = windSpeedd;
            const timee = `Current Time: ${time}`;
            document.querySelector(".weather-currentTime").textContent = timee;
            const weatherTypee = `Weather Type: ${weatherType}`;
            document.querySelector(".weather-weather").textContent = weatherTypee.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
            document.getElementById("error-message").classList.remove("show");
            document.getElementById("city-input").classList.remove("input-error");
            iconAndInfo.classList.remove("show2");
            void iconAndInfo.offsetWidth; // Trigger a reflow to restart the animation
            iconAndInfo.classList.add("show2");
        })
        .catch(error => {
            console.log(error);
            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = "City not found. Please enter a valid city name.";
            errorMessage.classList.add("show");
            document.getElementById("city-input").classList.add("input-error");
        });
}












