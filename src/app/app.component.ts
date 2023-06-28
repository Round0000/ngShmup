import { Component } from '@angular/core';
import { PositionService } from './services/position.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pos: PositionService) {}

  title = 'ngshmup';

  frameClick(e: Event) {
    this.pos.movePlayer(e)
  }
}
