"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../../services/item.service");
var SyncComponent = /** @class */ (function () {
    function SyncComponent(_productService) {
        this._productService = _productService;
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
        __metadata("design:paramtypes", [item_service_1.ProductService])
    ], SyncComponent);
    return SyncComponent;
}());
exports.SyncComponent = SyncComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeW5jLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUUxQyw0REFBNkQ7QUFTN0Q7SUFlSSx1QkFBb0IsZUFBK0I7UUFBL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBZDVDLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFLcEIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNQLEVBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFLElBQUk7YUFDZjtZQUNEO2dCQUNJLEVBQUUsRUFBQyxDQUFDO2dCQUNKLElBQUksRUFBRSxXQUFXO2dCQUNqQixNQUFNLEVBQUUsSUFBSTthQUNmO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFDLENBQUM7Z0JBQ0osSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsTUFBTSxFQUFFLElBQUk7YUFDZjtZQUNEO2dCQUNJLEVBQUUsRUFBQyxDQUFDO2dCQUNKLElBQUksRUFBQyxRQUFRO2dCQUNiLE1BQU0sRUFBQyxJQUFJO2FBQ2Q7WUFDRDtnQkFDSSxFQUFFLEVBQUMsQ0FBQztnQkFDSixJQUFJLEVBQUMsV0FBVztnQkFDaEIsTUFBTSxFQUFDLElBQUk7YUFDZDtZQUNEO2dCQUNJLEVBQUUsRUFBQyxDQUFDO2dCQUNKLElBQUksRUFBQyxVQUFVO2dCQUNmLE1BQU0sRUFBQyxJQUFJO2FBQ2Q7WUFDRDtnQkFDSSxFQUFFLEVBQUMsQ0FBQztnQkFDSixJQUFJLEVBQUMsa0JBQWtCO2dCQUN2QixNQUFNLEVBQUMsSUFBSTthQUNkO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFDLENBQUM7Z0JBQ0osSUFBSSxFQUFDLHNCQUFzQjtnQkFDM0IsTUFBTSxFQUFDLElBQUk7YUFDZDtZQUNEO2dCQUNJLEVBQUUsRUFBQyxDQUFDO2dCQUNKLElBQUksRUFBQyxZQUFZO2dCQUNqQixNQUFNLEVBQUMsSUFBSTthQUNkO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFDLENBQUM7Z0JBQ0osSUFBSSxFQUFDLE9BQU87Z0JBQ1osTUFBTSxFQUFDLElBQUk7YUFDZDtZQUNEO2dCQUNJLEVBQUUsRUFBQyxFQUFFO2dCQUNMLElBQUksRUFBQyxZQUFZO2dCQUNqQixNQUFNLEVBQUMsSUFBSTthQUNkO1NBQ1IsQ0FBQztJQUNOLENBQUM7SUFHTSw4QkFBTSxHQUFiLFVBQWMsRUFBTztRQUNqQiwyRUFBMkU7UUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUlNLCtCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxVQUFBLE1BQU07WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsSUFBSSxHQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUEzRlEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FpQnVDLDZCQUFjO09BZjFDLGFBQWEsQ0E0RnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTVGRCxJQTRGQztBQTVGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIHN3aXRjaE1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXN5bmNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3N5bmMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zeW5jLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTeW5jQ29tcG9uZW50e1xyXG4gICAgcHVibGljIGFkZHJlc3MgPSB0cnVlO1xyXG4gICAgcHVibGljIGN1c3RvbWVycyA9IHRydWU7XHJcbiAgICBwdWJsaWMgY3VzdG9tZXJTYWxlcyA9IHRydWU7XHJcbiAgICBwdWJsaWMgaW1hZ2VzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpbnZlbnRvcnkgPSB0cnVlO1xyXG4gICAgcHVibGljIHByb2R1Y3RzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBwdXJjaGFzZU9yZGVycyA9IHRydWU7XHJcbiAgICBwdWJsaWMgc2FsZXNPcmRlckhpc3RvcnkgPSB0cnVlO1xyXG4gICAgcHVibGljIHNjYW5Gb3JjZSA9IHRydWU7XHJcbiAgICBwdWJsaWMgdXNlcnMgPSB0cnVlO1xyXG4gICAgcHVibGljIHRlcm1zQ29kZSA9IHRydWU7XHJcbiAgICBwdWJsaWMganNvbiA6IGFueTtcclxuICAgIHB1YmxpYyBvcHRpb25zOmFueTtcclxuICAgIHB1YmxpYyBkYXRlVXBkYXRlZDphbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2Upe1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtcclxuICAgICAgICAgICAgICAgIHsgICBpZDogMCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFkZHJlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjEsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJDdXN0b21lcnNcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6MixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkN1c3RvbWVycyBTYWxlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDozLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJJbWFnZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDo0LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJJbnZlbnRvcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDo1LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJQcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjYsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIlB1cmNoYXJzZSBPcmRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDo3LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJTYWxlcyBPcmRlcnMgSHlzdG9yeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjgsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIlNjYW4gRm9yY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDo5LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJVc2Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czp0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOjEwLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJUZXJtcyBDb2RlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOnRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3dpdGNoKGlkOiBhbnkpe1xyXG4gICAgICAgIC8vdGhpcy5vcHRpb25zW2luZGV4XVtvcHRpb25dLnN0YXR1cyA9ICF0aGlzLm9wdGlvbnNbaW5kZXhdW29wdGlvbl0uc3RhdHVzO1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1tpZF0uc3RhdHVzID0gIXRoaXMub3B0aW9uc1tpZF0uc3RhdHVzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9uc1tpZF0uc3RhdHVzKTtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG4gICAgcHVibGljIHJlZnJlc2goKXtcclxuICAgICAgICB0aGlzLm9wdGlvbnMubWFwKCBvcHRpb24gPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbi5pZCtcIl9fX1wiK29wdGlvbi5uYW1lK1wiX19fXCIrb3B0aW9uLnN0YXR1cyk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVVwZGF0ZWQgPSBkYXRlLnRvRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0ZVVwZGF0ZWQpO1xyXG4gICAgfVxyXG59Il19