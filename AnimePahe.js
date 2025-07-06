
(async () => {
    const preferredQualities = moduleConfig.preferredQualities || ["480p", "360p"];

    async function searchAnime(keyword) {
        const response = await fetch(`https://animepahe.com/api?m=search&q=${encodeURIComponent(keyword)}`);
        const json = await response.json();
        return json.data.map(anime => ({
            id: anime.session,
            title: anime.title,
            year: anime.year,
            type: anime.type,
            poster: anime.poster
        }));
    }

    async function getEpisodes(animeId) {
        const response = await fetch(`https://animepahe.com/api?m=release&id=${animeId}&sort=episode_asc`);
        const json = await response.json();
        return json.data.map(ep => ({
            episodeId: ep.session,
            episode: ep.episode,
            title: ep.title,
            created_at: ep.created_at
        }));
    }

    async function getStreamAndSubtitle(animeSessionId, episodeSessionId) {
        const playPageUrl = `https://animepahe.com/play/${animeSessionId}/${episodeSessionId}`;
        const html = await (await fetch(playPageUrl)).text();

        const videoMatch = html.match(/var\s+video\s*=\s*({.*?});/);
        if (!videoMatch) return null;

        const videoData = JSON.parse(videoMatch[1]);

        let streamUrl = null;
        for (let quality of preferredQualities) {
            if (videoData[quality] && videoData[quality].url) {
                streamUrl = videoData[quality].url;
                break;
            }
        }

        let subtitleUrl = null;
        if (videoData.sub && Array.isArray(videoData.sub)) {
            const subtitle = videoData.sub.find(sub => sub.url.endsWith(".vtt") || sub.url.endsWith(".srt"));
            if (subtitle) {
                subtitleUrl = subtitle.url;
            }
        }

        return {
            streamUrl,
            subtitleUrl
        };
    }

    window.SoraAnimePahe = {
        search: async (keyword) => await searchAnime(keyword),
        episodes: async (animeId) => await getEpisodes(animeId),
        stream: async (animeSessionId, episodeSessionId) => await getStreamAndSubtitle(animeSessionId, episodeSessionId)
    };
})();
