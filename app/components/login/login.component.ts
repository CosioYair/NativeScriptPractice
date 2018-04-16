import { Component, OnInit } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { UserService } from "../../services/user.service";
import { CouchbaseService } from "../../services/couchbase.service";
import { User } from "../../interfaces/user.interface";
import { DeviceService } from "../../services/device.service";
import { Router } from "@angular/router";
import { SERVER } from "../../config/server.config";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";


@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.css"],
})

export class LoginComponent implements OnInit {
    public userId: string;
    public userPassword: string;
    private _user: User;
    private _users: any;
    private userList: ObservableArray<User> = new ObservableArray<User>();
    public userArray = [];
    public userName: any;

    constructor(private _userService: UserService, private _couchbaseService: CouchbaseService, private _deviceService: DeviceService, private _router: Router) {

    }

    ngOnInit() {
        if (this._couchbaseService.getDocument("device") == null) {
            this._deviceService.setDeviceDocument();
        }
        this.checkDocument();
    }
    
    public login() {
        if (this.checkDocument()) {
            this._user = this._userService.getUser(this.userId);
            if (this._user != null) {
                let password = this.userPassword == undefined ? "" : this.userPassword;
                if (this._user.UserPassword == password) {
                    if (this._couchbaseService.getDocument("product") == null)
                        this._router.navigate(["/sync"]);
                    else
                        this._router.navigate(["/home"]);
                    this.userPassword = "";
                    SERVER.user = this._user;
                }
                else
                    alert("Invalid user or password");
            }
            else
                alert("User not found");
        }
        console.log(this.userId);
    }

    private checkDocument() {
        if (this._couchbaseService.getDocument("user") == null) {
            alert("REFRESHING DATA");
            this._userService.setUserDocument();
            return false;
        } else {/*
            this.userList = this._couchbaseService.getDocument("user");
            if(this.userList){
                this.userList.map(user =>{
                    console.log(user.name);
                })
            }*/
            let doc = this._couchbaseService.getDocument("user");
            this._users = doc["user"];
            this.userList = new ObservableArray<User>(this._users);

            this.userList.map(user => {
                //console.log(user.UserName);
                this.userArray.push(user.UserCode+" : "+user.UserName);
            })
        }
        return true;
    }

    public onchange(args: SelectedIndexChangedEventData) {
        console.log(args.newIndex);
        console.log(this.userArray[args.newIndex]);
        this.userId = this.userArray[args.newIndex].slice(0,3);
        console.log(this.userId);
    }
}
