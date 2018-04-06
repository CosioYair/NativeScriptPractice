import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

import * as imageSource from "tns-core-modules/image-source";
import * as fs from "tns-core-modules/file-system";
import * as http from "http";

import { SERVER } from '../config/server.config';
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

import { DownloadProgress } from "nativescript-download-progress"

@Injectable()
export class ImageService {

    public async getImage(itemCode) {
        var filePath = fs.path.join(fs.knownFolders.documents().path, itemCode);
        return await http.getFile(`${SERVER.baseUrl}/Image/${itemCode}`, filePath).then(function (r) {
            //// Argument (r) is File!
            console.log(itemCode);
            return r;
        }, function (e) {
            //// Argument (e) is Error!
        });
    }

    public async downloadProgress(url: string){
        var data: string;
        var filePath = fs.path.join(fs.knownFolders.documents().path, "Images.json");
        var download = new DownloadProgress();
        await download.addProgressCallback((progress)=>{
            console.log('Progress:', progress);
        })
        download.downloadFile(url,filePath).then((f)=>{
            console.log("Success", f.path);

        }).catch((e)=>{
            console.log("Error", e);
        })
    }
}