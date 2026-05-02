const songs = [
    {
        id: 1,
        title: "Lofi Study",
        artist: "FASSounds",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Chill Vibes",
        artist: "Chillhop",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Deep Focus",
        artist: "Ambient",
        cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        title: "Night Drive",
        artist: "Synthwave",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        title: "Morning Coffee",
        artist: "Acoustic",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id: 6,
        title: "Rainy Days",
        artist: "Jazz",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
];

// DOM Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const coverImg = document.getElementById('cover-img');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

const playlistGrid = document.getElementById('playlist-grid');
const spotifyPlaylists = document.getElementById('spotify-playlists');

let songIndex = 0;
let isPlaying = false;

// Render songs to UI
function renderSongs() {
    playlistGrid.innerHTML = '';
    spotifyPlaylists.innerHTML = '';
    
    songs.forEach((song, index) => {
        const cardHTML = `
            <div class="music-card" onclick="playSongAt(${index})">
                <img src="${song.cover}" alt="${song.title}">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <div class="play-hover-btn">
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>
        `;
        
        // Add to both grids just for demonstration
        if (index < 4) {
            playlistGrid.innerHTML += cardHTML;
        }
        if (index > 1) {
            spotifyPlaylists.innerHTML += cardHTML;
        }
    });
}

// Load song details into player
function loadSong(song) {
    trackTitle.innerText = song.title;
    trackArtist.innerText = song.artist;
    coverImg.src = song.cover;
    audio.src = song.src;
}

// Play song function called from UI cards
window.playSongAt = function(index) {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
};

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    if(isPlaying) playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    if(isPlaying) playSong();
}

// Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    
    if (isNaN(duration)) return;
    
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    progressContainer.style.setProperty('--progress-width', `${progressPercent}%`);
    
    // Format Time
    const currentMins = Math.floor(currentTime / 60);
    const currentSecs = Math.floor(currentTime % 60);
    currentTimeEl.innerText = `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs}`;
    
    const durMins = Math.floor(duration / 60);
    const durSecs = Math.floor(duration % 60);
    if(durMins && durSecs) {
        durationEl.innerText = `${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`;
    }
}

// Set Progress Bar when clicked
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Initialize
renderSongs();
loadSong(songs[songIndex]);
