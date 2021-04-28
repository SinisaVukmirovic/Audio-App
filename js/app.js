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
}

const pauseTrack = () => {
    app.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');    
}

playBtn.addEventListener('click', () => {
    const isPlaying = app.classList.contains('.play');

    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

loadTrack(tracks[trackIndex]);