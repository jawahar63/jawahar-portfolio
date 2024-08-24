import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
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
  isTextVisible: boolean = true;

  ngOnInit(): void {
    this.active = this.allservice.sidebar;
    this.allservice.currPage.subscribe((val:string)=>{
      console.log(val);
      this.activeSection=val;
    })
    this.checkHeight();
  }
  

  setActiveSection(section: string) {
    this.activeSection = section;
    this.allservice.currPage.next(section);
  }

  changesidebar() {
    this.allservice.toggle();
  }
  @HostListener('window:resize')
  onResize() {
    this.checkHeight();
  }
  checkHeight() {
    const sidebar = document.querySelector('.sidebar-content') as HTMLElement;
    if (sidebar) {
      this.isTextVisible = sidebar.clientHeight > 550;
    }
  }
}
