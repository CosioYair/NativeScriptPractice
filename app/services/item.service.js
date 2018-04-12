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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLHVDQUFxQztBQUdyQyxpREFBbUQ7QUFDbkQsMkJBQTZCO0FBRTdCLHlEQUFpRDtBQUNqRCx5REFBdUQ7QUFJdkQ7SUFLSSx3QkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsV0FBTSxHQUFVLFNBQVMsQ0FBQztRQUMxQixTQUFJLEdBQUcsRUFBRSxDQUFDO0lBSWxCLENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sNEJBQXlCLENBQUM7YUFDaEUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSxrQ0FBUyxHQUFoQixVQUFpQixVQUFrQjtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLCtCQUEwQixVQUFZLENBQUM7YUFDN0UsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw4QkFBOEI7SUFDaEIsd0NBQWUsR0FBN0IsVUFBOEIsR0FBRyxFQUFFLFFBQVE7Ozs7Ozt3QkFFbkMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDNUUscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQ0FDOUMsMEJBQTBCO2dDQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUMxQixDQUFDLEVBQUUsVUFBVSxDQUFDO2dDQUNWLDJCQUEyQjs0QkFDL0IsQ0FBQyxDQUFDLEVBQUE7O3dCQUxGLFNBS0UsQ0FBQzt3QkFDSCxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDdkI7SUFFWSwyQ0FBa0IsR0FBL0I7Ozs7Ozt3QkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMxQyxxQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFFO2lDQUM5QixJQUFJLENBQUMsVUFBQSxNQUFNO2dDQUNSLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQ0FDM0MsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDOUQsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3ZDLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0NBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQixDQUFDLENBQUMsRUFBQTs0QkFQRixzQkFBTyxTQU9MLEVBQUM7Ozs7S0FDTjtJQUVZLDJDQUFrQixHQUEvQjs7Ozs7O3dCQUNRLFdBQVcsR0FBRyxFQUFFLENBQUM7d0JBQ2pCLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNuRSxxQkFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztnQ0FDakIsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztvQ0FDM0QsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDbEMsQ0FBQyxDQUFDLEVBQUE7O3dCQUhGLFNBR0UsQ0FBQzt3QkFDSCxzQkFBTyxXQUFXLEVBQUM7Ozs7S0FDdEI7SUFwRFEsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQU1rQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FMekUsY0FBYyxDQXFEMUI7SUFBRCxxQkFBQztDQUFBLEFBckRELElBcURDO0FBckRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcblxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xuXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vY291Y2hiYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VydmljZXtcbiAgICBwcml2YXRlIF9wcm9kdWN0czphbnk7XG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJwcm9kdWN0XCI7XG4gICAgcHJpdmF0ZSBfZG9jID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpe1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L1Byb2R1Y3Q/SW5hY3RpdmVJdGVtPU5gKVxuICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbWFnZXMocGFyYW1ldGVyczogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZXMuanNvbj9JdGVtQ29kZXM9JHtwYXJhbWV0ZXJzfWApXG4gICAgICAgIC5tYXAocmVzID0+IHJlcyk7XG4gICAgfVxuXG4gICAgLy9PYnRlbmVyIGltYWdlbmVzIGRlIHByb2R1Y3RvXG4gICAgcHVibGljIGFzeW5jICBnZXRQcm9kdWN0SW1hZ2UodXJsLCBmaWxlTmFtZSl7XG4gICAgICAgXG4gICAgICAgIHZhciBmaWxlUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGgsIGZpbGVOYW1lK1wiLmpwZ1wiKTtcbiAgICAgICAgICAgIGF3YWl0IGh0dHAuZ2V0RmlsZSh1cmwsIGZpbGVQYXRoKS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAocikgaXMgRmlsZSFcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlUGF0aCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIC8vLy8gQXJndW1lbnQgKGUpIGlzIEVycm9yIVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHNldFByb2R1Y3REb2N1bWVudCgpe1xuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmRlbGV0ZURvY3VtZW50KFwicHJvZHVjdFwiKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0UHJvZHVjdHMoKVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZG9jW3RoaXMuX2RvY0lkXSA9IHJlc3VsdFtcIlByb2R1Y3RcIl07XG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX2RvYywgdGhpcy5fZG9jSWQpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSByZXN1bHRbXCJQcm9kdWN0XCJdO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldFByb2R1Y3REb2N1bWVudCgpe1xuICAgICAgICBsZXQgcHJvZHVjdExpc3QgPSBbXTtcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJwcm9kdWN0XCIpW1wicHJvZHVjdFwiXTtcbiAgICAgICAgYXdhaXQgZG9jLm1hcChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuUHJvZHVjdFR5cGUgPT0gXCJGXCIgJiYgcHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSA+IDUpXG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3QucHVzaChwcm9kdWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9kdWN0TGlzdDtcbiAgICB9XG59XG4iXX0=