import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { SidedetailsComponent } from './components/sidedetails/sidedetails.component';
import { HomeComponent } from "./pages/home/home.component";
import { SkillComponent } from "./pages/skill/skill.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavbarComponent, SidedetailsComponent, HomeComponent, SkillComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
}
