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
var saleOrder_service_1 = require("./services/saleOrder.service");
var foliosTransaction_service_1 = require("./services/foliosTransaction.service");
var sync_component_1 = require("./components/sync/sync.component");
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
                sendData_component_1.SendDataComponent,
                reviewTransaction_component_1.ReviewTransactionComponent,
                customer_transaction_component_1.CustomerTransactionComponent,
                sale_order_component_1.SaleOrderComponent,
                modal_date_component_1.ModalDateComponent,
                modal_product_order_component_1.ModalProductOrderComponent,
                customer_inquiry_component_1.CustomerInquiryComponent,
                sync_component_1.SyncComponent
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
                saleOrder_service_1.SaleOrderService,
                foliosTransaction_service_1.FoliosTransactionService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBQ2hFLDJFQUE2RDtBQUU3RCxZQUFZO0FBQ1osc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSwrRUFBNkU7QUFDN0UsdUdBQW9HO0FBQ3BHLHNGQUFtRjtBQUNuRiwyRkFBd0Y7QUFDeEYsK0dBQTJHO0FBQzNHLCtGQUE0RjtBQUM1Rix5RkFBdUY7QUFDdkYsMEdBQXdHO0FBRXhHLFVBQVU7QUFDVixrRUFBZ0U7QUFDaEUsZ0VBQThEO0FBQzlELHdEQUF5RDtBQUN6RCxrRUFBZ0U7QUFDaEUsMERBQTREO0FBQzVELHdEQUFzRDtBQUN0RCw0REFBMEQ7QUFDMUQsOEVBQTRFO0FBQzVFLGtFQUFnRTtBQUNoRSxrRkFBZ0Y7QUFDaEYsbUVBQWlFO0FBb0RqRTtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFsRHJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2QiwwQ0FBNEI7Z0JBQzVCLDhCQUFnQjtnQkFDaEIsd0JBQWM7YUFDakI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IseUNBQWtCO2dCQUNsQiwwREFBMEI7YUFDN0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsOEJBQWE7Z0JBQ2IsNENBQW9CO2dCQUNwQixzQ0FBaUI7Z0JBQ2pCLHdEQUEwQjtnQkFDMUIsNkRBQTRCO2dCQUM1Qix5Q0FBa0I7Z0JBQ2xCLHlDQUFrQjtnQkFDbEIsMERBQTBCO2dCQUMxQixxREFBd0I7Z0JBQ3hCLDhCQUFhO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLG9DQUFnQjtnQkFDaEIsa0NBQWU7Z0JBQ2YsaUNBQWtCO2dCQUNsQiw2QkFBYztnQkFDZCw0Q0FBYztnQkFDZCxvQ0FBZ0I7Z0JBQ2hCLGdDQUFnQjtnQkFDaEIsZ0RBQXNCO2dCQUN0QiwwQkFBVztnQkFDWCw4QkFBYTtnQkFDYixvQ0FBZ0I7Z0JBQ2hCLG9EQUF3QjthQUMzQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5cclxuLy9Db21wb25lbnRzXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZW5kRGF0YUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2VuZERhdGEvc2VuZERhdGEuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyVHJhbnNhY3Rpb25Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2N1c3RvbWVyL2N1c3RvbWVyLXRyYW5zYWN0aW9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3RyYW5zYWN0aW9uL3NhbGUtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwvcHJvZHVjdE9yZGVyL21vZGFsLXByb2R1Y3Qtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVySW5xdWlyeUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY3VzdG9tZXIvY3VzdG9tZXItaW5xdWlyeS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSXRlbUlucXVpcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2l0ZW1zSW5xdWlyeS9pdGVtSW5xdWlyeS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUmV2aWV3VHJhbnNhY3Rpb25Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Jldmlld1RyYW5zYWN0aW9uL3Jldmlld1RyYW5zYWN0aW9uLmNvbXBvbmVudFwiO1xyXG5cclxuLy9TZXJ2aWNlc1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaW52ZW50b3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Rlcm1zLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2RldmljZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZm9saW9zVHJhbnNhY3Rpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTeW5jQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9zeW5jL3N5bmMuY29tcG9uZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgRHJvcERvd25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBNb2RhbERhdGVDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgTG9naW5Db21wb25lbnQsXHJcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcclxuICAgICAgICBJdGVtSW5xdWlyeUNvbXBvbmVudCxcclxuICAgICAgICBTZW5kRGF0YUNvbXBvbmVudCxcclxuICAgICAgICBSZXZpZXdUcmFuc2FjdGlvbkNvbXBvbmVudCxcclxuICAgICAgICBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIFNhbGVPcmRlckNvbXBvbmVudCxcclxuICAgICAgICBNb2RhbERhdGVDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQsXHJcbiAgICAgICAgQ3VzdG9tZXJJbnF1aXJ5Q29tcG9uZW50LFxyXG4gICAgICAgIFN5bmNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDb3VjaGJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIEN1c3RvbWVyU2VydmljZSxcclxuICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgUHJvZHVjdFNlcnZpY2UsXHJcbiAgICAgICAgQmFyY29kZVNjYW5uZXIsXHJcbiAgICAgICAgSW52ZW50b3J5U2VydmljZSxcclxuICAgICAgICBUZXJtc0NvZGVTZXJ2aWNlLFxyXG4gICAgICAgIFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXHJcbiAgICAgICAgVXNlclNlcnZpY2UsXHJcbiAgICAgICAgRGV2aWNlU2VydmljZSxcclxuICAgICAgICBTYWxlT3JkZXJTZXJ2aWNlLFxyXG4gICAgICAgIEZvbGlvc1RyYW5zYWN0aW9uU2VydmljZVxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19