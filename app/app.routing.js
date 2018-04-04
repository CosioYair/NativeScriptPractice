"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/login/login.component");
var home_component_1 = require("./components/home/home.component");
var customer_component_1 = require("./components/customer/customer.component");
var itemInquiry_component_1 = require("./components/itemsInquiry/itemInquiry.component");
var sync_component_1 = require("./components/Sync/sync.component");
var sendData_component_1 = require("./components/sendData/sendData.component");
var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "app", component: app_component_1.AppComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "home", component: home_component_1.HomeComponent },
    { path: "itemInquiry", component: itemInquiry_component_1.ItemInquiryComponent },
    { path: "sync", component: sync_component_1.SyncComponent },
    { path: "sendData", component: sendData_component_1.SendDataComponent },
    { path: "customer", component: customer_component_1.CustomerComponent },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFFdkUsaURBQStDO0FBQy9DLHNFQUFvRTtBQUNwRSxtRUFBaUU7QUFDakUsK0VBQTZFO0FBQzdFLHlGQUF1RjtBQUN2RixtRUFBaUU7QUFDakUsK0VBQTZFO0FBRTdFLElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSw0QkFBWSxFQUFFO0lBQ3hDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLDhCQUFhLEVBQUM7SUFDeEMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBQyw0Q0FBb0IsRUFBQztJQUN0RCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLDhCQUFhLEVBQUM7SUFDeEMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBQyxzQ0FBaUIsRUFBQztJQUNoRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFDO0NBQ3BELENBQUM7QUFNRjtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSXRlbUlucXVpcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2l0ZW1zSW5xdWlyeS9pdGVtSW5xdWlyeS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvU3luYy9zeW5jLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZW5kRGF0YUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2VuZERhdGEvc2VuZERhdGEuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvaG9tZVwiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXHJcbiAgICB7IHBhdGg6IFwiYXBwXCIsIGNvbXBvbmVudDogQXBwQ29tcG9uZW50IH0sXHJcbiAgICB7IHBhdGg6IFwibG9naW5cIiwgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudCB9LFxyXG4gICAgeyBwYXRoOiBcImhvbWVcIiwgY29tcG9uZW50OkhvbWVDb21wb25lbnR9LFxyXG4gICAgeyBwYXRoOiBcIml0ZW1JbnF1aXJ5XCIsIGNvbXBvbmVudDpJdGVtSW5xdWlyeUNvbXBvbmVudH0sXHJcbiAgICB7IHBhdGg6IFwic3luY1wiLCBjb21wb25lbnQ6U3luY0NvbXBvbmVudH0sXHJcbiAgICB7IHBhdGg6IFwic2VuZERhdGFcIiwgY29tcG9uZW50OlNlbmREYXRhQ29tcG9uZW50fSxcclxuICAgIHsgcGF0aDogXCJjdXN0b21lclwiLCBjb21wb25lbnQ6IEN1c3RvbWVyQ29tcG9uZW50fSxcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXHJcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7IH0iXX0=