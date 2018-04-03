"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
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
            .map(function (res) { return res; });
    };
    ShippingAddressService.prototype.setShippingAddressDoc = function () {
        var _this = this;
        this.getShippingAddress()
            .subscribe(function (result) {
            _this.filterCustomerShippingAddress(result);
        }, function (error) {
            alert(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmdBZGRyZXNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGlwcGluZ0FkZHJlc3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFFakQsNEZBQTBGO0FBQzFGLHlEQUF1RDtBQUd2RDtJQUlJLGdDQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSx3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDekIscUJBQWdCLEdBQW9DLElBQUksa0NBQWUsRUFBbUIsQ0FBQztJQUluRyxDQUFDO0lBRU0sbURBQWtCLEdBQXpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLHNCQUFNLENBQUMsT0FBTyw4QkFBMkIsQ0FBQzthQUNsRSxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLHNEQUFxQixHQUE1QjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2FBQ3hCLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDYixLQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSw4REFBNkIsR0FBM0MsVUFBNEMsZ0JBQWdCOzs7Ozs7d0JBQ3hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDakQscUJBQU0sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUTtnQ0FDL0IsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQztvQ0FDeEUsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQ2xGLElBQUk7b0NBQ0EsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDeEYsQ0FBQyxDQUFDLEVBQUE7O3dCQUxGLFNBS0UsQ0FBQzt3QkFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOzs7OztLQUN0RjtJQUVZLCtEQUE4QixHQUEzQyxVQUE0QyxRQUFROzs7Ozs7d0JBQzVDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQzt3QkFDekIsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDeEcscUJBQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVE7Z0NBQ2xCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQ2xELENBQUMsQ0FBQyxFQUFBOzt3QkFGRixTQUVFLENBQUM7d0JBQ0gsc0JBQU8sbUJBQW1CLEVBQUM7Ozs7S0FDOUI7SUFFWSwyREFBMEIsR0FBdkMsVUFBd0MsUUFBUTs7O2dCQUM1QyxzQkFBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUM7OztLQUN4RztJQTVDUSxzQkFBc0I7UUFEbEMsaUJBQVUsRUFBRTt5Q0FLa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSnpFLHNCQUFzQixDQTZDbEM7SUFBRCw2QkFBQztDQUFBLEFBN0NELElBNkNDO0FBN0NZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zaGlwcGluZ0FkZHJlc3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXknO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gJy4vY291Y2hiYXNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB7XG4gICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzRG9jID0ge307XG4gICAgcHJpdmF0ZSBfc2hpcHBpbmdBZGRyZXNzOk9ic2VydmFibGVBcnJheTxTaGlwcGluZ0FkZHJlc3M+ID0gbmV3IE9ic2VydmFibGVBcnJheTxTaGlwcGluZ0FkZHJlc3M+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaGlwcGluZ0FkZHJlc3MoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9DdXN0b21lci9TaGlwcGluZ0FkZHJlc3NgKVxuICAgICAgICAubWFwKHJlcyA9PiByZXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTaGlwcGluZ0FkZHJlc3NEb2MoKXtcbiAgICAgICAgdGhpcy5nZXRTaGlwcGluZ0FkZHJlc3MoKVxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlckN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKHJlc3VsdCk7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGZpbHRlckN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKHNoaXBwaW5nc0FkZHJlc3Mpe1xuICAgICAgICB0aGlzLl9zaGlwcGluZ0FkZHJlc3NEb2NbXCJzaGlwcGluZ2FkZHJlc3NcIl0gPSB7fTtcbiAgICAgICAgYXdhaXQgc2hpcHBpbmdzQWRkcmVzcy5tYXAoc2hpcHBpbmcgPT57XG4gICAgICAgICAgICBpZih0aGlzLl9zaGlwcGluZ0FkZHJlc3NEb2NbXCJzaGlwcGluZ2FkZHJlc3NcIl1bc2hpcHBpbmcuQ3VzdG9tZXJOb10gPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aGlzLl9zaGlwcGluZ0FkZHJlc3NEb2NbXCJzaGlwcGluZ2FkZHJlc3NcIl1bc2hpcHBpbmcuQ3VzdG9tZXJOb10gPSBbc2hpcHBpbmddO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX3NoaXBwaW5nQWRkcmVzc0RvY1tcInNoaXBwaW5nYWRkcmVzc1wiXVtzaGlwcGluZy5DdXN0b21lck5vXS5wdXNoKHNoaXBwaW5nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fc2hpcHBpbmdBZGRyZXNzRG9jLCBcInNoaXBwaW5nYWRkcmVzc1wiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NMaXN0KGN1c3RvbWVyKXtcbiAgICAgICAgbGV0IHNoaXBwaW5nQWRkcmVzc0xpc3QgPSBbXTtcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzaGlwcGluZ2FkZHJlc3NcIilbXCJzaGlwcGluZ2FkZHJlc3NcIl1bY3VzdG9tZXIuQ3VzdG9tZXJOb107XG4gICAgICAgIGF3YWl0IGRvYy5tYXAoc2hpcHBpbmcgPT4ge1xuICAgICAgICAgICAgc2hpcHBpbmdBZGRyZXNzTGlzdC5wdXNoKHNoaXBwaW5nLlNoaXBUb0NvZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNoaXBwaW5nQWRkcmVzc0xpc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldEN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzKGN1c3RvbWVyKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJzaGlwcGluZ2FkZHJlc3NcIilbXCJzaGlwcGluZ2FkZHJlc3NcIl1bY3VzdG9tZXIuQ3VzdG9tZXJOb107XG4gICAgfVxufSJdfQ==