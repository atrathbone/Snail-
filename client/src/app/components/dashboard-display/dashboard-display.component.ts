import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { Card } from 'src/app/core/Models/card.model';
import { User } from 'src/app/core/Models/user.model';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.css'],
})
export class DashboardDisplayComponent implements OnInit {
  public cards!: Card[];
  public user!: User;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.listCards().subscribe((data) => {
      this.cards = data;
    });
    this.apiService.getUser().subscribe((res: any) => {
      this.user = res.data;
    });
  }

  public navigate(to: string) {
    this.router.navigate([to]);
  }
}
