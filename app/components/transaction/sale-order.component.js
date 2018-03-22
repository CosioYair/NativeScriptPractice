"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var couchbase_service_1 = require("../../services/couchbase.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var modal_date_component_1 = require("../modal/modal-date.component");
var constants_config_1 = require("../../config/constants.config");
var SaleOrderComponent = /** @class */ (function () {
    function SaleOrderComponent(_couchbaseService, modalService, vcRef) {
        var _this = this;
        this._couchbaseService = _couchbaseService;
        this.modalService = modalService;
        this.vcRef = vcRef;
        this._docId = "customer";
        this.wharehouse = 0;
        this.dates = [];
        this.wharehouses = [];
        this.dates.shipDate = new Date();
        this.dates.date = new Date();
        this.dates.shipDate = this.dates.shipDate.getDate() + 1 + "/" + (this.dates.shipDate.getMonth() + 1) + "/" + this.dates.shipDate.getFullYear();
        this.dates.date = this.dates.date.getDate() + 1 + "/" + (this.dates.date.getMonth() + 1) + "/" + this.dates.date.getFullYear();
        constants_config_1.CONSTANTS.wharehouses.map(function (wharehouse) {
            _this.wharehouses.push(wharehouse.name);
        });
    }
    SaleOrderComponent.prototype.ngOnInit = function () {
    };
    SaleOrderComponent.prototype.showModal = function (input) {
        var _this = this;
        this.createModelView().then(function (result) {
            _this.dates[input] = result;
        }).catch(function (error) { return alert(error); });
    };
    SaleOrderComponent.prototype.createModelView = function () {
        var today = new Date();
        var options = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };
        return this.modalService.showModal(modal_date_component_1.ModalDateComponent, options);
    };
    SaleOrderComponent = __decorate([
        core_1.Component({
            selector: "ns-sale-order",
            moduleId: module.id,
            templateUrl: "./sale-order.component.html",
            styleUrls: ["./sale-order.css"]
        }),
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
    ], SaleOrderComponent);
    return SaleOrderComponent;
}());
exports.SaleOrderComponent = SaleOrderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZS1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlLW9yZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxzRUFBb0U7QUFDcEUsa0VBQTJGO0FBQzNGLHNFQUFtRTtBQUVuRSxrRUFBMEQ7QUFTMUQ7SUFNSSw0QkFBb0IsaUJBQW1DLEVBQVUsWUFBK0IsRUFBVSxLQUFzQjtRQUFoSSxpQkFVQztRQVZtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFMeEgsV0FBTSxHQUFVLFVBQVUsQ0FBQztRQUc1QixlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBR3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBSSxDQUFDO1FBQ3hJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFJLENBQUM7UUFDeEgsNEJBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsVUFBVTtZQUNoQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQVEsR0FBUjtJQUNBLENBQUM7SUFFTSxzQ0FBUyxHQUFoQixVQUFpQixLQUFZO1FBQTdCLGlCQUlDO1FBSEcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDL0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTyw0Q0FBZSxHQUF2QjtRQUNJLElBQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBTSxPQUFPLEdBQXVCO1lBQ2hDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1lBQzVCLE9BQU8sRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQzdCLFVBQVUsRUFBRSxLQUFLO1NBQ3BCLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMseUNBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQW5DUSxrQkFBa0I7UUFQOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBUXlDLG9DQUFnQixFQUF1QixpQ0FBa0IsRUFBZ0IsdUJBQWdCO09BTnZILGtCQUFrQixDQW9DN0I7SUFBRCx5QkFBQztDQUFBLEFBcENGLElBb0NFO0FBcENXLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XHJcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291Y2hiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dPcHRpb25zLCBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZUNvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbC9tb2RhbC1kYXRlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25zdGFudHMuY29uZmlnXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXNhbGUtb3JkZXJcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NhbGUtb3JkZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zYWxlLW9yZGVyLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNhbGVPcmRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuICAgIHByaXZhdGUgX2RvY0lkOnN0cmluZyA9IFwiY3VzdG9tZXJcIjtcclxuICAgIHB1YmxpYyBkYXRlczphbnk7XHJcbiAgICBwdWJsaWMgd2hhcmVob3VzZXM6YW55O1xyXG4gICAgcHVibGljIHdoYXJlaG91c2U6bnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlLCBwcml2YXRlIG1vZGFsU2VydmljZTpNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmNSZWY6Vmlld0NvbnRhaW5lclJlZil7XHJcbiAgICAgICAgdGhpcy5kYXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMud2hhcmVob3VzZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmRhdGVzLnNoaXBEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmRhdGVzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZGF0ZXMuc2hpcERhdGUgPSBgJHt0aGlzLmRhdGVzLnNoaXBEYXRlLmdldERhdGUoKSArIDF9LyR7dGhpcy5kYXRlcy5zaGlwRGF0ZS5nZXRNb250aCgpICsgMX0vJHt0aGlzLmRhdGVzLnNoaXBEYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICB0aGlzLmRhdGVzLmRhdGUgPSBgJHt0aGlzLmRhdGVzLmRhdGUuZ2V0RGF0ZSgpICsgMX0vJHt0aGlzLmRhdGVzLmRhdGUuZ2V0TW9udGgoKSArIDF9LyR7dGhpcy5kYXRlcy5kYXRlLmdldEZ1bGxZZWFyKCl9YDtcclxuICAgICAgICBDT05TVEFOVFMud2hhcmVob3VzZXMubWFwKHdoYXJlaG91c2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndoYXJlaG91c2VzLnB1c2god2hhcmVob3VzZS5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd01vZGFsKGlucHV0OnN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9kZWxWaWV3KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgIHRoaXMuZGF0ZXNbaW5wdXRdID0gcmVzdWx0O1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGFsZXJ0KGVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgY3JlYXRlTW9kZWxWaWV3KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgICAgICAgICAgY29udGV4dDogdG9kYXkudG9EYXRlU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNb2RhbERhdGVDb21wb25lbnQsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gfSJdfQ==