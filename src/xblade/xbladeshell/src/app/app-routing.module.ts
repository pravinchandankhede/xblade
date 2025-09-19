import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BladeLoaderComponent } from './blade-loader';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: BladeLoaderComponent },
  { 
    path: 'sample', 
    loadComponent: () => import('./sample/sample.component').then(m => m.SampleComponent) 
  },
  { path: 'blade/:type/:name', component: BladeLoaderComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
