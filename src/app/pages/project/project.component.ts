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
}
