import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardComponent} from '../../components/card/card.component';

@Component({
    templateUrl: 'phoneme-list-all.component.html',
    styleUrls: ['phoneme-list-all.component.css',
        '../../main.css']
})

export class PhonemeListAllComponent implements OnInit, OnDestroy {
    instruction: HTMLAudioElement;

    constructor() {

    }

    ngOnInit() {
        this.instruction = new Audio();
        this.instruction.src = '/assets/audio/00_Button_Audio_Complete_a_whole_puzzle_(Phonics_only).mp3';
        this.instruction.load();
        this.playAudio();
    }

    ngOnDestroy() {
        this.instruction.pause();
    }

    playAudio() {
        this.instruction.pause();
        this.instruction.currentTime = 0;
        this.instruction.play();
    }
    phonemes = ['a','a','a','a','ai','an','ar','au','aw','ay','b','bl','br','c','c','ch','cl','cr','d','dr','e','e','e','ea','er','et','et','ew','f','fl','fr','g','g','gl','gr','h','i','i','i','ie','ie','igh','il','ir','j','k','l','le','m','n','nd','ng','nk','o','o','o','oo','oo','oa','oi','or','ou','ow','ow','oy','p','pl','pr','qu','r','s','s','sh','st','sw','t','th','th','tr','u','u','u','ur','v','w','wh','x','y','y','y','z']
}
