export interface Inventory {
    ItemCode: string,
    WarehouseCode: string,
    QuantityOnHand: number,
    QuantityOnSalesOrder: number,
    QuantityOnBackOrder: number,
    QuantityOnPurchaseOrder: number,
    MaximumOnHandQty: number,
    MinimumOrderQty: number,
    InactiveItem: string,
    DateUpdated: string,
    TimeUpdated: string
}