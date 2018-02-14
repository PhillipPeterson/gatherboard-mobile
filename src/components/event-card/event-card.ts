import {Component, Input} from '@angular/core';
import * as _ from 'he';
import {ModalController} from "ionic-angular";
import {EventModalPage} from "../../pages/event-modal/event-modal";
import {Global} from "../../providers/global";
import moment from "moment";

@Component({
    selector: 'event-card',
    templateUrl: 'event-card.html'
})
export class EventCardComponent {

    @Input() e: any;
    category: string;
    iconName: string;
    backgroundColorMap = Global.backgroundColorMap;
    iconColorMap = Global.iconColorMap;
    iconNames = Global.iconNames;

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
        this.category = this.e.ParentCatName;
        this.iconName = this.iconNames[this.category];
    }


    openModal() {
        let modal = this.modalController.create(EventModalPage, {'e': this.e});
        modal.present();
    }


    /**
     * Hacky method for formatting plain time string sent back from API
     * @param startTime
     * @returns {string}
     */
    formatStartTime(startTime) {
        let firstIndex = parseInt(startTime[0]);
        let secondIndex = parseInt(startTime[1]);
        let combined = startTime[0] + startTime[1];
        let combinedInt = parseInt(combined);

        // remove trailing 0
        if (parseInt(startTime[0]) == 0) {
            startTime = startTime.substring(1, startTime.length + 1);
        }

        // 13:00 - 23:59
        if (combinedInt > 12) {
            return (combinedInt - 12).toString() + ':' + startTime[3] + startTime[4] + 'p';
        }

        // 12:00p - 12:59p
        else if (firstIndex == 1 && secondIndex == 2) {
            return startTime.substring(0, startTime.length - 3) + 'p';
        }

        // 00:00 - 11:59
        else {
            return startTime.substring(0, startTime.length - 3) + 'a';
        }
    }

    // format string to M/D format
    formatStartDate(startDate) {
        return moment(startDate).format('M/D');
    }

    escapeEntity(string) {
        return _.decode(string);
    }
}
