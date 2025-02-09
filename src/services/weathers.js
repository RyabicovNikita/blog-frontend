export const getWeatherUserCountry = async () => {
  try {
    const userResponse = await fetch("https://ip.nf/me.json");
    const userData = await userResponse.json();
    const userCity = userData?.ip?.city;
    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=6963a4eb6e3a428ba51150045240411&q=${userCity}&lang=ru`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const weatherData = await weatherResponse.json();
    const { current } = weatherData;
    return {
      country: userCity,
      temp: Math.round(current?.temp_c),
      weather: current?.condition?.text,
    };
  } catch (error) {
    console.error(error);
  }
};
