export interface SaleOrder {
    IsQuote: boolean,
    Saved: boolean,
    Sending: boolean,
    CustomerNo: string,
    CustomerName: string,
    CustomerPONo: string,
    CustomerConfirmTo:string,
    CustomerFBO: string,
    SalesOrderNO: string,
    DeviceUid: string,
    ShipMethod: string,
    BillToName: string,
    BillToAddress1: string,
    BillToAddress2: string,
    BillToAddress3: string,
    BillToCountryCode: string,
    BillToCity: string,
    BillToState: string,
    BillToZipCode: string,
    ShipVia: string,
    WarehouseCode: string,
    ShipTo: number,
    ShipToCity: string,
    ShipToState: string,
    ShipToZipCode: string,
    DiscountAmt: number,
    ShipToName: string,
    ShipToAddress1: string,
    ShipToAddress2: string,
    ShipToAddress3: string,
    ShipToCountryCode: string,
    OrderDate: any,
    ShipDate: any,
    DateCreated: Date,
    DateUpdated: Date,
    UserCode: string,
    SalespersonNo: string,
    TermsCode: string,
    Comment: string,
    Detail: any
}