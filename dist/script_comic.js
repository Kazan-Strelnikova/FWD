import moment from 'moment';
class FetchIdError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FetchIdError';
    }
}
class FetchComicError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FetchComicError';
    }
}
async function ComicFetch() {
    const title = document.getElementById("comic-title");
    const image = document.getElementById("comic-image");
    const date = document.getElementById("comic-date");
    const email = 'k.strelnikova@innopolis.university';
    const linkEmail = `https://fwd.innopolis.university/api/hw2?${new URLSearchParams({ email })}`;
    try {
        const response = await fetch(linkEmail);
        if (!response.ok) {
            throw new FetchIdError('Fetching the ID has failed');
        }
        const id = await response.text();
        const linkId = `https://fwd.innopolis.university/api/comic?id=${id}`;
        const responseComic = await fetch(linkId);
        if (!responseComic.ok) {
            throw new FetchComicError('Fetching the Comic has failed');
        }
        const comic = await responseComic.json();
        title.textContent = comic.safe_title;
        image.src = comic.img;
        image.alt = comic.alt;
        const comicDate = moment(new Date(comic.year, comic.month - 1, comic.day));
        date.textContent = "Released " + comicDate.fromNow() + " ago";
    }
    catch (error) {
        if (error instanceof FetchIdError || error instanceof FetchComicError) {
            console.error(error.message);
        }
        else {
            console.error('An unexpected error occurred:', error);
        }
    }
}
ComicFetch();
