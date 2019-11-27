import { Injectable } from '@angular/core';
import { Speler } from './speler.model';
import { Set } from '../set/Set.model';
import { Positie } from './positie.enum';
import { Prestatie } from './prestatie.model';

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

  addPrestatie(spelerMetNieuwePrestatie: Speler, prestatie: Prestatie) {
    this.spelers.forEach((speler) => {
      if(speler.voornaam === spelerMetNieuwePrestatie.voornaam && speler.achternaam === spelerMetNieuwePrestatie.achternaam) {
        speler.prestaties.push(prestatie);
      }
    });
  }

  addSetResultaat(setnummer: number, puntenVoor: number, puntenTegen: number, spelers: Array<{voornaam: string, achternaam: string, positie: Positie}>) {
    const winstPercentage: number = (puntenVoor * 100) / (puntenTegen + puntenVoor);
    spelers.forEach(element => {
      const prestatie: Prestatie = {
        percentageWinst: winstPercentage,
        positie: element.positie,
        setnummer: setnummer
      };

      const speler: Speler = {
        voornaam: element.voornaam,
        achternaam: element.achternaam,
      };
      this.addPrestatie(speler, prestatie);
    });
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

  addWedstrijdSet(set: Set) {

  }
}
