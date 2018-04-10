import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import 'rxjs/add/operator/toPromise';
import { SERVER } from '../config/server.config';
import { CouchbaseService } from "./couchbase.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { User } from "../interfaces/user.interface";
import * as platformModule from "tns-core-modules/platform";

@Injectable()
export class SendDataService{

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public sendTransaction(transaction){ 
        return this._http.post(`${SERVER.baseUrl}/Scanforce/SaleOrder`, transaction)
        .map(res => res).toPromise();
    }
}
