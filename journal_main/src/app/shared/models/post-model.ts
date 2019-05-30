import {PostInterface} from './PostInterface';
import {WeatherModel} from './weather.model';

export class PostModel extends PostInterface {
  constructor(index ?, type ? , id ?, body ?) {
    super();
    index ? this.index = index : this.index = null;
    type ? this.type = type : this.type = null;
    id ? this.id = id : this.id = null;
    body ? this.body = body : this.body = {
        title: 'Title',
        date: new Date(),
        body: '',
        markdownBody: '',
        bookmarked: false,
        strava: [],
        img: [],
        youTube: [],
        urlLink: [],
        weather: new WeatherModel()
      };
  }

}
