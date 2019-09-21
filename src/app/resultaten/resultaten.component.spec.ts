import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ResultatenComponent } from './resultaten.component';
import { SpelersService } from '../spelers/spelers.service';
import { Speler } from '../spelers/speler.model';

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
      spelerC.prestaties.push({ percentageWinst: 48, setnummer: 1, positie: 'buiten' });

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
  // 26 - 24 = 52

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

      const bart: Speler = createSpeler(1, 'Bart', 40, 'midden');
      bart.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 61 });
      bart.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 40 });
      bart.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 43 });

      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 52 });
      bart.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 48 });
      bart.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 54 });
      bart.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 46 });
      bart.prestaties.push({ positie: 'midden', setnummer: 5, percentageWinst: 60 });

      const dimitri: Speler = createSpeler(1, 'Dimitri', 40, 'diagonaal');
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 2, percentageWinst: 61 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 3, percentageWinst: 40 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 43 });

      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 52 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 2, percentageWinst: 48 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 3, percentageWinst: 54 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 46 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 5, percentageWinst: 60 });

      const ryan: Speler = createSpeler(1, 'Ryan', 40, 'buiten');
      ryan.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 61 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 40 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 43 });

      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 52 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 48 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 54 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 46 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 5, percentageWinst: 60 });

      const tijn: Speler = createSpeler(1, 'Tijn', 40, 'midden');
      tijn.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 61 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 40 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 43 });

      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 52 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 48 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 54 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 46 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 5, percentageWinst: 60 });

      const casper: Speler = createSpeler(1, 'Casper', 40, 'buiten');
      casper.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 61 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 40 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 43 });

      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 52 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 48 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 54 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 46 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 5, percentageWinst: 60 });

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

      const opstellingSet2 = component.vindBesteCombinatieBijSet(2);
      console.log('opstelling set 2');
      console.log(opstellingSet2);

      const opstellingSet3 = component.vindBesteCombinatieBijSet(3);
      console.log('opstelling set 3');
      console.log(opstellingSet3);

      const opstellingSet4 = component.vindBesteCombinatieBijSet(4);
      console.log('opstelling set 4');
      console.log(opstellingSet4);

      const opstellingSet5 = component.vindBesteCombinatieBijSet(5);
      console.log('opstelling set 5');
      console.log(opstellingSet5);
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

      const bart: Speler = createSpeler(1, 'Bart', 40, 'midden');
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 61 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 40 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 43 });

      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 52 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 48 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 54 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 46 });
      bart.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 60 });

      const dimitri: Speler = createSpeler(1, 'Dimitri', 40, 'diagonaal');
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 61 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 40 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 43 });

      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 52 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 48 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 54 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 46 });
      dimitri.prestaties.push({ positie: 'diagonaal', setnummer: 1, percentageWinst: 60 });

      const ryan: Speler = createSpeler(1, 'Ryan', 40, 'buiten');
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 61 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 40 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 43 });

      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 52 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 48 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 54 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 46 });
      ryan.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 60 });

      const tijn: Speler = createSpeler(1, 'Tijn', 40, 'spelverdeler');
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 61 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 40 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 43 });

      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 52 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 48 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 54 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 46 });
      tijn.prestaties.push({ positie: 'midden', setnummer: 1, percentageWinst: 60 });

      const casper: Speler = createSpeler(1, 'Casper', 40, 'buiten');
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 61 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 40 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 43 });

      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 52 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 48 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 54 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 46 });
      casper.prestaties.push({ positie: 'buiten', setnummer: 1, percentageWinst: 60 });

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
  // bart     8 8 100
  // casper   8 8 100
  // mark     8 8 100
  // tijn     8 8 100
  // dimitri  8 8 100
  // ryan     8 8 100
  // thomas
});
