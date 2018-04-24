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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZU9yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlT3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZEO0lBR0ksMEJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBSTNCLENBQUM7SUFFTSw2Q0FBa0IsR0FBekIsVUFBMEIsU0FBVTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLG1CQUFtQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFB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QXVCLEdBQTlCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sNENBQWlCLEdBQXhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sOENBQW1CLEdBQTFCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBbEdRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUlrQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FIekUsZ0JBQWdCLENBbUc1QjtJQUFELHVCQUFDO0NBQUEsQUFuR0QsSUFtR0M7QUFuR1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3VjaGJhc2Uuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTYWxlT3JkZXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX3NhbGVPcmRlckRvYyA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNhbGVPcmRlckRvYyhzYWxlT3JkZXI/KSB7XHJcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzYWxlb3JkZXJcIik7XHJcbiAgICAgICAgbGV0IGV4aXN0aW5nVHJhbnNhY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICBpZiAoZG9jID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvY1tcInNhbGVvcmRlclwiXSA9IHt9O1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2MgPSBkb2M7XHJcbiAgICAgICAgICAgIGV4aXN0aW5nVHJhbnNhY3Rpb24gPSB0aGlzLnZhbGlkYXRlRXhpc3RpbmdUcmFuc2FjdGlvbihzYWxlT3JkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNhbGVPcmRlciAhPSBudWxsICYmICFleGlzdGluZ1RyYW5zYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvY1tcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXSA9IFtzYWxlT3JkZXJdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0ucHVzaChzYWxlT3JkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFleGlzdGluZ1RyYW5zYWN0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLl9zYWxlT3JkZXJEb2MpKTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9zYWxlT3JkZXJEb2MsIFwic2FsZW9yZGVyXCIpO31cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VW5zYXZlZFVzZXJUcmFuc2FjdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IHVzZXJUcmFuc2FjdGlvbnMgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpO1xyXG4gICAgICAgIGxldCB1bnNhdmVkVHJhbnNhY3Rpb25zID0gW107XHJcbiAgICAgICAgaWYgKHVzZXJUcmFuc2FjdGlvbnMgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIHVzZXJUcmFuc2FjdGlvbnNbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0ubWFwKHRyYW5zYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0cmFuc2FjdGlvbi5TdGF0dXMpXHJcbiAgICAgICAgICAgICAgICB1bnNhdmVkVHJhbnNhY3Rpb25zLnB1c2godHJhbnNhY3Rpb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHVuc2F2ZWRUcmFuc2FjdGlvbnMucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTYXZlZFVzZXJUcmFuc2FjdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IHVzZXJUcmFuc2FjdGlvbnMgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpO1xyXG4gICAgICAgIGxldCBzYXZlZFRyYW5zYWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmICh1c2VyVHJhbnNhY3Rpb25zID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB1c2VyVHJhbnNhY3Rpb25zW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dLm1hcCh0cmFuc2FjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbi5TdGF0dXMpXHJcbiAgICAgICAgICAgICAgICBzYXZlZFRyYW5zYWN0aW9ucy5wdXNoKHRyYW5zYWN0aW9uKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzYXZlZFRyYW5zYWN0aW9ucy5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW1zKGl0ZW1TZWFyY2gsIGl0ZW1Cb29sLCBzYXZlZEJvb2wpIHtcclxuICAgICAgICBsZXQgaXRlbURvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzYWxlb3JkZXJcIik7XHJcbiAgICAgICAgbGV0IHRyYW5zYWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGxldCBpdGVtcyA9IFtdO1xyXG4gICAgICAgIGlmIChpdGVtRG9jID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB0cmFuc2FjdGlvbnMgPSBpdGVtRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dO1xyXG4gICAgICAgIHRyYW5zYWN0aW9ucy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtW2l0ZW1TZWFyY2hdID09IGl0ZW1Cb29sICYmIGl0ZW0uU2F2ZWQgPT0gc2F2ZWRCb29sKVxyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXRlbURvYyA9PSB1bmRlZmluZWQgPyBbXSA6IGl0ZW1zLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlRXhpc3RpbmdUcmFuc2FjdGlvbih1c2VyVHJhbnNhY3Rpb24pIHtcclxuICAgICAgICBsZXQgdHJhbnNhY3Rpb25zID0gdGhpcy5nZXRVbnNhdmVkVXNlclRyYW5zYWN0aW9ucygpO1xyXG4gICAgICAgIGxldCBleGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIHRyYW5zYWN0aW9ucy5tYXAoYXN5bmMgKHRyYW5zYWN0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNhY3Rpb24uU2FsZXNPcmRlck5PID09IHVzZXJUcmFuc2FjdGlvbi5TYWxlc09yZGVyTk8pIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uc1tpbmRleF0gPSB1c2VyVHJhbnNhY3Rpb247XHJcbiAgICAgICAgICAgICAgICBleGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZXhpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dID0gdHJhbnNhY3Rpb25zO1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuX3NhbGVPcmRlckRvYykpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX3NhbGVPcmRlckRvYywgXCJzYWxlb3JkZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclNhbGVPcmRlclNhdmVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyUXVvdGVTYXZlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVzZXJRdW90ZVVuc2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJJc1F1b3RlXCIsIHRydWUsIGZhbHNlKTtcclxuICAgIH1cclxufSJdfQ==