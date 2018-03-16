"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var customer_service_1 = require("../../services/customer.service");
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(_customerService) {
        this._customerService = _customerService;
        this.customerList = new observable_array_1.ObservableArray();
        //this.customerList = new ObservableArray<Customer>(this.customers);
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.getCustomers();
    };
    CustomerComponent.prototype.getCustomers = function () {
        var _this = this;
        this._customerService.getCustomers()
            .subscribe(function (result) {
            _this.customers = result["Customer"];
            _this.customerList = new observable_array_1.ObservableArray(_this.customers);
        }, function (error) {
            _this.error(error);
        });
    };
    CustomerComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        if (searchValue.length > 0) {
            this.customerList = new observable_array_1.ObservableArray();
            this.customers.map(function (customer, index) {
                if (_this.customers[index].CustomerName.toLowerCase().indexOf(searchValue) !== -1)
                    _this.customerList.push(_this.customers[index]);
            });
        }
    };
    CustomerComponent.prototype.onClear = function (args) {
        var _this = this;
        var searchBar = args.object;
        searchBar.text = "";
        this.customerList = new observable_array_1.ObservableArray();
        this.customers.forEach(function (item) {
            _this.customerList.push(item);
        });
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: "ns-customer",
            moduleId: module.id,
            templateUrl: "./customer.component.html",
            styleUrls: ["./customer.css"]
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBSWxELDRGQUEwRjtBQUMxRixvRUFBa0U7QUFTbEU7SUFLSSwyQkFBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFIOUMsaUJBQVksR0FBOEIsSUFBSSxrQ0FBZSxFQUFZLENBQUM7UUFJN0Usb0VBQW9FO0lBQ3hFLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSx3Q0FBWSxHQUFuQjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTthQUNuQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2IsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGtDQUFlLENBQVcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHlDQUFhLEdBQXBCLFVBQXFCLElBQUk7UUFBekIsaUJBV0M7UUFWRyxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFL0MsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxrQ0FBZSxFQUFZLENBQUM7WUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUUsVUFBQyxRQUFRLEVBQUUsS0FBSztnQkFDaEMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3RSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxJQUFJO1FBQW5CLGlCQVFDO1FBUEcsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksa0NBQWUsRUFBWSxDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUN2QixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE1Q1EsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztTQUNoQyxDQUFDO3lDQU93QyxrQ0FBZTtPQUw1QyxpQkFBaUIsQ0E2QzVCO0lBQUQsd0JBQUM7Q0FBQSxBQTdDRixJQTZDRTtBQTdDVyw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2N1c3RvbWVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1jdXN0b21lclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY3VzdG9tZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9jdXN0b21lci5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIHByaXZhdGUgY3VzdG9tZXJzOmFueTtcclxuICAgIHB1YmxpYyBjdXN0b21lckxpc3Q6IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPigpO1xyXG4gICAgcHVibGljIGVycm9yOmFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jdXN0b21lclNlcnZpY2U6IEN1c3RvbWVyU2VydmljZSl7XHJcbiAgICAgICAgLy90aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KHRoaXMuY3VzdG9tZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXN0b21lcnMoKXtcclxuICAgICAgICB0aGlzLl9jdXN0b21lclNlcnZpY2UuZ2V0Q3VzdG9tZXJzKClcclxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJzID0gcmVzdWx0W1wiQ3VzdG9tZXJcIl07XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4odGhpcy5jdXN0b21lcnMpO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYoc2VhcmNoVmFsdWUubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4oKTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMubWFwKCAoY3VzdG9tZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXN0b21lcnNbaW5kZXhdLkN1c3RvbWVyTmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5wdXNoKHRoaXMuY3VzdG9tZXJzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21lckxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuIH1cclxuIl19