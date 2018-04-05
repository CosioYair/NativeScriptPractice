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
        else
            this._saleOrderDoc = doc;
            
        if(saleOrder != null){
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

    public getItems(itemSearch, itemBool, savedBool){
        let itemDoc = this._couchbaseService.getDocument("saleorder")["saleorder"][SERVER.user["UserCode"]];
        if(itemDoc == null)
            return [];
        let items = [];
        itemDoc.map(item => {
            if(item[itemSearch] == itemBool && item.Saved == savedBool)
                items.push(item);
        });
        return itemDoc == undefined ? [] : items;
    }

    public getUserSaleOrderSaved(){
        return this.getItems("IsQuote", false, true);
    }

    public getUserSaleOrderUnsaved(){
        return this.getItems("IsQuote", false, false);
    }

    public getUserQuoteSaved(){
        return this.getItems("IsQuote", true, true);
    }

    public getUserQuoteUnsaved(){
        return this.getItems("IsQuote", true, false);
    }
}