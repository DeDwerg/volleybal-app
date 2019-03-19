import { Prestatie } from './prestatie.model';

export class Speler {
  voornaam: string;
  achternaam: string;
  prestaties: Array<Prestatie>;
  averagePrestatieBuiten?: number;
  averagePrestatieMidden?: number;
  averagePrestatieSpelverdeler?: number;
  averagePrestatieDiagonaal?: number;
  averagePrestatieLibero?: number;

}
