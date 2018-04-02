import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';

@Injectable()
export class ScanForceService {

    constructor(private _http: HttpClient){

    }

    public getScanForce(){
        return this._http.get(`${SERVER.baseUrl}/Scanforce`)
        .map(res => res);
    }
}