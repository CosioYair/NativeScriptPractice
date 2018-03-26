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
import { BarcodeScanner } from 'nativescript-barcodescanner';

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
    public selectedCartProduct:any = {};
    public data = {};
    public dates:any;
    public wharehouses:any;
    public wharehouse:number = 0;
    public shipVias:any;
    public shipVia:number = 0;
    public lineTitle:string = "Item Details";
    public lineSubTitle:string = "Select an item to view details and add";
    public showingProduct:Boolean = false;
    public itemCode:string = "";
    public cart:any = [];
    public productQuantity:number = 1;

    constructor(private _productService: ProductService, private _couchbaseService: CouchbaseService, private modalService:ModalDialogService, private vcRef:ViewContainerRef, private barcodeScanner: BarcodeScanner){
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
        this.selectedCartProduct.ItemCode = "";
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
        let searchValue = searchBar.text.toLowerCase()
        this.cancel();

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

    public cancel(){
        this.showingProduct = false;
        this.selectedProduct = {};
        this.lineTitle =  "Item Details";
        this.lineSubTitle = "Select an item to view details and add";
        this.productQuantity = 1;
    }

    public viewProduct(product:Product){
        this.selectedProduct = product;
        this.showingProduct = true;
        this.lineTitle = product.ItemCodeDesc;
        this.lineSubTitle = product.ItemCode;
        this.itemCode = product.ItemCode;
    }

    private searchItemCode(code:string, list:any){
        let notFound = true;
        list.map( (product, index) => {
            if(list[index].ItemCode.toLowerCase() == code.toLowerCase()){
                notFound = false;
                this.selectedProduct = this._products[index]; 
            }
        });
        return notFound;
    }

    public validateProductList(){
        if(this.searchItemCode(this.itemCode, this._products))
            alert(`Invalid item code. ${this.itemCode} does not exist.`);
        else
            this.viewProduct(this.selectedProduct);
    }

    public addProduct(){
        if(this.searchItemCode(this.itemCode, this.cart)){
            this.selectedProduct.quantity = this.productQuantity;
            this.selectedProduct.quantityPrice = this.selectedProduct.quantity * parseFloat(this.selectedProduct.StandardUnitCost);
            this.cart.push(this.selectedProduct);
            alert(`Item ${this.itemCode} added to cart.`);
        }
        else
            alert(`Item ${this.itemCode} is already in the cart.`);
        this.cancel();
    }

    public showCart(){
        console.log(JSON.stringify(this.cart));
    }

    public setSelectedCartProduct(product:Product){
        this.selectedCartProduct = product;
    }

    public deleteCartProduct(){
        this.cart.map( (product, index) => {
            if(this.cart[index].ItemCode == this.selectedCartProduct.ItemCode)
                this.cart.splice(index, 1);
        });
    }

    public onScan() {
        alert("sss");
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            showFlipCameraButton: true,   
            preferFrontCamera: false,     
            showTorchButton: true,        
            beepOnScan: true,             
            torchOn: false,               
            resultDisplayDuration: 500,   
            orientation: "orientation",     
            openSettingsIfPermissionWasPreviouslyDenied: true
        }).then((result) => {
            alert({
                title: "You Scanned ",
                message: "Format: " + result.format + ",\nContent: " + result.text,
                okButtonText: "OKK"
            });
            }, (errorMessage) => {
                console.log("Error when scanning " + errorMessage);
            }
        );
    }
 }