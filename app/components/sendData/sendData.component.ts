import { Component } from "@angular/core";

@Component({
    selector: "ns-sendData",
    moduleId: module.id,
    templateUrl: "./sendData.component.html",
    styleUrls: ["./sendData.component.css"]
})

 export class SendDataComponent{
    public options: any;

    constructor(){
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
 }