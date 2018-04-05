import { Component, ElementRef } from "@angular/core";
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
    public Qty:ElementRef;

    public constructor(private params: ModalDialogParams) {
        this.selectedCartProduct = this.params.context.selectedCartProduct;
        this.warehouse = this.params.context.warehouse;
    }

    public close() {
        if(this.validateIntegerNumber(this.selectedCartProduct.quantity))
            this.params.closeCallback(this.selectedCartProduct);
        else{
            alert("Invalid format to quantity");
            this.Qty.nativeElement.focus();
        }
    }

    public validateIntegerNumber(number){
        if(number != parseInt(number, 10) || number < 1)
            return false;
        return true;
    }   
}