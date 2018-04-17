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
        var _this = this;
        if (this.validateIntegerNumber(this.selectedCartProduct.quantity))
            this.params.closeCallback(this.selectedCartProduct);
        else {
            alert("Invalid quantity");
            this.Qty.nativeElement.focus();
            setTimeout(function () {
                _this.Qty.nativeElement.android.selectAll();
            }, 500);
            this.Qty.nativeElement.ios.textRangeFromPositionToPosition(this.Qty.nativeElement.ios.beginningOfDocument, this.Qty.nativeElement.ios.endOfDocument);
        }
    };
    ModalProductOrderComponent.prototype.validateIntegerNumber = function (number) {
        if (number != parseInt(number, 10) || number < 1)
            return false;
        return true;
    };
    __decorate([
        core_1.ViewChild('Qty'),
        __metadata("design:type", core_1.ElementRef)
    ], ModalProductOrderComponent.prototype, "Qty", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRTtBQUNqRSxtRUFBNEU7QUFRNUU7SUFLSSxvQ0FBMkIsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ25FLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ25ELENBQUM7SUFFTSwwQ0FBSyxHQUFaO1FBQUEsaUJBV0M7UUFWRyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQSxDQUFDO1lBQ0QsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0IsVUFBVSxDQUFDO2dCQUNQLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMvQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6SixDQUFDO0lBQ0wsQ0FBQztJQUVNLDBEQUFxQixHQUE1QixVQUE2QixNQUFNO1FBQy9CLEVBQUUsQ0FBQSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUF4QmlCO1FBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDO2tDQUFNLGlCQUFVOzJEQUFDO0lBSHpCLDBCQUEwQjtRQUp0QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7U0FDdEQsQ0FBQzt5Q0FNcUMsMkJBQWlCO09BTDNDLDBCQUEwQixDQTRCdEM7SUFBRCxpQ0FBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ1aS9kYXRlLXBpY2tlclwiO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbFByb2R1Y3RPcmRlckNvbXBvbmVudCB7XG4gICAgcHVibGljIHNlbGVjdGVkQ2FydFByb2R1Y3Q6YW55O1xuICAgIHB1YmxpYyB3YXJlaG91c2U6c3RyaW5nO1xuICAgIEBWaWV3Q2hpbGQoJ1F0eScpIFF0eTogRWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0ID0gdGhpcy5wYXJhbXMuY29udGV4dC5zZWxlY3RlZENhcnRQcm9kdWN0O1xuICAgICAgICB0aGlzLndhcmVob3VzZSA9IHRoaXMucGFyYW1zLmNvbnRleHQud2FyZWhvdXNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpIHtcbiAgICAgICAgaWYodGhpcy52YWxpZGF0ZUludGVnZXJOdW1iZXIodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0LnF1YW50aXR5KSlcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZENhcnRQcm9kdWN0KTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGFsZXJ0KFwiSW52YWxpZCBxdWFudGl0eVwiKTtcbiAgICAgICAgICAgIHRoaXMuUXR5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5hbmRyb2lkLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICAgICAgdGhpcy5RdHkubmF0aXZlRWxlbWVudC5pb3MudGV4dFJhbmdlRnJvbVBvc2l0aW9uVG9Qb3NpdGlvbih0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy5iZWdpbm5pbmdPZkRvY3VtZW50LCB0aGlzLlF0eS5uYXRpdmVFbGVtZW50Lmlvcy5lbmRPZkRvY3VtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZUludGVnZXJOdW1iZXIobnVtYmVyKXtcbiAgICAgICAgaWYobnVtYmVyICE9IHBhcnNlSW50KG51bWJlciwgMTApIHx8IG51bWJlciA8IDEpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gICBcbn0iXX0=