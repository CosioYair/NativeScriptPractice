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
        else {
            this._saleOrderDoc = doc;
            if (this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] == null)
                this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]] = [saleOrder];
            else
                this._saleOrderDoc["saleorder"][server_config_1.SERVER.user["UserCode"]].push(saleOrder);
            this._couchbaseService.updateDocument("saleorder", this._saleOrderDoc);
        }
    };
    SaleOrderService.prototype.getUserTransactions = function () {
        var userSaleOrder = this._couchbaseService.getDocument("saleorder")["saleorder"][server_config_1.SERVER.user["UserCode"]];
        return userSaleOrder == undefined ? [] : userSaleOrder;
    };
    SaleOrderService.prototype.getItems = function (itemSearch, itemBool, savedBool) {
        var itemDoc = this._couchbaseService.getDocument("saleorder")["saleorder"][server_config_1.SERVER.user["UserCode"]];
        if (itemDoc == null)
            return [];
        var items = [];
        itemDoc.map(function (item) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZU9yZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlT3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZEO0lBR0ksMEJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBSTNCLENBQUM7SUFFTSw2Q0FBa0IsR0FBekIsVUFBMEIsU0FBVTtRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsc0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsc0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNFLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxzQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0UsQ0FBQztJQUNMLENBQUM7SUFFTSw4Q0FBbUIsR0FBMUI7UUFDSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUcsTUFBTSxDQUFDLGFBQWEsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQzNELENBQUM7SUFFTSxtQ0FBUSxHQUFmLFVBQWdCLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUztRQUMzQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDcEcsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQztZQUNmLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUNaLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUM7Z0JBQ3ZELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQUVNLGdEQUFxQixHQUE1QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLGtEQUF1QixHQUE5QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLDRDQUFpQixHQUF4QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLDhDQUFtQixHQUExQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQXREUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FJa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSHpFLGdCQUFnQixDQXVENUI7SUFBRCx1QkFBQztDQUFBLEFBdkRELElBdURDO0FBdkRZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gJy4vY291Y2hiYXNlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2FsZU9yZGVyU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9zYWxlT3JkZXJEb2MgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNhbGVPcmRlckRvYyhzYWxlT3JkZXI/KXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKTtcclxuICAgICAgICBpZihkb2MgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvY1tcInNhbGVvcmRlclwiXSA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX3NhbGVPcmRlckRvYywgXCJzYWxlb3JkZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3NhbGVPcmRlckRvYyA9IGRvYztcclxuICAgICAgICAgICAgaWYodGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zYWxlT3JkZXJEb2NbXCJzYWxlb3JkZXJcIl1bU0VSVkVSLnVzZXJbXCJVc2VyQ29kZVwiXV0gPSBbc2FsZU9yZGVyXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2FsZU9yZGVyRG9jW1wic2FsZW9yZGVyXCJdW1NFUlZFUi51c2VyW1wiVXNlckNvZGVcIl1dLnB1c2goc2FsZU9yZGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS51cGRhdGVEb2N1bWVudChcInNhbGVvcmRlclwiLCB0aGlzLl9zYWxlT3JkZXJEb2MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclRyYW5zYWN0aW9ucygpe1xyXG4gICAgICAgIGxldCB1c2VyU2FsZU9yZGVyID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKVtcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXTtcclxuICAgICAgICByZXR1cm4gdXNlclNhbGVPcmRlciA9PSB1bmRlZmluZWQgPyBbXSA6IHVzZXJTYWxlT3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW1zKGl0ZW1TZWFyY2gsIGl0ZW1Cb29sLCBzYXZlZEJvb2wpe1xyXG4gICAgICAgIGxldCBpdGVtRG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNhbGVvcmRlclwiKVtcInNhbGVvcmRlclwiXVtTRVJWRVIudXNlcltcIlVzZXJDb2RlXCJdXTtcclxuICAgICAgICBpZihpdGVtRG9jID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICBsZXQgaXRlbXMgPSBbXTtcclxuICAgICAgICBpdGVtRG9jLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYoaXRlbVtpdGVtU2VhcmNoXSA9PSBpdGVtQm9vbCAmJiBpdGVtLlNhdmVkID09IHNhdmVkQm9vbClcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1Eb2MgPT0gdW5kZWZpbmVkID8gW10gOiBpdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclNhbGVPcmRlclNhdmVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJJc1F1b3RlXCIsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclNhbGVPcmRlclVuc2F2ZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlclF1b3RlU2F2ZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVzZXJRdW90ZVVuc2F2ZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcIklzUXVvdGVcIiwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfVxyXG59Il19