import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  activatedSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSubscription = this.userService.activatedEmitter
      .subscribe(didActivate => {
        this.userActivated = didActivate;
      }
    )
  }

  // Since we set up our own observable (i.e., not handled by angular),
  // we need to unsubscribe from it to prevent memory leaks.
  ngOnDestroy() {
    this.activatedSubscription.unsubscribe();
  }
}
