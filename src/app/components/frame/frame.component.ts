import { Component, HostListener, ViewChild } from '@angular/core';
import { BulletsService } from 'src/app/services/bullets.service';
import { EnemiesService } from 'src/app/services/enemies.service';
import { GameService } from 'src/app/services/game.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {
  constructor(public bs: BulletsService, public game: GameService, public enm: EnemiesService, public pos: PositionService) {}

  @ViewChild('frame') frame: any;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.game.playing = !this.game.playing;
    }

    if (!this.game.playing) return;
    if (event.key === 'a') {
      this.bs.bullets.push({ id: Date.now(), pos: {} })
    }
  }

  ngAfterViewInit() {
    const frameRect = this.pos.getRect(this.frame.nativeElement)
    this.pos.frame = {
      width: frameRect.width,
      height: frameRect.height
    }

    this.game.startGame(this.frame.nativeElement);
  }
}
