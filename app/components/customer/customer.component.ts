import { Component } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { Customer } from "../../interfaces/customer.interface";
import { SearchBar } from "ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Component({
    selector: "ns-customer",
    moduleId: module.id,
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.css"]
})

export class CustomerComponent {
    private customers:Customer[];
    public customerList: ObservableArray<Customer> = new ObservableArray<Customer>();

    constructor(){
        this.customers = [{
            customerNo: "2D37205",
            addressLine1: "73 White Bridge Rd",
            addressLine2: "Suite # 109",
            city: "Nashville",
            comment: "",
            countryCode: "USA",
            customerDiscountRate: 0,
            customerName: "2 Danes Contemporary Furniture",
            customerStatus: "A",
            customerType: "",
            dateCreated: "7/24/2012 12:00:00 AM",
            dateLastActivity: "5/6/2013 12:00:00 AM",
            dateUpdated: "4/15/2017 12:00:00 AM",
            state: "TN",
            telephoneNo: "(615) 352-6085",
            zipCode: "37205"
        },
        {
            customerNo: "2D37205",
            addressLine1: "73 White Bridge Rd",
            addressLine2: "Suite # 109",
            city: "Nashville",
            comment: "",
            countryCode: "USA",
            customerDiscountRate: 0,
            customerName: "2 Danes Contemporary Furniture",
            customerStatus: "A",
            customerType: "",
            dateCreated: "7/24/2012 12:00:00 AM",
            dateLastActivity: "5/6/2013 12:00:00 AM",
            dateUpdated: "4/15/2017 12:00:00 AM",
            state: "TN",
            telephoneNo: "(615) 352-6085",
            zipCode: "37205"
        },
        {
            customerNo: "2D37205",
            addressLine1: "73 White Bridge Rd",
            addressLine2: "Suite # 109",
            city: "Nashville",
            comment: "",
            countryCode: "USA",
            customerDiscountRate: 0,
            customerName: "2 Danes Contemporary Furniture",
            customerStatus: "A",
            customerType: "",
            dateCreated: "7/24/2012 12:00:00 AM",
            dateLastActivity: "5/6/2013 12:00:00 AM",
            dateUpdated: "4/15/2017 12:00:00 AM",
            state: "TN",
            telephoneNo: "(615) 352-6085",
            zipCode: "37205"
        }];
        this.customerList = new ObservableArray<Customer>(this.customers);
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        if(searchValue.length > 0){
            this.customerList = new ObservableArray<Customer>();
            if (searchValue !== "") {
                this.customers.map( (customer, index) => {
                    if (this.customers[index].customerName.toLowerCase().indexOf(searchValue) !== -1)
                        this.customerList.push(this.customers[index]);
                });
            }
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
