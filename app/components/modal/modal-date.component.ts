import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-date.component.html",
})
export class ModalDateComponent {
    public _date:any;

    public constructor(private params: ModalDialogParams) {
        this._date = new Date();
    }

    public onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;
        datePicker.date =  new Date();
        datePicker.minDate = new Date();
    }

    public onDateChanged(args) {
        this._date = args.value;
    }

    public close() {
        this._date = `${this._date.getDate() + 1}/${this._date.getMonth() + 1}/${this._date.getFullYear()}`;
        this.params.closeCallback(this._date);
    }
}