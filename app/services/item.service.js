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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRzlCLGlEQUFtRDtBQUNuRCwyQkFBNkI7QUFFN0IseURBQWlEO0FBQ2pELHlEQUF1RDtBQUl2RDtJQUtJLHdCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxXQUFNLEdBQVUsU0FBUyxDQUFDO1FBQzFCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFJbEIsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLHNCQUFNLENBQUMsT0FBTyw0QkFBeUIsQ0FBQzthQUNoRSxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLGtDQUFTLEdBQWhCLFVBQWlCLFVBQWtCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sK0JBQTBCLFVBQVksQ0FBQzthQUM3RSxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELDhCQUE4QjtJQUNoQix3Q0FBZSxHQUE3QixVQUE4QixHQUFHLEVBQUUsUUFBUTs7Ozs7O3dCQUVuQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM1RSxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dDQUM5QywwQkFBMEI7Z0NBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzFCLENBQUMsRUFBRSxVQUFVLENBQUM7Z0NBQ1YsMkJBQTJCOzRCQUMvQixDQUFDLENBQUMsRUFBQTs7d0JBTEYsU0FLRSxDQUFDO3dCQUNILHNCQUFPLFFBQVEsRUFBQzs7OztLQUN2QjtJQUVNLDJDQUFrQixHQUF6QjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLFdBQVcsRUFBRTthQUNqQixTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2IsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSwyQ0FBa0IsR0FBL0I7Ozs7Ozt3QkFDUSxXQUFXLEdBQUcsRUFBRSxDQUFDO3dCQUNqQixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDbkUscUJBQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU87Z0NBQ2pCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7b0NBQzNELFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ2xDLENBQUMsQ0FBQyxFQUFBOzt3QkFIRixTQUdFLENBQUM7d0JBQ0gsc0JBQU8sV0FBVyxFQUFDOzs7O0tBQ3RCO0lBbkRRLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FNa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BTHpFLGNBQWMsQ0FvRDFCO0lBQUQscUJBQUM7Q0FBQSxBQXBERCxJQW9EQztBQXBEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuXHJcbmltcG9ydCAqIGFzIGltYWdlU291cmNlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XHJcblxyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdFNlcnZpY2V7XHJcbiAgICBwcml2YXRlIF9wcm9kdWN0czphbnk7XHJcbiAgICBwcml2YXRlIF9kb2NJZDpzdHJpbmcgPSBcInByb2R1Y3RcIjtcclxuICAgIHByaXZhdGUgX2RvYyA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJvZHVjdHMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L1Byb2R1Y3Q/SW5hY3RpdmVJdGVtPU5gKVxyXG4gICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEltYWdlcyhwYXJhbWV0ZXJzOiBzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtTRVJWRVIuYmFzZVVybH0vSW1hZ2VzLmpzb24/SXRlbUNvZGVzPSR7cGFyYW1ldGVyc31gKVxyXG4gICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9PYnRlbmVyIGltYWdlbmVzIGRlIHByb2R1Y3RvXHJcbiAgICBwdWJsaWMgYXN5bmMgIGdldFByb2R1Y3RJbWFnZSh1cmwsIGZpbGVOYW1lKXtcclxuICAgICAgIFxyXG4gICAgICAgIHZhciBmaWxlUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGgsIGZpbGVOYW1lK1wiLmpwZ1wiKTtcclxuICAgICAgICAgICAgYXdhaXQgaHR0cC5nZXRGaWxlKHVybCwgZmlsZVBhdGgpLnRoZW4oZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgIC8vLy8gQXJndW1lbnQgKHIpIGlzIEZpbGUhXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChlKSBpcyBFcnJvciFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UHJvZHVjdERvY3VtZW50KCl7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9kdWN0cygpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kb2NbdGhpcy5fZG9jSWRdID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9kb2MsIHRoaXMuX2RvY0lkKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSByZXN1bHRbXCJQcm9kdWN0XCJdO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFByb2R1Y3REb2N1bWVudCgpe1xyXG4gICAgICAgIGxldCBwcm9kdWN0TGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwicHJvZHVjdFwiKVtcInByb2R1Y3RcIl07XHJcbiAgICAgICAgYXdhaXQgZG9jLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5Qcm9kdWN0VHlwZSA9PSBcIkZcIiAmJiBwcm9kdWN0LlN0YW5kYXJkVW5pdFByaWNlID4gNSlcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0LnB1c2gocHJvZHVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb2R1Y3RMaXN0O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==