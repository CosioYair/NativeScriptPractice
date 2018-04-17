"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var platformModule = require("tns-core-modules/platform");
var DeviceService = /** @class */ (function () {
    function DeviceService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._docId = "device";
        this._doc = {};
    }
    DeviceService.prototype.registerDevice = function () {
        return this._http.post(server_config_1.SERVER.baseUrl + "/Device", {
            DeviceUid: platformModule.device.uuid,
            MobileAppVersion: "5.0.0",
            MobileDeviceType: platformModule.device.deviceType,
            MobileOsVersion: platformModule.device.osVersion,
            DeviceName: platformModule.device.model,
            Challenge: ""
        })
            .map(function (res) { return res; });
    };
    DeviceService.prototype.getAppVersion = function () {
        var nativeAppVersion = require("nativescript-appversion");
        return nativeAppVersion.getVersionName().then(function (version) {
            return version;
        });
    };
    DeviceService.prototype.setDeviceDocument = function () {
        var _this = this;
        this._couchbaseService.deleteDocument("device");
        this.registerDevice()
            .subscribe(function (result) {
            _this._doc[_this._docId] = result;
            _this._couchbaseService.createDocument(_this._doc, _this._docId);
        }, function (error) {
            alert(error);
        });
    };
    DeviceService.prototype.getDevice = function () {
        return this._couchbaseService.getDocument("device")["device"];
    };
    DeviceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXZpY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZELDBEQUE0RDtBQUc1RDtJQUlJLHVCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxXQUFNLEdBQVUsUUFBUSxDQUFDO1FBQ3pCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFJbEIsQ0FBQztJQUVNLHNDQUFjLEdBQXJCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFJLHNCQUFNLENBQUMsT0FBTyxZQUFTLEVBQUM7WUFDOUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNyQyxnQkFBZ0IsRUFBRSxPQUFPO1lBQ3pCLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVTtZQUNsRCxlQUFlLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTO1lBQ2hELFVBQVUsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDdkMsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU8scUNBQWEsR0FBckI7UUFDSSxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ2xELE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0seUNBQWlCLEdBQXhCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxjQUFjLEVBQUU7YUFDcEIsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNiLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNoQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0saUNBQVMsR0FBaEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBeENRLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FLa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSnpFLGFBQWEsQ0F5Q3pCO0lBQUQsb0JBQUM7Q0FBQSxBQXpDRCxJQXlDQztBQXpDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCAqIGFzIHBsYXRmb3JtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEZXZpY2VTZXJ2aWNle1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJkZXZpY2VcIjtcclxuICAgIHByaXZhdGUgX2RvYyA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJEZXZpY2UoKXsgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdChgJHtTRVJWRVIuYmFzZVVybH0vRGV2aWNlYCx7XHJcbiAgICAgICAgICAgIERldmljZVVpZDogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQsXHJcbiAgICAgICAgICAgIE1vYmlsZUFwcFZlcnNpb246IFwiNS4wLjBcIixcclxuICAgICAgICAgICAgTW9iaWxlRGV2aWNlVHlwZTogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLmRldmljZVR5cGUsXHJcbiAgICAgICAgICAgIE1vYmlsZU9zVmVyc2lvbjogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLm9zVmVyc2lvbixcclxuICAgICAgICAgICAgRGV2aWNlTmFtZTogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLm1vZGVsLFxyXG4gICAgICAgICAgICBDaGFsbGVuZ2U6IFwiXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBcHBWZXJzaW9uKCl7XHJcbiAgICAgICAgbGV0IG5hdGl2ZUFwcFZlcnNpb24gPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWFwcHZlcnNpb25cIik7XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZUFwcFZlcnNpb24uZ2V0VmVyc2lvbk5hbWUoKS50aGVuKCh2ZXJzaW9uKSA9PntcclxuICAgICAgICAgICAgcmV0dXJuIHZlcnNpb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXREZXZpY2VEb2N1bWVudCgpe1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZGVsZXRlRG9jdW1lbnQoXCJkZXZpY2VcIik7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckRldmljZSgpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kb2NbdGhpcy5fZG9jSWRdID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX2RvYywgdGhpcy5fZG9jSWQpO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERldmljZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiZGV2aWNlXCIpW1wiZGV2aWNlXCJdO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==