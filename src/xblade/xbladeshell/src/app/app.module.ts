import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { WorkingAreaComponent } from './working-area';
import { BladeLoaderComponent } from './blade-loader';

@NgModule({
  declarations: [
    AppComponent,
    WorkingAreaComponent,
    BladeLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShellComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
