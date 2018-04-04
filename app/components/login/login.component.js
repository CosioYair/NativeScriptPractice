"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var device_service_1 = require("../../services/device.service");
var router_1 = require("@angular/router");
var server_config_1 = require("../../config/server.config");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_userService, _couchbaseService, _deviceService, _router) {
        this._userService = _userService;
        this._couchbaseService = _couchbaseService;
        this._deviceService = _deviceService;
        this._router = _router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this._couchbaseService.getDocument("device") == null)
            this._deviceService.setDeviceDocument();
    };
    LoginComponent.prototype.login = function () {
        if (this.checkDocument()) {
            this._user = this._userService.getUser(this.userId);
            if (this._user != null) {
                if (this._user.UserPassword == this.userPassword) {
                    this._router.navigate(["/home"]);
                    server_config_1.SERVER.userCode = this._user.UserCode;
                }
                else
                    alert("Invalid user or password");
            }
            else
                alert("User not found");
        }
    };
    LoginComponent.prototype.checkDocument = function () {
        if (this._couchbaseService.getDocument("user") == null) {
            alert("REFRESHING DATA");
            this._userService.setUserDocument();
            return false;
        }
        return true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDREQUEwRDtBQUMxRCxzRUFBb0U7QUFFcEUsZ0VBQThEO0FBQzlELDBDQUF5QztBQUN6Qyw0REFBb0Q7QUFTcEQ7SUFLSSx3QkFBb0IsWUFBeUIsRUFBVSxpQkFBbUMsRUFBVSxjQUE2QixFQUFVLE9BQWU7UUFBdEksaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO0lBRTFKLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDcEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFTSw4QkFBSyxHQUFaO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSxDQUFDO29CQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLHNCQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUMxQyxDQUFDO2dCQUNELElBQUk7b0JBQ0EsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUNELElBQUk7Z0JBQ0EsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFFTyxzQ0FBYSxHQUFyQjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNuRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXJDUSxjQUFjO1FBUDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDN0IsQ0FBQzt5Q0FPb0MsMEJBQVcsRUFBNkIsb0NBQWdCLEVBQTBCLDhCQUFhLEVBQW1CLGVBQU07T0FMakosY0FBYyxDQXNDMUI7SUFBRCxxQkFBQztDQUFBLEFBdENELElBc0NDO0FBdENZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBCb3JkZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERldmljZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtbG9naW5cIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vbG9naW4uY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHsgXHJcbiAgICBwdWJsaWMgdXNlcklkOnN0cmluZztcclxuICAgIHB1YmxpYyB1c2VyUGFzc3dvcmQ6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdXNlcjpVc2VyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSwgcHJpdmF0ZSBfZGV2aWNlU2VydmljZTogRGV2aWNlU2VydmljZSwgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpe1xyXG4gICAgICAgIGlmKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJkZXZpY2VcIikgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5fZGV2aWNlU2VydmljZS5zZXREZXZpY2VEb2N1bWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbigpe1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tEb2N1bWVudCgpKXtcclxuICAgICAgICAgICAgdGhpcy5fdXNlciA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldFVzZXIodGhpcy51c2VySWQpO1xyXG4gICAgICAgICAgICBpZih0aGlzLl91c2VyICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fdXNlci5Vc2VyUGFzc3dvcmQgPT0gdGhpcy51c2VyUGFzc3dvcmQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgU0VSVkVSLnVzZXJDb2RlID0gdGhpcy5fdXNlci5Vc2VyQ29kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkludmFsaWQgdXNlciBvciBwYXNzd29yZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGZvdW5kXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrRG9jdW1lbnQoKXtcclxuICAgICAgICBpZih0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidXNlclwiKSA9PSBudWxsKXtcclxuICAgICAgICAgICAgYWxlcnQoXCJSRUZSRVNISU5HIERBVEFcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnNldFVzZXJEb2N1bWVudCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==