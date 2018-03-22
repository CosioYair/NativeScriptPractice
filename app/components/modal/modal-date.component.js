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
        this._date = this._date.getDate() + 1 + "/" + (this._date.getMonth() + 1) + "/" + this._date.getFullYear();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RhbC1kYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxtRUFBNEU7QUFRNUU7SUFHSSw0QkFBMkIsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSwyQ0FBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksVUFBVSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekMsVUFBVSxDQUFDLElBQUksR0FBSSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzlCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sMENBQWEsR0FBcEIsVUFBcUIsSUFBSTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVNLGtDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFJLENBQUM7UUFDcEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFwQlEsa0JBQWtCO1FBSjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtTQUM3QyxDQUFDO3lDQUlxQywyQkFBaUI7T0FIM0Msa0JBQWtCLENBcUI5QjtJQUFELHlCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IERhdGVQaWNrZXIgfSBmcm9tIFwidWkvZGF0ZS1waWNrZXJcIjtcclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tb2RhbC1kYXRlLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2RhbERhdGVDb21wb25lbnQge1xyXG4gICAgcHVibGljIF9kYXRlOmFueTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUGlja2VyTG9hZGVkKGFyZ3MpIHtcclxuICAgICAgICBsZXQgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGRhdGVQaWNrZXIuZGF0ZSA9ICBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGF0ZUNoYW5nZWQoYXJncykge1xyXG4gICAgICAgIHRoaXMuX2RhdGUgPSBhcmdzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9kYXRlID0gYCR7dGhpcy5fZGF0ZS5nZXREYXRlKCkgKyAxfS8ke3RoaXMuX2RhdGUuZ2V0TW9udGgoKSArIDF9LyR7dGhpcy5fZGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0aGlzLl9kYXRlKTtcclxuICAgIH1cclxufSJdfQ==