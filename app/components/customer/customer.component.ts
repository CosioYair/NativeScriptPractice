import { Component, OnInit } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { Customer } from "../../interfaces/customer.interface";
import { SearchBar } from "ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { CustomerService } from "../../services/customer.service";
import { CouchbaseService } from "../../services/couchbase.service";
import { SERVER } from "../../config/server.config";

@Component({
    selector: "ns-customer",
    moduleId: module.id,
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.css"]
})

export class CustomerComponent implements OnInit{
    private _customers:any;
    private _docId:string = "customer";
    public customerList: ObservableArray<Customer> = new ObservableArray<Customer>();
    public data = {};
    public selectedCustomer:any = {};

    constructor(private _couchbaseService: CouchbaseService, private _customerService: CustomerService){
        this.selectedCustomer.CustomerName = "Customer details";
        this.selectedCustomer.CustomerNo = "";
    }

    ngOnInit() {
        this.setDocument();
    }

    public getCustomers(){
        this._customerService.getCustomers()
        .subscribe(result => {
            this.data[this._docId] = result["Customer"];
            this._couchbaseService.createDocument(this.data, this._docId);
            this._customers = result["Customer"];
            this.customerList = new ObservableArray<Customer>(this._customers);
        }, (error) => {
            alert(error);
        });
    }

    public setDocument(){
        let doc = this._couchbaseService.getDocument(this._docId);
        if(doc == null)
            this.getCustomers();
        else {
            this._customers = doc[this._docId];
            this.customerList = new ObservableArray<Customer>(this._customers);
        }
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        if(searchValue.length > 0){
            this.customerList = new ObservableArray<Customer>();
            this._customers.map( (customer, index) => {
                if (this._customers[index].CustomerName.toLowerCase().indexOf(searchValue) !== -1)
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

    public setSelectedCustomer(customer:Customer){
        this.selectedCustomer = customer;
    }
 }