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
  @Input() obj: any;

  rect: any;

  style: any = {
    l: '0px',
    t: '0px'
  }

  ngOnInit() {
    const playerRect = this.pos.getRect(this.pos.player.el)
    this.obj.pos.l = Math.round((playerRect.left + playerRect.width / 2 - 4));
    this.style.l = this.obj.pos.l + 'px';
    this.obj.pos.t = Math.round((playerRect.top + playerRect.height / 2));
    this.style.t = this.obj.pos.t + 'px';
  }

  ngAfterViewInit() {
    const frameHeight = this.pos.frame.height;
    const rect = this.pos.getRect(this.bullet.nativeElement);
    this.obj.pos.w = rect.width;
    this.obj.pos.h = rect.height;
    this.obj.pos.b = rect.bottom;
    this.obj.pos.t = rect.top;

    setInterval(() => {
      if (!this.game.playing) return;

      if (this.obj.pos.t < 0) {
        this.bs.bullets = this.bs.bullets.filter((b: any) => b.id !== this.obj.id)
        return;
      };
      this.obj.pos.t -= 8;
      this.style.t = this.obj.pos.t + 'px';
      this.obj.pos.b -= 8;
    }, 16)
  }
}
