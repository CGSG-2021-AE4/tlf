import $ from "jquery";
import { TrackPlayerI } from "./audio";

interface version {
  major: number;
  minor: number;
  patch: number;
}

function unpackVersion(d: number): version {
  return {
    major: (d >> 16) & 0xFF,
    minor: (d >> 8) & 0xFF,
    patch: d & 0xFF,
  }
}

export class SoundFreqs implements TrackPlayerI {
  // Html values
  container: JQuery;
  soundLines: JQuery[];

  // Time sync values
  playing: boolean = false;
  startTime: number; // Start playing time in ms
  playedTime: number; // Time in ms of track that has been already played(or played by the time it started playing againt)
  timeout: number; // Timeout beetween freq samples in ms
  updateScheduled: boolean = false; // Is update call back registered so there will be no routing doubling

  // Fetched data values
  loaded: boolean = false;
  sampleRate: number;
  sampleSize: number;
  sampleCount: number;
  maxFreq: number;
  data: Uint32Array;

  constructor(container: JQuery, count: number) {
    container = container;
    this.soundLines = [];
    // TEMP solution
    for (var i = 0; i < 100; i++) {
      this.soundLines.push($(`#soundLine${i}`))
    }
    this.reset();
  }

  scheduleUpdate() {
    const t = Date.now() - this.startTime + this.playedTime;
    window.setTimeout(this.update, Math.ceil(t / this.timeout) * this.timeout - t);
    this.updateScheduled = true;
  }

  zeroLines() { // Set all lines to zero position
    for (var i = 0; i < 100; i++) {
      this.soundLines[i].css("height", "0.4em");
    }
  }

  update = () => {
    // Schedule
    this.updateScheduled = false;
    if (!this.playing) {
      this.zeroLines();
      return;
    }
    this.scheduleUpdate();

    // Update
    const sampleNumber = Math.floor((Date.now() - this.startTime + this.playedTime) / this.timeout);
    const sampleI = sampleNumber * this.sampleSize;
    for (var i = 0; i < 100; i++) {
      const v = Math.min(this.data[sampleI + i] / 100, 6) + 0.4;
      this.soundLines[i].css("height", `${v}em`);
    }
  }

  play() {
    if (this.playing || !this.loaded) {
      console.log("cant play freqs")
      return;
    }
    this.playing = true;
    this.startTime = Date.now();

    if (!this.updateScheduled) {
      this.scheduleUpdate();
    }
  }

  pause() {
    if (!this.playing)
      return;
    this.playing = false;
    this.playedTime += Date.now() - this.startTime;
  }

  seek(t: number) { // T is in seconds
    if (!this.loaded) {
      return;
    }
    this.playedTime = t * 1000; // Convert to ms
    this.startTime = Date.now();
  }

  reset() {
    this.playing = false;
    this.loaded = false;
    this.zeroLines();
  }

  async load( filename: string ) {
    if (this.playing) {
      console.log("already playng freq");
      return;
    }
    this.loaded = false;

    const a = new Uint32Array(await (await fetch(filename)).arrayBuffer());
    if (a.length == 0) {
      console.log("AAAAAAAAAAA got empty freq data")
      return;
    }

    const v = unpackVersion(a[0]);
    
    if (v.major != 1, v.minor != 0) {
      console.log("ERROR: fdp unsupported file version");
      return;
    }
    
    // Setting up data values
    this.sampleRate = a[1];
    this.sampleSize = a[2];
    this.sampleCount = a[3];
    this.maxFreq = a[4];
    this.data = a.slice(5);
    this.loaded = true;

    //console.log(v, this.sampleRate, this.sampleSize, this.sampleCount, this.maxFreq);

    // Reset time sync values
    this.playedTime = 0;
    this.timeout = 1000 / this.sampleRate;
  }
}