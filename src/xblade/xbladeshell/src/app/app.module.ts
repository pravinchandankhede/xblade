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
import { SampleComponent } from './sample';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    WorkingAreaComponent,
    BladeLoaderComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
