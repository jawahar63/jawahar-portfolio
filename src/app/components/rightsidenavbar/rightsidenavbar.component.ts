import { Component, inject, OnInit } from '@angular/core';
import { AllserviceService } from '../../services/allservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rightsidenavbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rightsidenavbar.component.html',
  styleUrls: ['./rightsidenavbar.component.css']
})
export class RightsidenavbarComponent implements OnInit {
  allservice = inject(AllserviceService);
  activeSection: string = 'home';
  active: boolean = false;

  ngOnInit(): void {
    this.active = this.allservice.sidebar;
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  changesidebar() {
    this.allservice.toggle();
  }
}
