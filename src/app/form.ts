import { FormGroup } from '@angular/forms';

export abstract class Form {
  abstract form: FormGroup;
  abstract formErrors;
  abstract validationMessages;

  protected abstract submitForm();

  onSubmit() {
    if (this.form.valid) {
      this.submitForm();
    } else {
      this.markAsTouched();
      this.markFormAsDirty();
      this.onValueChanged();
    }
  }

  protected createForm() {
    this.form.valueChanges
      .subscribe(() => this.onValueChanged());
  }

  private markAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).markAsTouched();
    });
  }

  protected markFormAsDirty(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).markAsDirty();
    });
  }

  protected onValueChanged() {
    if (!this.form) { return; }
    const form = this.form;

    Object.keys(this.formErrors).forEach(field => {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.touched && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        Object.keys(control.errors).forEach(key => {
          this.formErrors[field] = this.formErrors[field] || messages[key];
        });
      }
    });
  }
}
