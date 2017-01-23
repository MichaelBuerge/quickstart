import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <a href=# (click)=fetch()>fetch</a><br>
    status: <span>{{status}}</span><br>
    text: <pre>{{text}}</pre><br>
  `,
})
export class AppComponent  {
  name = 'Angular';
  status = "-------";
  text = '-------';

  fetch() {
    var fetchResult = window['fetch']('');
    console.log('fetching');
    this.status = 'fetching';
    fetchResult.then((res: any) => {
      console.log('done');
      this.status = 'done';
      var textResult = res.text()
      if (textResult instanceof window['ZoneAwarePromise']) {
        console.log('textResult is ZoneAwarePromise');
      } else {
        console.log(`textRes.constructor patched: ${textResult.constructor.__zone_symbol__thenPatched}`);
      }
      textResult.then((textRes: any) => {
        console.log(textRes.substr(0, 100));
        this.status = 'got text'
        this.text = textRes;
      });
    });
  }

}
