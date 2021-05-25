/****************************************************************This script file is for interacting with the DOM *******************************************************************/
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

//Update the DOM with data fetched from Accuweather API
const updateUI = (data) => {
  //The below two lines of code can be accomplished mroe succinctly using destructuring
  //   const cityDetails = data.cityDetails;
  //   const weather = data.weather;

  //destructure properties
  //The constants must be the same name as the properties we're getting from the object
  //This will create two constants with the same name as the relevant properties in "data" and set their value as the value of those properies in "data".
  const { cityDetails, weather } = data;

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
});
