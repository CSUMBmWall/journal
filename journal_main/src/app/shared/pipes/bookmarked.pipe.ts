import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookmarked'
})
export class BookmarkedPipe implements PipeTransform {

  transform(items: any[]): any[] {
    function filterBySearch(post) {
      if (post._source !== undefined) {

        if (post._source.bookmarked) {
          return true;
        }
      }
      return false;
    }

    return items.filter(filterBySearch);

  }

}
