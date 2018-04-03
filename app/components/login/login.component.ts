import { Component } from "@angular/core";
import { Border } from "tns-core-modules/ui/border";
import { UserService } from "../../services/user.service";
import { CouchbaseService } from "../../services/couchbase.service";
import { User } from "../../interfaces/user.interface";

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.css"]
})

export class LoginComponent { 
    public userId:string;
    public userPassword:string;
    private _user:User;

    constructor(private _userService: UserService, private _couchbaseService: CouchbaseService){

    }

    public login(){
        if(this.checkDocument()){
            this._user = this._userService.getUser(this.userId);
            if(this._user != null){
                if(this._user.UserPassword == this.userPassword)
                    alert("Login");
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
