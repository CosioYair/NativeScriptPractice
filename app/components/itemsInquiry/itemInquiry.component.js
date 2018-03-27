"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var item_service_1 = require("../../services/item.service");
var couchbase_service_1 = require("../../services/couchbase.service");
var server_config_1 = require("../../config/server.config");
//import para descarga de imagenes
var imageSource = require("tns-core-modules/image-source");
var fs = require("tns-core-modules/file-system");
var http = require("http");
var ItemInquiryComponent = /** @class */ (function () {
    function ItemInquiryComponent(_couchbaseService, _productService) {
        this._couchbaseService = _couchbaseService;
        this._productService = _productService;
        this._docId = "product";
        this.productList = new observable_array_1.ObservableArray();
        this.data = {};
        this.selectedProduct = {};
        this.selectedProduct = {
            ItemCode: "",
            ItemCodeDesc: "",
            InactiveItem: "",
            ItemType: "",
            ShipWeight: "",
            Volume: "",
            StandardUnitCost: "",
            StandardUnitPrice: "",
            PrimaryVendorNo: "",
            Category1: "",
            Category2: "",
            Category3: "",
            Category4: "",
            ProductLine: "",
            ProductType: "",
            ExtendedDescriptionText: "",
            LastSoldDate: "",
            DateCreated: "",
            DateUpdated: "",
            TimeUpdated: "",
            TimeCreated: ""
        };
        this.picture = "";
    }
    ItemInquiryComponent.prototype.ngOnInit = function () {
        this.setDocument();
    };
    ItemInquiryComponent.prototype.getProducts = function () {
        var _this = this;
        this._productService.getProducts()
            .subscribe(function (result) {
            _this.data[_this._docId] = result["Product"];
            _this._couchbaseService.createDocument(_this.data, _this._docId);
            _this._products = result["Product"];
            _this.productList = new observable_array_1.ObservableArray(_this._products);
        }, function (error) {
            alert(error);
        });
    };
    ItemInquiryComponent.prototype.setDocument = function () {
        var doc = this._couchbaseService.getDocument(this._docId);
        if (doc == null)
            this.getProducts();
        else {
            this._products = doc[this._docId];
            this.productList = new observable_array_1.ObservableArray(this._products);
        }
    };
    ItemInquiryComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        if (searchValue.length > 0) {
            this.productList = new observable_array_1.ObservableArray();
            this._products.map(function (product, index) {
                if (_this._products[index].ItemCodeDesc.toLowerCase().indexOf(searchValue) !== -1)
                    _this.productList.push(_this._products[index]);
            });
        }
    };
    ItemInquiryComponent.prototype.onClear = function (args) {
        var _this = this;
        var searchBar = args.object;
        searchBar.text = "";
        this.productList = new observable_array_1.ObservableArray();
        this._products.forEach(function (item) {
            _this.productList.push(item);
        });
    };
    ItemInquiryComponent.prototype.setSelectedProduct = function (product) {
        this.selectedProduct = product;
        this.downloadImagesProducts(this.productList);
    };
    //descargar imagenes
    ItemInquiryComponent.prototype.downloadImagesProducts = function (productList) {
        productList.map(function (product) {
            if (product.ImageFile != null) {
                console.log(server_config_1.SERVER.baseUrl + "/Image/" + product.ImageFile);
            }
        });
        http.getFile("https://raw.githubusercontent.com/NativeScript/NativeScript/master/tests/app/logo.png").then(function (r) {
            //// Argument (r) is File!
            console.log(r.path); //nombre que trae desde el servidor
            var img = imageSource.fromFile(r.path);
            var folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, "test.png"); //nombre con el que se guarda
            var saved = img.saveToFile(path, "png");
        }, function (e) {
            //// Argument (e) is Error!
        });
        var folder = fs.knownFolders.documents();
        var path = fs.path.join(folder.path, "test.png"); //nombre para buscarlo
        var img = imageSource.fromFile(path);
        this.picture = path;
        console.log(path + "888888888");
        console.log(this.picture + "888888888");
    };
    ItemInquiryComponent = __decorate([
        core_1.Component({
            selector: "ns-itemInquiry",
            moduleId: module.id,
            templateUrl: "./itemInquiry.component.html",
            styleUrls: ["./itemInquiry.component.css"]
        }),
        __metadata("design:paramtypes", [couchbase_service_1.CouchbaseService, item_service_1.ProductService])
    ], ItemInquiryComponent);
    return ItemInquiryComponent;
}());
exports.ItemInquiryComponent = ItemInquiryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUlucXVpcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUlucXVpcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELDRGQUF5RjtBQUN6Riw0REFBNkQ7QUFDN0Qsc0VBQW1FO0FBRW5FLDREQUFvRDtBQUVwRCxrQ0FBa0M7QUFFbEMsMkRBQTZEO0FBQzdELGlEQUFtRDtBQUNuRCwyQkFBNkI7QUFVN0I7SUFRSSw4QkFBb0IsaUJBQW1DLEVBQVUsZUFBK0I7UUFBNUUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQU54RixXQUFNLEdBQVUsU0FBUyxDQUFDO1FBQzNCLGdCQUFXLEdBQTZCLElBQUksa0NBQWUsRUFBVyxDQUFDO1FBQ3ZFLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixvQkFBZSxHQUFPLEVBQUUsQ0FBQztRQUk1QixJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ25CLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFVLEVBQUUsRUFBRTtZQUNkLE1BQU0sRUFBRSxFQUFFO1lBQ1YsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixpQkFBaUIsRUFBRSxFQUFFO1lBQ3JCLGVBQWUsRUFBRSxFQUFFO1lBQ25CLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLHVCQUF1QixFQUFFLEVBQUU7WUFDM0IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2Ys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Q0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUEsc0JBQXNCO1FBQ3pFLElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUF6SFEsb0JBQW9CO1FBUmhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzdDLENBQUM7eUNBV3lDLG9DQUFnQixFQUEyQiw2QkFBYztPQVJ2RixvQkFBb0IsQ0EySC9CO0lBQUQsMkJBQUM7Q0FBQSxBQTNIRixJQTJIRTtBQTNIVyxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaXRlbUlucXVpcnkuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBTZWFyY2hCYXJ9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvdWNoYmFzZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3VjaGJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgU2V0dXBJdGVtVmlld0FyZ3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlc1wiO1xuaW1wb3J0IHsgU0VSVkVSIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9zZXJ2ZXIuY29uZmlnXCI7XG5cbi8vaW1wb3J0IHBhcmEgZGVzY2FyZ2EgZGUgaW1hZ2VuZXNcblxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtSW5xdWlyeVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtSW5xdWlyeS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9pdGVtSW5xdWlyeS5jb21wb25lbnQuY3NzXCJdXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBJdGVtSW5xdWlyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBwcml2YXRlIF9wcm9kdWN0czphbnk7XG4gICAgcHJpdmF0ZSBfZG9jSWQ6c3RyaW5nID0gXCJwcm9kdWN0XCI7XG4gICAgcHVibGljIHByb2R1Y3RMaXN0OiBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KCk7XG4gICAgcHVibGljIGRhdGEgPSB7fTtcbiAgICBwdWJsaWMgc2VsZWN0ZWRQcm9kdWN0OmFueSA9IHt9O1xuICAgIHB1YmxpYyBwaWN0dXJlOmFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvdWNoYmFzZVNlcnZpY2U6IENvdWNoYmFzZVNlcnZpY2UsIHByaXZhdGUgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSl7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0ID0ge1xuICAgICAgICAgICAgSXRlbUNvZGU6IFwiXCIsXG4gICAgICAgICAgICBJdGVtQ29kZURlc2M6IFwiXCIsXG4gICAgICAgICAgICBJbmFjdGl2ZUl0ZW06IFwiXCIsXG4gICAgICAgICAgICBJdGVtVHlwZTogXCJcIixcbiAgICAgICAgICAgIFNoaXBXZWlnaHQ6IFwiXCIsXG4gICAgICAgICAgICBWb2x1bWU6IFwiXCIsXG4gICAgICAgICAgICBTdGFuZGFyZFVuaXRDb3N0OiBcIlwiLFxuICAgICAgICAgICAgU3RhbmRhcmRVbml0UHJpY2U6IFwiXCIsXG4gICAgICAgICAgICBQcmltYXJ5VmVuZG9yTm86IFwiXCIsXG4gICAgICAgICAgICBDYXRlZ29yeTE6IFwiXCIsXG4gICAgICAgICAgICBDYXRlZ29yeTI6IFwiXCIsXG4gICAgICAgICAgICBDYXRlZ29yeTM6IFwiXCIsXG4gICAgICAgICAgICBDYXRlZ29yeTQ6IFwiXCIsXG4gICAgICAgICAgICBQcm9kdWN0TGluZTogXCJcIixcbiAgICAgICAgICAgIFByb2R1Y3RUeXBlOiBcIlwiLFxuICAgICAgICAgICAgRXh0ZW5kZWREZXNjcmlwdGlvblRleHQ6IFwiXCIsXG4gICAgICAgICAgICBMYXN0U29sZERhdGU6IFwiXCIsXG4gICAgICAgICAgICBEYXRlQ3JlYXRlZDogXCJcIixcbiAgICAgICAgICAgIERhdGVVcGRhdGVkOiBcIlwiLFxuICAgICAgICAgICAgVGltZVVwZGF0ZWQ6IFwiXCIsXG4gICAgICAgICAgICBUaW1lQ3JlYXRlZDogXCJcIlxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5waWN0dXJlID0gXCJcIjtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXREb2N1bWVudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9kdWN0cygpe1xuICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0cygpXG4gICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLl9kb2NJZF0gPSByZXN1bHRbXCJQcm9kdWN0XCJdO1xuICAgICAgICAgICAgdGhpcy5fY291Y2hiYXNlU2VydmljZS5jcmVhdGVEb2N1bWVudCh0aGlzLmRhdGEsIHRoaXMuX2RvY0lkKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gcmVzdWx0W1wiUHJvZHVjdFwiXTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PFByb2R1Y3Q+KHRoaXMuX3Byb2R1Y3RzKTtcblxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RG9jdW1lbnQoKXtcbiAgICAgICAgbGV0IGRvYyA9IHRoaXMuX2NvdWNoYmFzZVNlcnZpY2UuZ2V0RG9jdW1lbnQodGhpcy5fZG9jSWQpO1xuICAgICAgICBpZihkb2MgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IGRvY1t0aGlzLl9kb2NJZF07XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pih0aGlzLl9wcm9kdWN0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHNlYXJjaFZhbHVlLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2R1Y3RzW2luZGV4XS5JdGVtQ29kZURlc2MudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaCh0aGlzLl9wcm9kdWN0c1tpbmRleF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBzZWFyY2hCYXIudGV4dCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8UHJvZHVjdD4oKTtcbiAgICAgICAgdGhpcy5fcHJvZHVjdHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpc3QucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNlbGVjdGVkUHJvZHVjdChwcm9kdWN0OlByb2R1Y3Qpe1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdCA9IHByb2R1Y3Q7XG4gICAgICAgIHRoaXMuZG93bmxvYWRJbWFnZXNQcm9kdWN0cyh0aGlzLnByb2R1Y3RMaXN0KTtcbiAgICB9XG5cbi8vZGVzY2FyZ2FyIGltYWdlbmVzXG4gICAgcHVibGljIGRvd25sb2FkSW1hZ2VzUHJvZHVjdHMocHJvZHVjdExpc3Q6IE9ic2VydmFibGVBcnJheTxQcm9kdWN0Pil7XG5cbiAgICAgICAgcHJvZHVjdExpc3QubWFwKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgaWYocHJvZHVjdC5JbWFnZUZpbGUgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7U0VSVkVSLmJhc2VVcmx9L0ltYWdlLyR7cHJvZHVjdC5JbWFnZUZpbGV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaHR0cC5nZXRGaWxlKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05hdGl2ZVNjcmlwdC9OYXRpdmVTY3JpcHQvbWFzdGVyL3Rlc3RzL2FwcC9sb2dvLnBuZ1wiKS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChyKSBpcyBGaWxlIVxuICAgICAgICAgICAgY29uc29sZS5sb2coci5wYXRoKTsvL25vbWJyZSBxdWUgdHJhZSBkZXNkZSBlbCBzZXJ2aWRvclxuICAgICAgICAgICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUoci5wYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIFwidGVzdC5wbmdcIik7Ly9ub21icmUgY29uIGVsIHF1ZSBzZSBndWFyZGFcbiAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gaW1nLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChlKSBpcyBFcnJvciFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xuICAgICAgICBjb25zdCBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBcInRlc3QucG5nXCIpOy8vbm9tYnJlIHBhcmEgYnVzY2FybG9cbiAgICAgICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUocGF0aCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBpY3R1cmUgPSBwYXRoO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXRoK1wiODg4ODg4ODg4XCIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGljdHVyZStcIjg4ODg4ODg4OFwiKTtcbiAgICB9XG4gICAgXG4gfSJdfQ==