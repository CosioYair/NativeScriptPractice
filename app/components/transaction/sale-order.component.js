"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var couchbase_service_1 = require("../../services/couchbase.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_date_component_1 = require("../modal/datepicker/modal-date.component");
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
            _this._saleOrder.ShipVia = _this._customerShippingAddress[args.newIndex].ShipVia;
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
        this.productImage = this._productService.getImage(product.ItemCode);
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
            ShipVia: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipVia,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRztBQUV0RyxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUk5RSw0RkFBMEY7QUFFMUYsNERBQTZEO0FBQzdELDJFQUE2RDtBQUM3RCxxR0FBaUc7QUFDakcsa0RBQWtFO0FBQ2xFLDBDQUFpRDtBQUdqRCxzRUFBb0U7QUFFcEUsOERBQWdFO0FBR2hFLGtGQUFnRjtBQUVoRixzRUFBb0U7QUFFcEUsNERBQW9EO0FBQ3BELDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QsOEVBQXNFO0FBQ3RFLHNGQUFvRjtBQVNwRjtJQThCSSw0QkFBb0IsZUFBK0IsRUFDdkMsaUJBQW1DLEVBQ25DLGlCQUFtQyxFQUNuQyxZQUFnQyxFQUNoQyxLQUF1QixFQUN2QixjQUE4QixFQUM5QixLQUFxQixFQUNyQixpQkFBbUMsRUFDbkMsdUJBQStDLEVBQy9DLGlCQUFtQyxFQUNuQyxPQUF5QixFQUN6QiwwQkFBb0Q7UUFYaEUsaUJBdUNDO1FBdkNtQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDdkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsK0JBQTBCLEdBQTFCLDBCQUEwQixD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YztZQUN2Qix1QkFBYztZQUNGLGdDQUFnQjtZQUNWLGdEQUFzQjtZQUM1QixvQ0FBZ0I7WUFDMUIseUJBQWdCO1lBQ0csb0RBQXdCO09BekN2RCxrQkFBa0IsQ0EwZjlCO0lBQUQseUJBQUM7Q0FBQSxBQTFmRCxJQTBmQztBQTFmWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ09wdGlvbnMsIE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbC9kYXRlcGlja2VyL21vZGFsLWRhdGUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gXCIuLi8uLi9jb25maWcvY29uc3RhbnRzLmNvbmZpZ1wiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhci9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2l0ZW1JbnF1aXJ5LmludGVyZmFjZVwiO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgeyBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbC9wcm9kdWN0T3JkZXIvbW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY3VzdG9tZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBJbnZlbnRvcnkgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pbnZlbnRvcnkuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUZXJtc0NvZGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Rlcm1zLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRlcm1zQ29kZSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3Rlcm1zQ29kZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzcyB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NoaXBwaW5nQWRkcmVzcy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcHBpbmdBZGRyZXNzLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXcvdGFiLXZpZXdcIjtcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNhbGVPcmRlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NhbGVPcmRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHTE9CQUxGVU5DVElPTlMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2dsb2JhbEZ1bmN0aW9ucy5jb25maWdcIjtcbmltcG9ydCB7IEZvbGlvc1RyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9mb2xpb3NUcmFuc2FjdGlvbi5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLXNhbGUtb3JkZXJcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2FsZS1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9zYWxlLW9yZGVyLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFNhbGVPcmRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwdWJsaWMgcHJvZHVjdExpc3Q6IGFueTtcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xuICAgIHB1YmxpYyBzZWxlY3RlZFByb2R1Y3Q6IGFueSA9IHt9O1xuICAgIHB1YmxpYyBzZWxlY3RlZENhcnRQcm9kdWN0OiBhbnkgPSB7fTtcbiAgICBwdWJsaWMgd2FyZWhvdXNlczogYW55ID0gW107XG4gICAgcHVibGljIHdhcmVob3VzZTogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgbGluZVRpdGxlOiBzdHJpbmcgPSBcIkl0ZW0gRGV0YWlsc1wiO1xuICAgIHB1YmxpYyBsaW5lU3ViVGl0bGU6IHN0cmluZyA9IFwiU2VsZWN0IGFuIGl0ZW0gdG8gdmlldyBkZXRhaWxzIGFuZCBhZGRcIjtcbiAgICBwdWJsaWMgc2hvd2luZ1Byb2R1Y3Q6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXRlbUNvZGU6IHN0cmluZyA9IFwiXCI7XG4gICAgcHVibGljIHByb2R1Y3RRdWFudGl0eTogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIG9yaWVudGF0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LW9yaWVudGF0aW9uJyk7XG4gICAgcHVibGljIHRhYnM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xuICAgIHB1YmxpYyBzZWxlY3Rpb25UYWJzOiBhbnk7XG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgIHB1YmxpYyBjdXN0b21lcjogQ3VzdG9tZXI7XG4gICAgcHVibGljIGludmVudG9yeUxpc3Q6IE9ic2VydmFibGVBcnJheTxJbnZlbnRvcnk+ID0gbmV3IE9ic2VydmFibGVBcnJheTxJbnZlbnRvcnk+KCk7XG4gICAgcHVibGljIHRvdGFsQ2FydEFtb3VudDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgY2FydFF1YW50aXR5OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyB1c2VyVGVybXNDb2RlOiBzdHJpbmc7XG4gICAgcHVibGljIHNoaXBwaW5nQWRkcmVzc0xpc3Q6IGFueSA9IFtdO1xuICAgIHByaXZhdGUgX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzOiBhbnk7XG4gICAgcHVibGljIHRvdGFsQ3ViZXM6IG51bWJlciA9IDA7XG4gICAgcHVibGljIF9zYWxlT3JkZXI6IFNhbGVPcmRlcjtcbiAgICBwdWJsaWMgc2hpcE1ldGhvZHM6IGFueSA9IFtcIkRlbGl2ZXJ5XCIsIFwiUGlja3VwXCJdO1xuICAgIHB1YmxpYyBzaGlwTWV0aG9kOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBwcm9kdWN0SW1hZ2U6IGFueTtcbiAgICBAVmlld0NoaWxkKCdRdHknKSBRdHk6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2ludmVudG9yeVNlcnZpY2U6IEludmVudG9yeVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgYmFyY29kZVNjYW5uZXI6IEJhcmNvZGVTY2FubmVyLFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfdGVybXNDb2RlU2VydmljZTogVGVybXNDb2RlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzU2VydmljZTogU2hpcHBpbmdBZGRyZXNzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIF9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlOiBGb2xpb3NUcmFuc2FjdGlvblNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPSBcIlwiO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5jb21tZW50ID0gXCJcIjtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0Lkl0ZW1Db2RlID0gXCJcIjtcbiAgICAgICAgLy90aGlzLm9yaWVudGF0aW9uLnNldE9yaWVudGF0aW9uKFwibGFuZHNjYXBlcmlnaHRcIik7ICBcbiAgICAgICAgdGhpcy50YWJzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicyA9IFt7XG4gICAgICAgICAgICB0aXRsZTogXCJIRUFERVJcIixcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6IFwiQUREUkVTU1wiLFxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6IFwiTElORVNcIixcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlRPVEFMU1wiLFxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcbiAgICAgICAgfV07XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAodGFiID0+IHtcbiAgICAgICAgICAgIGxldCBzZWdtZW50ZWRCYXJJdGVtID0gPFNlZ21lbnRlZEJhckl0ZW0+bmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSB0YWIudGl0bGU7XG4gICAgICAgICAgICB0aGlzLnRhYnMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24uZWRpdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xuICAgICAgICBTRVJWRVIuaXNRdW90ZSA9IEpTT04ucGFyc2UodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJJc1F1b3RlXCJdKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRDdXN0b21lcih0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcIkN1c3RvbWVyTm9cIl0pO1xuICAgICAgICBhd2FpdCB0aGlzLnNldFNoaXBwaW5nQWRkcmVzcygpO1xuICAgICAgICBhd2FpdCB0aGlzLnNldEludmVudG9yeSgpO1xuICAgICAgICB0aGlzLnVzZXJUZXJtc0NvZGUgPSBhd2FpdCB0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlLmdldFVzZXJUZXJtc0NvZGUodGhpcy5jdXN0b21lcik7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0RG9jdW1lbnQoKTtcbiAgICAgICAgdGhpcy53YXJlaG91c2VzID0gR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZXMoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoU2FsZU9yZGVyKCk7XG4gICAgICAgIGlmICghU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi5lZGl0KSB7XG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUgPSBgJHt0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUuZ2V0RGF0ZSgpICsgMX0vJHt0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUuZ2V0TW9udGgoKSArIDF9LyR7dGhpcy5fc2FsZU9yZGVyLlNoaXBEYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5PcmRlckRhdGUgPSBgJHt0aGlzLl9zYWxlT3JkZXIuT3JkZXJEYXRlLmdldERhdGUoKX0vJHt0aGlzLl9zYWxlT3JkZXIuT3JkZXJEYXRlLmdldE1vbnRoKCl9LyR7dGhpcy5fc2FsZU9yZGVyLk9yZGVyRGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFNFUlZFUi5pc1F1b3RlKVxuICAgICAgICBpZiAoU0VSVkVSLmlzUXVvdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclF1b3RlVW5zYXZlZCgpLm1hcChxdW90ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHF1b3RlLlNhbGVzT3JkZXJOTyA9PSBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uTm8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyID0gcXVvdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCkubWFwKHNhbGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzYWxlLlNhbGVzT3JkZXJOTyA9PSBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uTm8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyID0gc2FsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndhcmVob3VzZSA9IHRoaXMud2FyZWhvdXNlcy5pbmRleE9mKEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeUNvZGUodGhpcy5fc2FsZU9yZGVyLldhcmVob3VzZUNvZGUpW1wibmFtZVwiXSk7XG4gICAgICAgIHRoaXMuc2hpcE1ldGhvZCA9IHRoaXMuX3NhbGVPcmRlci5TaGlwTWV0aG9kID09IFwiRGVsaXZlcnlcIiA/IDAgOiAxO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNhcnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsY3VsYXRlQ2FydCgpIHtcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5tYXAocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCArPSBwcm9kdWN0LnF1YW50aXR5UHJpY2U7XG4gICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSArPSBwYXJzZUludChwcm9kdWN0LnF1YW50aXR5KTtcbiAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSBwcm9kdWN0LkNhdGVnb3J5NCAqIHByb2R1Y3QucXVhbnRpdHk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleClcbiAgICAgICAgICAgICAgICB0YWIudmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGFiLnZpc2liaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHNldERvY3VtZW50KCkge1xuICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3REb2N1bWVudCgpO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEN1c3RvbWVyKEN1c3RvbWVyTm86IHN0cmluZykge1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImN1c3RvbWVyXCIpW1wiY3VzdG9tZXJcIl07XG4gICAgICAgIGRvYy5tYXAoY3VzdG9tZXIgPT4ge1xuICAgICAgICAgICAgaWYgKGN1c3RvbWVyLkN1c3RvbWVyTm8gPT0gQ3VzdG9tZXJObylcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzZXRTaGlwcGluZ0FkZHJlc3MoKSB7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID0gYXdhaXQgdGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZS5nZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyh0aGlzLmN1c3RvbWVyKTtcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwpXG4gICAgICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzc0xpc3QgPSBbXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzc0xpc3QgPSBhd2FpdCB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLmdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzTGlzdCh0aGlzLmN1c3RvbWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJbnZlbnRvcnkoKSB7XG4gICAgICAgIGxldCB3YXJlaG91c2VDb2RlID0gR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZUJ5TmFtZSh0aGlzLndhcmVob3VzZXNbdGhpcy53YXJlaG91c2VdKVtcImNvZGVcIl07XG4gICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IHRoaXMuX2ludmVudG9yeVNlcnZpY2UuZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHdhcmVob3VzZUNvZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyhhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVmlhID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFZpYTtcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9DaXR5ID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQ2l0eTtcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9TdGF0ZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb1N0YXRlO1xuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1ppcENvZGUgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9aaXBDb2RlO1xuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb05hbWUgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9OYW1lO1xuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MxID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQWRkcmVzczE7XG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQWRkcmVzczIgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9BZGRyZXNzMjtcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMyA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb0FkZHJlc3MzO1xuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0NvdW50cnlDb2RlID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQ291bnRyeUNvZGU7XG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvID0gYXJncy5uZXdJbmRleDtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmlsdGVySW52ZW50b3J5V2FyZWhvdXNlKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICB0aGlzLmludmVudG9yeUxpc3QgPSB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLmdldEludmVudG9yeVdhcmVob3VzZShHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlQnlOYW1lKHRoaXMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0pW1wiY29kZVwiXSk7XG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuV2FyZWhvdXNlQ29kZSA9IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeU5hbWUodGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXSlbXCJjb2RlXCJdO1xuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93RGF0ZU1vZGFsKGlucHV0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RlbFZpZXcoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJbaW5wdXRdID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3KCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgICAgIGNvbnRleHQ6IHRvZGF5LnRvRGF0ZVN0cmluZygpLFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxEYXRlQ29tcG9uZW50LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLmNhbmNlbCgpO1xuXG4gICAgICAgIGlmIChzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9kdWN0c1tpbmRleF0uSXRlbUNvZGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaCh0aGlzLl9wcm9kdWN0c1tpbmRleF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuc2hvd2luZ1Byb2R1Y3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSB7fTtcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSBcIkl0ZW0gRGV0YWlsc1wiO1xuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IFwiU2VsZWN0IGFuIGl0ZW0gdG8gdmlldyBkZXRhaWxzIGFuZCBhZGRcIjtcbiAgICAgICAgdGhpcy5wcm9kdWN0UXVhbnRpdHkgPSAxO1xuICAgIH1cblxuICAgIHB1YmxpYyB2aWV3UHJvZHVjdChwcm9kdWN0OiBQcm9kdWN0KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gcHJvZHVjdDtcbiAgICAgICAgdGhpcy5zaG93aW5nUHJvZHVjdCA9IHRydWU7XG4gICAgICAgIHRoaXMubGluZVRpdGxlID0gcHJvZHVjdC5JdGVtQ29kZURlc2M7XG4gICAgICAgIHRoaXMubGluZVN1YlRpdGxlID0gcHJvZHVjdC5JdGVtQ29kZTtcbiAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHByb2R1Y3QuSXRlbUNvZGU7XG4gICAgICAgIHRoaXMuZ2V0SW52ZW50b3J5UXVhbnRpdCgpO1xuICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZSA9IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldEltYWdlKHByb2R1Y3QuSXRlbUNvZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VhcmNoSXRlbUNvZGUoY29kZTogc3RyaW5nLCBsaXN0OiBhbnkpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBmYWxzZTtcbiAgICAgICAgbGlzdC5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAobGlzdFtpbmRleF0uSXRlbUNvZGUudG9Mb3dlckNhc2UoKSA9PSBjb2RlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gcHJvZHVjdDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHRoaXMuX3Byb2R1Y3RzW2luZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZVByb2R1Y3RMaXN0KCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hJdGVtQ29kZSh0aGlzLml0ZW1Db2RlLCB0aGlzLl9wcm9kdWN0cykgPT0gZmFsc2UpXG4gICAgICAgICAgICBhbGVydChgSW52YWxpZCBpdGVtIGNvZGUuICR7dGhpcy5pdGVtQ29kZX0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMudmlld1Byb2R1Y3QodGhpcy5zZWxlY3RlZFByb2R1Y3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZUludGVnZXJOdW1iZXIobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgIT0gcGFyc2VJbnQobnVtYmVyLCAxMCkgfHwgbnVtYmVyIDwgMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFkZFByb2R1Y3QoKSB7XG4gICAgICAgIGxldCBwcm9kdWN0ID0gdGhpcy5zZWFyY2hJdGVtQ29kZSh0aGlzLml0ZW1Db2RlLCB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsKTtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVJbnRlZ2VyTnVtYmVyKHRoaXMucHJvZHVjdFF1YW50aXR5KSkge1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSA9IHRoaXMucHJvZHVjdFF1YW50aXR5O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5UHJpY2UgPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSAqIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZFByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwucHVzaCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgKz0gdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlQcmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5ICsgcGFyc2VJbnQodGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5DYXRlZ29yeTQgKiB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eTtcbiAgICAgICAgICAgICAgICBhbGVydChgSXRlbSAke3RoaXMuaXRlbUNvZGV9IGFkZGVkIHRvIGNhcnQuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSBwcm9kdWN0O1xuICAgICAgICAgICAgICAgIGF3YWl0IGFsZXJ0KGBJdGVtICR7dGhpcy5pdGVtQ29kZX0gaXMgYWxyZWFkeSBhZGRlZCB0byBjYXJ0LmApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RPcmRlck1vZGFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJJbnZhbGlkIHF1YW50aXR5XCIpO1xuICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5hbmRyb2lkLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLnRleHRSYW5nZUZyb21Qb3NpdGlvblRvUG9zaXRpb24odGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MuYmVnaW5uaW5nT2ZEb2N1bWVudCwgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MuZW5kT2ZEb2N1bWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0NhcnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuX3NhbGVPcmRlci5EZXRhaWwpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRDYXJ0UHJvZHVjdChwcm9kdWN0OiBQcm9kdWN0KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCA9IHByb2R1Y3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZUNhcnRQcm9kdWN0KCkge1xuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zYWxlT3JkZXIuRGV0YWlsW2luZGV4XS5JdGVtQ29kZSA9PSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuSXRlbUNvZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50IC0gcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSAtIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgLT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNjYW4oKSB7XG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XG4gICAgICAgICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxuICAgICAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsXG4gICAgICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsXG4gICAgICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsXG4gICAgICAgICAgICBiZWVwT25TY2FuOiB0cnVlLFxuICAgICAgICAgICAgdG9yY2hPbjogZmFsc2UsXG4gICAgICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCxcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcIm9yaWVudGF0aW9uXCIsXG4gICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHJlc3VsdC50ZXh0O1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVByb2R1Y3RMaXN0KCk7XG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd1Byb2R1Y3RPcmRlck1vZGFsKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IG9sZFByb2R1Y3RRdWFudGl0eSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlld1Byb2R1Y3RFZGl0KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCAmJiByZXN1bHQucXVhbnRpdHkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgLSBvbGRQcm9kdWN0UXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgLSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzIC09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5DYXRlZ29yeTQgKiBvbGRQcm9kdWN0UXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgKyBwYXJzZUludChyZXN1bHQucXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSA9IHJlc3VsdC5xdWFudGl0eSAqIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgPSB0aGlzLnRvdGFsQ2FydEFtb3VudCArIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgKz0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgPSBvbGRQcm9kdWN0UXVhbnRpdHk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbFZpZXdQcm9kdWN0RWRpdCgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3REZXRhaWxzID0ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FydFByb2R1Y3Q6IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCxcbiAgICAgICAgICAgICAgICB3YXJlaG91c2U6IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeUNvZGUodGhpcy5fc2FsZU9yZGVyLldhcmVob3VzZUNvZGUpW1wibmFtZVwiXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHByb2R1Y3REZXRhaWxzLFxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRJbnZlbnRvcnlRdWFudGl0KCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmludmVudG9yeUxpc3QpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5pbnZlbnRvcnlMaXN0Lm1hcChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIGxldCBxdWFudGl0eUF2YWlsID0gcHJvZHVjdC5RdWFudGl0eU9uSGFuZCAtIHByb2R1Y3QuUXVhbnRpdHlPblNhbGVzT3JkZXI7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPT0gcHJvZHVjdC5JdGVtQ29kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5T25IYW5kID0gcHJvZHVjdC5RdWFudGl0eU9uSGFuZDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eUF2YWlsID0gcXVhbnRpdHlBdmFpbCA8IDAgPyAwIDogcXVhbnRpdHlBdmFpbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5T25IYW5kID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5T25IYW5kID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5QXZhaWwgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dEZXNjcmlwdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0ICE9IHVuZGVmaW5lZCB8fCB0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dCAhPSBcIlwiKVxuICAgICAgICAgICAgYWxlcnQodGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBhbGVydChcIkRlc2NyaXB0aW9uIG5vdCBhdmFpbGFibGVcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlRm9saW9zVHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIGxldCBmb2xpb051bWJlciA9IFNFUlZFUi5pc1F1b3RlID8gdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS5nZXRRdW90ZVRyYW5zYWN0aW9ucygpLmxlbmd0aCArIDEgOiB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlLmdldFNhbGVUcmFuc2FjdGlvbnMoKS5sZW5ndGggKyAxO1xuICAgICAgICBsZXQgZm9saW9TZXJpZSA9IGAke3RoaXMucGFkTGVmdChmb2xpb051bWJlci50b1N0cmluZygpLCAnMCcsIDYpfWA7XG4gICAgICAgIGxldCBkb2MgPSBTRVJWRVIuaXNRdW90ZSA/IFwiUXVvdGVcIiA6IFwiU2FsZVwiO1xuICAgICAgICBsZXQgZG9jU2VyaWUgPSBTRVJWRVIuaXNRdW90ZSA/IFwiUVwiIDogXCJTXCI7XG4gICAgICAgIGxldCBzZXJpZSA9IGAke3BsYXRmb3JtTW9kdWxlLmRldmljZS51dWlkLnNsaWNlKDAsIDYpfSR7ZG9jU2VyaWV9LSR7Zm9saW9TZXJpZX1gO1xuICAgICAgICBsZXQgZm9saW8gPSB7XG4gICAgICAgICAgICBGb2xpbzogZm9saW9TZXJpZSxcbiAgICAgICAgICAgIERvY3VtZW50OiBkb2MsXG4gICAgICAgICAgICBTZXJpZTogc2VyaWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS51cGRhdGVGb2xpb3NUcmFuc2FjdGlvbkRvYyhmb2xpbyk7XG4gICAgICAgIHJldHVybiBzZXJpZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgc2F2ZSgpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gdGhpcy52YWxpZGF0aW9ucygpO1xuICAgICAgICBpZiAobWVzc2FnZXMgPT0gXCJPS1wiKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNldExpbmVQcm9kdWN0KCk7XG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2FsZXNPcmRlck5PID0gdGhpcy5fc2FsZU9yZGVyLlNhbGVzT3JkZXJOTyA9PSBcIlwiID8gYXdhaXQgdGhpcy5zYXZlRm9saW9zVHJhbnNhY3Rpb24oKSA6IHRoaXMuX3NhbGVPcmRlci5TYWxlc09yZGVyTk87XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLnVwZGF0ZVNhbGVPcmRlckRvYyh0aGlzLl9zYWxlT3JkZXIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5fc2FsZU9yZGVyKSk7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2VzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhZExlZnQodGV4dDogc3RyaW5nLCBwYWRDaGFyOiBzdHJpbmcsIHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAoU3RyaW5nKHBhZENoYXIpLnJlcGVhdChzaXplKSArIHRleHQpLnN1YnN0cigoc2l6ZSAqIC0xKSwgc2l6ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoU2FsZU9yZGVyKCkge1xuICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSB7XG4gICAgICAgICAgICBJc1F1b3RlOiBTRVJWRVIuaXNRdW90ZSxcbiAgICAgICAgICAgIFNhdmVkOiBmYWxzZSxcbiAgICAgICAgICAgIFNlbmRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgQ3VzdG9tZXJObzogdGhpcy5jdXN0b21lci5DdXN0b21lck5vLFxuICAgICAgICAgICAgQ3VzdG9tZXJOYW1lOiB0aGlzLmN1c3RvbWVyLkN1c3RvbWVyTmFtZSxcbiAgICAgICAgICAgIEN1c3RvbWVyUE9ObzogXCJcIixcbiAgICAgICAgICAgIEN1c3RvbWVyQ29uZmlybVRvOiBcIlwiLFxuICAgICAgICAgICAgQ3VzdG9tZXJGQk86IFwiXCIsXG4gICAgICAgICAgICBTYWxlc09yZGVyTk86IFwiXCIsXG4gICAgICAgICAgICBEZXZpY2VVaWQ6IHBsYXRmb3JtTW9kdWxlLmRldmljZS51dWlkLFxuICAgICAgICAgICAgU2hpcE1ldGhvZDogXCJcIixcbiAgICAgICAgICAgIEJpbGxUb05hbWU6IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOYW1lLFxuICAgICAgICAgICAgQmlsbFRvQWRkcmVzczE6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUxLFxuICAgICAgICAgICAgQmlsbFRvQWRkcmVzczI6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUyID09IG51bGwgPyBcIlwiIDogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTIsXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMzogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTMgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMyxcbiAgICAgICAgICAgIEJpbGxUb0NvdW50cnlDb2RlOiB0aGlzLmN1c3RvbWVyLkNvdW50cnlDb2RlLFxuICAgICAgICAgICAgQmlsbFRvQ2l0eTogdGhpcy5jdXN0b21lci5DaXR5LFxuICAgICAgICAgICAgQmlsbFRvU3RhdGU6IHRoaXMuY3VzdG9tZXIuU3RhdGUsXG4gICAgICAgICAgICBCaWxsVG9aaXBDb2RlOiB0aGlzLmN1c3RvbWVyLlppcENvZGUsXG4gICAgICAgICAgICBTaGlwVmlhOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBWaWEsXG4gICAgICAgICAgICBXYXJlaG91c2VDb2RlOiBHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlQnlOYW1lKHRoaXMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0pW1wiY29kZVwiXSxcbiAgICAgICAgICAgIFNoaXBUbzogMCxcbiAgICAgICAgICAgIFNoaXBUb0NpdHk6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQ2l0eSxcbiAgICAgICAgICAgIFNoaXBUb1N0YXRlOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb1N0YXRlLFxuICAgICAgICAgICAgU2hpcFRvWmlwQ29kZTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9aaXBDb2RlLFxuICAgICAgICAgICAgRGlzY291bnRBbXQ6IDAsXG4gICAgICAgICAgICBTaGlwVG9OYW1lOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb05hbWUsXG4gICAgICAgICAgICBTaGlwVG9BZGRyZXNzMTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9BZGRyZXNzMSxcbiAgICAgICAgICAgIFNoaXBUb0FkZHJlc3MyOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0FkZHJlc3MyLFxuICAgICAgICAgICAgU2hpcFRvQWRkcmVzczM6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQWRkcmVzczMsXG4gICAgICAgICAgICBTaGlwVG9Db3VudHJ5Q29kZTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9Db3VudHJ5Q29kZSxcbiAgICAgICAgICAgIE9yZGVyRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIFNoaXBEYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgRGF0ZUNyZWF0ZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIFVzZXJDb2RlOiBTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdLFxuICAgICAgICAgICAgU2FsZXNwZXJzb25ObzogU0VSVkVSLnVzZXJbXCJEZWZhdWx0U2FsZXNwZXJzb25JRFwiXSxcbiAgICAgICAgICAgIFRlcm1zQ29kZTogdGhpcy5jdXN0b21lci5UZXJtc0NvZGUsXG4gICAgICAgICAgICBDb21tZW50OiBcIlwiLFxuICAgICAgICAgICAgRGV0YWlsOiBbXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdGlvbnMoKSB7XG4gICAgICAgIGxldCBtZXNzYWdlcyA9IFwiXCI7XG4gICAgICAgIG1lc3NhZ2VzICs9IHRoaXMudmFsaWRhdGVQcm9kdWN0cygpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNoaXBNZXRob2QpXG4gICAgICAgIGlmICh0aGlzLnNoaXBNZXRob2QgPT0gMClcbiAgICAgICAgICAgIG1lc3NhZ2VzICs9IHRoaXMudmFsaWRhdGVBZGRyZXNzKCk7XG5cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzID09IFwiXCIgPyBcIk9LXCIgOiBtZXNzYWdlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRlUHJvZHVjdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLmxlbmd0aCA+IDAgPyBcIlwiIDogXCJZb3UgbmVlZCB0byBhZGQgcHJvZHVjdHMgdG8gY2FydCBcXG5cIjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRlQWRkcmVzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMSA9PSBcIlwiIHx8IHRoaXMuX3NhbGVPcmRlci5TaGlwVG9DaXR5ID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1N0YXRlID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1ppcENvZGUgPT0gXCJcIilcbiAgICAgICAgICAgIHJldHVybiBcIllvdXIgU2hpcHBpbmcgQWRkcmVzcyBtdXN0IGhhdmUgKEZpcnN0IEFkZHJlc3MgbGluZSwgQ2l0eSwgU3RhdGUgYW5kIFppcCBjb2RlKSBcXG5cIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRMaW5lUHJvZHVjdCgpIHtcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBwcm9kdWN0LmxpbmVJdGVtID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgcHJvZHVjdC5xdWFudGl0eSA9IHBhcnNlSW50KHByb2R1Y3QucXVhbnRpdHkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2hpcE1ldGhvZCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwTWV0aG9kID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhcmVob3VzZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy53YXJlaG91c2VzLnNwbGljZSh0aGlzLndhcmVob3VzZXMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53YXJlaG91c2VzLmluZGV4T2YoXCJEaXJlY3RcIikgPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZWhvdXNlcy5wdXNoKFwiRGlyZWN0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBNZXRob2QgPSB0aGlzLnNoaXBNZXRob2RzW3RoaXMuc2hpcE1ldGhvZF07XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfVxufSJdfQ==