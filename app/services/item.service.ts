import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import * as imageSource from "tns-core-modules/image-source";
import * as fs from "tns-core-modules/file-system";
import * as http from "http";

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
}
