import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  loadMessage: string = '';

  constructor() { }

  add(message: string) {
      this.loadMessage = message;
  }

  clear() {
    this.loadMessage = '';
  }

}
