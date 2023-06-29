import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BulletsService {

  bullets: any[] = [];

  shoot(shotRate: number) {
    if (this.bullets.length) {
      if ((Date.now() - this.bullets.at(-1).id) < shotRate) return
    }
    this.bullets.push({ id: Date.now(), pos: {} })
  }
}
