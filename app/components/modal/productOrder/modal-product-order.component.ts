import { Component, ElementRef, ViewChild } from "@angular/core";
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
    @ViewChild('Qty') Qty: ElementRef;

    public constructor(private params: ModalDialogParams) {
        this.selectedCartProduct = this.params.context.selectedCartProduct;
        this.warehouse = this.params.context.warehouse;
    }

    public close() {
        if(this.validateIntegerNumber(this.selectedCartProduct.quantity))
            this.params.closeCallback(this.selectedCartProduct);
        else{
            alert("Invalid quantity");
            this.Qty.nativeElement.focus();
            setTimeout(() =>{
                this.Qty.nativeElement.android.selectAll();
            },500);
            this.Qty.nativeElement.ios.textRangeFromPositionToPosition(this.Qty.nativeElement.ios.beginningOfDocument, this.Qty.nativeElement.ios.endOfDocument);
        }
    }

    public validateIntegerNumber(number){
        if(number != parseInt(number, 10) || number < 1)
            return false;
        return true;
    }   
}