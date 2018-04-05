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
var SyncComponent = /** @class */ (function () {
    function SyncComponent(_productService, _customerService, _deviceService, _inventoryService, _shippingAddressService, _termsCodeService) {
        this._productService = _productService;
        this._customerService = _customerService;
        this._deviceService = _deviceService;
        this._inventoryService = _inventoryService;
        this._shippingAddressService = _shippingAddressService;
        this._termsCodeService = _termsCodeService;
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
        this.options = [
            { id: 0,
                name: "Address",
                status: true,
            },
            {
                id: 1,
                name: "Customers",
                status: true
            },
            {
                id: 2,
                name: "Customers Sales",
                status: true
            },
            {
                id: 3,
                name: "Images",
                status: true
            },
            {
                id: 4,
                name: "Inventory",
                status: true
            },
            {
                id: 5,
                name: "Products",
                status: true
            },
            {
                id: 6,
                name: "Purcharse Orders",
                status: true
            },
            {
                id: 7,
                name: "Sales Orders Hystory",
                status: true
            },
            {
                id: 8,
                name: "Scan Force",
                status: true
            },
            {
                id: 9,
                name: "Users",
                status: true
            },
            {
                id: 10,
                name: "Terms Code",
                status: true
            }
        ];
    }
    SyncComponent.prototype.switch = function (id) {
        //this.options[index][option].status = !this.options[index][option].status;
        this.options[id].status = !this.options[id].status;
        console.log(this.options[id].status);
    };
    SyncComponent.prototype.refresh = function () {
        this.options.map(function (option) {
            console.log(option.id + "___" + option.name + "___" + option.status);
        });
        var date = new Date();
        this.dateUpdated = date.toDateString();
        console.log(this.dateUpdated);
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
            terms_service_1.TermsCodeService])
    ], SyncComponent);
    return SyncComponent;
}());
exports.SyncComponent = SyncComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxVQUFVO0FBQ1YsNERBQTZEO0FBQzdELG9FQUFrRTtBQUNsRSxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiw4REFBZ0U7QUFVaEU7SUFlSSx1QkFDWSxlQUErQixFQUMvQixnQkFBaUMsRUFDakMsY0FBNkIsRUFDN0IsaUJBQW1DLEVBQ25DLHVCQUErQyxFQUMvQyxpQkFBbUM7UUFMbkMsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFwQnhDLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFZcEIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNQLEVBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFLElBQUk7YUFDZjtZQUNEO2dCQUNJLEVBQUUsRUFBQyxDQUFDO2dCQUNKLElBQUksRUFBRSxXQUFXO2dCQUNqQixNQUFNLEVBQUUsSUFBSTthQUNmO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFDLENBQUM7Z0JBQ0osSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsTUFBTSxFQUFFLElBQUk7YUFDZjtZQUNEO2dCQUNJLEVBQUUsRUFBQyxDQUFDO2dCQUNKLElBQUksRUFBQyxRQUFRO2dCQUNiLE1BQU0sRUFBQyxJQUFJO2FBQ2Q7WUFDRDtnQkFDSSxFQUFFLEVBQUMsQ0FBQztnQkFDSixJQUFJLEVBQUMsV0FBVztnQkFDaEIsTUFBTSxFQUFDLElBQUk7YUFDZDtZQUNEO2dCQUNJLEVBQUUsRUFBQyxDQUFDO2dCQUNKLElBQUksRUFBQyxVQUFVO2dCQUNmLE1BQU0sRUFBQyxJQUFJO2FBQ2Q7WUFDRDtnQkFDSSxFQUFFLEVBQUMsQ0FBQztnQkFDSixJQUFJLEVBQUMsa0JBQWtCO2dCQUN2QixNQUFNLEVBQUMsSUFBSTthQUNkO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFDLENBQUM7Z0JBQ0osSUFBSSxFQUFDLHNCQUFzQjtnQkFDM0IsTUFBTSxFQUFDLElBQUk7YUFDZDtZQUNEO2dCQUNJLEVBQUUsRUFBQyxDQUFDO2dCQUNKLElBQUksRUFBQyxZQUFZO2dCQUNqQixNQUFNLEVBQUMsSUFBSTthQUNkO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFDLENBQUM7Z0JBQ0osSUFBSSxFQUFDLE9BQU87Z0JBQ1osTUFBTSxFQUFDLElBQUk7YUFDZDtZQUNEO2dCQUNJLEVBQUUsRUFBQyxFQUFFO2dCQUNMLElBQUksRUFBQyxZQUFZO2dCQUNqQixNQUFNLEVBQUMsSUFBSTthQUNkO1NBQ1IsQ0FBQztJQUNOLENBQUM7SUFHTSw4QkFBTSxHQUFiLFVBQWMsRUFBTztRQUNqQiwyRUFBMkU7UUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUlNLCtCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxVQUFBLE1BQU07WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsSUFBSSxHQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFsR1EsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FrQitCLDZCQUFjO1lBQ2Isa0NBQWU7WUFDakIsOEJBQWE7WUFDVixvQ0FBZ0I7WUFDVixnREFBc0I7WUFDNUIsZ0NBQWdCO09BckJ0QyxhQUFhLENBbUd6QjtJQUFELG9CQUFDO0NBQUEsQUFuR0QsSUFtR0M7QUFuR1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBzd2l0Y2hNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3dpdGNoXCI7XHJcblxyXG4vL1NlcnZpY2VzXHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RldmljZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xyXG5pbXBvcnQgeyBUZXJtc0NvZGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Rlcm1zLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXN5bmNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3N5bmMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zeW5jLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTeW5jQ29tcG9uZW50e1xyXG4gICAgcHVibGljIGFkZHJlc3MgPSB0cnVlO1xyXG4gICAgcHVibGljIGN1c3RvbWVycyA9IHRydWU7XHJcbiAgICBwdWJsaWMgY3VzdG9tZXJTYWxlcyA9IHRydWU7XHJcbiAgICBwdWJsaWMgaW1hZ2VzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpbnZlbnRvcnkgPSB0cnVlO1xyXG4gICAgcHVibGljIHByb2R1Y3RzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBwdXJjaGFzZU9yZGVycyA9IHRydWU7XHJcbiAgICBwdWJsaWMgc2FsZXNPcmRlckhpc3RvcnkgPSB0cnVlO1xyXG4gICAgcHVibGljIHNjYW5Gb3JjZSA9IHRydWU7XHJcbiAgICBwdWJsaWMgdXNlcnMgPSB0cnVlO1xyXG4gICAgcHVibGljIHRlcm1zQ29kZSA9IHRydWU7XHJcbiAgICBwdWJsaWMganNvbiA6IGFueTtcclxuICAgIHB1YmxpYyBvcHRpb25zOmFueTtcclxuICAgIHB1YmxpYyBkYXRlVXBkYXRlZDphbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZGV2aWNlU2VydmljZTogRGV2aWNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9pbnZlbnRvcnlTZXJ2aWNlOiBJbnZlbnRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc1NlcnZpY2U6IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfdGVybXNDb2RlU2VydmljZTogVGVybXNDb2RlU2VydmljZSxcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW1xyXG4gICAgICAgICAgICAgICAgeyAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6MSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkN1c3RvbWVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDoyLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQ3VzdG9tZXJzIFNhbGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjMsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIkltYWdlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjQsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIkludmVudG9yeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIlByb2R1Y3RzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOnRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6NixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwiUHVyY2hhcnNlIE9yZGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIlNhbGVzIE9yZGVycyBIeXN0b3J5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOnRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6OCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwiU2NhbiBGb3JjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIlVzZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOnRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6MTAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIlRlcm1zIENvZGVcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzd2l0Y2goaWQ6IGFueSl7XHJcbiAgICAgICAgLy90aGlzLm9wdGlvbnNbaW5kZXhdW29wdGlvbl0uc3RhdHVzID0gIXRoaXMub3B0aW9uc1tpbmRleF1bb3B0aW9uXS5zdGF0dXM7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zW2lkXS5zdGF0dXMgPSAhdGhpcy5vcHRpb25zW2lkXS5zdGF0dXM7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5vcHRpb25zW2lkXS5zdGF0dXMpO1xyXG4gICAgfVxyXG5cclxuICBcclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaCgpe1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXAoIG9wdGlvbiA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2cob3B0aW9uLmlkK1wiX19fXCIrb3B0aW9uLm5hbWUrXCJfX19cIitvcHRpb24uc3RhdHVzKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5kYXRlVXBkYXRlZCA9IGRhdGUudG9EYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRlVXBkYXRlZCk7XHJcbiAgICB9XHJcbn0iXX0=