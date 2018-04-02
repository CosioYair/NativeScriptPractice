"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var item_service_1 = require("../../services/item.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var server_config_1 = require("../../config/server.config");
//import para descarga de imagenes http
var imageSource = require("tns-core-modules/image-source");
var fs = require("tns-core-modules/file-system");
var http = require("http");
//Download Progress
var nativescript_download_progress_1 = require("nativescript-download-progress");
//Unzip
var nativescript_zip_1 = require("nativescript-zip");
var fsuz = require("file-system");
//Image Cache
var imageCacheModule = require("tns-core-modules/ui/image-cache");
//Open local json
var ItemInquiryComponent = /** @class */ (function () {
    function ItemInquiryComponent(_couchbaseService, _productService) {
        this._couchbaseService = _couchbaseService;
        this._productService = _productService;
        this._docId = "product";
        this.productList = new observable_array_1.ObservableArray();
        this.data = {};
        this.selectedProduct = {};
        this.endGetImage = 80;
        //ngif
        this.isVisibleData = false;
        this.isVisibleScanner = true;
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
        };
        this.picture = "";
    }
    ItemInquiryComponent.prototype.ngOnInit = function () {
        this.setDocument();
    };
    ItemInquiryComponent.prototype.getProducts = function () {
        var _this = this;
        this._productService.getProducts()
            .subscribe(function (result) {
            _this.data[_this._docId] = result["Product"];
            _this._couchbaseService.createDocument(_this.data, _this._docId);
            _this._products = result["Product"];
            _this.productList = new observable_array_1.ObservableArray(_this._products);
        }, function (error) {
            alert(error);
        });
    };
    ItemInquiryComponent.prototype.setDocument = function () {
        var doc = this._couchbaseService.getDocument(this._docId);
        if (doc == null)
            this.getProducts();
        else {
            this._products = doc[this._docId];
            this.productList = new observable_array_1.ObservableArray(this._products);
        }
    };
    ItemInquiryComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        if (searchValue.length > 0) {
            this.productList = new observable_array_1.ObservableArray();
            this._products.map(function (product, index) {
                if (_this._products[index].ItemCode.toLowerCase().indexOf(searchValue) !== -1)
                    _this.productList.push(_this._products[index]);
            });
        }
    };
    ItemInquiryComponent.prototype.onClear = function (args) {
        var _this = this;
        var searchBar = args.object;
        searchBar.text = "";
        this.productList = new observable_array_1.ObservableArray();
        this._products.forEach(function (item) {
            _this.productList.push(item);
        });
    };
    ItemInquiryComponent.prototype.setSelectedProduct = function (product) {
        this.selectedProduct = product;
        //this.downloadImagesProducts(this.productList);
        //this.getImage(product);
        //this.picture = "";
        //this.showImageLocal(product);
        //this.picture = `${SERVER.baseUrl}/Image/${product.ItemCode}`;
        //this.showImage(product);
        if (this.isVisibleData == false) {
            this.isVisibleData = true;
            this.isVisibleScanner = false;
        }
    };
    ItemInquiryComponent.prototype.cancel = function () {
        this.isVisibleData = false;
        this.isVisibleScanner = true;
    };
    ItemInquiryComponent.prototype.description = function () {
        var description = this.selectedProduct.ExtendedDescriptionText;
        var dialogs = require("ui/dialogs");
        dialogs.alert({
            title: "Description",
            message: (description),
            okButtonText: "Accept"
        }).then(function () {
            console.log("Dialog closed!");
        });
    };
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ItemInquiryComponent.prototype.downloadImagesProducts = function (productList) {
        var _this = this;
        var l;
        var cont = 0;
        l = productList.length;
        var nameImage;
        var i = 0, k = 0;
        console.log("Largo del array__:" + l);
        productList.slice(0, 150).map(function (product) {
            if (product.ImageFile != null) {
                console.log(server_config_1.SERVER.baseUrl + "/Image/" + product.ImageFile);
                _this.urlImage = server_config_1.SERVER.baseUrl + "/Image/" + product.ItemCode;
                console.log(_this.urlImage);
                //contImage++;
                setTimeout(function () {
                    nameImage = product.ItemCodeDesc;
                    _this._productService.getProductImage(_this.urlImage, product.ItemCode);
                    //this.downloadProgress(this.urlImage);
                    console.log(k);
                    k++;
                }, cont);
                i++;
                if (i == 100) {
                    cont += 500;
                    i = 0;
                }
                console.log(k);
            }
            else {
                //console.log(product.ProductType + "____No tiene imagen___"+contWImage);
                //contWImage++;
            }
            cont += 200;
        });
        console.log("Termino la descarga");
    };
    ItemInquiryComponent.prototype.showImageLocal = function (product) {
        //codigo para obtener los path de la imagen seleccionada
        if (product.ImageFile != null && product.ImageFile != undefined) {
            //Busqueda en la imagen en la memoria local
            var folder = fs.knownFolders.documents();
            this.path = fs.path.join(folder.path, product.ItemCode + ".jpg");
            //const img = imageSource.fromFile(path);
            this.picture = this.path;
            console.log(this.path + "   encontro imagen");
            console.log(this.picture + "  888888888");
            alert(this.path);
        }
        else {
            var folder = fs.knownFolders.documents();
            this.path = fs.path.join(folder.path, "IFD1020NTST.jpg");
            var img = imageSource.fromFile(this.path);
            this.picture = this.path;
            console.log(this.path + "no encontro imagen");
            console.log(this.picture + "888888888");
            //this.getImage(product);
        }
    };
    //Plugin descarga de archivos grandes...
    ItemInquiryComponent.prototype.downloadProgress = function (url) {
        var data;
        var filePath = fs.path.join(fs.knownFolders.documents().path, "Images.txt");
        var download = new nativescript_download_progress_1.DownloadProgress();
        download.addProgressCallback(function (progress) {
            console.log('Progress:', progress);
        });
        download.downloadFile(url, filePath).then(function (f) {
            console.log("Success", f.path);
        }).catch(function (e) {
            console.log("Error", e);
        });
    };
    ItemInquiryComponent.prototype.unzip = function () {
        var folder = fsuz.knownFolders.documents();
        var zipPath = fsuz.path.join(folder.path, "20MB.zip");
        var dest = fsuz.path.join(fs.knownFolders.documents().path, "/assets");
        console.log(zipPath + " Ubicacion en la que se busca para descomprimir..");
        nativescript_zip_1.Zip.unzipWithProgress(zipPath, dest, onZipProgress);
        function onZipProgress(percent) {
            console.log("unzip progress: " + percent);
        }
    };
    //prueba de descarga por click
    ItemInquiryComponent.prototype.getImage = function (product) {
        var nameImage;
        var image;
        if (product.ImageFile != null || product.ImageFile != undefined) {
            console.log(server_config_1.SERVER.baseUrl + "/Image/" + product.ImageFile);
            this.urlImage = require(server_config_1.SERVER.baseUrl + "/Image/" + product.ImageFile);
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
            console.log("La imagen quedo almacenada en la ruta___:" + this.picture);
        }
        else {
            var folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, "IFD1020NTST.jpg");
            var img = imageSource.fromFile(path);
            this.picture = this.urlImage;
        }
        console.log("Termino la descarga");
    };
    ItemInquiryComponent.prototype.showImage = function (product) {
        var folder = fs.knownFolders.documents();
        var path = fs.path.join(folder.path, product.ItemCode + ".jpg");
        //const img = imageSource.fromFile(path);
        //this.picture = img;
        console.log(path + " Muestra de imagenes...");
    };
    ItemInquiryComponent.prototype.jsongeneration = function (productList) {
        var i = 0;
        var arreglo = [];
        var miObjeto = Object();
        productList.slice().map(function (product) {
            if (product.ImageFile != null && i <= 9) {
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
    };
    ItemInquiryComponent.prototype.getImagesCache = function (productList) {
        var i = 0;
        productList.map(function (product) {
            if (product.ImageFile != null) {
                i++;
            }
        });
        var cache = new imageCacheModule.Cache();
        cache.placeholder = imageSource.fromFile(fs.path.join(__dirname, "res/no-image.png"));
        cache.maxRequests = i;
    };
    ///Metodo para descarga de imagenes todo en un json
    ItemInquiryComponent.prototype.listImage = function (productList) {
        var i = 0, cont = 0, contColl = 0;
        var colletions = 0;
        var residue = 0;
        var lenght = 0;
        var countDown = 0;
        var urlservice = "https://mss.int-furndirect.com:37080/api/Images.json?ItemCodes=";
        var parameters = "";
        productList.map(function (product) {
            if (product.ImageFile != null) {
                parameters = parameters + product.ItemCode + ",";
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
    };
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
    ItemInquiryComponent.prototype.readJson = function () {
        var documents = fs.knownFolders.documents();
        var filePath = fs.path.join(documents.path, "Images.txt");
        var exists = fs.File.exists(filePath);
        if (exists) {
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
    };
    ItemInquiryComponent.prototype.getJson = function (url) {
        http.getJSON(url).then(function (r) {
            //// Argument (r) is JSON!
            console.log(r);
        }, function (e) {
            //// Argument (e) is Error!
            //console.log(e);
        });
    };
    ItemInquiryComponent = __decorate([
        core_1.Component({
            selector: "ns-itemInquiry",
            moduleId: module.id,
            templateUrl: "./itemInquiry.component.html",
            styleUrls: ["./itemInquiry.component.css"]
        }),
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, item_service_1.ProductService])
    ], ItemInquiryComponent);
    return ItemInquiryComponent;
}());
exports.ItemInquiryComponent = ItemInquiryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUF5RjtBQUN6Riw0REFBNkQ7QUFDN0Qsc0VBQW1FO0FBRW5FLDREQUFvRDtBQUVwRCx1Q0FBdUM7QUFFdkMsMkRBQTZEO0FBQzdELGlEQUFtRDtBQUNuRCwyQkFBNkI7QUFFN0IsbUJBQW1CO0FBQ25CLGlGQUFpRTtBQUNqRSxPQUFPO0FBQ1AscURBQXVDO0FBQ3ZDLGtDQUFvQztBQUNwQyxhQUFhO0FBQ2Isa0VBQW9FO0FBQ3BFLGlCQUFpQjtBQWNqQjtJQXFCSSw4QkFBb0IsaUJBQW1DLEVBQVUsZUFBK0I7UUFBNUUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQW5CeEYsV0FBTSxHQUFVLFNBQVMsQ0FBQztRQUMzQixnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Ysb0JBQWUsR0FBTyxFQUFFLENBQUM7UUFLekIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHeEIsTUFBTTtRQUNDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHFCQUFnQixHQUFXLElBQUksQ0FBQztRQU9uQyxJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ25CLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFVLEVBQUUsRUFBRTtZQUNkLE1BQU0sRUFBRSxFQUFFO1lBQ1YsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixpQkFBaUIsRUFBRSxFQUFFO1lBQ3JCLGVBQWUsRUFBRSxFQUFFO1lBQ25CLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVB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Q0FBQyxFQUFFLFVBQVUsQ0FBQztZQUNWLDJCQUEyQjtZQUMzQixpQkFBaUI7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBamFRLG9CQUFvQjtRQVJoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDO3lDQXdCeUMsb0NBQWdCLEVBQTJCLDZCQUFjO09BckJ2RixvQkFBb0IsQ0FrYWhDO0lBQUQsMkJBQUM7Q0FBQSxBQWxhRCxJQWthQztBQWxhWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pdGVtSW5xdWlyeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2V0dXBJdGVtVmlld0FyZ3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuXHJcbi8vaW1wb3J0IHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgaHR0cFxyXG5cclxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcclxuXHJcbi8vRG93bmxvYWQgUHJvZ3Jlc3NcclxuaW1wb3J0IHsgRG93bmxvYWRQcm9ncmVzcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZG93bmxvYWQtcHJvZ3Jlc3NcIlxyXG4vL1VuemlwXHJcbmltcG9ydCB7IFppcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtemlwXCI7XHJcbmltcG9ydCAqIGFzIGZzdXogZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbi8vSW1hZ2UgQ2FjaGVcclxuaW1wb3J0ICogYXMgaW1hZ2VDYWNoZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZS1jYWNoZVwiO1xyXG4vL09wZW4gbG9jYWwganNvblxyXG5cclxuXHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbUlucXVpcnlcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1JbnF1aXJ5LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtSW5xdWlyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIHByaXZhdGUgX3Byb2R1Y3RzOmFueTtcclxuICAgIHByaXZhdGUgX2RvY0lkOnN0cmluZyA9IFwicHJvZHVjdFwiO1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICBwdWJsaWMgZGF0YSA9IHt9O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDphbnkgPSB7fTtcclxuICAgIC8vb2J0ZW5jaW9uIGRlIGltYWdlblxyXG4gICAgcHVibGljIHBpY3R1cmU6YW55O1xyXG4gICAgcHVibGljIHVybEltYWdlOiBhbnk7XHJcbiAgICBwdWJsaWMgc3RhcnRHZXRJbWFnZTogMDtcclxuICAgIHB1YmxpYyBlbmRHZXRJbWFnZSA9IDgwO1xyXG4gICAgcHVibGljIHBhdGg6IGFueTtcclxuXHJcbiAgICAvL25naWZcclxuICAgIHB1YmxpYyBpc1Zpc2libGVEYXRhOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNWaXNpYmxlU2Nhbm5lcjogYm9vbGVhbiA9dHJ1ZTtcclxuICAgIFxyXG4gIFxyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLCBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2Upe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0ge1xyXG4gICAgICAgICAgICBJdGVtQ29kZTogXCJcIixcclxuICAgICAgICAgICAgSXRlbUNvZGVEZXNjOiBcIlwiLFxyXG4gICAgICAgICAgICBJbmFjdGl2ZUl0ZW06IFwiXCIsXHJcbiAgICAgICAgICAgIEl0ZW1UeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBTaGlwV2VpZ2h0OiBcIlwiLFxyXG4gICAgICAgICAgICBWb2x1bWU6IFwiXCIsXHJcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdENvc3Q6IFwiXCIsXHJcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdFByaWNlOiBcIlwiLFxyXG4gICAgICAgICAgICBQcmltYXJ5VmVuZG9yTm86IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5MTogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnkyOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTM6IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5NDogXCJcIixcclxuICAgICAgICAgICAgUHJvZHVjdExpbmU6IFwiXCIsXHJcbiAgICAgICAgICAgIFByb2R1Y3RUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBFeHRlbmRlZERlc2NyaXB0aW9uVGV4dDogXCJcIixcclxuICAgICAgICAgICAgSW1hZ2VGaWxlOiBcIlwiLFxyXG4gICAgICAgICAgICBMYXN0U29sZERhdGU6IFwiXCIsXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcclxuICAgICAgICAgICAgVGltZVVwZGF0ZWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFRpbWVDcmVhdGVkOiBcIlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBpY3R1cmUgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJvZHVjdHMoKXtcclxuICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0cygpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5fZG9jSWRdID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLmRhdGEsIHRoaXMuX2RvY0lkKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSByZXN1bHRbXCJQcm9kdWN0XCJdO1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcblxyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREb2N1bWVudCgpe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KHRoaXMuX2RvY0lkKTtcclxuICAgICAgICBpZihkb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5nZXRQcm9kdWN0cygpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IGRvY1t0aGlzLl9kb2NJZF07XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cy5tYXAoIChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZFByb2R1Y3QocHJvZHVjdDpQcm9kdWN0KXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgLy90aGlzLmRvd25sb2FkSW1hZ2VzUHJvZHVjdHModGhpcy5wcm9kdWN0TGlzdCk7XHJcbiAgICAgICAgLy90aGlzLmdldEltYWdlKHByb2R1Y3QpO1xyXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuc2hvd0ltYWdlTG9jYWwocHJvZHVjdCk7XHJcbiAgICAgICAgLy90aGlzLnBpY3R1cmUgPSBgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0Lkl0ZW1Db2RlfWA7XHJcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZShwcm9kdWN0KTtcclxuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGVEYXRhID09IGZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGVEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGVTY2FubmVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5jZWwoKXtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZURhdGEgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZVNjYW5uZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHZhciBkZXNjcmlwdGlvbjogc3RyaW5nID0gdGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQ7XHJcbiAgICAgICAgdmFyIGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRGVzY3JpcHRpb25cIixcclxuICAgICAgICAgICAgbWVzc2FnZTogKGRlc2NyaXB0aW9uKSxcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkFjY2VwdFwiXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIGNsb3NlZCFcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIHB1YmxpYyBkb3dubG9hZEltYWdlc1Byb2R1Y3RzKHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4pe1xyXG4gICAgICAgIHZhciBsOiBhbnk7XHJcbiAgICAgICAgdmFyIGNvbnQgPSAwO1xyXG4gICAgICAgIGwgPSBwcm9kdWN0TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdmFyIG5hbWVJbWFnZTogYW55O1xyXG4gICAgICAgIHZhciBpID0gMCwgayA9IDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXJnbyBkZWwgYXJyYXlfXzpcIitsKTtcclxuICAgICAgICAgICAgcHJvZHVjdExpc3Quc2xpY2UoMCwxNTApLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke3Byb2R1Y3QuSW1hZ2VGaWxlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXJsSW1hZ2UgPSBgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0Lkl0ZW1Db2RlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51cmxJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250SW1hZ2UrKztcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZUltYWdlID0gcHJvZHVjdC5JdGVtQ29kZURlc2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RJbWFnZSh0aGlzLnVybEltYWdlLHByb2R1Y3QuSXRlbUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZG93bmxvYWRQcm9ncmVzcyh0aGlzLnVybEltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGsrKztcclxuICAgICAgICAgICAgICAgICAgICB9LCBjb250KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaT09MTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udCArPSA1MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocHJvZHVjdC5Qcm9kdWN0VHlwZSArIFwiX19fX05vIHRpZW5lIGltYWdlbl9fX1wiK2NvbnRXSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29udFdJbWFnZSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udCArPSAyMDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGVybWlubyBsYSBkZXNjYXJnYVwiKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ltYWdlTG9jYWwocHJvZHVjdDogUHJvZHVjdCl7XHJcbiAgICAgICAgLy9jb2RpZ28gcGFyYSBvYnRlbmVyIGxvcyBwYXRoIGRlIGxhIGltYWdlbiBzZWxlY2Npb25hZGFcclxuICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsICYmIHByb2R1Y3QuSW1hZ2VGaWxlICE9IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgICAgICAvL0J1c3F1ZWRhIGVuIGxhIGltYWdlbiBlbiBsYSBtZW1vcmlhIGxvY2FsXHJcbiAgICAgICAgICAgIHZhciBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgcHJvZHVjdC5JdGVtQ29kZStcIi5qcGdcIik7XHJcbiAgICAgICAgICAgIC8vY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUocGF0aCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5waWN0dXJlID0gdGhpcy5wYXRoO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhdGgrXCIgICBlbmNvbnRybyBpbWFnZW5cIik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBpY3R1cmUrXCIgIDg4ODg4ODg4OFwiKTtcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5wYXRoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmFyIGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBcIklGRDEwMjBOVFNULmpwZ1wiKTtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUodGhpcy5wYXRoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGljdHVyZSA9IHRoaXMucGF0aDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wYXRoK1wibm8gZW5jb250cm8gaW1hZ2VuXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5waWN0dXJlK1wiODg4ODg4ODg4XCIpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZ2V0SW1hZ2UocHJvZHVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vUGx1Z2luIGRlc2NhcmdhIGRlIGFyY2hpdm9zIGdyYW5kZXMuLi5cclxuICAgIHB1YmxpYyBkb3dubG9hZFByb2dyZXNzKHVybDogc3RyaW5nKXtcclxuICAgICAgICB2YXIgZGF0YTogc3RyaW5nO1xyXG4gICAgICAgIHZhciBmaWxlUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkucGF0aCwgXCJJbWFnZXMudHh0XCIpO1xyXG4gICAgICAgIHZhciBkb3dubG9hZCA9IG5ldyBEb3dubG9hZFByb2dyZXNzKCk7XHJcbiAgICAgICAgZG93bmxvYWQuYWRkUHJvZ3Jlc3NDYWxsYmFjaygocHJvZ3Jlc3MpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQcm9ncmVzczonLCBwcm9ncmVzcyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBkb3dubG9hZC5kb3dubG9hZEZpbGUodXJsLGZpbGVQYXRoKS50aGVuKChmKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIiwgZi5wYXRoKTtcclxuXHJcbiAgICAgICAgfSkuY2F0Y2goKGUpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW56aXAoKXtcclxuICAgICAgICBjb25zdCBmb2xkZXIgPSBmc3V6Lmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuXHJcbiAgICAgICAgbGV0IHppcFBhdGggPSBmc3V6LnBhdGguam9pbihmb2xkZXIucGF0aCwgXCIyME1CLnppcFwiKTtcclxuICAgICAgICBsZXQgZGVzdCA9IGZzdXoucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKS5wYXRoLCBcIi9hc3NldHNcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coemlwUGF0aCtcIiBVYmljYWNpb24gZW4gbGEgcXVlIHNlIGJ1c2NhIHBhcmEgZGVzY29tcHJpbWlyLi5cIik7XHJcbiAgICAgICAgWmlwLnVuemlwV2l0aFByb2dyZXNzKHppcFBhdGgsZGVzdCxvblppcFByb2dyZXNzKTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBvblppcFByb2dyZXNzKHBlcmNlbnQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgdW56aXAgcHJvZ3Jlc3M6ICR7cGVyY2VudH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vcHJ1ZWJhIGRlIGRlc2NhcmdhIHBvciBjbGlja1xyXG4gICAgcHVibGljIGdldEltYWdlKHByb2R1Y3Q6IFByb2R1Y3Qpe1xyXG4gICAgICAgIHZhciBuYW1lSW1hZ2U6IGFueTtcclxuICAgICAgICB2YXIgaW1hZ2U6IGFueTtcclxuICAgICAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwgfHwgcHJvZHVjdC5JbWFnZUZpbGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0LkltYWdlRmlsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVybEltYWdlID0gcmVxdWlyZShgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0LkltYWdlRmlsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybEltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lSW1hZ2UgPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRJbWFnZSsrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2ltYWdlID0gdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdEltYWdlKHRoaXMudXJsSW1hZ2UsIG5hbWVJbWFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxlUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkucGF0aCwgbmFtZUltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBodHRwLmdldEZpbGUodGhpcy51cmxJbWFnZSwgZmlsZVBhdGgpLnRoZW4oZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAocikgaXMgRmlsZSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWN0dXJlID0gdGhpcy51cmxJbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5waWN0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChlKSBpcyBFcnJvciFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlIGRlc2NhcmdvIGltYWdlbiBlbiBsYSB1cmxfX186XCIgKyB0aGlzLnVybEltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxhIGltYWdlbiBxdWVkbyBhbG1hY2VuYWRhIGVuIGxhIHJ1dGFfX186XCIrdGhpcy5waWN0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgXCJJRkQxMDIwTlRTVC5qcGdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUocGF0aCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGljdHVyZSA9IHRoaXMudXJsSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRlcm1pbm8gbGEgZGVzY2FyZ2FcIik7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ltYWdlKHByb2R1Y3Q6IFByb2R1Y3Qpe1xyXG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICBjb25zdCBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBwcm9kdWN0Lkl0ZW1Db2RlK1wiLmpwZ1wiKTtcclxuICAgICAgICAvL2NvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gaW1nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhdGgrXCIgTXVlc3RyYSBkZSBpbWFnZW5lcy4uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBqc29uZ2VuZXJhdGlvbihwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KXtcclxuICAgICAgICB2YXIgaT0wO1xyXG4gICAgICAgIHZhciBhcnJlZ2xvID0gW107XHJcbiAgICAgICAgdmFyIG1pT2JqZXRvID0gT2JqZWN0KCk7XHJcbiAgICAgICAgcHJvZHVjdExpc3Quc2xpY2UoKS5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwgJiYgaTw9OSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG1pT2JqZXRvLm5vbWJyZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgICAgICAgICBtaU9iamV0by5kZXNjcmlwY2lvbiA9IHByb2R1Y3QuSXRlbUNvZGVEZXNjO1xyXG4gICAgICAgICAgICAgICAgYXJyZWdsby5wdXNoKG1pT2JqZXRvKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qY29uc29sZS5sb2coYXJyZWdsby5sZW5ndGgpO1xyXG4gICAgICAgIGZvcihpPTA7aTxhcnJlZ2xvLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJlZ2xvW2ldK1wiICAgXCIraSk7XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIHZhciBqID0gSlNPTi5zdHJpbmdpZnkoYXJyZWdsbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaik7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBnZXRJbWFnZXNDYWNoZShwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KXtcclxuICAgICAgICB2YXIgaT0gMDtcclxuICAgICAgICBwcm9kdWN0TGlzdC5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdmFyIGNhY2hlID0gbmV3IGltYWdlQ2FjaGVNb2R1bGUuQ2FjaGUoKTtcclxuICAgICAgICBjYWNoZS5wbGFjZWhvbGRlciA9IGltYWdlU291cmNlLmZyb21GaWxlKGZzLnBhdGguam9pbihfX2Rpcm5hbWUsIFwicmVzL25vLWltYWdlLnBuZ1wiKSk7XHJcbiAgICAgICAgY2FjaGUubWF4UmVxdWVzdHMgPSBpO1xyXG5cclxuICAgIH1cclxuIFxyXG4gICAgLy8vTWV0b2RvIHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgdG9kbyBlbiB1biBqc29uXHJcbiAgICBwdWJsaWMgbGlzdEltYWdlKHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4pe1xyXG4gICAgICAgIHZhciBpPTAsIGNvbnQ9IDAsIGNvbnRDb2xsPTA7XHJcbiAgICAgICAgdmFyIGNvbGxldGlvbnMgPSAwO1xyXG4gICAgICAgIHZhciByZXNpZHVlID0gMDtcclxuICAgICAgICB2YXIgbGVuZ2h0ID0gMDtcclxuICAgICAgICB2YXIgY291bnREb3duID0gMDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdXJsc2VydmljZSA9IFwiaHR0cHM6Ly9tc3MuaW50LWZ1cm5kaXJlY3QuY29tOjM3MDgwL2FwaS9JbWFnZXMuanNvbj9JdGVtQ29kZXM9XCIgO1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHByb2R1Y3RMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCl7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzK3Byb2R1Y3QuSXRlbUNvZGUrXCIsXCI7ICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5kb3dubG9hZFByb2dyZXNzKHVybHNlcnZpY2UrcGFyYW1ldGVycyk7XHJcbiAgICAgICAgdGhpcy5nZXRKc29uKHVybHNlcnZpY2UpO1xyXG4vKlxyXG4gICAgICAgIHByb2R1Y3RMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCl7IFxyXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMrcHJvZHVjdC5JdGVtQ29kZStcIixcIjsgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihjb250ID09IDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnREb3duID0gbGVuZ2h0IC0gY29udDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0SW1hZ2VzKHBhcmFtZXRlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb250PTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udCsrO1xyXG4gICAgICAgICAgICAgICAgaSsrOyAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyovXHJcbiAgICAgIFxyXG4gICAgICAgIC8qY29uc29sZS5sb2coYXJyZWdsby5sZW5ndGgpO1xyXG4gICAgICAgIGZvcihpPTA7aTxhcnJlZ2xvLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJlZ2xvW2ldK1wiICAgXCIraSk7XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIC8vdmFyIGogPSBKU09OLnN0cmluZ2lmeShhcnJlZ2xvKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGopO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIHB1YmxpYyBvcGVuSnNvbigpe1xyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpO1xyXG4gICAgICAgIHZhciBqc29uRmlsZSA9IGRvY3VtZW50cy5nZXRGaWxlKCdzaGFyZWQvcmVzb3VyY2VzL3NhLmpzb24nKTtcclxuICAgICAgICB2YXIgYXJyYXk7XHJcbiAgICAgICAgdmFyIGpzb25EYXRhO1xyXG5cclxuXHJcbiAgICAgICAganNvbkZpbGUucmVhZFRleHQoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YSA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBhcnJheSA9IG5ldyBvYnNlcnZhYmxlQXJyYXlNb2R1bGUuT2JzZXJ2YWJsZUFycmF5KGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBKU09OIGZpbGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCByZWFkIEpTT04gZmlsZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSovXHJcblxyXG5cclxuICAgIHB1YmxpYyByZWFkSnNvbigpe1xyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoID0gZnMucGF0aC5qb2luKGRvY3VtZW50cy5wYXRoLCBcIkltYWdlcy50eHRcIik7XHJcbiAgICAgICAgdmFyIGV4aXN0cyA9IGZzLkZpbGUuZXhpc3RzKGZpbGVQYXRoKTtcclxuICAgICAgICBpZihleGlzdHMpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleGlzdHMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG15RmlsZSA9IGRvY3VtZW50cy5nZXRGaWxlKFwiSW1hZ2VzLnR4dFwiKTtcclxuICAgICAgICAgICAgbXlGaWxlLnJlYWRUZXh0KClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZhaWxlZCB0byByZWFkIGZyb20gdGhlIGZpbGUuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yLi4uXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobXlGaWxlLnBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SnNvbih1cmw6IHN0cmluZyl7XHJcbiAgICAgICAgaHR0cC5nZXRKU09OKHVybCkudGhlbihmdW5jdGlvbiAocikge1xyXG4gICAgLy8vLyBBcmd1bWVudCAocikgaXMgSlNPTiFcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocik7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAoZSkgaXMgRXJyb3IhXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==