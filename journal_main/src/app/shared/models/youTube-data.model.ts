export class YouTubeDataModel {
  title: string;
  thumbnail: string;
  description: string;
  tags: string[];
  constructor(title, thumb, descr, tags) {
    this.title = title;
    this.thumbnail = thumb;
    this.description = descr;
    this.tags = tags;
  }
}
