import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private globals: Globals) {
      this.globals.setTitle( "Settings" );
      this.globals.setActiveMenu( "settings" );
  }

  ngOnInit() {
  }

}
