import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AllserviceService } from '../../services/allservice.service';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {
  allservice = inject(AllserviceService);
  activeSection: string = 'home'; // Default active section
  active: boolean = true;

  ngOnInit(): void {
    this.active = this.allservice.sidebar;
    this.allservice.currPage.subscribe((val:string)=>{
      console.log(val);
      this.activeSection=val;
    })
  }
  

  setActiveSection(section: string) {
    this.activeSection = section;
    this.allservice.currPage.next(section);
  }

  changesidebar() {
    this.allservice.toggle();
  }
}
