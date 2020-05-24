import { Directive, ElementRef, OnInit, Input, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDataToolTip]'
})
export class DataToolTipDirective implements OnInit {
  public element: ElementRef;

  @Input() data: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {

  }

  @HostListener('click') onClick() {
    console.dir(this.el.nativeElement.attributes);
    this.el.nativeElement.attributes.data.value = 'Copied!';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.attributes.data.value = 'Click to Copy';
  }

}
