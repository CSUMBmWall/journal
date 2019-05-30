import {ID3DataInterface } from './ID3DataInterface';

export class ID3Data extends ID3DataInterface {
  constructor() {
    super();
    this.artist = '';
    this.title = '';
    this.album = 'YouTube';
    this.url = '';
    this.tags = [];
    this.description = '';
    this.thumbnail = '';
    this.fileLoc = '';
  }
}
