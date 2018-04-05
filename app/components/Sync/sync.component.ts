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

@Component({
    selector: "ns-sync",
    moduleId: module.id,
    templateUrl: "./sync.component.html",
    styleUrls: ["./sync.component.css"]
})

export class SyncComponent{
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
    public json : any;
    public options:any;
    public dateUpdated:any;
    constructor(
        private _productService: ProductService,
        private _customerService: CustomerService,
        private _deviceService: DeviceService,
        private _inventoryService: InventoryService,
        private _shippingAddressService: ShippingAddressService,
        private _termsCodeService: TermsCodeService,
    ){
        this.options = [
                {   id: 0,
                    name: "Address",
                    status: true,
                },
                {
                    id:1,
                    name: "Customers",
                    status: true
                },
                {
                    id:2,
                    name: "Customers Sales",
                    status: true
                },
                {
                    id:3,
                    name:"Images",
                    status:true
                },
                {
                    id:4,
                    name:"Inventory",
                    status:true
                },
                {
                    id:5,
                    name:"Products",
                    status:true
                },
                {
                    id:6,
                    name:"Purcharse Orders",
                    status:true
                },
                {
                    id:7,
                    name:"Sales Orders Hystory",
                    status:true
                },
                {
                    id:8,
                    name:"Scan Force",
                    status:true
                },
                {
                    id:9,
                    name:"Users",
                    status:true
                },
                {
                    id:10,
                    name:"Terms Code",
                    status:true
                }
        ];
    }


    public switch(id: any){
        //this.options[index][option].status = !this.options[index][option].status;
        this.options[id].status = !this.options[id].status;
        console.log(this.options[id].status);
    }

  

    public refresh(){
        this.options.map( option =>{
            console.log(option.id+"___"+option.name+"___"+option.status);
        })

        var date = new Date();
        this.dateUpdated = date.toDateString();
        console.log(this.dateUpdated);
    }
}