import $ from "jquery";

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

export class SoundFreqs {
  container: JQuery;
  soundLines: JQuery[];

  counter: number;
  isPlaying: boolean = false;
  data: Uint32Array;
  timeout: number;
  sampleRate: number;
  sampleSize: number;
  sampleCount: number;
  maxFreq: number;

  constructor(container: JQuery, count: number) {
    container = container;
    this.soundLines = [];
    // TEMP solution
    for (var i = 0; i < 100; i++) {
      this.soundLines.push($(`#soundLine${i}`))
    }
    for (var i = 0; i < 100; i++) {
      this.soundLines[i].css("height", "0.4em");
    }
  }

  playStep = () => {
    const start = Date.now();
    if (!this.isPlaying) {
      return;
    }
    for (var i = 0; i < 100; i++) {
      const v = Math.min(this.data[this.counter * this.sampleSize + i] / 100, 6) + 0.4;
      this.soundLines[i].css("height", `${v}em`);
    }
    this.counter++;
    window.setTimeout(this.playStep, this.timeout * 1000 - Date.now() + start);
  }

  play() {
    this.isPlaying = true;
    this.playStep();
  }

  pause() {
    this.isPlaying = false;
  }

  async startWave( filename: string ) {
    if (this.isPlaying) {
      console.log("already playng freq");
      return;
    }

    const a = new Uint32Array(await (await fetch(filename)).arrayBuffer());
    if (a.length == 0) {
      console.log("AAAAAAAAAAA got empty freq data")
      return;
    }

    const v = unpackVersion(a[0]);
    this.sampleRate = a[1];
    this.sampleSize = a[2];
    this.sampleCount = a[3];
    this.maxFreq = a[4];

    console.log(v, this.sampleRate, this.sampleSize, this.sampleCount, this.maxFreq);

    if (v.major != 1, v.minor != 0) {
      console.log("ERROR: fdp unsupported file version");
      return;
    }

    this.data = a.slice(5);
    this.counter = 0;
    this.timeout = 1 / this.sampleRate;
  }
}