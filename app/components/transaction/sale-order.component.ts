import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { CouchbaseService } from "../../services/couchbase.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalDateComponent } from "../modal/modal-date.component";

@Component({
    selector: "ns-sale-order",
    moduleId: module.id,
    templateUrl: "./sale-order.component.html",
    styleUrls: ["./sale-order.css"]
})

export class SaleOrderComponent implements OnInit{
    private _docId:string = "customer";
    public date:any;

    constructor(private _couchbaseService: CouchbaseService, private modalService:ModalDialogService, private vcRef:ViewContainerRef){
        this.date = new Date();
    }

    ngOnInit() {
    }

    public showModal() {
        this.createModelView().then(result => {
           this.date = result;
        }).catch(error => alert(error));
    }
    
    private createModelView(): Promise<any> {
        const today = new Date();
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };
        return this.modalService.showModal(ModalDateComponent, options);
    }
 }