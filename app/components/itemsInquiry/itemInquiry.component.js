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
        this.available = 20;
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
        console.log(args.newIndex);
        console.log(this.warehouse);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUEwRjtBQUMxRiw0REFBNkQ7QUFDN0Qsc0VBQW9FO0FBR3BFLDJFQUE2RDtBQUM3RCxzRUFBb0U7QUFFcEUsa0VBQTBEO0FBQzFELDhEQUE0RDtBQU01RCx1Q0FBdUM7QUFDdkM7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBWUY7SUE4QkksOEJBQW9CLGlCQUFtQyxFQUMzQyxlQUErQixFQUMvQixjQUE4QixFQUM5QixhQUEyQixFQUMzQixpQkFBbUM7UUFKL0MsaUJBa0NDO1FBbENtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQWhDdkMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUM1QixnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Ysb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFNeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHeEIsTUFBTTtRQUNDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUV4QyxZQUFZO1FBQ0wsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixXQUFNLEdBQVcsQ0FB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WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzdDLENBQUM7eUNBaUN5QyxvQ0FBZ0I7WUFDMUIsNkJBQWM7WUFDZiw0Q0FBYztZQUNmLDRCQUFZO1lBQ1Isb0NBQWdCO09BbEN0QyxvQkFBb0IsQ0FpTmhDO0lBQUQsMkJBQUM7Q0FBQSxBQWpORCxJQWlOQztBQWpOWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pdGVtSW5xdWlyeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2V0dXBJdGVtVmlld0FyZ3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludmVudG9yeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnXCI7XHJcbmltcG9ydCB7IEltYWdlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBWYWx1ZUxpc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG4vL2ltcG9ydCBwYXJhIGRlc2NhcmdhIGRlIGltYWdlbmVzIGh0dHBcclxuLypcclxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcclxuXHJcbi8vRG93bmxvYWQgUHJvZ3Jlc3NcclxuaW1wb3J0IHsgRG93bmxvYWRQcm9ncmVzcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZG93bmxvYWQtcHJvZ3Jlc3NcIlxyXG4vL1VuemlwXHJcbmltcG9ydCB7IFppcCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtemlwXCI7XHJcbmltcG9ydCAqIGFzIGZzdXogZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbi8vSW1hZ2UgQ2FjaGVcclxuaW1wb3J0ICogYXMgaW1hZ2VDYWNoZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZS1jYWNoZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbi8vT3BlbiBsb2NhbCBqc29uXHJcblxyXG4qL1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1JbnF1aXJ5XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtSW5xdWlyeS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2l0ZW1JbnF1aXJ5LmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbUlucXVpcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBfcHJvZHVjdHM6IGFueTtcclxuICAgIHByaXZhdGUgX2RvY0lkOiBzdHJpbmcgPSBcInByb2R1Y3RcIjtcclxuICAgIHB1YmxpYyBwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgcHVibGljIGRhdGEgPSB7fTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFByb2R1Y3Q6IGFueSA9IHt9O1xyXG4gICAgcHVibGljIGl0ZW1Db2RlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIHdhcmVob3VzZXM6IGFueSA9IFtdO1xyXG4gICAgcHVibGljIHdhcmVob3VzZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGRVbml0UHJpY2U6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RkVW5pdENvc3Q6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy9vYnRlbmNpb24gZGUgaW1hZ2VuXHJcbiAgICBwdWJsaWMgcGljdHVyZTogYW55O1xyXG4gICAgcHVibGljIHVybEltYWdlOiBhbnk7XHJcbiAgICBwdWJsaWMgc3RhcnRHZXRJbWFnZTogMDtcclxuICAgIHB1YmxpYyBlbmRHZXRJbWFnZSA9IDgwO1xyXG4gICAgcHVibGljIHBhdGg6IGFueTtcclxuXHJcbiAgICAvL25naWZcclxuICAgIHB1YmxpYyBpc1Zpc2libGVEYXRhOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNWaXNpYmxlU2Nhbm5lcjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLy9iYXJjb2RlaW1wXHJcbiAgICBwdWJsaWMgb25IYW5kOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIG9uU09CTzogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBvblBPOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGF2YWlsYWJsZTogbnVtYmVyID0gMjA7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgYmFyY29kZVNjYW5uZXI6IEJhcmNvZGVTY2FubmVyLFxyXG4gICAgICAgIHByaXZhdGUgX2ltYWdlU2VydmljZTogSW1hZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2ludmVudG9yeVNlcnZpY2U6IEludmVudG9yeVNlcnZpY2UsICkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0ge1xyXG4gICAgICAgICAgICBJdGVtQ29kZTogXCJcIixcclxuICAgICAgICAgICAgSXRlbUNvZGVEZXNjOiBcIlwiLFxyXG4gICAgICAgICAgICBJbmFjdGl2ZUl0ZW06IFwiXCIsXHJcbiAgICAgICAgICAgIEl0ZW1UeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBTaGlwV2VpZ2h0OiBcIlwiLFxyXG4gICAgICAgICAgICBWb2x1bWU6IFwiXCIsXHJcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdENvc3Q6IFwiXCIsXHJcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdFByaWNlOiBcIlwiLFxyXG4gICAgICAgICAgICBQcmltYXJ5VmVuZG9yTm86IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5MTogXCJcIixcclxuICAgICAgICAgICAgQ2F0ZWdvcnkyOiBcIlwiLFxyXG4gICAgICAgICAgICBDYXRlZ29yeTM6IFwiXCIsXHJcbiAgICAgICAgICAgIENhdGVnb3J5NDogXCJcIixcclxuICAgICAgICAgICAgUHJvZHVjdExpbmU6IFwiXCIsXHJcbiAgICAgICAgICAgIFByb2R1Y3RUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBFeHRlbmRlZERlc2NyaXB0aW9uVGV4dDogXCJcIixcclxuICAgICAgICAgICAgSW1hZ2VGaWxlOiBcIlwiLFxyXG4gICAgICAgICAgICBMYXN0U29sZERhdGU6IFwiXCIsXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcclxuICAgICAgICAgICAgVGltZVVwZGF0ZWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIFRpbWVDcmVhdGVkOiBcIlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMucGljdHVyZSA9IFwiXCI7XHJcbiAgICAgICAgQ09OU1RBTlRTLndhcmVob3VzZXMubWFwKHdhcmVob3VzZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2FyZWhvdXNlcy5wdXNoKHdhcmVob3VzZS5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldERvY3VtZW50KCk7XHJcbiAgICAgICAgLy90aGlzLnNldEludmVudG9yeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQodGhpcy5fZG9jSWQpO1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gZG9jW3RoaXMuX2RvY0lkXTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmIChzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9kdWN0c1tpbmRleF0uSXRlbUNvZGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKHRoaXMuX3Byb2R1Y3RzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgdGhpcy5zdGRVbml0UHJpY2UgPSAodGhpcy5zZWxlY3RlZFByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5zdGRVbml0Q29zdCA9ICh0aGlzLnNlbGVjdGVkUHJvZHVjdC5TdGFuZGFyZFVuaXRDb3N0KS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIC8vdGhpcy5kb3dubG9hZEltYWdlc1Byb2R1Y3RzKHRoaXMucHJvZHVjdExpc3QpO1xyXG4gICAgICAgIC8vdGhpcy5nZXRJbWFnZShwcm9kdWN0KTtcclxuICAgICAgICAvL3RoaXMucGljdHVyZSA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZUxvY2FsKHByb2R1Y3QpO1xyXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7cHJvZHVjdC5JdGVtQ29kZX1gO1xyXG4gICAgICAgIC8vdGhpcy5zaG93SW1hZ2UocHJvZHVjdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlRGF0YSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZURhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZVNjYW5uZXIgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZURhdGEgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZVNjYW5uZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbigpIHtcclxuICAgICAgICB2YXIgZGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0O1xyXG4gICAgICAgIHZhciBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IChkZXNjcmlwdGlvbiksXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJBY2NlcHRcIlxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TY2FuKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMud2FyZWhvdXNlcyk7XHJcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcclxuICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcclxuICAgICAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBiZWVwT25TY2FuOiB0cnVlLFxyXG4gICAgICAgICAgICB0b3JjaE9uOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcIm9yaWVudGF0aW9uXCIsXHJcbiAgICAgICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWVcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHJlc3VsdC50ZXh0O1xyXG4gICAgICAgICAgICAvL3RoaXMudmFsaWRhdGVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW1Db2RlKTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLypwdWJsaWMgZ2V0SW1hZ2VzKCkge1xyXG4gICAgICAgIC8qdGhpcy5wcm9kdWN0TGlzdC5tYXAoYXN5bmMgcHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9pbWFnZVNlcnZpY2UuZ2V0SW1hZ2UocHJvZHVjdC5JdGVtQ29kZSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHJlcy50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgYCR7cHJvZHVjdC5JdGVtQ29kZX0ucG5nYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2F2ZWQgPSBpbWcuc2F2ZVRvRmlsZShwYXRoLCBcInBuZ1wiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KlxyXG4gICAgcHVibGljIGxpc3RJbWFnZSgpe1xyXG4gICAgICAgIHZhciBpPTAsIGNvbnQ9IDAsIGNvbnRDb2xsPTA7XHJcbiAgICAgICAgdmFyIGNvbGxldGlvbnMgPSAwO1xyXG4gICAgICAgIHZhciByZXNpZHVlID0gMDtcclxuICAgICAgICB2YXIgbGVuZ2h0ID0gMDtcclxuICAgICAgICB2YXIgY291bnREb3duID0gMDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgdXJsU2VydmljZSA9IFwiaHR0cHM6Ly9tc3MuaW50LWZ1cm5kaXJlY3QuY29tOjM3MTgwL2FwaS9JbWFnZXMuanNvbj9JdGVtQ29kZXM9XCIgO1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3Quc2xpY2UoMCwxMCkubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9kdWN0LkltYWdlRmlsZSAhPSBudWxsKXsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMrcHJvZHVjdC5JdGVtQ29kZStcIixcIjsgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXJhbWV0ZXJzKTtcclxuICAgICAgICB0aGlzLl9pbWFnZVNlcnZpY2UuZG93bmxvYWRQcm9ncmVzcyh1cmxTZXJ2aWNlK3BhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuSnNvbigpe1xyXG4gICAgICAgIHZhciBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgdmFyIGZpbGUgPSBkb2N1bWVudHMuZ2V0RmlsZShcImltYWdlcy5qc29uXCIpO1xyXG4gICAgICAgIHZhciBzdDphbnk7XHJcbiAgICAgICAgaWYoZmlsZSE9bnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXJjaGl2by4uLlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZS5uYW1lKTtcclxuICAgICAgICAgICBzdCA9IGZpbGUucmVhZFRleHRTeW5jKCk7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcblxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgcHVibGljIG9uY2hhbmdlV2FyZWhvdXNlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy53YXJlaG91c2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=