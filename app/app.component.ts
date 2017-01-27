import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <a href=# (click)=fetch()>fetch</a>
    <a href=# *ngIf="progress.length" (click)=clear()>clear</a><br>
    progress:
    <span *ngIf="!progress.length">---</span>
    <span *ngFor="let entry of progress; let last = last">
      {{ entry }}{{ last ? '' : ', ' }}
    </span><br>
    response text: {{text}}<br>
  `,
})
export class AppComponent  {
  name = 'Angular';
  progress = [];
  text = '---';

  fetch() {
    this.clear();

    var logProgress = (state) => {
      console.log(state);
      this.progress.push(state);
    }

    logProgress('start');

    var fetchResult = window['fetch']('fetch.txt');
    logProgress('fetching');

    fetchResult.then((res: any) => {
      logProgress('fetch done');
      var textResult = res.text();
      if (textResult instanceof window['ZoneAwarePromise']) {
        console.log('textResult is ZoneAwarePromise');
      } else {
        console.log(`textRes.constructor patched: ${textResult.constructor.__zone_symbol__thenPatched}`);
      }
      textResult.then((textRes: any) => {
        logProgress('got response text');
        this.text = textRes;
      });
    });
  }

  clear() {
    this.progress = [];
    this.text = '---';
  }

}
