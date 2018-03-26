"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var fs = require("tns-core-modules/file-system");
var http = require("http");
var server_config_1 = require("../config/server.config");
var ProductService = /** @class */ (function () {
    function ProductService(_http) {
        this._http = _http;
    }
    ProductService.prototype.getProducts = function () {
        return this._http.get(server_config_1.SERVER.baseUrl + "/Product")
            .map(function (res) { return res; });
    };
    //Obtener imagenes de producto
    ProductService.prototype.getProductImage = function (url, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = fs.path.join(fs.knownFolders.documents().path, fileName);
                        return [4 /*yield*/, http.getFile(url, filePath).then(function (r) {
                                //// Argument (r) is File!
                                console.log(filePath);
                            }, function (e) {
                                //// Argument (e) is Error!
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRzlCLGlEQUFtRDtBQUNuRCwyQkFBNkI7QUFFN0IseURBQWlEO0FBR2pEO0lBR0ksd0JBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7SUFFckMsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLHNCQUFNLENBQUMsT0FBTyxhQUFVLENBQUM7YUFDakQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw4QkFBOEI7SUFDaEIsd0NBQWUsR0FBN0IsVUFBOEIsR0FBRyxFQUFFLFFBQVE7Ozs7Ozt3QkFFbkMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUNwRSxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dDQUM5QywwQkFBMEI7Z0NBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzFCLENBQUMsRUFBRSxVQUFVLENBQUM7Z0NBQ1YsMkJBQTJCOzRCQUMvQixDQUFDLENBQUMsRUFBQTs7d0JBTkYsU0FNRSxDQUFDOzs7OztLQUNWO0lBdkJRLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FJa0IsaUJBQVU7T0FINUIsY0FBYyxDQXdCMUI7SUFBRCxxQkFBQztDQUFBLEFBeEJELElBd0JDO0FBeEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5cclxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcclxuXHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RTZXJ2aWNle1xyXG4gICAgcHJpdmF0ZSBwcm9kdWN0OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtTRVJWRVIuYmFzZVVybH0vUHJvZHVjdGApXHJcbiAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL09idGVuZXIgaW1hZ2VuZXMgZGUgcHJvZHVjdG9cclxuICAgIHB1YmxpYyBhc3luYyAgZ2V0UHJvZHVjdEltYWdlKHVybCwgZmlsZU5hbWUpe1xyXG4gICAgICAgXHJcbiAgICAgICAgdmFyIGZpbGVQYXRoID0gZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKS5wYXRoLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGh0dHAuZ2V0RmlsZSh1cmwsIGZpbGVQYXRoKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChyKSBpcyBGaWxlIVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChlKSBpcyBFcnJvciFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19