"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var server_config_1 = require("../../config/server.config");
var router_1 = require("@angular/router");
var saleOrder_service_1 = require("../../services/saleOrder.service");
var ReviewTransactionComponent = /** @class */ (function () {
    function ReviewTransactionComponent(_router, _saleOrderService) {
        this._router = _router;
        this._saleOrderService = _saleOrderService;
        this.userTransaction = 0;
        this._sales = this._saleOrderService.getUserSaleOrderUnsaved();
        this._quotes = this._saleOrderService.getUserQuoteUnsaved();
        this.resetList();
    }
    ReviewTransactionComponent.prototype.setUserTransaction = function (transaction) {
        this.userTransaction = transaction;
        this.resetList();
    };
    ReviewTransactionComponent.prototype.onTextChanged = function (args) {
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        var listSearch = [];
        this.resetList();
        if (searchValue.length > 0) {
            listSearch = this.searchInList(this.transactionList.slice(), searchValue);
            this.transactionList = [];
            this.transactionList = listSearch.slice();
        }
    };
    ReviewTransactionComponent.prototype.onClear = function (args) {
        var searchBar = args.object;
        searchBar.text = "";
        this.resetList();
    };
    ReviewTransactionComponent.prototype.resetList = function () {
        if (this.userTransaction == 0)
            this.transactionList = this.checkList(this._sales);
        else
            this.transactionList = this.checkList(this._quotes);
    };
    ReviewTransactionComponent.prototype.checkList = function (list) {
        if (list == null || list == undefined || list == []) {
            this.selectedTransaction = {};
            this.selectedTransaction.Detail = [];
            return [];
        }
        else {
            this.selectedTransaction = list;
            return list;
        }
    };
    ReviewTransactionComponent.prototype.searchInList = function (list, searchValue) {
        var results = [];
        list.map(function (transaction) {
            if (transaction.SalesOrderNO.toLowerCase().indexOf(searchValue) != -1 || transaction.CustomerName.toLowerCase().indexOf(searchValue) != -1)
                results.push(transaction);
        });
        return results;
    };
    ReviewTransactionComponent.prototype.setSelectedTransaction = function (transaction) {
        this.selectedTransaction = transaction;
    };
    ReviewTransactionComponent.prototype.editTransaction = function () {
        server_config_1.SERVER.editTransaction.edit = true;
        server_config_1.SERVER.editTransaction.transactionNo = this.selectedTransaction.SalesOrderNO;
        this._router.navigate(['/saleOrder', this.selectedTransaction.CustomerNo, this.selectedTransaction.IsQuote]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDREQUFvRDtBQUNwRCwwQ0FBeUM7QUFFekMsc0VBQW9FO0FBV3BFO0lBU0ksb0NBQW9CLE9BQWUsRUFBVSxpQkFBbUM7UUFBNUQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFGekUsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFHL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sdURBQWtCLEdBQXpCLFVBQTBCLFdBQVc7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxrREFBYSxHQUFwQixVQUFxQixJQUFJO1FBQ3JCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlDLENBQUM7SUFDTCxDQUFDO0lBRU0sNENBQU8sR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sOENBQVMsR0FBaEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELElBQUk7WUFDQSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSw4Q0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFTSxpREFBWSxHQUFuQixVQUFvQixJQUFJLEVBQUUsV0FBVztRQUNqQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7WUFDaEIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZJLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSwyREFBc0IsR0FBN0IsVUFBOEIsV0FBc0I7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztJQUMzQyxDQUFDO0lBR00sb0RBQWUsR0FBdEI7UUFDSSxzQkFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25DLHNCQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDO1FBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakgsQ0FBQztJQTVFUSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxvQ0FBb0M7U0FDcEQsQ0FBQzt5Q0FXK0IsZUFBTSxFQUE2QixvQ0FBZ0I7T0FUdkUsMEJBQTBCLENBNkV0QztJQUFELGlDQUFDO0NBQUEsQUE3RUQsSUE2RUM7QUE3RVksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2FsZU9yZGVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXJldmlld1RyYW5zYWN0aW9uXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXZpZXdUcmFuc2FjdGlvbi5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFJldmlld1RyYW5zYWN0aW9uQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRUcmFuc2FjdGlvbjogYW55O1xyXG4gICAgcHJpdmF0ZSBfc2FsZXM6IFNhbGVPcmRlcltdO1xyXG4gICAgcHJpdmF0ZSBfcXVvdGVzOiBTYWxlT3JkZXJbXTtcclxuICAgIHB1YmxpYyB0cmFuc2FjdGlvbkxpc3Q6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyVHJhbnNhY3Rpb25zOiBhbnlbXTtcclxuICAgIHB1YmxpYyB1c2VyVHJhbnNhY3Rpb246IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLl9zYWxlcyA9IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclNhbGVPcmRlclVuc2F2ZWQoKTtcclxuICAgICAgICB0aGlzLl9xdW90ZXMgPSB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJRdW90ZVVuc2F2ZWQoKTtcclxuICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRVc2VyVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnVzZXJUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uO1xyXG4gICAgICAgIHRoaXMucmVzZXRMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IGxpc3RTZWFyY2ggPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNldExpc3QoKTtcclxuICAgICAgICBpZiAoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsaXN0U2VhcmNoID0gdGhpcy5zZWFyY2hJbkxpc3QodGhpcy50cmFuc2FjdGlvbkxpc3Quc2xpY2UoKSwgc2VhcmNoVmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IGxpc3RTZWFyY2guc2xpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldExpc3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlclRyYW5zYWN0aW9uID09IDApXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gdGhpcy5jaGVja0xpc3QodGhpcy5fc2FsZXMpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkxpc3QgPSB0aGlzLmNoZWNrTGlzdCh0aGlzLl9xdW90ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0xpc3QobGlzdCkge1xyXG4gICAgICAgIGlmIChsaXN0ID09IG51bGwgfHwgbGlzdCA9PSB1bmRlZmluZWQgfHwgbGlzdCA9PSBbXSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVHJhbnNhY3Rpb24gPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRyYW5zYWN0aW9uLkRldGFpbCA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVHJhbnNhY3Rpb24gPSBsaXN0O1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlYXJjaEluTGlzdChsaXN0LCBzZWFyY2hWYWx1ZSkge1xyXG4gICAgICAgIGxldCByZXN1bHRzID0gW107XHJcbiAgICAgICAgbGlzdC5tYXAodHJhbnNhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNhY3Rpb24uU2FsZXNPcmRlck5PLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT0gLTEgfHwgdHJhbnNhY3Rpb24uQ3VzdG9tZXJOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT0gLTEpXHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2godHJhbnNhY3Rpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uOiBTYWxlT3JkZXIpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGVkaXRUcmFuc2FjdGlvbigpIHtcclxuICAgICAgICBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLmVkaXQgPSB0cnVlO1xyXG4gICAgICAgIFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24udHJhbnNhY3Rpb25ObyA9IHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbi5TYWxlc09yZGVyTk87XHJcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3NhbGVPcmRlcicsIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbi5DdXN0b21lck5vLCB0aGlzLnNlbGVjdGVkVHJhbnNhY3Rpb24uSXNRdW90ZV0pO1xyXG4gICAgfVxyXG59Il19