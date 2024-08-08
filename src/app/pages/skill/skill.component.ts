import { Component, NgModule } from '@angular/core';
import { TooltipDirective } from '../../dir/tooltip.directive';
import {MatTooltipModule} from '@angular/material/tooltip'

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent {

}
