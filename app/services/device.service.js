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
            MobileAppVersion: this.getAppVersion(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXZpY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZELDBEQUE0RDtBQUc1RDtJQUlJLHVCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxXQUFNLEdBQVUsUUFBUSxDQUFDO1FBQ3pCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFJbEIsQ0FBQztJQUVNLHNDQUFjLEdBQXJCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFJLHNCQUFNLENBQUMsT0FBTyxZQUFTLEVBQUM7WUFDOUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNyQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVTtZQUNsRCxlQUFlLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTO1lBQ2hELFVBQVUsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDdkMsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU8scUNBQWEsR0FBckI7UUFDSSxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ2xELE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0seUNBQWlCLEdBQXhCO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsY0FBYyxFQUFFO2FBQ3BCLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDYixLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDaEMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGlDQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQXZDUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBS2tCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUp6RSxhQUFhLENBd0N6QjtJQUFELG9CQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7QUF4Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGV2aWNlU2VydmljZXtcclxuICAgIHByaXZhdGUgX2RvY0lkOnN0cmluZyA9IFwiZGV2aWNlXCI7XHJcbiAgICBwcml2YXRlIF9kb2MgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyRGV2aWNlKCl7IFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoYCR7U0VSVkVSLmJhc2VVcmx9L0RldmljZWAse1xyXG4gICAgICAgICAgICBEZXZpY2VVaWQ6IHBsYXRmb3JtTW9kdWxlLmRldmljZS51dWlkLFxyXG4gICAgICAgICAgICBNb2JpbGVBcHBWZXJzaW9uOiB0aGlzLmdldEFwcFZlcnNpb24oKSxcclxuICAgICAgICAgICAgTW9iaWxlRGV2aWNlVHlwZTogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLmRldmljZVR5cGUsXHJcbiAgICAgICAgICAgIE1vYmlsZU9zVmVyc2lvbjogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLm9zVmVyc2lvbixcclxuICAgICAgICAgICAgRGV2aWNlTmFtZTogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLm1vZGVsLFxyXG4gICAgICAgICAgICBDaGFsbGVuZ2U6IFwiXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBcHBWZXJzaW9uKCl7XHJcbiAgICAgICAgbGV0IG5hdGl2ZUFwcFZlcnNpb24gPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWFwcHZlcnNpb25cIik7XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZUFwcFZlcnNpb24uZ2V0VmVyc2lvbk5hbWUoKS50aGVuKCh2ZXJzaW9uKSA9PntcclxuICAgICAgICAgICAgcmV0dXJuIHZlcnNpb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXREZXZpY2VEb2N1bWVudCgpe1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJEZXZpY2UoKVxyXG4gICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZG9jW3RoaXMuX2RvY0lkXSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9kb2MsIHRoaXMuX2RvY0lkKTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZXZpY2UoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImRldmljZVwiKVtcImRldmljZVwiXTtcclxuICAgIH1cclxufVxyXG4iXX0=