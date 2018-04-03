"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
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
            .map(function (res) { return res; });
    };
    InventoryService.prototype.setInventoriesDoc = function () {
        var _this = this;
        this.getInventories()
            .subscribe(function (result) {
            _this.filterInventories(result["Product"]);
        }, function (error) {
            alert(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZlbnRvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix5REFBaUQ7QUFDakQseURBQXVEO0FBQ3ZELCtEQUF1RDtBQUd2RDtJQUlJLDBCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQUszQixDQUFDO0lBRU0seUNBQWMsR0FBckI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLGVBQVksQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLDRDQUFpQixHQUF4QjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGNBQWMsRUFBRTthQUNwQixTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksNENBQWlCLEdBQTlCLFVBQStCLFlBQWdCOzs7Ozs7d0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNyQyxxQkFBTSxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztnQ0FDMUIsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQSxDQUFDO29DQUN2SyxFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUM7d0NBQzlELEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0NBQ3ZFLElBQUk7d0NBQ0EsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUM3RSxDQUFDOzRCQUNMLENBQUMsQ0FBQyxFQUFBOzt3QkFQRixTQU9FLENBQUM7d0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7OztLQUMxRTtJQUVNLGdEQUFxQixHQUE1QixVQUE2QixTQUFTO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLDRCQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFyQ1EsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7eUNBS2tCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUp6RSxnQkFBZ0IsQ0FzQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQXRDRCxJQXNDQztBQXRDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tICcuL2NvdWNoYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSAnLi4vY29uZmlnL2NvbnN0YW50cy5jb25maWcnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSW52ZW50b3J5U2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9pbnZlbnRvcnlEb2MgPSB7fTtcclxuICAgIHByaXZhdGUgX2ludmVudG9yaWVzOmFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEludmVudG9yaWVzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke1NFUlZFUi5iYXNlVXJsfS9JbnZlbnRvcnlgKVxyXG4gICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEludmVudG9yaWVzRG9jKCl7XHJcbiAgICAgICAgdGhpcy5nZXRJbnZlbnRvcmllcygpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckludmVudG9yaWVzKHJlc3VsdFtcIlByb2R1Y3RcIl0pO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGZpbHRlckludmVudG9yaWVzKGludmVudG9yeURvYzphbnkpe1xyXG4gICAgICAgIHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXSA9IHt9O1xyXG4gICAgICAgIGF3YWl0IGludmVudG9yeURvYy5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkFUTFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkhPVVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkNISVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIlBIWFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIjAwMFwiKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXVtwcm9kdWN0LldhcmVob3VzZUNvZGVdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0gPSBbcHJvZHVjdF07XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0ucHVzaChwcm9kdWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5faW52ZW50b3J5RG9jLCBcImludmVudG9yeVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHdhcmVob3VzZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJpbnZlbnRvcnlcIilbXCJpbnZlbnRvcnlcIl1bQ09OU1RBTlRTLndhcmVob3VzZXNbd2FyZWhvdXNlXS5jb2RlXTtcclxuICAgIH1cclxufSJdfQ==