import { Component, OnInit } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { Customer } from "../../interfaces/customer.interface";
import { SearchBar } from "ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { CustomerService } from "../../services/customer.service";

@Component({
    selector: "ns-customer",
    moduleId: module.id,
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.css"]
})

export class CustomerComponent implements OnInit{
    private customers:any;
    public customerList: ObservableArray<Customer> = new ObservableArray<Customer>();
    public error:any;

    constructor(private _customerService: CustomerService){
        //this.customerList = new ObservableArray<Customer>(this.customers);
    }

    ngOnInit() {
        this.getCustomers();
    }

    public getCustomers(){
        this._customerService.getCustomers()
        .subscribe(result => {
            this.customers = result["Customer"];
            this.customerList = new ObservableArray<Customer>(this.customers);
        }, (error) => {
            this.error(error);
        });
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        if(searchValue.length > 0){
            this.customerList = new ObservableArray<Customer>();
            this.customers.map( (customer, index) => {
                if (this.customers[index].CustomerName.toLowerCase().indexOf(searchValue) !== -1)
                    this.customerList.push(this.customers[index]);
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";

        this.customerList = new ObservableArray<Customer>();
        this.customers.forEach(item => {
            this.customerList.push(item);
        });
    }
 }
