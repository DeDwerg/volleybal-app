import { Component, OnInit } from '@angular/core';
import { SpelersService } from '../spelers/spelers.service';
import { Speler } from '../spelers/speler.model';
import { Prestatie } from '../spelers/prestatie.model';

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

  vindBesteCombinatieBijSet(setnummer: number): Array<{ positie: string, voornaam: string, achternaam: string }> {

    const spelers: Array<Speler> = this.spelersService.getSpelers();

    const spelersMet1Prestatie: Array<Speler> = [];

    spelers.forEach(speler => {
      if (speler.prestaties.length > 1) {
        for (let i = 0; i < speler.prestaties.length - 1; i++) {
          for (let j = i + 1; j < speler.prestaties.length; j++) {
            if (speler.prestaties[i].positie === speler.prestaties[j].positie &&
              speler.prestaties[i].setnummer === speler.prestaties[j].setnummer) {
              // 2x op zelfde positie gespeeld in dezelfde set
              const indexI = speler.prestaties.indexOf(speler.prestaties[i]);
              const indexJ = speler.prestaties.indexOf(speler.prestaties[j]);

              const gemiddeldeGehaaldePunten = (speler.prestaties[i].percentageWinst + speler.prestaties[j].percentageWinst) / 2;
              let gemiddeldePrestatie: Prestatie = { percentageWinst: gemiddeldeGehaaldePunten, setnummer: speler.prestaties[i].setnummer, positie: speler.prestaties[i].positie};

              speler.prestaties.splice(indexJ, 1); // volgorde afhankelijk
              speler.prestaties.splice(indexI, 1);

              speler.prestaties.push(gemiddeldePrestatie);

            }
          }
        }
        speler.prestaties.forEach(prestatie => {
          if (prestatie.setnummer === setnummer) {
            const spelerMet1Prestatie: Speler = { voornaam: speler.voornaam, achternaam: speler.achternaam, prestaties: [prestatie] };
            spelersMet1Prestatie.push(spelerMet1Prestatie);
          }
        });
      } else {
        if (speler.prestaties[0].setnummer === setnummer) {
          spelersMet1Prestatie.push(speler);
        }
      }
    });

    let buitenSpelers: Array<Speler> = [];
    let middenSpelers: Array<Speler> = [];
    let spelverdelers: Array<Speler> = [];
    let diagonalen: Array<Speler> = [];

    spelersMet1Prestatie.forEach(speler => {
      switch (speler.prestaties[0].positie) {
        case 'buiten':
          buitenSpelers.push(speler);
          buitenSpelers = this.sorteerSpelersOppercentageWinst(buitenSpelers);
          break;
        case 'midden':
          middenSpelers.push(speler);
          middenSpelers = this.sorteerSpelersOppercentageWinst(middenSpelers);
          break;
        case 'spelverdeler':
          spelverdelers.push(speler);
          spelverdelers = this.sorteerSpelersOppercentageWinst(spelverdelers);
          break;
        case 'diagonaal':
          diagonalen.push(speler);
          diagonalen = this.sorteerSpelersOppercentageWinst(diagonalen);
          break;
      }
    });

    let buitenCombinaties: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = [];
    let middenCombinaties: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = [];

    if (buitenSpelers.length >= 2) {
      buitenCombinaties = this.getCombinaties(buitenSpelers);
    } else if (buitenSpelers.length < 2) {
      return []; // geen combinatie gevonden
    }

    if (middenSpelers.length >= 2) {
      middenCombinaties = this.getCombinaties(middenSpelers);
    } else if (middenSpelers.length < 2) {
      return [];
    }

    if (spelverdelers.length < 1) {
      return [];
    }

    if (diagonalen.length < 1) {
      return [];
    }

    let gevondenTeamOpstellingen: Array<{ totaleWaarde: number, spelers: Speler[] }> = [];

    buitenCombinaties.forEach(buitenCombinaties => {
      middenCombinaties.forEach(middenCombinatie => {
        spelverdelers.forEach(spelverdeler => {
          diagonalen.forEach(diagonaal => {

            const temporaryOpstelling: Array<Speler> = [];
            let totaleWaarde: number = 0;

            buitenCombinaties.spelers.forEach(buitenSpeler => {
              temporaryOpstelling.push(buitenSpeler);
              totaleWaarde = totaleWaarde + buitenSpeler.prestaties[0].percentageWinst;
            });

            middenCombinatie.spelers.forEach(middenSpeler => {
              temporaryOpstelling.push(middenSpeler);
              totaleWaarde = totaleWaarde + middenSpeler.prestaties[0].percentageWinst;
            });

            temporaryOpstelling.push(spelverdeler);
            totaleWaarde = totaleWaarde + spelverdeler.prestaties[0].percentageWinst;

            temporaryOpstelling.push(diagonaal);
            totaleWaarde = totaleWaarde + diagonaal.prestaties[0].percentageWinst;

            let zelfdeSpelerOpMeerderePosities: boolean = false;

            for (let i = 0; i < temporaryOpstelling.length - 1; i++) {
              for (let j = i + 1; j < temporaryOpstelling.length; j++) {
                if (temporaryOpstelling[i].voornaam === temporaryOpstelling[j].voornaam &&
                  temporaryOpstelling[i].achternaam === temporaryOpstelling[j].achternaam
                ) {
                  zelfdeSpelerOpMeerderePosities = true;
                }
              }
            }

            if (!zelfdeSpelerOpMeerderePosities) {
              gevondenTeamOpstellingen.push({ totaleWaarde: totaleWaarde, spelers: temporaryOpstelling });
            }
          });
        });
      });
    });

    if (gevondenTeamOpstellingen.length === 0) { // dit kan als er 6+ spelers zijn maar geen team gevormd kan worden.
      return [];
    }

    gevondenTeamOpstellingen = gevondenTeamOpstellingen.sort((a, b) => (a.totaleWaarde > b.totaleWaarde) ? -1 : 1);

    const besteOpstelling: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

    gevondenTeamOpstellingen[0].spelers.forEach(speler => {
      besteOpstelling.push({ positie: speler.prestaties[0].positie, voornaam: speler.voornaam, achternaam: speler.achternaam });
    });

    return besteOpstelling;
  }

  private getCombinaties(spelers: Array<Speler>): Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> {

    let result: Array<{ gecombineerdeWaarde: number, spelers: Speler[] }> = [];

    for (let i = 0; i < spelers.length - 1; i++) {
      for (let j = i + 1; j < spelers.length; j++) {

        const gecombineerdeWaarde = spelers[i].prestaties[0].percentageWinst + spelers[j].prestaties[0].percentageWinst;
        const combinatie: Array<Speler> = [];
        combinatie.push(spelers[i]);
        combinatie.push(spelers[j]);

        result.push({ gecombineerdeWaarde: gecombineerdeWaarde, spelers: combinatie })
      }
    }

    result = result.sort((a, b) => (a.gecombineerdeWaarde > b.gecombineerdeWaarde) ? -1 : 1); // sortering kan verkeerdom zijn.
    return result;
  }

  // sortering met 1 item in array geeft geen problemen.
  private sorteerSpelersOppercentageWinst(spelers: Array<Speler>): Array<Speler> {
    return spelers.sort((a, b) => (a.prestaties[0].percentageWinst > b.prestaties[0].percentageWinst) ? -1 : 1);
  }
}
