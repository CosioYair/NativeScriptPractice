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
    }
    SendDataComponent.prototype.checkList = function (list) {
        if (list == null || list == undefined)
            return [];
        else
            return list;
    };
    SendDataComponent.prototype.setTransactionList = function (index) {
        this.userTransaction = index;
        this.options[0].list = this._saleOrderService.getUserSaleOrderUnsaved();
        this.options[1].list = this._saleOrderService.getUserQuoteUnsaved();
    };
    SendDataComponent.prototype.switch = function (transaction) {
        transaction.Sending = !transaction.Sending;
    };
    SendDataComponent.prototype.sendData = function () {
        this.options[this.userTransaction].list.map(function (transaction) {
            console.log(transaction.Sending);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VuZERhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBRTFDLHNFQUFvRTtBQVNwRTtJQUlJLDJCQUFvQixpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUZoRCxvQkFBZSxHQUFXLENBQUMsQ0FBQztRQUcvQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUM7Z0JBQ1osSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLEVBQUU7YUFDekQ7WUFDRDtnQkFDSSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFO2FBQ3JELENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxxQ0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQztZQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsSUFBSTtZQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVNLDhDQUFrQixHQUF6QixVQUEwQixLQUFLO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFTSxrQ0FBTSxHQUFiLFVBQWMsV0FBVztRQUNyQixXQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUMvQyxDQUFDO0lBRU0sb0NBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxXQUFXO1lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXBDUSxpQkFBaUI7UUFQN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7eUNBTXlDLG9DQUFnQjtPQUo5QyxpQkFBaUIsQ0FxQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJDRCxJQXFDQztBQXJDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9zYWxlT3JkZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtc2VuZERhdGFcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlbmREYXRhLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vc2VuZERhdGEuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbmREYXRhQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBvcHRpb25zOiBhbnk7XHJcbiAgICBwdWJsaWMgdXNlclRyYW5zYWN0aW9uOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBbe1xyXG4gICAgICAgICAgICBuYW1lOiBcIlNhbGVzIG9yZGVyXCIsXHJcbiAgICAgICAgICAgIGxpc3Q6IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclNhbGVPcmRlclVuc2F2ZWQoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlF1b3Rlc1wiLFxyXG4gICAgICAgICAgICBsaXN0OiB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJRdW90ZVVuc2F2ZWQoKVxyXG4gICAgICAgIH1dO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0xpc3QobGlzdCkge1xyXG4gICAgICAgIGlmIChsaXN0ID09IG51bGwgfHwgbGlzdCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUcmFuc2FjdGlvbkxpc3QoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnVzZXJUcmFuc2FjdGlvbiA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1swXS5saXN0ID0gdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyU2FsZU9yZGVyVW5zYXZlZCgpO1xyXG4gICAgICAgIHRoaXMub3B0aW9uc1sxXS5saXN0ID0gdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyUXVvdGVVbnNhdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN3aXRjaCh0cmFuc2FjdGlvbikge1xyXG4gICAgICAgIHRyYW5zYWN0aW9uLlNlbmRpbmcgPSAhdHJhbnNhY3Rpb24uU2VuZGluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zW3RoaXMudXNlclRyYW5zYWN0aW9uXS5saXN0Lm1hcCh0cmFuc2FjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyYW5zYWN0aW9uLlNlbmRpbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19