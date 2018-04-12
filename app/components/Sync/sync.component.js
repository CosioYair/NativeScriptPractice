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
var SyncComponent = /** @class */ (function () {
    function SyncComponent(_productService, _customerService, _deviceService, _inventoryService, _shippingAddressService, _termsCodeService, _couchbaseService, _userService) {
        this._productService = _productService;
        this._customerService = _customerService;
        this._deviceService = _deviceService;
        this._inventoryService = _inventoryService;
        this._shippingAddressService = _shippingAddressService;
        this._termsCodeService = _termsCodeService;
        this._couchbaseService = _couchbaseService;
        this._userService = _userService;
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
            var i, j, part, res, counter, date;
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
                        date = new Date();
                        this.dateUpdated = date.toDateString();
                        //console.log(this.dateUpdated);
                        console.log(part);
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
            user_service_1.UserService])
    ], SyncComponent);
    return SyncComponent;
}());
exports.SyncComponent = SyncComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFDaEUsNERBQTBEO0FBSTFELHNFQUFvRTtBQVVwRTtJQTBCSSx1QkFDWSxlQUErQixFQUMvQixnQkFBaUMsRUFDakMsY0FBNkIsRUFDN0IsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLFlBQXlCO1FBUHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFqQzlCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFJakIsZUFBVSxHQUFZLElB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SUE5SlEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0E2QitCLDZCQUFjO1lBQ2Isa0NBQWU7WUFDakIsOEJBQWE7WUFDVixvQ0FBZ0I7WUFDVixnREFBc0I7WUFDNUIsZ0NBQWdCO1lBQ2hCLG9DQUFnQjtZQUNyQiwwQkFBVztPQWxDNUIsYUFBYSxDQStKekI7SUFBRCxvQkFBQztDQUFBLEFBL0pELElBK0pDO0FBL0pZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIHN3aXRjaE1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIjtcblxuLy9TZXJ2aWNlc1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kZXZpY2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbi8vQmFycmFcbmltcG9ydCAqIGFzIHByb2dyZXNzTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb2dyZXNzXCI7XG5pbXBvcnQgeyBQcm9ncmVzcyB9IGZyb20gXCJ1aS9wcm9ncmVzc1wiO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLXN5bmNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc3luYy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9zeW5jLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTeW5jQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgYWRkcmVzcyA9IHRydWU7XG4gICAgcHVibGljIGN1c3RvbWVycyA9IHRydWU7XG4gICAgcHVibGljIGN1c3RvbWVyU2FsZXMgPSB0cnVlO1xuICAgIHB1YmxpYyBpbWFnZXMgPSB0cnVlO1xuICAgIHB1YmxpYyBpbnZlbnRvcnkgPSB0cnVlO1xuICAgIHB1YmxpYyBwcm9kdWN0cyA9IHRydWU7XG4gICAgcHVibGljIHB1cmNoYXNlT3JkZXJzID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2FsZXNPcmRlckhpc3RvcnkgPSB0cnVlO1xuICAgIHB1YmxpYyBzY2FuRm9yY2UgPSB0cnVlO1xuICAgIHB1YmxpYyB1c2VycyA9IHRydWU7XG4gICAgcHVibGljIHRlcm1zQ29kZSA9IHRydWU7XG4gICAgcHVibGljIGpzb246IGFueTtcbiAgICBwdWJsaWMgb3B0aW9uczogYW55O1xuICAgIHB1YmxpYyBkYXRlVXBkYXRlZDogYW55O1xuICAgIHB1YmxpYyBzeW5jU2NyZWVuOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgbG9hZGluZ1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBsb2FkaW5nSW1hZ2VzU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyByZWZyZXNoQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgcHJvZ3Jlc3NWYWx1ZSA9IDA7XG4gICAgcHVibGljIHByb2dyZXNzSW1hZ2VWYWx1ZSA9IDA7XG4gICAgcHVibGljIHN0YXR1czogc3RyaW5nID0gXCJEb3dubG9hZGluZy4uLlwiO1xuICAgIHB1YmxpYyB0ZXN0OiBhbnk7XG4gICAgcHVibGljIGxlbmd0aEltYWdlczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9kZXZpY2VTZXJ2aWNlOiBEZXZpY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlOiBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF90ZXJtc0NvZGVTZXJ2aWNlOiBUZXJtc0NvZGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9zaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLnNldFNoaXBwaW5nQWRkcmVzc0RvYy5iaW5kKHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2UpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkN1c3RvbWVyc1wiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9jdXN0b21lclNlcnZpY2Uuc2V0Q3VzdG9tZXJEb2N1bWVudC5iaW5kKHRoaXMuX2N1c3RvbWVyU2VydmljZSksXG4gICAgICAgICAgICB9LC8qXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOlwiSW1hZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLmRlZmF1bHQoKSxcbiAgICAgICAgICAgICAgICB9LCovXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJJbnZlbnRvcnlcIixcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5faW52ZW50b3J5U2VydmljZS5zZXRJbnZlbnRvcmllc0RvYy5iaW5kKHRoaXMuX2ludmVudG9yeVNlcnZpY2UpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlByb2R1Y3RzXCIsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnNldFByb2R1Y3REb2N1bWVudC5iaW5kKHRoaXMuX3Byb2R1Y3RTZXJ2aWNlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJVc2Vyc1wiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl91c2VyU2VydmljZS5zZXRVc2VyRG9jdW1lbnQuYmluZCh0aGlzLl91c2VyU2VydmljZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiVGVybXMgQ29kZVwiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlLnNldFRlcm1zQ29kZURvYy5iaW5kKHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2UpLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIikgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICBwdWJsaWMgcHJvZ3Jlc3MoKXtcbiAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlID0gMjU7XG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSArPSAxO1xuICAgICAgICB9LDMwMCk7XG4gICAgfSovXG5cbiAgICBvblZhbHVlQ2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBwcm9ncmVzc0JhciA9IDxQcm9ncmVzcz5hcmdzLm9iamVjdDtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYWx1ZSBjaGFuZ2VkIGZvciBcIiArIHByb2dyZXNzQmFyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJOZXcgdmFsdWU6IFwiICsgcHJvZ3Jlc3NCYXIudmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzd2l0Y2goaW5kZXg6IGFueSkge1xuICAgICAgICAvL3RoaXMub3B0aW9uc1tpbmRleF1bb3B0aW9uXS5zdGF0dXMgPSAhdGhpcy5vcHRpb25zW2luZGV4XVtvcHRpb25dLnN0YXR1cztcbiAgICAgICAgdGhpcy5vcHRpb25zW2luZGV4XS5zdGF0dXMgPSAhdGhpcy5vcHRpb25zW2luZGV4XS5zdGF0dXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9uc1tpbmRleF0uc3RhdHVzKTtcbiAgICB9XG5cblxuXG4gICAgcHVibGljIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuc3luY1NjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvYWRpbmdTY3JlZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnJlZnJlc2hCdXR0b24gPSBmYWxzZTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgaiA9IDA7XG4gICAgICAgIHZhciBwYXJ0ID0gMDtcbiAgICAgICAgdmFyIHJlcyA9IDA7XG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5vcHRpb25zLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zdGF0dXMpXG4gICAgICAgICAgICAgICAgaisrO1xuICAgICAgICB9KVxuXG4gICAgICAgIHBhcnQgPSAxMDAgLyBqO1xuXG4gICAgICAgIHdoaWxlKGNvdW50ZXIgPCB0aGlzLm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zW2NvdW50ZXJdLnN0YXR1cykge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMub3B0aW9uc1tjb3VudGVyXS5zZXJ2aWNlKCk7XG4gICAgICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSArPSBwYXJ0O1xuICAgICAgICAgICAgICAgIHJlcyA9IDEwMCAvIHRoaXMucHJvZ3Jlc3NWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAocmVzIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwiRG93bmxvYWRlZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5kYXRlVXBkYXRlZCA9IGRhdGUudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5kYXRlVXBkYXRlZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhY2NlcHQoKSB7XG4gICAgICAgIHRoaXMuc3luY1NjcmVlbiA9IHRydWU7XG4gICAgICAgIHRoaXMubG9hZGluZ1NjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlZnJlc2hCdXR0b24gPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWZyZXNoSW1hZ2VzKCkge1xuICAgICAgICB0aGlzLnN5bmNTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2FkaW5nSW1hZ2VzU2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgbGV0IHByb2R1Y3RzID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIilbXCJwcm9kdWN0XCJdO1xuICAgICAgICB0aGlzLmxlbmd0aEltYWdlcyA9IHByb2R1Y3RzLmxlbmd0aDtcbiAgICAgICAgYXdhaXQgcHJvZHVjdHMubWFwKGFzeW5jIHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UucmVtb3ZlSW1hZ2UocHJvZHVjdC5JdGVtQ29kZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aGlsZSh0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZSA8IHByb2R1Y3RzLmxlbmd0aCkgeyBcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmRvd25sb2FkSW1hZ2UocHJvZHVjdHNbdGhpcy5wcm9ncmVzc0ltYWdlVmFsdWVdLkl0ZW1Db2RlKTtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NJbWFnZVZhbHVlKys7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0ltYWdlVmFsdWUgPT0gcHJvZHVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJEb3dubG9hZGVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59Il19