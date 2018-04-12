import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SERVER } from "../../config/server.config";
import { SaleOrderService } from "../../services/saleOrder.service";
import { SaleOrder } from "../../interfaces/saleOrder.interface";
import { DecimalPipe } from '@angular/common';

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})

export class HomeComponent{

    private userTransactions: SaleOrder[];
    public unsetTransactions: number = 0;
    public avgAmount: number = 0;
    public totalAmount: number = 0;
    public userName: string;

    constructor(private _saleOrderService: SaleOrderService){
        this.userTransactions =  _saleOrderService.getUnsavedUserTransactions();
        this.unsetTransactions = this.userTransactions.length;
        this.userName = SERVER.user["UserName"];
        this.getAmounts();
    }

    public getAmounts(){
        this.userTransactions.map(transaction => {
            transaction.Detail.map(product => {
                this.totalAmount += product.quantityPrice;
            });
        });

        this.avgAmount = this.totalAmount == 0 ? 0 : (this.totalAmount / this.unsetTransactions);
    }
}