// @ts-nocheck
import { writable } from 'svelte/store';

export const limitString = (str, limit) => {
    if (str.length > limit) {
        return str.slice(0, limit) + '...';
    } else {
        return str;
    }
};

export const converter = (value) => {
    let val = Math.round(value);
    const h = Math.floor(val / 3600);
    const m = Math.floor((val % 3600) / 60);
    const s = Math.floor((val % 3600) % 60);
    const hours = h > 0 ? h + ":" : "";
    const minutes = m > 0 ? (m < 10 ? "0" + m : m) + ":" : "00:";
    const seconds = s > 0 ? (s < 10 ? "0" + s : s) : "00";
    return hours + minutes + seconds;
}

export const fetchSong = async (songID) => {
    let data = await fetch(`https://saavn.me/songs?id=${songID}`);
    let parsedData = await data.json();
    playerData.set(parsedData);
    playState.set(true)
}
  

export const resultsStore = writable([]);
export const searchStore = writable([]);
export const searchResultStore = writable([]);
export const playerData = writable([]);

export const playState = writable(false);
export const seekbar = writable(null);
export const audio = writable(null);
export const currentDuration = writable(null);
export const playPause = writable(null);
export const playPauseIcon = writable(null);
export const pause = writable(null);
export const playButton = writable(null);