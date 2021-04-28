const app = document.querySelector('.app');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('.title');
const cover = document.querySelector('#cover');

const tracks = ['last days of the alliance', 'last days of the scourge', 'night elves song', 'remnants of the horde'];

let trackIndex = 1;

const loadTrack = (track) => {
    title.innerText = track;
    audio.src = `./audio/${track}.mp3`;
    cover.src = `./imgs/${track}.jpg`;
}

const playTrack = () => {
    app.classList.add('play');

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
    console.log(isPlaying);

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

    loadTrack(tracks[trackIndex]);

    playTrack();
}

const nextTrack = () => {
    trackIndex++;

    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }

    loadTrack(tracks[trackIndex]);

    playTrack();
}

prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
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

loadTrack(tracks[trackIndex]);