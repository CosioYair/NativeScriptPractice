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
        console.log(args.newIndex);
        console.log(this.warehouse);
        console.log(constants_config_1.CONSTANTS.warehouses[args.newIndex]["code"] + " " + constants_config_1.CONSTANTS.warehouses[args.newIndex]["name"]);
        warehouseCode = constants_config_1.CONSTANTS.warehouses[args.newIndex]["code"];
        this.inventoryWarehouse();
        this.inventoryList = this._inventoryService.getInventoryWarehouseII(warehouseCode);
    };
    ItemInquiryComponent.prototype.inventoryWarehouse = function () {
        var _this = this;
        this.inventoryList.map(function (product) {
            // console.log(product.ItemCode+" "+product.QuantityOnHand);
            if (_this.selectedProduct.ItemCode === product.ItemCode) {
                _this.onHand = product.QuantityOnHand;
                _this.onSOBO = product.QuantityOnSalesOrder;
                _this.onPO = product.QuantityOnPurchaseOrder;
                _this.available = _this.onHand - _this.onSOBO;
                if (_this.available < 0) {
                    _this.available = 0;
                }
            }
            //console.log(product.ItemCode+" "+this.selectedProduct.ItemCode+ " Hola");
        });
        //console.log(this.selectedProduct.ItemCode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUEwRjtBQUMxRiw0REFBNkQ7QUFDN0Qsc0VBQW9FO0FBR3BFLDJFQUE2RDtBQUM3RCxzRUFBb0U7QUFFcEUsa0VBQTBEO0FBQzFELDhEQUE0RDtBQU01RCx1Q0FBdUM7QUFDdkM7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBWUY7SUErQkksOEJBQW9CLGlCQUFtQyxFQUMzQyxlQUErQixFQUMvQixjQUE4QixFQUM5QixhQUEyQixFQUMzQixpQkFBbUM7UUFKL0MsaUJBa0NDO1FBbENtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQWpDdkMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUM1QixnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Ysb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBRXJCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBTXhCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR3hCLE1BQU07UUFDQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFFeEMsWUFBWTtRQUNMLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixTQUFJLEdBQVcsQ0FB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LENBQUM7b0JBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0wsQ0FBQztZQUNELDJFQUEyRTtRQUMvRSxDQUFDLENBQUMsQ0FBQTtRQUNGLDZDQUE2QztJQUNqRCxDQUFDO0lBRU0sNENBQWEsR0FBcEIsVUFBcUIsUUFBUTtRQUE3QixpQkFRQztRQVBHLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztZQUN4QixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNsQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQXBQUSxvQkFBb0I7UUFSaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FrQ3lDLG9DQUFnQjtZQUMxQiw2QkFBYztZQUNmLDRDQUFjO1lBQ2YsNEJBQVk7WUFDUixvQ0FBZ0I7T0FuQ3RDLG9CQUFvQixDQXFQaEM7SUFBRCwyQkFBQztDQUFBLEFBclBELElBcVBDO0FBclBZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2l0ZW1JbnF1aXJ5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZXR1cEl0ZW1WaWV3QXJncyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW52ZW50b3J5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbnN0YW50cy5jb25maWdcIjtcclxuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IFZhbHVlTGlzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbi8vaW1wb3J0IHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgaHR0cFxyXG4vKlxyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5cclxuLy9Eb3dubG9hZCBQcm9ncmVzc1xyXG5pbXBvcnQgeyBEb3dubG9hZFByb2dyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kb3dubG9hZC1wcm9ncmVzc1wiXHJcbi8vVW56aXBcclxuaW1wb3J0IHsgWmlwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC16aXBcIjtcclxuaW1wb3J0ICogYXMgZnN1eiBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuLy9JbWFnZSBDYWNoZVxyXG5pbXBvcnQgKiBhcyBpbWFnZUNhY2hlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlLWNhY2hlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuLy9PcGVuIGxvY2FsIGpzb25cclxuXHJcbiovXHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbUlucXVpcnlcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1JbnF1aXJ5LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtSW5xdWlyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwicHJvZHVjdFwiO1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICBwdWJsaWMgZGF0YSA9IHt9O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgaXRlbUNvZGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlczogYW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBhbnk7XHJcbiAgICBwdWJsaWMgc3RkVW5pdFByaWNlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0ZFVuaXRDb3N0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vb2J0ZW5jaW9uIGRlIGltYWdlblxyXG4gICAgcHVibGljIHBpY3R1cmU6IGFueTtcclxuICAgIHB1YmxpYyB1cmxJbWFnZTogYW55O1xyXG4gICAgcHVibGljIHN0YXJ0R2V0SW1hZ2U6IDA7XHJcbiAgICBwdWJsaWMgZW5kR2V0SW1hZ2UgPSA4MDtcclxuICAgIHB1YmxpYyBwYXRoOiBhbnk7XHJcblxyXG4gICAgLy9uZ2lmXHJcbiAgICBwdWJsaWMgaXNWaXNpYmxlRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzVmlzaWJsZVNjYW5uZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8vYmFyY29kZWltcFxyXG4gICAgcHVibGljIG9uSGFuZDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBvblNPQk86IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgb25QTzogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhdmFpbGFibGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgaW52ZW50b3J5TGlzdDogT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4oKTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBfaW1hZ2VTZXJ2aWNlOiBJbWFnZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSwgKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSB7XHJcbiAgICAgICAgICAgIEl0ZW1Db2RlOiBcIlwiLFxyXG4gICAgICAgICAgICBJdGVtQ29kZURlc2M6IFwiXCIsXHJcbiAgICAgICAgICAgIEluYWN0aXZlSXRlbTogXCJcIixcclxuICAgICAgICAgICAgSXRlbVR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgIFNoaXBXZWlnaHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFZvbHVtZTogXCJcIixcclxuICAgICAgICAgICAgU3RhbmRhcmRVbml0Q29zdDogXCJcIixcclxuICAgICAgICAgICAgU3RhbmRhcmRVbml0UHJpY2U6IFwiXCIsXHJcbiAgICAgICAgICAgIFByaW1hcnlWZW5kb3JObzogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnkxOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTI6IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5MzogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnk0OiBcIlwiLFxyXG4gICAgICAgICAgICBQcm9kdWN0TGluZTogXCJcIixcclxuICAgICAgICAgICAgUHJvZHVjdFR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgIEV4dGVuZGVkRGVzY3JpcHRpb25UZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICBJbWFnZUZpbGU6IFwiXCIsXHJcbiAgICAgICAgICAgIExhc3RTb2xkRGF0ZTogXCJcIixcclxuICAgICAgICAgICAgRGF0ZUNyZWF0ZWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIERhdGVVcGRhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBUaW1lVXBkYXRlZDogXCJcIixcclxuICAgICAgICAgICAgVGltZUNyZWF0ZWQ6IFwiXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gXCJcIjtcclxuICAgICAgICBDT05TVEFOVFMud2FyZWhvdXNlcy5tYXAod2FyZWhvdXNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy53YXJlaG91c2VzLnB1c2god2FyZWhvdXNlLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgICAgICAvL3RoaXMuc2V0SW52ZW50b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2R1Y3RzKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREb2N1bWVudCgpIHtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudCh0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBkb2NbdGhpcy5fZG9jSWRdO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZFByb2R1Y3QocHJvZHVjdDogUHJvZHVjdCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICB0aGlzLnN0ZFVuaXRQcmljZSA9ICh0aGlzLnNlbGVjdGVkUHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSkudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLnN0ZFVuaXRDb3N0ID0gKHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdENvc3QpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgLy90aGlzLmRvd25sb2FkSW1hZ2VzUHJvZHVjdHModGhpcy5wcm9kdWN0TGlzdCk7XHJcbiAgICAgICAgLy90aGlzLmdldEltYWdlKHByb2R1Y3QpO1xyXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuc2hvd0ltYWdlTG9jYWwocHJvZHVjdCk7XHJcbiAgICAgICAgLy90aGlzLnBpY3R1cmUgPSBgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtwcm9kdWN0Lkl0ZW1Db2RlfWA7XHJcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZShwcm9kdWN0KTtcclxuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGVEYXRhID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlU2Nhbm5lciA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmludmVudG9yeVdhcmVob3VzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5jZWwoKSB7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGVEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGVTY2FubmVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb24oKSB7XHJcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dDtcclxuICAgICAgICB2YXIgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAoZGVzY3JpcHRpb24pLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQWNjZXB0XCJcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2NhbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLndhcmVob3VzZXMpO1xyXG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXHJcbiAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSxcclxuICAgICAgICAgICAgdG9yY2hPbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJvcmllbnRhdGlvblwiLFxyXG4gICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNvZGUgPSByZXN1bHQudGV4dDtcclxuICAgICAgICAgICAgLy90aGlzLnZhbGlkYXRlUHJvZHVjdExpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFByb2R1Y3QodGhpcy5maW5kQnlTY2FubmVyKHRoaXMuaXRlbUNvZGUpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pdGVtQ29kZSk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gc2Nhbm5pbmcgXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qcHVibGljIGdldEltYWdlcygpIHtcclxuICAgICAgICAvKnRoaXMucHJvZHVjdExpc3QubWFwKGFzeW5jIHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5faW1hZ2VTZXJ2aWNlLmdldEltYWdlKHByb2R1Y3QuSXRlbUNvZGUpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShyZXMudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIGAke3Byb2R1Y3QuSXRlbUNvZGV9LnBuZ2ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gaW1nLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSpcclxuICAgIHB1YmxpYyBsaXN0SW1hZ2UoKXtcclxuICAgICAgICB2YXIgaT0wLCBjb250PSAwLCBjb250Q29sbD0wO1xyXG4gICAgICAgIHZhciBjb2xsZXRpb25zID0gMDtcclxuICAgICAgICB2YXIgcmVzaWR1ZSA9IDA7XHJcbiAgICAgICAgdmFyIGxlbmdodCA9IDA7XHJcbiAgICAgICAgdmFyIGNvdW50RG93biA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHVybFNlcnZpY2UgPSBcImh0dHBzOi8vbXNzLmludC1mdXJuZGlyZWN0LmNvbTozNzE4MC9hcGkvSW1hZ2VzLmpzb24/SXRlbUNvZGVzPVwiIDtcclxuICAgICAgICB2YXIgcGFyYW1ldGVyczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnNsaWNlKDAsMTApLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCl7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzK3Byb2R1Y3QuSXRlbUNvZGUrXCIsXCI7ICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1ldGVycyk7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VTZXJ2aWNlLmRvd25sb2FkUHJvZ3Jlc3ModXJsU2VydmljZStwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3Blbkpzb24oKXtcclxuICAgICAgICB2YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHZhciBmaWxlID0gZG9jdW1lbnRzLmdldEZpbGUoXCJpbWFnZXMuanNvblwiKTtcclxuICAgICAgICB2YXIgc3Q6YW55O1xyXG4gICAgICAgIGlmKGZpbGUhPW51bGwpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFyY2hpdm8uLi5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgc3QgPSBmaWxlLnJlYWRUZXh0U3luYygpO1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIHB1YmxpYyBvbmNoYW5nZVdhcmVob3VzZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCB3YXJlaG91c2VDb2RlOiBhbnk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy53YXJlaG91c2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKENPTlNUQU5UUy53YXJlaG91c2VzW2FyZ3MubmV3SW5kZXhdW1wiY29kZVwiXSArIFwiIFwiICsgQ09OU1RBTlRTLndhcmVob3VzZXNbYXJncy5uZXdJbmRleF1bXCJuYW1lXCJdKTtcclxuICAgICAgICB3YXJlaG91c2VDb2RlID0gQ09OU1RBTlRTLndhcmVob3VzZXNbYXJncy5uZXdJbmRleF1bXCJjb2RlXCJdO1xyXG4gICAgICAgIHRoaXMuaW52ZW50b3J5V2FyZWhvdXNlKCk7XHJcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlMaXN0ID0gdGhpcy5faW52ZW50b3J5U2VydmljZS5nZXRJbnZlbnRvcnlXYXJlaG91c2VJSSh3YXJlaG91c2VDb2RlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGludmVudG9yeVdhcmVob3VzZSgpIHsgXHJcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdC5JdGVtQ29kZStcIiBcIitwcm9kdWN0LlF1YW50aXR5T25IYW5kKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9kdWN0Lkl0ZW1Db2RlID09PSBwcm9kdWN0Lkl0ZW1Db2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZCA9IHByb2R1Y3QuUXVhbnRpdHlPbkhhbmQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU09CTyA9IHByb2R1Y3QuUXVhbnRpdHlPblNhbGVzT3JkZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUE8gPSBwcm9kdWN0LlF1YW50aXR5T25QdXJjaGFzZU9yZGVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgPSB0aGlzLm9uSGFuZCAtIHRoaXMub25TT0JPO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hdmFpbGFibGU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocHJvZHVjdC5JdGVtQ29kZStcIiBcIit0aGlzLnNlbGVjdGVkUHJvZHVjdC5JdGVtQ29kZSsgXCIgSG9sYVwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kQnlTY2FubmVyKGl0ZW1Db2RlKXtcclxuICAgICAgICB2YXIgb2JqU2Nhbm5lZDogYW55O1xyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QubWFwKHByb2R1Y3QgPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXRlbUNvZGUgPT0gcHJvZHVjdC5JdGVtQ29kZSl7XHJcbiAgICAgICAgICAgICAgICBvYmpTY2FubmVkID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvYmpTY2FubmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=