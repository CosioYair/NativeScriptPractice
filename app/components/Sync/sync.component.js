"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//Services
var item_service_1 = require("../../services/item.service");
var customer_service_1 = require("../../services/customer.service");
var device_service_1 = require("../../services/device.service");
var inventory_service_1 = require("../../services/inventory.service");
var shippingAddress_service_1 = require("../../services/shippingAddress.service");
var terms_service_1 = require("../../services/terms.service");
var user_service_1 = require("../../services/user.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var lastRefresh_service_1 = require("../../services/lastRefresh.service");
var router_1 = require("nativescript-angular/router");
var SyncComponent = /** @class */ (function () {
    function SyncComponent(_productService, _customerService, _deviceService, _inventoryService, _shippingAddressService, _termsCodeService, _couchbaseService, _userService, _lastRefreshService, _router) {
        this._productService = _productService;
        this._customerService = _customerService;
        this._deviceService = _deviceService;
        this._inventoryService = _inventoryService;
        this._shippingAddressService = _shippingAddressService;
        this._termsCodeService = _termsCodeService;
        this._couchbaseService = _couchbaseService;
        this._userService = _userService;
        this._lastRefreshService = _lastRefreshService;
        this._router = _router;
        this.address = true;
        this.customers = true;
        this.customerSales = true;
        this.images = true;
        this.inventory = true;
        this.products = true;
        this.purchaseOrders = true;
        this.salesOrderHistory = true;
        this.scanForce = true;
        this.users = true;
        this.termsCode = true;
        this.syncScreen = true;
        this.loadingScreen = false;
        this.loadingImagesScreen = false;
        this.button = false;
        this.refreshButton = true;
        this.progressValue = 0;
        this.progressImageValue = 0;
        this.status = "Downloading...";
        this.lengthImages = 0;
        this.options = [
            {
                name: "Address",
                status: true,
                service: this._shippingAddressService.setShippingAddressDoc.bind(this._shippingAddressService),
            },
            {
                name: "Customers",
                status: true,
                service: this._customerService.setCustomerDocument.bind(this._customerService),
            },
            {
                name: "Inventory",
                status: true,
                service: this._inventoryService.setInventoriesDoc.bind(this._inventoryService),
            },
            {
                name: "Products",
                status: true,
                service: this._productService.setProductDocument.bind(this._productService),
            },
            {
                name: "Users",
                status: true,
                service: this._userService.setUserDocument.bind(this._userService),
            },
            {
                name: "Terms Code",
                status: true,
                service: this._termsCodeService.setTermsCodeDoc.bind(this._termsCodeService),
            }
        ];
        if (this._couchbaseService.getDocument("product") == null)
            this.refresh();
        else {
            this.dateDocsUpdated = _lastRefreshService.getLastRefresh("docs");
            this.dateImagesUpdated = _lastRefreshService.getLastRefresh("images");
        }
    }
    /*
    public progress(){
        this.progressValue = 25;
        setInterval(() => {
            this.progressValue += 1;
        },300);
    }*/
    SyncComponent.prototype.onValueChanged = function (args) {
        var progressBar = args.object;
        console.log("Value changed for " + progressBar);
        console.log("New value: " + progressBar.value);
    };
    SyncComponent.prototype.switch = function (index) {
        //this.options[index][option].status = !this.options[index][option].status;
        this.options[index].status = !this.options[index].status;
        console.log(this.options[index].status);
    };
    SyncComponent.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, part, res, counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.syncScreen = false;
                        this.loadingScreen = true;
                        this.refreshButton = false;
                        i = 0;
                        j = 0;
                        part = 0;
                        res = 0;
                        counter = 0;
                        this.options.map(function (option) {
                            if (option.status)
                                j++;
                        });
                        part = 100 / j;
                        this._lastRefreshService.setLastRefreshDocument();
                        _a.label = 1;
                    case 1:
                        if (!(counter < this.options.length)) return [3 /*break*/, 4];
                        if (!this.options[counter].status) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.options[counter].service()];
                    case 2:
                        _a.sent();
                        counter++;
                        this.progressValue += part;
                        res = 100 / this.progressValue;
                        if (res <= 1) {
                            this.refreshButton = true;
                            this.button = true;
                            this.status = "Downloaded";
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        ;
                        this._lastRefreshService.setLastRefresh("docs", new Date().toDateString());
                        return [2 /*return*/];
                }
            });
        });
    };
    SyncComponent.prototype.accept = function () {
        this._router.back();
    };
    SyncComponent.prototype.refreshImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.syncScreen = false;
                        this.loadingImagesScreen = true;
                        products = this._couchbaseService.getDocument("product")["product"];
                        this.lengthImages = products.length;
                        this.progressValue = 0;
                        return [4 /*yield*/, products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._productService.removeImage(product.ItemCode)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(this.progressImageValue < products.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._productService.downloadImage(products[this.progressImageValue].ItemCode)];
                    case 3:
                        _a.sent();
                        this.progressImageValue++;
                        if (this.progressImageValue == products.length) {
                            this.button = true;
                            this.status = "Downloaded";
                        }
                        return [3 /*break*/, 2];
                    case 4:
                        ;
                        this._lastRefreshService.setLastRefresh("images", new Date().toDateString());
                        return [2 /*return*/];
                }
            });
        });
    };
    SyncComponent = __decorate([
        core_1.Component({
            selector: "ns-sync",
            moduleId: module.id,
            templateUrl: "./sync.component.html",
            styleUrls: ["./sync.component.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ProductService,
            customer_service_1.CustomerService,
            device_service_1.DeviceService,
            inventory_service_1.InventoryService,
            shippingAddress_service_1.ShippingAddressService,
            terms_service_1.TermsCodeService,
            couchbase_service_1.CouchbaseService,
            user_service_1.UserService,
            lastRefresh_service_1.LastRefreshService,
            router_1.RouterExtensions])
    ], SyncComponent);
    return SyncComponent;
}());
exports.SyncComponent = SyncComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFDaEUsNERBQTBEO0FBSTFELHNFQUFvRTtBQUVwRSwwRUFBd0U7QUFDeEUsc0RBQStEO0FBUy9EO0lBMkJJLHVCQUNZLGVBQStCLEVBQy9CLGdCQUFpQyxFQUNqQyxjQUE2QixFQUM3QixpQkFBbUMsRUFDbkMsdUJBQStDLEVBQy9DLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBeUIsRUFDekIsbUJBQXVDLEVBQ3ZDLE9BQXlCO1FBVHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQXBDOUIsWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUtqQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUN2QixXQUFNLEdBQVcsZ0JBQWdCLENBQUM7UUFFbEMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFjNUIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYO2dCQUNJLElBQUksRUFBRSxTQUFTO2dCQUNmLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQzthQUNqRztZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7YUFDakY7WUFNRDtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2FBQ2pGO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQzlFO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87Z0JBQ2IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3JFO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7YUFDL0U7U0FDSixDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDdEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUVILHNDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2YsSUFBSSxXQUFXLEdBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sOEJBQU0sR0FBYixVQUFjLEtBQVU7UUFDcEIsMkVBQTJFO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFJWSwrQkFBTyxHQUFwQjs7Ozs7O3dCQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO3dCQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ04sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixJQUFJLEdBQUcsQ0FBQyxDQUFDO3dCQUNULEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBQ1IsT0FBTyxHQUFHLENBQUMsQ0FBQzt3QkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNOzRCQUNuQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dDQUNkLENBQUMsRUFBRSxDQUFDO3dCQUNaLENBQUMsQ0FBQyxDQUFBO3dCQUVGLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUVmLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDOzs7NkJBRTNDLENBQUEsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFBOzZCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBNUIsd0JBQTRCO3dCQUM1QixxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBckMsU0FBcUMsQ0FBQzt3QkFDdEMsT0FBTyxFQUFFLENBQUM7d0JBQ1YsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUM7d0JBQzNCLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzt3QkFDL0IsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ1gsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7NEJBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzRCQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQzt3QkFDL0IsQ0FBQzs7Ozt3QkFFUixDQUFDO3dCQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzs7Ozs7S0FDOUU7SUFFTSw4QkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRVkscUNBQWEsR0FBMUI7Ozs7Ozs7d0JBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7d0JBQzVCLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO3dCQUN2QixxQkFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQU0sT0FBTzs7O2dEQUM1QixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUE7OzRDQUF4RCxTQUF3RCxDQUFDOzs7O2lDQUM1RCxDQUFDLEVBQUE7O3dCQUZGLFNBRUUsQ0FBQzs7OzZCQUNJLENBQUEsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUE7d0JBQzVDLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQXBGLFNBQW9GLENBQUM7d0JBQ3JGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3dCQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzRCQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQTt3QkFDOUIsQ0FBQzs7O3dCQUNKLENBQUM7d0JBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDOzs7OztLQUNoRjtJQWxLUSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDO3lDQThCK0IsNkJBQWM7WUFDYixrQ0FBZTtZQUNqQiw4QkFBYTtZQUNWLG9DQUFnQjtZQUNWLGdEQUFzQjtZQUM1QixnQ0FBZ0I7WUFDaEIsb0NBQWdCO1lBQ3JCLDBCQUFXO1lBQ0osd0NBQWtCO1lBQzlCLHlCQUFnQjtPQXJDNUIsYUFBYSxDQW1LekI7SUFBRCxvQkFBQztDQUFBLEFBbktELElBbUtDO0FBbktZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIHN3aXRjaE1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIjtcblxuLy9TZXJ2aWNlc1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kZXZpY2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbi8vQmFycmFcbmltcG9ydCAqIGFzIHByb2dyZXNzTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb2dyZXNzXCI7XG5pbXBvcnQgeyBQcm9ncmVzcyB9IGZyb20gXCJ1aS9wcm9ncmVzc1wiO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XG5pbXBvcnQgeyBMYXN0UmVmcmVzaFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbGFzdFJlZnJlc2guc2VydmljZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtc3luY1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zeW5jLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3N5bmMuY29tcG9uZW50LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFN5bmNDb21wb25lbnQge1xuICAgIHB1YmxpYyBhZGRyZXNzID0gdHJ1ZTtcbiAgICBwdWJsaWMgY3VzdG9tZXJzID0gdHJ1ZTtcbiAgICBwdWJsaWMgY3VzdG9tZXJTYWxlcyA9IHRydWU7XG4gICAgcHVibGljIGltYWdlcyA9IHRydWU7XG4gICAgcHVibGljIGludmVudG9yeSA9IHRydWU7XG4gICAgcHVibGljIHByb2R1Y3RzID0gdHJ1ZTtcbiAgICBwdWJsaWMgcHVyY2hhc2VPcmRlcnMgPSB0cnVlO1xuICAgIHB1YmxpYyBzYWxlc09yZGVySGlzdG9yeSA9IHRydWU7XG4gICAgcHVibGljIHNjYW5Gb3JjZSA9IHRydWU7XG4gICAgcHVibGljIHVzZXJzID0gdHJ1ZTtcbiAgICBwdWJsaWMgdGVybXNDb2RlID0gdHJ1ZTtcbiAgICBwdWJsaWMganNvbjogYW55O1xuICAgIHB1YmxpYyBvcHRpb25zOiBhbnk7XG4gICAgcHVibGljIGRhdGVEb2NzVXBkYXRlZDogYW55O1xuICAgIHB1YmxpYyBkYXRlSW1hZ2VzVXBkYXRlZDogYW55O1xuICAgIHB1YmxpYyBzeW5jU2NyZWVuOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgbG9hZGluZ1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBsb2FkaW5nSW1hZ2VzU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyByZWZyZXNoQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgcHJvZ3Jlc3NWYWx1ZSA9IDA7XG4gICAgcHVibGljIHByb2dyZXNzSW1hZ2VWYWx1ZSA9IDA7XG4gICAgcHVibGljIHN0YXR1czogc3RyaW5nID0gXCJEb3dubG9hZGluZy4uLlwiO1xuICAgIHB1YmxpYyB0ZXN0OiBhbnk7XG4gICAgcHVibGljIGxlbmd0aEltYWdlczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9kZXZpY2VTZXJ2aWNlOiBEZXZpY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlOiBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF90ZXJtc0NvZGVTZXJ2aWNlOiBUZXJtc0NvZGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2xhc3RSZWZyZXNoU2VydmljZTogTGFzdFJlZnJlc2hTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnNcbiAgICApIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiQWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLnNldFNoaXBwaW5nQWRkcmVzc0RvYy5iaW5kKHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkN1c3RvbWVyc1wiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9jdXN0b21lclNlcnZpY2Uuc2V0Q3VzdG9tZXJEb2N1bWVudC5iaW5kKHRoaXMuX2N1c3RvbWVyU2VydmljZSksXG4gICAgICAgICAgICB9LC8qXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOlwiSW1hZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLmRlZmF1bHQoKSxcbiAgICAgICAgICAgICAgICB9LCovXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJJbnZlbnRvcnlcIixcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5faW52ZW50b3J5U2VydmljZS5zZXRJbnZlbnRvcmllc0RvYy5iaW5kKHRoaXMuX2ludmVudG9yeVNlcnZpY2UpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlByb2R1Y3RzXCIsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnNldFByb2R1Y3REb2N1bWVudC5iaW5kKHRoaXMuX3Byb2R1Y3RTZXJ2aWNlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJVc2Vyc1wiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl91c2VyU2VydmljZS5zZXRVc2VyRG9jdW1lbnQuYmluZCh0aGlzLl91c2VyU2VydmljZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiVGVybXMgQ29kZVwiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlLnNldFRlcm1zQ29kZURvYy5iaW5kKHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UpLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIikgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZURvY3NVcGRhdGVkID0gX2xhc3RSZWZyZXNoU2VydmljZS5nZXRMYXN0UmVmcmVzaChcImRvY3NcIik7XG4gICAgICAgICAgICB0aGlzLmRhdGVJbWFnZXNVcGRhdGVkID0gX2xhc3RSZWZyZXNoU2VydmljZS5nZXRMYXN0UmVmcmVzaChcImltYWdlc1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgcHVibGljIHByb2dyZXNzKCl7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDI1O1xuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgKz0gMTtcbiAgICAgICAgfSwzMDApO1xuICAgIH0qL1xuXG4gICAgb25WYWx1ZUNoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgcHJvZ3Jlc3NCYXIgPSA8UHJvZ3Jlc3M+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWUgY2hhbmdlZCBmb3IgXCIgKyBwcm9ncmVzc0Jhcik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IHZhbHVlOiBcIiArIHByb2dyZXNzQmFyLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3dpdGNoKGluZGV4OiBhbnkpIHtcbiAgICAgICAgLy90aGlzLm9wdGlvbnNbaW5kZXhdW29wdGlvbl0uc3RhdHVzID0gIXRoaXMub3B0aW9uc1tpbmRleF1bb3B0aW9uXS5zdGF0dXM7XG4gICAgICAgIHRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzID0gIXRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cyk7XG4gICAgfVxuXG5cblxuICAgIHB1YmxpYyBhc3luYyByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnN5bmNTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2FkaW5nU2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gZmFsc2U7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICB2YXIgcGFydCA9IDA7XG4gICAgICAgIHZhciByZXMgPSAwO1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXAob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc3RhdHVzKVxuICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgfSlcblxuICAgICAgICBwYXJ0ID0gMTAwIC8gajtcblxuICAgICAgICB0aGlzLl9sYXN0UmVmcmVzaFNlcnZpY2Uuc2V0TGFzdFJlZnJlc2hEb2N1bWVudCgpO1xuXG4gICAgICAgIHdoaWxlIChjb3VudGVyIDwgdGhpcy5vcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1tjb3VudGVyXS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm9wdGlvbnNbY291bnRlcl0uc2VydmljZSgpO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgKz0gcGFydDtcbiAgICAgICAgICAgICAgICByZXMgPSAxMDAgLyB0aGlzLnByb2dyZXNzVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHJlcyA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIkRvd25sb2FkZWRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2xhc3RSZWZyZXNoU2VydmljZS5zZXRMYXN0UmVmcmVzaChcImRvY3NcIiwgbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSk7ICAgXG4gICAgfVxuXG4gICAgcHVibGljIGFjY2VwdCgpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLmJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVmcmVzaEltYWdlcygpIHtcbiAgICAgICAgdGhpcy5zeW5jU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9hZGluZ0ltYWdlc1NjcmVlbiA9IHRydWU7XG4gICAgICAgIGxldCBwcm9kdWN0cyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJwcm9kdWN0XCIpW1wicHJvZHVjdFwiXTtcbiAgICAgICAgdGhpcy5sZW5ndGhJbWFnZXMgPSBwcm9kdWN0cy5sZW5ndGg7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDA7XG4gICAgICAgIGF3YWl0IHByb2R1Y3RzLm1hcChhc3luYyBwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnJlbW92ZUltYWdlKHByb2R1Y3QuSXRlbUNvZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2hpbGUgKHRoaXMucHJvZ3Jlc3NJbWFnZVZhbHVlIDwgcHJvZHVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5kb3dubG9hZEltYWdlKHByb2R1Y3RzW3RoaXMucHJvZ3Jlc3NJbWFnZVZhbHVlXS5JdGVtQ29kZSk7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZSsrO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NJbWFnZVZhbHVlID09IHByb2R1Y3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwiRG93bmxvYWRlZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2xhc3RSZWZyZXNoU2VydmljZS5zZXRMYXN0UmVmcmVzaChcImltYWdlc1wiLCBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKTsgICBcbiAgICB9XG59Il19