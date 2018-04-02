import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-product-order.component.html",
})
export class ModalProductOrderComponent {
    public selectedCartProduct:any;
    public warehouse:string;

    public constructor(private params: ModalDialogParams) {
        this.selectedCartProduct = this.params.context.selectedCartProduct;
        this.warehouse = this.params.context.warehouse;
    }

    public close() {
        this.params.closeCallback(this.selectedCartProduct);
    }
}