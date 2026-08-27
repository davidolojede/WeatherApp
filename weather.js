const APIKey = "99d8c432e3d1da65db4ab7f4eb408754"

const getIllustration = (temp) => {
    if (temp < 15) {
        // Cold illustration (Cold cloud with snow/ice drops)
        return `
        <defs>
          <linearGradient id="cloudBodyCold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#a0c8f0"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="120" rx="50" ry="8" fill="#000" opacity="0.1"/>
        <path d="M55 85c-14 0-24-10-24-22s10-22 24-22c2 0 4 .2 6 .5C65 30 78 22 93 22c17 0 31 11 34 26 12 1 21 10 21 22 0 12-10 22-23 22H55z" fill="url(#cloudBodyCold)"/>
        <g fill="#b0e0ff">
          <circle cx="70" cy="104" r="4"/>
          <circle cx="100" cy="110" r="4"/>
          <circle cx="130" cy="104" r="4"/>
        </g>`;
    } else if (temp <= 25) {
        // Mild illustration (Rain cloud)
        return `
        <defs>
          <linearGradient id="cloudBodyMild" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#eaf6ff"/>
            <stop offset="55%" stop-color="#9cd2ff"/>
            <stop offset="100%" stop-color="#4f9dee"/>
          </linearGradient>
          <linearGradient id="dropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#bfe3ff"/>
            <stop offset="100%" stop-color="#4f9dee"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="122" rx="55" ry="10" fill="#000" opacity="0.12"/>
        <path d="M55 92c-14 0-24-10.5-24-23.5S41 45 55 45c2 0 4 .2 6 .6C65 33 78 24 93 24c17 0 31.5 12 34.8 28 12.7 1 22.2 11.4 22.2 24 0 13.3-11 24-24.7 24H55z" fill="url(#cloudBodyMild)"/>
        <g>
          <path class="drop" d="M78 104c0 4.4-3.6 7.5-7.5 7.5S63 108.4 63 104c0-4.4 7.5-13 7.5-13s7.5 8.6 7.5 13z" fill="url(#dropGrad)"/>
          <path class="drop" d="M108 108c0 4.4-3.6 7.5-7.5 7.5S93 112.4 93 108c0-4.4 7.5-13 7.5-13s7.5 8.6 7.5 13z" fill="url(#dropGrad)"/>
          <path class="drop" d="M138 104c0 4.4-3.6 7.5-7.5 7.5S123 108.4 123 104c0-4.4 7.5-13 7.5-13s7.5 8.6 7.5 13z" fill="url(#dropGrad)"/>
        </g>`;
    } else {
        // Hot illustration (Sunny cloud)
        return `
        <defs>
          <linearGradient id="cloudBodyHot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#e0e8ff"/>
          </linearGradient>
          <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffea79"/>
            <stop offset="100%" stop-color="#ff9800"/>
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="122" rx="55" ry="10" fill="#000" opacity="0.12"/>
        <circle cx="138" cy="42" r="26" fill="url(#sunGrad)"/>
        <path d="M55 92c-14 0-24-10.5-24-23.5S41 45 55 45c2 0 4 .2 6 .6C65 33 78 24 93 24c17 0 31.5 12 34.8 28 12.7 1 22.2 11.4 22.2 24 0 13.3-11 24-24.7 24H55z" fill="url(#cloudBodyHot)"/>`;
    }
}

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
        const illustration = document.getElementById("weather-illustration")

        const response = await fetch(endPoint)
        const result = await response.json()

        errorMessage.innerHTML = ""

        if (!response.ok) {
            errorMessage.innerHTML = "City not found. Please try again."
            return
        }

        const currentTemp = Math.round(result.main.temp)

        location.innerHTML = `${result.name}, ${result.sys.country}`
        temp.innerHTML = `${currentTemp}<sup>°</sup>`
        pressure.innerHTML = `${result.main.pressure} hPa`
        wind.innerHTML = `${Math.round(result.wind.speed * 3.6)} km/h`
        humidity.innerHTML = `${result.main.humidity}%`
        description.innerHTML = result.weather[0].description

        if (illustration) {
            illustration.innerHTML = getIllustration(currentTemp)
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
