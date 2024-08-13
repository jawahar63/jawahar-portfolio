import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from './project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {
  sidebar: boolean = true;
  currPage = new BehaviorSubject<string>("home");

  toggle() {
    console.log("change");
    this.sidebar = !this.sidebar;
  }
}
