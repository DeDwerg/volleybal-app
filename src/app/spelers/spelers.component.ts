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
    const speler: Speler = {voornaam, achternaam, prestaties };
    this.spelersService.addSpeler(speler);
  }

  getSpelers(): Array<Speler> {
    return this.spelersService.getSpelers();
  }

  // ngOnInit() {}

  ngOnInit() {
    this.spelersService.addSpeler(this.createSpeler(1, 'A', 51, 'spelverdeler'));
    this.spelersService.addSpeler(this.createSpeler(1, 'B', 50, 'diagonaal'));
    this.spelersService.addSpeler(this.createSpeler(1, 'C', 33, 'midden'));
    this.spelersService.addSpeler(this.createSpeler(1, 'D', 66, 'midden'));
    this.spelersService.addSpeler(this.createSpeler(1, 'E', 34, 'buiten'));
    this.spelersService.addSpeler(this.createSpeler(1, 'F', 67, 'buiten'));
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
