import { Component, OnInit, AfterViewInit, AfterContentChecked, DoCheck } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { Customer } from "../../interfaces/customer.interface";
import { SearchBar } from "ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { CustomerService } from "../../services/customer.service";
import { CouchbaseService } from "../../services/couchbase.service";
import { SERVER } from "../../config/server.config";
import * as dialogs from "ui/dialogs";
import { SaleOrderService } from "../../services/saleOrder.service";
import { Router } from "@angular/router";

@Component({
    selector: "ns-customer-transaction",
    moduleId: module.id,
    templateUrl: "./customer-transaction.component.html",
    styleUrls: ["./customer-transaction.css"]
})

export class CustomerTransactionComponent implements OnInit {
    private _customers: any;
    private _docId: string = "customer";
    public customerList: ObservableArray<Customer> = new ObservableArray<Customer>();
    public data = {};
    public selectedCustomer: any = {};
    public salesRep: string =  SERVER.user['UserName'];

    constructor(private _couchbaseService: CouchbaseService, private _customerService: CustomerService, private _saleOrderService: SaleOrderService, private _router: Router) {
        this.selectedCustomer = {
            CustomerNo: "Select a customer to view details",
            AddressLine1: "",
            AddressLine2: "",
            City: "",
            Comment: "",
            CountryCode: "",
            CustomerDiscountRate: 0,
            CustomerName: "Customer details",
            CustomerStatus: "",
            CustomerType: "",
            DateCreated: "",
            DateLastActivity: "",
            DateUpdated: "",
            State: "",
            TelephoneNo: "",
            ZipCode: ""
        }
    }

    ngOnInit() {
        this.setDocument();
    }

    public setDocument() {
        this._customers = this._customerService.getFilterCustomers();
        this.customerList = new ObservableArray<Customer>(this._customers);
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        if (searchValue.length > 0) {
            this.customerList = new ObservableArray<Customer>();
            this._customers.map((customer, index) => {
                if (this._customers[index].CustomerName.toLowerCase().indexOf(searchValue) !== -1 || this._customers[index].CustomerNo.toLowerCase().indexOf(searchValue) !== -1)
                    this.customerList.push(this._customers[index]);
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";

        this.customerList = new ObservableArray<Customer>();
        this._customers.forEach(item => {
            this.customerList.push(item);
        });
    }

    public setSelectedCustomer(customer: Customer) {
        this.selectedCustomer = customer;
    }

    public createTransaction() {
        dialogs.alert("Your message").then(result => {
            console.log("Dialog result: " + result);
        });
    }
}