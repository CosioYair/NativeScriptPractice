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
        server_config_1.SERVER.isQuote = JSON.parse(this.route.snapshot.params["IsQuote"]);
        this.getCustomer(this.route.snapshot.params["CustomerNo"]);
        this.setShippingAddress();
        this.setInventory();
        this.userTermsCode = this._termsCodeService.getUserTermsCode(this.customer);
        this.setDocument();
        this.warehouses = globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouses();
        this.refreshSaleOrder();
    }
    SaleOrderComponent.prototype.ngOnDestroy = function () {
        server_config_1.SERVER.editTransaction.edit = false;
    };
    SaleOrderComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
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
                        this.setSaleOrderShipAddress(0);
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
            _this.setSaleOrderShipAddress(args.newIndex);
        }, 500);
    };
    SaleOrderComponent.prototype.setSaleOrderShipAddress = function (index) {
        this._saleOrder.ShipVia = this._customerShippingAddress[index].ShipVia;
        this._saleOrder.ShipToState = this._customerShippingAddress[index].ShipToState;
        this._saleOrder.ShipToZipCode = this._customerShippingAddress[index].ShipToZipCode;
        this._saleOrder.ShipToName = this._customerShippingAddress[index].ShipToName;
        this._saleOrder.ShipToAddress1 = this._customerShippingAddress[index].ShipToAddress1;
        this._saleOrder.ShipToAddress2 = this._customerShippingAddress[index].ShipToAddress2;
        this._saleOrder.ShipToAddress3 = this._customerShippingAddress[index].ShipToAddress3;
        this._saleOrder.ShipToCountryCode = this._customerShippingAddress[index].ShipToCountryCode;
        this._saleOrder.ShipToCity = this._customerShippingAddress[index].ShipToCity;
        this._saleOrder.ShipTo = index;
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
        var currentDate = new Date();
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
        if (!server_config_1.SERVER.editTransaction.edit) {
            this._saleOrder.ShipDate = currentDate.getDate() + 1 + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
            this._saleOrder.OrderDate = currentDate.getDate() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear();
        }
        else {
            this.getTransaction();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRztBQUV0RyxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUk5RSw0RkFBMEY7QUFFMUYsNERBQTZEO0FBQzdELDJFQUE2RDtBQUM3RCxxR0FBaUc7QUFDakcsa0RBQWtFO0FBQ2xFLDBDQUFpRDtBQUdqRCxzRUFBb0U7QUFFcEUsOERBQWdFO0FBR2hFLGtGQUFnRjtBQUVoRixzRUFBb0U7QUFFcEUsNERBQW9EO0FBQ3BELDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QsOEVBQXNFO0FBQ3RFLHNGQUFvRjtBQVNwRjtJQThCSSw0QkFBb0IsZUFBK0IsRUFDdkMsaUJBQW1DLEVBQ25DLGlCQUFtQyxFQUNuQyxZQUFnQyxFQUNoQyxLQUF1QixFQUN2QixjQUE4QixFQUM5QixLQUFxQixFQUNyQixpQkFBbUMsRUFDbkMsdUJBQStDLEVBQy9DLGlCQUFtQyxFQUNuQyxPQUF5QixFQUN6QiwwQkFBb0Q7UUFYaEUsaUJBK0NDO1FBL0NtQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDdkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsK0JBQTBCLEdBQTFCLDBCQUEwQixD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QUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO1lBQ3BHLFdBQVcsRUFBRSxJQUFJLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXO1lBQ3RHLGFBQWEsRUFBRSxJQUFJLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO1lBQzFHLFdBQVcsRUFBRSxDQUFDO1lBQ2QsVUFBVSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7WUFDcEcsY0FBYyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7WUFDNUcsY0FBYyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7WUFDNUcsY0FBYyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7WUFDNUcsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFB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b250YWluZXJSZWYsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dPcHRpb25zLCBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbC9kYXRlcGlja2VyL21vZGFsLWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbnN0YW50cy5jb25maWdcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhci9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pdGVtSW5xdWlyeS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcclxuaW1wb3J0IHsgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvcHJvZHVjdE9yZGVyL21vZGFsLXByb2R1Y3Qtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2N1c3RvbWVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnkgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9pbnZlbnRvcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGVjaW1hbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBUZXJtc0NvZGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Rlcm1zLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVGVybXNDb2RlIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvdGVybXNDb2RlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3MgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zaGlwcGluZ0FkZHJlc3MuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcHBpbmdBZGRyZXNzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItdmlldy90YWItdmlld1wiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NhbGVPcmRlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIHBsYXRmb3JtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdMT0JBTEZVTkNUSU9OUyB9IGZyb20gXCIuLi8uLi9jb25maWcvZ2xvYmFsRnVuY3Rpb25zLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBGb2xpb3NUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZm9saW9zVHJhbnNhY3Rpb24uc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1zYWxlLW9yZGVyXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zYWxlLW9yZGVyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vc2FsZS1vcmRlci5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTYWxlT3JkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwdWJsaWMgcHJvZHVjdExpc3Q6IGFueTtcclxuICAgIHByaXZhdGUgX3Byb2R1Y3RzOiBhbnk7XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRQcm9kdWN0OiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZENhcnRQcm9kdWN0OiBhbnkgPSB7fTtcclxuICAgIHB1YmxpYyB3YXJlaG91c2VzOiBhbnkgPSBbXTtcclxuICAgIHB1YmxpYyB3YXJlaG91c2U6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbGluZVRpdGxlOiBzdHJpbmcgPSBcIkl0ZW0gRGV0YWlsc1wiO1xyXG4gICAgcHVibGljIGxpbmVTdWJUaXRsZTogc3RyaW5nID0gXCJTZWxlY3QgYW4gaXRlbSB0byB2aWV3IGRldGFpbHMgYW5kIGFkZFwiO1xyXG4gICAgcHVibGljIHNob3dpbmdQcm9kdWN0OiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXRlbUNvZGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcHJvZHVjdFF1YW50aXR5OiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBvcmllbnRhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1vcmllbnRhdGlvbicpO1xyXG4gICAgcHVibGljIHRhYnM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xyXG4gICAgcHVibGljIHNlbGVjdGlvblRhYnM6IGFueTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4ID0gMDtcclxuICAgIHB1YmxpYyBjdXN0b21lcjogQ3VzdG9tZXI7XHJcbiAgICBwdWJsaWMgaW52ZW50b3J5TGlzdDogT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEludmVudG9yeT4oKTtcclxuICAgIHB1YmxpYyB0b3RhbENhcnRBbW91bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgY2FydFF1YW50aXR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHVzZXJUZXJtc0NvZGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzaGlwcGluZ0FkZHJlc3NMaXN0OiBhbnkgPSBbXTtcclxuICAgIHByaXZhdGUgX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzOiBhbnk7XHJcbiAgICBwdWJsaWMgdG90YWxDdWJlczogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBfc2FsZU9yZGVyOiBTYWxlT3JkZXI7XHJcbiAgICBwdWJsaWMgc2hpcE1ldGhvZHM6IGFueSA9IFtcIkRlbGl2ZXJ5XCIsIFwiUGlja3VwXCJdO1xyXG4gICAgcHVibGljIHNoaXBNZXRob2Q6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgcHJvZHVjdEltYWdlOiBhbnk7XHJcbiAgICBAVmlld0NoaWxkKCdRdHknKSBRdHk6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2ludmVudG9yeVNlcnZpY2U6IEludmVudG9yeVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBfdGVybXNDb2RlU2VydmljZTogVGVybXNDb2RlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlOiBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgX2ZvbGlvc1RyYW5zYWN0aW9uc1NlcnZpY2U6IEZvbGlvc1RyYW5zYWN0aW9uU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LmNvbW1lbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLm9yaWVudGF0aW9uLnNldE9yaWVudGF0aW9uKFwibGFuZHNjYXBlcmlnaHRcIik7ICBcclxuICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvblRhYnMgPSBbe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJIRUFERVJcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBRERSRVNTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkxJTkVTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIlRPVEFMU1wiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxyXG4gICAgICAgIH1dO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAodGFiID0+IHtcclxuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gdGFiLnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBTRVJWRVIuaXNRdW90ZSA9IEpTT04ucGFyc2UodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJJc1F1b3RlXCJdKTtcclxuICAgICAgICB0aGlzLmdldEN1c3RvbWVyKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiQ3VzdG9tZXJOb1wiXSk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlwcGluZ0FkZHJlc3MoKTtcclxuICAgICAgICB0aGlzLnNldEludmVudG9yeSgpO1xyXG4gICAgICAgIHRoaXMudXNlclRlcm1zQ29kZSA9IHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UuZ2V0VXNlclRlcm1zQ29kZSh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICB0aGlzLnNldERvY3VtZW50KCk7XHJcbiAgICAgICAgdGhpcy53YXJlaG91c2VzID0gR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZXMoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hTYWxlT3JkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLmVkaXQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFNFUlZFUi5pc1F1b3RlKVxyXG4gICAgICAgIGlmIChTRVJWRVIuaXNRdW90ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJRdW90ZVVuc2F2ZWQoKS5tYXAocXVvdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1b3RlLlNhbGVzT3JkZXJOTyA9PSBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uTm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSBxdW90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCkubWFwKHNhbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhbGUuU2FsZXNPcmRlck5PID09IFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24udHJhbnNhY3Rpb25Obykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlciA9IHNhbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndhcmVob3VzZSA9IHRoaXMud2FyZWhvdXNlcy5pbmRleE9mKEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeUNvZGUodGhpcy5fc2FsZU9yZGVyLldhcmVob3VzZUNvZGUpW1wibmFtZVwiXSk7XHJcbiAgICAgICAgdGhpcy5zaGlwTWV0aG9kID0gdGhpcy5fc2FsZU9yZGVyLlNoaXBNZXRob2QgPT0gXCJEZWxpdmVyeVwiID8gMCA6IDE7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDYXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ICs9IHByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgKz0gcGFyc2VJbnQocHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSBwcm9kdWN0LkNhdGVnb3J5NCAqIHByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicy5tYXAoKHRhYiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB0YWIudmlzaWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRhYi52aXNpYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldERvY3VtZW50KCkge1xyXG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdERvY3VtZW50KCk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4odGhpcy5fcHJvZHVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXN0b21lcihDdXN0b21lck5vOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImN1c3RvbWVyXCIpW1wiY3VzdG9tZXJcIl07XHJcbiAgICAgICAgZG9jLm1hcChjdXN0b21lciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21lci5DdXN0b21lck5vID09IEN1c3RvbWVyTm8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldFNoaXBwaW5nQWRkcmVzcygpIHtcclxuICAgICAgICB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9IGF3YWl0IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UuZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3ModGhpcy5jdXN0b21lcik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzTGlzdCA9IFtdO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzc0xpc3QgPSBhd2FpdCB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLmdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzTGlzdCh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTYWxlT3JkZXJTaGlwQWRkcmVzcygwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEludmVudG9yeSgpIHtcclxuICAgICAgICBsZXQgd2FyZWhvdXNlQ29kZSA9IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeU5hbWUodGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXSlbXCJjb2RlXCJdO1xyXG4gICAgICAgIHRoaXMuaW52ZW50b3J5TGlzdCA9IHRoaXMuX2ludmVudG9yeVNlcnZpY2UuZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHdhcmVob3VzZUNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyhhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNhbGVPcmRlclNoaXBBZGRyZXNzKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNhbGVPcmRlclNoaXBBZGRyZXNzKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBWaWEgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1tpbmRleF0uU2hpcFZpYTtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvU3RhdGUgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1tpbmRleF0uU2hpcFRvU3RhdGU7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1ppcENvZGUgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1tpbmRleF0uU2hpcFRvWmlwQ29kZTtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvTmFtZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2luZGV4XS5TaGlwVG9OYW1lO1xyXG4gICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2luZGV4XS5TaGlwVG9BZGRyZXNzMTtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQWRkcmVzczIgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1tpbmRleF0uU2hpcFRvQWRkcmVzczI7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MzID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbaW5kZXhdLlNoaXBUb0FkZHJlc3MzO1xyXG4gICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9Db3VudHJ5Q29kZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2luZGV4XS5TaGlwVG9Db3VudHJ5Q29kZTtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQ2l0eSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2luZGV4XS5TaGlwVG9DaXR5O1xyXG4gICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG8gPSBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmlsdGVySW52ZW50b3J5V2FyZWhvdXNlKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmludmVudG9yeUxpc3QgPSB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLmdldEludmVudG9yeVdhcmVob3VzZShHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlQnlOYW1lKHRoaXMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0pW1wiY29kZVwiXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5XYXJlaG91c2VDb2RlID0gR0xPQkFMRlVOQ1RJT05TLmdldFdhcmVob3VzZUJ5TmFtZSh0aGlzLndhcmVob3VzZXNbdGhpcy53YXJlaG91c2VdKVtcImNvZGVcIl07XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0RhdGVNb2RhbChpbnB1dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RlbFZpZXcoKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyW2lucHV0XSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbFZpZXcoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB0b2RheS50b0RhdGVTdHJpbmcoKSxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsRGF0ZUNvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuXHJcbiAgICAgICAgaWYgKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd2luZ1Byb2R1Y3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHt9O1xyXG4gICAgICAgIHRoaXMubGluZVRpdGxlID0gXCJJdGVtIERldGFpbHNcIjtcclxuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IFwiU2VsZWN0IGFuIGl0ZW0gdG8gdmlldyBkZXRhaWxzIGFuZCBhZGRcIjtcclxuICAgICAgICB0aGlzLnByb2R1Y3RRdWFudGl0eSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpZXdQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nUHJvZHVjdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcclxuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5nZXRJbnZlbnRvcnlRdWFudGl0KCk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0SW1hZ2UgPSB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRJbWFnZShwcm9kdWN0Lkl0ZW1Db2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlYXJjaEl0ZW1Db2RlKGNvZGU6IHN0cmluZywgbGlzdDogYW55KSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBmYWxzZTtcclxuICAgICAgICBsaXN0Lm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbaW5kZXhdLkl0ZW1Db2RlLnRvTG93ZXJDYXNlKCkgPT0gY29kZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0gdGhpcy5fcHJvZHVjdHNbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlUHJvZHVjdExpc3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoSXRlbUNvZGUodGhpcy5pdGVtQ29kZSwgdGhpcy5fcHJvZHVjdHMpID09IGZhbHNlKVxyXG4gICAgICAgICAgICBhbGVydChgSW52YWxpZCBpdGVtIGNvZGUuICR7dGhpcy5pdGVtQ29kZX0gZG9lcyBub3QgZXhpc3QuYCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9kdWN0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVJbnRlZ2VyTnVtYmVyKG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW1iZXIgIT0gcGFyc2VJbnQobnVtYmVyLCAxMCkgfHwgbnVtYmVyIDwgMSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBhZGRQcm9kdWN0KCkge1xyXG4gICAgICAgIGxldCBwcm9kdWN0ID0gdGhpcy5zZWFyY2hJdGVtQ29kZSh0aGlzLml0ZW1Db2RlLCB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsKTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUludGVnZXJOdW1iZXIodGhpcy5wcm9kdWN0UXVhbnRpdHkpKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSA9IHRoaXMucHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlQcmljZSA9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5ICogcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkUHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLnB1c2godGhpcy5zZWxlY3RlZFByb2R1Y3QpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgKz0gdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgKyBwYXJzZUludCh0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgKz0gdGhpcy5zZWxlY3RlZFByb2R1Y3QuQ2F0ZWdvcnk0ICogdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICBhbGVydChgSXRlbSAke3RoaXMuaXRlbUNvZGV9IGFkZGVkIHRvIGNhcnQuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgYWxlcnQoYEl0ZW0gJHt0aGlzLml0ZW1Db2RlfSBpcyBhbHJlYWR5IGFkZGVkIHRvIGNhcnQuYCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0T3JkZXJNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIkludmFsaWQgcXVhbnRpdHlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlF0eS5uYXRpdmVFbGVtZW50LmFuZHJvaWQuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuaW9zLnRleHRSYW5nZUZyb21Qb3NpdGlvblRvUG9zaXRpb24odGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MuYmVnaW5uaW5nT2ZEb2N1bWVudCwgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MuZW5kT2ZEb2N1bWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93Q2FydCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9zYWxlT3JkZXIuRGV0YWlsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ2FydFByb2R1Y3QocHJvZHVjdDogUHJvZHVjdCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZUNhcnRQcm9kdWN0KCkge1xyXG4gICAgICAgIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2FsZU9yZGVyLkRldGFpbFtpbmRleF0uSXRlbUNvZGUgPT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0Lkl0ZW1Db2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50IC0gcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5IC0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzIC09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5DYXRlZ29yeTQgKiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TY2FuKCkge1xyXG4gICAgICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXHJcbiAgICAgICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSxcclxuICAgICAgICAgICAgdG9yY2hPbjogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogNTAwLFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogXCJvcmllbnRhdGlvblwiLFxyXG4gICAgICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUNvZGUgPSByZXN1bHQudGV4dDtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVByb2R1Y3RMaXN0KCk7XHJcbiAgICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gc2Nhbm5pbmcgXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UHJvZHVjdE9yZGVyTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IG9sZFByb2R1Y3RRdWFudGl0eSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwgJiYgcmVzdWx0LnF1YW50aXR5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgLSBvbGRQcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgPSB0aGlzLnRvdGFsQ2FydEFtb3VudCAtIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyAtPSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuQ2F0ZWdvcnk0ICogb2xkUHJvZHVjdFF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgKyBwYXJzZUludChyZXN1bHQucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlID0gcmVzdWx0LnF1YW50aXR5ICogcGFyc2VGbG9hdCh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgKyB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHlQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgKz0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgPSBvbGRQcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3UHJvZHVjdEVkaXQoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdERldGFpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhcnRQcm9kdWN0OiB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICB3YXJlaG91c2U6IEdMT0JBTEZVTkNUSU9OUy5nZXRXYXJlaG91c2VCeUNvZGUodGhpcy5fc2FsZU9yZGVyLldhcmVob3VzZUNvZGUpW1wibmFtZVwiXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dDogcHJvZHVjdERldGFpbHMsXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0SW52ZW50b3J5UXVhbnRpdCgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLmludmVudG9yeUxpc3QpKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmludmVudG9yeUxpc3QubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcXVhbnRpdHlBdmFpbCA9IHByb2R1Y3QuUXVhbnRpdHlPbkhhbmQgLSBwcm9kdWN0LlF1YW50aXR5T25TYWxlc09yZGVyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3QuSXRlbUNvZGUgPT0gcHJvZHVjdC5JdGVtQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlPbkhhbmQgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlBdmFpbCA9IHF1YW50aXR5QXZhaWwgPCAwID8gMCA6IHF1YW50aXR5QXZhaWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHlPbkhhbmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eU9uSGFuZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5QXZhaWwgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Rlc2NyaXB0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJvZHVjdC5FeHRlbmRlZERlc2NyaXB0aW9uVGV4dCAhPSB1bmRlZmluZWQgfHwgdGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQgIT0gXCJcIilcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYWxlcnQoXCJEZXNjcmlwdGlvbiBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZUZvbGlvc1RyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBmb2xpb051bWJlciA9IFNFUlZFUi5pc1F1b3RlID8gdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS5nZXRRdW90ZVRyYW5zYWN0aW9ucygpLmxlbmd0aCArIDEgOiB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlLmdldFNhbGVUcmFuc2FjdGlvbnMoKS5sZW5ndGggKyAxO1xyXG4gICAgICAgIGxldCBmb2xpb1NlcmllID0gYCR7dGhpcy5wYWRMZWZ0KGZvbGlvTnVtYmVyLnRvU3RyaW5nKCksICcwJywgNil9YDtcclxuICAgICAgICBsZXQgZG9jID0gU0VSVkVSLmlzUXVvdGUgPyBcIlF1b3RlXCIgOiBcIlNhbGVcIjtcclxuICAgICAgICBsZXQgZG9jU2VyaWUgPSBTRVJWRVIuaXNRdW90ZSA/IFwiUVwiIDogXCJTXCI7XHJcbiAgICAgICAgbGV0IHNlcmllID0gYCR7cGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQuc2xpY2UoMCwgNil9JHtkb2NTZXJpZX0tJHtmb2xpb1NlcmllfWA7XHJcbiAgICAgICAgbGV0IGZvbGlvID0ge1xyXG4gICAgICAgICAgICBGb2xpbzogZm9saW9TZXJpZSxcclxuICAgICAgICAgICAgRG9jdW1lbnQ6IGRvYyxcclxuICAgICAgICAgICAgU2VyaWU6IHNlcmllXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlLnVwZGF0ZUZvbGlvc1RyYW5zYWN0aW9uRG9jKGZvbGlvKTtcclxuICAgICAgICByZXR1cm4gc2VyaWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNhdmUoKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gdGhpcy52YWxpZGF0aW9ucygpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlcyA9PSBcIk9LXCIpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZXRMaW5lUHJvZHVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2FsZXNPcmRlck5PID0gdGhpcy5fc2FsZU9yZGVyLlNhbGVzT3JkZXJOTyA9PSBcIlwiID8gYXdhaXQgdGhpcy5zYXZlRm9saW9zVHJhbnNhY3Rpb24oKSA6IHRoaXMuX3NhbGVPcmRlci5TYWxlc09yZGVyTk87XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UudXBkYXRlU2FsZU9yZGVyRG9jKHRoaXMuX3NhbGVPcmRlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuX3NhbGVPcmRlcikpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhZExlZnQodGV4dDogc3RyaW5nLCBwYWRDaGFyOiBzdHJpbmcsIHNpemU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIChTdHJpbmcocGFkQ2hhcikucmVwZWF0KHNpemUpICsgdGV4dCkuc3Vic3RyKChzaXplICogLTEpLCBzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTYWxlT3JkZXIoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSB7XHJcbiAgICAgICAgICAgIElzUXVvdGU6IFNFUlZFUi5pc1F1b3RlLFxyXG4gICAgICAgICAgICBTYXZlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIFNlbmRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBDdXN0b21lck5vOiB0aGlzLmN1c3RvbWVyLkN1c3RvbWVyTm8sXHJcbiAgICAgICAgICAgIEN1c3RvbWVyTmFtZTogdGhpcy5jdXN0b21lci5DdXN0b21lck5hbWUsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyUE9ObzogXCJcIixcclxuICAgICAgICAgICAgQ3VzdG9tZXJDb25maXJtVG86IFwiXCIsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyRkJPOiBcIlwiLFxyXG4gICAgICAgICAgICBTYWxlc09yZGVyTk86IFwiXCIsXHJcbiAgICAgICAgICAgIERldmljZVVpZDogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQsXHJcbiAgICAgICAgICAgIFNoaXBNZXRob2Q6IFwiXCIsXHJcbiAgICAgICAgICAgIEJpbGxUb05hbWU6IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOYW1lLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMTogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTEsXHJcbiAgICAgICAgICAgIEJpbGxUb0FkZHJlc3MyOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMiA9PSBudWxsID8gXCJcIiA6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUyLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMzogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTMgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMyxcclxuICAgICAgICAgICAgQmlsbFRvQ291bnRyeUNvZGU6IHRoaXMuY3VzdG9tZXIuQ291bnRyeUNvZGUsXHJcbiAgICAgICAgICAgIEJpbGxUb0NpdHk6IHRoaXMuY3VzdG9tZXIuQ2l0eSxcclxuICAgICAgICAgICAgQmlsbFRvU3RhdGU6IHRoaXMuY3VzdG9tZXIuU3RhdGUsXHJcbiAgICAgICAgICAgIEJpbGxUb1ppcENvZGU6IHRoaXMuY3VzdG9tZXIuWmlwQ29kZSxcclxuICAgICAgICAgICAgU2hpcFZpYTogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVmlhLFxyXG4gICAgICAgICAgICBXYXJlaG91c2VDb2RlOiBHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlQnlOYW1lKHRoaXMud2FyZWhvdXNlc1t0aGlzLndhcmVob3VzZV0pW1wiY29kZVwiXSxcclxuICAgICAgICAgICAgU2hpcFRvOiAwLFxyXG4gICAgICAgICAgICBTaGlwVG9DaXR5OiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0NpdHksXHJcbiAgICAgICAgICAgIFNoaXBUb1N0YXRlOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb1N0YXRlLFxyXG4gICAgICAgICAgICBTaGlwVG9aaXBDb2RlOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb1ppcENvZGUsXHJcbiAgICAgICAgICAgIERpc2NvdW50QW10OiAwLFxyXG4gICAgICAgICAgICBTaGlwVG9OYW1lOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb05hbWUsXHJcbiAgICAgICAgICAgIFNoaXBUb0FkZHJlc3MxOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0FkZHJlc3MxLFxyXG4gICAgICAgICAgICBTaGlwVG9BZGRyZXNzMjogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9BZGRyZXNzMixcclxuICAgICAgICAgICAgU2hpcFRvQWRkcmVzczM6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQWRkcmVzczMsXHJcbiAgICAgICAgICAgIFNoaXBUb0NvdW50cnlDb2RlOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0NvdW50cnlDb2RlLFxyXG4gICAgICAgICAgICBPcmRlckRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIFNoaXBEYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgRGF0ZVVwZGF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIFVzZXJDb2RlOiBTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdLFxyXG4gICAgICAgICAgICBTYWxlc3BlcnNvbk5vOiBTRVJWRVIudXNlcltcIkRlZmF1bHRTYWxlc3BlcnNvbklEXCJdLFxyXG4gICAgICAgICAgICBUZXJtc0NvZGU6IHRoaXMuY3VzdG9tZXIuVGVybXNDb2RlLFxyXG4gICAgICAgICAgICBDb21tZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBEZXRhaWw6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoIVNFUlZFUi5lZGl0VHJhbnNhY3Rpb24uZWRpdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUgPSBgJHtjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxfS8ke2N1cnJlbnREYXRlLmdldE1vbnRoKCkgKyAxfS8ke2N1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLk9yZGVyRGF0ZSA9IGAke2N1cnJlbnREYXRlLmdldERhdGUoKX0vJHtjdXJyZW50RGF0ZS5nZXRNb250aCgpfS8ke2N1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJhbnNhY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9ucygpIHtcclxuICAgICAgICBsZXQgbWVzc2FnZXMgPSBcIlwiO1xyXG4gICAgICAgIG1lc3NhZ2VzICs9IHRoaXMudmFsaWRhdGVQcm9kdWN0cygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2hpcE1ldGhvZClcclxuICAgICAgICBpZiAodGhpcy5zaGlwTWV0aG9kID09IDApXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzICs9IHRoaXMudmFsaWRhdGVBZGRyZXNzKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlcyA9PSBcIlwiID8gXCJPS1wiIDogbWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVByb2R1Y3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLmxlbmd0aCA+IDAgPyBcIlwiIDogXCJZb3UgbmVlZCB0byBhZGQgcHJvZHVjdHMgdG8gY2FydCBcXG5cIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlQWRkcmVzcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MxID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0NpdHkgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvU3RhdGUgPT0gXCJcIiB8fCB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvWmlwQ29kZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIFNoaXBwaW5nIEFkZHJlc3MgbXVzdCBoYXZlIChGaXJzdCBBZGRyZXNzIGxpbmUsIENpdHksIFN0YXRlIGFuZCBaaXAgY29kZSkgXFxuXCI7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldExpbmVQcm9kdWN0KCkge1xyXG4gICAgICAgIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9kdWN0LmxpbmVJdGVtID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICBwcm9kdWN0LnF1YW50aXR5ID0gcGFyc2VJbnQocHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNoaXBNZXRob2QoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBNZXRob2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YXJlaG91c2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YXJlaG91c2VzLnNwbGljZSh0aGlzLndhcmVob3VzZXMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53YXJlaG91c2VzLmluZGV4T2YoXCJEaXJlY3RcIikgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJlaG91c2VzLnB1c2goXCJEaXJlY3RcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBNZXRob2QgPSB0aGlzLnNoaXBNZXRob2RzW3RoaXMuc2hpcE1ldGhvZF07XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxufSJdfQ==