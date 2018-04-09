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
        this.shipMethods = ["Dilevey", "Pickup"];
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
                        return [4 /*yield*/, this.setTermsCode()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.setDocument()];
                    case 5:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, globalFunctions_config_1.GLOBALFUNCTIONS.getWarehouses()];
                    case 6:
                        _a.warehouses = _b.sent();
                        return [4 /*yield*/, this.refreshSaleOrder()];
                    case 7:
                        _b.sent();
                        if (!!server_config_1.SERVER.editTransaction.edit) return [3 /*break*/, 8];
                        this._saleOrder.ShipDate = this._saleOrder.ShipDate.getDate() + 1 + "/" + (this._saleOrder.ShipDate.getMonth() + 1) + "/" + this._saleOrder.ShipDate.getFullYear();
                        this._saleOrder.OrderDate = this._saleOrder.OrderDate.getDate() + "/" + this._saleOrder.OrderDate.getMonth() + "/" + this._saleOrder.OrderDate.getFullYear();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.getTransaction()];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [2 /*return*/];
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
        console.log(server_config_1.SERVER.isQuote);
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
        if (this._couchbaseService.getDocument("inventory") == null)
            this._inventoryService.setInventoriesDoc();
        this.inventoryList = this._inventoryService.getInventoryWarehouse(this.warehouse);
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
            _this.inventoryList = _this._inventoryService.getInventoryWarehouse(_this.warehouse);
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
                        if (!(messages == "OK")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.setLineProduct()];
                    case 1:
                        _b.sent();
                        _a = this._saleOrder;
                        return [4 /*yield*/, this.saveFoliosTransaction()];
                    case 2:
                        _a.SalesOrderNO = _b.sent();
                        return [4 /*yield*/, this._saleOrderService.updateSaleOrderDoc(this._saleOrder)];
                    case 3:
                        _b.sent();
                        console.log(JSON.stringify(this._saleOrder));
                        this._router.back();
                        return [3 /*break*/, 5];
                    case 4:
                        alert(messages);
                        _b.label = 5;
                    case 5: return [2 /*return*/];
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
            WarehouseCode: this.warehouses[this.warehouse].code,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRztBQUV0RyxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLGlGQUE4RTtBQUU5RSxrRUFBMEQ7QUFFMUQsNEZBQTBGO0FBRTFGLDREQUE2RDtBQUM3RCwyRUFBNkQ7QUFDN0QscUdBQWlHO0FBQ2pHLGtEQUFrRTtBQUNsRSwwQ0FBaUQ7QUFHakQsc0VBQW9FO0FBRXBFLDhEQUFnRTtBQUdoRSxrRkFBZ0Y7QUFFaEYsc0VBQW9FO0FBRXBFLDREQUFvRDtBQUNwRCwwREFBNEQ7QUFDNUQsc0RBQStEO0FBQy9ELDhFQUFzRTtBQUN0RSxzRkFBb0Y7QUFTcEY7SUErQkksNEJBQW9CLGVBQStCLEVBQ3ZDLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBZ0MsRUFDaEMsS0FBdUIsRUFDdkIsY0FBOEIsRUFDOUIsS0FBcUIsRUFDckIsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsT0FBeUIsRUFDekIsMEJBQW9EO1FBWGhFLGlCQTJDQztRQTNDbUIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ3ZDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLCtCQUEwQixH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O1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDbEMsQ0FBQzt5Q0FpQ3VDLDZCQUFjO1lBQ3BCLG9DQUFnQjtZQUNoQixvQ0FBZ0I7WUFDckIsaUNBQWtCO1lBQ3pCLHVCQUFnQjtZQUNQLDRDQUFjO1lBQ3ZCLHVCQUFjO1lBQ0YsZ0NBQWdCO1lBQ1YsZ0RBQXNCO1lBQzVCLG9DQUFnQjtZQUMxQix5QkFBZ0I7WUFDRyxvREFBd0I7T0ExQ3ZELGtCQUFrQixDQXdmOUI7SUFBRCx5QkFBQztDQUFBLEFBeGZELElBd2ZDO0FBeGZZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nT3B0aW9ucywgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi4vbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaXRlbUlucXVpcnkuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCB7IE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL21vZGFsL3Byb2R1Y3RPcmRlci9tb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jdXN0b21lci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW52ZW50b3J5LmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29kZSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3Rlcm1zQ29kZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2hpcHBpbmdBZGRyZXNzLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXcvdGFiLXZpZXdcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHTE9CQUxGVU5DVElPTlMgfSBmcm9tIFwiLi4vLi4vY29uZmlnL2dsb2JhbEZ1bmN0aW9ucy5jb25maWdcIjtcclxuaW1wb3J0IHsgRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZvbGlvc1RyYW5zYWN0aW9uLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtc2FsZS1vcmRlclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2FsZS1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NhbGUtb3JkZXIuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2FsZU9yZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBhbnk7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkUHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRDYXJ0UHJvZHVjdDogYW55ID0ge307XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlczogYW55ID0gW107XHJcbiAgICBwdWJsaWMgd2FyZWhvdXNlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNoaXBWaWFzOiBhbnk7XHJcbiAgICBwdWJsaWMgc2hpcFZpYTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsaW5lVGl0bGU6IHN0cmluZyA9IFwiSXRlbSBEZXRhaWxzXCI7XHJcbiAgICBwdWJsaWMgbGluZVN1YlRpdGxlOiBzdHJpbmcgPSBcIlNlbGVjdCBhbiBpdGVtIHRvIHZpZXcgZGV0YWlscyBhbmQgYWRkXCI7XHJcbiAgICBwdWJsaWMgc2hvd2luZ1Byb2R1Y3Q6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpdGVtQ29kZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBwcm9kdWN0UXVhbnRpdHk6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIG9yaWVudGF0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LW9yaWVudGF0aW9uJyk7XHJcbiAgICBwdWJsaWMgdGFiczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBwdWJsaWMgc2VsZWN0aW9uVGFiczogYW55O1xyXG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgcHVibGljIGN1c3RvbWVyOiBDdXN0b21lcjtcclxuICAgIHB1YmxpYyBpbnZlbnRvcnlMaXN0OiBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8SW52ZW50b3J5PigpO1xyXG4gICAgcHVibGljIHRvdGFsQ2FydEFtb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBjYXJ0UXVhbnRpdHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdXNlclRlcm1zQ29kZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNoaXBwaW5nQWRkcmVzc0xpc3Q6IGFueSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3M6IGFueTtcclxuICAgIHB1YmxpYyB0b3RhbEN1YmVzOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIF9zYWxlT3JkZXI6IFNhbGVPcmRlcjtcclxuICAgIHB1YmxpYyBzaGlwTWV0aG9kczogYW55ID0gW1wiRGlsZXZleVwiLCBcIlBpY2t1cFwiXTtcclxuICAgIHB1YmxpYyBzaGlwTWV0aG9kOiBudW1iZXIgPSAwO1xyXG4gICAgQFZpZXdDaGlsZCgnUXR5JykgUXR5OiBFbGVtZW50UmVmO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgYmFyY29kZVNjYW5uZXI6IEJhcmNvZGVTY2FubmVyLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgX3Rlcm1zQ29kZVNlcnZpY2U6IFRlcm1zQ29kZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzU2VydmljZTogU2hpcHBpbmdBZGRyZXNzU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9zYWxlT3JkZXJTZXJ2aWNlOiBTYWxlT3JkZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIF9mb2xpb3NUcmFuc2FjdGlvbnNTZXJ2aWNlOiBGb2xpb3NUcmFuc2FjdGlvblNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuc2hpcFZpYXMgPSBbXTtcclxuICAgICAgICBDT05TVEFOVFMuc2hpcFZpYXMubWFwKHNoaXBWaWEgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNoaXBWaWFzLnB1c2goc2hpcFZpYS5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdC5JdGVtQ29kZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QuY29tbWVudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0Lkl0ZW1Db2RlID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMub3JpZW50YXRpb24uc2V0T3JpZW50YXRpb24oXCJsYW5kc2NhcGVyaWdodFwiKTsgIFxyXG4gICAgICAgIHRoaXMudGFicyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uVGFicyA9IFt7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkhFQURFUlwiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkFERFJFU1NcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiTElORVNcIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiVE9UQUxTXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXHJcbiAgICAgICAgfV07XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25UYWJzLm1hcCh0YWIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XHJcbiAgICAgICAgICAgIHNlZ21lbnRlZEJhckl0ZW0udGl0bGUgPSB0YWIudGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHNlZ21lbnRlZEJhckl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCl7XHJcbiAgICAgICAgU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi5lZGl0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgU0VSVkVSLmlzUXVvdGUgPSBKU09OLnBhcnNlKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiSXNRdW90ZVwiXSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRDdXN0b21lcih0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcIkN1c3RvbWVyTm9cIl0pO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0U2hpcHBpbmdBZGRyZXNzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRJbnZlbnRvcnkoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldFRlcm1zQ29kZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgICAgICB0aGlzLndhcmVob3VzZXMgPSBhd2FpdCBHTE9CQUxGVU5DVElPTlMuZ2V0V2FyZWhvdXNlcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFNhbGVPcmRlcigpO1xyXG4gICAgICAgIGlmICghU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi5lZGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwRGF0ZSA9IGAke3RoaXMuX3NhbGVPcmRlci5TaGlwRGF0ZS5nZXREYXRlKCkgKyAxfS8ke3RoaXMuX3NhbGVPcmRlci5TaGlwRGF0ZS5nZXRNb250aCgpICsgMX0vJHt0aGlzLl9zYWxlT3JkZXIuU2hpcERhdGUuZ2V0RnVsbFllYXIoKX1gO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuT3JkZXJEYXRlID0gYCR7dGhpcy5fc2FsZU9yZGVyLk9yZGVyRGF0ZS5nZXREYXRlKCl9LyR7dGhpcy5fc2FsZU9yZGVyLk9yZGVyRGF0ZS5nZXRNb250aCgpfS8ke3RoaXMuX3NhbGVPcmRlci5PcmRlckRhdGUuZ2V0RnVsbFllYXIoKX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRUcmFuc2FjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coU0VSVkVSLmlzUXVvdGUpXHJcbiAgICAgICAgaWYgKFNFUlZFUi5pc1F1b3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclF1b3RlVW5zYXZlZCgpLm1hcChxdW90ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVvdGUuU2FsZXNPcmRlck5PID09IFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24udHJhbnNhY3Rpb25Obyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVvdGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIgPSBxdW90ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCkubWFwKHNhbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhbGUuU2FsZXNPcmRlck5PID09IFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24udHJhbnNhY3Rpb25Obyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoc2FsZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlciA9IHNhbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhTRVJWRVIuaXNRdW90ZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25UYWJzLm1hcCgodGFiLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleClcclxuICAgICAgICAgICAgICAgIHRhYi52aXNpYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGFiLnZpc2liaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0RG9jdW1lbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJwcm9kdWN0XCIpID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnNldFByb2R1Y3REb2N1bWVudCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3REb2N1bWVudCgpO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tZXIoQ3VzdG9tZXJObzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJjdXN0b21lclwiKVtcImN1c3RvbWVyXCJdO1xyXG4gICAgICAgIGRvYy5tYXAoY3VzdG9tZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3VzdG9tZXIuQ3VzdG9tZXJObyA9PSBDdXN0b21lck5vKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lciA9IGN1c3RvbWVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUZXJtc0NvZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJ0ZXJtc2NvZGVcIikgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fdGVybXNDb2RlU2VydmljZS5zZXRUZXJtc0NvZGVEb2MoKTtcclxuICAgICAgICB0aGlzLnVzZXJUZXJtc0NvZGUgPSB0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlLmdldFVzZXJUZXJtc0NvZGUodGhpcy5jdXN0b21lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldFNoaXBwaW5nQWRkcmVzcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLnNldFNoaXBwaW5nQWRkcmVzc0RvYygpO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID0gYXdhaXQgdGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZS5nZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyh0aGlzLmN1c3RvbWVyKTtcclxuICAgICAgICBpZiAodGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3NMaXN0ID0gW107XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzTGlzdCA9IGF3YWl0IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UuZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NMaXN0KHRoaXMuY3VzdG9tZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SW52ZW50b3J5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiaW52ZW50b3J5XCIpID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX2ludmVudG9yeVNlcnZpY2Uuc2V0SW52ZW50b3JpZXNEb2MoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlMaXN0ID0gdGhpcy5faW52ZW50b3J5U2VydmljZS5nZXRJbnZlbnRvcnlXYXJlaG91c2UodGhpcy53YXJlaG91c2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzcyhhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQ2l0eSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb0NpdHk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9TdGF0ZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb1N0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvWmlwQ29kZSA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb1ppcENvZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9OYW1lID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0FkZHJlc3MxID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQWRkcmVzczE7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMiA9IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzW2FyZ3MubmV3SW5kZXhdLlNoaXBUb0FkZHJlc3MyO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXIuU2hpcFRvQWRkcmVzczMgPSB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1thcmdzLm5ld0luZGV4XS5TaGlwVG9BZGRyZXNzMztcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb0NvdW50cnlDb2RlID0gdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbYXJncy5uZXdJbmRleF0uU2hpcFRvQ291bnRyeUNvZGU7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q3VzdG9tZXJTaGlwVmlhKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcFZpYSA9IGFyZ3MubmV3SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwVmlhID0gdGhpcy5zaGlwVmlhc1t0aGlzLnNoaXBWaWFdXHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmlsdGVySW52ZW50b3J5V2FyZWhvdXNlKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmludmVudG9yeUxpc3QgPSB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLmdldEludmVudG9yeVdhcmVob3VzZSh0aGlzLndhcmVob3VzZSk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0RhdGVNb2RhbChpbnB1dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb2RlbFZpZXcoKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyW2lucHV0XSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbFZpZXcoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB0b2RheS50b0RhdGVTdHJpbmcoKSxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvd01vZGFsKE1vZGFsRGF0ZUNvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuXHJcbiAgICAgICAgaWYgKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0LnB1c2godGhpcy5fcHJvZHVjdHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd2luZ1Byb2R1Y3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHt9O1xyXG4gICAgICAgIHRoaXMubGluZVRpdGxlID0gXCJJdGVtIERldGFpbHNcIjtcclxuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IFwiU2VsZWN0IGFuIGl0ZW0gdG8gdmlldyBkZXRhaWxzIGFuZCBhZGRcIjtcclxuICAgICAgICB0aGlzLnByb2R1Y3RRdWFudGl0eSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpZXdQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgdGhpcy5zaG93aW5nUHJvZHVjdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5saW5lVGl0bGUgPSBwcm9kdWN0Lkl0ZW1Db2RlRGVzYztcclxuICAgICAgICB0aGlzLmxpbmVTdWJUaXRsZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHByb2R1Y3QuSXRlbUNvZGU7XHJcbiAgICAgICAgdGhpcy5nZXRJbnZlbnRvcnlRdWFudGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWFyY2hJdGVtQ29kZShjb2RlOiBzdHJpbmcsIGxpc3Q6IGFueSkge1xyXG4gICAgICAgIGxldCBpdGVtID0gZmFsc2U7XHJcbiAgICAgICAgbGlzdC5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0W2luZGV4XS5JdGVtQ29kZS50b0xvd2VyQ2FzZSgpID09IGNvZGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHRoaXMuX3Byb2R1Y3RzW2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZVByb2R1Y3RMaXN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEl0ZW1Db2RlKHRoaXMuaXRlbUNvZGUsIHRoaXMuX3Byb2R1Y3RzKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgYWxlcnQoYEludmFsaWQgaXRlbSBjb2RlLiAke3RoaXMuaXRlbUNvZGV9IGRvZXMgbm90IGV4aXN0LmApO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy52aWV3UHJvZHVjdCh0aGlzLnNlbGVjdGVkUHJvZHVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlSW50ZWdlck51bWJlcihudW1iZXIpIHtcclxuICAgICAgICBpZiAobnVtYmVyICE9IHBhcnNlSW50KG51bWJlciwgMTApIHx8IG51bWJlciA8IDEpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUHJvZHVjdCgpIHtcclxuICAgICAgICBsZXQgcHJvZHVjdCA9IHRoaXMuc2VhcmNoSXRlbUNvZGUodGhpcy5pdGVtQ29kZSwgdGhpcy5fc2FsZU9yZGVyLkRldGFpbCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVJbnRlZ2VyTnVtYmVyKHRoaXMucHJvZHVjdFF1YW50aXR5KSkge1xyXG4gICAgICAgICAgICBpZiAocHJvZHVjdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkgPSB0aGlzLnByb2R1Y3RRdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5UHJpY2UgPSB0aGlzLnNlbGVjdGVkUHJvZHVjdC5xdWFudGl0eSAqIHBhcnNlRmxvYXQodGhpcy5zZWxlY3RlZFByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5wdXNoKHRoaXMuc2VsZWN0ZWRQcm9kdWN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ICs9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRRdWFudGl0eSA9IHRoaXMuY2FydFF1YW50aXR5ICsgcGFyc2VJbnQodGhpcy5zZWxlY3RlZFByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzICs9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoYEl0ZW0gJHt0aGlzLml0ZW1Db2RlfSBhZGRlZCB0byBjYXJ0LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RPcmRlck1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiSW52YWxpZCBxdWFudGl0eVwiKTtcclxuICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MudGV4dFJhbmdlRnJvbVBvc2l0aW9uVG9Qb3NpdGlvbih0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy5iZWdpbm5pbmdPZkRvY3VtZW50LCB0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy5lbmRPZkRvY3VtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dDYXJ0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuX3NhbGVPcmRlci5EZXRhaWwpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRDYXJ0UHJvZHVjdChwcm9kdWN0OiBQcm9kdWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlQ2FydFByb2R1Y3QoKSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zYWxlT3JkZXIuRGV0YWlsW2luZGV4XS5JdGVtQ29kZSA9PSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuSXRlbUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDYXJ0QW1vdW50ID0gdGhpcy50b3RhbENhcnRBbW91bnQgLSBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FydFF1YW50aXR5ID0gdGhpcy5jYXJ0UXVhbnRpdHkgLSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3ViZXMgLT0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LkNhdGVnb3J5NCAqIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5EZXRhaWwuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblNjYW4oKSB7XHJcbiAgICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcclxuICAgICAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcclxuICAgICAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIHByZWZlckZyb250Q2FtZXJhOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBiZWVwT25TY2FuOiB0cnVlLFxyXG4gICAgICAgICAgICB0b3JjaE9uOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBcIm9yaWVudGF0aW9uXCIsXHJcbiAgICAgICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWVcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtQ29kZSA9IHJlc3VsdC50ZXh0O1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlUHJvZHVjdExpc3QoKTtcclxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dQcm9kdWN0T3JkZXJNb2RhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBsZXQgb2xkUHJvZHVjdFF1YW50aXR5ID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5KTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb2RlbFZpZXdQcm9kdWN0RWRpdCgpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCAmJiByZXN1bHQucXVhbnRpdHkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSAtIG9sZFByb2R1Y3RRdWFudGl0eTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2FydEFtb3VudCA9IHRoaXMudG90YWxDYXJ0QW1vdW50IC0gdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1YmVzIC09IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5DYXRlZ29yeTQgKiBvbGRQcm9kdWN0UXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJ0UXVhbnRpdHkgPSB0aGlzLmNhcnRRdWFudGl0eSArIHBhcnNlSW50KHJlc3VsdC5xdWFudGl0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5UHJpY2UgPSByZXN1bHQucXVhbnRpdHkgKiBwYXJzZUZsb2F0KHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbENhcnRBbW91bnQgPSB0aGlzLnRvdGFsQ2FydEFtb3VudCArIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDdWJlcyArPSB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QuQ2F0ZWdvcnk0ICogdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdC5xdWFudGl0eSA9IG9sZFByb2R1Y3RRdWFudGl0eTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gYWxlcnQoZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVNb2RlbFZpZXdQcm9kdWN0RWRpdCgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QucXVhbnRpdHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0RGV0YWlscyA9IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FydFByb2R1Y3Q6IHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCxcclxuICAgICAgICAgICAgICAgIHdhcmVob3VzZTogQ09OU1RBTlRTLndhcmVob3VzZXNbdGhpcy53YXJlaG91c2VdLm5hbWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHByb2R1Y3REZXRhaWxzLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5zaG93TW9kYWwoTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldEludmVudG9yeVF1YW50aXQoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbnZlbnRvcnlMaXN0Lm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHF1YW50aXR5QXZhaWwgPSBwcm9kdWN0LlF1YW50aXR5T25IYW5kIC0gcHJvZHVjdC5RdWFudGl0eU9uU2FsZXNPcmRlcjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9kdWN0Lkl0ZW1Db2RlID09IHByb2R1Y3QuSXRlbUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5T25IYW5kID0gcHJvZHVjdC5RdWFudGl0eU9uSGFuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0LnF1YW50aXR5QXZhaWwgPSBxdWFudGl0eUF2YWlsIDwgMCA/IDAgOiBxdWFudGl0eUF2YWlsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dEZXNjcmlwdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3QuRXh0ZW5kZWREZXNjcmlwdGlvblRleHQgIT0gdW5kZWZpbmVkIHx8IHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0ICE9IFwiXCIpXHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuc2VsZWN0ZWRQcm9kdWN0LkV4dGVuZGVkRGVzY3JpcHRpb25UZXh0KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRGVzY3JpcHRpb24gbm90IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVGb2xpb3NUcmFuc2FjdGlvbigpIHtcclxuICAgICAgICBsZXQgZm9saW9OdW1iZXIgPSBTRVJWRVIuaXNRdW90ZSA/IHRoaXMuX2ZvbGlvc1RyYW5zYWN0aW9uc1NlcnZpY2UuZ2V0UXVvdGVUcmFuc2FjdGlvbnMoKS5sZW5ndGggKyAxIDogdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS5nZXRTYWxlVHJhbnNhY3Rpb25zKCkubGVuZ3RoICsgMTtcclxuICAgICAgICBsZXQgZm9saW9TZXJpZSA9IGAke3RoaXMucGFkTGVmdChmb2xpb051bWJlci50b1N0cmluZygpLCAnMCcsIDYpfWA7XHJcbiAgICAgICAgbGV0IGRvYyA9IFNFUlZFUi5pc1F1b3RlID8gXCJRdW90ZVwiIDogXCJTYWxlXCI7XHJcbiAgICAgICAgbGV0IGRvY1NlcmllID0gU0VSVkVSLmlzUXVvdGUgPyBcIlFcIiA6IFwiU1wiO1xyXG4gICAgICAgIGxldCBzZXJpZSA9IGAke3BsYXRmb3JtTW9kdWxlLmRldmljZS51dWlkLnNsaWNlKDAsIDYpfSR7ZG9jU2VyaWV9LSR7Zm9saW9TZXJpZX1gO1xyXG4gICAgICAgIGxldCBmb2xpbyA9IHtcclxuICAgICAgICAgICAgRm9saW86IGZvbGlvU2VyaWUsXHJcbiAgICAgICAgICAgIERvY3VtZW50OiBkb2MsXHJcbiAgICAgICAgICAgIFNlcmllOiBzZXJpZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25zU2VydmljZS51cGRhdGVGb2xpb3NUcmFuc2FjdGlvbkRvYyhmb2xpbyk7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzYXZlKCkge1xyXG4gICAgICAgIGxldCBtZXNzYWdlcyA9IHRoaXMudmFsaWRhdGlvbnMoKTtcclxuICAgICAgICBpZiAobWVzc2FnZXMgPT0gXCJPS1wiKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2V0TGluZVByb2R1Y3QoKTtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyLlNhbGVzT3JkZXJOTyA9IGF3YWl0IHRoaXMuc2F2ZUZvbGlvc1RyYW5zYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UudXBkYXRlU2FsZU9yZGVyRG9jKHRoaXMuX3NhbGVPcmRlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuX3NhbGVPcmRlcikpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIuYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhZExlZnQodGV4dDogc3RyaW5nLCBwYWRDaGFyOiBzdHJpbmcsIHNpemU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIChTdHJpbmcocGFkQ2hhcikucmVwZWF0KHNpemUpICsgdGV4dCkuc3Vic3RyKChzaXplICogLTEpLCBzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hTYWxlT3JkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5fc2FsZU9yZGVyID0ge1xyXG4gICAgICAgICAgICBJc1F1b3RlOiBTRVJWRVIuaXNRdW90ZSxcclxuICAgICAgICAgICAgU2F2ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBDdXN0b21lck5vOiB0aGlzLmN1c3RvbWVyLkN1c3RvbWVyTm8sXHJcbiAgICAgICAgICAgIEN1c3RvbWVyTmFtZTogdGhpcy5jdXN0b21lci5DdXN0b21lck5hbWUsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyUE9ObzogXCJcIixcclxuICAgICAgICAgICAgQ3VzdG9tZXJDb25maXJtVG86IFwiXCIsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyRkJPOiBcIlwiLFxyXG4gICAgICAgICAgICBTYWxlc09yZGVyTk86IFwiXCIsXHJcbiAgICAgICAgICAgIERldmljZVVpZDogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQsXHJcbiAgICAgICAgICAgIFNoaXBNZXRob2Q6IFwiXCIsXHJcbiAgICAgICAgICAgIEJpbGxUb05hbWU6IHRoaXMuY3VzdG9tZXIuQ3VzdG9tZXJOYW1lLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMTogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTEsXHJcbiAgICAgICAgICAgIEJpbGxUb0FkZHJlc3MyOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMiA9PSBudWxsID8gXCJcIiA6IHRoaXMuY3VzdG9tZXIuQWRkcmVzc0xpbmUyLFxyXG4gICAgICAgICAgICBCaWxsVG9BZGRyZXNzMzogdGhpcy5jdXN0b21lci5BZGRyZXNzTGluZTMgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLmN1c3RvbWVyLkFkZHJlc3NMaW5lMyxcclxuICAgICAgICAgICAgQmlsbFRvQ291bnRyeUNvZGU6IHRoaXMuY3VzdG9tZXIuQ291bnRyeUNvZGUsXHJcbiAgICAgICAgICAgIEJpbGxUb0NpdHk6IHRoaXMuY3VzdG9tZXIuQ2l0eSxcclxuICAgICAgICAgICAgQmlsbFRvU3RhdGU6IHRoaXMuY3VzdG9tZXIuU3RhdGUsXHJcbiAgICAgICAgICAgIEJpbGxUb1ppcENvZGU6IHRoaXMuY3VzdG9tZXIuWmlwQ29kZSxcclxuICAgICAgICAgICAgU2hpcFZpYTogXCJcIixcclxuICAgICAgICAgICAgV2FyZWhvdXNlQ29kZTogdGhpcy53YXJlaG91c2VzW3RoaXMud2FyZWhvdXNlXS5jb2RlLFxyXG4gICAgICAgICAgICBTaGlwVG9DaXR5OiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0NpdHksXHJcbiAgICAgICAgICAgIFNoaXBUb1N0YXRlOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb1N0YXRlLFxyXG4gICAgICAgICAgICBTaGlwVG9aaXBDb2RlOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb1ppcENvZGUsXHJcbiAgICAgICAgICAgIERpc2NvdW50QW10OiAwLFxyXG4gICAgICAgICAgICBTaGlwVG9OYW1lOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb05hbWUsXHJcbiAgICAgICAgICAgIFNoaXBUb0FkZHJlc3MxOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0FkZHJlc3MxLFxyXG4gICAgICAgICAgICBTaGlwVG9BZGRyZXNzMjogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MgPT0gbnVsbCA/IFwiXCIgOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzc1swXS5TaGlwVG9BZGRyZXNzMixcclxuICAgICAgICAgICAgU2hpcFRvQWRkcmVzczM6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzID09IG51bGwgPyBcIlwiIDogdGhpcy5fY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NbMF0uU2hpcFRvQWRkcmVzczMsXHJcbiAgICAgICAgICAgIFNoaXBUb0NvdW50cnlDb2RlOiB0aGlzLl9jdXN0b21lclNoaXBwaW5nQWRkcmVzcyA9PSBudWxsID8gXCJcIiA6IHRoaXMuX2N1c3RvbWVyU2hpcHBpbmdBZGRyZXNzWzBdLlNoaXBUb0NvdW50cnlDb2RlLFxyXG4gICAgICAgICAgICBPcmRlckRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIFNoaXBEYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgRGF0ZVVwZGF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIFVzZXJDb2RlOiBTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdLFxyXG4gICAgICAgICAgICBTYWxlc3BlcnNvbk5vOiBTRVJWRVIudXNlcltcIkRlZmF1bHRTYWxlc3BlcnNvbklEXCJdLFxyXG4gICAgICAgICAgICBUZXJtc0NvZGU6IHRoaXMuY3VzdG9tZXIuVGVybXNDb2RlLFxyXG4gICAgICAgICAgICBDb21tZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBEZXRhaWw6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRpb25zKCkge1xyXG4gICAgICAgIGxldCBtZXNzYWdlcyA9IFwiXCI7XHJcbiAgICAgICAgbWVzc2FnZXMgKz0gdGhpcy52YWxpZGF0ZVByb2R1Y3RzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpcE1ldGhvZCA9PSAwKVxyXG4gICAgICAgICAgICBtZXNzYWdlcyArPSB0aGlzLnZhbGlkYXRlQWRkcmVzcygpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZXMgPT0gXCJcIiA/IFwiT0tcIiA6IG1lc3NhZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVQcm9kdWN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2FsZU9yZGVyLkRldGFpbC5sZW5ndGggPiAwID8gXCJcIiA6IFwiWW91IG5lZWQgdG8gYWRkIHByb2R1Y3RzIHRvIGNhcnQgXFxuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUFkZHJlc3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NhbGVPcmRlci5TaGlwVG9BZGRyZXNzMSA9PSBcIlwiIHx8IHRoaXMuX3NhbGVPcmRlci5TaGlwVG9DaXR5ID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1N0YXRlID09IFwiXCIgfHwgdGhpcy5fc2FsZU9yZGVyLlNoaXBUb1ppcENvZGUgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIFwiWW91ciBTaGlwcGluZyBBZGRyZXNzIG11c3QgaGF2ZSAoRmlyc3QgQWRkcmVzcyBsaW5lLCBDaXR5LCBTdGF0ZSBhbmQgWmlwIGNvZGUpIFxcblwiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMaW5lUHJvZHVjdCgpIHtcclxuICAgICAgICB0aGlzLl9zYWxlT3JkZXIuRGV0YWlsLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcHJvZHVjdC5saW5lSXRlbSA9IGluZGV4ICsgMTtcclxuICAgICAgICAgICAgcHJvZHVjdC5xdWFudGl0eSA9IHBhcnNlSW50KHByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTaGlwTWV0aG9kKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwTWV0aG9kID09IDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndhcmVob3VzZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlci5TaGlwTWV0aG9kID0gdGhpcy5zaGlwTWV0aG9kc1t0aGlzLnNoaXBNZXRob2RdO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbn0iXX0=