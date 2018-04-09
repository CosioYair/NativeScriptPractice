"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var customer_service_1 = require("../../services/customer.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var server_config_1 = require("../../config/server.config");
var dialogs = require("ui/dialogs");
var saleOrder_service_1 = require("../../services/saleOrder.service");
var router_1 = require("@angular/router");
var CustomerTransactionComponent = /** @class */ (function () {
    function CustomerTransactionComponent(_couchbaseService, _customerService, _saleOrderService, _router) {
        this._couchbaseService = _couchbaseService;
        this._customerService = _customerService;
        this._saleOrderService = _saleOrderService;
        this._router = _router;
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
    CustomerTransactionComponent.prototype.editTransaction = function () {
        server_config_1.SERVER.editTransaction.edit = true;
        server_config_1.SERVER.editTransaction.transactionNo = "e362c6S-000003";
        this._router.navigate(['/saleOrder', this.selectedCustomer.CustomerNo, true]);
    };
    CustomerTransactionComponent = __decorate([
        core_1.Component({
            selector: "ns-customer-transaction",
            moduleId: module.id,
            templateUrl: "./customer-transaction.component.html",
            styleUrls: ["./customer-transaction.css"]
        }),
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, customer_service_1.CustomerService, saleOrder_service_1.SaleOrderService, router_1.Router])
    ], CustomerTransactionComponent);
    return CustomerTransactionComponent;
}());
exports.CustomerTransactionComponent = CustomerTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStGO0FBSS9GLDRGQUEwRjtBQUMxRixvRUFBa0U7QUFDbEUsc0VBQW9FO0FBQ3BFLDREQUFvRDtBQUNwRCxvQ0FBc0M7QUFDdEMsc0VBQW9FO0FBQ3BFLDBDQUF5QztBQVN6QztJQU9JLHNDQUFvQixpQkFBbUMsRUFBVSxnQkFBaUMsRUFBVSxpQkFBbUMsRUFBVSxPQUFlO1FBQXBKLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFMaEssV0FBTSxHQUFXLFVBQVUsQ0FBQztRQUM3QixpQkFBWSxHQUE4QixJQUFJLGtDQUFlLEVBQVksQ0FBQztRQUMxRSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBRzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUNwQixVQUFVLEVBQUUsbUNBQW1DO1lBQy9DLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLElBQUksRUFBRSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxXQUFXLEVBQUUsRUFBRTtZQUNmLG9CQUFvQixFQUFFLENBQUM7WUFDdkIsWUFBWSxFQUFFLGtCQUFrQjtZQUNoQyxjQUFjLEVBQUUsRUFBRTtZQUNsQixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsRUFBRTtZQUNULFdBQVcsRUFBRSxFQUFFO1lBQ2YsT0FBTyxF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LFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQzVDLENBQUM7eUNBU3lDLG9DQUFnQixFQUE0QixrQ0FBZSxFQUE2QixvQ0FBZ0IsRUFBbUIsZUFBTTtPQVAvSiw0QkFBNEIsQ0FtRnhDO0lBQUQsbUNBQUM7Q0FBQSxBQW5GRCxJQW1GQztBQW5GWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgRG9DaGVjayB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2N1c3RvbWVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gXCIuLi8uLi9jb25maWcvc2VydmVyLmNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1jdXN0b21lci10cmFuc2FjdGlvblwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9jdXN0b21lci10cmFuc2FjdGlvbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgX2N1c3RvbWVyczogYW55O1xyXG4gICAgcHJpdmF0ZSBfZG9jSWQ6IHN0cmluZyA9IFwiY3VzdG9tZXJcIjtcclxuICAgIHB1YmxpYyBjdXN0b21lckxpc3Q6IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xyXG4gICAgcHVibGljIGRhdGEgPSB7fTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZEN1c3RvbWVyOiBhbnkgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLCBwcml2YXRlIF9jdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSwgcHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSwgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgPSB7XHJcbiAgICAgICAgICAgIEN1c3RvbWVyTm86IFwiU2VsZWN0IGEgY3VzdG9tZXIgdG8gdmlldyBkZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIEFkZHJlc3NMaW5lMTogXCJcIixcclxuICAgICAgICAgICAgQWRkcmVzc0xpbmUyOiBcIlwiLFxyXG4gICAgICAgICAgICBDaXR5OiBcIlwiLFxyXG4gICAgICAgICAgICBDb21tZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBDb3VudHJ5Q29kZTogXCJcIixcclxuICAgICAgICAgICAgQ3VzdG9tZXJEaXNjb3VudFJhdGU6IDAsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyTmFtZTogXCJDdXN0b21lciBkZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyU3RhdHVzOiBcIlwiLFxyXG4gICAgICAgICAgICBDdXN0b21lclR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlTGFzdEFjdGl2aXR5OiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcclxuICAgICAgICAgICAgU3RhdGU6IFwiXCIsXHJcbiAgICAgICAgICAgIFRlbGVwaG9uZU5vOiBcIlwiLFxyXG4gICAgICAgICAgICBaaXBDb2RlOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VzdG9tZXJzKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREb2N1bWVudCgpIHtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudCh0aGlzLl9kb2NJZCk7XHJcbiAgICAgICAgaWYgKGRvYyA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXN0b21lcnMgPSBkb2NbdGhpcy5fZG9jSWRdO1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KHRoaXMuX2N1c3RvbWVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBpZiAoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbWVycy5tYXAoKGN1c3RvbWVyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbWVyc1tpbmRleF0uQ3VzdG9tZXJOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LnB1c2godGhpcy5fY3VzdG9tZXJzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ3VzdG9tZXIoY3VzdG9tZXI6IEN1c3RvbWVyKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEN1c3RvbWVyID0gY3VzdG9tZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJZb3VyIG1lc3NhZ2VcIikudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZWRpdFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgIFNFUlZFUi5lZGl0VHJhbnNhY3Rpb24uZWRpdCA9IHRydWU7XHJcbiAgICAgICAgU0VSVkVSLmVkaXRUcmFuc2FjdGlvbi50cmFuc2FjdGlvbk5vID0gXCJlMzYyYzZTLTAwMDAwM1wiO1xyXG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9zYWxlT3JkZXInLCB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIuQ3VzdG9tZXJObywgdHJ1ZV0pO1xyXG4gICAgfVxyXG59Il19