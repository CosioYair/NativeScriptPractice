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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUUxQyw0REFBb0Q7QUFDcEQsc0VBQW9FO0FBV3BFO0lBUUksdUJBQW9CLGlCQUFtQztRQUFuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBTGhELHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBSTNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxpQkFBaUIsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ3hFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsc0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxrQ0FBVSxHQUFqQjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7WUFDakMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO2dCQUMxQixLQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUF2QlEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FVeUMsb0NBQWdCO09BUjlDLGFBQWEsQ0F3QnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaG9tZVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2hvbWUuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnR7XHJcblxyXG4gICAgcHJpdmF0ZSB1c2VyVHJhbnNhY3Rpb25zOiBTYWxlT3JkZXJbXTtcclxuICAgIHB1YmxpYyB1bnNldFRyYW5zYWN0aW9uczogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhdmdBbW91bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdG90YWxBbW91bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdXNlck5hbWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYWxlT3JkZXJTZXJ2aWNlOiBTYWxlT3JkZXJTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnVzZXJUcmFuc2FjdGlvbnMgPSAgX3NhbGVPcmRlclNlcnZpY2UuZ2V0VW5zYXZlZFVzZXJUcmFuc2FjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnVuc2V0VHJhbnNhY3Rpb25zID0gdGhpcy51c2VyVHJhbnNhY3Rpb25zLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnVzZXJOYW1lID0gU0VSVkVSLnVzZXJbXCJVc2VyTmFtZVwiXTtcclxuICAgICAgICB0aGlzLmdldEFtb3VudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QW1vdW50cygpe1xyXG4gICAgICAgIHRoaXMudXNlclRyYW5zYWN0aW9ucy5tYXAodHJhbnNhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICB0cmFuc2FjdGlvbi5EZXRhaWwubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEFtb3VudCArPSBwcm9kdWN0LnF1YW50aXR5UHJpY2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmF2Z0Ftb3VudCA9IHRoaXMudG90YWxBbW91bnQgPT0gMCA/IDAgOiAodGhpcy50b3RhbEFtb3VudCAvIHRoaXMudW5zZXRUcmFuc2FjdGlvbnMpO1xyXG4gICAgfVxyXG59Il19