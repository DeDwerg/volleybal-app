import { Component, OnInit } from '@angular/core';
import { SpelersService } from '../spelers/spelers.service';
import { Speler } from '../spelers/speler.model';

@Component({
  selector: 'app-resultaten',
  templateUrl: './resultaten.component.html',
  styleUrls: ['./resultaten.component.css']
})
export class ResultatenComponent implements OnInit {

  constructor(
    private spelersService: SpelersService
  ) { }

  ngOnInit() {
  }

  dummySpeler: Speler = {
    voornaam: 'niet',
    achternaam: 'gevonden',
    prestaties: [],
    averagePrestatieBuiten: 0,
    averagePrestatieMidden: 0,
    averagePrestatieSpelverdeler: 0,
    averagePrestatieDiagonaal: 0,
    averagePrestatieLibero: 0
  };

  vindBesteCombinatieBijSet(alleSpelers: Array<Speler>, setnummer: number): Array<{ positie: string, speler: Speler }> {
    // vindBesteCombinatie(): Array<{ positie: string, speler: Speler }> {
    // const alleSpelers = this.getSpelers();

    const alleBuitenSpelers: Array<Speler> = this.getAlleBuitenSpelers(alleSpelers);
    const alleBuitenCombinaties: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = this.getAlleCombinaties('buiten', alleBuitenSpelers);

    const alleMiddenSpelers: Array<Speler> = this.getAlleMiddenSpelers(alleSpelers);
    const alleMiddenCombinaties: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = this.getAlleCombinaties('midden', alleMiddenSpelers);

    const alleSpelverdelers: Array<Speler> = this.getAlleSpelverdelers(alleSpelers);
    const alleSpelverdelerCombinaties: Array<{ gecombineerdewaarde: number, spelers: Speler[] }> = [];

    alleSpelverdelers.forEach(speler => {
      const spelers: Array<Speler> = []
      spelers.push(speler);
      alleSpelverdelerCombinaties.push({ gecombineerdewaarde: speler.averagePrestatieSpelverdeler, spelers })
    });

    const alleLiberos: Array<Speler> = this.getAlleLiberos(alleSpelers);
    const alleLiberoCombinaties: Array<{ gecombineerdewaarde: number, spelers: Speler[] }> = [];

    alleLiberos.forEach(speler => {
      const spelers: Array<Speler> = []
      spelers.push(speler);
      alleLiberoCombinaties.push({ gecombineerdewaarde: speler.averagePrestatieLibero, spelers })
    });

    const alleDiagonalen: Array<Speler> = this.getAlleDiagonalen(alleSpelers);
    const alleDiagonaalCombinaties: Array<{ gecombineerdewaarde: number, spelers: Speler[] }> = [];

    alleDiagonalen.forEach(speler => {
      const spelers: Array<Speler> = []
      spelers.push(speler);
      alleDiagonaalCombinaties.push({ gecombineerdewaarde: speler.averagePrestatieDiagonaal, spelers })
    });

    let alleCombinaties: Array<{ totaleWaarde: number, spelers: Speler[] }> = [];




    alleBuitenCombinaties.forEach(buitenCombinatie => {
      alleMiddenCombinaties.forEach(middenCombinatie => {
        alleSpelverdelerCombinaties.forEach(spelverdelerCombinatie => {
          alleLiberoCombinaties.forEach(liberoCombinatie => {
            alleDiagonaalCombinaties.forEach(diagonaalCombinatie => {

              let spelers: Array<Speler> = [];
              buitenCombinatie.spelers.forEach(speler => {
                spelers.push(speler);
              });
              middenCombinatie.spelers.forEach(speler => {
                spelers.push(speler);
              });
              spelverdelerCombinatie.spelers.forEach(speler => {
                spelers.push(speler);
              });
              liberoCombinatie.spelers.forEach(speler => {
                spelers.push(speler);
              });
              diagonaalCombinatie.spelers.forEach(speler => {
                spelers.push(speler);
              });

              const totaleWaarde: number =
                buitenCombinatie.gecombineerdeWaarde +
                middenCombinatie.gecombineerdeWaarde +
                spelverdelerCombinatie.gecombineerdewaarde +
                liberoCombinatie.gecombineerdewaarde +
                diagonaalCombinatie.gecombineerdewaarde
                ;

              alleCombinaties.push({ totaleWaarde, spelers });
            });
          });
        });
      });
    });

    alleCombinaties.sort((a, b) => (a.totaleWaarde > b.totaleWaarde) ? -1 : 1);







    const spelersCombinaties: Array<{ positie: string, speler: Speler }[]> = [];
    alleCombinaties.forEach(combinatie => {

      const spelersInCombinatie: Array<{ positie: string, speler: Speler }> = [];

      combinatie.spelers.forEach(speler => {

        if (speler.averagePrestatieBuiten !== 0) {
          spelersInCombinatie.push({ positie: 'buiten', speler: speler });
        } else if (speler.averagePrestatieMidden !== 0) {
          spelersInCombinatie.push({ positie: 'midden', speler: speler });
        } else if (speler.averagePrestatieDiagonaal !== 0) {
          spelersInCombinatie.push({ positie: 'diagonaal', speler: speler });
        } else if (speler.averagePrestatieLibero !== 0) {
          spelersInCombinatie.push({ positie: 'libero', speler: speler });
        } else if (speler.averagePrestatieSpelverdeler !== 0) {
          spelersInCombinatie.push({ positie: 'spelverdeler', speler: speler });
        }
      });

      spelersCombinaties.push(spelersInCombinatie);
    });






    let besteCombinatie = this.vindBesteCombinatie(spelersCombinaties);

    return besteCombinatie;
  }





  private vindBesteCombinatie(spelersCombinaties: Array<{ positie: string, speler: Speler }[]>): Array<{ positie: string, speler: Speler }> {

    const besteCombinatie: Array<{ positie: string, speler: Speler }> = [];

    let counter = spelersCombinaties.length;

    for (let i = counter; i > 0; i--) {

      spelersCombinaties.forEach(combinatie => {
        if (besteCombinatie.length === 0) {
          let zelfdeGevonden = false;

          for (let i = 0; i < combinatie.length - 1; i++) {
            for (let j = i + 1; j < combinatie.length; j++) {
              if (combinatie[i].speler.voornaam === combinatie[j].speler.voornaam &&
                combinatie[i].speler.achternaam === combinatie[j].speler.achternaam) {
                zelfdeGevonden = true;
              }
            }
          }

          if (!zelfdeGevonden) {
            combinatie.forEach(element => {
              besteCombinatie.push({ positie: element.positie, speler: element.speler })
              element.positie;
            });
          }
        }
      });
    }
    return besteCombinatie;
  }






  private getAlleBuitenSpelers(alleSpelers: Array<Speler>): Array<Speler> {
    const buitenSpelers: Array<Speler> = [];
    alleSpelers.forEach(speler => {
      const averagePrestatie = this.getAverageVanPrestaties('buiten', speler);
      speler.averagePrestatieBuiten = averagePrestatie;
      if (speler.averagePrestatieBuiten !== 0) {
        speler.averagePrestatieMidden = 0;
        speler.averagePrestatieSpelverdeler = 0;
        speler.averagePrestatieDiagonaal = 0;
        speler.averagePrestatieLibero = 0;
        buitenSpelers.push(speler);
      }
    });
    if (buitenSpelers.length === 0) {
      buitenSpelers.push(this.dummySpeler);
    }
    return buitenSpelers;
  }

  private getAlleMiddenSpelers(alleSpelers: Array<Speler>): Array<Speler> {
    const middenspelers: Array<Speler> = [];
    alleSpelers.forEach(speler => {
      const averagePrestatie = this.getAverageVanPrestaties('midden', speler);
      speler.averagePrestatieMidden = averagePrestatie;
      if (speler.averagePrestatieMidden !== 0) {
        speler.averagePrestatieBuiten = 0;
        speler.averagePrestatieSpelverdeler = 0;
        speler.averagePrestatieDiagonaal = 0;
        speler.averagePrestatieLibero = 0;
        middenspelers.push(speler);
      }
    });
    if (middenspelers.length === 0) {
      middenspelers.push(this.dummySpeler);
    }
    return middenspelers;
  }

  private getAlleSpelverdelers(alleSpelers: Array<Speler>): Array<Speler> {
    const spelverdelers: Array<Speler> = [];
    alleSpelers.forEach(speler => {
      const averagePrestatie = this.getAverageVanPrestaties('spelverdeler', speler);
      speler.averagePrestatieSpelverdeler = averagePrestatie;
      if (speler.averagePrestatieSpelverdeler !== 0) {
        speler.averagePrestatieBuiten = 0;
        speler.averagePrestatieMidden = 0;
        speler.averagePrestatieDiagonaal = 0;
        speler.averagePrestatieLibero = 0;
        spelverdelers.push(speler);
      }
    });
    if (spelverdelers.length === 0) {
      spelverdelers.push(this.dummySpeler);
    }
    return spelverdelers;
  }

  private getAlleLiberos(alleSpelers: Array<Speler>): Array<Speler> {
    const liberos: Array<Speler> = [];
    alleSpelers.forEach(speler => {
      const averagePrestatie = this.getAverageVanPrestaties('libero', speler);
      speler.averagePrestatieLibero = averagePrestatie;
      if (speler.averagePrestatieLibero !== 0) {
        speler.averagePrestatieBuiten = 0;
        speler.averagePrestatieMidden = 0;
        speler.averagePrestatieDiagonaal = 0;
        speler.averagePrestatieSpelverdeler = 0;
        liberos.push(speler);
      }
    });
    if (liberos.length === 0) {
      liberos.push(this.dummySpeler);
    }
    return liberos;
  }

  private getAlleDiagonalen(alleSpelers: Array<Speler>): Array<Speler> {
    const diagonalen: Array<Speler> = [];
    alleSpelers.forEach(speler => {
      const averagePrestatie = this.getAverageVanPrestaties('diagonaal', speler);
      speler.averagePrestatieDiagonaal = averagePrestatie;
      if (speler.averagePrestatieDiagonaal !== 0) {
        speler.averagePrestatieBuiten = 0;
        speler.averagePrestatieMidden = 0;
        speler.averagePrestatieLibero = 0;
        speler.averagePrestatieSpelverdeler = 0;
        diagonalen.push(speler);
      }
    });
    if (diagonalen.length === 0) {
      diagonalen.push(this.dummySpeler);
    }
    return diagonalen;
  }

  private getAverageVanPrestaties(positie: string, speler: Speler): number {
    let totalePunten: number = 0;
    let totaleSets: number = 0;
    speler.prestaties.forEach(prestatie => {
      if (prestatie.positie === positie) {
        totalePunten = totalePunten + prestatie.behaaldepunten;
        prestatie.behaaldepunten;
        totaleSets = totaleSets + 1;
      }
    });
    if (totalePunten !== 0 && totaleSets !== 0) {
      return totalePunten / totaleSets;
    }
    return 0;
  }

  private getAlleCombinaties(positie: string, alleSpelers: Array<Speler>): Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> {
    const allecombinaties: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = [];

    for (let i = 0; i < alleSpelers.length - 1; i++) {
      for (let j = i + 1; j < alleSpelers.length; j++) {

        let gecombineerdeWaarde = 0;

        if (positie === 'buiten') {
          gecombineerdeWaarde = alleSpelers[i].averagePrestatieBuiten + alleSpelers[j].averagePrestatieBuiten;
        }
        if (positie === 'midden') {
          gecombineerdeWaarde = alleSpelers[i].averagePrestatieMidden + alleSpelers[j].averagePrestatieMidden;
        }
        const spelers: Array<Speler> = [];
        spelers.push(alleSpelers[i]);
        spelers.push(alleSpelers[j]);
        allecombinaties.push({ gecombineerdeWaarde, spelers });
      }
    }
    return allecombinaties;
  }

  getSpelers(): Array<Speler> {
    return this.spelersService.getSpelers();
  }
}
