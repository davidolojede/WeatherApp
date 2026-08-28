const APIKey = "99d8c432e3d1da65db4ab7f4eb408754"
const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=${APIKey}&units=metric`

const displayUnits = async () => {
    try {
        const userInput = document.getElementById("city-search").value
        const city = userInput || "lagos"
        const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
        const errorMessage = document.getElementById("error-message")
        const location = document.getElementById("location-label")
        const temp = document.getElementById("temperature")
        const pressure = document.getElementById("pressure-value")
        const wind = document.getElementById("wind-value")
        const humidity = document.getElementById("humidity-value")
        const description = document.getElementById("desc")

        const response = await fetch(endPoint)
        const result = await response.json()

        errorMessage.innerHTML = ""

        if (!response.ok) {
            errorMessage.innerHTML = "Country not found. Please try again."
            return
        }

        location.innerHTML = `${result.name}, ${result.sys.country}`
        temp.innerHTML = `${result.main.temp}°`
        pressure.innerHTML = `${result.main.pressure} hPa`
        wind.innerHTML = `${result.wind.deg} km/h`
        humidity.innerHTML = `${result.main.humidity}%`
        description.innerHTML = `${result.weather[0].description}`

        const weatherImg = document.getElementById("img-container")
        if (result.main.temp <= 10) {
            weatherImg.innerHTML = `<img id="weather-img" src="./temp/very-cold.png" alt="">`
        } else if (result.main.temp <= 20) {
            weatherImg.innerHTML = `<img id="weather-img" src="./temp/cool.png" alt="">`
        } else if (result.main.temp <= 28) {
            weatherImg.innerHTML = `<img id="weather-img" src="./temp/hot.png" alt="">`
        } else {
            weatherImg.innerHTML = `<img id="weather-img" src="./temp/very_hot.png" alt="">`
        }
    } catch (error) {
        console.log(error);
    }
}

displayUnits()

const fetchInfo = async () => {
    try {
        displayUnits()
    } catch (error) {
        console.log(error);
    }
}