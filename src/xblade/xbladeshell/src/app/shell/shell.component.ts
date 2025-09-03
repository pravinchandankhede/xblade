import { Component } from '@angular/core';
import { WorkingAreaComponent } from '../working-area';
import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.css'],
    standalone: true,
    imports: [
        WorkingAreaComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class ShellComponent { }
