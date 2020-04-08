import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  // activatedEmitter = new EventEmitter<boolean>(); // old way
  activatedEmitter = new Subject<boolean>(); // new way
  // Subject is an Observable that is "active" becuase you can
  // call .next() on it like emitting an event. It is more effecient
  // and gives more control (like error handling, for example)
  // than an EventEmitter gives you. However, only use Subjects to
  // communicate between components accross services.  You still
  // use EventEmitters with @Output() for component to component.
}
