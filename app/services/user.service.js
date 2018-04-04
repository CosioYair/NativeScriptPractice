"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
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
            .map(function (res) { return res; });
    };
    UserService.prototype.setUserDocument = function () {
        var _this = this;
        this.getUsers()
            .subscribe(function (result) {
            _this._doc[_this._docId] = result["Users"];
            _this._couchbaseService.createDocument(_this._doc, _this._docId);
            _this._users = result["Users"];
        }, function (error) {
            alert(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLHlEQUFpRDtBQUNqRCx5REFBdUQ7QUFLdkQ7SUFLSSxxQkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsV0FBTSxHQUFVLE1BQU0sQ0FBQztRQUN2QixTQUFJLEdBQUcsRUFBRSxDQUFDO0lBSWxCLENBQUM7SUFFTSw4QkFBUSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLHNCQUFNLENBQUMsT0FBTyxvQkFBaUIsQ0FBQzthQUN4RCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLHFDQUFlLEdBQXRCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsUUFBUSxFQUFFO2FBQ2QsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNiLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlELEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sNkJBQU8sR0FBZCxVQUFlLE1BQU07UUFDakIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQztnQkFDdkIsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQWpDUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBTWtCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUx6RSxXQUFXLENBa0N2QjtJQUFELGtCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7QUFsQ1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2V7XHJcbiAgICBwcml2YXRlIF91c2Vyczphbnk7XHJcbiAgICBwcml2YXRlIF9kb2NJZDpzdHJpbmcgPSBcInVzZXJcIjtcclxuICAgIHByaXZhdGUgX2RvYyA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlcnMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L1NjYW5mb3JjZS9Vc2VyYClcclxuICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRVc2VyRG9jdW1lbnQoKXtcclxuICAgICAgICB0aGlzLmdldFVzZXJzKClcclxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RvY1t0aGlzLl9kb2NJZF0gPSByZXN1bHRbXCJVc2Vyc1wiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9kb2MsIHRoaXMuX2RvY0lkKTtcclxuICAgICAgICAgICAgdGhpcy5fdXNlcnMgPSByZXN1bHRbXCJVc2Vyc1wiXTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyKHVzZXJJZCl7XHJcbiAgICAgICAgbGV0IHVzZXJTZWFyY2ggPSBudWxsO1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidXNlclwiKVtcInVzZXJcIl07XHJcbiAgICAgICAgIGRvYy5tYXAodXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmKHVzZXIuVXNlckNvZGUgPT0gdXNlcklkKVxyXG4gICAgICAgICAgICAgICAgdXNlclNlYXJjaCA9IHVzZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHVzZXJTZWFyY2g7XHJcbiAgICB9XHJcbn1cclxuIl19