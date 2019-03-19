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

  xdescribe('test 11 vind beste bij setnummer', () => {

    const alleSpelers: Array<Speler> = [];

    beforeEach(() => {
      alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));

      alleSpelers.push(createSpeler(2, 'A', 51, 'spelverdeler'));
      alleSpelers.push(createSpeler(2, 'B', 50, 'diagonaal'));
      alleSpelers.push(createSpeler(2, 'C', 33, 'midden'));
      alleSpelers.push(createSpeler(2, 'G', 49, 'midden'));
      alleSpelers.push(createSpeler(2, 'D', 66, 'midden'));
      alleSpelers.push(createSpeler(2, 'E', 34, 'buiten'));
      alleSpelers.push(createSpeler(2, 'F', 67, 'buiten'));
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


  // // test 1
  // const alleSpelers: Array<Speler> = [];

  // beforeEach(() => {
  //   alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
  //   alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
  //   alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
  //   alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
  //   alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
  //   alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
  // });

  // // test 4
  // const alleSpelers: Array<Speler> = [];
  // beforeEach(() => {
  //   alleSpelers.push(createSpeler(1, 'A', 51, 'spelverdeler'));
  //   alleSpelers.push(createSpeler(1, 'B', 50, 'diagonaal'));
  //   alleSpelers.push(createSpeler(1, 'C', 33, 'midden'));
  //   alleSpelers.push(createSpeler(1, 'G', 49, 'midden'));
  //   alleSpelers.push(createSpeler(1, 'D', 66, 'midden'));
  //   alleSpelers.push(createSpeler(1, 'E', 34, 'buiten'));
  //   alleSpelers.push(createSpeler(1, 'F', 67, 'buiten'));
  // });




  // Alle verschillende combis

  //     test 1
  //       expect(spelers).toContain({positie: 'spelverdeler', voornaam: 'A', achternaam: 'A'});
  //       expect(spelers).toContain({positie: 'diagonaal', voornaam: 'B', achternaam: 'B'});
  //       expect(spelers).toContain({positie: 'midden', voornaam: 'C', achternaam: 'C'});
  //       expect(spelers).toContain({positie: 'midden', voornaam: 'D', achternaam: 'D'});
  //       expect(spelers).toContain({positie: 'buiten', voornaam: 'E', achternaam: 'E'});
  //       expect(spelers).toContain({positie: 'buiten', voornaam: 'F', achternaam: 'F'});

  // test 4
  //       expect(spelers).toContain({positie: 'spelverdeler', voornaam: 'A', achternaam: 'A'});
  //       expect(spelers).toContain({positie: 'diagonaal', voornaam: 'B', achternaam: 'B'});
  //       expect(spelers).toContain({positie: 'midden', voornaam: 'G', achternaam: 'G'});
  //       expect(spelers).toContain({positie: 'midden', voornaam: 'D', achternaam: 'D'});
  //       expect(spelers).toContain({positie: 'buiten', voornaam: 'E', achternaam: 'E'});
  //       expect(spelers).toContain({positie: 'buiten', voornaam: 'F', achternaam: 'F'});

  // test 6
  //       expect(spelers).toContain({positie: 'spelverdeler', voornaam: 'A', achternaam: 'A'});
  //       expect(spelers).toContain({positie: 'diagonaal', voornaam: 'B', achternaam: 'B'});
  //       expect(spelers).toContain({positie: 'buiten', voornaam: 'C', achternaam: 'C'});
  //       expect(spelers).toContain({positie: 'midden', voornaam: 'G', achternaam: 'G'});
  //       expect(spelers).toContain({positie: 'midden', voornaam: 'D', achternaam: 'D'});
  //       expect(spelers).toContain({positie: 'buiten', voornaam: 'F', achternaam: 'F'});

  // test 10
  //       expect(spelers).toContain({positie: 'buiten', voornaam: 'A', achternaam: 'A'});
  //       expect(spelers).toContain({positie: 'spelverdeler', voornaam: 'B', achternaam: 'B'});
  //       expect(spelers).toContain({positie: 'buiten', voornaam: 'C', achternaam: 'C'});
  //       expect(spelers).toContain({positie: 'diagonaal', voornaam: 'G', achternaam: 'G'});
  //       expect(spelers).toContain({positie: 'midden', voornaam: 'D', achternaam: 'D'});
  //       expect(spelers).toContain({positie: 'midden', voornaam: 'F', achternaam: 'F'});

  // });

});


