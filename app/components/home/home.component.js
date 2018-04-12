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
        this.avgAmount = this.totalAmount == 0 ? 0 : (this.totalAmount / this.unsetTransactions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxzRUFBb0U7QUFXcEU7SUFPSSx1QkFBb0IsaUJBQW1DO1FBQW5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFKaEQsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFHM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFJLGlCQUFpQixDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxrQ0FBVSxHQUFqQjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7WUFDakMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO2dCQUMxQixLQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFyQlEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FTeUMsb0NBQWdCO09BUDlDLGFBQWEsQ0FzQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgU2FsZU9yZGVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2FsZU9yZGVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgRGVjaW1hbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1ob21lXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vaG9tZS5jb21wb25lbnQuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudHtcblxuICAgIHByaXZhdGUgdXNlclRyYW5zYWN0aW9uczogU2FsZU9yZGVyW107XG4gICAgcHVibGljIHVuc2V0VHJhbnNhY3Rpb25zOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBhdmdBbW91bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHRvdGFsQW1vdW50OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSl7XG4gICAgICAgIHRoaXMudXNlclRyYW5zYWN0aW9ucyA9ICBfc2FsZU9yZGVyU2VydmljZS5nZXRVbnNhdmVkVXNlclRyYW5zYWN0aW9ucygpO1xuICAgICAgICB0aGlzLnVuc2V0VHJhbnNhY3Rpb25zID0gdGhpcy51c2VyVHJhbnNhY3Rpb25zLmxlbmd0aDtcbiAgICAgICAgdGhpcy5nZXRBbW91bnRzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFtb3VudHMoKXtcbiAgICAgICAgdGhpcy51c2VyVHJhbnNhY3Rpb25zLm1hcCh0cmFuc2FjdGlvbiA9PiB7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5EZXRhaWwubWFwKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxBbW91bnQgKz0gcHJvZHVjdC5xdWFudGl0eVByaWNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXZnQW1vdW50ID0gdGhpcy50b3RhbEFtb3VudCA9PSAwID8gMCA6ICh0aGlzLnRvdGFsQW1vdW50IC8gdGhpcy51bnNldFRyYW5zYWN0aW9ucyk7XG4gICAgfVxufSJdfQ==