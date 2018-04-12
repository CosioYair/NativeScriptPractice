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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXZpY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBR3ZELDBEQUE0RDtBQUc1RDtJQUlJLHVCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxXQUFNLEdBQVUsUUFBUSxDQUFDO1FBQ3pCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFJbEIsQ0FBQztJQUVNLHNDQUFjLEdBQXJCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFJLHNCQUFNLENBQUMsT0FBTyxZQUFTLEVBQUM7WUFDOUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNyQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVTtZQUNsRCxlQUFlLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTO1lBQ2hELFVBQVUsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDdkMsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU8scUNBQWEsR0FBckI7UUFDSSxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ2xELE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0seUNBQWlCLEdBQXhCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxjQUFjLEVBQUU7YUFDcEIsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNiLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNoQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0saUNBQVMsR0FBaEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBeENRLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FLa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSnpFLGFBQWEsQ0F5Q3pCO0lBQUQsb0JBQUM7Q0FBQSxBQXpDRCxJQXlDQztBQXpDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vY291Y2hiYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2VcIjtcbmltcG9ydCAqIGFzIHBsYXRmb3JtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZXZpY2VTZXJ2aWNle1xuICAgIHByaXZhdGUgX2RvY0lkOnN0cmluZyA9IFwiZGV2aWNlXCI7XG4gICAgcHJpdmF0ZSBfZG9jID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcblxuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckRldmljZSgpeyBcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdChgJHtTRVJWRVIuYmFzZVVybH0vRGV2aWNlYCx7XG4gICAgICAgICAgICBEZXZpY2VVaWQ6IHBsYXRmb3JtTW9kdWxlLmRldmljZS51dWlkLFxuICAgICAgICAgICAgTW9iaWxlQXBwVmVyc2lvbjogdGhpcy5nZXRBcHBWZXJzaW9uKCksXG4gICAgICAgICAgICBNb2JpbGVEZXZpY2VUeXBlOiBwbGF0Zm9ybU1vZHVsZS5kZXZpY2UuZGV2aWNlVHlwZSxcbiAgICAgICAgICAgIE1vYmlsZU9zVmVyc2lvbjogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLm9zVmVyc2lvbixcbiAgICAgICAgICAgIERldmljZU5hbWU6IHBsYXRmb3JtTW9kdWxlLmRldmljZS5tb2RlbCxcbiAgICAgICAgICAgIENoYWxsZW5nZTogXCJcIlxuICAgICAgICB9KVxuICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QXBwVmVyc2lvbigpe1xuICAgICAgICBsZXQgbmF0aXZlQXBwVmVyc2lvbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYXBwdmVyc2lvblwiKTtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZUFwcFZlcnNpb24uZ2V0VmVyc2lvbk5hbWUoKS50aGVuKCh2ZXJzaW9uKSA9PntcbiAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldERldmljZURvY3VtZW50KCl7XG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZGVsZXRlRG9jdW1lbnQoXCJkZXZpY2VcIik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEZXZpY2UoKVxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLl9kb2NbdGhpcy5fZG9jSWRdID0gcmVzdWx0O1xuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9kb2MsIHRoaXMuX2RvY0lkKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREZXZpY2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJkZXZpY2VcIilbXCJkZXZpY2VcIl07XG4gICAgfVxufVxuIl19