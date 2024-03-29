    import React from "react";

    export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track);
    }

    return (
        <div
        className="d-flex m-2 align-items-center"
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
        >
        <img src={track.albumUrl} height={64} width={64} alt="Album cover" />
        <div className="ml-3">
            <div>{track.title}</div>
            <div className="text-muted">{track.artist}</div>
        </div>
        </div>
    );
    }