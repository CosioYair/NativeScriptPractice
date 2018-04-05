import { Component, OnInit } from "@angular/core";
import { Product } from "../../interfaces/itemInquiry.interface";
import { SearchBar} from "ui/search-bar";
import { ObservableArray} from "tns-core-modules/data/observable-array/observable-array";
import { ProductService } from "../../services/item.service";
import { CouchbaseService} from "../../services/couchbase.service";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { SERVER } from "../../config/server.config";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { DropDownModule } from "nativescript-drop-down/angular";
import { CONSTANTS } from "../../config/constants.config";

//import para descarga de imagenes http
/*
import * as imageSource from "tns-core-modules/image-source";
import * as fs from "tns-core-modules/file-system";
import * as http from "http";

//Download Progress
import { DownloadProgress } from "nativescript-download-progress"
//Unzip
import { Zip } from "nativescript-zip";
import * as fsuz from "file-system";
//Image Cache
import * as imageCacheModule from "tns-core-modules/ui/image-cache";
import { InventoryService } from "../../services/inventory.service";
//Open local json

*/



@Component({
    selector: "ns-itemInquiry",
    moduleId: module.id,
    templateUrl: "./itemInquiry.component.html",
    styleUrls: ["./itemInquiry.component.css"]
})


export class ItemInquiryComponent implements OnInit{
    private _products:any;
    private _docId:string = "product";
    public productList: ObservableArray<Product> = new ObservableArray<Product>();
    public data = {};
    public selectedProduct:any = {};
    public itemCode:string = "";
    public warehouses:any = [];
    public warehouse:number = 0;
    public stdUnitPrice:number=0;
    public stdUnitCost:number=0;
    
    //obtencion de imagen
    public picture:any;
    public urlImage: any;
    public startGetImage: 0;
    public endGetImage = 80;
    public path: any;

    //ngif
    public isVisibleData: boolean = false;
    public isVisibleScanner: boolean =true;
    
  
    
    

    constructor(private _couchbaseService: CouchbaseService, 
        private _productService: ProductService, 
        private barcodeScanner: BarcodeScanner){
        this.selectedProduct = {
            ItemCode: "",
            ItemCodeDesc: "",
            InactiveItem: "",
            ItemType: "",
            ShipWeight: "",
            Volume: "",
            StandardUnitCost: "",
            StandardUnitPrice: "",
            PrimaryVendorNo: "",
            Category1: "",
            Category2: "",
            Category3: "",
            Category4: "",
            ProductLine: "",
            ProductType: "",
            ExtendedDescriptionText: "",
            ImageFile: "",
            LastSoldDate: "",
            DateCreated: "",
            DateUpdated: "",
            TimeUpdated: "",
            TimeCreated: ""
        }

        //this.picture = "";
        CONSTANTS.warehouses.map(warehouse => {
            this.warehouses.push(warehouse.name);
        });
    }

    ngOnInit() {
        this.setDocument();
    }

    public getProducts(){
        this._productService.getProducts()
        .subscribe(result => {
            this.data[this._docId] = result["Product"];
            this._couchbaseService.createDocument(this.data, this._docId);
            this._products = result["Product"];
            this.productList = new ObservableArray<Product>(this._products);

        }, (error) => {
            alert(error);
        });

    }

    public setDocument(){
        let doc = this._couchbaseService.getDocument(this._docId);
        if(doc == null)
            this.getProducts();
        else {
            this._products = doc[this._docId];
            this.productList = new ObservableArray<Product>(this._products);
        }
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

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

        this.productList = new ObservableArray<Product>();
        this._products.forEach(item => {
            this.productList.push(item);
        });
    }

    public setSelectedProduct(product:Product){
        this.selectedProduct = product;
        this.stdUnitPrice = (this.selectedProduct.StandardUnitPrice).toFixed(2);
        this.stdUnitCost = (this.selectedProduct.StandardUnitCost).toFixed(2);
        //this.downloadImagesProducts(this.productList);
        //this.getImage(product);
        //this.picture = "";
        //this.showImageLocal(product);
        //this.picture = `${SERVER.baseUrl}/Image/${product.ItemCode}`;
        //this.showImage(product);
        if (this.isVisibleData == false){
            this.isVisibleData = true;
            this.isVisibleScanner = false;
        }
    }

    public cancel(){
        this.isVisibleData = false;
        this.isVisibleScanner = true;
    }

    public description(){
        var description: string = this.selectedProduct.ExtendedDescriptionText;
        var dialogs = require("ui/dialogs");
        dialogs.alert({
            title: "Description",
            message: (description),
            okButtonText: "Accept"
        }).then(function () {
            console.log("Dialog closed!");
        });

    }

    public onScan() {
        console.log(this.warehouses);
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
                //this.validateProductList();
                console.log(this.itemCode);
            }, (errorMessage) => {
                console.log("Error when scanning " + errorMessage);
            }
        );
    }
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////

    
}

