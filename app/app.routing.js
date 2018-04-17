"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/login/login.component");
var home_component_1 = require("./components/home/home.component");
var itemInquiry_component_1 = require("./components/itemsInquiry/itemInquiry.component");
var sendData_component_1 = require("./components/sendData/sendData.component");
var reviewTransaction_component_1 = require("./components/reviewTransaction/reviewTransaction.component");
var customer_transaction_component_1 = require("./components/customer/customer-transaction.component");
var sale_order_component_1 = require("./components/transaction/sale-order.component");
var customer_inquiry_component_1 = require("./components/customer/customer-inquiry.component");
var sync_component_1 = require("./components/sync/sync.component");
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "app", component: app_component_1.AppComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "home", component: home_component_1.HomeComponent },
    { path: "itemInquiry", component: itemInquiry_component_1.ItemInquiryComponent },
    { path: "sendData", component: sendData_component_1.SendDataComponent },
    { path: "reviewTransaction", component: reviewTransaction_component_1.ReviewTransactionComponent },
    { path: "customerTransaction", component: customer_transaction_component_1.CustomerTransactionComponent },
    { path: "saleOrder/:CustomerNo/:IsQuote", component: sale_order_component_1.SaleOrderComponent },
    { path: "customerInquiry", component: customer_inquiry_component_1.CustomerInquiryComponent },
    { path: "sync", component: sync_component_1.SyncComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFFdkUsaURBQStDO0FBQy9DLHNFQUFvRTtBQUNwRSxtRUFBaUU7QUFDakUseUZBQXVGO0FBQ3ZGLCtFQUE2RTtBQUM3RSwwR0FBd0c7QUFDeEcsdUdBQW9HO0FBQ3BHLHNGQUFtRjtBQUNuRiwrRkFBNEY7QUFDNUYsbUVBQWlFO0FBRWpFLElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSw0QkFBWSxFQUFFO0lBQ3hDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLDhCQUFhLEVBQUM7SUFDeEMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBQyw0Q0FBb0IsRUFBQztJQUN0RCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLHNDQUFpQixFQUFDO0lBQ2hELEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBQyx3REFBMEIsRUFBQztJQUNsRSxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsNkRBQTRCLEVBQUM7SUFDdkUsRUFBRSxJQUFJLEVBQUUsZ0NBQWdDLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFDO0lBQ3hFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxxREFBd0IsRUFBQztJQUMvRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUM7Q0FDNUMsQ0FBQztBQU1GO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixnQkFBZ0I7UUFKNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSXRlbUlucXVpcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2l0ZW1zSW5xdWlyeS9pdGVtSW5xdWlyeS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNlbmREYXRhQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9zZW5kRGF0YS9zZW5kRGF0YS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJldmlld1RyYW5zYWN0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZXZpZXdUcmFuc2FjdGlvbi9yZXZpZXdUcmFuc2FjdGlvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IEN1c3RvbWVyVHJhbnNhY3Rpb25Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2N1c3RvbWVyL2N1c3RvbWVyLXRyYW5zYWN0aW9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2FsZU9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy90cmFuc2FjdGlvbi9zYWxlLW9yZGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJJbnF1aXJ5Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci1pbnF1aXJ5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU3luY0NvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvc3luYy9zeW5jLmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2xvZ2luXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcbiAgICB7IHBhdGg6IFwiYXBwXCIsIGNvbXBvbmVudDogQXBwQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcImxvZ2luXCIsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwiaG9tZVwiLCBjb21wb25lbnQ6SG9tZUNvbXBvbmVudH0sXG4gICAgeyBwYXRoOiBcIml0ZW1JbnF1aXJ5XCIsIGNvbXBvbmVudDpJdGVtSW5xdWlyeUNvbXBvbmVudH0sXG4gICAgeyBwYXRoOiBcInNlbmREYXRhXCIsIGNvbXBvbmVudDpTZW5kRGF0YUNvbXBvbmVudH0sXG4gICAgeyBwYXRoOiBcInJldmlld1RyYW5zYWN0aW9uXCIsIGNvbXBvbmVudDpSZXZpZXdUcmFuc2FjdGlvbkNvbXBvbmVudH0sXG4gICAgeyBwYXRoOiBcImN1c3RvbWVyVHJhbnNhY3Rpb25cIiwgY29tcG9uZW50OiBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50fSxcbiAgICB7IHBhdGg6IFwic2FsZU9yZGVyLzpDdXN0b21lck5vLzpJc1F1b3RlXCIsIGNvbXBvbmVudDogU2FsZU9yZGVyQ29tcG9uZW50fSxcbiAgICB7IHBhdGg6IFwiY3VzdG9tZXJJbnF1aXJ5XCIsIGNvbXBvbmVudDogQ3VzdG9tZXJJbnF1aXJ5Q29tcG9uZW50fSxcbiAgICB7IHBhdGg6IFwic3luY1wiLCBjb21wb25lbnQ6IFN5bmNDb21wb25lbnR9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==