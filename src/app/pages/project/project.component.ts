import { Component, inject, OnInit } from '@angular/core';
import { AllserviceService } from '../../services/allservice.service';
import { Project } from '../../services/project.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import jsonData from '../../data/projects.json'

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  allserve = inject(AllserviceService);
  project: Project[] =[];
  filter:string='All';
  ngOnInit(): void {
    this.project = jsonData as Project[];
  }
  changefilter(val: string) {
    this.filter=val;
  }
  get rowsClass() {
    const projectWindow = document.getElementById('projectWindow');
    if (projectWindow) {
      const height = projectWindow.offsetHeight;

      if (height > 660) {
        return 'grid-rows-3';
      } else if (height > 430) {
        return 'grid-rows-2';
      } else {
        return 'grid-rows-1';
      }
    }
    return 'grid-rows-1'; // Default case, if the element is not found
  }

}
