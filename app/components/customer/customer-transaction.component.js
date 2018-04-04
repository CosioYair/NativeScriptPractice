"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var customer_service_1 = require("../../services/customer.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var dialogs = require("ui/dialogs");
var saleOrder_service_1 = require("../../services/saleOrder.service");
var CustomerTransactionComponent = /** @class */ (function () {
    function CustomerTransactionComponent(_couchbaseService, _customerService, _saleOrderService) {
        this._couchbaseService = _couchbaseService;
        this._customerService = _customerService;
        this._saleOrderService = _saleOrderService;
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
        console.log(JSON.stringify(this._saleOrderService.getUserSaleOrder()));
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
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, customer_service_1.CustomerService, saleOrder_service_1.SaleOrderService])
    ], CustomerTransactionComponent);
    return CustomerTransactionComponent;
}());
exports.CustomerTransactionComponent = CustomerTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBSWxELDRGQUEwRjtBQUMxRixvRUFBa0U7QUFDbEUsc0VBQW9FO0FBRXBFLG9DQUFzQztBQUN0QyxzRUFBb0U7QUFTcEU7SUFPSSxzQ0FBb0IsaUJBQW1DLEVBQVUsZ0JBQWlDLEVBQVUsaUJBQW1DO1FBQTNILHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUx2SSxXQUFNLEdBQVUsVUFBVSxDQUFDO1FBQzVCLGlCQUFZLEdBQThCLElBQUksa0NBQWUsRUFBWSxDQUFDO1FBQzFFLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixxQkFBZ0IsR0FBTyxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3BCLFVBQVUsRUFBRSxtQ0FBbUM7WUFDL0MsWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUUsRUFBRTtZQUNYLFdBQVcsRUFBRSxFQUFFO1lBQ2Ysb0JBQW9CLEVBQUUsQ0FBQztZQUN2QixZQUFZLEVBQUUsa0JBQWtCO1lBQ2hDLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixXQUFXLEVBQUUsRUFBRTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUE7SUFDTCxDQUFDO0lBRUQsK0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxX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Q0FBQztJQUNyQyxDQUFDO0lBRU0sd0RBQWlCLEdBQXhCO1FBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBdEZRLDRCQUE0QjtRQVB4QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO3lDQVN5QyxvQ0FBZ0IsRUFBNEIsa0NBQWUsRUFBNkIsb0NBQWdCO09BUHRJLDRCQUE0QixDQXVGdkM7SUFBRCxtQ0FBQztDQUFBLEFBdkZGLElBdUZFO0FBdkZXLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY3VzdG9tZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1jdXN0b21lci10cmFuc2FjdGlvblwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9jdXN0b21lci10cmFuc2FjdGlvbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJzOmFueTtcclxuICAgIHByaXZhdGUgX2RvY0lkOnN0cmluZyA9IFwiY3VzdG9tZXJcIjtcclxuICAgIHB1YmxpYyBjdXN0b21lckxpc3Q6IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xyXG4gICAgcHVibGljIGRhdGEgPSB7fTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZEN1c3RvbWVyOmFueSA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLCBwcml2YXRlIF9zYWxlT3JkZXJTZXJ2aWNlOiBTYWxlT3JkZXJTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgPSB7XHJcbiAgICAgICAgICAgIEN1c3RvbWVyTm86IFwiU2VsZWN0IGEgY3VzdG9tZXIgdG8gdmlldyBkZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIEFkZHJlc3NMaW5lMTogXCJcIixcclxuICAgICAgICAgICAgQWRkcmVzc0xpbmUyOiBcIlwiLFxyXG4gICAgICAgICAgICBDaXR5OiBcIlwiLFxyXG4gICAgICAgICAgICBDb21tZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBDb3VudHJ5Q29kZTogXCJcIixcclxuICAgICAgICAgICAgQ3VzdG9tZXJEaXNjb3VudFJhdGU6IDAsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyTmFtZTogXCJDdXN0b21lciBkZXRhaWxzXCIsXHJcbiAgICAgICAgICAgIEN1c3RvbWVyU3RhdHVzOiBcIlwiLFxyXG4gICAgICAgICAgICBDdXN0b21lclR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlTGFzdEFjdGl2aXR5OiBcIlwiLFxyXG4gICAgICAgICAgICBEYXRlVXBkYXRlZDogXCJcIixcclxuICAgICAgICAgICAgU3RhdGU6IFwiXCIsXHJcbiAgICAgICAgICAgIFRlbGVwaG9uZU5vOiBcIlwiLFxyXG4gICAgICAgICAgICBaaXBDb2RlOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0RG9jdW1lbnQoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXIoKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXN0b21lcnMoKXtcclxuICAgICAgICB0aGlzLl9jdXN0b21lclNlcnZpY2UuZ2V0Q3VzdG9tZXJzKClcclxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLl9kb2NJZF0gPSByZXN1bHRbXCJDdXN0b21lclwiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLmRhdGEsIHRoaXMuX2RvY0lkKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJzID0gcmVzdWx0W1wiQ3VzdG9tZXJcIl07XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4odGhpcy5fY3VzdG9tZXJzKTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREb2N1bWVudCgpe1xyXG4gICAgICAgIGxldCBkb2MgPSB0aGlzLl9jb3VjaGJhc2VTZXJ2aWNlLmdldERvY3VtZW50KHRoaXMuX2RvY0lkKTtcclxuICAgICAgICBpZihkb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5nZXRDdXN0b21lcnMoKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJzID0gZG9jW3RoaXMuX2RvY0lkXTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPih0aGlzLl9jdXN0b21lcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4oKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJzLm1hcCggKGN1c3RvbWVyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbWVyc1tpbmRleF0uQ3VzdG9tZXJOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LnB1c2godGhpcy5fY3VzdG9tZXJzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkQ3VzdG9tZXIoY3VzdG9tZXI6Q3VzdG9tZXIpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDdXN0b21lciA9IGN1c3RvbWVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVUcmFuc2FjdGlvbigpe1xyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJZb3VyIG1lc3NhZ2VcIikudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuIH0iXX0=