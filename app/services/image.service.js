"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var fs = require("tns-core-modules/file-system");
var http = require("http");
var server_config_1 = require("../config/server.config");
var nativescript_download_progress_1 = require("nativescript-download-progress");
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
    ImageService.prototype.downloadProgress = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var data, filePath, download;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = fs.path.join(fs.knownFolders.documents().path, "Images.json");
                        download = new nativescript_download_progress_1.DownloadProgress();
                        return [4 /*yield*/, download.addProgressCallback(function (progress) {
                                console.log('Progress:', progress);
                            })];
                    case 1:
                        _a.sent();
                        download.downloadFile(url, filePath).then(function (f) {
                            console.log("Success", f.path);
                        }).catch(function (e) {
                            console.log("Error", e);
                        });
                        return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0MsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFHckMsaURBQW1EO0FBQ25ELDJCQUE2QjtBQUU3Qix5REFBaUQ7QUFHakQsaUZBQWlFO0FBR2pFO0lBQUE7SUEyQkEsQ0FBQztJQXpCZ0IsK0JBQVEsR0FBckIsVUFBc0IsUUFBUTs7Ozs7O3dCQUN0QixRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ2pFLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUksc0JBQU0sQ0FBQyxPQUFPLGVBQVUsUUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0NBQ3ZGLDBCQUEwQjtnQ0FDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDYixDQUFDLEVBQUUsVUFBVSxDQUFDO2dDQUNWLDJCQUEyQjs0QkFDL0IsQ0FBQyxDQUFDLEVBQUE7NEJBTkYsc0JBQU8sU0FNTCxFQUFDOzs7O0tBQ047SUFFWSx1Q0FBZ0IsR0FBN0IsVUFBOEIsR0FBVzs7Ozs7O3dCQUVqQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7d0JBQ3pFLFFBQVEsR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7d0JBQ3RDLHFCQUFNLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFDLFFBQVE7Z0NBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUN2QyxDQUFDLENBQUMsRUFBQTs7d0JBRkYsU0FFRSxDQUFBO3dCQUNGLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7NEJBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFbkMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQzs0QkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQyxDQUFDLENBQUE7Ozs7O0tBQ0w7SUExQlEsWUFBWTtRQUR4QixpQkFBVSxFQUFFO09BQ0EsWUFBWSxDQTJCeEI7SUFBRCxtQkFBQztDQUFBLEFBM0JELElBMkJDO0FBM0JZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XHJcblxyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcblxyXG5pbXBvcnQgeyBEb3dubG9hZFByb2dyZXNzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kb3dubG9hZC1wcm9ncmVzc1wiXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbWFnZVNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRJbWFnZShpdGVtQ29kZSkge1xyXG4gICAgICAgIHZhciBmaWxlUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkucGF0aCwgaXRlbUNvZGUpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBodHRwLmdldEZpbGUoYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7aXRlbUNvZGV9YCwgZmlsZVBhdGgpLnRoZW4oZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAocikgaXMgRmlsZSFcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbUNvZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChlKSBpcyBFcnJvciFcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZG93bmxvYWRQcm9ncmVzcyh1cmw6IHN0cmluZyl7XHJcbiAgICAgICAgdmFyIGRhdGE6IHN0cmluZztcclxuICAgICAgICB2YXIgZmlsZVBhdGggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpLnBhdGgsIFwiSW1hZ2VzLmpzb25cIik7XHJcbiAgICAgICAgdmFyIGRvd25sb2FkID0gbmV3IERvd25sb2FkUHJvZ3Jlc3MoKTtcclxuICAgICAgICBhd2FpdCBkb3dubG9hZC5hZGRQcm9ncmVzc0NhbGxiYWNrKChwcm9ncmVzcyk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Byb2dyZXNzOicsIHByb2dyZXNzKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGRvd25sb2FkLmRvd25sb2FkRmlsZSh1cmwsZmlsZVBhdGgpLnRoZW4oKGYpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiLCBmLnBhdGgpO1xyXG5cclxuICAgICAgICB9KS5jYXRjaCgoZSk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiLCBlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il19