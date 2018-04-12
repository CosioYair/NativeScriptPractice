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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9saW9zVHJhbnNhY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbGlvc1RyYW5zYWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTZFO0FBQzdFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFFOUIseURBQXVEO0FBR3ZEO0lBR0ksa0NBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRjFFLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUloQyxDQUFDO0lBRU0sNkRBQTBCLEdBQWpDLFVBQWtDLFdBQVk7UUFDMUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLEVBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUNELElBQUk7WUFDQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1FBRWxDLEVBQUUsQ0FBQSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7SUFDTCxDQUFDO0lBRU0sdURBQW9CLEdBQTNCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxzREFBbUIsR0FBMUI7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFBLENBQUM7WUFDRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO2dCQUM5QixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQztvQkFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFTSx1REFBb0IsR0FBM0I7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFBLENBQUM7WUFDRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO2dCQUM5QixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQztvQkFDekIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFyRFEsd0JBQXdCO1FBRHBDLGlCQUFVLEVBQUU7eUNBSWtCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUh6RSx3QkFBd0IsQ0FzRHBDO0lBQUQsK0JBQUM7Q0FBQSxBQXRERCxJQXNEQztBQXREWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tICcuL2NvdWNoYmFzZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvbGlvc1RyYW5zYWN0aW9uU2VydmljZSB7XG4gICAgcHJpdmF0ZSBfZm9saW9zVHJhbnNhY3Rpb24gPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xuXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUZvbGlvc1RyYW5zYWN0aW9uRG9jKHRyYW5zYWN0aW9uPyl7XG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiZm9saW9zdHJhbnNhY3Rpb25cIik7XG4gICAgICAgIGlmKGRvYyA9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuX2ZvbGlvc1RyYW5zYWN0aW9uW1wiZm9saW9zdHJhbnNhY3Rpb25cIl0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fZm9saW9zVHJhbnNhY3Rpb24sIFwiZm9saW9zdHJhbnNhY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5fZm9saW9zVHJhbnNhY3Rpb24gPSBkb2M7XG4gICAgICAgIFxuICAgICAgICBpZih0cmFuc2FjdGlvbiAhPSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuX2ZvbGlvc1RyYW5zYWN0aW9uW1wiZm9saW9zdHJhbnNhY3Rpb25cIl0ucHVzaCh0cmFuc2FjdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLnVwZGF0ZURvY3VtZW50KFwiZm9saW9zdHJhbnNhY3Rpb25cIiwgdGhpcy5fZm9saW9zVHJhbnNhY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZvbGlvc1RyYW5zYWN0aW9uKCl7XG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiZm9saW9zdHJhbnNhY3Rpb25cIik7XG4gICAgICAgIHJldHVybiBkb2MgPT0gdW5kZWZpbmVkID8gW10gOiBkb2NbXCJmb2xpb3N0cmFuc2FjdGlvblwiXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2FsZVRyYW5zYWN0aW9ucygpe1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImZvbGlvc3RyYW5zYWN0aW9uXCIpO1xuICAgICAgICBsZXQgc2FsZXMgPSBbXTtcbiAgICAgICAgaWYoZG9jID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRvY1tcImZvbGlvc3RyYW5zYWN0aW9uXCJdLm1hcChmb2xpbyA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZm9saW8uRG9jdW1lbnQgPT0gXCJTYWxlXCIpXG4gICAgICAgICAgICAgICAgICAgIHNhbGVzLnB1c2goZm9saW8pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2FsZXM7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcHVibGljIGdldFF1b3RlVHJhbnNhY3Rpb25zKCl7XG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiZm9saW9zdHJhbnNhY3Rpb25cIik7XG4gICAgICAgIGxldCBxdW90ZSA9IFtdO1xuICAgICAgICBpZihkb2MgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZG9jW1wiZm9saW9zdHJhbnNhY3Rpb25cIl0ubWFwKGZvbGlvID0+IHtcbiAgICAgICAgICAgICAgICBpZihmb2xpby5Eb2N1bWVudCA9PSBcIlF1b3RlXCIpXG4gICAgICAgICAgICAgICAgICAgIHF1b3RlLnB1c2goZm9saW8pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcXVvdGU7XG4gICAgICAgIH0gXG4gICAgfVxufSJdfQ==