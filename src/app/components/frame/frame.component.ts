import { Component, HostListener, ViewChild } from '@angular/core';
import { BulletsService } from 'src/app/services/bullets.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {
  constructor(public bul: BulletsService, public game: GameService) {}

  @ViewChild('frame') frame: any;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.game.playing = !this.game.playing;
    }

    if (!this.game.playing) return;
    if (event.key === 'a') {
      this.bul.bullets.push(new Date())
    }
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.game.playing) return;
      const currBackgroundPos = Number(window.getComputedStyle(this.frame.nativeElement).backgroundPositionY.split("px")[0])
      this.frame.nativeElement.style.backgroundPositionY = currBackgroundPos + 0.5 + 'px'
    }, 16);
  }
}
