import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)],
    ],
      lastname: ['',[Validators.required, Validators.minLength(3)],
    ],
    });
  }

  public get nameControl() {
    return this.userForm.get('name');
  }
  public get lastnameControl() {
      return this.userForm.get('lastname');
  }


}
