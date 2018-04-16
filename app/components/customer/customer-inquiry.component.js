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
var terms_service_1 = require("../../services/terms.service");
var CustomerInquiryComponent = /** @class */ (function () {
    function CustomerInquiryComponent(_couchbaseService, _customerService, _saleOrderService, _router, _termsCodeService) {
        this._couchbaseService = _couchbaseService;
        this._customerService = _customerService;
        this._saleOrderService = _saleOrderService;
        this._router = _router;
        this._termsCodeService = _termsCodeService;
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
        this.userTermsCode = this._termsCodeService.getUserTermsCode(customer);
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
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, customer_service_1.CustomerService, saleOrder_service_1.SaleOrderService, router_1.Router, terms_service_1.TermsCodeService])
    ], CustomerInquiryComponent);
    return CustomerInquiryComponent;
}());
exports.CustomerInquiryComponent = CustomerInquiryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItaW5xdWlyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b21lci1pbnF1aXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUkvRiw0RkFBMEY7QUFDMUYsb0VBQWtFO0FBQ2xFLHNFQUFvRTtBQUNwRSw0REFBb0Q7QUFDcEQsb0NBQXNDO0FBQ3RDLHNFQUFvRTtBQUNwRSwwQ0FBeUM7QUFDekMsOERBQWdFO0FBU2hFO0lBU0ksa0NBQW9CLGlCQUFtQyxFQUFVLGdCQUFpQyxFQUFVLGlCQUFtQyxFQUFVLE9BQWUsRUFBVSxpQkFBbUM7UUFBak0sc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFQN00sV0FBTSxHQUFXLFVBQVUsQ0FBQztRQUM3QixpQkFBWSxHQUE4QixJQUFJLGtDQUFlLEVBQVksQ0FBQztRQUMxRSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBQzNCLGFBQVEsR0FBWSxzQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUkvQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDcEIsVUFBVSxFQUFFLG1DQUFtQztZQUMvQyxZQUFZLEVBQUUsRUFBRTtZQUNoQixZQUFZLEVBQUUsRUFBRTtZQUNoQixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxFQUFFO1lBQ1gsV0FBVyxFQUFFLEVBQUU7WUFDZixvQkFBb0IsRUFBRSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsY0FBYyxFQUFFLEVBQUU7WUFDbEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxXQUFXLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQTtJQUNMLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSw4Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDN0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGtDQUFlLENBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSxnREFBYSxHQUFwQixVQUFxQixJQUFJO1FBQXpCLGlCQVdDO1FBVkcsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRS9DLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksa0NBQWUsRUFBWSxDQUFDO1lBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxFQUFFLEtBQUs7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzdKLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRU0sMENBQU8sR0FBZCxVQUFlLElBQUk7UUFBbkIsaUJBUUM7UUFQRyxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxrQ0FBZSxFQUFZLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHNEQUFtQixHQUExQixVQUEyQixRQUFrQjtRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSxvREFBaUIsR0FBeEI7UUFDSSxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2RVEsd0JBQXdCO1FBUHBDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3hDLENBQUM7eUNBV3lDLG9DQUFnQixFQUE0QixrQ0FBZSxFQUE2QixvQ0FBZ0IsRUFBbUIsZUFBTSxFQUE2QixnQ0FBZ0I7T0FUNU0sd0JBQXdCLENBd0VwQztJQUFELCtCQUFDO0NBQUEsQUF4RUQsSUF3RUM7QUF4RVksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIERvQ2hlY2sgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2N1c3RvbWVyLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUZXJtc0NvZGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Rlcm1zLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtY3VzdG9tZXItaW5xdWlyeVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jdXN0b21lci1pbnF1aXJ5LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2N1c3RvbWVyLWlucXVpcnkuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJJbnF1aXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIHByaXZhdGUgX2N1c3RvbWVyczogYW55O1xuICAgIHByaXZhdGUgX2RvY0lkOiBzdHJpbmcgPSBcImN1c3RvbWVyXCI7XG4gICAgcHVibGljIGN1c3RvbWVyTGlzdDogT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XG4gICAgcHVibGljIGRhdGEgPSB7fTtcbiAgICBwdWJsaWMgc2VsZWN0ZWRDdXN0b21lcjogYW55ID0ge307XG4gICAgcHVibGljIHNhbGVzUmVwOiBzdHJpbmcgPSAgU0VSVkVSLnVzZXJbJ1VzZXJOYW1lJ107XG4gICAgcHVibGljIHVzZXJUZXJtc0NvZGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLCBwcml2YXRlIF9zYWxlT3JkZXJTZXJ2aWNlOiBTYWxlT3JkZXJTZXJ2aWNlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfdGVybXNDb2RlU2VydmljZTogVGVybXNDb2RlU2VydmljZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgPSB7XG4gICAgICAgICAgICBDdXN0b21lck5vOiBcIlNlbGVjdCBhIGN1c3RvbWVyIHRvIHZpZXcgZGV0YWlsc1wiLFxuICAgICAgICAgICAgQWRkcmVzc0xpbmUxOiBcIlwiLFxuICAgICAgICAgICAgQWRkcmVzc0xpbmUyOiBcIlwiLFxuICAgICAgICAgICAgQ2l0eTogXCJcIixcbiAgICAgICAgICAgIENvbW1lbnQ6IFwiXCIsXG4gICAgICAgICAgICBDb3VudHJ5Q29kZTogXCJcIixcbiAgICAgICAgICAgIEN1c3RvbWVyRGlzY291bnRSYXRlOiAwLFxuICAgICAgICAgICAgQ3VzdG9tZXJOYW1lOiBcIkN1c3RvbWVyIGRldGFpbHNcIixcbiAgICAgICAgICAgIEN1c3RvbWVyU3RhdHVzOiBcIlwiLFxuICAgICAgICAgICAgQ3VzdG9tZXJUeXBlOiBcIlwiLFxuICAgICAgICAgICAgRGF0ZUNyZWF0ZWQ6IFwiXCIsXG4gICAgICAgICAgICBEYXRlTGFzdEFjdGl2aXR5OiBcIlwiLFxuICAgICAgICAgICAgRGF0ZVVwZGF0ZWQ6IFwiXCIsXG4gICAgICAgICAgICBTdGF0ZTogXCJcIixcbiAgICAgICAgICAgIFRlbGVwaG9uZU5vOiBcIlwiLFxuICAgICAgICAgICAgWmlwQ29kZTogXCJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVycyA9IHRoaXMuX2N1c3RvbWVyU2VydmljZS5nZXRGaWx0ZXJDdXN0b21lcnMoKTtcbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPih0aGlzLl9jdXN0b21lcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4oKTtcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbWVycy5tYXAoKGN1c3RvbWVyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXN0b21lcnNbaW5kZXhdLkN1c3RvbWVyTmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSB8fCB0aGlzLl9jdXN0b21lcnNbaW5kZXhdLkN1c3RvbWVyTm8udG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LnB1c2godGhpcy5fY3VzdG9tZXJzW2luZGV4XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lckxpc3QucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ3VzdG9tZXIoY3VzdG9tZXI6IEN1c3RvbWVyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDdXN0b21lciA9IGN1c3RvbWVyO1xuICAgICAgICB0aGlzLnVzZXJUZXJtc0NvZGUgPSB0aGlzLl90ZXJtc0NvZGVTZXJ2aWNlLmdldFVzZXJUZXJtc0NvZGUoY3VzdG9tZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVUcmFuc2FjdGlvbigpIHtcbiAgICAgICAgZGlhbG9ncy5hbGVydChcIllvdXIgbWVzc2FnZVwiKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==