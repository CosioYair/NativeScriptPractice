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
                name: "address",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFDaEUsNERBQTBEO0FBSTFELHNFQUFvRTtBQUVwRSwwRUFBd0U7QUFTeEU7SUEyQkksdUJBQ1ksZUFBK0IsRUFDL0IsZ0JBQWlDLEVBQ2pDLGNBQTZCLEVBQzdCLGlCQUFtQyxFQUNuQyx1QkFBK0MsRUFDL0MsaUJBQW1DLEVBQ25DLGlCQUFtQyxFQUNuQyxZQUF5QixFQUN6QixtQkFBdUM7UUFSdkMsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBbkM1QyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLFVBQUss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SSxDQUFDLGtCQUFrQixFQUFFLENBQUM7d0JBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7NEJBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFBO3dCQUM5QixDQUFDOzs7d0JBQ0osQ0FBQzt3QkFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7Ozs7O0tBQ2hGO0lBbEtRLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3RDLENBQUM7eUNBOEIrQiw2QkFBYztZQUNiLGtDQUFlO1lBQ2pCLDhCQUFhO1lBQ1Ysb0NBQWdCO1lBQ1YsZ0RBQXNCO1lBQzVCLGdDQUFnQjtZQUNoQixvQ0FBZ0I7WUFDckIsMEJBQVc7WUFDSix3Q0FBa0I7T0FwQzFDLGFBQWEsQ0FtS3pCO0lBQUQsb0JBQUM7Q0FBQSxBQW5LRCxJQW1LQztBQW5LWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIHN3aXRjaE1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIjtcclxuXHJcbi8vU2VydmljZXNcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERldmljZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuLy9CYXJyYVxyXG5pbXBvcnQgKiBhcyBwcm9ncmVzc01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wcm9ncmVzc1wiO1xyXG5pbXBvcnQgeyBQcm9ncmVzcyB9IGZyb20gXCJ1aS9wcm9ncmVzc1wiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMYXN0UmVmcmVzaFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbGFzdFJlZnJlc2guc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1zeW5jXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zeW5jLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vc3luYy5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3luY0NvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgYWRkcmVzcyA9IHRydWU7XHJcbiAgICBwdWJsaWMgY3VzdG9tZXJzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBjdXN0b21lclNhbGVzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpbWFnZXMgPSB0cnVlO1xyXG4gICAgcHVibGljIGludmVudG9yeSA9IHRydWU7XHJcbiAgICBwdWJsaWMgcHJvZHVjdHMgPSB0cnVlO1xyXG4gICAgcHVibGljIHB1cmNoYXNlT3JkZXJzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzYWxlc09yZGVySGlzdG9yeSA9IHRydWU7XHJcbiAgICBwdWJsaWMgc2NhbkZvcmNlID0gdHJ1ZTtcclxuICAgIHB1YmxpYyB1c2VycyA9IHRydWU7XHJcbiAgICBwdWJsaWMgdGVybXNDb2RlID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBqc29uOiBhbnk7XHJcbiAgICBwdWJsaWMgb3B0aW9uczogYW55O1xyXG4gICAgcHVibGljIGRhdGVEb2NzVXBkYXRlZDogYW55O1xyXG4gICAgcHVibGljIGRhdGVJbWFnZXNVcGRhdGVkOiBhbnk7XHJcbiAgICBwdWJsaWMgc3luY1NjcmVlbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgbG9hZGluZ1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGxvYWRpbmdJbWFnZXNTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBidXR0b246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyByZWZyZXNoQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBwcm9ncmVzc1ZhbHVlID0gMDtcclxuICAgIHB1YmxpYyBwcm9ncmVzc0ltYWdlVmFsdWUgPSAwO1xyXG4gICAgcHVibGljIHN0YXR1czogc3RyaW5nID0gXCJEb3dubG9hZGluZy4uLlwiO1xyXG4gICAgcHVibGljIHRlc3Q6IGFueTtcclxuICAgIHB1YmxpYyBsZW5ndGhJbWFnZXM6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2RldmljZVNlcnZpY2U6IERldmljZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlOiBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3Rlcm1zQ29kZVNlcnZpY2U6IFRlcm1zQ29kZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfbGFzdFJlZnJlc2hTZXJ2aWNlOiBMYXN0UmVmcmVzaFNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhZGRyZXNzXCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLnNldFNoaXBwaW5nQWRkcmVzc0RvYy5iaW5kKHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkN1c3RvbWVyc1wiLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLnNldEN1c3RvbWVyRG9jdW1lbnQuYmluZCh0aGlzLl9jdXN0b21lclNlcnZpY2UpLFxyXG4gICAgICAgICAgICB9LC8qXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIkltYWdlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuZGVmYXVsdCgpLFxyXG4gICAgICAgICAgICAgICAgfSwqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkludmVudG9yeVwiLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5faW52ZW50b3J5U2VydmljZS5zZXRJbnZlbnRvcmllc0RvYy5iaW5kKHRoaXMuX2ludmVudG9yeVNlcnZpY2UpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlByb2R1Y3RzXCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9wcm9kdWN0U2VydmljZS5zZXRQcm9kdWN0RG9jdW1lbnQuYmluZCh0aGlzLl9wcm9kdWN0U2VydmljZSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiVXNlcnNcIixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3VzZXJTZXJ2aWNlLnNldFVzZXJEb2N1bWVudC5iaW5kKHRoaXMuX3VzZXJTZXJ2aWNlKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJUZXJtcyBDb2RlXCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlLnNldFRlcm1zQ29kZURvYy5iaW5kKHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIikgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZURvY3NVcGRhdGVkID0gX2xhc3RSZWZyZXNoU2VydmljZS5nZXRMYXN0UmVmcmVzaChcImRvY3NcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUltYWdlc1VwZGF0ZWQgPSBfbGFzdFJlZnJlc2hTZXJ2aWNlLmdldExhc3RSZWZyZXNoKFwiaW1hZ2VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgcHVibGljIHByb2dyZXNzKCl7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMjU7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgKz0gMTtcclxuICAgICAgICB9LDMwMCk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBvblZhbHVlQ2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzQmFyID0gPFByb2dyZXNzPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFsdWUgY2hhbmdlZCBmb3IgXCIgKyBwcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOZXcgdmFsdWU6IFwiICsgcHJvZ3Jlc3NCYXIudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzd2l0Y2goaW5kZXg6IGFueSkge1xyXG4gICAgICAgIC8vdGhpcy5vcHRpb25zW2luZGV4XVtvcHRpb25dLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdW29wdGlvbl0uc3RhdHVzO1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzID0gIXRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBhc3luYyByZWZyZXNoKCkge1xyXG4gICAgICAgIHRoaXMuc3luY1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ1NjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIHZhciBqID0gMDtcclxuICAgICAgICB2YXIgcGFydCA9IDA7XHJcbiAgICAgICAgdmFyIHJlcyA9IDA7XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXAob3B0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbi5zdGF0dXMpXHJcbiAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcGFydCA9IDEwMCAvIGo7XHJcblxyXG4gICAgICAgIHRoaXMuX2xhc3RSZWZyZXNoU2VydmljZS5zZXRMYXN0UmVmcmVzaERvY3VtZW50KCk7XHJcblxyXG4gICAgICAgIHdoaWxlIChjb3VudGVyIDwgdGhpcy5vcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zW2NvdW50ZXJdLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vcHRpb25zW2NvdW50ZXJdLnNlcnZpY2UoKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSArPSBwYXJ0O1xyXG4gICAgICAgICAgICAgICAgcmVzID0gMTAwIC8gdGhpcy5wcm9ncmVzc1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIkRvd25sb2FkZWRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9sYXN0UmVmcmVzaFNlcnZpY2Uuc2V0TGFzdFJlZnJlc2goXCJkb2NzXCIsIG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlcHQoKSB7XHJcbiAgICAgICAgdGhpcy5zeW5jU2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hCdXR0b24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyByZWZyZXNoSW1hZ2VzKCkge1xyXG4gICAgICAgIHRoaXMuc3luY1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0ltYWdlc1NjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgbGV0IHByb2R1Y3RzID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIilbXCJwcm9kdWN0XCJdO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoSW1hZ2VzID0gcHJvZHVjdHMubGVuZ3RoO1xyXG4gICAgICAgIGF3YWl0IHByb2R1Y3RzLm1hcChhc3luYyBwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UucmVtb3ZlSW1hZ2UocHJvZHVjdC5JdGVtQ29kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMucHJvZ3Jlc3NJbWFnZVZhbHVlIDwgcHJvZHVjdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmRvd25sb2FkSW1hZ2UocHJvZHVjdHNbdGhpcy5wcm9ncmVzc0ltYWdlVmFsdWVdLkl0ZW1Db2RlKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0ltYWdlVmFsdWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NJbWFnZVZhbHVlID09IHByb2R1Y3RzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIkRvd25sb2FkZWRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9sYXN0UmVmcmVzaFNlcnZpY2Uuc2V0TGFzdFJlZnJlc2goXCJpbWFnZXNcIiwgbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSk7ICAgXHJcbiAgICB9XHJcbn0iXX0=