# Drum-Kit
A browser-based drum pad that plays sound when you click the buttons or press the matching keyboard keys.

## What this project does
- Plays drum sounds for the keys: `w`, `a`, `s`, `d`, `j`, `k`, `l`
- Lets you adjust the drum volume with a slider
- Lets you record a drum sequence and play it back
- Includes controls to record, stop, play, and clear recorded clips

## How to use
1. Open `index.html` in a web browser.
2. Click any drum button or press the keys `w`, `a`, `s`, `d`, `j`, `k`, `l` to play sounds.
3. Use the volume slider to change playback volume.
4. Press `Record` to start recording your drum hits.
5. Press `Stop` to finish recording.
6. Press `Play` to hear the recorded sequence.
7. Press `Clear` to erase the current recording.

## Run locally
- Option 1: Open `index.html` directly in your browser.
- Option 2: Run a simple local server for best audio and file-loading behavior.

### Using Python
- Python 3: `python3 -m http.server 8000`
- Then open `http://localhost:8000` in your browser.

### Using Node.js
- If you have Node installed: `npx http-server .`
- Then open the printed local URL in your browser.

> Note: A local server is recommended if the browser blocks sound or asset loading from local files.

## Files
- `index.html` — page structure and controls
- `styles.css` — visual styling and layout
- `index.js` — sound playback, volume control, and recording logic
- `sounds/` — drum sound files
- `images/` — optional button artwork

## Notes
- The recording only captures the order and timing of drum hits.
- The volume slider affects both live playing and playback.
