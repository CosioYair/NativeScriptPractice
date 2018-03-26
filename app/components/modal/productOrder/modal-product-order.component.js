"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ModalProductOrderComponent = /** @class */ (function () {
    function ModalProductOrderComponent(params) {
        this.params = params;
        this._date = new Date();
    }
    ModalProductOrderComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        datePicker.date = new Date();
        datePicker.minDate = new Date();
    };
    ModalProductOrderComponent.prototype.onDateChanged = function (args) {
        this._date = args.value;
    };
    ModalProductOrderComponent.prototype.close = function () {
        this._date = this._date.getDate() + "/" + this._date.getMonth() + "/" + this._date.getFullYear();
        this.params.closeCallback(this._date);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC1wcm9kdWN0LW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFRNUU7SUFHSSxvQ0FBMkIsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSxtREFBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksVUFBVSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekMsVUFBVSxDQUFDLElBQUksR0FBSSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzlCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sa0RBQWEsR0FBcEIsVUFBcUIsSUFBSTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVNLDBDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBSSxDQUFDO1FBQzVGLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBcEJRLDBCQUEwQjtRQUp0QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7U0FDdEQsQ0FBQzt5Q0FJcUMsMkJBQWlCO09BSDNDLDBCQUEwQixDQXFCdEM7SUFBRCxpQ0FBQztDQUFBLEFBckJELElBcUJDO0FBckJZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInVpL2RhdGUtcGlja2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbW9kYWwtcHJvZHVjdC1vcmRlci5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kYWxQcm9kdWN0T3JkZXJDb21wb25lbnQge1xyXG4gICAgcHVibGljIF9kYXRlOmFueTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUGlja2VyTG9hZGVkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGRhdGVQaWNrZXIuZGF0ZSA9ICBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGF0ZUNoYW5nZWQoYXJncykge1xyXG4gICAgICAgIHRoaXMuX2RhdGUgPSBhcmdzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9kYXRlID0gYCR7dGhpcy5fZGF0ZS5nZXREYXRlKCl9LyR7dGhpcy5fZGF0ZS5nZXRNb250aCgpfS8ke3RoaXMuX2RhdGUuZ2V0RnVsbFllYXIoKX1gO1xyXG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodGhpcy5fZGF0ZSk7XHJcbiAgICB9XHJcbn0iXX0=