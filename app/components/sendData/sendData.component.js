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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VuZERhdGEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBRTFDLHNFQUFvRTtBQUNwRSxvRUFBa0U7QUFTbEU7SUFJSSwyQkFBb0IsaUJBQW1DLEVBQVUsZ0JBQWlDO1FBQTlFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRjNGLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztnQkFDWixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRTthQUN6RDtZQUNEO2dCQUNJLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUU7YUFDckQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQWlCLElBQUk7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxJQUFJO1lBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRU0sOENBQWtCLEdBQXpCLFVBQTBCLEtBQUs7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVNLGtDQUFNLEdBQWIsVUFBYyxXQUFXO1FBQ3JCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQy9DLENBQUM7SUFFTSxvQ0FBUSxHQUFmO1FBQUEsaUJBUUM7UUFQRyxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBTSxXQUFXOzs7OzZCQUN0RCxXQUFXLENBQUMsT0FBTyxFQUFuQix3QkFBbUI7d0JBQ1AscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQW5FLFFBQVEsR0FBRyxTQUF3RCxDQUFDOzs7d0JBRXhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7O2FBQ3pDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF4Q1EsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQU15QyxvQ0FBZ0IsRUFBNEIsa0NBQWU7T0FKekYsaUJBQWlCLENBeUM3QjtJQUFELHdCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU2FsZU9yZGVyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvc2FsZU9yZGVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTYWxlT3JkZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NhbGVPcmRlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlbmREYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zZW5kRGF0YS5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLXNlbmREYXRhXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZW5kRGF0YS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NlbmREYXRhLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZW5kRGF0YUNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgb3B0aW9uczogYW55O1xyXG4gICAgcHVibGljIHVzZXJUcmFuc2FjdGlvbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYWxlT3JkZXJTZXJ2aWNlOiBTYWxlT3JkZXJTZXJ2aWNlLCBwcml2YXRlIF9zZW5kRGF0YVNlcnZpY2U6IFNlbmREYXRhU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFt7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU2FsZXMgb3JkZXJcIixcclxuICAgICAgICAgICAgbGlzdDogdGhpcy5fc2FsZU9yZGVyU2VydmljZS5nZXRVc2VyU2FsZU9yZGVyVW5zYXZlZCgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiUXVvdGVzXCIsXHJcbiAgICAgICAgICAgIGxpc3Q6IHRoaXMuX3NhbGVPcmRlclNlcnZpY2UuZ2V0VXNlclF1b3RlVW5zYXZlZCgpXHJcbiAgICAgICAgfV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrTGlzdChsaXN0KSB7XHJcbiAgICAgICAgaWYgKGxpc3QgPT0gbnVsbCB8fCBsaXN0ID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRyYW5zYWN0aW9uTGlzdChpbmRleCkge1xyXG4gICAgICAgIHRoaXMudXNlclRyYW5zYWN0aW9uID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zWzBdLmxpc3QgPSB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJTYWxlT3JkZXJVbnNhdmVkKCk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zWzFdLmxpc3QgPSB0aGlzLl9zYWxlT3JkZXJTZXJ2aWNlLmdldFVzZXJRdW90ZVVuc2F2ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3dpdGNoKHRyYW5zYWN0aW9uKSB7XHJcbiAgICAgICAgdHJhbnNhY3Rpb24uU2VuZGluZyA9ICF0cmFuc2FjdGlvbi5TZW5kaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kRGF0YSgpIHtcclxuICAgICAgICBsZXQgcmVzcG9uc2U7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zW3RoaXMudXNlclRyYW5zYWN0aW9uXS5saXN0Lm1hcChhc3luYyB0cmFuc2FjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRyYW5zYWN0aW9uLlNlbmRpbmcpXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuX3NlbmREYXRhU2VydmljZS5zZW5kVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==