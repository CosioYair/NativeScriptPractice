import { NumberFormatStyle } from "@angular/common";

export interface Product{
    Category1: string,
    Category2: string,
    Category3: string,
    Category4: string,
    DateCreated: string,
    DateUpdate: string,
    ExtendedDescriptionData: string,
    ImageFile: string,
    InactiveItem: string,
    ItemCode: string,
    ItemCodeDesc: string,
    ItemType: string,
    LastSoldDate: string,
    PrimaryVendorNo: string,
    ProductLine: string,
    ProductType: string,
    ShipWeight: string,
    StandardUnitCost: NumberFormatStyle.Decimal,
    StandardUnitPrice: NumberFormatStyle.Decimal,
    TimeCreated: string,
    TimeUpdated: string,
    Volume:string
}