import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';

@Injectable()
export class InventoryService {
    private customers: any;

    constructor(private _http: HttpClient){

    }

    public getInventories(){
        return this._http.get(`${SERVER.baseUrl}/Inventory`)
        .map(res => res);
    }
}