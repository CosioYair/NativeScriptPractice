"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var item_service_1 = require("../../services/item.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var constants_config_1 = require("../../config/constants.config");
var image_service_1 = require("../../services/image.service");
var fs = require("tns-core-modules/file-system");
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
var ItemInquiryComponent = /** @class */ (function () {
    function ItemInquiryComponent(_couchbaseService, _productService, barcodeScanner, _imageService) {
        var _this = this;
        this._couchbaseService = _couchbaseService;
        this._productService = _productService;
        this.barcodeScanner = barcodeScanner;
        this._imageService = _imageService;
        this._docId = "product";
        this.productList = new observable_array_1.ObservableArray();
        this.data = {};
        this.selectedProduct = {};
        this.itemCode = "";
        this.warehouses = [];
        this.warehouse = 0;
        this.stdUnitPrice = 0;
        this.stdUnitCost = 0;
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
        //this.picture = "";
        constants_config_1.CONSTANTS.warehouses.map(function (warehouse) {
            _this.warehouses.push(warehouse.name);
        });
    }
    ItemInquiryComponent.prototype.ngOnInit = function () {
        this.setDocument();
    };
    ItemInquiryComponent.prototype.getProducts = function () {
    };
    ItemInquiryComponent.prototype.setDocument = function () {
        var doc = this._couchbaseService.getDocument(this._docId);
        this._products = doc[this._docId];
        this.productList = new observable_array_1.ObservableArray(this._products);
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
        this.stdUnitPrice = (this.selectedProduct.StandardUnitPrice).toFixed(2);
        this.stdUnitCost = (this.selectedProduct.StandardUnitCost).toFixed(2);
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
    ItemInquiryComponent.prototype.onScan = function () {
        var _this = this;
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
        }).then(function (result) {
            _this.itemCode = result.text;
            //this.validateProductList();
            console.log(_this.itemCode);
        }, function (errorMessage) {
            console.log("Error when scanning " + errorMessage);
        });
    };
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ItemInquiryComponent.prototype.getImages = function () {
        /*this.productList.map(async product => {
            if (product.ImageFile != null) {
                await this._imageService.getImage(product.ItemCode).then(res => {
                    const img = imageSource.fromFile(res.toString());
                    const folder = fs.knownFolders.documents();
                    const path = fs.path.join(folder.path, `${product.ItemCode}.png`);
                    const saved = img.saveToFile(path, "png");
                });
            }
        });*/
    };
    ItemInquiryComponent.prototype.listImage = function () {
        var i = 0, cont = 0, contColl = 0;
        var colletions = 0;
        var residue = 0;
        var lenght = 0;
        var countDown = 0;
        var urlService = "https://mss.int-furndirect.com:37180/api/Images.json?ItemCodes=";
        var parameters = "";
        this.productList.slice(0, 10).map(function (product) {
            if (product.ImageFile != null) {
                parameters = parameters + product.ItemCode + ",";
            }
        });
        console.log(parameters);
        this._imageService.downloadProgress(urlService + parameters);
    };
    ItemInquiryComponent.prototype.openJson = function () {
        var documents = fs.knownFolders.documents();
        var file = documents.getFile("images.json");
        var st;
        if (file != null) {
            console.log("Archivo...");
            console.log(file.name);
            st = file.readTextSync();
            console.log(file);
        }
    };
    ItemInquiryComponent = __decorate([
        core_1.Component({
            selector: "ns-itemInquiry",
            moduleId: module.id,
            templateUrl: "./itemInquiry.component.html",
            styleUrls: ["./itemInquiry.component.css"]
        }),
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService,
            item_service_1.ProductService,
            nativescript_barcodescanner_1.BarcodeScanner,
            image_service_1.ImageService])
    ], ItemInquiryComponent);
    return ItemInquiryComponent;
}());
exports.ItemInquiryComponent = ItemInquiryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUEwRjtBQUMxRiw0REFBNkQ7QUFDN0Qsc0VBQW9FO0FBR3BFLDJFQUE2RDtBQUU3RCxrRUFBMEQ7QUFDMUQsOERBQTREO0FBRTVELGlEQUFtRDtBQUVuRCx1Q0FBdUM7QUFDdkM7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBWUY7SUEyQkksOEJBQW9CLGlCQUFtQyxFQUMzQyxlQUErQixFQUMvQixjQUE4QixFQUM5QixhQUEyQjtRQUh2QyxpQkFpQ0M7UUFqQ21CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDM0Msb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQTVCL0IsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUM1QixnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Ysb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFNeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHeEIsTUFBTTtRQUNDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQVVwQyxJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ25CLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsUUFBUSxF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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaXRlbUlucXVpcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNldHVwSXRlbVZpZXdBcmdzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXNcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcclxuaW1wb3J0IHsgRHJvcERvd25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi9jb25maWcvY29uc3RhbnRzLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW1hZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuXHJcbi8vaW1wb3J0IHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgaHR0cFxyXG4vKlxyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5cclxuLy9Eb3dubG9hZCBQcm9ncmVzc1xyXG5pbXBvcnQgeyBEb3dubG9hZFByb2dyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kb3dubG9hZC1wcm9ncmVzc1wiXHJcbi8vVW56aXBcclxuaW1wb3J0IHsgWmlwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC16aXBcIjtcclxuaW1wb3J0ICogYXMgZnN1eiBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuLy9JbWFnZSBDYWNoZVxyXG5pbXBvcnQgKiBhcyBpbWFnZUNhY2hlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlLWNhY2hlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuLy9PcGVuIGxvY2FsIGpzb25cclxuXHJcbiovXHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbUlucXVpcnlcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1JbnF1aXJ5LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtSW5xdWlyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwicHJvZHVjdFwiO1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICBwdWJsaWMgZGF0YSA9IHt9O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgaXRlbUNvZGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlczogYW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0ZFVuaXRQcmljZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGRVbml0Q29zdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvL29idGVuY2lvbiBkZSBpbWFnZW5cclxuICAgIHB1YmxpYyBwaWN0dXJlOiBhbnk7XHJcbiAgICBwdWJsaWMgdXJsSW1hZ2U6IGFueTtcclxuICAgIHB1YmxpYyBzdGFydEdldEltYWdlOiAwO1xyXG4gICAgcHVibGljIGVuZEdldEltYWdlID0gODA7XHJcbiAgICBwdWJsaWMgcGF0aDogYW55O1xyXG5cclxuICAgIC8vbmdpZlxyXG4gICAgcHVibGljIGlzVmlzaWJsZURhdGE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc1Zpc2libGVTY2FubmVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBfaW1hZ2VTZXJ2aWNlOiBJbWFnZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHtcclxuICAgICAgICAgICAgSXRlbUNvZGU6IFwiXCIsXHJcbiAgICAgICAgICAgIEl0ZW1Db2RlRGVzYzogXCJcIixcclxuICAgICAgICAgICAgSW5hY3RpdmVJdGVtOiBcIlwiLFxyXG4gICAgICAgICAgICBJdGVtVHlwZTogXCJcIixcclxuICAgICAgICAgICAgU2hpcFdlaWdodDogXCJcIixcclxuICAgICAgICAgICAgVm9sdW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBTdGFuZGFyZFVuaXRDb3N0OiBcIlwiLFxyXG4gICAgICAgICAgICBTdGFuZGFyZFVuaXRQcmljZTogXCJcIixcclxuICAgICAgICAgICAgUHJpbWFyeVZlbmRvck5vOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTE6IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5MjogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnkzOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFByb2R1Y3RMaW5lOiBcIlwiLFxyXG4gICAgICAgICAgICBQcm9kdWN0VHlwZTogXCJcIixcclxuICAgICAgICAgICAgRXh0ZW5kZWREZXNjcmlwdGlvblRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIEltYWdlRmlsZTogXCJcIixcclxuICAgICAgICAgICAgTGFzdFNvbGREYXRlOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogXCJcIixcclxuICAgICAgICAgICAgRGF0ZVVwZGF0ZWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFRpbWVVcGRhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBUaW1lQ3JlYXRlZDogXCJcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLnBpY3R1cmUgPSBcIlwiO1xyXG4gICAgICAgIENPTlNUQU5UUy53YXJlaG91c2VzLm1hcCh3YXJlaG91c2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndhcmVob3VzZXMucHVzaCh3YXJlaG91c2UubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREb2N1bWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQodGhpcy5fZG9jSWQpO1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gZG9jW3RoaXMuX2RvY0lkXTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmIChzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9kdWN0c1tpbmRleF0uSXRlbUNvZGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKHRoaXMuX3Byb2R1Y3RzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgdGhpcy5zdGRVbml0UHJpY2UgPSAodGhpcy5zZWxlY3RlZFByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zdGRVbml0Q29zdCA9ICh0aGlzLnNlbGVjdGVkUHJvZHVjdC5TdGFuZGFyZFVuaXRDb3N0KS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIC8vdGhpcy5kb3dubG9hZEltYWdlc1Byb2R1Y3RzKHRoaXMucHJvZHVjdExpc3QpO1xyXG4gICAgICAgIC8vdGhpcy5nZXRJbWFnZShwcm9kdWN0KTtcclxuICAgICAgICAvL3RoaXMucGljdHVyZSA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZUxvY2FsKHByb2R1Y3QpO1xyXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7cHJvZHVjdC5JdGVtQ29kZX1gO1xyXG4gICAgICAgIC8vdGhpcy5zaG93SW1hZ2UocHJvZHVjdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlRGF0YSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZURhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZVNjYW5uZXIgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZURhdGEgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZVNjYW5uZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbigpIHtcclxuICAgICAgICB2YXIgZGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0O1xyXG4gICAgICAgIHZhciBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IChkZXNjcmlwdGlvbiksXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJBY2NlcHRcIlxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TY2FuKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMud2FyZWhvdXNlcyk7XHJcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcclxuICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcclxuICAgICAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBiZWVwT25TY2FuOiB0cnVlLFxyXG4gICAgICAgICAgICB0b3JjaE9uOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcIm9yaWVudGF0aW9uXCIsXHJcbiAgICAgICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWVcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHJlc3VsdC50ZXh0O1xyXG4gICAgICAgICAgICAvL3RoaXMudmFsaWRhdGVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW1Db2RlKTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgcHVibGljIGdldEltYWdlcygpIHtcclxuICAgICAgICAvKnRoaXMucHJvZHVjdExpc3QubWFwKGFzeW5jIHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5faW1hZ2VTZXJ2aWNlLmdldEltYWdlKHByb2R1Y3QuSXRlbUNvZGUpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShyZXMudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIGAke3Byb2R1Y3QuSXRlbUNvZGV9LnBuZ2ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gaW1nLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyovXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbGlzdEltYWdlKCl7XHJcbiAgICAgICAgdmFyIGk9MCwgY29udD0gMCwgY29udENvbGw9MDtcclxuICAgICAgICB2YXIgY29sbGV0aW9ucyA9IDA7XHJcbiAgICAgICAgdmFyIHJlc2lkdWUgPSAwO1xyXG4gICAgICAgIHZhciBsZW5naHQgPSAwO1xyXG4gICAgICAgIHZhciBjb3VudERvd24gPSAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB1cmxTZXJ2aWNlID0gXCJodHRwczovL21zcy5pbnQtZnVybmRpcmVjdC5jb206MzcxODAvYXBpL0ltYWdlcy5qc29uP0l0ZW1Db2Rlcz1cIiA7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5zbGljZSgwLDEwKS5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwpeyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycytwcm9kdWN0Lkl0ZW1Db2RlK1wiLFwiOyAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlU2VydmljZS5kb3dubG9hZFByb2dyZXNzKHVybFNlcnZpY2UrcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5Kc29uKCl7XHJcbiAgICAgICAgdmFyIGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB2YXIgZmlsZSA9IGRvY3VtZW50cy5nZXRGaWxlKFwiaW1hZ2VzLmpzb25cIik7XHJcbiAgICAgICAgdmFyIHN0OmFueTtcclxuICAgICAgICBpZihmaWxlIT1udWxsKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZvLi4uXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlLm5hbWUpO1xyXG4gICAgICAgICAgIHN0ID0gZmlsZS5yZWFkVGV4dFN5bmMoKTtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==