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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VuZERhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBRTFDLHNFQUFvRTtBQUNwRSxvRUFBa0U7QUFVbEU7SUFJSSwyQkFBb0IsaUJBQW1DLEVBQVUsZ0JBQWlDO1FBQTlFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRjNGLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztnQkFDWixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRTthQUN6RDtZQUNEO2dCQUNJLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUU7YUFDckQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQWlCLElBQUk7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxJQUFJO1lBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRU0sOENBQWtCLEdBQXpCLFVBQTBCLEtBQUs7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVNLGtDQUFNLEdBQWIsVUFBYyxXQUFXO1FBQ3JCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQy9DLENBQUM7SUFFTSxvQ0FBUSxHQUFmO1FBQUEsaUJBUUM7UUFQRyxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBTSxXQUFXOzs7OzZCQUN0RCxXQUFXLENBQUMsT0FBTyxFQUFuQix3QkFBbUI7d0JBQ1AscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQW5FLFFBQVEsR0FBRyxTQUF3RCxDQUFDOzs7d0JBRXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7O2FBQ3pDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF4Q1EsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQU15QyxvQ0FBZ0IsRUFBNEIsa0NBQWU7T0FKekYsaUJBQWlCLENBeUM3QjtJQUFELHdCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNhbGVPcmRlciB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3NhbGVPcmRlci5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNhbGVPcmRlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2FsZU9yZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlbmREYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zZW5kRGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEZWNpbWFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLXNlbmREYXRhXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlbmREYXRhLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NlbmREYXRhLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZW5kRGF0YUNvbXBvbmVudCB7XG4gICAgcHVibGljIG9wdGlvbnM6IGFueTtcbiAgICBwdWJsaWMgdXNlclRyYW5zYWN0aW9uOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FsZU9yZGVyU2VydmljZTogU2FsZU9yZGVyU2VydmljZSwgcHJpdmF0ZSBfc2VuZERhdGFTZXJ2aWNlOiBTZW5kRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW3tcbiAgICAgICAgICAgIG5hbWU6IFwiU2FsZXMgb3JkZXJcIixcbiAgICAgICAgICAgIGxpc3Q6IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclNhbGVPcmRlclVuc2F2ZWQoKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIlF1b3Rlc1wiLFxuICAgICAgICAgICAgbGlzdDogdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyUXVvdGVVbnNhdmVkKClcbiAgICAgICAgfV07XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrTGlzdChsaXN0KSB7XG4gICAgICAgIGlmIChsaXN0ID09IG51bGwgfHwgbGlzdCA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRUcmFuc2FjdGlvbkxpc3QoaW5kZXgpIHtcbiAgICAgICAgdGhpcy51c2VyVHJhbnNhY3Rpb24gPSBpbmRleDtcbiAgICAgICAgdGhpcy5vcHRpb25zWzBdLmxpc3QgPSB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCk7XG4gICAgICAgIHRoaXMub3B0aW9uc1sxXS5saXN0ID0gdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyUXVvdGVVbnNhdmVkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN3aXRjaCh0cmFuc2FjdGlvbikge1xuICAgICAgICB0cmFuc2FjdGlvbi5TZW5kaW5nID0gIXRyYW5zYWN0aW9uLlNlbmRpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbmREYXRhKCkge1xuICAgICAgICBsZXQgcmVzcG9uc2U7XG4gICAgICAgIHRoaXMub3B0aW9uc1t0aGlzLnVzZXJUcmFuc2FjdGlvbl0ubGlzdC5tYXAoYXN5bmMgdHJhbnNhY3Rpb24gPT4ge1xuICAgICAgICAgICAgaWYodHJhbnNhY3Rpb24uU2VuZGluZylcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuX3NlbmREYXRhU2VydmljZS5zZW5kVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19