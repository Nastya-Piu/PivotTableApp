import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import * as _ from 'underscore';

@Component({
  selector: 'pivot-table',
  templateUrl: './pivot-table.component.html'
})

export class PivotTableComponent implements AfterViewInit{
  @ViewChild('pivottable') tableRef:ElementRef; 
  table:HTMLTableElement;  

  constructor(private customersService: CustomersService) { }   

  ngAfterViewInit(): void {

     this.customersService.getData().then(data=>{
      
      var groups = _.groupBy(data, "group");
      var recencyArr = _.uniq(_.pluck(data, 'recency'));
      var frequencyArr = _.uniq(_.pluck(data, 'frequency'));
      var cells = recencyArr.length;
      var rows = frequencyArr.length; 

      this.table = this.tableRef.nativeElement;
      
      var row = this.table.insertRow(0);  
      for (var i = 0; i <= cells; ++i) {
        let cell = row.insertCell(i); 
        if (i!=0) {
           cell.outerHTML = `<th>${recencyArr[i-1]}<br>days</th>`;      
        } 
      }      

      for (var i = 1; i <= rows; ++i) {
        var currentRow = this.table.insertRow(i);
        for (var j = 0; j <= cells; ++j) {          
          if (j==0) {
            let cell = currentRow.insertCell();
            cell.innerHTML = frequencyArr[i-1];
          }else{           
            var groupObj = _.find(data, function(obj){
              return (obj.frequency == frequencyArr[i-1] && obj.recency == recencyArr[j-1]);
            });
            if (groupObj) {              
              var arr = groups[groupObj.group];
              if(arr){
                var cell = currentRow.insertCell();                 
                cell.colSpan =  Object.keys(_.groupBy(arr, "recency")).length;
                cell.rowSpan =  Object.keys(_.groupBy(arr, "frequency")).length;

                var sum = _.reduce(arr, function(memo, num){ return memo + num.frequencyValue; }, 0);               
                var popup = `<div class="popover"><h5 class="text-muted"><i>Frequency info:</i></h5><hr><ul class="list-unstyled">`;
                for (let i = 0; i < arr.length; ++i) {
                  popup+=`<li><b>${arr[i].frequency}:</b>&nbsp;${arr[i].frequencyValue}</li>`
                };
                popup+=`</ul></div>`;
                cell.innerHTML = `<span>${sum}<br>${groupObj.group}${popup}</span>`;        

                if (groupObj.group == "red alert") {
                  cell.className = "red-alert";
                }
                if (groupObj.group == "at risk") {
                  cell.className = "at-risk";
                }
                delete groups[groupObj.group]; 
              }

            }            
          }
        }
      }
    }, error =>{
      alert('Error: '+error);
    });
     
  } 
  

}
  