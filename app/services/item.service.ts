import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import 'rxjs/add/operator/toPromise';

import * as imageSource from "tns-core-modules/image-source";
import * as fs from "tns-core-modules/file-system";
import * as http from "http";

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
        .map(res => res).toPromise();
    }

    public getImages(parameters: string){
        return this._http.get(`${SERVER.baseUrl}/Images.json?ItemCodes=${parameters}`)
        .map(res => res);
    }

    //Obtener imagenes de producto
    public async  getProductImage(url, fileName){
       
        var filePath = fs.path.join(fs.knownFolders.currentApp().path, fileName+".jpg");
            await http.getFile(url, filePath).then(function (r) {
                //// Argument (r) is File!
                console.log(filePath);
            }, function (e) {
                //// Argument (e) is Error!
            });
            return filePath;
    }

    public async setProductDocument(){
        this._couchbaseService.deleteDocument("product");
        return await this.getProducts()
        .then(result => {
            this._doc[this._docId] = result["Product"];
            this._couchbaseService.createDocument(this._doc, this._docId);
            this._products = result["Product"];
        }, (error) => {
            alert(error);
        });
    }

    public async getProductDocument(){
        let productList = [];
        let doc = this._couchbaseService.getDocument("product")["product"];
        await doc.map(product => {
            if(product.ProductType == "F" && product.StandardUnitPrice > 5)
                productList.push(product);
        });
        return productList;
    }
}
