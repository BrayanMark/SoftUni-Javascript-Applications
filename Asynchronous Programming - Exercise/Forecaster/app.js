function attachEvents() {
    const inputLocation = document.querySelector("input#location");
    const getWetherButton = document.querySelector("input#submit");
    const forecast = document.querySelector("div#forecast");
    const currentWeather = document.querySelector("div#current");
    const upcomingWeather = document.querySelector("div#upcoming");

    const conditions = {
        Sunny: "&#x2600", // ☀
        "Partly sunny": "&#x26C5", // ⛅
        Overcast: "&#x2601", // ☁
        Rain: "&#x2614", // ☂
        Degrees: "&#176" // °
    }

    getWetherButton.addEventListener('click', getWether);

    function getWether() {
        fetch("http://localhost:3030/jsonstore/forecaster/locations")
        .then((res) => res.json())
        .then((data) => {
            const cityIndex = data.findIndex((element) => element.name === inputLocation.value)
            forecast.style.display = "block"

            if (cityIndex === -1) {
                throw new Error()
            }

            let cityCode = data[cityIndex].code;
            console.log(cityCode);

            fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
            .then((res) => res.json())
            .then((data) => {
                // Main div
                const forecasts = document.createElement("div");
                forecasts.className = "forecasts";

                // Condition symbol span
                const conditionSymbol = document.createElement("span");
                conditionSymbol.className = "condition symbol";
                conditionSymbol.innerHTML = conditions[data.forecast.condition];

                forecasts.appendChild(conditionSymbol);

                // Condition info spans
                let condition = document.createElement("span");
                condition.className = "condition";

                // Span 1
                const span1 = document.createElement("span");
                span1.className = "forecast-data";
                span1.textContent = data.name;

                condition.appendChild(span1);

                // Span 2
                const span2 = document.createElement("span");
                span2.className = "forecast-data";
                span2.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;

                condition.appendChild(span2);

                // Span 3
                const span3 = document.createElement("span");
                span3.className = "forecast-data";
                span3.textContent = data.forecast.condition;

                condition.appendChild(span3);

                forecasts.appendChild(condition);
                currentWeather.appendChild(forecasts);
            });

            // Upcoming weather
            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
            .then((res) => res.json())
            .then((data) => {
                // Main div
                const forecastInfo = document.createElement("div");
                forecastInfo.className = "forecast-info";

                data.forecast.forEach((el) => {
                    // Upcoming span
                    const upcomingSpan = document.createElement("span");
                    upcomingSpan.className = "upcoming";

                    // Symbol span
                    const symbol = document.createElement("span");
                    symbol.className = "symbol";
                    symbol.innerHTML = conditions[el.condition];

                    upcomingSpan.appendChild(symbol);

                    // Forecast data first span
                    const forecastData = document.createElement("span");
                    forecastData.className = "forecast-data";
                    forecastData.innerHTML = `${el.low}&#176;/${el.high}&#176;`;
    
                    upcomingSpan.appendChild(forecastData);

                    // Forecast data second span
                    const forecastData2 = document.createElement("span");
                    forecastData2.className = "forecast-data";
                    forecastData2.textContent = el.condition;

                    upcomingSpan.appendChild(forecastData2);
                    forecastInfo.appendChild(upcomingSpan);
                });
                upcomingWeather.appendChild(forecastInfo);
            })
            .catch(() => (forecast.textContent = "Error"))
        })
        .catch(() => (forecast.textContent = "Error"))
    }
}
attachEvents();









