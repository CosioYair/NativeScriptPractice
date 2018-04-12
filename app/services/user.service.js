"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var UserService = /** @class */ (function () {
    function UserService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._docId = "user";
        this._doc = {};
    }
    UserService.prototype.getUsers = function () {
        return this._http.get(server_config_1.SERVER.baseUrl + "/Scanforce/User")
            .map(function (res) { return res; }).toPromise();
    };
    UserService.prototype.setUserDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._couchbaseService.deleteDocument("user");
                        return [4 /*yield*/, this.getUsers()
                                .then(function (result) {
                                _this._doc[_this._docId] = result["Users"];
                                _this._couchbaseService.createDocument(_this._doc, _this._docId);
                                _this._users = result["Users"];
                            }, function (error) {
                                alert(error);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getUser = function (userId) {
        var userSearch = null;
        var doc = this._couchbaseService.getDocument("user")["user"];
        doc.map(function (user) {
            if (user.UserCode == userId)
                userSearch = user;
        });
        return userSearch;
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLHVDQUFxQztBQUNyQyx5REFBaUQ7QUFDakQseURBQXVEO0FBS3ZEO0lBS0kscUJBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBSDFFLFdBQU0sR0FBVSxNQUFNLENBQUM7UUFDdkIsU0FBSSxHQUFHLEVBQUUsQ0FBQztJQUlsQixDQUFDO0lBRU0sOEJBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sb0JBQWlCLENBQUM7YUFDeEQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFWSxxQ0FBZSxHQUE1Qjs7Ozs7O3dCQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3ZDLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQzNCLElBQUksQ0FBQyxVQUFBLE1BQU07Z0NBQ1IsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUN6QyxLQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUM5RCxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDbEMsQ0FBQyxFQUFFLFVBQUMsS0FBSztnQ0FDTCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2pCLENBQUMsQ0FBQyxFQUFBOzRCQVBGLHNCQUFPLFNBT0wsRUFBQzs7OztLQUNOO0lBRU0sNkJBQU8sR0FBZCxVQUFlLE1BQU07UUFDakIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQztnQkFDdkIsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQWxDUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBTWtCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUx6RSxXQUFXLENBbUN2QjtJQUFELGtCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7QUFuQ1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZXtcbiAgICBwcml2YXRlIF91c2Vyczphbnk7XG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJ1c2VyXCI7XG4gICAgcHJpdmF0ZSBfZG9jID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2Vycygpe1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L1NjYW5mb3JjZS9Vc2VyYClcbiAgICAgICAgLm1hcChyZXMgPT4gcmVzKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgc2V0VXNlckRvY3VtZW50KCl7XG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZGVsZXRlRG9jdW1lbnQoXCJ1c2VyXCIpOyAgICAgICAgXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldFVzZXJzKClcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2RvY1t0aGlzLl9kb2NJZF0gPSByZXN1bHRbXCJVc2Vyc1wiXTtcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fZG9jLCB0aGlzLl9kb2NJZCk7XG4gICAgICAgICAgICB0aGlzLl91c2VycyA9IHJlc3VsdFtcIlVzZXJzXCJdO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXIodXNlcklkKXtcbiAgICAgICAgbGV0IHVzZXJTZWFyY2ggPSBudWxsO1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInVzZXJcIilbXCJ1c2VyXCJdO1xuICAgICAgICAgZG9jLm1hcCh1c2VyID0+IHtcbiAgICAgICAgICAgIGlmKHVzZXIuVXNlckNvZGUgPT0gdXNlcklkKVxuICAgICAgICAgICAgICAgIHVzZXJTZWFyY2ggPSB1c2VyO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVzZXJTZWFyY2g7XG4gICAgfVxufVxuIl19