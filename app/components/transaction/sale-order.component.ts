import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from "@angular/core";
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

export class SaleOrderComponent implements OnInit {
    public productList: any;
    private _products: any;
    public selectedProduct: any = {};
    public selectedCartProduct: any = {};
    public warehouses: any = [];
    public warehouse: number = 0;
    public shipVias: any;
    public shipVia: number = 0;
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
    private _saleOrder: SaleOrder;
    public shipMethods: any = ["Dilevey", "Pickup"];
    public shipMethod: number = 0;
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
        this.shipVias = [];
        CONSTANTS.shipVias.map(shipVia => {
            this.shipVias.push(shipVia.name);
        });
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
    }

    async ngOnInit() {
        if (SERVER.editTransaction)
            alert("edit");
        SERVER.isQuote = JSON.parse(this.route.snapshot.params["IsQuote"]);
        await this.getCustomer(this.route.snapshot.params["CustomerNo"]);
        await this.setShippingAddress();
        await this.setInventory();
        await this.setTermsCode();
        await this.setDocument();
        this.warehouses = await GLOBALFUNCTIONS.getWarehouses();
        if (SERVER.editTransaction) {
            await this.refreshSaleOrder();
            this._saleOrder.ShipDate = `${this._saleOrder.ShipDate.getDate() + 1}/${this._saleOrder.ShipDate.getMonth() + 1}/${this._saleOrder.ShipDate.getFullYear()}`;
            this._saleOrder.OrderDate = `${this._saleOrder.OrderDate.getDate()}/${this._saleOrder.OrderDate.getMonth()}/${this._saleOrder.OrderDate.getFullYear()}`;
        }
        else {
            this.getTransaction();
        }
    }

    public getTransaction(){
        if(SERVER.isQuote){
            this._saleOrderService.getUserQuoteUnsaved().map(quote => {
                if(quote.SalesOrderNO = SERVER.editTransaction.transactionNo)
                    this._saleOrder = quote;
            });   
        }
        else {
            this._saleOrderService.getUserSaleOrderUnsaved().map(sale => {
                if(sale.SalesOrderNO = SERVER.editTransaction.transactionNo)
                    this._saleOrder = sale;
            });  
        }
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
        if (this._couchbaseService.getDocument("product") == null)
            this._productService.setProductDocument();

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

    public setTermsCode() {
        if (this._couchbaseService.getDocument("termscode") == null)
            this._termsCodeService.setTermsCodeDoc();
        this.userTermsCode = this._termsCodeService.getUserTermsCode(this.customer);
    }

    public async setShippingAddress() {
        if (this._couchbaseService.getDocument("shippingaddress") == null)
            this._shippingAddressService.setShippingAddressDoc();
        this._customerShippingAddress = await this._shippingAddressService.getCustomerShippingAddress(this.customer);
        if (this._customerShippingAddress == null)
            this.shippingAddressList = [];
        else {
            this.shippingAddressList = await this._shippingAddressService.getCustomerShippingAddressList(this.customer);
        }
    }

    public setInventory() {
        if (this._couchbaseService.getDocument("inventory") == null)
            this._inventoryService.setInventoriesDoc();

        this.inventoryList = this._inventoryService.getInventoryWarehouse(this.warehouse);
    }

    public setCustomerShippingAddress(args: SelectedIndexChangedEventData) {
        setTimeout(() => {
            this._saleOrder.ShipToCity = this._customerShippingAddress[args.newIndex].ShipToCity;
            this._saleOrder.ShipToState = this._customerShippingAddress[args.newIndex].ShipToState;
            this._saleOrder.ShipToZipCode = this._customerShippingAddress[args.newIndex].ShipToZipCode;
            this._saleOrder.ShipToName = this._customerShippingAddress[args.newIndex].ShipToName;
            this._saleOrder.ShipToAddress1 = this._customerShippingAddress[args.newIndex].ShipToAddress1;
            this._saleOrder.ShipToAddress2 = this._customerShippingAddress[args.newIndex].ShipToAddress2;
            this._saleOrder.ShipToAddress3 = this._customerShippingAddress[args.newIndex].ShipToAddress3;
            this._saleOrder.ShipToCountryCode = this._customerShippingAddress[args.newIndex].ShipToCountryCode;
        }, 500);
    }

    public setCustomerShipVia(args: SelectedIndexChangedEventData) {
        setTimeout(() => {
            this.shipVia = args.newIndex;
            this._saleOrder.ShipVia = this.shipVias[this.shipVia]
        }, 500);
    }

    public filterInventoryWarehouse() {
        setTimeout(() => {
            this.cancel();
            this.inventoryList = this._inventoryService.getInventoryWarehouse(this.warehouse);
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
        let searchValue = searchBar.text.toLowerCase()
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

    public addProduct() {
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
                warehouse: CONSTANTS.warehouses[this.warehouse].name
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
        await this.inventoryList.map(product => {
            let quantityAvail = product.QuantityOnHand - product.QuantityOnSalesOrder;
            if (this.selectedProduct.ItemCode == product.ItemCode) {
                this.selectedProduct.quantityOnHand = product.QuantityOnHand;
                this.selectedProduct.quantityAvail = quantityAvail < 0 ? 0 : quantityAvail;
            }
        });
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
            this._saleOrder.SalesOrderNO = await this.saveFoliosTransaction();
            await this._saleOrderService.updateSaleOrderDoc(this._saleOrder);
            console.log(JSON.stringify(this._saleOrder));
            SERVER.editTransaction.edit = false;
            this._router.back();
        }
        else
            alert(messages);
    }

    private padLeft(text: string, padChar: string, size: number): string {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    }

    private refreshSaleOrder() {
        this._saleOrder = {
            IsQuote: SERVER.isQuote,
            Saved: false,
            CustomerNo: this.customer.CustomerNo,
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
            ShipVia: "",
            WarehouseCode: this.warehouses[this.warehouse].code,
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
    }

    private validations() {
        let messages = "";
        messages += this.validateProducts();
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
            if (this.shipMethod == 1)
                this.warehouse = 0;
            this._saleOrder.ShipMethod = this.shipMethods[this.shipMethod];
        }, 500);
    }
}