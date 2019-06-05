import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as showdown from 'showdown';
@Pipe({
  name: 'markdownPipe'
})
export class MarkdownPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {  }
  options = {
    tables: true,
    tasklists: true,
    smoothLivePreview: true,
    openLinksInNewWindow: true,
    strikethrough: true,
    simplifiedAutoLink: true,
    underline: true,
    parseImgDimensions: true
  };
  converter = new showdown.Converter(this.options);
  // markup = this.converter.makeHtml(this.text);
  checkOptions = this.converter.getOptions();


  transform(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(html));
  }

}
