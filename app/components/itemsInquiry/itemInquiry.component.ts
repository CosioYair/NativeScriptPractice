import { Component, OnInit } from "@angular/core";
import { Product } from "../../interfaces/itemInquiry.interface";
import { SearchBar} from "ui/search-bar";
import { ObservableArray} from "tns-core-modules/data/observable-array/observable-array";
import { ProductService } from "../../services/item.service";
import { CouchbaseService} from "../../services/couchbase.service";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { SERVER } from "../../config/server.config";

//import para descarga de imagenes

import * as imageSource from "tns-core-modules/image-source";
import * as fs from "tns-core-modules/file-system";
import * as http from "http";

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
    public picture:any;

    constructor(private _couchbaseService: CouchbaseService, private _productService: ProductService){
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
            LastSoldDate: "",
            DateCreated: "",
            DateUpdated: "",
            TimeUpdated: "",
            TimeCreated: ""
        }

        this.picture = "";
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
        //this.downloadImagesProducts(this.productList);
    }

//descargar imagenes
    public downloadImagesProducts(productList: ObservableArray<Product>){

        productList.map(product => {
            if(product.ImageFile != null){
                console.log(`${SERVER.baseUrl}/Image/${product.ImageFile}`);
            }
            
        });

        http.getFile("https://raw.githubusercontent.com/NativeScript/NativeScript/master/tests/app/logo.png").then(function (r) {
            //// Argument (r) is File!
            console.log(r.path);//nombre que trae desde el servidor
            const img = imageSource.fromFile(r.path);
            const folder = fs.knownFolders.documents();
            const path = fs.path.join(folder.path, "test.png");//nombre con el que se guarda
            const saved = img.saveToFile(path, "png");
        }, function (e) {
            //// Argument (e) is Error!
        });

        const folder = fs.knownFolders.documents();
        const path = fs.path.join(folder.path, "test.png");//nombre para buscarlo
        const img = imageSource.fromFile(path);
        
        this.picture = path;
        console.log(path+"888888888");

        console.log(this.picture+"888888888");
    }
    
 }