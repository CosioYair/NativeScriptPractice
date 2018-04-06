import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import 'rxjs/add/operator/toPromise';
import { SERVER } from '../config/server.config';
import { CouchbaseService } from "./couchbase.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { User } from "../interfaces/user.interface";

@Injectable()
export class UserService{
    private _users:any;
    private _docId:string = "user";
    private _doc = {};

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public getUsers(){
        return this._http.get(`${SERVER.baseUrl}/Scanforce/User`)
        .map(res => res).toPromise();
    }

    public async setUserDocument(){
        this._couchbaseService.deleteDocument("user");        
        return await this.getUsers()
        .then(result => {
            this._doc[this._docId] = result["Users"];
            this._couchbaseService.createDocument(this._doc, this._docId);
            this._users = result["Users"];
        }, (error) => {
            alert(error);
        });
    }

    public getUser(userId){
        let userSearch = null;
        let doc = this._couchbaseService.getDocument("user")["user"];
         doc.map(user => {
            if(user.UserCode == userId)
                userSearch = user;
        });
        return userSearch;
    }
}
