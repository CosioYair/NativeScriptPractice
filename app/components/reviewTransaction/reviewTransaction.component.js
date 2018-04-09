"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var server_config_1 = require("../../config/server.config");
var router_1 = require("@angular/router");
var saleOrder_service_1 = require("../../services/saleOrder.service");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var ReviewTransactionComponent = /** @class */ (function () {
    function ReviewTransactionComponent(_router, _saleOrderService) {
        this._router = _router;
        this._saleOrderService = _saleOrderService;
        this.userTransaction = 0;
        this._sales = _saleOrderService.getUserSaleOrderUnsaved();
        this._quotes = _saleOrderService.getUserQuoteUnsaved();
        this.transactionList = new observable_array_1.ObservableArray(this._sales);
        this.userTransactions = ["Sales order", "Quotes"];
    }
    ReviewTransactionComponent.prototype.setUserTransaction = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.userTransaction == 0)
                _this.transactionList = new observable_array_1.ObservableArray(_this._sales);
            else
                _this.transactionList = new observable_array_1.ObservableArray(_this._quotes);
        }, 500);
    };
    ReviewTransactionComponent.prototype.editTransaction = function () {
        server_config_1.SERVER.editTransaction.edit = true;
        server_config_1.SERVER.editTransaction.transactionNo = "3b2471S-000002";
        this._router.navigate(['/saleOrder', this.selectedSaleOrder.CustomerNo, true]);
    };
    ReviewTransactionComponent = __decorate([
        core_1.Component({
            selector: "ns-reviewTransaction",
            moduleId: module.id,
            templateUrl: "./reviewTransaction.component.html",
        }),
        __metadata("design:paramtypes", [router_1.Router, saleOrder_service_1.SaleOrderService])
    ], ReviewTransactionComponent);
    return ReviewTransactionComponent;
}());
exports.ReviewTransactionComponent = ReviewTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDREQUFvRDtBQUNwRCwwQ0FBeUM7QUFFekMsc0VBQW9FO0FBQ3BFLDRGQUEwRjtBQVExRjtJQVNJLG9DQUFvQixPQUFlLEVBQVUsaUJBQW1DO1FBQTVELFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRnpFLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFlLENBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUV0RCxDQUFDO0lBRU0sdURBQWtCLEdBQXpCO1FBQUEsaUJBT0M7UUFORyxVQUFVLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFlLENBQVksS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZFLElBQUk7Z0JBQ0EsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFlLENBQVksS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTSxvREFBZSxHQUF0QjtRQUNJLHNCQUFNLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbkMsc0JBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBOUJRLDBCQUEwQjtRQU50QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG9DQUFvQztTQUNwRCxDQUFDO3lDQVcrQixlQUFNLEVBQTZCLG9DQUFnQjtPQVR2RSwwQkFBMEIsQ0ErQnRDO0lBQUQsaUNBQUM7Q0FBQSxBQS9CRCxJQStCQztBQS9CWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtcmV2aWV3VHJhbnNhY3Rpb25cIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jldmlld1RyYW5zYWN0aW9uLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUmV2aWV3VHJhbnNhY3Rpb25Db21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFNhbGVPcmRlcjogU2FsZU9yZGVyO1xyXG4gICAgcHJpdmF0ZSBfc2FsZXM6IFNhbGVPcmRlcltdO1xyXG4gICAgcHJpdmF0ZSBfcXVvdGVzOiBTYWxlT3JkZXJbXTtcclxuICAgIHB1YmxpYyB0cmFuc2FjdGlvbkxpc3Q6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyVHJhbnNhY3Rpb25zOiBhbnlbXTtcclxuICAgIHB1YmxpYyB1c2VyVHJhbnNhY3Rpb246IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9zYWxlcyA9IF9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCk7XHJcbiAgICAgICAgdGhpcy5fcXVvdGVzID0gX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclF1b3RlVW5zYXZlZCgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxTYWxlT3JkZXI+KHRoaXMuX3NhbGVzKTtcclxuICAgICAgICB0aGlzLnVzZXJUcmFuc2FjdGlvbnMgPSBbXCJTYWxlcyBvcmRlclwiLCBcIlF1b3Rlc1wiXTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFVzZXJUcmFuc2FjdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclRyYW5zYWN0aW9uID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8U2FsZU9yZGVyPih0aGlzLl9zYWxlcyk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxTYWxlT3JkZXI+KHRoaXMuX3F1b3Rlcyk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZWRpdFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24uZWRpdCA9IHRydWU7XHJcbiAgICAgICAgU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi50cmFuc2FjdGlvbk5vID0gXCIzYjI0NzFTLTAwMDAwMlwiO1xyXG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zYWxlT3JkZXInLCB0aGlzLnNlbGVjdGVkU2FsZU9yZGVyLkN1c3RvbWVyTm8sIHRydWVdKTtcclxuICAgIH1cclxufSJdfQ==