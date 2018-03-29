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
var ItemInquiryComponent = /** @class */ (function () {
    function ItemInquiryComponent(_couchbaseService, _productService) {
        this._couchbaseService = _couchbaseService;
        this._productService = _productService;
        this._docId = "product";
        this.productList = new observable_array_1.ObservableArray();
        this.data = {};
        this.selectedProduct = {};
        this.endGetImage = 80;
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
                if (_this._products[index].ItemCodeDesc.toLowerCase().indexOf(searchValue) !== -1)
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
    };
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
        var download = new nativescript_download_progress_1.DownloadProgress();
        download.addProgressCallback(function (progress) {
            console.log('Progress:', progress);
        });
        download.downloadFile(url).then(function (f) {
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
                //console.log(parameters);
            }
        });
        this.downloadProgress(urlservice + parameters);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUF5RjtBQUN6Riw0REFBNkQ7QUFDN0Qsc0VBQW1FO0FBRW5FLDREQUFvRDtBQUVwRCx1Q0FBdUM7QUFFdkMsMkRBQTZEO0FBQzdELGlEQUFtRDtBQUNuRCwyQkFBNkI7QUFFN0IsbUJBQW1CO0FBQ25CLGlGQUFpRTtBQUNqRSxPQUFPO0FBQ1AscURBQXVDO0FBQ3ZDLGtDQUFvQztBQUNwQyxhQUFhO0FBQ2Isa0VBQW9FO0FBYXBFO0lBZ0JJLDhCQUFvQixpQkFBbUMsRUFBVSxlQUErQjtRQUE1RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBZHhGLFdBQU0sR0FBVSxTQUFTLENBQUM7UUFDM0IsZ0JBQVcsR0FBNkIsSUFBSSxrQ0FBZSxFQUFXLENBQUM7UUFDdkUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLG9CQUFlLEdBQU8sRUFBRSxDQUFDO1FBS3pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBT3BCLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixZQUFZLEVBQUUsRUFBRTtZQUNoQixZQUFZLEVBQUUsRUFBRTtZQUNoQixRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxFQUFFO1lBQ2QsTUFBTSxFQUFFLEVBQUU7WUFDVixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLGlCQUFpQixFQUFFLEVBQUU7WUFDckIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxF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QzlCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQXVCYTtRQUVMOzs7V0FHRztRQUVILGtDQUFrQztRQUNsQyxpQkFBaUI7SUFDckIsQ0FBQztJQTdVUSxvQkFBb0I7UUFSaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FtQnlDLG9DQUFnQixFQUEyQiw2QkFBYztPQWhCdkYsb0JBQW9CLENBOFVoQztJQUFELDJCQUFDO0NBQUEsQUE5VUQsSUE4VUM7QUE5VVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaXRlbUlucXVpcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhcn0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNldHVwSXRlbVZpZXdBcmdzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXNcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcblxyXG4vL2ltcG9ydCBwYXJhIGRlc2NhcmdhIGRlIGltYWdlbmVzIGh0dHBcclxuXHJcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XHJcblxyXG4vL0Rvd25sb2FkIFByb2dyZXNzXHJcbmltcG9ydCB7IERvd25sb2FkUHJvZ3Jlc3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRvd25sb2FkLXByb2dyZXNzXCJcclxuLy9VbnppcFxyXG5pbXBvcnQgeyBaaXAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXppcFwiO1xyXG5pbXBvcnQgKiBhcyBmc3V6IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG4vL0ltYWdlIENhY2hlXHJcbmltcG9ydCAqIGFzIGltYWdlQ2FjaGVNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2UtY2FjaGVcIjtcclxuXHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbUlucXVpcnlcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1JbnF1aXJ5LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtSW5xdWlyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIHByaXZhdGUgX3Byb2R1Y3RzOmFueTtcclxuICAgIHByaXZhdGUgX2RvY0lkOnN0cmluZyA9IFwicHJvZHVjdFwiO1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICBwdWJsaWMgZGF0YSA9IHt9O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDphbnkgPSB7fTtcclxuICAgIC8vb2J0ZW5jaW9uIGRlIGltYWdlblxyXG4gICAgcHVibGljIHBpY3R1cmU6YW55O1xyXG4gICAgcHVibGljIHVybEltYWdlOiBhbnk7XHJcbiAgICBwdWJsaWMgc3RhcnRHZXRJbWFnZTogMDtcclxuICAgIHB1YmxpYyBlbmRHZXRJbWFnZSA9IDgwO1xyXG4gICAgcHVibGljIHBhdGg6IGFueTtcclxuICBcclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSwgcHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHtcclxuICAgICAgICAgICAgSXRlbUNvZGU6IFwiXCIsXHJcbiAgICAgICAgICAgIEl0ZW1Db2RlRGVzYzogXCJcIixcclxuICAgICAgICAgICAgSW5hY3RpdmVJdGVtOiBcIlwiLFxyXG4gICAgICAgICAgICBJdGVtVHlwZTogXCJcIixcclxuICAgICAgICAgICAgU2hpcFdlaWdodDogXCJcIixcclxuICAgICAgICAgICAgVm9sdW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBTdGFuZGFyZFVuaXRDb3N0OiBcIlwiLFxyXG4gICAgICAgICAgICBTdGFuZGFyZFVuaXRQcmljZTogXCJcIixcclxuICAgICAgICAgICAgUHJpbWFyeVZlbmRvck5vOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTE6IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5MjogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnkzOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFByb2R1Y3RMaW5lOiBcIlwiLFxyXG4gICAgICAgICAgICBQcm9kdWN0VHlwZTogXCJcIixcclxuICAgICAgICAgICAgRXh0ZW5kZWREZXNjcmlwdGlvblRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIEltYWdlRmlsZTogXCJcIixcclxuICAgICAgICAgICAgTGFzdFNvbGREYXRlOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogXCJcIixcclxuICAgICAgICAgICAgRGF0ZVVwZGF0ZWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFRpbWVVcGRhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBUaW1lQ3JlYXRlZDogXCJcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5waWN0dXJlID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldERvY3VtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2R1Y3RzKCl7XHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdHMoKVxyXG4gICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuX2RvY0lkXSA9IHJlc3VsdFtcIlByb2R1Y3RcIl07XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5kYXRhLCB0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG5cclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudCh0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgaWYoZG9jID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBkb2NbdGhpcy5fZG9jSWRdO1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBpZihzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKCAocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9kdWN0c1tpbmRleF0uSXRlbUNvZGVEZXNjLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaCh0aGlzLl9wcm9kdWN0c1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICB0aGlzLl9wcm9kdWN0cy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkUHJvZHVjdChwcm9kdWN0OlByb2R1Y3Qpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAvL3RoaXMuZG93bmxvYWRJbWFnZXNQcm9kdWN0cyh0aGlzLnByb2R1Y3RMaXN0KTtcclxuICAgICAgICAvL3RoaXMuZ2V0SW1hZ2UocHJvZHVjdCk7XHJcbiAgICAgICAgLy90aGlzLnBpY3R1cmUgPSBcIlwiO1xyXG4gICAgICAgIC8vdGhpcy5zaG93SW1hZ2VMb2NhbChwcm9kdWN0KTtcclxuICAgICAgICAvL3RoaXMucGljdHVyZSA9IGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke3Byb2R1Y3QuSXRlbUNvZGV9YDtcclxuICAgICAgICAvL3RoaXMuc2hvd0ltYWdlKHByb2R1Y3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb3dubG9hZEltYWdlc1Byb2R1Y3RzKHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4pe1xyXG4gICAgICAgIHZhciBsOiBhbnk7XHJcbiAgICAgICAgdmFyIGNvbnQgPSAwO1xyXG4gICAgICAgIGwgPSBwcm9kdWN0TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdmFyIG5hbWVJbWFnZTogYW55O1xyXG4gICAgICAgIHZhciBpID0gMCwgayA9IDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXJnbyBkZWwgYXJyYXlfXzpcIitsKTtcclxuICAgICAgICAgICAgcHJvZHVjdExpc3Quc2xpY2UoMCwxNTApLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke3Byb2R1Y3QuSW1hZ2VGaWxlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXJsSW1hZ2UgPSBgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0Lkl0ZW1Db2RlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51cmxJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250SW1hZ2UrKztcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZUltYWdlID0gcHJvZHVjdC5JdGVtQ29kZURlc2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RJbWFnZSh0aGlzLnVybEltYWdlLHByb2R1Y3QuSXRlbUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZG93bmxvYWRQcm9ncmVzcyh0aGlzLnVybEltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGsrKztcclxuICAgICAgICAgICAgICAgICAgICB9LCBjb250KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaT09MTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udCArPSA1MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocHJvZHVjdC5Qcm9kdWN0VHlwZSArIFwiX19fX05vIHRpZW5lIGltYWdlbl9fX1wiK2NvbnRXSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29udFdJbWFnZSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udCArPSAyMDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGVybWlubyBsYSBkZXNjYXJnYVwiKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ltYWdlTG9jYWwocHJvZHVjdDogUHJvZHVjdCl7XHJcbiAgICAgICAgLy9jb2RpZ28gcGFyYSBvYnRlbmVyIGxvcyBwYXRoIGRlIGxhIGltYWdlbiBzZWxlY2Npb25hZGFcclxuICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsICYmIHByb2R1Y3QuSW1hZ2VGaWxlICE9IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgICAgICAvL0J1c3F1ZWRhIGVuIGxhIGltYWdlbiBlbiBsYSBtZW1vcmlhIGxvY2FsXHJcbiAgICAgICAgICAgIHZhciBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgcHJvZHVjdC5JdGVtQ29kZStcIi5qcGdcIik7XHJcbiAgICAgICAgICAgIC8vY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUocGF0aCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5waWN0dXJlID0gdGhpcy5wYXRoO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhdGgrXCIgICBlbmNvbnRybyBpbWFnZW5cIik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBpY3R1cmUrXCIgIDg4ODg4ODg4OFwiKTtcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5wYXRoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmFyIGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBcIklGRDEwMjBOVFNULmpwZ1wiKTtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUodGhpcy5wYXRoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGljdHVyZSA9IHRoaXMucGF0aDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wYXRoK1wibm8gZW5jb250cm8gaW1hZ2VuXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5waWN0dXJlK1wiODg4ODg4ODg4XCIpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZ2V0SW1hZ2UocHJvZHVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vUGx1Z2luIGRlc2NhcmdhIGRlIGFyY2hpdm9zIGdyYW5kZXMuLi5cclxuICAgIHB1YmxpYyBkb3dubG9hZFByb2dyZXNzKHVybDogc3RyaW5nKXtcclxuICAgICAgICB2YXIgZG93bmxvYWQgPSBuZXcgRG93bmxvYWRQcm9ncmVzcygpO1xyXG4gICAgICAgIGRvd25sb2FkLmFkZFByb2dyZXNzQ2FsbGJhY2soKHByb2dyZXNzKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHJvZ3Jlc3M6JywgcHJvZ3Jlc3MpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZG93bmxvYWQuZG93bmxvYWRGaWxlKHVybCkudGhlbigoZik9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzXCIsIGYucGF0aCk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGUpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW56aXAoKXtcclxuICAgICAgICBjb25zdCBmb2xkZXIgPSBmc3V6Lmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuXHJcbiAgICAgICAgbGV0IHppcFBhdGggPSBmc3V6LnBhdGguam9pbihmb2xkZXIucGF0aCwgXCIyME1CLnppcFwiKTtcclxuICAgICAgICBsZXQgZGVzdCA9IGZzdXoucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKS5wYXRoLCBcIi9hc3NldHNcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coemlwUGF0aCtcIiBVYmljYWNpb24gZW4gbGEgcXVlIHNlIGJ1c2NhIHBhcmEgZGVzY29tcHJpbWlyLi5cIik7XHJcbiAgICAgICAgWmlwLnVuemlwV2l0aFByb2dyZXNzKHppcFBhdGgsZGVzdCxvblppcFByb2dyZXNzKTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBvblppcFByb2dyZXNzKHBlcmNlbnQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgdW56aXAgcHJvZ3Jlc3M6ICR7cGVyY2VudH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vcHJ1ZWJhIGRlIGRlc2NhcmdhIHBvciBjbGlja1xyXG4gICAgcHVibGljIGdldEltYWdlKHByb2R1Y3Q6IFByb2R1Y3Qpe1xyXG4gICAgICAgIHZhciBuYW1lSW1hZ2U6IGFueTtcclxuICAgICAgICB2YXIgaW1hZ2U6IGFueTtcclxuICAgICAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwgfHwgcHJvZHVjdC5JbWFnZUZpbGUgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0LkltYWdlRmlsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVybEltYWdlID0gcmVxdWlyZShgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0LkltYWdlRmlsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybEltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lSW1hZ2UgPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRJbWFnZSsrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2ltYWdlID0gdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdEltYWdlKHRoaXMudXJsSW1hZ2UsIG5hbWVJbWFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxlUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkucGF0aCwgbmFtZUltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBodHRwLmdldEZpbGUodGhpcy51cmxJbWFnZSwgZmlsZVBhdGgpLnRoZW4oZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAocikgaXMgRmlsZSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWN0dXJlID0gdGhpcy51cmxJbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5waWN0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChlKSBpcyBFcnJvciFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlIGRlc2NhcmdvIGltYWdlbiBlbiBsYSB1cmxfX186XCIgKyB0aGlzLnVybEltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxhIGltYWdlbiBxdWVkbyBhbG1hY2VuYWRhIGVuIGxhIHJ1dGFfX186XCIrdGhpcy5waWN0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgXCJJRkQxMDIwTlRTVC5qcGdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUocGF0aCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGljdHVyZSA9IHRoaXMudXJsSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRlcm1pbm8gbGEgZGVzY2FyZ2FcIik7ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0ltYWdlKHByb2R1Y3Q6IFByb2R1Y3Qpe1xyXG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICBjb25zdCBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBwcm9kdWN0Lkl0ZW1Db2RlK1wiLmpwZ1wiKTtcclxuICAgICAgICAvL2NvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gaW1nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhdGgrXCIgTXVlc3RyYSBkZSBpbWFnZW5lcy4uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBqc29uZ2VuZXJhdGlvbihwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KXtcclxuICAgICAgICB2YXIgaT0wO1xyXG4gICAgICAgIHZhciBhcnJlZ2xvID0gW107XHJcbiAgICAgICAgdmFyIG1pT2JqZXRvID0gT2JqZWN0KCk7XHJcbiAgICAgICAgcHJvZHVjdExpc3Quc2xpY2UoKS5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwgJiYgaTw9OSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG1pT2JqZXRvLm5vbWJyZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgICAgICAgICBtaU9iamV0by5kZXNjcmlwY2lvbiA9IHByb2R1Y3QuSXRlbUNvZGVEZXNjO1xyXG4gICAgICAgICAgICAgICAgYXJyZWdsby5wdXNoKG1pT2JqZXRvKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qY29uc29sZS5sb2coYXJyZWdsby5sZW5ndGgpO1xyXG4gICAgICAgIGZvcihpPTA7aTxhcnJlZ2xvLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJlZ2xvW2ldK1wiICAgXCIraSk7XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIHZhciBqID0gSlNPTi5zdHJpbmdpZnkoYXJyZWdsbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaik7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBnZXRJbWFnZXNDYWNoZShwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KXtcclxuICAgICAgICB2YXIgaT0gMDtcclxuICAgICAgICBwcm9kdWN0TGlzdC5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdmFyIGNhY2hlID0gbmV3IGltYWdlQ2FjaGVNb2R1bGUuQ2FjaGUoKTtcclxuICAgICAgICBjYWNoZS5wbGFjZWhvbGRlciA9IGltYWdlU291cmNlLmZyb21GaWxlKGZzLnBhdGguam9pbihfX2Rpcm5hbWUsIFwicmVzL25vLWltYWdlLnBuZ1wiKSk7XHJcbiAgICAgICAgY2FjaGUubWF4UmVxdWVzdHMgPSBpO1xyXG5cclxuICAgIH1cclxuIFxyXG4gICAgLy8vTWV0b2RvIHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgdG9kbyBlbiB1biBqc29uXHJcbiAgICBwdWJsaWMgbGlzdEltYWdlKHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4pe1xyXG4gICAgICAgIHZhciBpPTAsIGNvbnQ9IDAsIGNvbnRDb2xsPTA7XHJcbiAgICAgICAgdmFyIGNvbGxldGlvbnMgPSAwO1xyXG4gICAgICAgIHZhciByZXNpZHVlID0gMDtcclxuICAgICAgICB2YXIgbGVuZ2h0ID0gMDtcclxuICAgICAgICB2YXIgY291bnREb3duID0gMDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdXJsc2VydmljZSA9IFwiaHR0cHM6Ly9tc3MuaW50LWZ1cm5kaXJlY3QuY29tOjM3MDgwL2FwaS9JbWFnZXMuanNvbj9JdGVtQ29kZXM9XCIgO1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHByb2R1Y3RMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCl7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzK3Byb2R1Y3QuSXRlbUNvZGUrXCIsXCI7ICAgXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5kb3dubG9hZFByb2dyZXNzKHVybHNlcnZpY2UrcGFyYW1ldGVycyk7XHJcbi8qXHJcbiAgICAgICAgcHJvZHVjdExpc3QubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsKXsgXHJcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycytwcm9kdWN0Lkl0ZW1Db2RlK1wiLFwiOyAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGNvbnQgPT0gMTAwKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudERvd24gPSBsZW5naHQgLSBjb250O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRJbWFnZXMocGFyYW1ldGVycylcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnQ9MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250Kys7XHJcbiAgICAgICAgICAgICAgICBpKys7ICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7Ki9cclxuICAgICAgXHJcbiAgICAgICAgLypjb25zb2xlLmxvZyhhcnJlZ2xvLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKGk9MDtpPGFycmVnbG8ubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycmVnbG9baV0rXCIgICBcIitpKTtcclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgLy92YXIgaiA9IEpTT04uc3RyaW5naWZ5KGFycmVnbG8pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coaik7XHJcbiAgICB9XHJcbn0iXX0=