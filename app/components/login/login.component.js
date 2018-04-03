"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_userService, _couchbaseService) {
        this._userService = _userService;
        this._couchbaseService = _couchbaseService;
    }
    LoginComponent.prototype.login = function () {
        if (this.checkDocument()) {
            this._user = this._userService.getUser(this.userId);
            if (this._user != null) {
                if (this._user.UserPassword == this.userPassword)
                    alert("Login");
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
            styleUrls: ["./login.css"]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, couchbase_service_1.CouchbaseService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBRTFDLDREQUEwRDtBQUMxRCxzRUFBb0U7QUFVcEU7SUFLSSx3QkFBb0IsWUFBeUIsRUFBVSxpQkFBbUM7UUFBdEUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO0lBRTFGLENBQUM7SUFFTSw4QkFBSyxHQUFaO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkIsSUFBSTtvQkFDQSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsSUFBSTtnQkFDQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHNDQUFhLEdBQXJCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ25ELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBOUJRLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUM3QixDQUFDO3lDQU9vQywwQkFBVyxFQUE2QixvQ0FBZ0I7T0FMakYsY0FBYyxDQStCMUI7SUFBRCxxQkFBQztDQUFBLEFBL0JELElBK0JDO0FBL0JZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1sb2dpblwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9sb2dpbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7IFxyXG4gICAgcHVibGljIHVzZXJJZDpzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlclBhc3N3b3JkOnN0cmluZztcclxuICAgIHByaXZhdGUgX3VzZXI6VXNlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW4oKXtcclxuICAgICAgICBpZih0aGlzLmNoZWNrRG9jdW1lbnQoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXIgPSB0aGlzLl91c2VyU2VydmljZS5nZXRVc2VyKHRoaXMudXNlcklkKTtcclxuICAgICAgICAgICAgaWYodGhpcy5fdXNlciAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3VzZXIuVXNlclBhc3N3b3JkID09IHRoaXMudXNlclBhc3N3b3JkKVxyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiTG9naW5cIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJJbnZhbGlkIHVzZXIgb3IgcGFzc3dvcmRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VyIG5vdCBmb3VuZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0RvY3VtZW50KCl7XHJcbiAgICAgICAgaWYodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInVzZXJcIikgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiUkVGUkVTSElORyBEQVRBXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5zZXRVc2VyRG9jdW1lbnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=