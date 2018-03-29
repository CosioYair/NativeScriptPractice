import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ItemInquiryComponent } from "./components/itemsInquiry/itemInquiry.component";
import { ReviewTransactionComponent } from "./components/reviewTransaction/reviewTransaction.component";
const routes: Routes = [
    { path: "", redirectTo: "/reviewTransaction", pathMatch: "full" },
    { path: "app", component: AppComponent },
    { path: "login", component: LoginComponent },
    { path: "home", component:HomeComponent},
    { path: "itemInquiry", component:ItemInquiryComponent},
    { path: "reviewTransaction", component:ReviewTransactionComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }