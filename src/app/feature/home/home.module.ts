import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from '@shared/components/input/input.component';

@NgModule({
  declarations: [HomeComponent, UsersComponent, CreateUserComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputComponent,
  ],
})
export class HomeModule {}
