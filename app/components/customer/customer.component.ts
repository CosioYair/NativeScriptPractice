import { Component } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { Customer } from "../../interfaces/customer.interface";

@Component({
    selector: "ns-customer",
    moduleId: module.id,
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.css"]
})

export class CustomerComponent {
    public customers:Customer[];

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
    }
 }
