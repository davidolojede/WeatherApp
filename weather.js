const APIKey = "99d8c432e3d1da65db4ab7f4eb408754";

const fetchWeatherData = async (city = "Lagos") => {
  const locationLabel = document.getElementById("location-label");
  const tempElement = document.getElementById("temperature");
  const pressureElement = document.getElementById("pressure-value");
  const windElement = document.getElementById("wind-value");
  const humidityElement = document.getElementById("humidity-value");
  const descriptionElement = document.getElementById("desc");

  try {
    const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${APIKey}&units=metric`;

    const response = await fetch(endPoint);
    if (!response.ok) {
      throw new Error(`City non-responsive or not found (${response.status})`);
    }

    const result = await response.json();

    if (locationLabel) {
      locationLabel.textContent = `${result.name}, ${result.sys.country}`;
    }
    if (tempElement) {
      tempElement.innerHTML = `${Math.round(result.main.temp)}<sup>°</sup>`;
    }
    if (pressureElement) {
      pressureElement.textContent = `${result.main.pressure} hPa`;
    }
    if (windElement) {
      const speedKmH = Math.round(result.wind.speed * 3.6);
      windElement.textContent = `${speedKmH} km/h`;
    }
    if (humidityElement) {
      humidityElement.textContent = `${result.main.humidity}%`;
    }
    if (descriptionElement) {
      descriptionElement.textContent = result.weather[0].description;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("city-search");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const city = searchInput.value.trim();
      if (city) {
        fetchWeatherData(city);
      }
    });
  }

  // Initial fetch for default city
  fetchWeatherData("Lagos");
});
