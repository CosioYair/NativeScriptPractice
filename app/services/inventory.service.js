"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var InventoryService = /** @class */ (function () {
    function InventoryService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._inventoryDoc = {};
    }
    InventoryService.prototype.getInventories = function () {
        return this._http.get(server_config_1.SERVER.baseUrl + "/Inventory")
            .map(function (res) { return res; }).toPromise();
    };
    InventoryService.prototype.setInventoriesDoc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._couchbaseService.deleteDocument("inventory");
                        return [4 /*yield*/, this.getInventories()
                                .then(function (result) {
                                _this.filterInventories(result["Product"]);
                            }, function (error) {
                                alert(error);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InventoryService.prototype.filterInventories = function (inventoryDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._inventoryDoc["inventory"] = {};
                        return [4 /*yield*/, inventoryDoc.map(function (product) {
                                if (product.WarehouseCode == "ATL" || product.WarehouseCode == "HOU" || product.WarehouseCode == "CHI" || product.WarehouseCode == "PHX" || product.WarehouseCode == "000") {
                                    if (_this._inventoryDoc["inventory"][product.WarehouseCode] == null)
                                        _this._inventoryDoc["inventory"][product.WarehouseCode] = [product];
                                    else
                                        _this._inventoryDoc["inventory"][product.WarehouseCode].push(product);
                                }
                            })];
                    case 1:
                        _a.sent();
                        this._couchbaseService.createDocument(this._inventoryDoc, "inventory");
                        return [2 /*return*/];
                }
            });
        });
    };
    InventoryService.prototype.getInventoryWarehouse = function (warehouseCode) {
        return this._couchbaseService.getDocument("inventory")["inventory"][warehouseCode];
    };
    InventoryService.prototype.getInventoryWarehouseII = function (warehouseCode) {
        return this._couchbaseService.getDocument("inventory")["inventory"][warehouseCode];
    };
    InventoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], InventoryService);
    return InventoryService;
}());
exports.InventoryService = InventoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZlbnRvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMseURBQWlEO0FBQ2pELHlEQUF1RDtBQUl2RDtJQUlJLDBCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQUszQixDQUFDO0lBRU8seUNBQWMsR0FBdEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLGVBQVksQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVZLDRDQUFpQixHQUE5Qjs7Ozs7O3dCQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzVDLHFCQUFNLElBQUksQ0FBQyxjQUFjLEVBQUU7aUNBQ2pDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0NBQ1IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUM5QyxDQUFDLEVBQUUsVUFBQyxLQUFLO2dDQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakIsQ0FBQyxDQUFDLEVBQUE7NEJBTEYsc0JBQU8sU0FLTCxFQUFDOzs7O0tBQ047SUFFWSw0Q0FBaUIsR0FBOUIsVUFBK0IsWUFBZ0I7Ozs7Ozt3QkFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ3JDLHFCQUFNLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO2dDQUMxQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7b0NBQ3ZLLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQzt3Q0FDOUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDdkUsSUFBSTt3Q0FDQSxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQzdFLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLEVBQUE7O3dCQVBGLFNBT0UsQ0FBQzt3QkFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7O0tBQzFFO0lBRU0sZ0RBQXFCLEdBQTVCLFVBQTZCLGFBQWE7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVNLGtEQUF1QixHQUE5QixVQUErQixhQUFrQjtRQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBMUNRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUtrQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FKekUsZ0JBQWdCLENBMkM1QjtJQUFELHVCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tICcuL2NvdWNoYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSAnLi4vY29uZmlnL2NvbnN0YW50cy5jb25maWcnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSW52ZW50b3J5U2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9pbnZlbnRvcnlEb2MgPSB7fTtcclxuICAgIHByaXZhdGUgX2ludmVudG9yaWVzOmFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbnZlbnRvcmllcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtTRVJWRVIuYmFzZVVybH0vSW52ZW50b3J5YClcclxuICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZXRJbnZlbnRvcmllc0RvYygpe1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZGVsZXRlRG9jdW1lbnQoXCJpbnZlbnRvcnlcIik7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0SW52ZW50b3JpZXMoKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVySW52ZW50b3JpZXMocmVzdWx0W1wiUHJvZHVjdFwiXSk7XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZmlsdGVySW52ZW50b3JpZXMoaW52ZW50b3J5RG9jOmFueSl7XHJcbiAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdID0ge307XHJcbiAgICAgICAgYXdhaXQgaW52ZW50b3J5RG9jLm1hcChwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiQVRMXCIgfHwgcHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiSE9VXCIgfHwgcHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiQ0hJXCIgfHwgcHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiUEhYXCIgfHwgcHJvZHVjdC5XYXJlaG91c2VDb2RlID09IFwiMDAwXCIpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl1bcHJvZHVjdC5XYXJlaG91c2VDb2RlXSA9IFtwcm9kdWN0XTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl1bcHJvZHVjdC5XYXJlaG91c2VDb2RlXS5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9pbnZlbnRvcnlEb2MsIFwiaW52ZW50b3J5XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnZlbnRvcnlXYXJlaG91c2Uod2FyZWhvdXNlQ29kZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJpbnZlbnRvcnlcIilbXCJpbnZlbnRvcnlcIl1bd2FyZWhvdXNlQ29kZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEludmVudG9yeVdhcmVob3VzZUlJKHdhcmVob3VzZUNvZGU6IGFueSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJpbnZlbnRvcnlcIilbXCJpbnZlbnRvcnlcIl1bd2FyZWhvdXNlQ29kZV07XHJcbiAgICB9XHJcbn0iXX0=