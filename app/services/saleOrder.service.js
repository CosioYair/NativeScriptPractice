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
        var existingTransaction = -1;
        if (doc == null)
            this._saleOrderDoc["saleorder"] = {};
        else {
            this._saleOrderDoc = doc;
            existingTransaction = this.validateExistingTransaction(saleOrder);
        }
        if (saleOrder != null) {
            console.log(existingTransaction);
            if (existingTransaction == -1) {
                if (this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] == null)
                    this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] = [saleOrder];
                else
                    this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]].push(saleOrder);
            }
            else
                this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]][existingTransaction] = saleOrder;
        }
        this._couchbaseService.createDocument(this._saleOrderDoc, "saleorder");
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
        return unsavedTransactions.reverse();
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
        var transactions = this.getUnsavedUserTransactions();
        return transactions.findIndex(function (transaction) { return transaction.SalesOrderNO == userTransaction.SalesOrderNO; });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZU9yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlT3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZEO0lBR0ksMEJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBSTNCLENBQUM7SUFFTSw2Q0FBa0IsR0FBekIsVUFBMEIsU0FBVTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztZQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQSxDQUFDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7WUFDekIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsbUJBQW1CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxD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Q29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tICcuL2NvdWNoYmFzZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNhbGVPcmRlclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfc2FsZU9yZGVyRG9jID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2FsZU9yZGVyRG9jKHNhbGVPcmRlcj8pIHtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKTtcclxuICAgICAgICBsZXQgZXhpc3RpbmdUcmFuc2FjdGlvbiA9IC0xO1xyXG4gICAgICAgIGlmIChkb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdID0ge307XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jID0gZG9jO1xyXG4gICAgICAgICAgICBleGlzdGluZ1RyYW5zYWN0aW9uID0gdGhpcy52YWxpZGF0ZUV4aXN0aW5nVHJhbnNhY3Rpb24oc2FsZU9yZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzYWxlT3JkZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleGlzdGluZ1RyYW5zYWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nVHJhbnNhY3Rpb24gPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPSBbc2FsZU9yZGVyXTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0ucHVzaChzYWxlT3JkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvY1tcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXVtleGlzdGluZ1RyYW5zYWN0aW9uXSA9IHNhbGVPcmRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9zYWxlT3JkZXJEb2MsIFwic2FsZW9yZGVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVbnNhdmVkVXNlclRyYW5zYWN0aW9ucygpIHtcclxuICAgICAgICBsZXQgdXNlclRyYW5zYWN0aW9ucyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzYWxlb3JkZXJcIilbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV07XHJcbiAgICAgICAgbGV0IHVuc2F2ZWRUcmFuc2FjdGlvbnMgPSBbXTtcclxuICAgICAgICBpZiAodXNlclRyYW5zYWN0aW9ucyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgdXNlclRyYW5zYWN0aW9ucy5tYXAodHJhbnNhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRyYW5zYWN0aW9uLlN0YXR1cylcclxuICAgICAgICAgICAgICAgIHVuc2F2ZWRUcmFuc2FjdGlvbnMucHVzaCh0cmFuc2FjdGlvbilcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdW5zYXZlZFRyYW5zYWN0aW9ucy5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNhdmVkVXNlclRyYW5zYWN0aW9ucygpIHtcclxuICAgICAgICBsZXQgdXNlclRyYW5zYWN0aW9ucyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzYWxlb3JkZXJcIilbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV07XHJcbiAgICAgICAgbGV0IHNhdmVkVHJhbnNhY3Rpb25zID0gW107XHJcbiAgICAgICAgaWYgKHVzZXJUcmFuc2FjdGlvbnMgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIHVzZXJUcmFuc2FjdGlvbnMubWFwKHRyYW5zYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKHRyYW5zYWN0aW9uLlN0YXR1cylcclxuICAgICAgICAgICAgICAgIHNhdmVkVHJhbnNhY3Rpb25zLnB1c2godHJhbnNhY3Rpb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNhdmVkVHJhbnNhY3Rpb25zLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbXMoaXRlbVNlYXJjaCwgaXRlbUJvb2wsIHNhdmVkQm9vbCkge1xyXG4gICAgICAgIGxldCBpdGVtRG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKTtcclxuICAgICAgICBsZXQgdHJhbnNhY3Rpb25zID0gW107XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gW107XHJcbiAgICAgICAgaWYgKGl0ZW1Eb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIHRyYW5zYWN0aW9ucyA9IGl0ZW1Eb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV07XHJcbiAgICAgICAgdHJhbnNhY3Rpb25zLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1baXRlbVNlYXJjaF0gPT0gaXRlbUJvb2wgJiYgaXRlbS5TYXZlZCA9PSBzYXZlZEJvb2wpXHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpdGVtRG9jID09IHVuZGVmaW5lZCA/IFtdIDogaXRlbXMucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVFeGlzdGluZ1RyYW5zYWN0aW9uKHVzZXJUcmFuc2FjdGlvbikge1xyXG4gICAgICAgIGxldCB0cmFuc2FjdGlvbnMgPSB0aGlzLmdldFVuc2F2ZWRVc2VyVHJhbnNhY3Rpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9ucy5maW5kSW5kZXgodHJhbnNhY3Rpb24gPT4gdHJhbnNhY3Rpb24uU2FsZXNPcmRlck5PID09IHVzZXJUcmFuc2FjdGlvbi5TYWxlc09yZGVyTk8pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyU2FsZU9yZGVyU2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJJc1F1b3RlXCIsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclNhbGVPcmRlclVuc2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJJc1F1b3RlXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVzZXJRdW90ZVNhdmVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiSXNRdW90ZVwiLCB0cnVlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclF1b3RlVW5zYXZlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfVxyXG59Il19