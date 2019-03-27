import { Component, OnInit } from '@angular/core';
import { SpelersService } from '../spelers/spelers.service';
import { Speler } from '../spelers/speler.model';
import { Form } from '../form';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent extends Form implements OnInit {

  form: FormGroup;
  formErrors = {};
  validationMessages = {};
  spelersPrestatie: FormArray;

  constructor(
    private fb: FormBuilder,
    private spelersService: SpelersService
  ) {
    super();
    this.createForm();
  }

  get spelersPrestatieFormGroup() {
    return this.form.get('spelersPrestatie') as FormArray;
  }

  protected createForm() {
    this.form = this.fb.group({
      standZelf: [],
      standTegenstander: [],
      setnummer: [],
      spelersPrestatie: this.fb.array([
        this.fb.group({
          positie: [],
          gewisseld: [],
          wisselstandZelf: [],
          wisselstandTegenstander: [],
          voornaam: [],
          achternaam: [],
        })
      ])
    });
    this.spelersPrestatie = this.form.get('spelersPrestatie') as FormArray;
    super.createForm();
  }

  getFormGroupSpelersThingie() {
    this.getSpelers();
    return this.spelersPrestatieFormGroup;
  }

  submitForm() {
    console.log(this.form.value);
  }

  getSpelers(): Array<Speler> {
    const spelers: Array<{ voornaam: string, achternaam: string }> = [];
    this.spelersPrestatie.controls.forEach((spelerPrestatie) => {
      if (spelerPrestatie.get('voornaam').value !== null && spelerPrestatie.get('achternaam').value !== null) {
        spelers.push({ voornaam: spelerPrestatie.get('voornaam').value, achternaam: spelerPrestatie.get('achternaam').value });
      } else {
        this.spelersPrestatie.removeAt(this.spelersPrestatie.controls.indexOf(spelerPrestatie));
      }
    });
    this.spelersService.getSpelers().forEach((speler) => {
      let gevonden: boolean = false;
      spelers.forEach((naam) => {
        if (naam.voornaam === speler.voornaam && naam.achternaam === speler.achternaam) {
          gevonden = true;
        }
      });
      if (!gevonden) {
        this.spelersPrestatie.controls.push(
          this.fb.group({
            positie: [],
            gewisseld: [],
            wisselstandZelf: [],
            wisselstandTegenstander: [],
            voornaam: [speler.voornaam],
            achternaam: [speler.achternaam],
          })
        );
      }
    });
    return this.spelersService.getSpelers();
  }

  ngOnInit() { }
}
