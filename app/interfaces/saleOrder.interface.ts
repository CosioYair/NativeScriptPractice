export interface SaleOrder {
    IsQuote: boolean,
    CustomerNo: string,
    CustomerPONo: string,
    CustomerConfirmTo:string,
    CustomerFBO: string,
    SalesOrderNO: string,
    BillToName: string,
    BillToAddress1: string,
    BillToAddress2: string,
    BillToCountryCode: string,
    BillToCity: string,
    BillToState: string,
    BillToZipCode: string,
    ShipVia: string,
    WarehouseCode: string,
    ShipToCity: string,
    ShipToState: string,
    ShipToZipCode: string,
    DiscountAmt: number,
    ShipToName: string,
    ShipToAddress1: string,
    ShipToAddress2: string,
    ShipToAddress3: string,
    ShipToCountryCode: string,
    OrderDate: Date,
    ShipDate: Date,
    DateCreated: Date,
    DateUpdated: Date,
    VendorNo: string,
    SalespersonNo: string,
    TermsCode: string,
    Comment: string,
    Detail: any
}