import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  email:string='d.jawahar6382@gmail.com';
  texts: string[] = ['3D Artist', 'web developer', 'UI designer', 'AI developer'];
  currentIndex: number = 0;
  currentText: string = '';
  intervalId: any;
  typingSubscription: Subscription | undefined;
  deleting: boolean = false;

  ngOnInit(): void {
    this.startTextCycling();
  }

  ngOnDestroy(): void {
    if (this.typingSubscription) {
      this.typingSubscription.unsubscribe();
    }
    clearInterval(this.intervalId);
  }

  startTextCycling(): void {
    this.updateText();
    this.intervalId = setInterval(() => {
      this.updateText();
    }, 4000); // Change text every 4 seconds
  }

  updateText(): void {
    const text = this.texts[this.currentIndex];
    const typingSpeed = 100; // Milliseconds per character
    const deletingSpeed = 50; // Milliseconds per character
    const delayBetween = 2000; // Delay before starting to delete

    if (this.typingSubscription) {
      this.typingSubscription.unsubscribe();
    }

    let charIndex = 0;
    this.deleting = false;

    this.typingSubscription = interval(typingSpeed).subscribe(() => {
      if (!this.deleting) {
        this.currentText = text.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === text.length) {
          this.deleting = true;
          setTimeout(() => {
            this.typingSubscription?.unsubscribe();
            this.typingSubscription = interval(deletingSpeed).subscribe(() => {
              charIndex--;
              this.currentText = text.substring(0, charIndex);
              if (charIndex === 0) {
                this.typingSubscription?.unsubscribe();
                this.currentIndex = (this.currentIndex + 1) % this.texts.length;
              }
            });
          }, delayBetween);
        }
      }
    });
  }
}
