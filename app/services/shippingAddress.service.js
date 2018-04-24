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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmdBZGRyZXNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGlwcGluZ0FkZHJlc3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMseURBQWlEO0FBRWpELDRGQUEwRjtBQUMxRix5REFBdUQ7QUFHdkQ7SUFJSSxnQ0FBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLHFCQUFnQixHQUFvQyxJQUFJLGtDQUFlLEVBQW1CLENBQUM7SUFJbkcsQ0FBQztJQUVNLG1EQUFrQixHQUF6QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sOEJBQTJCLENBQUM7YUFDbEUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFWSxzREFBcUIsR0FBbEM7Ozs7Ozt3QkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQ2xELHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtpQ0FDckMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQ0FDUixLQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQy9DLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0NBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQixDQUFDLENBQUMsRUFBQTs0QkFMRixzQkFBTyxTQUtMLEVBQUM7Ozs7S0FDTjtJQUVhLDhEQUE2QixHQUEzQyxVQUE0QyxnQkFBZ0I7Ozs7Ozt3QkFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNqRCxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRO2dDQUMvQixFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDO29DQUN4RSxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDbEYsSUFBSTtvQ0FDQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUN4RixDQUFDLENBQUMsRUFBQTs7d0JBTEYsU0FLRSxDQUFDO3dCQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7Ozs7O0tBQ3RGO0lBRVksK0RBQThCLEdBQTNDLFVBQTRDLFFBQVE7Ozs7Ozt3QkFDNUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO3dCQUN6QixHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN4RyxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDOzRCQUNoQixNQUFNLGdCQUFDLElBQUksRUFBQzt3QkFDaEIscUJBQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVE7Z0NBQ2xCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQzdJLENBQUMsQ0FBQyxFQUFBOzt3QkFGRixTQUVFLENBQUM7d0JBQ0gsc0JBQU8sbUJBQW1CLEVBQUM7Ozs7S0FDOUI7SUFFWSwyREFBMEIsR0FBdkMsVUFBd0MsUUFBUTs7O2dCQUM1QyxzQkFBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUM7OztLQUN4RztJQS9DUSxzQkFBc0I7UUFEbEMsaUJBQVUsRUFBRTt5Q0FLa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSnpFLHNCQUFzQixDQWdEbEM7SUFBRCw2QkFBQztDQUFBLEFBaERELElBZ0RDO0FBaERZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBTaGlwcGluZ0FkZHJlc3MgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NoaXBwaW5nQWRkcmVzcy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5JztcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gJy4vY291Y2hiYXNlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9zaGlwcGluZ0FkZHJlc3NEb2MgPSB7fTtcclxuICAgIHByaXZhdGUgX3NoaXBwaW5nQWRkcmVzczpPYnNlcnZhYmxlQXJyYXk8U2hpcHBpbmdBZGRyZXNzPiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8U2hpcHBpbmdBZGRyZXNzPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2hpcHBpbmdBZGRyZXNzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9DdXN0b21lci9TaGlwcGluZ0FkZHJlc3NgKVxyXG4gICAgICAgIC5tYXAocmVzID0+IHJlcykudG9Qcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldFNoaXBwaW5nQWRkcmVzc0RvYygpe1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZGVsZXRlRG9jdW1lbnQoXCJzaGlwcGluZ2FkZHJlc3NcIik7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0U2hpcHBpbmdBZGRyZXNzKClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGZpbHRlckN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKHNoaXBwaW5nc0FkZHJlc3Mpe1xyXG4gICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXSA9IHt9O1xyXG4gICAgICAgIGF3YWl0IHNoaXBwaW5nc0FkZHJlc3MubWFwKHNoaXBwaW5nID0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zaGlwcGluZ0FkZHJlc3NEb2NbXCJzaGlwcGluZ2FkZHJlc3NcIl1bc2hpcHBpbmcuQ3VzdG9tZXJOb10gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXVtzaGlwcGluZy5DdXN0b21lck5vXSA9IFtzaGlwcGluZ107XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXVtzaGlwcGluZy5DdXN0b21lck5vXS5wdXNoKHNoaXBwaW5nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvYywgXCJzaGlwcGluZ2FkZHJlc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzTGlzdChjdXN0b21lcil7XHJcbiAgICAgICAgbGV0IHNoaXBwaW5nQWRkcmVzc0xpc3QgPSBbXTtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInNoaXBwaW5nYWRkcmVzc1wiKVtcInNoaXBwaW5nYWRkcmVzc1wiXVtjdXN0b21lci5DdXN0b21lck5vXTtcclxuICAgICAgICBpZihkb2MgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBhd2FpdCBkb2MubWFwKHNoaXBwaW5nID0+IHtcclxuICAgICAgICAgICAgc2hpcHBpbmdBZGRyZXNzTGlzdC5wdXNoKHNoaXBwaW5nLlNoaXBUb0NvZGUgKyAnOiAnICsgc2hpcHBpbmcuU2hpcFRvQ2l0eSArICcsICcgKyBzaGlwcGluZy5TaGlwVG9TdGF0ZSArICcuICcgKyBzaGlwcGluZy5TaGlwVG9aaXBDb2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2hpcHBpbmdBZGRyZXNzTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3MoY3VzdG9tZXIpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwic2hpcHBpbmdhZGRyZXNzXCIpW1wic2hpcHBpbmdhZGRyZXNzXCJdW2N1c3RvbWVyLkN1c3RvbWVyTm9dO1xyXG4gICAgfVxyXG59Il19