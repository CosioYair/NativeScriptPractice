import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import 'rxjs/add/operator/toPromise';
import { SERVER } from '../config/server.config';
import { ShippingAddress } from '../interfaces/shippingAddress.interface';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { CouchbaseService } from './couchbase.service';

@Injectable()
export class ShippingAddressService {
    private _shippingAddressDoc = {};
    private _shippingAddress:ObservableArray<ShippingAddress> = new ObservableArray<ShippingAddress>();

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public getShippingAddress(){
        return this._http.get(`${SERVER.baseUrl}/Customer/ShippingAddress`)
        .map(res => res).toPromise();
    }

    public async setShippingAddressDoc(){
        this._couchbaseService.deleteDocument("shippingaddress");
        return await this.getShippingAddress()
        .then(result => {
            this.filterCustomerShippingAddress(result);
        }, (error) => {
            alert(error);
        });
    }

    private async filterCustomerShippingAddress(shippingsAddress){
        this._shippingAddressDoc["shippingaddress"] = {};
        await shippingsAddress.map(shipping =>{
            if(this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo] == null)
                this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo] = [shipping];
            else
                this._shippingAddressDoc["shippingaddress"][shipping.CustomerNo].push(shipping);
        });
        this._couchbaseService.createDocument(this._shippingAddressDoc, "shippingaddress");
    }

    public async getCustomerShippingAddressList(customer){
        let shippingAddressList = [];
        let doc = this._couchbaseService.getDocument("shippingaddress")["shippingaddress"][customer.CustomerNo];
        if(doc == undefined)
            return null;
        await doc.map(shipping => {
            shippingAddressList.push(shipping.ShipToCode);
        });
        return shippingAddressList;
    }

    public async getCustomerShippingAddress(customer){
        return this._couchbaseService.getDocument("shippingaddress")["shippingaddress"][customer.CustomerNo];
    }
}