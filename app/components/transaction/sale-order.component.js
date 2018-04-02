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
var segmented_bar_1 = require("ui/segmented-bar");
var router_1 = require("@angular/router");
var inventory_service_1 = require("../../services/inventory.service");
var SaleOrderComponent = /** @class */ (function () {
    function SaleOrderComponent(_productService, _inventoryService, _couchbaseService, modalService, vcRef, barcodeScanner, route) {
        var _this = this;
        this._productService = _productService;
        this._inventoryService = _inventoryService;
        this._couchbaseService = _couchbaseService;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.barcodeScanner = barcodeScanner;
        this.route = route;
        this._docIdProduct = "product";
        this.productList = new observable_array_1.ObservableArray();
        this.selectedProduct = {};
        this.selectedCartProduct = {};
        this.data = {};
        this.warehouses = [];
        this.warehouse = 0;
        this.shipVia = 0;
        this.lineTitle = "Item Details";
        this.lineSubTitle = "Select an item to view details and add";
        this.showingProduct = false;
        this.itemCode = "";
        this.cart = [];
        this.productQuantity = 1;
        this.orientation = require('nativescript-orientation');
        this.selectedIndex = 0;
        this._inventoryDoc = {};
        this.inventoryList = new observable_array_1.ObservableArray();
        this.totalCartAmount = 0;
        this.dates = [];
        this.shipVias = [];
        this.dates.shipDate = new Date();
        this.dates.date = new Date();
        this.dates.shipDate = this.dates.shipDate.getDate() + 1 + "/" + (this.dates.shipDate.getMonth() + 1) + "/" + this.dates.shipDate.getFullYear();
        this.dates.date = this.dates.date.getDate() + "/" + this.dates.date.getMonth() + "/" + this.dates.date.getFullYear();
        constants_config_1.CONSTANTS.warehouses.map(function (warehouse) {
            _this.warehouses.push(warehouse.name);
        });
        constants_config_1.CONSTANTS.shipVias.map(function (shipVia) {
            _this.shipVias.push(shipVia.name);
        });
        this.selectedProduct.ItemCode = "";
        this.selectedCartProduct.ItemCode = "";
        this.orientation.setOrientation("landscaperight");
        this.tabs = [];
        this.selectionTabs = [{
                title: "HEADER",
                visibility: true
            },
            {
                title: "ADDRESS",
                visibility: false
            },
            {
                title: "LINES",
                visibility: false
            },
            {
                title: "TOTALS",
                visibility: false
            }];
        this.selectionTabs.map(function (tab) {
            var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
            segmentedBarItem.title = tab.title;
            _this.tabs.push(segmentedBarItem);
        });
    }
    SaleOrderComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        this.selectionTabs.map(function (tab, index) {
            if (index == segmetedBar.selectedIndex)
                tab.visibility = true;
            else
                tab.visibility = false;
        });
    };
    SaleOrderComponent.prototype.ngOnInit = function () {
        this.getCustomer(this.route.snapshot.params["CustomerNo"]);
        //this._couchbaseService.deleteDocument("inventory");
        this.setInventory();
        //this._couchbaseService.deleteDocument(this._docIdProduct);
        this.setDocument();
    };
    SaleOrderComponent.prototype.getCustomer = function (CustomerNo) {
        var _this = this;
        var doc = this._couchbaseService.getDocument("customer")["customer"];
        doc.map(function (customer) {
            if (customer.CustomerNo == CustomerNo)
                _this.customer = customer;
        });
    };
    SaleOrderComponent.prototype.setInventory = function () {
        var doc = this._couchbaseService.getDocument("inventory");
        if (doc == null)
            this.getInventories();
        else {
            this._inventoryDoc = doc;
            this.filterInventoryWarehouse();
        }
    };
    SaleOrderComponent.prototype.getInventories = function () {
        var _this = this;
        this._inventoryService.getInventories()
            .subscribe(function (result) {
            _this.filterInventories(result["Product"]);
        }, function (error) {
            alert(error);
        });
    };
    SaleOrderComponent.prototype.filterInventories = function (inventoryDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._inventoryDoc["inventory"] = {};
                        return [4 /*yield*/, inventoryDoc.map(function (product) {
                                if (product.WarehouseCode == "ATL" || product.WarehouseCode == "HOU" || product.WarehouseCode == "CHI" || product.WarehouseCode == "PHX" || product.WarehouseCode == "000") {
                                    if (_this._inventoryDoc["inventory"][product.WarehouseCode] == null)
                                        _this._inventoryDoc["inventory"][product.WarehouseCode] = [product];
                                    else
                                        _this._inventoryDoc["inventory"][product.WarehouseCode].push(product);
                                }
                            })];
                    case 1:
                        _a.sent();
                        this._couchbaseService.createDocument(this._inventoryDoc, "inventory");
                        this.filterInventoryWarehouse();
                        return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.filterInventoryWarehouse = function () {
        var _this = this;
        setTimeout(function () {
            _this._inventories = _this._inventoryDoc["inventory"][constants_config_1.CONSTANTS.warehouses[_this.warehouse].code];
            _this.inventoryList = new observable_array_1.ObservableArray(_this._inventories);
        }, 500);
    };
    SaleOrderComponent.prototype.setDocument = function () {
        var doc = this._couchbaseService.getDocument(this._docIdProduct);
        if (doc == null)
            this.getProducts();
        else {
            this._products = doc[this._docIdProduct];
            this.filterProductsType();
        }
    };
    SaleOrderComponent.prototype.getProducts = function () {
        var _this = this;
        this._productService.getProducts()
            .subscribe(function (result) {
            _this.data[_this._docIdProduct] = result["Product"];
            _this._couchbaseService.createDocument(_this.data, _this._docIdProduct);
            _this._products = result["Product"];
            _this.filterProductsType();
        }, function (error) {
            alert(error);
        });
    };
    SaleOrderComponent.prototype.filterProductsType = function () {
        var _this = this;
        this.productList = new observable_array_1.ObservableArray();
        this._products.map(function (product) {
            if (product.ProductType == "F")
                _this.productList.push(product);
        });
    };
    SaleOrderComponent.prototype.showDateModal = function (input) {
        var _this = this;
        this.createModelView().then(function (result) {
            if (result != null)
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
                if (_this._products[index].ItemCode.toLowerCase().indexOf(searchValue) !== -1)
                    _this.productList.push(_this._products[index]);
            });
        }
    };
    SaleOrderComponent.prototype.onClear = function (args) {
        var searchBar = args.object;
        searchBar.text = "";
        this.filterProductsType();
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
        this.getInventoryQuantit();
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
            this.totalCartAmount += this.selectedProduct.quantityPrice;
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
            if (_this.cart[index].ItemCode == _this.selectedCartProduct.ItemCode) {
                _this.totalCartAmount -= _this.selectedProduct.quantityPrice;
                _this.cart.splice(index, 1);
            }
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
    SaleOrderComponent.prototype.showProductOrderModal = function () {
        this.createModelViewProductEdit().then(function (result) {
            console.log(result.quantity);
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
    SaleOrderComponent.prototype.getInventoryQuantit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryList.map(function (product) {
                            var quantityAvail = product.QuantityOnHand - product.QuantityOnSalesOrder;
                            if (_this.selectedProduct.ItemCode == product.ItemCode) {
                                _this.selectedProduct.quantityOnHand = product.QuantityOnHand;
                                _this.selectedProduct.quantityAvail = quantityAvail < 0 ? 0 : quantityAvail;
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.showDescription = function () {
        if (this.selectedProduct.ExtendedDescriptionText != undefined)
            alert(this.selectedProduct.ExtendedDescriptionText);
        else
            alert("Description not available");
    };
    SaleOrderComponent = __decorate([
        core_1.Component({
            selector: "ns-sale-order",
            moduleId: module.id,
            templateUrl: "./sale-order.component.html",
            styleUrls: ["./sale-order.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ProductService,
            inventory_service_1.InventoryService,
            couchbase_service_1.CouchbaseService,
            modal_dialog_1.ModalDialogService,
            core_1.ViewContainerRef,
            nativescript_barcodescanner_1.BarcodeScanner,
            router_1.ActivatedRoute])
    ], SaleOrderComponent);
    return SaleOrderComponent;
}());
exports.SaleOrderComponent = SaleOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBQ2pHLGtEQUFrRTtBQUNsRSwwQ0FBaUQ7QUFHakQsc0VBQW9FO0FBVXBFO0lBNEJJLDRCQUFvQixlQUErQixFQUMvQixpQkFBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLFlBQStCLEVBQy9CLEtBQXNCLEVBQ3RCLGNBQThCLEVBQzlCLEtBQXFCO1FBTnpDLGlCQTRDQztRQTVDbUIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBbUI7UUFDL0IsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBaENqQyxrQkFBYSxHQUFVLFNBQVMsQ0FBQztRQUNsQyxnQkFBVyxHQUE2QixJQUFJLGtDQUFlLEVBQVcsQ0FBQztRQUN2RSxvQkFBZSxHQUFPLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBTyxFQUFFLENBQUM7UUFDN0IsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVWLGVBQVUsR0FBTyxFQUFFLENBQUM7UUFDcEIsY0FBUyxHQUFVLENBQUMsQ0FBQztRQUVyQixZQUFPLEdBQVUsQ0FBQyxDQUFDO1FBQ25CLGNBQVMsR0FBVSxjQUFjLENBQUM7UUFDbEMsaUJBQVksR0FBVSx3Q0FBd0MsQ0FBQztRQUMvRCxtQkFBYyxHQUFXLEtBQUssQ0FB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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7NEJBQy9FLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLEVBQUE7O3dCQU5GLFNBTUUsQ0FBQzs7Ozs7S0FDTjtJQUVNLDRDQUFlLEdBQXRCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsSUFBSSxTQUFTLENBQUM7WUFDekQsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN4RCxJQUFJO1lBQ0EsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQXpVUSxrQkFBa0I7UUFQOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBOEJ1Qyw2QkFBYztZQUNaLG9DQUFnQjtZQUNoQixvQ0FBZ0I7WUFDdEIsaUNBQWtCO1lBQ3pCLHVCQUFnQjtZQUNOLDRDQUFjO1lBQ3ZCLHVCQUFjO09BbENoQyxrQkFBa0IsQ0EwVTdCO0lBQUQseUJBQUM7Q0FBQSxBQTFVRixJQTBVRTtBQTFVVyxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nT3B0aW9ucywgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaXRlbUlucXVpcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCB7IE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZGFsL3Byb2R1Y3RPcmRlci9tb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jdXN0b21lci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW52ZW50b3J5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtc2FsZS1vcmRlclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2FsZS1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NhbGUtb3JkZXIuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2FsZU9yZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgcHJpdmF0ZSBfcHJvZHVjdHM6YW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWRQcm9kdWN0OnN0cmluZyA9IFwicHJvZHVjdFwiO1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQcm9kdWN0OmFueSA9IHt9O1xyXG4gICAgcHVibGljIHNlbGVjdGVkQ2FydFByb2R1Y3Q6YW55ID0ge307XHJcbiAgICBwdWJsaWMgZGF0YSA9IHt9O1xyXG4gICAgcHVibGljIGRhdGVzOmFueTtcclxuICAgIHB1YmxpYyB3YXJlaG91c2VzOmFueSA9IFtdO1xyXG4gICAgcHVibGljIHdhcmVob3VzZTpudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNoaXBWaWFzOmFueTtcclxuICAgIHB1YmxpYyBzaGlwVmlhOm51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbGluZVRpdGxlOnN0cmluZyA9IFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICBwdWJsaWMgbGluZVN1YlRpdGxlOnN0cmluZyA9IFwiU2VsZWN0IGFuIGl0ZW0gdG8gdmlldyBkZXRhaWxzIGFuZCBhZGRcIjtcclxuICAgIHB1YmxpYyBzaG93aW5nUHJvZHVjdDpCb29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXRlbUNvZGU6c3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBjYXJ0OmFueSA9IFtdO1xyXG4gICAgcHVibGljIHByb2R1Y3RRdWFudGl0eTpudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBvcmllbnRhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1vcmllbnRhdGlvbicpO1xyXG4gICAgcHVibGljIHRhYnM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xyXG4gICAgcHVibGljIHNlbGVjdGlvblRhYnM6YW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgcHVibGljIGN1c3RvbWVyOkN1c3RvbWVyO1xyXG4gICAgcHJpdmF0ZSBfaW52ZW50b3J5RG9jID0ge307XHJcbiAgICBwcml2YXRlIF9pbnZlbnRvcmllczphbnk7XHJcbiAgICBwdWJsaWMgaW52ZW50b3J5TGlzdDogT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4oKTtcclxuICAgIHB1YmxpYyB0b3RhbENhcnRBbW91bnQ6bnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLCBcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOk1vZGFsRGlhbG9nU2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHZjUmVmOlZpZXdDb250YWluZXJSZWYsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpe1xyXG4gICAgICAgIHRoaXMuZGF0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNoaXBWaWFzID0gW107XHJcbiAgICAgICAgdGhpcy5kYXRlcy5zaGlwRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRlcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGVzLnNoaXBEYXRlID0gYCR7dGhpcy5kYXRlcy5zaGlwRGF0ZS5nZXREYXRlKCkgKyAxfS8ke3RoaXMuZGF0ZXMuc2hpcERhdGUuZ2V0TW9udGgoKSArIDF9LyR7dGhpcy5kYXRlcy5zaGlwRGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAgICAgdGhpcy5kYXRlcy5kYXRlID0gYCR7dGhpcy5kYXRlcy5kYXRlLmdldERhdGUoKX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0TW9udGgoKX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0RnVsbFllYXIoKX1gO1xyXG4gICAgICAgIENPTlNUQU5UUy53YXJlaG91c2VzLm1hcCh3YXJlaG91c2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndhcmVob3VzZXMucHVzaCh3YXJlaG91c2UubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgQ09OU1RBTlRTLnNoaXBWaWFzLm1hcChzaGlwVmlhID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaGlwVmlhcy5wdXNoKHNoaXBWaWEubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbi5zZXRPcmllbnRhdGlvbihcImxhbmRzY2FwZXJpZ2h0XCIpOyAgXHJcbiAgICAgICAgdGhpcy50YWJzID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25UYWJzID0gW3tcclxuICAgICAgICAgICAgdGl0bGU6IFwiSEVBREVSXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQUREUkVTU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJMSU5FU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJUT1RBTFNcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcclxuICAgICAgICB9XTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMubWFwKHRhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcclxuICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IHRhYi50aXRsZTtcclxuICAgICAgICAgICAgdGhpcy50YWJzLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAoICh0YWIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ID09IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB0YWIudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRhYi52aXNpYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lcih0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcIkN1c3RvbWVyTm9cIl0pO1xyXG4gICAgICAgIC8vdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcImludmVudG9yeVwiKTtcclxuICAgICAgICB0aGlzLnNldEludmVudG9yeSgpO1xyXG4gICAgICAgIC8vdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudCh0aGlzLl9kb2NJZFByb2R1Y3QpO1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tZXIoQ3VzdG9tZXJObzpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiY3VzdG9tZXJcIilbXCJjdXN0b21lclwiXTtcclxuICAgICAgICBkb2MubWFwKGN1c3RvbWVyID0+IHtcclxuICAgICAgICAgICAgaWYgKGN1c3RvbWVyLkN1c3RvbWVyTm8gID09IEN1c3RvbWVyTm8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEludmVudG9yeSgpe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiaW52ZW50b3J5XCIpO1xyXG4gICAgICAgIGlmKGRvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLmdldEludmVudG9yaWVzKCk7XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jID0gZG9jO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckludmVudG9yeVdhcmVob3VzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW52ZW50b3JpZXMoKXtcclxuICAgICAgICB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLmdldEludmVudG9yaWVzKClcclxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW52ZW50b3JpZXMocmVzdWx0W1wiUHJvZHVjdFwiXSk7XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZmlsdGVySW52ZW50b3JpZXMoaW52ZW50b3J5RG9jOmFueSl7XHJcbiAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdID0ge307XHJcbiAgICAgICAgYXdhaXQgaW52ZW50b3J5RG9jLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiQVRMXCIgfHwgcHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiSE9VXCIgfHwgcHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiQ0hJXCIgfHwgcHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiUEhYXCIgfHwgcHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiMDAwXCIpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl1bcHJvZHVjdC5XYXJlaG91c2VDb2RlXSA9IFtwcm9kdWN0XTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl1bcHJvZHVjdC5XYXJlaG91c2VDb2RlXS5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9pbnZlbnRvcnlEb2MsIFwiaW52ZW50b3J5XCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVySW52ZW50b3J5V2FyZWhvdXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbHRlckludmVudG9yeVdhcmVob3VzZSgpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnZlbnRvcmllcyA9IHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXVtDT05TVEFOVFMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0uY29kZV07XHJcbiAgICAgICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5Pih0aGlzLl9pbnZlbnRvcmllcyk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudCh0aGlzLl9kb2NJZFByb2R1Y3QpO1xyXG4gICAgICAgIGlmKGRvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLmdldFByb2R1Y3RzKCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gZG9jW3RoaXMuX2RvY0lkUHJvZHVjdF07XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyUHJvZHVjdHNUeXBlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpe1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RzKClcclxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLl9kb2NJZFByb2R1Y3RdID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLmRhdGEsIHRoaXMuX2RvY0lkUHJvZHVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJQcm9kdWN0c1R5cGUoKTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXJQcm9kdWN0c1R5cGUoKXtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5Qcm9kdWN0VHlwZSA9PSBcIkZcIilcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaChwcm9kdWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0RhdGVNb2RhbChpbnB1dDpzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlldygpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYocmVzdWx0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzW2lucHV0XSA9IHJlc3VsdDtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGNyZWF0ZU1vZGVsVmlldygpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IHRvZGF5LnRvRGF0ZVN0cmluZygpLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxEYXRlQ29tcG9uZW50LCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcblxyXG4gICAgICAgIGlmKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cy5tYXAoIChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZmlsdGVyUHJvZHVjdHNUeXBlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbCgpe1xyXG4gICAgICAgIHRoaXMuc2hvd2luZ1Byb2R1Y3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHt9O1xyXG4gICAgICAgIHRoaXMubGluZVRpdGxlID0gIFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICAgICAgdGhpcy5saW5lU3ViVGl0bGUgPSBcIlNlbGVjdCBhbiBpdGVtIHRvIHZpZXcgZGV0YWlscyBhbmQgYWRkXCI7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0UXVhbnRpdHkgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWV3UHJvZHVjdChwcm9kdWN0OlByb2R1Y3Qpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICB0aGlzLnNob3dpbmdQcm9kdWN0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxpbmVUaXRsZSA9IHByb2R1Y3QuSXRlbUNvZGVEZXNjO1xyXG4gICAgICAgIHRoaXMubGluZVN1YlRpdGxlID0gcHJvZHVjdC5JdGVtQ29kZTtcclxuICAgICAgICB0aGlzLml0ZW1Db2RlID0gcHJvZHVjdC5JdGVtQ29kZTtcclxuICAgICAgICB0aGlzLmdldEludmVudG9yeVF1YW50aXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlYXJjaEl0ZW1Db2RlKGNvZGU6c3RyaW5nLCBsaXN0OmFueSl7XHJcbiAgICAgICAgbGV0IG5vdEZvdW5kID0gdHJ1ZTtcclxuICAgICAgICBsaXN0Lm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGxpc3RbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkgPT0gY29kZS50b0xvd2VyQ2FzZSgpKXtcclxuICAgICAgICAgICAgICAgIG5vdEZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHRoaXMuX3Byb2R1Y3RzW2luZGV4XTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbm90Rm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlUHJvZHVjdExpc3QoKXtcclxuICAgICAgICBpZih0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuX3Byb2R1Y3RzKSlcclxuICAgICAgICAgICAgYWxlcnQoYEludmFsaWQgaXRlbSBjb2RlLiAke3RoaXMuaXRlbUNvZGV9IGRvZXMgbm90IGV4aXN0LmApO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy52aWV3UHJvZHVjdCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFByb2R1Y3QoKXtcclxuICAgICAgICBpZih0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuY2FydCkpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSA9IHRoaXMucHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eVByaWNlID0gdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkgKiBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdENvc3QpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcnQucHVzaCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ICs9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBJdGVtICR7dGhpcy5pdGVtQ29kZX0gYWRkZWQgdG8gY2FydC5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBhbGVydChgSXRlbSAke3RoaXMuaXRlbUNvZGV9IGlzIGFscmVhZHkgaW4gdGhlIGNhcnQuYCk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0NhcnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmNhcnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRDYXJ0UHJvZHVjdChwcm9kdWN0OlByb2R1Y3Qpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZUNhcnRQcm9kdWN0KCl7XHJcbiAgICAgICAgdGhpcy5jYXJ0Lm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2FydFtpbmRleF0uSXRlbUNvZGUgPT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0Lkl0ZW1Db2RlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50IC09IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblNjYW4oKSB7XHJcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcclxuICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcclxuICAgICAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsICAgXHJcbiAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIFxyXG4gICAgICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsICAgICAgICBcclxuICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCwgICBcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IFwib3JpZW50YXRpb25cIiwgICAgIFxyXG4gICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1Db2RlID0gcmVzdWx0LnRleHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUHJvZHVjdExpc3QoKTtcclxuICAgICAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGVuIHNjYW5uaW5nIFwiICsgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dQcm9kdWN0T3JkZXJNb2RhbCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlld1Byb2R1Y3RFZGl0KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQucXVhbnRpdHkpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3REZXRhaWxzID0ge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBwcm9kdWN0RGV0YWlscyxcclxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRJbnZlbnRvcnlRdWFudGl0KCl7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbnZlbnRvcnlMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHF1YW50aXR5QXZhaWwgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kIC0gcHJvZHVjdC5RdWFudGl0eU9uU2FsZXNPcmRlcjtcclxuICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPT0gcHJvZHVjdC5JdGVtQ29kZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eU9uSGFuZCA9IHByb2R1Y3QuUXVhbnRpdHlPbkhhbmQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eUF2YWlsID0gcXVhbnRpdHlBdmFpbCA8IDAgPyAwIDogcXVhbnRpdHlBdmFpbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RGVzY3JpcHRpb24oKXtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dCAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRGVzY3JpcHRpb24gbm90IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuIH0iXX0=