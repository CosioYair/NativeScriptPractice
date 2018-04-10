"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var saleOrder_service_1 = require("../../services/saleOrder.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_saleOrderService) {
        this._saleOrderService = _saleOrderService;
        this.unsetTransactions = 0;
        this.avgAmount = 0;
        this.totalAmount = 0;
        this.userTransactions = _saleOrderService.getUnsavedUserTransactions();
        this.unsetTransactions = this.userTransactions.length;
        this.getAmounts();
    }
    HomeComponent.prototype.getAmounts = function () {
        var _this = this;
        this.userTransactions.map(function (transaction) {
            transaction.Detail.map(function (product) {
                _this.totalAmount += product.quantityPrice;
            });
        });
        this.avgAmount = this.totalAmount / this.unsetTransactions;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "ns-home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.css"]
        }),
        __metadata("design:paramtypes", [saleOrder_service_1.SaleOrderService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxzRUFBb0U7QUFXcEU7SUFPSSx1QkFBb0IsaUJBQW1DO1FBQW5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFKaEQsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFHM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFJLGlCQUFpQixDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxrQ0FBVSxHQUFqQjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7WUFDakMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO2dCQUMxQixLQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDL0QsQ0FBQztJQXJCUSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDO3lDQVN5QyxvQ0FBZ0I7T0FQOUMsYUFBYSxDQXNCekI7SUFBRCxvQkFBQztDQUFBLEFBdEJELElBc0JDO0FBdEJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NhbGVPcmRlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGVjaW1hbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1ob21lXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vaG9tZS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudHtcclxuXHJcbiAgICBwcml2YXRlIHVzZXJUcmFuc2FjdGlvbnM6IFNhbGVPcmRlcltdO1xyXG4gICAgcHVibGljIHVuc2V0VHJhbnNhY3Rpb25zOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGF2Z0Ftb3VudDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB0b3RhbEFtb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYWxlT3JkZXJTZXJ2aWNlOiBTYWxlT3JkZXJTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnVzZXJUcmFuc2FjdGlvbnMgPSAgX3NhbGVPcmRlclNlcnZpY2UuZ2V0VW5zYXZlZFVzZXJUcmFuc2FjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnVuc2V0VHJhbnNhY3Rpb25zID0gdGhpcy51c2VyVHJhbnNhY3Rpb25zLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmdldEFtb3VudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QW1vdW50cygpe1xyXG4gICAgICAgIHRoaXMudXNlclRyYW5zYWN0aW9ucy5tYXAodHJhbnNhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5EZXRhaWwubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEFtb3VudCArPSBwcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmF2Z0Ftb3VudCA9IHRoaXMudG90YWxBbW91bnQgLyB0aGlzLnVuc2V0VHJhbnNhY3Rpb25zO1xyXG4gICAgfVxyXG59Il19