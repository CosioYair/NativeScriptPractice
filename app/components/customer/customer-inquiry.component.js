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
var CustomerInquiryComponent = /** @class */ (function () {
    function CustomerInquiryComponent(_couchbaseService, _customerService, _saleOrderService, _router) {
        this._couchbaseService = _couchbaseService;
        this._customerService = _customerService;
        this._saleOrderService = _saleOrderService;
        this._router = _router;
        this._docId = "customer";
        this.customerList = new observable_array_1.ObservableArray();
        this.data = {};
        this.selectedCustomer = {};
        this.salesRep = server_config_1.SERVER.user['UserName'];
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
    CustomerInquiryComponent.prototype.ngOnInit = function () {
        this.setDocument();
    };
    CustomerInquiryComponent.prototype.setDocument = function () {
        this._customers = this._customerService.getFilterCustomers();
        this.customerList = new observable_array_1.ObservableArray(this._customers);
    };
    CustomerInquiryComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        if (searchValue.length > 0) {
            this.customerList = new observable_array_1.ObservableArray();
            this._customers.map(function (customer, index) {
                if (_this._customers[index].CustomerName.toLowerCase().indexOf(searchValue) !== -1 || _this._customers[index].CustomerNo.toLowerCase().indexOf(searchValue) !== -1)
                    _this.customerList.push(_this._customers[index]);
            });
        }
    };
    CustomerInquiryComponent.prototype.onClear = function (args) {
        var _this = this;
        var searchBar = args.object;
        searchBar.text = "";
        this.customerList = new observable_array_1.ObservableArray();
        this._customers.forEach(function (item) {
            _this.customerList.push(item);
        });
    };
    CustomerInquiryComponent.prototype.setSelectedCustomer = function (customer) {
        this.selectedCustomer = customer;
    };
    CustomerInquiryComponent.prototype.createTransaction = function () {
        dialogs.alert("Your message").then(function (result) {
            console.log("Dialog result: " + result);
        });
    };
    CustomerInquiryComponent = __decorate([
        core_1.Component({
            selector: "ns-customer-inquiry",
            moduleId: module.id,
            templateUrl: "./customer-inquiry.component.html",
            styleUrls: ["./customer-inquiry.css"]
        }),
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, customer_service_1.CustomerService, saleOrder_service_1.SaleOrderService, router_1.Router])
    ], CustomerInquiryComponent);
    return CustomerInquiryComponent;
}());
exports.CustomerInquiryComponent = CustomerInquiryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItaW5xdWlyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b21lci1pbnF1aXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUkvRiw0RkFBMEY7QUFDMUYsb0VBQWtFO0FBQ2xFLHNFQUFvRTtBQUNwRSw0REFBb0Q7QUFDcEQsb0NBQXNDO0FBQ3RDLHNFQUFvRTtBQUNwRSwwQ0FBeUM7QUFTekM7SUFRSSxrQ0FBb0IsaUJBQW1DLEVBQVUsZ0JBQWlDLEVBQVUsaUJBQW1DLEVBQVUsT0FBZTtRQUFwSixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBTmhLLFdBQU0sR0FBVyxVQUFVLENBQUM7UUFDN0IsaUJBQVksR0FBOEIsSUFBSSxrQ0FBZSxFQUFZLENBQUM7UUFDMUUsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUMzQixhQUFRLEdBQVksc0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHL0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3BCLFVBQVUsRUFBRSxtQ0FBbUM7WUFDL0MsWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUUsRUFBRTtZQUNYLFdBQVcsRUFBRSxFQUFFO1lBQ2Ysb0JBQW9CLEVBQUUsQ0FBQztZQUN2QixZQUFZLEVBQUUsa0JBQWtCO1lBQ2hDLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixXQUFXLEVBQUUsRUFBRTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUE7SUFDTCxDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sOENBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxrQ0FBZSxDQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0sZ0RBQWEsR0FBcEIsVUFBcUIsSUFBSTtRQUF6QixpQkFXQztRQVZHLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGtDQUFlLEVBQVksQ0FBQztZQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVEsRUFBRSxLQUFLO2dCQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3SixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVNLDBDQUFPLEdBQWQsVUFBZSxJQUFJO1FBQW5CLGlCQVFDO1FBUEcsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksa0NBQWUsRUFBWSxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxzREFBbUIsR0FBMUIsVUFBMkIsUUFBa0I7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRU0sb0RBQWlCLEdBQXhCO1FBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBckVRLHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUN4QyxDQUFDO3lDQVV5QyxvQ0FBZ0IsRUFBNEIsa0NBQWUsRUFBNkIsb0NBQWdCLEVBQW1CLGVBQU07T0FSL0osd0JBQXdCLENBc0VwQztJQUFELCtCQUFDO0NBQUEsQUF0RUQsSUFzRUM7QUF0RVksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIERvQ2hlY2sgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2N1c3RvbWVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWN1c3RvbWVyLWlucXVpcnlcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY3VzdG9tZXItaW5xdWlyeS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9jdXN0b21lci1pbnF1aXJ5LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVySW5xdWlyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBwcml2YXRlIF9jdXN0b21lcnM6IGFueTtcbiAgICBwcml2YXRlIF9kb2NJZDogc3RyaW5nID0gXCJjdXN0b21lclwiO1xuICAgIHB1YmxpYyBjdXN0b21lckxpc3Q6IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xuICAgIHB1YmxpYyBkYXRhID0ge307XG4gICAgcHVibGljIHNlbGVjdGVkQ3VzdG9tZXI6IGFueSA9IHt9O1xuICAgIHB1YmxpYyBzYWxlc1JlcDogc3RyaW5nID0gIFNFUlZFUi51c2VyWydVc2VyTmFtZSddO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSwgcHJpdmF0ZSBfY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsIHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UsIHByaXZhdGUgX3JvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDdXN0b21lciA9IHtcbiAgICAgICAgICAgIEN1c3RvbWVyTm86IFwiU2VsZWN0IGEgY3VzdG9tZXIgdG8gdmlldyBkZXRhaWxzXCIsXG4gICAgICAgICAgICBBZGRyZXNzTGluZTE6IFwiXCIsXG4gICAgICAgICAgICBBZGRyZXNzTGluZTI6IFwiXCIsXG4gICAgICAgICAgICBDaXR5OiBcIlwiLFxuICAgICAgICAgICAgQ29tbWVudDogXCJcIixcbiAgICAgICAgICAgIENvdW50cnlDb2RlOiBcIlwiLFxuICAgICAgICAgICAgQ3VzdG9tZXJEaXNjb3VudFJhdGU6IDAsXG4gICAgICAgICAgICBDdXN0b21lck5hbWU6IFwiQ3VzdG9tZXIgZGV0YWlsc1wiLFxuICAgICAgICAgICAgQ3VzdG9tZXJTdGF0dXM6IFwiXCIsXG4gICAgICAgICAgICBDdXN0b21lclR5cGU6IFwiXCIsXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogXCJcIixcbiAgICAgICAgICAgIERhdGVMYXN0QWN0aXZpdHk6IFwiXCIsXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcbiAgICAgICAgICAgIFN0YXRlOiBcIlwiLFxuICAgICAgICAgICAgVGVsZXBob25lTm86IFwiXCIsXG4gICAgICAgICAgICBaaXBDb2RlOiBcIlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXREb2N1bWVudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREb2N1bWVudCgpIHtcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJzID0gdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLmdldEZpbHRlckN1c3RvbWVycygpO1xuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KHRoaXMuX2N1c3RvbWVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xuICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJzLm1hcCgoY3VzdG9tZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbWVyc1tpbmRleF0uQ3VzdG9tZXJOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xIHx8IHRoaXMuX2N1c3RvbWVyc1tpbmRleF0uQ3VzdG9tZXJOby50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckxpc3QucHVzaCh0aGlzLl9jdXN0b21lcnNbaW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4oKTtcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2VsZWN0ZWRDdXN0b21lcihjdXN0b21lcjogQ3VzdG9tZXIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEN1c3RvbWVyID0gY3VzdG9tZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZVRyYW5zYWN0aW9uKCkge1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiWW91ciBtZXNzYWdlXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19