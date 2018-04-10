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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZU9yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlT3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZEO0lBR0ksMEJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBSTNCLENBQUM7SUFFTSw2Q0FBa0IsR0FBekIsVUFBMEIsU0FBVTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLG1CQUFtQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFB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LE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQWhHUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FJa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSHpFLGdCQUFnQixDQWlHNUI7SUFBRCx1QkFBQztDQUFBLEFBakdELElBaUdDO0FBakdZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gJy4vY291Y2hiYXNlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2FsZU9yZGVyU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9zYWxlT3JkZXJEb2MgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTYWxlT3JkZXJEb2Moc2FsZU9yZGVyPykge1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2FsZW9yZGVyXCIpO1xyXG4gICAgICAgIGxldCBleGlzdGluZ1RyYW5zYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGRvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl0gPSB7fTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jID0gZG9jO1xyXG4gICAgICAgICAgICBleGlzdGluZ1RyYW5zYWN0aW9uID0gdGhpcy52YWxpZGF0ZUV4aXN0aW5nVHJhbnNhY3Rpb24oc2FsZU9yZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzYWxlT3JkZXIgIT0gbnVsbCAmJiAhZXhpc3RpbmdUcmFuc2FjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPSBbc2FsZU9yZGVyXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dLnB1c2goc2FsZU9yZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZXhpc3RpbmdUcmFuc2FjdGlvbilcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9zYWxlT3JkZXJEb2MsIFwic2FsZW9yZGVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVbnNhdmVkVXNlclRyYW5zYWN0aW9ucygpIHtcclxuICAgICAgICBsZXQgdXNlclRyYW5zYWN0aW9ucyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzYWxlb3JkZXJcIik7XHJcbiAgICAgICAgbGV0IHVuc2F2ZWRUcmFuc2FjdGlvbnMgPSBbXTtcclxuICAgICAgICBpZiAodXNlclRyYW5zYWN0aW9ucyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgdXNlclRyYW5zYWN0aW9uc1tcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXS5tYXAodHJhbnNhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRyYW5zYWN0aW9uLlN0YXR1cylcclxuICAgICAgICAgICAgICAgIHVuc2F2ZWRUcmFuc2FjdGlvbnMucHVzaCh0cmFuc2FjdGlvbilcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdW5zYXZlZFRyYW5zYWN0aW9ucy5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNhdmVkVXNlclRyYW5zYWN0aW9ucygpIHtcclxuICAgICAgICBsZXQgdXNlclRyYW5zYWN0aW9ucyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzYWxlb3JkZXJcIik7XHJcbiAgICAgICAgbGV0IHNhdmVkVHJhbnNhY3Rpb25zID0gW107XHJcbiAgICAgICAgaWYgKHVzZXJUcmFuc2FjdGlvbnMgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIHVzZXJUcmFuc2FjdGlvbnNbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0ubWFwKHRyYW5zYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKHRyYW5zYWN0aW9uLlN0YXR1cylcclxuICAgICAgICAgICAgICAgIHNhdmVkVHJhbnNhY3Rpb25zLnB1c2godHJhbnNhY3Rpb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNhdmVkVHJhbnNhY3Rpb25zLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbXMoaXRlbVNlYXJjaCwgaXRlbUJvb2wsIHNhdmVkQm9vbCkge1xyXG4gICAgICAgIGxldCBpdGVtRG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKTtcclxuICAgICAgICBsZXQgdHJhbnNhY3Rpb25zID0gW107XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gW107XHJcbiAgICAgICAgaWYgKGl0ZW1Eb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIHRyYW5zYWN0aW9ucyA9IGl0ZW1Eb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV07XHJcbiAgICAgICAgdHJhbnNhY3Rpb25zLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1baXRlbVNlYXJjaF0gPT0gaXRlbUJvb2wgJiYgaXRlbS5TYXZlZCA9PSBzYXZlZEJvb2wpXHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpdGVtRG9jID09IHVuZGVmaW5lZCA/IFtdIDogaXRlbXMucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVFeGlzdGluZ1RyYW5zYWN0aW9uKHVzZXJUcmFuc2FjdGlvbikge1xyXG4gICAgICAgIGxldCB0cmFuc2FjdGlvbnMgPSB0aGlzLmdldFVuc2F2ZWRVc2VyVHJhbnNhY3Rpb25zKCk7XHJcbiAgICAgICAgbGV0IGV4aXN0ID0gZmFsc2U7XHJcbiAgICAgICAgdHJhbnNhY3Rpb25zLm1hcChhc3luYyAodHJhbnNhY3Rpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbi5TYWxlc09yZGVyTk8gPT0gdXNlclRyYW5zYWN0aW9uLlNhbGVzT3JkZXJOTykge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25zW2luZGV4XSA9IHVzZXJUcmFuc2FjdGlvbjtcclxuICAgICAgICAgICAgICAgIGV4aXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChleGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPSB0cmFuc2FjdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fc2FsZU9yZGVyRG9jLCBcInNhbGVvcmRlclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV4aXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyU2FsZU9yZGVyU2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJJc1F1b3RlXCIsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclNhbGVPcmRlclVuc2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJJc1F1b3RlXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVzZXJRdW90ZVNhdmVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCB0cnVlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclF1b3RlVW5zYXZlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfVxyXG59Il19