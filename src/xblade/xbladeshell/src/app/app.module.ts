import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { WorkingAreaComponent } from './working-area';
import { BladeLoaderComponent } from './blade-loader';

@NgModule({
  declarations: [
    //AppComponent,
    //ShellComponent,
    //HeaderComponent,
    //FooterComponent,
    //WorkingAreaComponent,
    //BladeLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
