import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";

import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
// Uncomment and add to NgModule imports if you need to use two-way binding

import { ItemInquiryComponent } from "./components/itemsInquiry/itemInquiry.component";
import { CouchbaseService } from "./services/couchbase.service";
import { ProductService } from "./services/item.service";
import { ReviewTransactionComponent } from "./components/reviewTransaction/reviewTransaction.component";



// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
//import { NativeScriptHttpModule } from "nativescript-angular/http";


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
        ItemInquiryComponent,
        ReviewTransactionComponent
    ],
    providers: [
        CouchbaseService,
        ProductService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
