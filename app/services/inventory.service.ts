import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import 'rxjs/add/operator/toPromise';
import { SERVER } from '../config/server.config';
import { CouchbaseService } from './couchbase.service';
import { CONSTANTS } from '../config/constants.config';

@Injectable()
export class InventoryService {
    private _inventoryDoc = {};
    private _inventories:any;

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    private getInventories(){
        return this._http.get(`${SERVER.baseUrl}/Inventory`)
        .map(res => res).toPromise();
    }

    public async setInventoriesDoc(){
        this._couchbaseService.deleteDocument("inventory");
        return await this.getInventories()
        .then(result => {
            this.filterInventories(result["Product"]);
        }, (error) => {
            alert(error);
        });
    }

    public async filterInventories(inventoryDoc:any){
        this._inventoryDoc["inventory"] = {};
        await inventoryDoc.map(product => {
            if(product.WarehouseCode == "ATL" || product.WarehouseCode == "HOU" || product.WarehouseCode == "CHI" || product.WarehouseCode == "PHX" || product.WarehouseCode == "000"){
                if(this._inventoryDoc["inventory"][product.WarehouseCode] == null)
                    this._inventoryDoc["inventory"][product.WarehouseCode] = [product];
                else
                    this._inventoryDoc["inventory"][product.WarehouseCode].push(product);
            }
        });
        this._couchbaseService.createDocument(this._inventoryDoc, "inventory");
    }

    public getInventoryWarehouse(warehouseCode){
        return this._couchbaseService.getDocument("inventory")["inventory"][warehouseCode];
    }
}