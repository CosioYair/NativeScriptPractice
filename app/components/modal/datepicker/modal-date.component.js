"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var ModalDateComponent = /** @class */ (function () {
    function ModalDateComponent(params) {
        this.params = params;
        this._date = new Date();
    }
    ModalDateComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        datePicker.date = new Date();
        datePicker.minDate = new Date();
    };
    ModalDateComponent.prototype.onDateChanged = function (args) {
        this._date = args.value;
    };
    ModalDateComponent.prototype.close = function () {
        this._date = this._date.getDate() + "/" + this._date.getMonth() + "/" + this._date.getFullYear();
        this.params.closeCallback(this._date);
    };
    ModalDateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "./modal-date.component.html",
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], ModalDateComponent);
    return ModalDateComponent;
}());
exports.ModalDateComponent = ModalDateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC1kYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFRNUU7SUFHSSw0QkFBMkIsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSwyQ0FBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksVUFBVSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekMsVUFBVSxDQUFDLElBQUksR0FBSSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzlCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sMENBQWEsR0FBcEIsVUFBcUIsSUFBSTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVNLGtDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBSSxDQUFDO1FBQzVGLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBcEJRLGtCQUFrQjtRQUo5QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0MsQ0FBQzt5Q0FJcUMsMkJBQWlCO09BSDNDLGtCQUFrQixDQXFCOUI7SUFBRCx5QkFBQztDQUFBLEFBckJELElBcUJDO0FBckJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IERhdGVQaWNrZXIgfSBmcm9tIFwidWkvZGF0ZS1waWNrZXJcIjtcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21vZGFsLWRhdGUuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxEYXRlQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgX2RhdGU6YW55O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcykge1xuICAgICAgICB0aGlzLl9kYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25QaWNrZXJMb2FkZWQoYXJncykge1xuICAgICAgICBsZXQgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBkYXRlUGlja2VyLmRhdGUgPSAgbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZVBpY2tlci5taW5EYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlQ2hhbmdlZChhcmdzKSB7XG4gICAgICAgIHRoaXMuX2RhdGUgPSBhcmdzLnZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5fZGF0ZSA9IGAke3RoaXMuX2RhdGUuZ2V0RGF0ZSgpfS8ke3RoaXMuX2RhdGUuZ2V0TW9udGgoKX0vJHt0aGlzLl9kYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0aGlzLl9kYXRlKTtcbiAgICB9XG59Il19