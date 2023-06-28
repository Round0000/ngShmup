import { Component } from '@angular/core';
import { PositionService } from './services/position.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pos: PositionService, public game: GameService) {}

  title = 'ngshmup';

  frameClick(e: Event) {
    if (!this.game.playing) return;
    this.pos.movePlayer(e)
  }
}
