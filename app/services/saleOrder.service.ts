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
            this._saleOrderDoc = doc;
            if(this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] == null)
                this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] = [saleOrder];
            else
                this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]].push(saleOrder);
            this._couchbaseService.updateDocument("saleorder", this._saleOrderDoc);
        }
    }

    public getUserTransactions(){
        let userSaleOrder = this._couchbaseService.getDocument("saleorder")["saleorder"][SERVER.user["UserCode"]];
        return userSaleOrder == undefined ? [] : userSaleOrder;
    }

    public getUserSaleOrder(){
        let userSaleOrder = this._couchbaseService.getDocument("saleorder")["saleorder"][SERVER.user["UserCode"]];
        if(userSaleOrder == null)
            return [];
        let salesOrder = [];
        console.log(userSaleOrder[0].IsQuote);
        userSaleOrder.map(saleOrder => {
            if(!saleOrder.IsQuote)
                salesOrder.push(saleOrder);
        });
        return userSaleOrder == undefined ? [] : salesOrder;
    }

    public getUserQuote(){
        let userQuote = this._couchbaseService.getDocument("saleorder")["saleorder"][SERVER.user["UserCode"]];
        if(userQuote == null)
            return [];
        let quotes = [];
        userQuote.map(quote => {
            if(quote.IsQuote)
                quotes.push(quote);
        });
        return userQuote == undefined ? [] : quotes;
    }
}