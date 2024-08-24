import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  email: string = 'd.jawahar6382@gmail.com';
  texts: string[] = ['3D Artist', 'Web Developer', 'UI Designer', 'AI Developer'];
  currentIndex: number = 0;
  intervalId: any;
  morphing: boolean = false;
  isHeightGreaterThan640: boolean = false;

  ngOnInit(): void {
    this.checkHeight();
    this.startTextCycling();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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
