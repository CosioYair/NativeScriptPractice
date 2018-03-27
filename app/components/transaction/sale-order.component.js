"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var couchbase_service_1 = require("../../services/couchbase.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_date_component_1 = require("../modal/datepicker/modal-date.component");
var constants_config_1 = require("../../config/constants.config");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var item_service_1 = require("../../services/item.service");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var modal_product_order_component_1 = require("../modal/productOrder/modal-product-order.component");
var SaleOrderComponent = /** @class */ (function () {
    function SaleOrderComponent(_productService, _couchbaseService, modalService, vcRef, barcodeScanner) {
        var _this = this;
        this._productService = _productService;
        this._couchbaseService = _couchbaseService;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.barcodeScanner = barcodeScanner;
        this._docIdProduct = "product";
        this.productList = new observable_array_1.ObservableArray();
        this.selectedProduct = {};
        this.selectedCartProduct = {};
        this.data = {};
        this.wharehouse = 0;
        this.shipVia = 0;
        this.lineTitle = "Item Details";
        this.lineSubTitle = "Select an item to view details and add";
        this.showingProduct = false;
        this.itemCode = "";
        this.cart = [];
        this.productQuantity = 1;
        this.orientation = require('nativescript-orientation');
        this.dates = [];
        this.wharehouses = [];
        this.shipVias = [];
        this.dates.shipDate = new Date();
        this.dates.date = new Date();
        this.dates.shipDate = this.dates.shipDate.getDate() + 1 + "/" + (this.dates.shipDate.getMonth() + 1) + "/" + this.dates.shipDate.getFullYear();
        this.dates.date = this.dates.date.getDate() + "/" + this.dates.date.getMonth() + "/" + this.dates.date.getFullYear();
        constants_config_1.CONSTANTS.wharehouses.map(function (wharehouse) {
            _this.wharehouses.push(wharehouse.name);
        });
        constants_config_1.CONSTANTS.shipVias.map(function (shipVia) {
            _this.shipVias.push(shipVia.name);
        });
        this.selectedProduct.ItemCode = "";
        this.selectedCartProduct.ItemCode = "";
        this.orientation.setOrientation("landscapeleft");
    }
    SaleOrderComponent.prototype.ngOnInit = function () {
        this.setDocument();
    };
    SaleOrderComponent.prototype.getProducts = function () {
        var _this = this;
        console.log(JSON.stringify("2"));
        this._productService.getProducts()
            .subscribe(function (result) {
            _this.data[_this._docIdProduct] = result["Product"];
            _this._couchbaseService.createDocument(_this.data, _this._docIdProduct);
            _this._products = result["Product"];
            _this.productList = new observable_array_1.ObservableArray(_this._products);
        }, function (error) {
            alert(error);
        });
    };
    SaleOrderComponent.prototype.setDocument = function () {
        var doc = this._couchbaseService.getDocument(this._docIdProduct);
        if (doc == null)
            this.getProducts();
        else {
            this._products = doc[this._docIdProduct];
            this.productList = new observable_array_1.ObservableArray(this._products);
        }
    };
    SaleOrderComponent.prototype.showDateModal = function (input) {
        var _this = this;
        this.createModelView().then(function (result) {
            _this.dates[input] = result;
        }).catch(function (error) { return alert(error); });
    };
    SaleOrderComponent.prototype.createModelView = function () {
        var today = new Date();
        var options = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };
        return this.modalService.showModal(modal_date_component_1.ModalDateComponent, options);
    };
    SaleOrderComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        this.cancel();
        if (searchValue.length > 0) {
            this.productList = new observable_array_1.ObservableArray();
            this._products.map(function (product, index) {
                if (_this._products[index].ItemCodeDesc.toLowerCase().indexOf(searchValue) !== -1)
                    _this.productList.push(_this._products[index]);
            });
        }
    };
    SaleOrderComponent.prototype.onClear = function (args) {
        var _this = this;
        var searchBar = args.object;
        searchBar.text = "";
        this.productList = new observable_array_1.ObservableArray();
        this._products.forEach(function (item) {
            _this.productList.push(item);
        });
    };
    SaleOrderComponent.prototype.cancel = function () {
        this.showingProduct = false;
        this.selectedProduct = {};
        this.lineTitle = "Item Details";
        this.lineSubTitle = "Select an item to view details and add";
        this.productQuantity = 1;
    };
    SaleOrderComponent.prototype.viewProduct = function (product) {
        this.selectedProduct = product;
        this.showingProduct = true;
        this.lineTitle = product.ItemCodeDesc;
        this.lineSubTitle = product.ItemCode;
        this.itemCode = product.ItemCode;
    };
    SaleOrderComponent.prototype.searchItemCode = function (code, list) {
        var _this = this;
        var notFound = true;
        list.map(function (product, index) {
            if (list[index].ItemCode.toLowerCase() == code.toLowerCase()) {
                notFound = false;
                _this.selectedProduct = _this._products[index];
            }
        });
        return notFound;
    };
    SaleOrderComponent.prototype.validateProductList = function () {
        if (this.searchItemCode(this.itemCode, this._products))
            alert("Invalid item code. " + this.itemCode + " does not exist.");
        else
            this.viewProduct(this.selectedProduct);
    };
    SaleOrderComponent.prototype.addProduct = function () {
        if (this.searchItemCode(this.itemCode, this.cart)) {
            this.selectedProduct.quantity = this.productQuantity;
            this.selectedProduct.quantityPrice = this.selectedProduct.quantity * parseFloat(this.selectedProduct.StandardUnitCost);
            this.cart.push(this.selectedProduct);
            alert("Item " + this.itemCode + " added to cart.");
        }
        else
            alert("Item " + this.itemCode + " is already in the cart.");
        this.cancel();
    };
    SaleOrderComponent.prototype.showCart = function () {
        console.log(JSON.stringify(this.cart));
    };
    SaleOrderComponent.prototype.setSelectedCartProduct = function (product) {
        this.selectedCartProduct = product;
    };
    SaleOrderComponent.prototype.deleteCartProduct = function () {
        var _this = this;
        this.cart.map(function (product, index) {
            if (_this.cart[index].ItemCode == _this.selectedCartProduct.ItemCode)
                _this.cart.splice(index, 1);
        });
    };
    SaleOrderComponent.prototype.onScan = function () {
        var _this = this;
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
            _this.validateProductList();
        }, function (errorMessage) {
            console.log("Error when scanning " + errorMessage);
        });
    };
    SaleOrderComponent.prototype.showProductOrderModal = function (input) {
        this.createModelViewProductEdit().then(function (result) {
            //console.log(JSON.stringify(result));
        }).catch(function (error) { return alert(error); });
    };
    SaleOrderComponent.prototype.createModelViewProductEdit = function () {
        if (this.selectedCartProduct.quantity != null) {
            var productDetails = {
                selectedCartProduct: this.selectedCartProduct
            };
            var options = {
                viewContainerRef: this.vcRef,
                context: productDetails,
                fullscreen: false,
            };
            return this.modalService.showModal(modal_product_order_component_1.ModalProductOrderComponent, options);
        }
    };
    SaleOrderComponent = __decorate([
        core_1.Component({
            selector: "ns-sale-order",
            moduleId: module.id,
            templateUrl: "./sale-order.component.html",
            styleUrls: ["./sale-order.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ProductService, couchbase_service_1.CouchbaseService, modal_dialog_1.ModalDialogService, core_1.ViewContainerRef, nativescript_barcodescanner_1.BarcodeScanner])
    ], SaleOrderComponent);
    return SaleOrderComponent;
}());
exports.SaleOrderComponent = SaleOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBU2pHO0lBb0JJLDRCQUFvQixlQUErQixFQUFVLGlCQUFtQyxFQUFVLFlBQStCLEVBQVUsS0FBc0IsRUFBVSxjQUE4QjtRQUFqTixpQkFpQkM7UUFqQm1CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWxCek0sa0JBQWEsR0FBVSxTQUFTLENBQUM7UUFDbEMsZ0JBQVcsR0FBNkIsSUFBSSxrQ0FBZSxFQUFXLENBQUM7UUFDdkUsb0JBQWUsR0FBTyxFQUFFLENBQUM7UUFDekIsd0JBQW1CLEdBQU8sRUFBRSxDQUFDO1FBQzdCLFNBQUksR0FBRyxFQUFFLENBQUM7UUFHVixlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBRXRCLFlBQU8sR0FBVSxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFVLGNBQWMsQ0FBQztRQUNsQyxpQkFBWSxHQUFVLHdDQUF3QyxDQUFDO1FBQy9ELG1CQUFjLEdBQVcsS0FBSyxDQUFDO1FBQy9CLGFBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsU0FBSSxHQUFPLEVBQUUsQ0FBQztRQUNkLG9CQUFlLEdBQVUsQ0FBQyxDQUFDO1FBQzFCLGdCQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFHdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENB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NUUsQ0FBQztJQUNMLENBQUM7SUE3TVEsa0JBQWtCO1FBUDlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQXNCdUMsNkJBQWMsRUFBNkIsb0NBQWdCLEVBQXVCLGlDQUFrQixFQUFnQix1QkFBZ0IsRUFBMEIsNENBQWM7T0FwQnhNLGtCQUFrQixDQThNN0I7SUFBRCx5QkFBQztDQUFBLEFBOU1GLElBOE1FO0FBOU1XLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dPcHRpb25zLCBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBNb2RhbERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRHJvcERvd25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyXCI7XG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbnN0YW50cy5jb25maWdcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pdGVtSW5xdWlyeS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvcHJvZHVjdE9yZGVyL21vZGFsLXByb2R1Y3Qtb3JkZXIuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLXNhbGUtb3JkZXJcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2FsZS1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9zYWxlLW9yZGVyLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFNhbGVPcmRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBwcml2YXRlIF9wcm9kdWN0czphbnk7XG4gICAgcHJpdmF0ZSBfZG9jSWRQcm9kdWN0OnN0cmluZyA9IFwicHJvZHVjdFwiO1xuICAgIHB1YmxpYyBwcm9kdWN0TGlzdDogT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xuICAgIHB1YmxpYyBzZWxlY3RlZFByb2R1Y3Q6YW55ID0ge307XG4gICAgcHVibGljIHNlbGVjdGVkQ2FydFByb2R1Y3Q6YW55ID0ge307XG4gICAgcHVibGljIGRhdGEgPSB7fTtcbiAgICBwdWJsaWMgZGF0ZXM6YW55O1xuICAgIHB1YmxpYyB3aGFyZWhvdXNlczphbnk7XG4gICAgcHVibGljIHdoYXJlaG91c2U6bnVtYmVyID0gMDtcbiAgICBwdWJsaWMgc2hpcFZpYXM6YW55O1xuICAgIHB1YmxpYyBzaGlwVmlhOm51bWJlciA9IDA7XG4gICAgcHVibGljIGxpbmVUaXRsZTpzdHJpbmcgPSBcIkl0ZW0gRGV0YWlsc1wiO1xuICAgIHB1YmxpYyBsaW5lU3ViVGl0bGU6c3RyaW5nID0gXCJTZWxlY3QgYW4gaXRlbSB0byB2aWV3IGRldGFpbHMgYW5kIGFkZFwiO1xuICAgIHB1YmxpYyBzaG93aW5nUHJvZHVjdDpCb29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGl0ZW1Db2RlOnN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIGNhcnQ6YW55ID0gW107XG4gICAgcHVibGljIHByb2R1Y3RRdWFudGl0eTpudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgb3JpZW50YXRpb24gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtb3JpZW50YXRpb24nKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSwgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6TW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgYmFyY29kZVNjYW5uZXI6IEJhcmNvZGVTY2FubmVyKXtcbiAgICAgICAgdGhpcy5kYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLndoYXJlaG91c2VzID0gW107XG4gICAgICAgIHRoaXMuc2hpcFZpYXMgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRlcy5zaGlwRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuZGF0ZXMuZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuZGF0ZXMuc2hpcERhdGUgPSBgJHt0aGlzLmRhdGVzLnNoaXBEYXRlLmdldERhdGUoKSArIDF9LyR7dGhpcy5kYXRlcy5zaGlwRGF0ZS5nZXRNb250aCgpICsgMX0vJHt0aGlzLmRhdGVzLnNoaXBEYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgICAgdGhpcy5kYXRlcy5kYXRlID0gYCR7dGhpcy5kYXRlcy5kYXRlLmdldERhdGUoKX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0TW9udGgoKX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0RnVsbFllYXIoKX1gO1xuICAgICAgICBDT05TVEFOVFMud2hhcmVob3VzZXMubWFwKHdoYXJlaG91c2UgPT4ge1xuICAgICAgICAgICAgdGhpcy53aGFyZWhvdXNlcy5wdXNoKHdoYXJlaG91c2UubmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBDT05TVEFOVFMuc2hpcFZpYXMubWFwKHNoaXBWaWEgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaGlwVmlhcy5wdXNoKHNoaXBWaWEubmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24uc2V0T3JpZW50YXRpb24oXCJsYW5kc2NhcGVsZWZ0XCIpOyAgXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvZHVjdHMoKXtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoXCIyXCIpKTtcbiAgICAgICAgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdHMoKVxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5fZG9jSWRQcm9kdWN0XSA9IHJlc3VsdFtcIlByb2R1Y3RcIl07XG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuZGF0YSwgdGhpcy5fZG9jSWRQcm9kdWN0KTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREb2N1bWVudCgpe1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudCh0aGlzLl9kb2NJZFByb2R1Y3QpO1xuICAgICAgICBpZihkb2MgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IGRvY1t0aGlzLl9kb2NJZFByb2R1Y3RdO1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dEYXRlTW9kYWwoaW5wdXQ6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRlc1tpbnB1dF0gPSByZXN1bHQ7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3KCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgICAgIGNvbnRleHQ6IHRvZGF5LnRvRGF0ZVN0cmluZygpLFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxEYXRlQ29tcG9uZW50LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG5cbiAgICAgICAgaWYoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKCAocHJvZHVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvZHVjdHNbaW5kZXhdLkl0ZW1Db2RlRGVzYy50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKHRoaXMuX3Byb2R1Y3RzW2luZGV4XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcblxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xuICAgICAgICB0aGlzLl9wcm9kdWN0cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FuY2VsKCl7XG4gICAgICAgIHRoaXMuc2hvd2luZ1Byb2R1Y3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSB7fTtcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSAgXCJJdGVtIERldGFpbHNcIjtcbiAgICAgICAgdGhpcy5saW5lU3ViVGl0bGUgPSBcIlNlbGVjdCBhbiBpdGVtIHRvIHZpZXcgZGV0YWlscyBhbmQgYWRkXCI7XG4gICAgICAgIHRoaXMucHJvZHVjdFF1YW50aXR5ID0gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmlld1Byb2R1Y3QocHJvZHVjdDpQcm9kdWN0KXtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSBwcm9kdWN0O1xuICAgICAgICB0aGlzLnNob3dpbmdQcm9kdWN0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcbiAgICAgICAgdGhpcy5saW5lU3ViVGl0bGUgPSBwcm9kdWN0Lkl0ZW1Db2RlO1xuICAgICAgICB0aGlzLml0ZW1Db2RlID0gcHJvZHVjdC5JdGVtQ29kZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlYXJjaEl0ZW1Db2RlKGNvZGU6c3RyaW5nLCBsaXN0OmFueSl7XG4gICAgICAgIGxldCBub3RGb3VuZCA9IHRydWU7XG4gICAgICAgIGxpc3QubWFwKCAocHJvZHVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKGxpc3RbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkgPT0gY29kZS50b0xvd2VyQ2FzZSgpKXtcbiAgICAgICAgICAgICAgICBub3RGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gdGhpcy5fcHJvZHVjdHNbaW5kZXhdOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub3RGb3VuZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGVQcm9kdWN0TGlzdCgpe1xuICAgICAgICBpZih0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuX3Byb2R1Y3RzKSlcbiAgICAgICAgICAgIGFsZXJ0KGBJbnZhbGlkIGl0ZW0gY29kZS4gJHt0aGlzLml0ZW1Db2RlfSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy52aWV3UHJvZHVjdCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFByb2R1Y3QoKXtcbiAgICAgICAgaWYodGhpcy5zZWFyY2hJdGVtQ29kZSh0aGlzLml0ZW1Db2RlLCB0aGlzLmNhcnQpKXtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5ID0gdGhpcy5wcm9kdWN0UXVhbnRpdHk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eVByaWNlID0gdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkgKiBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdENvc3QpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0LnB1c2godGhpcy5zZWxlY3RlZFByb2R1Y3QpO1xuICAgICAgICAgICAgYWxlcnQoYEl0ZW0gJHt0aGlzLml0ZW1Db2RlfSBhZGRlZCB0byBjYXJ0LmApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGFsZXJ0KGBJdGVtICR7dGhpcy5pdGVtQ29kZX0gaXMgYWxyZWFkeSBpbiB0aGUgY2FydC5gKTtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0NhcnQoKXtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5jYXJ0KSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ2FydFByb2R1Y3QocHJvZHVjdDpQcm9kdWN0KXtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0ID0gcHJvZHVjdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlQ2FydFByb2R1Y3QoKXtcbiAgICAgICAgdGhpcy5jYXJ0Lm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLmNhcnRbaW5kZXhdLkl0ZW1Db2RlID09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSlcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2NhbigpIHtcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcbiAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXG4gICAgICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSwgICBcbiAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIFxuICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLCAgICAgICAgXG4gICAgICAgICAgICBiZWVwT25TY2FuOiB0cnVlLCAgICAgICAgICAgICBcbiAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJvcmllbnRhdGlvblwiLCAgICAgXG4gICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUNvZGUgPSByZXN1bHQudGV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUHJvZHVjdExpc3QoKTtcbiAgICAgICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gc2Nhbm5pbmcgXCIgKyBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93UHJvZHVjdE9yZGVyTW9kYWwoaW5wdXQ6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ICE9IG51bGwpe1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdERldGFpbHMgPSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICAgICAgICAgICAgY29udGV4dDogcHJvZHVjdERldGFpbHMsXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gfSJdfQ==