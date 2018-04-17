import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { SERVER } from '../config/server.config';
import { CouchbaseService } from "./couchbase.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { User } from "../interfaces/user.interface";
import * as platformModule from "tns-core-modules/platform";

@Injectable()
export class LastRefreshService {
    private _docId: string = "lastrefresh";
    private _doc = {};

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService) {

    }

    public setLastRefreshDocument() {
        this._couchbaseService.deleteDocument(this._docId);
        this._doc[this._docId] = {
            docs: "",
            images: ""
        };
        this._couchbaseService.createDocument(this._doc, this._docId);
    }

    public setLastRefresh(type, date) {
        this._doc = this._couchbaseService.getDocument(this._docId);
        this._doc[this._docId][type] = date;
        this._couchbaseService.updateDocument(this._docId, this._doc);
    }

    public getLastRefresh(type) {
        return this._couchbaseService.getDocument(this._docId)[this._docId][type];
    }
}
