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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFDaEUsNERBQTBEO0FBSTFELHNFQUFvRTtBQUVwRSwwRUFBd0U7QUFDeEUsc0RBQStEO0FBUy9EO0lBMkJJLHVCQUNZLGVBQStCLEVBQy9CLGdCQUFpQyxFQUNqQyxjQUE2QixFQUM3QixpQkFBbUMsRUFDbkMsdUJBQStDLEVBQy9DLGlCQUFtQyxFQUNuQyxpQkFBbUMsRUFDbkMsWUFBeUIsRUFDekIsbUJBQXVDLEVBQ3ZDLE9BQXlCO1FBVHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQXBDOUIsWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixzQkFBaUIs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LFNBQW9GLENBQUM7d0JBQ3JGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3dCQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzRCQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQTt3QkFDOUIsQ0FBQzs7O3dCQUNKLENBQUM7d0JBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDOzs7OztLQUNoRjtJQWxLUSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDO3lDQThCK0IsNkJBQWM7WUFDYixrQ0FBZTtZQUNqQiw4QkFBYTtZQUNWLG9DQUFnQjtZQUNWLGdEQUFzQjtZQUM1QixnQ0FBZ0I7WUFDaEIsb0NBQWdCO1lBQ3JCLDBCQUFXO1lBQ0osd0NBQWtCO1lBQzlCLHlCQUFnQjtPQXJDNUIsYUFBYSxDQW1LekI7SUFBRCxvQkFBQztDQUFBLEFBbktELElBbUtDO0FBbktZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgc3dpdGNoTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N3aXRjaFwiO1xyXG5cclxuLy9TZXJ2aWNlc1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kZXZpY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcHBpbmdBZGRyZXNzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG4vL0JhcnJhXHJcbmltcG9ydCAqIGFzIHByb2dyZXNzTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb2dyZXNzXCI7XHJcbmltcG9ydCB7IFByb2dyZXNzIH0gZnJvbSBcInVpL3Byb2dyZXNzXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcbmltcG9ydCB7IExhc3RSZWZyZXNoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9sYXN0UmVmcmVzaC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXN5bmNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3N5bmMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zeW5jLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTeW5jQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBhZGRyZXNzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBjdXN0b21lcnMgPSB0cnVlO1xyXG4gICAgcHVibGljIGN1c3RvbWVyU2FsZXMgPSB0cnVlO1xyXG4gICAgcHVibGljIGltYWdlcyA9IHRydWU7XHJcbiAgICBwdWJsaWMgaW52ZW50b3J5ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBwcm9kdWN0cyA9IHRydWU7XHJcbiAgICBwdWJsaWMgcHVyY2hhc2VPcmRlcnMgPSB0cnVlO1xyXG4gICAgcHVibGljIHNhbGVzT3JkZXJIaXN0b3J5ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzY2FuRm9yY2UgPSB0cnVlO1xyXG4gICAgcHVibGljIHVzZXJzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyB0ZXJtc0NvZGUgPSB0cnVlO1xyXG4gICAgcHVibGljIGpzb246IGFueTtcclxuICAgIHB1YmxpYyBvcHRpb25zOiBhbnk7XHJcbiAgICBwdWJsaWMgZGF0ZURvY3NVcGRhdGVkOiBhbnk7XHJcbiAgICBwdWJsaWMgZGF0ZUltYWdlc1VwZGF0ZWQ6IGFueTtcclxuICAgIHB1YmxpYyBzeW5jU2NyZWVuOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBsb2FkaW5nU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbG9hZGluZ0ltYWdlc1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHJlZnJlc2hCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHByb2dyZXNzVmFsdWUgPSAwO1xyXG4gICAgcHVibGljIHByb2dyZXNzSW1hZ2VWYWx1ZSA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdHVzOiBzdHJpbmcgPSBcIkRvd25sb2FkaW5nLi4uXCI7XHJcbiAgICBwdWJsaWMgdGVzdDogYW55O1xyXG4gICAgcHVibGljIGxlbmd0aEltYWdlczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZGV2aWNlU2VydmljZTogRGV2aWNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2U6IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfdGVybXNDb2RlU2VydmljZTogVGVybXNDb2RlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9sYXN0UmVmcmVzaFNlcnZpY2U6IExhc3RSZWZyZXNoU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnNcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJBZGRyZXNzXCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLnNldFNoaXBwaW5nQWRkcmVzc0RvYy5iaW5kKHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkN1c3RvbWVyc1wiLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLnNldEN1c3RvbWVyRG9jdW1lbnQuYmluZCh0aGlzLl9jdXN0b21lclNlcnZpY2UpLFxyXG4gICAgICAgICAgICB9LC8qXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIkltYWdlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuZGVmYXVsdCgpLFxyXG4gICAgICAgICAgICAgICAgfSwqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkludmVudG9yeVwiLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5faW52ZW50b3J5U2VydmljZS5zZXRJbnZlbnRvcmllc0RvYy5iaW5kKHRoaXMuX2ludmVudG9yeVNlcnZpY2UpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlByb2R1Y3RzXCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9wcm9kdWN0U2VydmljZS5zZXRQcm9kdWN0RG9jdW1lbnQuYmluZCh0aGlzLl9wcm9kdWN0U2VydmljZSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiVXNlcnNcIixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3VzZXJTZXJ2aWNlLnNldFVzZXJEb2N1bWVudC5iaW5kKHRoaXMuX3VzZXJTZXJ2aWNlKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJUZXJtcyBDb2RlXCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlLnNldFRlcm1zQ29kZURvYy5iaW5kKHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIikgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZURvY3NVcGRhdGVkID0gX2xhc3RSZWZyZXNoU2VydmljZS5nZXRMYXN0UmVmcmVzaChcImRvY3NcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUltYWdlc1VwZGF0ZWQgPSBfbGFzdFJlZnJlc2hTZXJ2aWNlLmdldExhc3RSZWZyZXNoKFwiaW1hZ2VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgcHVibGljIHByb2dyZXNzKCl7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMjU7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgKz0gMTtcclxuICAgICAgICB9LDMwMCk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBvblZhbHVlQ2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzQmFyID0gPFByb2dyZXNzPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWUgY2hhbmdlZCBmb3IgXCIgKyBwcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOZXcgdmFsdWU6IFwiICsgcHJvZ3Jlc3NCYXIudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzd2l0Y2goaW5kZXg6IGFueSkge1xyXG4gICAgICAgIC8vdGhpcy5vcHRpb25zW2luZGV4XVtvcHRpb25dLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdW29wdGlvbl0uc3RhdHVzO1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzID0gIXRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBhc3luYyByZWZyZXNoKCkge1xyXG4gICAgICAgIHRoaXMuc3luY1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ1NjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIHZhciBqID0gMDtcclxuICAgICAgICB2YXIgcGFydCA9IDA7XHJcbiAgICAgICAgdmFyIHJlcyA9IDA7XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXAob3B0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbi5zdGF0dXMpXHJcbiAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcGFydCA9IDEwMCAvIGo7XHJcblxyXG4gICAgICAgIHRoaXMuX2xhc3RSZWZyZXNoU2VydmljZS5zZXRMYXN0UmVmcmVzaERvY3VtZW50KCk7XHJcblxyXG4gICAgICAgIHdoaWxlIChjb3VudGVyIDwgdGhpcy5vcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zW2NvdW50ZXJdLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vcHRpb25zW2NvdW50ZXJdLnNlcnZpY2UoKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSArPSBwYXJ0O1xyXG4gICAgICAgICAgICAgICAgcmVzID0gMTAwIC8gdGhpcy5wcm9ncmVzc1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIkRvd25sb2FkZWRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbGFzdFJlZnJlc2hTZXJ2aWNlLnNldExhc3RSZWZyZXNoKFwiZG9jc1wiLCBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKTsgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWNjZXB0KCkge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlci5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlZnJlc2hJbWFnZXMoKSB7XHJcbiAgICAgICAgdGhpcy5zeW5jU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nSW1hZ2VzU2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcHJvZHVjdHMgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKVtcInByb2R1Y3RcIl07XHJcbiAgICAgICAgdGhpcy5sZW5ndGhJbWFnZXMgPSBwcm9kdWN0cy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMDtcclxuICAgICAgICBhd2FpdCBwcm9kdWN0cy5tYXAoYXN5bmMgcHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnJlbW92ZUltYWdlKHByb2R1Y3QuSXRlbUNvZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZSA8IHByb2R1Y3RzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5kb3dubG9hZEltYWdlKHByb2R1Y3RzW3RoaXMucHJvZ3Jlc3NJbWFnZVZhbHVlXS5JdGVtQ29kZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NJbWFnZVZhbHVlKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZSA9PSBwcm9kdWN0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJEb3dubG9hZGVkXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbGFzdFJlZnJlc2hTZXJ2aWNlLnNldExhc3RSZWZyZXNoKFwiaW1hZ2VzXCIsIG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpOyAgIFxyXG4gICAgfVxyXG59Il19