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
var sync_component_1 = require("./components/sync/sync.component");
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
var image_service_1 = require("./services/image.service");
var sendData_service_1 = require("./services/sendData.service");
var lastRefresh_service_1 = require("./services/lastRefresh.service");
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
                image_service_1.ImageService,
                sendData_service_1.SendDataService,
                lastRefresh_service_1.LastRefreshService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBQ2hFLDJFQUE2RDtBQUU3RCxZQUFZO0FBQ1osc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSwrRUFBNkU7QUFDN0UsdUdBQW9HO0FBQ3BHLHNGQUFtRjtBQUNuRiwyRkFBd0Y7QUFDeEYsK0dBQTJHO0FBQzNHLCtGQUE0RjtBQUM1Rix5RkFBdUY7QUFDdkYsMEdBQXdHO0FBQ3hHLG1FQUFpRTtBQUNqRSxVQUFVO0FBQ1Ysa0VBQWdFO0FBQ2hFLGdFQUE4RDtBQUM5RCx3REFBeUQ7QUFDekQsa0VBQWdFO0FBQ2hFLDBEQUE0RDtBQUM1RCx3REFBc0Q7QUFDdEQsNERBQTBEO0FBQzFELDhFQUE0RTtBQUM1RSxrRUFBZ0U7QUFDaEUsa0ZBQWdGO0FBQ2hGLDBEQUF3RDtBQUN4RCxnRUFBOEQ7QUFDOUQsc0VBQW9FO0FBdURwRTtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFyRHJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2QiwwQ0FBNEI7Z0JBQzVCLDhCQUFnQjtnQkFDaEIsd0JBQWM7YUFDakI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IseUNBQWtCO2dCQUNsQiwwREFBMEI7YUFDN0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsOEJBQWE7Z0JBQ2IsNENBQW9CO2dCQUNwQixzQ0FBaUI7Z0JBQ2pCLHdEQUEwQjtnQkFDMUIsNkRBQTRCO2dCQUM1Qix5Q0FBa0I7Z0JBQ2xCLHlDQUFrQjtnQkFDbEIsMERBQTBCO2dCQUMxQixxREFBd0I7Z0JBQ3hCLDhCQUFhO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLG9DQUFnQjtnQkFDaEIsa0NBQWU7Z0JBQ2YsaUNBQWtCO2dCQUNsQiw2QkFBYztnQkFDZCw0Q0FBYztnQkFDZCxvQ0FBZ0I7Z0JBQ2hCLGdDQUFnQjtnQkFDaEIsZ0RBQXNCO2dCQUN0QiwwQkFBVztnQkFDWCw4QkFBYTtnQkFDYixvQ0FBZ0I7Z0JBQ2hCLG9EQUF3QjtnQkFDeEIsNEJBQVk7Z0JBQ1osa0NBQWU7Z0JBQ2Ysd0NBQWtCO2FBQ3JCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcblxuLy9Db21wb25lbnRzXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTZW5kRGF0YUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2VuZERhdGEvc2VuZERhdGEuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci10cmFuc2FjdGlvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNhbGVPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvdHJhbnNhY3Rpb24vc2FsZS1vcmRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwvZGF0ZXBpY2tlci9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL21vZGFsL3Byb2R1Y3RPcmRlci9tb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJJbnF1aXJ5Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci1pbnF1aXJ5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSXRlbUlucXVpcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2l0ZW1zSW5xdWlyeS9pdGVtSW5xdWlyeS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJldmlld1RyYW5zYWN0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZXZpZXdUcmFuc2FjdGlvbi9yZXZpZXdUcmFuc2FjdGlvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFN5bmNDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3N5bmMvc3luYy5jb21wb25lbnRcIjtcbi8vU2VydmljZXNcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY3VzdG9tZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xuaW1wb3J0IHsgVGVybXNDb2RlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Rlcm1zLnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zaGlwcGluZ0FkZHJlc3Muc2VydmljZVwiO1xuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGb2xpb3NUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9mb2xpb3NUcmFuc2FjdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTZW5kRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zZW5kRGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMYXN0UmVmcmVzaFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9sYXN0UmVmcmVzaC5zZXJ2aWNlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBEcm9wRG93bk1vZHVsZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIE1vZGFsRGF0ZUNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxuICAgICAgICBIb21lQ29tcG9uZW50LFxuICAgICAgICBJdGVtSW5xdWlyeUNvbXBvbmVudCxcbiAgICAgICAgU2VuZERhdGFDb21wb25lbnQsXG4gICAgICAgIFJldmlld1RyYW5zYWN0aW9uQ29tcG9uZW50LFxuICAgICAgICBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50LFxuICAgICAgICBTYWxlT3JkZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGFsRGF0ZUNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQsXG4gICAgICAgIEN1c3RvbWVySW5xdWlyeUNvbXBvbmVudCxcbiAgICAgICAgU3luY0NvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENvdWNoYmFzZVNlcnZpY2UsXG4gICAgICAgIEN1c3RvbWVyU2VydmljZSxcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBQcm9kdWN0U2VydmljZSxcbiAgICAgICAgQmFyY29kZVNjYW5uZXIsXG4gICAgICAgIEludmVudG9yeVNlcnZpY2UsXG4gICAgICAgIFRlcm1zQ29kZVNlcnZpY2UsXG4gICAgICAgIFNoaXBwaW5nQWRkcmVzc1NlcnZpY2UsXG4gICAgICAgIFVzZXJTZXJ2aWNlLFxuICAgICAgICBEZXZpY2VTZXJ2aWNlLFxuICAgICAgICBTYWxlT3JkZXJTZXJ2aWNlLFxuICAgICAgICBGb2xpb3NUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgICAgIEltYWdlU2VydmljZSxcbiAgICAgICAgU2VuZERhdGFTZXJ2aWNlLFxuICAgICAgICBMYXN0UmVmcmVzaFNlcnZpY2VcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=