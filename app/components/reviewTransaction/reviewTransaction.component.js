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
    ReviewTransactionComponent.prototype.onTextChanged = function (args) {
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        var listSearch = [];
        if (searchValue.length > 0) {
            this.resetList();
            listSearch = this.searchInList(this.transactionList.slice(), searchValue);
            this.transactionList = new observable_array_1.ObservableArray();
            this.transactionList = new observable_array_1.ObservableArray(listSearch);
        }
        else
            this.resetList();
    };
    ReviewTransactionComponent.prototype.onClear = function (args) {
        var searchBar = args.object;
        searchBar.text = "";
        this.resetList();
    };
    ReviewTransactionComponent.prototype.resetList = function () {
        if (this.userTransaction == 0)
            this.transactionList = new observable_array_1.ObservableArray(this._sales);
        else
            this.transactionList = new observable_array_1.ObservableArray(this._quotes);
    };
    ReviewTransactionComponent.prototype.searchInList = function (list, searchValue) {
        var results = [];
        list.map(function (transaction) {
            if (transaction.SalesOrderNO.toLowerCase().indexOf(searchValue) != -1 || transaction.CustomerName.toLowerCase().indexOf(searchValue) != -1)
                results.push(transaction);
        });
        return results;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDREQUFvRDtBQUNwRCwwQ0FBeUM7QUFFekMsc0VBQW9FO0FBQ3BFLDRGQUEwRjtBQVMxRjtJQVNJLG9DQUFvQixPQUFlLEVBQVUsaUJBQW1DO1FBQTVELFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRnpFLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFlLENBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUV0RCxDQUFDO0lBRU0sdURBQWtCLEdBQXpCO1FBQUEsaUJBT0M7UUFORyxVQUFVLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFlLENBQVksS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZFLElBQUk7Z0JBQ0EsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFlLENBQVksS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTSxrREFBYSxHQUFwQixVQUFxQixJQUFJO1FBQ3JCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxrQ0FBZSxFQUFhLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFlLENBQVksVUFBVSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUNELElBQUk7WUFDQSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLDRDQUFPLEdBQWQsVUFBZSxJQUFJO1FBQ2YsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLDhDQUFTLEdBQWhCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtDQUFlLENBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLElBQUk7WUFDQSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksa0NBQWUsQ0FBWSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVNLGlEQUFZLEdBQW5CLFVBQW9CLElBQUksRUFBRSxXQUFXO1FBQ2pDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsV0FBVztZQUNoQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkksT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVNLG9EQUFlLEdBQXRCO1FBQ0ksc0JBQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNuQyxzQkFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFuRVEsMEJBQTBCO1FBTnRDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsb0NBQW9DO1NBQ3BELENBQUM7eUNBVytCLGVBQU0sRUFBNkIsb0NBQWdCO09BVHZFLDBCQUEwQixDQW9FdEM7SUFBRCxpQ0FBQztDQUFBLEFBcEVELElBb0VDO0FBcEVZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NhbGVPcmRlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyL3NlYXJjaC1iYXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtcmV2aWV3VHJhbnNhY3Rpb25cIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jldmlld1RyYW5zYWN0aW9uLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUmV2aWV3VHJhbnNhY3Rpb25Db21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFNhbGVPcmRlcjogU2FsZU9yZGVyO1xyXG4gICAgcHJpdmF0ZSBfc2FsZXM6IFNhbGVPcmRlcltdO1xyXG4gICAgcHJpdmF0ZSBfcXVvdGVzOiBTYWxlT3JkZXJbXTtcclxuICAgIHB1YmxpYyB0cmFuc2FjdGlvbkxpc3Q6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyVHJhbnNhY3Rpb25zOiBhbnlbXTtcclxuICAgIHB1YmxpYyB1c2VyVHJhbnNhY3Rpb246IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9zYWxlcyA9IF9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCk7XHJcbiAgICAgICAgdGhpcy5fcXVvdGVzID0gX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclF1b3RlVW5zYXZlZCgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxTYWxlT3JkZXI+KHRoaXMuX3NhbGVzKTtcclxuICAgICAgICB0aGlzLnVzZXJUcmFuc2FjdGlvbnMgPSBbXCJTYWxlcyBvcmRlclwiLCBcIlF1b3Rlc1wiXTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFVzZXJUcmFuc2FjdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclRyYW5zYWN0aW9uID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8U2FsZU9yZGVyPih0aGlzLl9zYWxlcyk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxTYWxlT3JkZXI+KHRoaXMuX3F1b3Rlcyk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgbGlzdFNlYXJjaCA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xyXG4gICAgICAgICAgICBsaXN0U2VhcmNoID0gdGhpcy5zZWFyY2hJbkxpc3QodGhpcy50cmFuc2FjdGlvbkxpc3Quc2xpY2UoKSwgc2VhcmNoVmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8U2FsZU9yZGVyPigpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8U2FsZU9yZGVyPihsaXN0U2VhcmNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5yZXNldExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRMaXN0KCl7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlclRyYW5zYWN0aW9uID09IDApXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxTYWxlT3JkZXI+KHRoaXMuX3NhbGVzKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxTYWxlT3JkZXI+KHRoaXMuX3F1b3Rlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlYXJjaEluTGlzdChsaXN0LCBzZWFyY2hWYWx1ZSkge1xyXG4gICAgICAgIGxldCByZXN1bHRzID0gW107XHJcbiAgICAgICAgbGlzdC5tYXAodHJhbnNhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNhY3Rpb24uU2FsZXNPcmRlck5PLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT0gLTEgfHwgdHJhbnNhY3Rpb24uQ3VzdG9tZXJOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT0gLTEpXHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2godHJhbnNhY3Rpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlZGl0VHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi5lZGl0ID0gdHJ1ZTtcclxuICAgICAgICBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uTm8gPSBcIjNiMjQ3MVMtMDAwMDAyXCI7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3NhbGVPcmRlcicsIHRoaXMuc2VsZWN0ZWRTYWxlT3JkZXIuQ3VzdG9tZXJObywgdHJ1ZV0pO1xyXG4gICAgfVxyXG59Il19