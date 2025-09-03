import { Component } from '@angular/core';
import { BladeLoaderComponent } from './blade-loader';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { ShellComponent } from './shell';
import { WorkingAreaComponent } from './working-area';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.css',
    imports: [
        ShellComponent,
        //HeaderComponent,
        //FooterComponent,
        //WorkingAreaComponent,
        //BladeLoaderComponent
    ]
})
export class AppComponent {
    title = 'xbladeshell';
}
