import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UsersComponent } from './pages/users/users.component';
import { unsavedChangesGuard } from '@core/guards/unsaved-changes/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'users', component: UsersComponent },
      {
        path: 'create-user',
        component: CreateUserComponent,
        canDeactivate: [unsavedChangesGuard],
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
