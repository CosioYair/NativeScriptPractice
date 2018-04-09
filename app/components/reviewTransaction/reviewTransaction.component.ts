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
        this._sales = _saleOrderService.getUserSaleOrderUnsaved();
        this._quotes = _saleOrderService.getUserQuoteUnsaved();
        this.transactionList = this._sales.slice();
        this.userTransactions = ["Sales order", "Quotes"];
        this.selectedTransaction = this.transactionList[0];
    }

    public setUserTransaction() {
        setTimeout(() => {
            this.resetList();
        }, 500);
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

    public resetList(){
        if (this.userTransaction == 0)
            this.transactionList = this._sales.slice();
        else
            this.transactionList = this._quotes.slice();

        this.selectedTransaction = this.transactionList[0];
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