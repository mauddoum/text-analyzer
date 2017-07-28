import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './new.component.html',
  styleUrls: [ './new.component.css' ]
})
export class NewComponent {
  text: string;
  iD: string;
  frequences: {};
  options: Object;
  // this.options = {
  //     chart: { type: 'column'},
  //     title : { text : 'Letters frequencies' },
  //     xAxis: { categories: ['a', 'b', 'c'] },
  //     series: [{ data: [0.1, 0.2, 0.4] }]
  // };

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  getTextAnalytics(): void{
    this.saveText(() => {
      this.getStatistics( () => {
        var myData = Object.keys(this.frequences).map((key) => {
          return this.frequences[key];
        });
        var myLetters = Object.keys(this.frequences);

        this.options = {
            chart: { type: 'column'},
            title : { text : 'Letters frequencies' },
            xAxis: { categories: myLetters },
            series: [{ data: myData }]
        };
      });
    });
  }


  saveText(cb): void{
    const body = {text: this.text};
    const req = this.http.post('http://10.0.0.10:3000/api/Texts', body);
    req.subscribe( data => {
      this.iD = data['id'];
      cb();
      }
    );
  }

  getStatistics(cb): void{
    const endpoint = 'http://10.0.0.10:3000/api/Texts/getStatistics/' + this.iD;
    const req = this.http.get(endpoint);
    req.subscribe( data => {
      this.frequences = data;
      cb();
    }
    );

  }

}
