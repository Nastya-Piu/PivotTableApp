import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomersService {	

	private dataUrl: string = 'assets/data.json';

	constructor(private http: Http) { }	

	getData():Promise<any>{				
		var result = this.http.get(this.dataUrl).toPromise() 
         .then(response => JSON.parse(response.text()))
         .catch(this.handleError);        
	    return result;		
	}

	private handleError(error: any): Promise<any> {	 
	  return Promise.reject(error.message || error);
	}

}