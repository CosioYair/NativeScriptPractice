"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var server_config_1 = require("../config/server.config");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var couchbase_service_1 = require("./couchbase.service");
var ShippingAddressService = /** @class */ (function () {
    function ShippingAddressService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._shippingAddressDoc = {};
        this._shippingAddress = new observable_array_1.ObservableArray();
    }
    ShippingAddressService.prototype.getShippingAddress = function () {
        return this._http.get(server_config_1.SERVER.baseUrl + "/Customer/ShippingAddress")
            .map(function (res) { return res; }).toPromise();
    };
    ShippingAddressService.prototype.setShippingAddressDoc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._couchbaseService.deleteDocument("shippingaddress");
                        return [4 /*yield*/, this.getShippingAddress()
                                .then(function (result) {
                                _this.filterCustomerShippingAddress(result);
                            }, function (error) {
                                alert(error);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ShippingAddressService.prototype.filterCustomerShippingAddress = function (shippingsAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._shippingAddressDoc["shippingaddress"] = {};
                        return [4 /*yield*/, shippingsAddress.map(function (shipping) {
                                if (_this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo] == null)
                                    _this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo] = [shipping];
                                else
                                    _this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo].push(shipping);
                            })];
                    case 1:
                        _a.sent();
                        this._couchbaseService.createDocument(this._shippingAddressDoc, "shippingaddress");
                        return [2 /*return*/];
                }
            });
        });
    };
    ShippingAddressService.prototype.getCustomerShippingAddressList = function (customer) {
        return __awaiter(this, void 0, void 0, function () {
            var shippingAddressList, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shippingAddressList = [];
                        doc = this._couchbaseService.getDocument("shippingaddress")["shippingaddress"][customer.CustomerNo];
                        if (doc == undefined)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, doc.map(function (shipping) {
                                shippingAddressList.push(shipping.ShipToCode + ': ' + shipping.ShipToCity + ', ' + shipping.ShipToState + '. ' + shipping.ShipToZipCode);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, shippingAddressList];
                }
            });
        });
    };
    ShippingAddressService.prototype.getCustomerShippingAddress = function (customer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._couchbaseService.getDocument("shippingaddress")["shippingaddress"][customer.CustomerNo]];
            });
        });
    };
    ShippingAddressService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], ShippingAddressService);
    return ShippingAddressService;
}());
exports.ShippingAddressService = ShippingAddressService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmdBZGRyZXNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGlwcGluZ0FkZHJlc3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMseURBQWlEO0FBRWpELDRGQUEwRjtBQUMxRix5REFBdUQ7QUFHdkQ7SUFJSSxnQ0FBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLHFCQUFnQixHQUFvQyxJQUFJLGtDQUFlLEVBQW1CLENBQUM7SUFJbkcsQ0FBQztJQUVNLG1EQUFrQixHQUF6QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sOEJBQTJCLENBQUM7YUFDbEUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFWSxzREFBcUIsR0FBbEM7Ozs7Ozt3QkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQ2xELHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtpQ0FDckMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQ0FDUixLQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQy9DLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0NBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQixDQUFDLENBQUMsRUFBQTs0QkFMRixzQkFBTyxTQUtMLEVBQUM7Ozs7S0FDTjtJQUVhLDhEQUE2QixHQUEzQyxVQUE0QyxnQkFBZ0I7Ozs7Ozt3QkFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNqRCxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRO2dDQUMvQixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDO29DQUN4RSxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDbEYsSUFBSTtvQ0FDQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUN4RixDQUFDLENBQUMsRUFBQTs7d0JBTEYsU0FLRSxDQUFDO3dCQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7Ozs7O0tBQ3RGO0lBRVksK0RBQThCLEdBQTNDLFVBQTRDLFFBQVE7Ozs7Ozt3QkFDNUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO3dCQUN6QixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN4RyxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDOzRCQUNoQixNQUFNLGdCQUFDLElBQUksRUFBQzt3QkFDaEIscUJBQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVE7Z0NBQ2xCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQzdJLENBQUMsQ0FBQyxFQUFBOzt3QkFGRixTQUVFLENBQUM7d0JBQ0gsc0JBQU8sbUJBQW1CLEVBQUM7Ozs7S0FDOUI7SUFFWSwyREFBMEIsR0FBdkMsVUFBd0MsUUFBUTs7O2dCQUM1QyxzQkFBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUM7OztLQUN4RztJQS9DUSxzQkFBc0I7UUFEbEMsaUJBQVUsRUFBRTt5Q0FLa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSnpFLHNCQUFzQixDQWdEbEM7SUFBRCw2QkFBQztDQUFBLEFBaERELElBZ0RDO0FBaERZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaGlwcGluZ0FkZHJlc3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXknO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gJy4vY291Y2hiYXNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB7XG4gICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzRG9jID0ge307XG4gICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzOk9ic2VydmFibGVBcnJheTxTaGlwcGluZ0FkZHJlc3M+ID0gbmV3IE9ic2VydmFibGVBcnJheTxTaGlwcGluZ0FkZHJlc3M+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaGlwcGluZ0FkZHJlc3MoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9DdXN0b21lci9TaGlwcGluZ0FkZHJlc3NgKVxuICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzZXRTaGlwcGluZ0FkZHJlc3NEb2MoKXtcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0U2hpcHBpbmdBZGRyZXNzKClcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyQ3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MocmVzdWx0KTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZmlsdGVyQ3VzdG9tZXJTaGlwcGluZ0FkZHJlc3Moc2hpcHBpbmdzQWRkcmVzcyl7XG4gICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXSA9IHt9O1xuICAgICAgICBhd2FpdCBzaGlwcGluZ3NBZGRyZXNzLm1hcChzaGlwcGluZyA9PntcbiAgICAgICAgICAgIGlmKHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXVtzaGlwcGluZy5DdXN0b21lck5vXSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXVtzaGlwcGluZy5DdXN0b21lck5vXSA9IFtzaGlwcGluZ107XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hpcHBpbmdBZGRyZXNzRG9jW1wic2hpcHBpbmdhZGRyZXNzXCJdW3NoaXBwaW5nLkN1c3RvbWVyTm9dLnB1c2goc2hpcHBpbmcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9zaGlwcGluZ0FkZHJlc3NEb2MsIFwic2hpcHBpbmdhZGRyZXNzXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRDdXN0b21lclNoaXBwaW5nQWRkcmVzc0xpc3QoY3VzdG9tZXIpe1xuICAgICAgICBsZXQgc2hpcHBpbmdBZGRyZXNzTGlzdCA9IFtdO1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKVtcInNoaXBwaW5nYWRkcmVzc1wiXVtjdXN0b21lci5DdXN0b21lck5vXTtcbiAgICAgICAgaWYoZG9jID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBhd2FpdCBkb2MubWFwKHNoaXBwaW5nID0+IHtcbiAgICAgICAgICAgIHNoaXBwaW5nQWRkcmVzc0xpc3QucHVzaChzaGlwcGluZy5TaGlwVG9Db2RlICsgJzogJyArIHNoaXBwaW5nLlNoaXBUb0NpdHkgKyAnLCAnICsgc2hpcHBpbmcuU2hpcFRvU3RhdGUgKyAnLiAnICsgc2hpcHBpbmcuU2hpcFRvWmlwQ29kZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2hpcHBpbmdBZGRyZXNzTGlzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MoY3VzdG9tZXIpe1xuICAgICAgICByZXR1cm4gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKVtcInNoaXBwaW5nYWRkcmVzc1wiXVtjdXN0b21lci5DdXN0b21lck5vXTtcbiAgICB9XG59Il19