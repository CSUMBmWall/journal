import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appClearInput]'
})
export class ClearInputDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('focus') focus(eventData: Event) {
    console.log(this.elRef.nativeElement);
    console.log(this.elRef);
}

}
