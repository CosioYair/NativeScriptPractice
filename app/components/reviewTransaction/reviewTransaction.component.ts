import { Component } from "@angular/core";
import { SERVER } from "../../config/server.config";
import { Router } from "@angular/router";
import { SaleOrder } from "../../interfaces/saleOrder.interface";
import { SaleOrderService } from "../../services/saleOrder.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { SearchBar } from "tns-core-modules/ui/search-bar/search-bar";
import { DecimalPipe } from '@angular/common';

@Component({
    selector: "ns-reviewTransaction",
    moduleId: module.id,
    templateUrl: "./reviewTransaction.component.html",
})

export class ReviewTransactionComponent {

    public selectedTransaction: any;
    private _sales: SaleOrder[];
    private _quotes: SaleOrder[];
    public transactionList: any;
    public userTransactions: any[];
    public userTransaction: number = 0;

    constructor(private _router: Router, private _saleOrderService: SaleOrderService) {
        this._sales = this._saleOrderService.getUserSaleOrderUnsaved();
        this._quotes = this._saleOrderService.getUserQuoteUnsaved();
        this.resetList();
    }

    public setUserTransaction(transaction) {
        this.userTransaction = transaction;
        this.resetList();
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();
        let listSearch = [];

        this.resetList();
        if (searchValue.length > 0) {
            listSearch = this.searchInList(this.transactionList.slice(), searchValue);
            this.transactionList = [];
            this.transactionList = listSearch.slice();
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        this.resetList();
    }

    public resetList() {
        if (this.userTransaction == 0)
            this.transactionList = this.checkList(this._sales);
        else
            this.transactionList = this.checkList(this._quotes);
    }

    public checkList(list) {
        if (list == null || list == undefined || list == []) {
            this.selectedTransaction = {};
            this.selectedTransaction.Detail = [];
            return [];
        }
        else {
            this.selectedTransaction = list;
            return list;
        }
    }

    public searchInList(list, searchValue) {
        let results = [];
        list.map(transaction => {
            if (transaction.SalesOrderNO.toLowerCase().indexOf(searchValue) != -1 || transaction.CustomerName.toLowerCase().indexOf(searchValue) != -1)
                results.push(transaction);
        });
        return results;
    }

    public setSelectedTransaction(transaction: SaleOrder) {
        this.selectedTransaction = transaction;
    }


    public editTransaction() {
        SERVER.editTransaction.edit = true;
        SERVER.editTransaction.transactionNo = this.selectedTransaction.SalesOrderNO;
        this._router.navigate(['/saleOrder', this.selectedTransaction.CustomerNo, this.selectedTransaction.IsQuote]);
    }
}