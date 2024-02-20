let selectedGenre;
const songsData = {
  all: [
    "Shape Of You - Ed Sheeran",
    "All Of Me - Adele",
    "Somelike Like You - Adele",
    "Wonderwall - oasis",
    "Sugar - Maroon",
    "Locked Away - R. City",
  ],
  pop: [
    "Shape Of You - Ed Sheeran",
    "All Of Me - Adele",
    "Somelike Like You - Adele",
  ],
  rock: ["All Of Me - Adele", "Wonderwall - oasis", "Locked Away - R. CityC"],
  "hip-pop": ["Sugar - Maroon", "Locked Away - R. City"],
};

const songImageList = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjqLkI8gw017baWW1awWDHQawi51qfpq7DCA&usqp=CAU",
    songName: "Shape Of You",
    songNameWithArtist: "Shape Of You - Ed Sheeran",
    artistName: "Ed Sheeran",
    id: 0,
    song: "./Shape-Of-You.mp3",
  },
  {
    image:
      "https://content.tomplay.com/preview/2021/01/John-Legend-All-of-Me3.jpg",
    songName: "All Of Me",
    songNameWithArtist: "All Of Me - Adele",
    artistName: "Adele",
    id: 1,
    song: "./All-Of-Me.mp3",
  },
  {
    image: "https://i1.sndcdn.com/artworks-000074073161-kmgoqv-t500x500.jpg",
    songName: "Somelike Like You",
    songNameWithArtist: "Somelike Like You - Adele",
    artistName: "Adele",
    id: 2,
    song: "./track_2.mp3",
  },
  {
    image: "https://i1.sndcdn.com/artworks-000221645896-kwggra-t500x500.jpg",
    songName: "Wonderwall",
    songNameWithArtist: "Wonderwall - oasis",
    artistName: "Oasis",
    id: 3,
    song: "./track_3.mp3",
  },
  {
    image: "https://i1.sndcdn.com/artworks-000107338750-5bxgf8-t500x500.jpg",
    songName: "Sugar",
    songNameWithArtist: "Sugar - Maroon",
    artistName: "Maroon",
    id: 4,
    song: "./track_5.mp3",
  },
  {
    image:
      "https://lastfm.freetls.fastly.net/i/u/ar0/75dab8fb5cd25a73ca9770d76bf33c9f.jpg",
    songName: "Locked Away",
    songNameWithArtist: "Locked Away - R. City",
    artistName: "R. City",
    id: 5,
    song: "./track_7.mp3",
  },
];

const getGenreDropdownOptions = document.getElementById('select-genre');
Object.entries(songsData).forEach(([key,value])=>{
  const genreDropOption = document.createElement('option');
  genreDropOption.value = key
  genreDropOption.textContent = key?.charAt(0).toUpperCase() + key.substring(1)
  getGenreDropdownOptions.appendChild(genreDropOption);
})

const audioElement = document.getElementById("song-audio");
let getCurrentSongObj;
document.getElementById("flexSwitchCheckDefault").addEventListener("change", (e) => toggleTheme(e))
function toggleTheme(e) {
  e.target.checked === true ? document.getElementById("toggle-container").classList.add("toggle--dark") :document.getElementById("toggle-container").classList.remove("toggle--dark")
  console.log("theme--->", e.target.checked)
  const mainElement = document.getElementById("main");
  const checkBoxElement = document.getElementById("flexSwitchCheckDefault");
  const darkThemeElements = document.querySelectorAll(".dark-theme");
  const genreSelectElement = document.getElementById("select-genre");
  const songListItems = document.querySelectorAll(".song-list-li");

  if (checkBoxElement.checked) {
    mainElement.style.backgroundColor = "gray";
    mainElement.style.color = "#fff";
    darkThemeElements.forEach((element) => (element.style.backgroundColor = "#40708B"));
    genreSelectElement.style.backgroundColor = "#6BB8DE";
    songListItems.forEach((element) => (element.style.backgroundColor = "gray"));
    document.getElementById("playlist-searchbar").classList.add("playlist-searchbar--dark")
    document.getElementById("playlist-container-div").classList.add("playlist-container--dark")
  } else {
    mainElement.style.backgroundColor = "white";
    mainElement.style.color = "#000";
    darkThemeElements.forEach((element) => (element.style.backgroundColor = "#6BB8DE"));
    genreSelectElement.style.backgroundColor = "#4382a5";
    songListItems.forEach((element) => (element.style.backgroundColor = "#0A81BC"));
    document.getElementById("playlist-searchbar").classList.remove("playlist-searchbar--dark")
    document.getElementById("playlist-container-div").classList.remove("playlist-container--dark")

  }
}

function renderCurrentSong(value) {
  const imageElement = document.getElementById("song-image");

  audioElement.pause();

  getCurrentSongObj = songImageList.find((song) => song.songNameWithArtist === value);

  audioElement.src = getCurrentSongObj?.song;
  audioElement.load();
  audioElement.play();

  imageElement.innerHTML = "";
  const childImageElement = document.createElement("img");
  const childSongNameElement_1 = document.createElement("h2");
  const childSongArtistNameElement_1 = document.createElement("h4");

  childImageElement.src = getCurrentSongObj.image;
  childSongNameElement_1.textContent = getCurrentSongObj.songName;
  childSongArtistNameElement_1.textContent = getCurrentSongObj.artistName;

  imageElement.appendChild(childImageElement);
  imageElement.appendChild(childSongNameElement_1);
  imageElement.appendChild(childSongArtistNameElement_1);
}

function showSongs() {
  const selectedGenre = document.getElementById("select-genre").value;
  const songsListContainer = document.getElementById("songsListContainer");
  const ulElement = document.createElement("ul");

  songsListContainer.innerHTML = "";

  songsData[selectedGenre].forEach((song) => {
    const liElement = document.createElement("li");
    liElement.textContent = song;
    liElement.id = "individual-song";
    liElement.classList.add("song-list-li");
    ulElement.appendChild(liElement);
    liElement.addEventListener("click", function (e) {
      renderCurrentSong(e.target.innerHTML);
    });
  });

  ulElement.classList.add("songsList-innner-div");
  songsListContainer.appendChild(ulElement);

  if (document.getElementById("flexSwitchCheckDefault").checked) {
    ulElement.querySelectorAll(".song-list-li").forEach((element) => {
      element.style.backgroundColor = "gray";
    });
  }
}

function handlePrevNext(buttonValue) {
  debugger
  let songObj;
  if (buttonValue === "next") {
    if (getCurrentSongObj?.id === songImageList?.length - 1) {
      renderCurrentSong(getCurrentSongObj?.songNameWithArtist);
    } else {
      songObj = songImageList[getCurrentSongObj?.id + 1];
      renderCurrentSong(songObj?.songNameWithArtist);
    }
  } else {
    if (getCurrentSongObj?.id === 0) {
      renderCurrentSong("Shape Of You - Ed Sheeran");
    } else {
      songObj = songImageList[getCurrentSongObj?.id - 1];
      renderCurrentSong(songObj?.songNameWithArtist);
    }
  }
}

let playlistWiseSongs = {};
let getNewPlaylistValue;

function removeFromPlaylist(playlistName, songId) {
  playlistWiseSongs[playlistName] = playlistWiseSongs[playlistName]?.filter((song) => song.id !== songId);
  renderPlaylistSong(playlistWiseSongs, getNewPlaylistValue);
}

function renderPlaylistSong(playlistWiseSongs, getNewPlaylistValue) {
  const currentPlaylistUl = document.getElementById("current-playlist-ul");
  currentPlaylistUl.innerHTML = '';

  playlistWiseSongs[getNewPlaylistValue]?.forEach((song) => {
    const newPlaylistChildElement = document.createElement("li");
    newPlaylistChildElement.id = "current-playList-li";
    newPlaylistChildElement.classList.add("song-list-li");

    newPlaylistChildElement.addEventListener("click", function () {
      renderCurrentSong(song.songNameWithArtist);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", function () {
      removeFromPlaylist(getNewPlaylistValue, song.id);
    });

    newPlaylistChildElement.innerHTML += `${song.songNameWithArtist}`;
    newPlaylistChildElement.appendChild(removeButton);
    currentPlaylistUl.appendChild(newPlaylistChildElement);
  });

  if (document.getElementById("flexSwitchCheckDefault").checked) {
    currentPlaylistUl.querySelectorAll(".song-list-li").forEach((element) => {
      element.style.backgroundColor = "gray";
    });
  }
  
}

function addToPlaylistSong() {
  if (getNewPlaylistValue && !Boolean(playlistWiseSongs[getNewPlaylistValue]?.includes(getCurrentSongObj))) {
    playlistWiseSongs[getNewPlaylistValue]?.push(getCurrentSongObj);
    playlistWiseSongs[getNewPlaylistValue] = [...new Set(playlistWiseSongs[getNewPlaylistValue])];
    renderPlaylistSong(playlistWiseSongs, getNewPlaylistValue);
  }
}

const searchBar = document.getElementById("playlist-searchbar");
searchBar.addEventListener("keyup", (e) => {
  getNewPlaylistValue = e.target.value;
});

function createPlaylist() {
  document.getElementById("playlist-searchbar").value = '';
  const newPlaylistUl = document.getElementById("all-playlist-ul");
  const newPlayListChildElement = document.createElement("li");
  newPlayListChildElement.classList.add("song-list-li")
  newPlayListChildElement.textContent = getNewPlaylistValue;
  newPlaylistUl.appendChild(newPlayListChildElement);
  playlistWiseSongs[getNewPlaylistValue] = [];

  newPlayListChildElement.addEventListener("click", function (e) {
    const currentPlaylistUl = document.getElementById("current-playlist-ul");
    currentPlaylistUl.innerHTML = '';
    getNewPlaylistValue = e.target.innerHTML;
    renderPlaylistSong(playlistWiseSongs, getNewPlaylistValue);
  });
  if (document.getElementById("flexSwitchCheckDefault").checked) {
    newPlaylistUl.querySelectorAll(".song-list-li").forEach((element) => {
      element.style.backgroundColor = "gray";
    });
  }
}

// Initial rendering when the page loads
showSongs();
renderCurrentSong("Shape Of You - Ed Sheeran");