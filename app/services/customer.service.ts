import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import 'rxjs/add/operator/toPromise';
import { SERVER } from '../config/server.config';
import { CouchbaseService } from "./couchbase.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Customer } from "../interfaces/customer.interface";

@Injectable()
export class CustomerService {
    private _customers: any;
    private _docId:string = "customer";
    private _doc = {};

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public getCustomers(){
        return this._http.get(`${SERVER.baseUrl}/Customer`)
        .map(res => res).toPromise();
    }

    public async setCustomerDocument(){
        this._couchbaseService.deleteDocument("customer");
        return await this.getCustomers()
        .then(result => {
            this._doc[this._docId] = result["Customer"];
            this._couchbaseService.createDocument(this._doc, this._docId);
            this._customers = result["Customer"];
        }, (error) => {
            alert(error);
        });
    }

    public getCustomer(customerId){
        let customerSearch = null;
        let doc = this._couchbaseService.getDocument("customer")["customer"];
         doc.map(customer => {
            if(customer.CustomerNo == customerId)
                customerSearch = customer;
        });
        return customerSearch;
    }
}