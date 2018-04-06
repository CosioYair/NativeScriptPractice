import { Component, OnInit } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { UserService } from "../../services/user.service";
import { CouchbaseService } from "../../services/couchbase.service";
import { User } from "../../interfaces/user.interface";
import { DeviceService } from "../../services/device.service";
import { Router } from "@angular/router";
import { SERVER } from "../../config/server.config";

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.css"],
})

export class LoginComponent implements OnInit { 
    public userId:string;
    public userPassword:string;
    private _user:User;

    constructor(private _userService: UserService, private _couchbaseService: CouchbaseService, private _deviceService: DeviceService, private _router: Router){

    }

    ngOnInit(){
        if(this._couchbaseService.getDocument("device") == null)
            this._deviceService.setDeviceDocument();
    }

    public login(){
        if(this.checkDocument()){
            this._user = this._userService.getUser(this.userId);
            if(this._user != null){
                if(this._user.UserPassword == this.userPassword){
                    if(this._couchbaseService.getDocument("product") == null)
                        this._router.navigate(["/sync"]);
                    else
                        this._router.navigate(["/home"]);
                    SERVER.user = this._user;
                }
                else
                    alert("Invalid user or password");
            }
            else
                alert("User not found");
        }
    }

    private checkDocument(){
        if(this._couchbaseService.getDocument("user") == null){
            alert("REFRESHING DATA");
            this._userService.setUserDocument();
            return false;
        }
        return true;
    }
}
