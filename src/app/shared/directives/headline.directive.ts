import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHeadline]'
})
export class HeadlineDirective implements OnChanges {

  @Input()
  fontWeight ='normal';


  constructor(private elementRef: ElementRef, private render: Renderer2) {
    this.render.setStyle(this.elementRef.nativeElement, 'font-size', '20px')
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.fontWeight= changes['fontWeight']?.currentValue;
    this.setFontWeight();
   }
   setFontWeight(): void {
    this.render.setStyle(
      this.elementRef.nativeElement, 'font-weight', this.fontWeight
    );
   }

}
