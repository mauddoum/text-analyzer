import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppRoutingModule }     from './app-routing.module';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { TextService } from './text.service';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent }         from './app.component';
import { NewComponent }   from './new.component';

export declare let require: any;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    AppComponent,
    NewComponent,
  ],
  //providers: [TextService],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
