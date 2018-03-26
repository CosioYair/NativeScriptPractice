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
//Download Progress
var nativescript_download_progress_1 = require("nativescript-download-progress");
var ItemInquiryComponent = /** @class */ (function () {
    function ItemInquiryComponent(_couchbaseService, _productService) {
        this._couchbaseService = _couchbaseService;
        this._productService = _productService;
        this._docId = "product";
        this.productList = new observable_array_1.ObservableArray();
        this.data = {};
        this.selectedProduct = {};
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
        //this.showImage(product);
        //this.downloadImagesProducts(this.productList);
        //this.downloadProgres();
        this.getImage(product);
    };
    //descargar imagenes
    ItemInquiryComponent.prototype.downloadImagesProducts = function (productList) {
        var _this = this;
        //var contWImage= 0;
        //var contImage = 0;
        var l;
        var cont = 100;
        l = productList.length;
        var i = 0;
        console.log("Largo del array__:" + l);
        productList.map(function (product) {
            if (product.ImageFile != null) {
                console.log(server_config_1.SERVER.baseUrl + "/Image/" + product.ImageFile);
                _this.urlImage = server_config_1.SERVER.baseUrl + "/Image/" + product.ImageFile;
                console.log(_this.urlImage);
                //contImage++;
                setTimeout(function () {
                    //this._productService.getProductImage(this.urlImage,product.ImageFile);
                    //this.downloadProgress(this.urlImage);
                }, cont);
                i++;
                console.log(i);
            }
            else {
                //console.log(product.ProductType + "____No tiene imagen___"+contWImage);
                //contWImage++;
            }
            cont += 250;
        });
        console.log("Termino la descarga");
    };
    ItemInquiryComponent.prototype.showImageLocal = function (product) {
        //codigo para obtener los path de la imagen seleccionada
        if (product.ImageFile != null && product.ImageFile != undefined) {
            var folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, product.ImageFile); //nombre para buscarlo
            var img = imageSource.fromFile(path);
            this.picture = path;
            console.log(path + "encontro imagen");
            console.log(this.picture + "888888888");
        }
        else {
            var folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, "IFD1020NTST.jpg"); //nombre para buscarlo
            var img = imageSource.fromFile(path);
            this.picture = path;
            console.log(path + "no encontro imagen");
            console.log(this.picture + "888888888");
        }
    };
    //Plugin descarga de archivos grandes...
    ItemInquiryComponent.prototype.downloadProgress = function (urlImage) {
        return __awaiter(this, void 0, void 0, function () {
            var download, uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        download = new nativescript_download_progress_1.DownloadProgress();
                        uri = "uriVacia";
                        download.addProgressCallback(function (progress) {
                            console.log('Progress:', progress);
                        });
                        return [4 /*yield*/, download.downloadFile(urlImage).then(function (f) {
                                console.log("Success", f);
                                console.log("Funciona");
                            }).catch(function (e) {
                                console.log("Error", e);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, uri];
                }
            });
        });
    };
    //prueba de descarga por click
    ItemInquiryComponent.prototype.getImage = function (product) {
        var _this = this;
        if (product.ImageFile != null || product.ImageFile != undefined) {
            console.log(server_config_1.SERVER.baseUrl + "/Image/" + product.ImageFile);
            this.urlImage = server_config_1.SERVER.baseUrl + "/Image/" + product.ImageFile;
            console.log(this.urlImage);
            //contImage++;
            setTimeout(function () {
                _this._productService.getProductImage(_this.urlImage, product.ImageFile);
                _this.picture = _this.urlImage;
                _this.showImageLocal(product);
            }, 250);
            console.log("Se descargo imagen en la url___:" + this.urlImage);
        }
        else {
            this.showImageLocal(product);
            console.log(product.ProductType + "____No tiene imagen___");
        }
        console.log("Termino la descarga");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUF5RjtBQUN6Riw0REFBNkQ7QUFDN0Qsc0VBQW1FO0FBRW5FLDREQUFvRDtBQUVwRCx1Q0FBdUM7QUFFdkMsMkRBQTZEO0FBQzdELGlEQUFtRDtBQUduRCxtQkFBbUI7QUFDbkIsaUZBQWlFO0FBV2pFO0lBU0ksOEJBQW9CLGlCQUFtQyxFQUFVLGVBQStCO1FBQTVFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFQeEYsV0FBTSxHQUFVLFNBQVMsQ0FBQztRQUMzQixnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Ysb0JBQWUsR0FBTyxFQUFFLENBQUM7UUFLNUIsSUFBSSxDQUFDLGVBQWUsR0FBRztZQUNuQixRQUFRLEVBQUUsRUFBRTtZQUNaLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFLEVBQUU7WUFDZCxNQUFNLEVBQUUsRUFBRTtZQUNWLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsaUJBQWlCLEVBQUUsRUFBRTtZQUNyQixlQUFlLEVBQUUsRUFBRTtZQUNuQixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsV0FBVyxFQUFFLEVBQUU7WUFDZix1QkFBdUIsRUFBRSxFQUFFO1lBQzNCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVB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TSxDQUFDLE9BQU8sZUFBVSxPQUFPLENBQUMsU0FBVyxDQUFDO1lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLGNBQWM7WUFFZCxVQUFVLENBQUM7Z0JBQ0gsS0FBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RFLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQTtnQkFDNUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQXJNUSxvQkFBb0I7UUFSaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FZeUMsb0NBQWdCLEVBQTJCLDZCQUFjO09BVHZGLG9CQUFvQixDQXVNL0I7SUFBRCwyQkFBQztDQUFBLEFBdk1GLElBdU1FO0FBdk1XLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2l0ZW1JbnF1aXJ5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXJ9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZXR1cEl0ZW1WaWV3QXJncyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5cclxuLy9pbXBvcnQgcGFyYSBkZXNjYXJnYSBkZSBpbWFnZW5lcyBodHRwXHJcblxyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5cclxuLy9Eb3dubG9hZCBQcm9ncmVzc1xyXG5pbXBvcnQgeyBEb3dubG9hZFByb2dyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kb3dubG9hZC1wcm9ncmVzc1wiXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtSW5xdWlyeVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9pdGVtSW5xdWlyeS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEl0ZW1JbnF1aXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgcHJpdmF0ZSBfcHJvZHVjdHM6YW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJwcm9kdWN0XCI7XHJcbiAgICBwdWJsaWMgcHJvZHVjdExpc3Q6IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgIHB1YmxpYyBkYXRhID0ge307XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQcm9kdWN0OmFueSA9IHt9O1xyXG4gICAgcHVibGljIHBpY3R1cmU6YW55O1xyXG4gICAgcHVibGljIHVybEltYWdlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSwgcHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHtcclxuICAgICAgICAgICAgSXRlbUNvZGU6IFwiXCIsXHJcbiAgICAgICAgICAgIEl0ZW1Db2RlRGVzYzogXCJcIixcclxuICAgICAgICAgICAgSW5hY3RpdmVJdGVtOiBcIlwiLFxyXG4gICAgICAgICAgICBJdGVtVHlwZTogXCJcIixcclxuICAgICAgICAgICAgU2hpcFdlaWdodDogXCJcIixcclxuICAgICAgICAgICAgVm9sdW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBTdGFuZGFyZFVuaXRDb3N0OiBcIlwiLFxyXG4gICAgICAgICAgICBTdGFuZGFyZFVuaXRQcmljZTogXCJcIixcclxuICAgICAgICAgICAgUHJpbWFyeVZlbmRvck5vOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTE6IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5MjogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnkzOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFByb2R1Y3RMaW5lOiBcIlwiLFxyXG4gICAgICAgICAgICBQcm9kdWN0VHlwZTogXCJcIixcclxuICAgICAgICAgICAgRXh0ZW5kZWREZXNjcmlwdGlvblRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIEltYWdlRmlsZTogXCJcIixcclxuICAgICAgICAgICAgTGFzdFNvbGREYXRlOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogXCJcIixcclxuICAgICAgICAgICAgRGF0ZVVwZGF0ZWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFRpbWVVcGRhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBUaW1lQ3JlYXRlZDogXCJcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5waWN0dXJlID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldERvY3VtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2R1Y3RzKCl7XHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdHMoKVxyXG4gICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuX2RvY0lkXSA9IHJlc3VsdFtcIlByb2R1Y3RcIl07XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5kYXRhLCB0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG5cclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudCh0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgaWYoZG9jID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBkb2NbdGhpcy5fZG9jSWRdO1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBpZihzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKCAocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9kdWN0c1tpbmRleF0uSXRlbUNvZGVEZXNjLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaCh0aGlzLl9wcm9kdWN0c1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICB0aGlzLl9wcm9kdWN0cy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkUHJvZHVjdChwcm9kdWN0OlByb2R1Y3Qpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAvL3RoaXMuc2hvd0ltYWdlKHByb2R1Y3QpO1xyXG4gICAgICAgIC8vdGhpcy5kb3dubG9hZEltYWdlc1Byb2R1Y3RzKHRoaXMucHJvZHVjdExpc3QpO1xyXG4gICAgICAgIC8vdGhpcy5kb3dubG9hZFByb2dyZXMoKTtcclxuICAgICAgICB0aGlzLmdldEltYWdlKHByb2R1Y3QpO1xyXG4gICAgfVxyXG5cclxuLy9kZXNjYXJnYXIgaW1hZ2VuZXNcclxuICAgIHB1YmxpYyBkb3dubG9hZEltYWdlc1Byb2R1Y3RzKHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4pe1xyXG4gICAgICAgIC8vdmFyIGNvbnRXSW1hZ2U9IDA7XHJcbiAgICAgICAgLy92YXIgY29udEltYWdlID0gMDtcclxuICAgICAgICB2YXIgbDogYW55O1xyXG4gICAgICAgIHZhciBjb250ID0gMTAwO1xyXG4gICAgICAgIGwgPSBwcm9kdWN0TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGFyZ28gZGVsIGFycmF5X186XCIrbCk7XHJcbiAgICAgICAgICAgIHByb2R1Y3RMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke3Byb2R1Y3QuSW1hZ2VGaWxlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXJsSW1hZ2UgPSBgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0LkltYWdlRmlsZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29udEltYWdlKys7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdEltYWdlKHRoaXMudXJsSW1hZ2UscHJvZHVjdC5JbWFnZUZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZG93bmxvYWRQcm9ncmVzcyh0aGlzLnVybEltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBjb250KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByb2R1Y3QuUHJvZHVjdFR5cGUgKyBcIl9fX19ObyB0aWVuZSBpbWFnZW5fX19cIitjb250V0ltYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRXSW1hZ2UrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnQgKz0gMjUwO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRlcm1pbm8gbGEgZGVzY2FyZ2FcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dJbWFnZUxvY2FsKHByb2R1Y3Q6IFByb2R1Y3Qpe1xyXG4gICAgICAgIC8vY29kaWdvIHBhcmEgb2J0ZW5lciBsb3MgcGF0aCBkZSBsYSBpbWFnZW4gc2VsZWNjaW9uYWRhXHJcbiAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCAmJiBwcm9kdWN0LkltYWdlRmlsZSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjb25zdCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBwcm9kdWN0LkltYWdlRmlsZSk7Ly9ub21icmUgcGFyYSBidXNjYXJsb1xyXG4gICAgICAgICAgICBjb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShwYXRoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBpY3R1cmUgPSBwYXRoO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXRoK1wiZW5jb250cm8gaW1hZ2VuXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5waWN0dXJlK1wiODg4ODg4ODg4XCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zdCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBcIklGRDEwMjBOVFNULmpwZ1wiKTsvL25vbWJyZSBwYXJhIGJ1c2NhcmxvXHJcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5waWN0dXJlID0gcGF0aDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGF0aCtcIm5vIGVuY29udHJvIGltYWdlblwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGljdHVyZStcIjg4ODg4ODg4OFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy9QbHVnaW4gZGVzY2FyZ2EgZGUgYXJjaGl2b3MgZ3JhbmRlcy4uLlxyXG4gICAgcHVibGljIGFzeW5jIGRvd25sb2FkUHJvZ3Jlc3ModXJsSW1hZ2U6IGFueSl7XHJcbiAgICAgICAgdmFyIGRvd25sb2FkID0gbmV3IERvd25sb2FkUHJvZ3Jlc3MoKTtcclxuICAgICAgICB2YXIgdXJpOiBhbnkgPSBcInVyaVZhY2lhXCI7XHJcbiAgICAgICAgZG93bmxvYWQuYWRkUHJvZ3Jlc3NDYWxsYmFjaygocHJvZ3Jlc3MpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQcm9ncmVzczonLCBwcm9ncmVzcyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgYXdhaXQgZG93bmxvYWQuZG93bmxvYWRGaWxlKHVybEltYWdlKS50aGVuKChmKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIiwgZik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRnVuY2lvbmFcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pLmNhdGNoKChlKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHVyaTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9wcnVlYmEgZGUgZGVzY2FyZ2EgcG9yIGNsaWNrXHJcbiAgICBwdWJsaWMgZ2V0SW1hZ2UocHJvZHVjdDogUHJvZHVjdCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsIHx8IHByb2R1Y3QuSW1hZ2VGaWxlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7cHJvZHVjdC5JbWFnZUZpbGV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cmxJbWFnZSA9IGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke3Byb2R1Y3QuSW1hZ2VGaWxlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51cmxJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250SW1hZ2UrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0SW1hZ2UodGhpcy51cmxJbWFnZSxwcm9kdWN0LkltYWdlRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY3R1cmUgPSB0aGlzLnVybEltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dJbWFnZUxvY2FsKHByb2R1Y3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyNTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2UgZGVzY2FyZ28gaW1hZ2VuIGVuIGxhIHVybF9fXzpcIiArIHRoaXMudXJsSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SW1hZ2VMb2NhbChwcm9kdWN0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0LlByb2R1Y3RUeXBlICsgXCJfX19fTm8gdGllbmUgaW1hZ2VuX19fXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXJtaW5vIGxhIGRlc2NhcmdhXCIpOyAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuIH0iXX0=