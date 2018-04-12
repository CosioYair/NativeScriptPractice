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
        if (!existingTransaction)
            this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZU9yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlT3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZEO0lBR0ksMEJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBSTNCLENBQUM7SUFFTSw2Q0FBa0IsR0FBekIsVUFBMEIsU0FBVTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLG1CQUFtQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFB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LE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQWhHUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FJa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSHpFLGdCQUFnQixDQWlHNUI7SUFBRCx1QkFBQztDQUFBLEFBakdELElBaUdDO0FBakdZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gJy4vY291Y2hiYXNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2FsZU9yZGVyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBfc2FsZU9yZGVyRG9jID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlU2FsZU9yZGVyRG9jKHNhbGVPcmRlcj8pIHtcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzYWxlb3JkZXJcIik7XG4gICAgICAgIGxldCBleGlzdGluZ1RyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIGlmIChkb2MgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvY1tcInNhbGVvcmRlclwiXSA9IHt9O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvYyA9IGRvYztcbiAgICAgICAgICAgIGV4aXN0aW5nVHJhbnNhY3Rpb24gPSB0aGlzLnZhbGlkYXRlRXhpc3RpbmdUcmFuc2FjdGlvbihzYWxlT3JkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNhbGVPcmRlciAhPSBudWxsICYmICFleGlzdGluZ1RyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dID0gW3NhbGVPcmRlcl07XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dLnB1c2goc2FsZU9yZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZXhpc3RpbmdUcmFuc2FjdGlvbilcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fc2FsZU9yZGVyRG9jLCBcInNhbGVvcmRlclwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VW5zYXZlZFVzZXJUcmFuc2FjdGlvbnMoKSB7XG4gICAgICAgIGxldCB1c2VyVHJhbnNhY3Rpb25zID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKTtcbiAgICAgICAgbGV0IHVuc2F2ZWRUcmFuc2FjdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKHVzZXJUcmFuc2FjdGlvbnMgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdXNlclRyYW5zYWN0aW9uc1tcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXS5tYXAodHJhbnNhY3Rpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCF0cmFuc2FjdGlvbi5TdGF0dXMpXG4gICAgICAgICAgICAgICAgdW5zYXZlZFRyYW5zYWN0aW9ucy5wdXNoKHRyYW5zYWN0aW9uKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVuc2F2ZWRUcmFuc2FjdGlvbnMucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTYXZlZFVzZXJUcmFuc2FjdGlvbnMoKSB7XG4gICAgICAgIGxldCB1c2VyVHJhbnNhY3Rpb25zID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKTtcbiAgICAgICAgbGV0IHNhdmVkVHJhbnNhY3Rpb25zID0gW107XG4gICAgICAgIGlmICh1c2VyVHJhbnNhY3Rpb25zID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHVzZXJUcmFuc2FjdGlvbnNbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0ubWFwKHRyYW5zYWN0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbi5TdGF0dXMpXG4gICAgICAgICAgICAgICAgc2F2ZWRUcmFuc2FjdGlvbnMucHVzaCh0cmFuc2FjdGlvbilcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzYXZlZFRyYW5zYWN0aW9ucy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEl0ZW1zKGl0ZW1TZWFyY2gsIGl0ZW1Cb29sLCBzYXZlZEJvb2wpIHtcbiAgICAgICAgbGV0IGl0ZW1Eb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpO1xuICAgICAgICBsZXQgdHJhbnNhY3Rpb25zID0gW107XG4gICAgICAgIGxldCBpdGVtcyA9IFtdO1xuICAgICAgICBpZiAoaXRlbURvYyA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB0cmFuc2FjdGlvbnMgPSBpdGVtRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dO1xuICAgICAgICB0cmFuc2FjdGlvbnMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW1baXRlbVNlYXJjaF0gPT0gaXRlbUJvb2wgJiYgaXRlbS5TYXZlZCA9PSBzYXZlZEJvb2wpXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpdGVtRG9jID09IHVuZGVmaW5lZCA/IFtdIDogaXRlbXMucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdGVFeGlzdGluZ1RyYW5zYWN0aW9uKHVzZXJUcmFuc2FjdGlvbikge1xuICAgICAgICBsZXQgdHJhbnNhY3Rpb25zID0gdGhpcy5nZXRVbnNhdmVkVXNlclRyYW5zYWN0aW9ucygpO1xuICAgICAgICBsZXQgZXhpc3QgPSBmYWxzZTtcbiAgICAgICAgdHJhbnNhY3Rpb25zLm1hcChhc3luYyAodHJhbnNhY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodHJhbnNhY3Rpb24uU2FsZXNPcmRlck5PID09IHVzZXJUcmFuc2FjdGlvbi5TYWxlc09yZGVyTk8pIHtcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbnNbaW5kZXhdID0gdXNlclRyYW5zYWN0aW9uO1xuICAgICAgICAgICAgICAgIGV4aXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChleGlzdCkge1xuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dID0gdHJhbnNhY3Rpb25zO1xuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9zYWxlT3JkZXJEb2MsIFwic2FsZW9yZGVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleGlzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlclNhbGVPcmRlclNhdmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgZmFsc2UsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VyU2FsZU9yZGVyVW5zYXZlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJJc1F1b3RlXCIsIGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJRdW90ZVNhdmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJRdW90ZVVuc2F2ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCB0cnVlLCBmYWxzZSk7XG4gICAgfVxufSJdfQ==