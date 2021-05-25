/****************************************************************This script file is for interacting with the APIs ******************************************************************
/*                                                                                                                                                                                  *
/*                                                                                                                                                                                  *
/*                                          This app utilizes the Accuweather Locations API & Accuweatjer Current Conditions API                                                    *
/*                                                                                                                                                                                  *
/*                                                This free API key has a request limit of 50 requests before expiring.                                                             *
/*                                                                                                                                                                                  *
/*                                                As there are no free geolocation auto-complete search related APIs,                                                               *
/*                                                the auto complete feature of this application is currently impossible                                                             *
/*                                                to implement.                                                                                                                     *
/*                                                                                                                                                                                  *
/*                                                                                                                                                                                  *
/*                                                                                                                                                                                  *
/************************************************************************************************************************************************************************************/

const key = 'wbrTAfONf8HcTJnvxK6XUZzIAUQvTMwg';

/// AN ASYNC FUNCTION ALWAYS RETURNS A PROMIE!!!!!!!!!!
/// A PROMISE ALWAYS NEEDS A .then() !!!!!!!!!!!!!!!!!!!!!!!!!
// get city information

const getCity = async (city) => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  console.log(data[0]);

  return data[0];
};

//get weather at city key
const getWeather = async (locationKey) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${locationKey}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};

// PROMISE FUNCTION CALLS
// getCity('Sharpsville')
//   .then((data) => {
//     //THIS WILL RETURN A PROMISE, SO .then() CAN BE USED ON THE NEXT LINE TO PROCESS IT
//     return getWeather(data.Key);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log('There was an error retrieving the city', err));
