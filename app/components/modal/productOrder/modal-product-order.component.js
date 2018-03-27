"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ModalProductOrderComponent = /** @class */ (function () {
    function ModalProductOrderComponent(params) {
        this.params = params;
        this._date = new Date();
        this.selectedCartProduct = this.params.context.selectedCartProduct;
    }
    ModalProductOrderComponent.prototype.save = function () {
        this.params.closeCallback(this.selectedCartProduct);
    };
    ModalProductOrderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "./modal-product-order.component.html",
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], ModalProductOrderComponent);
    return ModalProductOrderComponent;
}());
exports.ModalProductOrderComponent = ModalProductOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFRNUU7SUFJSSxvQ0FBMkIsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztJQUN2RSxDQUFDO0lBRU0seUNBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFYUSwwQkFBMEI7UUFKdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0NBQXNDO1NBQ3RELENBQUM7eUNBS3FDLDJCQUFpQjtPQUozQywwQkFBMEIsQ0FZdEM7SUFBRCxpQ0FBQztDQUFBLEFBWkQsSUFZQztBQVpZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IERhdGVQaWNrZXIgfSBmcm9tIFwidWkvZGF0ZS1waWNrZXJcIjtcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21vZGFsLXByb2R1Y3Qtb3JkZXIuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQge1xuICAgIHB1YmxpYyBfZGF0ZTphbnk7XG4gICAgcHVibGljIHNlbGVjdGVkQ2FydFByb2R1Y3Q6YW55O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcykge1xuICAgICAgICB0aGlzLl9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0ID0gdGhpcy5wYXJhbXMuY29udGV4dC5zZWxlY3RlZENhcnRQcm9kdWN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlKCkge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCk7XG4gICAgfVxufSJdfQ==