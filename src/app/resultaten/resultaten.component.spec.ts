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

  function createSpeler(setnummer: number, naam: string, behaaldepunten: number, positie: string): Speler {
    const speler: Speler = {
      voornaam: naam,
      achternaam: naam,
      prestaties: [{
        setnummer: setnummer,
        behaaldepunten: behaaldepunten,
        positie: positie
      }]
    };
    return speler;
  }

  describe('initialSetup', () => {

    const alleSpelers: Array<Speler> = [];

    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('test 1 starttest', () => {

      console.log(new Date);

      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      console.log(new Date);
      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('if there are no players at all', () => {
    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet([], 1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 2 2 spelers (zelfde)', () => {

    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'A', 51, 'diagonaal'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 3 1 speler', () => {

    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 3.1 1 speler', () => {

    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'diagonaal'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 4 hoogste eruit', () => {

    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });


  describe('test 5 volgorde mixup', () => {

    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('test 6 dubbele positie', () => {


    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'C', 48, 'buiten'));
      alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('test 7 hoge score 1 spelverdeler', () => {

    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'A', 99, 'buiten'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'C', 48, 'buiten'));
      alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('test 8 no team possible', () => {

    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {

      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'A', 99, 'buiten'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('should return the best combinations', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);
      expect(result.length).toBe(0);
    });
  });

  describe('test 9 complexere situatie', () => {
    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'A', 99, 'buiten'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'C', 48, 'buiten'));
      alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 80, 'midden'));
    });

    it('should return the best combination', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('test 10 nog complexer', () => {
    const alleSpelers: Array<Speler> = [];
    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'A', 99, 'buiten'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'B', 47, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'C', 48, 'buiten'));
      alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(1, 'G', 59, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 80, 'midden'));
    });

    it('should return the best combination', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'F', achternaam: 'F' });
    });
  });

  describe('test 11 vind beste bij setnummer', () => {

    const alleSpelers: Array<Speler> = [];

    beforeEach(() => {
      // test 1 en 4
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(2, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(2, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(2, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(2, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(2, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(2, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(2, 'G', 49, 'midden'));
    });

    it('should return the best combinations for set 1', () => {

      console.log(new Date);

      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should return the best combinations for set 2', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 2);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

  });

  describe('set 1 wel combi set 2 niet', () => {

    const alleSpelers: Array<Speler> = [];

    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(2, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(2, 'A', 99, 'buiten'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(2, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(2, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(2, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(2, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(2, 'G', 49, 'midden'));
    });

    it('should return the best combinations for set 1', () => {

      console.log(new Date);

      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should return no combination for set 2', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 2);
      expect(result.length).toBe(0);
    });
  });

  describe('set 2 wel combi set 1 niet', () => {

    const alleSpelers: Array<Speler> = [];

    beforeEach(() => {
      alleSpelers.push(createSpeler(2, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'A', 99, 'buiten'));
      alleSpelers.push(createSpeler(2, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(2, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(2, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(2, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(2, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
    });

    it('should return the best combinations for set 2', () => {

      console.log(new Date);

      const result = component.vindBesteCombinatieBijSet(alleSpelers, 2);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    it('should return no combination for set 1', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);
      expect(result.length).toBe(0);
    });
  });

  describe('if there are no teams possible for set 1 and 2', () => {
    const alleSpelers: Array<Speler> = [];

    beforeEach(() => {
      alleSpelers.push(createSpeler(2, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
    });

    it('should return no combination for set 1', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);
      expect(result.length).toBe(0);
    });


    it('should return no combination for set 2', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 2);
      expect(result.length).toBe(0);
    });
  });

  describe('if 5 sets are played', () => {

    const alleSpelers: Array<Speler> = [];

    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(3, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(3, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(2, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(2, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(5, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(4, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(4, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(4, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(4, 'A', 99, 'buiten'));
      alleSpelers.push(createSpeler(5, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(4, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(4, 'B', 47, 'spelverdeler'));
      alleSpelers.push(createSpeler(3, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(5, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(3, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(2, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(4, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(4, 'C', 48, 'buiten'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(2, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(2, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(3, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(5, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(3, 'C', 48, 'buiten'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(4, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(4, 'G', 59, 'diagonaal'));
      alleSpelers.push(createSpeler(2, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(2, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(3, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(5, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(5, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(4, 'F', 67, 'buiten'));
      alleSpelers.push(createSpeler(4, 'F', 80, 'midden'));
      alleSpelers.push(createSpeler(3, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
    });

    it('should give the proper setup for set 1', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 1);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    fit('should give the proper setup for set 2', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 2);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    fit('should give the proper setup for set 3', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 3);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });

    fit('should give the proper setup for set 4', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 4);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'G', achternaam: 'G' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'F', achternaam: 'F' });
    });

    fit('should give the proper setup for set 5', () => {
      const result = component.vindBesteCombinatieBijSet(alleSpelers, 5);

      const spelers: Array<{ positie: string, voornaam: string, achternaam: string }> = [];

      result.forEach(speler => {
        spelers.push({ positie: speler.positie, voornaam: speler.speler.voornaam, achternaam: speler.speler.achternaam })
      });

      expect(spelers.length).toBe(6);
      expect(spelers).toContain({ positie: 'spelverdeler', voornaam: 'A', achternaam: 'A' });
      expect(spelers).toContain({ positie: 'diagonaal', voornaam: 'B', achternaam: 'B' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'C', achternaam: 'C' });
      expect(spelers).toContain({ positie: 'midden', voornaam: 'D', achternaam: 'D' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'E', achternaam: 'E' });
      expect(spelers).toContain({ positie: 'buiten', voornaam: 'F', achternaam: 'F' });
    });
  });
});
