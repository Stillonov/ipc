import React from 'react';
import styles from './App.module.css';
import Post from '../components/Post/Post';

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
    </div>
);

export default App;

