// api_key = 26a8f813a56d73684d04cdff5a1f7720
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// http://openweathermap.org/img/wn/10d@2x.png

class WeatherApp {
  constructor() {
    this.API_KEY = `26a8f813a56d73684d04cdff5a1f7720`
    this.city = document.querySelector('.city')
    this.description = document.querySelector('.description')
    this.degree = document.querySelector('.degree span')
    this.icon = document.querySelector('.icon')
    this.init()
  }

  paintWeather(data) {
    console.log(data)
    this.city.innerText = data.name
    this.description.innerText = data.weather[0].description
    this.degree.innerText = data.main.temp
    this.icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  }

  async fetchData(baseURL) {
    console.log(baseURL)
    const res = await fetch(baseURL)
    const data = await res.json()
    this.paintWeather(data)
  }

  init() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=kr`

        this.fetchData(baseURL)
      })
    }
  }
}

const weather = new WeatherApp()
