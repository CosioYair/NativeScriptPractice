import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-product-order.component.html",
})
export class ModalProductOrderComponent {
    public _date:any;
    public selectedCartProduct:any;

    public constructor(private params: ModalDialogParams) {
        this._date = new Date();
        this.selectedCartProduct = this.params.context.selectedCartProduct;
    }

    public save() {
        this.params.closeCallback(this.selectedCartProduct);
    }
}