"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var SaleOrderService = /** @class */ (function () {
    function SaleOrderService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._saleOrderDoc = {};
    }
    SaleOrderService.prototype.updateSaleOrderDoc = function (saleOrder) {
        var doc = this._couchbaseService.getDocument("saleorder");
        if (doc == null) {
            this._saleOrderDoc["saleorder"] = {};
            this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");
        }
        else
            this._saleOrderDoc = doc;
        if (saleOrder != null) {
            if (this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] == null)
                this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] = [saleOrder];
            else
                this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]].push(saleOrder);
            this._couchbaseService.updateDocument("saleorder", this._saleOrderDoc);
        }
    };
    SaleOrderService.prototype.getUnsavedUserTransactions = function () {
        var userTransactions = this._couchbaseService.getDocument("saleorder")["saleorder"][server_config_1.SERVER.user["UserCode"]];
        var unsavedTransactions = [];
        if (userTransactions == null)
            return [];
        userTransactions.map(function (transaction) {
            if (!transaction.Status)
                unsavedTransactions.push(transaction);
        });
        return unsavedTransactions;
    };
    SaleOrderService.prototype.getSavedUserTransactions = function () {
        var userTransactions = this._couchbaseService.getDocument("saleorder")["saleorder"][server_config_1.SERVER.user["UserCode"]];
        var savedTransactions = [];
        if (userTransactions == null)
            return [];
        userTransactions.map(function (transaction) {
            if (transaction.Status)
                savedTransactions.push(transaction);
        });
        return savedTransactions;
    };
    SaleOrderService.prototype.getItems = function (itemSearch, itemBool, savedBool) {
        var itemDoc = this._couchbaseService.getDocument("saleorder");
        var transactions = [];
        var items = [];
        if (itemDoc == null)
            return [];
        transactions = itemDoc["saleorder"][server_config_1.SERVER.user["UserCode"]];
        transactions.map(function (item) {
            if (item[itemSearch] == itemBool && item.Saved == savedBool)
                items.push(item);
        });
        return itemDoc == undefined ? [] : items;
    };
    SaleOrderService.prototype.getUserSaleOrderSaved = function () {
        return this.getItems("IsQuote", false, true);
    };
    SaleOrderService.prototype.getUserSaleOrderUnsaved = function () {
        return this.getItems("IsQuote", false, false);
    };
    SaleOrderService.prototype.getUserQuoteSaved = function () {
        return this.getItems("IsQuote", true, true);
    };
    SaleOrderService.prototype.getUserQuoteUnsaved = function () {
        return this.getItems("IsQuote", true, false);
    };
    SaleOrderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], SaleOrderService);
    return SaleOrderService;
}());
exports.SaleOrderService = SaleOrderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZU9yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlT3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZEO0lBR0ksMEJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBSTNCLENBQUM7SUFFTSw2Q0FBa0IsR0FBekIsVUFBMEIsU0FBVTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFDRCxJQUFJO1lBQ0EsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFFN0IsRUFBRSxDQUFBLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDbEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxzQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztnQkFDcEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxzQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkUsSUFBSTtnQkFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLHFEQUEwQixHQUFqQztRQUNJLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxzQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzdHLElBQUksbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzdCLEVBQUUsQ0FBQSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQztZQUN4QixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQUEsV0FBVztZQUM1QixFQUFFLENBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7Z0JBQ25CLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztJQUMvQixDQUFDO0lBRU0sbURBQXdCLEdBQS9CO1FBQ0ksSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDN0csSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDM0IsRUFBRSxDQUFBLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxXQUFXO1lBQzVCLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0lBRU0sbUNBQVEsR0FBZixVQUFnQixVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFDM0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQztZQUNmLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDakIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztnQkFDdkQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM3QyxDQUFDO0lBRU0sZ0RBQXFCLEdBQTVCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sa0RBQXVCLEdBQTlCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sNENBQWlCLEdBQXhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sOENBQW1CLEdBQTFCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBN0VRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUlrQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FIekUsZ0JBQWdCLENBOEU1QjtJQUFELHVCQUFDO0NBQUEsQUE5RUQsSUE4RUM7QUE5RVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3VjaGJhc2Uuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTYWxlT3JkZXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX3NhbGVPcmRlckRvYyA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2FsZU9yZGVyRG9jKHNhbGVPcmRlcj8pe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpO1xyXG4gICAgICAgIGlmKGRvYyA9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fc2FsZU9yZGVyRG9jLCBcInNhbGVvcmRlclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2MgPSBkb2M7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKHNhbGVPcmRlciAhPSBudWxsKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvY1tcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXSA9IFtzYWxlT3JkZXJdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0ucHVzaChzYWxlT3JkZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLnVwZGF0ZURvY3VtZW50KFwic2FsZW9yZGVyXCIsIHRoaXMuX3NhbGVPcmRlckRvYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVbnNhdmVkVXNlclRyYW5zYWN0aW9ucygpe1xyXG4gICAgICAgIGxldCB1c2VyVHJhbnNhY3Rpb25zID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKVtcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXTtcclxuICAgICAgICBsZXQgdW5zYXZlZFRyYW5zYWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmKHVzZXJUcmFuc2FjdGlvbnMgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIHVzZXJUcmFuc2FjdGlvbnMubWFwKHRyYW5zYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYoIXRyYW5zYWN0aW9uLlN0YXR1cylcclxuICAgICAgICAgICAgICAgIHVuc2F2ZWRUcmFuc2FjdGlvbnMucHVzaCh0cmFuc2FjdGlvbilcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdW5zYXZlZFRyYW5zYWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2F2ZWRVc2VyVHJhbnNhY3Rpb25zKCl7XHJcbiAgICAgICAgbGV0IHVzZXJUcmFuc2FjdGlvbnMgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dO1xyXG4gICAgICAgIGxldCBzYXZlZFRyYW5zYWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmKHVzZXJUcmFuc2FjdGlvbnMgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIHVzZXJUcmFuc2FjdGlvbnMubWFwKHRyYW5zYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYodHJhbnNhY3Rpb24uU3RhdHVzKVxyXG4gICAgICAgICAgICAgICAgc2F2ZWRUcmFuc2FjdGlvbnMucHVzaCh0cmFuc2FjdGlvbilcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2F2ZWRUcmFuc2FjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW1zKGl0ZW1TZWFyY2gsIGl0ZW1Cb29sLCBzYXZlZEJvb2wpe1xyXG4gICAgICAgIGxldCBpdGVtRG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKTtcclxuICAgICAgICBsZXQgdHJhbnNhY3Rpb25zID0gW107XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gW107XHJcbiAgICAgICAgaWYoaXRlbURvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgdHJhbnNhY3Rpb25zID0gaXRlbURvY1tcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXTtcclxuICAgICAgICB0cmFuc2FjdGlvbnMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZihpdGVtW2l0ZW1TZWFyY2hdID09IGl0ZW1Cb29sICYmIGl0ZW0uU2F2ZWQgPT0gc2F2ZWRCb29sKVxyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXRlbURvYyA9PSB1bmRlZmluZWQgPyBbXSA6IGl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyU2FsZU9yZGVyU2F2ZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyU2FsZU9yZGVyVW5zYXZlZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyUXVvdGVTYXZlZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCB0cnVlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclF1b3RlVW5zYXZlZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCB0cnVlLCBmYWxzZSk7XHJcbiAgICB9XHJcbn0iXX0=