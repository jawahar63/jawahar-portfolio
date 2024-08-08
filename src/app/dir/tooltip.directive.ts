import { NonNullAssert } from '@angular/compiler';
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) return;

    this.tooltipElement = this.renderer.createElement('span');
    this.tooltipElement.innerText = this.tooltipText;
    this.renderer.appendChild(document.body, this.tooltipElement);

    this.renderer.addClass(this.tooltipElement, 'absolute');
    this.renderer.addClass(this.tooltipElement, 'bottom-full');
    this.renderer.addClass(this.tooltipElement, 'left-1/2');
    this.renderer.addClass(this.tooltipElement, 'transform');
    this.renderer.addClass(this.tooltipElement, '-translate-x-1/2');
    this.renderer.addClass(this.tooltipElement, 'mb-2');
    this.renderer.addClass(this.tooltipElement, 'px-2');
    this.renderer.addClass(this.tooltipElement, 'py-1');
    this.renderer.addClass(this.tooltipElement, 'text-xs');
    this.renderer.addClass(this.tooltipElement, 'text-white');
    this.renderer.addClass(this.tooltipElement, 'bg-gray-800');
    this.renderer.addClass(this.tooltipElement, 'rounded');
    this.renderer.addClass(this.tooltipElement, 'opacity-0');
    this.renderer.addClass(this.tooltipElement, 'transition-opacity');
    this.renderer.addClass(this.tooltipElement, 'duration-300');

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    const top = hostPos.top - tooltipPos.height;
    const left = hostPos.left + (hostPos.width / 2) - (tooltipPos.width / 2);

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) { 
      this.renderer.removeChild(document.body, this.tooltipElement!);
      
    }
  }
}
