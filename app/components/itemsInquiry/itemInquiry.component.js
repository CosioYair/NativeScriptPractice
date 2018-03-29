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
        this.picture = "";
        //this.showImageLocal(product);
        //this.picture = `${SERVER.baseUrl}/Image/${product.ItemCode}`;
        this.showImage(product);
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
        return __awaiter(this, void 0, void 0, function () {
            var download;
            return __generator(this, function (_a) {
                download = new nativescript_download_progress_1.DownloadProgress();
                download.addProgressCallback(function (progress) {
                    console.log('Progress:', progress);
                });
                download.downloadFile(url).then(function (f) {
                    console.log("Success", f.path);
                }).catch(function (e) {
                    console.log("Error", e);
                });
                return [2 /*return*/];
            });
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
        console.log("Numero de imagenes:::" + i);
        console.log("Numero de colecciones:::" + colletions);
        console.log("Residuo:::" + residue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUF5RjtBQUN6Riw0REFBNkQ7QUFDN0Qsc0VBQW1FO0FBRW5FLDREQUFvRDtBQUVwRCx1Q0FBdUM7QUFFdkMsMkRBQTZEO0FBQzdELGlEQUFtRDtBQUNuRCwyQkFBNkI7QUFFN0IsbUJBQW1CO0FBQ25CLGlGQUFpRTtBQUNqRSxPQUFPO0FBQ1AscURBQXVDO0FBQ3ZDLGtDQUFvQztBQUNwQyxhQUFhO0FBQ2Isa0VBQW9FO0FBYXBFO0lBZ0JJLDhCQUFvQixpQkFBbUMsRUFBVSxlQUErQjtRQUE1RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBZHhGLFdBQU0sR0FBVSxTQUFTLENBQUM7UUFDM0IsZ0JBQVcsR0FBNkIsSUFBSSxrQ0FBZSxFQUFXLENBQUM7UUFDdkUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLG9CQUFlLEdBQU8sRUFBRSxDQUFDO1FBS3pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBT3BCLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixZQUFZLEVBQUUsRUFBRTtZQUNoQixZQUFZLEVBQUUsRUFBRTtZQUNoQixRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxFQUFFO1lBQ2QsTUFBTSxFQUFFLEVBQUU7WUFDVixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLGlCQUFpQixFQUFFLEVBQUU7WUFDckIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxF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TyxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUM7WUFFakQsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkF1QmE7UUFLTCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUMsT0FBTyxDQUFDLENBQUM7UUFHbEM7OztXQUdHO1FBRUgsa0NBQWtDO1FBQ2xDLGlCQUFpQjtJQUNyQixDQUFDO0lBclZRLG9CQUFvQjtRQVJoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDO3lDQW1CeUMsb0NBQWdCLEVBQTJCLDZCQUFjO09BaEJ2RixvQkFBb0IsQ0FzVmhDO0lBQUQsMkJBQUM7Q0FBQSxBQXRWRCxJQXNWQztBQXRWWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pdGVtSW5xdWlyeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2V0dXBJdGVtVmlld0FyZ3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuXHJcbi8vaW1wb3J0IHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgaHR0cFxyXG5cclxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcclxuXHJcbi8vRG93bmxvYWQgUHJvZ3Jlc3NcclxuaW1wb3J0IHsgRG93bmxvYWRQcm9ncmVzcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZG93bmxvYWQtcHJvZ3Jlc3NcIlxyXG4vL1VuemlwXHJcbmltcG9ydCB7IFppcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtemlwXCI7XHJcbmltcG9ydCAqIGFzIGZzdXogZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbi8vSW1hZ2UgQ2FjaGVcclxuaW1wb3J0ICogYXMgaW1hZ2VDYWNoZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZS1jYWNoZVwiO1xyXG5cclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtSW5xdWlyeVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9pdGVtSW5xdWlyeS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEl0ZW1JbnF1aXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgcHJpdmF0ZSBfcHJvZHVjdHM6YW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJwcm9kdWN0XCI7XHJcbiAgICBwdWJsaWMgcHJvZHVjdExpc3Q6IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgIHB1YmxpYyBkYXRhID0ge307XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQcm9kdWN0OmFueSA9IHt9O1xyXG4gICAgLy9vYnRlbmNpb24gZGUgaW1hZ2VuXHJcbiAgICBwdWJsaWMgcGljdHVyZTphbnk7XHJcbiAgICBwdWJsaWMgdXJsSW1hZ2U6IGFueTtcclxuICAgIHB1YmxpYyBzdGFydEdldEltYWdlOiAwO1xyXG4gICAgcHVibGljIGVuZEdldEltYWdlID0gODA7XHJcbiAgICBwdWJsaWMgcGF0aDogYW55O1xyXG4gIFxyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLCBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2Upe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0ge1xyXG4gICAgICAgICAgICBJdGVtQ29kZTogXCJcIixcclxuICAgICAgICAgICAgSXRlbUNvZGVEZXNjOiBcIlwiLFxyXG4gICAgICAgICAgICBJbmFjdGl2ZUl0ZW06IFwiXCIsXHJcbiAgICAgICAgICAgIEl0ZW1UeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBTaGlwV2VpZ2h0OiBcIlwiLFxyXG4gICAgICAgICAgICBWb2x1bWU6IFwiXCIsXHJcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdENvc3Q6IFwiXCIsXHJcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdFByaWNlOiBcIlwiLFxyXG4gICAgICAgICAgICBQcmltYXJ5VmVuZG9yTm86IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5MTogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnkyOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTM6IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5NDogXCJcIixcclxuICAgICAgICAgICAgUHJvZHVjdExpbmU6IFwiXCIsXHJcbiAgICAgICAgICAgIFByb2R1Y3RUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBFeHRlbmRlZERlc2NyaXB0aW9uVGV4dDogXCJcIixcclxuICAgICAgICAgICAgSW1hZ2VGaWxlOiBcIlwiLFxyXG4gICAgICAgICAgICBMYXN0U29sZERhdGU6IFwiXCIsXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcclxuICAgICAgICAgICAgVGltZVVwZGF0ZWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFRpbWVDcmVhdGVkOiBcIlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBpY3R1cmUgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJvZHVjdHMoKXtcclxuICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0cygpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5fZG9jSWRdID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLmRhdGEsIHRoaXMuX2RvY0lkKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSByZXN1bHRbXCJQcm9kdWN0XCJdO1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcblxyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREb2N1bWVudCgpe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KHRoaXMuX2RvY0lkKTtcclxuICAgICAgICBpZihkb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5nZXRQcm9kdWN0cygpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IGRvY1t0aGlzLl9kb2NJZF07XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cy5tYXAoIChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZURlc2MudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKHRoaXMuX3Byb2R1Y3RzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRQcm9kdWN0KHByb2R1Y3Q6UHJvZHVjdCl7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgIC8vdGhpcy5kb3dubG9hZEltYWdlc1Byb2R1Y3RzKHRoaXMucHJvZHVjdExpc3QpO1xyXG4gICAgICAgIC8vdGhpcy5nZXRJbWFnZShwcm9kdWN0KTtcclxuICAgICAgICB0aGlzLnBpY3R1cmUgPSBcIlwiO1xyXG4gICAgICAgIC8vdGhpcy5zaG93SW1hZ2VMb2NhbChwcm9kdWN0KTtcclxuICAgICAgICAvL3RoaXMucGljdHVyZSA9IGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke3Byb2R1Y3QuSXRlbUNvZGV9YDtcclxuICAgICAgICB0aGlzLnNob3dJbWFnZShwcm9kdWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG93bmxvYWRJbWFnZXNQcm9kdWN0cyhwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KXtcclxuICAgICAgICB2YXIgbDogYW55O1xyXG4gICAgICAgIHZhciBjb250ID0gMDtcclxuICAgICAgICBsID0gcHJvZHVjdExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHZhciBuYW1lSW1hZ2U6IGFueTtcclxuICAgICAgICB2YXIgaSA9IDAsIGsgPSAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGFyZ28gZGVsIGFycmF5X186XCIrbCk7XHJcbiAgICAgICAgICAgIHByb2R1Y3RMaXN0LnNsaWNlKDAsMTUwKS5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0LkltYWdlRmlsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVybEltYWdlID0gYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7cHJvZHVjdC5JdGVtQ29kZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29udEltYWdlKys7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVJbWFnZSA9IHByb2R1Y3QuSXRlbUNvZGVEZXNjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0SW1hZ2UodGhpcy51cmxJbWFnZSxwcm9kdWN0Lkl0ZW1Db2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRvd25sb2FkUHJvZ3Jlc3ModGhpcy51cmxJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgY29udCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGk9PTEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnQgKz0gNTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coayk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByb2R1Y3QuUHJvZHVjdFR5cGUgKyBcIl9fX19ObyB0aWVuZSBpbWFnZW5fX19cIitjb250V0ltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRXSW1hZ2UrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnQgKz0gMjAwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRlcm1pbm8gbGEgZGVzY2FyZ2FcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJbWFnZUxvY2FsKHByb2R1Y3Q6IFByb2R1Y3Qpe1xyXG4gICAgICAgIC8vY29kaWdvIHBhcmEgb2J0ZW5lciBsb3MgcGF0aCBkZSBsYSBpbWFnZW4gc2VsZWNjaW9uYWRhXHJcbiAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCAmJiBwcm9kdWN0LkltYWdlRmlsZSAhPSB1bmRlZmluZWQpe1xyXG5cclxuICAgICAgICAgICAgLy9CdXNxdWVkYSBlbiBsYSBpbWFnZW4gZW4gbGEgbWVtb3JpYSBsb2NhbFxyXG4gICAgICAgICAgICB2YXIgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIHByb2R1Y3QuSXRlbUNvZGUrXCIuanBnXCIpO1xyXG4gICAgICAgICAgICAvL2NvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGljdHVyZSA9IHRoaXMucGF0aDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wYXRoK1wiICAgZW5jb250cm8gaW1hZ2VuXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5waWN0dXJlK1wiICA4ODg4ODg4ODhcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMucGF0aCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZhciBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgXCJJRkQxMDIwTlRTVC5qcGdcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBpY3R1cmUgPSB0aGlzLnBhdGg7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGF0aCtcIm5vIGVuY29udHJvIGltYWdlblwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGljdHVyZStcIjg4ODg4ODg4OFwiKTtcclxuICAgICAgICAgICAgLy90aGlzLmdldEltYWdlKHByb2R1Y3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL1BsdWdpbiBkZXNjYXJnYSBkZSBhcmNoaXZvcyBncmFuZGVzLi4uXHJcbiAgICBwdWJsaWMgYXN5bmMgZG93bmxvYWRQcm9ncmVzcyh1cmw6IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIGRvd25sb2FkID0gbmV3IERvd25sb2FkUHJvZ3Jlc3MoKTtcclxuICAgICAgICBkb3dubG9hZC5hZGRQcm9ncmVzc0NhbGxiYWNrKChwcm9ncmVzcyk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Byb2dyZXNzOicsIHByb2dyZXNzKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGRvd25sb2FkLmRvd25sb2FkRmlsZSh1cmwpLnRoZW4oKGYpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiLCBmLnBhdGgpO1xyXG4gICAgICAgIH0pLmNhdGNoKChlKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuemlwKCl7XHJcbiAgICAgICAgY29uc3QgZm9sZGVyID0gZnN1ei5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcblxyXG4gICAgICAgIGxldCB6aXBQYXRoID0gZnN1ei5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIFwiMjBNQi56aXBcIik7XHJcbiAgICAgICAgbGV0IGRlc3QgPSBmc3V6LnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkucGF0aCwgXCIvYXNzZXRzXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHppcFBhdGgrXCIgVWJpY2FjaW9uIGVuIGxhIHF1ZSBzZSBidXNjYSBwYXJhIGRlc2NvbXByaW1pci4uXCIpO1xyXG4gICAgICAgIFppcC51bnppcFdpdGhQcm9ncmVzcyh6aXBQYXRoLGRlc3Qsb25aaXBQcm9ncmVzcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gb25aaXBQcm9ncmVzcyhwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHVuemlwIHByb2dyZXNzOiAke3BlcmNlbnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL3BydWViYSBkZSBkZXNjYXJnYSBwb3IgY2xpY2tcclxuICAgIHB1YmxpYyBnZXRJbWFnZShwcm9kdWN0OiBQcm9kdWN0KXtcclxuICAgICAgICB2YXIgbmFtZUltYWdlOiBhbnk7XHJcbiAgICAgICAgdmFyIGltYWdlOiBhbnk7XHJcbiAgICAgICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsIHx8IHByb2R1Y3QuSW1hZ2VGaWxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7cHJvZHVjdC5JbWFnZUZpbGV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cmxJbWFnZSA9IHJlcXVpcmUoYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7cHJvZHVjdC5JbWFnZUZpbGV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51cmxJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUltYWdlID0gcHJvZHVjdC5JdGVtQ29kZURlc2M7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250SW1hZ2UrKztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbWFnZSA9IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RJbWFnZSh0aGlzLnVybEltYWdlLCBuYW1lSW1hZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZVBhdGggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpLnBhdGgsIG5hbWVJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cC5nZXRGaWxlKHRoaXMudXJsSW1hZ2UsIGZpbGVQYXRoKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gQXJndW1lbnQgKHIpIGlzIEZpbGUhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGljdHVyZSA9IHRoaXMudXJsSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGljdHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAoZSkgaXMgRXJyb3IhXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZSBkZXNjYXJnbyBpbWFnZW4gZW4gbGEgdXJsX19fOlwiICsgdGhpcy51cmxJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYSBpbWFnZW4gcXVlZG8gYWxtYWNlbmFkYSBlbiBsYSBydXRhX19fOlwiK3RoaXMucGljdHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIFwiSUZEMTAyME5UU1QuanBnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY3R1cmUgPSB0aGlzLnVybEltYWdlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXJtaW5vIGxhIGRlc2NhcmdhXCIpOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJbWFnZShwcm9kdWN0OiBQcm9kdWN0KXtcclxuICAgICAgICBjb25zdCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgcHJvZHVjdC5JdGVtQ29kZStcIi5qcGdcIik7XHJcbiAgICAgICAgLy9jb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShwYXRoKTtcclxuICAgICAgICAvL3RoaXMucGljdHVyZSA9IGltZztcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXRoK1wiIE11ZXN0cmEgZGUgaW1hZ2VuZXMuLi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMganNvbmdlbmVyYXRpb24ocHJvZHVjdExpc3Q6IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pil7XHJcbiAgICAgICAgdmFyIGk9MDtcclxuICAgICAgICB2YXIgYXJyZWdsbyA9IFtdO1xyXG4gICAgICAgIHZhciBtaU9iamV0byA9IE9iamVjdCgpO1xyXG4gICAgICAgIHByb2R1Y3RMaXN0LnNsaWNlKCkubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsICYmIGk8PTkpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBtaU9iamV0by5ub21icmUgPSBwcm9kdWN0Lkl0ZW1Db2RlO1xyXG4gICAgICAgICAgICAgICAgbWlPYmpldG8uZGVzY3JpcGNpb24gPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcclxuICAgICAgICAgICAgICAgIGFycmVnbG8ucHVzaChtaU9iamV0byk7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvKmNvbnNvbGUubG9nKGFycmVnbG8ubGVuZ3RoKTtcclxuICAgICAgICBmb3IoaT0wO2k8YXJyZWdsby5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJyZWdsb1tpXStcIiAgIFwiK2kpO1xyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICB2YXIgaiA9IEpTT04uc3RyaW5naWZ5KGFycmVnbG8pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGopO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgZ2V0SW1hZ2VzQ2FjaGUocHJvZHVjdExpc3Q6IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pil7XHJcbiAgICAgICAgdmFyIGk9IDA7XHJcbiAgICAgICAgcHJvZHVjdExpc3QubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZhciBjYWNoZSA9IG5ldyBpbWFnZUNhY2hlTW9kdWxlLkNhY2hlKCk7XHJcbiAgICAgICAgY2FjaGUucGxhY2Vob2xkZXIgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShmcy5wYXRoLmpvaW4oX19kaXJuYW1lLCBcInJlcy9uby1pbWFnZS5wbmdcIikpO1xyXG4gICAgICAgIGNhY2hlLm1heFJlcXVlc3RzID0gaTtcclxuXHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBsaXN0SW1hZ2UocHJvZHVjdExpc3Q6IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pil7XHJcbiAgICAgICAgdmFyIGk9MCwgY29udD0gMCwgY29udENvbGw9MDtcclxuICAgICAgICB2YXIgY29sbGV0aW9ucyA9IDA7XHJcbiAgICAgICAgdmFyIHJlc2lkdWUgPSAwO1xyXG4gICAgICAgIHZhciBsZW5naHQgPSAwO1xyXG4gICAgICAgIHZhciBjb3VudERvd24gPSAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB1cmxzZXJ2aWNlID0gXCJodHRwczovL21zcy5pbnQtZnVybmRpcmVjdC5jb206MzcwODAvYXBpL0ltYWdlcy5qc29uP0l0ZW1Db2Rlcz1cIiA7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgcHJvZHVjdExpc3QubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsKXsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMrcHJvZHVjdC5JdGVtQ29kZStcIixcIjsgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcbiAgICAgICAgdGhpcy5kb3dubG9hZFByb2dyZXNzKHVybHNlcnZpY2UrcGFyYW1ldGVycyk7XHJcbi8qXHJcbiAgICAgICAgcHJvZHVjdExpc3QubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsKXsgXHJcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycytwcm9kdWN0Lkl0ZW1Db2RlK1wiLFwiOyAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGNvbnQgPT0gMTAwKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudERvd24gPSBsZW5naHQgLSBjb250O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRJbWFnZXMocGFyYW1ldGVycylcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnQ9MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250Kys7XHJcbiAgICAgICAgICAgICAgICBpKys7ICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7Ki9cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOdW1lcm8gZGUgaW1hZ2VuZXM6OjpcIitpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk51bWVybyBkZSBjb2xlY2Npb25lczo6OlwiK2NvbGxldGlvbnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzaWR1bzo6OlwiK3Jlc2lkdWUpO1xyXG5cclxuXHJcbiAgICAgICAgLypjb25zb2xlLmxvZyhhcnJlZ2xvLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKGk9MDtpPGFycmVnbG8ubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycmVnbG9baV0rXCIgICBcIitpKTtcclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgLy92YXIgaiA9IEpTT04uc3RyaW5naWZ5KGFycmVnbG8pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coaik7XHJcbiAgICB9XHJcbn0iXX0=