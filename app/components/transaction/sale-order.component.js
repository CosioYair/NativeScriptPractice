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
var saleOrder_service_1 = require("../../services/saleOrder.service");
var server_config_1 = require("../../config/server.config");
var platformModule = require("tns-core-modules/platform");
var router_2 = require("nativescript-angular/router");
var globalFunctions_config_1 = require("../../config/globalFunctions.config");
var SaleOrderComponent = /** @class */ (function () {
    function SaleOrderComponent(_productService, _inventoryService, _couchbaseService, modalService, vcRef, barcodeScanner, route, _termsCodeService, _shippingAddressService, _saleOrderService, _router) {
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
        this._saleOrderService = _saleOrderService;
        this._router = _router;
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
        this.inventoryList = new observable_array_1.ObservableArray();
        this.totalCartAmount = 0;
        this.cartQuantity = 0;
        this.shippingAddressList = [];
        this.totalCubes = 0;
        this.dates = [];
        this.shipVias = [];
        this.dates.shipDate = new Date();
        this.dates.date = new Date();
        this.dates.shipDate = this.dates.shipDate.getDate() + 1 + "/" + (this.dates.shipDate.getMonth() + 1) + "/" + this.dates.shipDate.getFullYear();
        this.dates.date = this.dates.date.getDate() + "/" + this.dates.date.getMonth() + "/" + this.dates.date.getFullYear();
        constants_config_1.CONSTANTS.shipVias.map(function (shipVia) {
            _this.shipVias.push(shipVia.name);
        });
        this.selectedProduct.ItemCode = "";
        this.selectedProduct.comment = "";
        this.selectedCartProduct.ItemCode = "";
        //this.orientation.setOrientation("landscaperight");  
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
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        server_config_1.SERVER.isQuote = JSON.parse(this.route.snapshot.params["IsQuote"]);
                        return [4 /*yield*/, this.getCustomer(this.route.snapshot.params["CustomerNo"])];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.setShippingAddress()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.setInventory()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.setTermsCode()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.setDocument()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.refreshSaleOrder()];
                    case 6:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouses()];
                    case 7:
                        _a.warehouses = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.validateShippingAddress = function () {
        this.customer["shippingAddress"] = {};
        this.shippingAddressList = [];
        this.customer["shippingAddress"]["ShipToName"] = "";
        this.customer["shippingAddress"]["AddressLine1"] = "";
        this.customer["shippingAddress"]["AddressLine2"] = "";
        this.customer["shippingAddress"]["ShipToCity"] = "";
        this.customer["shippingAddress"]["ShipToState"] = "";
        this.customer["shippingAddress"]["ShipToZipCode"] = "";
    };
    SaleOrderComponent.prototype.setDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this._couchbaseService.getDocument("product") == null)
                            this._productService.setProductDocument();
                        _a = this;
                        return [4 /*yield*/, this._productService.getProductDocument()];
                    case 1:
                        _a._products = _b.sent();
                        this.productList = new observable_array_1.ObservableArray(this._products);
                        return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.getCustomer = function (CustomerNo) {
        var _this = this;
        var doc = this._couchbaseService.getDocument("customer")["customer"];
        doc.map(function (customer) {
            if (customer.CustomerNo == CustomerNo)
                _this.customer = customer;
        });
    };
    SaleOrderComponent.prototype.setTermsCode = function () {
        if (this._couchbaseService.getDocument("termscode") == null)
            this._termsCodeService.setTermsCodeDoc();
        this.userTermsCode = this._termsCodeService.getUserTermsCode(this.customer);
    };
    SaleOrderComponent.prototype.setShippingAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this._couchbaseService.getDocument("shippingaddress") == null)
                            this._shippingAddressService.setShippingAddressDoc();
                        _a = this;
                        return [4 /*yield*/, this._shippingAddressService.getCustomerShippingAddress(this.customer)];
                    case 1:
                        _a._customerShippingAddress = _c.sent();
                        if (!(this._customerShippingAddress == null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.validateShippingAddress()];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _b = this;
                        return [4 /*yield*/, this._shippingAddressService.getCustomerShippingAddressList(this.customer)];
                    case 4:
                        _b.shippingAddressList = _c.sent();
                        this.customer["shippingAddress"] = this._customerShippingAddress[0];
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.setInventory = function () {
        if (this._couchbaseService.getDocument("inventory") == null)
            this._inventoryService.setInventoriesDoc();
        this.inventoryList = this._inventoryService.getInventoryWarehouse(this.warehouse);
    };
    SaleOrderComponent.prototype.setCustomerShippingAddress = function (args) {
        var _this = this;
        setTimeout(function () {
            _this.customer["shippingAddress"] = _this._customerShippingAddress[args.newIndex];
            _this.refreshSaleOrder();
        }, 500);
    };
    SaleOrderComponent.prototype.setCustomerShipVia = function (args) {
        var _this = this;
        setTimeout(function () {
            _this.shipVia = args.newIndex;
            _this.refreshSaleOrder();
        }, 500);
    };
    SaleOrderComponent.prototype.filterInventoryWarehouse = function () {
        var _this = this;
        setTimeout(function () {
            _this.cancel();
            _this.inventoryList = _this._inventoryService.getInventoryWarehouse(_this.warehouse);
            _this.refreshSaleOrder();
        }, 500);
    };
    SaleOrderComponent.prototype.showDateModal = function (input) {
        var _this = this;
        this.createModelView().then(function (result) {
            if (result != null) {
                _this.dates[input] = result;
                _this.refreshSaleOrder();
            }
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
    SaleOrderComponent.prototype.validateIntegerNumber = function (number) {
        if (number != parseInt(number, 10) || number < 1)
            return false;
        return true;
    };
    SaleOrderComponent.prototype.addProduct = function () {
        var _this = this;
        var product = this.searchItemCode(this.itemCode, this.cart);
        if (this.validateIntegerNumber(this.productQuantity)) {
            if (product == false) {
                this.selectedProduct.quantity = this.productQuantity;
                this.selectedProduct.quantityPrice = this.selectedProduct.quantity * parseFloat(this.selectedProduct.StandardUnitPrice);
                this.cart.push(this.selectedProduct);
                this.totalCartAmount += this.selectedProduct.quantityPrice;
                this.cartQuantity = this.cartQuantity + parseInt(this.selectedProduct.quantity);
                this.totalCubes += this.selectedProduct.Category4 * this.selectedProduct.quantity;
                alert("Item " + this.itemCode + " added to cart.");
            }
            else {
                this.selectedCartProduct = product;
                this.showProductOrderModal();
            }
            this.cancel();
        }
        else {
            alert("Invalid quantity");
            this.Qty.nativeElement.focus();
            setTimeout(function () {
                _this.Qty.nativeElement.android.selectAll();
            }, 500);
            this.Qty.nativeElement.ios.textRangeFromPositionToPosition(this.Qty.nativeElement.ios.beginningOfDocument, this.Qty.nativeElement.ios.endOfDocument);
        }
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
                _this.totalCubes -= _this.selectedCartProduct.Category4 * _this.selectedCartProduct.quantity;
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
                    _this.totalCubes -= _this.selectedCartProduct.Category4 * oldProductQuantity_1;
                    _this.cartQuantity = _this.cartQuantity + parseInt(result.quantity);
                    _this.selectedCartProduct.quantityPrice = result.quantity * parseFloat(_this.selectedCartProduct.StandardUnitPrice);
                    _this.totalCartAmount = _this.totalCartAmount + _this.selectedCartProduct.quantityPrice;
                    _this.totalCubes += _this.selectedCartProduct.Category4 * _this.selectedCartProduct.quantity;
                }
                else
                    _this.selectedCartProduct.quantity = oldProductQuantity_1;
                _this.refreshSaleOrder();
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
        if (this.selectedProduct.ExtendedDescriptionText != undefined || this.selectedProduct.ExtendedDescriptionText != "")
            alert(this.selectedProduct.ExtendedDescriptionText);
        else
            alert("Description not available");
    };
    SaleOrderComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var messages, length_1, folioNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messages = this.validations();
                        if (!(messages == "OK")) return [3 /*break*/, 4];
                        if (!(this._couchbaseService.getDocument("saleorder") == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._saleOrderService.updateSaleOrderDoc()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        length_1 = this._saleOrderService.getUserTransactions() == null ? 0 : this._saleOrderService.getUserTransactions().length;
                        folioNumber = "" + (length_1 + 1);
                        this._saleOrder.SalesOrderNO = platformModule.device.uuid.slice(0, 6) + "-" + this.padLeft(folioNumber, '0', 6);
                        return [4 /*yield*/, this._saleOrderService.updateSaleOrderDoc(this._saleOrder)];
                    case 3:
                        _a.sent();
                        this._router.back();
                        return [3 /*break*/, 5];
                    case 4:
                        alert(messages);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.padLeft = function (text, padChar, size) {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    };
    SaleOrderComponent.prototype.refreshSaleOrder = function () {
        if (this.customer.AddressLine2 == null)
            this.customer.AddressLine2 = "";
        this._saleOrder = {
            IsQuote: server_config_1.SERVER.isQuote,
            Saved: false,
            CustomerNo: this.customer.CustomerNo,
            CustomerPONo: this.CustomerPONo,
            CustomerConfirmTo: this.CustomerConfirmTo,
            CustomerFBO: this.CustomerFBO,
            SalesOrderNO: "",
            BillToName: this.customer.CustomerName,
            BillToAddress1: this.customer.AddressLine1,
            BillToAddress2: this.customer.AddressLine2,
            BillToCountryCode: this.customer.CountryCode,
            BillToCity: this.customer.City,
            BillToState: this.customer.State,
            BillToZipCode: this.customer.ZipCode,
            ShipVia: this.shipVias[this.shipVia],
            WarehouseCode: constants_config_1.CONSTANTS.warehouses[this.warehouse].code,
            ShipToCity: this.customer["shippingAddress"].ShipToCity,
            ShipToState: this.customer["shippingAddress"].ShipToState,
            ShipToZipCode: this.customer["shippingAddress"].ShipToZipCode,
            DiscountAmt: 0,
            ShipToName: this.customer["shippingAddress"].ShipToName,
            ShipToAddress1: this.customer["shippingAddress"].ShipToAddress1,
            ShipToAddress2: this.customer["shippingAddress"].ShipToAddress2,
            ShipToAddress3: this.customer["shippingAddress"].ShipToAddress3,
            ShipToCountryCode: this.customer["shippingAddress"].ShipToCountryCode,
            OrderDate: this.dates.date,
            ShipDate: this.dates.shipDate,
            DateCreated: new Date(),
            DateUpdated: new Date(),
            VendorNo: server_config_1.SERVER.user["UserCode"],
            SalespersonNo: server_config_1.SERVER.user["DefaultSalespersonID"],
            TermsCode: this.customer.TermsCode,
            Comment: this.Comment,
            Detail: this.cart
        };
    };
    SaleOrderComponent.prototype.validations = function () {
        var messages = "";
        messages += this.validateProducts();
        messages += this.validateAddress();
        return messages == "" ? "OK" : messages;
    };
    SaleOrderComponent.prototype.validateProducts = function () {
        return this.cart.length > 0 ? "" : "You need to add products to cart \n";
    };
    SaleOrderComponent.prototype.validateAddress = function () {
        if (this._saleOrder.ShipToAddress1 == "" || this._saleOrder.ShipToCity == "" || this._saleOrder.ShipToState == "" || this._saleOrder.ShipToZipCode == "")
            return "Your Shipping Address must have (First Address line, City, State and Zip code) \n";
        else
            return "";
    };
    __decorate([
        core_1.ViewChild('Qty'),
        __metadata("design:type", core_1.ElementRef)
    ], SaleOrderComponent.prototype, "Qty", void 0);
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
            shippingAddress_service_1.ShippingAddressService,
            saleOrder_service_1.SaleOrderService,
            router_2.RouterExtensions])
    ], SaleOrderComponent);
    return SaleOrderComponent;
}());
exports.SaleOrderComponent = SaleOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUUzRixzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBQ2pHLGtEQUFrRTtBQUNsRSwwQ0FBaUQ7QUFHakQsc0VBQW9FO0FBRXBFLDhEQUFnRTtBQUdoRSxrRkFBZ0Y7QUFFaEYsc0VBQW9FO0FBRXBFLDREQUFvRDtBQUNwRCwwREFBNEQ7QUFDNUQsc0RBQStEO0FBQy9ELDhFQUFzRTtBQVN0RTtJQW1DSSw0QkFBb0IsZUFBK0IsRUFDL0IsaUJBQW1DLEVBQ25DLGlCQUFtQyxFQUNuQyxZQUFnQyxFQUNoQyxLQUF1QixFQUN2QixjQUE4QixFQUM5QixLQUFxQixFQUNyQixpQkFBbUMsRUFDbkMsdUJBQStDLEVBQy9DLGlCQUFtQyxFQUNuQyxPQUF5QjtRQVY3QyxpQkErQ0M7UUEvQ21CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7UUFDL0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQTFDdEMsb0JBQWUsR0FBTyxFQUFFLENBQUM7UUFDekIsd0JBQW1C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TSxDQUFDLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBemFpQjtRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBTSxpQkFBVTttREFBQztJQWpDekIsa0JBQWtCO1FBUDlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQXFDdUMsNkJBQWM7WUFDWixvQ0FBZ0I7WUFDaEIsb0NBQWdCO1lBQ3JCLGlDQUFrQjtZQUN6Qix1QkFBZ0I7WUFDUCw0Q0FBYztZQUN2Qix1QkFBYztZQUNGLGdDQUFnQjtZQUNWLGdEQUFzQjtZQUM1QixvQ0FBZ0I7WUFDMUIseUJBQWdCO09BN0NwQyxrQkFBa0IsQ0EyYzdCO0lBQUQseUJBQUM7Q0FBQSxBQTNjRixJQTJjRTtBQTNjVyxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dPcHRpb25zLCBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbC9kYXRlcGlja2VyL21vZGFsLWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbnN0YW50cy5jb25maWdcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhci9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pdGVtSW5xdWlyeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcclxuaW1wb3J0IHsgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvcHJvZHVjdE9yZGVyL21vZGFsLXByb2R1Y3Qtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2N1c3RvbWVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnkgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pbnZlbnRvcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGVjaW1hbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBUZXJtc0NvZGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Rlcm1zLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVGVybXNDb2RlIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvdGVybXNDb2RlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3MgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zaGlwcGluZ0FkZHJlc3MuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcHBpbmdBZGRyZXNzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItdmlldy90YWItdmlld1wiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NhbGVPcmRlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIHBsYXRmb3JtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdMT0JBTEZVTkNUSU9OUyB9IGZyb20gXCIuLi8uLi9jb25maWcvZ2xvYmFsRnVuY3Rpb25zLmNvbmZpZ1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1zYWxlLW9yZGVyXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zYWxlLW9yZGVyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vc2FsZS1vcmRlci5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTYWxlT3JkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICBwdWJsaWMgcHJvZHVjdExpc3Q6YW55O1xyXG4gICAgcHJpdmF0ZSBfcHJvZHVjdHM6YW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDphbnkgPSB7fTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZENhcnRQcm9kdWN0OmFueSA9IHt9O1xyXG4gICAgcHVibGljIGRhdGVzOmFueTtcclxuICAgIHB1YmxpYyB3YXJlaG91c2VzOmFueSA9IFtdO1xyXG4gICAgcHVibGljIHdhcmVob3VzZTpudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNoaXBWaWFzOmFueTtcclxuICAgIHB1YmxpYyBzaGlwVmlhOm51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbGluZVRpdGxlOnN0cmluZyA9IFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICBwdWJsaWMgbGluZVN1YlRpdGxlOnN0cmluZyA9IFwiU2VsZWN0IGFuIGl0ZW0gdG8gdmlldyBkZXRhaWxzIGFuZCBhZGRcIjtcclxuICAgIHB1YmxpYyBzaG93aW5nUHJvZHVjdDpCb29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXRlbUNvZGU6c3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBjYXJ0OmFueSA9IFtdO1xyXG4gICAgcHVibGljIHByb2R1Y3RRdWFudGl0eTpudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBvcmllbnRhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1vcmllbnRhdGlvbicpO1xyXG4gICAgcHVibGljIHRhYnM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xyXG4gICAgcHVibGljIHNlbGVjdGlvblRhYnM6YW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgcHVibGljIGN1c3RvbWVyOkN1c3RvbWVyO1xyXG4gICAgcHVibGljIGludmVudG9yeUxpc3Q6IE9ic2VydmFibGVBcnJheTxJbnZlbnRvcnk+ID0gbmV3IE9ic2VydmFibGVBcnJheTxJbnZlbnRvcnk+KCk7XHJcbiAgICBwdWJsaWMgdG90YWxDYXJ0QW1vdW50Om51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgY2FydFF1YW50aXR5Om51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdXNlclRlcm1zQ29kZTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2hpcHBpbmdBZGRyZXNzTGlzdDphbnkgPSBbXTtcclxuICAgIHByaXZhdGUgX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzOiBhbnk7XHJcbiAgICBwdWJsaWMgdG90YWxDdWJlczpudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfc2FsZU9yZGVyOlNhbGVPcmRlcjtcclxuICAgIHB1YmxpYyBDdXN0b21lclBPTm86c3RyaW5nO1xyXG4gICAgcHVibGljIEN1c3RvbWVyQ29uZmlybVRvOnN0cmluZztcclxuICAgIHB1YmxpYyBDdXN0b21lckZCTzpzdHJpbmc7XHJcbiAgICBwdWJsaWMgQ29tbWVudDpzdHJpbmc7XHJcbiAgICBAVmlld0NoaWxkKCdRdHknKSBRdHk6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLCBcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2ludmVudG9yeVNlcnZpY2U6IEludmVudG9yeVNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLCBcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF90ZXJtc0NvZGVTZXJ2aWNlOiBUZXJtc0NvZGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzU2VydmljZTogU2hpcHBpbmdBZGRyZXNzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnNcclxuICAgICAgICAgICAgKXtcclxuICAgICAgICB0aGlzLmRhdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zaGlwVmlhcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF0ZXMuc2hpcERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0ZXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRlcy5zaGlwRGF0ZSA9IGAke3RoaXMuZGF0ZXMuc2hpcERhdGUuZ2V0RGF0ZSgpICsgMX0vJHt0aGlzLmRhdGVzLnNoaXBEYXRlLmdldE1vbnRoKCkgKyAxfS8ke3RoaXMuZGF0ZXMuc2hpcERhdGUuZ2V0RnVsbFllYXIoKX1gO1xyXG4gICAgICAgIHRoaXMuZGF0ZXMuZGF0ZSA9IGAke3RoaXMuZGF0ZXMuZGF0ZS5nZXREYXRlKCl9LyR7dGhpcy5kYXRlcy5kYXRlLmdldE1vbnRoKCl9LyR7dGhpcy5kYXRlcy5kYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICBDT05TVEFOVFMuc2hpcFZpYXMubWFwKHNoaXBWaWEgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBWaWFzLnB1c2goc2hpcFZpYS5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuY29tbWVudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0Lkl0ZW1Db2RlID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMub3JpZW50YXRpb24uc2V0T3JpZW50YXRpb24oXCJsYW5kc2NhcGVyaWdodFwiKTsgIFxyXG4gICAgICAgIHRoaXMudGFicyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicyA9IFt7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkhFQURFUlwiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkFERFJFU1NcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiTElORVNcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiVE9UQUxTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfV07XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25UYWJzLm1hcCh0YWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XHJcbiAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSB0YWIudGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHNlZ21lbnRlZEJhckl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xyXG4gICAgICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMubWFwKCAodGFiLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZihpbmRleCA9PSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4KVxyXG4gICAgICAgICAgICAgICAgdGFiLnZpc2liaWxpdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0YWIudmlzaWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xyXG4gICAgICAgIFNFUlZFUi5pc1F1b3RlID0gSlNPTi5wYXJzZSh0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcIklzUXVvdGVcIl0pO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0Q3VzdG9tZXIodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJDdXN0b21lck5vXCJdKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldFNoaXBwaW5nQWRkcmVzcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0SW52ZW50b3J5KCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRUZXJtc0NvZGUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldERvY3VtZW50KCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoU2FsZU9yZGVyKCk7XHJcbiAgICAgICAgdGhpcy53YXJlaG91c2VzID0gYXdhaXQgR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlU2hpcHBpbmdBZGRyZXNzKCl7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXSA9IHt9O1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl1bXCJTaGlwVG9OYW1lXCJdID0gXCJcIjtcclxuICAgICAgICB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdW1wiQWRkcmVzc0xpbmUxXCJdID0gXCJcIjtcclxuICAgICAgICB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdW1wiQWRkcmVzc0xpbmUyXCJdID0gXCJcIjtcclxuICAgICAgICB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdW1wiU2hpcFRvQ2l0eVwiXSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXVtcIlNoaXBUb1N0YXRlXCJdID0gXCJcIjtcclxuICAgICAgICB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdW1wiU2hpcFRvWmlwQ29kZVwiXSA9IFwiXCI7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldERvY3VtZW50KCl7XHJcbiAgICAgICAgaWYodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIikgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdFNlcnZpY2Uuc2V0UHJvZHVjdERvY3VtZW50KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdERvY3VtZW50KCk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXN0b21lcihDdXN0b21lck5vOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJjdXN0b21lclwiKVtcImN1c3RvbWVyXCJdO1xyXG4gICAgICAgIGRvYy5tYXAoY3VzdG9tZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3VzdG9tZXIuQ3VzdG9tZXJObyAgPT0gQ3VzdG9tZXJObylcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIgPSBjdXN0b21lcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGVybXNDb2RlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInRlcm1zY29kZVwiKSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlLnNldFRlcm1zQ29kZURvYygpO1xyXG4gICAgICAgIHRoaXMudXNlclRlcm1zQ29kZSA9IHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UuZ2V0VXNlclRlcm1zQ29kZSh0aGlzLmN1c3RvbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0U2hpcHBpbmdBZGRyZXNzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLnNldFNoaXBwaW5nQWRkcmVzc0RvYygpO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID0gYXdhaXQgdGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZS5nZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICBpZih0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsKVxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnZhbGlkYXRlU2hpcHBpbmdBZGRyZXNzKCk7XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3NMaXN0ID0gYXdhaXQgdGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZS5nZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzc0xpc3QodGhpcy5jdXN0b21lcik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl0gPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEludmVudG9yeSgpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJpbnZlbnRvcnlcIikgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5U2VydmljZS5zZXRJbnZlbnRvcmllc0RvYygpO1xyXG5cclxuICAgICAgICB0aGlzLmludmVudG9yeUxpc3QgPSB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLmdldEludmVudG9yeVdhcmVob3VzZSh0aGlzLndhcmVob3VzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKGFyZ3M6U2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFNhbGVPcmRlcigpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbWVyU2hpcFZpYShhcmdzOlNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKXtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaGlwVmlhID0gYXJncy5uZXdJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2FsZU9yZGVyKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmlsdGVySW52ZW50b3J5V2FyZWhvdXNlKCl7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IHRoaXMuX2ludmVudG9yeVNlcnZpY2UuZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHRoaXMud2FyZWhvdXNlKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2FsZU9yZGVyKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0RhdGVNb2RhbChpbnB1dDpzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlldygpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYocmVzdWx0ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlc1tpbnB1dF0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hTYWxlT3JkZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgICAgY29udGV4dDogdG9kYXkudG9EYXRlU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNb2RhbERhdGVDb21wb25lbnQsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuXHJcbiAgICAgICAgaWYoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvZHVjdHNbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaCh0aGlzLl9wcm9kdWN0c1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5jZWwoKXtcclxuICAgICAgICB0aGlzLnNob3dpbmdQcm9kdWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSB7fTtcclxuICAgICAgICB0aGlzLmxpbmVUaXRsZSA9ICBcIkl0ZW0gRGV0YWlsc1wiO1xyXG4gICAgICAgIHRoaXMubGluZVN1YlRpdGxlID0gXCJTZWxlY3QgYW4gaXRlbSB0byB2aWV3IGRldGFpbHMgYW5kIGFkZFwiO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdFF1YW50aXR5ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlld1Byb2R1Y3QocHJvZHVjdDpQcm9kdWN0KXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nUHJvZHVjdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcclxuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5nZXRJbnZlbnRvcnlRdWFudGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWFyY2hJdGVtQ29kZShjb2RlOnN0cmluZywgbGlzdDphbnkpe1xyXG4gICAgICAgIGxldCBpdGVtID0gZmFsc2U7XHJcbiAgICAgICAgbGlzdC5tYXAoIChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZihsaXN0W2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpID09IGNvZGUudG9Mb3dlckNhc2UoKSl7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gdGhpcy5fcHJvZHVjdHNbaW5kZXhdOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZVByb2R1Y3RMaXN0KCl7XHJcbiAgICAgICAgaWYodGhpcy5zZWFyY2hJdGVtQ29kZSh0aGlzLml0ZW1Db2RlLCB0aGlzLl9wcm9kdWN0cykgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGFsZXJ0KGBJbnZhbGlkIGl0ZW0gY29kZS4gJHt0aGlzLml0ZW1Db2RlfSBkb2VzIG5vdCBleGlzdC5gKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMudmlld1Byb2R1Y3QodGhpcy5zZWxlY3RlZFByb2R1Y3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZUludGVnZXJOdW1iZXIobnVtYmVyKXtcclxuICAgICAgICBpZihudW1iZXIgIT0gcGFyc2VJbnQobnVtYmVyLCAxMCkgfHwgbnVtYmVyIDwgMSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIHB1YmxpYyBhZGRQcm9kdWN0KCl7XHJcbiAgICAgICAgbGV0IHByb2R1Y3QgPSB0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuY2FydCk7XHJcbiAgICAgICAgaWYodGhpcy52YWxpZGF0ZUludGVnZXJOdW1iZXIodGhpcy5wcm9kdWN0UXVhbnRpdHkpKXtcclxuICAgICAgICAgICAgaWYocHJvZHVjdCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSA9IHRoaXMucHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlQcmljZSA9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5ICogcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkUHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnQucHVzaCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCArPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSArIHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5DYXRlZ29yeTQgKiB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGBJdGVtICR7dGhpcy5pdGVtQ29kZX0gYWRkZWQgdG8gY2FydC5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RPcmRlck1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYWxlcnQoXCJJbnZhbGlkIHF1YW50aXR5XCIpO1xyXG4gICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50LmFuZHJvaWQuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIH0sNTAwKTtcclxuICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MudGV4dFJhbmdlRnJvbVBvc2l0aW9uVG9Qb3NpdGlvbih0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy5iZWdpbm5pbmdPZkRvY3VtZW50LCB0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy5lbmRPZkRvY3VtZW50KTtcclxuICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dDYXJ0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5jYXJ0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ2FydFByb2R1Y3QocHJvZHVjdDpQcm9kdWN0KXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVDYXJ0UHJvZHVjdCgpe1xyXG4gICAgICAgIHRoaXMuY2FydC5tYXAoIChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNhcnRbaW5kZXhdLkl0ZW1Db2RlID09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50IC0gcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5IC0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzIC09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5DYXRlZ29yeTQgKiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblNjYW4oKSB7XHJcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcclxuICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcclxuICAgICAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsICAgXHJcbiAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSwgICAgIFxyXG4gICAgICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsICAgICAgICBcclxuICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCwgICBcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IFwib3JpZW50YXRpb25cIiwgICAgIFxyXG4gICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1Db2RlID0gcmVzdWx0LnRleHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUHJvZHVjdExpc3QoKTtcclxuICAgICAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGVuIHNjYW5uaW5nIFwiICsgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dQcm9kdWN0T3JkZXJNb2RhbCgpe1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBsZXQgb2xkUHJvZHVjdFF1YW50aXR5ID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb2RlbFZpZXdQcm9kdWN0RWRpdCgpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdCAhPSBudWxsICYmIHJlc3VsdC5xdWFudGl0eSA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgLSBvbGRQcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgPSB0aGlzLnRvdGFsQ2FydEFtb3VudCAtIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyAtPSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuQ2F0ZWdvcnk0ICogb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgKyBwYXJzZUludChyZXN1bHQucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlID0gcmVzdWx0LnF1YW50aXR5ICogcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgKyB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgKz0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgPSBvbGRQcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hTYWxlT3JkZXIoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gYWxlcnQoZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3REZXRhaWxzID0ge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgd2FyZWhvdXNlOiBDT05TVEFOVFMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0ubmFtZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dDogcHJvZHVjdERldGFpbHMsXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0SW52ZW50b3J5UXVhbnRpdCgpe1xyXG4gICAgICAgIGF3YWl0IHRoaXMuaW52ZW50b3J5TGlzdC5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWFudGl0eUF2YWlsID0gcHJvZHVjdC5RdWFudGl0eU9uSGFuZCAtIHByb2R1Y3QuUXVhbnRpdHlPblNhbGVzT3JkZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRQcm9kdWN0Lkl0ZW1Db2RlID09IHByb2R1Y3QuSXRlbUNvZGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlPbkhhbmQgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlBdmFpbCA9IHF1YW50aXR5QXZhaWwgPCAwID8gMCA6IHF1YW50aXR5QXZhaWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Rlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQgIT0gdW5kZWZpbmVkIHx8IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0ICE9IFwiXCIpXHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRGVzY3JpcHRpb24gbm90IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2F2ZSgpe1xyXG4gICAgICAgIGxldCBtZXNzYWdlcyA9IHRoaXMudmFsaWRhdGlvbnMoKTtcclxuICAgICAgICBpZihtZXNzYWdlcyA9PSBcIk9LXCIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLnVwZGF0ZVNhbGVPcmRlckRvYygpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclRyYW5zYWN0aW9ucygpID09IG51bGwgPyAwIDogdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyVHJhbnNhY3Rpb25zKCkubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgZm9saW9OdW1iZXIgPSBgJHtsZW5ndGggKyAxfWA7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TYWxlc09yZGVyTk8gPSBgJHtwbGF0Zm9ybU1vZHVsZS5kZXZpY2UudXVpZC5zbGljZSgwLDYpfS0ke3RoaXMucGFkTGVmdChmb2xpb051bWJlciwgJzAnLCA2KX1gO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLnVwZGF0ZVNhbGVPcmRlckRvYyh0aGlzLl9zYWxlT3JkZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIuYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlICAgIFxyXG4gICAgICAgICAgICBhbGVydChtZXNzYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYWRMZWZ0KHRleHQ6c3RyaW5nLCBwYWRDaGFyOnN0cmluZywgc2l6ZTpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAoU3RyaW5nKHBhZENoYXIpLnJlcGVhdChzaXplKSArIHRleHQpLnN1YnN0ciggKHNpemUgKiAtMSksIHNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFNhbGVPcmRlcigpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUyID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUyID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSB7XHJcbiAgICAgICAgICAgIElzUXVvdGU6IFNFUlZFUi5pc1F1b3RlLFxyXG4gICAgICAgICAgICBTYXZlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyTm86IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJObyxcclxuICAgICAgICAgICAgQ3VzdG9tZXJQT05vOiB0aGlzLkN1c3RvbWVyUE9ObyxcclxuICAgICAgICAgICAgQ3VzdG9tZXJDb25maXJtVG86IHRoaXMuQ3VzdG9tZXJDb25maXJtVG8sXHJcbiAgICAgICAgICAgIEN1c3RvbWVyRkJPOiB0aGlzLkN1c3RvbWVyRkJPLFxyXG4gICAgICAgICAgICBTYWxlc09yZGVyTk86IFwiXCIsXHJcbiAgICAgICAgICAgIEJpbGxUb05hbWU6IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOYW1lLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMTogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTEsXHJcbiAgICAgICAgICAgIEJpbGxUb0FkZHJlc3MyOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMixcclxuICAgICAgICAgICAgQmlsbFRvQ291bnRyeUNvZGU6IHRoaXMuY3VzdG9tZXIuQ291bnRyeUNvZGUsXHJcbiAgICAgICAgICAgIEJpbGxUb0NpdHk6IHRoaXMuY3VzdG9tZXIuQ2l0eSxcclxuICAgICAgICAgICAgQmlsbFRvU3RhdGU6IHRoaXMuY3VzdG9tZXIuU3RhdGUsXHJcbiAgICAgICAgICAgIEJpbGxUb1ppcENvZGU6IHRoaXMuY3VzdG9tZXIuWmlwQ29kZSxcclxuICAgICAgICAgICAgU2hpcFZpYTogdGhpcy5zaGlwVmlhc1t0aGlzLnNoaXBWaWFdLFxyXG4gICAgICAgICAgICBXYXJlaG91c2VDb2RlOiBDT05TVEFOVFMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0uY29kZSxcclxuICAgICAgICAgICAgU2hpcFRvQ2l0eTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9DaXR5LFxyXG4gICAgICAgICAgICBTaGlwVG9TdGF0ZTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9TdGF0ZSxcclxuICAgICAgICAgICAgU2hpcFRvWmlwQ29kZTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9aaXBDb2RlLFxyXG4gICAgICAgICAgICBEaXNjb3VudEFtdDogMCxcclxuICAgICAgICAgICAgU2hpcFRvTmFtZTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9OYW1lLFxyXG4gICAgICAgICAgICBTaGlwVG9BZGRyZXNzMTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9BZGRyZXNzMSxcclxuICAgICAgICAgICAgU2hpcFRvQWRkcmVzczI6IHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl0uU2hpcFRvQWRkcmVzczIsXHJcbiAgICAgICAgICAgIFNoaXBUb0FkZHJlc3MzOiB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdLlNoaXBUb0FkZHJlc3MzLFxyXG4gICAgICAgICAgICBTaGlwVG9Db3VudHJ5Q29kZTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9Db3VudHJ5Q29kZSxcclxuICAgICAgICAgICAgT3JkZXJEYXRlOiB0aGlzLmRhdGVzLmRhdGUsXHJcbiAgICAgICAgICAgIFNoaXBEYXRlOiB0aGlzLmRhdGVzLnNoaXBEYXRlLFxyXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgRGF0ZVVwZGF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIFZlbmRvck5vOiBTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdLFxyXG4gICAgICAgICAgICBTYWxlc3BlcnNvbk5vOiBTRVJWRVIudXNlcltcIkRlZmF1bHRTYWxlc3BlcnNvbklEXCJdLFxyXG4gICAgICAgICAgICBUZXJtc0NvZGU6IHRoaXMuY3VzdG9tZXIuVGVybXNDb2RlLFxyXG4gICAgICAgICAgICBDb21tZW50OiB0aGlzLkNvbW1lbnQsXHJcbiAgICAgICAgICAgIERldGFpbDogdGhpcy5jYXJ0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRpb25zKCl7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gXCJcIjtcclxuICAgICAgICBtZXNzYWdlcyArPSB0aGlzLnZhbGlkYXRlUHJvZHVjdHMoKTtcclxuICAgICAgICBtZXNzYWdlcyArPSB0aGlzLnZhbGlkYXRlQWRkcmVzcygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlcyA9PSBcIlwiID8gXCJPS1wiIDogbWVzc2FnZXM7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVQcm9kdWN0cygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhcnQubGVuZ3RoID4gMCA/IFwiXCIgOiBcIllvdSBuZWVkIHRvIGFkZCBwcm9kdWN0cyB0byBjYXJ0IFxcblwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVBZGRyZXNzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MxID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0NpdHkgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvU3RhdGUgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvWmlwQ29kZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIFNoaXBwaW5nIEFkZHJlc3MgbXVzdCBoYXZlIChGaXJzdCBBZGRyZXNzIGxpbmUsIENpdHksIFN0YXRlIGFuZCBaaXAgY29kZSkgXFxuXCI7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuIH0iXX0=