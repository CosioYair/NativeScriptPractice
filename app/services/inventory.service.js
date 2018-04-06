"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var constants_config_1 = require("../config/constants.config");
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
    InventoryService.prototype.getInventoryWarehouse = function (warehouse) {
        return this._couchbaseService.getDocument("inventory")["inventory"][constants_config_1.CONSTANTS.warehouses[warehouse].code];
    };
    InventoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], InventoryService);
    return InventoryService;
}());
exports.InventoryService = InventoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZlbnRvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMseURBQWlEO0FBQ2pELHlEQUF1RDtBQUN2RCwrREFBdUQ7QUFHdkQ7SUFJSSwwQkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsa0JBQWEsR0FBRyxFQUFFLENBQUM7SUFLM0IsQ0FBQztJQUVPLHlDQUFjLEdBQXRCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLHNCQUFNLENBQUMsT0FBTyxlQUFZLENBQUM7YUFDbkQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFWSw0Q0FBaUIsR0FBOUI7Ozs7Ozt3QkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUM1QyxxQkFBTSxJQUFJLENBQUMsY0FBYyxFQUFFO2lDQUNqQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dDQUNSLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDOUMsQ0FBQyxFQUFFLFVBQUMsS0FBSztnQ0FDTCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2pCLENBQUMsQ0FBQyxFQUFBOzRCQUxGLHNCQUFPLFNBS0wsRUFBQzs7OztLQUNOO0lBRVksNENBQWlCLEdBQTlCLFVBQStCLFlBQWdCOzs7Ozs7d0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNyQyxxQkFBTSxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztnQ0FDMUIsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQSxDQUFDO29DQUN2SyxFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUM7d0NBQzlELEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0NBQ3ZFLElBQUk7d0NBQ0EsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUM3RSxDQUFDOzRCQUNMLENBQUMsQ0FBQyxFQUFBOzt3QkFQRixTQU9FLENBQUM7d0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7OztLQUMxRTtJQUVNLGdEQUFxQixHQUE1QixVQUE2QixTQUFTO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLDRCQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUF0Q1EsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7eUNBS2tCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUp6RSxnQkFBZ0IsQ0F1QzVCO0lBQUQsdUJBQUM7Q0FBQSxBQXZDRCxJQXVDQztBQXZDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gJy4vY291Y2hiYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDT05TVEFOVFMgfSBmcm9tICcuLi9jb25maWcvY29uc3RhbnRzLmNvbmZpZyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnZlbnRvcnlTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2ludmVudG9yeURvYyA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfaW52ZW50b3JpZXM6YW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2Upe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEludmVudG9yaWVzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9JbnZlbnRvcnlgKVxyXG4gICAgICAgIC5tYXAocmVzID0+IHJlcykudG9Qcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldEludmVudG9yaWVzRG9jKCl7XHJcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcImludmVudG9yeVwiKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRJbnZlbnRvcmllcygpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnZlbnRvcmllcyhyZXN1bHRbXCJQcm9kdWN0XCJdKTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBmaWx0ZXJJbnZlbnRvcmllcyhpbnZlbnRvcnlEb2M6YW55KXtcclxuICAgICAgICB0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl0gPSB7fTtcclxuICAgICAgICBhd2FpdCBpbnZlbnRvcnlEb2MubWFwKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9kdWN0LldhcmVob3VzZUNvZGUgPT0gXCJBVExcIiB8fCBwcm9kdWN0LldhcmVob3VzZUNvZGUgPT0gXCJIT1VcIiB8fCBwcm9kdWN0LldhcmVob3VzZUNvZGUgPT0gXCJDSElcIiB8fCBwcm9kdWN0LldhcmVob3VzZUNvZGUgPT0gXCJQSFhcIiB8fCBwcm9kdWN0LldhcmVob3VzZUNvZGUgPT0gXCIwMDBcIil7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9pbnZlbnRvcnlEb2NbXCJpbnZlbnRvcnlcIl1bcHJvZHVjdC5XYXJlaG91c2VDb2RlXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXVtwcm9kdWN0LldhcmVob3VzZUNvZGVdID0gW3Byb2R1Y3RdO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXVtwcm9kdWN0LldhcmVob3VzZUNvZGVdLnB1c2gocHJvZHVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX2ludmVudG9yeURvYywgXCJpbnZlbnRvcnlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEludmVudG9yeVdhcmVob3VzZSh3YXJlaG91c2Upe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiaW52ZW50b3J5XCIpW1wiaW52ZW50b3J5XCJdW0NPTlNUQU5UUy53YXJlaG91c2VzW3dhcmVob3VzZV0uY29kZV07XHJcbiAgICB9XHJcbn0iXX0=