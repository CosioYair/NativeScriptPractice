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
var CustomerTransactionComponent = /** @class */ (function () {
    function CustomerTransactionComponent(_couchbaseService, _customerService, _saleOrderService, _router, _termsCodeService) {
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
    CustomerTransactionComponent.prototype.ngOnInit = function () {
        this.setDocument();
    };
    CustomerTransactionComponent.prototype.setDocument = function () {
        this._customers = this._customerService.getFilterCustomers();
        this.customerList = new observable_array_1.ObservableArray(this._customers);
    };
    CustomerTransactionComponent.prototype.onTextChanged = function (args) {
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
        this.userTermsCode = this._termsCodeService.getUserTermsCode(customer);
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
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, customer_service_1.CustomerService, saleOrder_service_1.SaleOrderService, router_1.Router, terms_service_1.TermsCodeService])
    ], CustomerTransactionComponent);
    return CustomerTransactionComponent;
}());
exports.CustomerTransactionComponent = CustomerTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStGO0FBSS9GLDRGQUEwRjtBQUMxRixvRUFBa0U7QUFDbEUsc0VBQW9FO0FBQ3BFLDREQUFvRDtBQUNwRCxvQ0FBc0M7QUFDdEMsc0VBQW9FO0FBQ3BFLDBDQUF5QztBQUN6Qyw4REFBZ0U7QUFTaEU7SUFTSSxzQ0FBb0IsaUJBQW1DLEVBQVUsZ0JBQWlDLEVBQVUsaUJBQW1DLEVBQVUsT0FBZSxFQUFVLGlCQUFtQztRQUFqTSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQVA3TSxXQUFNLEdBQVcsVUFBVSxDQUFDO1FBQzdCLGlCQUFZLEdBQThCLElBQUksa0NBQWUsRUFBWSxDQUFDO1FBQzFFLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFDM0IsYUFBUSxHQUFZLHNCQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBSS9DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUNwQixVQUFVLEVBQUUsbUNBQW1DO1lBQy9DLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLElBQUksRUFBRSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxXQUFXLEVBQUUsRUFBRTtZQUNmLG9CQUFvQixFQUFFLENBQUM7WUFDdkIsWUFBWSxFQUFFLGtCQUFrQjtZQUNoQyxjQUFjLEVBQUUsRUFBRTtZQUNsQixZQUFZLEVBQUUsRUFBRTtZQUNoQixX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QTZCLGdDQUFnQjtPQVQ1TSw0QkFBNEIsQ0F3RXhDO0lBQUQsbUNBQUM7Q0FBQSxBQXhFRCxJQXdFQztBQXhFWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgRG9DaGVjayB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCb3JkZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY3VzdG9tZXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTRVJWRVIgfSBmcm9tIFwiLi4vLi4vY29uZmlnL3NlcnZlci5jb25maWdcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1jdXN0b21lci10cmFuc2FjdGlvblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jdXN0b21lci10cmFuc2FjdGlvbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9jdXN0b21lci10cmFuc2FjdGlvbi5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIF9jdXN0b21lcnM6IGFueTtcbiAgICBwcml2YXRlIF9kb2NJZDogc3RyaW5nID0gXCJjdXN0b21lclwiO1xuICAgIHB1YmxpYyBjdXN0b21lckxpc3Q6IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xuICAgIHB1YmxpYyBkYXRhID0ge307XG4gICAgcHVibGljIHNlbGVjdGVkQ3VzdG9tZXI6IGFueSA9IHt9O1xuICAgIHB1YmxpYyBzYWxlc1JlcDogc3RyaW5nID0gIFNFUlZFUi51c2VyWydVc2VyTmFtZSddO1xuICAgIHB1YmxpYyB1c2VyVGVybXNDb2RlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLCBwcml2YXRlIF9jdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSwgcHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSwgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX3Rlcm1zQ29kZVNlcnZpY2U6IFRlcm1zQ29kZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEN1c3RvbWVyID0ge1xuICAgICAgICAgICAgQ3VzdG9tZXJObzogXCJTZWxlY3QgYSBjdXN0b21lciB0byB2aWV3IGRldGFpbHNcIixcbiAgICAgICAgICAgIEFkZHJlc3NMaW5lMTogXCJcIixcbiAgICAgICAgICAgIEFkZHJlc3NMaW5lMjogXCJcIixcbiAgICAgICAgICAgIENpdHk6IFwiXCIsXG4gICAgICAgICAgICBDb21tZW50OiBcIlwiLFxuICAgICAgICAgICAgQ291bnRyeUNvZGU6IFwiXCIsXG4gICAgICAgICAgICBDdXN0b21lckRpc2NvdW50UmF0ZTogMCxcbiAgICAgICAgICAgIEN1c3RvbWVyTmFtZTogXCJDdXN0b21lciBkZXRhaWxzXCIsXG4gICAgICAgICAgICBDdXN0b21lclN0YXR1czogXCJcIixcbiAgICAgICAgICAgIEN1c3RvbWVyVHlwZTogXCJcIixcbiAgICAgICAgICAgIERhdGVDcmVhdGVkOiBcIlwiLFxuICAgICAgICAgICAgRGF0ZUxhc3RBY3Rpdml0eTogXCJcIixcbiAgICAgICAgICAgIERhdGVVcGRhdGVkOiBcIlwiLFxuICAgICAgICAgICAgU3RhdGU6IFwiXCIsXG4gICAgICAgICAgICBUZWxlcGhvbmVObzogXCJcIixcbiAgICAgICAgICAgIFppcENvZGU6IFwiXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNldERvY3VtZW50KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldERvY3VtZW50KCkge1xuICAgICAgICB0aGlzLl9jdXN0b21lcnMgPSB0aGlzLl9jdXN0b21lclNlcnZpY2UuZ2V0RmlsdGVyQ3VzdG9tZXJzKCk7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4odGhpcy5fY3VzdG9tZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChzZWFyY2hWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XG4gICAgICAgICAgICB0aGlzLl9jdXN0b21lcnMubWFwKChjdXN0b21lciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tZXJzW2luZGV4XS5DdXN0b21lck5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEgfHwgdGhpcy5fY3VzdG9tZXJzW2luZGV4XS5DdXN0b21lck5vLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZSkgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5wdXNoKHRoaXMuX2N1c3RvbWVyc1tpbmRleF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xuICAgICAgICB0aGlzLl9jdXN0b21lcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTZWxlY3RlZEN1c3RvbWVyKGN1c3RvbWVyOiBDdXN0b21lcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIgPSBjdXN0b21lcjtcbiAgICAgICAgdGhpcy51c2VyVGVybXNDb2RlID0gdGhpcy5fdGVybXNDb2RlU2VydmljZS5nZXRVc2VyVGVybXNDb2RlKGN1c3RvbWVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJZb3VyIG1lc3NhZ2VcIikudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=