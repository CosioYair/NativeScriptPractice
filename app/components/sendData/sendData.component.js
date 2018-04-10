"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var saleOrder_service_1 = require("../../services/saleOrder.service");
var SendDataComponent = /** @class */ (function () {
    function SendDataComponent(_saleOrderService) {
        this._saleOrderService = _saleOrderService;
        this.userTransaction = 0;
        this.options = [{
                name: "Sales order",
                list: this._saleOrderService.getUserSaleOrderUnsaved()
            },
            {
                name: "Quotes",
                list: this._saleOrderService.getUserQuoteUnsaved()
            }];
        this.resetList();
    }
    SendDataComponent.prototype.resetList = function () {
        if (this.userTransaction == 0)
            this.transactionList = this.checkList(this.options[0]["list"]);
        else
            this.transactionList = this.checkList(this.options[1]["list"]);
    };
    SendDataComponent.prototype.checkList = function (list) {
        if (list == null || list == undefined)
            return [];
        else
            return list;
    };
    SendDataComponent.prototype.setTransactionList = function (index) {
        this.userTransaction = index;
        this.resetList();
    };
    SendDataComponent = __decorate([
        core_1.Component({
            selector: "ns-sendData",
            moduleId: module.id,
            templateUrl: "./sendData.component.html",
            styleUrls: ["./sendData.component.css"]
        }),
        __metadata("design:paramtypes", [saleOrder_service_1.SaleOrderService])
    ], SendDataComponent);
    return SendDataComponent;
}());
exports.SendDataComponent = SendDataComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VuZERhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBRTFDLHNFQUFvRTtBQVNwRTtJQUtJLDJCQUFvQixpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUZoRCxvQkFBZSxHQUFXLENBQUMsQ0FBQztRQUcvQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUM7Z0JBQ1osSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLEVBQUU7YUFDekQ7WUFDRDtnQkFDSSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFO2FBQ3JELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0scUNBQVMsR0FBaEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUk7WUFDQSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSxxQ0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQztZQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsSUFBSTtZQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVNLDhDQUFrQixHQUF6QixVQUEwQixLQUFLO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBbENRLGlCQUFpQjtRQVA3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDMUMsQ0FBQzt5Q0FPeUMsb0NBQWdCO09BTDlDLGlCQUFpQixDQW1DN0I7SUFBRCx3QkFBQztDQUFBLEFBbkNELElBbUNDO0FBbkNZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NhbGVPcmRlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zYWxlT3JkZXIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1zZW5kRGF0YVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2VuZERhdGEuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zZW5kRGF0YS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2VuZERhdGFDb21wb25lbnQge1xyXG4gICAgcHVibGljIG9wdGlvbnM6IGFueTtcclxuICAgIHB1YmxpYyB0cmFuc2FjdGlvbkxpc3Q6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyVHJhbnNhY3Rpb246IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFt7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU2FsZXMgb3JkZXJcIixcclxuICAgICAgICAgICAgbGlzdDogdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyU2FsZU9yZGVyVW5zYXZlZCgpXHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlF1b3Rlc1wiLFxyXG4gICAgICAgICAgICBsaXN0OiB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJRdW90ZVVuc2F2ZWQoKVxyXG4gICAgICAgIH1dO1xyXG4gICAgICAgIHRoaXMucmVzZXRMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0TGlzdCgpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VyVHJhbnNhY3Rpb24gPT0gMClcclxuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkxpc3QgPSB0aGlzLmNoZWNrTGlzdCh0aGlzLm9wdGlvbnNbMF1bXCJsaXN0XCJdKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25MaXN0ID0gdGhpcy5jaGVja0xpc3QodGhpcy5vcHRpb25zWzFdW1wibGlzdFwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrTGlzdChsaXN0KSB7XHJcbiAgICAgICAgaWYgKGxpc3QgPT0gbnVsbCB8fCBsaXN0ID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRyYW5zYWN0aW9uTGlzdChpbmRleCl7XHJcbiAgICAgICAgdGhpcy51c2VyVHJhbnNhY3Rpb24gPSBpbmRleDtcclxuICAgICAgICB0aGlzLnJlc2V0TGlzdCgpO1xyXG4gICAgfVxyXG59Il19