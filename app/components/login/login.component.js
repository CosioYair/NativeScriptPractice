"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var device_service_1 = require("../../services/device.service");
var router_1 = require("@angular/router");
var server_config_1 = require("../../config/server.config");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_userService, _couchbaseService, _deviceService, _router) {
        this._userService = _userService;
        this._couchbaseService = _couchbaseService;
        this._deviceService = _deviceService;
        this._router = _router;
        this.userList = new observable_array_1.ObservableArray();
        this.userArray = [];
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this._couchbaseService.getDocument("device") == null) {
            this._deviceService.setDeviceDocument();
        }
        this.checkDocument();
    };
    LoginComponent.prototype.login = function () {
        if (this.checkDocument()) {
            this._user = this._userService.getUser(this.userId);
            if (this._user != null) {
                var password = this.userPassword == undefined ? "" : this.userPassword.toLocaleLowerCase();
                if (this._user.UserPassword.toLocaleLowerCase() == password) {
                    if (this._couchbaseService.getDocument("product") == null)
                        this._router.navigate(["/sync"]);
                    else
                        this._router.navigate(["/home"]);
                    this.userPassword = "";
                    server_config_1.SERVER.user = this._user;
                }
                else
                    alert("Invalid user or password");
            }
            else
                alert("User not found");
        }
        console.log(this.userId);
    };
    LoginComponent.prototype.checkDocument = function () {
        var _this = this;
        if (this._couchbaseService.getDocument("user") == null) {
            alert("REFRESHING DATA");
            this._userService.setUserDocument();
            return false;
        }
        else {
            var doc = this._couchbaseService.getDocument("user");
            this._users = doc["user"];
            this.userList = new observable_array_1.ObservableArray(this._users);
            this.userList.map(function (user) {
                //console.log(user.UserName);
                _this.userArray.push(user.UserCode + " : " + user.UserName);
            });
        }
        return true;
    };
    LoginComponent.prototype.onchange = function (args) {
        console.log(args.newIndex);
        console.log(this.userArray[args.newIndex]);
        this.userId = this.userArray[args.newIndex].slice(0, 3);
        console.log(this.userId);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "ns-login",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            styleUrls: ["./login.css"],
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, couchbase_service_1.CouchbaseService, device_service_1.DeviceService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDREQUEwRDtBQUMxRCxzRUFBb0U7QUFFcEUsZ0VBQThEO0FBQzlELDBDQUF5QztBQUN6Qyw0REFBb0Q7QUFDcEQsNEZBQTBGO0FBVzFGO0lBU0ksd0JBQW9CLFlBQXlCLEVBQVUsaUJBQW1DLEVBQVUsY0FBNkIsRUFBVSxPQUFlO1FBQXRJLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUpsSixhQUFRLEdBQTBCLElBQUksa0NBQWUsRUFBUSxDQUFDO1FBQy9ELGNBQVMsR0FBRyxFQUFFLENBQUM7SUFLdEIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUMzRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzFELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDO3dCQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLElBQUk7d0JBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsc0JBQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsQ0FBQztnQkFDRCxJQUFJO29CQUNBLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFDRCxJQUFJO2dCQUNBLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sc0NBQWEsR0FBckI7UUFBQSxpQkFzQkM7UUFyQkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFPSixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQ0FBZSxDQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV2RCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7Z0JBQ2xCLDZCQUE2QjtnQkFDN0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLGlDQUFRLEdBQWYsVUFBZ0IsSUFBbUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBdkVRLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUM3QixDQUFDO3lDQVdvQywwQkFBVyxFQUE2QixvQ0FBZ0IsRUFBMEIsOEJBQWEsRUFBbUIsZUFBTTtPQVRqSixjQUFjLENBd0UxQjtJQUFELHFCQUFDO0NBQUEsQUF4RUQsSUF3RUM7QUF4RVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCb3JkZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RldmljZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtbG9naW5cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vbG9naW4uY3NzXCJdLFxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgdXNlcklkOiBzdHJpbmc7XG4gICAgcHVibGljIHVzZXJQYXNzd29yZDogc3RyaW5nO1xuICAgIHByaXZhdGUgX3VzZXI6IFVzZXI7XG4gICAgcHJpdmF0ZSBfdXNlcnM6IGFueTtcbiAgICBwcml2YXRlIHVzZXJMaXN0OiBPYnNlcnZhYmxlQXJyYXk8VXNlcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFVzZXI+KCk7XG4gICAgcHVibGljIHVzZXJBcnJheSA9IFtdO1xuICAgIHB1YmxpYyB1c2VyTmFtZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLCBwcml2YXRlIF9kZXZpY2VTZXJ2aWNlOiBEZXZpY2VTZXJ2aWNlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcikge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiZGV2aWNlXCIpID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2RldmljZVNlcnZpY2Uuc2V0RGV2aWNlRG9jdW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrRG9jdW1lbnQoKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGxvZ2luKCkge1xuICAgICAgICBpZiAodGhpcy5jaGVja0RvY3VtZW50KCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXIgPSB0aGlzLl91c2VyU2VydmljZS5nZXRVc2VyKHRoaXMudXNlcklkKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl91c2VyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFzc3dvcmQgPSB0aGlzLnVzZXJQYXNzd29yZCA9PSB1bmRlZmluZWQgPyBcIlwiIDogdGhpcy51c2VyUGFzc3dvcmQudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdXNlci5Vc2VyUGFzc3dvcmQudG9Mb2NhbGVMb3dlckNhc2UoKSA9PSBwYXNzd29yZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIikgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvc3luY1wiXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclBhc3N3b3JkID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgU0VSVkVSLnVzZXIgPSB0aGlzLl91c2VyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiSW52YWxpZCB1c2VyIG9yIHBhc3N3b3JkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXNlciBub3QgZm91bmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VySWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tEb2N1bWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJ1c2VyXCIpID09IG51bGwpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiUkVGUkVTSElORyBEQVRBXCIpO1xuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2Uuc2V0VXNlckRvY3VtZW50KCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7LypcbiAgICAgICAgICAgIHRoaXMudXNlckxpc3QgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidXNlclwiKTtcbiAgICAgICAgICAgIGlmKHRoaXMudXNlckxpc3Qpe1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckxpc3QubWFwKHVzZXIgPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIubmFtZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJ1c2VyXCIpO1xuICAgICAgICAgICAgdGhpcy5fdXNlcnMgPSBkb2NbXCJ1c2VyXCJdO1xuICAgICAgICAgICAgdGhpcy51c2VyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8VXNlcj4odGhpcy5fdXNlcnMpO1xuXG4gICAgICAgICAgICB0aGlzLnVzZXJMaXN0Lm1hcCh1c2VyID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHVzZXIuVXNlck5hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckFycmF5LnB1c2godXNlci5Vc2VyQ29kZStcIiA6IFwiK3VzZXIuVXNlck5hbWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25jaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5uZXdJbmRleCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlckFycmF5W2FyZ3MubmV3SW5kZXhdKTtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLnVzZXJBcnJheVthcmdzLm5ld0luZGV4XS5zbGljZSgwLDMpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJJZCk7XG4gICAgfVxufVxuIl19