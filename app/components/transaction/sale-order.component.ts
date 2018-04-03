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
import { TermsCodeService } from "../../services/terms.service";
import { TermsCode } from "../../interfaces/termsCode.interface";
import { ShippingAddress } from "../../interfaces/shippingAddress.interface";
import { ShippingAddressService } from "../../services/shippingAddress.service";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view/tab-view";

@Component({
    selector: "ns-sale-order",
    moduleId: module.id,
    templateUrl: "./sale-order.component.html",
    styleUrls: ["./sale-order.css"]
})

export class SaleOrderComponent implements OnInit{
    public productList:any;
    private _products:any;
    public selectedProduct:any = {};
    public selectedCartProduct:any = {};
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
    public inventoryList: ObservableArray<Inventory> = new ObservableArray<Inventory>();
    public totalCartAmount:number = 0;
    public cartQuantity:number = 0;
    public userTermsCode:string;
    public shippingAddressList:any = [];
    private _customerShippingAddress: any;
    public totalCubes:number = 0;
    /*
    private _scanForceDoc = {};
    private _scanForceList:ObservableArray<ScanForce> = new ObservableArray<ScanForce>();
    */

    constructor(private _productService: ProductService, 
                private _inventoryService: InventoryService, 
                private _couchbaseService: CouchbaseService, 
                private modalService: ModalDialogService, 
                private vcRef: ViewContainerRef, 
                private barcodeScanner: BarcodeScanner, 
                private route: ActivatedRoute,
                private _termsCodeService: TermsCodeService,
                private _shippingAddressService: ShippingAddressService,
            ){
        this.dates = [];
        this.shipVias = [];
        this.dates.shipDate = new Date();
        this.dates.date = new Date();
        this.dates.shipDate = `${this.dates.shipDate.getDate() + 1}/${this.dates.shipDate.getMonth() + 1}/${this.dates.shipDate.getFullYear()}`;
        this.dates.date = `${this.dates.date.getDate()}/${this.dates.date.getMonth()}/${this.dates.date.getFullYear()}`;
        CONSTANTS.shipVias.map(shipVia => {
            this.shipVias.push(shipVia.name);
        });
        CONSTANTS.warehouses.map(warehouse => {
            this.warehouses.push(warehouse.name);
        });
        this.selectedProduct.ItemCode = "";
        this.selectedProduct.comment = "";
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
        this.setTermsCode();
        this.setShippingAddress();
        //this._couchbaseService.deleteDocument("shippingaddress");
        //this.setScanForce();
        this.setDocument();
        //this._couchbaseService.deleteDocument("product");
    }

    public async setDocument(){
        if(this._couchbaseService.getDocument("product") == null)
            this._productService.setProductDocument();

        this._products = await this._productService.getProductDocument();
        this.productList = new ObservableArray<Product>(this._products);
    }

    public getCustomer(CustomerNo:string){
        let doc = this._couchbaseService.getDocument("customer")["customer"];
        doc.map(customer => {
            if (customer.CustomerNo  == CustomerNo)
                this.customer = customer;
        });
    }

    public setTermsCode(){
        if(this._couchbaseService.getDocument("termscode") == null)
            this._termsCodeService.setTermsCodeDoc();
        this.userTermsCode = this._termsCodeService.getUserTermsCode(this.customer);
    }

    public async setShippingAddress(){
        if(this._couchbaseService.getDocument("shippingaddress") == null)
            this._shippingAddressService.setShippingAddressDoc();
        this.shippingAddressList = await this._shippingAddressService.getCustomerShippingAddressList(this.customer);
        this._customerShippingAddress = await this._shippingAddressService.getCustomerShippingAddress(this.customer);
        this.customer["shippingAddress"] = this._customerShippingAddress[0];
    }

    public setInventory(){
        if(this._couchbaseService.getDocument("inventory") == null)
            this._inventoryService.setInventoriesDoc();

        this.inventoryList = this._inventoryService.getInventoryWarehouse(this.warehouse);
    }

    /*public setScanForce(){
        let doc = this._couchbaseService.getDocument("scanforce");
        if(doc == null)
            this.getScanForce();
        else{
            this._scanForceDoc = doc;
            this._scanForceList = this._scanForceDoc["scanforce"];
        }
        this.getUserScanForce();
    }

    public getScanForce(){
        this._scanForceService.getScanForce()
        .subscribe(result => {
            this._scanForceDoc["scanforce"] = result["Users"];
            this._couchbaseService.createDocument(this._termsCodeDoc, "scanforce");
            this._scanForceList = result["Users"];
        }, (error) => {
            alert(error);
        });
    }

    public getUserScanForce(){
        let scanForceUser = {};
        this._scanForceList.map(user =>{
            if(user.UserCode == userCode)
                scanForceUser = user;
        });
    }*/

    public setCustomerShippingAddress(args:SelectedIndexChangedEventData){
        setTimeout(() => {
            this.customer["shippingAddress"] = this._customerShippingAddress[args.newIndex];
        }, 500);
    }

    public filterInventoryWarehouse(){
        setTimeout(() => {
            this.cancel();
            this.inventoryList = this._inventoryService.getInventoryWarehouse(this.warehouse);
        }, 500);
    }

    public showDateModal(input:string) {
        this.createModelView().then(result => {
            if(result != null)
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

        this.productList = new ObservableArray<Product>(this._products);
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
        let item = false;
        list.map( (product, index) => {
            if(list[index].ItemCode.toLowerCase() == code.toLowerCase()){
                item = product;
                this.selectedProduct = this._products[index]; 
            }
        });
        return item;
    }

    public validateProductList(){
        if(this.searchItemCode(this.itemCode, this._products) == false)
            alert(`Invalid item code. ${this.itemCode} does not exist.`);
        else
            this.viewProduct(this.selectedProduct);
    }

    public addProduct(){
        let product = this.searchItemCode(this.itemCode, this.cart);
        if(product == false){
            this.selectedProduct.quantity = this.productQuantity;
            this.selectedProduct.quantityPrice = this.selectedProduct.quantity * parseFloat(this.selectedProduct.StandardUnitPrice);
            this.cart.push(this.selectedProduct);
            this.totalCartAmount += this.selectedProduct.quantityPrice;
            this.cartQuantity = this.cartQuantity + parseInt(this.selectedProduct.quantity);
            this.totalCubes += this.selectedProduct.Category4 * this.selectedProduct.quantity;
            alert(`Item ${this.itemCode} added to cart.`);
        }
        else{
            this.selectedCartProduct = product;
            this.showProductOrderModal();
        }
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
            if(this.cart[index].ItemCode == this.selectedCartProduct.ItemCode){
                this.totalCartAmount = this.totalCartAmount - parseFloat(this.selectedCartProduct.quantityPrice);
                this.cartQuantity = this.cartQuantity - this.selectedCartProduct.quantity;
                this.totalCubes -= this.selectedCartProduct.Category4 * this.selectedCartProduct.quantity;
                this.cart.splice(index, 1);
            }
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

    public showProductOrderModal(){
        if(this.selectedCartProduct.quantity != undefined){
            let oldProductQuantity = parseInt(this.selectedCartProduct.quantity);
            this.createModelViewProductEdit().then(result => {
                if(result != null && result.quantity > 0){
                    this.cartQuantity = this.cartQuantity - oldProductQuantity;
                    this.totalCartAmount = this.totalCartAmount - this.selectedCartProduct.quantityPrice;
                    this.totalCubes -= this.selectedCartProduct.Category4 * oldProductQuantity;
                    this.cartQuantity = this.cartQuantity + parseInt(result.quantity);
                    this.selectedCartProduct.quantityPrice = result.quantity * parseFloat(this.selectedCartProduct.StandardUnitPrice);
                    this.totalCartAmount = this.totalCartAmount + this.selectedCartProduct.quantityPrice;
                    this.totalCubes += this.selectedCartProduct.Category4 * this.selectedCartProduct.quantity;
                }
                else
                    this.selectedCartProduct.quantity = oldProductQuantity;
            }).catch(error => alert(error));
        }
    }
    
    private createModelViewProductEdit(): Promise<any> {
        if(this.selectedCartProduct.quantity != null){
            const productDetails = {
                selectedCartProduct: this.selectedCartProduct,
                warehouse: CONSTANTS.warehouses[this.warehouse].name
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

    public showDescription(){
        if(this.selectedProduct.ExtendedDescriptionText != undefined)
            alert(this.selectedProduct.ExtendedDescriptionText);
        else
            alert("Description not available");
    }
 }