import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {

  constructor() { }
  sidebar:boolean=true;
  currPage= new BehaviorSubject<string>("home");
  toggle(){
    console.log("change");
    this.sidebar=!this.sidebar;
  }
}
