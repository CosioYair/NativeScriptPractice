"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var item_service_1 = require("../../services/item.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var inventory_service_1 = require("../../services/inventory.service");
var constants_config_1 = require("../../config/constants.config");
var image_service_1 = require("../../services/image.service");
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
    function ItemInquiryComponent(_couchbaseService, _productService, barcodeScanner, _imageService, _inventoryService) {
        var _this = this;
        this._couchbaseService = _couchbaseService;
        this._productService = _productService;
        this.barcodeScanner = barcodeScanner;
        this._imageService = _imageService;
        this._inventoryService = _inventoryService;
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
        //barcodeimp
        this.onHand = 0;
        this.onSOBO = 0;
        this.onPO = 0;
        this.available = 0;
        this.inventoryList = new observable_array_1.ObservableArray();
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
        this.inventoryList = this._inventoryService.getInventoryWarehouse(constants_config_1.CONSTANTS.warehouses[0]["code"]);
        this.inventoryWarehouse();
    }
    ItemInquiryComponent.prototype.ngOnInit = function () {
        this.setDocument();
        //this.setInventory();
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
        this.inventoryWarehouse();
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
            _this.setSelectedProduct(_this.findByScanner(_this.itemCode));
            console.log(_this.itemCode);
        }, function (errorMessage) {
            console.log("Error when scanning " + errorMessage);
        });
    };
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    /*public getImages() {
        /*this.productList.map(async product => {
            if (product.ImageFile != null) {
                await this._imageService.getImage(product.ItemCode).then(res => {
                    const img = imageSource.fromFile(res.toString());
                    const folder = fs.knownFolders.documents();
                    const path = fs.path.join(folder.path, `${product.ItemCode}.png`);
                    const saved = img.saveToFile(path, "png");
                });
            }
        });
    }*
    public listImage(){
        var i=0, cont= 0, contColl=0;
        var colletions = 0;
        var residue = 0;
        var lenght = 0;
        var countDown = 0;
        
        var urlService = "https://mss.int-furndirect.com:37180/api/Images.json?ItemCodes=" ;
        var parameters: string = "";
        this.productList.slice(0,10).map(product => {
            if(product.ImageFile != null){
                parameters = parameters+product.ItemCode+",";
            }
        });
        console.log(parameters);
        this._imageService.downloadProgress(urlService+parameters);
    }

    public openJson(){
        var documents = fs.knownFolders.documents();
        var file = documents.getFile("images.json");
        var st:any;
        if(file!=null){
            console.log("Archivo...");
            console.log(file.name);
           st = file.readTextSync();
           console.log(file);
        }
    }*/
    /////////////////////////////////////
    ////////////////////////////////////
    ItemInquiryComponent.prototype.onchangeWarehouse = function (args) {
        var warehouseCode;
        warehouseCode = constants_config_1.CONSTANTS.warehouses[args.newIndex]["code"];
        this.inventoryList = this._inventoryService.getInventoryWarehouse(warehouseCode);
        this.inventoryWarehouse();
    };
    ItemInquiryComponent.prototype.inventoryWarehouse = function () {
        var _this = this;
        this.inventoryList.map(function (product) {
            var quantityAvail = product.QuantityOnHand - product.QuantityOnSalesOrder;
            if (_this.selectedProduct.ItemCode === product.ItemCode) {
                _this.onHand = product.QuantityOnHand;
                _this.onSOBO = product.QuantityOnSalesOrder;
                _this.onPO = product.QuantityOnPurchaseOrder;
                _this.available = quantityAvail < 0 ? 0 : quantityAvail;
            }
        });
    };
    ItemInquiryComponent.prototype.findByScanner = function (itemCode) {
        var _this = this;
        var objScanned;
        this.productList.map(function (product) {
            if (_this.itemCode == product.ItemCode) {
                objScanned = product;
            }
        });
        return objScanned;
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
            image_service_1.ImageService,
            inventory_service_1.InventoryService])
    ], ItemInquiryComponent);
    return ItemInquiryComponent;
}());
exports.ItemInquiryComponent = ItemInquiryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUEwRjtBQUMxRiw0REFBNkQ7QUFDN0Qsc0VBQW9FO0FBR3BFLDJFQUE2RDtBQUM3RCxzRUFBb0U7QUFFcEUsa0VBQTBEO0FBQzFELDhEQUE0RDtBQU01RCx1Q0FBdUM7QUFDdkM7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBWUY7SUErQkksOEJBQW9CLGlCQUFtQyxFQUMzQyxlQUErQixFQUMvQixjQUE4QixFQUM5QixhQUEyQixFQUMzQixpQkFBbUM7UUFKL0MsaUJBcUNDO1FBckNtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQWpDdkMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUM1QixnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Ysb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFNeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHeEIsTUFBTTtRQUNDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUV4QyxZQUFZO1FBQ0wsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixXQUFNLEdBQVcsQ0FB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QkFRQztRQVBHLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztZQUN4QixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNsQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQS9PUSxvQkFBb0I7UUFSaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FrQ3lDLG9DQUFnQjtZQUMxQiw2QkFBYztZQUNmLDRDQUFjO1lBQ2YsNEJBQVk7WUFDUixvQ0FBZ0I7T0FuQ3RDLG9CQUFvQixDQWdQaEM7SUFBRCwyQkFBQztDQUFBLEFBaFBELElBZ1BDO0FBaFBZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2l0ZW1JbnF1aXJ5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZXR1cEl0ZW1WaWV3QXJncyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW52ZW50b3J5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbnN0YW50cy5jb25maWdcIjtcclxuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IFZhbHVlTGlzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbi8vaW1wb3J0IHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgaHR0cFxyXG4vKlxyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5cclxuLy9Eb3dubG9hZCBQcm9ncmVzc1xyXG5pbXBvcnQgeyBEb3dubG9hZFByb2dyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kb3dubG9hZC1wcm9ncmVzc1wiXHJcbi8vVW56aXBcclxuaW1wb3J0IHsgWmlwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC16aXBcIjtcclxuaW1wb3J0ICogYXMgZnN1eiBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuLy9JbWFnZSBDYWNoZVxyXG5pbXBvcnQgKiBhcyBpbWFnZUNhY2hlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlLWNhY2hlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuLy9PcGVuIGxvY2FsIGpzb25cclxuXHJcbiovXHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbUlucXVpcnlcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1JbnF1aXJ5LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtSW5xdWlyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwicHJvZHVjdFwiO1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICBwdWJsaWMgZGF0YSA9IHt9O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgaXRlbUNvZGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlczogYW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBhbnkgPSAwO1xyXG4gICAgcHVibGljIHN0ZFVuaXRQcmljZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGRVbml0Q29zdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvL29idGVuY2lvbiBkZSBpbWFnZW5cclxuICAgIHB1YmxpYyBwaWN0dXJlOiBhbnk7XHJcbiAgICBwdWJsaWMgdXJsSW1hZ2U6IGFueTtcclxuICAgIHB1YmxpYyBzdGFydEdldEltYWdlOiAwO1xyXG4gICAgcHVibGljIGVuZEdldEltYWdlID0gODA7XHJcbiAgICBwdWJsaWMgcGF0aDogYW55O1xyXG5cclxuICAgIC8vbmdpZlxyXG4gICAgcHVibGljIGlzVmlzaWJsZURhdGE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc1Zpc2libGVTY2FubmVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvL2JhcmNvZGVpbXBcclxuICAgIHB1YmxpYyBvbkhhbmQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgb25TT0JPOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIG9uUE86IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYXZhaWxhYmxlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGludmVudG9yeUxpc3Q6IE9ic2VydmFibGVBcnJheTxJbnZlbnRvcnk+ID0gbmV3IE9ic2VydmFibGVBcnJheTxJbnZlbnRvcnk+KCk7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgYmFyY29kZVNjYW5uZXI6IEJhcmNvZGVTY2FubmVyLFxyXG4gICAgICAgIHByaXZhdGUgX2ltYWdlU2VydmljZTogSW1hZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2ludmVudG9yeVNlcnZpY2U6IEludmVudG9yeVNlcnZpY2UsICkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0ge1xyXG4gICAgICAgICAgICBJdGVtQ29kZTogXCJcIixcclxuICAgICAgICAgICAgSXRlbUNvZGVEZXNjOiBcIlwiLFxyXG4gICAgICAgICAgICBJbmFjdGl2ZUl0ZW06IFwiXCIsXHJcbiAgICAgICAgICAgIEl0ZW1UeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBTaGlwV2VpZ2h0OiBcIlwiLFxyXG4gICAgICAgICAgICBWb2x1bWU6IFwiXCIsXHJcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdENvc3Q6IFwiXCIsXHJcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdFByaWNlOiBcIlwiLFxyXG4gICAgICAgICAgICBQcmltYXJ5VmVuZG9yTm86IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5MTogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnkyOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTM6IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5NDogXCJcIixcclxuICAgICAgICAgICAgUHJvZHVjdExpbmU6IFwiXCIsXHJcbiAgICAgICAgICAgIFByb2R1Y3RUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBFeHRlbmRlZERlc2NyaXB0aW9uVGV4dDogXCJcIixcclxuICAgICAgICAgICAgSW1hZ2VGaWxlOiBcIlwiLFxyXG4gICAgICAgICAgICBMYXN0U29sZERhdGU6IFwiXCIsXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcclxuICAgICAgICAgICAgVGltZVVwZGF0ZWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFRpbWVDcmVhdGVkOiBcIlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMucGljdHVyZSA9IFwiXCI7XHJcbiAgICAgICAgQ09OU1RBTlRTLndhcmVob3VzZXMubWFwKHdhcmVob3VzZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2FyZWhvdXNlcy5wdXNoKHdhcmVob3VzZS5uYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlMaXN0ID0gdGhpcy5faW52ZW50b3J5U2VydmljZS5nZXRJbnZlbnRvcnlXYXJlaG91c2UoQ09OU1RBTlRTLndhcmVob3VzZXNbMF1bXCJjb2RlXCJdKTtcclxuICAgICAgICB0aGlzLmludmVudG9yeVdhcmVob3VzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgICAgICAvL3RoaXMuc2V0SW52ZW50b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2R1Y3RzKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREb2N1bWVudCgpIHtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudCh0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBkb2NbdGhpcy5fZG9jSWRdO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZFByb2R1Y3QocHJvZHVjdDogUHJvZHVjdCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICB0aGlzLnN0ZFVuaXRQcmljZSA9ICh0aGlzLnNlbGVjdGVkUHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnN0ZFVuaXRDb3N0ID0gKHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdENvc3QpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgLy90aGlzLmRvd25sb2FkSW1hZ2VzUHJvZHVjdHModGhpcy5wcm9kdWN0TGlzdCk7XHJcbiAgICAgICAgLy90aGlzLmdldEltYWdlKHByb2R1Y3QpO1xyXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuc2hvd0ltYWdlTG9jYWwocHJvZHVjdCk7XHJcbiAgICAgICAgLy90aGlzLnBpY3R1cmUgPSBgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0Lkl0ZW1Db2RlfWA7XHJcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZShwcm9kdWN0KTtcclxuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGVEYXRhID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlU2Nhbm5lciA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmludmVudG9yeVdhcmVob3VzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5jZWwoKSB7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGVEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGVTY2FubmVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb24oKSB7XHJcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dDtcclxuICAgICAgICB2YXIgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAoZGVzY3JpcHRpb24pLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQWNjZXB0XCJcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2NhbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLndhcmVob3VzZXMpO1xyXG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXHJcbiAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSxcclxuICAgICAgICAgICAgdG9yY2hPbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJvcmllbnRhdGlvblwiLFxyXG4gICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNvZGUgPSByZXN1bHQudGV4dDtcclxuICAgICAgICAgICAgLy90aGlzLnZhbGlkYXRlUHJvZHVjdExpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFByb2R1Y3QodGhpcy5maW5kQnlTY2FubmVyKHRoaXMuaXRlbUNvZGUpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pdGVtQ29kZSk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gc2Nhbm5pbmcgXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qcHVibGljIGdldEltYWdlcygpIHtcclxuICAgICAgICAvKnRoaXMucHJvZHVjdExpc3QubWFwKGFzeW5jIHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5faW1hZ2VTZXJ2aWNlLmdldEltYWdlKHByb2R1Y3QuSXRlbUNvZGUpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShyZXMudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIGAke3Byb2R1Y3QuSXRlbUNvZGV9LnBuZ2ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gaW1nLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSpcclxuICAgIHB1YmxpYyBsaXN0SW1hZ2UoKXtcclxuICAgICAgICB2YXIgaT0wLCBjb250PSAwLCBjb250Q29sbD0wO1xyXG4gICAgICAgIHZhciBjb2xsZXRpb25zID0gMDtcclxuICAgICAgICB2YXIgcmVzaWR1ZSA9IDA7XHJcbiAgICAgICAgdmFyIGxlbmdodCA9IDA7XHJcbiAgICAgICAgdmFyIGNvdW50RG93biA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHVybFNlcnZpY2UgPSBcImh0dHBzOi8vbXNzLmludC1mdXJuZGlyZWN0LmNvbTozNzE4MC9hcGkvSW1hZ2VzLmpzb24/SXRlbUNvZGVzPVwiIDtcclxuICAgICAgICB2YXIgcGFyYW1ldGVyczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnNsaWNlKDAsMTApLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCl7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzK3Byb2R1Y3QuSXRlbUNvZGUrXCIsXCI7ICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VTZXJ2aWNlLmRvd25sb2FkUHJvZ3Jlc3ModXJsU2VydmljZStwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3Blbkpzb24oKXtcclxuICAgICAgICB2YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHZhciBmaWxlID0gZG9jdW1lbnRzLmdldEZpbGUoXCJpbWFnZXMuanNvblwiKTtcclxuICAgICAgICB2YXIgc3Q6YW55O1xyXG4gICAgICAgIGlmKGZpbGUhPW51bGwpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFyY2hpdm8uLi5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgc3QgPSBmaWxlLnJlYWRUZXh0U3luYygpO1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIHB1YmxpYyBvbmNoYW5nZVdhcmVob3VzZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCB3YXJlaG91c2VDb2RlOiBhbnk7XHJcbiAgICAgICAgd2FyZWhvdXNlQ29kZSA9IENPTlNUQU5UUy53YXJlaG91c2VzW2FyZ3MubmV3SW5kZXhdW1wiY29kZVwiXTtcclxuICAgICAgICB0aGlzLmludmVudG9yeUxpc3QgPSB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLmdldEludmVudG9yeVdhcmVob3VzZSh3YXJlaG91c2VDb2RlKTtcclxuICAgICAgICB0aGlzLmludmVudG9yeVdhcmVob3VzZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaW52ZW50b3J5V2FyZWhvdXNlKCkgeyBcclxuICAgICAgICB0aGlzLmludmVudG9yeUxpc3QubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcXVhbnRpdHlBdmFpbCA9IHByb2R1Y3QuUXVhbnRpdHlPbkhhbmQgLSBwcm9kdWN0LlF1YW50aXR5T25TYWxlc09yZGVyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPT09IHByb2R1Y3QuSXRlbUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kID0gcHJvZHVjdC5RdWFudGl0eU9uSGFuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TT0JPID0gcHJvZHVjdC5RdWFudGl0eU9uU2FsZXNPcmRlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMub25QTyA9IHByb2R1Y3QuUXVhbnRpdHlPblB1cmNoYXNlT3JkZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZSA9IHF1YW50aXR5QXZhaWwgPCAwID8gMCA6IHF1YW50aXR5QXZhaWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluZEJ5U2Nhbm5lcihpdGVtQ29kZSl7XHJcbiAgICAgICAgdmFyIG9ialNjYW5uZWQ6IGFueTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0Lm1hcChwcm9kdWN0ID0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLml0ZW1Db2RlID09IHByb2R1Y3QuSXRlbUNvZGUpe1xyXG4gICAgICAgICAgICAgICAgb2JqU2Nhbm5lZCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb2JqU2Nhbm5lZDtcclxuICAgIH1cclxufVxyXG5cclxuIl19