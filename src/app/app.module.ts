import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PivotTableComponent } from './components/pivot-table.component';

import { CustomersService } from './services/customers.service';

@NgModule({
  declarations: [
    AppComponent, PivotTableComponent
  ],
  imports: [
    BrowserModule, HttpModule,
  	RouterModule.forRoot([       
    	{
    	path: '',
    	component: PivotTableComponent
    	}
  	])  
  ],

  providers: [CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
