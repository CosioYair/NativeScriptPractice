"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var SendDataService = /** @class */ (function () {
    function SendDataService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
    }
    SendDataService.prototype.sendTransaction = function (transaction) {
        return this._http.post(server_config_1.SERVER.baseUrl + "/Scanforce/SaleOrder", transaction)
            .map(function (res) { return res; }).toPromise();
    };
    SendDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], SendDataService);
    return SendDataService;
}());
exports.SendDataService = SendDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbmREYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTZFO0FBQzdFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIsdUNBQXFDO0FBQ3JDLHlEQUFpRDtBQUNqRCx5REFBdUQ7QUFNdkQ7SUFFSSx5QkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFFbEYsQ0FBQztJQUVNLHlDQUFlLEdBQXRCLFVBQXVCLFdBQVc7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFJLHNCQUFNLENBQUMsT0FBTyx5QkFBc0IsRUFBRSxXQUFXLENBQUM7YUFDM0UsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFUUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBR2tCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUZ6RSxlQUFlLENBVTNCO0lBQUQsc0JBQUM7Q0FBQSxBQVZELElBVUM7QUFWWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vY291Y2hiYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2VcIjtcbmltcG9ydCAqIGFzIHBsYXRmb3JtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZW5kRGF0YVNlcnZpY2V7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzZW5kVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24peyBcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdChgJHtTRVJWRVIuYmFzZVVybH0vU2NhbmZvcmNlL1NhbGVPcmRlcmAsIHRyYW5zYWN0aW9uKVxuICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xuICAgIH1cbn1cbiJdfQ==