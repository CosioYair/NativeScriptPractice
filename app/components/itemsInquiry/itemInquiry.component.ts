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
//Unzip
import { Zip } from "nativescript-zip";
import * as fsuz from "file-system";
//Image Cache
import * as imageCacheModule from "tns-core-modules/ui/image-cache";
//Open local json





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
    //obtencion de imagen
    public picture:any;
    public urlImage: any;
    public startGetImage: 0;
    public endGetImage = 80;
    public path: any;

    //ngif
    public isVisibleData: boolean = false;
    public isVisibleScanner: boolean =true;
    
  
    
    

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
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    public downloadImagesProducts(productList: ObservableArray<Product>){
        var l: any;
        var cont = 0;
        l = productList.length;
        var nameImage: any;
        var i = 0, k = 0;
        console.log("Largo del array__:"+l);
            productList.slice(0,150).map(product => {
                if(product.ImageFile != null){
                    console.log(`${SERVER.baseUrl}/Image/${product.ImageFile}`);
                    this.urlImage = `${SERVER.baseUrl}/Image/${product.ItemCode}`;
                    console.log(this.urlImage);
                    //contImage++;
                    
                    
                    
                    
                    setTimeout(() => {
                        nameImage = product.ItemCodeDesc;
                        this._productService.getProductImage(this.urlImage,product.ItemCode);
                        //this.downloadProgress(this.urlImage);
                        console.log(k);
                        k++;
                    }, cont);
                    
                    i++;
                    if(i==100){
                        cont += 500;
                        i = 0;
                    }
                    console.log(k);
                }else{
                    //console.log(product.ProductType + "____No tiene imagen___"+contWImage);
                    //contWImage++;
                }
                cont += 200;
            });
        
        
        console.log("Termino la descarga");
        
        
    }

    public showImageLocal(product: Product){
        //codigo para obtener los path de la imagen seleccionada
        if(product.ImageFile != null && product.ImageFile != undefined){

            //Busqueda en la imagen en la memoria local
            var folder = fs.knownFolders.documents();
            this.path = fs.path.join(folder.path, product.ItemCode+".jpg");
            //const img = imageSource.fromFile(path);
             
            this.picture = this.path;
            console.log(this.path+"   encontro imagen");

            console.log(this.picture+"  888888888");
            alert(this.path);
        }else{
            var folder = fs.knownFolders.documents();
            this.path = fs.path.join(folder.path, "IFD1020NTST.jpg");
            const img = imageSource.fromFile(this.path);
            
            this.picture = this.path;
            console.log(this.path+"no encontro imagen");

            console.log(this.picture+"888888888");
            //this.getImage(product);
        }
        
    }

    //Plugin descarga de archivos grandes...
    public downloadProgress(url: string){
        var data: string;
        var filePath = fs.path.join(fs.knownFolders.documents().path, "Images.txt");
        var download = new DownloadProgress();
        download.addProgressCallback((progress)=>{
            console.log('Progress:', progress);
        })
        download.downloadFile(url,filePath).then((f)=>{
            console.log("Success", f.path);

        }).catch((e)=>{
            console.log("Error", e);
        })
    }

    public unzip(){
        const folder = fsuz.knownFolders.documents();

        let zipPath = fsuz.path.join(folder.path, "20MB.zip");
        let dest = fsuz.path.join(fs.knownFolders.documents().path, "/assets");
        console.log(zipPath+" Ubicacion en la que se busca para descomprimir..");
        Zip.unzipWithProgress(zipPath,dest,onZipProgress);
        
        function onZipProgress(percent: number) {
            console.log(`unzip progress: ${percent}`);
        }
    }


    //prueba de descarga por click
    public getImage(product: Product){
        var nameImage: any;
        var image: any;
                if(product.ImageFile != null || product.ImageFile != undefined){
                    console.log(`${SERVER.baseUrl}/Image/${product.ImageFile}`);
                    this.urlImage = require(`${SERVER.baseUrl}/Image/${product.ImageFile}`);
                    console.log(this.urlImage);
                    nameImage = product.ItemCodeDesc;
                    //contImage++;
            
                    //image = this._productService.getProductImage(this.urlImage, nameImage);

                    var filePath = fs.path.join(fs.knownFolders.documents().path, nameImage);
                    http.getFile(this.urlImage, filePath).then(function (r) {
                        //// Argument (r) is File!
                        this.picture = this.urlImage;
                        console.log(this.picture);
                    }, function (e) {
                        //// Argument (e) is Error!
                    });
                    
                    console.log("Se descargo imagen en la url___:" + this.urlImage);
                    console.log("La imagen quedo almacenada en la ruta___:"+this.picture);
                }else{
                    const folder = fs.knownFolders.documents();
                    var path = fs.path.join(folder.path, "IFD1020NTST.jpg");
                    const img = imageSource.fromFile(path);
            
                    this.picture = this.urlImage;
                }
                console.log("Termino la descarga");     
    }

    public showImage(product: Product){
        const folder = fs.knownFolders.documents();
        const path = fs.path.join(folder.path, product.ItemCode+".jpg");
        //const img = imageSource.fromFile(path);
        //this.picture = img;
        console.log(path+" Muestra de imagenes...");
    }

    
    public jsongeneration(productList: ObservableArray<Product>){
        var i=0;
        var arreglo = [];
        var miObjeto = Object();
        productList.slice().map(product => {
            if(product.ImageFile != null && i<=9){
                
                miObjeto.nombre = product.ItemCode;
                miObjeto.descripcion = product.ItemCodeDesc;
                arreglo.push(miObjeto);
                i++;
            }
        });
        /*console.log(arreglo.length);
        for(i=0;i<arreglo.length;i++){
            console.log(arreglo[i]+"   "+i);
        }*/

        var j = JSON.stringify(arreglo);
        console.log(j);
    }
 
    public getImagesCache(productList: ObservableArray<Product>){
        var i= 0;
        productList.map(product => {
            if(product.ImageFile != null){
                i++;
            }
        })

        var cache = new imageCacheModule.Cache();
        cache.placeholder = imageSource.fromFile(fs.path.join(__dirname, "res/no-image.png"));
        cache.maxRequests = i;

    }
 
    ///Metodo para descarga de imagenes todo en un json
    public listImage(productList: ObservableArray<Product>){
        var i=0, cont= 0, contColl=0;
        var colletions = 0;
        var residue = 0;
        var lenght = 0;
        var countDown = 0;
        
        var urlservice = "https://mss.int-furndirect.com:37080/api/Images.json?ItemCodes=" ;
        var parameters: string = "";
        productList.map(product => {
            if(product.ImageFile != null){        
                parameters = parameters+product.ItemCode+",";   
                
            }
        });
        console.log(parameters);
        
        //this.downloadProgress(urlservice+parameters);
        this.getJson(urlservice);
/*
        productList.map(product => {
            if(product.ImageFile != null){ 
                parameters = parameters+product.ItemCode+",";       
                if(cont == 100){
                    console.log(parameters);
                    countDown = lenght - cont;

                    this._productService.getImages(parameters)
                    .subscribe(result => {
                        //console.log(result);
                    }, (error) => {
                        alert(error);
                    }); 

                    parameters="";
                    cont=0;

                                
                }
                cont++;
                i++;       
            }
        });*/
      
        /*console.log(arreglo.length);
        for(i=0;i<arreglo.length;i++){
            console.log(arreglo[i]+"   "+i);
        }*/

        //var j = JSON.stringify(arreglo);
        //console.log(j);
    }
    /*
    public openJson(){
        var documents = fs.knownFolders.currentApp();
        var jsonFile = documents.getFile('shared/resources/sa.json');
        var array;
        var jsonData;


        jsonFile.readText()
        .then(function (content) {
            try {
                jsonData = JSON.parse(content);
                array = new observableArrayModule.ObservableArray(jsonData);
            } catch (err) {
                throw new Error('Could not parse JSON file');
            }
        }, function (error) {
            throw new Error('Could not read JSON file');
        });
    }*/


    public readJson(){
        var documents = fs.knownFolders.documents();
        var filePath = fs.path.join(documents.path, "Images.txt");
        var exists = fs.File.exists(filePath);
        if(exists){
            console.log(exists);

            var myFile = documents.getFile("Images.txt");
            myFile.readText()
            .then(function (content) {
                console.log(content);
            }, function (error) {
                // Failed to read from the file.
                console.log("Error...");
            });
            console.log(myFile.path);
        }
    }

    public getJson(url: string){
        http.getJSON(url).then(function (r) {
    //// Argument (r) is JSON!
            console.log(r);
        }, function (e) {
            //// Argument (e) is Error!
            //console.log(e);
        });
    }
}

