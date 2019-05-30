import {WeatherModel} from './weather.model';

export class PostInterface {
  index: string;
  type: string;
  id: string;
  body: {
    title: string,
    date: Date,
    body: string,
    markdownBody: string,
    bookmarked: boolean,
    img: string[],
    youTube: any [],
    strava: string[],
    urlLink: any[],
    weather: WeatherModel
  };

  constructor() {}
}
