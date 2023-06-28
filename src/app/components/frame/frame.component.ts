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

    setInterval(() => {
      if (!this.game.playing) return;

      const currBackgroundPos = Number(window.getComputedStyle(this.frame.nativeElement).backgroundPositionY.split("px")[0])
      if (currBackgroundPos > 1024) {
        this.frame.nativeElement.style.backgroundPositionY = '0px';
      } else {
        this.frame.nativeElement.style.backgroundPositionY = currBackgroundPos + 0.5 + 'px';
      }

      this.bs.bullets.forEach((b: any) => {
        this.enm.enemies.forEach((e: any) => {
          if (
            b.pos.t < e.pos.b - e.pos.h / 4 &&
            b.pos.l + 8 > e.pos.l &&
            b.pos.l < e.pos.l + e.pos.w &&
            b.pos.t > e.pos.t
          ) {
            this.bs.bullets = this.bs.bullets.filter((bul: any) => bul.id !== b.id)
            e.hp -= 25;
          }
        })
      })
    }, 16);

      this.enm.enemies.push({ id: Date.now(), pos: {} })
    setInterval(() => {
      if (!this.game.playing || this.pos.getRandom(0, 1) === 0 || this.enm.enemies.length > 10) return;
      this.enm.enemies.push({ id: Date.now(), pos: {} })
    }, 1000)

  }
}
