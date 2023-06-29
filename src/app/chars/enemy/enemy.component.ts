import { Component, ViewChild, Input } from '@angular/core';
import { BulletsService } from 'src/app/services/bullets.service';
import { EnemiesService } from 'src/app/services/enemies.service';
import { GameService } from 'src/app/services/game.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent {
  constructor(public pos: PositionService, public bs: BulletsService, public game: GameService, public enm: EnemiesService) {}

  @ViewChild('enemy') enemy: any;
  @Input() obj: any;

  rect: any;

  style: any = {
    l: '0px',
    t: '-64px'
  }

  ngOnInit() {
    this.obj.pos.l = this.pos.getRandom(32, this.pos.frame.width - 32);
    this.style.l = this.obj.pos.l + 'px';
    this.obj.hp = 100;
  }

  ngAfterViewInit() {
    const frameHeight = this.pos.frame.height;
    const rect = this.pos.getRect(this.enemy.nativeElement);
    this.obj.pos.w = rect.width;
    this.obj.pos.h = rect.height;
    this.obj.pos.b = rect.bottom;
    this.obj.pos.t = rect.top;

    setInterval(() => {
      if (!this.game.playing) return;

      if (this.obj.pos.t > frameHeight) {
        this.enm.enemies = this.enm.enemies.filter((e: any) => e.id !== this.obj.id)
        return;
      };
      this.obj.pos.t += 1;
      this.style.t = this.obj.pos.t + 'px';
      this.obj.pos.b += 1;

      if (this.obj.hp <= 0) {
        setTimeout(() => {
          this.enm.enemies = this.enm.enemies.filter((e: any) => e.id !== this.obj.id)
        }, 500);
      }
    }, 16)
  }
}
