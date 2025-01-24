# Overview
Simple cozy LoFi online player.

**Backend** - simple server with index file and static folder. Also has API for playlist generation.
Supported requests:
- `api/getRand?limit=<int>` returns playlist with random tracks with `limit` length.

**Frontend** - one html with page simulation.
# Frontend Architecture
There are global systems such as:
- Pages - manages visible pages, history state.
- Background - manages background (image or colors), smooth transitions between them.
- Player - responsible for playing audio, organizing playlist, visualizing frequencies indicator.
- Config - manages global variables, such as settings or global state, synchronize them with cookies.
# Utility
Self written supportive scripts.
## HTML bundler
There is dynamic and static version. Scans the document and recursively load all `<load/>` tags.

## Frequency converter
Some python scripts that convert sound to frequency plot. Output data is saved to *\*.fdp* file.
### FDP file structure specification

Stands for **frequency dynamic progression** - cool name for file extension. Contains frequency plots.

**Global header:** every file's first 4 bytes - file format version (lower three byte in major | minor| patch format).
Further info describes file structure after global header and info by versions:
#### v1.0.0

``` title="file structure"
4 bytes - uint32 format version
4 bytes - uint32 sample rate
4 bytes - uint32 sample size
4 bytes - uint32 samples count
4 bytes - uint32 max frequency
... - uint32[] of values
```

# Style description
Primary is minimalistic. There is accent color that is used as text color and as highlight color. Accents also are made by blurring background. 
# Settings
Settings are stored in global variable **config**. Config can be modified only in settings. Possible values:
### Appearance
- Sound indicator
	- None
	- Freq wave
	- Freq dots
	- **Optional** Circle
- Audio controls visibility
	- Always show
	- Show on hover
	- Show on mouse activity
- Track timeline in passive mode
	- Show
	- Hide
### Theme
- Accent color
- Background
	- Slideshow
	- Static image
	- Just color
	- **Optional** Color gradient
# Deploy
## Build command
`cd frontend; npm i .; mkdir dist; node esbuild.js; cd ..; go get .; go build -o ./tlf.exe ./cmd/`
## Start command
`./tlf.exe --domain 0.0.0.0:80 --track-store-file <json with tracks>`

# Packages
- **JQuery**
- **js-cookie**
- **node-html-parser**
