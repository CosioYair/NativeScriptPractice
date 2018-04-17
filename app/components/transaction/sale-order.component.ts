import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild, OnDestroy } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { CouchbaseService } from "../../services/couchbase.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalDateComponent } from "../modal/datepicker/modal-date.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { CONSTANTS } from "../../config/constants.config";
import { SearchBar } from "tns-core-modules/ui/search-bar/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Product } from "../../interfaces/itemInquiry.interface";
import { ProductService } from "../../services/item.service";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { ModalProductOrderComponent } from "../modal/productOrder/modal-product-order.component";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../../interfaces/customer.interface";
import { Inventory } from "../../interfaces/inventory.interface";
import { InventoryService } from "../../services/inventory.service";
import { DecimalPipe } from '@angular/common';
import { TermsCodeService } from "../../services/terms.service";
import { TermsCode } from "../../interfaces/termsCode.interface";
import { ShippingAddress } from "../../interfaces/shippingAddress.interface";
import { ShippingAddressService } from "../../services/shippingAddress.service";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view/tab-view";
import { SaleOrderService } from "../../services/saleOrder.service";
import { SaleOrder } from "../../interfaces/saleOrder.interface";
import { SERVER } from "../../config/server.config";
import * as platformModule from "tns-core-modules/platform";
import { RouterExtensions } from "nativescript-angular/router";
import { GLOBALFUNCTIONS } from "../../config/globalFunctions.config";
import { FoliosTransactionService } from "../../services/foliosTransaction.service";

@Component({
    selector: "ns-sale-order",
    moduleId: module.id,
    templateUrl: "./sale-order.component.html",
    styleUrls: ["./sale-order.css"]
})

export class SaleOrderComponent implements OnInit, OnDestroy {
    public productList: any;
    private _products: any;
    public selectedProduct: any = {};
    public selectedCartProduct: any = {};
    public warehouses: any = [];
    public warehouse: number = 0;
    public lineTitle: string = "Item Details";
    public lineSubTitle: string = "Select an item to view details and add";
    public showingProduct: Boolean = false;
    public itemCode: string = "";
    public productQuantity: number = 1;
    private orientation = require('nativescript-orientation');
    public tabs: Array<SegmentedBarItem>;
    public selectionTabs: any;
    public selectedIndex = 0;
    public customer: Customer;
    public inventoryList: ObservableArray<Inventory> = new ObservableArray<Inventory>();
    public totalCartAmount: number = 0;
    public cartQuantity: number = 0;
    public userTermsCode: string;
    public shippingAddressList: any = [];
    private _customerShippingAddress: any;
    public totalCubes: number = 0;
    public _saleOrder: SaleOrder;
    public shipMethods: any = ["Delivery", "Pickup"];
    public shipMethod: number = 0;
    public productImage: any;
    @ViewChild('Qty') Qty: ElementRef;

    constructor(private _productService: ProductService,
        private _inventoryService: InventoryService,
        private _couchbaseService: CouchbaseService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private barcodeScanner: BarcodeScanner,
        private route: ActivatedRoute,
        private _termsCodeService: TermsCodeService,
        private _shippingAddressService: ShippingAddressService,
        private _saleOrderService: SaleOrderService,
        private _router: RouterExtensions,
        private _foliosTransactionsService: FoliosTransactionService
    ) {
        this.selectedProduct.ItemCode = "";
        this.selectedProduct.comment = "";
        this.selectedCartProduct.ItemCode = "";
        //this.orientation.setOrientation("landscaperight");  
        this.tabs = [];
        this.selectionTabs = [{
            title: "HEADER",
            visibility: true
        },
        {
            title: "ADDRESS",
            visibility: false
        },
        {
            title: "LINES",
            visibility: false
        },
        {
            title: "TOTALS",
            visibility: false
        }];
        this.selectionTabs.map(tab => {
            let segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            segmentedBarItem.title = tab.title;
            this.tabs.push(segmentedBarItem);
        });
        SERVER.isQuote = JSON.parse(this.route.snapshot.params["IsQuote"]);
        this.getCustomer(this.route.snapshot.params["CustomerNo"]);
        this.setShippingAddress();
        this.setInventory();
        this.userTermsCode = this._termsCodeService.getUserTermsCode(this.customer);
        this.setDocument();
        this.warehouses = GLOBALFUNCTIONS.getWarehouses();
        this.refreshSaleOrder();
    }

    ngOnDestroy() {
        SERVER.editTransaction.edit = false;
    }

    async ngOnInit() {

    }

    public getTransaction() {
        console.log(SERVER.isQuote)
        if (SERVER.isQuote) {
            this._saleOrderService.getUserQuoteUnsaved().map(quote => {
                if (quote.SalesOrderNO == SERVER.editTransaction.transactionNo) {
                    this._saleOrder = quote;
                }
            });
        }
        else {
            this._saleOrderService.getUserSaleOrderUnsaved().map(sale => {
                if (sale.SalesOrderNO == SERVER.editTransaction.transactionNo) {
                    this._saleOrder = sale;
                }
            });
        }
        this.warehouse = this.warehouses.indexOf(GLOBALFUNCTIONS.getWarehouseByCode(this._saleOrder.WarehouseCode)["name"]);
        this.shipMethod = this._saleOrder.ShipMethod == "Delivery" ? 0 : 1;
        this.calculateCart();
    }

    public calculateCart() {
        this._saleOrder.Detail.map(product => {
            this.totalCartAmount += product.quantityPrice;
            this.cartQuantity += parseInt(product.quantity);
            this.totalCubes += product.Category4 * product.quantity;
        });
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        this.selectionTabs.map((tab, index) => {
            if (index == segmetedBar.selectedIndex)
                tab.visibility = true;
            else
                tab.visibility = false;
        });
    }

    public async setDocument() {
        this._products = await this._productService.getProductDocument();
        this.productList = new ObservableArray<Product>(this._products);
    }

    public getCustomer(CustomerNo: string) {
        let doc = this._couchbaseService.getDocument("customer")["customer"];
        doc.map(customer => {
            if (customer.CustomerNo == CustomerNo)
                this.customer = customer;
        });
    }

    public async setShippingAddress() {
        this._customerShippingAddress = await this._shippingAddressService.getCustomerShippingAddress(this.customer);
        if (this._customerShippingAddress == null)
            this.shippingAddressList = [];
        else {
            this.shippingAddressList = await this._shippingAddressService.getCustomerShippingAddressList(this.customer);
            this.setSaleOrderShipAddress(0);
        }
    }

    public setInventory() {
        let warehouseCode = GLOBALFUNCTIONS.getWarehouseByName(this.warehouses[this.warehouse])["code"];
        this.inventoryList = this._inventoryService.getInventoryWarehouse(warehouseCode);
    }

    public setCustomerShippingAddress(args: SelectedIndexChangedEventData) {
        setTimeout(() => {
            this.setSaleOrderShipAddress(args.newIndex);
        }, 500);
    }

    public setSaleOrderShipAddress(index) {
        this._saleOrder.ShipVia = this._customerShippingAddress[index].ShipVia;
        this._saleOrder.ShipToCity = this._customerShippingAddress[index].ShipToCity;
        this._saleOrder.ShipToCity = this._customerShippingAddress[index].ShipToCity;
        this._saleOrder.ShipToCity = this._customerShippingAddress[index].ShipToCity;
        this._saleOrder.ShipToCity = this._customerShippingAddress[index].ShipToCity;
        this._saleOrder.ShipToZipCode = this._customerShippingAddress[index].ShipToZipCode;
        this._saleOrder.ShipToName = this._customerShippingAddress[index].ShipToName;
        this._saleOrder.ShipToAddress1 = this._customerShippingAddress[index].ShipToAddress1;
        this._saleOrder.ShipToAddress2 = this._customerShippingAddress[index].ShipToAddress2;
        this._saleOrder.ShipToAddress3 = this._customerShippingAddress[index].ShipToAddress3;
        this._saleOrder.ShipToCountryCode = this._customerShippingAddress[index].ShipToCountryCode;
        this._saleOrder.ShipToCity = this._customerShippingAddress[index].ShipToCity;
        this._saleOrder.ShipTo = index;
    }

    public filterInventoryWarehouse() {
        setTimeout(() => {
            this.cancel();
            this.inventoryList = this._inventoryService.getInventoryWarehouse(GLOBALFUNCTIONS.getWarehouseByName(this.warehouses[this.warehouse])["code"]);
            this._saleOrder.WarehouseCode = GLOBALFUNCTIONS.getWarehouseByName(this.warehouses[this.warehouse])["code"];
        }, 500);
    }

    public showDateModal(input: string) {
        this.createModelView().then(result => {
            if (result != null) {
                this._saleOrder[input] = result;
            }
        }).catch(error => alert(error));
    }

    private createModelView(): Promise<any> {
        const today = new Date();
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };
        return this.modalService.showModal(ModalDateComponent, options);
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();
        this.cancel();

        if (searchValue.length > 0) {
            this.productList = new ObservableArray<Product>();
            this._products.map((product, index) => {
                if (this._products[index].ItemCode.toLowerCase().indexOf(searchValue) !== -1)
                    this.productList.push(this._products[index]);
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";

        this.productList = new ObservableArray<Product>(this._products);
    }

    public cancel() {
        this.showingProduct = false;
        this.selectedProduct = {};
        this.lineTitle = "Item Details";
        this.lineSubTitle = "Select an item to view details and add";
        this.productQuantity = 1;
    }

    public viewProduct(product: Product) {
        this.selectedProduct = product;
        this.showingProduct = true;
        this.lineTitle = product.ItemCodeDesc;
        this.lineSubTitle = product.ItemCode;
        this.itemCode = product.ItemCode;
        this.getInventoryQuantit();
        this.productImage = this._productService.getImage(product.ItemCode);
    }

    private searchItemCode(code: string, list: any) {
        let item = false;
        list.map((product, index) => {
            if (list[index].ItemCode.toLowerCase() == code.toLowerCase()) {
                item = product;
                this.selectedProduct = this._products[index];
            }
        });
        return item;
    }

    public validateProductList() {
        if (this.searchItemCode(this.itemCode, this._products) == false)
            alert(`Invalid item code. ${this.itemCode} does not exist.`);
        else
            this.viewProduct(this.selectedProduct);
    }

    public validateIntegerNumber(number) {
        if (number != parseInt(number, 10) || number < 1)
            return false;
        return true;
    }

    public async addProduct() {
        let product = this.searchItemCode(this.itemCode, this._saleOrder.Detail);
        if (this.validateIntegerNumber(this.productQuantity)) {
            if (product == false) {
                this.selectedProduct.quantity = this.productQuantity;
                this.selectedProduct.quantityPrice = this.selectedProduct.quantity * parseFloat(this.selectedProduct.StandardUnitPrice);
                this._saleOrder.Detail.push(this.selectedProduct);
                this.totalCartAmount += this.selectedProduct.quantityPrice;
                this.cartQuantity = this.cartQuantity + parseInt(this.selectedProduct.quantity);
                this.totalCubes += this.selectedProduct.Category4 * this.selectedProduct.quantity;
                alert(`Item ${this.itemCode} added to cart.`);
            }
            else {
                this.selectedCartProduct = product;
                await alert(`Item ${this.itemCode} is already added to cart.`);
                this.showProductOrderModal();
            }
            this.cancel();
        }
        else {
            alert("Invalid quantity");
            this.Qty.nativeElement.focus();
            setTimeout(() => {
                this.Qty.nativeElement.android.selectAll();
            }, 500);
            this.Qty.nativeElement.ios.textRangeFromPositionToPosition(this.Qty.nativeElement.ios.beginningOfDocument, this.Qty.nativeElement.ios.endOfDocument);
        }
    }

    public showCart() {
        console.log(JSON.stringify(this._saleOrder.Detail));
    }

    public setSelectedCartProduct(product: Product) {
        this.selectedCartProduct = product;
    }

    public deleteCartProduct() {
        this._saleOrder.Detail.map((product, index) => {
            if (this._saleOrder.Detail[index].ItemCode == this.selectedCartProduct.ItemCode) {
                this.totalCartAmount = this.totalCartAmount - parseFloat(this.selectedCartProduct.quantityPrice);
                this.cartQuantity = this.cartQuantity - this.selectedCartProduct.quantity;
                this.totalCubes -= this.selectedCartProduct.Category4 * this.selectedCartProduct.quantity;
                this._saleOrder.Detail.splice(index, 1);
            }
        });
    }

    public onScan() {
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            resultDisplayDuration: 500,
            orientation: "orientation",
            openSettingsIfPermissionWasPreviouslyDenied: true
        }).then((result) => {
            this.itemCode = result.text;
            this.validateProductList();
        }, (errorMessage) => {
            console.log("Error when scanning " + errorMessage);
        }
        );
    }

    public showProductOrderModal() {
        if (this.selectedCartProduct.quantity != undefined) {
            let oldProductQuantity = parseInt(this.selectedCartProduct.quantity);
            this.createModelViewProductEdit().then(result => {
                if (result != null && result.quantity > 0) {
                    this.cartQuantity = this.cartQuantity - oldProductQuantity;
                    this.totalCartAmount = this.totalCartAmount - this.selectedCartProduct.quantityPrice;
                    this.totalCubes -= this.selectedCartProduct.Category4 * oldProductQuantity;
                    this.cartQuantity = this.cartQuantity + parseInt(result.quantity);
                    this.selectedCartProduct.quantityPrice = result.quantity * parseFloat(this.selectedCartProduct.StandardUnitPrice);
                    this.totalCartAmount = this.totalCartAmount + this.selectedCartProduct.quantityPrice;
                    this.totalCubes += this.selectedCartProduct.Category4 * this.selectedCartProduct.quantity;
                }
                else
                    this.selectedCartProduct.quantity = oldProductQuantity;
            }).catch(error => alert(error));
        }
    }

    private createModelViewProductEdit(): Promise<any> {
        if (this.selectedCartProduct.quantity != null) {
            const productDetails = {
                selectedCartProduct: this.selectedCartProduct,
                warehouse: GLOBALFUNCTIONS.getWarehouseByCode(this._saleOrder.WarehouseCode)["name"]
            };
            const options: ModalDialogOptions = {
                viewContainerRef: this.vcRef,
                context: productDetails,
                fullscreen: false,
            };
            return this.modalService.showModal(ModalProductOrderComponent, options);
        }
    }

    private async getInventoryQuantit() {
        // console.log(JSON.stringify(this.inventoryList));
        await this.inventoryList.map(product => {
            let quantityAvail = product.QuantityOnHand - product.QuantityOnSalesOrder;
            if (this.selectedProduct.ItemCode == product.ItemCode) {
                this.selectedProduct.quantityOnHand = product.QuantityOnHand;
                this.selectedProduct.quantityAvail = quantityAvail < 0 ? 0 : quantityAvail;
            }
        });
        if (this.selectedProduct.quantityOnHand == null) {
            this.selectedProduct.quantityOnHand = 0;
            this.selectedProduct.quantityAvail = 0;
        }
    }

    public showDescription() {
        if (this.selectedProduct.ExtendedDescriptionText != undefined || this.selectedProduct.ExtendedDescriptionText != "")
            alert(this.selectedProduct.ExtendedDescriptionText);
        else
            alert("Description not available");
    }

    private saveFoliosTransaction() {
        let folioNumber = SERVER.isQuote ? this._foliosTransactionsService.getQuoteTransactions().length + 1 : this._foliosTransactionsService.getSaleTransactions().length + 1;
        let folioSerie = `${this.padLeft(folioNumber.toString(), '0', 6)}`;
        let doc = SERVER.isQuote ? "Quote" : "Sale";
        let docSerie = SERVER.isQuote ? "Q" : "S";
        let serie = `${platformModule.device.uuid.slice(0, 6)}${docSerie}-${folioSerie}`;
        let folio = {
            Folio: folioSerie,
            Document: doc,
            Serie: serie
        };
        this._foliosTransactionsService.updateFoliosTransactionDoc(folio);
        return serie;
    }

    public async save() {
        let messages = this.validations();
        if (messages == "OK") {
            await this.setLineProduct();
            this._saleOrder.SalesOrderNO = this._saleOrder.SalesOrderNO == "" ? await this.saveFoliosTransaction() : this._saleOrder.SalesOrderNO;
            await this._saleOrderService.updateSaleOrderDoc(this._saleOrder);
            console.log(JSON.stringify(this._saleOrder));
            this._router.navigate(["/home"], { clearHistory: true });
        }
        else
            alert(messages);
    }

    private padLeft(text: string, padChar: string, size: number): string {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    }

    private refreshSaleOrder() {
        let currentDate = new Date();
        this._saleOrder = {
            IsQuote: SERVER.isQuote,
            Saved: false,
            Sending: false,
            CustomerNo: this.customer.CustomerNo,
            CustomerName: this.customer.CustomerName,
            CustomerPONo: "",
            CustomerConfirmTo: "",
            CustomerFBO: "",
            SalesOrderNO: "",
            DeviceUid: platformModule.device.uuid,
            ShipMethod: "",
            BillToName: this.customer.CustomerName,
            BillToAddress1: this.customer.AddressLine1,
            BillToAddress2: this.customer.AddressLine2 == null ? "" : this.customer.AddressLine2,
            BillToAddress3: this.customer.AddressLine3 == null ? "" : this.customer.AddressLine3,
            BillToCountryCode: this.customer.CountryCode,
            BillToCity: this.customer.City,
            BillToState: this.customer.State,
            BillToZipCode: this.customer.ZipCode,
            ShipVia: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipVia,
            WarehouseCode: GLOBALFUNCTIONS.getWarehouseByName(this.warehouses[this.warehouse])["code"],
            ShipTo: 0,
            ShipToCity: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToCity,
            ShipToState: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToState,
            ShipToZipCode: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToZipCode,
            DiscountAmt: 0,
            ShipToName: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToName,
            ShipToAddress1: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToAddress1,
            ShipToAddress2: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToAddress2,
            ShipToAddress3: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToAddress3,
            ShipToCountryCode: this._customerShippingAddress == null ? "" : this._customerShippingAddress[0].ShipToCountryCode,
            OrderDate: new Date(),
            ShipDate: new Date(),
            DateCreated: new Date(),
            DateUpdated: new Date(),
            UserCode: SERVER.user["UserCode"],
            SalespersonNo: SERVER.user["DefaultSalespersonID"],
            TermsCode: this.customer.TermsCode,
            Comment: "",
            Detail: []
        };
        if (!SERVER.editTransaction.edit) {
            this._saleOrder.ShipDate = `${currentDate.getDate() + 1}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
            this._saleOrder.OrderDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
        }
        else {
            this.getTransaction();
        }
    }

    private validations() {
        let messages = "";
        messages += this.validateProducts();
        console.log(this.shipMethod)
        if (this.shipMethod == 0)
            messages += this.validateAddress();

        return messages == "" ? "OK" : messages;
    }

    private validateProducts() {
        return this._saleOrder.Detail.length > 0 ? "" : "You need to add products to cart \n";
    }

    private validateAddress() {
        if (this._saleOrder.ShipToAddress1 == "" || this._saleOrder.ShipToCity == "" || this._saleOrder.ShipToState == "" || this._saleOrder.ShipToZipCode == "")
            return "Your Shipping Address must have (First Address line, City, State and Zip code) \n";
        else
            return "";
    }

    private setLineProduct() {
        this._saleOrder.Detail.map((product, index) => {
            product.lineItem = index + 1;
            product.quantity = parseInt(product.quantity);
        });
    }

    public setShipMethod() {
        setTimeout(() => {
            if (this.shipMethod == 1) {
                this.warehouse = 0;
                this.warehouses.splice(this.warehouses.length - 1);
            }
            else {
                if (this.warehouses.indexOf("Direct") == -1)
                    this.warehouses.push("Direct");
            }
            this._saleOrder.ShipMethod = this.shipMethods[this.shipMethod];
        }, 500);
    }
}