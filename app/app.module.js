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
var sync_component_1 = require("./components/sync/sync.component");
var sendData_component_1 = require("./components/sendData/sendData.component");
var customer_transaction_component_1 = require("./components/customer/customer-transaction.component");
var sale_order_component_1 = require("./components/transaction/sale-order.component");
var modal_date_component_1 = require("./components/modal/datepicker/modal-date.component");
var modal_product_order_component_1 = require("./components/modal/productOrder/modal-product-order.component");
var customer_inquiry_component_1 = require("./components/customer/customer-inquiry.component");
var itemInquiry_component_1 = require("./components/itemsInquiry/itemInquiry.component");
var reviewTransaction_component_1 = require("./components/reviewTransaction/reviewTransaction.component");
//Services
var couchbase_service_1 = require("./services/couchbase.service");
var customer_service_1 = require("./services/customer.service");
var item_service_1 = require("./services/item.service");
var inventory_service_1 = require("./services/inventory.service");
var terms_service_1 = require("./services/terms.service");
var user_service_1 = require("./services/user.service");
var device_service_1 = require("./services/device.service");
var shippingAddress_service_1 = require("./services/shippingAddress.service");
var image_service_1 = require("./services/image.service");
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
                itemInquiry_component_1.ItemInquiryComponent,
                sync_component_1.SyncComponent,
                sendData_component_1.SendDataComponent,
                reviewTransaction_component_1.ReviewTransactionComponent,
                customer_transaction_component_1.CustomerTransactionComponent,
                sale_order_component_1.SaleOrderComponent,
                modal_date_component_1.ModalDateComponent,
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
                device_service_1.DeviceService,
                image_service_1.ImageService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBQ2hFLDJFQUE2RDtBQUU3RCxZQUFZO0FBQ1osc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSxtRUFBaUU7QUFDakUsK0VBQTZFO0FBQzdFLHVHQUFvRztBQUNwRyxzRkFBbUY7QUFDbkYsMkZBQXdGO0FBQ3hGLCtHQUEyRztBQUMzRywrRkFBNEY7QUFDNUYseUZBQXVGO0FBQ3ZGLDBHQUF3RztBQUV4RyxVQUFVO0FBQ1Ysa0VBQWdFO0FBQ2hFLGdFQUE4RDtBQUM5RCx3REFBeUQ7QUFDekQsa0VBQWdFO0FBQ2hFLDBEQUE0RDtBQUM1RCx3REFBc0Q7QUFDdEQsNERBQTBEO0FBQzFELDhFQUE0RTtBQUM1RSwwREFBd0Q7QUFtRHhEO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQWpEckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLDBDQUE0QjtnQkFDNUIsOEJBQWdCO2dCQUNoQix3QkFBYzthQUNqQjtZQUNELGVBQWUsRUFBRTtnQkFDYix5Q0FBa0I7Z0JBQ2xCLDBEQUEwQjthQUM3QjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCw4QkFBYTtnQkFDYiw0Q0FBb0I7Z0JBQ3BCLDhCQUFhO2dCQUNiLHNDQUFpQjtnQkFDakIsd0RBQTBCO2dCQUMxQiw2REFBNEI7Z0JBQzVCLHlDQUFrQjtnQkFDbEIseUNBQWtCO2dCQUNsQiwwREFBMEI7Z0JBQzFCLHFEQUF3QjthQUMzQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxvQ0FBZ0I7Z0JBQ2hCLGtDQUFlO2dCQUNmLGlDQUFrQjtnQkFDbEIsNkJBQWM7Z0JBQ2QsNENBQWM7Z0JBQ2Qsb0NBQWdCO2dCQUNoQixnQ0FBZ0I7Z0JBQ2hCLGdEQUFzQjtnQkFDdEIsMEJBQVc7Z0JBQ1gsOEJBQWE7Z0JBQ2IsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5cclxuLy9Db21wb25lbnRzXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9zeW5jL3N5bmMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNlbmREYXRhQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9zZW5kRGF0YS9zZW5kRGF0YS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJUcmFuc2FjdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY3VzdG9tZXIvY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvdHJhbnNhY3Rpb24vc2FsZS1vcmRlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9tb2RhbC9kYXRlcGlja2VyL21vZGFsLWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9tb2RhbC9wcm9kdWN0T3JkZXIvbW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJJbnF1aXJ5Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci1pbnF1aXJ5LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJdGVtSW5xdWlyeUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaXRlbXNJbnF1aXJ5L2l0ZW1JbnF1aXJ5LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBSZXZpZXdUcmFuc2FjdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcmV2aWV3VHJhbnNhY3Rpb24vcmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50XCI7XHJcblxyXG4vL1NlcnZpY2VzXHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBUZXJtc0NvZGVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEltYWdlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2VcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBEcm9wRG93bk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIE1vZGFsRGF0ZUNvbXBvbmVudCxcclxuICAgICAgICBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEl0ZW1JbnF1aXJ5Q29tcG9uZW50LFxyXG4gICAgICAgIFN5bmNDb21wb25lbnQsXHJcbiAgICAgICAgU2VuZERhdGFDb21wb25lbnQsXHJcbiAgICAgICAgUmV2aWV3VHJhbnNhY3Rpb25Db21wb25lbnQsXHJcbiAgICAgICAgQ3VzdG9tZXJUcmFuc2FjdGlvbkNvbXBvbmVudCxcclxuICAgICAgICBTYWxlT3JkZXJDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEN1c3RvbWVySW5xdWlyeUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENvdWNoYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgQ3VzdG9tZXJTZXJ2aWNlLFxyXG4gICAgICAgIE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBQcm9kdWN0U2VydmljZSxcclxuICAgICAgICBCYXJjb2RlU2Nhbm5lcixcclxuICAgICAgICBJbnZlbnRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIFRlcm1zQ29kZVNlcnZpY2UsXHJcbiAgICAgICAgU2hpcHBpbmdBZGRyZXNzU2VydmljZSxcclxuICAgICAgICBVc2VyU2VydmljZSxcclxuICAgICAgICBEZXZpY2VTZXJ2aWNlLFxyXG4gICAgICAgIEltYWdlU2VydmljZVxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19