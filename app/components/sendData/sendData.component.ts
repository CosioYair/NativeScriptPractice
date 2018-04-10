import { Component } from "@angular/core";
import { SaleOrder } from "../../interfaces/saleOrder.interface";
import { SaleOrderService } from "../../services/saleOrder.service";

@Component({
    selector: "ns-sendData",
    moduleId: module.id,
    templateUrl: "./sendData.component.html",
    styleUrls: ["./sendData.component.css"]
})

export class SendDataComponent {
    public options: any;
    public userTransaction: number = 0;

    constructor(private _saleOrderService: SaleOrderService) {
        this.options = [{
            name: "Sales order",
            list: this._saleOrderService.getUserSaleOrderUnsaved()
        },
        {
            name: "Quotes",
            list: this._saleOrderService.getUserQuoteUnsaved()
        }];
    }

    public checkList(list) {
        if (list == null || list == undefined)
            return [];
        else
            return list;
    }

    public setTransactionList(index) {
        this.userTransaction = index;
        this.options[0].list = this._saleOrderService.getUserSaleOrderUnsaved();
        this.options[1].list = this._saleOrderService.getUserQuoteUnsaved();
    }

    public switch(transaction) {
        transaction.Sending = !transaction.Sending;
    }

    public sendData() {
        this.options[this.userTransaction].list.map(transaction => {
            console.log(transaction.Sending);
        });
    }
}