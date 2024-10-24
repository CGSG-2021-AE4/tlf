// Sound system state

interface TrackInfo {
  Author: string;
  Name: string;
}

interface TrackDynamicInfo {
  duration: number;
}

interface AudioSystemI {
  // Track control
  loadTrack(filename: string);
  playTrack();
  pauseTrack();
  resetTrack();

  // State info getters
  getTrackInfo(): TrackInfo;
  getTrackDynamicInfo(): TrackDynamicInfo | undefined;
  trackPlaying(): boolean;

  setVolume(v: number);
}

class AudioSystem implements AudioSystemI {
  curTrack: HTMLAudioElement | undefined;
  volume: number = 1;
  
  loadTrack(filename: string) {
    this.curTrack = new Audio(filename);
  }
  
  resetTrack() {
    this.curTrack = undefined;
  }
  
  playTrack() {
    if (this.curTrack != undefined) {
      this.curTrack.play();
    }
  }

  pauseTrack() {
    if (this.curTrack != undefined) {
      this.curTrack.pause();
    }
  }
  
  getTrackInfo(): TrackInfo {
    return {
      Author: "AE4",
      Name: "SSSS"
    }
  }

  // Dynamic track info or "undefined" if track is not set
  getTrackDynamicInfo(): TrackDynamicInfo | undefined {
    if (this.curTrack == undefined)
      return undefined;
    return {
      duration: this.curTrack.duration,
    }
  }
  
  // Is track playing now
  trackPlaying(): boolean {
    if (this.curTrack == undefined)
      return false;
    return !this.curTrack.paused;
  }
  
  setVolume(v: number) {
    this.volume = v;
    if (this.curTrack != undefined) {
      this.curTrack.volume = this.volume;
    }
  }
}

export var audio = new AudioSystem();