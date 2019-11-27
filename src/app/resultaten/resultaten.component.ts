import { Component, OnInit } from '@angular/core';
import { SpelersService } from '../spelers/spelers.service';
import { Speler } from '../spelers/speler.model';
import { Prestatie } from '../spelers/prestatie.model';
import { Positie } from '../spelers/positie.enum';

@Component({
  selector: 'app-resultaten',
  templateUrl: './resultaten.component.html',
  styleUrls: ['./resultaten.component.css']
})
export class ResultatenComponent implements OnInit {

  constructor(
    private spelersService: SpelersService,
  ) { }

  ngOnInit() { }

  getPercentageWinst(eigenStand: number, scoreTegenstander: number): number {
    return (eigenStand * 100) / (eigenStand + scoreTegenstander);
  }

  vindBesteCombinatieBijSet(setnummer: number): Array<{ positie: string, voornaam: string, achternaam: string }> {

    const spelers: Array<Speler> = this.spelersService.getSpelersMetPrestaties();

    const spelersMet1Prestatie: Array<Speler> = this.transformNaarSpelersMet1Prestatie(spelers, setnummer);

    let buitenSpelers: Array<Speler> = [];
    let middenSpelers: Array<Speler> = [];
    let spelverdelers: Array<Speler> = [];
    let diagonalen: Array<Speler> = [];

    spelersMet1Prestatie.forEach(speler => {
      switch (speler.prestaties[0].positie) {
        case Positie.buiten:
        case 'libero_buiten':
          buitenSpelers.push(speler);
          buitenSpelers = this.sorteerSpelersOpPercentageWinst(buitenSpelers);
          break;
        case Positie.midden:
        case 'libero_midden':
          middenSpelers.push(speler);
          middenSpelers = this.sorteerSpelersOpPercentageWinst(middenSpelers);
          break;
        case Positie.spelverdeler:
          spelverdelers.push(speler);
          spelverdelers = this.sorteerSpelersOpPercentageWinst(spelverdelers);
          break;
        case Positie.diagonaal:
          diagonalen.push(speler);
          diagonalen = this.sorteerSpelersOpPercentageWinst(diagonalen);
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
                if (this.isZelfdeSpeler(temporaryOpstelling[i], temporaryOpstelling[j])) {
                  if (temporaryOpstelling[i].prestaties[0].positie.startsWith('libero')) {
                    const liberoIndex = temporaryOpstelling.indexOf(temporaryOpstelling[i]);
                    temporaryOpstelling.splice(liberoIndex, 1);
                  } else if (temporaryOpstelling[i].prestaties[0].positie.startsWith('libero')) {
                    const liberoIndex = temporaryOpstelling.indexOf(temporaryOpstelling[j]);
                    temporaryOpstelling.splice(liberoIndex, 1);
                  }
                  else {
                    zelfdeSpelerOpMeerderePosities = true;
                  }
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

        let gecombineerdeWaarde = spelers[i].prestaties[0].percentageWinst + spelers[j].prestaties[0].percentageWinst;
        const combinatie: Array<Speler> = [];

        if (!spelers[i].prestaties[0].positie.startsWith('libero')) {
          combinatie.push(spelers[i]);
        }
        if (!spelers[j].prestaties[0].positie.startsWith('libero')) {
          combinatie.push(spelers[j]);
        }

        for (let h = 0; h < spelers.length; h++) {
          if (spelers[h].prestaties[0].positie.startsWith('libero')) {

            const gecombineerdeWaardeMetLibero = (gecombineerdeWaarde + spelers[h].prestaties[0].percentageWinst) / 3 * 2;

            if (gecombineerdeWaardeMetLibero > gecombineerdeWaarde) {
              combinatie.push(spelers[h]);
              gecombineerdeWaarde = gecombineerdeWaardeMetLibero;
            }
          }
        }
        result.push({ gecombineerdeWaarde: gecombineerdeWaarde, spelers: combinatie })
      }
    }

    result = result.sort((a, b) => (a.gecombineerdeWaarde > b.gecombineerdeWaarde) ? -1 : 1);

    return result;
  }

  private transformNaarSpelersMet1Prestatie(spelers: Array<Speler>, setnummer: number): Array<Speler> {

    const spelersMet1Prestatie: Array<Speler> = [];
    const posities: Array<String> = [];
    posities.push(Positie.buiten);
    posities.push('libero_buiten');
    posities.push(Positie.midden);
    posities.push('libero_midden');
    posities.push(Positie.spelverdeler);
    posities.push(Positie.diagonaal);
    if (spelers.length > 0) {
      spelers.forEach(speler => {
        posities.forEach(positie => {
          const gevondenZelfdePrestaties: Array<Prestatie> = [];
          speler.prestaties.forEach(prestatie => {
            if (positie === prestatie.positie && prestatie.setnummer === setnummer) {
              gevondenZelfdePrestaties.push(prestatie);
            }
          });

          if (gevondenZelfdePrestaties.length > 0) {
            let totaal = 0;
            gevondenZelfdePrestaties.forEach(prestatie => {
              totaal = totaal + prestatie.percentageWinst;
            });
            const gemiddelde = totaal / gevondenZelfdePrestaties.length;

            const nieuwePrestatie: Prestatie = new Prestatie();
            nieuwePrestatie.percentageWinst = gemiddelde;
            nieuwePrestatie.positie = gevondenZelfdePrestaties[0].positie;
            nieuwePrestatie.setnummer = gevondenZelfdePrestaties[0].setnummer;

            const nieuweSpelerMet1Prestatie: Speler = new Speler();
            nieuweSpelerMet1Prestatie.achternaam = speler.achternaam;
            nieuweSpelerMet1Prestatie.voornaam = speler.voornaam;
            nieuweSpelerMet1Prestatie.prestaties = [nieuwePrestatie];
            spelersMet1Prestatie.push(nieuweSpelerMet1Prestatie);
          }
        });
      });
    }
    return spelersMet1Prestatie;
  }

  // sortering met 1 item in array geeft geen problemen.
  private sorteerSpelersOpPercentageWinst(spelers: Array<Speler>): Array<Speler> {
    return spelers.sort((a, b) => (a.prestaties[0].percentageWinst > b.prestaties[0].percentageWinst) ? -1 : 1);
  }

  private isZelfdeSpeler(spelerA: Speler, spelerB: Speler): boolean {
    return spelerA.voornaam === spelerB.voornaam && spelerA.achternaam === spelerB.achternaam;
  }
}
