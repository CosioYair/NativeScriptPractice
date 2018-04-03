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
var terms_service_1 = require("../../services/terms.service");
var shippingAddress_service_1 = require("../../services/shippingAddress.service");
var SaleOrderComponent = /** @class */ (function () {
    /*
    private _scanForceDoc = {};
    private _scanForceList:ObservableArray<ScanForce> = new ObservableArray<ScanForce>();
    */
    function SaleOrderComponent(_productService, _inventoryService, _couchbaseService, modalService, vcRef, barcodeScanner, route, _termsCodeService, _shippingAddressService) {
        var _this = this;
        this._productService = _productService;
        this._inventoryService = _inventoryService;
        this._couchbaseService = _couchbaseService;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this.barcodeScanner = barcodeScanner;
        this.route = route;
        this._termsCodeService = _termsCodeService;
        this._shippingAddressService = _shippingAddressService;
        this.selectedProduct = {};
        this.selectedCartProduct = {};
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
        this.cartQuantity = 0;
        this._termsCodeDoc = {};
        this._shippingAddressDoc = {};
        this._shippingAddress = new observable_array_1.ObservableArray();
        this.shippingAddressList = [];
        this.dates = [];
        this.shipVias = [];
        this.dates.shipDate = new Date();
        this.dates.date = new Date();
        this.dates.shipDate = this.dates.shipDate.getDate() + 1 + "/" + (this.dates.shipDate.getMonth() + 1) + "/" + this.dates.shipDate.getFullYear();
        this.dates.date = this.dates.date.getDate() + "/" + this.dates.date.getMonth() + "/" + this.dates.date.getFullYear();
        constants_config_1.CONSTANTS.shipVias.map(function (shipVia) {
            _this.shipVias.push(shipVia.name);
        });
        constants_config_1.CONSTANTS.warehouses.map(function (warehouse) {
            _this.warehouses.push(warehouse.name);
        });
        this.selectedProduct.ItemCode = "";
        this.selectedProduct.comment = "";
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
        this.setTermsCode();
        this.setShippingAddress();
        //this._couchbaseService.deleteDocument("shippingaddress");
        //this.setScanForce();
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
    /*public setScanForce(){
        let doc = this._couchbaseService.getDocument("scanforce");
        if(doc == null)
            this.getScanForce();
        else{
            this._scanForceDoc = doc;
            this._scanForceList = this._scanForceDoc["scanforce"];
        }
        this.getUserScanForce();
    }

    public getScanForce(){
        this._scanForceService.getScanForce()
        .subscribe(result => {
            this._scanForceDoc["scanforce"] = result["Users"];
            this._couchbaseService.createDocument(this._termsCodeDoc, "scanforce");
            this._scanForceList = result["Users"];
        }, (error) => {
            alert(error);
        });
    }

    public getUserScanForce(){
        let scanForceUser = {};
        this._scanForceList.map(user =>{
            if(user.UserCode == userCode)
                scanForceUser = user;
        });
    }*/
    SaleOrderComponent.prototype.setShippingAddress = function () {
        var doc = this._couchbaseService.getDocument("shippingaddress");
        if (doc == null)
            this.getShippingAddress();
        else {
            this._shippingAddressDoc = doc["shippingaddress"];
            this._shippingAddress = this._shippingAddressDoc[this.customer.CustomerNo];
        }
        this.getCustomerShippingAddress();
        this.customer["shippingAddress"] = this._shippingAddress[0];
    };
    SaleOrderComponent.prototype.getShippingAddress = function () {
        var _this = this;
        this._shippingAddressService.getShippingAddress()
            .subscribe(function (result) {
            _this.filterCustomerShippingAddress(result);
        }, function (error) {
            alert(error);
        });
    };
    SaleOrderComponent.prototype.filterCustomerShippingAddress = function (shippingsAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._shippingAddressDoc["shippingaddress"] = {};
                        return [4 /*yield*/, shippingsAddress.map(function (shipping) {
                                if (_this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo] == null)
                                    _this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo] = [shipping];
                                else
                                    _this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo].push(shipping);
                            })];
                    case 1:
                        _a.sent();
                        this._couchbaseService.createDocument(this._shippingAddressDoc, "shippingaddress");
                        this._shippingAddress = this._shippingAddressDoc["shippingaddress"][this.customer.CustomerNo];
                        return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.getCustomerShippingAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._shippingAddress.map(function (shipping) {
                            _this.shippingAddressList.push(shipping.ShipToCode);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.setCustomerShippingAddress = function (args) {
        var _this = this;
        setTimeout(function () {
            _this.customer["shippingAddress"] = _this._shippingAddress[args.newIndex];
        }, 500);
    };
    SaleOrderComponent.prototype.setTermsCode = function () {
        var doc = this._couchbaseService.getDocument("termscode");
        if (doc == null)
            this.getTermsCode();
        else {
            this._termsCodeDoc = doc;
            this._termsCode = this._termsCodeDoc["termscode"];
        }
        this.getUserTermsCode();
    };
    SaleOrderComponent.prototype.getTermsCode = function () {
        var _this = this;
        this._termsCodeService.getTermsCode()
            .subscribe(function (result) {
            _this._termsCodeDoc["termscode"] = result["TermsCode"];
            _this._couchbaseService.createDocument(_this._termsCodeDoc, "termscode");
            _this._termsCode = result["TermsCode"];
        }, function (error) {
            alert(error);
        });
    };
    SaleOrderComponent.prototype.getUserTermsCode = function () {
        var _this = this;
        this._termsCode.map(function (term) {
            if (term.TermsCode == _this.customer.TermsCode)
                _this.userTermsCode = term.Description;
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
        return __awaiter(this, void 0, void 0, function () {
            var doc, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        doc = this._couchbaseService.getDocument("product");
                        if (!(doc == null)) return [3 /*break*/, 1];
                        this._products = this._productService.setProductDocument();
                        return [3 /*break*/, 3];
                    case 1:
                        _a = this;
                        return [4 /*yield*/, this._productService.getProductDocument(doc["product"])];
                    case 2:
                        _a._products = _b.sent();
                        _b.label = 3;
                    case 3:
                        this.productList = new observable_array_1.ObservableArray(this._products);
                        return [2 /*return*/];
                }
            });
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
        this.productList = new observable_array_1.ObservableArray(this._products);
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
        var item = false;
        list.map(function (product, index) {
            if (list[index].ItemCode.toLowerCase() == code.toLowerCase()) {
                item = product;
                _this.selectedProduct = _this._products[index];
            }
        });
        return item;
    };
    SaleOrderComponent.prototype.validateProductList = function () {
        if (this.searchItemCode(this.itemCode, this._products) == false)
            alert("Invalid item code. " + this.itemCode + " does not exist.");
        else
            this.viewProduct(this.selectedProduct);
    };
    SaleOrderComponent.prototype.addProduct = function () {
        var product = this.searchItemCode(this.itemCode, this.cart);
        console.log(JSON.stringify(product));
        if (product == false) {
            this.selectedProduct.quantity = this.productQuantity;
            this.selectedProduct.quantityPrice = this.selectedProduct.quantity * parseFloat(this.selectedProduct.StandardUnitPrice);
            this.cart.push(this.selectedProduct);
            this.totalCartAmount += this.selectedProduct.quantityPrice;
            this.cartQuantity = this.cartQuantity + parseInt(this.selectedProduct.quantity);
            alert("Item " + this.itemCode + " added to cart.");
        }
        else {
            this.selectedCartProduct = product;
            this.showProductOrderModal();
        }
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
                _this.totalCartAmount = _this.totalCartAmount - parseFloat(_this.selectedCartProduct.quantityPrice);
                _this.cartQuantity = _this.cartQuantity - _this.selectedCartProduct.quantity;
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
        var _this = this;
        if (this.selectedCartProduct.quantity != undefined) {
            var oldProductQuantity_1 = parseInt(this.selectedCartProduct.quantity);
            this.createModelViewProductEdit().then(function (result) {
                if (result != null && result.quantity > 0) {
                    _this.cartQuantity = _this.cartQuantity - oldProductQuantity_1;
                    _this.totalCartAmount = _this.totalCartAmount - _this.selectedCartProduct.quantityPrice;
                    _this.cartQuantity = _this.cartQuantity + parseInt(result.quantity);
                    _this.selectedCartProduct.quantityPrice = result.quantity * parseFloat(_this.selectedCartProduct.StandardUnitPrice);
                    _this.totalCartAmount = _this.totalCartAmount + _this.selectedCartProduct.quantityPrice;
                }
                else
                    _this.selectedCartProduct.quantity = oldProductQuantity_1;
            }).catch(function (error) { return alert(error); });
        }
    };
    SaleOrderComponent.prototype.createModelViewProductEdit = function () {
        if (this.selectedCartProduct.quantity != null) {
            var productDetails = {
                selectedCartProduct: this.selectedCartProduct,
                warehouse: constants_config_1.CONSTANTS.warehouses[this.warehouse].name
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
            router_1.ActivatedRoute,
            terms_service_1.TermsCodeService,
            shippingAddress_service_1.ShippingAddressService])
    ], SaleOrderComponent);
    return SaleOrderComponent;
}());
exports.SaleOrderComponent = SaleOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBQ2pHLGtEQUFrRTtBQUNsRSwwQ0FBaUQ7QUFHakQsc0VBQW9FO0FBRXBFLDhEQUFnRTtBQUdoRSxrRkFBZ0Y7QUFVaEY7SUFnQ0k7OztNQUdFO0lBRUYsNEJBQW9CLGVBQStCLEVBQy9CLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBK0IsRUFDL0IsS0FBc0IsRUFDdEIsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsaUJBQW1DLEVBQ25DLHVCQUErQztRQVJuRSxpQkFnREM7UUFoRG1CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBQy9CLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7UUExQzVELG9CQUFlLEdBQU8sRUFBRSxDQUFDO1FBQ3pCLHdCQUFtQixHQUFPLEVBQUUsQ0FBQztRQUU3QixlQUFVLEdBQU8sRUFBRSxDQUFDO1FBQ3BCLGNBQVMsR0FBVSxDQUFDLENBQUM7UUFFckIsWUFBTyxHQUFVLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQVUsY0FBYyxDQUFDO1FBQ2xDLGlCQUFZLEdBQVUs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RSxDQUFDO3dCQUNMLENBQUMsQ0FBQyxFQUFBOzt3QkFORixTQU1FLENBQUM7Ozs7O0tBQ047SUFFTSw0Q0FBZSxHQUF0QjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLElBQUksU0FBUyxDQUFDO1lBQ3pELEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDeEQsSUFBSTtZQUNBLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUEvYlEsa0JBQWtCO1FBUDlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQXVDdUMsNkJBQWM7WUFDWixvQ0FBZ0I7WUFDaEIsb0NBQWdCO1lBQ3RCLGlDQUFrQjtZQUN6Qix1QkFBZ0I7WUFDTiw0Q0FBYztZQUN2Qix1QkFBYztZQUNGLGdDQUFnQjtZQUNWLGdEQUFzQjtPQTdDMUQsa0JBQWtCLENBZ2M3QjtJQUFELHlCQUFDO0NBQUEsQUFoY0YsSUFnY0U7QUFoY1csZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBCb3JkZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ09wdGlvbnMsIE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZGFsL2RhdGVwaWNrZXIvbW9kYWwtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRHJvcERvd25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi9jb25maWcvY29uc3RhbnRzLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyL3NlYXJjaC1iYXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2l0ZW1JbnF1aXJ5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5pbXBvcnQgeyBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbC9wcm9kdWN0T3JkZXIvbW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY3VzdG9tZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludmVudG9yeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBUZXJtc0NvZGUgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy90ZXJtc0NvZGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzcyB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NoaXBwaW5nQWRkcmVzcy5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3L3RhYi12aWV3XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXNhbGUtb3JkZXJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NhbGUtb3JkZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zYWxlLW9yZGVyLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNhbGVPcmRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIHB1YmxpYyBwcm9kdWN0TGlzdDphbnk7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czphbnk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQcm9kdWN0OmFueSA9IHt9O1xyXG4gICAgcHVibGljIHNlbGVjdGVkQ2FydFByb2R1Y3Q6YW55ID0ge307XHJcbiAgICBwdWJsaWMgZGF0ZXM6YW55O1xyXG4gICAgcHVibGljIHdhcmVob3VzZXM6YW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOm51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc2hpcFZpYXM6YW55O1xyXG4gICAgcHVibGljIHNoaXBWaWE6bnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsaW5lVGl0bGU6c3RyaW5nID0gXCJJdGVtIERldGFpbHNcIjtcclxuICAgIHB1YmxpYyBsaW5lU3ViVGl0bGU6c3RyaW5nID0gXCJTZWxlY3QgYW4gaXRlbSB0byB2aWV3IGRldGFpbHMgYW5kIGFkZFwiO1xyXG4gICAgcHVibGljIHNob3dpbmdQcm9kdWN0OkJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpdGVtQ29kZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGNhcnQ6YW55ID0gW107XHJcbiAgICBwdWJsaWMgcHJvZHVjdFF1YW50aXR5Om51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIG9yaWVudGF0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LW9yaWVudGF0aW9uJyk7XHJcbiAgICBwdWJsaWMgdGFiczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0aW9uVGFiczphbnk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBwdWJsaWMgY3VzdG9tZXI6Q3VzdG9tZXI7XHJcbiAgICBwcml2YXRlIF9pbnZlbnRvcnlEb2MgPSB7fTtcclxuICAgIHByaXZhdGUgX2ludmVudG9yaWVzOmFueTtcclxuICAgIHB1YmxpYyBpbnZlbnRvcnlMaXN0OiBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PigpO1xyXG4gICAgcHVibGljIHRvdGFsQ2FydEFtb3VudDpudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGNhcnRRdWFudGl0eTpudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfdGVybXNDb2RlRG9jID0ge307XHJcbiAgICBwcml2YXRlIF90ZXJtc0NvZGU6YW55O1xyXG4gICAgcHVibGljIHVzZXJUZXJtc0NvZGU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzRG9jID0ge307XHJcbiAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3M6T2JzZXJ2YWJsZUFycmF5PFNoaXBwaW5nQWRkcmVzcz4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFNoaXBwaW5nQWRkcmVzcz4oKTtcclxuICAgIHB1YmxpYyBzaGlwcGluZ0FkZHJlc3NMaXN0OmFueT0gW107XHJcbiAgICAvKlxyXG4gICAgcHJpdmF0ZSBfc2NhbkZvcmNlRG9jID0ge307XHJcbiAgICBwcml2YXRlIF9zY2FuRm9yY2VMaXN0Ok9ic2VydmFibGVBcnJheTxTY2FuRm9yY2U+ID0gbmV3IE9ic2VydmFibGVBcnJheTxTY2FuRm9yY2U+KCk7XHJcbiAgICAqL1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLCBcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6TW9kYWxEaWFsb2dTZXJ2aWNlLCBcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdmNSZWY6Vmlld0NvbnRhaW5lclJlZiwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lciwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3Rlcm1zQ29kZVNlcnZpY2U6IFRlcm1zQ29kZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlOiBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLFxyXG4gICAgICAgICAgICApe1xyXG4gICAgICAgIHRoaXMuZGF0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNoaXBWaWFzID0gW107XHJcbiAgICAgICAgdGhpcy5kYXRlcy5zaGlwRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRlcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGVzLnNoaXBEYXRlID0gYCR7dGhpcy5kYXRlcy5zaGlwRGF0ZS5nZXREYXRlKCkgKyAxfS8ke3RoaXMuZGF0ZXMuc2hpcERhdGUuZ2V0TW9udGgoKSArIDF9LyR7dGhpcy5kYXRlcy5zaGlwRGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAgICAgdGhpcy5kYXRlcy5kYXRlID0gYCR7dGhpcy5kYXRlcy5kYXRlLmdldERhdGUoKX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0TW9udGgoKX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0RnVsbFllYXIoKX1gO1xyXG4gICAgICAgIENPTlNUQU5UUy5zaGlwVmlhcy5tYXAoc2hpcFZpYSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcFZpYXMucHVzaChzaGlwVmlhLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIENPTlNUQU5UUy53YXJlaG91c2VzLm1hcCh3YXJlaG91c2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndhcmVob3VzZXMucHVzaCh3YXJlaG91c2UubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LmNvbW1lbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbi5zZXRPcmllbnRhdGlvbihcImxhbmRzY2FwZXJpZ2h0XCIpOyAgXHJcbiAgICAgICAgdGhpcy50YWJzID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25UYWJzID0gW3tcclxuICAgICAgICAgICAgdGl0bGU6IFwiSEVBREVSXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQUREUkVTU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJMSU5FU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJUT1RBTFNcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcclxuICAgICAgICB9XTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMubWFwKHRhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcclxuICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IHRhYi50aXRsZTtcclxuICAgICAgICAgICAgdGhpcy50YWJzLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAoICh0YWIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ID09IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB0YWIudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRhYi52aXNpYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDdXN0b21lcih0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcIkN1c3RvbWVyTm9cIl0pO1xyXG4gICAgICAgIC8vdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcImludmVudG9yeVwiKTtcclxuICAgICAgICB0aGlzLnNldEludmVudG9yeSgpO1xyXG4gICAgICAgIC8vdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudCh0aGlzLl9kb2NJZFByb2R1Y3QpO1xyXG4gICAgICAgIHRoaXMuc2V0VGVybXNDb2RlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlwcGluZ0FkZHJlc3MoKTtcclxuICAgICAgICAvL3RoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZGVsZXRlRG9jdW1lbnQoXCJzaGlwcGluZ2FkZHJlc3NcIik7XHJcbiAgICAgICAgLy90aGlzLnNldFNjYW5Gb3JjZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tZXIoQ3VzdG9tZXJObzpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiY3VzdG9tZXJcIilbXCJjdXN0b21lclwiXTtcclxuICAgICAgICBkb2MubWFwKGN1c3RvbWVyID0+IHtcclxuICAgICAgICAgICAgaWYgKGN1c3RvbWVyLkN1c3RvbWVyTm8gID09IEN1c3RvbWVyTm8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypwdWJsaWMgc2V0U2NhbkZvcmNlKCl7XHJcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzY2FuZm9yY2VcIik7XHJcbiAgICAgICAgaWYoZG9jID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U2NhbkZvcmNlKCk7XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc2NhbkZvcmNlRG9jID0gZG9jO1xyXG4gICAgICAgICAgICB0aGlzLl9zY2FuRm9yY2VMaXN0ID0gdGhpcy5fc2NhbkZvcmNlRG9jW1wic2NhbmZvcmNlXCJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFVzZXJTY2FuRm9yY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2NhbkZvcmNlKCl7XHJcbiAgICAgICAgdGhpcy5fc2NhbkZvcmNlU2VydmljZS5nZXRTY2FuRm9yY2UoKVxyXG4gICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2NhbkZvcmNlRG9jW1wic2NhbmZvcmNlXCJdID0gcmVzdWx0W1wiVXNlcnNcIl07XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fdGVybXNDb2RlRG9jLCBcInNjYW5mb3JjZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5fc2NhbkZvcmNlTGlzdCA9IHJlc3VsdFtcIlVzZXJzXCJdO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVzZXJTY2FuRm9yY2UoKXtcclxuICAgICAgICBsZXQgc2NhbkZvcmNlVXNlciA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3NjYW5Gb3JjZUxpc3QubWFwKHVzZXIgPT57XHJcbiAgICAgICAgICAgIGlmKHVzZXIuVXNlckNvZGUgPT0gdXNlckNvZGUpXHJcbiAgICAgICAgICAgICAgICBzY2FuRm9yY2VVc2VyID0gdXNlcjtcclxuICAgICAgICB9KTtcclxuICAgIH0qL1xyXG5cclxuICAgIHB1YmxpYyBzZXRTaGlwcGluZ0FkZHJlc3MoKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKTtcclxuICAgICAgICBpZihkb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5nZXRTaGlwcGluZ0FkZHJlc3MoKTtcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zaGlwcGluZ0FkZHJlc3NEb2MgPSBkb2NbXCJzaGlwcGluZ2FkZHJlc3NcIl07XHJcbiAgICAgICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzcyA9IHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1t0aGlzLmN1c3RvbWVyLkN1c3RvbWVyTm9dO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXSA9IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1swXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2hpcHBpbmdBZGRyZXNzKCl7XHJcbiAgICAgICAgdGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZS5nZXRTaGlwcGluZ0FkZHJlc3MoKVxyXG4gICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJDdXN0b21lclNoaXBwaW5nQWRkcmVzcyhyZXN1bHQpO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGZpbHRlckN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKHNoaXBwaW5nc0FkZHJlc3Mpe1xyXG4gICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXSA9IHt9O1xyXG4gICAgICAgIGF3YWl0IHNoaXBwaW5nc0FkZHJlc3MubWFwKHNoaXBwaW5nID0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zaGlwcGluZ0FkZHJlc3NEb2NbXCJzaGlwcGluZ2FkZHJlc3NcIl1bc2hpcHBpbmcuQ3VzdG9tZXJOb10gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXVtzaGlwcGluZy5DdXN0b21lck5vXSA9IFtzaGlwcGluZ107XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXVtzaGlwcGluZy5DdXN0b21lck5vXS5wdXNoKHNoaXBwaW5nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvYywgXCJzaGlwcGluZ2FkZHJlc3NcIik7XHJcbiAgICAgICAgdGhpcy5fc2hpcHBpbmdBZGRyZXNzID0gdGhpcy5fc2hpcHBpbmdBZGRyZXNzRG9jW1wic2hpcHBpbmdhZGRyZXNzXCJdW3RoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOb107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKCl7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5fc2hpcHBpbmdBZGRyZXNzLm1hcChzaGlwcGluZyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzTGlzdC5wdXNoKHNoaXBwaW5nLlNoaXBUb0NvZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyhhcmdzOlNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKXtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXSA9IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUZXJtc0NvZGUoKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInRlcm1zY29kZVwiKTtcclxuICAgICAgICBpZihkb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5nZXRUZXJtc0NvZGUoKTtcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLl90ZXJtc0NvZGVEb2MgPSBkb2M7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlcm1zQ29kZSA9IHRoaXMuX3Rlcm1zQ29kZURvY1tcInRlcm1zY29kZVwiXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRVc2VyVGVybXNDb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRlcm1zQ29kZSgpe1xyXG4gICAgICAgIHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UuZ2V0VGVybXNDb2RlKClcclxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlcm1zQ29kZURvY1tcInRlcm1zY29kZVwiXSA9IHJlc3VsdFtcIlRlcm1zQ29kZVwiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl90ZXJtc0NvZGVEb2MsIFwidGVybXNjb2RlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl90ZXJtc0NvZGUgPSByZXN1bHRbXCJUZXJtc0NvZGVcIl07XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclRlcm1zQ29kZSgpe1xyXG4gICAgICAgIHRoaXMuX3Rlcm1zQ29kZS5tYXAodGVybSA9PntcclxuICAgICAgICAgICAgaWYodGVybS5UZXJtc0NvZGUgPT0gdGhpcy5jdXN0b21lci5UZXJtc0NvZGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJUZXJtc0NvZGUgPSB0ZXJtLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbnZlbnRvcnkoKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImludmVudG9yeVwiKTtcclxuICAgICAgICBpZihkb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5nZXRJbnZlbnRvcmllcygpO1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludmVudG9yeURvYyA9IGRvYztcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnZlbnRvcnlXYXJlaG91c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEludmVudG9yaWVzKCl7XHJcbiAgICAgICAgdGhpcy5faW52ZW50b3J5U2VydmljZS5nZXRJbnZlbnRvcmllcygpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckludmVudG9yaWVzKHJlc3VsdFtcIlByb2R1Y3RcIl0pO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGZpbHRlckludmVudG9yaWVzKGludmVudG9yeURvYzphbnkpe1xyXG4gICAgICAgIHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXSA9IHt9O1xyXG4gICAgICAgIGF3YWl0IGludmVudG9yeURvYy5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkFUTFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkhPVVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkNISVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIlBIWFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIjAwMFwiKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXVtwcm9kdWN0LldhcmVob3VzZUNvZGVdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0gPSBbcHJvZHVjdF07XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0ucHVzaChwcm9kdWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5faW52ZW50b3J5RG9jLCBcImludmVudG9yeVwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlckludmVudG9yeVdhcmVob3VzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXJJbnZlbnRvcnlXYXJlaG91c2UoKXtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW52ZW50b3JpZXMgPSB0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl1bQ09OU1RBTlRTLndhcmVob3VzZXNbdGhpcy53YXJlaG91c2VdLmNvZGVdO1xyXG4gICAgICAgICAgICB0aGlzLmludmVudG9yeUxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4odGhpcy5faW52ZW50b3JpZXMpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldERvY3VtZW50KCl7XHJcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJwcm9kdWN0XCIpO1xyXG4gICAgICAgIGlmKGRvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnNldFByb2R1Y3REb2N1bWVudCgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0RG9jdW1lbnQoZG9jW1wicHJvZHVjdFwiXSk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RGF0ZU1vZGFsKGlucHV0OnN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXNbaW5wdXRdID0gcmVzdWx0O1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgICAgY29udGV4dDogdG9kYXkudG9EYXRlU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNb2RhbERhdGVDb21wb25lbnQsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuXHJcbiAgICAgICAgaWYoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvZHVjdHNbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaCh0aGlzLl9wcm9kdWN0c1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5jZWwoKXtcclxuICAgICAgICB0aGlzLnNob3dpbmdQcm9kdWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSB7fTtcclxuICAgICAgICB0aGlzLmxpbmVUaXRsZSA9ICBcIkl0ZW0gRGV0YWlsc1wiO1xyXG4gICAgICAgIHRoaXMubGluZVN1YlRpdGxlID0gXCJTZWxlY3QgYW4gaXRlbSB0byB2aWV3IGRldGFpbHMgYW5kIGFkZFwiO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdFF1YW50aXR5ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlld1Byb2R1Y3QocHJvZHVjdDpQcm9kdWN0KXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nUHJvZHVjdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcclxuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5nZXRJbnZlbnRvcnlRdWFudGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWFyY2hJdGVtQ29kZShjb2RlOnN0cmluZywgbGlzdDphbnkpe1xyXG4gICAgICAgIGxldCBpdGVtID0gZmFsc2U7XHJcbiAgICAgICAgbGlzdC5tYXAoIChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZihsaXN0W2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpID09IGNvZGUudG9Mb3dlckNhc2UoKSl7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gdGhpcy5fcHJvZHVjdHNbaW5kZXhdOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZVByb2R1Y3RMaXN0KCl7XHJcbiAgICAgICAgaWYodGhpcy5zZWFyY2hJdGVtQ29kZSh0aGlzLml0ZW1Db2RlLCB0aGlzLl9wcm9kdWN0cykgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGFsZXJ0KGBJbnZhbGlkIGl0ZW0gY29kZS4gJHt0aGlzLml0ZW1Db2RlfSBkb2VzIG5vdCBleGlzdC5gKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMudmlld1Byb2R1Y3QodGhpcy5zZWxlY3RlZFByb2R1Y3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQcm9kdWN0KCl7XHJcbiAgICAgICAgbGV0IHByb2R1Y3QgPSB0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuY2FydCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocHJvZHVjdCkpO1xyXG4gICAgICAgIGlmKHByb2R1Y3QgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSA9IHRoaXMucHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eVByaWNlID0gdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkgKiBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJ0LnB1c2godGhpcy5zZWxlY3RlZFByb2R1Y3QpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCArPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5ICsgcGFyc2VJbnQodGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICBhbGVydChgSXRlbSAke3RoaXMuaXRlbUNvZGV9IGFkZGVkIHRvIGNhcnQuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RPcmRlck1vZGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dDYXJ0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5jYXJ0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ2FydFByb2R1Y3QocHJvZHVjdDpQcm9kdWN0KXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVDYXJ0UHJvZHVjdCgpe1xyXG4gICAgICAgIHRoaXMuY2FydC5tYXAoIChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNhcnRbaW5kZXhdLkl0ZW1Db2RlID09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50IC0gcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5IC0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJ0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TY2FuKCkge1xyXG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXHJcbiAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLCAgIFxyXG4gICAgICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsICAgICBcclxuICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLCAgICAgICAgXHJcbiAgICAgICAgICAgIGJlZXBPblNjYW46IHRydWUsICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0b3JjaE9uOiBmYWxzZSwgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgXHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcIm9yaWVudGF0aW9uXCIsICAgICBcclxuICAgICAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHJlc3VsdC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVByb2R1Y3RMaXN0KCk7XHJcbiAgICAgICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UHJvZHVjdE9yZGVyTW9kYWwoKXtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgbGV0IG9sZFByb2R1Y3RRdWFudGl0eSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQgIT0gbnVsbCAmJiByZXN1bHQucXVhbnRpdHkgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5IC0gb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgLSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5ICsgcGFyc2VJbnQocmVzdWx0LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSA9IHJlc3VsdC5xdWFudGl0eSAqIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50ICsgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ID0gb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbFZpZXdQcm9kdWN0RWRpdCgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSAhPSBudWxsKXtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdERldGFpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhcnRQcm9kdWN0OiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICB3YXJlaG91c2U6IENPTlNUQU5UUy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXS5uYW1lXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBwcm9kdWN0RGV0YWlscyxcclxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRJbnZlbnRvcnlRdWFudGl0KCl7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbnZlbnRvcnlMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHF1YW50aXR5QXZhaWwgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kIC0gcHJvZHVjdC5RdWFudGl0eU9uU2FsZXNPcmRlcjtcclxuICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPT0gcHJvZHVjdC5JdGVtQ29kZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eU9uSGFuZCA9IHByb2R1Y3QuUXVhbnRpdHlPbkhhbmQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eUF2YWlsID0gcXVhbnRpdHlBdmFpbCA8IDAgPyAwIDogcXVhbnRpdHlBdmFpbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RGVzY3JpcHRpb24oKXtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dCAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRGVzY3JpcHRpb24gbm90IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuIH0iXX0=