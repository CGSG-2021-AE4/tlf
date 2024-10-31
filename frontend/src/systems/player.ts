import { AudioController, TrackDescriptor } from "../utils/audio"
import { getRand } from "../utils/track_fetcher"
import $ from "jquery";

interface PlayerI {
  play()
  pause()
  next()
  prev()
  playing()
  setVolume(v: number)
  setTime( t: number )
  getDur(): number
}

class Player implements PlayerI {
  playlist: TrackDescriptor[];
  curTrack: TrackDescriptor | undefined;
  curTrackDur: number; // In milliseconds

  public audio: AudioController;
  isPlaying: boolean = false;
  startTime: number;
  trackTime: number; // Duration played in milliseconds at the moment it started playing(if playing)
  isTimelineUpdating: boolean = false;

  constructor() {
    this.audio = new AudioController();
    this.playlist = [];
    this.init();
  }

  private async init() {
    await this.updatePlaylist();
    await this.next();
  }

  async play() {
    if (this.isPlaying)
      return;
    this.audio.playTrack();
    this.startTime = Date.now();
    this.isPlaying = true;
    this.updateTimelineStart();
  }

  async pause() {
    if (!this.isPlaying)
      return;
    this.isPlaying = false;
    this.trackTime += Date.now() - this.startTime;
    this.audio.pauseTrack();
  }

  async next() {
    console.log("next");

    // Get new track info
    this.curTrack = this.playlist.shift();
    this.trackTime = 0;

    if (this.curTrack == undefined) {
      return;
    }

    // Loading track
    await this.audio.loadTrack(this.curTrack.filename);

    const dynamicInfo = this.audio.getTrackDynamicInfo();
    if (dynamicInfo != undefined) {
      this.curTrackDur = dynamicInfo.duration * 1000; // Because initially it is in seconds
    } else {
      this.curTrackDur = 1; // Cannot divide by 0
      console.log("fuck dur");
    }

    this.UpdateTrackInfo();

    if (this.isPlaying) {
      console.log("next play");
      this.isPlaying = false;
      this.play();
    }
    this.updateTimeline();
    this.updatePlaylist();
  }

  async prev() {
    console.log("prev");
    // Set timeline on 0
    this.setTime(0);
  }

  playing() {
    return this.isPlaying;
  }
  
  setVolume(v: number) {
    this.audio.setVolume(v);
  }

  // Time from 0 to dur
  setTime( t: number ) {
    console.log("set time");
    this.setTimelineRatio(this.trackTime / this.curTrackDur);
    this.trackTime = t;
    this.startTime = Date.now();
    this.audio.setTime(t);
  }

  getDur(): number {
    return this.curTrackDur;
  }

  private async updatePlaylist() { // Adds new tracks
    const avarageTracksAmount = 3;

    if (this.playlist.length < avarageTracksAmount) {
      const newTracks = await getRand(3);

      this.playlist = this.playlist.concat(newTracks);
    }
    console.log("playlist", this.playlist);
  }

  private updateTimelineStart() { // Is invoked regularly during the play
    if (this.isTimelineUpdating) // Another routine is already updates it
      return
    this.updateCycleRec();
  }
  
  private updateCycleRec = () => {
      this.updateTimeline();
    if (this.isPlaying) {
      this.isTimelineUpdating = true;
      window.setTimeout(this.updateCycleRec, 500);
    } else {
      this.isTimelineUpdating = false;
    }
  }

  private updateTimeline() {
    if (this.isPlaying) {
      console.log("update timeline");
      this.setTimelineRatio((this.trackTime + Date.now() - this.startTime) / this.curTrackDur);
    } else {
      this.setTimelineRatio(this.trackTime / this.curTrackDur);
    }
  }

  private UpdateTrackInfo() {
    if (this.curTrack == undefined)
      return;
    $("#trackName").text(this.curTrack.name + " -- " + this.curTrack.author);
  }

  // Only updates html elelemt
  private setTimelineRatio( v: number ) { // Number from 0 to 1
    $("#trackTimeline").css("background", `linear-gradient(to right, var(--main-color) ${v * 100}%, color-mix(in srgb, var(--main-color), transparent 60%) ${v * 100}%)`);
  }

}

export var player = new Player();