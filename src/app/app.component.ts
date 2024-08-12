import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { SidedetailsComponent } from './components/sidedetails/sidedetails.component';
import { HomeComponent } from "./pages/home/home.component";
import { SkillComponent } from "./pages/skill/skill.component";
import { AllserviceService } from './services/allservice.service';
import { CommonModule } from '@angular/common';
import { RightsidenavbarComponent } from "./components/rightsidenavbar/rightsidenavbar.component";
import { ContactComponent } from "./pages/contact/contact.component";

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
    ContactComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  allservice = inject(AllserviceService);
  sideactive: boolean = true;

  ngOnInit(): void {
    this.sideactive = this.allservice.sidebar;
  }

  ngDoCheck() {
    this.sideactive = this.allservice.sidebar;
  }
}
