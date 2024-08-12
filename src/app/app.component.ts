import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { SidedetailsComponent } from './components/sidedetails/sidedetails.component';
import { HomeComponent } from "./pages/home/home.component";
import { SkillComponent } from "./pages/skill/skill.component";
import { AllserviceService } from './services/allservice.service';
import { CommonModule } from '@angular/common';
import { RightsidenavbarComponent } from "./components/rightsidenavbar/rightsidenavbar.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { ProjectComponent } from "./pages/project/project.component";
import { debounceTime, fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidenavbarComponent,
    SidedetailsComponent,
    HomeComponent,
    SkillComponent,
    CommonModule,
    RightsidenavbarComponent,
    ContactComponent,
    ProjectComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  allservice = inject(AllserviceService);
  sideactive: boolean = true;

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(150),debounceTime(300))
      .subscribe(() => this.onWindowScroll());
  }

  ngOnInit(): void {
    this.sideactive = this.allservice.sidebar;
    this.allservice.currPage.subscribe((val) => {
      setTimeout(() => {
        const element = document.getElementById(val);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0); // Delay to ensure elements are rendered
    });
  }

  ngDoCheck() {
    this.sideactive = this.allservice.sidebar;
  }

  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const threshold = scrollPosition + (viewportHeight * 3) / 4; // 3/4 of the viewport height
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('.section');

    sections.forEach((section: HTMLElement) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        sectionTop <= threshold &&
        sectionTop + sectionHeight > threshold
      ) {
        this.allservice.currPage.next(section.id);
      }
    });
  }
}
