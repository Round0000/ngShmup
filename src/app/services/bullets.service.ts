import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BulletsService {
  constructor() { }

  bullets: any[] = [];
}
