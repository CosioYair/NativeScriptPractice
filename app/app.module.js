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
                shippingAddress_service_1.ShippingAddressService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBQ2hFLDJFQUE2RDtBQUU3RCxZQUFZO0FBQ1osc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSx1R0FBb0c7QUFDcEcsc0ZBQW1GO0FBQ25GLDJGQUF3RjtBQUN4Rix5RkFBdUY7QUFFdkYsVUFBVTtBQUNWLGtFQUFnRTtBQUNoRSxnRUFBOEQ7QUFDOUQsd0RBQXlEO0FBQ3pELCtHQUEyRztBQUMzRywrRkFBNEY7QUFDNUYsa0VBQWdFO0FBQ2hFLDBEQUE0RDtBQUM1RCw4RUFBNEU7QUE2QzVFO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQTNDckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLDBDQUE0QjtnQkFDNUIsOEJBQWdCO2dCQUNoQix3QkFBYzthQUNqQjtZQUNELGVBQWUsRUFBRTtnQkFDYix5Q0FBa0I7Z0JBQ2xCLDBEQUEwQjthQUM3QjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCw4QkFBYTtnQkFDYiw2REFBNEI7Z0JBQzVCLHlDQUFrQjtnQkFDbEIseUNBQWtCO2dCQUNsQiw0Q0FBb0I7Z0JBQ3BCLDBEQUEwQjtnQkFDMUIscURBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLG9DQUFnQjtnQkFDaEIsa0NBQWU7Z0JBQ2YsaUNBQWtCO2dCQUNsQiw2QkFBYztnQkFDZCw0Q0FBYztnQkFDZCxvQ0FBZ0I7Z0JBQ2hCLGdDQUFnQjtnQkFDaEIsZ0RBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcblxyXG4vL0NvbXBvbmVudHNcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyVHJhbnNhY3Rpb25Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2N1c3RvbWVyL2N1c3RvbWVyLXRyYW5zYWN0aW9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3RyYW5zYWN0aW9uL3NhbGUtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJdGVtSW5xdWlyeUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaXRlbXNJbnF1aXJ5L2l0ZW1JbnF1aXJ5LmNvbXBvbmVudFwiO1xyXG5cclxuLy9TZXJ2aWNlc1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwvcHJvZHVjdE9yZGVyL21vZGFsLXByb2R1Y3Qtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVySW5xdWlyeUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY3VzdG9tZXIvY3VzdG9tZXItaW5xdWlyeS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ludmVudG9yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29kZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy90ZXJtcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIERyb3BEb3duTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICAgICAgTW9kYWxEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIEhvbWVDb21wb25lbnQsXHJcbiAgICAgICAgQ3VzdG9tZXJUcmFuc2FjdGlvbkNvbXBvbmVudCxcclxuICAgICAgICBTYWxlT3JkZXJDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgIEl0ZW1JbnF1aXJ5Q29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEN1c3RvbWVySW5xdWlyeUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENvdWNoYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgQ3VzdG9tZXJTZXJ2aWNlLFxyXG4gICAgICAgIE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBQcm9kdWN0U2VydmljZSxcclxuICAgICAgICBCYXJjb2RlU2Nhbm5lcixcclxuICAgICAgICBJbnZlbnRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIFRlcm1zQ29kZVNlcnZpY2UsXHJcbiAgICAgICAgU2hpcHBpbmdBZGRyZXNzU2VydmljZVxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19