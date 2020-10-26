import React from 'react';
import styles from './App.module.css';
import Post from '../components/Post/Post';

function App() {
  return (
    <div className={styles.App}>
        <div className={styles.AppHeader}>
            <h1>Instagram. Post&nbsp;Comparing</h1>
        </div>

        <div className={styles.AppPosts}>
            <Post />
            <Post />
            <Post />
        </div>
    </div>
  );
}

export default App;

