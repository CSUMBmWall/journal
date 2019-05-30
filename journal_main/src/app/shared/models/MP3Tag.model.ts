export class MP3TagModel {
    artist: string;
    album: string;
    title: string;
    APIC: string; // album art
    raw: {
        TIT2: string,
        TPE1: string,
        APIC: string
    };
    // [propName: string]: string;
}

