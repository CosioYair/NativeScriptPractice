import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';

@Injectable()
export class ProductService{
    private product: any;

    constructor(private _http: HttpClient){

    }

    public getProducts(){
        return this._http.get(`${SERVER.baseUrl}/Product`)
        .map(res => res);
    }

    //checar servicio
    public getProductImage(id){
        return this._http.get(`${SERVER.baseUrl}/Image/${id}`);
    }
}
