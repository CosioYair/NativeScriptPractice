import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { CouchbaseService } from "../../services/couchbase.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalDateComponent } from "../modal/datepicker/modal-date.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { CONSTANTS } from "../../config/constants.config";
import { SearchBar } from "tns-core-modules/ui/search-bar/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Product } from "../../interfaces/itemInquiry.interface";
import { ProductService } from "../../services/item.service";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { ModalProductOrderComponent } from "../modal/productOrder/modal-product-order.component";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../../interfaces/customer.interface";
import { Inventory } from "../../interfaces/inventory.interface";
import { InventoryService } from "../../services/inventory.service";
import { DecimalPipe } from '@angular/common';

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
    public warehouses:any = [];
    public warehouse:number = 0;
    public shipVias:any;
    public shipVia:number = 0;
    public lineTitle:string = "Item Details";
    public lineSubTitle:string = "Select an item to view details and add";
    public showingProduct:Boolean = false;
    public itemCode:string = "";
    public cart:any = [];
    public productQuantity:number = 1;
    private orientation = require('nativescript-orientation');
    public tabs: Array<SegmentedBarItem>;
    public selectionTabs:any;
    public selectedIndex = 0;
    public customer:Customer;
    private _inventoryDoc = {};
    private _inventories:any;
    public inventoryList: ObservableArray<Inventory> = new ObservableArray<Inventory>();

    constructor(private _productService: ProductService, 
                private _inventoryService: InventoryService, 
                private _couchbaseService: CouchbaseService, 
                private modalService:ModalDialogService, 
                private vcRef:ViewContainerRef, 
                private barcodeScanner: BarcodeScanner, 
                private route: ActivatedRoute){
        this.dates = [];
        this.shipVias = [];
        this.dates.shipDate = new Date();
        this.dates.date = new Date();
        this.dates.shipDate = `${this.dates.shipDate.getDate() + 1}/${this.dates.shipDate.getMonth() + 1}/${this.dates.shipDate.getFullYear()}`;
        this.dates.date = `${this.dates.date.getDate()}/${this.dates.date.getMonth()}/${this.dates.date.getFullYear()}`;
        CONSTANTS.warehouses.map(warehouse => {
            this.warehouses.push(warehouse.name);
        });
        CONSTANTS.shipVias.map(shipVia => {
            this.shipVias.push(shipVia.name);
        });
        this.selectedProduct.ItemCode = "";
        this.selectedCartProduct.ItemCode = "";
        this.orientation.setOrientation("landscaperight");  
        this.tabs = [];
        this.selectionTabs = [{
            title: "HEADER",
            visibility: true
        },
        {
            title: "ADDRESS",
            visibility: false
        },
        {
            title: "LINES",
            visibility: false
        },
        {
            title: "TOTALS",
            visibility: false
        }];
        this.selectionTabs.map(tab => {
            let segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            segmentedBarItem.title = tab.title;
            this.tabs.push(segmentedBarItem);
        });
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        this.selectionTabs.map( (tab, index) => {
            if(index == segmetedBar.selectedIndex)
                tab.visibility = true;
            else
                tab.visibility = false;
        });
    }

    ngOnInit() {
        this.getCustomer(this.route.snapshot.params["CustomerNo"]);
        //this._couchbaseService.deleteDocument("inventory");
        this.setInventory();
        //this._couchbaseService.deleteDocument(this._docIdProduct);
        this.setDocument();
    }

    public getCustomer(CustomerNo:string){
        let doc = this._couchbaseService.getDocument("customer")["customer"];
        doc.map(customer => {
            if (customer.CustomerNo  == CustomerNo)
                this.customer = customer;
        });
    }

    public setInventory(){
        let doc = this._couchbaseService.getDocument("inventory");
        if(doc == null)
            this.getInventories();
        else{
            this._inventoryDoc = doc;
            this.filterInventoryWarehouse();
        }
    }

    public getInventories(){
        this._inventoryService.getInventories()
        .subscribe(result => {
            this.filterInventories(result["Product"]);
        }, (error) => {
            alert(error);
        });
    }

    public async filterInventories(inventoryDoc:any){
        this._inventoryDoc["inventory"] = {};
        await inventoryDoc.map(product => {
            if(product.WarehouseCode == "ATL" || product.WarehouseCode == "HOU" || product.WarehouseCode == "CHI" || product.WarehouseCode == "PHX" || product.WarehouseCode == "000"){
                if(this._inventoryDoc["inventory"][product.WarehouseCode] == null)
                    this._inventoryDoc["inventory"][product.WarehouseCode] = [product];
                else
                    this._inventoryDoc["inventory"][product.WarehouseCode].push(product);
            }
        });
        this._couchbaseService.createDocument(this._inventoryDoc, "inventory");
        this.filterInventoryWarehouse();
    }

    public filterInventoryWarehouse(){
        setTimeout(() => {
            this._inventories = this._inventoryDoc["inventory"][CONSTANTS.warehouses[this.warehouse].code];
            this.inventoryList = new ObservableArray<Inventory>(this._inventories);
        }, 500);
    }

    public setDocument(){
        let doc = this._couchbaseService.getDocument(this._docIdProduct);
        if(doc == null)
            this.getProducts();
        else {
            this._products = doc[this._docIdProduct];
            this.filterProductsType();
        }
    }

    public getProducts(){
        this._productService.getProducts()
        .subscribe(result => {
            this.data[this._docIdProduct] = result["Product"];
            this._couchbaseService.createDocument(this.data, this._docIdProduct);
            this._products = result["Product"];
            this.filterProductsType();
        }, (error) => {
            alert(error);
        });
    }

    public filterProductsType(){
        this.productList = new ObservableArray<Product>();
        this._products.map(product => {
            if(product.ProductType == "F")
                this.productList.push(product);
        });
    }

    public showDateModal(input:string) {
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
                if (this._products[index].ItemCode.toLowerCase().indexOf(searchValue) !== -1)
                    this.productList.push(this._products[index]);
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";

        this.filterProductsType();
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
        this.getInventoryQuantit();
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
                this.itemCode = result.text;
                this.validateProductList();
            }, (errorMessage) => {
                console.log("Error when scanning " + errorMessage);
            }
        );
    }

    public showProductOrderModal() {
        this.createModelViewProductEdit().then(result => {
            console.log(result.quantity);
        }).catch(error => alert(error));
    }
    
    private createModelViewProductEdit(): Promise<any> {
        if(this.selectedCartProduct.quantity != null){
            const productDetails = {
                selectedCartProduct: this.selectedCartProduct
            };
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: productDetails,
                fullscreen: false,
            };
            return this.modalService.showModal(ModalProductOrderComponent, options);
        }
    }

    private async getInventoryQuantit(){
        await this.inventoryList.map(product => {
            let quantityAvail = product.QuantityOnHand - product.QuantityOnSalesOrder;
            if(this.selectedProduct.ItemCode == product.ItemCode){
                this.selectedProduct.quantityOnHand = product.QuantityOnHand;
                this.selectedProduct.quantityAvail = quantityAvail < 0 ? 0 : quantityAvail;
            }
        });
    }
 }