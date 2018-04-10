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
var sync_component_1 = require("./components/Sync/sync.component");
var sendData_service_1 = require("./services/sendData.service");
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
                foliosTransaction_service_1.FoliosTransactionService,
                sendData_service_1.SendDataService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBQ2hFLDJFQUE2RDtBQUU3RCxZQUFZO0FBQ1osc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSwrRUFBNkU7QUFDN0UsdUdBQW9HO0FBQ3BHLHNGQUFtRjtBQUNuRiwyRkFBd0Y7QUFDeEYsK0dBQTJHO0FBQzNHLCtGQUE0RjtBQUM1Rix5RkFBdUY7QUFDdkYsMEdBQXdHO0FBRXhHLFVBQVU7QUFDVixrRUFBZ0U7QUFDaEUsZ0VBQThEO0FBQzlELHdEQUF5RDtBQUN6RCxrRUFBZ0U7QUFDaEUsMERBQTREO0FBQzVELHdEQUFzRDtBQUN0RCw0REFBMEQ7QUFDMUQsOEVBQTRFO0FBQzVFLGtFQUFnRTtBQUNoRSxrRkFBZ0Y7QUFDaEYsbUVBQWlFO0FBQ2pFLGdFQUE4RDtBQXFEOUQ7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBbkRyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1Qiw4QkFBZ0I7Z0JBQ2hCLHdCQUFjO2FBQ2pCO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLHlDQUFrQjtnQkFDbEIsMERBQTBCO2FBQzdCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLDhCQUFhO2dCQUNiLDRDQUFvQjtnQkFDcEIsc0NBQWlCO2dCQUNqQix3REFBMEI7Z0JBQzFCLDZEQUE0QjtnQkFDNUIseUNBQWtCO2dCQUNsQix5Q0FBa0I7Z0JBQ2xCLDBEQUEwQjtnQkFDMUIscURBQXdCO2dCQUN4Qiw4QkFBYTthQUNoQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxvQ0FBZ0I7Z0JBQ2hCLGtDQUFlO2dCQUNmLGlDQUFrQjtnQkFDbEIsNkJBQWM7Z0JBQ2QsNENBQWM7Z0JBQ2Qsb0NBQWdCO2dCQUNoQixnQ0FBZ0I7Z0JBQ2hCLGdEQUFzQjtnQkFDdEIsMEJBQVc7Z0JBQ1gsOEJBQWE7Z0JBQ2Isb0NBQWdCO2dCQUNoQixvREFBd0I7Z0JBQ3hCLGtDQUFlO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcblxyXG4vL0NvbXBvbmVudHNcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNlbmREYXRhQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9zZW5kRGF0YS9zZW5kRGF0YS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJUcmFuc2FjdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY3VzdG9tZXIvY3VzdG9tZXItdHJhbnNhY3Rpb24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvdHJhbnNhY3Rpb24vc2FsZS1vcmRlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9tb2RhbC9kYXRlcGlja2VyL21vZGFsLWRhdGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9tb2RhbC9wcm9kdWN0T3JkZXIvbW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJJbnF1aXJ5Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci1pbnF1aXJ5LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJdGVtSW5xdWlyeUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaXRlbXNJbnF1aXJ5L2l0ZW1JbnF1aXJ5LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBSZXZpZXdUcmFuc2FjdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcmV2aWV3VHJhbnNhY3Rpb24vcmV2aWV3VHJhbnNhY3Rpb24uY29tcG9uZW50XCI7XHJcblxyXG4vL1NlcnZpY2VzXHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBUZXJtc0NvZGVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBGb2xpb3NUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9mb2xpb3NUcmFuc2FjdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN5bmNDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1N5bmMvc3luYy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2VuZERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvc2VuZERhdGEuc2VydmljZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIERyb3BEb3duTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICAgICAgTW9kYWxEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIEhvbWVDb21wb25lbnQsXHJcbiAgICAgICAgSXRlbUlucXVpcnlDb21wb25lbnQsXHJcbiAgICAgICAgU2VuZERhdGFDb21wb25lbnQsXHJcbiAgICAgICAgUmV2aWV3VHJhbnNhY3Rpb25Db21wb25lbnQsXHJcbiAgICAgICAgQ3VzdG9tZXJUcmFuc2FjdGlvbkNvbXBvbmVudCxcclxuICAgICAgICBTYWxlT3JkZXJDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEN1c3RvbWVySW5xdWlyeUNvbXBvbmVudCxcclxuICAgICAgICBTeW5jQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ291Y2hiYXNlU2VydmljZSxcclxuICAgICAgICBDdXN0b21lclNlcnZpY2UsXHJcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIFByb2R1Y3RTZXJ2aWNlLFxyXG4gICAgICAgIEJhcmNvZGVTY2FubmVyLFxyXG4gICAgICAgIEludmVudG9yeVNlcnZpY2UsXHJcbiAgICAgICAgVGVybXNDb2RlU2VydmljZSxcclxuICAgICAgICBTaGlwcGluZ0FkZHJlc3NTZXJ2aWNlLFxyXG4gICAgICAgIFVzZXJTZXJ2aWNlLFxyXG4gICAgICAgIERldmljZVNlcnZpY2UsXHJcbiAgICAgICAgU2FsZU9yZGVyU2VydmljZSxcclxuICAgICAgICBGb2xpb3NUcmFuc2FjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgU2VuZERhdGFTZXJ2aWNlXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuLypcclxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=