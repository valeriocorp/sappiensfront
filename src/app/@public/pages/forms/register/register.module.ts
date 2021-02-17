import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatePickerLegalAgeModule} from '@shared/calendar/date-picker-legal-age/date-picker-legal-age.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    DatePickerLegalAgeModule,
    FormsModule
  ]
})
export class RegisterModule { }
