"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var couchbase_service_1 = require("./couchbase.service");
var FoliosTransactionService = /** @class */ (function () {
    function FoliosTransactionService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._foliosTransaction = {};
    }
    FoliosTransactionService.prototype.updateFoliosTransactionDoc = function (transaction) {
        var doc = this._couchbaseService.getDocument("foliostransaction");
        if (doc == null) {
            this._foliosTransaction["foliostransaction"] = [];
            this._couchbaseService.createDocument(this._foliosTransaction, "foliostransaction");
        }
        else
            this._foliosTransaction = doc;
        if (transaction != null) {
            this._foliosTransaction["foliostransaction"].push(transaction);
            this._couchbaseService.updateDocument("foliostransaction", this._foliosTransaction);
        }
    };
    FoliosTransactionService.prototype.getFoliosTransaction = function () {
        var doc = this._couchbaseService.getDocument("foliostransaction");
        return doc == undefined ? [] : doc["foliostransaction"];
    };
    FoliosTransactionService.prototype.getSaleTransactions = function () {
        var doc = this._couchbaseService.getDocument("foliostransaction");
        var sales = [];
        if (doc == undefined)
            return [];
        else {
            doc["foliostransaction"].map(function (folio) {
                if (folio.Document == "Sale")
                    sales.push(folio);
            });
            return sales;
        }
    };
    FoliosTransactionService.prototype.getQuoteTransactions = function () {
        var doc = this._couchbaseService.getDocument("foliostransaction");
        var quote = [];
        if (doc == undefined)
            return [];
        else {
            doc["foliostransaction"].map(function (folio) {
                if (folio.Document == "Quote")
                    quote.push(folio);
            });
            return quote;
        }
    };
    FoliosTransactionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], FoliosTransactionService);
    return FoliosTransactionService;
}());
exports.FoliosTransactionService = FoliosTransactionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9saW9zVHJhbnNhY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbGlvc1RyYW5zYWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTZFO0FBQzdFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFFOUIseURBQXVEO0FBR3ZEO0lBR0ksa0NBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUloQyxDQUFDO0lBRU0sNkRBQTBCLEdBQWpDLFVBQWtDLFdBQVk7UUFDMUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLEVBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUNELElBQUk7WUFDQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1FBRWxDLEVBQUUsQ0FBQSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7SUFDTCxDQUFDO0lBRU0sdURBQW9CLEdBQTNCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxzREFBbUIsR0FBMUI7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFBLENBQUM7WUFDRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO2dCQUM5QixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQztvQkFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFTSx1REFBb0IsR0FBM0I7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFBLENBQUM7WUFDRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO2dCQUM5QixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQztvQkFDekIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFyRFEsd0JBQXdCO1FBRHBDLGlCQUFVLEVBQUU7eUNBSWtCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUh6RSx3QkFBd0IsQ0FzRHBDO0lBQUQsK0JBQUM7Q0FBQSxBQXRERCxJQXNEQztBQXREWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tICcuL2NvdWNoYmFzZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvbGlvc1RyYW5zYWN0aW9uU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9mb2xpb3NUcmFuc2FjdGlvbiA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlRm9saW9zVHJhbnNhY3Rpb25Eb2ModHJhbnNhY3Rpb24/KXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImZvbGlvc3RyYW5zYWN0aW9uXCIpO1xyXG4gICAgICAgIGlmKGRvYyA9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5fZm9saW9zVHJhbnNhY3Rpb25bXCJmb2xpb3N0cmFuc2FjdGlvblwiXSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX2ZvbGlvc1RyYW5zYWN0aW9uLCBcImZvbGlvc3RyYW5zYWN0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX2ZvbGlvc1RyYW5zYWN0aW9uID0gZG9jO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRyYW5zYWN0aW9uICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLl9mb2xpb3NUcmFuc2FjdGlvbltcImZvbGlvc3RyYW5zYWN0aW9uXCJdLnB1c2godHJhbnNhY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLnVwZGF0ZURvY3VtZW50KFwiZm9saW9zdHJhbnNhY3Rpb25cIiwgdGhpcy5fZm9saW9zVHJhbnNhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9saW9zVHJhbnNhY3Rpb24oKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImZvbGlvc3RyYW5zYWN0aW9uXCIpO1xyXG4gICAgICAgIHJldHVybiBkb2MgPT0gdW5kZWZpbmVkID8gW10gOiBkb2NbXCJmb2xpb3N0cmFuc2FjdGlvblwiXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2FsZVRyYW5zYWN0aW9ucygpe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiZm9saW9zdHJhbnNhY3Rpb25cIik7XHJcbiAgICAgICAgbGV0IHNhbGVzID0gW107XHJcbiAgICAgICAgaWYoZG9jID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGRvY1tcImZvbGlvc3RyYW5zYWN0aW9uXCJdLm1hcChmb2xpbyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihmb2xpby5Eb2N1bWVudCA9PSBcIlNhbGVcIilcclxuICAgICAgICAgICAgICAgICAgICBzYWxlcy5wdXNoKGZvbGlvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzYWxlcztcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRRdW90ZVRyYW5zYWN0aW9ucygpe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiZm9saW9zdHJhbnNhY3Rpb25cIik7XHJcbiAgICAgICAgbGV0IHF1b3RlID0gW107XHJcbiAgICAgICAgaWYoZG9jID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGRvY1tcImZvbGlvc3RyYW5zYWN0aW9uXCJdLm1hcChmb2xpbyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihmb2xpby5Eb2N1bWVudCA9PSBcIlF1b3RlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcXVvdGUucHVzaChmb2xpbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcXVvdGU7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxufSJdfQ==