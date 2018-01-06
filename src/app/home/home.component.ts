import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemCount: number;
  goalText: string = 'I want to climb a mountain';
  goals = [];

  constructor() { }

  ngOnInit() {
    this.goals.push(this.goalText);
    this.itemCount = this.goals.length;
    this.goalText = '';
  }

  addItem()
  {
    this.goals.push(this.goalText);
    this.itemCount++;
    this.goalText = '';
  }

}
