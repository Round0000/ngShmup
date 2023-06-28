import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BulletsService } from 'src/app/services/bullets.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  constructor(public pos: PositionService, public bul: BulletsService) {}

  @ViewChild('player') player: any;

  style: any = {}

  ngAfterViewInit() {
    this.pos.player.el = this.player.nativeElement;
    const rect = this.pos.getRect(this.pos.player.el);
    this.pos.player.rect = { t: rect.top, r: rect.right, b: rect.bottom, l: rect.left, w: rect.width, h: rect.height };
  }
}
