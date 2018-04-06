"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var fs = require("tns-core-modules/file-system");
var http = require("http");
var server_config_1 = require("../config/server.config");
var ImageService = /** @class */ (function () {
    function ImageService() {
    }
    ImageService.prototype.getImage = function (itemCode) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = fs.path.join(fs.knownFolders.documents().path, itemCode);
                        return [4 /*yield*/, http.getFile(server_config_1.SERVER.baseUrl + "/Image/" + itemCode, filePath).then(function (r) {
                                //// Argument (r) is File!
                                console.log(itemCode);
                                return r;
                            }, function (e) {
                                //// Argument (e) is Error!
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ImageService = __decorate([
        core_1.Injectable()
    ], ImageService);
    return ImageService;
}());
exports.ImageService = ImageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0MsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFHckMsaURBQW1EO0FBQ25ELDJCQUE2QjtBQUU3Qix5REFBaUQ7QUFJakQ7SUFBQTtJQVlBLENBQUM7SUFWZ0IsK0JBQVEsR0FBckIsVUFBc0IsUUFBUTs7Ozs7O3dCQUN0QixRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ2pFLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUksc0JBQU0sQ0FBQyxPQUFPLGVBQVUsUUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0NBQ3ZGLDBCQUEwQjtnQ0FDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDYixDQUFDLEVBQUUsVUFBVSxDQUFDO2dDQUNWLDJCQUEyQjs0QkFDL0IsQ0FBQyxDQUFDLEVBQUE7NEJBTkYsc0JBQU8sU0FNTCxFQUFDOzs7O0tBQ047SUFYUSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7T0FDQSxZQUFZLENBWXhCO0lBQUQsbUJBQUM7Q0FBQSxBQVpELElBWUM7QUFaWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5cclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSW1hZ2VTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0SW1hZ2UoaXRlbUNvZGUpIHtcclxuICAgICAgICB2YXIgZmlsZVBhdGggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpLnBhdGgsIGl0ZW1Db2RlKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgaHR0cC5nZXRGaWxlKGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZS8ke2l0ZW1Db2RlfWAsIGZpbGVQYXRoKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgIC8vLy8gQXJndW1lbnQgKHIpIGlzIEZpbGUhXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW1Db2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAoZSkgaXMgRXJyb3IhXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=