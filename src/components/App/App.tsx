import React from 'react';
import styles from './App.module.css';
import Post from '../Post/Post';

const App: React.FC = () => (
    <div className={styles.App}>
        <div className={styles.AppHeader}>
            <h1>Instagram. Posts&nbsp;Comparing</h1>
        </div>

        <div className={styles.AppPosts}>
            <Post />
            <Post />
            <Post />
        </div>

        <a
            style={{ fontSize: '10px' }}
            href="https://docs.google.com/document/d/1KrqDaQNU9ZvoT88afqbMWC-XwDl_h9jN7L1DVVlI2oU/edit?usp=sharing"
        >
            Privacy Policy
        </a>
    </div>
);

export default App;
