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
        this.button = false;
        this.refreshButton = true;
        this.progressValue = 0;
        this.status = "Downloading...";
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
        var _this = this;
        this.syncScreen = false;
        this.loadingScreen = true;
        this.refreshButton = false;
        var i = 0;
        var j = 0;
        var part = 0;
        var res = 0;
        this.options.map(function (option) {
            if (option.status)
                j++;
        });
        part = 100 / j;
        this.options.map(function (option) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!option.status) return [3 /*break*/, 2];
                        return [4 /*yield*/, option.service()];
                    case 1:
                        _a.sent();
                        this.progressValue += part;
                        res = 100 / this.progressValue;
                        if (res <= 1) {
                            this.refreshButton = true;
                            this.button = true;
                            this.status = "Downloaded";
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        var date = new Date();
        this.dateUpdated = date.toDateString();
        //console.log(this.dateUpdated);
        console.log(part);
    };
    SyncComponent.prototype.accept = function () {
        this.syncScreen = true;
        this.loadingScreen = false;
        this.refreshButton = true;
    };
    SyncComponent.prototype.getImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        products = this._couchbaseService.getDocument("product")["product"];
                        return [4 /*yield*/, products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._productService.downloadImage(product.ItemCode)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFDaEUsNERBQTBEO0FBSTFELHNFQUFvRTtBQVVwRTtJQXVCSSx1QkFDWSxlQUErQixFQUMvQixnQkFBaUMsRUFDakMsY0FBNkIsRUFDN0IsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLFlBQXlCO1FBUHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUE5QjlCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFJakIsZUFBVSxHQUFZLElB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Q0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3hFLHFCQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBTSxPQUFPOzs7Z0RBQzVCLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBQTs7NENBQTFELFNBQTBELENBQUM7Ozs7aUNBQzlELENBQUMsRUFBQTs7d0JBRkYsU0FFRSxDQUFDOzs7OztLQUNOO0lBOUlRLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3RDLENBQUM7eUNBMEIrQiw2QkFBYztZQUNiLGtDQUFlO1lBQ2pCLDhCQUFhO1lBQ1Ysb0NBQWdCO1lBQ1YsZ0RBQXNCO1lBQzVCLGdDQUFnQjtZQUNoQixvQ0FBZ0I7WUFDckIsMEJBQVc7T0EvQjVCLGFBQWEsQ0ErSXpCO0lBQUQsb0JBQUM7Q0FBQSxBQS9JRCxJQStJQztBQS9JWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIHN3aXRjaE1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIjtcclxuXHJcbi8vU2VydmljZXNcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERldmljZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuLy9CYXJyYVxyXG5pbXBvcnQgKiBhcyBwcm9ncmVzc01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wcm9ncmVzc1wiO1xyXG5pbXBvcnQgeyBQcm9ncmVzcyB9IGZyb20gXCJ1aS9wcm9ncmVzc1wiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1zeW5jXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zeW5jLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vc3luYy5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3luY0NvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgYWRkcmVzcyA9IHRydWU7XHJcbiAgICBwdWJsaWMgY3VzdG9tZXJzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBjdXN0b21lclNhbGVzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpbWFnZXMgPSB0cnVlO1xyXG4gICAgcHVibGljIGludmVudG9yeSA9IHRydWU7XHJcbiAgICBwdWJsaWMgcHJvZHVjdHMgPSB0cnVlO1xyXG4gICAgcHVibGljIHB1cmNoYXNlT3JkZXJzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzYWxlc09yZGVySGlzdG9yeSA9IHRydWU7XHJcbiAgICBwdWJsaWMgc2NhbkZvcmNlID0gdHJ1ZTtcclxuICAgIHB1YmxpYyB1c2VycyA9IHRydWU7XHJcbiAgICBwdWJsaWMgdGVybXNDb2RlID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBqc29uOiBhbnk7XHJcbiAgICBwdWJsaWMgb3B0aW9uczogYW55O1xyXG4gICAgcHVibGljIGRhdGVVcGRhdGVkOiBhbnk7XHJcbiAgICBwdWJsaWMgc3luY1NjcmVlbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgbG9hZGluZ1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHJlZnJlc2hCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHByb2dyZXNzVmFsdWUgPSAwO1xyXG4gICAgcHVibGljIHN0YXR1czogc3RyaW5nID0gXCJEb3dubG9hZGluZy4uLlwiO1xyXG4gICAgcHVibGljIHRlc3Q6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZGV2aWNlU2VydmljZTogRGV2aWNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2U6IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfdGVybXNDb2RlU2VydmljZTogVGVybXNDb2RlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFkZHJlc3NcIixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2Uuc2V0U2hpcHBpbmdBZGRyZXNzRG9jLmJpbmQodGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiQ3VzdG9tZXJzXCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9jdXN0b21lclNlcnZpY2Uuc2V0Q3VzdG9tZXJEb2N1bWVudC5iaW5kKHRoaXMuX2N1c3RvbWVyU2VydmljZSksXHJcbiAgICAgICAgICAgIH0sLypcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwiSW1hZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5kZWZhdWx0KCksXHJcbiAgICAgICAgICAgICAgICB9LCovXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiSW52ZW50b3J5XCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLnNldEludmVudG9yaWVzRG9jLmJpbmQodGhpcy5faW52ZW50b3J5U2VydmljZSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiUHJvZHVjdHNcIixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnNldFByb2R1Y3REb2N1bWVudC5iaW5kKHRoaXMuX3Byb2R1Y3RTZXJ2aWNlKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJVc2Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fdXNlclNlcnZpY2Uuc2V0VXNlckRvY3VtZW50LmJpbmQodGhpcy5fdXNlclNlcnZpY2UpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlRlcm1zIENvZGVcIixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2Uuc2V0VGVybXNDb2RlRG9jLmJpbmQodGhpcy5fdGVybXNDb2RlU2VydmljZSksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIHB1YmxpYyBwcm9ncmVzcygpe1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDI1O1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlICs9IDE7XHJcbiAgICAgICAgfSwzMDApO1xyXG4gICAgfSovXHJcblxyXG4gICAgb25WYWx1ZUNoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBwcm9ncmVzc0JhciA9IDxQcm9ncmVzcz5hcmdzLm9iamVjdDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlIGNoYW5nZWQgZm9yIFwiICsgcHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IHZhbHVlOiBcIiArIHByb2dyZXNzQmFyLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3dpdGNoKGluZGV4OiBhbnkpIHtcclxuICAgICAgICAvL3RoaXMub3B0aW9uc1tpbmRleF1bb3B0aW9uXS5zdGF0dXMgPSAhdGhpcy5vcHRpb25zW2luZGV4XVtvcHRpb25dLnN0YXR1cztcclxuICAgICAgICB0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cztcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaCgpIHtcclxuICAgICAgICB0aGlzLnN5bmNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB2YXIgaiA9IDA7XHJcbiAgICAgICAgdmFyIHBhcnQgPSAwO1xyXG4gICAgICAgIHZhciByZXMgPSAwO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXAob3B0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbi5zdGF0dXMpXHJcbiAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcGFydCA9IDEwMCAvIGo7XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXAoYXN5bmMgKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgb3B0aW9uLnNlcnZpY2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSArPSBwYXJ0O1xyXG4gICAgICAgICAgICAgICAgcmVzID0gMTAwIC8gdGhpcy5wcm9ncmVzc1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIkRvd25sb2FkZWRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGVVcGRhdGVkID0gZGF0ZS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0ZVVwZGF0ZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlcHQoKSB7XHJcbiAgICAgICAgdGhpcy5zeW5jU2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hCdXR0b24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRJbWFnZXMoKSB7XHJcbiAgICAgICAgbGV0IHByb2R1Y3RzID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIilbXCJwcm9kdWN0XCJdO1xyXG4gICAgICAgIGF3YWl0IHByb2R1Y3RzLm1hcChhc3luYyBwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZG93bmxvYWRJbWFnZShwcm9kdWN0Lkl0ZW1Db2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==