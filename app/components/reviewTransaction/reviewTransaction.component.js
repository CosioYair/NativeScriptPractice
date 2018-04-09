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
        this._sales = _saleOrderService.getUserSaleOrderUnsaved();
        this._quotes = _saleOrderService.getUserQuoteUnsaved();
        this.transactionList = this._sales.slice();
        this.userTransactions = ["Sales order", "Quotes"];
        this.selectedTransaction = this.transactionList[0];
    }
    ReviewTransactionComponent.prototype.setUserTransaction = function () {
        var _this = this;
        setTimeout(function () {
            _this.resetList();
        }, 500);
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
            this.transactionList = this._sales.slice();
        else
            this.transactionList = this._quotes.slice();
        this.selectedTransaction = this.transactionList[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDREQUFvRDtBQUNwRCwwQ0FBeUM7QUFFekMsc0VBQW9FO0FBV3BFO0lBU0ksb0NBQW9CLE9BQWUsRUFBVSxpQkFBbUM7UUFBNUQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFGekUsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFHL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSx1REFBa0IsR0FBekI7UUFBQSxpQkFJQztRQUhHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRU0sa0RBQWEsR0FBcEIsVUFBcUIsSUFBSTtRQUNyQixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDRDQUFPLEdBQWQsVUFBZSxJQUFJO1FBQ2YsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLDhDQUFTLEdBQWhCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9DLElBQUk7WUFDQSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFaEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLGlEQUFZLEdBQW5CLFVBQW9CLElBQUksRUFBRSxXQUFXO1FBQ2pDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsV0FBVztZQUNoQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkksT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVNLDJEQUFzQixHQUE3QixVQUE4QixXQUFzQjtRQUNoRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO0lBQzNDLENBQUM7SUFHTSxvREFBZSxHQUF0QjtRQUNJLHNCQUFNLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbkMsc0JBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7UUFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBckVRLDBCQUEwQjtRQU50QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG9DQUFvQztTQUNwRCxDQUFDO3lDQVcrQixlQUFNLEVBQTZCLG9DQUFnQjtPQVR2RSwwQkFBMEIsQ0FzRXRDO0lBQUQsaUNBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhci9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtcmV2aWV3VHJhbnNhY3Rpb25cIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jldmlld1RyYW5zYWN0aW9uLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUmV2aWV3VHJhbnNhY3Rpb25Db21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFRyYW5zYWN0aW9uOiBhbnk7XHJcbiAgICBwcml2YXRlIF9zYWxlczogU2FsZU9yZGVyW107XHJcbiAgICBwcml2YXRlIF9xdW90ZXM6IFNhbGVPcmRlcltdO1xyXG4gICAgcHVibGljIHRyYW5zYWN0aW9uTGlzdDogYW55O1xyXG4gICAgcHVibGljIHVzZXJUcmFuc2FjdGlvbnM6IGFueVtdO1xyXG4gICAgcHVibGljIHVzZXJUcmFuc2FjdGlvbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuX3NhbGVzID0gX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclNhbGVPcmRlclVuc2F2ZWQoKTtcclxuICAgICAgICB0aGlzLl9xdW90ZXMgPSBfc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyUXVvdGVVbnNhdmVkKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbkxpc3QgPSB0aGlzLl9zYWxlcy5zbGljZSgpO1xyXG4gICAgICAgIHRoaXMudXNlclRyYW5zYWN0aW9ucyA9IFtcIlNhbGVzIG9yZGVyXCIsIFwiUXVvdGVzXCJdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbiA9IHRoaXMudHJhbnNhY3Rpb25MaXN0WzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRVc2VyVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRMaXN0KCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgbGlzdFNlYXJjaCA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xyXG4gICAgICAgIGlmIChzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxpc3RTZWFyY2ggPSB0aGlzLnNlYXJjaEluTGlzdCh0aGlzLnRyYW5zYWN0aW9uTGlzdC5zbGljZSgpLCBzZWFyY2hWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gbGlzdFNlYXJjaC5zbGljZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucmVzZXRMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0TGlzdCgpe1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJUcmFuc2FjdGlvbiA9PSAwKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IHRoaXMuX3NhbGVzLnNsaWNlKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTGlzdCA9IHRoaXMuX3F1b3Rlcy5zbGljZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJhbnNhY3Rpb24gPSB0aGlzLnRyYW5zYWN0aW9uTGlzdFswXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VhcmNoSW5MaXN0KGxpc3QsIHNlYXJjaFZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcclxuICAgICAgICBsaXN0Lm1hcCh0cmFuc2FjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbi5TYWxlc09yZGVyTk8udG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPSAtMSB8fCB0cmFuc2FjdGlvbi5DdXN0b21lck5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPSAtMSlcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0cmFuc2FjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkVHJhbnNhY3Rpb24odHJhbnNhY3Rpb246IFNhbGVPcmRlcikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZWRpdFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24uZWRpdCA9IHRydWU7XHJcbiAgICAgICAgU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi50cmFuc2FjdGlvbk5vID0gdGhpcy5zZWxlY3RlZFRyYW5zYWN0aW9uLlNhbGVzT3JkZXJOTztcclxuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvc2FsZU9yZGVyJywgdGhpcy5zZWxlY3RlZFRyYW5zYWN0aW9uLkN1c3RvbWVyTm8sIHRoaXMuc2VsZWN0ZWRUcmFuc2FjdGlvbi5Jc1F1b3RlXSk7XHJcbiAgICB9XHJcbn0iXX0=