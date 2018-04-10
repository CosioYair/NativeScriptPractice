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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBQ2hFLDJFQUE2RDtBQUU3RCxZQUFZO0FBQ1osc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSwrRUFBNkU7QUFDN0UsdUdBQW9HO0FBQ3BHLHNGQUFtRjtBQUNuRiwyRkFBd0Y7QUFDeEYsK0dBQTJHO0FBQzNHLCtGQUE0RjtBQUM1Rix5RkFBdUY7QUFDdkYsMEdBQXdHO0FBQ3hHLG1FQUFpRTtBQUNqRSxVQUFVO0FBQ1Ysa0VBQWdFO0FBQ2hFLGdFQUE4RDtBQUM5RCx3REFBeUQ7QUFDekQsa0VBQWdFO0FBQ2hFLDBEQUE0RDtBQUM1RCx3REFBc0Q7QUFDdEQsNERBQTBEO0FBQzFELDhFQUE0RTtBQUM1RSxrRUFBZ0U7QUFDaEUsa0ZBQWdGO0FBQ2hGLDBEQUF3RDtBQXFEeEQ7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBbkRyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1Qiw4QkFBZ0I7Z0JBQ2hCLHdCQUFjO2FBQ2pCO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLHlDQUFrQjtnQkFDbEIsMERBQTBCO2FBQzdCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLDhCQUFhO2dCQUNiLDRDQUFvQjtnQkFDcEIsc0NBQWlCO2dCQUNqQix3REFBMEI7Z0JBQzFCLDZEQUE0QjtnQkFDNUIseUNBQWtCO2dCQUNsQix5Q0FBa0I7Z0JBQ2xCLDBEQUEwQjtnQkFDMUIscURBQXdCO2dCQUN4Qiw4QkFBYTthQUNoQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxvQ0FBZ0I7Z0JBQ2hCLGtDQUFlO2dCQUNmLGlDQUFrQjtnQkFDbEIsNkJBQWM7Z0JBQ2QsNENBQWM7Z0JBQ2Qsb0NBQWdCO2dCQUNoQixnQ0FBZ0I7Z0JBQ2hCLGdEQUFzQjtnQkFDdEIsMEJBQVc7Z0JBQ1gsOEJBQWE7Z0JBQ2Isb0NBQWdCO2dCQUNoQixvREFBd0I7Z0JBQ3hCLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztRQUNGOztVQUVFO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgRHJvcERvd25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcclxuXHJcbi8vQ29tcG9uZW50c1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2VuZERhdGFDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3NlbmREYXRhL3NlbmREYXRhLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci10cmFuc2FjdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy90cmFuc2FjdGlvbi9zYWxlLW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL21vZGFsL2RhdGVwaWNrZXIvbW9kYWwtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL21vZGFsL3Byb2R1Y3RPcmRlci9tb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDdXN0b21lcklucXVpcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2N1c3RvbWVyL2N1c3RvbWVyLWlucXVpcnkuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEl0ZW1JbnF1aXJ5Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9pdGVtc0lucXVpcnkvaXRlbUlucXVpcnkuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJldmlld1RyYW5zYWN0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZXZpZXdUcmFuc2FjdGlvbi9yZXZpZXdUcmFuc2FjdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU3luY0NvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvc3luYy9zeW5jLmNvbXBvbmVudFwiO1xyXG4vL1NlcnZpY2VzXHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jdXN0b21lci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEludmVudG9yeVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pbnZlbnRvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBUZXJtc0NvZGVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdGVybXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZGV2aWNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2hpcHBpbmdBZGRyZXNzU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3NoaXBwaW5nQWRkcmVzcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBGb2xpb3NUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9mb2xpb3NUcmFuc2FjdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEltYWdlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2VcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBEcm9wRG93bk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIE1vZGFsRGF0ZUNvbXBvbmVudCxcclxuICAgICAgICBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEl0ZW1JbnF1aXJ5Q29tcG9uZW50LFxyXG4gICAgICAgIFNlbmREYXRhQ29tcG9uZW50LFxyXG4gICAgICAgIFJldmlld1RyYW5zYWN0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIEN1c3RvbWVyVHJhbnNhY3Rpb25Db21wb25lbnQsXHJcbiAgICAgICAgU2FsZU9yZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsRGF0ZUNvbXBvbmVudCxcclxuICAgICAgICBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCxcclxuICAgICAgICBDdXN0b21lcklucXVpcnlDb21wb25lbnQsXHJcbiAgICAgICAgU3luY0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENvdWNoYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgQ3VzdG9tZXJTZXJ2aWNlLFxyXG4gICAgICAgIE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBQcm9kdWN0U2VydmljZSxcclxuICAgICAgICBCYXJjb2RlU2Nhbm5lcixcclxuICAgICAgICBJbnZlbnRvcnlTZXJ2aWNlLFxyXG4gICAgICAgIFRlcm1zQ29kZVNlcnZpY2UsXHJcbiAgICAgICAgU2hpcHBpbmdBZGRyZXNzU2VydmljZSxcclxuICAgICAgICBVc2VyU2VydmljZSxcclxuICAgICAgICBEZXZpY2VTZXJ2aWNlLFxyXG4gICAgICAgIFNhbGVPcmRlclNlcnZpY2UsXHJcbiAgICAgICAgRm9saW9zVHJhbnNhY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIEltYWdlU2VydmljZVxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19