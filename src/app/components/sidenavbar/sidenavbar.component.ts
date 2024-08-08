import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.css'
})
export class SidenavbarComponent {
  activeSection: string = 'home'; // Default active section

  setActiveSection(section: string) {
    this.activeSection = section;
  }
  changesidebar(){
    
  }
}
