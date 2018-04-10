import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';
import { CouchbaseService } from './couchbase.service';

@Injectable()
export class FoliosTransactionService {
    private _foliosTransaction = {};

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public updateFoliosTransactionDoc(transaction?){
        let doc = this._couchbaseService.getDocument("foliostransaction");
        if(doc == null){
            this._foliosTransaction["foliostransaction"] = [];
            this._couchbaseService.createDocument(this._foliosTransaction, "foliostransaction");
        }
        else
            this._foliosTransaction = doc;
        
        if(transaction != null){
            this._foliosTransaction["foliostransaction"].push(transaction);
            this._couchbaseService.updateDocument("foliostransaction", this._foliosTransaction);
        }
    }

    public getFoliosTransaction(){
        let doc = this._couchbaseService.getDocument("foliostransaction");
        return doc == undefined ? [] : doc["foliostransaction"];
    }

    public getSaleTransactions(){
        let doc = this._couchbaseService.getDocument("foliostransaction");
        let sales = [];
        if(doc == undefined)
            return [];
        else{
            doc["foliostransaction"].map(folio => {
                if(folio.Document == "Sale")
                    sales.push(folio);
            });
            return sales;
        } 
    }

    public getQuoteTransactions(){
        let doc = this._couchbaseService.getDocument("foliostransaction");
        let quote = [];
        if(doc == undefined)
            return [];
        else{
            doc["foliostransaction"].map(folio => {
                if(folio.Document == "Quote")
                    quote.push(folio);
            });
            return quote;
        } 
    }
}