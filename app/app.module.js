"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var forms_1 = require("nativescript-angular/forms");
var http_client_1 = require("nativescript-angular/http-client");
var login_component_1 = require("./components/login/login.component");
var home_component_1 = require("./components/home/home.component");
// Uncomment and add to NgModule imports if you need to use two-way binding
var itemInquiry_component_1 = require("./components/itemsInquiry/itemInquiry.component");
var couchbase_service_1 = require("./services/couchbase.service");
var item_service_1 = require("./services/item.service");
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
//import { NativeScriptHttpModule } from "nativescript-angular/http";
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
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                itemInquiry_component_1.ItemInquiryComponent
            ],
            providers: [
                couchbase_service_1.CouchbaseService,
                item_service_1.ProductService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0Msb0RBQXFFO0FBQ3JFLGdFQUE4RTtBQUU5RSxzRUFBb0U7QUFDcEUsbUVBQWlFO0FBQ2pFLDJFQUEyRTtBQUUzRSx5RkFBdUY7QUFDdkYsa0VBQWdFO0FBQ2hFLHdEQUF5RDtBQUl6RCw2RUFBNkU7QUFDN0UscUVBQXFFO0FBOEJyRTtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUEzQnJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2QiwwQ0FBNEI7Z0JBQzVCLDhCQUFnQjthQUNuQjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCw4QkFBYTtnQkFDYiw0Q0FBb0I7YUFDdkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asb0NBQWdCO2dCQUNoQiw2QkFBYzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7TmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XHJcblxyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcclxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyBpZiB5b3UgbmVlZCB0byB1c2UgdHdvLXdheSBiaW5kaW5nXHJcblxyXG5pbXBvcnQgeyBJdGVtSW5xdWlyeUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaXRlbXNJbnF1aXJ5L2l0ZW1JbnF1aXJ5LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDb3VjaGJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcclxuXHJcblxyXG5cclxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyAgaWYgeW91IG5lZWQgdG8gdXNlIHRoZSBIVFRQIHdyYXBwZXJcclxuLy9pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgTG9naW5Db21wb25lbnQsXHJcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcclxuICAgICAgICBJdGVtSW5xdWlyeUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENvdWNoYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgUHJvZHVjdFNlcnZpY2UsXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuLypcclxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=