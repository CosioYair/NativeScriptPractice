import { Component, OnInit } from "@angular/core";
import { Product } from "../../interfaces/itemInquiry.interface";
import { SearchBar} from "ui/search-bar";
import { ObservableArray} from "tns-core-modules/data/observable-array/observable-array";
import { ProductService } from "../../services/item.service";
import { CouchbaseService} from "../../services/couchbase.service";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { SERVER } from "../../config/server.config";

//import para descarga de imagenes http

import * as imageSource from "tns-core-modules/image-source";
import * as fs from "tns-core-modules/file-system";
import * as http from "http";

//Download Progress
import { DownloadProgress } from "nativescript-download-progress"


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
    public urlImage: any;

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
            ImageFile: "",
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
        //this.showImage(product);
        //this.downloadImagesProducts(this.productList);
        //this.downloadProgres();
        this.getImage(product);
    }

//descargar imagenes
    public downloadImagesProducts(productList: ObservableArray<Product>){
        //var contWImage= 0;
        //var contImage = 0;
        var l: any;
        var cont = 100;
        l = productList.length;
        var i = 0;
        console.log("Largo del array__:"+l);
            productList.map(product => {
                if(product.ImageFile != null){
                    console.log(`${SERVER.baseUrl}/Image/${product.ImageFile}`);
                    this.urlImage = `${SERVER.baseUrl}/Image/${product.ImageFile}`;
                    console.log(this.urlImage);
                    //contImage++;
                    
                    
                    
                    setTimeout(() => {
                        //this._productService.getProductImage(this.urlImage,product.ImageFile);
                        //this.downloadProgress(this.urlImage);
                    }, cont);
                    
                    i++;
                    console.log(i);
                }else{
                    //console.log(product.ProductType + "____No tiene imagen___"+contWImage);
                    //contWImage++;
                }
                cont += 250;
            });
        
        
        console.log("Termino la descarga");
        
        
    }

    public showImageLocal(product: Product){
        //codigo para obtener los path de la imagen seleccionada
        if(product.ImageFile != null && product.ImageFile != undefined){
            const folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, product.ImageFile);//nombre para buscarlo
            const img = imageSource.fromFile(path);
             
            this.picture = path;
            console.log(path+"encontro imagen");

            console.log(this.picture+"888888888");
        }else{
            const folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, "IFD1020NTST.jpg");//nombre para buscarlo
            const img = imageSource.fromFile(path);
            
            this.picture = path;
            console.log(path+"no encontro imagen");

            console.log(this.picture+"888888888");
        }
        
    }

    //Plugin descarga de archivos grandes...
    public async downloadProgress(urlImage: any){
        var download = new DownloadProgress();
        var uri: any = "uriVacia";
        download.addProgressCallback((progress)=>{
            console.log('Progress:', progress);
        })
            await download.downloadFile(urlImage).then((f)=>{
            console.log("Success", f);
            console.log("Funciona");
            
        }).catch((e)=>{
            console.log("Error", e);
        })
        return uri;
    }


    //prueba de descarga por click
    public getImage(product: Product){
        
                if(product.ImageFile != null || product.ImageFile != undefined){
                    console.log(`${SERVER.baseUrl}/Image/${product.ImageFile}`);
                    this.urlImage = `${SERVER.baseUrl}/Image/${product.ImageFile}`;
                    console.log(this.urlImage);
                    //contImage++;

                    setTimeout(() => {
                            this._productService.getProductImage(this.urlImage,product.ImageFile);
                            this.picture = this.urlImage
                            this.showImageLocal(product);
                        }, 250);
                    console.log("Se descargo imagen en la url___:" + this.urlImage);
                }else{
                    this.showImageLocal(product);
                    console.log(product.ProductType + "____No tiene imagen___");
                }
                console.log("Termino la descarga");     
    }
    
 }