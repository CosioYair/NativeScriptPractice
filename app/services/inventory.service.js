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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZlbnRvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMseURBQWlEO0FBQ2pELHlEQUF1RDtBQUl2RDtJQUlJLDBCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQUszQixDQUFDO0lBRU8seUNBQWMsR0FBdEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLGVBQVksQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVZLDRDQUFpQixHQUE5Qjs7Ozs7O3dCQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzVDLHFCQUFNLElBQUksQ0FBQyxjQUFjLEVBQUU7aUNBQ2pDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0NBQ1IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUM5QyxDQUFDLEVBQUUsVUFBQyxLQUFLO2dDQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakIsQ0FBQyxDQUFDLEVBQUE7NEJBTEYsc0JBQU8sU0FLTCxFQUFDOzs7O0tBQ047SUFFWSw0Q0FBaUIsR0FBOUIsVUFBK0IsWUFBZ0I7Ozs7Ozt3QkFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ3JDLHFCQUFNLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO2dDQUMxQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7b0NBQ3ZLLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQzt3Q0FDOUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDdkUsSUFBSTt3Q0FDQSxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQzdFLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLEVBQUE7O3dCQVBGLFNBT0UsQ0FBQzt3QkFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7O0tBQzFFO0lBRU0sZ0RBQXFCLEdBQTVCLFVBQTZCLGFBQWE7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVNLGtEQUF1QixHQUE5QixVQUErQixhQUFrQjtRQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBMUNRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUtrQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FKekUsZ0JBQWdCLENBMkM1QjtJQUFELHVCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3VjaGJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tICcuLi9jb25maWcvY29uc3RhbnRzLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnZlbnRvcnlTZXJ2aWNlIHtcbiAgICBwcml2YXRlIF9pbnZlbnRvcnlEb2MgPSB7fTtcbiAgICBwcml2YXRlIF9pbnZlbnRvcmllczphbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW52ZW50b3JpZXMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9JbnZlbnRvcnlgKVxuICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzZXRJbnZlbnRvcmllc0RvYygpe1xuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmRlbGV0ZURvY3VtZW50KFwiaW52ZW50b3J5XCIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRJbnZlbnRvcmllcygpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlckludmVudG9yaWVzKHJlc3VsdFtcIlByb2R1Y3RcIl0pO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGZpbHRlckludmVudG9yaWVzKGludmVudG9yeURvYzphbnkpe1xuICAgICAgICB0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl0gPSB7fTtcbiAgICAgICAgYXdhaXQgaW52ZW50b3J5RG9jLm1hcChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkFUTFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkhPVVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkNISVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIlBIWFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIjAwMFwiKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl1bcHJvZHVjdC5XYXJlaG91c2VDb2RlXSA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl1bcHJvZHVjdC5XYXJlaG91c2VDb2RlXSA9IFtwcm9kdWN0XTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXVtwcm9kdWN0LldhcmVob3VzZUNvZGVdLnB1c2gocHJvZHVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX2ludmVudG9yeURvYywgXCJpbnZlbnRvcnlcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEludmVudG9yeVdhcmVob3VzZSh3YXJlaG91c2VDb2RlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJpbnZlbnRvcnlcIilbXCJpbnZlbnRvcnlcIl1bd2FyZWhvdXNlQ29kZV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEludmVudG9yeVdhcmVob3VzZUlJKHdhcmVob3VzZUNvZGU6IGFueSl7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiaW52ZW50b3J5XCIpW1wiaW52ZW50b3J5XCJdW3dhcmVob3VzZUNvZGVdO1xuICAgIH1cbn0iXX0=