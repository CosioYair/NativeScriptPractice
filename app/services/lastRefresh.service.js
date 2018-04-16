"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var couchbase_service_1 = require("./couchbase.service");
var LastRefreshService = /** @class */ (function () {
    function LastRefreshService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._docId = "lastrefresh";
        this._doc = {};
    }
    LastRefreshService.prototype.setLastRefreshDocument = function () {
        this._couchbaseService.deleteDocument(this._docId);
        this._doc[this._docId] = {
            lastrefresh: {
                docs: "",
                images: ""
            }
        };
        this._couchbaseService.createDocument(this._doc, this._docId);
    };
    LastRefreshService.prototype.setLastRefresh = function (type, date) {
        this._doc = this._couchbaseService.getDocument(this._docId)[this._docId];
        this._doc[this._docId][type] = date;
        this._couchbaseService.updateDocument(this._docId, this._doc);
    };
    LastRefreshService.prototype.getLastRefresh = function (type) {
        return this._couchbaseService.getDocument(this._docId)[this._docId][type];
    };
    LastRefreshService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], LastRefreshService);
    return LastRefreshService;
}());
exports.LastRefreshService = LastRefreshService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFzdFJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxhc3RSZWZyZXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTZFO0FBQzdFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFFOUIseURBQXVEO0FBTXZEO0lBSUksNEJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBSDFFLFdBQU0sR0FBVyxhQUFhLENBQUM7UUFDL0IsU0FBSSxHQUFHLEVBQUUsQ0FBQztJQUlsQixDQUFDO0lBRU0sbURBQXNCLEdBQTdCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDckIsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxFQUFFO2dCQUNSLE1BQU0sRUFBRSxFQUFFO2FBQ2I7U0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sMkNBQWMsR0FBckIsVUFBc0IsSUFBSSxFQUFFLElBQUk7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLDJDQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBM0JRLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFO3lDQUtrQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FKekUsa0JBQWtCLENBNEI5QjtJQUFELHlCQUFDO0NBQUEsQUE1QkQsSUE0QkM7QUE1QlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZVwiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExhc3RSZWZyZXNoU2VydmljZSB7XG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwibGFzdHJlZnJlc2hcIjtcbiAgICBwcml2YXRlIF9kb2MgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRMYXN0UmVmcmVzaERvY3VtZW50KCkge1xuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmRlbGV0ZURvY3VtZW50KHRoaXMuX2RvY0lkKTtcbiAgICAgICAgdGhpcy5fZG9jW3RoaXMuX2RvY0lkXSA9IHtcbiAgICAgICAgICAgIGxhc3RyZWZyZXNoOiB7XG4gICAgICAgICAgICAgICAgZG9jczogXCJcIixcbiAgICAgICAgICAgICAgICBpbWFnZXM6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9kb2MsIHRoaXMuX2RvY0lkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TGFzdFJlZnJlc2godHlwZSwgZGF0ZSkge1xuICAgICAgICB0aGlzLl9kb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KHRoaXMuX2RvY0lkKVt0aGlzLl9kb2NJZF07XG4gICAgICAgIHRoaXMuX2RvY1t0aGlzLl9kb2NJZF1bdHlwZV0gPSBkYXRlO1xuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLnVwZGF0ZURvY3VtZW50KHRoaXMuX2RvY0lkLCB0aGlzLl9kb2MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMYXN0UmVmcmVzaCh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KHRoaXMuX2RvY0lkKVt0aGlzLl9kb2NJZF1bdHlwZV07XG4gICAgfVxufVxuIl19