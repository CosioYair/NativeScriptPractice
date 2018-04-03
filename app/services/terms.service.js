"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
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
            .map(function (res) { return res; });
    };
    TermsCodeService.prototype.setTermsCodeDoc = function () {
        var _this = this;
        this.getTermsCode()
            .subscribe(function (result) {
            _this._termsCodeDoc["termscode"] = result["TermsCode"];
            _this._couchbaseService.createDocument(_this._termsCodeDoc, "termscode");
        }, function (error) {
            alert(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlcm1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTZFO0FBQzdFLGlDQUErQjtBQUMvQixnQ0FBOEI7QUFDOUIseURBQWlEO0FBQ2pELHlEQUF1RDtBQUd2RDtJQUdJLDBCQUFvQixLQUFpQixFQUFVLGlCQUFtQztRQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUYxRSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQUkzQixDQUFDO0lBRU0sdUNBQVksR0FBbkI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUksc0JBQU0sQ0FBQyxPQUFPLHVCQUFvQixDQUFDO2FBQzNELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU0sMENBQWUsR0FBdEI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxZQUFZLEVBQUU7YUFDbEIsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNiLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzRSxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDJDQUFnQixHQUF2QixVQUF3QixRQUFRO1FBQzVCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZFLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ1IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUNwQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQTlCUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FJa0IsaUJBQVUsRUFBNkIsb0NBQWdCO09BSHpFLGdCQUFnQixDQStCNUI7SUFBRCx1QkFBQztDQUFBLEFBL0JELElBK0JDO0FBL0JZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7IFNFUlZFUiB9IGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQ291Y2hiYXNlU2VydmljZSB9IGZyb20gJy4vY291Y2hiYXNlLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGVybXNDb2RlU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF90ZXJtc0NvZGVEb2MgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIF9jb3VjaGJhc2VTZXJ2aWNlOiBDb3VjaGJhc2VTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRlcm1zQ29kZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtTRVJWRVIuYmFzZVVybH0vQ2F0YWxvZy9UZXJtc0NvZGVgKVxyXG4gICAgICAgIC5tYXAocmVzID0+IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRlcm1zQ29kZURvYygpe1xyXG4gICAgICAgIHRoaXMuZ2V0VGVybXNDb2RlKClcclxuICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rlcm1zQ29kZURvY1tcInRlcm1zY29kZVwiXSA9IHJlc3VsdFtcIlRlcm1zQ29kZVwiXTtcclxuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLl90ZXJtc0NvZGVEb2MsIFwidGVybXNjb2RlXCIpO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVzZXJUZXJtc0NvZGUoY3VzdG9tZXIpe1xyXG4gICAgICAgIGxldCB1c2VyVGVybXNDb2RlID0gXCJcIjtcclxuICAgICAgICBsZXQgZG9jID0gdGhpcy5fY291Y2hiYXNlU2VydmljZS5nZXREb2N1bWVudChcInRlcm1zY29kZVwiKVtcInRlcm1zY29kZVwiXTtcclxuICAgICAgICBkb2MubWFwKHRlcm0gPT57XHJcbiAgICAgICAgICAgIGlmKHRlcm0uVGVybXNDb2RlID09IGN1c3RvbWVyLlRlcm1zQ29kZSlcclxuICAgICAgICAgICAgICAgIHVzZXJUZXJtc0NvZGUgPSB0ZXJtLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB1c2VyVGVybXNDb2RlO1xyXG4gICAgfVxyXG59Il19