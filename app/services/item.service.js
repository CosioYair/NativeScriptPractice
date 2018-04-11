"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var imageSourceModule = require("tns-core-modules/image-source");
var imageSource = require("tns-core-modules/image-source");
var fs = require("tns-core-modules/file-system");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var ProductService = /** @class */ (function () {
    function ProductService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._docId = "product";
        this._doc = {};
        this.folder = fs.Folder.fromPath(fs.path.join(fs.knownFolders.documents().path, "Cached_Images"));
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
    ProductService.prototype.getImage = function (ItemCode) {
        if (fs.File.exists(this.folder.path + "/" + ItemCode + ".png")) {
            var filePath = fs.path.join(this.folder.path, ItemCode + ".png");
            return imageSource.fromFile(filePath);
        }
    };
    ProductService.prototype.downloadImage = function (ItemCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = server_config_1.SERVER.baseUrl + "/Image/" + ItemCode;
                        if (!!fs.File.exists(this.folder.path + "/" + ItemCode + ".png")) return [3 /*break*/, 2];
                        return [4 /*yield*/, imageSourceModule.fromUrl(url).then(function (imgSrc) {
                                var path = fs.path.join(_this.folder.path, ItemCode + ".png");
                                imgSrc.saveToFile(path, "png");
                                console.log(ItemCode);
                            }).catch(function (err) {
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.removeImage = function (key) {
        alert("remove image");
        console.log("removeImage");
        var file = this.folder.getFile(key + ".jpg");
        return file.remove();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLHVDQUFxQztBQUVyQyxpRUFBbUU7QUFDbkUsMkRBQTZEO0FBQzdELGlEQUFtRDtBQUduRCx5REFBaUQ7QUFDakQseURBQXVEO0FBSXZEO0lBTUksd0JBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBSjFFLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFdBQU0sR0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBSWhILENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sNEJBQXlCLENBQUM7YUFDNUQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxrQ0FBUyxHQUFoQixVQUFpQixVQUFrQjtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLCtCQUEwQixVQUFZLENBQUM7YUFDekUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4QkFBOEI7SUFDdkIsaUNBQVEsR0FBZixVQUFnQixRQUFRO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFJLFFBQVEsU0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFLLFFBQVEsU0FBTSxDQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNMLENBQUM7SUFFWSxzQ0FBYSxHQUExQixVQUEyQixRQUFROzs7Ozs7O3dCQUMzQixHQUFHLEdBQU0sc0JBQU0sQ0FBQyxPQUFPLGVBQVUsUUFBVSxDQUFDOzZCQUM1QyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFJLFFBQVEsU0FBTSxDQUFDLEVBQXRELHdCQUFzRDt3QkFDL0MscUJBQU0saUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0NBQ25ELElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFLLFFBQVEsU0FBTSxDQUFDLENBQUM7Z0NBQy9ELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dDQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUMxQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO2dDQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUM7NEJBQ2pCLENBQUMsQ0FBQyxFQUFBOzRCQU5GLHNCQUFPLFNBTUwsRUFBQzs7Ozs7S0FFVjtJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLEdBQVc7UUFDMUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUksR0FBRyxTQUFNLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFWSwyQ0FBa0IsR0FBL0I7Ozs7Ozt3QkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMxQyxxQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFFO2lDQUMxQixJQUFJLENBQUMsVUFBQSxNQUFNO2dDQUNSLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQ0FDM0MsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDOUQsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3ZDLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0NBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQixDQUFDLENBQUMsRUFBQTs0QkFQTixzQkFBTyxTQU9ELEVBQUM7Ozs7S0FDVjtJQUVZLDJDQUFrQixHQUEvQjs7Ozs7O3dCQUNRLFdBQVcsR0FBRyxFQUFFLENBQUM7d0JBQ2pCLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNuRSxxQkFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztnQ0FDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztvQ0FDNUQsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDbEMsQ0FBQyxDQUFDLEVBQUE7O3dCQUhGLFNBR0UsQ0FBQzt3QkFDSCxzQkFBTyxXQUFXLEVBQUM7Ozs7S0FDdEI7SUFwRVEsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQU9rQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FOekUsY0FBYyxDQXFFMUI7SUFBRCxxQkFBQztDQUFBLEFBckVELElBcUVDO0FBckVZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcclxuXHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czogYW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwicHJvZHVjdFwiO1xyXG4gICAgcHJpdmF0ZSBfZG9jID0ge307XHJcbiAgICBwcml2YXRlIGZvbGRlcjogZnMuRm9sZGVyID0gZnMuRm9sZGVyLmZyb21QYXRoKGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkucGF0aCwgXCJDYWNoZWRfSW1hZ2VzXCIpKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L1Byb2R1Y3Q/SW5hY3RpdmVJdGVtPU5gKVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbWFnZXMocGFyYW1ldGVyczogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9JbWFnZXMuanNvbj9JdGVtQ29kZXM9JHtwYXJhbWV0ZXJzfWApXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9PYnRlbmVyIGltYWdlbmVzIGRlIHByb2R1Y3RvXHJcbiAgICBwdWJsaWMgZ2V0SW1hZ2UoSXRlbUNvZGUpOiBpbWFnZVNvdXJjZS5JbWFnZVNvdXJjZSB7XHJcbiAgICAgICAgaWYgKGZzLkZpbGUuZXhpc3RzKGAke3RoaXMuZm9sZGVyLnBhdGh9LyR7SXRlbUNvZGV9LnBuZ2ApKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gZnMucGF0aC5qb2luKHRoaXMuZm9sZGVyLnBhdGgsIGAke0l0ZW1Db2RlfS5wbmdgKTtcclxuICAgICAgICAgICAgcmV0dXJuIGltYWdlU291cmNlLmZyb21GaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGRvd25sb2FkSW1hZ2UoSXRlbUNvZGUpIHtcclxuICAgICAgICBsZXQgdXJsID0gYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7SXRlbUNvZGV9YDtcclxuICAgICAgICBpZiAoIWZzLkZpbGUuZXhpc3RzKGAke3RoaXMuZm9sZGVyLnBhdGh9LyR7SXRlbUNvZGV9LnBuZ2ApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBpbWFnZVNvdXJjZU1vZHVsZS5mcm9tVXJsKHVybCkudGhlbihpbWdTcmMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGZzLnBhdGguam9pbih0aGlzLmZvbGRlci5wYXRoLCBgJHtJdGVtQ29kZX0ucG5nYCk7XHJcbiAgICAgICAgICAgICAgICBpbWdTcmMuc2F2ZVRvRmlsZShwYXRoLCBcInBuZ1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEl0ZW1Db2RlKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVJbWFnZShrZXk6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYWxlcnQoXCJyZW1vdmUgaW1hZ2VcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmVJbWFnZVwiKTtcclxuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5mb2xkZXIuZ2V0RmlsZShgJHtrZXl9LmpwZ2ApO1xyXG4gICAgICAgIHJldHVybiBmaWxlLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZXRQcm9kdWN0RG9jdW1lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcInByb2R1Y3RcIik7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0UHJvZHVjdHMoKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZG9jW3RoaXMuX2RvY0lkXSA9IHJlc3VsdFtcIlByb2R1Y3RcIl07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX2RvYywgdGhpcy5fZG9jSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSByZXN1bHRbXCJQcm9kdWN0XCJdO1xyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFByb2R1Y3REb2N1bWVudCgpIHtcclxuICAgICAgICBsZXQgcHJvZHVjdExpc3QgPSBbXTtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIilbXCJwcm9kdWN0XCJdO1xyXG4gICAgICAgIGF3YWl0IGRvYy5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0LlByb2R1Y3RUeXBlID09IFwiRlwiICYmIHByb2R1Y3QuU3RhbmRhcmRVbml0UHJpY2UgPiA1KVxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3QucHVzaChwcm9kdWN0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcHJvZHVjdExpc3Q7XHJcbiAgICB9XHJcbn1cclxuIl19