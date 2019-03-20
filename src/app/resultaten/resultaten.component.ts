import { Component, OnInit } from '@angular/core';
import { SpelersService } from '../spelers/spelers.service';
import { Speler } from '../spelers/speler.model';
import { Prestatie } from '../spelers/prestatie.model';
import { combineLatest } from 'rxjs';

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
    prestaties: []
  };

  buiten: string = 'buiten';
  midden: string = 'midden';
  spelverdeler: string = 'spelverdeler';
  diagonaal: string = 'diagonaal';
  libero: string = 'libero';

  vindBesteCombinatieBijSet(alleSpelers: Array<Speler>, setnummer: number): Array<{ positie: string, speler: Speler, setnummer: number }> {

    alleSpelers.forEach(speler => {
      speler.averagePrestatie = [];
    });

    const alleBuitenSpelers: Array<Speler> = this.getAlleSpelers(this.buiten, alleSpelers, setnummer);
    const alleBuitenCombinaties: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = this.getAlleCombinaties(this.buiten, alleBuitenSpelers);

    const alleMiddenSpelers: Array<Speler> = this.getAlleSpelers(this.midden, alleSpelers, setnummer);
    const alleMiddenCombinaties: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = this.getAlleCombinaties(this.midden, alleMiddenSpelers);

    const alleSpelverdelers: Array<Speler> = this.getAlleSpelers(this.spelverdeler, alleSpelers, setnummer);
    const alleSpelverdelerCombinaties: Array<{ gecombineerdewaarde: number, spelers: Speler[] }> = [];

    alleSpelverdelers.forEach(speler => {
      const spelers: Array<Speler> = [];
      spelers.push(speler);
      if (speler.averagePrestatie !== undefined) {
        speler.averagePrestatie.forEach(prestatie => {
          if (prestatie.positie === this.spelverdeler) {
            alleSpelverdelerCombinaties.push({ gecombineerdewaarde: prestatie.behaaldepunten, spelers });
          }
        });
      } else {
        speler.averagePrestatie = [];
        alleSpelverdelerCombinaties.push({ gecombineerdewaarde: 0, spelers });
      }
    });

    const alleLiberos: Array<Speler> = this.getAlleSpelers(this.libero, alleSpelers, setnummer);
    const alleLiberoCombinaties: Array<{ gecombineerdewaarde: number, spelers: Speler[] }> = [];

    alleLiberos.forEach(speler => {
      const spelers: Array<Speler> = []
      spelers.push(speler);
      if (speler.averagePrestatie !== undefined) {
        speler.averagePrestatie.forEach(prestatie => {
          if (prestatie.positie === this.libero) {
            alleLiberoCombinaties.push({ gecombineerdewaarde: prestatie.behaaldepunten, spelers });
          }
        });
      } else {
        speler.averagePrestatie = [];
        alleLiberoCombinaties.push({ gecombineerdewaarde: 0, spelers });
      }
    });

    const alleDiagonalen: Array<Speler> = this.getAlleSpelers(this.diagonaal, alleSpelers, setnummer);
    const alleDiagonaalCombinaties: Array<{ gecombineerdewaarde: number, spelers: Speler[] }> = [];

    alleDiagonalen.forEach(speler => {
      const spelers: Array<Speler> = [];
      spelers.push(speler);
      if (speler.averagePrestatie !== undefined) {
        speler.averagePrestatie.forEach(prestatie => {
          if (prestatie.positie === this.diagonaal) {
            alleDiagonaalCombinaties.push({ gecombineerdewaarde: prestatie.behaaldepunten, spelers });
          }
        });
      } else {
        speler.averagePrestatie = [];
        alleDiagonaalCombinaties.push({ gecombineerdewaarde: 0, spelers });
      }
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
                buitenCombinatie.gecombineerdeWaarde
                + middenCombinatie.gecombineerdeWaarde
                + spelverdelerCombinatie.gecombineerdewaarde
                + liberoCombinatie.gecombineerdewaarde
                + diagonaalCombinatie.gecombineerdewaarde
                ;

              alleCombinaties.push({ totaleWaarde, spelers });
            });
          });
        });
      });
    });

    alleCombinaties.sort((a, b) => (a.totaleWaarde > b.totaleWaarde) ? -1 : 1);

    console.log(alleCombinaties.length);



    const spelersCombinaties: Array<{ positie: string, speler: Speler, setnummer: number }[]> = [];
    alleCombinaties.forEach(combinatie => {

      const spelersInCombinatie: Array<{ positie: string, speler: Speler, setnummer: number }> = [];

      combinatie.spelers.forEach(speler => {
        speler.averagePrestatie.forEach(prestatie => {
          if (prestatie.positie === this.buiten) {
            spelersInCombinatie.push({ positie: this.buiten, speler: speler, setnummer: prestatie.setnummer });
          } else if (prestatie.positie === this.midden) {
            spelersInCombinatie.push({ positie: this.midden, speler: speler, setnummer: prestatie.setnummer });
          } else if (prestatie.positie === this.diagonaal) {
            spelersInCombinatie.push({ positie: this.diagonaal, speler: speler, setnummer: prestatie.setnummer });
          } else if (prestatie.positie === this.libero) {
            spelersInCombinatie.push({ positie: this.libero, speler: speler, setnummer: prestatie.setnummer });
          } else if (prestatie.positie === this.spelverdeler) {
            spelersInCombinatie.push({ positie: this.spelverdeler, speler: speler, setnummer: prestatie.setnummer });
          }
        });
      });

      spelersCombinaties.push(spelersInCombinatie);
    });

    console.log(spelersCombinaties.length);
    let besteCombinatie = this.vindBesteCombinatie(spelersCombinaties);

    return besteCombinatie;
  }

  private vindBesteCombinatie(spelersCombinaties: Array<{ positie: string, speler: Speler }[]>): Array<{ positie: string, speler: Speler, setnummer: number }> {

    const besteCombinatie: Array<{ positie: string, speler: Speler, setnummer: number }> = [];

    let counter = spelersCombinaties.length;

    for (let set = 1; set < 6; set++) {
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
                besteCombinatie.push({ positie: element.positie, speler: element.speler, setnummer: element.speler.averagePrestatie[0].setnummer });
              });
            }
          }
        });
      }
    }

    return besteCombinatie;
  }

  private getAlleSpelers(positie: string, alleSpelers: Array<Speler>, setnummer: number): Array<Speler> {
    const spelers: Array<Speler> = [];
    alleSpelers.forEach(speler => {
      const averagePrestatie = this.getAverageVanPrestaties(positie, speler, setnummer);
      speler.averagePrestatie.push(averagePrestatie);
      speler.averagePrestatie.forEach(prestatie => {
        if (prestatie.positie === positie) {
          spelers.push(speler);
        }
      });
    });
    if (spelers.length === 0) {
      spelers.push(this.dummySpeler);
    }
    return spelers;
  }

  private getAverageVanPrestaties(positie: string, speler: Speler, setnummer: number): Prestatie {
    let totalePunten: number = 0;
    let totaleSets: number = 0;
    speler.prestaties.forEach(prestatie => {
      if (prestatie.positie === positie && prestatie.setnummer === setnummer) {
        totalePunten = totalePunten + prestatie.behaaldepunten;
        prestatie.behaaldepunten;
        totaleSets = totaleSets + 1;
      }
    });
    if (totalePunten !== 0 && totaleSets !== 0) {
      return { behaaldepunten: (totalePunten / totaleSets), positie: positie, setnummer: setnummer }
    }
    return { behaaldepunten: 0, positie: '', setnummer: 0 };
  }

  private getAlleCombinaties(positie: string, alleSpelers: Array<Speler>): Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> {
    const allecombinaties: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = [];

    for (let i = 0; i < alleSpelers.length - 1; i++) {
      for (let j = i + 1; j < alleSpelers.length; j++) {

        let gecombineerdeWaarde = 0;

        if (positie === this.buiten) {
          alleSpelers[i].averagePrestatie.forEach(prestatieSpeler1 => {
            alleSpelers[j].averagePrestatie.forEach(prestatieSpeler2 => {
              if (prestatieSpeler1.positie === this.buiten && prestatieSpeler2.positie === this.buiten) {
                gecombineerdeWaarde = prestatieSpeler1.behaaldepunten + prestatieSpeler2.behaaldepunten;
              }
            });
          });
        }
        if (positie === this.midden) {
          alleSpelers[i].averagePrestatie.forEach(prestatieSpeler1 => {
            alleSpelers[j].averagePrestatie.forEach(prestatieSpeler2 => {
              if (prestatieSpeler1.positie === this.midden && prestatieSpeler2.positie === this.midden) {
                gecombineerdeWaarde = prestatieSpeler1.behaaldepunten + prestatieSpeler2.behaaldepunten;
              }
            });
          });
        }
        if (gecombineerdeWaarde !== 0) {
          const spelers: Array<Speler> = [];
          spelers.push(alleSpelers[i]);
          spelers.push(alleSpelers[j]);
          allecombinaties.push({ gecombineerdeWaarde, spelers });
        }
      }
    }
    return allecombinaties;
  }

  getSpelers(): Array<Speler> {
    return this.spelersService.getSpelers();
  }
}
