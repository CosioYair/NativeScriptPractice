import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';
import { CouchbaseService } from "./couchbase.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Injectable()
export class ProductService{
    private _products:any;
    private _docId:string = "product";
    private _doc = {};

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public getProducts(){
        return this._http.get(`${SERVER.baseUrl}/Product?InactiveItem=N`)
        .map(res => res);
    }

    //checar servicio
    public getProductImage(id){
        return this._http.get(`${SERVER.baseUrl}/Image/${id}`);
    }

    public async setProductDocument(){
        await this.getProducts()
        .subscribe(result => {
            this._doc[this._docId] = result["Product"];
            this._couchbaseService.createDocument(this._doc, this._docId);
            this._products = result["Product"];
        }, (error) => {
            alert(error);
        });

        return this.getProductDocument(this._products);
    }

    public async getProductDocument(doc){
        let productList = [];
        await doc.map(product => {
            if(product.ProductType == "F")
                productList.push(product);
        });
        return productList;
    }
}
