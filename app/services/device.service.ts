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
export class DeviceService{
    private _docId:string = "device";
    private _doc = {};

    constructor(private _http: HttpClient, private _couchbaseService: CouchbaseService){

    }

    public registerDevice(){ 
        return this._http.post(`${SERVER.baseUrl}/Device`,{
            DeviceUid: platformModule.device.uuid,
            MobileAppVersion: "5.0.0",
            MobileDeviceType: platformModule.device.deviceType,
            MobileOsVersion: platformModule.device.osVersion,
            DeviceName: platformModule.device.model,
            Challenge: ""
        })
        .map(res => res);
    }

    private getAppVersion(){
        let nativeAppVersion = require("nativescript-appversion");
        return nativeAppVersion.getVersionName().then((version) =>{
            return version;
        });
    }
    
    public setDeviceDocument(){
        this._couchbaseService.deleteDocument("device");
        this.registerDevice()
        .subscribe(result => {
            this._doc[this._docId] = result;
            this._couchbaseService.createDocument(this._doc, this._docId);
        }, (error) => {
            alert(error);
        });
    }

    public getDevice(){
        return this._couchbaseService.getDocument("device")["device"];
    }
}
