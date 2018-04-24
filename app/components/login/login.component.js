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
                var password = this.userPassword == undefined ? "" : this.userPassword;
                if (this._user.UserPassword == password) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDREQUEwRDtBQUMxRCxzRUFBb0U7QUFFcEUsZ0VBQThEO0FBQzlELDBDQUF5QztBQUN6Qyw0REFBb0Q7QUFDcEQsNEZBQTBGO0FBVzFGO0lBU0ksd0JBQW9CLFlBQXlCLEVBQVUsaUJBQW1DLEVBQVUsY0FBNkIsRUFBVSxPQUFlO1FBQXRJLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUpsSixhQUFRLEdBQTBCLElBQUksa0NBQWUsRUFBUSxDQUFDO1FBQy9ELGNBQVMsR0FBRyxFQUFFLENBQUM7SUFLdEIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxT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QUQscUJBQUM7Q0FBQSxBQXhFRCxJQXdFQztBQXhFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RldmljZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWxvZ2luXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9sb2dpbi5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2xvZ2luLmNzc1wiXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgdXNlcklkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlclBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF91c2VyOiBVc2VyO1xyXG4gICAgcHJpdmF0ZSBfdXNlcnM6IGFueTtcclxuICAgIHByaXZhdGUgdXNlckxpc3Q6IE9ic2VydmFibGVBcnJheTxVc2VyPiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8VXNlcj4oKTtcclxuICAgIHB1YmxpYyB1c2VyQXJyYXkgPSBbXTtcclxuICAgIHB1YmxpYyB1c2VyTmFtZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSwgcHJpdmF0ZSBfZGV2aWNlU2VydmljZTogRGV2aWNlU2VydmljZSwgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJkZXZpY2VcIikgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXZpY2VTZXJ2aWNlLnNldERldmljZURvY3VtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tEb2N1bWVudCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgbG9naW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tEb2N1bWVudCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXIgPSB0aGlzLl91c2VyU2VydmljZS5nZXRVc2VyKHRoaXMudXNlcklkKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhc3N3b3JkID0gdGhpcy51c2VyUGFzc3dvcmQgPT0gdW5kZWZpbmVkID8gXCJcIiA6IHRoaXMudXNlclBhc3N3b3JkO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXIuVXNlclBhc3N3b3JkID09IHBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJwcm9kdWN0XCIpID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvc3luY1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL2hvbWVcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclBhc3N3b3JkID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBTRVJWRVIudXNlciA9IHRoaXMuX3VzZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJJbnZhbGlkIHVzZXIgb3IgcGFzc3dvcmRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VyIG5vdCBmb3VuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tEb2N1bWVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInVzZXJcIikgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlJFRlJFU0hJTkcgREFUQVwiKTtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2Uuc2V0VXNlckRvY3VtZW50KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Ugey8qXHJcbiAgICAgICAgICAgIHRoaXMudXNlckxpc3QgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidXNlclwiKTtcclxuICAgICAgICAgICAgaWYodGhpcy51c2VyTGlzdCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJMaXN0Lm1hcCh1c2VyID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJ1c2VyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl91c2VycyA9IGRvY1tcInVzZXJcIl07XHJcbiAgICAgICAgICAgIHRoaXMudXNlckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFVzZXI+KHRoaXMuX3VzZXJzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXNlckxpc3QubWFwKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh1c2VyLlVzZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckFycmF5LnB1c2godXNlci5Vc2VyQ29kZStcIiA6IFwiK3VzZXIuVXNlck5hbWUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25jaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJBcnJheVthcmdzLm5ld0luZGV4XSk7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLnVzZXJBcnJheVthcmdzLm5ld0luZGV4XS5zbGljZSgwLDMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcklkKTtcclxuICAgIH1cclxufVxyXG4iXX0=