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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDREQUEwRDtBQUMxRCxzRUFBb0U7QUFFcEUsZ0VBQThEO0FBQzlELDBDQUF5QztBQUN6Qyw0REFBb0Q7QUFDcEQsNEZBQTBGO0FBVzFGO0lBU0ksd0JBQW9CLFlBQXlCLEVBQVUsaUJBQW1DLEVBQVUsY0FBNkIsRUFBVSxPQUFlO1FBQXRJLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUpsSixhQUFRLEdBQTBCLElBQUksa0NBQWUsRUFBUSxDQUFDO1FBQy9ELGNBQVMsR0FBRyxFQUFFLENBQUM7SUFLdEIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxT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QWEsRUFBbUIsZUFBTTtPQVRqSixjQUFjLENBd0UxQjtJQUFELHFCQUFDO0NBQUEsQUF4RUQsSUF3RUM7QUF4RVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kZXZpY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1sb2dpblwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9sb2dpbi5jc3NcIl0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHVibGljIHVzZXJJZDogc3RyaW5nO1xyXG4gICAgcHVibGljIHVzZXJQYXNzd29yZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdXNlcjogVXNlcjtcclxuICAgIHByaXZhdGUgX3VzZXJzOiBhbnk7XHJcbiAgICBwcml2YXRlIHVzZXJMaXN0OiBPYnNlcnZhYmxlQXJyYXk8VXNlcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFVzZXI+KCk7XHJcbiAgICBwdWJsaWMgdXNlckFycmF5ID0gW107XHJcbiAgICBwdWJsaWMgdXNlck5hbWU6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsIHByaXZhdGUgX2RldmljZVNlcnZpY2U6IERldmljZVNlcnZpY2UsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiZGV2aWNlXCIpID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGV2aWNlU2VydmljZS5zZXREZXZpY2VEb2N1bWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrRG9jdW1lbnQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGxvZ2luKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrRG9jdW1lbnQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0VXNlcih0aGlzLnVzZXJJZCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl91c2VyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXNzd29yZCA9IHRoaXMudXNlclBhc3N3b3JkID09IHVuZGVmaW5lZCA/IFwiXCIgOiB0aGlzLnVzZXJQYXNzd29yZC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXIuVXNlclBhc3N3b3JkLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIikgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9zeW5jXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyUGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIFNFUlZFUi51c2VyID0gdGhpcy5fdXNlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkludmFsaWQgdXNlciBvciBwYXNzd29yZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGZvdW5kXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0RvY3VtZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidXNlclwiKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiUkVGUkVTSElORyBEQVRBXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5zZXRVc2VyRG9jdW1lbnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7LypcclxuICAgICAgICAgICAgdGhpcy51c2VyTGlzdCA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJ1c2VyXCIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnVzZXJMaXN0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlckxpc3QubWFwKHVzZXIgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlci5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInVzZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJzID0gZG9jW1widXNlclwiXTtcclxuICAgICAgICAgICAgdGhpcy51c2VyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8VXNlcj4odGhpcy5fdXNlcnMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51c2VyTGlzdC5tYXAodXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHVzZXIuVXNlck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQXJyYXkucHVzaCh1c2VyLlVzZXJDb2RlK1wiIDogXCIrdXNlci5Vc2VyTmFtZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbmNoYW5nZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlckFycmF5W2FyZ3MubmV3SW5kZXhdKTtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMudXNlckFycmF5W2FyZ3MubmV3SW5kZXhdLnNsaWNlKDAsMyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VySWQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==