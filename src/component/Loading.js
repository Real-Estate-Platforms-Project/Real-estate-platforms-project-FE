import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import lottieLoading from '../lottie/loading.json';
import styles from '../css/Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.loadingContainer}>
                <Player
                    autoplay
                    loop
                    src={lottieLoading}
                    className={styles.lottie}
                />
            </div>
        </div>
    );
};

export default Loading;
