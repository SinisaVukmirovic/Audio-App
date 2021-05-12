const overlay = document.querySelector('.overlay');
const app = document.querySelector('.app');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('#progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('.title');
const cover = document.querySelector('#cover');

setTimeout(() => {
    overlay.style.transform = 'translateY(100%)';
}, 2000);

const tracks = ['last days of the alliance', 'last days of the scourge', 'night elves song', 'remnants of the horde'];
const appBg = ['cornflowerblue', 'cyan', 'greenyellow', 'burlywood'];

let trackIndex = 0;
let appBgIdx = 0;

const loadTrack = (track, bg) => {
    title.innerText = track;
    audio.src = `./audio/${track}.mp3`;
    cover.src = `./imgs/${track}.jpg`;
}

const playTrack = () => {
    app.classList.add('play', 'showApp');

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

const pauseTrack = () => {
    app.classList.remove('play');

    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play'); 
    
    audio.pause();
    
}

playBtn.addEventListener('click', () => {
    const isPlaying = app.classList.contains('play');
    // console.log(isPlaying);

    if (isPlaying) {
        pauseTrack();   
    } else {
        playTrack();
    }
});

const prevTrack = () => {
    trackIndex--;

    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }

    app.classList.remove('play', 'showApp');
    audio.pause();

    setTimeout(() => {
        app.classList.add('play',  'showApp');
        loadTrack(tracks[trackIndex]);
        playTrack();
    }, 1750);

}

const nextTrack = () => {
    trackIndex++;

    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }

    app.classList.remove('play', 'showApp');
    audio.pause();

    setTimeout(() => {
        app.classList.add('play', 'showApp');
        loadTrack(tracks[trackIndex]);
        playTrack();
    }, 1750);
}

prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;



    function fmtMSS(time) {
        return (time - (time %= 60)) / 60 + (9 < time ? ':' : ':0') + time;
    }
    
    document.querySelector('#time').innerText = fmtMSS(Math.round(duration - currentTime));
}

audio.addEventListener('timeupdate', updateProgress);

// using function since we use the THIS keyword
function setProgress(e) {
    const width = this.clientWidth;
    const clickOnX = e.offsetX;
    const duration = audio.duration;

    console.log(width, clickOnX, duration);

    audio.currentTime = (clickOnX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

// audio.addEventListener('ended', nextTrack);
audio.addEventListener('ended', () => {
    pauseTrack();

    setTimeout(() => {
        nextTrack();
    }, 2000);
});

loadTrack(tracks[trackIndex], appBg[appBgIdx]);