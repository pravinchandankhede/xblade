import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-working-area',
    templateUrl: './working-area.component.html',
    styleUrls: ['./working-area.component.css'],
    standalone: true,
    imports: [
        RouterOutlet
    ]
})
export class WorkingAreaComponent { }
