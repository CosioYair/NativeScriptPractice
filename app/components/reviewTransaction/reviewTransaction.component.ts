import { Component } from "@angular/core";
import { SERVER } from "../../config/server.config";
import { Router } from "@angular/router";
import { SaleOrder } from "../../interfaces/saleOrder.interface";
import { SaleOrderService } from "../../services/saleOrder.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { SearchBar } from "tns-core-modules/ui/search-bar/search-bar";

@Component({
    selector: "ns-reviewTransaction",
    moduleId: module.id,
    templateUrl: "./reviewTransaction.component.html",
})

export class ReviewTransactionComponent {

    public selectedSaleOrder: SaleOrder;
    private _sales: SaleOrder[];
    private _quotes: SaleOrder[];
    public transactionList: any;
    public userTransactions: any[];
    public userTransaction: number = 0;

    constructor(private _router: Router, private _saleOrderService: SaleOrderService) {
        this._sales = _saleOrderService.getUserSaleOrderUnsaved();
        this._quotes = _saleOrderService.getUserQuoteUnsaved();
        this.transactionList = new ObservableArray<SaleOrder>(this._sales);
        this.userTransactions = ["Sales order", "Quotes"];

    }

    public setUserTransaction() {
        setTimeout(() => {
            if (this.userTransaction == 0)
                this.transactionList = new ObservableArray<SaleOrder>(this._sales);
            else
                this.transactionList = new ObservableArray<SaleOrder>(this._quotes);
        }, 500);
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();
        let listSearch = [];

        if (searchValue.length > 0) {
            this.resetList();
            listSearch = this.searchInList(this.transactionList.slice(), searchValue);
            this.transactionList = new ObservableArray<SaleOrder>();
            this.transactionList = new ObservableArray<SaleOrder>(listSearch);
        }
        else
            this.resetList();
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        this.resetList();
    }

    public resetList(){
        if (this.userTransaction == 0)
            this.transactionList = new ObservableArray<SaleOrder>(this._sales);
        else
            this.transactionList = new ObservableArray<SaleOrder>(this._quotes);
    }

    public searchInList(list, searchValue) {
        let results = [];
        list.map(transaction => {
            if (transaction.SalesOrderNO.toLowerCase().indexOf(searchValue) != -1 || transaction.CustomerName.toLowerCase().indexOf(searchValue) != -1)
                results.push(transaction);
        });
        return results;
    }

    public editTransaction() {
        SERVER.editTransaction.edit = true;
        SERVER.editTransaction.transactionNo = "3b2471S-000002";
        this._router.navigate(['/saleOrder', this.selectedSaleOrder.CustomerNo, true]);
    }
}