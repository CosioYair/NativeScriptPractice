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
    SyncComponent.prototype.defaultFunction = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFDaEUsNERBQTBEO0FBSTFELHNFQUFvRTtBQVVwRTtJQXFCSSx1QkFDWSxlQUErQixFQUMvQixnQkFBaUMsRUFDakMsY0FBNkIsRUFDN0IsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLFlBQXlCO1FBUHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUE1QjlCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFJakIsZUFBVSxHQUFZLElB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Z0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3RDLENBQUM7eUNBd0IrQiw2QkFBYztZQUNiLGtDQUFlO1lBQ2pCLDhCQUFhO1lBQ1Ysb0NBQWdCO1lBQ1YsZ0RBQXNCO1lBQzVCLGdDQUFnQjtZQUNoQixvQ0FBZ0I7WUFDckIsMEJBQVc7T0E3QjVCLGFBQWEsQ0EwSXpCO0lBQUQsb0JBQUM7Q0FBQSxBQTFJRCxJQTBJQztBQTFJWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBzd2l0Y2hNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3dpdGNoXCI7XG5cbi8vU2VydmljZXNcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IERldmljZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcHBpbmdBZGRyZXNzLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG4vL0JhcnJhXG5pbXBvcnQgKiBhcyBwcm9ncmVzc01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wcm9ncmVzc1wiO1xuaW1wb3J0IHsgUHJvZ3Jlc3MgfSBmcm9tIFwidWkvcHJvZ3Jlc3NcIjtcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1zeW5jXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3N5bmMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vc3luYy5jb21wb25lbnQuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgU3luY0NvbXBvbmVudCB7XG4gICAgcHVibGljIGFkZHJlc3MgPSB0cnVlO1xuICAgIHB1YmxpYyBjdXN0b21lcnMgPSB0cnVlO1xuICAgIHB1YmxpYyBjdXN0b21lclNhbGVzID0gdHJ1ZTtcbiAgICBwdWJsaWMgaW1hZ2VzID0gdHJ1ZTtcbiAgICBwdWJsaWMgaW52ZW50b3J5ID0gdHJ1ZTtcbiAgICBwdWJsaWMgcHJvZHVjdHMgPSB0cnVlO1xuICAgIHB1YmxpYyBwdXJjaGFzZU9yZGVycyA9IHRydWU7XG4gICAgcHVibGljIHNhbGVzT3JkZXJIaXN0b3J5ID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2NhbkZvcmNlID0gdHJ1ZTtcbiAgICBwdWJsaWMgdXNlcnMgPSB0cnVlO1xuICAgIHB1YmxpYyB0ZXJtc0NvZGUgPSB0cnVlO1xuICAgIHB1YmxpYyBqc29uOiBhbnk7XG4gICAgcHVibGljIG9wdGlvbnM6IGFueTtcbiAgICBwdWJsaWMgZGF0ZVVwZGF0ZWQ6IGFueTtcbiAgICBwdWJsaWMgc3luY1NjcmVlbjogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGxvYWRpbmdTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgYnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHJlZnJlc2hCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBwcm9ncmVzc1ZhbHVlID0gMDtcbiAgICBwdWJsaWMgc3RhdHVzOiBzdHJpbmcgPSBcIkRvd25sb2FkaW5nLi4uXCI7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2RldmljZVNlcnZpY2U6IERldmljZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2ludmVudG9yeVNlcnZpY2U6IEludmVudG9yeVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2U6IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3Rlcm1zQ29kZVNlcnZpY2U6IFRlcm1zQ29kZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2Uuc2V0U2hpcHBpbmdBZGRyZXNzRG9jLmJpbmQodGhpcy5fc2hpcHBpbmdBZGRyZXNzU2VydmljZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiQ3VzdG9tZXJzXCIsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX2N1c3RvbWVyU2VydmljZS5zZXRDdXN0b21lckRvY3VtZW50LmJpbmQodGhpcy5fY3VzdG9tZXJTZXJ2aWNlKSxcbiAgICAgICAgICAgIH0sLypcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJJbWFnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOnRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuZGVmYXVsdCgpLFxuICAgICAgICAgICAgICAgIH0sKi9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkludmVudG9yeVwiLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiB0aGlzLl9pbnZlbnRvcnlTZXJ2aWNlLnNldEludmVudG9yaWVzRG9jLmJpbmQodGhpcy5faW52ZW50b3J5U2VydmljZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiUHJvZHVjdHNcIixcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VydmljZTogdGhpcy5fcHJvZHVjdFNlcnZpY2Uuc2V0UHJvZHVjdERvY3VtZW50LmJpbmQodGhpcy5fcHJvZHVjdFNlcnZpY2UpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlVzZXJzXCIsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3VzZXJTZXJ2aWNlLnNldFVzZXJEb2N1bWVudC5iaW5kKHRoaXMuX3VzZXJTZXJ2aWNlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJUZXJtcyBDb2RlXCIsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMuX3Rlcm1zQ29kZVNlcnZpY2Uuc2V0VGVybXNDb2RlRG9jLmJpbmQodGhpcy5fdGVybXNDb2RlU2VydmljZSksXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKSA9PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICB9XG5cbiAgICAvKlxuICAgIHB1YmxpYyBwcm9ncmVzcygpe1xuICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgPSAyNTtcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1ZhbHVlICs9IDE7XG4gICAgICAgIH0sMzAwKTtcbiAgICB9Ki9cblxuICAgIG9uVmFsdWVDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgbGV0IHByb2dyZXNzQmFyID0gPFByb2dyZXNzPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhbHVlIGNoYW5nZWQgZm9yIFwiICsgcHJvZ3Jlc3NCYXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5ldyB2YWx1ZTogXCIgKyBwcm9ncmVzc0Jhci52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN3aXRjaChpbmRleDogYW55KSB7XG4gICAgICAgIC8vdGhpcy5vcHRpb25zW2luZGV4XVtvcHRpb25dLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdW29wdGlvbl0uc3RhdHVzO1xuICAgICAgICB0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdLnN0YXR1cztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5vcHRpb25zW2luZGV4XS5zdGF0dXMpO1xuICAgIH1cblxuXG5cbiAgICBwdWJsaWMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5zeW5jU2NyZWVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9hZGluZ1NjcmVlbiA9IHRydWU7XG4gICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvbiA9IGZhbHNlO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBqID0gMDtcbiAgICAgICAgdmFyIHBhcnQgPSAwO1xuICAgICAgICB2YXIgcmVzID0gMDtcbiAgICAgICAgdGhpcy5vcHRpb25zLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zdGF0dXMpXG4gICAgICAgICAgICAgICAgaisrO1xuICAgICAgICB9KVxuXG4gICAgICAgIHBhcnQgPSAxMDAgLyBqO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXAoYXN5bmMgKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBvcHRpb24uc2VydmljZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSArPSBwYXJ0O1xuICAgICAgICAgICAgICAgIHJlcyA9IDEwMCAvIHRoaXMucHJvZ3Jlc3NWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAocmVzIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwiRG93bmxvYWRlZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuZGF0ZVVwZGF0ZWQgPSBkYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0ZVVwZGF0ZWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXJ0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWNjZXB0KCkge1xuICAgICAgICB0aGlzLnN5bmNTY3JlZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmxvYWRpbmdTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVmYXVsdEZ1bmN0aW9uKCkge1xuXG4gICAgfVxufSJdfQ==