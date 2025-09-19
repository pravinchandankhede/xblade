import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

// Import routes
const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./app/blade-loader/blade-loader.component').then(m => m.BladeLoaderComponent) 
  },
  { 
    path: 'sample', 
    loadComponent: () => import('./app/sample/sample.component').then(m => m.SampleComponent) 
  },
  { 
    path: 'blade/:type/:name', 
    loadComponent: () => import('./app/blade-loader/blade-loader.component').then(m => m.BladeLoaderComponent) 
  },
  { path: '**', redirectTo: '/home' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
