import { AbstractControl } from '@angular/forms';

export function passValidator(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const confirmPasswordValue = control.value;
    const passwordControl = control.root.get('password');

    if (passwordControl) {
      const passwordValue = passwordControl.value;
      if (passwordValue !== confirmPasswordValue) {
        return {
          isError: true
        };
      }
    }
  }
  return null;
}
