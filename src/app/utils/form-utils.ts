import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  })
}
export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Este campo debe ser mayor a ${errors['min'].min}`;
        case 'email':
          return 'El formato del email es incorrecto';
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El formato del email es incorrecto';
          }
          return 'Error de patron contra expresion regular';
        case 'passwordNotEqual':
          return 'Las contraseñas no coinciden';
        case 'emailTaken':
          return 'El email ya fue tomado';
        case 'noStrider':
          return 'El nombre strider no es permitido';
        default:
          return 'Error de validacion no controlado'
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName])
      return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);

  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].errors && formArray.controls[index].touched)
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);

  }

  static isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (FormGroup: AbstractControl) => {
      const fieldOneValue = FormGroup.get(fieldOne)?.value;
      const fieldTwoValue = FormGroup.get(fieldTwo)?.value;

      return fieldOneValue === fieldTwoValue ? null : { passwordNotEqual: true };
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }
    return null;
  }

  static noStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === 'strider') {
      return { noStrider: true };
    }
    return null;

  }
}
