import {WeatherInterface} from './weather.interface';

export class WeatherModel extends WeatherInterface {
  constructor() {
    super();
  }

  // type, type_description, temp
  convertOpenWeatherData(data) {
    if (!data) {
      return null;
    } else {
      this.temp = +data.main.temp;
      this.weather_type = data.weather[0].main;
      this.weather_type_description = data.weather[0].description;
    }
  }
}
