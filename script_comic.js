async function ComicFetch (){
    const title = document.getElementById("comic-title");
    const image = document.getElementById("comic-image");
    const date = document.getElementById("comic-date");

    const email = 'k.strelnikova@innopolis.university';
    const linkEmail = `https://fwd.innopolis.university/api/hw2?${new URLSearchParams({email})}`;

    const response = await fetch(linkEmail);
    if (response.ok){
        const id = await response.text();
        console.log(id);
        const linkId = `https://fwd.innopolis.university/api/comic?id=${id}`;
        const responseComic = await fetch(linkId);
        if (responseComic.ok){
            const comic = await responseComic.json();
            console.log(comic);
            title.textContent = comic.safe_title;
            image.src = comic.img;
            image.alt = comic.alt;
            const Comicdate = new Date(comic.year, comic.month - 1, comic.day);
            date.textContent = Comicdate.toLocaleDateString();
        }
        else{
            throw new Error('Fetching the Comic has failed(');
        }
    }else {
        throw new Error('Fetching the ID has failed(');
    }
    

}

ComicFetch();