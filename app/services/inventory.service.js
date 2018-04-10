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
    InventoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], InventoryService);
    return InventoryService;
}());
exports.InventoryService = InventoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnZlbnRvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNkU7QUFDN0UsaUNBQStCO0FBQy9CLGdDQUE4QjtBQUM5Qix1Q0FBcUM7QUFDckMseURBQWlEO0FBQ2pELHlEQUF1RDtBQUl2RDtJQUlJLDBCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUgxRSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQUszQixDQUFDO0lBRU8seUNBQWMsR0FBdEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLGVBQVksQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVZLDRDQUFpQixHQUE5Qjs7Ozs7O3dCQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzVDLHFCQUFNLElBQUksQ0FBQyxjQUFjLEVBQUU7aUNBQ2pDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0NBQ1IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUM5QyxDQUFDLEVBQUUsVUFBQyxLQUFLO2dDQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakIsQ0FBQyxDQUFDLEVBQUE7NEJBTEYsc0JBQU8sU0FLTCxFQUFDOzs7O0tBQ047SUFFWSw0Q0FBaUIsR0FBOUIsVUFBK0IsWUFBZ0I7Ozs7Ozt3QkFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ3JDLHFCQUFNLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO2dDQUMxQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7b0NBQ3ZLLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQzt3Q0FDOUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDdkUsSUFBSTt3Q0FDQSxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQzdFLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLEVBQUE7O3dCQVBGLFNBT0UsQ0FBQzt3QkFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7O0tBQzFFO0lBRU0sZ0RBQXFCLEdBQTVCLFVBQTZCLGFBQWE7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQXRDUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FLa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSnpFLGdCQUFnQixDQXVDNUI7SUFBRCx1QkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb3VjaGJhc2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gJy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEludmVudG9yeVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfaW52ZW50b3J5RG9jID0ge307XHJcbiAgICBwcml2YXRlIF9pbnZlbnRvcmllczphbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SW52ZW50b3JpZXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L0ludmVudG9yeWApXHJcbiAgICAgICAgLm1hcChyZXMgPT4gcmVzKS50b1Byb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0SW52ZW50b3JpZXNEb2MoKXtcclxuICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmRlbGV0ZURvY3VtZW50KFwiaW52ZW50b3J5XCIpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEludmVudG9yaWVzKClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckludmVudG9yaWVzKHJlc3VsdFtcIlByb2R1Y3RcIl0pO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGZpbHRlckludmVudG9yaWVzKGludmVudG9yeURvYzphbnkpe1xyXG4gICAgICAgIHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXSA9IHt9O1xyXG4gICAgICAgIGF3YWl0IGludmVudG9yeURvYy5tYXAocHJvZHVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkFUTFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkhPVVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIkNISVwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIlBIWFwiIHx8IHByb2R1Y3QuV2FyZWhvdXNlQ29kZSA9PSBcIjAwMFwiKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2ludmVudG9yeURvY1tcImludmVudG9yeVwiXVtwcm9kdWN0LldhcmVob3VzZUNvZGVdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0gPSBbcHJvZHVjdF07XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5RG9jW1wiaW52ZW50b3J5XCJdW3Byb2R1Y3QuV2FyZWhvdXNlQ29kZV0ucHVzaChwcm9kdWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5faW52ZW50b3J5RG9jLCBcImludmVudG9yeVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW52ZW50b3J5V2FyZWhvdXNlKHdhcmVob3VzZUNvZGUpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiaW52ZW50b3J5XCIpW1wiaW52ZW50b3J5XCJdW3dhcmVob3VzZUNvZGVdO1xyXG4gICAgfVxyXG59Il19