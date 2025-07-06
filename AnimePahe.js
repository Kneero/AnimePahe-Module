
const base = 'https://animepahe.com';

async function search(query) {
    const res = await fetch(`https://animepahe.com/api?m=search&q=${encodeURIComponent(query)}`);
    const json = await res.json();

    return json.data.map(anime => ({
        id: anime.session,
        title: anime.title,
        poster: anime.poster,
        url: `${anime.session}|meta`,
        type: 'anime'
    }));
}

async function detail(url) {
    const [session] = url.split("|");

    const res = await fetch(`https://animepahe.com/api?m=release&id=${session}&sort=episode_asc`);
    const json = await res.json();

    return {
        title: 'AnimePahe Series',
        episodes: json.data.map(ep => ({
            id: `${session}|${ep.session}`,
            title: `Episode ${ep.episode}`,
            url: `${session}|${ep.session}`
        }))
    };
}

async function stream(url) {
    const [animeSession, epSession] = url.split("|");
    const page = await fetch(`https://animepahe.com/play/${animeSession}/${epSession}`).then(r => r.text());

    const videoMatch = page.match(/var\s+video\s*=\s*({.*?});/);
    if (!videoMatch) return [];

    const videoData = JSON.parse(videoMatch[1]);
    const sources = [];

    for (const [quality, obj] of Object.entries(videoData)) {
        if (obj && obj.url && obj.url.endsWith('.m3u8')) {
            sources.push({
                url: obj.url,
                quality,
                type: 'hls'
            });
        }
    }

    return sources;
}

export default {
    search,
    detail,
    stream
};
