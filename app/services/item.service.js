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
                    case 2:
                        console.log(ItemCode);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.removeImage = function (ItemCode) {
        var file = this.folder.getFile(ItemCode + ".png");
        console.log(ItemCode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLHVDQUFxQztBQUdyQyxpRUFBbUU7QUFDbkUsMkRBQTZEO0FBQzdELGlEQUFtRDtBQUduRCx5REFBaUQ7QUFDakQseURBQXVEO0FBSXZEO0lBTUksd0JBQW9CLEtBQWlCLEVBQVUsaUJBQW1DO1FBQTlELFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBSjFFLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFdBQU0sR0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBSWhILENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sNEJBQXlCLENBQUM7YUFDNUQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxrQ0FBUyxHQUFoQixVQUFpQixVQUFrQjtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLCtCQUEwQixVQUFZLENBQUM7YUFDekUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4QkFB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LE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7b0NBQzVELFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ2xDLENBQUMsQ0FBQyxFQUFBOzt3QkFIRixTQUdFLENBQUM7d0JBQ0gsc0JBQU8sV0FBVyxFQUFDOzs7O0tBQ3RCO0lBckVRLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FPa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BTnpFLGNBQWMsQ0FzRTFCO0lBQUQscUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG5cbmltcG9ydCAqIGFzIGltYWdlQ2FjaGVNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2UtY2FjaGVcIjtcbmltcG9ydCAqIGFzIGltYWdlU291cmNlTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xuXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vY291Y2hiYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VydmljZSB7XG4gICAgcHJpdmF0ZSBfcHJvZHVjdHM6IGFueTtcbiAgICBwcml2YXRlIF9kb2NJZDogc3RyaW5nID0gXCJwcm9kdWN0XCI7XG4gICAgcHJpdmF0ZSBfZG9jID0ge307XG4gICAgcHJpdmF0ZSBmb2xkZXI6IGZzLkZvbGRlciA9IGZzLkZvbGRlci5mcm9tUGF0aChmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpLnBhdGgsIFwiQ2FjaGVkX0ltYWdlc1wiKSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvZHVjdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtTRVJWRVIuYmFzZVVybH0vUHJvZHVjdD9JbmFjdGl2ZUl0ZW09TmApXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbWFnZXMocGFyYW1ldGVyczogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2VzLmpzb24/SXRlbUNvZGVzPSR7cGFyYW1ldGVyc31gKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKTtcbiAgICB9XG5cbiAgICAvL09idGVuZXIgaW1hZ2VuZXMgZGUgcHJvZHVjdG9cbiAgICBwdWJsaWMgZ2V0SW1hZ2UoSXRlbUNvZGUpOiBpbWFnZVNvdXJjZS5JbWFnZVNvdXJjZSB7XG4gICAgICAgIGlmIChmcy5GaWxlLmV4aXN0cyhgJHt0aGlzLmZvbGRlci5wYXRofS8ke0l0ZW1Db2RlfS5wbmdgKSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBmcy5wYXRoLmpvaW4odGhpcy5mb2xkZXIucGF0aCwgYCR7SXRlbUNvZGV9LnBuZ2ApO1xuICAgICAgICAgICAgcmV0dXJuIGltYWdlU291cmNlLmZyb21GaWxlKGZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBkb3dubG9hZEltYWdlKEl0ZW1Db2RlKSB7XG4gICAgICAgIGxldCB1cmwgPSBgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2UvJHtJdGVtQ29kZX1gO1xuICAgICAgICBpZiAoIWZzLkZpbGUuZXhpc3RzKGAke3RoaXMuZm9sZGVyLnBhdGh9LyR7SXRlbUNvZGV9LnBuZ2ApKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgaW1hZ2VTb3VyY2VNb2R1bGUuZnJvbVVybCh1cmwpLnRoZW4oaW1nU3JjID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gZnMucGF0aC5qb2luKHRoaXMuZm9sZGVyLnBhdGgsIGAke0l0ZW1Db2RlfS5wbmdgKTtcbiAgICAgICAgICAgICAgICBpbWdTcmMuc2F2ZVRvRmlsZShwYXRoLCBcInBuZ1wiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhJdGVtQ29kZSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEl0ZW1Db2RlKVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVJbWFnZShJdGVtQ29kZSl7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmZvbGRlci5nZXRGaWxlKGAke0l0ZW1Db2RlfS5wbmdgKTtcbiAgICAgICAgY29uc29sZS5sb2coSXRlbUNvZGUpO1xuICAgICAgICByZXR1cm4gZmlsZS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgc2V0UHJvZHVjdERvY3VtZW50KCkge1xuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmRlbGV0ZURvY3VtZW50KFwicHJvZHVjdFwiKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0UHJvZHVjdHMoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb2NbdGhpcy5fZG9jSWRdID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX2RvYywgdGhpcy5fZG9jSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRQcm9kdWN0RG9jdW1lbnQoKSB7XG4gICAgICAgIGxldCBwcm9kdWN0TGlzdCA9IFtdO1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIilbXCJwcm9kdWN0XCJdO1xuICAgICAgICBhd2FpdCBkb2MubWFwKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QuUHJvZHVjdFR5cGUgPT0gXCJGXCIgJiYgcHJvZHVjdC5TdGFuZGFyZFVuaXRQcmljZSA+IDUpXG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3QucHVzaChwcm9kdWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9kdWN0TGlzdDtcbiAgICB9XG59XG4iXX0=