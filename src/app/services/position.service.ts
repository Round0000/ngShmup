import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor() {}

  getRect(el: any) {
    return el.getBoundingClientRect();
  }

  frame: any = { width: 0, height: 0 };

  player: any = {};

  movePlayer(e: any) {
    this.player.rect.l = e.x - this.player.rect.w / 2;
    this.player.rect.r = e.x + this.player.rect.w;
    this.player.style = {
      top: this.player.rect.t + 'px',
      right: this.player.rect.r + 'px',
      bottom: this.player.rect.b + 'px',
      left: this.player.rect.l + 'px',
    };
  }

  getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit(): void {
    //
  }
}
