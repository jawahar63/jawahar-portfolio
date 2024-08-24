import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip'

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [MatTooltipModule,CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent implements OnInit {
  isHeightGreaterThan640: boolean = false;

  ngOnInit() {
    this.checkHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkHeight();
  }

  checkHeight() {
    this.isHeightGreaterThan640 = window.innerHeight > 640;
  }
}
