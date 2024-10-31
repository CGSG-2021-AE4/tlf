import $ from "jquery";

// Audio system

export interface TrackDescriptor {
  author: string;
  name: string;
  filename: string;
}

export interface TrackDynamicInfo {
  duration: number;
}

interface AudioControllerI {
  // Track control
  loadTrack(filename: string);
  playTrack();
  pauseTrack();
  resetTrack();

  // State info getters
  getTrackDynamicInfo(): TrackDynamicInfo | undefined;
  trackPlaying(): boolean;

  setVolume(v: number);
}

export class AudioController implements AudioControllerI {
  curTrack: HTMLAudioElement;

  volume: number = 1;

  constructor() {
    this.curTrack = new Audio();
  }
  
  async loadTrack(filename: string): Promise<void> {
    console.log("loaaaaaad");
    var d = $.Deferred();

    this.curTrack.setAttribute('src', filename);
    this.curTrack.load();
    this.curTrack.addEventListener("canplaythrough", () => {
      console.log("loaaaded");
      if (this.curTrack)
        this.curTrack.volume = this.volume;
      d.resolve();
    });
    this.curTrack.addEventListener("error", (e) => {
      console.log(`Failed to load audio: ${e}`);
      d.resolve();
    });
    return d.promise();
  }
  
  resetTrack() {
    this.curTrack.pause();
  }
  
  playTrack() {
    this.curTrack.play();
  }

  pauseTrack() {
    this.curTrack.pause();
  }

  setTime(t: number) {
    this.curTrack.currentTime = t;
  }
  
  // Dynamic track info or "undefined" if track is not set
  getTrackDynamicInfo(): TrackDynamicInfo {
    return {
      duration: this.curTrack.duration,
    }
  }
  
  // Is track playing now
  trackPlaying(): boolean {
    return !this.curTrack.paused;
  }
  
  setVolume(v: number) {
    this.volume = v;
    this.curTrack.volume = this.volume;
  }
}