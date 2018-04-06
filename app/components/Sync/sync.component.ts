import { Component } from "@angular/core";
import * as switchModule from "tns-core-modules/ui/switch";

//Services
import { ProductService } from "../../services/item.service";
import { CustomerService } from "../../services/customer.service";
import { DeviceService } from "../../services/device.service";
import { InventoryService } from "../../services/inventory.service";
import { ShippingAddressService } from "../../services/shippingAddress.service";
import { TermsCodeService } from "../../services/terms.service";
import { UserService } from "../../services/user.service";
//Barra
import * as progressModule from "tns-core-modules/ui/progress";
import { Progress } from "ui/progress";
import { CouchbaseService } from "../../services/couchbase.service";
import { SERVER } from "../../config/server.config";

@Component({
    selector: "ns-sync",
    moduleId: module.id,
    templateUrl: "./sync.component.html",
    styleUrls: ["./sync.component.css"]
})

export class SyncComponent {
    public address = true;
    public customers = true;
    public customerSales = true;
    public images = true;
    public inventory = true;
    public products = true;
    public purchaseOrders = true;
    public salesOrderHistory = true;
    public scanForce = true;
    public users = true;
    public termsCode = true;
    public json: any;
    public options: any;
    public dateUpdated: any;
    public syncScreen: boolean = true;
    public loadingScreen: boolean = false;
    public button: boolean = false;
    public refreshButton: boolean = true;
    public progressValue = 0;
    public status: string = "Downloading...";
    constructor(
        private _productService: ProductService,
        private _customerService: CustomerService,
        private _deviceService: DeviceService,
        private _inventoryService: InventoryService,
        private _shippingAddressService: ShippingAddressService,
        private _termsCodeService: TermsCodeService,
        private _couchbaseService: CouchbaseService,
        private _userService: UserService
    ) {
        this.options = [
            {
                name: "address",
                status: true,
                service: this._shippingAddressService.setShippingAddressDoc.bind(this._shippingAddressService),
            },
            {
                name: "Customers",
                status: true,
                service: this._customerService.setCustomerDocument.bind(this._customerService),
            },/*
                {
                    name:"Images",
                    status:true,
                    service: this.default(),
                },*/
            {
                name: "Inventory",
                status: true,
                service: this._inventoryService.setInventoriesDoc.bind(this._inventoryService),
            },
            {
                name: "Products",
                status: true,
                service: this._productService.setProductDocument.bind(this._productService),
            },
            {
                name: "Users",
                status: true,
                service: this._userService.setUserDocument.bind(this._userService),
            },
            {
                name: "Terms Code",
                status: true,
                service: this._termsCodeService.setTermsCodeDoc.bind(this._termsCodeService),
            }
        ];
        if (this._couchbaseService.getDocument("product") == null)
            this.refresh();

    }

    /*
    public progress(){
        this.progressValue = 25;
        setInterval(() => {
            this.progressValue += 1;
        },300);
    }*/

    onValueChanged(args) {
        let progressBar = <Progress>args.object;
        console.log("Value changed for " + progressBar);
        console.log("New value: " + progressBar.value);
    }

    public switch(index: any) {
        //this.options[index][option].status = !this.options[index][option].status;
        this.options[index].status = !this.options[index].status;
        console.log(this.options[index].status);
    }



    public refresh() {
        this.syncScreen = false;
        this.loadingScreen = true;
        this.refreshButton = false;
        var i = 0;
        var j = 0;
        var part = 0;
        var res = 0;
        this.options.map(option => {
            if (option.status)
                j++;
        })

        part = 100 / j;

        this.options.map(async (option) => {
            if (option.status) {
                await option.service();
                this.progressValue += part;
                res = 100 / this.progressValue;
                if (res <= 1) {
                    this.refreshButton = true;
                    this.button = true;
                    this.status = "Downloaded"
                }
            }
        });

        var date = new Date();
        this.dateUpdated = date.toDateString();
        //console.log(this.dateUpdated);
        console.log(part);
    }

    public accept() {
        this.syncScreen = true;
        this.loadingScreen = false;
        this.refreshButton = true;
    }

    public defaultFunction() {

    }
}