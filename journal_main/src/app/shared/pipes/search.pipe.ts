import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) { return []; }
    if (!value) { return items; }

    function filterBySearch(post) {
      var lowerBody, lowerTitle = '';
      if (post._source.body !== undefined) {
        lowerBody = post._source.body.toLocaleLowerCase();
        if (post._source.title !== undefined) {
          lowerTitle = post._source.title.toLocaleLowerCase();
        }
        var lowerVal = value.toLocaleLowerCase();
        if (lowerBody.includes(lowerVal) || lowerTitle.includes(lowerVal)) {
          return true;
        }
      }
      return false;
    }
    return items.filter(filterBySearch);
  }

}
