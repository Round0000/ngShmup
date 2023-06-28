import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameComponent } from './components/frame/frame.component';
import { PlayerComponent } from './chars/player/player.component';
import { BulletComponent } from './elements/bullet/bullet.component';
import { EnemyComponent } from './chars/enemy/enemy.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    PlayerComponent,
    BulletComponent,
    EnemyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
