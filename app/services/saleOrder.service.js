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
        var existingTransaction = false;
        if (doc == null)
            this._saleOrderDoc["saleorder"] = {};
        else {
            this._saleOrderDoc = doc;
            existingTransaction = this.validateExistingTransaction(saleOrder);
        }
        if (saleOrder != null && !existingTransaction) {
            if (this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] == null)
                this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] = [saleOrder];
            else
                this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]].push(saleOrder);
        }
        if (!existingTransaction) {
            this._saleOrderDoc = JSON.parse(JSON.stringify(this._saleOrderDoc));
            this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");
        }
    };
    SaleOrderService.prototype.getUnsavedUserTransactions = function () {
        var userTransactions = this._couchbaseService.getDocument("saleorder");
        var unsavedTransactions = [];
        if (userTransactions == null)
            return [];
        userTransactions["saleorder"][server_config_1.SERVER.user["UserCode"]].map(function (transaction) {
            if (!transaction.Status)
                unsavedTransactions.push(transaction);
        });
        return unsavedTransactions.reverse();
    };
    SaleOrderService.prototype.getSavedUserTransactions = function () {
        var userTransactions = this._couchbaseService.getDocument("saleorder");
        var savedTransactions = [];
        if (userTransactions == null)
            return [];
        userTransactions["saleorder"][server_config_1.SERVER.user["UserCode"]].map(function (transaction) {
            if (transaction.Status)
                savedTransactions.push(transaction);
        });
        return savedTransactions.reverse();
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
        return itemDoc == undefined ? [] : items.reverse();
    };
    SaleOrderService.prototype.validateExistingTransaction = function (userTransaction) {
        var _this = this;
        var transactions = this.getUnsavedUserTransactions();
        var exist = false;
        transactions.map(function (transaction, index) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (transaction.SalesOrderNO == userTransaction.SalesOrderNO) {
                    transactions[index] = userTransaction;
                    exist = true;
                }
                return [2 /*return*/];
            });
        }); });
        if (exist) {
            this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] = transactions;
            this._saleOrderDoc = JSON.parse(JSON.stringify(this._saleOrderDoc));
            this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");
        }
        return exist;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZU9yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlT3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZEO0lBR0ksMEJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBSTNCLENBQUM7SUFFTSw2Q0FBa0IsR0FBekIsVUFBMEIsU0FBVTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLG1CQUFtQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFB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QXVCLEdBQTlCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sNENBQWlCLEdBQXhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sOENBQW1CLEdBQTFCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBbEdRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUlrQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FIekUsZ0JBQWdCLENBbUc1QjtJQUFELHVCQUFDO0NBQUEsQUFuR0QsSUFtR0M7QUFuR1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3VjaGJhc2Uuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTYWxlT3JkZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIF9zYWxlT3JkZXJEb2MgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVTYWxlT3JkZXJEb2Moc2FsZU9yZGVyPykge1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKTtcbiAgICAgICAgbGV0IGV4aXN0aW5nVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgaWYgKGRvYyA9PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdID0ge307XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jID0gZG9jO1xuICAgICAgICAgICAgZXhpc3RpbmdUcmFuc2FjdGlvbiA9IHRoaXMudmFsaWRhdGVFeGlzdGluZ1RyYW5zYWN0aW9uKHNhbGVPcmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2FsZU9yZGVyICE9IG51bGwgJiYgIWV4aXN0aW5nVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPSBbc2FsZU9yZGVyXTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0ucHVzaChzYWxlT3JkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFleGlzdGluZ1RyYW5zYWN0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5fc2FsZU9yZGVyRG9jKSk7XG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX3NhbGVPcmRlckRvYywgXCJzYWxlb3JkZXJcIik7fVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVbnNhdmVkVXNlclRyYW5zYWN0aW9ucygpIHtcbiAgICAgICAgbGV0IHVzZXJUcmFuc2FjdGlvbnMgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpO1xuICAgICAgICBsZXQgdW5zYXZlZFRyYW5zYWN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAodXNlclRyYW5zYWN0aW9ucyA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB1c2VyVHJhbnNhY3Rpb25zW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dLm1hcCh0cmFuc2FjdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIXRyYW5zYWN0aW9uLlN0YXR1cylcbiAgICAgICAgICAgICAgICB1bnNhdmVkVHJhbnNhY3Rpb25zLnB1c2godHJhbnNhY3Rpb24pXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdW5zYXZlZFRyYW5zYWN0aW9ucy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNhdmVkVXNlclRyYW5zYWN0aW9ucygpIHtcbiAgICAgICAgbGV0IHVzZXJUcmFuc2FjdGlvbnMgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpO1xuICAgICAgICBsZXQgc2F2ZWRUcmFuc2FjdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKHVzZXJUcmFuc2FjdGlvbnMgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdXNlclRyYW5zYWN0aW9uc1tcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXS5tYXAodHJhbnNhY3Rpb24gPT4ge1xuICAgICAgICAgICAgaWYgKHRyYW5zYWN0aW9uLlN0YXR1cylcbiAgICAgICAgICAgICAgICBzYXZlZFRyYW5zYWN0aW9ucy5wdXNoKHRyYW5zYWN0aW9uKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNhdmVkVHJhbnNhY3Rpb25zLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbXMoaXRlbVNlYXJjaCwgaXRlbUJvb2wsIHNhdmVkQm9vbCkge1xuICAgICAgICBsZXQgaXRlbURvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzYWxlb3JkZXJcIik7XG4gICAgICAgIGxldCB0cmFuc2FjdGlvbnMgPSBbXTtcbiAgICAgICAgbGV0IGl0ZW1zID0gW107XG4gICAgICAgIGlmIChpdGVtRG9jID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHRyYW5zYWN0aW9ucyA9IGl0ZW1Eb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV07XG4gICAgICAgIHRyYW5zYWN0aW9ucy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbVtpdGVtU2VhcmNoXSA9PSBpdGVtQm9vbCAmJiBpdGVtLlNhdmVkID09IHNhdmVkQm9vbClcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGl0ZW1Eb2MgPT0gdW5kZWZpbmVkID8gW10gOiBpdGVtcy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUV4aXN0aW5nVHJhbnNhY3Rpb24odXNlclRyYW5zYWN0aW9uKSB7XG4gICAgICAgIGxldCB0cmFuc2FjdGlvbnMgPSB0aGlzLmdldFVuc2F2ZWRVc2VyVHJhbnNhY3Rpb25zKCk7XG4gICAgICAgIGxldCBleGlzdCA9IGZhbHNlO1xuICAgICAgICB0cmFuc2FjdGlvbnMubWFwKGFzeW5jICh0cmFuc2FjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbi5TYWxlc09yZGVyTk8gPT0gdXNlclRyYW5zYWN0aW9uLlNhbGVzT3JkZXJOTykge1xuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uc1tpbmRleF0gPSB1c2VyVHJhbnNhY3Rpb247XG4gICAgICAgICAgICAgICAgZXhpc3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGV4aXN0KSB7XG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPSB0cmFuc2FjdGlvbnM7XG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuX3NhbGVPcmRlckRvYykpO1xuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9zYWxlT3JkZXJEb2MsIFwic2FsZW9yZGVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleGlzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlclNhbGVPcmRlclNhdmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgZmFsc2UsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VyU2FsZU9yZGVyVW5zYXZlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJJc1F1b3RlXCIsIGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJRdW90ZVNhdmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJRdW90ZVVuc2F2ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCB0cnVlLCBmYWxzZSk7XG4gICAgfVxufSJdfQ==