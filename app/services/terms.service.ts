import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';

@Injectable()
export class TermsCodeService {
    private customers: any;

    constructor(private _http: HttpClient){

    }

    public getTermsCode(){
        return this._http.get(`${SERVER.baseUrl}/Catalog/TermsCode`)
        .map(res => res);
    }
}