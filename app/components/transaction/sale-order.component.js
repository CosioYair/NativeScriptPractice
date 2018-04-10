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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        server_config_1.SERVER.isQuote = JSON.parse(this.route.snapshot.params["IsQuote"]);
                        return [4 /*yield*/, this.getCustomer(this.route.snapshot.params["CustomerNo"])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setShippingAddress()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.setInventory()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.setTermsCode()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.setDocument()];
                    case 5:
                        _a.sent();
                        this.warehouses = globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouses();
                        return [4 /*yield*/, this.refreshSaleOrder()];
                    case 6:
                        _a.sent();
                        if (!!server_config_1.SERVER.editTransaction.edit) return [3 /*break*/, 7];
                        this._saleOrder.ShipDate = this._saleOrder.ShipDate.getDate() + 1 + "/" + (this._saleOrder.ShipDate.getMonth() + 1) + "/" + this._saleOrder.ShipDate.getFullYear();
                        this._saleOrder.OrderDate = this._saleOrder.OrderDate.getDate() + "/" + this._saleOrder.OrderDate.getMonth() + "/" + this._saleOrder.OrderDate.getFullYear();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.getTransaction()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
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
                    console.log(JSON.stringify(quote));
                    _this._saleOrder = quote;
                }
            });
        }
        else {
            this._saleOrderService.getUserSaleOrderUnsaved().map(function (sale) {
                if (sale.SalesOrderNO == server_config_1.SERVER.editTransaction.transactionNo) {
                    console.log(JSON.stringify(sale));
                    _this._saleOrder = sale;
                }
            });
        }
        this.warehouse = this.warehouses.indexOf(globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouseByCode(this._saleOrder.WarehouseCode)["name"]);
        console.log(this._saleOrder.ShipMethod);
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
        if (this._couchbaseService.getDocument("inventory") == null)
            this._inventoryService.setInventoriesDoc();
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
                warehouse: constants_config_1.CONSTANTS.warehouses[this.warehouse]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRztBQUV0RyxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBQ2pHLGtEQUFrRTtBQUNsRSwwQ0FBaUQ7QUFHakQsc0VBQW9FO0FBRXBFLDhEQUFnRTtBQUdoRSxrRkFBZ0Y7QUFFaEYsc0VBQW9FO0FBRXBFLDREQUFvRDtBQUNwRCwwREFBNEQ7QUFDNUQsc0RBQStEO0FBQy9ELDhFQUFzRTtBQUN0RSxzRkFBb0Y7QUFTcEY7SUErQkksNEJBQW9CLGVBQStCLEVBQ3ZDLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBZ0MsRUFDaEMsS0FBdUIsRUFDdkIsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsT0FBeUIsRUFDekIsMEJBQW9EO1FBWGhFLGlCQTJDQztRQTNDbUIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ3ZDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLCtCQUEwQixH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RyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBemVpQjtRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBTSxpQkFBVTttREFBQztJQTdCekIsa0JBQWtCO1FBUDlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQWlDdUMsNkJBQWM7WUFDcEIsb0NBQWdCO1lBQ2hCLG9DQUFnQjtZQUNyQixpQ0FBa0I7WUFDekIsdUJBQWdCO1lBQ1AsNENBQWM7WUFDdkIsdUJBQWM7WUFDRixnQ0FBZ0I7WUFDVixnREFBc0I7WUFDNUIsb0NBQWdCO1lBQzFCLHlCQUFnQjtZQUNHLG9EQUF3QjtPQTFDdkQsa0JBQWtCLENBdWdCOUI7SUFBRCx5QkFBQztDQUFBLEFBdmdCRCxJQXVnQkM7QUF2Z0JZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nT3B0aW9ucywgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaXRlbUlucXVpcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCB7IE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZGFsL3Byb2R1Y3RPcmRlci9tb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jdXN0b21lci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW52ZW50b3J5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29kZSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3Rlcm1zQ29kZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2hpcHBpbmdBZGRyZXNzLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXcvdGFiLXZpZXdcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHTE9CQUxGVU5DVElPTlMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2dsb2JhbEZ1bmN0aW9ucy5jb25maWdcIjtcclxuaW1wb3J0IHsgRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZvbGlvc1RyYW5zYWN0aW9uLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtc2FsZS1vcmRlclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2FsZS1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NhbGUtb3JkZXIuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2FsZU9yZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBhbnk7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlczogYW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNoaXBWaWFzOiBhbnk7XHJcbiAgICBwdWJsaWMgc2hpcFZpYTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsaW5lVGl0bGU6IHN0cmluZyA9IFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICBwdWJsaWMgbGluZVN1YlRpdGxlOiBzdHJpbmcgPSBcIlNlbGVjdCBhbiBpdGVtIHRvIHZpZXcgZGV0YWlscyBhbmQgYWRkXCI7XHJcbiAgICBwdWJsaWMgc2hvd2luZ1Byb2R1Y3Q6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpdGVtQ29kZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBwcm9kdWN0UXVhbnRpdHk6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIG9yaWVudGF0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LW9yaWVudGF0aW9uJyk7XHJcbiAgICBwdWJsaWMgdGFiczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0aW9uVGFiczogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgcHVibGljIGN1c3RvbWVyOiBDdXN0b21lcjtcclxuICAgIHB1YmxpYyBpbnZlbnRvcnlMaXN0OiBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PigpO1xyXG4gICAgcHVibGljIHRvdGFsQ2FydEFtb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBjYXJ0UXVhbnRpdHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdXNlclRlcm1zQ29kZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNoaXBwaW5nQWRkcmVzc0xpc3Q6IGFueSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3M6IGFueTtcclxuICAgIHB1YmxpYyB0b3RhbEN1YmVzOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIF9zYWxlT3JkZXI6IFNhbGVPcmRlcjtcclxuICAgIHB1YmxpYyBzaGlwTWV0aG9kczogYW55ID0gW1wiRGVsaXZlcnlcIiwgXCJQaWNrdXBcIl07XHJcbiAgICBwdWJsaWMgc2hpcE1ldGhvZDogbnVtYmVyID0gMDtcclxuICAgIEBWaWV3Q2hpbGQoJ1F0eScpIFF0eTogRWxlbWVudFJlZjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIF90ZXJtc0NvZGVTZXJ2aWNlOiBUZXJtc0NvZGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2U6IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBfZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZTogRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnNoaXBWaWFzID0gW107XHJcbiAgICAgICAgQ09OU1RBTlRTLnNoaXBWaWFzLm1hcChzaGlwVmlhID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaGlwVmlhcy5wdXNoKHNoaXBWaWEubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LmNvbW1lbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLm9yaWVudGF0aW9uLnNldE9yaWVudGF0aW9uKFwibGFuZHNjYXBlcmlnaHRcIik7ICBcclxuICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMgPSBbe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJIRUFERVJcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBRERSRVNTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkxJTkVTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlRPVEFMU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH1dO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAodGFiID0+IHtcclxuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gdGFiLnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLmVkaXQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICBTRVJWRVIuaXNRdW90ZSA9IEpTT04ucGFyc2UodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJJc1F1b3RlXCJdKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmdldEN1c3RvbWVyKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiQ3VzdG9tZXJOb1wiXSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRTaGlwcGluZ0FkZHJlc3MoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldEludmVudG9yeSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0VGVybXNDb2RlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXREb2N1bWVudCgpO1xyXG4gICAgICAgIHRoaXMud2FyZWhvdXNlcyA9IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoU2FsZU9yZGVyKCk7XHJcbiAgICAgICAgaWYgKCFTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLmVkaXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBEYXRlID0gYCR7dGhpcy5fc2FsZU9yZGVyLlNoaXBEYXRlLmdldERhdGUoKSArIDF9LyR7dGhpcy5fc2FsZU9yZGVyLlNoaXBEYXRlLmdldE1vbnRoKCkgKyAxfS8ke3RoaXMuX3NhbGVPcmRlci5TaGlwRGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5PcmRlckRhdGUgPSBgJHt0aGlzLl9zYWxlT3JkZXIuT3JkZXJEYXRlLmdldERhdGUoKX0vJHt0aGlzLl9zYWxlT3JkZXIuT3JkZXJEYXRlLmdldE1vbnRoKCl9LyR7dGhpcy5fc2FsZU9yZGVyLk9yZGVyRGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldFRyYW5zYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUcmFuc2FjdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhTRVJWRVIuaXNRdW90ZSlcclxuICAgICAgICBpZiAoU0VSVkVSLmlzUXVvdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyUXVvdGVVbnNhdmVkKCkubWFwKHF1b3RlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChxdW90ZS5TYWxlc09yZGVyTk8gPT0gU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi50cmFuc2FjdGlvbk5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVvdGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSBxdW90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCkubWFwKHNhbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhbGUuU2FsZXNPcmRlck5PID09IFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24udHJhbnNhY3Rpb25Obykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHNhbGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSBzYWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53YXJlaG91c2UgPSB0aGlzLndhcmVob3VzZXMuaW5kZXhPZihHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlQnlDb2RlKHRoaXMuX3NhbGVPcmRlci5XYXJlaG91c2VDb2RlKVtcIm5hbWVcIl0pOyBcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9zYWxlT3JkZXIuU2hpcE1ldGhvZCk7XHJcbiAgICAgICAgdGhpcy5zaGlwTWV0aG9kID0gdGhpcy5fc2FsZU9yZGVyLlNoaXBNZXRob2QgPT0gXCJEZWxpdmVyeVwiID8gMCA6IDE7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDYXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ICs9IHByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgKz0gcGFyc2VJbnQocHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSBwcm9kdWN0LkNhdGVnb3J5NCAqIHByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAoKHRhYiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB0YWIudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRhYi52aXNpYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldERvY3VtZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5zZXRQcm9kdWN0RG9jdW1lbnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0RG9jdW1lbnQoKTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1c3RvbWVyKEN1c3RvbWVyTm86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiY3VzdG9tZXJcIilbXCJjdXN0b21lclwiXTtcclxuICAgICAgICBkb2MubWFwKGN1c3RvbWVyID0+IHtcclxuICAgICAgICAgICAgaWYgKGN1c3RvbWVyLkN1c3RvbWVyTm8gPT0gQ3VzdG9tZXJObylcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIgPSBjdXN0b21lcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGVybXNDb2RlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidGVybXNjb2RlXCIpID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2Uuc2V0VGVybXNDb2RlRG9jKCk7XHJcbiAgICAgICAgdGhpcy51c2VyVGVybXNDb2RlID0gdGhpcy5fdGVybXNDb2RlU2VydmljZS5nZXRVc2VyVGVybXNDb2RlKHRoaXMuY3VzdG9tZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZXRTaGlwcGluZ0FkZHJlc3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzaGlwcGluZ2FkZHJlc3NcIikgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZS5zZXRTaGlwcGluZ0FkZHJlc3NEb2MoKTtcclxuICAgICAgICB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9IGF3YWl0IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UuZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3ModGhpcy5jdXN0b21lcik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzTGlzdCA9IFtdO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzc0xpc3QgPSBhd2FpdCB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLmdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzTGlzdCh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEludmVudG9yeSgpIHtcclxuICAgICAgICBsZXQgd2FyZWhvdXNlQ29kZSA9IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeU5hbWUodGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXSlbXCJjb2RlXCJdO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiaW52ZW50b3J5XCIpID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX2ludmVudG9yeVNlcnZpY2Uuc2V0SW52ZW50b3JpZXNEb2MoKTtcclxuICAgICAgICB0aGlzLmludmVudG9yeUxpc3QgPSB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLmdldEludmVudG9yeVdhcmVob3VzZSh3YXJlaG91c2VDb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0NpdHkgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9DaXR5O1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvU3RhdGUgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9TdGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1ppcENvZGUgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9aaXBDb2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvTmFtZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb05hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb0FkZHJlc3MxO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQWRkcmVzczIgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9BZGRyZXNzMjtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MzID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQWRkcmVzczM7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9Db3VudHJ5Q29kZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb0NvdW50cnlDb2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvID0gYXJncy5uZXdJbmRleDtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21lclNoaXBWaWEoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaGlwVmlhID0gYXJncy5uZXdJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBWaWEgPSB0aGlzLnNoaXBWaWFzW3RoaXMuc2hpcFZpYV1cclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXJJbnZlbnRvcnlXYXJlaG91c2UoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IHRoaXMuX2ludmVudG9yeVNlcnZpY2UuZ2V0SW52ZW50b3J5V2FyZWhvdXNlKEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeU5hbWUodGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXSlbXCJjb2RlXCJdKTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLldhcmVob3VzZUNvZGUgPSBHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlQnlOYW1lKHRoaXMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0pW1wiY29kZVwiXTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RGF0ZU1vZGFsKGlucHV0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlldygpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJbaW5wdXRdID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gYWxlcnQoZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZU1vZGVsVmlldygpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IHRvZGF5LnRvRGF0ZVN0cmluZygpLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxEYXRlQ29tcG9uZW50LCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG5cclxuICAgICAgICBpZiAoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0PigpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cy5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvZHVjdHNbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaCh0aGlzLl9wcm9kdWN0c1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5jZWwoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nUHJvZHVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0ge307XHJcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSBcIkl0ZW0gRGV0YWlsc1wiO1xyXG4gICAgICAgIHRoaXMubGluZVN1YlRpdGxlID0gXCJTZWxlY3QgYW4gaXRlbSB0byB2aWV3IGRldGFpbHMgYW5kIGFkZFwiO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdFF1YW50aXR5ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlld1Byb2R1Y3QocHJvZHVjdDogUHJvZHVjdCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICB0aGlzLnNob3dpbmdQcm9kdWN0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxpbmVUaXRsZSA9IHByb2R1Y3QuSXRlbUNvZGVEZXNjO1xyXG4gICAgICAgIHRoaXMubGluZVN1YlRpdGxlID0gcHJvZHVjdC5JdGVtQ29kZTtcclxuICAgICAgICB0aGlzLml0ZW1Db2RlID0gcHJvZHVjdC5JdGVtQ29kZTtcclxuICAgICAgICB0aGlzLmdldEludmVudG9yeVF1YW50aXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlYXJjaEl0ZW1Db2RlKGNvZGU6IHN0cmluZywgbGlzdDogYW55KSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBmYWxzZTtcclxuICAgICAgICBsaXN0Lm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkgPT0gY29kZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gdGhpcy5fcHJvZHVjdHNbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlUHJvZHVjdExpc3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoSXRlbUNvZGUodGhpcy5pdGVtQ29kZSwgdGhpcy5fcHJvZHVjdHMpID09IGZhbHNlKVxyXG4gICAgICAgICAgICBhbGVydChgSW52YWxpZCBpdGVtIGNvZGUuICR7dGhpcy5pdGVtQ29kZX0gZG9lcyBub3QgZXhpc3QuYCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9kdWN0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVJbnRlZ2VyTnVtYmVyKG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW1iZXIgIT0gcGFyc2VJbnQobnVtYmVyLCAxMCkgfHwgbnVtYmVyIDwgMSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRQcm9kdWN0KCkge1xyXG4gICAgICAgIGxldCBwcm9kdWN0ID0gdGhpcy5zZWFyY2hJdGVtQ29kZSh0aGlzLml0ZW1Db2RlLCB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsKTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUludGVnZXJOdW1iZXIodGhpcy5wcm9kdWN0UXVhbnRpdHkpKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSA9IHRoaXMucHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlQcmljZSA9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5ICogcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkUHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLnB1c2godGhpcy5zZWxlY3RlZFByb2R1Y3QpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgKz0gdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgKyBwYXJzZUludCh0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgKz0gdGhpcy5zZWxlY3RlZFByb2R1Y3QuQ2F0ZWdvcnk0ICogdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICBhbGVydChgSXRlbSAke3RoaXMuaXRlbUNvZGV9IGFkZGVkIHRvIGNhcnQuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdE9yZGVyTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJJbnZhbGlkIHF1YW50aXR5XCIpO1xyXG4gICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5hbmRyb2lkLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy50ZXh0UmFuZ2VGcm9tUG9zaXRpb25Ub1Bvc2l0aW9uKHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLmJlZ2lubmluZ09mRG9jdW1lbnQsIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLmVuZE9mRG9jdW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0NhcnQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5fc2FsZU9yZGVyLkRldGFpbCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZENhcnRQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVDYXJ0UHJvZHVjdCgpIHtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NhbGVPcmRlci5EZXRhaWxbaW5kZXhdLkl0ZW1Db2RlID09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgPSB0aGlzLnRvdGFsQ2FydEFtb3VudCAtIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSAtIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyAtPSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuQ2F0ZWdvcnk0ICogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2NhbigpIHtcclxuICAgICAgICB0aGlzLmJhcmNvZGVTY2FubmVyLnNjYW4oe1xyXG4gICAgICAgICAgICBmb3JtYXRzOiBcIlFSX0NPREUsIEVBTl8xM1wiLFxyXG4gICAgICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGJlZXBPblNjYW46IHRydWUsXHJcbiAgICAgICAgICAgIHRvcmNoT246IGZhbHNlLFxyXG4gICAgICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCxcclxuICAgICAgICAgICAgb3JpZW50YXRpb246IFwib3JpZW50YXRpb25cIixcclxuICAgICAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1Db2RlID0gcmVzdWx0LnRleHQ7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGVuIHNjYW5uaW5nIFwiICsgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1Byb2R1Y3RPcmRlck1vZGFsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRQcm9kdWN0UXVhbnRpdHkgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vZGVsVmlld1Byb2R1Y3RFZGl0KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsICYmIHJlc3VsdC5xdWFudGl0eSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5IC0gb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgLSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgLT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIG9sZFByb2R1Y3RRdWFudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5ICsgcGFyc2VJbnQocmVzdWx0LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSA9IHJlc3VsdC5xdWFudGl0eSAqIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50ICsgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzICs9IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5DYXRlZ29yeTQgKiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ID0gb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBhbGVydChlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZU1vZGVsVmlld1Byb2R1Y3RFZGl0KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3REZXRhaWxzID0ge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgd2FyZWhvdXNlOiBDT05TVEFOVFMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHByb2R1Y3REZXRhaWxzLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldEludmVudG9yeVF1YW50aXQoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5pbnZlbnRvcnlMaXN0KSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbnZlbnRvcnlMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHF1YW50aXR5QXZhaWwgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kIC0gcHJvZHVjdC5RdWFudGl0eU9uU2FsZXNPcmRlcjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9kdWN0Lkl0ZW1Db2RlID09IHByb2R1Y3QuSXRlbUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5T25IYW5kID0gcHJvZHVjdC5RdWFudGl0eU9uSGFuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5QXZhaWwgPSBxdWFudGl0eUF2YWlsIDwgMCA/IDAgOiBxdWFudGl0eUF2YWlsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dEZXNjcmlwdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQgIT0gdW5kZWZpbmVkIHx8IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0ICE9IFwiXCIpXHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRGVzY3JpcHRpb24gbm90IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVGb2xpb3NUcmFuc2FjdGlvbigpIHtcclxuICAgICAgICBsZXQgZm9saW9OdW1iZXIgPSBTRVJWRVIuaXNRdW90ZSA/IHRoaXMuX2ZvbGlvc1RyYW5zYWN0aW9uc1NlcnZpY2UuZ2V0UXVvdGVUcmFuc2FjdGlvbnMoKS5sZW5ndGggKyAxIDogdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS5nZXRTYWxlVHJhbnNhY3Rpb25zKCkubGVuZ3RoICsgMTtcclxuICAgICAgICBsZXQgZm9saW9TZXJpZSA9IGAke3RoaXMucGFkTGVmdChmb2xpb051bWJlci50b1N0cmluZygpLCAnMCcsIDYpfWA7XHJcbiAgICAgICAgbGV0IGRvYyA9IFNFUlZFUi5pc1F1b3RlID8gXCJRdW90ZVwiIDogXCJTYWxlXCI7XHJcbiAgICAgICAgbGV0IGRvY1NlcmllID0gU0VSVkVSLmlzUXVvdGUgPyBcIlFcIiA6IFwiU1wiO1xyXG4gICAgICAgIGxldCBzZXJpZSA9IGAke3BsYXRmb3JtTW9kdWxlLmRldmljZS51dWlkLnNsaWNlKDAsIDYpfSR7ZG9jU2VyaWV9LSR7Zm9saW9TZXJpZX1gO1xyXG4gICAgICAgIGxldCBmb2xpbyA9IHtcclxuICAgICAgICAgICAgRm9saW86IGZvbGlvU2VyaWUsXHJcbiAgICAgICAgICAgIERvY3VtZW50OiBkb2MsXHJcbiAgICAgICAgICAgIFNlcmllOiBzZXJpZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS51cGRhdGVGb2xpb3NUcmFuc2FjdGlvbkRvYyhmb2xpbyk7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzYXZlKCkge1xyXG4gICAgICAgIGxldCBtZXNzYWdlcyA9IHRoaXMudmFsaWRhdGlvbnMoKTtcclxuICAgICAgICBpZiAobWVzc2FnZXMgPT0gXCJPS1wiKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2V0TGluZVByb2R1Y3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNhbGVzT3JkZXJOTyA9IHRoaXMuX3NhbGVPcmRlci5TYWxlc09yZGVyTk8gPT0gXCJcIiA/IGF3YWl0IHRoaXMuc2F2ZUZvbGlvc1RyYW5zYWN0aW9uKCkgOiB0aGlzLl9zYWxlT3JkZXIuU2FsZXNPcmRlck5PO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLnVwZGF0ZVNhbGVPcmRlckRvYyh0aGlzLl9zYWxlT3JkZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9zYWxlT3JkZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBhbGVydChtZXNzYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYWRMZWZ0KHRleHQ6IHN0cmluZywgcGFkQ2hhcjogc3RyaW5nLCBzaXplOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAoU3RyaW5nKHBhZENoYXIpLnJlcGVhdChzaXplKSArIHRleHQpLnN1YnN0cigoc2l6ZSAqIC0xKSwgc2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoU2FsZU9yZGVyKCkge1xyXG4gICAgICAgIHRoaXMuX3NhbGVPcmRlciA9IHtcclxuICAgICAgICAgICAgSXNRdW90ZTogU0VSVkVSLmlzUXVvdGUsXHJcbiAgICAgICAgICAgIFNhdmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgQ3VzdG9tZXJObzogdGhpcy5jdXN0b21lci5DdXN0b21lck5vLFxyXG4gICAgICAgICAgICBDdXN0b21lck5hbWU6IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOYW1lLFxyXG4gICAgICAgICAgICBDdXN0b21lclBPTm86IFwiXCIsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyQ29uZmlybVRvOiBcIlwiLFxyXG4gICAgICAgICAgICBDdXN0b21lckZCTzogXCJcIixcclxuICAgICAgICAgICAgU2FsZXNPcmRlck5POiBcIlwiLFxyXG4gICAgICAgICAgICBEZXZpY2VVaWQ6IHBsYXRmb3JtTW9kdWxlLmRldmljZS51dWlkLFxyXG4gICAgICAgICAgICBTaGlwTWV0aG9kOiBcIlwiLFxyXG4gICAgICAgICAgICBCaWxsVG9OYW1lOiB0aGlzLmN1c3RvbWVyLkN1c3RvbWVyTmFtZSxcclxuICAgICAgICAgICAgQmlsbFRvQWRkcmVzczE6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUxLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMjogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTIgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMixcclxuICAgICAgICAgICAgQmlsbFRvQWRkcmVzczM6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUzID09IG51bGwgPyBcIlwiIDogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTMsXHJcbiAgICAgICAgICAgIEJpbGxUb0NvdW50cnlDb2RlOiB0aGlzLmN1c3RvbWVyLkNvdW50cnlDb2RlLFxyXG4gICAgICAgICAgICBCaWxsVG9DaXR5OiB0aGlzLmN1c3RvbWVyLkNpdHksXHJcbiAgICAgICAgICAgIEJpbGxUb1N0YXRlOiB0aGlzLmN1c3RvbWVyLlN0YXRlLFxyXG4gICAgICAgICAgICBCaWxsVG9aaXBDb2RlOiB0aGlzLmN1c3RvbWVyLlppcENvZGUsXHJcbiAgICAgICAgICAgIFNoaXBWaWE6IFwiXCIsXHJcbiAgICAgICAgICAgIFdhcmVob3VzZUNvZGU6IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeU5hbWUodGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXSlbXCJjb2RlXCJdLFxyXG4gICAgICAgICAgICBTaGlwVG86IDAsXHJcbiAgICAgICAgICAgIFNoaXBUb0NpdHk6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQ2l0eSxcclxuICAgICAgICAgICAgU2hpcFRvU3RhdGU6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvU3RhdGUsXHJcbiAgICAgICAgICAgIFNoaXBUb1ppcENvZGU6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvWmlwQ29kZSxcclxuICAgICAgICAgICAgRGlzY291bnRBbXQ6IDAsXHJcbiAgICAgICAgICAgIFNoaXBUb05hbWU6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvTmFtZSxcclxuICAgICAgICAgICAgU2hpcFRvQWRkcmVzczE6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQWRkcmVzczEsXHJcbiAgICAgICAgICAgIFNoaXBUb0FkZHJlc3MyOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0FkZHJlc3MyLFxyXG4gICAgICAgICAgICBTaGlwVG9BZGRyZXNzMzogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9BZGRyZXNzMyxcclxuICAgICAgICAgICAgU2hpcFRvQ291bnRyeUNvZGU6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQ291bnRyeUNvZGUsXHJcbiAgICAgICAgICAgIE9yZGVyRGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgU2hpcERhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgVXNlckNvZGU6IFNFUlZFUi51c2VyW1wiVXNlckNvZGVcIl0sXHJcbiAgICAgICAgICAgIFNhbGVzcGVyc29uTm86IFNFUlZFUi51c2VyW1wiRGVmYXVsdFNhbGVzcGVyc29uSURcIl0sXHJcbiAgICAgICAgICAgIFRlcm1zQ29kZTogdGhpcy5jdXN0b21lci5UZXJtc0NvZGUsXHJcbiAgICAgICAgICAgIENvbW1lbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIERldGFpbDogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gXCJcIjtcclxuICAgICAgICBtZXNzYWdlcyArPSB0aGlzLnZhbGlkYXRlUHJvZHVjdHMoKTtcclxuICAgICAgICBpZiAodGhpcy5zaGlwTWV0aG9kID09IDApXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzICs9IHRoaXMudmFsaWRhdGVBZGRyZXNzKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlcyA9PSBcIlwiID8gXCJPS1wiIDogbWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVByb2R1Y3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLmxlbmd0aCA+IDAgPyBcIlwiIDogXCJZb3UgbmVlZCB0byBhZGQgcHJvZHVjdHMgdG8gY2FydCBcXG5cIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlQWRkcmVzcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MxID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0NpdHkgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvU3RhdGUgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvWmlwQ29kZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIFNoaXBwaW5nIEFkZHJlc3MgbXVzdCBoYXZlIChGaXJzdCBBZGRyZXNzIGxpbmUsIENpdHksIFN0YXRlIGFuZCBaaXAgY29kZSkgXFxuXCI7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldExpbmVQcm9kdWN0KCkge1xyXG4gICAgICAgIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9kdWN0LmxpbmVJdGVtID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICBwcm9kdWN0LnF1YW50aXR5ID0gcGFyc2VJbnQocHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNoaXBNZXRob2QoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBNZXRob2QgPT0gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMud2FyZWhvdXNlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBNZXRob2QgPSB0aGlzLnNoaXBNZXRob2RzW3RoaXMuc2hpcE1ldGhvZF07XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxufSJdfQ==