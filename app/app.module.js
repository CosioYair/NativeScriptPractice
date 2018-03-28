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
                modal_product_order_component_1.ModalProductOrderComponent
            ],
            providers: [
                couchbase_service_1.CouchbaseService,
                customer_service_1.CustomerService,
                modal_dialog_1.ModalDialogService,
                item_service_1.ProductService,
                nativescript_barcodescanner_1.BarcodeScanner
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixrRUFBdUU7QUFDdkUsMERBQWdFO0FBQ2hFLDJFQUE2RDtBQUU3RCxZQUFZO0FBQ1osc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSx1R0FBb0c7QUFDcEcsc0ZBQW1GO0FBQ25GLDJGQUF3RjtBQUN4Rix5RkFBdUY7QUFFdkYsVUFBVTtBQUNWLGtFQUFnRTtBQUNoRSxnRUFBOEQ7QUFDOUQsd0RBQXlEO0FBQ3pELCtHQUEyRztBQXlDM0c7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBdkNyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1Qiw4QkFBZ0I7Z0JBQ2hCLHdCQUFjO2FBQ2pCO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLHlDQUFrQjtnQkFDbEIsMERBQTBCO2FBQzdCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLDhCQUFhO2dCQUNiLDZEQUE0QjtnQkFDNUIseUNBQWtCO2dCQUNsQix5Q0FBa0I7Z0JBQ2xCLDRDQUFvQjtnQkFDcEIsMERBQTBCO2FBQzdCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLG9DQUFnQjtnQkFDaEIsa0NBQWU7Z0JBQ2YsaUNBQWtCO2dCQUNsQiw2QkFBYztnQkFDZCw0Q0FBYzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5cclxuLy9Db21wb25lbnRzXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclRyYW5zYWN0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b21lci9jdXN0b21lci10cmFuc2FjdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy90cmFuc2FjdGlvbi9zYWxlLW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL21vZGFsL2RhdGVwaWNrZXIvbW9kYWwtZGF0ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSXRlbUlucXVpcnlDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2l0ZW1zSW5xdWlyeS9pdGVtSW5xdWlyeS5jb21wb25lbnRcIjtcclxuXHJcbi8vU2VydmljZXNcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2NvdWNoYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2N1c3RvbWVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL21vZGFsL3Byb2R1Y3RPcmRlci9tb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudFwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIERyb3BEb3duTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICAgICAgTW9kYWxEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIEhvbWVDb21wb25lbnQsXHJcbiAgICAgICAgQ3VzdG9tZXJUcmFuc2FjdGlvbkNvbXBvbmVudCxcclxuICAgICAgICBTYWxlT3JkZXJDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgIEl0ZW1JbnF1aXJ5Q29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ291Y2hiYXNlU2VydmljZSxcclxuICAgICAgICBDdXN0b21lclNlcnZpY2UsXHJcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIFByb2R1Y3RTZXJ2aWNlLFxyXG4gICAgICAgIEJhcmNvZGVTY2FubmVyXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuLypcclxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=