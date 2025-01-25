import { AudioController, TrackDescriptor } from "../utils/audio"
import { SoundFreqs } from "../utils/sound_freq";
import { getRand } from "../utils/track_fetcher"

interface PlayerI {
  play(): void;
  pause(): void;
  next(): void;
  prev(): void;
  seek( t: number ): void;

  duration(): number; // In seconds
  playing(): boolean;
  curTime(): number; // In second
  setVolume(v: number): void;
}

class Player implements PlayerI {
  playlist: TrackDescriptor[];
  curTrackInfo: TrackDescriptor | undefined;
  
  public audio: AudioController;
  public freqs: SoundFreqs;
  isPlaying: boolean = false;
  startTime: number = 0; // In seconds
  playedTime: number = 0; // Duration played in seconds at the moment it started playing(if playing)
  isTimelineUpdating: boolean = false;

  constructor() {
    this.audio = new AudioController({
      onend: () => {
        this.next();
      },
      onplay: () => { this.onplay() },
      onpause: () => { this.onpause() },
      onstop: () => {},
      onmute: () => {},
      onvolume: () => {},
    });
    this.freqs = new SoundFreqs($("#soundLines"));
    this.playlist = [];
    this.init();

    return;
    window.setInterval(() => {
      for (var i = 0; i < 50; i++) {
        $(`#soundLine${i}`).css("height", String(Math.random() * 6) + "em");
      }
      console.log(Date.now() / 1000.0)
    }, 0);
  }

  private async init() {
    await this.updatePlaylist();
    await this.next();
  }

  onplay() {
    console.log("onplay")
    this.freqs.play();
    this.startTime = Date.now() / 1000.0;
    this.isPlaying = true;
    this.updateTimelineStart();

    // Update html
    $("#audioPlayButton").addClass("hidden");
    $("#audioPauseButton").removeClass("hidden");  
  }

  async play() {
    if (this.isPlaying)
      return;
    this.audio.play();
  }

  onpause() {
    console.log("onpause")
    this.isPlaying = false;
    this.playedTime += Date.now() / 1000.0 - this.startTime;
    this.freqs.pause();
    // Update html
    $("#audioPauseButton").addClass("hidden");
    $("#audioPlayButton").removeClass("hidden");  
  }

  async pause() {
    if (!this.isPlaying)
      return;
    this.audio.pause();
  }

  async next() {
    // Get new track info
    this.curTrackInfo = this.playlist.shift();
    this.playedTime = 0;

    if (this.curTrackInfo == undefined) {
      return;
    }

    this.audio.reset();
    this.freqs.reset();

    // Loading track
    await this.audio.load(this.curTrackInfo.filename);
    await this.freqs.load(this.curTrackInfo.fftfilename);

    this.updateTrackInfo();

    if (this.isPlaying) {
      this.isPlaying = false;
      this.play();
    }
    this.updateTimeline();
    this.updatePlaylist();
  }

  async prev() {
    // Set timeline on 0
    this.seek(0);
  }

  playing() {
    return this.isPlaying;
  }
  
  setVolume(v: number) {
    this.audio.setVolume(v);
  }

  // Time from 0 to dur
  seek( t: number ) {
    t = Math.max(Math.min(t, this.duration()), 0);
    this.playedTime = t;
    this.setTimelineRatio(this.playedTime / this.duration());
    this.startTime = Date.now() / 1000.0;
    this.audio.seek(t);
    this.freqs.seek(t);
  }

  duration(): number {
    return this.audio.duration(); // In seconds
  }

  curTime(): number {
    if (this.playing()) {
      return this.playedTime + Date.now() / 1000 - this.startTime;
    }
    return this.playedTime;
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
      this.setTimelineRatio((this.playedTime + Date.now() / 1000.0 - this.startTime) / this.audio.duration()); // Because duration is in sec, track time is in ms
    } else {
      this.setTimelineRatio(this.playedTime / this.audio.duration());
    }
  }

  private updateTrackInfo() {
    if (this.curTrackInfo == undefined)
      return;
    $("#trackName").text(this.curTrackInfo.name + " -- " + this.curTrackInfo.author);
  }

  // Only updates html elelemt
  private setTimelineRatio( v: number ) { // Number from 0 to 1
    $("#trackTimeline").css("background", `linear-gradient(to right, var(--main-color) ${v * 100}%, color-mix(in srgb, var(--main-color), transparent 60%) ${v * 100}%)`);
  }

}

export var player = new Player();