import {ref} from "vue";
import moment from "moment/moment";

export interface NatLab {
    events: NatLabEvent[];
}

export interface NatLabEvent {
    code:              null;
    startDate:         Date;
    endDate:           null;
    intermission:      null;
    boxofficeId:       string;
    externalOrderLink: string;
    hall:              Hall;
    UID:               string;
    location:          Location;
    status:            Status;
    prices:            any[];
    themes:            Theme[];
    production:        Production;
}

export enum Hall {
    Auditorium = "Auditorium",
    Podiumzaal = "Podiumzaal",
    Zaal1 = "Zaal 1",
    Zaal2 = "Zaal 2",
    Zaal3 = "Zaal 3",
    Zaal4 = "Zaal 4",
}

export interface Location {
    street:     null;
    postalCode: null;
    city:       null;
    country:    null;
    phone1:     null;
    phone2:     null;
    name:       null;
}

export interface Production {
    url:                string;
    code:               string;
    performerName:      null | string;
    performerType:      PerformerType;
    attendanceMode:     AttendanceMode;
    productionType:     ProductionType;
    supertitle:         null;
    title:              string;
    subtitle:           null | string;
    video1:             null | string;
    video2:             null;
    tagline:            null;
    teaser:             string;
    description1:       string;
    description2:       null | string;
    quote:              null | string;
    quoteSource:        null | string;
    programme:          null;
    credits:            null | string;
    mailingDescription: null;
    customData:         null;
    ogDescription:      string;
    genres:             null;
    images:             Images;
    suggestions:        null;
    movie:              Movie;
}

export enum AttendanceMode {
    Offline = "offline",
}

export interface Images {
    HD:                HD;
    HDPortrait:        HD;
    HDSquare:          HD;
    OpenGraph:         HD;
    OpenGraphPortrait: HD;
}

export interface HD {
    filename: null | string;
}

export interface Movie {
    runningTime:                number | null;
    productionYear:             null | string;
    releaseDate:                ReleaseDate | null;
    viewingGuideAge:            ViewingGuideAge | null;
    viewingGuideViolence:       boolean | null;
    viewingGuideSex:            boolean | null;
    viewingGuideAnxiety:        boolean | null;
    viewingGuideDrugs:          boolean | null;
    viewingGuideDiscrimination: boolean | null;
    viewingGuideLanguageUse:    boolean | null;
    director:                   null | string;
    cast:                       null | string;
    country:                    null | string;
    language:                   null | string;
    subtitles:                  Subtitles | null;
}

export interface ReleaseDate {
    date:          Date;
    timezone_type: number;
    timezone:      Timezone;
}

export enum Timezone {
    EuropeAmsterdam = "Europe/Amsterdam",
}

export enum Subtitles {
    Geen = "Geen",
    Nederlands = "Nederlands",
}

export enum ViewingGuideAge {
    Al = "al",
    Ng = "ng",
    Vanaf12 = "vanaf12",
    Vanaf14 = "vanaf14",
    Vanaf16 = "vanaf16",
    Vanaf6 = "vanaf6",
    Vanaf9 = "vanaf9",
}

export enum PerformerType {
    Group = "group",
}

export enum ProductionType {
    Default = "default",
    Movie = "movie",
}

export interface Status {
    name:      Name;
    bookable:  boolean;
    soldOut:   boolean;
    cancelled: boolean;
}

export enum Name {
    KaartenKopen = "kaarten kopen",
}

export interface Theme {
    code:        null;
    boxOfficeId: null;
    name:        string;
}

export function request():Promise<Error | NatLab>{
    var formdata = new FormData();
    formdata.append("past", "true");
    const today = new Date()
    formdata.append("startDate", today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear());

    return fetch("/data.json", {
        method: 'POST',
        headers: new Headers({
            "apiKey" : "02a2eb195cb8b6f4df3b05c466440fb22f3c54922890"
        }),
        body: formdata,
        mode: 'cors',
    })
        .then(response => response.json())
        .then(result => {return result as NatLab})
        .catch(error => {return error as Error});
}


export function getCurrentMoviePlayed(events: NatLabEvent[]): {now: NatLabEvent, next: NatLabEvent}{
    const filterEvents = events.filter(e =>{
        const startDate = moment(e.startDate)
        startDate.add(e.production.movie.runningTime, "m")
        return startDate > moment() && startDate.format('DD-MM-yyyy') === moment().format('DD-MM-yyyy')
    })
    return {
        now: filterEvents.at(0) as NatLabEvent,
        next: filterEvents.at(1) as NatLabEvent
    }
}