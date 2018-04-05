"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ModalProductOrderComponent = /** @class */ (function () {
    function ModalProductOrderComponent(params) {
        this.params = params;
        this.selectedCartProduct = this.params.context.selectedCartProduct;
        this.warehouse = this.params.context.warehouse;
    }
    ModalProductOrderComponent.prototype.close = function () {
        if (this.validateIntegerNumber(this.selectedCartProduct.quantity))
            this.params.closeCallback(this.selectedCartProduct);
        else {
            alert("Invalid format to quantity");
            this.Qty.nativeElement.focus();
        }
    };
    ModalProductOrderComponent.prototype.validateIntegerNumber = function (number) {
        if (number != parseInt(number, 10) || number < 1)
            return false;
        return true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRDtBQUN0RCxtRUFBNEU7QUFRNUU7SUFLSSxvQ0FBMkIsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ25FLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ25ELENBQUM7SUFFTSwwQ0FBSyxHQUFaO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUEsQ0FBQztZQUNELEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRU0sMERBQXFCLEdBQTVCLFVBQTZCLE1BQU07UUFDL0IsRUFBRSxDQUFBLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXZCUSwwQkFBMEI7UUFKdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0NBQXNDO1NBQ3RELENBQUM7eUNBTXFDLDJCQUFpQjtPQUwzQywwQkFBMEIsQ0F3QnRDO0lBQUQsaUNBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ1aS9kYXRlLXBpY2tlclwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21vZGFsLXByb2R1Y3Qtb3JkZXIuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1vZGFsUHJvZHVjdE9yZGVyQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBzZWxlY3RlZENhcnRQcm9kdWN0OmFueTtcclxuICAgIHB1YmxpYyB3YXJlaG91c2U6c3RyaW5nO1xyXG4gICAgcHVibGljIFF0eTpFbGVtZW50UmVmO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QgPSB0aGlzLnBhcmFtcy5jb250ZXh0LnNlbGVjdGVkQ2FydFByb2R1Y3Q7XHJcbiAgICAgICAgdGhpcy53YXJlaG91c2UgPSB0aGlzLnBhcmFtcy5jb250ZXh0LndhcmVob3VzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgaWYodGhpcy52YWxpZGF0ZUludGVnZXJOdW1iZXIodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5KSlcclxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkQ2FydFByb2R1Y3QpO1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiSW52YWxpZCBmb3JtYXQgdG8gcXVhbnRpdHlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlSW50ZWdlck51bWJlcihudW1iZXIpe1xyXG4gICAgICAgIGlmKG51bWJlciAhPSBwYXJzZUludChudW1iZXIsIDEwKSB8fCBudW1iZXIgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9ICAgXHJcbn0iXX0=