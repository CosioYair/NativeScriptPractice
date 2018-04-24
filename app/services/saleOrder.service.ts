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

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService) {

    }

    public updateSaleOrderDoc(saleOrder?) {
        let doc = this._couchbaseService.getDocument("saleorder");
        let existingTransaction = false;
        if (doc == null)
            this._saleOrderDoc["saleorder"] = {};
        else {
            this._saleOrderDoc = doc;
            existingTransaction = this.validateExistingTransaction(saleOrder);
        }

        if (saleOrder != null && !existingTransaction) {
            if (this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] == null)
                this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] = [saleOrder];
            else
                this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]].push(saleOrder);
        }

        if (!existingTransaction){
            this._saleOrderDoc = JSON.parse(JSON.stringify(this._saleOrderDoc));
            this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");}
    }

    public getUnsavedUserTransactions() {
        let userTransactions = this._couchbaseService.getDocument("saleorder");
        let unsavedTransactions = [];
        if (userTransactions == null)
            return [];
        userTransactions["saleorder"][SERVER.user["UserCode"]].map(transaction => {
            if (!transaction.Status)
                unsavedTransactions.push(transaction)
        });
        return unsavedTransactions.reverse();
    }

    public getSavedUserTransactions() {
        let userTransactions = this._couchbaseService.getDocument("saleorder");
        let savedTransactions = [];
        if (userTransactions == null)
            return [];
        userTransactions["saleorder"][SERVER.user["UserCode"]].map(transaction => {
            if (transaction.Status)
                savedTransactions.push(transaction)
        });
        return savedTransactions.reverse();
    }

    public getItems(itemSearch, itemBool, savedBool) {
        let itemDoc = this._couchbaseService.getDocument("saleorder");
        let transactions = [];
        let items = [];
        if (itemDoc == null)
            return [];
        transactions = itemDoc["saleorder"][SERVER.user["UserCode"]];
        transactions.map(item => {
            if (item[itemSearch] == itemBool && item.Saved == savedBool)
                items.push(item);
        });
        return itemDoc == undefined ? [] : items.reverse();
    }

    private validateExistingTransaction(userTransaction) {
        let transactions = this.getUnsavedUserTransactions();
        let exist = false;
        transactions.map(async (transaction, index) => {
            if (transaction.SalesOrderNO == userTransaction.SalesOrderNO) {
                transactions[index] = userTransaction;
                exist = true;
            }
        });
        if (exist) {
            this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] = transactions;
            this._saleOrderDoc = JSON.parse(JSON.stringify(this._saleOrderDoc));
            this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");
        }
        return exist;
    }

    public getUserSaleOrderSaved() {
        return this.getItems("IsQuote", false, true);
    }

    public getUserSaleOrderUnsaved() {
        return this.getItems("IsQuote", false, false);
    }

    public getUserQuoteSaved() {
        return this.getItems("IsQuote", true, true);
    }

    public getUserQuoteUnsaved() {
        return this.getItems("IsQuote", true, false);
    }
}