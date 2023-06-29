import { Injectable } from '@angular/core';
import { BulletsService } from './bullets.service';
import { EnemiesService } from './enemies.service';
import { PositionService } from './position.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(public BS: BulletsService, public ES: EnemiesService, public PS: PositionService) { }

  playing: boolean = false;

  settings: any = {
    spawnRate: 1500,
    maxEnemies: 10
  };

  player: any = {
    damage: 25,
    shotRate: 400
  };

  startGame(frame: any) {
    setInterval(() => {
      if (!this.playing) return;

      const currBackgroundPos = Number(window.getComputedStyle(frame).backgroundPositionY.split("px")[0])
      if (currBackgroundPos > 1024) {
        frame.style.backgroundPositionY = '0px';
      } else {
        frame.style.backgroundPositionY = currBackgroundPos + 0.5 + 'px';
      }

      this.BS.bullets.forEach((b: any) => {
        this.ES.enemies.forEach((e: any) => {
          if (e.hp <= 0) return;
          if (
            b.pos.t < e.pos.b - e.pos.h / 4 &&
            b.pos.l + 8 > e.pos.l &&
            b.pos.l < e.pos.l + e.pos.w &&
            b.pos.t > e.pos.t
          ) {
            this.BS.bullets = this.BS.bullets.filter((bul: any) => bul.id !== b.id)
            e.hp -= this.player.damage;
          }
        })
      })
    }, 16);

      this.ES.enemies.push({ id: Date.now(), pos: {} })
    setInterval(() => {
      if (!this.playing || this.PS.getRandom(0, 1) === 0 || this.ES.enemies.length >= this.settings.maxEnemies) return;
      this.ES.enemies.push({ id: Date.now(), pos: {} })
    }, this.settings.spawnRate)
  }
}
