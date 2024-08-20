import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  email: string = 'd.jawahar6382@gmail.com';
  texts: string[] = ['3D Artist', 'web developer', 'UI designer', 'AI developer'];
  currentIndex: number = 0;
  intervalId: any;
  morphing: boolean = false;

  ngOnInit(): void {
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
}
