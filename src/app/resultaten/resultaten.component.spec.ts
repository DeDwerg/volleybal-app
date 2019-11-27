import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ResultatenComponent } from './resultaten.component';
import { SpelersService } from '../spelers/spelers.service';
import { Speler } from '../spelers/speler.model';
import { Positie } from '../spelers/positie.enum';
import { Prestatie } from '../spelers/prestatie.model';

describe('ResultatenComponent', () => {
  let component: ResultatenComponent;
  let fixture: ComponentFixture<ResultatenComponent>;
  let spelersService: SpelersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultatenComponent],
      providers: [SpelersService]
    })
      .compileComponents();
  }));

  beforeEach(inject([SpelersService], (sService: SpelersService) => {
    spelersService = sService;
    fixture = TestBed.createComponent(ResultatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  function createSpeler(setnummer: number, naam: string, percentageWinst: number, positie: string): Speler {
    const speler: Speler = {
      voornaam: naam,
      achternaam: naam,
      prestaties: [{
        setnummer: setnummer,
        percentageWinst: percentageWinst,
        positie: positie
      }]
    };
    return speler;
  }

  function createSpeler2(voornaam: string): Speler {
    return {
      achternaam: '',
      voornaam: voornaam,
      prestaties: []
    }
  }

  describe('initialSetup', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('test 1 starttest', () => {

      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('if there are no players at all', () => {
    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 2 2 spelers (zelfde)', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'diagonaal'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 3 1 speler', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 3.1 1 speler', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'diagonaal'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 4 hoogste eruit', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
    });
  });

  describe('test 5 volgorde mixup', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('test 6 dubbele positie', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));

      const spelerC: Speler = createSpeler(1, 'C', 33, 'midden');
      spelersService.addSpeler(spelerC);

      const prestatie: Prestatie = {
        percentageWinst: 47,
        positie: Positie.buiten,
        setnummer: 1
      };
      spelersService.addPrestatie(spelerC, prestatie);

      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
    });
  });

  describe('test 7 hoge score 1 spelverdeler', () => {

    beforeEach(() => {
      const spelerA: Speler = createSpeler(1, 'A', 51, 'spelverdeler');
      spelerA.prestaties.push({ setnummer: 1, percentageWinst: 99, positie: 'buiten' });

      const spelerC: Speler = createSpeler(1, 'C', 33, 'midden');
      spelerC.prestaties.push({ setnummer: 1, percentageWinst: 48, positie: 'buiten' });

      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));

      spelersService.addSpeler(spelerA);
      spelersService.addSpeler(spelerC);
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);

      // expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('test 8 no team possible', () => {

    beforeEach(() => {

      const spelerA: Speler = createSpeler(1, 'A', 51, 'spelverdeler');
      spelerA.prestaties.push({ setnummer: 1, percentageWinst: 99, positie: 'buiten' });

      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));

      spelersService.addSpeler(spelerA);
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 9 complexere situatie', () => {

    beforeEach(() => {
      const spelerA: Speler = createSpeler(1, 'A', 51, 'spelverdeler');
      spelerA.prestaties.push({ setnummer: 1, percentageWinst: 99, positie: 'buiten' });

      const spelerC: Speler = createSpeler(1, 'C', 33, 'midden');
      spelerC.prestaties.push({ setnummer: 1, percentageWinst: 48, positie: 'buiten' });

      const spelerF: Speler = createSpeler(1, 'F', 67, 'buiten');
      spelerF.prestaties.push({ setnummer: 1, percentageWinst: 80, positie: 'midden' });

      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));

      spelersService.addSpeler(spelerA);
      spelersService.addSpeler(spelerC);
      spelersService.addSpeler(spelerF);
    });

    it('should return the best combination', () => {
      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('test 10 nog complexer', () => {

    beforeEach(() => {
      const spelerA: Speler = createSpeler(1, 'A', 51, 'spelverdeler');
      spelerA.prestaties.push({ setnummer: 1, percentageWinst: 99, positie: 'buiten' });

      const spelerB: Speler = createSpeler(1, 'B', 50, 'diagonaal');
      spelerB.prestaties.push({ setnummer: 1, percentageWinst: 47, positie: 'spelverdeler' });

      const spelerC: Speler = createSpeler(1, 'C', 33, 'midden');
      spelerC.prestaties.push({ setnummer: 1, percentageWinst: 48, positie: 'buiten' });

      const spelerF: Speler = createSpeler(1, 'F', 67, 'buiten');
      spelerF.prestaties.push({ setnummer: 1, percentageWinst: 80, positie: 'midden' });

      const spelerG: Speler = createSpeler(1, 'G', 49, 'midden');
      spelerG.prestaties.push({ setnummer: 1, percentageWinst: 59, positie: 'diagonaal' });

      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));

      spelersService.addSpeler(spelerA);
      spelersService.addSpeler(spelerB);
      spelersService.addSpeler(spelerC);
      spelersService.addSpeler(spelerF);
      spelersService.addSpeler(spelerG);
    });

    it('should return the best combination', () => {
      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'buiten', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'G', achternaam: 'G' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'midden', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('sortering dingen', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'H', 20, 'buiten'));
    });

    it('should sort buitenspelers based on the hightest value', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result[0]).toEqual({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
      expect(result[1]).toEqual({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
    });

    it('should sort middenspelers based on the hightest value', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result[2]).toEqual({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result[3]).toEqual({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
    });

    it('should sort the complete team based on the hightest value', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
    });

    it('should sort the combinations based on the hightest value', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
    });
  });

  describe('test 11 vind beste bij setnummer', () => {

    beforeEach(() => {

      const spelerA: Speler = createSpeler(1, 'A', 51, 'spelverdeler');
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 2, percentageWinst: 51 });

      const spelerB: Speler = createSpeler(1, 'B', 50, 'diagonaal');
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 2, percentageWinst: 50 });

      const spelerC: Speler = createSpeler(1, 'C', 33, 'midden');
      spelerC.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 33 });

      const spelerD: Speler = createSpeler(1, 'D', 66, 'midden');
      spelerD.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 66 });

      const spelerE: Speler = createSpeler(1, 'E', 34, 'buiten');
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 34 });

      const spelerF: Speler = createSpeler(1, 'F', 67, 'buiten');
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 67 });

      const spelerG: Speler = createSpeler(2, 'G', 49, 'midden');

      spelersService.addSpeler(spelerA);
      spelersService.addSpeler(spelerB);
      spelersService.addSpeler(spelerC);
      spelersService.addSpeler(spelerD);
      spelersService.addSpeler(spelerE);
      spelersService.addSpeler(spelerF);
      spelersService.addSpeler(spelerG);
    });

    it('should return the best combinations for set 1', () => {

      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should return the best combinations for set 2', () => {
      const result = component.vindBesteCombinatieBijSet(2);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

  });

  describe('set 1 wel combi set 2 niet', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(2, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(2, 'A', 99, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(2, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(2, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(2, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(2, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(2, 'G', 49, 'midden'));
    });

    it('should return the best combinations for set 1', () => {

      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should return no combination for set 2', () => {
      const result = component.vindBesteCombinatieBijSet(2);
      expect(result.length).toBe(0);
    });
  });

  describe('set 2 wel combi set 1 niet', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(2, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'A', 99, 'buiten'));
      spelersService.addSpeler(createSpeler(2, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(2, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(2, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(2, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(2, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));
    });

    it('should return the best combinations for set 2', () => {

      const result = component.vindBesteCombinatieBijSet(2);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should return no combination for set 1', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result.length).toBe(0);
    });
  });

  describe('if there are no teams possible for set 1 and 2', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(2, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
    });

    it('should return no combination for set 1', () => {
      const result = component.vindBesteCombinatieBijSet(1);
      expect(result.length).toBe(0);
    });


    it('should return no combination for set 2', () => {
      const result = component.vindBesteCombinatieBijSet(2);
      expect(result.length).toBe(0);
    });
  });

  describe('if 5 sets are played', () => {

    beforeEach(() => {
      const spelerA: Speler = createSpeler(1, 'A', 51, 'spelverdeler');
      spelerA.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 99 });
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 4, percentageWinst: 51 });
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 3, percentageWinst: 51 });
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 2, percentageWinst: 51 });
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 5, percentageWinst: 51 });

      const spelerB: Speler = createSpeler(1, 'B', 50, 'diagonaal');
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 5, percentageWinst: 50 });
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 50 });
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 3, percentageWinst: 50 });
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 2, percentageWinst: 50 });
      spelerB.prestaties.push({ positie: 'spelverdeler', setnummer: 4, percentageWinst: 47 });

      const spelerC: Speler = createSpeler(1, 'C', 33, 'midden');
      spelerC.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 48 });
      spelerC.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 48 });
      spelerC.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 33 });
      spelerC.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 33 });
      spelerC.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 33 });
      spelerC.prestaties.push({ positie: 'midden', setnummer: 5, percentageWinst: 33 });

      const spelerD: Speler = createSpeler(1, 'D', 66, 'midden');
      spelerD.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 66 });
      spelerD.prestaties.push({ positie: 'midden', setnummer: 5, percentageWinst: 66 });
      spelerD.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 66 });
      spelerD.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 66 });

      const spelerE: Speler = createSpeler(1, 'E', 34, 'buiten');
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 34 });
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 34 });
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 34 });
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 5, percentageWinst: 34 });

      const spelerF: Speler = createSpeler(1, 'F', 67, 'buiten');
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 67 });
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 67 });
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 5, percentageWinst: 67 });
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 67 });
      spelerF.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 80 });

      const spelerG: Speler = createSpeler(2, 'G', 49, 'midden');
      spelerG.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 49 });
      spelerG.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 49 });
      spelerG.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 59 });

      spelersService.addSpeler(spelerA);
      spelersService.addSpeler(spelerB);
      spelersService.addSpeler(spelerC);
      spelersService.addSpeler(spelerD);
      spelersService.addSpeler(spelerE);
      spelersService.addSpeler(spelerF);
      spelersService.addSpeler(spelerG);
    });

    it('should give the proper setup for set 1', () => {
      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should give the proper setup for set 2', () => {
      const result = component.vindBesteCombinatieBijSet(2);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should give the proper setup for set 3', () => {
      const result = component.vindBesteCombinatieBijSet(3);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should give the proper setup for set 4', () => {
      const result = component.vindBesteCombinatieBijSet(4);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'buiten', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'G', achternaam: 'G' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'midden', voornaam: 'F', achternaam: 'F' });
    });

    it('should give the proper setup for set 5', () => {
      const result = component.vindBesteCombinatieBijSet(5);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('gemiddelde prestatie van', () => {

    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));

      const spelerC: Speler = createSpeler(1, 'C', 65, 'midden');
      spelerC.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 1 });

      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));

      spelersService.addSpeler(spelerC);
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
      expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
    });
  });


  describe('gemiddelde prestatie van heel veel spelen', () => {

    describe('simpel', () => {

      beforeEach(() => {
        const spelerA = createSpeler(1, 'A', 51, 'spelverdeler');
        spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 59 });
        spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 33 });
        const spelerB = createSpeler(1, 'B', 50, 'diagonaal');
        spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 59 });
        spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 33 });
        spelersService.addSpeler(spelerA);
        spelersService.addSpeler(spelerB);
        spelersService.addSpeler(createSpeler(1, 'C', 65, 'midden'));
        spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
        spelersService.addSpeler(createSpeler(1, 'E', 9, 'buiten'));
        spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
      });

      it('should return a team', () => {
        const result = component.vindBesteCombinatieBijSet(1);
        expect(result.length).toBe(6);
      });
    });

    describe('complexer', () => {

      beforeEach(() => {
        spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
        spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));

        const spelerC: Speler = createSpeler(1, 'C', 65, 'midden');
        spelerC.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 1 });

        spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));

        const spelerE: Speler = createSpeler(1, 'E', 9, 'buiten');
        spelerE.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 59 });
        spelerE.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 18 });
        spelerE.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 35 });
        spelerE.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 26 });
        spelerE.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 72 });
        spelerE.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 10 });
        spelerE.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 43 });

        spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
        spelersService.addSpeler(createSpeler(1, 'G', 49, 'midden'));

        spelersService.addSpeler(spelerC);
        spelersService.addSpeler(spelerE);
      });

      it('should return the best combinations', () => {
        const result = component.vindBesteCombinatieBijSet(1);

        expect(result.length).toBe(6);
        expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
        expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
        expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
        expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
        expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
        expect(result).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      });
    });
  });

  describe('libero ', () => {
    describe('buiten', () => {

      describe('possible without libero, impossible with', () => {
        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));

          const spelerD: Speler = createSpeler(1, 'D', 66, 'midden');
          spelerD.prestaties.push({ setnummer: 1, positie: 'libero_buiten', percentageWinst: 99 });

          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));

          spelersService.addSpeler(spelerD);
        });

        it('should provide the possible team', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(6);
          expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
          expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
          expect(result).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
          expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
          expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
          expect(result).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
        });
      });

      describe('als de buiten combinatie beter is met libero', () => {

        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'G', 60, 'libero_buiten'));
        });

        it('geef de combinatie met libero', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(7);
          expect(result).toContain({ positie: 'libero_buiten', voornaam: 'G', achternaam: 'G' });
        });
      });
      describe('als de buiten combinatie slechter is met libero', () => {

        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'G', 40, 'libero_buiten'));
        });

        it('geef de combinatie zonder libero', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(6);
          expect(result).not.toContain({ positie: 'libero_buiten', voornaam: 'G', achternaam: 'G' });
        });
      });
    });

    describe('midden', () => {
      describe('als de midden combinatie beter is met libero', () => {
        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'G', 60, 'libero_midden'));
        });
        it('geef de combinatie met libero', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(7);
          expect(result).toContain({ positie: 'libero_midden', voornaam: 'G', achternaam: 'G' });
        });
      });
      describe('als de midden combinatie slechter is met libero', () => {
        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'G', 40, 'libero_midden'));
        });
        it('geef de combinatie zonder libero', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(6);
          expect(result).not.toContain({ positie: 'libero_midden', voornaam: 'G', achternaam: 'G' });
        });
      });
    });

    describe('buiten en midden', () => {
      describe('als de buiten en midden beter zijn met libero', () => {
        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'G', 60, 'libero_buiten'));
          spelersService.addSpeler(createSpeler(1, 'H', 60, 'libero_midden'));
        });
        it('geef de combinatie met beide liberos', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(8);
          expect(result).toContain({ positie: 'libero_buiten', voornaam: 'G', achternaam: 'G' });
          expect(result).toContain({ positie: 'libero_midden', voornaam: 'H', achternaam: 'H' });
        });
      });
      describe('als alleen de buiten combinatie beter is', () => {
        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'G', 60, 'libero_buiten'));
          spelersService.addSpeler(createSpeler(1, 'H', 40, 'libero_midden'));
        });
        it('geef de combinatie met de buiten libero', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(7);
          expect(result).toContain({ positie: 'libero_buiten', voornaam: 'G', achternaam: 'G' });
        });
        it('geef de combinatie zonder de midden libero', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(7);
          expect(result).not.toContain({ positie: 'libero_midden', voornaam: 'H', achternaam: 'H' });
        });
      });

      describe('als alleen de midden combinatie beter is', () => {

        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'G', 40, 'libero_buiten'));
          spelersService.addSpeler(createSpeler(1, 'H', 60, 'libero_midden'));
        });
        it('geef de combinatie met midden libero', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(7);
          expect(result).toContain({ positie: 'libero_midden', voornaam: 'H', achternaam: 'H' });
        });
        it('geef de combinatie zonder de buiten libero', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(7);
          expect(result).not.toContain({ positie: 'libero_buiten', voornaam: 'G', achternaam: 'G' });
        })
      });
      describe('als beide combinaties slechter zijn', () => {
        beforeEach(() => {
          spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
          spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
          spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
          spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'F', 67, 'buiten'));
          spelersService.addSpeler(createSpeler(1, 'G', 40, 'libero_buiten'));
          spelersService.addSpeler(createSpeler(1, 'H', 40, 'libero_midden'));
        });
        it('geef de combinatie zonder liberos', () => {
          const result = component.vindBesteCombinatieBijSet(1);

          expect(result.length).toBe(6);
          expect(result).not.toContain({ positie: 'libero_buiten', voornaam: 'G', achternaam: 'G' });
          expect(result).not.toContain({ positie: 'libero_midden', voornaam: 'H', achternaam: 'H' });
        });
      });
    });
  });

  describe('if a player is not present', () => {
    beforeEach(() => {
      spelersService.addSpeler(createSpeler(1, 'A', 51, 'spelverdeler'));
      spelersService.addSpeler(createSpeler(1, 'B', 50, 'diagonaal'));
      spelersService.addSpeler(createSpeler(1, 'C', 33, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'D', 66, 'midden'));
      spelersService.addSpeler(createSpeler(1, 'E', 34, 'buiten'));

      const spelerF: Speler = createSpeler(1, 'F', 67, 'buiten');
      spelersService.addSpeler(spelerF);
      spelersService.addSpeler(createSpeler(1, 'G', 1, 'buiten'));

      spelersService.setSpelerUnavailable(spelerF);
    });

    it('test 1 starttest', () => {

      const result = component.vindBesteCombinatieBijSet(1);

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(result).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(result).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(result).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(result).toContain({ positie: 'buiten', voornaam: 'G', achternaam: 'G' });
    });
  });

  // percentage winst = behaalde punten tegenover alle gespeelde punten
  // 15 - 10 = 60
  // 16 - 25 = tot van 41 waarvan 16 gewonnen -> 39.02%
  // 17 - 25 = tot van 42 waarvan 17 gewonnen -> 40.47
  // 19 - 25 = 43
  // 21 - 25 = 46
  // 24 - 26 = 48
  // 25 - 16 = 61
  // 25 - 21 = 54
  // 25 - 22 = 53
  // 26 - 24 = 52


  // soort echte test voor schrijven
  //   const resultaat: Map<Map<string, string>, Positie> = new Map();
  //   resultaat.set(new Map<string, string>().set('A','A'), Positie.spelverdeler);
  //   resultaat.set(new Map<string, string>().set('B','B'), Positie.diagonaal);
  //   resultaat.set(new Map<string, string>().set('C','C'), Positie.midden);
  //   resultaat.set(new Map<string, string>().set('D','D'), Positie.midden);
  //   resultaat.set(new Map<string, string>().set('E','E'), Positie.buiten);
  //   resultaat.set(new Map<string, string>().set('F','F'), Positie.buiten);
  //   resultaat.set(new Map<string, string>().set('G','G'), Positie.midden);

  //   spelersService.addSetResultaat()

  // // const kaas: Map<Map<string, string>, Positie> = new Map();
  // // kaas.set(new Map<string, string>().set('',''), Positie.spelverdeler);

  // // spelersService.addSetResultaat(1, 25, 12, kaas)

  describe('offiele resultaten test', () => {

    beforeEach(() => {

      spelersService.addSpeler(createSpeler2('Mark'));
      spelersService.addSpeler(createSpeler2('Dimitri'));
      spelersService.addSpeler(createSpeler2('Bart'));
      spelersService.addSpeler(createSpeler2('Tijn'));
      spelersService.addSpeler(createSpeler2('Ryan'));
      spelersService.addSpeler(createSpeler2('Casper'));
      spelersService.addSpeler(createSpeler2('Thomas'));
      spelersService.addSpeler(createSpeler2('Mehmet'));

      const resultaat: Array<{ voornaam: string, achternaam: string, positie: Positie }> = [];
      resultaat.push({ voornaam: 'Mark', achternaam: '', positie: Positie.spelverdeler })
      resultaat.push({ voornaam: 'Dimitri', achternaam: '', positie: Positie.diagonaal })
      resultaat.push({ voornaam: 'Bart', achternaam: '', positie: Positie.midden })
      resultaat.push({ voornaam: 'Tijn', achternaam: '', positie: Positie.midden })
      resultaat.push({ voornaam: 'Ryan', achternaam: '', positie: Positie.buiten })
      resultaat.push({ voornaam: 'Casper', achternaam: '', positie: Positie.buiten })

      const resultaat2: Array<{ voornaam: string, achternaam: string, positie: Positie }> = [];
      resultaat2.push({ voornaam: 'Mark', achternaam: '', positie: Positie.spelverdeler })
      resultaat2.push({ voornaam: 'Dimitri', achternaam: '', positie: Positie.diagonaal })
      resultaat2.push({ voornaam: 'Bart', achternaam: '', positie: Positie.midden })
      resultaat2.push({ voornaam: 'Tijn', achternaam: '', positie: Positie.midden })
      resultaat2.push({ voornaam: 'Ryan', achternaam: '', positie: Positie.buiten })
      resultaat2.push({ voornaam: 'Casper', achternaam: '', positie: Positie.buiten })

      const resultaat3: Array<{ voornaam: string, achternaam: string, positie: Positie }> = [];
      resultaat3.push({ voornaam: 'Mark', achternaam: '', positie: Positie.spelverdeler })
      resultaat3.push({ voornaam: 'Dimitri', achternaam: '', positie: Positie.diagonaal })
      resultaat3.push({ voornaam: 'Bart', achternaam: '', positie: Positie.midden })
      resultaat3.push({ voornaam: 'Thomas', achternaam: '', positie: Positie.midden })
      resultaat3.push({ voornaam: 'Mehmet', achternaam: '', positie: Positie.buiten })
      resultaat3.push({ voornaam: 'Casper', achternaam: '', positie: Positie.buiten })

      spelersService.addSetResultaat(1, 17, 25, resultaat); //percentage ‭40,47619047619047619047619047619‬
      spelersService.addSetResultaat(1, 26, 24, resultaat2); // 52
      spelersService.addSetResultaat(1, 25, 22, resultaat3); // ‭53,191489361702127659574468085106‬
    });

    fit('should set the right results', () => {

      const result = component.vindBesteCombinatieBijSet(1);

      spelersService.getSpelers().forEach((speler) => {
        console.log(speler.prestaties);
      });

      expect(result.length).toBe(6);
      expect(result).toContain({ positie: Positie.spelverdeler, voornaam: 'Mark', achternaam: '' });
      expect(result).toContain({ positie: Positie.diagonaal, voornaam: 'Dimitri', achternaam: '' });
      expect(result).toContain({ positie: Positie.midden, voornaam: 'Thomas', achternaam: '' });
      expect(result).toContain({ positie: Positie.midden, voornaam: 'Bart', achternaam: '' });
      expect(result).toContain({ positie: Positie.buiten, voornaam: 'Mehmet', achternaam: '' });
      expect(result).toContain({ positie: Positie.buiten, voornaam: 'Casper', achternaam: '' });
    });
  });

  describe('officiele resultaten aparte sets', () => {

    beforeEach(() => {
      // smashing velsen
      const mark: Speler = createSpeler(1, 'Mark', 40, 'spelverdeler');
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 2, percentageWinst: 61 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 3, percentageWinst: 40 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 4, percentageWinst: 43 });
      // vcc
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 52 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 2, percentageWinst: 48 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 3, percentageWinst: 54 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 4, percentageWinst: 46 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 5, percentageWinst: 60 });
      // jonas h6
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 53 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 2, percentageWinst: 58 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 4, percentageWinst: 43 });

      const bart: Speler = createSpeler(1, 'Bart', 40, 'midden');
      bart.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 61 });
      bart.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 40 });
      bart.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 43 });

      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 52 });
      bart.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 48 });
      bart.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 54 });
      bart.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 46 });
      bart.prestaties.push({ positie: 'midden', setnummer: 5, percentageWinst: 60 });

      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 53 });
      bart.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 58 });
      bart.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 61 });

      const dimitri: Speler = createSpeler(1, 'Dimitri', 40, 'diagonaal');
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 2, percentageWinst: 61 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 3, percentageWinst: 40 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 43 });

      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 52 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 2, percentageWinst: 48 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 3, percentageWinst: 54 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 46 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 5, percentageWinst: 60 });

      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 53 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 2, percentageWinst: 58 });
      dimitri.prestaties.push({ positie: 'spelverdeler', setnummer: 3, percentageWinst: 61 });
      dimitri.prestaties.push({ positie: 'spelverdeler', setnummer: 4, percentageWinst: 43 });

      const ryan: Speler = createSpeler(1, 'Ryan', 40, 'buiten');
      ryan.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 61 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 40 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 43 });

      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 52 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 48 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 54 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 46 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 5, percentageWinst: 60 });

      ryan.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 58 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 61 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 43 });

      const tijn: Speler = createSpeler(1, 'Tijn', 40, 'midden');
      tijn.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 61 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 40 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 43 });

      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 52 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 48 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 54 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 46 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 5, percentageWinst: 60 });

      tijn.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 58 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 61 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 43 });

      const casper: Speler = createSpeler(1, 'Casper', 40, 'buiten');
      casper.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 61 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 40 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 43 });

      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 52 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 48 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 54 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 46 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 5, percentageWinst: 60 });

      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 53 });
      casper.prestaties.push({ positie: 'diagonaal', setnummer: 3, percentageWinst: 61 });
      casper.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 43 });

      const thomas: Speler = createSpeler(1, 'Thomas', 53, 'midden');
      thomas.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 61 });
      thomas.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 43 });

      const mehmet: Speler = createSpeler(1, 'Mehmet', 53, 'buiten');
      mehmet.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 58 });
      mehmet.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 43 });

      spelersService.addSpeler(thomas);
      spelersService.addSpeler(mehmet);
      spelersService.addSpeler(mark);
      spelersService.addSpeler(bart);
      spelersService.addSpeler(dimitri);
      spelersService.addSpeler(ryan);
      spelersService.addSpeler(tijn);
      spelersService.addSpeler(casper);
    });

    it('geeft de beste opstellingen', () => {
      const opstellingSet1 = component.vindBesteCombinatieBijSet(1);
      console.log('opstelling set 1');
      console.log(opstellingSet1);

      // const opstellingSet2 = component.vindBesteCombinatieBijSet(2);
      // console.log('opstelling set 2');
      // console.log(opstellingSet2);

      // const opstellingSet3 = component.vindBesteCombinatieBijSet(3);
      // console.log('opstelling set 3');
      // console.log(opstellingSet3);

      // const opstellingSet4 = component.vindBesteCombinatieBijSet(4);
      // console.log('opstelling set 4');
      // console.log(opstellingSet4);

      // const opstellingSet5 = component.vindBesteCombinatieBijSet(5);
      // console.log('opstelling set 5');
      // console.log(opstellingSet5);
    });
  });

  describe('officiele resultaten overall', () => {

    beforeEach(() => {
      // smashing velsen
      const mark: Speler = createSpeler(1, 'Mark', 40, 'spelverdeler');
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 61 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 40 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 43 });
      // vcc
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 52 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 48 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 54 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 46 });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: 60 });
      // jonas h6
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 22) });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 18) });
      mark.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: component.getPercentageWinst(19, 25) });

      const bart: Speler = createSpeler(1, 'Bart', 40, 'midden');
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 61 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 40 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 43 });

      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 52 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 48 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 54 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 46 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 60 });

      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 22) });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 18) });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 16) });

      const dimitri: Speler = createSpeler(1, 'Dimitri', 40, 'diagonaal');
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 61 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 40 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 43 });

      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 52 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 48 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 54 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 46 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 60 });

      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 22) });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 18) });
      dimitri.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 16) });
      dimitri.prestaties.push({ positie: 'spelverdeler', setnummer: 1, percentageWinst: component.getPercentageWinst(19, 25) });

      const ryan: Speler = createSpeler(1, 'Ryan', 40, 'buiten');
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 61 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 40 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 43 });

      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 52 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 48 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 54 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 46 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 60 });

      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 18) });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 16) });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: component.getPercentageWinst(19, 25) });

      const tijn: Speler = createSpeler(1, 'Tijn', 40, 'spelverdeler');
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 61 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 40 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 43 });

      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 52 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 48 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 54 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 46 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 60 });

      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 18) });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 16) });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: component.getPercentageWinst(19, 25) });

      const casper: Speler = createSpeler(1, 'Casper', 40, 'buiten');
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 61 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 40 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 43 });

      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 52 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 48 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 54 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 46 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 60 });

      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 22) });
      casper.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 16) });
      casper.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: component.getPercentageWinst(19, 25) });

      const thomas: Speler = createSpeler(1, 'Thomas', component.getPercentageWinst(25, 22), 'midden');
      thomas.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 16) });
      thomas.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: component.getPercentageWinst(19, 25) });

      const mehmet: Speler = createSpeler(1, 'Mehmet', component.getPercentageWinst(25, 22), 'buiten');
      mehmet.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: component.getPercentageWinst(25, 18) });
      mehmet.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: component.getPercentageWinst(19, 25) });

      spelersService.addSpeler(thomas);
      spelersService.addSpeler(mehmet);
      spelersService.addSpeler(mark);
      spelersService.addSpeler(bart);
      spelersService.addSpeler(dimitri);
      spelersService.addSpeler(ryan);
      spelersService.addSpeler(tijn);
      spelersService.addSpeler(casper);
    });

    it('geeft de beste opstellingen', () => {
      const opstellingSet1 = component.vindBesteCombinatieBijSet(1);
      console.log('beste opstelling overall');
      console.log(opstellingSet1);
    });
  });

  // aantal sets aanwezig - aantal sets gespeeld - percentage gespeeld
  // totaal   35 sets gespeeld

  // mehmet   26 23.25  89
  // bart     31 27.5   89
  // dimitri  31 27.25  88
  // casper   35 30.25  86
  // tijn     31 25.75  83
  // mark     35 28.75  82
  // ryan     35 28     80
  // thomas   26 20.25  78
});
