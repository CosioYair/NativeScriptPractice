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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUEwRjtBQUMxRiw0REFBNkQ7QUFDN0Qsc0VBQW9FO0FBR3BFLDJFQUE2RDtBQUM3RCxzRUFBb0U7QUFFcEUsa0VBQTBEO0FBQzFELDhEQUE0RDtBQU01RCx1Q0FBdUM7QUFDdkM7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBWUY7SUErQkksOEJBQW9CLGlCQUFtQyxFQUMzQyxlQUErQixFQUMvQixjQUE4QixFQUM5QixhQUEyQixFQUMzQixpQkFBbUM7UUFKL0MsaUJBa0NDO1FBbENtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQWpDdkMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUM1QixnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Ysb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBRXJCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBTXhCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR3hCLE1BQU07UUFDQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFFeEMsWUFBWTtRQUNMLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixTQUFJLEdBQVcsQ0FB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LENBQUM7b0JBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0wsQ0FBQztZQUNELDJFQUEyRTtRQUMvRSxDQUFDLENBQUMsQ0FBQTtRQUNGLDZDQUE2QztJQUNqRCxDQUFDO0lBRU0sNENBQWEsR0FBcEIsVUFBcUIsUUFBUTtRQUE3QixpQkFRQztRQVBHLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztZQUN4QixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNsQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQXBQUSxvQkFBb0I7UUFSaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FrQ3lDLG9DQUFnQjtZQUMxQiw2QkFBYztZQUNmLDRDQUFjO1lBQ2YsNEJBQVk7WUFDUixvQ0FBZ0I7T0FuQ3RDLG9CQUFvQixDQXFQaEM7SUFBRCwyQkFBQztDQUFBLEFBclBELElBcVBDO0FBclBZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pdGVtSW5xdWlyeS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTZXR1cEl0ZW1WaWV3QXJncyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzXCI7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcbmltcG9ydCB7IEludmVudG9yeSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludmVudG9yeS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi9jb25maWcvY29uc3RhbnRzLmNvbmZpZ1wiO1xuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xuaW1wb3J0IHsgVmFsdWVMaXN0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbi8vaW1wb3J0IHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgaHR0cFxuLypcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcblxuLy9Eb3dubG9hZCBQcm9ncmVzc1xuaW1wb3J0IHsgRG93bmxvYWRQcm9ncmVzcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZG93bmxvYWQtcHJvZ3Jlc3NcIlxuLy9VbnppcFxuaW1wb3J0IHsgWmlwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC16aXBcIjtcbmltcG9ydCAqIGFzIGZzdXogZnJvbSBcImZpbGUtc3lzdGVtXCI7XG4vL0ltYWdlIENhY2hlXG5pbXBvcnQgKiBhcyBpbWFnZUNhY2hlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlLWNhY2hlXCI7XG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XG4vL09wZW4gbG9jYWwganNvblxuXG4qL1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbUlucXVpcnlcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50LmNzc1wiXVxufSlcblxuXG5leHBvcnQgY2xhc3MgSXRlbUlucXVpcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgX3Byb2R1Y3RzOiBhbnk7XG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwicHJvZHVjdFwiO1xuICAgIHB1YmxpYyBwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xuICAgIHB1YmxpYyBkYXRhID0ge307XG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XG4gICAgcHVibGljIGl0ZW1Db2RlOiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyB3YXJlaG91c2VzOiBhbnkgPSBbXTtcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBhbnk7XG4gICAgcHVibGljIHN0ZFVuaXRQcmljZTogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgc3RkVW5pdENvc3Q6IG51bWJlciA9IDA7XG5cbiAgICAvL29idGVuY2lvbiBkZSBpbWFnZW5cbiAgICBwdWJsaWMgcGljdHVyZTogYW55O1xuICAgIHB1YmxpYyB1cmxJbWFnZTogYW55O1xuICAgIHB1YmxpYyBzdGFydEdldEltYWdlOiAwO1xuICAgIHB1YmxpYyBlbmRHZXRJbWFnZSA9IDgwO1xuICAgIHB1YmxpYyBwYXRoOiBhbnk7XG5cbiAgICAvL25naWZcbiAgICBwdWJsaWMgaXNWaXNpYmxlRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc1Zpc2libGVTY2FubmVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8vYmFyY29kZWltcFxuICAgIHB1YmxpYyBvbkhhbmQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG9uU09CTzogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgb25QTzogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgYXZhaWxhYmxlOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBpbnZlbnRvcnlMaXN0OiBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PigpO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYmFyY29kZVNjYW5uZXI6IEJhcmNvZGVTY2FubmVyLFxuICAgICAgICBwcml2YXRlIF9pbWFnZVNlcnZpY2U6IEltYWdlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSwgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0ge1xuICAgICAgICAgICAgSXRlbUNvZGU6IFwiXCIsXG4gICAgICAgICAgICBJdGVtQ29kZURlc2M6IFwiXCIsXG4gICAgICAgICAgICBJbmFjdGl2ZUl0ZW06IFwiXCIsXG4gICAgICAgICAgICBJdGVtVHlwZTogXCJcIixcbiAgICAgICAgICAgIFNoaXBXZWlnaHQ6IFwiXCIsXG4gICAgICAgICAgICBWb2x1bWU6IFwiXCIsXG4gICAgICAgICAgICBTdGFuZGFyZFVuaXRDb3N0OiBcIlwiLFxuICAgICAgICAgICAgU3RhbmRhcmRVbml0UHJpY2U6IFwiXCIsXG4gICAgICAgICAgICBQcmltYXJ5VmVuZG9yTm86IFwiXCIsXG4gICAgICAgICAgICBDYXRlZ29yeTE6IFwiXCIsXG4gICAgICAgICAgICBDYXRlZ29yeTI6IFwiXCIsXG4gICAgICAgICAgICBDYXRlZ29yeTM6IFwiXCIsXG4gICAgICAgICAgICBDYXRlZ29yeTQ6IFwiXCIsXG4gICAgICAgICAgICBQcm9kdWN0TGluZTogXCJcIixcbiAgICAgICAgICAgIFByb2R1Y3RUeXBlOiBcIlwiLFxuICAgICAgICAgICAgRXh0ZW5kZWREZXNjcmlwdGlvblRleHQ6IFwiXCIsXG4gICAgICAgICAgICBJbWFnZUZpbGU6IFwiXCIsXG4gICAgICAgICAgICBMYXN0U29sZERhdGU6IFwiXCIsXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogXCJcIixcbiAgICAgICAgICAgIERhdGVVcGRhdGVkOiBcIlwiLFxuICAgICAgICAgICAgVGltZVVwZGF0ZWQ6IFwiXCIsXG4gICAgICAgICAgICBUaW1lQ3JlYXRlZDogXCJcIlxuICAgICAgICB9XG5cbiAgICAgICAgLy90aGlzLnBpY3R1cmUgPSBcIlwiO1xuICAgICAgICBDT05TVEFOVFMud2FyZWhvdXNlcy5tYXAod2FyZWhvdXNlID0+IHtcbiAgICAgICAgICAgIHRoaXMud2FyZWhvdXNlcy5wdXNoKHdhcmVob3VzZS5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcbiAgICAgICAgLy90aGlzLnNldEludmVudG9yeSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KHRoaXMuX2RvY0lkKTtcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBkb2NbdGhpcy5fZG9jSWRdO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvZHVjdHNbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZFByb2R1Y3QocHJvZHVjdDogUHJvZHVjdCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XG4gICAgICAgIHRoaXMuc3RkVW5pdFByaWNlID0gKHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKS50b0ZpeGVkKDIpO1xuICAgICAgICB0aGlzLnN0ZFVuaXRDb3N0ID0gKHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdENvc3QpLnRvRml4ZWQoMik7XG4gICAgICAgIC8vdGhpcy5kb3dubG9hZEltYWdlc1Byb2R1Y3RzKHRoaXMucHJvZHVjdExpc3QpO1xuICAgICAgICAvL3RoaXMuZ2V0SW1hZ2UocHJvZHVjdCk7XG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gXCJcIjtcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZUxvY2FsKHByb2R1Y3QpO1xuICAgICAgICAvL3RoaXMucGljdHVyZSA9IGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke3Byb2R1Y3QuSXRlbUNvZGV9YDtcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZShwcm9kdWN0KTtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlRGF0YSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGVEYXRhID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlU2Nhbm5lciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW52ZW50b3J5V2FyZWhvdXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGVEYXRhID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlU2Nhbm5lciA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc2NyaXB0aW9uKCkge1xuICAgICAgICB2YXIgZGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0O1xuICAgICAgICB2YXIgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiAoZGVzY3JpcHRpb24pLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkFjY2VwdFwiXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25TY2FuKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLndhcmVob3VzZXMpO1xuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xuICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcbiAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLFxuICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSxcbiAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLFxuICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJvcmllbnRhdGlvblwiLFxuICAgICAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZVxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNvZGUgPSByZXN1bHQudGV4dDtcbiAgICAgICAgICAgIC8vdGhpcy52YWxpZGF0ZVByb2R1Y3RMaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkUHJvZHVjdCh0aGlzLmZpbmRCeVNjYW5uZXIodGhpcy5pdGVtQ29kZSkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pdGVtQ29kZSk7XG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLypwdWJsaWMgZ2V0SW1hZ2VzKCkge1xuICAgICAgICAvKnRoaXMucHJvZHVjdExpc3QubWFwKGFzeW5jIHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9pbWFnZVNlcnZpY2UuZ2V0SW1hZ2UocHJvZHVjdC5JdGVtQ29kZSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShyZXMudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgYCR7cHJvZHVjdC5JdGVtQ29kZX0ucG5nYCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gaW1nLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0qXG4gICAgcHVibGljIGxpc3RJbWFnZSgpe1xuICAgICAgICB2YXIgaT0wLCBjb250PSAwLCBjb250Q29sbD0wO1xuICAgICAgICB2YXIgY29sbGV0aW9ucyA9IDA7XG4gICAgICAgIHZhciByZXNpZHVlID0gMDtcbiAgICAgICAgdmFyIGxlbmdodCA9IDA7XG4gICAgICAgIHZhciBjb3VudERvd24gPSAwO1xuICAgICAgICBcbiAgICAgICAgdmFyIHVybFNlcnZpY2UgPSBcImh0dHBzOi8vbXNzLmludC1mdXJuZGlyZWN0LmNvbTozNzE4MC9hcGkvSW1hZ2VzLmpzb24/SXRlbUNvZGVzPVwiIDtcbiAgICAgICAgdmFyIHBhcmFtZXRlcnM6IHN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMucHJvZHVjdExpc3Quc2xpY2UoMCwxMCkubWFwKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCl7ICAgICAgICBcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycytwcm9kdWN0Lkl0ZW1Db2RlK1wiLFwiOyAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtZXRlcnMpO1xuICAgICAgICB0aGlzLl9pbWFnZVNlcnZpY2UuZG93bmxvYWRQcm9ncmVzcyh1cmxTZXJ2aWNlK3BhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuSnNvbigpe1xuICAgICAgICB2YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xuICAgICAgICB2YXIgZmlsZSA9IGRvY3VtZW50cy5nZXRGaWxlKFwiaW1hZ2VzLmpzb25cIik7XG4gICAgICAgIHZhciBzdDphbnk7XG4gICAgICAgIGlmKGZpbGUhPW51bGwpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZvLi4uXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZS5uYW1lKTtcbiAgICAgICAgICAgc3QgPSBmaWxlLnJlYWRUZXh0U3luYygpO1xuICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlKTtcbiAgICAgICAgfVxuICAgIH0qL1xuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgcHVibGljIG9uY2hhbmdlV2FyZWhvdXNlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIGxldCB3YXJlaG91c2VDb2RlOiBhbnk7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MubmV3SW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLndhcmVob3VzZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKENPTlNUQU5UUy53YXJlaG91c2VzW2FyZ3MubmV3SW5kZXhdW1wiY29kZVwiXSArIFwiIFwiICsgQ09OU1RBTlRTLndhcmVob3VzZXNbYXJncy5uZXdJbmRleF1bXCJuYW1lXCJdKTtcbiAgICAgICAgd2FyZWhvdXNlQ29kZSA9IENPTlNUQU5UUy53YXJlaG91c2VzW2FyZ3MubmV3SW5kZXhdW1wiY29kZVwiXTtcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlXYXJlaG91c2UoKTtcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlMaXN0ID0gdGhpcy5faW52ZW50b3J5U2VydmljZS5nZXRJbnZlbnRvcnlXYXJlaG91c2VJSSh3YXJlaG91c2VDb2RlKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBpbnZlbnRvcnlXYXJlaG91c2UoKSB7IFxuICAgICAgICB0aGlzLmludmVudG9yeUxpc3QubWFwKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdC5JdGVtQ29kZStcIiBcIitwcm9kdWN0LlF1YW50aXR5T25IYW5kKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJvZHVjdC5JdGVtQ29kZSA9PT0gcHJvZHVjdC5JdGVtQ29kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kID0gcHJvZHVjdC5RdWFudGl0eU9uSGFuZDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU09CTyA9IHByb2R1Y3QuUXVhbnRpdHlPblNhbGVzT3JkZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5vblBPID0gcHJvZHVjdC5RdWFudGl0eU9uUHVyY2hhc2VPcmRlcjtcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZSA9IHRoaXMub25IYW5kIC0gdGhpcy5vblNPQk87XG4gICAgICAgICAgICAgICAgaWYodGhpcy5hdmFpbGFibGU8MCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByb2R1Y3QuSXRlbUNvZGUrXCIgXCIrdGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUrIFwiIEhvbGFcIik7XG4gICAgICAgIH0pXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaW5kQnlTY2FubmVyKGl0ZW1Db2RlKXtcbiAgICAgICAgdmFyIG9ialNjYW5uZWQ6IGFueTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5tYXAocHJvZHVjdCA9PntcbiAgICAgICAgICAgIGlmKHRoaXMuaXRlbUNvZGUgPT0gcHJvZHVjdC5JdGVtQ29kZSl7XG4gICAgICAgICAgICAgICAgb2JqU2Nhbm5lZCA9IHByb2R1Y3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JqU2Nhbm5lZDtcbiAgICB9XG59XG5cbiJdfQ==