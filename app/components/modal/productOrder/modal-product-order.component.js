"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ModalProductOrderComponent = /** @class */ (function () {
    function ModalProductOrderComponent(params) {
        this.params = params;
        this.selectedCartProduct = this.params.context.selectedCartProduct;
    }
    ModalProductOrderComponent.prototype.close = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFRNUU7SUFHSSxvQ0FBMkIsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0lBQ3ZFLENBQUM7SUFFTSwwQ0FBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQVRRLDBCQUEwQjtRQUp0QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7U0FDdEQsQ0FBQzt5Q0FJcUMsMkJBQWlCO09BSDNDLDBCQUEwQixDQVV0QztJQUFELGlDQUFDO0NBQUEsQUFWRCxJQVVDO0FBVlksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ1aS9kYXRlLXBpY2tlclwiO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCB7XG4gICAgcHVibGljIHNlbGVjdGVkQ2FydFByb2R1Y3Q6YW55O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcykge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSB0aGlzLnBhcmFtcy5jb250ZXh0LnNlbGVjdGVkQ2FydFByb2R1Y3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCkge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWRDYXJ0UHJvZHVjdCk7XG4gICAgfVxufSJdfQ==