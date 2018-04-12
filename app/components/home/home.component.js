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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUcxQyxzRUFBb0U7QUFXcEU7SUFPSSx1QkFBb0IsaUJBQW1DO1FBQW5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFKaEQsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFHM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFJLGlCQUFpQixDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxrQ0FBVSxHQUFqQjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7WUFDakMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO2dCQUMxQixLQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFyQlEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FTeUMsb0NBQWdCO09BUDlDLGFBQWEsQ0FzQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtaG9tZVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2hvbWUuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnR7XHJcblxyXG4gICAgcHJpdmF0ZSB1c2VyVHJhbnNhY3Rpb25zOiBTYWxlT3JkZXJbXTtcclxuICAgIHB1YmxpYyB1bnNldFRyYW5zYWN0aW9uczogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhdmdBbW91bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdG90YWxBbW91bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSl7XHJcbiAgICAgICAgdGhpcy51c2VyVHJhbnNhY3Rpb25zID0gIF9zYWxlT3JkZXJTZXJ2aWNlLmdldFVuc2F2ZWRVc2VyVHJhbnNhY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy51bnNldFRyYW5zYWN0aW9ucyA9IHRoaXMudXNlclRyYW5zYWN0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5nZXRBbW91bnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFtb3VudHMoKXtcclxuICAgICAgICB0aGlzLnVzZXJUcmFuc2FjdGlvbnMubWFwKHRyYW5zYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgdHJhbnNhY3Rpb24uRGV0YWlsLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxBbW91bnQgKz0gcHJvZHVjdC5xdWFudGl0eVByaWNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5hdmdBbW91bnQgPSB0aGlzLnRvdGFsQW1vdW50ID09IDAgPyAwIDogKHRoaXMudG90YWxBbW91bnQgLyB0aGlzLnVuc2V0VHJhbnNhY3Rpb25zKTtcclxuICAgIH1cclxufSJdfQ==