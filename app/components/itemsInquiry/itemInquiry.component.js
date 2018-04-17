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
        this.productImage = this._productService.getImage(product.ItemCode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUEwRjtBQUMxRiw0REFBNkQ7QUFDN0Qsc0VBQW9FO0FBR3BFLDJFQUE2RDtBQUM3RCxzRUFBb0U7QUFFcEUsa0VBQTBEO0FBQzFELDhEQUE0RDtBQU01RCx1Q0FBdUM7QUFDdkM7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBWUY7SUFnQ0ksOEJBQW9CLGlCQUFtQyxFQUMzQyxlQUErQixFQUMvQixjQUE4QixFQUM5QixhQUEyQixFQUMzQixpQkFBbUM7UUFKL0MsaUJBcUNDO1FBckNtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQWxDdkMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUM1QixnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1Ysb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFPeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHeEIsTUFBTTtRQUNDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUV4QyxZQUFZO1FBQ0wsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixrQkFBYSxHQUErQixJQUFJLGtDQUFlLEVBQWEsQ0FBQztRQVFoRixJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ25CLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFVLEVBQUUsRUFBRTtZQUNkLE1BQU0sRUFBRSxFQUFFO1lBQ1YsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixpQkFBaUIsRUFBRSxFQUFFO1lBQ3JCLGVBQWUsRUFBRSxFQUFFO1lBQ25CLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLHVCQUF1QixFQUFFLEVBQUU7WUFDM0IsU0FBUyxFQUFFLEVBQUU7WUFDYixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2YsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtTQUNsQixDQUFBO1FBRUQsb0JBQW9CO1FBQ3BCLDRCQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVM7WUFDOUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsNEJBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixzQkFBc0I7SUFDMUIsQ0FBQztJQUVNLDBDQUFXLEdBQWxCO0lBQ0EsQ0FBQztJQUVNLDBDQUFXLEdBQWxCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxrQ0FBZSxDQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU0sNENBQWEsR0FBcEIsVUFBcUIsSUFBSTtRQUF6QixpQkFXQztRQVZHLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGtDQUFlLEVBQVcsQ0FBQztZQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3pFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRU0sc0NBQU8sR0FBZCxVQUFlLElBQUk7UUFBbkIsaUJBUUM7UUFQRyxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxrQ0FBZSxFQUFXLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ3ZCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGlEQUFrQixHQUF6QixVQUEwQixPQUFnQjtRQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxnREFBZ0Q7UUFDaEQseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQiwrQkFBK0I7UUFDL0IsK0RBQStEO1FBQy9ELDBCQUEwQjtRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLHFDQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFTSwwQ0FBVyxHQUFsQjtRQUNJLElBQUksV0FBVyxHQUFXLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUM7UUFDdkUsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUUsYUFBYTtZQUNwQixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsWUFBWSxFQUFFLFFBQVE7U0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTSxxQ0FBTSxHQUFiO1FBQUEsaUJBcUJDO1FBcEJHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1lBQ2QscUJBQXFCLEVBQUUsR0FBRztZQUMxQixXQUFXLEVBQUUsYUFBYTtZQUMxQiwyQ0FBMkMsRUFBRSxJQUFJO1NBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzVCLDZCQUE2QjtZQUM3QixLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUUsVUFBQyxZQUFZO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQ0EsQ0FBQztJQUNOLENBQUM7SUFDRCxpRkFBaUY7SUFDakYsaUZBQWlGO0lBQ2pGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0NHO0lBR0gscUNBQXFDO0lBQ3JDLG9DQUFvQztJQUM3QixnREFBaUIsR0FBeEIsVUFBeUIsSUFBbUM7UUFDeEQsSUFBSSxhQUFrQixDQUFDO1FBQ3ZCLGFBQWEsR0FBRyw0QkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUdNLGlEQUFrQixHQUF6QjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO1lBQzFCLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1lBQzFFLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxLQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDO2dCQUMzQyxLQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUMzRCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sNENBQWEsR0FBcEIsVUFBcUIsUUFBUTtRQUE3QixpQkFRQztRQVBHLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztZQUN4QixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNsQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQWpQUSxvQkFBb0I7UUFSaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FtQ3lDLG9DQUFnQjtZQUMxQiw2QkFBYztZQUNmLDRDQUFjO1lBQ2YsNEJBQVk7WUFDUixvQ0FBZ0I7T0FwQ3RDLG9CQUFvQixDQWtQaEM7SUFBRCwyQkFBQztDQUFBLEFBbFBELElBa1BDO0FBbFBZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pdGVtSW5xdWlyeS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTZXR1cEl0ZW1WaWV3QXJncyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzXCI7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcbmltcG9ydCB7IEludmVudG9yeSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludmVudG9yeS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi9jb25maWcvY29uc3RhbnRzLmNvbmZpZ1wiO1xuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xuaW1wb3J0IHsgVmFsdWVMaXN0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbi8vaW1wb3J0IHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXMgaHR0cFxuLypcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcblxuLy9Eb3dubG9hZCBQcm9ncmVzc1xuaW1wb3J0IHsgRG93bmxvYWRQcm9ncmVzcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZG93bmxvYWQtcHJvZ3Jlc3NcIlxuLy9VbnppcFxuaW1wb3J0IHsgWmlwIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC16aXBcIjtcbmltcG9ydCAqIGFzIGZzdXogZnJvbSBcImZpbGUtc3lzdGVtXCI7XG4vL0ltYWdlIENhY2hlXG5pbXBvcnQgKiBhcyBpbWFnZUNhY2hlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlLWNhY2hlXCI7XG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XG4vL09wZW4gbG9jYWwganNvblxuXG4qL1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbUlucXVpcnlcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vaXRlbUlucXVpcnkuY29tcG9uZW50LmNzc1wiXVxufSlcblxuXG5leHBvcnQgY2xhc3MgSXRlbUlucXVpcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgX3Byb2R1Y3RzOiBhbnk7XG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwicHJvZHVjdFwiO1xuICAgIHB1YmxpYyBwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xuICAgIHB1YmxpYyBkYXRhID0ge307XG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XG4gICAgcHVibGljIGl0ZW1Db2RlOiBzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyB3YXJlaG91c2VzOiBhbnkgPSBbXTtcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBhbnkgPSAwO1xuICAgIHB1YmxpYyBzdGRVbml0UHJpY2U6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHN0ZFVuaXRDb3N0OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBwcm9kdWN0SW1hZ2U6YW55O1xuXG4gICAgLy9vYnRlbmNpb24gZGUgaW1hZ2VuXG4gICAgcHVibGljIHBpY3R1cmU6IGFueTtcbiAgICBwdWJsaWMgdXJsSW1hZ2U6IGFueTtcbiAgICBwdWJsaWMgc3RhcnRHZXRJbWFnZTogMDtcbiAgICBwdWJsaWMgZW5kR2V0SW1hZ2UgPSA4MDtcbiAgICBwdWJsaWMgcGF0aDogYW55O1xuXG4gICAgLy9uZ2lmXG4gICAgcHVibGljIGlzVmlzaWJsZURhdGE6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNWaXNpYmxlU2Nhbm5lcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvL2JhcmNvZGVpbXBcbiAgICBwdWJsaWMgb25IYW5kOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBvblNPQk86IG51bWJlciA9IDA7XG4gICAgcHVibGljIG9uUE86IG51bWJlciA9IDA7XG4gICAgcHVibGljIGF2YWlsYWJsZTogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgaW52ZW50b3J5TGlzdDogT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4oKTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICAgICAgcHJpdmF0ZSBfaW1hZ2VTZXJ2aWNlOiBJbWFnZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2ludmVudG9yeVNlcnZpY2U6IEludmVudG9yeVNlcnZpY2UsICkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHtcbiAgICAgICAgICAgIEl0ZW1Db2RlOiBcIlwiLFxuICAgICAgICAgICAgSXRlbUNvZGVEZXNjOiBcIlwiLFxuICAgICAgICAgICAgSW5hY3RpdmVJdGVtOiBcIlwiLFxuICAgICAgICAgICAgSXRlbVR5cGU6IFwiXCIsXG4gICAgICAgICAgICBTaGlwV2VpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgVm9sdW1lOiBcIlwiLFxuICAgICAgICAgICAgU3RhbmRhcmRVbml0Q29zdDogXCJcIixcbiAgICAgICAgICAgIFN0YW5kYXJkVW5pdFByaWNlOiBcIlwiLFxuICAgICAgICAgICAgUHJpbWFyeVZlbmRvck5vOiBcIlwiLFxuICAgICAgICAgICAgQ2F0ZWdvcnkxOiBcIlwiLFxuICAgICAgICAgICAgQ2F0ZWdvcnkyOiBcIlwiLFxuICAgICAgICAgICAgQ2F0ZWdvcnkzOiBcIlwiLFxuICAgICAgICAgICAgQ2F0ZWdvcnk0OiBcIlwiLFxuICAgICAgICAgICAgUHJvZHVjdExpbmU6IFwiXCIsXG4gICAgICAgICAgICBQcm9kdWN0VHlwZTogXCJcIixcbiAgICAgICAgICAgIEV4dGVuZGVkRGVzY3JpcHRpb25UZXh0OiBcIlwiLFxuICAgICAgICAgICAgSW1hZ2VGaWxlOiBcIlwiLFxuICAgICAgICAgICAgTGFzdFNvbGREYXRlOiBcIlwiLFxuICAgICAgICAgICAgRGF0ZUNyZWF0ZWQ6IFwiXCIsXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcbiAgICAgICAgICAgIFRpbWVVcGRhdGVkOiBcIlwiLFxuICAgICAgICAgICAgVGltZUNyZWF0ZWQ6IFwiXCJcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gXCJcIjtcbiAgICAgICAgQ09OU1RBTlRTLndhcmVob3VzZXMubWFwKHdhcmVob3VzZSA9PiB7XG4gICAgICAgICAgICB0aGlzLndhcmVob3VzZXMucHVzaCh3YXJlaG91c2UubmFtZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IHRoaXMuX2ludmVudG9yeVNlcnZpY2UuZ2V0SW52ZW50b3J5V2FyZWhvdXNlKENPTlNUQU5UUy53YXJlaG91c2VzWzBdW1wiY29kZVwiXSk7XG4gICAgICAgIHRoaXMuaW52ZW50b3J5V2FyZWhvdXNlKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcbiAgICAgICAgLy90aGlzLnNldEludmVudG9yeSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KHRoaXMuX2RvY0lkKTtcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBkb2NbdGhpcy5fZG9jSWRdO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvZHVjdHNbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZFByb2R1Y3QocHJvZHVjdDogUHJvZHVjdCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XG4gICAgICAgIHRoaXMuc3RkVW5pdFByaWNlID0gKHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKS50b0ZpeGVkKDIpO1xuICAgICAgICB0aGlzLnN0ZFVuaXRDb3N0ID0gKHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdENvc3QpLnRvRml4ZWQoMik7XG4gICAgICAgIC8vdGhpcy5kb3dubG9hZEltYWdlc1Byb2R1Y3RzKHRoaXMucHJvZHVjdExpc3QpO1xuICAgICAgICAvL3RoaXMuZ2V0SW1hZ2UocHJvZHVjdCk7XG4gICAgICAgIC8vdGhpcy5waWN0dXJlID0gXCJcIjtcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZUxvY2FsKHByb2R1Y3QpO1xuICAgICAgICAvL3RoaXMucGljdHVyZSA9IGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke3Byb2R1Y3QuSXRlbUNvZGV9YDtcbiAgICAgICAgLy90aGlzLnNob3dJbWFnZShwcm9kdWN0KTtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlRGF0YSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGVEYXRhID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlU2Nhbm5lciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW52ZW50b3J5V2FyZWhvdXNlKCk7XG4gICAgICAgIHRoaXMucHJvZHVjdEltYWdlID0gdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0SW1hZ2UocHJvZHVjdC5JdGVtQ29kZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGVEYXRhID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlU2Nhbm5lciA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc2NyaXB0aW9uKCkge1xuICAgICAgICB2YXIgZGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0O1xuICAgICAgICB2YXIgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiAoZGVzY3JpcHRpb24pLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkFjY2VwdFwiXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkIVwiKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25TY2FuKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLndhcmVob3VzZXMpO1xuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xuICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcbiAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLFxuICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSxcbiAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLFxuICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJvcmllbnRhdGlvblwiLFxuICAgICAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZVxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNvZGUgPSByZXN1bHQudGV4dDtcbiAgICAgICAgICAgIC8vdGhpcy52YWxpZGF0ZVByb2R1Y3RMaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkUHJvZHVjdCh0aGlzLmZpbmRCeVNjYW5uZXIodGhpcy5pdGVtQ29kZSkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pdGVtQ29kZSk7XG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLypwdWJsaWMgZ2V0SW1hZ2VzKCkge1xuICAgICAgICAvKnRoaXMucHJvZHVjdExpc3QubWFwKGFzeW5jIHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QuSW1hZ2VGaWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9pbWFnZVNlcnZpY2UuZ2V0SW1hZ2UocHJvZHVjdC5JdGVtQ29kZSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBpbWFnZVNvdXJjZS5mcm9tRmlsZShyZXMudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIucGF0aCwgYCR7cHJvZHVjdC5JdGVtQ29kZX0ucG5nYCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gaW1nLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0qXG4gICAgcHVibGljIGxpc3RJbWFnZSgpe1xuICAgICAgICB2YXIgaT0wLCBjb250PSAwLCBjb250Q29sbD0wO1xuICAgICAgICB2YXIgY29sbGV0aW9ucyA9IDA7XG4gICAgICAgIHZhciByZXNpZHVlID0gMDtcbiAgICAgICAgdmFyIGxlbmdodCA9IDA7XG4gICAgICAgIHZhciBjb3VudERvd24gPSAwO1xuICAgICAgICBcbiAgICAgICAgdmFyIHVybFNlcnZpY2UgPSBcImh0dHBzOi8vbXNzLmludC1mdXJuZGlyZWN0LmNvbTozNzE4MC9hcGkvSW1hZ2VzLmpzb24/SXRlbUNvZGVzPVwiIDtcbiAgICAgICAgdmFyIHBhcmFtZXRlcnM6IHN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMucHJvZHVjdExpc3Quc2xpY2UoMCwxMCkubWFwKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCl7ICAgICAgICBcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycytwcm9kdWN0Lkl0ZW1Db2RlK1wiLFwiOyAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtZXRlcnMpO1xuICAgICAgICB0aGlzLl9pbWFnZVNlcnZpY2UuZG93bmxvYWRQcm9ncmVzcyh1cmxTZXJ2aWNlK3BhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuSnNvbigpe1xuICAgICAgICB2YXIgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xuICAgICAgICB2YXIgZmlsZSA9IGRvY3VtZW50cy5nZXRGaWxlKFwiaW1hZ2VzLmpzb25cIik7XG4gICAgICAgIHZhciBzdDphbnk7XG4gICAgICAgIGlmKGZpbGUhPW51bGwpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcmNoaXZvLi4uXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZS5uYW1lKTtcbiAgICAgICAgICAgc3QgPSBmaWxlLnJlYWRUZXh0U3luYygpO1xuICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlKTtcbiAgICAgICAgfVxuICAgIH0qL1xuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgcHVibGljIG9uY2hhbmdlV2FyZWhvdXNlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIGxldCB3YXJlaG91c2VDb2RlOiBhbnk7XG4gICAgICAgIHdhcmVob3VzZUNvZGUgPSBDT05TVEFOVFMud2FyZWhvdXNlc1thcmdzLm5ld0luZGV4XVtcImNvZGVcIl07XG4gICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IHRoaXMuX2ludmVudG9yeVNlcnZpY2UuZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHdhcmVob3VzZUNvZGUpO1xuICAgICAgICB0aGlzLmludmVudG9yeVdhcmVob3VzZSgpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGludmVudG9yeVdhcmVob3VzZSgpIHsgXG4gICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdC5tYXAocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgcXVhbnRpdHlBdmFpbCA9IHByb2R1Y3QuUXVhbnRpdHlPbkhhbmQgLSBwcm9kdWN0LlF1YW50aXR5T25TYWxlc09yZGVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9kdWN0Lkl0ZW1Db2RlID09PSBwcm9kdWN0Lkl0ZW1Db2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhhbmQgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kO1xuICAgICAgICAgICAgICAgIHRoaXMub25TT0JPID0gcHJvZHVjdC5RdWFudGl0eU9uU2FsZXNPcmRlcjtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUE8gPSBwcm9kdWN0LlF1YW50aXR5T25QdXJjaGFzZU9yZGVyO1xuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlID0gcXVhbnRpdHlBdmFpbCA8IDAgPyAwIDogcXVhbnRpdHlBdmFpbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZpbmRCeVNjYW5uZXIoaXRlbUNvZGUpe1xuICAgICAgICB2YXIgb2JqU2Nhbm5lZDogYW55O1xuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0Lm1hcChwcm9kdWN0ID0+e1xuICAgICAgICAgICAgaWYodGhpcy5pdGVtQ29kZSA9PSBwcm9kdWN0Lkl0ZW1Db2RlKXtcbiAgICAgICAgICAgICAgICBvYmpTY2FubmVkID0gcHJvZHVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmpTY2FubmVkO1xuICAgIH1cbn1cblxuIl19