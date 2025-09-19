import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.css'],
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent
    ]
})
export class ShellComponent { }
