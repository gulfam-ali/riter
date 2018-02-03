import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private globals: Globals) {
      this.globals.setTitle( "About Wordsire" );
  }

  ngOnInit() {
  }

}
