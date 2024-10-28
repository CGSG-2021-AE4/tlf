Simple cozy LoFi online radio.

**Backend** - simple server with index file and static folder.
**Frontend** - one html with page simulation.
# Architecture
There are global systems such as:
- Pages - manages visible pages, history state
- Background - manages background (image or colors), smooth transitions between them
- Audio - plays tracks
- Config - manages global variables, such as settings or global state, synchronize them with cookies
# Utility
#### HTML bundler
There is dynamic and static version. Scans the document and recursively load all `<load/>` tags.
# Packages
- **JQuery**
- **js-cookie**
- **node-html-parser**
# Settings
Settings are stored in global variable **config**. Config can be modified only in settings.
### Appearance
- Sound indicator
	- None
	- Freq wave
	- Freq dots
	- **Optional** Circle
### Theme
- Accent color
- Background
	- Slideshow
	- Static image
	- Just color
	- **Optional** Color gradient