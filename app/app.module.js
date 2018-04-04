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
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
//Components
var login_component_1 = require("./components/login/login.component");
var home_component_1 = require("./components/home/home.component");
var customer_transaction_component_1 = require("./components/customer/customer-transaction.component");
var sale_order_component_1 = require("./components/transaction/sale-order.component");
var modal_date_component_1 = require("./components/modal/datepicker/modal-date.component");
var itemInquiry_component_1 = require("./components/itemsInquiry/itemInquiry.component");
//Services
var couchbase_service_1 = require("./services/couchbase.service");
var customer_service_1 = require("./services/customer.service");
var item_service_1 = require("./services/item.service");
var modal_product_order_component_1 = require("./components/modal/productOrder/modal-product-order.component");
var customer_inquiry_component_1 = require("./components/customer/customer-inquiry.component");
var inventory_service_1 = require("./services/inventory.service");
var terms_service_1 = require("./services/terms.service");
var shippingAddress_service_1 = require("./services/shippingAddress.service");
var user_service_1 = require("./services/user.service");
var device_service_1 = require("./services/device.service");
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
                modal_date_component_1.ModalDateComponent,
                modal_product_order_component_1.ModalProductOrderComponent
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                customer_transaction_component_1.CustomerTransactionComponent,
                sale_order_component_1.SaleOrderComponent,
                modal_date_component_1.ModalDateComponent,
                itemInquiry_component_1.ItemInquiryComponent,
                modal_product_order_component_1.ModalProductOrderComponent,
                customer_inquiry_component_1.CustomerInquiryComponent
            ],
            providers: [
                couchbase_service_1.CouchbaseService,
                customer_service_1.CustomerService,
                modal_dialog_1.ModalDialogService,
                item_service_1.ProductService,
                nativescript_barcodescanner_1.BarcodeScanner,
                inventory_service_1.InventoryService,
                terms_service_1.TermsCodeService,
                shippingAddress_service_1.ShippingAddressService,
                user_service_1.UserService,
                device_service_1.DeviceService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBQ2hFLDJFQUE2RDtBQUU3RCxZQUFZO0FBQ1osc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSx1R0FBb0c7QUFDcEcsc0ZBQW1GO0FBQ25GLDJGQUF3RjtBQUN4Rix5RkFBdUY7QUFFdkYsVUFBVTtBQUNWLGtFQUFnRTtBQUNoRSxnRUFBOEQ7QUFDOUQsd0RBQXlEO0FBQ3pELCtHQUEyRztBQUMzRywrRkFBNEY7QUFDNUYsa0VBQWdFO0FBQ2hFLDBEQUE0RDtBQUM1RCw4RUFBNEU7QUFDNUUsd0RBQXNEO0FBQ3RELDREQUEwRDtBQStDMUQ7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBN0NyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1Qiw4QkFBZ0I7Z0JBQ2hCLHdCQUFjO2FBQ2pCO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLHlDQUFrQjtnQkFDbEIsMERBQTBCO2FBQzdCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLDhCQUFhO2dCQUNiLDZEQUE0QjtnQkFDNUIseUNBQWtCO2dCQUNsQix5Q0FBa0I7Z0JBQ2xCLDRDQUFvQjtnQkFDcEIsMERBQTBCO2dCQUMxQixxREFBd0I7YUFDM0I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asb0NBQWdCO2dCQUNoQixrQ0FBZTtnQkFDZixpQ0FBa0I7Z0JBQ2xCLDZCQUFjO2dCQUNkLDRDQUFjO2dCQUNkLG9DQUFnQjtnQkFDaEIsZ0NBQWdCO2dCQUNoQixnREFBc0I7Z0JBQ3RCLDBCQUFXO2dCQUNYLDhCQUFhO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcblxyXG4vL0NvbXBvbmVudHNcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyVHJhbnNhY3Rpb25Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2N1c3RvbWVyL2N1c3RvbWVyLXRyYW5zYWN0aW9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3RyYW5zYWN0aW9uL3NhbGUtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJdGVtSW5xdWlyeUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaXRlbXNJbnF1aXJ5L2l0ZW1JbnF1aXJ5LmNvbXBvbmVudFwiO1xyXG5cclxuLy9TZXJ2aWNlc1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwvcHJvZHVjdE9yZGVyL21vZGFsLXByb2R1Y3Qtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVySW5xdWlyeUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY3VzdG9tZXIvY3VzdG9tZXItaW5xdWlyeS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBEcm9wRG93bk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIE1vZGFsRGF0ZUNvbXBvbmVudCxcclxuICAgICAgICBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEN1c3RvbWVyVHJhbnNhY3Rpb25Db21wb25lbnQsXHJcbiAgICAgICAgU2FsZU9yZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsRGF0ZUNvbXBvbmVudCxcclxuICAgICAgICBJdGVtSW5xdWlyeUNvbXBvbmVudCxcclxuICAgICAgICBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCxcclxuICAgICAgICBDdXN0b21lcklucXVpcnlDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIEN1c3RvbWVyU2VydmljZSxcclxuICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgQmFyY29kZVNjYW5uZXIsXHJcbiAgICAgICAgSW52ZW50b3J5U2VydmljZSxcclxuICAgICAgICBUZXJtc0NvZGVTZXJ2aWNlLFxyXG4gICAgICAgIFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgVXNlclNlcnZpY2UsXHJcbiAgICAgICAgRGV2aWNlU2VydmljZVxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19