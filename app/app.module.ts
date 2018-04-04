import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

//Components
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { CustomerComponent } from "./components/customer/customer.component";
import { SyncComponent } from "./components/Sync/sync.component";
import { SendDataComponent } from "./components/sendData/sendData.component";
import { ItemInquiryComponent } from "./components/itemsInquiry/itemInquiry.component";

//Services
import { CouchbaseService } from "./services/couchbase.service";
import { CustomerService } from "./services/customer.service";
import { ProductService } from "./services/item.service";
import { ReviewTransactionComponent } from "./components/reviewTransaction/reviewTransaction.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        CustomerComponent,
        ItemInquiryComponent,
        SyncComponent,
        SendDataComponent,
        ReviewTransactionComponent
    ],
    providers: [
        CouchbaseService,
        CustomerService,
        ProductService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
