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
                        return [4 /*yield*/, doc.map(function (shipping) {
                                shippingAddressList.push(shipping.ShipToCode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmdBZGRyZXNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGlwcGluZ0FkZHJlc3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMseURBQWlEO0FBRWpELDRGQUEwRjtBQUMxRix5REFBdUQ7QUFHdkQ7SUFJSSxnQ0FBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLHFCQUFnQixHQUFvQyxJQUFJLGtDQUFlLEVBQW1CLENBQUM7SUFJbkcsQ0FBQztJQUVNLG1EQUFrQixHQUF6QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sOEJBQTJCLENBQUM7YUFDbEUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFWSxzREFBcUIsR0FBbEM7Ozs7Ozt3QkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQ2xELHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtpQ0FDckMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQ0FDUixLQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQy9DLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0NBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQixDQUFDLENBQUMsRUFBQTs0QkFMRixzQkFBTyxTQUtMLEVBQUM7Ozs7S0FDTjtJQUVhLDhEQUE2QixHQUEzQyxVQUE0QyxnQkFBZ0I7Ozs7Ozt3QkFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNqRCxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRO2dDQUMvQixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDO29DQUN4RSxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDbEYsSUFBSTtvQ0FDQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUN4RixDQUFDLENBQUMsRUFBQTs7d0JBTEYsU0FLRSxDQUFDO3dCQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7Ozs7O0tBQ3RGO0lBRVksK0RBQThCLEdBQTNDLFVBQTRDLFFBQVE7Ozs7Ozt3QkFDNUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO3dCQUN6QixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN4RyxxQkFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUTtnQ0FDbEIsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDbEQsQ0FBQyxDQUFDLEVBQUE7O3dCQUZGLFNBRUUsQ0FBQzt3QkFDSCxzQkFBTyxtQkFBbUIsRUFBQzs7OztLQUM5QjtJQUVZLDJEQUEwQixHQUF2QyxVQUF3QyxRQUFROzs7Z0JBQzVDLHNCQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBQzs7O0tBQ3hHO0lBN0NRLHNCQUFzQjtRQURsQyxpQkFBVSxFQUFFO3lDQUtrQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FKekUsc0JBQXNCLENBOENsQztJQUFELDZCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7QUE5Q1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzcyB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2hpcHBpbmdBZGRyZXNzLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXknO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3VjaGJhc2Uuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzc0RvYyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzOk9ic2VydmFibGVBcnJheTxTaGlwcGluZ0FkZHJlc3M+ID0gbmV3IE9ic2VydmFibGVBcnJheTxTaGlwcGluZ0FkZHJlc3M+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTaGlwcGluZ0FkZHJlc3MoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L0N1c3RvbWVyL1NoaXBwaW5nQWRkcmVzc2ApXHJcbiAgICAgICAgLm1hcChyZXMgPT4gcmVzKS50b1Byb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0U2hpcHBpbmdBZGRyZXNzRG9jKCl7XHJcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRTaGlwcGluZ0FkZHJlc3MoKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyQ3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MocmVzdWx0KTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZmlsdGVyQ3VzdG9tZXJTaGlwcGluZ0FkZHJlc3Moc2hpcHBpbmdzQWRkcmVzcyl7XHJcbiAgICAgICAgdGhpcy5fc2hpcHBpbmdBZGRyZXNzRG9jW1wic2hpcHBpbmdhZGRyZXNzXCJdID0ge307XHJcbiAgICAgICAgYXdhaXQgc2hpcHBpbmdzQWRkcmVzcy5tYXAoc2hpcHBpbmcgPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXVtzaGlwcGluZy5DdXN0b21lck5vXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hpcHBpbmdBZGRyZXNzRG9jW1wic2hpcHBpbmdhZGRyZXNzXCJdW3NoaXBwaW5nLkN1c3RvbWVyTm9dID0gW3NoaXBwaW5nXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hpcHBpbmdBZGRyZXNzRG9jW1wic2hpcHBpbmdhZGRyZXNzXCJdW3NoaXBwaW5nLkN1c3RvbWVyTm9dLnB1c2goc2hpcHBpbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fc2hpcHBpbmdBZGRyZXNzRG9jLCBcInNoaXBwaW5nYWRkcmVzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NMaXN0KGN1c3RvbWVyKXtcclxuICAgICAgICBsZXQgc2hpcHBpbmdBZGRyZXNzTGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2hpcHBpbmdhZGRyZXNzXCIpW1wic2hpcHBpbmdhZGRyZXNzXCJdW2N1c3RvbWVyLkN1c3RvbWVyTm9dO1xyXG4gICAgICAgIGF3YWl0IGRvYy5tYXAoc2hpcHBpbmcgPT4ge1xyXG4gICAgICAgICAgICBzaGlwcGluZ0FkZHJlc3NMaXN0LnB1c2goc2hpcHBpbmcuU2hpcFRvQ29kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNoaXBwaW5nQWRkcmVzc0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKGN1c3RvbWVyKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKVtcInNoaXBwaW5nYWRkcmVzc1wiXVtjdXN0b21lci5DdXN0b21lck5vXTtcclxuICAgIH1cclxufSJdfQ==