import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-base';
  loading = false;

  constructor(private _loading: LoadingService) {}

  public ngOnInit() {
    this.listenToLoading();
  }

  private listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe(loading => (this.loading = loading));
  }
}
