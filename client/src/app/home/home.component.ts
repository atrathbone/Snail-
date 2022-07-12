import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	public toggle = new Subject();

	public toggle$ = this.toggle.asObservable();

	@ViewChild(MatSidenav) sidenav!: MatSidenav;

	constructor() {}

	ngOnInit(): void {
		this.toggle$.subscribe(() => this.sidenav.toggle());
	}
}
