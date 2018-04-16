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
var SyncComponent = /** @class */ (function () {
    function SyncComponent(_productService, _customerService, _deviceService, _inventoryService, _shippingAddressService, _termsCodeService, _couchbaseService, _userService, _lastRefreshService) {
        this._productService = _productService;
        this._customerService = _customerService;
        this._deviceService = _deviceService;
        this._inventoryService = _inventoryService;
        this._shippingAddressService = _shippingAddressService;
        this._termsCodeService = _termsCodeService;
        this._couchbaseService = _couchbaseService;
        this._userService = _userService;
        this._lastRefreshService = _lastRefreshService;
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
        this.syncScreen = true;
        this.loadingScreen = false;
        this.refreshButton = true;
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
            lastRefresh_service_1.LastRefreshService])
    ], SyncComponent);
    return SyncComponent;
}());
exports.SyncComponent = SyncComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFDaEUsNERBQTBEO0FBSTFELHNFQUFvRTtBQUVwRSwwRUFBd0U7QUFTeEU7SUEyQkksdUJBQ1ksZUFBK0IsRUFDL0IsZ0JBQWlDLEVBQ2pDLGNBQTZCLEVBQzdCLGlCQUFtQyxFQUNuQyx1QkFBK0MsRUFDL0MsaUJBQW1DLEVBQ25DLGlCQUFtQyxFQUNuQyxZQUF5QixFQUN6QixtQkFBdUM7UUFSdkMsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBbkM1QyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBS2pCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLFdBQU0sR0FBVyxnQkFBZ0IsQ0FBQztRQUVsQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQWE1QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1g7Z0JBQ0ksSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO2FBQ2pHO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzthQUNqRjtZQU1EO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7YUFDakY7WUFDRDtnQkFDSSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDOUU7WUFDRDtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDckU7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzthQUMvRTtTQUNKLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsbUJBQW1CLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBRUgsc0NBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLFdBQVcsR0FBYSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSw4QkFBTSxHQUFiLFVBQWMsS0FBVTtRQUNwQiwyRUFBMkU7UUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUlZLCtCQUFPLEdBQXBCOzs7Ozs7d0JBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO3dCQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzt3QkFDdkIsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNOLElBQUksR0FBRyxDQUFDLENBQUM7d0JBQ1QsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFDUixPQUFPLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07NEJBQ25CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0NBQ2QsQ0FBQyxFQUFFLENBQUM7d0JBQ1osQ0FBQyxDQUFDLENBQUE7d0JBRUYsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBRWYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixFQUFFLENBQUM7Ozs2QkFFM0MsQ0FBQSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUE7NkJBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUE1Qix3QkFBNEI7d0JBQzVCLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUE7O3dCQUFyQyxTQUFxQyxDQUFDO3dCQUN0QyxPQUFPLEVBQUUsQ0FBQzt3QkFDVixJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQzt3QkFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUMvQixFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDWCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs0QkFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7NEJBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFBO3dCQUM5QixDQUFDOzs7O3dCQUVSLENBQUM7d0JBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDOzs7OztLQUM5RTtJQUVNLDhCQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRVkscUNBQWEsR0FBMUI7Ozs7Ozs7d0JBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7d0JBQzVCLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQ3BDLHFCQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBTSxPQUFPOzs7Z0RBQzVCLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBQTs7NENBQXhELFNBQXdELENBQUM7Ozs7aUNBQzVELENBQUMsRUFBQTs7d0JBRkYsU0FFRSxDQUFDOzs7NkJBQ0ksQ0FBQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQTt3QkFDNUMscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBcEYsU0FBb0YsQ0FBQzt3QkFDckYsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7d0JBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7NEJBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFBO3dCQUM5QixDQUFDOzs7d0JBQ0osQ0FBQzt3QkFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7Ozs7O0tBQ2hGO0lBbEtRLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3RDLENBQUM7eUNBOEIrQiw2QkFBYztZQUNiLGtDQUFlO1lBQ2pCLDhCQUFhO1lBQ1Ysb0NBQWdCO1lBQ1YsZ0RBQXNCO1lBQzVCLGdDQUFnQjtZQUNoQixvQ0FBZ0I7WUFDckIsMEJBQVc7WUFDSix3Q0FBa0I7T0FwQzFDLGFBQWEsQ0FtS3pCO0lBQUQsb0JBQUM7Q0FBQSxBQW5LRCxJQW1LQztBQW5LWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBzd2l0Y2hNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3dpdGNoXCI7XG5cbi8vU2VydmljZXNcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IERldmljZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcHBpbmdBZGRyZXNzLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG4vL0JhcnJhXG5pbXBvcnQgKiBhcyBwcm9ncmVzc01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wcm9ncmVzc1wiO1xuaW1wb3J0IHsgUHJvZ3Jlc3MgfSBmcm9tIFwidWkvcHJvZ3Jlc3NcIjtcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xuaW1wb3J0IHsgTGFzdFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2xhc3RSZWZyZXNoLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtc3luY1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zeW5jLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3N5bmMuY29tcG9uZW50LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFN5bmNDb21wb25lbnQge1xuICAgIHB1YmxpYyBhZGRyZXNzID0gdHJ1ZTtcbiAgICBwdWJsaWMgY3VzdG9tZXJzID0gdHJ1ZTtcbiAgICBwdWJsaWMgY3VzdG9tZXJTYWxlcyA9IHRydWU7XG4gICAgcHVibGljIGltYWdlcyA9IHRydWU7XG4gICAgcHVibGljIGludmVudG9yeSA9IHRydWU7XG4gICAgcHVibGljIHByb2R1Y3RzID0gdHJ1ZTtcbiAgICBwdWJsaWMgcHVyY2hhc2VPcmRlcnMgPSB0cnVlO1xuICAgIHB1YmxpYyBzYWxlc09yZGVySGlzdG9yeSA9IHRydWU7XG4gICAgcHVibGljIHNjYW5Gb3JjZSA9IHRydWU7XG4gICAgcHVibGljIHVzZXJzID0gdHJ1ZTtcbiAgICBwdWJsaWMgdGVybXNDb2RlID0gdHJ1ZTtcbiAgICBwdWJsaWMganNvbjogYW55O1xuICAgIHB1YmxpYyBvcHRpb25zOiBhbnk7XG4gICAgcHVibGljIGRhdGVEb2NzVXBkYXRlZDogYW55O1xuICAgIHB1YmxpYyBkYXRlSW1hZ2VzVXBkYXRlZDogYW55O1xuICAgIHB1YmxpYyBzeW5jU2NyZWVuOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgbG9hZGluZ1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBsb2FkaW5nSW1hZ2VzU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyByZWZyZXNoQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgcHJvZ3Jlc3NWYWx1ZSA9IDA7XG4gICAgcHVibGljIHByb2dyZXNzSW1hZ2VWYWx1ZSA9IDA7XG4gICAgcHVibGljIHN0YXR1czogc3RyaW5nID0gXCJEb3dubG9hZGluZy4uLlwiO1xuICAgIHB1YmxpYyB0ZXN0OiBhbnk7XG4gICAgcHVibGljIGxlbmd0aEltYWdlczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9kZXZpY2VTZXJ2aWNlOiBEZXZpY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlOiBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF90ZXJtc0NvZGVTZXJ2aWNlOiBUZXJtc0NvZGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2xhc3RSZWZyZXNoU2VydmljZTogTGFzdFJlZnJlc2hTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZS5zZXRTaGlwcGluZ0FkZHJlc3NEb2MuYmluZCh0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJDdXN0b21lcnNcIixcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLnNldEN1c3RvbWVyRG9jdW1lbnQuYmluZCh0aGlzLl9jdXN0b21lclNlcnZpY2UpLFxuICAgICAgICAgICAgfSwvKlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIkltYWdlc1wiLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5kZWZhdWx0KCksXG4gICAgICAgICAgICAgICAgfSwqL1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiSW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX2ludmVudG9yeVNlcnZpY2Uuc2V0SW52ZW50b3JpZXNEb2MuYmluZCh0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJQcm9kdWN0c1wiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9wcm9kdWN0U2VydmljZS5zZXRQcm9kdWN0RG9jdW1lbnQuYmluZCh0aGlzLl9wcm9kdWN0U2VydmljZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiVXNlcnNcIixcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fdXNlclNlcnZpY2Uuc2V0VXNlckRvY3VtZW50LmJpbmQodGhpcy5fdXNlclNlcnZpY2UpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlRlcm1zIENvZGVcIixcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fdGVybXNDb2RlU2VydmljZS5zZXRUZXJtc0NvZGVEb2MuYmluZCh0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJwcm9kdWN0XCIpID09IG51bGwpXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVEb2NzVXBkYXRlZCA9IF9sYXN0UmVmcmVzaFNlcnZpY2UuZ2V0TGFzdFJlZnJlc2goXCJkb2NzXCIpO1xuICAgICAgICAgICAgdGhpcy5kYXRlSW1hZ2VzVXBkYXRlZCA9IF9sYXN0UmVmcmVzaFNlcnZpY2UuZ2V0TGFzdFJlZnJlc2goXCJpbWFnZXNcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgIHB1YmxpYyBwcm9ncmVzcygpe1xuICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSAyNTtcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlICs9IDE7XG4gICAgICAgIH0sMzAwKTtcbiAgICB9Ki9cblxuICAgIG9uVmFsdWVDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgbGV0IHByb2dyZXNzQmFyID0gPFByb2dyZXNzPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlIGNoYW5nZWQgZm9yIFwiICsgcHJvZ3Jlc3NCYXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5ldyB2YWx1ZTogXCIgKyBwcm9ncmVzc0Jhci52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN3aXRjaChpbmRleDogYW55KSB7XG4gICAgICAgIC8vdGhpcy5vcHRpb25zW2luZGV4XVtvcHRpb25dLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdW29wdGlvbl0uc3RhdHVzO1xuICAgICAgICB0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5vcHRpb25zW2luZGV4XS5zdGF0dXMpO1xuICAgIH1cblxuXG5cbiAgICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5zeW5jU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9hZGluZ1NjcmVlbiA9IHRydWU7XG4gICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvbiA9IGZhbHNlO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBqID0gMDtcbiAgICAgICAgdmFyIHBhcnQgPSAwO1xuICAgICAgICB2YXIgcmVzID0gMDtcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLm9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnN0YXR1cylcbiAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcGFydCA9IDEwMCAvIGo7XG5cbiAgICAgICAgdGhpcy5fbGFzdFJlZnJlc2hTZXJ2aWNlLnNldExhc3RSZWZyZXNoRG9jdW1lbnQoKTtcblxuICAgICAgICB3aGlsZSAoY291bnRlciA8IHRoaXMub3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbY291bnRlcl0uc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vcHRpb25zW2NvdW50ZXJdLnNlcnZpY2UoKTtcbiAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlICs9IHBhcnQ7XG4gICAgICAgICAgICAgICAgcmVzID0gMTAwIC8gdGhpcy5wcm9ncmVzc1ZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChyZXMgPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJEb3dubG9hZGVkXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2xhc3RSZWZyZXNoU2VydmljZS5zZXRMYXN0UmVmcmVzaChcImRvY3NcIiwgbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSk7ICAgXG4gICAgfVxuXG4gICAgcHVibGljIGFjY2VwdCgpIHtcbiAgICAgICAgdGhpcy5zeW5jU2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkaW5nU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZnJlc2hJbWFnZXMoKSB7XG4gICAgICAgIHRoaXMuc3luY1NjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvYWRpbmdJbWFnZXNTY3JlZW4gPSB0cnVlO1xuICAgICAgICBsZXQgcHJvZHVjdHMgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKVtcInByb2R1Y3RcIl07XG4gICAgICAgIHRoaXMubGVuZ3RoSW1hZ2VzID0gcHJvZHVjdHMubGVuZ3RoO1xuICAgICAgICBhd2FpdCBwcm9kdWN0cy5tYXAoYXN5bmMgcHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5yZW1vdmVJbWFnZShwcm9kdWN0Lkl0ZW1Db2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdoaWxlICh0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZSA8IHByb2R1Y3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZG93bmxvYWRJbWFnZShwcm9kdWN0c1t0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZV0uSXRlbUNvZGUpO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0ltYWdlVmFsdWUrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZSA9PSBwcm9kdWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIkRvd25sb2FkZWRcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9sYXN0UmVmcmVzaFNlcnZpY2Uuc2V0TGFzdFJlZnJlc2goXCJpbWFnZXNcIiwgbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSk7ICAgXG4gICAgfVxufSJdfQ==