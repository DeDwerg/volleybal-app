import { Speler } from './speler.model';

export enum EnumSpeler {
  // mark = createSpeler('mark', 'goor'),
  // bart = createSpeler('bart', 'wijnen')
}


https://stackoverflow.com/questions/41179474/use-object-in-typescript-enum


// export enum Positie {
//   spelverdeler = 'spelverdeler',
//   diagonaal = 'diagonaal',
//   buiten = 'buiten',
//   buiten_libero = 'buiten_libero',
//   midden = 'midden',
//   midden_libero = 'midden_libero'
// }



function createSpeler(voornaam: string, achternaam: string): Speler {
  const speler: Speler = {
    voornaam: voornaam,
    achternaam: achternaam
  };
  return speler;
}
