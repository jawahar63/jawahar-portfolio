import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidedetails',
  standalone: true,
  imports: [NgOptimizedImage,CommonModule],
  templateUrl: './sidedetails.component.html',
  styleUrl: './sidedetails.component.css'
})
export class SidedetailsComponent {
  email:string='d.jawahar6382@gmail.com';
  texts: string[] = ['3D Artist', 'web developer', 'UI designer', 'AI developer'];
  currentIndex: number = 0;
  currentText: string = '';
  morphing: boolean = false;
  intervalId: any;
  typingSubscription: Subscription | undefined;
  deleting: boolean = false;
  isHeightGreaterThan640: boolean = false;
  

  ngOnInit(): void {
    this.checkHeight();
    this.startTextCycling();
  }

  ngOnDestroy(): void {
    if (this.typingSubscription) {
      this.typingSubscription.unsubscribe();
    }
    clearInterval(this.intervalId);
  }

  startTextCycling(): void {
    this.intervalId = setInterval(() => {
      this.morphText();
    }, 4000); // Change text every 4 seconds
  }

  morphText(): void {
    this.morphing = true;
    setTimeout(() => {
      this.morphing = false;
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    }, 1000); // Match the duration with CSS animation
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkHeight();
  }
  checkHeight() {
    this.isHeightGreaterThan640 = window.innerHeight > 640;
  }
}
