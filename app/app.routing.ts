import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ItemInquiryComponent } from "./components/itemsInquiry/itemInquiry.component";
import { SyncComponent } from "./components/sync/sync.component";
import { SendDataComponent } from "./components/sendData/sendData.component";
import { ReviewTransactionComponent } from "./components/reviewTransaction/reviewTransaction.component";
import { CustomerTransactionComponent } from "./components/customer/customer-transaction.component";
import { SaleOrderComponent } from "./components/transaction/sale-order.component";
import { CustomerInquiryComponent } from "./components/customer/customer-inquiry.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "app", component: AppComponent },
    { path: "login", component: LoginComponent },
    { path: "home", component:HomeComponent},
    { path: "itemInquiry", component:ItemInquiryComponent},
    { path: "sync", component:SyncComponent},
    { path: "sendData", component:SendDataComponent},
    { path: "reviewTransaction", component:ReviewTransactionComponent},
    { path: "customerTransaction", component: CustomerTransactionComponent},
    { path: "saleOrder/:CustomerNo", component: SaleOrderComponent},
    { path: "customerInquiry", component: CustomerInquiryComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }