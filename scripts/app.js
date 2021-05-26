/****************************************************************This script file is for interacting with the DOM *******************************************************************/
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

//Update the DOM with data fetched from Accuweather API
const updateUI = (data) => {
  //destructure properties
  //The constants must be the same name as the properties we're getting from the object
  //This will create two constants with the same name as the relevant properties in "data" and set their value as the value of those properies in "data".
  const { cityDetails, weather } = data;

  console.log(weather);

  //update details html template
  details.innerHTML = `<div class="text-muted text-uppercase text-center details">
        <h5 class="my-3">${cityDetails.EnglishName}, ${cityDetails.AdministrativeArea.EnglishName},</h5>
        <h5 class="my-3">${cityDetails.Country.EnglishName} </h5>
        <div class="my-3">${weather[0].WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weather[0].Temperature.Imperial.Value}</span>
          <span>&deg;${weather[0].Temperature.Imperial.Unit}</span>
        </div>
      </div>`;

  //Show Weather Icon in DOM
  const iconNum = weather[0].WeatherIcon;
  icon.src = `img/icons/${iconNum}.svg`;

  //Show time of day SVG using Ternary Operator

  weather[0].IsDayTime
    ? (time.src = 'img/day.svg')
    : (time.src = 'img/night.svg');

  //Remove div.card class "d-none" if it is present.
  if (Array.from(card.classList).includes('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  //In an object, if a key and value have the same name, we can shorthand it to a single value. This will make the key and value the same value.
  //The below is the same as return {cityDetails: cityDetails, weather: weather};
  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener('submit', (e) => {
  //Prevent default page reload on submit
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the UI with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set localStorage to user's input value on submit event
  localStorage.setItem('userInput', city);
});

//Check if the user had a location stored before page reload/close.
//If true, send a request to the Accuweather API
window.onload = (event) => {
  if (localStorage.userInput) {
    updateCity(localStorage.userInput)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  }
};
