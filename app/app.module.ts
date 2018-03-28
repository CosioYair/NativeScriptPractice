import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DropDownModule } from "nativescript-drop-down/angular";
import { BarcodeScanner } from 'nativescript-barcodescanner';

//Components
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { CustomerTransactionComponent } from "./components/customer/customer-transaction.component";
import { SaleOrderComponent } from "./components/transaction/sale-order.component";
import { ModalDateComponent } from "./components/modal/datepicker/modal-date.component";
import { ItemInquiryComponent } from "./components/itemsInquiry/itemInquiry.component";

//Services
import { CouchbaseService } from "./services/couchbase.service";
import { CustomerService } from "./services/customer.service";
import { ProductService } from "./services/item.service";
import { ModalProductOrderComponent } from "./components/modal/productOrder/modal-product-order.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        DropDownModule
    ],
    entryComponents: [
        ModalDateComponent,
        ModalProductOrderComponent
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        CustomerTransactionComponent,
        SaleOrderComponent,
        ModalDateComponent,
        ItemInquiryComponent,
        ModalProductOrderComponent
    ],
    providers: [
        CouchbaseService,
        CustomerService,
        ModalDialogService,
        ProductService,
        BarcodeScanner
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
