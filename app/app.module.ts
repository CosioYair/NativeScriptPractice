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
import { SendDataComponent } from "./components/sendData/sendData.component";
import { CustomerTransactionComponent } from "./components/customer/customer-transaction.component";
import { SaleOrderComponent } from "./components/transaction/sale-order.component";
import { ModalDateComponent } from "./components/modal/datepicker/modal-date.component";
import { ModalProductOrderComponent } from "./components/modal/productOrder/modal-product-order.component";
import { CustomerInquiryComponent } from "./components/customer/customer-inquiry.component";
import { ItemInquiryComponent } from "./components/itemsInquiry/itemInquiry.component";
import { ReviewTransactionComponent } from "./components/reviewTransaction/reviewTransaction.component";
import { SyncComponent } from "./components/sync/sync.component";
//Services
import { CouchbaseService } from "./services/couchbase.service";
import { CustomerService } from "./services/customer.service";
import { ProductService } from "./services/item.service";
import { InventoryService } from "./services/inventory.service";
import { TermsCodeService } from "./services/terms.service";
import { UserService } from "./services/user.service";
import { DeviceService } from "./services/device.service";
import { ShippingAddressService } from "./services/shippingAddress.service";
import { SaleOrderService } from "./services/saleOrder.service";
import { FoliosTransactionService } from "./services/foliosTransaction.service";
import { ImageService } from "./services/image.service";
import { SendDataService } from "./services/sendData.service";

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
        ItemInquiryComponent,
        SendDataComponent,
        ReviewTransactionComponent,
        CustomerTransactionComponent,
        SaleOrderComponent,
        ModalDateComponent,
        ModalProductOrderComponent,
        CustomerInquiryComponent,
        SyncComponent
    ],
    providers: [
        CouchbaseService,
        CustomerService,
        ModalDialogService,
        ProductService,
        BarcodeScanner,
        InventoryService,
        TermsCodeService,
        ShippingAddressService,
        UserService,
        DeviceService,
        SaleOrderService,
        FoliosTransactionService,
        ImageService,
        SendDataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
