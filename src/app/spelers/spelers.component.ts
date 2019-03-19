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

  ngOnInit() {}

}
