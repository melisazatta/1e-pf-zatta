import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['id'];
      this.usersService.getUserById$(userId).subscribe((user) => {
        this.user = user;
      });
    });
  }
}
  // constructor(private activatedRoute: ActivatedRoute) {
  //   console.log(this.activatedRoute.snapshot.params['id']);
    
  // }
