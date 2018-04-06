"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var fs = require("tns-core-modules/file-system");
var http = require("http");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var ProductService = /** @class */ (function () {
    function ProductService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._docId = "product";
        this._doc = {};
    }
    ProductService.prototype.getProducts = function () {
        return this._http.get(server_config_1.SERVER.baseUrl + "/Product?InactiveItem=N")
            .map(function (res) { return res; }).toPromise();
    };
    ProductService.prototype.getImages = function (parameters) {
        return this._http.get(server_config_1.SERVER.baseUrl + "/Images.json?ItemCodes=" + parameters)
            .map(function (res) { return res; });
    };
    //Obtener imagenes de producto
    ProductService.prototype.getProductImage = function (url, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = fs.path.join(fs.knownFolders.currentApp().path, fileName + ".jpg");
                        return [4 /*yield*/, http.getFile(url, filePath).then(function (r) {
                                //// Argument (r) is File!
                                console.log(filePath);
                            }, function (e) {
                                //// Argument (e) is Error!
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, filePath];
                }
            });
        });
    };
    ProductService.prototype.setProductDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._couchbaseService.deleteDocument("product");
                        return [4 /*yield*/, this.getProducts()
                                .then(function (result) {
                                _this._doc[_this._docId] = result["Product"];
                                _this._couchbaseService.createDocument(_this._doc, _this._docId);
                                _this._products = result["Product"];
                            }, function (error) {
                                alert(error);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.getProductDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productList, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productList = [];
                        doc = this._couchbaseService.getDocument("product")["product"];
                        return [4 /*yield*/, doc.map(function (product) {
                                if (product.ProductType == "F" && product.StandardUnitPrice > 5)
                                    productList.push(product);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, productList];
                }
            });
        });
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLHVDQUFxQztBQUdyQyxpREFBbUQ7QUFDbkQsMkJBQTZCO0FBRTdCLHlEQUFpRDtBQUNqRCx5REFBdUQ7QUFJdkQ7SUFLSSx3QkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsV0FBTSxHQUFVLFNBQVMsQ0FBQztRQUMxQixTQUFJLEdBQUcsRUFBRSxDQUFDO0lBSWxCLENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sNEJBQXlCLENBQUM7YUFDaEUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSxrQ0FBUyxHQUFoQixVQUFpQixVQUFrQjtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLCtCQUEwQixVQUFZLENBQUM7YUFDN0UsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw4QkFBOEI7SUFDaEIsd0NBQWUsR0FBN0IsVUFBOEIsR0FBRyxFQUFFLFFBQVE7Ozs7Ozt3QkFFbkMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDNUUscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQ0FDOUMsMEJBQTBCO2dDQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUMxQixDQUFDLEVBQUUsVUFBVSxDQUFDO2dDQUNWLDJCQUEyQjs0QkFDL0IsQ0FBQyxDQUFDLEVBQUE7O3dCQUxGLFNBS0UsQ0FBQzt3QkFDSCxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDdkI7SUFFWSwyQ0FBa0IsR0FBL0I7Ozs7Ozt3QkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMxQyxxQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFFO2lDQUM5QixJQUFJLENBQUMsVUFBQSxNQUFNO2dDQUNSLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQ0FDM0MsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDOUQsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3ZDLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0NBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQixDQUFDLENBQUMsRUFBQTs0QkFQRixzQkFBTyxTQU9MLEVBQUM7Ozs7S0FDTjtJQUVZLDJDQUFrQixHQUEvQjs7Ozs7O3dCQUNRLFdBQVcsR0FBRyxFQUFFLENBQUM7d0JBQ2pCLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNuRSxxQkFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztnQ0FDakIsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztvQ0FDM0QsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDbEMsQ0FBQyxDQUFDLEVBQUE7O3dCQUhGLFNBR0UsQ0FBQzt3QkFDSCxzQkFBTyxXQUFXLEVBQUM7Ozs7S0FDdEI7SUFwRFEsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQU1rQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FMekUsY0FBYyxDQXFEMUI7SUFBRCxxQkFBQztDQUFBLEFBckRELElBcURDO0FBckRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5cclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RTZXJ2aWNle1xyXG4gICAgcHJpdmF0ZSBfcHJvZHVjdHM6YW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJwcm9kdWN0XCI7XHJcbiAgICBwcml2YXRlIF9kb2MgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2R1Y3RzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9Qcm9kdWN0P0luYWN0aXZlSXRlbT1OYClcclxuICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbWFnZXMocGFyYW1ldGVyczogc3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlcy5qc29uP0l0ZW1Db2Rlcz0ke3BhcmFtZXRlcnN9YClcclxuICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vT2J0ZW5lciBpbWFnZW5lcyBkZSBwcm9kdWN0b1xyXG4gICAgcHVibGljIGFzeW5jICBnZXRQcm9kdWN0SW1hZ2UodXJsLCBmaWxlTmFtZSl7XHJcbiAgICAgICBcclxuICAgICAgICB2YXIgZmlsZVBhdGggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKS5wYXRoLCBmaWxlTmFtZStcIi5qcGdcIik7XHJcbiAgICAgICAgICAgIGF3YWl0IGh0dHAuZ2V0RmlsZSh1cmwsIGZpbGVQYXRoKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChyKSBpcyBGaWxlIVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZVBhdGgpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAoZSkgaXMgRXJyb3IhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsZVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldFByb2R1Y3REb2N1bWVudCgpe1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZGVsZXRlRG9jdW1lbnQoXCJwcm9kdWN0XCIpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldFByb2R1Y3RzKClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kb2NbdGhpcy5fZG9jSWRdID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9kb2MsIHRoaXMuX2RvY0lkKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSByZXN1bHRbXCJQcm9kdWN0XCJdO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFByb2R1Y3REb2N1bWVudCgpe1xyXG4gICAgICAgIGxldCBwcm9kdWN0TGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKVtcInByb2R1Y3RcIl07XHJcbiAgICAgICAgYXdhaXQgZG9jLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5Qcm9kdWN0VHlwZSA9PSBcIkZcIiAmJiBwcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlID4gNSlcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0LnB1c2gocHJvZHVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb2R1Y3RMaXN0O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==