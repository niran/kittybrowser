import React from 'react';
import styles from './LoadingIndicator.module.scss';

export default function({ text }) {
    return (
        <div className={styles.loading}>
            {!!text && <h1>{text}</h1>}
            <img src="https://www.cryptokitties.co/images/loader.gif" width="120" alt="loading" />
        </div>
    );
}
