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
        var _this = this;
        var product = this.searchItemCode(this.itemCode, this._saleOrder.Detail);
        if (this.validateIntegerNumber(this.productQuantity)) {
            if (product == false) {
                this.selectedProduct.quantity = this.productQuantity;
                this.selectedProduct.quantityPrice = this.selectedProduct.quantity * parseFloat(this.selectedProduct.StandardUnitPrice);
                this._saleOrder.Detail.push(this.selectedProduct);
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
            if (_this.shipMethod == 1)
                _this.warehouse = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRztBQUV0RyxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBQ2pHLGtEQUFrRTtBQUNsRSwwQ0FBaUQ7QUFHakQsc0VBQW9FO0FBRXBFLDhEQUFnRTtBQUdoRSxrRkFBZ0Y7QUFFaEYsc0VBQW9FO0FBRXBFLDREQUFvRDtBQUNwRCwwREFBNEQ7QUFDNUQsc0RBQStEO0FBQy9ELDhFQUFzRTtBQUN0RSxzRkFBb0Y7QUFTcEY7SUErQkksNEJBQW9CLGVBQStCLEVBQ3ZDLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBZ0MsRUFDaEMsS0FBdUIsRUFDdkIsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsT0FBeUIsRUFDekIsMEJBQW9EO1FBWGhFLGlCQTJDQztRQTNDbUIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ3ZDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLCtCQUEwQixH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bGVtZW50UmVmLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nT3B0aW9ucywgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaXRlbUlucXVpcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCB7IE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZGFsL3Byb2R1Y3RPcmRlci9tb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jdXN0b21lci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW52ZW50b3J5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29kZSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3Rlcm1zQ29kZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2hpcHBpbmdBZGRyZXNzLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXcvdGFiLXZpZXdcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHTE9CQUxGVU5DVElPTlMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2dsb2JhbEZ1bmN0aW9ucy5jb25maWdcIjtcclxuaW1wb3J0IHsgRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZvbGlvc1RyYW5zYWN0aW9uLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtc2FsZS1vcmRlclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2FsZS1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NhbGUtb3JkZXIuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2FsZU9yZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBhbnk7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlczogYW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNoaXBWaWFzOiBhbnk7XHJcbiAgICBwdWJsaWMgc2hpcFZpYTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsaW5lVGl0bGU6IHN0cmluZyA9IFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICBwdWJsaWMgbGluZVN1YlRpdGxlOiBzdHJpbmcgPSBcIlNlbGVjdCBhbiBpdGVtIHRvIHZpZXcgZGV0YWlscyBhbmQgYWRkXCI7XHJcbiAgICBwdWJsaWMgc2hvd2luZ1Byb2R1Y3Q6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpdGVtQ29kZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBwcm9kdWN0UXVhbnRpdHk6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIG9yaWVudGF0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LW9yaWVudGF0aW9uJyk7XHJcbiAgICBwdWJsaWMgdGFiczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0aW9uVGFiczogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgcHVibGljIGN1c3RvbWVyOiBDdXN0b21lcjtcclxuICAgIHB1YmxpYyBpbnZlbnRvcnlMaXN0OiBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PigpO1xyXG4gICAgcHVibGljIHRvdGFsQ2FydEFtb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBjYXJ0UXVhbnRpdHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdXNlclRlcm1zQ29kZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNoaXBwaW5nQWRkcmVzc0xpc3Q6IGFueSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3M6IGFueTtcclxuICAgIHB1YmxpYyB0b3RhbEN1YmVzOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIF9zYWxlT3JkZXI6IFNhbGVPcmRlcjtcclxuICAgIHB1YmxpYyBzaGlwTWV0aG9kczogYW55ID0gW1wiRGVsaXZlcnlcIiwgXCJQaWNrdXBcIl07XHJcbiAgICBwdWJsaWMgc2hpcE1ldGhvZDogbnVtYmVyID0gMDtcclxuICAgIEBWaWV3Q2hpbGQoJ1F0eScpIFF0eTogRWxlbWVudFJlZjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIF90ZXJtc0NvZGVTZXJ2aWNlOiBUZXJtc0NvZGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2U6IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBfZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZTogRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnNoaXBWaWFzID0gW107XHJcbiAgICAgICAgQ09OU1RBTlRTLnNoaXBWaWFzLm1hcChzaGlwVmlhID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaGlwVmlhcy5wdXNoKHNoaXBWaWEubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LmNvbW1lbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLm9yaWVudGF0aW9uLnNldE9yaWVudGF0aW9uKFwibGFuZHNjYXBlcmlnaHRcIik7ICBcclxuICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMgPSBbe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJIRUFERVJcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBRERSRVNTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkxJTkVTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlRPVEFMU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH1dO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAodGFiID0+IHtcclxuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gdGFiLnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLmVkaXQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICBTRVJWRVIuaXNRdW90ZSA9IEpTT04ucGFyc2UodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJJc1F1b3RlXCJdKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmdldEN1c3RvbWVyKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiQ3VzdG9tZXJOb1wiXSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRTaGlwcGluZ0FkZHJlc3MoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldEludmVudG9yeSgpO1xyXG4gICAgICAgIHRoaXMudXNlclRlcm1zQ29kZSA9IGF3YWl0IHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UuZ2V0VXNlclRlcm1zQ29kZSh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldERvY3VtZW50KCk7XHJcbiAgICAgICAgdGhpcy53YXJlaG91c2VzID0gR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZXMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hTYWxlT3JkZXIoKTtcclxuICAgICAgICBpZiAoIVNFUlZFUi5lZGl0VHJhbnNhY3Rpb24uZWRpdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUgPSBgJHt0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUuZ2V0RGF0ZSgpICsgMX0vJHt0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUuZ2V0TW9udGgoKSArIDF9LyR7dGhpcy5fc2FsZU9yZGVyLlNoaXBEYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLk9yZGVyRGF0ZSA9IGAke3RoaXMuX3NhbGVPcmRlci5PcmRlckRhdGUuZ2V0RGF0ZSgpfS8ke3RoaXMuX3NhbGVPcmRlci5PcmRlckRhdGUuZ2V0TW9udGgoKX0vJHt0aGlzLl9zYWxlT3JkZXIuT3JkZXJEYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0VHJhbnNhY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFNFUlZFUi5pc1F1b3RlKVxyXG4gICAgICAgIGlmIChTRVJWRVIuaXNRdW90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJRdW90ZVVuc2F2ZWQoKS5tYXAocXVvdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1b3RlLlNhbGVzT3JkZXJOTyA9PSBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uTm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSBxdW90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCkubWFwKHNhbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhbGUuU2FsZXNPcmRlck5PID09IFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24udHJhbnNhY3Rpb25Obykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlciA9IHNhbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndhcmVob3VzZSA9IHRoaXMud2FyZWhvdXNlcy5pbmRleE9mKEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeUNvZGUodGhpcy5fc2FsZU9yZGVyLldhcmVob3VzZUNvZGUpW1wibmFtZVwiXSk7IFxyXG4gICAgICAgIHRoaXMuc2hpcFZpYSA9IHRoaXMuc2hpcFZpYXMuZmluZEluZGV4KHNoaXBWaWEgPT4gc2hpcFZpYSA9PT0gdGhpcy5fc2FsZU9yZGVyLlNoaXBWaWEpXHJcbiAgICAgICAgdGhpcy5zaGlwTWV0aG9kID0gdGhpcy5fc2FsZU9yZGVyLlNoaXBNZXRob2QgPT0gXCJEZWxpdmVyeVwiID8gMCA6IDE7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDYXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ICs9IHByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgKz0gcGFyc2VJbnQocHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSBwcm9kdWN0LkNhdGVnb3J5NCAqIHByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAoKHRhYiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB0YWIudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRhYi52aXNpYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldERvY3VtZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdERvY3VtZW50KCk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXN0b21lcihDdXN0b21lck5vOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImN1c3RvbWVyXCIpW1wiY3VzdG9tZXJcIl07XHJcbiAgICAgICAgZG9jLm1hcChjdXN0b21lciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21lci5DdXN0b21lck5vID09IEN1c3RvbWVyTm8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldFNoaXBwaW5nQWRkcmVzcygpIHtcclxuICAgICAgICB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9IGF3YWl0IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UuZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3ModGhpcy5jdXN0b21lcik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzTGlzdCA9IFtdO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzc0xpc3QgPSBhd2FpdCB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLmdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzTGlzdCh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEludmVudG9yeSgpIHtcclxuICAgICAgICBsZXQgd2FyZWhvdXNlQ29kZSA9IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeU5hbWUodGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXSlbXCJjb2RlXCJdO1xyXG4gICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IHRoaXMuX2ludmVudG9yeVNlcnZpY2UuZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHdhcmVob3VzZUNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyhhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQ2l0eSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb0NpdHk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9TdGF0ZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb1N0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvWmlwQ29kZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb1ppcENvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9OYW1lID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MxID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQWRkcmVzczE7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMiA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb0FkZHJlc3MyO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQWRkcmVzczMgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9BZGRyZXNzMztcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0NvdW50cnlDb2RlID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQ291bnRyeUNvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG8gPSBhcmdzLm5ld0luZGV4O1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbWVyU2hpcFZpYShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBWaWEgPSBhcmdzLm5ld0luZGV4O1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFZpYSA9IHRoaXMuc2hpcFZpYXNbdGhpcy5zaGlwVmlhXVxyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbHRlckludmVudG9yeVdhcmVob3VzZSgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnZlbnRvcnlMaXN0ID0gdGhpcy5faW52ZW50b3J5U2VydmljZS5nZXRJbnZlbnRvcnlXYXJlaG91c2UoR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZUJ5TmFtZSh0aGlzLndhcmVob3VzZXNbdGhpcy53YXJlaG91c2VdKVtcImNvZGVcIl0pO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuV2FyZWhvdXNlQ29kZSA9IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeU5hbWUodGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXSlbXCJjb2RlXCJdO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dEYXRlTW9kYWwoaW5wdXQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlcltpbnB1dF0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgICAgY29udGV4dDogdG9kYXkudG9EYXRlU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNb2RhbERhdGVDb21wb25lbnQsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcblxyXG4gICAgICAgIGlmIChzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9kdWN0c1tpbmRleF0uSXRlbUNvZGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdC5wdXNoKHRoaXMuX3Byb2R1Y3RzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLnNob3dpbmdQcm9kdWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSB7fTtcclxuICAgICAgICB0aGlzLmxpbmVUaXRsZSA9IFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICAgICAgdGhpcy5saW5lU3ViVGl0bGUgPSBcIlNlbGVjdCBhbiBpdGVtIHRvIHZpZXcgZGV0YWlscyBhbmQgYWRkXCI7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0UXVhbnRpdHkgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWV3UHJvZHVjdChwcm9kdWN0OiBQcm9kdWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgIHRoaXMuc2hvd2luZ1Byb2R1Y3QgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGluZVRpdGxlID0gcHJvZHVjdC5JdGVtQ29kZURlc2M7XHJcbiAgICAgICAgdGhpcy5saW5lU3ViVGl0bGUgPSBwcm9kdWN0Lkl0ZW1Db2RlO1xyXG4gICAgICAgIHRoaXMuaXRlbUNvZGUgPSBwcm9kdWN0Lkl0ZW1Db2RlO1xyXG4gICAgICAgIHRoaXMuZ2V0SW52ZW50b3J5UXVhbnRpdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VhcmNoSXRlbUNvZGUoY29kZTogc3RyaW5nLCBsaXN0OiBhbnkpIHtcclxuICAgICAgICBsZXQgaXRlbSA9IGZhbHNlO1xyXG4gICAgICAgIGxpc3QubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGlzdFtpbmRleF0uSXRlbUNvZGUudG9Mb3dlckNhc2UoKSA9PSBjb2RlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QgPSB0aGlzLl9wcm9kdWN0c1tpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVQcm9kdWN0TGlzdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hJdGVtQ29kZSh0aGlzLml0ZW1Db2RlLCB0aGlzLl9wcm9kdWN0cykgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGFsZXJ0KGBJbnZhbGlkIGl0ZW0gY29kZS4gJHt0aGlzLml0ZW1Db2RlfSBkb2VzIG5vdCBleGlzdC5gKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMudmlld1Byb2R1Y3QodGhpcy5zZWxlY3RlZFByb2R1Y3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZUludGVnZXJOdW1iZXIobnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bWJlciAhPSBwYXJzZUludChudW1iZXIsIDEwKSB8fCBudW1iZXIgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFByb2R1Y3QoKSB7XHJcbiAgICAgICAgbGV0IHByb2R1Y3QgPSB0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwpO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlSW50ZWdlck51bWJlcih0aGlzLnByb2R1Y3RRdWFudGl0eSkpIHtcclxuICAgICAgICAgICAgaWYgKHByb2R1Y3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5ID0gdGhpcy5wcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eVByaWNlID0gdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkgKiBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwucHVzaCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCArPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSArIHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5DYXRlZ29yeTQgKiB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGBJdGVtICR7dGhpcy5pdGVtQ29kZX0gYWRkZWQgdG8gY2FydC5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0T3JkZXJNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIkludmFsaWQgcXVhbnRpdHlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50LmFuZHJvaWQuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLnRleHRSYW5nZUZyb21Qb3NpdGlvblRvUG9zaXRpb24odGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MuYmVnaW5uaW5nT2ZEb2N1bWVudCwgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MuZW5kT2ZEb2N1bWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93Q2FydCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9zYWxlT3JkZXIuRGV0YWlsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ2FydFByb2R1Y3QocHJvZHVjdDogUHJvZHVjdCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZUNhcnRQcm9kdWN0KCkge1xyXG4gICAgICAgIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2FsZU9yZGVyLkRldGFpbFtpbmRleF0uSXRlbUNvZGUgPT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0Lkl0ZW1Db2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50IC0gcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5IC0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzIC09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5DYXRlZ29yeTQgKiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TY2FuKCkge1xyXG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXHJcbiAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSxcclxuICAgICAgICAgICAgdG9yY2hPbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJvcmllbnRhdGlvblwiLFxyXG4gICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNvZGUgPSByZXN1bHQudGV4dDtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVByb2R1Y3RMaXN0KCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gc2Nhbm5pbmcgXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UHJvZHVjdE9yZGVyTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IG9sZFByb2R1Y3RRdWFudGl0eSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwgJiYgcmVzdWx0LnF1YW50aXR5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgLSBvbGRQcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgPSB0aGlzLnRvdGFsQ2FydEFtb3VudCAtIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyAtPSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuQ2F0ZWdvcnk0ICogb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgKyBwYXJzZUludChyZXN1bHQucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlID0gcmVzdWx0LnF1YW50aXR5ICogcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgKyB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgKz0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgPSBvbGRQcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdERldGFpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhcnRQcm9kdWN0OiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICB3YXJlaG91c2U6IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeUNvZGUodGhpcy5fc2FsZU9yZGVyLldhcmVob3VzZUNvZGUpW1wibmFtZVwiXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dDogcHJvZHVjdERldGFpbHMsXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0SW52ZW50b3J5UXVhbnRpdCgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmludmVudG9yeUxpc3QpKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmludmVudG9yeUxpc3QubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcXVhbnRpdHlBdmFpbCA9IHByb2R1Y3QuUXVhbnRpdHlPbkhhbmQgLSBwcm9kdWN0LlF1YW50aXR5T25TYWxlc09yZGVyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPT0gcHJvZHVjdC5JdGVtQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlPbkhhbmQgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlBdmFpbCA9IHF1YW50aXR5QXZhaWwgPCAwID8gMCA6IHF1YW50aXR5QXZhaWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Rlc2NyaXB0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dCAhPSB1bmRlZmluZWQgfHwgdGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQgIT0gXCJcIilcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYWxlcnQoXCJEZXNjcmlwdGlvbiBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZUZvbGlvc1RyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBmb2xpb051bWJlciA9IFNFUlZFUi5pc1F1b3RlID8gdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS5nZXRRdW90ZVRyYW5zYWN0aW9ucygpLmxlbmd0aCArIDEgOiB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlLmdldFNhbGVUcmFuc2FjdGlvbnMoKS5sZW5ndGggKyAxO1xyXG4gICAgICAgIGxldCBmb2xpb1NlcmllID0gYCR7dGhpcy5wYWRMZWZ0KGZvbGlvTnVtYmVyLnRvU3RyaW5nKCksICcwJywgNil9YDtcclxuICAgICAgICBsZXQgZG9jID0gU0VSVkVSLmlzUXVvdGUgPyBcIlF1b3RlXCIgOiBcIlNhbGVcIjtcclxuICAgICAgICBsZXQgZG9jU2VyaWUgPSBTRVJWRVIuaXNRdW90ZSA/IFwiUVwiIDogXCJTXCI7XHJcbiAgICAgICAgbGV0IHNlcmllID0gYCR7cGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQuc2xpY2UoMCwgNil9JHtkb2NTZXJpZX0tJHtmb2xpb1NlcmllfWA7XHJcbiAgICAgICAgbGV0IGZvbGlvID0ge1xyXG4gICAgICAgICAgICBGb2xpbzogZm9saW9TZXJpZSxcclxuICAgICAgICAgICAgRG9jdW1lbnQ6IGRvYyxcclxuICAgICAgICAgICAgU2VyaWU6IHNlcmllXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlLnVwZGF0ZUZvbGlvc1RyYW5zYWN0aW9uRG9jKGZvbGlvKTtcclxuICAgICAgICByZXR1cm4gc2VyaWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNhdmUoKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gdGhpcy52YWxpZGF0aW9ucygpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlcyA9PSBcIk9LXCIpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZXRMaW5lUHJvZHVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2FsZXNPcmRlck5PID0gdGhpcy5fc2FsZU9yZGVyLlNhbGVzT3JkZXJOTyA9PSBcIlwiID8gYXdhaXQgdGhpcy5zYXZlRm9saW9zVHJhbnNhY3Rpb24oKSA6IHRoaXMuX3NhbGVPcmRlci5TYWxlc09yZGVyTk87XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UudXBkYXRlU2FsZU9yZGVyRG9jKHRoaXMuX3NhbGVPcmRlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuX3NhbGVPcmRlcikpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhZExlZnQodGV4dDogc3RyaW5nLCBwYWRDaGFyOiBzdHJpbmcsIHNpemU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIChTdHJpbmcocGFkQ2hhcikucmVwZWF0KHNpemUpICsgdGV4dCkuc3Vic3RyKChzaXplICogLTEpLCBzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTYWxlT3JkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyID0ge1xyXG4gICAgICAgICAgICBJc1F1b3RlOiBTRVJWRVIuaXNRdW90ZSxcclxuICAgICAgICAgICAgU2F2ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBDdXN0b21lck5vOiB0aGlzLmN1c3RvbWVyLkN1c3RvbWVyTm8sXHJcbiAgICAgICAgICAgIEN1c3RvbWVyTmFtZTogdGhpcy5jdXN0b21lci5DdXN0b21lck5hbWUsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyUE9ObzogXCJcIixcclxuICAgICAgICAgICAgQ3VzdG9tZXJDb25maXJtVG86IFwiXCIsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyRkJPOiBcIlwiLFxyXG4gICAgICAgICAgICBTYWxlc09yZGVyTk86IFwiXCIsXHJcbiAgICAgICAgICAgIERldmljZVVpZDogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQsXHJcbiAgICAgICAgICAgIFNoaXBNZXRob2Q6IFwiXCIsXHJcbiAgICAgICAgICAgIEJpbGxUb05hbWU6IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOYW1lLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMTogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTEsXHJcbiAgICAgICAgICAgIEJpbGxUb0FkZHJlc3MyOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMiA9PSBudWxsID8gXCJcIiA6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUyLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMzogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTMgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMyxcclxuICAgICAgICAgICAgQmlsbFRvQ291bnRyeUNvZGU6IHRoaXMuY3VzdG9tZXIuQ291bnRyeUNvZGUsXHJcbiAgICAgICAgICAgIEJpbGxUb0NpdHk6IHRoaXMuY3VzdG9tZXIuQ2l0eSxcclxuICAgICAgICAgICAgQmlsbFRvU3RhdGU6IHRoaXMuY3VzdG9tZXIuU3RhdGUsXHJcbiAgICAgICAgICAgIEJpbGxUb1ppcENvZGU6IHRoaXMuY3VzdG9tZXIuWmlwQ29kZSxcclxuICAgICAgICAgICAgU2hpcFZpYTogXCJcIixcclxuICAgICAgICAgICAgV2FyZWhvdXNlQ29kZTogR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZUJ5TmFtZSh0aGlzLndhcmVob3VzZXNbdGhpcy53YXJlaG91c2VdKVtcImNvZGVcIl0sXHJcbiAgICAgICAgICAgIFNoaXBUbzogMCxcclxuICAgICAgICAgICAgU2hpcFRvQ2l0eTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9DaXR5LFxyXG4gICAgICAgICAgICBTaGlwVG9TdGF0ZTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9TdGF0ZSxcclxuICAgICAgICAgICAgU2hpcFRvWmlwQ29kZTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9aaXBDb2RlLFxyXG4gICAgICAgICAgICBEaXNjb3VudEFtdDogMCxcclxuICAgICAgICAgICAgU2hpcFRvTmFtZTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9OYW1lLFxyXG4gICAgICAgICAgICBTaGlwVG9BZGRyZXNzMTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9BZGRyZXNzMSxcclxuICAgICAgICAgICAgU2hpcFRvQWRkcmVzczI6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQWRkcmVzczIsXHJcbiAgICAgICAgICAgIFNoaXBUb0FkZHJlc3MzOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0FkZHJlc3MzLFxyXG4gICAgICAgICAgICBTaGlwVG9Db3VudHJ5Q29kZTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9Db3VudHJ5Q29kZSxcclxuICAgICAgICAgICAgT3JkZXJEYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBTaGlwRGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgRGF0ZUNyZWF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIERhdGVVcGRhdGVkOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBVc2VyQ29kZTogU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXSxcclxuICAgICAgICAgICAgU2FsZXNwZXJzb25ObzogU0VSVkVSLnVzZXJbXCJEZWZhdWx0U2FsZXNwZXJzb25JRFwiXSxcclxuICAgICAgICAgICAgVGVybXNDb2RlOiB0aGlzLmN1c3RvbWVyLlRlcm1zQ29kZSxcclxuICAgICAgICAgICAgQ29tbWVudDogXCJcIixcclxuICAgICAgICAgICAgRGV0YWlsOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9ucygpIHtcclxuICAgICAgICBsZXQgbWVzc2FnZXMgPSBcIlwiO1xyXG4gICAgICAgIG1lc3NhZ2VzICs9IHRoaXMudmFsaWRhdGVQcm9kdWN0cygpO1xyXG4gICAgICAgIGlmICh0aGlzLnNoaXBNZXRob2QgPT0gMClcclxuICAgICAgICAgICAgbWVzc2FnZXMgKz0gdGhpcy52YWxpZGF0ZUFkZHJlc3MoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzID09IFwiXCIgPyBcIk9LXCIgOiBtZXNzYWdlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlUHJvZHVjdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwubGVuZ3RoID4gMCA/IFwiXCIgOiBcIllvdSBuZWVkIHRvIGFkZCBwcm9kdWN0cyB0byBjYXJ0IFxcblwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVBZGRyZXNzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQWRkcmVzczEgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQ2l0eSA9PSBcIlwiIHx8IHRoaXMuX3NhbGVPcmRlci5TaGlwVG9TdGF0ZSA9PSBcIlwiIHx8IHRoaXMuX3NhbGVPcmRlci5TaGlwVG9aaXBDb2RlID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBcIllvdXIgU2hpcHBpbmcgQWRkcmVzcyBtdXN0IGhhdmUgKEZpcnN0IEFkZHJlc3MgbGluZSwgQ2l0eSwgU3RhdGUgYW5kIFppcCBjb2RlKSBcXG5cIjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TGluZVByb2R1Y3QoKSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHByb2R1Y3QubGluZUl0ZW0gPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgIHByb2R1Y3QucXVhbnRpdHkgPSBwYXJzZUludChwcm9kdWN0LnF1YW50aXR5KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2hpcE1ldGhvZCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcE1ldGhvZCA9PSAxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53YXJlaG91c2UgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcE1ldGhvZCA9IHRoaXMuc2hpcE1ldGhvZHNbdGhpcy5zaGlwTWV0aG9kXTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG59Il19