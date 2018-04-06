import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import 'rxjs/add/operator/toPromise';
import { SERVER } from '../config/server.config';
import { CouchbaseService } from './couchbase.service';

@Injectable()
export class TermsCodeService {
    private _termsCodeDoc = {};

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public getTermsCode(){
        return this._http.get(`${SERVER.baseUrl}/Catalog/TermsCode`)
        .map(res => res).toPromise();
    }

    public async setTermsCodeDoc(){
        this._couchbaseService.deleteDocument("termscode");
        return await this.getTermsCode()
        .then(result => {
            this._termsCodeDoc["termscode"] = result["TermsCode"];
            this._couchbaseService.createDocument(this._termsCodeDoc, "termscode");
        }, (error) => {
            alert(error);
        });
    }

    public getUserTermsCode(customer){
        let userTermsCode = "";
        let doc = this._couchbaseService.getDocument("termscode")["termscode"];
        doc.map(term =>{
            if(term.TermsCode == customer.TermsCode)
                userTermsCode = term.Description;
        });
        return userTermsCode;
    }
}