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
        this.productQuantity = 1;
        this.orientation = require('nativescript-orientation');
        this.selectedIndex = 0;
        this.inventoryList = new observable_array_1.ObservableArray();
        this.totalCartAmount = 0;
        this.cartQuantity = 0;
        this.shippingAddressList = [];
        this.totalCubes = 0;
        this.shipMethods = ["Delivery", "Pickup"];
        this.shipMethod = 0;
        this.shipVias = [];
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
    SaleOrderComponent.prototype.ngOnDestroy = function () {
        server_config_1.SERVER.editTransaction.edit = false;
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
                        _a = this;
                        return [4 /*yield*/, this._termsCodeService.getUserTermsCode(this.customer)];
                    case 4:
                        _a.userTermsCode = _b.sent();
                        return [4 /*yield*/, this.setDocument()];
                    case 5:
                        _b.sent();
                        this.warehouses = globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouses();
                        return [4 /*yield*/, this.refreshSaleOrder()];
                    case 6:
                        _b.sent();
                        if (!!server_config_1.SERVER.editTransaction.edit) return [3 /*break*/, 7];
                        this._saleOrder.ShipDate = this._saleOrder.ShipDate.getDate() + 1 + "/" + (this._saleOrder.ShipDate.getMonth() + 1) + "/" + this._saleOrder.ShipDate.getFullYear();
                        this._saleOrder.OrderDate = this._saleOrder.OrderDate.getDate() + "/" + this._saleOrder.OrderDate.getMonth() + "/" + this._saleOrder.OrderDate.getFullYear();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.getTransaction()];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.getTransaction = function () {
        var _this = this;
        console.log(server_config_1.SERVER.isQuote);
        if (server_config_1.SERVER.isQuote) {
            this._saleOrderService.getUserQuoteUnsaved().map(function (quote) {
                if (quote.SalesOrderNO == server_config_1.SERVER.editTransaction.transactionNo) {
                    _this._saleOrder = quote;
                }
            });
        }
        else {
            this._saleOrderService.getUserSaleOrderUnsaved().map(function (sale) {
                if (sale.SalesOrderNO == server_config_1.SERVER.editTransaction.transactionNo) {
                    _this._saleOrder = sale;
                }
            });
        }
        this.warehouse = this.warehouses.indexOf(globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouseByCode(this._saleOrder.WarehouseCode)["name"]);
        this.shipVia = this.shipVias.findIndex(function (shipVia) { return shipVia === _this._saleOrder.ShipVia; });
        this.shipMethod = this._saleOrder.ShipMethod == "Delivery" ? 0 : 1;
        this.calculateCart();
    };
    SaleOrderComponent.prototype.calculateCart = function () {
        var _this = this;
        this._saleOrder.Detail.map(function (product) {
            _this.totalCartAmount += product.quantityPrice;
            _this.cartQuantity += parseInt(product.quantity);
            _this.totalCubes += product.Category4 * product.quantity;
        });
    };
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
    SaleOrderComponent.prototype.setDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
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
    SaleOrderComponent.prototype.setShippingAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._shippingAddressService.getCustomerShippingAddress(this.customer)];
                    case 1:
                        _a._customerShippingAddress = _c.sent();
                        if (!(this._customerShippingAddress == null)) return [3 /*break*/, 2];
                        this.shippingAddressList = [];
                        return [3 /*break*/, 4];
                    case 2:
                        _b = this;
                        return [4 /*yield*/, this._shippingAddressService.getCustomerShippingAddressList(this.customer)];
                    case 3:
                        _b.shippingAddressList = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.setInventory = function () {
        var warehouseCode = globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouseByName(this.warehouses[this.warehouse])["code"];
        this.inventoryList = this._inventoryService.getInventoryWarehouse(warehouseCode);
    };
    SaleOrderComponent.prototype.setCustomerShippingAddress = function (args) {
        var _this = this;
        setTimeout(function () {
            _this._saleOrder.ShipToCity = _this._customerShippingAddress[args.newIndex].ShipToCity;
            _this._saleOrder.ShipToState = _this._customerShippingAddress[args.newIndex].ShipToState;
            _this._saleOrder.ShipToZipCode = _this._customerShippingAddress[args.newIndex].ShipToZipCode;
            _this._saleOrder.ShipToName = _this._customerShippingAddress[args.newIndex].ShipToName;
            _this._saleOrder.ShipToAddress1 = _this._customerShippingAddress[args.newIndex].ShipToAddress1;
            _this._saleOrder.ShipToAddress2 = _this._customerShippingAddress[args.newIndex].ShipToAddress2;
            _this._saleOrder.ShipToAddress3 = _this._customerShippingAddress[args.newIndex].ShipToAddress3;
            _this._saleOrder.ShipToCountryCode = _this._customerShippingAddress[args.newIndex].ShipToCountryCode;
            _this._saleOrder.ShipTo = args.newIndex;
        }, 500);
    };
    SaleOrderComponent.prototype.setCustomerShipVia = function (args) {
        var _this = this;
        setTimeout(function () {
            _this.shipVia = args.newIndex;
            _this._saleOrder.ShipVia = _this.shipVias[_this.shipVia];
        }, 500);
    };
    SaleOrderComponent.prototype.filterInventoryWarehouse = function () {
        var _this = this;
        setTimeout(function () {
            _this.cancel();
            _this.inventoryList = _this._inventoryService.getInventoryWarehouse(globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouseByName(_this.warehouses[_this.warehouse])["code"]);
            _this._saleOrder.WarehouseCode = globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouseByName(_this.warehouses[_this.warehouse])["code"];
        }, 500);
    };
    SaleOrderComponent.prototype.showDateModal = function (input) {
        var _this = this;
        this.createModelView().then(function (result) {
            if (result != null) {
                _this._saleOrder[input] = result;
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = this.searchItemCode(this.itemCode, this._saleOrder.Detail);
                        if (!this.validateIntegerNumber(this.productQuantity)) return [3 /*break*/, 4];
                        if (!(product == false)) return [3 /*break*/, 1];
                        this.selectedProduct.quantity = this.productQuantity;
                        this.selectedProduct.quantityPrice = this.selectedProduct.quantity * parseFloat(this.selectedProduct.StandardUnitPrice);
                        this._saleOrder.Detail.push(this.selectedProduct);
                        this.totalCartAmount += this.selectedProduct.quantityPrice;
                        this.cartQuantity = this.cartQuantity + parseInt(this.selectedProduct.quantity);
                        this.totalCubes += this.selectedProduct.Category4 * this.selectedProduct.quantity;
                        alert("Item " + this.itemCode + " added to cart.");
                        return [3 /*break*/, 3];
                    case 1:
                        this.selectedCartProduct = product;
                        return [4 /*yield*/, alert("Item " + this.itemCode + " is already added to cart.")];
                    case 2:
                        _a.sent();
                        this.showProductOrderModal();
                        _a.label = 3;
                    case 3:
                        this.cancel();
                        return [3 /*break*/, 5];
                    case 4:
                        alert("Invalid quantity");
                        this.Qty.nativeElement.focus();
                        setTimeout(function () {
                            _this.Qty.nativeElement.android.selectAll();
                        }, 500);
                        this.Qty.nativeElement.ios.textRangeFromPositionToPosition(this.Qty.nativeElement.ios.beginningOfDocument, this.Qty.nativeElement.ios.endOfDocument);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.showCart = function () {
        console.log(JSON.stringify(this._saleOrder.Detail));
    };
    SaleOrderComponent.prototype.setSelectedCartProduct = function (product) {
        this.selectedCartProduct = product;
    };
    SaleOrderComponent.prototype.deleteCartProduct = function () {
        var _this = this;
        this._saleOrder.Detail.map(function (product, index) {
            if (_this._saleOrder.Detail[index].ItemCode == _this.selectedCartProduct.ItemCode) {
                _this.totalCartAmount = _this.totalCartAmount - parseFloat(_this.selectedCartProduct.quantityPrice);
                _this.cartQuantity = _this.cartQuantity - _this.selectedCartProduct.quantity;
                _this.totalCubes -= _this.selectedCartProduct.Category4 * _this.selectedCartProduct.quantity;
                _this._saleOrder.Detail.splice(index, 1);
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
            }).catch(function (error) { return alert(error); });
        }
    };
    SaleOrderComponent.prototype.createModelViewProductEdit = function () {
        if (this.selectedCartProduct.quantity != null) {
            var productDetails = {
                selectedCartProduct: this.selectedCartProduct,
                warehouse: globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouseByCode(this._saleOrder.WarehouseCode)["name"]
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
                    case 0: 
                    // console.log(JSON.stringify(this.inventoryList));
                    return [4 /*yield*/, this.inventoryList.map(function (product) {
                            var quantityAvail = product.QuantityOnHand - product.QuantityOnSalesOrder;
                            if (_this.selectedProduct.ItemCode == product.ItemCode) {
                                _this.selectedProduct.quantityOnHand = product.QuantityOnHand;
                                _this.selectedProduct.quantityAvail = quantityAvail < 0 ? 0 : quantityAvail;
                            }
                        })];
                    case 1:
                        // console.log(JSON.stringify(this.inventoryList));
                        _a.sent();
                        if (this.selectedProduct.quantityOnHand == null) {
                            this.selectedProduct.quantityOnHand = 0;
                            this.selectedProduct.quantityAvail = 0;
                        }
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
            var messages, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        messages = this.validations();
                        if (!(messages == "OK")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.setLineProduct()];
                    case 1:
                        _c.sent();
                        _a = this._saleOrder;
                        if (!(this._saleOrder.SalesOrderNO == "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.saveFoliosTransaction()];
                    case 2:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = this._saleOrder.SalesOrderNO;
                        _c.label = 4;
                    case 4:
                        _a.SalesOrderNO = _b;
                        return [4 /*yield*/, this._saleOrderService.updateSaleOrderDoc(this._saleOrder)];
                    case 5:
                        _c.sent();
                        console.log(JSON.stringify(this._saleOrder));
                        this._router.navigate(["/home"], { clearHistory: true });
                        return [3 /*break*/, 7];
                    case 6:
                        alert(messages);
                        _c.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SaleOrderComponent.prototype.padLeft = function (text, padChar, size) {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    };
    SaleOrderComponent.prototype.refreshSaleOrder = function () {
        this._saleOrder = {
            IsQuote: server_config_1.SERVER.isQuote,
            Saved: false,
            Sending: false,
            CustomerNo: this.customer.CustomerNo,
            CustomerName: this.customer.CustomerName,
            CustomerPONo: "",
            CustomerConfirmTo: "",
            CustomerFBO: "",
            SalesOrderNO: "",
            DeviceUid: platformModule.device.uuid,
            ShipMethod: "",
            BillToName: this.customer.CustomerName,
            BillToAddress1: this.customer.AddressLine1,
            BillToAddress2: this.customer.AddressLine2 == null ? "" : this.customer.AddressLine2,
            BillToAddress3: this.customer.AddressLine3 == null ? "" : this.customer.AddressLine3,
            BillToCountryCode: this.customer.CountryCode,
            BillToCity: this.customer.City,
            BillToState: this.customer.State,
            BillToZipCode: this.customer.ZipCode,
            ShipVia: "",
            WarehouseCode: globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouseByName(this.warehouses[this.warehouse])["code"],
            ShipTo: 0,
            ShipToCity: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToCity,
            ShipToState: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToState,
            ShipToZipCode: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToZipCode,
            DiscountAmt: 0,
            ShipToName: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToName,
            ShipToAddress1: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToAddress1,
            ShipToAddress2: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToAddress2,
            ShipToAddress3: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToAddress3,
            ShipToCountryCode: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToCountryCode,
            OrderDate: new Date(),
            ShipDate: new Date(),
            DateCreated: new Date(),
            DateUpdated: new Date(),
            UserCode: server_config_1.SERVER.user["UserCode"],
            SalespersonNo: server_config_1.SERVER.user["DefaultSalespersonID"],
            TermsCode: this.customer.TermsCode,
            Comment: "",
            Detail: []
        };
    };
    SaleOrderComponent.prototype.validations = function () {
        var messages = "";
        messages += this.validateProducts();
        console.log(this.shipMethod);
        if (this.shipMethod == 0)
            messages += this.validateAddress();
        return messages == "" ? "OK" : messages;
    };
    SaleOrderComponent.prototype.validateProducts = function () {
        return this._saleOrder.Detail.length > 0 ? "" : "You need to add products to cart \n";
    };
    SaleOrderComponent.prototype.validateAddress = function () {
        if (this._saleOrder.ShipToAddress1 == "" || this._saleOrder.ShipToCity == "" || this._saleOrder.ShipToState == "" || this._saleOrder.ShipToZipCode == "")
            return "Your Shipping Address must have (First Address line, City, State and Zip code) \n";
        else
            return "";
    };
    SaleOrderComponent.prototype.setLineProduct = function () {
        this._saleOrder.Detail.map(function (product, index) {
            product.lineItem = index + 1;
            product.quantity = parseInt(product.quantity);
        });
    };
    SaleOrderComponent.prototype.setShipMethod = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.shipMethod == 1) {
                _this.warehouse = 0;
                _this.warehouses.splice(_this.warehouses.length - 1);
            }
            else {
                if (_this.warehouses.indexOf("Direct") == -1)
                    _this.warehouses.push("Direct");
            }
            _this._saleOrder.ShipMethod = _this.shipMethods[_this.shipMethod];
        }, 500);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRztBQUV0RyxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBQ2pHLGtEQUFrRTtBQUNsRSwwQ0FBaUQ7QUFHakQsc0VBQW9FO0FBRXBFLDhEQUFnRTtBQUdoRSxrRkFBZ0Y7QUFFaEYsc0VBQW9FO0FBRXBFLDREQUFvRDtBQUNwRCwwREFBNEQ7QUFDNUQsc0RBQStEO0FBQy9ELDhFQUFzRTtBQUN0RSxzRkFBb0Y7QUFTcEY7SUErQkksNEJBQW9CLGVBQStCLEVBQ3ZDLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBZ0MsRUFDaEMsS0FBdUIsRUFDdkIsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsT0FBeUIsRUFDekIsMEJBQW9EO1FBWGhFLGlCQTJDQztRQTNDbUIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ3ZDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLCtCQUEwQixH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LENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO1lBQ3BHLFdBQVcsRUFBRSxJQUFJLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXO1lBQ3RHLGFBQWEsRUFBRSxJQUFJLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO1lBQzFHLFdBQVcsRUFBRSxDQUFDO1lBQ2QsVUFBVSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7WUFDcEcsY0FBYyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7WUFDNUcsY0FBYyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7WUFDNUcsY0FBYyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7WUFDNUcsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMs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SUFDWixDQUFDO0lBdmVpQjtRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBTSxpQkFBVTttREFBQztJQTdCekIsa0JBQWtCO1FBUDlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQWlDdUMsNkJBQWM7WUFDcEIsb0NBQWdCO1lBQ2hCLG9DQUFnQjtZQUNyQixpQ0FBa0I7WUFDekIsdUJBQWdCO1lBQ1AsNENBQWM7WUFDdkIsdUJBQWM7WUFDRixnQ0FBZ0I7WUFDVixnREFBc0I7WUFDNUIsb0NBQWdCO1lBQzFCLHlCQUFnQjtZQUNHLG9EQUF3QjtPQTFDdkQsa0JBQWtCLENBcWdCOUI7SUFBRCx5QkFBQztDQUFBLEFBcmdCRCxJQXFnQkM7QUFyZ0JZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nT3B0aW9ucywgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaXRlbUlucXVpcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCB7IE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZGFsL3Byb2R1Y3RPcmRlci9tb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jdXN0b21lci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW52ZW50b3J5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29kZSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3Rlcm1zQ29kZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2hpcHBpbmdBZGRyZXNzLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXcvdGFiLXZpZXdcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHTE9CQUxGVU5DVElPTlMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2dsb2JhbEZ1bmN0aW9ucy5jb25maWdcIjtcclxuaW1wb3J0IHsgRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZvbGlvc1RyYW5zYWN0aW9uLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtc2FsZS1vcmRlclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2FsZS1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NhbGUtb3JkZXIuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2FsZU9yZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBhbnk7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlczogYW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNoaXBWaWFzOiBhbnk7XHJcbiAgICBwdWJsaWMgc2hpcFZpYTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsaW5lVGl0bGU6IHN0cmluZyA9IFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICBwdWJsaWMgbGluZVN1YlRpdGxlOiBzdHJpbmcgPSBcIlNlbGVjdCBhbiBpdGVtIHRvIHZpZXcgZGV0YWlscyBhbmQgYWRkXCI7XHJcbiAgICBwdWJsaWMgc2hvd2luZ1Byb2R1Y3Q6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpdGVtQ29kZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBwcm9kdWN0UXVhbnRpdHk6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIG9yaWVudGF0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LW9yaWVudGF0aW9uJyk7XHJcbiAgICBwdWJsaWMgdGFiczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0aW9uVGFiczogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgcHVibGljIGN1c3RvbWVyOiBDdXN0b21lcjtcclxuICAgIHB1YmxpYyBpbnZlbnRvcnlMaXN0OiBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PigpO1xyXG4gICAgcHVibGljIHRvdGFsQ2FydEFtb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBjYXJ0UXVhbnRpdHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdXNlclRlcm1zQ29kZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNoaXBwaW5nQWRkcmVzc0xpc3Q6IGFueSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3M6IGFueTtcclxuICAgIHB1YmxpYyB0b3RhbEN1YmVzOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIF9zYWxlT3JkZXI6IFNhbGVPcmRlcjtcclxuICAgIHB1YmxpYyBzaGlwTWV0aG9kczogYW55ID0gW1wiRGVsaXZlcnlcIiwgXCJQaWNrdXBcIl07XHJcbiAgICBwdWJsaWMgc2hpcE1ldGhvZDogbnVtYmVyID0gMDtcclxuICAgIEBWaWV3Q2hpbGQoJ1F0eScpIFF0eTogRWxlbWVudFJlZjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIF90ZXJtc0NvZGVTZXJ2aWNlOiBUZXJtc0NvZGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2U6IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBfZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZTogRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnNoaXBWaWFzID0gW107XHJcbiAgICAgICAgQ09OU1RBTlRTLnNoaXBWaWFzLm1hcChzaGlwVmlhID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaGlwVmlhcy5wdXNoKHNoaXBWaWEubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LmNvbW1lbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLm9yaWVudGF0aW9uLnNldE9yaWVudGF0aW9uKFwibGFuZHNjYXBlcmlnaHRcIik7ICBcclxuICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMgPSBbe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJIRUFERVJcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBRERSRVNTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkxJTkVTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlRPVEFMU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH1dO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAodGFiID0+IHtcclxuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gdGFiLnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLmVkaXQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICBTRVJWRVIuaXNRdW90ZSA9IEpTT04ucGFyc2UodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJJc1F1b3RlXCJdKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmdldEN1c3RvbWVyKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiQ3VzdG9tZXJOb1wiXSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRTaGlwcGluZ0FkZHJlc3MoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldEludmVudG9yeSgpO1xyXG4gICAgICAgIHRoaXMudXNlclRlcm1zQ29kZSA9IGF3YWl0IHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UuZ2V0VXNlclRlcm1zQ29kZSh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldERvY3VtZW50KCk7XHJcbiAgICAgICAgdGhpcy53YXJlaG91c2VzID0gR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZXMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hTYWxlT3JkZXIoKTtcclxuICAgICAgICBpZiAoIVNFUlZFUi5lZGl0VHJhbnNhY3Rpb24uZWRpdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUgPSBgJHt0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUuZ2V0RGF0ZSgpICsgMX0vJHt0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUuZ2V0TW9udGgoKSArIDF9LyR7dGhpcy5fc2FsZU9yZGVyLlNoaXBEYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLk9yZGVyRGF0ZSA9IGAke3RoaXMuX3NhbGVPcmRlci5PcmRlckRhdGUuZ2V0RGF0ZSgpfS8ke3RoaXMuX3NhbGVPcmRlci5PcmRlckRhdGUuZ2V0TW9udGgoKX0vJHt0aGlzLl9zYWxlT3JkZXIuT3JkZXJEYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0VHJhbnNhY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFNFUlZFUi5pc1F1b3RlKVxyXG4gICAgICAgIGlmIChTRVJWRVIuaXNRdW90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJRdW90ZVVuc2F2ZWQoKS5tYXAocXVvdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1b3RlLlNhbGVzT3JkZXJOTyA9PSBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uTm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSBxdW90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCkubWFwKHNhbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhbGUuU2FsZXNPcmRlck5PID09IFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24udHJhbnNhY3Rpb25Obykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlciA9IHNhbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndhcmVob3VzZSA9IHRoaXMud2FyZWhvdXNlcy5pbmRleE9mKEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeUNvZGUodGhpcy5fc2FsZU9yZGVyLldhcmVob3VzZUNvZGUpW1wibmFtZVwiXSk7XHJcbiAgICAgICAgdGhpcy5zaGlwVmlhID0gdGhpcy5zaGlwVmlhcy5maW5kSW5kZXgoc2hpcFZpYSA9PiBzaGlwVmlhID09PSB0aGlzLl9zYWxlT3JkZXIuU2hpcFZpYSlcclxuICAgICAgICB0aGlzLnNoaXBNZXRob2QgPSB0aGlzLl9zYWxlT3JkZXIuU2hpcE1ldGhvZCA9PSBcIkRlbGl2ZXJ5XCIgPyAwIDogMTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ2FydCgpIHtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgKz0gcHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSArPSBwYXJzZUludChwcm9kdWN0LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzICs9IHByb2R1Y3QuQ2F0ZWdvcnk0ICogcHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25UYWJzLm1hcCgodGFiLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleClcclxuICAgICAgICAgICAgICAgIHRhYi52aXNpYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGFiLnZpc2liaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0RG9jdW1lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0RG9jdW1lbnQoKTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1c3RvbWVyKEN1c3RvbWVyTm86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiY3VzdG9tZXJcIilbXCJjdXN0b21lclwiXTtcclxuICAgICAgICBkb2MubWFwKGN1c3RvbWVyID0+IHtcclxuICAgICAgICAgICAgaWYgKGN1c3RvbWVyLkN1c3RvbWVyTm8gPT0gQ3VzdG9tZXJObylcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIgPSBjdXN0b21lcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0U2hpcHBpbmdBZGRyZXNzKCkge1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID0gYXdhaXQgdGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZS5nZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICBpZiAodGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3NMaXN0ID0gW107XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzTGlzdCA9IGF3YWl0IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UuZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NMaXN0KHRoaXMuY3VzdG9tZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SW52ZW50b3J5KCkge1xyXG4gICAgICAgIGxldCB3YXJlaG91c2VDb2RlID0gR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZUJ5TmFtZSh0aGlzLndhcmVob3VzZXNbdGhpcy53YXJlaG91c2VdKVtcImNvZGVcIl07XHJcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlMaXN0ID0gdGhpcy5faW52ZW50b3J5U2VydmljZS5nZXRJbnZlbnRvcnlXYXJlaG91c2Uod2FyZWhvdXNlQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9DaXR5ID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQ2l0eTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1N0YXRlID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvU3RhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9aaXBDb2RlID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvWmlwQ29kZTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb05hbWUgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9OYW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQWRkcmVzczEgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9BZGRyZXNzMTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MyID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQWRkcmVzczI7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMyA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb0FkZHJlc3MzO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQ291bnRyeUNvZGUgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9Db3VudHJ5Q29kZTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUbyA9IGFyZ3MubmV3SW5kZXg7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VzdG9tZXJTaGlwVmlhKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcFZpYSA9IGFyZ3MubmV3SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVmlhID0gdGhpcy5zaGlwVmlhc1t0aGlzLnNoaXBWaWFdXHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmlsdGVySW52ZW50b3J5V2FyZWhvdXNlKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmludmVudG9yeUxpc3QgPSB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLmdldEludmVudG9yeVdhcmVob3VzZShHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlQnlOYW1lKHRoaXMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0pW1wiY29kZVwiXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5XYXJlaG91c2VDb2RlID0gR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZUJ5TmFtZSh0aGlzLndhcmVob3VzZXNbdGhpcy53YXJlaG91c2VdKVtcImNvZGVcIl07XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0RhdGVNb2RhbChpbnB1dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RlbFZpZXcoKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyW2lucHV0XSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbFZpZXcoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB0b2RheS50b0RhdGVTdHJpbmcoKSxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsRGF0ZUNvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuXHJcbiAgICAgICAgaWYgKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd2luZ1Byb2R1Y3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHt9O1xyXG4gICAgICAgIHRoaXMubGluZVRpdGxlID0gXCJJdGVtIERldGFpbHNcIjtcclxuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IFwiU2VsZWN0IGFuIGl0ZW0gdG8gdmlldyBkZXRhaWxzIGFuZCBhZGRcIjtcclxuICAgICAgICB0aGlzLnByb2R1Y3RRdWFudGl0eSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpZXdQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nUHJvZHVjdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcclxuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5nZXRJbnZlbnRvcnlRdWFudGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWFyY2hJdGVtQ29kZShjb2RlOiBzdHJpbmcsIGxpc3Q6IGFueSkge1xyXG4gICAgICAgIGxldCBpdGVtID0gZmFsc2U7XHJcbiAgICAgICAgbGlzdC5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0W2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpID09IGNvZGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHRoaXMuX3Byb2R1Y3RzW2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZVByb2R1Y3RMaXN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuX3Byb2R1Y3RzKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgYWxlcnQoYEludmFsaWQgaXRlbSBjb2RlLiAke3RoaXMuaXRlbUNvZGV9IGRvZXMgbm90IGV4aXN0LmApO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy52aWV3UHJvZHVjdCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlSW50ZWdlck51bWJlcihudW1iZXIpIHtcclxuICAgICAgICBpZiAobnVtYmVyICE9IHBhcnNlSW50KG51bWJlciwgMTApIHx8IG51bWJlciA8IDEpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgYWRkUHJvZHVjdCgpIHtcclxuICAgICAgICBsZXQgcHJvZHVjdCA9IHRoaXMuc2VhcmNoSXRlbUNvZGUodGhpcy5pdGVtQ29kZSwgdGhpcy5fc2FsZU9yZGVyLkRldGFpbCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVJbnRlZ2VyTnVtYmVyKHRoaXMucHJvZHVjdFF1YW50aXR5KSkge1xyXG4gICAgICAgICAgICBpZiAocHJvZHVjdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkgPSB0aGlzLnByb2R1Y3RRdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5UHJpY2UgPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSAqIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZFByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5wdXNoKHRoaXMuc2VsZWN0ZWRQcm9kdWN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ICs9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5ICsgcGFyc2VJbnQodGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzICs9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoYEl0ZW0gJHt0aGlzLml0ZW1Db2RlfSBhZGRlZCB0byBjYXJ0LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICAgIGF3YWl0IGFsZXJ0KGBJdGVtICR7dGhpcy5pdGVtQ29kZX0gaXMgYWxyZWFkeSBhZGRlZCB0byBjYXJ0LmApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdE9yZGVyTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJJbnZhbGlkIHF1YW50aXR5XCIpO1xyXG4gICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5hbmRyb2lkLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy50ZXh0UmFuZ2VGcm9tUG9zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLmJlZ2lubmluZ09mRG9jdW1lbnQsIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLmVuZE9mRG9jdW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0NhcnQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5fc2FsZU9yZGVyLkRldGFpbCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZENhcnRQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVDYXJ0UHJvZHVjdCgpIHtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NhbGVPcmRlci5EZXRhaWxbaW5kZXhdLkl0ZW1Db2RlID09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgPSB0aGlzLnRvdGFsQ2FydEFtb3VudCAtIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSAtIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyAtPSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuQ2F0ZWdvcnk0ICogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2NhbigpIHtcclxuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xyXG4gICAgICAgICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxyXG4gICAgICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGJlZXBPblNjYW46IHRydWUsXHJcbiAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLFxyXG4gICAgICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCxcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IFwib3JpZW50YXRpb25cIixcclxuICAgICAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1Db2RlID0gcmVzdWx0LnRleHQ7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGVuIHNjYW5uaW5nIFwiICsgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1Byb2R1Y3RPcmRlck1vZGFsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRQcm9kdWN0UXVhbnRpdHkgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlld1Byb2R1Y3RFZGl0KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsICYmIHJlc3VsdC5xdWFudGl0eSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5IC0gb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgLSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgLT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIG9sZFByb2R1Y3RRdWFudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5ICsgcGFyc2VJbnQocmVzdWx0LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSA9IHJlc3VsdC5xdWFudGl0eSAqIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50ICsgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzICs9IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5DYXRlZ29yeTQgKiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ID0gb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZU1vZGVsVmlld1Byb2R1Y3RFZGl0KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3REZXRhaWxzID0ge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgd2FyZWhvdXNlOiBHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlQnlDb2RlKHRoaXMuX3NhbGVPcmRlci5XYXJlaG91c2VDb2RlKVtcIm5hbWVcIl1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHByb2R1Y3REZXRhaWxzLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldEludmVudG9yeVF1YW50aXQoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5pbnZlbnRvcnlMaXN0KSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbnZlbnRvcnlMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHF1YW50aXR5QXZhaWwgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kIC0gcHJvZHVjdC5RdWFudGl0eU9uU2FsZXNPcmRlcjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9kdWN0Lkl0ZW1Db2RlID09IHByb2R1Y3QuSXRlbUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5T25IYW5kID0gcHJvZHVjdC5RdWFudGl0eU9uSGFuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5QXZhaWwgPSBxdWFudGl0eUF2YWlsIDwgMCA/IDAgOiBxdWFudGl0eUF2YWlsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlPbkhhbmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eU9uSGFuZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5QXZhaWwgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Rlc2NyaXB0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dCAhPSB1bmRlZmluZWQgfHwgdGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQgIT0gXCJcIilcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYWxlcnQoXCJEZXNjcmlwdGlvbiBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZUZvbGlvc1RyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBmb2xpb051bWJlciA9IFNFUlZFUi5pc1F1b3RlID8gdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS5nZXRRdW90ZVRyYW5zYWN0aW9ucygpLmxlbmd0aCArIDEgOiB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlLmdldFNhbGVUcmFuc2FjdGlvbnMoKS5sZW5ndGggKyAxO1xyXG4gICAgICAgIGxldCBmb2xpb1NlcmllID0gYCR7dGhpcy5wYWRMZWZ0KGZvbGlvTnVtYmVyLnRvU3RyaW5nKCksICcwJywgNil9YDtcclxuICAgICAgICBsZXQgZG9jID0gU0VSVkVSLmlzUXVvdGUgPyBcIlF1b3RlXCIgOiBcIlNhbGVcIjtcclxuICAgICAgICBsZXQgZG9jU2VyaWUgPSBTRVJWRVIuaXNRdW90ZSA/IFwiUVwiIDogXCJTXCI7XHJcbiAgICAgICAgbGV0IHNlcmllID0gYCR7cGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQuc2xpY2UoMCwgNil9JHtkb2NTZXJpZX0tJHtmb2xpb1NlcmllfWA7XHJcbiAgICAgICAgbGV0IGZvbGlvID0ge1xyXG4gICAgICAgICAgICBGb2xpbzogZm9saW9TZXJpZSxcclxuICAgICAgICAgICAgRG9jdW1lbnQ6IGRvYyxcclxuICAgICAgICAgICAgU2VyaWU6IHNlcmllXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlLnVwZGF0ZUZvbGlvc1RyYW5zYWN0aW9uRG9jKGZvbGlvKTtcclxuICAgICAgICByZXR1cm4gc2VyaWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNhdmUoKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gdGhpcy52YWxpZGF0aW9ucygpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlcyA9PSBcIk9LXCIpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZXRMaW5lUHJvZHVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2FsZXNPcmRlck5PID0gdGhpcy5fc2FsZU9yZGVyLlNhbGVzT3JkZXJOTyA9PSBcIlwiID8gYXdhaXQgdGhpcy5zYXZlRm9saW9zVHJhbnNhY3Rpb24oKSA6IHRoaXMuX3NhbGVPcmRlci5TYWxlc09yZGVyTk87XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UudXBkYXRlU2FsZU9yZGVyRG9jKHRoaXMuX3NhbGVPcmRlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuX3NhbGVPcmRlcikpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhZExlZnQodGV4dDogc3RyaW5nLCBwYWRDaGFyOiBzdHJpbmcsIHNpemU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIChTdHJpbmcocGFkQ2hhcikucmVwZWF0KHNpemUpICsgdGV4dCkuc3Vic3RyKChzaXplICogLTEpLCBzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTYWxlT3JkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyID0ge1xyXG4gICAgICAgICAgICBJc1F1b3RlOiBTRVJWRVIuaXNRdW90ZSxcclxuICAgICAgICAgICAgU2F2ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBTZW5kaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgQ3VzdG9tZXJObzogdGhpcy5jdXN0b21lci5DdXN0b21lck5vLFxyXG4gICAgICAgICAgICBDdXN0b21lck5hbWU6IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOYW1lLFxyXG4gICAgICAgICAgICBDdXN0b21lclBPTm86IFwiXCIsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyQ29uZmlybVRvOiBcIlwiLFxyXG4gICAgICAgICAgICBDdXN0b21lckZCTzogXCJcIixcclxuICAgICAgICAgICAgU2FsZXNPcmRlck5POiBcIlwiLFxyXG4gICAgICAgICAgICBEZXZpY2VVaWQ6IHBsYXRmb3JtTW9kdWxlLmRldmljZS51dWlkLFxyXG4gICAgICAgICAgICBTaGlwTWV0aG9kOiBcIlwiLFxyXG4gICAgICAgICAgICBCaWxsVG9OYW1lOiB0aGlzLmN1c3RvbWVyLkN1c3RvbWVyTmFtZSxcclxuICAgICAgICAgICAgQmlsbFRvQWRkcmVzczE6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUxLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMjogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTIgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMixcclxuICAgICAgICAgICAgQmlsbFRvQWRkcmVzczM6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUzID09IG51bGwgPyBcIlwiIDogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTMsXHJcbiAgICAgICAgICAgIEJpbGxUb0NvdW50cnlDb2RlOiB0aGlzLmN1c3RvbWVyLkNvdW50cnlDb2RlLFxyXG4gICAgICAgICAgICBCaWxsVG9DaXR5OiB0aGlzLmN1c3RvbWVyLkNpdHksXHJcbiAgICAgICAgICAgIEJpbGxUb1N0YXRlOiB0aGlzLmN1c3RvbWVyLlN0YXRlLFxyXG4gICAgICAgICAgICBCaWxsVG9aaXBDb2RlOiB0aGlzLmN1c3RvbWVyLlppcENvZGUsXHJcbiAgICAgICAgICAgIFNoaXBWaWE6IFwiXCIsXHJcbiAgICAgICAgICAgIFdhcmVob3VzZUNvZGU6IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeU5hbWUodGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXSlbXCJjb2RlXCJdLFxyXG4gICAgICAgICAgICBTaGlwVG86IDAsXHJcbiAgICAgICAgICAgIFNoaXBUb0NpdHk6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQ2l0eSxcclxuICAgICAgICAgICAgU2hpcFRvU3RhdGU6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvU3RhdGUsXHJcbiAgICAgICAgICAgIFNoaXBUb1ppcENvZGU6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvWmlwQ29kZSxcclxuICAgICAgICAgICAgRGlzY291bnRBbXQ6IDAsXHJcbiAgICAgICAgICAgIFNoaXBUb05hbWU6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvTmFtZSxcclxuICAgICAgICAgICAgU2hpcFRvQWRkcmVzczE6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQWRkcmVzczEsXHJcbiAgICAgICAgICAgIFNoaXBUb0FkZHJlc3MyOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0FkZHJlc3MyLFxyXG4gICAgICAgICAgICBTaGlwVG9BZGRyZXNzMzogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9BZGRyZXNzMyxcclxuICAgICAgICAgICAgU2hpcFRvQ291bnRyeUNvZGU6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQ291bnRyeUNvZGUsXHJcbiAgICAgICAgICAgIE9yZGVyRGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgU2hpcERhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgVXNlckNvZGU6IFNFUlZFUi51c2VyW1wiVXNlckNvZGVcIl0sXHJcbiAgICAgICAgICAgIFNhbGVzcGVyc29uTm86IFNFUlZFUi51c2VyW1wiRGVmYXVsdFNhbGVzcGVyc29uSURcIl0sXHJcbiAgICAgICAgICAgIFRlcm1zQ29kZTogdGhpcy5jdXN0b21lci5UZXJtc0NvZGUsXHJcbiAgICAgICAgICAgIENvbW1lbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIERldGFpbDogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gXCJcIjtcclxuICAgICAgICBtZXNzYWdlcyArPSB0aGlzLnZhbGlkYXRlUHJvZHVjdHMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNoaXBNZXRob2QpXHJcbiAgICAgICAgaWYgKHRoaXMuc2hpcE1ldGhvZCA9PSAwKVxyXG4gICAgICAgICAgICBtZXNzYWdlcyArPSB0aGlzLnZhbGlkYXRlQWRkcmVzcygpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZXMgPT0gXCJcIiA/IFwiT0tcIiA6IG1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVQcm9kdWN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5sZW5ndGggPiAwID8gXCJcIiA6IFwiWW91IG5lZWQgdG8gYWRkIHByb2R1Y3RzIHRvIGNhcnQgXFxuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUFkZHJlc3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMSA9PSBcIlwiIHx8IHRoaXMuX3NhbGVPcmRlci5TaGlwVG9DaXR5ID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1N0YXRlID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1ppcENvZGUgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIFwiWW91ciBTaGlwcGluZyBBZGRyZXNzIG11c3QgaGF2ZSAoRmlyc3QgQWRkcmVzcyBsaW5lLCBDaXR5LCBTdGF0ZSBhbmQgWmlwIGNvZGUpIFxcblwiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMaW5lUHJvZHVjdCgpIHtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcHJvZHVjdC5saW5lSXRlbSA9IGluZGV4ICsgMTtcclxuICAgICAgICAgICAgcHJvZHVjdC5xdWFudGl0eSA9IHBhcnNlSW50KHByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTaGlwTWV0aG9kKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwTWV0aG9kID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FyZWhvdXNlID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FyZWhvdXNlcy5zcGxpY2UodGhpcy53YXJlaG91c2VzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2FyZWhvdXNlcy5pbmRleE9mKFwiRGlyZWN0XCIpID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZWhvdXNlcy5wdXNoKFwiRGlyZWN0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwTWV0aG9kID0gdGhpcy5zaGlwTWV0aG9kc1t0aGlzLnNoaXBNZXRob2RdO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbn0iXX0=