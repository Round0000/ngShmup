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
  constructor(public bS: BulletsService, public gS: GameService, public eS: EnemiesService, public pS: PositionService) {}

  @ViewChild('frame') frame: any;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.gS.playing = !this.gS.playing;
    }

    if (!this.gS.playing) return;
    if (event.key === 'a') {
      this.bS.shoot(this.gS.player.shotRate)
    }
  }

  ngAfterViewInit() {
    const frameRect = this.pS.getRect(this.frame.nativeElement)
    this.pS.frame = {
      width: frameRect.width,
      height: frameRect.height
    }

    this.gS.startGame(this.frame.nativeElement);
  }
}
