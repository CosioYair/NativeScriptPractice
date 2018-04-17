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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDREQUFvRDtBQUNwRCwwQ0FBeUM7QUFFekMsc0VBQW9FO0FBV3BFO0lBU0ksb0NBQW9CLE9BQWUsRUFBVSxpQkFBbUM7UUFBNUQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFGekUsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFHL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sdURBQWtCLEdBQXpCLFVBQTBCLFdBQVc7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxrREFBYSxHQUFwQixVQUFxQixJQUFJO1FBQ3JCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFB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IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU2FsZU9yZGVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2FsZU9yZGVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXIvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHsgRGVjaW1hbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1yZXZpZXdUcmFuc2FjdGlvblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXZpZXdUcmFuc2FjdGlvbi5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIFJldmlld1RyYW5zYWN0aW9uQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyBzZWxlY3RlZFRyYW5zYWN0aW9uOiBhbnk7XG4gICAgcHJpdmF0ZSBfc2FsZXM6IFNhbGVPcmRlcltdO1xuICAgIHByaXZhdGUgX3F1b3RlczogU2FsZU9yZGVyW107XG4gICAgcHVibGljIHRyYW5zYWN0aW9uTGlzdDogYW55O1xuICAgIHB1YmxpYyB1c2VyVHJhbnNhY3Rpb25zOiBhbnlbXTtcbiAgICBwdWJsaWMgdXNlclRyYW5zYWN0aW9uOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc2FsZXMgPSB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCk7XG4gICAgICAgIHRoaXMuX3F1b3RlcyA9IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclF1b3RlVW5zYXZlZCgpO1xuICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRVc2VyVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pIHtcbiAgICAgICAgdGhpcy51c2VyVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbjtcbiAgICAgICAgdGhpcy5yZXNldExpc3QoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgbGlzdFNlYXJjaCA9IFtdO1xuXG4gICAgICAgIHRoaXMucmVzZXRMaXN0KCk7XG4gICAgICAgIGlmIChzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaXN0U2VhcmNoID0gdGhpcy5zZWFyY2hJbkxpc3QodGhpcy50cmFuc2FjdGlvbkxpc3Quc2xpY2UoKSwgc2VhcmNoVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gbGlzdFNlYXJjaC5zbGljZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xuICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldExpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJUcmFuc2FjdGlvbiA9PSAwKVxuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkxpc3QgPSB0aGlzLmNoZWNrTGlzdCh0aGlzLl9zYWxlcyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gdGhpcy5jaGVja0xpc3QodGhpcy5fcXVvdGVzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tMaXN0KGxpc3QpIHtcbiAgICAgICAgaWYgKGxpc3QgPT0gbnVsbCB8fCBsaXN0ID09IHVuZGVmaW5lZCB8fCBsaXN0ID09IFtdKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVHJhbnNhY3Rpb24gPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbi5EZXRhaWwgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbiA9IGxpc3Q7XG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZWFyY2hJbkxpc3QobGlzdCwgc2VhcmNoVmFsdWUpIHtcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgbGlzdC5tYXAodHJhbnNhY3Rpb24gPT4ge1xuICAgICAgICAgICAgaWYgKHRyYW5zYWN0aW9uLlNhbGVzT3JkZXJOTy50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9IC0xIHx8IHRyYW5zYWN0aW9uLkN1c3RvbWVyTmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9IC0xKVxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0cmFuc2FjdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRUcmFuc2FjdGlvbih0cmFuc2FjdGlvbjogU2FsZU9yZGVyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uO1xuICAgIH1cblxuXG4gICAgcHVibGljIGVkaXRUcmFuc2FjdGlvbigpIHtcbiAgICAgICAgU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi5lZGl0ID0gdHJ1ZTtcbiAgICAgICAgU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi50cmFuc2FjdGlvbk5vID0gdGhpcy5zZWxlY3RlZFRyYW5zYWN0aW9uLlNhbGVzT3JkZXJOTztcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3NhbGVPcmRlcicsIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbi5DdXN0b21lck5vLCB0aGlzLnNlbGVjdGVkVHJhbnNhY3Rpb24uSXNRdW90ZV0pO1xuICAgIH1cbn0iXX0=