import { Component, ViewChild, Input } from '@angular/core';
import { BulletsService } from 'src/app/services/bullets.service';
import { GameService } from 'src/app/services/game.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.scss']
})
export class BulletComponent {

  constructor(public pos: PositionService, public bs: BulletsService, public game: GameService) {}

  @ViewChild('bullet') bullet: any;
  @Input() id: any;

  rect: any;

  style: any = {
    l: '0px',
    t: '0px'
  }

  ngOnInit() {
    const playerRect = this.pos.getRect(this.pos.player.el)
    this.style.l = Math.round((playerRect.left + playerRect.width / 2 - 8 / 2)) + 'px';
    this.style.t = Math.round((playerRect.top + playerRect.height / 2)) + 'px';
    setInterval(() => {
      if (!this.game.playing) return;
      const currPosT = Number(this.style.t.split('px')[0]);
      if (currPosT < 0) {
        this.bs.bullets = this.bs.bullets.filter((b: any) => b !== this.id)
        return;
      };
      this.style.t = (currPosT - 8) + 'px';
    }, 16)
  }
}
