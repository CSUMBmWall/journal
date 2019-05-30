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


/*
import { Pipe, PipeTransform } from '@angular/core';
import { markdown } from 'markdown';
// import { showdown } from 'showdown';
import {Converter} from "showdown/dist/showdown";

@Pipe({
  name: 'markdownPipe'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var converter = new Converter();
    converter.setOption('openLinksInNewWindow', true);
    /!*var defaultOptions = converter.getOptions();
    console.log('pipe', defaultOptions);*!/

    return converter.makeHtml(value);
    // converter.makeHtml(this.post.body.body);
    /!*const converter = new showdown.Converter();
    const html = converter.makeHtml(value);
    console.log(html);
    return converter.makeHtml(value);*!/



  }

}
*/
