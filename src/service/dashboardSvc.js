const getCurrentWeather = async (latitude, longitude) => {
  const weatherKey = "c63697468d6b46229a763647230307";
  const res = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=" +
      weatherKey +
      "&q=" +
      latitude +
      "," +
      longitude +
      "&aqi=no",
    {
      method: "GET",
    }
  );
  return res.json();
};

const getTopNews = async (country) => {
  const newsKey = "bf00fdc726774adf91404c7ed0b9072e";
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=" +
      country +
      "&apiKey=" +
      newsKey,
    {
      method: "GET",
    }
  );
  return res.json();
};
const dashboardSvc = { getCurrentWeather, getTopNews };
export default dashboardSvc;
