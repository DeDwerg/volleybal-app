import { Component, OnInit } from '@angular/core';
import { Form } from '../form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SpelersService } from './spelers.service';
import { Speler } from './speler.model';
import { Prestatie } from './prestatie.model';

@Component({
  selector: 'app-spelers',
  templateUrl: './spelers.component.html',
  styleUrls: ['./spelers.component.css']
})
export class SpelersComponent extends Form implements OnInit {

  form: FormGroup;
  formErrors = {};
  validationMessages = {};

  constructor(
    private fb: FormBuilder,
    private spelersService: SpelersService
  ) {
    super();
    this.createForm();
  }

  protected createForm() {
    this.form = this.fb.group({
      voornaam: [''],
      achternaam: ['']
    });
    super.createForm();
  }

  submitForm() {
    const voornaam: string = this.form.get('voornaam').value;
    const achternaam: string = this.form.get('achternaam').value;
    const prestaties: Array<Prestatie> = [];
    const speler: Speler = { voornaam, achternaam, prestaties };
    this.spelersService.addSpeler(speler);

    // add speler
  }

  getSpelers(): Array<Speler> {
    return this.spelersService.getSpelers();
  }

  // ngOnInit() { }

 ngOnInit() {
      const spelerA: Speler = this.createSpeler(1, 'A', 51, 'spelverdeler');
      spelerA.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 99 });
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 4, percentageWinst: 51 });
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 3, percentageWinst: 51 });
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 2, percentageWinst: 51 });
      spelerA.prestaties.push({ positie: 'spelverdeler', setnummer: 5, percentageWinst: 51 });

      const spelerB: Speler = this.createSpeler(1, 'B', 50, 'diagonaal');
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 5, percentageWinst: 50 });
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 50 });
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 3, percentageWinst: 50 });
      spelerB.prestaties.push({ positie: 'diagonaal', setnummer: 2, percentageWinst: 50 });
      spelerB.prestaties.push({ positie: 'spelverdeler', setnummer: 4, percentageWinst: 47 });

      const spelerC: Speler = this.createSpeler(1, 'C', 33, 'midden');
      spelerC.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 48 });
      spelerC.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 48 });
      spelerC.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 33 });
      spelerC.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 33 });
      spelerC.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 33 });
      spelerC.prestaties.push({ positie: 'midden', setnummer: 5, percentageWinst: 33 });

      const spelerD: Speler = this.createSpeler(1, 'D', 66, 'midden');
      spelerD.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 66 });
      spelerD.prestaties.push({ positie: 'midden', setnummer: 5, percentageWinst: 66 });
      spelerD.prestaties.push({ positie: 'midden', setnummer: 2, percentageWinst: 66 });
      spelerD.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 66 });

      const spelerE: Speler = this.createSpeler(1, 'E', 34, 'buiten');
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 34 });
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 34 });
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 34 });
      spelerE.prestaties.push({ positie: 'buiten', setnummer: 5, percentageWinst: 34 });

      const spelerF: Speler = this.createSpeler(1, 'F', 67, 'buiten');
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 3, percentageWinst: 67 });
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 2, percentageWinst: 67 });
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 5, percentageWinst: 67 });
      spelerF.prestaties.push({ positie: 'buiten', setnummer: 4, percentageWinst: 67 });
      spelerF.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 80 });

      const spelerG: Speler = this.createSpeler(2, 'G', 49, 'midden');
      spelerG.prestaties.push({ positie: 'midden', setnummer: 4, percentageWinst: 49 });
      spelerG.prestaties.push({ positie: 'midden', setnummer: 3, percentageWinst: 49 });
      spelerG.prestaties.push({ positie: 'diagonaal', setnummer: 4, percentageWinst: 59 });

      this.spelersService.addSpeler(spelerA);
      this.spelersService.addSpeler(spelerB);
      this.spelersService.addSpeler(spelerC);
      this.spelersService.addSpeler(spelerD);
      this.spelersService.addSpeler(spelerE);
      this.spelersService.addSpeler(spelerF);
      this.spelersService.addSpeler(spelerG);
  }

  private createSpeler(setnummer: number, naam: string, percentageWinst: number, positie: string): Speler {
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

}
