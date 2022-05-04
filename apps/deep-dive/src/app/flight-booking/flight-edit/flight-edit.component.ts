// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateCity, validateCityWithParams } from '../../shared/validation/city-validator';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit {

  id = 0;
  showDetails = false;
  editForm: FormGroup = this.getInitialEditForm();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = p.id;
      this.showDetails = p.showDetails;
    });

    this.editForm.valueChanges.subscribe(
      console.log
    );

    this.editForm.patchValue({
      id: 999
    });
  }

  getInitialEditForm(): FormGroup {
    return this.fb.group({
      id: [0],
      from: ['Graz', [
        Validators.required,
        Validators.minLength(3),
        validateCity
      ]],
      to: ['Hamburg', [
        Validators.required,
        Validators.minLength(3),
        validateCityWithParams([
          'Hamburg', 'London', 'Budapest'
        ])
      ]],
      date: [new Date().toISOString()],
      /* address: this.fb.group({

      }) */
    });
  }

  save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);
  }
}
