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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZlbnRvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMseURBQWlEO0FBQ2pELHlEQUF1RDtBQUN2RCwrREFBdUQ7QUFHdkQ7SUFJSSwwQkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsa0JBQWEsR0FBRyxFQUFFLENBQUM7SUFLM0IsQ0FBQztJQUVPLHlDQUFjLEdBQXRCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLHNCQUFNLENBQUMsT0FBTyxlQUFZLENBQUM7YUFDbkQsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFWSw0Q0FBaUIsR0FBOUI7Ozs7Ozt3QkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUM1QyxxQkFBTSxJQUFJLENBQUMsY0FBYyxFQUFFO2lDQUNqQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dDQUNSLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDOUMsQ0FBQyxFQUFFLFVBQUMsS0FBSztnQ0FDTCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2pCLENBQUMsQ0FBQyxFQUFBOzRCQUxGLHNCQUFPLFNBS0wsRUFBQzs7OztLQUNOO0lBRVksNENBQWlCLEdBQTlCLFVBQStCLFlBQWdCOzs7Ozs7d0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNyQyxxQkFBTSxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztnQ0FDMUIsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQSxDQUFDO29DQUN2SyxFQUFFLENBQUEsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUM7d0NBQzlELEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0NBQ3ZFLElBQUk7d0NBQ0EsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUM3RSxDQUFDOzRCQUNMLENBQUMsQ0FBQyxFQUFBOzt3QkFQRixTQU9FLENBQUM7d0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7OztLQUMxRTtJQUVNLGdEQUFxQixHQUE1QixVQUE2QixTQUFTO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLDRCQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFFTSxrREFBdUIsR0FBOUIsVUFBK0IsYUFBa0I7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQTFDUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FLa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSnpFLGdCQUFnQixDQTJDNUI7SUFBRCx1QkFBQztDQUFBLEFBM0NELElBMkNDO0FBM0NZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3VjaGJhc2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gJy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEludmVudG9yeVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfaW52ZW50b3J5RG9jID0ge307XHJcbiAgICBwcml2YXRlIF9pbnZlbnRvcmllczphbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW52ZW50b3JpZXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L0ludmVudG9yeWApXHJcbiAgICAgICAgLm1hcChyZXMgPT4gcmVzKS50b1Byb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0SW52ZW50b3JpZXNEb2MoKXtcclxuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmRlbGV0ZURvY3VtZW50KFwiaW52ZW50b3J5XCIpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEludmVudG9yaWVzKClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckludmVudG9yaWVzKHJlc3VsdFtcIlByb2R1Y3RcIl0pO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGZpbHRlckludmVudG9yaWVzKGludmVudG9yeURvYzphbnkpe1xyXG4gICAgICAgIHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXSA9IHt9O1xyXG4gICAgICAgIGF3YWl0IGludmVudG9yeURvYy5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkFUTFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkhPVVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkNISVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIlBIWFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIjAwMFwiKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXVtwcm9kdWN0LldhcmVob3VzZUNvZGVdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0gPSBbcHJvZHVjdF07XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0ucHVzaChwcm9kdWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5faW52ZW50b3J5RG9jLCBcImludmVudG9yeVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHdhcmVob3VzZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQoXCJpbnZlbnRvcnlcIilbXCJpbnZlbnRvcnlcIl1bQ09OU1RBTlRTLndhcmVob3VzZXNbd2FyZWhvdXNlXS5jb2RlXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW52ZW50b3J5V2FyZWhvdXNlSUkod2FyZWhvdXNlQ29kZTogYW55KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImludmVudG9yeVwiKVtcImludmVudG9yeVwiXVt3YXJlaG91c2VDb2RlXTtcclxuICAgIH1cclxufSJdfQ==