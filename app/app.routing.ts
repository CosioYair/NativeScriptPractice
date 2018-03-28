import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ItemInquiryComponent } from "./components/itemsInquiry/itemInquiry.component";
import { CustomerTransactionComponent } from "./components/customer/customer-transaction.component";
import { SaleOrderComponent } from "./components/transaction/sale-order.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "app", component: AppComponent },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent},
    { path: "itemInquiry", component:ItemInquiryComponent},
    { path: "customer", component: CustomerTransactionComponent},
    { path: "saleOrder", component: SaleOrderComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }