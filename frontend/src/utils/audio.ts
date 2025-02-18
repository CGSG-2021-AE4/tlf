import { Howl } from "howler";

// Audio system

export interface TrackPlayerI {
  load(filename: string): void;
  play(): void;
  pause(): void;
  seek(t: number): void; // In seconds
  reset(): void;
}

export interface TrackDescriptor {
  author: string;
  name: string;
  filename: string;
  fftfilename: string;
}

export interface TrackDynamicInfo {
  duration: number;
}

interface AudioControllerI extends TrackPlayerI {
  
  // State info getters
  duration(): number;
  playing(): boolean;

  setVolume(v: number): void;
}

export class CallBacks {
  onend: () => void;
  onplay: () => void;
  onpause: () => void;
  onstop: () => void;
  onmute: () => void;
  onvolume: () => void;
}

export class AudioController implements AudioControllerI {
  sound: Howl | undefined;

  volume: number = 1;
  callbacks: CallBacks

  constructor( callbacks: CallBacks ) {
    this.callbacks = callbacks;
  }
  
  async load(filename: string): Promise<void> {
    var d = $.Deferred();
    
    if (this.sound)
      this.sound.unload();

    this.sound = new Howl({
      src: filename,
      html5: true,
      onload: () => {
        if (this.sound)
          this.sound.volume(this.volume);
        d.resolve();
      },
      onend: this.callbacks.onend,
      onplay: this.callbacks.onplay,
      onpause: this.callbacks.onpause,
      onstop: this.callbacks.onstop,
      onmute: this.callbacks.onmute,
      onvolume: this.callbacks.onvolume,
      onloaderror: (e) => {
        console.log(`Failed to load audio: ${e}`);
        d.resolve();
      },
    });
    
    // this.sound.addEventListener("canplaythrough", () => {
    //   console.log("loaaaded");
    //   if (this.sound)
    //     this.sound.volume = this.volume;
    //   d.resolve();
    //   this.sound.removeEventListener("canplaythrough", ()=>{});
    // });
    // this.sound.addEventListener("error", (e) => {
    //   console.log(`Failed to load audio: ${e}`);
    //   d.resolve();
    // });
    return d.promise();
  }
  
  reset() {
    if (this.sound) {
      this.sound.unload();
      this.sound = undefined;
    }
  }
  
  play() {
    if (this.sound)
      this.sound.play();
  }

  pause() {
    if (this.sound)
      this.sound.pause();
  }

  seek(t: number) {
    if (this.sound)
      this.sound.seek(t);
  }
  
  // Dynamic track info or "undefined" if track is not set
  duration(): number {
    if (this.sound)
      return this.sound.duration();
    return 1;
  }

  // Is track playing now
  playing(): boolean {
    if (this.sound)
      return this.sound.playing();
    return false;
  }
  
  setVolume(v: number) {
    this.volume = v;
    if (this.sound)
      this.sound.volume(v);
  }
}