"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
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
            .map(function (res) { return res; });
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
        var _this = this;
        this.getProducts()
            .subscribe(function (result) {
            _this._doc[_this._docId] = result["Product"];
            _this._couchbaseService.createDocument(_this._doc, _this._docId);
            _this._products = result["Product"];
        }, function (error) {
            alert(error);
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
                                if (product.ProductType == "F")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRzlCLGlEQUFtRDtBQUNuRCwyQkFBNkI7QUFFN0IseURBQWlEO0FBQ2pELHlEQUF1RDtBQUl2RDtJQUtJLHdCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxXQUFNLEdBQVUsU0FBUyxDQUFDO1FBQzFCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFJbEIsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLHNCQUFNLENBQUMsT0FBTyw0QkFBeUIsQ0FBQzthQUNoRSxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLGtDQUFTLEdBQWhCLFVBQWlCLFVBQWtCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sK0JBQTBCLFVBQVksQ0FBQzthQUM3RSxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELDhCQUE4QjtJQUNoQix3Q0FBZSxHQUE3QixVQUE4QixHQUFHLEVBQUUsUUFBUTs7Ozs7O3dCQUVuQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM1RSxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dDQUM5QywwQkFBMEI7Z0NBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzFCLENBQUMsRUFBRSxVQUFVLENBQUM7Z0NBQ1YsMkJBQTJCOzRCQUMvQixDQUFDLENBQUMsRUFBQTs7d0JBTEYsU0FLRSxDQUFDO3dCQUNILHNCQUFPLFFBQVEsRUFBQzs7OztLQUN2QjtJQUVNLDJDQUFrQixHQUF6QjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLFdBQVcsRUFBRTthQUNqQixTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2IsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSwyQ0FBa0IsR0FBL0I7Ozs7Ozt3QkFDUSxXQUFXLEdBQUcsRUFBRSxDQUFDO3dCQUNqQixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDbkUscUJBQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU87Z0NBQ2pCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDO29DQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNsQyxDQUFDLENBQUMsRUFBQTs7d0JBSEYsU0FHRSxDQUFDO3dCQUNILHNCQUFPLFdBQVcsRUFBQzs7OztLQUN0QjtJQW5EUSxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7eUNBTWtCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUx6RSxjQUFjLENBb0QxQjtJQUFELHFCQUFDO0NBQUEsQUFwREQsSUFvREM7QUFwRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5cclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RTZXJ2aWNle1xyXG4gICAgcHJpdmF0ZSBfcHJvZHVjdHM6YW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJwcm9kdWN0XCI7XHJcbiAgICBwcml2YXRlIF9kb2MgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2R1Y3RzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9Qcm9kdWN0P0luYWN0aXZlSXRlbT1OYClcclxuICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbWFnZXMocGFyYW1ldGVyczogc3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlcy5qc29uP0l0ZW1Db2Rlcz0ke3BhcmFtZXRlcnN9YClcclxuICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vT2J0ZW5lciBpbWFnZW5lcyBkZSBwcm9kdWN0b1xyXG4gICAgcHVibGljIGFzeW5jICBnZXRQcm9kdWN0SW1hZ2UodXJsLCBmaWxlTmFtZSl7XHJcbiAgICAgICBcclxuICAgICAgICB2YXIgZmlsZVBhdGggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKS5wYXRoLCBmaWxlTmFtZStcIi5qcGdcIik7XHJcbiAgICAgICAgICAgIGF3YWl0IGh0dHAuZ2V0RmlsZSh1cmwsIGZpbGVQYXRoKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChyKSBpcyBGaWxlIVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZVBhdGgpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAoZSkgaXMgRXJyb3IhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsZVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFByb2R1Y3REb2N1bWVudCgpe1xyXG4gICAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKVxyXG4gICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZG9jW3RoaXMuX2RvY0lkXSA9IHJlc3VsdFtcIlByb2R1Y3RcIl07XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fZG9jLCB0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRQcm9kdWN0RG9jdW1lbnQoKXtcclxuICAgICAgICBsZXQgcHJvZHVjdExpc3QgPSBbXTtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInByb2R1Y3RcIilbXCJwcm9kdWN0XCJdO1xyXG4gICAgICAgIGF3YWl0IGRvYy5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuUHJvZHVjdFR5cGUgPT0gXCJGXCIpXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdC5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9kdWN0TGlzdDtcclxuICAgIH1cclxufVxyXG4iXX0=