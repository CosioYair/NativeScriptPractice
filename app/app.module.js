"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var forms_1 = require("nativescript-angular/forms");
var http_client_1 = require("nativescript-angular/http-client");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var angular_1 = require("nativescript-drop-down/angular");
//Components
var login_component_1 = require("./components/login/login.component");
var home_component_1 = require("./components/home/home.component");
var customer_component_1 = require("./components/customer/customer.component");
var sale_order_component_1 = require("./components/transaction/sale-order.component");
var modal_date_component_1 = require("./components/modal/modal-date.component");
var itemInquiry_component_1 = require("./components/itemsInquiry/itemInquiry.component");
//Services
var couchbase_service_1 = require("./services/couchbase.service");
var customer_service_1 = require("./services/customer.service");
var item_service_1 = require("./services/item.service");
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                app_routing_1.AppRoutingModule,
                angular_1.DropDownModule
            ],
            entryComponents: [
                modal_date_component_1.ModalDateComponent
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                customer_component_1.CustomerComponent,
                sale_order_component_1.SaleOrderComponent,
                modal_date_component_1.ModalDateComponent,
                itemInquiry_component_1.ItemInquiryComponent
            ],
            providers: [
                couchbase_service_1.CouchbaseService,
                customer_service_1.CustomerService,
                modal_dialog_1.ModalDialogService,
                item_service_1.ProductService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBRWhFLFlBQVk7QUFDWixzRUFBb0U7QUFDcEUsbUVBQWlFO0FBQ2pFLCtFQUE2RTtBQUM3RSxzRkFBbUY7QUFDbkYsZ0ZBQTZFO0FBQzdFLHlGQUF1RjtBQUV2RixVQUFVO0FBQ1Ysa0VBQWdFO0FBQ2hFLGdFQUE4RDtBQUM5RCx3REFBeUQ7QUFzQ3pEO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXBDckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLDBDQUE0QjtnQkFDNUIsOEJBQWdCO2dCQUNoQix3QkFBYzthQUNqQjtZQUNELGVBQWUsRUFBRTtnQkFDYix5Q0FBa0I7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsOEJBQWE7Z0JBQ2Isc0NBQWlCO2dCQUNqQix5Q0FBa0I7Z0JBQ2xCLHlDQUFrQjtnQkFDbEIsNENBQW9CO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLG9DQUFnQjtnQkFDaEIsa0NBQWU7Z0JBQ2YsaUNBQWtCO2dCQUNsQiw2QkFBYzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuXHJcbi8vQ29tcG9uZW50c1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2N1c3RvbWVyL2N1c3RvbWVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3RyYW5zYWN0aW9uL3NhbGUtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSXRlbUlucXVpcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2l0ZW1zSW5xdWlyeS9pdGVtSW5xdWlyeS5jb21wb25lbnRcIjtcclxuXHJcbi8vU2VydmljZXNcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBEcm9wRG93bk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIE1vZGFsRGF0ZUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEN1c3RvbWVyQ29tcG9uZW50LFxyXG4gICAgICAgIFNhbGVPcmRlckNvbXBvbmVudCxcclxuICAgICAgICBNb2RhbERhdGVDb21wb25lbnQsXHJcbiAgICAgICAgSXRlbUlucXVpcnlDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIEN1c3RvbWVyU2VydmljZSxcclxuICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgUHJvZHVjdFNlcnZpY2VcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG4vKlxyXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==