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
                if (this._user.UserPassword == this.userPassword) {
                    if (this._couchbaseService.getDocument("product") == null)
                        this._router.navigate(["/sync"]);
                    else
                        this._router.navigate(["/home"]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDREQUEwRDtBQUMxRCxzRUFBb0U7QUFFcEUsZ0VBQThEO0FBQzlELDBDQUF5QztBQUN6Qyw0REFBb0Q7QUFDcEQsNEZBQTBGO0FBVzFGO0lBU0ksd0JBQW9CLFlBQXlCLEVBQVUsaUJBQW1DLEVBQVUsY0FBNkIsRUFBVSxPQUFlO1FBQXRJLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUpsSixhQUFRLEdBQTBCLElBQUksa0NBQWUsRUFBUSxDQUFDO1FBQy9ELGNBQVMsR0FBRyxFQUFFLENBQUM7SUFLdEIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQy9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDO3dCQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLElBQUk7d0JBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxzQkFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM3QixDQUFDO2dCQUNELElBQUk7b0JBQ0EsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUNELElBQUk7Z0JBQ0EsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTyxzQ0FBYSxHQUFyQjtRQUFBLGlCQXNCQztRQXJCRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQU9KLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtDQUFlLENBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtnQkFDbEIsNkJBQTZCO2dCQUM3QixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixJQUFtQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFyRVEsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQzdCLENBQUM7eUNBV29DLDBCQUFXLEVBQTZCLG9DQUFnQixFQUEwQiw4QkFBYSxFQUFtQixlQUFNO09BVGpKLGNBQWMsQ0FzRTFCO0lBQUQscUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IERldmljZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1sb2dpblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9sb2dpbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9sb2dpbi5jc3NcIl0sXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyB1c2VySWQ6IHN0cmluZztcbiAgICBwdWJsaWMgdXNlclBhc3N3b3JkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfdXNlcjogVXNlcjtcbiAgICBwcml2YXRlIF91c2VyczogYW55O1xuICAgIHByaXZhdGUgdXNlckxpc3Q6IE9ic2VydmFibGVBcnJheTxVc2VyPiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8VXNlcj4oKTtcbiAgICBwdWJsaWMgdXNlckFycmF5ID0gW107XG4gICAgcHVibGljIHVzZXJOYW1lOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsIHByaXZhdGUgX2RldmljZVNlcnZpY2U6IERldmljZVNlcnZpY2UsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJkZXZpY2VcIikgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZGV2aWNlU2VydmljZS5zZXREZXZpY2VEb2N1bWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tEb2N1bWVudCgpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgbG9naW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrRG9jdW1lbnQoKSkge1xuICAgICAgICAgICAgdGhpcy5fdXNlciA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldFVzZXIodGhpcy51c2VySWQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl91c2VyLlVzZXJQYXNzd29yZCA9PSB0aGlzLnVzZXJQYXNzd29yZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIikgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvc3luY1wiXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgIFNFUlZFUi51c2VyID0gdGhpcy5fdXNlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkludmFsaWQgdXNlciBvciBwYXNzd29yZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcklkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRG9jdW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidXNlclwiKSA9PSBudWxsKSB7XG4gICAgICAgICAgICBhbGVydChcIlJFRlJFU0hJTkcgREFUQVwiKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnNldFVzZXJEb2N1bWVudCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Ugey8qXG4gICAgICAgICAgICB0aGlzLnVzZXJMaXN0ID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInVzZXJcIik7XG4gICAgICAgICAgICBpZih0aGlzLnVzZXJMaXN0KXtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJMaXN0Lm1hcCh1c2VyID0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyLm5hbWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwidXNlclwiKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJzID0gZG9jW1widXNlclwiXTtcbiAgICAgICAgICAgIHRoaXMudXNlckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFVzZXI+KHRoaXMuX3VzZXJzKTtcblxuICAgICAgICAgICAgdGhpcy51c2VyTGlzdC5tYXAodXNlciA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh1c2VyLlVzZXJOYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJBcnJheS5wdXNoKHVzZXIuVXNlckNvZGUrXCIgOiBcIit1c2VyLlVzZXJOYW1lKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIG9uY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MubmV3SW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJBcnJheVthcmdzLm5ld0luZGV4XSk7XG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy51c2VyQXJyYXlbYXJncy5uZXdJbmRleF0uc2xpY2UoMCwzKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VySWQpO1xuICAgIH1cbn1cbiJdfQ==