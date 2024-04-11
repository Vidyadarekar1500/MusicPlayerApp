let selectedGenre;
let songsData = {};
let songImageList = [];
// Fetch the JSON file using fetch method
fetch("constants.json")
  .then((response) => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the JSON data
    return response.json();
  })
  .then((data) => {
    // Store the parsed data in the variable
    jsonData = data;
    songsData = data.songsData;
    songImageList = data.songImageList;

    //moving inital rendering of songs inside then() block, because the fetching of the JSON data is asynchronous, meaning that the rest of the code continues to execute while the fetch operation is ongoing
    const getGenreDropdownOptions = document.getElementById("select-genre");
    Object.entries(songsData).forEach(([key, value]) => {
      const genreDropOption = document.createElement("option");
      genreDropOption.value = key;
      genreDropOption.textContent =
        key?.charAt(0).toUpperCase() + key.substring(1);
      getGenreDropdownOptions.appendChild(genreDropOption);
    });

    showSongs();
    renderCurrentSong("Shape Of You - Ed Sheeran");

  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

const audioElement = document.getElementById("song-audio");
let getCurrentSongObj;
document
  .getElementById("flexSwitchCheckDefault")
  .addEventListener("change", (e) => toggleTheme(e));
function toggleTheme(e) {
  e.target.checked === true
    ? document.getElementById("toggle-container").classList.add("toggle--dark")
    : document
        .getElementById("toggle-container")
        .classList.remove("toggle--dark");
  console.log("theme--->", e.target.checked);
  const mainElement = document.getElementById("main");
  const checkBoxElement = document.getElementById("flexSwitchCheckDefault");
  const darkThemeElements = document.querySelectorAll(".dark-theme");
  const genreSelectElement = document.getElementById("select-genre");
  const songListItems = document.querySelectorAll(".song-list-li");

  if (checkBoxElement.checked) {
    mainElement.style.backgroundColor = "gray";
    mainElement.style.color = "#fff";
    darkThemeElements.forEach(
      (element) => (element.style.backgroundColor = "#40708B")
    );
    genreSelectElement.style.backgroundColor = "#6BB8DE";
    songListItems.forEach(
      (element) => (element.style.backgroundColor = "gray")
    );
    document
      .getElementById("playlist-searchbar")
      .classList.add("playlist-searchbar--dark");
    document
      .getElementById("playlist-container-div")
      .classList.add("playlist-container--dark");
  } else {
    mainElement.style.backgroundColor = "white";
    mainElement.style.color = "#000";
    darkThemeElements.forEach(
      (element) => (element.style.backgroundColor = "#6BB8DE")
    );
    genreSelectElement.style.backgroundColor = "#4382a5";
    songListItems.forEach(
      (element) => (element.style.backgroundColor = "#0A81BC")
    );
    document
      .getElementById("playlist-searchbar")
      .classList.remove("playlist-searchbar--dark");
    document
      .getElementById("playlist-container-div")
      .classList.remove("playlist-container--dark");
  }
}

function renderCurrentSong(value) {
  const imageElement = document.getElementById("song-image");

  audioElement.pause();

  getCurrentSongObj = songImageList.find(
    (song) => song.songNameWithArtist === value
  );

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
  debugger;
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
  playlistWiseSongs[playlistName] = playlistWiseSongs[playlistName]?.filter(
    (song) => song.id !== songId
  );
  renderPlaylistSong(playlistWiseSongs, getNewPlaylistValue);
}

function renderPlaylistSong(playlistWiseSongs, getNewPlaylistValue) {
  const currentPlaylistUl = document.getElementById("current-playlist-ul");
  currentPlaylistUl.innerHTML = "";

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
  if (
    getNewPlaylistValue &&
    !Boolean(
      playlistWiseSongs[getNewPlaylistValue]?.includes(getCurrentSongObj)
    )
  ) {
    playlistWiseSongs[getNewPlaylistValue]?.push(getCurrentSongObj);
    playlistWiseSongs[getNewPlaylistValue] = [
      ...new Set(playlistWiseSongs[getNewPlaylistValue]),
    ];
    renderPlaylistSong(playlistWiseSongs, getNewPlaylistValue);
  }
}

const searchBar = document.getElementById("playlist-searchbar");
searchBar.addEventListener("keyup", (e) => {
  getNewPlaylistValue = e.target.value;
});

function createPlaylist() {
  document.getElementById("playlist-searchbar").value = "";
  const newPlaylistUl = document.getElementById("all-playlist-ul");
  const newPlayListChildElement = document.createElement("li");
  newPlayListChildElement.classList.add("song-list-li");
  newPlayListChildElement.textContent = getNewPlaylistValue;
  newPlaylistUl.appendChild(newPlayListChildElement);
  playlistWiseSongs[getNewPlaylistValue] = [];

  newPlayListChildElement.addEventListener("click", function (e) {
    const currentPlaylistUl = document.getElementById("current-playlist-ul");
    currentPlaylistUl.innerHTML = "";
    getNewPlaylistValue = e.target.innerHTML;
    renderPlaylistSong(playlistWiseSongs, getNewPlaylistValue);
  });
  if (document.getElementById("flexSwitchCheckDefault").checked) {
    newPlaylistUl.querySelectorAll(".song-list-li").forEach((element) => {
      element.style.backgroundColor = "gray";
    });
  }
}
const searchSongsDropdownContainer = document.createElement("ul");
searchSongsDropdownContainer.id = "searchFieldOutputSelect";
const searchSongsContainer = document.getElementById("searchSongsContainer"); //searchSongsContainer
let searchString = "";

function displayMatchingSongsList(searchString, tempArray) {
  searchSongsDropdownContainer.innerHTML = "";

  if (tempArray.length === 0) {
    const searchSongsDropdownOptions = document.createElement("li");
    searchSongsDropdownOptions.className = "matchingSongsList";
    searchSongsDropdownOptions.id = "matchingSong";
    searchSongsDropdownOptions.textContent = "No songs found";
    searchSongsContainer.appendChild(searchSongsDropdownContainer);
    searchSongsDropdownContainer.appendChild(searchSongsDropdownOptions);
  }
  tempArray.forEach((song) => {
    const searchSongsDropdownOptions = document.createElement("li");
    searchSongsDropdownOptions.className = "matchingSongsList";
    searchSongsDropdownOptions.id = "matchingSong";
    searchSongsDropdownOptions.textContent = song;

    searchSongsDropdownOptions.addEventListener("click", (e) => {
      renderCurrentSong(e.target.textContent);
    });
    searchSongsContainer.appendChild(searchSongsDropdownContainer);
    searchSongsDropdownContainer.appendChild(searchSongsDropdownOptions);
  });
}

//search songs functionality starts here
function onSearchClick() {
  let tempArray = [];

  const getMatchingValues = Object.keys(songsData)
    .map((key) => songsData[key])
    .flat();
  //this will return us an array with all songs
  getMatchingValues.forEach((song) => {
    if (searchString?.length > 0 && song.toLowerCase().includes(searchString)) {
      tempArray.push(song);
    }
  });
  if (searchString?.length) {
    displayMatchingSongsList(searchString, Array.from(new Set(tempArray)));
  } else {
    tempArray = [];
    searchSongsDropdownContainer.innerHTML = "";
  }
}

function searchSongs() {
  console.log("searchString", searchString?.length);

  if (
    searchString?.length === 0 &&
    searchSongsContainer.contains(searchSongsDropdownContainer)
  ) {
    searchSongsContainer.removeChild(searchSongsDropdownContainer);
  }
  const searchBar = document.getElementById("searchBoxInput");
  searchBar.addEventListener("keyup", (e) => {
    searchString = e.target.value;
  });
}
//search songs functionality - end

// Initial rendering when the page loads
// showSongs();
// renderCurrentSong("Shape Of You - Ed Sheeran");

/* Todo - 
1) refactor the above code and optimize it using codium
2) add comments to understand the flow
3) make detailed doc to keep it handy for future
*/
