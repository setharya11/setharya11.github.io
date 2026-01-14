async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "5ce734a78bf2121d95e80f31c31699e0";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (!city) {
    document.getElementById("result").innerHTML = "Please enter a city name!";
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      document.getElementById("result").innerHTML =
        `🌍 ${data.name}<br>
         🌡 Temperature: ${data.main.temp}°C<br>
         🌤 Weather: ${data.weather[0].description}`;
    } else {
      document.getElementById("result").innerHTML = "City not found!";
    }
  } catch (error) {
    document.getElementById("result").innerHTML = "Network error!";
  }
}

/* ENTER KEY SUPPORT */
document.getElementById("city").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
