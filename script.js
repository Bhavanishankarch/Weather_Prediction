const inputElement = document.getElementById("inputId");
  const buttonElement = document.getElementById("buttonId");
  const unorderListElement = document.getElementById("unorderListId");

  buttonElement.addEventListener("click", () => {
    const city = inputElement.value.trim();
    unorderListElement.innerHTML = ""; 
    unorderListElement.style.opacity = 0;

    if (city !== "") {
        fetch(`https://api.weatherapi.com/v1/current.json?key=09eeeb80d02a41e58e7114823250904&q=${city}&aqi=no`)
        .then(res => res.json())
        .then(data => {
          if(data.error) throw new Error(data.error.message);
          const { location, current } = data;

          const locationElement = document.createElement("li");
          locationElement.textContent = `${location.name}, ${location.region}, ${location.country}`;
          unorderListElement.appendChild(locationElement);

          const timeElement = document.createElement("li");
          timeElement.textContent = `Timezone: ${location.tz_id}`;
          unorderListElement.appendChild(timeElement);

          const iconElement = document.createElement("img");
          iconElement.src = "https:" + current.condition.icon;
          unorderListElement.appendChild(iconElement);

          const tempElement = document.createElement("li");
          tempElement.textContent = `Temperature: ${current.temp_c} °C`;
          unorderListElement.appendChild(tempElement);

          const level = document.createElement("li");
          level.textContent = current.condition.text;
          unorderListElement.appendChild(level);

          const windElement = document.createElement("li");
          windElement.textContent = `Wind Speed: ${current.wind_kph} KPH`;
          unorderListElement.appendChild(windElement);

          setTimeout(() => {
            unorderListElement.style.opacity = 1;
          }, 50);
        })
        .catch(error => {
          const errorElement = document.createElement("li");
          errorElement.textContent = error.message || "City not found or network error.";
          unorderListElement.appendChild(errorElement);
          unorderListElement.style.opacity = 1;
        });
    } else {
      const errorElement = document.createElement("li");
      errorElement.textContent = "Please enter your city name.";
      unorderListElement.appendChild(errorElement);
      unorderListElement.style.opacity = 1;
    }
  });
