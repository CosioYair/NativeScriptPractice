"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var server_config_1 = require("../../config/server.config");
var saleOrder_service_1 = require("../../services/saleOrder.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_saleOrderService) {
        this._saleOrderService = _saleOrderService;
        this.unsetTransactions = 0;
        this.avgAmount = 0;
        this.totalAmount = 0;
        this.userTransactions = _saleOrderService.getUnsavedUserTransactions();
        this.unsetTransactions = this.userTransactions.length;
        this.userName = server_config_1.SERVER.user["UserName"];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUUxQyw0REFBb0Q7QUFDcEQsc0VBQW9FO0FBV3BFO0lBUUksdUJBQW9CLGlCQUFtQztRQUFuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBTGhELHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBSTNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxpQkFBaUIsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ3hFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsc0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxrQ0FBVSxHQUFqQjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7WUFDakMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO2dCQUMxQixLQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUF2QlEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FVeUMsb0NBQWdCO09BUjlDLGFBQWEsQ0F3QnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgU2FsZU9yZGVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2FsZU9yZGVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgRGVjaW1hbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1ob21lXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vaG9tZS5jb21wb25lbnQuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudHtcblxuICAgIHByaXZhdGUgdXNlclRyYW5zYWN0aW9uczogU2FsZU9yZGVyW107XG4gICAgcHVibGljIHVuc2V0VHJhbnNhY3Rpb25zOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBhdmdBbW91bnQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHRvdGFsQW1vdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyB1c2VyTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSl7XG4gICAgICAgIHRoaXMudXNlclRyYW5zYWN0aW9ucyA9ICBfc2FsZU9yZGVyU2VydmljZS5nZXRVbnNhdmVkVXNlclRyYW5zYWN0aW9ucygpO1xuICAgICAgICB0aGlzLnVuc2V0VHJhbnNhY3Rpb25zID0gdGhpcy51c2VyVHJhbnNhY3Rpb25zLmxlbmd0aDtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IFNFUlZFUi51c2VyW1wiVXNlck5hbWVcIl07XG4gICAgICAgIHRoaXMuZ2V0QW1vdW50cygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbW91bnRzKCl7XG4gICAgICAgIHRoaXMudXNlclRyYW5zYWN0aW9ucy5tYXAodHJhbnNhY3Rpb24gPT4ge1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24uRGV0YWlsLm1hcChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQW1vdW50ICs9IHByb2R1Y3QucXVhbnRpdHlQcmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmF2Z0Ftb3VudCA9IHRoaXMudG90YWxBbW91bnQgPT0gMCA/IDAgOiAodGhpcy50b3RhbEFtb3VudCAvIHRoaXMudW5zZXRUcmFuc2FjdGlvbnMpO1xuICAgIH1cbn0iXX0=