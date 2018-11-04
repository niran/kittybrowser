import React from 'react';
import styles from './LoadingIndicator.module.scss';

export default function() {
    return (
        <div className={styles.loading}>
            <div className={styles.inner}>
                <img src="https://www.cryptokitties.co/images/loader.gif" width="120" alt="loading" />
            </div>
        </div>
    );
}
