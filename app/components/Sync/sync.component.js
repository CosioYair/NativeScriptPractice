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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFDaEUsNERBQTBEO0FBSTFELHNFQUFvRTtBQVVwRTtJQTBCSSx1QkFDWSxlQUErQixFQUMvQixnQkFBaUMsRUFDakMsY0FBNkIsRUFDN0IsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLFlBQXlCO1FBUHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFqQzlCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFJakIsZUFBVSxHQUFZLElB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SUE5SlEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0E2QitCLDZCQUFjO1lBQ2Isa0NBQWU7WUFDakIsOEJBQWE7WUFDVixvQ0FBZ0I7WUFDVixnREFBc0I7WUFDNUIsZ0NBQWdCO1lBQ2hCLG9DQUFnQjtZQUNyQiwwQkFBVztPQWxDNUIsYUFBYSxDQStKekI7SUFBRCxvQkFBQztDQUFBLEFBL0pELElBK0pDO0FBL0pZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgc3dpdGNoTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N3aXRjaFwiO1xyXG5cclxuLy9TZXJ2aWNlc1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kZXZpY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcHBpbmdBZGRyZXNzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG4vL0JhcnJhXHJcbmltcG9ydCAqIGFzIHByb2dyZXNzTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb2dyZXNzXCI7XHJcbmltcG9ydCB7IFByb2dyZXNzIH0gZnJvbSBcInVpL3Byb2dyZXNzXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXN5bmNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3N5bmMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zeW5jLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTeW5jQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBhZGRyZXNzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBjdXN0b21lcnMgPSB0cnVlO1xyXG4gICAgcHVibGljIGN1c3RvbWVyU2FsZXMgPSB0cnVlO1xyXG4gICAgcHVibGljIGltYWdlcyA9IHRydWU7XHJcbiAgICBwdWJsaWMgaW52ZW50b3J5ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBwcm9kdWN0cyA9IHRydWU7XHJcbiAgICBwdWJsaWMgcHVyY2hhc2VPcmRlcnMgPSB0cnVlO1xyXG4gICAgcHVibGljIHNhbGVzT3JkZXJIaXN0b3J5ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzY2FuRm9yY2UgPSB0cnVlO1xyXG4gICAgcHVibGljIHVzZXJzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyB0ZXJtc0NvZGUgPSB0cnVlO1xyXG4gICAgcHVibGljIGpzb246IGFueTtcclxuICAgIHB1YmxpYyBvcHRpb25zOiBhbnk7XHJcbiAgICBwdWJsaWMgZGF0ZVVwZGF0ZWQ6IGFueTtcclxuICAgIHB1YmxpYyBzeW5jU2NyZWVuOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBsb2FkaW5nU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbG9hZGluZ0ltYWdlc1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHJlZnJlc2hCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHByb2dyZXNzVmFsdWUgPSAwO1xyXG4gICAgcHVibGljIHByb2dyZXNzSW1hZ2VWYWx1ZSA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdHVzOiBzdHJpbmcgPSBcIkRvd25sb2FkaW5nLi4uXCI7XHJcbiAgICBwdWJsaWMgdGVzdDogYW55O1xyXG4gICAgcHVibGljIGxlbmd0aEltYWdlczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZGV2aWNlU2VydmljZTogRGV2aWNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2U6IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfdGVybXNDb2RlU2VydmljZTogVGVybXNDb2RlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFkZHJlc3NcIixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2Uuc2V0U2hpcHBpbmdBZGRyZXNzRG9jLmJpbmQodGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiQ3VzdG9tZXJzXCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9jdXN0b21lclNlcnZpY2Uuc2V0Q3VzdG9tZXJEb2N1bWVudC5iaW5kKHRoaXMuX2N1c3RvbWVyU2VydmljZSksXHJcbiAgICAgICAgICAgIH0sLypcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwiSW1hZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5kZWZhdWx0KCksXHJcbiAgICAgICAgICAgICAgICB9LCovXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiSW52ZW50b3J5XCIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLnNldEludmVudG9yaWVzRG9jLmJpbmQodGhpcy5faW52ZW50b3J5U2VydmljZSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiUHJvZHVjdHNcIixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnNldFByb2R1Y3REb2N1bWVudC5iaW5kKHRoaXMuX3Byb2R1Y3RTZXJ2aWNlKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJVc2Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fdXNlclNlcnZpY2Uuc2V0VXNlckRvY3VtZW50LmJpbmQodGhpcy5fdXNlclNlcnZpY2UpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlRlcm1zIENvZGVcIixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2Uuc2V0VGVybXNDb2RlRG9jLmJpbmQodGhpcy5fdGVybXNDb2RlU2VydmljZSksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIHB1YmxpYyBwcm9ncmVzcygpe1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDI1O1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlICs9IDE7XHJcbiAgICAgICAgfSwzMDApO1xyXG4gICAgfSovXHJcblxyXG4gICAgb25WYWx1ZUNoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBwcm9ncmVzc0JhciA9IDxQcm9ncmVzcz5hcmdzLm9iamVjdDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlIGNoYW5nZWQgZm9yIFwiICsgcHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IHZhbHVlOiBcIiArIHByb2dyZXNzQmFyLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3dpdGNoKGluZGV4OiBhbnkpIHtcclxuICAgICAgICAvL3RoaXMub3B0aW9uc1tpbmRleF1bb3B0aW9uXS5zdGF0dXMgPSAhdGhpcy5vcHRpb25zW2luZGV4XVtvcHRpb25dLnN0YXR1cztcclxuICAgICAgICB0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cztcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpIHtcclxuICAgICAgICB0aGlzLnN5bmNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB2YXIgaiA9IDA7XHJcbiAgICAgICAgdmFyIHBhcnQgPSAwO1xyXG4gICAgICAgIHZhciByZXMgPSAwO1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMubWFwKG9wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24uc3RhdHVzKVxyXG4gICAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHBhcnQgPSAxMDAgLyBqO1xyXG5cclxuICAgICAgICB3aGlsZShjb3VudGVyIDwgdGhpcy5vcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zW2NvdW50ZXJdLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vcHRpb25zW2NvdW50ZXJdLnNlcnZpY2UoKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSArPSBwYXJ0O1xyXG4gICAgICAgICAgICAgICAgcmVzID0gMTAwIC8gdGhpcy5wcm9ncmVzc1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIkRvd25sb2FkZWRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVVwZGF0ZWQgPSBkYXRlLnRvRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5kYXRlVXBkYXRlZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFydCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjY2VwdCgpIHtcclxuICAgICAgICB0aGlzLnN5bmNTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlZnJlc2hJbWFnZXMoKSB7XHJcbiAgICAgICAgdGhpcy5zeW5jU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nSW1hZ2VzU2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcHJvZHVjdHMgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKVtcInByb2R1Y3RcIl07XHJcbiAgICAgICAgdGhpcy5sZW5ndGhJbWFnZXMgPSBwcm9kdWN0cy5sZW5ndGg7XHJcbiAgICAgICAgYXdhaXQgcHJvZHVjdHMubWFwKGFzeW5jIHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5yZW1vdmVJbWFnZShwcm9kdWN0Lkl0ZW1Db2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB3aGlsZSh0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZSA8IHByb2R1Y3RzLmxlbmd0aCkgeyBcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZG93bmxvYWRJbWFnZShwcm9kdWN0c1t0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZV0uSXRlbUNvZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzSW1hZ2VWYWx1ZSsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0ltYWdlVmFsdWUgPT0gcHJvZHVjdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwiRG93bmxvYWRlZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59Il19