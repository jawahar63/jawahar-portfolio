import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {

  constructor() { }
  sidebar:boolean=true;
  toggle(){
    console.log("change");
    this.sidebar=!this.sidebar;
  }
}
