import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnemiesService {

  constructor() { }

  enemies: any[] = [];
}
