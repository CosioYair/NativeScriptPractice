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
        if (list == null || list == undefined) {
            this.selectedTransaction = {};
            this.selectedTransaction.Detail = [];
            return [];
        }
        else {
            this.selectedTransaction = list[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDREQUFvRDtBQUNwRCwwQ0FBeUM7QUFFekMsc0VBQW9FO0FBV3BFO0lBU0ksb0NBQW9CLE9BQWUsRUFBVSxpQkFBbUM7UUFBNUQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFGekUsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFHL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sdURBQWtCLEdBQXpCLFVBQTBCLFdBQVc7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxrREFBYSxHQUFwQixVQUFxQixJQUFJO1FBQ3JCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFB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bXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNhbGVPcmRlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NhbGVPcmRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtcmV2aWV3VHJhbnNhY3Rpb25cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50Lmh0bWxcIixcbn0pXG5cbmV4cG9ydCBjbGFzcyBSZXZpZXdUcmFuc2FjdGlvbkNvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRUcmFuc2FjdGlvbjogYW55O1xuICAgIHByaXZhdGUgX3NhbGVzOiBTYWxlT3JkZXJbXTtcbiAgICBwcml2YXRlIF9xdW90ZXM6IFNhbGVPcmRlcltdO1xuICAgIHB1YmxpYyB0cmFuc2FjdGlvbkxpc3Q6IGFueTtcbiAgICBwdWJsaWMgdXNlclRyYW5zYWN0aW9uczogYW55W107XG4gICAgcHVibGljIHVzZXJUcmFuc2FjdGlvbjogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBwcml2YXRlIF9zYWxlT3JkZXJTZXJ2aWNlOiBTYWxlT3JkZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX3NhbGVzID0gdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyU2FsZU9yZGVyVW5zYXZlZCgpO1xuICAgICAgICB0aGlzLl9xdW90ZXMgPSB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJRdW90ZVVuc2F2ZWQoKTtcbiAgICAgICAgdGhpcy5yZXNldExpc3QoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VXNlclRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKSB7XG4gICAgICAgIHRoaXMudXNlclRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMucmVzZXRMaXN0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IGxpc3RTZWFyY2ggPSBbXTtcblxuICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xuICAgICAgICBpZiAoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGlzdFNlYXJjaCA9IHRoaXMuc2VhcmNoSW5MaXN0KHRoaXMudHJhbnNhY3Rpb25MaXN0LnNsaWNlKCksIHNlYXJjaFZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gW107XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IGxpc3RTZWFyY2guc2xpY2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5yZXNldExpc3QoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXRMaXN0KCkge1xuICAgICAgICBpZiAodGhpcy51c2VyVHJhbnNhY3Rpb24gPT0gMClcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gdGhpcy5jaGVja0xpc3QodGhpcy5fc2FsZXMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IHRoaXMuY2hlY2tMaXN0KHRoaXMuX3F1b3Rlcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrTGlzdChsaXN0KSB7XG4gICAgICAgIGlmIChsaXN0ID09IG51bGwgfHwgbGlzdCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbiA9IHt9O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRyYW5zYWN0aW9uLkRldGFpbCA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRyYW5zYWN0aW9uID0gbGlzdFswXTtcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNlYXJjaEluTGlzdChsaXN0LCBzZWFyY2hWYWx1ZSkge1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBsaXN0Lm1hcCh0cmFuc2FjdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAodHJhbnNhY3Rpb24uU2FsZXNPcmRlck5PLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT0gLTEgfHwgdHJhbnNhY3Rpb24uQ3VzdG9tZXJOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT0gLTEpXG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRyYW5zYWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uOiBTYWxlT3JkZXIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb247XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgZWRpdFRyYW5zYWN0aW9uKCkge1xuICAgICAgICBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLmVkaXQgPSB0cnVlO1xuICAgICAgICBTRVJWRVIuZWRpdFRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uTm8gPSB0aGlzLnNlbGVjdGVkVHJhbnNhY3Rpb24uU2FsZXNPcmRlck5PO1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvc2FsZU9yZGVyJywgdGhpcy5zZWxlY3RlZFRyYW5zYWN0aW9uLkN1c3RvbWVyTm8sIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbi5Jc1F1b3RlXSk7XG4gICAgfVxufSJdfQ==