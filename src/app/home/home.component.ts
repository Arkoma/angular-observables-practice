import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private myFirstSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.myFirstSubscription = interval(1000).subscribe(count => console.log(count));
    const myFirstObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        if (count === 3) observer.complete();
        if (count > 3) observer.error(new Error("Count is greater than 3!"));
        observer.next(count++)
      }, 1000);
    });

    const myFirstPipe = myFirstObservable.pipe(
      filter((data: number) => {
        return data % 2 === 0;
      }),
      map((data: number) => {
        return "Round " + (data + 1);
      })
    );

    this.myFirstSubscription = myFirstPipe.subscribe(data => {
      console.log(data)
    }, error => alert(error.message), () => console.log('Completed!'));
  }

  ngOnDestroy() {
    this.myFirstSubscription.unsubscribe();
  }

}
