"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_couchbase_1 = require("nativescript-couchbase");
var CouchbaseService = /** @class */ (function () {
    function CouchbaseService() {
        this.database = new nativescript_couchbase_1.Couchbase("IFDAPP");
    }
    CouchbaseService.prototype.getDocument = function (docId) {
        return this.database.getDocument(docId);
    };
    CouchbaseService.prototype.createDocument = function (data, docId) {
        return this.database.createDocument(data, docId);
    };
    CouchbaseService.prototype.updateDocument = function (docId, data) {
        return this.database.updateDocument(docId, data);
    };
    CouchbaseService.prototype.deleteDocument = function (docId) {
        return this.database.deleteDocument(docId);
    };
    CouchbaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CouchbaseService);
    return CouchbaseService;
}());
exports.CouchbaseService = CouchbaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291Y2hiYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3VjaGJhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxpRUFBbUQ7QUFHbkQ7SUFHSTtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxzQ0FBVyxHQUFsQixVQUFtQixLQUFZO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0seUNBQWMsR0FBckIsVUFBc0IsSUFBUSxFQUFFLEtBQVk7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0seUNBQWMsR0FBckIsVUFBc0IsS0FBWSxFQUFFLElBQVE7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0seUNBQWMsR0FBckIsVUFBc0IsS0FBWTtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQXJCUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTs7T0FDQSxnQkFBZ0IsQ0FzQjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvdWNoYmFzZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jb3VjaGJhc2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ291Y2hiYXNlU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlID0gbmV3IENvdWNoYmFzZShcIklGREFQUFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RG9jdW1lbnQoZG9jSWQ6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXREb2N1bWVudChkb2NJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZURvY3VtZW50KGRhdGE6YW55LCBkb2NJZDpzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmNyZWF0ZURvY3VtZW50KGRhdGEsIGRvY0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlRG9jdW1lbnQoZG9jSWQ6c3RyaW5nLCBkYXRhOmFueSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UudXBkYXRlRG9jdW1lbnQoZG9jSWQsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVEb2N1bWVudChkb2NJZDpTdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmRlbGV0ZURvY3VtZW50KGRvY0lkKTtcclxuICAgIH1cclxufSJdfQ==