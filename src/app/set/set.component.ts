import { Component, OnInit } from '@angular/core';
import { SpelersService } from '../spelers/spelers.service';
import { Speler } from '../spelers/speler.model';
import { Form } from '../form';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent extends Form implements OnInit {

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
      standZelf: [],
      standTegenstander: [],
      setnummer: [],
      posities: this.fb.array([
        new FormGroup({
          speler: new FormControl(),
          positie: new FormControl()
        })
      ])
      // positie_speler.voornaam_speler.achternaam: []
    });
    super.createForm();
  }

  submitForm() {
    console.log(this.form.get('standZelf').value);
    console.log(this.form.get('standTegenstander').value);
    console.log(this.form.get('setnummer').value);
    Object.keys(this.form.get('posities')).forEach(element => {
      console.log(element);
    });
  }

  ngOnInit() {
  }

  getSpelers(): Array<Speler> {
    return this.spelersService.getSpelers();
  }
}
