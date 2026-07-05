var currentVolume = 1;
var volumeSlider = document.getElementById("volumeSlider");
var volumeLabel = document.getElementById("volumeLabel");
var recordBtn = document.getElementById("recordBtn");
var playBtn = document.getElementById("playBtn");
var stopBtn = document.getElementById("stopBtn");
var clearBtn = document.getElementById("clearBtn");
var recordingStatus = document.getElementById("recordingStatus");

var isRecording = false;
var recordedSequence = [];
var recordStartTime = 0;
var playbackTimeouts = [];
var isPlaying = false;

volumeSlider.addEventListener("input", function() {
    currentVolume = parseFloat(this.value);
    volumeLabel.textContent = Math.round(currentVolume * 100) + "%";
});

recordBtn.addEventListener("click", function() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
});

playBtn.addEventListener("click", function() {
    playRecording();
});

stopBtn.addEventListener("click", function() {
    stopPlayback();
});

clearBtn.addEventListener("click", function() {
    if (isPlaying) {
        stopPlayback();
    }
    recordedSequence = [];
    updateRecordingStatus();
    playBtn.disabled = true;
    clearBtn.disabled = true;
});

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        var innerHTMLbutton = this.innerHTML;
        makeSound(innerHTMLbutton);
        buttonAnimation(innerHTMLbutton);
    });
}

document.addEventListener("keydown", function (event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key, isPlayback) {
    if (!isPlayback) {
        recordDrum(key);
    }

    var audio;
    switch (key) {
        case "w":
            audio = new Audio('sounds/crash.mp3');
            break;

        case "a":
            audio = new Audio('sounds/kick-bass.mp3');
            break;

        case "s":
            audio = new Audio('sounds/snare.mp3');
            break;

        case "d":
            audio = new Audio('sounds/tom-1.mp3');
            break;

        case "j":
            audio = new Audio('sounds/tom-2.mp3');
            break;

        case "k":
            audio = new Audio('sounds/tom-3.mp3');
            break;

        case "l":
            audio = new Audio('sounds/tom-4.mp3');
            break;

        default:
            return;
    }

    audio.volume = currentVolume;
    audio.play();
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    if (!activeButton) {
        return;
    }
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100);
}

function startRecording() {
    isRecording = true;
    recordedSequence = [];
    recordStartTime = Date.now();
    recordBtn.textContent = "⏹ Stop";
    recordBtn.classList.add("recording");
    playBtn.disabled = true;
    stopBtn.disabled = true; // disable the yellow stop button while recording
    clearBtn.disabled = true;
    recordingStatus.textContent = "Recording...";
}

function stopRecording() {
    isRecording = false;
    recordBtn.textContent = "● Record";
    recordBtn.classList.remove("recording");
    stopBtn.disabled = true;
    clearBtn.disabled = recordedSequence.length === 0;
    playBtn.disabled = recordedSequence.length === 0;
    recordingStatus.textContent = recordedSequence.length > 0 ? "Recorded " + recordedSequence.length + " beats" : "Ready";
}

function updateRecordingStatus() {
    recordingStatus.textContent = recordedSequence.length > 0 ? "Recorded " + recordedSequence.length + " beats" : "Ready";
}

function recordDrum(key) {
    if (!isRecording) {
        return;
    }
    recordedSequence.push({ key: key, time: Date.now() - recordStartTime });
}

function playRecording() {
    if (isPlaying || recordedSequence.length === 0) {
        return;
    }

    isPlaying = true;
    playBtn.disabled = true;
    recordBtn.disabled = true;
    stopBtn.disabled = false;
    clearBtn.disabled = true;
    recordingStatus.textContent = "Playing...";

    var maxTime = 0;
    recordedSequence.forEach(function(item) {
        var timeoutId = setTimeout(function() {
            makeSound(item.key, true);
            buttonAnimation(item.key);
        }, item.time);
        playbackTimeouts.push(timeoutId);
        if (item.time > maxTime) {
            maxTime = item.time;
        }
    });

    var finishTimeout = setTimeout(function() {
        stopPlayback();
    }, maxTime + 200);
    playbackTimeouts.push(finishTimeout);
}

function stopPlayback() {
    if (!isPlaying) {
        return;
    }
    playbackTimeouts.forEach(function(timeoutId) {
        clearTimeout(timeoutId);
    });
    playbackTimeouts = [];
    isPlaying = false;
    recordBtn.disabled = false;
    playBtn.disabled = recordedSequence.length === 0;
    stopBtn.disabled = true;
    clearBtn.disabled = recordedSequence.length === 0;
    recordingStatus.textContent = recordedSequence.length > 0 ? "Recorded " + recordedSequence.length + " beats" : "Ready";
}