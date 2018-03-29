"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var customer_service_1 = require("../../services/customer.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var dialogs = require("ui/dialogs");
var CustomerTransactionComponent = /** @class */ (function () {
    function CustomerTransactionComponent(_couchbaseService, _customerService) {
        this._couchbaseService = _couchbaseService;
        this._customerService = _customerService;
        this._docId = "customer";
        this.customerList = new observable_array_1.ObservableArray();
        this.data = {};
        this.selectedCustomer = {};
        this.selectedCustomer = {
            CustomerNo: "Select a customer to view details",
            AddressLine1: "",
            AddressLine2: "",
            City: "",
            Comment: "",
            CountryCode: "",
            CustomerDiscountRate: 0,
            CustomerName: "Customer details",
            CustomerStatus: "",
            CustomerType: "",
            DateCreated: "",
            DateLastActivity: "",
            DateUpdated: "",
            State: "",
            TelephoneNo: "",
            ZipCode: ""
        };
    }
    CustomerTransactionComponent.prototype.ngOnInit = function () {
        this.setDocument();
    };
    CustomerTransactionComponent.prototype.getCustomers = function () {
        var _this = this;
        this._customerService.getCustomers()
            .subscribe(function (result) {
            _this.data[_this._docId] = result["Customer"];
            _this._couchbaseService.createDocument(_this.data, _this._docId);
            _this._customers = result["Customer"];
            _this.customerList = new observable_array_1.ObservableArray(_this._customers);
        }, function (error) {
            alert(error);
        });
    };
    CustomerTransactionComponent.prototype.setDocument = function () {
        var doc = this._couchbaseService.getDocument(this._docId);
        if (doc == null)
            this.getCustomers();
        else {
            this._customers = doc[this._docId];
            this.customerList = new observable_array_1.ObservableArray(this._customers);
        }
    };
    CustomerTransactionComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        if (searchValue.length > 0) {
            this.customerList = new observable_array_1.ObservableArray();
            this._customers.map(function (customer, index) {
                if (_this._customers[index].CustomerName.toLowerCase().indexOf(searchValue) !== -1)
                    _this.customerList.push(_this._customers[index]);
            });
        }
    };
    CustomerTransactionComponent.prototype.onClear = function (args) {
        var _this = this;
        var searchBar = args.object;
        searchBar.text = "";
        this.customerList = new observable_array_1.ObservableArray();
        this._customers.forEach(function (item) {
            _this.customerList.push(item);
        });
    };
    CustomerTransactionComponent.prototype.setSelectedCustomer = function (customer) {
        this.selectedCustomer = customer;
    };
    CustomerTransactionComponent.prototype.createTransaction = function () {
        dialogs.alert("Your message").then(function (result) {
            console.log("Dialog result: " + result);
        });
    };
    CustomerTransactionComponent = __decorate([
        core_1.Component({
            selector: "ns-customer-transaction",
            moduleId: module.id,
            templateUrl: "./customer-transaction.component.html",
            styleUrls: ["./customer-transaction.css"]
        }),
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, customer_service_1.CustomerService])
    ], CustomerTransactionComponent);
    return CustomerTransactionComponent;
}());
exports.CustomerTransactionComponent = CustomerTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50LjEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b21lci10cmFuc2FjdGlvbi5jb21wb25lbnQuMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUlsRCw0RkFBMEY7QUFDMUYsb0VBQWtFO0FBQ2xFLHNFQUFvRTtBQUVwRSxvQ0FBc0M7QUFTdEM7SUFPSSxzQ0FBb0IsaUJBQW1DLEVBQVUsZ0JBQWlDO1FBQTlFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBTDFGLFdBQU0sR0FBVSxVQUFVLENBQUM7UUFDNUIsaUJBQVksR0FBOEIsSUFBSSxrQ0FBZSxFQUFZLENBQUM7UUFDMUUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLHFCQUFnQixHQUFPLEVBQUUsQ0FBQztRQUc3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDcEIsVUFBVSxFQUFFLG1DQUFtQztZQUMvQyxZQUFZLEVBQUUsRUFBRTtZQUNoQixZQUFZLEVBQUUsRUFBRTtZQUNoQixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxFQUFFO1lBQ1gsV0FBVyxFQUFFLEVBQUU7WUFDZixvQkFBb0IsRUFBRSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsY0FBYyxFQUFFLEVBQUU7WUFDbEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxXQUFXLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQTtJQUNMLENBQUM7SUFFRCwrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxtREFBWSxHQUFuQjtRQUFBLGlCQVVD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UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBckZRLDRCQUE0QjtRQVB4QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO3lDQVN5QyxvQ0FBZ0IsRUFBNEIsa0NBQWU7T0FQekYsNEJBQTRCLENBc0Z2QztJQUFELG1DQUFDO0NBQUEsQUF0RkYsSUFzRkU7QUF0Rlcsb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBCb3JkZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jdXN0b21lci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1jdXN0b21lci10cmFuc2FjdGlvblwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9jdXN0b21lci10cmFuc2FjdGlvbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJzOmFueTtcclxuICAgIHByaXZhdGUgX2RvY0lkOnN0cmluZyA9IFwiY3VzdG9tZXJcIjtcclxuICAgIHB1YmxpYyBjdXN0b21lckxpc3Q6IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xyXG4gICAgcHVibGljIGRhdGEgPSB7fTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZEN1c3RvbWVyOmFueSA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgPSB7XHJcbiAgICAgICAgICAgIEN1c3RvbWVyTm86IFwiU2VsZWN0IGEgY3VzdG9tZXIgdG8gdmlldyBkZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIEFkZHJlc3NMaW5lMTogXCJcIixcclxuICAgICAgICAgICAgQWRkcmVzc0xpbmUyOiBcIlwiLFxyXG4gICAgICAgICAgICBDaXR5OiBcIlwiLFxyXG4gICAgICAgICAgICBDb21tZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBDb3VudHJ5Q29kZTogXCJcIixcclxuICAgICAgICAgICAgQ3VzdG9tZXJEaXNjb3VudFJhdGU6IDAsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyTmFtZTogXCJDdXN0b21lciBkZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyU3RhdHVzOiBcIlwiLFxyXG4gICAgICAgICAgICBDdXN0b21lclR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlTGFzdEFjdGl2aXR5OiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcclxuICAgICAgICAgICAgU3RhdGU6IFwiXCIsXHJcbiAgICAgICAgICAgIFRlbGVwaG9uZU5vOiBcIlwiLFxyXG4gICAgICAgICAgICBaaXBDb2RlOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tZXJzKCl7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLmdldEN1c3RvbWVycygpXHJcbiAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5fZG9jSWRdID0gcmVzdWx0W1wiQ3VzdG9tZXJcIl07XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5kYXRhLCB0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbWVycyA9IHJlc3VsdFtcIkN1c3RvbWVyXCJdO1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KHRoaXMuX2N1c3RvbWVycyk7XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKXtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudCh0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgaWYoZG9jID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXJzKCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbWVycyA9IGRvY1t0aGlzLl9kb2NJZF07XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4odGhpcy5fY3VzdG9tZXJzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbWVycy5tYXAoIChjdXN0b21lciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXN0b21lcnNbaW5kZXhdLkN1c3RvbWVyTmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5wdXNoKHRoaXMuX2N1c3RvbWVyc1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbWVycy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZEN1c3RvbWVyKGN1c3RvbWVyOkN1c3RvbWVyKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgPSBjdXN0b21lcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlVHJhbnNhY3Rpb24oKXtcclxuICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiWW91ciBtZXNzYWdlXCIpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiB9Il19