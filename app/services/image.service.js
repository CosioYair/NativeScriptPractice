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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0MsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFHckMsaURBQW1EO0FBQ25ELDJCQUE2QjtBQUU3Qix5REFBaUQ7QUFHakQsaUZBQWlFO0FBR2pFO0lBQUE7SUEyQkEsQ0FBQztJQXpCZ0IsK0JBQVEsR0FBckIsVUFBc0IsUUFBUTs7Ozs7O3dCQUN0QixRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ2pFLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUksc0JBQU0sQ0FBQyxPQUFPLGVBQVUsUUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0NBQ3ZGLDBCQUEwQjtnQ0FDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDYixDQUFDLEVBQUUsVUFBVSxDQUFDO2dDQUNWLDJCQUEyQjs0QkFDL0IsQ0FBQyxDQUFDLEVBQUE7NEJBTkYsc0JBQU8sU0FNTCxFQUFDOzs7O0tBQ047SUFFWSx1Q0FBZ0IsR0FBN0IsVUFBOEIsR0FBVzs7Ozs7O3dCQUVqQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7d0JBQ3pFLFFBQVEsR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7d0JBQ3RDLHFCQUFNLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFDLFFBQVE7Z0NBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUN2QyxDQUFDLENBQUMsRUFBQTs7d0JBRkYsU0FFRSxDQUFBO3dCQUNGLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7NEJBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFbkMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQzs0QkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQyxDQUFDLENBQUE7Ozs7O0tBQ0w7SUExQlEsWUFBWTtRQUR4QixpQkFBVSxFQUFFO09BQ0EsWUFBWSxDQTJCeEI7SUFBRCxtQkFBQztDQUFBLEFBM0JELElBMkJDO0FBM0JZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZVwiO1xuXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XG5cbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5cbmltcG9ydCB7IERvd25sb2FkUHJvZ3Jlc3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRvd25sb2FkLXByb2dyZXNzXCJcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEltYWdlU2VydmljZSB7XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0SW1hZ2UoaXRlbUNvZGUpIHtcbiAgICAgICAgdmFyIGZpbGVQYXRoID0gZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKS5wYXRoLCBpdGVtQ29kZSk7XG4gICAgICAgIHJldHVybiBhd2FpdCBodHRwLmdldEZpbGUoYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7aXRlbUNvZGV9YCwgZmlsZVBhdGgpLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIC8vLy8gQXJndW1lbnQgKHIpIGlzIEZpbGUhXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtQ29kZSk7XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIC8vLy8gQXJndW1lbnQgKGUpIGlzIEVycm9yIVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZG93bmxvYWRQcm9ncmVzcyh1cmw6IHN0cmluZyl7XG4gICAgICAgIHZhciBkYXRhOiBzdHJpbmc7XG4gICAgICAgIHZhciBmaWxlUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkucGF0aCwgXCJJbWFnZXMuanNvblwiKTtcbiAgICAgICAgdmFyIGRvd25sb2FkID0gbmV3IERvd25sb2FkUHJvZ3Jlc3MoKTtcbiAgICAgICAgYXdhaXQgZG93bmxvYWQuYWRkUHJvZ3Jlc3NDYWxsYmFjaygocHJvZ3Jlc3MpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHJvZ3Jlc3M6JywgcHJvZ3Jlc3MpO1xuICAgICAgICB9KVxuICAgICAgICBkb3dubG9hZC5kb3dubG9hZEZpbGUodXJsLGZpbGVQYXRoKS50aGVuKChmKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzXCIsIGYucGF0aCk7XG5cbiAgICAgICAgfSkuY2F0Y2goKGUpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGUpO1xuICAgICAgICB9KVxuICAgIH1cbn0iXX0=