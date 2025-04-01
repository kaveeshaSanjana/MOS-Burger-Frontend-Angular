import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports : [HeaderComponent , RouterOutlet ,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MOS';

  constructor(public router : Router){}

}
