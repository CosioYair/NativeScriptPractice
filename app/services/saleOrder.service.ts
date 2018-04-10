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
        let existingTransaction = -1;
        if (doc == null)
            this._saleOrderDoc["saleorder"] = {};
        else{
            this._saleOrderDoc = doc;
            existingTransaction = this.validateExistingTransaction(saleOrder);
        }

        if (saleOrder != null) {
            console.log(existingTransaction);
            if (existingTransaction == -1) {
                if (this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] == null)
                    this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]] = [saleOrder];
                else
                    this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]].push(saleOrder);
            }
            else
                this._saleOrderDoc["saleorder"][SERVER.user["UserCode"]][existingTransaction] = saleOrder;
        }
        this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");
    }

    public getUnsavedUserTransactions() {
        let userTransactions = this._couchbaseService.getDocument("saleorder")["saleorder"][SERVER.user["UserCode"]];
        let unsavedTransactions = [];
        if (userTransactions == null)
            return [];
        userTransactions.map(transaction => {
            if (!transaction.Status)
                unsavedTransactions.push(transaction)
        });
        return unsavedTransactions.reverse();
    }

    public getSavedUserTransactions() {
        let userTransactions = this._couchbaseService.getDocument("saleorder")["saleorder"][SERVER.user["UserCode"]];
        let savedTransactions = [];
        if (userTransactions == null)
            return [];
        userTransactions.map(transaction => {
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
        let transactions = userTransaction.IsQuote ? this.getUserQuoteSaved() : this.getUserSaleOrderUnsaved();
        return transactions.findIndex(transaction => transaction.SalesOrderNO === userTransaction.SalesOrderNO);
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