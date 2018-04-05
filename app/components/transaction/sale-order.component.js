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
var foliosTransaction_service_1 = require("../../services/foliosTransaction.service");
var SaleOrderComponent = /** @class */ (function () {
    function SaleOrderComponent(_productService, _inventoryService, _couchbaseService, modalService, vcRef, barcodeScanner, route, _termsCodeService, _shippingAddressService, _saleOrderService, _router, _foliosTransactionsService) {
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
        this._foliosTransactionsService = _foliosTransactionsService;
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
    SaleOrderComponent.prototype.saveFoliosTransaction = function () {
        var folioNumber = server_config_1.SERVER.isQuote ? this._foliosTransactionsService.getQuoteTransactions().length + 1 : this._foliosTransactionsService.getSaleTransactions().length + 1;
        var folioSerie = "" + this.padLeft(folioNumber.toString(), '0', 6);
        var doc = server_config_1.SERVER.isQuote ? "Quote" : "Sale";
        var docSerie = server_config_1.SERVER.isQuote ? "Q" : "S";
        var serie = "" + platformModule.device.uuid.slice(0, 6) + docSerie + "-" + folioSerie;
        var folio = {
            Folio: folioSerie,
            Document: doc,
            Serie: serie
        };
        this._foliosTransactionsService.updateFoliosTransactionDoc(folio);
        return serie;
    };
    SaleOrderComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var messages, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        messages = this.validations();
                        if (!(messages == "OK")) return [3 /*break*/, 3];
                        _a = this._saleOrder;
                        return [4 /*yield*/, this.saveFoliosTransaction()];
                    case 1:
                        _a.SalesOrderNO = _b.sent();
                        return [4 /*yield*/, this._saleOrderService.updateSaleOrderDoc(this._saleOrder)];
                    case 2:
                        _b.sent();
                        this._router.back();
                        return [3 /*break*/, 4];
                    case 3:
                        alert(messages);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
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
            DeviceUid: platformModule.device.uuid,
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
            UserCode: server_config_1.SERVER.user["UserCode"],
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
            router_2.RouterExtensions,
            foliosTransaction_service_1.FoliosTransactionService])
    ], SaleOrderComponent);
    return SaleOrderComponent;
}());
exports.SaleOrderComponent = SaleOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUUzRixzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBQ2pHLGtEQUFrRTtBQUNsRSwwQ0FBaUQ7QUFHakQsc0VBQW9FO0FBRXBFLDhEQUFnRTtBQUdoRSxrRkFBZ0Y7QUFFaEYsc0VBQW9FO0FBRXBFLDREQUFvRDtBQUNwRCwwREFBNEQ7QUFDNUQsc0RBQStEO0FBQy9ELDhFQUFzRTtBQUN0RSxzRkFBb0Y7QUFTcEY7SUFtQ0ksNEJBQW9CLGVBQStCLEVBQy9CLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBZ0MsRUFDaEMsS0FBdUIsRUFDdkIsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsT0FBeUIsRUFDekIsMEJBQW9EO1FBWHhFLGlCQWdEQztRQWhEbUIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBMEI7UUEzQ2pFLG9CQUFlLEdBQU8sRUFBRSxDQUFDO1FBQ3pCLHdCQUFtQixHQUFPLEVBQUUsQ0FBQztRQUU3QixlQUFVLEdBQU8sRUFBRSxDQUFDO1FBQ3BCLGNBQVMsR0FBVSxDQUFDLENBQUM7UUFFckIsWUFBTyxHQUFVLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQVUsY0FBYyxDQUFDO1FBQ2xDLGlCQUFZLEdBQVUsd0NBQXdDLENBQUM7UUFDL0QsbUJBQWMsR0FBVyxLQUFLLENBQUM7UUFDL0IsYUFBUSxHQUFVLEVBQUUsQ0FBQztRQUNyQixTQUFJLEdBQU8sRUFBRSxDQUFDO1FBQ2Qsb0JBQWUsR0FBVSxDQUFDLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUduRCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUVsQixrQkFBYSxHQUErQixJQUFJLGtDQUFlLEVBQWEsQ0FBQztRQUM3RSxvQkFBZSxHQUFVLENBQUMsQ0FBQztRQUMzQixpQkFBWSxHQUFVLENBQUMsQ0FBQztRQUV4Qix3QkFBbUIsR0FBTyxFQUFFLENBQUM7UUFFN0IsZUFBVSxHQUFVLENBQUMsQ0FBQztRQXFCekIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFJLENBQUM7UUFDeEksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFJLENBQUM7UUFDaEgsNEJBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztZQUMxQixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztnQkFDbEIsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsVUFBVSxFQUFFLElBQUk7YUFDbkI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsU0FBUztnQkFDaEIsVUFBVSxFQUFFLEtBQUs7YUFDcEI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsT0FBTztnQkFDZCxVQUFVLEVBQUUsS0FBSzthQUNwQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxRQUFRO2dCQUNmLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztZQUN0QixJQUFJLGdCQUFnQixHQUFxQixJQUFJLGdDQUFnQixFQUFFLENBQUM7WUFDaEUsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDbkMsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxrREFBcUIsR0FBNUIsVUFBNkIsSUFBSTtRQUM3QixJQUFJLFdBQVcsR0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHLEVBQUUsS0FBSztZQUMvQixFQUFFLENBQUEsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQztnQkFDbEMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSTtnQkFDQSxHQUFHLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSyxxQ0FBUSxHQUFkOzs7Ozs7d0JBQ0ksc0JBQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDbkUscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQTs7d0JBQWhFLFNBQWdFLENBQUM7d0JBQ2pFLHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzt3QkFBL0IsU0FBK0IsQ0FBQzt3QkFDaEMscUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFBOzt3QkFBekIsU0FBeUIsQ0FBQzt3QkFDMUIscUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFBOzt3QkFBekIsU0FBeUIsQ0FBQzt3QkFDMUIscUJBQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFBOzt3QkFBeEIsU0FBd0IsQ0FBQzt3QkFDekIscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUE7O3dCQUE3QixTQUE2QixDQUFDO3dCQUM5QixLQUFBLElBQUksQ0FBQTt3QkFBYyxxQkFBTSx3Q0FBZSxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBdkQsR0FBSyxVQUFVLEdBQUcsU0FBcUMsQ0FBQzs7Ozs7S0FDM0Q7SUFFTyxvREFBdUIsR0FBL0I7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUVZLHdDQUFXLEdBQXhCOzs7Ozs7d0JBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUM7NEJBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFFOUMsS0FBQSxJQUFJLENBQUE7d0JBQWEscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzt3QkFBaEUsR0FBSyxTQUFTLEdBQUcsU0FBK0MsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGtDQUFlLENBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7OztLQUNuRTtJQUVNLHdDQUFXLEdBQWxCLFVBQW1CLFVBQWlCO1FBQXBDLGlCQU1DO1FBTEcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUTtZQUNaLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUssVUFBVSxDQUFDO2dCQUNuQyxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5Q0FBWSxHQUFuQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVZLCtDQUFrQixHQUEvQjs7Ozs7O3dCQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxJQUFJLENBQUM7NEJBQzdELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO3dCQUN6RCxLQUFBLElBQUksQ0FBQTt3QkFBNEIscUJBQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQTVHLEdBQUssd0JBQXdCLEdBQUcsU0FBNEUsQ0FBQzs2QkFDMUcsQ0FBQSxJQUFJLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFBLEVBQXJDLHdCQUFxQzt3QkFDcEMscUJBQU0sSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUE7O3dCQUFwQyxTQUFvQyxDQUFDOzs7d0JBRXJDLEtBQUEsSUFBSSxDQUFBO3dCQUF1QixxQkFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBM0csR0FBSyxtQkFBbUIsR0FBRyxTQUFnRixDQUFDO3dCQUM1RyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7S0FFM0U7SUFFTSx5Q0FBWSxHQUFuQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRS9DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRU0sdURBQTBCLEdBQWpDLFVBQWtDLElBQWtDO1FBQXBFLGlCQUtDO1FBSkcsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEYsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDNUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVNLCtDQUFrQixHQUF6QixVQUEwQixJQUFrQztRQUE1RCxpQkFLQztRQUpHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRU0scURBQXdCLEdBQS9CO1FBQUEsaUJBTUM7UUFMRyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEYsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDNUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVNLDBDQUFhLEdBQXBCLFVBQXFCLEtBQVk7UUFBakMsaUJBT0M7UUFORyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUM5QixFQUFFLENBQUEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDZixLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDM0IsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDNUIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBWixDQUFZLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU8sNENBQWUsR0FBdkI7UUFDSSxJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQU0sT0FBTyxHQUF1QjtZQUNoQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztZQUM1QixPQUFPLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRTtZQUM3QixVQUFVLEVBQUUsS0FBSztTQUNwQixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHlDQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSwwQ0FBYSxHQUFwQixVQUFxQixJQUFJO1FBQXpCLGlCQVlDO1FBWEcsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksa0NBQWUsRUFBVyxDQUFDO1lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFFLFVBQUMsT0FBTyxFQUFFLEtBQUs7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDekUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTSxvQ0FBTyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsU0FBUyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGtDQUFlLENBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSxtQ0FBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBSSxjQUFjLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyx3Q0FBd0MsQ0FBQztRQUM3RCxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sd0NBQVcsR0FBbEIsVUFBbUIsT0FBZTtRQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sMkNBQWMsR0FBdEIsVUFBdUIsSUFBVyxFQUFFLElBQVE7UUFBNUMsaUJBU0M7UUFSRyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBRSxVQUFDLE9BQU8sRUFBRSxLQUFLO1lBQ3JCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUEsQ0FBQztnQkFDekQsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDZixLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakQsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sZ0RBQW1CLEdBQTFCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUM7WUFDM0QsS0FBSyxDQUFDLHdCQUFzQixJQUFJLENBQUMsUUFBUSxxQkFBa0IsQ0FBQyxDQUFDO1FBQ2pFLElBQUk7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sa0RBQXFCLEdBQTVCLFVBQTZCLE1BQU07UUFDL0IsRUFBRSxDQUFBLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHVDQUFVLEdBQWpCO1FBQUEsaUJBMEJDO1FBekJHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDakQsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3hILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRixJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO2dCQUNsRixLQUFLLENBQUMsVUFBUSxJQUFJLENBQUMsUUFBUSxvQkFBaUIsQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFDRCxJQUFJLENBQUEsQ0FBQztnQkFDRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDO2dCQUNuQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9CLFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDL0MsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekosQ0FBQztJQUNMLENBQUM7SUFFTSxxQ0FBUSxHQUFmO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxtREFBc0IsR0FBN0IsVUFBOEIsT0FBZTtRQUN6QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSw4Q0FBaUIsR0FBeEI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLFVBQUMsT0FBTyxFQUFFLEtBQUs7WUFDMUIsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7Z0JBQy9ELEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNqRyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztnQkFDMUUsS0FBSSxDQUFDLFVBQVUsSUFBSSxLQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7Z0JBQzFGLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sbUNBQU0sR0FBYjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUNyQixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixlQUFlLEVBQUUsSUFBSTtZQUNyQixVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUUsS0FBSztZQUNkLHFCQUFxQixFQUFFLEdBQUc7WUFDMUIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsMkNBQTJDLEVBQUUsSUFBSTtTQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUNQLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QixLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMvQixDQUFDLEVBQUUsVUFBQyxZQUFZO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFTSxrREFBcUIsR0FBNUI7UUFBQSxpQkFrQkM7UUFqQkcsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsQ0FBQSxDQUFDO1lBQy9DLElBQUksb0JBQWtCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUN6QyxFQUFFLENBQUEsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDdEMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsWUFBWSxHQUFHLG9CQUFrQixDQUFDO29CQUMzRCxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQztvQkFDckYsS0FBSSxDQUFDLFVBQVUsSUFBSSxLQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxHQUFHLG9CQUFrQixDQUFDO29CQUMzRSxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEUsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDbEgsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7b0JBQ3JGLEtBQUksQ0FBQyxVQUFVLElBQUksS0FBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDO2dCQUM5RixDQUFDO2dCQUNELElBQUk7b0JBQ0EsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxvQkFBa0IsQ0FBQztnQkFDM0QsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7SUFDTCxDQUFDO0lBRU8sdURBQTBCLEdBQWxDO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQzFDLElBQU0sY0FBYyxHQUFHO2dCQUNuQixtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO2dCQUM3QyxTQUFTLEVBQUUsNEJBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUk7YUFDdkQsQ0FBQztZQUNGLElBQU0sT0FBTyxHQUF1QjtnQkFDaEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQzVCLE9BQU8sRUFBRSxjQUFjO2dCQUN2QixVQUFVLEVBQUUsS0FBSzthQUNwQixDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLDBEQUEwQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLENBQUM7SUFDTCxDQUFDO0lBRWEsZ0RBQW1CLEdBQWpDOzs7Ozs0QkFDSSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU87NEJBQ2hDLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDOzRCQUMxRSxFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztnQ0FDbEQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztnQ0FDN0QsS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7NEJBQy9FLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLEVBQUE7O3dCQU5GLFNBTUUsQ0FBQzs7Ozs7S0FDTjtJQUVNLDRDQUFlLEdBQXRCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsSUFBSSxFQUFFLENBQUM7WUFDL0csS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN4RCxJQUFJO1lBQ0EsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLGtEQUFxQixHQUE3QjtRQUNJLElBQUksV0FBVyxHQUFHLHNCQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3hLLElBQUksVUFBVSxHQUFHLEtBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBRyxDQUFDO1FBQ25FLElBQUksR0FBRyxHQUFHLHNCQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLFFBQVEsR0FBRyxzQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUcsS0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsU0FBSSxVQUFZLENBQUM7UUFDaEYsSUFBSSxLQUFLLEdBQUc7WUFDUixLQUFLLEVBQUUsVUFBVTtZQUNqQixRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRSxLQUFLO1NBQ2YsQ0FBQztRQUNGLElBQUksQ0FBQywwQkFBMEIsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFWSxpQ0FBSSxHQUFqQjs7Ozs7O3dCQUNRLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7NkJBQy9CLENBQUEsUUFBUSxJQUFJLElBQUksQ0FBQSxFQUFoQix3QkFBZ0I7d0JBQ2YsS0FBQSxJQUFJLENBQUMsVUFBVSxDQUFBO3dCQUFnQixxQkFBTSxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBQTs7d0JBQWpFLEdBQWdCLFlBQVksR0FBRyxTQUFrQyxDQUFDO3dCQUNsRSxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFBOzt3QkFBaEUsU0FBZ0UsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O3dCQUdwQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztLQUN2QjtJQUVPLG9DQUFPLEdBQWYsVUFBZ0IsSUFBVyxFQUFFLE9BQWMsRUFBRSxJQUFXO1FBQ3BELE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVPLDZDQUFnQixHQUF4QjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNkLE9BQU8sRUFBRSxzQkFBTSxDQUFDLE9BQU87WUFDdkIsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO1lBQ3BDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1lBQ3pDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixZQUFZLEVBQUUsRUFBRTtZQUNoQixTQUFTLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ3JDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVk7WUFDdEMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTtZQUMxQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZO1lBQzFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVztZQUM1QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQzlCLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDaEMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTztZQUNwQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3BDLGFBQWEsRUFBRSw0QkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSTtZQUN4RCxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFVBQVU7WUFDdkQsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXO1lBQ3pELGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsYUFBYTtZQUM3RCxXQUFXLEVBQUUsQ0FBQztZQUNkLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsVUFBVTtZQUN2RCxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGNBQWM7WUFDL0QsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxjQUFjO1lBQy9ELGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsY0FBYztZQUMvRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsaUJBQWlCO1lBQ3JFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUM3QixXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDdkIsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ3ZCLFFBQVEsRUFBRSxzQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDakMsYUFBYSxFQUFFLHNCQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQ2xELFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7WUFDbEMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNwQixDQUFDO0lBQ04sQ0FBQztJQUVPLHdDQUFXLEdBQW5CO1FBQ0ksSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLFFBQVEsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNwQyxRQUFRLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUM1QyxDQUFDO0lBRU8sNkNBQWdCLEdBQXhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8sNENBQWUsR0FBdkI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7WUFDcEosTUFBTSxDQUFDLG1GQUFtRixDQUFDO1FBQy9GLElBQUk7WUFDQSxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFyYmlCO1FBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDO2tDQUFNLGlCQUFVO21EQUFDO0lBakN6QixrQkFBa0I7UUFQOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBcUN1Qyw2QkFBYztZQUNaLG9DQUFnQjtZQUNoQixvQ0FBZ0I7WUFDckIsaUNBQWtCO1lBQ3pCLHVCQUFnQjtZQUNQLDRDQUFjO1lBQ3ZCLHVCQUFjO1lBQ0YsZ0NBQWdCO1lBQ1YsZ0RBQXNCO1lBQzVCLG9DQUFnQjtZQUMxQix5QkFBZ0I7WUFDRyxvREFBd0I7T0E5Qy9ELGtCQUFrQixDQXVkN0I7SUFBRCx5QkFBQztDQUFBLEFBdmRGLElBdWRFO0FBdmRXLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBCb3JkZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ09wdGlvbnMsIE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZGFsL2RhdGVwaWNrZXIvbW9kYWwtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRHJvcERvd25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi9jb25maWcvY29uc3RhbnRzLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyL3NlYXJjaC1iYXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2l0ZW1JbnF1aXJ5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5pbXBvcnQgeyBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbC9wcm9kdWN0T3JkZXIvbW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY3VzdG9tZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludmVudG9yeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBUZXJtc0NvZGUgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy90ZXJtc0NvZGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzcyB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NoaXBwaW5nQWRkcmVzcy5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3L3RhYi12aWV3XCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2FsZU9yZGVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuaW1wb3J0ICogYXMgcGxhdGZvcm1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR0xPQkFMRlVOQ1RJT05TIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9nbG9iYWxGdW5jdGlvbnMuY29uZmlnXCI7XHJcbmltcG9ydCB7IEZvbGlvc1RyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9mb2xpb3NUcmFuc2FjdGlvbi5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXNhbGUtb3JkZXJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NhbGUtb3JkZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zYWxlLW9yZGVyLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNhbGVPcmRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIHB1YmxpYyBwcm9kdWN0TGlzdDphbnk7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czphbnk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQcm9kdWN0OmFueSA9IHt9O1xyXG4gICAgcHVibGljIHNlbGVjdGVkQ2FydFByb2R1Y3Q6YW55ID0ge307XHJcbiAgICBwdWJsaWMgZGF0ZXM6YW55O1xyXG4gICAgcHVibGljIHdhcmVob3VzZXM6YW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOm51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc2hpcFZpYXM6YW55O1xyXG4gICAgcHVibGljIHNoaXBWaWE6bnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsaW5lVGl0bGU6c3RyaW5nID0gXCJJdGVtIERldGFpbHNcIjtcclxuICAgIHB1YmxpYyBsaW5lU3ViVGl0bGU6c3RyaW5nID0gXCJTZWxlY3QgYW4gaXRlbSB0byB2aWV3IGRldGFpbHMgYW5kIGFkZFwiO1xyXG4gICAgcHVibGljIHNob3dpbmdQcm9kdWN0OkJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpdGVtQ29kZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGNhcnQ6YW55ID0gW107XHJcbiAgICBwdWJsaWMgcHJvZHVjdFF1YW50aXR5Om51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIG9yaWVudGF0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LW9yaWVudGF0aW9uJyk7XHJcbiAgICBwdWJsaWMgdGFiczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0aW9uVGFiczphbnk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBwdWJsaWMgY3VzdG9tZXI6Q3VzdG9tZXI7XHJcbiAgICBwdWJsaWMgaW52ZW50b3J5TGlzdDogT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4oKTtcclxuICAgIHB1YmxpYyB0b3RhbENhcnRBbW91bnQ6bnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBjYXJ0UXVhbnRpdHk6bnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB1c2VyVGVybXNDb2RlOnN0cmluZztcclxuICAgIHB1YmxpYyBzaGlwcGluZ0FkZHJlc3NMaXN0OmFueSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3M6IGFueTtcclxuICAgIHB1YmxpYyB0b3RhbEN1YmVzOm51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9zYWxlT3JkZXI6U2FsZU9yZGVyO1xyXG4gICAgcHVibGljIEN1c3RvbWVyUE9ObzpzdHJpbmc7XHJcbiAgICBwdWJsaWMgQ3VzdG9tZXJDb25maXJtVG86c3RyaW5nO1xyXG4gICAgcHVibGljIEN1c3RvbWVyRkJPOnN0cmluZztcclxuICAgIHB1YmxpYyBDb21tZW50OnN0cmluZztcclxuICAgIEBWaWV3Q2hpbGQoJ1F0eScpIFF0eTogRWxlbWVudFJlZjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLCBcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lciwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3Rlcm1zQ29kZVNlcnZpY2U6IFRlcm1zQ29kZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlOiBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2ZvbGlvc1RyYW5zYWN0aW9uc1NlcnZpY2U6IEZvbGlvc1RyYW5zYWN0aW9uU2VydmljZVxyXG4gICAgICAgICAgICApe1xyXG4gICAgICAgIHRoaXMuZGF0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNoaXBWaWFzID0gW107XHJcbiAgICAgICAgdGhpcy5kYXRlcy5zaGlwRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRlcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGVzLnNoaXBEYXRlID0gYCR7dGhpcy5kYXRlcy5zaGlwRGF0ZS5nZXREYXRlKCkgKyAxfS8ke3RoaXMuZGF0ZXMuc2hpcERhdGUuZ2V0TW9udGgoKSArIDF9LyR7dGhpcy5kYXRlcy5zaGlwRGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAgICAgdGhpcy5kYXRlcy5kYXRlID0gYCR7dGhpcy5kYXRlcy5kYXRlLmdldERhdGUoKX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0TW9udGgoKX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0RnVsbFllYXIoKX1gO1xyXG4gICAgICAgIENPTlNUQU5UUy5zaGlwVmlhcy5tYXAoc2hpcFZpYSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcFZpYXMucHVzaChzaGlwVmlhLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0Lkl0ZW1Db2RlID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5jb21tZW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuSXRlbUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIC8vdGhpcy5vcmllbnRhdGlvbi5zZXRPcmllbnRhdGlvbihcImxhbmRzY2FwZXJpZ2h0XCIpOyAgXHJcbiAgICAgICAgdGhpcy50YWJzID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25UYWJzID0gW3tcclxuICAgICAgICAgICAgdGl0bGU6IFwiSEVBREVSXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQUREUkVTU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJMSU5FU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJUT1RBTFNcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcclxuICAgICAgICB9XTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMubWFwKHRhYiA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcclxuICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IHRhYi50aXRsZTtcclxuICAgICAgICAgICAgdGhpcy50YWJzLnB1c2goc2VnbWVudGVkQmFySXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAoICh0YWIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ID09IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB0YWIudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRhYi52aXNpYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgU0VSVkVSLmlzUXVvdGUgPSBKU09OLnBhcnNlKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiSXNRdW90ZVwiXSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRDdXN0b21lcih0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcIkN1c3RvbWVyTm9cIl0pO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0U2hpcHBpbmdBZGRyZXNzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRJbnZlbnRvcnkoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldFRlcm1zQ29kZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hTYWxlT3JkZXIoKTtcclxuICAgICAgICB0aGlzLndhcmVob3VzZXMgPSBhd2FpdCBHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVTaGlwcGluZ0FkZHJlc3MoKXtcclxuICAgICAgICB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdID0ge307XHJcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3NMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXVtcIlNoaXBUb05hbWVcIl0gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl1bXCJBZGRyZXNzTGluZTFcIl0gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl1bXCJBZGRyZXNzTGluZTJcIl0gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl1bXCJTaGlwVG9DaXR5XCJdID0gXCJcIjtcclxuICAgICAgICB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdW1wiU2hpcFRvU3RhdGVcIl0gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl1bXCJTaGlwVG9aaXBDb2RlXCJdID0gXCJcIjsgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0RG9jdW1lbnQoKXtcclxuICAgICAgICBpZih0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5zZXRQcm9kdWN0RG9jdW1lbnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0RG9jdW1lbnQoKTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1c3RvbWVyKEN1c3RvbWVyTm86c3RyaW5nKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImN1c3RvbWVyXCIpW1wiY3VzdG9tZXJcIl07XHJcbiAgICAgICAgZG9jLm1hcChjdXN0b21lciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21lci5DdXN0b21lck5vICA9PSBDdXN0b21lck5vKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lciA9IGN1c3RvbWVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUZXJtc0NvZGUoKXtcclxuICAgICAgICBpZih0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidGVybXNjb2RlXCIpID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2Uuc2V0VGVybXNDb2RlRG9jKCk7XHJcbiAgICAgICAgdGhpcy51c2VyVGVybXNDb2RlID0gdGhpcy5fdGVybXNDb2RlU2VydmljZS5nZXRVc2VyVGVybXNDb2RlKHRoaXMuY3VzdG9tZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZXRTaGlwcGluZ0FkZHJlc3MoKXtcclxuICAgICAgICBpZih0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2hpcHBpbmdhZGRyZXNzXCIpID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2Uuc2V0U2hpcHBpbmdBZGRyZXNzRG9jKCk7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPSBhd2FpdCB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLmdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKHRoaXMuY3VzdG9tZXIpO1xyXG4gICAgICAgIGlmKHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwpXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudmFsaWRhdGVTaGlwcGluZ0FkZHJlc3MoKTtcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzc0xpc3QgPSBhd2FpdCB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLmdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzTGlzdCh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SW52ZW50b3J5KCl7XHJcbiAgICAgICAgaWYodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImludmVudG9yeVwiKSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLnNldEludmVudG9yaWVzRG9jKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IHRoaXMuX2ludmVudG9yeVNlcnZpY2UuZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHRoaXMud2FyZWhvdXNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MoYXJnczpTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSl7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl0gPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2FsZU9yZGVyKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VzdG9tZXJTaGlwVmlhKGFyZ3M6U2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBWaWEgPSBhcmdzLm5ld0luZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTYWxlT3JkZXIoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXJJbnZlbnRvcnlXYXJlaG91c2UoKXtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnZlbnRvcnlMaXN0ID0gdGhpcy5faW52ZW50b3J5U2VydmljZS5nZXRJbnZlbnRvcnlXYXJlaG91c2UodGhpcy53YXJlaG91c2UpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTYWxlT3JkZXIoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RGF0ZU1vZGFsKGlucHV0OnN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVzW2lucHV0XSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFNhbGVPcmRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gYWxlcnQoZXJyb3IpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbFZpZXcoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB0b2RheS50b0RhdGVTdHJpbmcoKSxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsRGF0ZUNvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKClcclxuICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG5cclxuICAgICAgICBpZihzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKCAocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9kdWN0c1tpbmRleF0uSXRlbUNvZGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKHRoaXMuX3Byb2R1Y3RzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbCgpe1xyXG4gICAgICAgIHRoaXMuc2hvd2luZ1Byb2R1Y3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHt9O1xyXG4gICAgICAgIHRoaXMubGluZVRpdGxlID0gIFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICAgICAgdGhpcy5saW5lU3ViVGl0bGUgPSBcIlNlbGVjdCBhbiBpdGVtIHRvIHZpZXcgZGV0YWlscyBhbmQgYWRkXCI7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0UXVhbnRpdHkgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWV3UHJvZHVjdChwcm9kdWN0OlByb2R1Y3Qpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICB0aGlzLnNob3dpbmdQcm9kdWN0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxpbmVUaXRsZSA9IHByb2R1Y3QuSXRlbUNvZGVEZXNjO1xyXG4gICAgICAgIHRoaXMubGluZVN1YlRpdGxlID0gcHJvZHVjdC5JdGVtQ29kZTtcclxuICAgICAgICB0aGlzLml0ZW1Db2RlID0gcHJvZHVjdC5JdGVtQ29kZTtcclxuICAgICAgICB0aGlzLmdldEludmVudG9yeVF1YW50aXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlYXJjaEl0ZW1Db2RlKGNvZGU6c3RyaW5nLCBsaXN0OmFueSl7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBmYWxzZTtcclxuICAgICAgICBsaXN0Lm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGxpc3RbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkgPT0gY29kZS50b0xvd2VyQ2FzZSgpKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSB0aGlzLl9wcm9kdWN0c1tpbmRleF07IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlUHJvZHVjdExpc3QoKXtcclxuICAgICAgICBpZih0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuX3Byb2R1Y3RzKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgYWxlcnQoYEludmFsaWQgaXRlbSBjb2RlLiAke3RoaXMuaXRlbUNvZGV9IGRvZXMgbm90IGV4aXN0LmApO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy52aWV3UHJvZHVjdCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlSW50ZWdlck51bWJlcihudW1iZXIpe1xyXG4gICAgICAgIGlmKG51bWJlciAhPSBwYXJzZUludChudW1iZXIsIDEwKSB8fCBudW1iZXIgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9ICAgXHJcblxyXG4gICAgcHVibGljIGFkZFByb2R1Y3QoKXtcclxuICAgICAgICBsZXQgcHJvZHVjdCA9IHRoaXMuc2VhcmNoSXRlbUNvZGUodGhpcy5pdGVtQ29kZSwgdGhpcy5jYXJ0KTtcclxuICAgICAgICBpZih0aGlzLnZhbGlkYXRlSW50ZWdlck51bWJlcih0aGlzLnByb2R1Y3RRdWFudGl0eSkpe1xyXG4gICAgICAgICAgICBpZihwcm9kdWN0ID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5ID0gdGhpcy5wcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eVByaWNlID0gdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkgKiBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FydC5wdXNoKHRoaXMuc2VsZWN0ZWRQcm9kdWN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ICs9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5ICsgcGFyc2VJbnQodGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzICs9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoYEl0ZW0gJHt0aGlzLml0ZW1Db2RlfSBhZGRlZCB0byBjYXJ0LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdE9yZGVyTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIkludmFsaWQgcXVhbnRpdHlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgfSw1MDApO1xyXG4gICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy50ZXh0UmFuZ2VGcm9tUG9zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLmJlZ2lubmluZ09mRG9jdW1lbnQsIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLmVuZE9mRG9jdW1lbnQpO1xyXG4gICAgICAgIH0gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0NhcnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmNhcnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRDYXJ0UHJvZHVjdChwcm9kdWN0OlByb2R1Y3Qpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZUNhcnRQcm9kdWN0KCl7XHJcbiAgICAgICAgdGhpcy5jYXJ0Lm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2FydFtpbmRleF0uSXRlbUNvZGUgPT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0Lkl0ZW1Db2RlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgLSBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgLSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgLT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FydC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2NhbigpIHtcclxuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xyXG4gICAgICAgICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxyXG4gICAgICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSwgICBcclxuICAgICAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLCAgICAgXHJcbiAgICAgICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSwgICAgICAgIFxyXG4gICAgICAgICAgICBiZWVwT25TY2FuOiB0cnVlLCAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdG9yY2hPbjogZmFsc2UsICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLCAgIFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJvcmllbnRhdGlvblwiLCAgICAgXHJcbiAgICAgICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWVcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUNvZGUgPSByZXN1bHQudGV4dDtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gc2Nhbm5pbmcgXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1Byb2R1Y3RPcmRlck1vZGFsKCl7XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGxldCBvbGRQcm9kdWN0UXVhbnRpdHkgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlld1Byb2R1Y3RFZGl0KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0ICE9IG51bGwgJiYgcmVzdWx0LnF1YW50aXR5ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSAtIG9sZFByb2R1Y3RRdWFudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50IC0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzIC09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5DYXRlZ29yeTQgKiBvbGRQcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSArIHBhcnNlSW50KHJlc3VsdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2UgPSByZXN1bHQucXVhbnRpdHkgKiBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgPSB0aGlzLnRvdGFsQ2FydEFtb3VudCArIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuQ2F0ZWdvcnk0ICogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSA9IG9sZFByb2R1Y3RRdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFNhbGVPcmRlcigpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbFZpZXdQcm9kdWN0RWRpdCgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSAhPSBudWxsKXtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdERldGFpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhcnRQcm9kdWN0OiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICB3YXJlaG91c2U6IENPTlNUQU5UUy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXS5uYW1lXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBwcm9kdWN0RGV0YWlscyxcclxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRJbnZlbnRvcnlRdWFudGl0KCl7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbnZlbnRvcnlMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHF1YW50aXR5QXZhaWwgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kIC0gcHJvZHVjdC5RdWFudGl0eU9uU2FsZXNPcmRlcjtcclxuICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPT0gcHJvZHVjdC5JdGVtQ29kZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eU9uSGFuZCA9IHByb2R1Y3QuUXVhbnRpdHlPbkhhbmQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eUF2YWlsID0gcXVhbnRpdHlBdmFpbCA8IDAgPyAwIDogcXVhbnRpdHlBdmFpbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RGVzY3JpcHRpb24oKXtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dCAhPSB1bmRlZmluZWQgfHwgdGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQgIT0gXCJcIilcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYWxlcnQoXCJEZXNjcmlwdGlvbiBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZUZvbGlvc1RyYW5zYWN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGZvbGlvTnVtYmVyID0gU0VSVkVSLmlzUXVvdGUgPyB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlLmdldFF1b3RlVHJhbnNhY3Rpb25zKCkubGVuZ3RoICsgMSA6IHRoaXMuX2ZvbGlvc1RyYW5zYWN0aW9uc1NlcnZpY2UuZ2V0U2FsZVRyYW5zYWN0aW9ucygpLmxlbmd0aCArIDE7XHJcbiAgICAgICAgbGV0IGZvbGlvU2VyaWUgPSBgJHt0aGlzLnBhZExlZnQoZm9saW9OdW1iZXIudG9TdHJpbmcoKSwgJzAnLCA2KX1gO1xyXG4gICAgICAgIGxldCBkb2MgPSBTRVJWRVIuaXNRdW90ZSA/IFwiUXVvdGVcIiA6IFwiU2FsZVwiO1xyXG4gICAgICAgIGxldCBkb2NTZXJpZSA9IFNFUlZFUi5pc1F1b3RlID8gXCJRXCIgOiBcIlNcIjtcclxuICAgICAgICBsZXQgc2VyaWUgPSBgJHtwbGF0Zm9ybU1vZHVsZS5kZXZpY2UudXVpZC5zbGljZSgwLDYpfSR7ZG9jU2VyaWV9LSR7Zm9saW9TZXJpZX1gO1xyXG4gICAgICAgIGxldCBmb2xpbyA9IHtcclxuICAgICAgICAgICAgRm9saW86IGZvbGlvU2VyaWUsXHJcbiAgICAgICAgICAgIERvY3VtZW50OiBkb2MsXHJcbiAgICAgICAgICAgIFNlcmllOiBzZXJpZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS51cGRhdGVGb2xpb3NUcmFuc2FjdGlvbkRvYyhmb2xpbyk7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzYXZlKCl7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gdGhpcy52YWxpZGF0aW9ucygpO1xyXG4gICAgICAgIGlmKG1lc3NhZ2VzID09IFwiT0tcIil7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TYWxlc09yZGVyTk8gPSBhd2FpdCB0aGlzLnNhdmVGb2xpb3NUcmFuc2FjdGlvbigpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLnVwZGF0ZVNhbGVPcmRlckRvYyh0aGlzLl9zYWxlT3JkZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIuYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlICAgIFxyXG4gICAgICAgICAgICBhbGVydChtZXNzYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYWRMZWZ0KHRleHQ6c3RyaW5nLCBwYWRDaGFyOnN0cmluZywgc2l6ZTpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAoU3RyaW5nKHBhZENoYXIpLnJlcGVhdChzaXplKSArIHRleHQpLnN1YnN0ciggKHNpemUgKiAtMSksIHNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFNhbGVPcmRlcigpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUyID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUyID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSB7XHJcbiAgICAgICAgICAgIElzUXVvdGU6IFNFUlZFUi5pc1F1b3RlLFxyXG4gICAgICAgICAgICBTYXZlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyTm86IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJObyxcclxuICAgICAgICAgICAgQ3VzdG9tZXJQT05vOiB0aGlzLkN1c3RvbWVyUE9ObyxcclxuICAgICAgICAgICAgQ3VzdG9tZXJDb25maXJtVG86IHRoaXMuQ3VzdG9tZXJDb25maXJtVG8sXHJcbiAgICAgICAgICAgIEN1c3RvbWVyRkJPOiB0aGlzLkN1c3RvbWVyRkJPLFxyXG4gICAgICAgICAgICBTYWxlc09yZGVyTk86IFwiXCIsXHJcbiAgICAgICAgICAgIERldmljZVVpZDogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQsXHJcbiAgICAgICAgICAgIEJpbGxUb05hbWU6IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOYW1lLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMTogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTEsXHJcbiAgICAgICAgICAgIEJpbGxUb0FkZHJlc3MyOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMixcclxuICAgICAgICAgICAgQmlsbFRvQ291bnRyeUNvZGU6IHRoaXMuY3VzdG9tZXIuQ291bnRyeUNvZGUsXHJcbiAgICAgICAgICAgIEJpbGxUb0NpdHk6IHRoaXMuY3VzdG9tZXIuQ2l0eSxcclxuICAgICAgICAgICAgQmlsbFRvU3RhdGU6IHRoaXMuY3VzdG9tZXIuU3RhdGUsXHJcbiAgICAgICAgICAgIEJpbGxUb1ppcENvZGU6IHRoaXMuY3VzdG9tZXIuWmlwQ29kZSxcclxuICAgICAgICAgICAgU2hpcFZpYTogdGhpcy5zaGlwVmlhc1t0aGlzLnNoaXBWaWFdLFxyXG4gICAgICAgICAgICBXYXJlaG91c2VDb2RlOiBDT05TVEFOVFMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0uY29kZSxcclxuICAgICAgICAgICAgU2hpcFRvQ2l0eTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9DaXR5LFxyXG4gICAgICAgICAgICBTaGlwVG9TdGF0ZTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9TdGF0ZSxcclxuICAgICAgICAgICAgU2hpcFRvWmlwQ29kZTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9aaXBDb2RlLFxyXG4gICAgICAgICAgICBEaXNjb3VudEFtdDogMCxcclxuICAgICAgICAgICAgU2hpcFRvTmFtZTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9OYW1lLFxyXG4gICAgICAgICAgICBTaGlwVG9BZGRyZXNzMTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9BZGRyZXNzMSxcclxuICAgICAgICAgICAgU2hpcFRvQWRkcmVzczI6IHRoaXMuY3VzdG9tZXJbXCJzaGlwcGluZ0FkZHJlc3NcIl0uU2hpcFRvQWRkcmVzczIsXHJcbiAgICAgICAgICAgIFNoaXBUb0FkZHJlc3MzOiB0aGlzLmN1c3RvbWVyW1wic2hpcHBpbmdBZGRyZXNzXCJdLlNoaXBUb0FkZHJlc3MzLFxyXG4gICAgICAgICAgICBTaGlwVG9Db3VudHJ5Q29kZTogdGhpcy5jdXN0b21lcltcInNoaXBwaW5nQWRkcmVzc1wiXS5TaGlwVG9Db3VudHJ5Q29kZSxcclxuICAgICAgICAgICAgT3JkZXJEYXRlOiB0aGlzLmRhdGVzLmRhdGUsXHJcbiAgICAgICAgICAgIFNoaXBEYXRlOiB0aGlzLmRhdGVzLnNoaXBEYXRlLFxyXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgRGF0ZVVwZGF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIFVzZXJDb2RlOiBTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdLFxyXG4gICAgICAgICAgICBTYWxlc3BlcnNvbk5vOiBTRVJWRVIudXNlcltcIkRlZmF1bHRTYWxlc3BlcnNvbklEXCJdLFxyXG4gICAgICAgICAgICBUZXJtc0NvZGU6IHRoaXMuY3VzdG9tZXIuVGVybXNDb2RlLFxyXG4gICAgICAgICAgICBDb21tZW50OiB0aGlzLkNvbW1lbnQsXHJcbiAgICAgICAgICAgIERldGFpbDogdGhpcy5jYXJ0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRpb25zKCl7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gXCJcIjtcclxuICAgICAgICBtZXNzYWdlcyArPSB0aGlzLnZhbGlkYXRlUHJvZHVjdHMoKTtcclxuICAgICAgICBtZXNzYWdlcyArPSB0aGlzLnZhbGlkYXRlQWRkcmVzcygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlcyA9PSBcIlwiID8gXCJPS1wiIDogbWVzc2FnZXM7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVQcm9kdWN0cygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhcnQubGVuZ3RoID4gMCA/IFwiXCIgOiBcIllvdSBuZWVkIHRvIGFkZCBwcm9kdWN0cyB0byBjYXJ0IFxcblwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVBZGRyZXNzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MxID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0NpdHkgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvU3RhdGUgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvWmlwQ29kZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIFNoaXBwaW5nIEFkZHJlc3MgbXVzdCBoYXZlIChGaXJzdCBBZGRyZXNzIGxpbmUsIENpdHksIFN0YXRlIGFuZCBaaXAgY29kZSkgXFxuXCI7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuIH0iXX0=