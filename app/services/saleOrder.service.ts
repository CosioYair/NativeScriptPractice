import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';
import { CouchbaseService } from './couchbase.service';

@Injectable()
export class SaleOrderService {
    private _saleOrderDoc = {};

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public updateSaleOrderDoc(saleOrder?){
        let doc = this._couchbaseService.getDocument("saleorder");
        if(doc == null){
            this._saleOrderDoc["saleorder"] = {};
            this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");
        }
        else{
            if(this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] == null)
                this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] = [];
            else
                this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]].push(saleOrder);
            this._couchbaseService.updateDocument("saleorder", this._saleOrderDoc);
        }
    }

    public getUserSaleOrder(){
        return this._couchbaseService.getDocument("saleorder")["saleorder"][SERVER.user["UserCode"]];
    }
}