import React from 'react';

import classes from '../../stylesPages/BackgroundVideo.module.css';

const BackgroundVideo = () => {
    const videoSource = "/videos/road.mp4"
    return (
        <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                <span >Rolling Road</span>
            <h2>...Rodando con los Sueños</h2>
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo;