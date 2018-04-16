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
    CustomerService.prototype.getFilterCustomers = function () {
        var customers = [];
        var doc = this._couchbaseService.getDocument("customer")["customer"];
        if (server_config_1.SERVER.user["SupervisorRights"] == "Y")
            return doc;
        else {
            doc.map(function (customer) {
                if (parseInt(customer.SalespersonNo) == parseInt(server_config_1.SERVER.user["DefaultSalespersonID"]))
                    customers.push(customer);
            });
            return customers;
        }
    };
    CustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTZFO0FBQzdFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIsdUNBQXFDO0FBQ3JDLHlEQUFpRDtBQUNqRCx5REFBdUQ7QUFLdkQ7SUFLSSx5QkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFIMUUsV0FBTSxHQUFXLFVBQVUsQ0FBQztRQUM1QixTQUFJLEdBQUcsRUFBRSxDQUFDO0lBSWxCLENBQUM7SUFFTSxzQ0FBWSxHQUFuQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBSSxzQkFBTSxDQUFDLE9BQU8sY0FBVyxDQUFDO2FBQzlDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRVksNkNBQW1CLEdBQWhDOzs7Ozs7d0JBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDM0MscUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBRTtpQ0FDM0IsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQ0FDUixLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQzVDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzlELEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUN6QyxDQUFDLEVBQUUsVUFBQyxLQUFLO2dDQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakIsQ0FBQyxDQUFDLEVBQUE7NEJBUE4sc0JBQU8sU0FPRCxFQUFDOzs7O0tBQ1Y7SUFFTSxxQ0FBVyxHQUFsQixVQUFtQixVQUFVO1FBQ3pCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JFLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRO1lBQ1osRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUM7Z0JBQ2xDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFFTSw0Q0FBa0IsR0FBekI7UUFDSSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUMsQ0FBQyxzQkFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLENBQUM7WUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUTtnQkFDWixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxzQkFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7b0JBQ2xGLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBaERRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FNa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BTHpFLGVBQWUsQ0FpRDNCO0lBQUQsc0JBQUM7Q0FBQSxBQWpERCxJQWlEQztBQWpEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSAnLi4vY29uZmlnL3NlcnZlci5jb25maWcnO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jdXN0b21lci5pbnRlcmZhY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJzOiBhbnk7XG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwiY3VzdG9tZXJcIjtcbiAgICBwcml2YXRlIF9kb2MgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDdXN0b21lcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtTRVJWRVIuYmFzZVVybH0vQ3VzdG9tZXJgKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgc2V0Q3VzdG9tZXJEb2N1bWVudCgpIHtcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcImN1c3RvbWVyXCIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRDdXN0b21lcnMoKVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb2NbdGhpcy5fZG9jSWRdID0gcmVzdWx0W1wiQ3VzdG9tZXJcIl07XG4gICAgICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl9kb2MsIHRoaXMuX2RvY0lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXN0b21lcnMgPSByZXN1bHRbXCJDdXN0b21lclwiXTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDdXN0b21lcihjdXN0b21lcklkKSB7XG4gICAgICAgIGxldCBjdXN0b21lclNlYXJjaCA9IG51bGw7XG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KFwiY3VzdG9tZXJcIilbXCJjdXN0b21lclwiXTtcbiAgICAgICAgZG9jLm1hcChjdXN0b21lciA9PiB7XG4gICAgICAgICAgICBpZiAoY3VzdG9tZXIuQ3VzdG9tZXJObyA9PSBjdXN0b21lcklkKVxuICAgICAgICAgICAgICAgIGN1c3RvbWVyU2VhcmNoID0gY3VzdG9tZXI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3VzdG9tZXJTZWFyY2g7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZpbHRlckN1c3RvbWVycygpIHtcbiAgICAgICAgbGV0IGN1c3RvbWVycyA9IFtdO1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcImN1c3RvbWVyXCIpW1wiY3VzdG9tZXJcIl07XG4gICAgICAgIGlmIChTRVJWRVIudXNlcltcIlN1cGVydmlzb3JSaWdodHNcIl0gPT0gXCJZXCIpXG4gICAgICAgICAgICByZXR1cm4gZG9jO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvYy5tYXAoY3VzdG9tZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChjdXN0b21lci5TYWxlc3BlcnNvbk5vKSA9PSBwYXJzZUludChTRVJWRVIudXNlcltcIkRlZmF1bHRTYWxlc3BlcnNvbklEXCJdKSlcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzLnB1c2goY3VzdG9tZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tZXJzO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==