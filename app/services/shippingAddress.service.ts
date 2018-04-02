import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';

@Injectable()
export class ShippingAddressService {

    constructor(private _http: HttpClient){

    }

    public getShippingAddress(){
        return this._http.get(`${SERVER.baseUrl}/Customer/ShippingAddress`)
        .map(res => res);
    }
}