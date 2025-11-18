import { Routes } from '@angular/router';
import { Principal } from './pages/principal/principal';

export const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', component: Principal }
];
