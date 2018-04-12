"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var server_config_1 = require("../config/server.config");
var couchbase_service_1 = require("./couchbase.service");
var TermsCodeService = /** @class */ (function () {
    function TermsCodeService(_http, _couchbaseService) {
        this._http = _http;
        this._couchbaseService = _couchbaseService;
        this._termsCodeDoc = {};
    }
    TermsCodeService.prototype.getTermsCode = function () {
        return this._http.get(server_config_1.SERVER.baseUrl + "/Catalog/TermsCode")
            .map(function (res) { return res; }).toPromise();
    };
    TermsCodeService.prototype.setTermsCodeDoc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._couchbaseService.deleteDocument("termscode");
                        return [4 /*yield*/, this.getTermsCode()
                                .then(function (result) {
                                _this._termsCodeDoc["termscode"] = result["TermsCode"];
                                _this._couchbaseService.createDocument(_this._termsCodeDoc, "termscode");
                            }, function (error) {
                                alert(error);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TermsCodeService.prototype.getUserTermsCode = function (customer) {
        var userTermsCode = "";
        var doc = this._couchbaseService.getDocument("termscode")["termscode"];
        doc.map(function (term) {
            if (term.TermsCode == customer.TermsCode)
                userTermsCode = term.Description;
        });
        return userTermsCode;
    };
    TermsCodeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, couchbase_service_1.CouchbaseService])
    ], TermsCodeService);
    return TermsCodeService;
}());
exports.TermsCodeService = TermsCodeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlcm1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTZFO0FBQzdFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIsdUNBQXFDO0FBQ3JDLHlEQUFpRDtBQUNqRCx5REFBdUQ7QUFHdkQ7SUFHSSwwQkFBb0IsS0FBaUIsRUFBVSxpQkFBbUM7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFGMUUsa0JBQWEsR0FBRyxFQUFFLENBQUM7SUFJM0IsQ0FBQztJQUVNLHVDQUFZLEdBQW5CO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLHNCQUFNLENBQUMsT0FBTyx1QkFBb0IsQ0FBQzthQUMzRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVZLDBDQUFlLEdBQTVCOzs7Ozs7d0JBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDNUMscUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBRTtpQ0FDL0IsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQ0FDUixLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDdEQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzRCQUMzRSxDQUFDLEVBQUUsVUFBQyxLQUFLO2dDQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakIsQ0FBQyxDQUFDLEVBQUE7NEJBTkYsc0JBQU8sU0FNTCxFQUFDOzs7O0tBQ047SUFFTSwyQ0FBZ0IsR0FBdkIsVUFBd0IsUUFBUTtRQUM1QixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUNSLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDcEMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUEvQlEsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7eUNBSWtCLGlCQUFVLEVBQTZCLG9DQUFnQjtPQUh6RSxnQkFBZ0IsQ0FnQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQWhDRCxJQWdDQztBQWhDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2UgfSBmcm9tICcuL2NvdWNoYmFzZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlcm1zQ29kZVNlcnZpY2Uge1xuICAgIHByaXZhdGUgX3Rlcm1zQ29kZURvYyA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBfY291Y2hiYXNlU2VydmljZTogQ291Y2hiYXNlU2VydmljZSl7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGVybXNDb2RlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtTRVJWRVIuYmFzZVVybH0vQ2F0YWxvZy9UZXJtc0NvZGVgKVxuICAgICAgICAubWFwKHJlcyA9PiByZXMpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBzZXRUZXJtc0NvZGVEb2MoKXtcbiAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5kZWxldGVEb2N1bWVudChcInRlcm1zY29kZVwiKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0VGVybXNDb2RlKClcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Rlcm1zQ29kZURvY1tcInRlcm1zY29kZVwiXSA9IHJlc3VsdFtcIlRlcm1zQ29kZVwiXTtcbiAgICAgICAgICAgIHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuY3JlYXRlRG9jdW1lbnQodGhpcy5fdGVybXNDb2RlRG9jLCBcInRlcm1zY29kZVwiKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VyVGVybXNDb2RlKGN1c3RvbWVyKXtcbiAgICAgICAgbGV0IHVzZXJUZXJtc0NvZGUgPSBcIlwiO1xuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInRlcm1zY29kZVwiKVtcInRlcm1zY29kZVwiXTtcbiAgICAgICAgZG9jLm1hcCh0ZXJtID0+e1xuICAgICAgICAgICAgaWYodGVybS5UZXJtc0NvZGUgPT0gY3VzdG9tZXIuVGVybXNDb2RlKVxuICAgICAgICAgICAgICAgIHVzZXJUZXJtc0NvZGUgPSB0ZXJtLkRlc2NyaXB0aW9uO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVzZXJUZXJtc0NvZGU7XG4gICAgfVxufSJdfQ==