import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { CouchbaseService } from "../../services/couchbase.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalDateComponent } from "../modal/modal-date.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { CONSTANTS } from "../../config/constants.config";
import { SearchBar } from "tns-core-modules/ui/search-bar/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Product } from "../../interfaces/itemInquiry.interface";
import { ProductService } from "../../services/item.service";

@Component({
    selector: "ns-sale-order",
    moduleId: module.id,
    templateUrl: "./sale-order.component.html",
    styleUrls: ["./sale-order.css"]
})

export class SaleOrderComponent implements OnInit{
    private _products:any;
    private _docIdProduct:string = "product";
    public productList: ObservableArray<Product> = new ObservableArray<Product>();
    public selectedProduct:any = {};
    public data = {};
    public dates:any;
    public wharehouses:any;
    public wharehouse:number = 0;
    public shipVias:any;
    public shipVia:number = 0;
    public lineTitle:string = "Item Details";
    public lineSubTitle:string = "Select an item to view details and add";

    constructor(private _productService: ProductService, private _couchbaseService: CouchbaseService, private modalService:ModalDialogService, private vcRef:ViewContainerRef){
        this.dates = [];
        this.wharehouses = [];
        this.shipVias = [];
        this.dates.shipDate = new Date();
        this.dates.date = new Date();
        this.dates.shipDate = `${this.dates.shipDate.getDate() + 1}/${this.dates.shipDate.getMonth() + 1}/${this.dates.shipDate.getFullYear()}`;
        this.dates.date = `${this.dates.date.getDate()}/${this.dates.date.getMonth()}/${this.dates.date.getFullYear()}`;
        CONSTANTS.wharehouses.map(wharehouse => {
            this.wharehouses.push(wharehouse.name);
        });
        CONSTANTS.shipVias.map(shipVia => {
            this.shipVias.push(shipVia.name);
        });
        this.selectedProduct.ItemCode = "";
    }

    ngOnInit() {
        this.setDocument();
    }

    public getProducts(){
        console.log(JSON.stringify("2"));
        this._productService.getProducts()
        .subscribe(result => {
            this.data[this._docIdProduct] = result["Product"];
            this._couchbaseService.createDocument(this.data, this._docIdProduct);
            this._products = result["Product"];
            this.productList = new ObservableArray<Product>(this._products);
        }, (error) => {
            alert(error);
        });
    }

    public setDocument(){
        let doc = this._couchbaseService.getDocument(this._docIdProduct);
        if(doc == null)
            this.getProducts();
        else {
            this._products = doc[this._docIdProduct];
            this.productList = new ObservableArray<Product>(this._products);
        }
    }

    public showModal(input:string) {
        this.createModelView().then(result => {
           this.dates[input] = result;
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

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        if(searchValue.length > 0){
            this.productList = new ObservableArray<Product>();
            this._products.map( (product, index) => {
                if (this._products[index].ItemCodeDesc.toLowerCase().indexOf(searchValue) !== -1)
                    this.productList.push(this._products[index]);
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";

        this.productList = new ObservableArray<Product>();
        this._products.forEach(item => {
            this.productList.push(item);
        });
    }

    public setSelectedProduct(product:Product){
        this.selectedProduct = product;
    }
 }