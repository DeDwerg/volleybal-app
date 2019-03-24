import { Injectable } from '@angular/core';
import { Speler } from './speler.model';

@Injectable({
  providedIn: 'root'
})
export class SpelersService {

  private spelers: Array<Speler> = [];
  private unavailableSpelers: Array<Speler> = [];

  constructor() { }

  addSpeler(speler: Speler) {
    this.spelers.push(speler);
  }

  addPrestatie(speler: Speler) {
  }

  getSpelers(): Array<Speler> {
    return this.spelers;
  }

  getSpelersMetPrestaties(): Array<Speler> {
    let spelersToReturn: Array<Speler> = this.spelers;
    spelersToReturn.forEach(speler => {
      let unavailableSpelers = this.unavailableSpelers;
      unavailableSpelers.forEach(unavailableSpeler => {
        if (speler.voornaam === unavailableSpeler.voornaam && speler.achternaam === unavailableSpeler.achternaam) {
          const indexOfSpeler = spelersToReturn.indexOf(speler);
          spelersToReturn.splice(indexOfSpeler, 1);
        }
      });
    });

    let aantalSpelersMetPrestaites = 0;
    spelersToReturn.forEach(speler => {
      if(speler.prestaties.length > 0) {
        aantalSpelersMetPrestaites++;
      }
    });

    if(aantalSpelersMetPrestaites < 6) {
      return [];
    }
    return spelersToReturn;
  }

  setSpelerUnavailable(speler: Speler) {
    this.unavailableSpelers.push(speler);
  }

  setSpelerAvailable(speler: Speler) {

  }
}
