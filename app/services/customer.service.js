"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var CustomerService = /** @class */ (function () {
    function CustomerService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._docId = "customer";
        this._doc = {};
    }
    CustomerService.prototype.getCustomers = function () {
        return this._http.get(server_config_1.SERVER.baseUrl + "/Customer")
            .map(function (res) { return res; }).toPromise();
    };
    CustomerService.prototype.setCustomerDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._couchbaseService.deleteDocument("customer");
                        return [4 /*yield*/, this.getCustomers()
                                .then(function (result) {
                                _this._doc[_this._docId] = result["Customer"];
                                _this._couchbaseService.createDocument(_this._doc, _this._docId);
                                _this._customers = result["Customer"];
                            }, function (error) {
                                alert(error);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CustomerService.prototype.getCustomer = function (customerId) {
        var customerSearch = null;
        var doc = this._couchbaseService.getDocument("customer")["customer"];
        doc.map(function (customer) {
            if (customer.CustomerNo == customerId)
                customerSearch = customer;
        });
        return customerSearch;
    };
    CustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTZFO0FBQzdFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIsdUNBQXFDO0FBQ3JDLHlEQUFpRDtBQUNqRCx5REFBdUQ7QUFLdkQ7SUFLSSx5QkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsV0FBTSxHQUFVLFVBQVUsQ0FBQztRQUMzQixTQUFJLEdBQUcsRUFBRSxDQUFDO0lBSWxCLENBQUM7SUFFTSxzQ0FBWSxHQUFuQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sY0FBVyxDQUFDO2FBQ2xELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRVksNkNBQW1CLEdBQWhDOzs7Ozs7d0JBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDM0MscUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBRTtpQ0FDL0IsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQ0FDUixLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQzVDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzlELEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUN6QyxDQUFDLEVBQUUsVUFBQyxLQUFLO2dDQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakIsQ0FBQyxDQUFDLEVBQUE7NEJBUEYsc0JBQU8sU0FPTCxFQUFDOzs7O0tBQ047SUFFTSxxQ0FBVyxHQUFsQixVQUFtQixVQUFVO1FBQ3pCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRO1lBQ2IsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUM7Z0JBQ2pDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFsQ1EsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQU1rQixpQkFBVSxFQUE2QixvQ0FBZ0I7T0FMekUsZUFBZSxDQW1DM0I7SUFBRCxzQkFBQztDQUFBLEFBbkNELElBbUNDO0FBbkNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tICcuLi9jb25maWcvc2VydmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2N1c3RvbWVyLmludGVyZmFjZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2N1c3RvbWVyczogYW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJjdXN0b21lclwiO1xyXG4gICAgcHJpdmF0ZSBfZG9jID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXN0b21lcnMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7U0VSVkVSLmJhc2VVcmx9L0N1c3RvbWVyYClcclxuICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZXRDdXN0b21lckRvY3VtZW50KCl7XHJcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcImN1c3RvbWVyXCIpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEN1c3RvbWVycygpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZG9jW3RoaXMuX2RvY0lkXSA9IHJlc3VsdFtcIkN1c3RvbWVyXCJdO1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmNyZWF0ZURvY3VtZW50KHRoaXMuX2RvYywgdGhpcy5fZG9jSWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXN0b21lcnMgPSByZXN1bHRbXCJDdXN0b21lclwiXTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXN0b21lcihjdXN0b21lcklkKXtcclxuICAgICAgICBsZXQgY3VzdG9tZXJTZWFyY2ggPSBudWxsO1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiY3VzdG9tZXJcIilbXCJjdXN0b21lclwiXTtcclxuICAgICAgICAgZG9jLm1hcChjdXN0b21lciA9PiB7XHJcbiAgICAgICAgICAgIGlmKGN1c3RvbWVyLkN1c3RvbWVyTm8gPT0gY3VzdG9tZXJJZClcclxuICAgICAgICAgICAgICAgIGN1c3RvbWVyU2VhcmNoID0gY3VzdG9tZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGN1c3RvbWVyU2VhcmNoO1xyXG4gICAgfVxyXG59Il19