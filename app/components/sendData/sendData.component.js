"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var saleOrder_service_1 = require("../../services/saleOrder.service");
var sendData_service_1 = require("../../services/sendData.service");
var SendDataComponent = /** @class */ (function () {
    function SendDataComponent(_saleOrderService, _sendDataService) {
        this._saleOrderService = _saleOrderService;
        this._sendDataService = _sendDataService;
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
        var _this = this;
        var response;
        this.options[this.userTransaction].list.map(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!transaction.Sending) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._sendDataService.sendTransaction(transaction)];
                    case 1:
                        response = _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log(JSON.stringify(response));
                        return [2 /*return*/];
                }
            });
        }); });
    };
    SendDataComponent = __decorate([
        core_1.Component({
            selector: "ns-sendData",
            moduleId: module.id,
            templateUrl: "./sendData.component.html",
            styleUrls: ["./sendData.component.css"]
        }),
        __metadata("design:paramtypes", [saleOrder_service_1.SaleOrderService, sendData_service_1.SendDataService])
    ], SendDataComponent);
    return SendDataComponent;
}());
exports.SendDataComponent = SendDataComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VuZERhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBRTFDLHNFQUFvRTtBQUNwRSxvRUFBa0U7QUFVbEU7SUFJSSwyQkFBb0IsaUJBQW1DLEVBQVUsZ0JBQWlDO1FBQTlFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRjNGLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztnQkFDWixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRTthQUN6RDtZQUNEO2dCQUNJLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUU7YUFDckQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQWlCLElBQUk7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxJQUFJO1lBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRU0sOENBQWtCLEdBQXpCLFVBQTBCLEtBQUs7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVNLGtDQUFNLEdBQWIsVUFBYyxXQUFXO1FBQ3JCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQy9DLENBQUM7SUFFTSxvQ0FBUSxHQUFmO1FBQUEsaUJBUUM7UUFQRyxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBTSxXQUFXOzs7OzZCQUN0RCxXQUFXLENBQUMsT0FBTyxFQUFuQix3QkFBbUI7d0JBQ1AscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQW5FLFFBQVEsR0FBRyxTQUF3RCxDQUFDOzs7d0JBRXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7O2FBQ3pDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF4Q1EsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQU15QyxvQ0FBZ0IsRUFBNEIsa0NBQWU7T0FKekYsaUJBQWlCLENBeUM3QjtJQUFELHdCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2FsZU9yZGVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlbmREYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zZW5kRGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERlY2ltYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtc2VuZERhdGFcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlbmREYXRhLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vc2VuZERhdGEuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlbmREYXRhQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBvcHRpb25zOiBhbnk7XHJcbiAgICBwdWJsaWMgdXNlclRyYW5zYWN0aW9uOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NhbGVPcmRlclNlcnZpY2U6IFNhbGVPcmRlclNlcnZpY2UsIHByaXZhdGUgX3NlbmREYXRhU2VydmljZTogU2VuZERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW3tcclxuICAgICAgICAgICAgbmFtZTogXCJTYWxlcyBvcmRlclwiLFxyXG4gICAgICAgICAgICBsaXN0OiB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJRdW90ZXNcIixcclxuICAgICAgICAgICAgbGlzdDogdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyUXVvdGVVbnNhdmVkKClcclxuICAgICAgICB9XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tMaXN0KGxpc3QpIHtcclxuICAgICAgICBpZiAobGlzdCA9PSBudWxsIHx8IGxpc3QgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VHJhbnNhY3Rpb25MaXN0KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy51c2VyVHJhbnNhY3Rpb24gPSBpbmRleDtcclxuICAgICAgICB0aGlzLm9wdGlvbnNbMF0ubGlzdCA9IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclNhbGVPcmRlclVuc2F2ZWQoKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnNbMV0ubGlzdCA9IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclF1b3RlVW5zYXZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzd2l0Y2godHJhbnNhY3Rpb24pIHtcclxuICAgICAgICB0cmFuc2FjdGlvbi5TZW5kaW5nID0gIXRyYW5zYWN0aW9uLlNlbmRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmREYXRhKCkge1xyXG4gICAgICAgIGxldCByZXNwb25zZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnNbdGhpcy51c2VyVHJhbnNhY3Rpb25dLmxpc3QubWFwKGFzeW5jIHRyYW5zYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYodHJhbnNhY3Rpb24uU2VuZGluZylcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fc2VuZERhdGFTZXJ2aWNlLnNlbmRUcmFuc2FjdGlvbih0cmFuc2FjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19