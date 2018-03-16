"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent() {
        this.customerList = new observable_array_1.ObservableArray();
        this.customers = [{
                customerNo: "2D37205",
                addressLine1: "73 White Bridge Rd",
                addressLine2: "Suite # 109",
                city: "Nashville",
                comment: "",
                countryCode: "USA",
                customerDiscountRate: 0,
                customerName: "2 Danes Contemporary Furniture",
                customerStatus: "A",
                customerType: "",
                dateCreated: "7/24/2012 12:00:00 AM",
                dateLastActivity: "5/6/2013 12:00:00 AM",
                dateUpdated: "4/15/2017 12:00:00 AM",
                state: "TN",
                telephoneNo: "(615) 352-6085",
                zipCode: "37205"
            },
            {
                customerNo: "2D37205",
                addressLine1: "73 White Bridge Rd",
                addressLine2: "Suite # 109",
                city: "Nashville",
                comment: "",
                countryCode: "USA",
                customerDiscountRate: 0,
                customerName: "2 Danes Contemporary Furniture",
                customerStatus: "A",
                customerType: "",
                dateCreated: "7/24/2012 12:00:00 AM",
                dateLastActivity: "5/6/2013 12:00:00 AM",
                dateUpdated: "4/15/2017 12:00:00 AM",
                state: "TN",
                telephoneNo: "(615) 352-6085",
                zipCode: "37205"
            },
            {
                customerNo: "2D37205",
                addressLine1: "73 White Bridge Rd",
                addressLine2: "Suite # 109",
                city: "Nashville",
                comment: "",
                countryCode: "USA",
                customerDiscountRate: 0,
                customerName: "2 Danes Contemporary Furniture",
                customerStatus: "A",
                customerType: "",
                dateCreated: "7/24/2012 12:00:00 AM",
                dateLastActivity: "5/6/2013 12:00:00 AM",
                dateUpdated: "4/15/2017 12:00:00 AM",
                state: "TN",
                telephoneNo: "(615) 352-6085",
                zipCode: "37205"
            }];
        this.customerList = new observable_array_1.ObservableArray(this.customers);
    }
    CustomerComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        if (searchValue.length > 0) {
            this.customerList = new observable_array_1.ObservableArray();
            if (searchValue !== "") {
                this.customers.map(function (customer, index) {
                    if (_this.customers[index].customerName.toLowerCase().indexOf(searchValue) !== -1)
                        _this.customerList.push(_this.customers[index]);
                });
            }
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
        __metadata("design:paramtypes", [])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBSTFDLDRGQUEwRjtBQVMxRjtJQUlJO1FBRk8saUJBQVksR0FBOEIsSUFBSSxrQ0FBZSxFQUFZLENBQUM7UUFHN0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO2dCQUNkLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixZQUFZLEVBQUUsb0JBQW9CO2dCQUNsQyxZQUFZLEVBQUUsYUFBYTtnQkFDM0IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixvQkFBb0IsRUFBRSxDQUFDO2dCQUN2QixZQUFZLEVBQUUsZ0NBQWdDO2dCQUM5QyxjQUFjLEVBQUUsR0FBRztnQkFDbkIsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLGdCQUFnQixFQUFFLHNCQUFzQjtnQkFDeEMsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsV0FBVyxFQUFFLGdCQUFnQjtnQkFDN0IsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRDtnQkFDSSxVQUFVLEVBQUUsU0FBUztnQkFDckIsWUFBWSxFQUFFLG9CQUFvQjtnQkFDbEMsWUFBWSxFQUFFLGFBQWE7Z0JBQzNCLElBQUksRUFBRSxXQUFXO2dCQUNqQixPQUFPLEVBQUUsRUFBRTtnQkFDWCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsb0JBQW9CLEVBQUUsQ0FBQztnQkFDdkIsWUFBWSxFQUFFLGdDQUFnQztnQkFDOUMsY0FBYyxFQUFFLEdBQUc7Z0JBQ25CLFlBQVksRUFBRSxFQUFFO2dCQUNoQixXQUFXLEVBQUUsdUJBQXVCO2dCQUNwQyxnQkFBZ0IsRUFBRSxzQkFBc0I7Z0JBQ3hDLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLEtBQUssRUFBRSxJQUFJO2dCQUNYLFdBQVcsRUFBRSxnQkFBZ0I7Z0JBQzdCLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0Q7Z0JBQ0ksVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFlBQVksRUFBRSxvQkFBb0I7Z0JBQ2xDLFlBQVksRUFBRSxhQUFhO2dCQUMzQixJQUFJLEVBQUUsV0FBVztnQkFDakIsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxnQ0FBZ0M7Z0JBQzlDLGNBQWMsRUFBRSxHQUFHO2dCQUNuQixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsZ0JBQWdCLEVBQUUsc0JBQXNCO2dCQUN4QyxXQUFXLEVBQUUsdUJBQXVCO2dCQUNwQyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxXQUFXLEVBQUUsZ0JBQWdCO2dCQUM3QixPQUFPLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksa0NBQWUsQ0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLHlDQUFhLEdBQXBCLFVBQXFCLElBQUk7UUFBekIsaUJBYUM7UUFaRyxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFL0MsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxrQ0FBZSxFQUFZLENBQUM7WUFDcEQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFFLFVBQUMsUUFBUSxFQUFFLEtBQUs7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDN0UsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxJQUFJO1FBQW5CLGlCQVFDO1FBUEcsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksa0NBQWUsRUFBWSxDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUN2QixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFyRlEsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztTQUNoQyxDQUFDOztPQUVXLGlCQUFpQixDQXNGNUI7SUFBRCx3QkFBQztDQUFBLEFBdEZGLElBc0ZFO0FBdEZXLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2N1c3RvbWVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1jdXN0b21lclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY3VzdG9tZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9jdXN0b21lci5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21lckNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIGN1c3RvbWVyczpDdXN0b21lcltdO1xyXG4gICAgcHVibGljIGN1c3RvbWVyTGlzdDogT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmN1c3RvbWVycyA9IFt7XHJcbiAgICAgICAgICAgIGN1c3RvbWVyTm86IFwiMkQzNzIwNVwiLFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTE6IFwiNzMgV2hpdGUgQnJpZGdlIFJkXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMjogXCJTdWl0ZSAjIDEwOVwiLFxyXG4gICAgICAgICAgICBjaXR5OiBcIk5hc2h2aWxsZVwiLFxyXG4gICAgICAgICAgICBjb21tZW50OiBcIlwiLFxyXG4gICAgICAgICAgICBjb3VudHJ5Q29kZTogXCJVU0FcIixcclxuICAgICAgICAgICAgY3VzdG9tZXJEaXNjb3VudFJhdGU6IDAsXHJcbiAgICAgICAgICAgIGN1c3RvbWVyTmFtZTogXCIyIERhbmVzIENvbnRlbXBvcmFyeSBGdXJuaXR1cmVcIixcclxuICAgICAgICAgICAgY3VzdG9tZXJTdGF0dXM6IFwiQVwiLFxyXG4gICAgICAgICAgICBjdXN0b21lclR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgIGRhdGVDcmVhdGVkOiBcIjcvMjQvMjAxMiAxMjowMDowMCBBTVwiLFxyXG4gICAgICAgICAgICBkYXRlTGFzdEFjdGl2aXR5OiBcIjUvNi8yMDEzIDEyOjAwOjAwIEFNXCIsXHJcbiAgICAgICAgICAgIGRhdGVVcGRhdGVkOiBcIjQvMTUvMjAxNyAxMjowMDowMCBBTVwiLFxyXG4gICAgICAgICAgICBzdGF0ZTogXCJUTlwiLFxyXG4gICAgICAgICAgICB0ZWxlcGhvbmVObzogXCIoNjE1KSAzNTItNjA4NVwiLFxyXG4gICAgICAgICAgICB6aXBDb2RlOiBcIjM3MjA1XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3VzdG9tZXJObzogXCIyRDM3MjA1XCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NMaW5lMTogXCI3MyBXaGl0ZSBCcmlkZ2UgUmRcIixcclxuICAgICAgICAgICAgYWRkcmVzc0xpbmUyOiBcIlN1aXRlICMgMTA5XCIsXHJcbiAgICAgICAgICAgIGNpdHk6IFwiTmFzaHZpbGxlXCIsXHJcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGNvdW50cnlDb2RlOiBcIlVTQVwiLFxyXG4gICAgICAgICAgICBjdXN0b21lckRpc2NvdW50UmF0ZTogMCxcclxuICAgICAgICAgICAgY3VzdG9tZXJOYW1lOiBcIjIgRGFuZXMgQ29udGVtcG9yYXJ5IEZ1cm5pdHVyZVwiLFxyXG4gICAgICAgICAgICBjdXN0b21lclN0YXR1czogXCJBXCIsXHJcbiAgICAgICAgICAgIGN1c3RvbWVyVHlwZTogXCJcIixcclxuICAgICAgICAgICAgZGF0ZUNyZWF0ZWQ6IFwiNy8yNC8yMDEyIDEyOjAwOjAwIEFNXCIsXHJcbiAgICAgICAgICAgIGRhdGVMYXN0QWN0aXZpdHk6IFwiNS82LzIwMTMgMTI6MDA6MDAgQU1cIixcclxuICAgICAgICAgICAgZGF0ZVVwZGF0ZWQ6IFwiNC8xNS8yMDE3IDEyOjAwOjAwIEFNXCIsXHJcbiAgICAgICAgICAgIHN0YXRlOiBcIlROXCIsXHJcbiAgICAgICAgICAgIHRlbGVwaG9uZU5vOiBcIig2MTUpIDM1Mi02MDg1XCIsXHJcbiAgICAgICAgICAgIHppcENvZGU6IFwiMzcyMDVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjdXN0b21lck5vOiBcIjJEMzcyMDVcIixcclxuICAgICAgICAgICAgYWRkcmVzc0xpbmUxOiBcIjczIFdoaXRlIEJyaWRnZSBSZFwiLFxyXG4gICAgICAgICAgICBhZGRyZXNzTGluZTI6IFwiU3VpdGUgIyAxMDlcIixcclxuICAgICAgICAgICAgY2l0eTogXCJOYXNodmlsbGVcIixcclxuICAgICAgICAgICAgY29tbWVudDogXCJcIixcclxuICAgICAgICAgICAgY291bnRyeUNvZGU6IFwiVVNBXCIsXHJcbiAgICAgICAgICAgIGN1c3RvbWVyRGlzY291bnRSYXRlOiAwLFxyXG4gICAgICAgICAgICBjdXN0b21lck5hbWU6IFwiMiBEYW5lcyBDb250ZW1wb3JhcnkgRnVybml0dXJlXCIsXHJcbiAgICAgICAgICAgIGN1c3RvbWVyU3RhdHVzOiBcIkFcIixcclxuICAgICAgICAgICAgY3VzdG9tZXJUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBkYXRlQ3JlYXRlZDogXCI3LzI0LzIwMTIgMTI6MDA6MDAgQU1cIixcclxuICAgICAgICAgICAgZGF0ZUxhc3RBY3Rpdml0eTogXCI1LzYvMjAxMyAxMjowMDowMCBBTVwiLFxyXG4gICAgICAgICAgICBkYXRlVXBkYXRlZDogXCI0LzE1LzIwMTcgMTI6MDA6MDAgQU1cIixcclxuICAgICAgICAgICAgc3RhdGU6IFwiVE5cIixcclxuICAgICAgICAgICAgdGVsZXBob25lTm86IFwiKDYxNSkgMzUyLTYwODVcIixcclxuICAgICAgICAgICAgemlwQ29kZTogXCIzNzIwNVwiXHJcbiAgICAgICAgfV07XHJcbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEN1c3RvbWVyPih0aGlzLmN1c3RvbWVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+KCk7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hWYWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMubWFwKCAoY3VzdG9tZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tZXJzW2luZGV4XS5jdXN0b21lck5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LnB1c2godGhpcy5jdXN0b21lcnNbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4oKTtcclxuICAgICAgICB0aGlzLmN1c3RvbWVycy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gfVxyXG4iXX0=