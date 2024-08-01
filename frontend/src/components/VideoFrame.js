import React from 'react';

const VideoFrame = ({ videoId }) => (
    <div className="video-container">
        <iframe
            width='650'
            height='366'
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
        ></iframe>
    </div>
);

export default VideoFrame;
