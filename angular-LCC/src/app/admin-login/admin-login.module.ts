import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminLoginComponent } from './admin-login.component';
import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { ConstantService } from '../services/constant.service';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    AdminLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConstantService
  ],
  exports : [
    AdminLoginComponent,
  ]
})
export class AdminLoginModule { }
