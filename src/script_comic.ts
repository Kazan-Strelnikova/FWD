import moment from '../node_modules/moment';


class FetchIdError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FetchIdError';
    }
}

class FetchComicError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FetchComicError';
    }
}

interface Comic {
    safe_title: string;
    img: string;
    alt: string;
    year: number;
    month: number;
    day: number;
}

async function ComicFetch() {
    const title = document.getElementById("comic-title") as HTMLHeadingElement;
    const image = document.getElementById("comic-image") as HTMLImageElement;
    const date = document.getElementById("comic-date") as HTMLHeadingElement;
    const released = document.getElementById("comic-released") as HTMLParagraphElement;

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

        const comic: Comic = await responseComic.json();
        title.textContent = comic.safe_title;
        image.src = comic.img;
        image.alt = comic.alt;
        const ComicDate = new Date(comic.year, comic.month - 1, comic.day);
        date.textContent = ComicDate.toLocaleDateString();
        const comicDateMoment = moment(ComicDate);
        released.textContent = "Released " + comicDateMoment.fromNow();

    } catch (error) {
        if (error instanceof FetchIdError || error instanceof FetchComicError) {
            console.error(error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}

ComicFetch();