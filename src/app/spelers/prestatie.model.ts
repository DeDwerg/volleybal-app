export class Prestatie {
  setnummer: number;
  /**behaalde punten is in percentage 25pt = 100% en alles boven 25 wordt naar 25 berekend */
  behaaldepunten: number;
  positie: string;
}
//setnummer
//behaaldepunten in percentage: berekening: 35-33 tov 25-12. 35-33 = 94% = 25-23.57 -> zinvol bij verliezende sets
//positie
