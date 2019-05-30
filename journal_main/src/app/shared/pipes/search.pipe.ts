import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) { return []; }
    if (!value) { return items; }

    // value = value.toLowerCase();
    // console.log(items);



    function filterBySearch(post) {
      // console.log(post._source.body);
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
/*
    function filterBySearch(post) {
     console.log(post._source.body);
    }*/

    return items.filter(filterBySearch);

    // console.log('filtered', filteredArray);


/*
    return items.filter(it => it[field] === value);
*/
    // return items.filter(it => it[field].toLowerCase().includes(value));
  }

}
