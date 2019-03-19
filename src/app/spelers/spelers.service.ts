import { Injectable } from '@angular/core';
import { Speler } from './speler.model';

@Injectable({
  providedIn: 'root'
})
export class SpelersService {

  private spelers: Array<Speler> = []

  constructor() { }

  addSpeler(speler: Speler) {
    this.spelers.push(speler);
  }

  getSpelers(): Array<Speler> {
    return this.spelers;
  }
}
