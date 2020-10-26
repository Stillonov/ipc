import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useDebouncedFn } from 'beautiful-react-hooks';
import styles from './Post.module.css';

function Post() {
    const [url, setUrl] = useState('');
    const [post, setPost] = useState({});

    const getPost = useDebouncedFn(async (postUrl: string) => {
        const response = await fetch(
            `https://graph.facebook.com/v8.0/instagram_oembed?url=${postUrl}&access_token=${process.env.REACT_APP_FB_ID}|${process.env.REACT_APP_FB_ACCESS_TOKEN}`
        );

        if (response.ok) {
            const postInfo = await response.json();

            setPost(postInfo);
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    }, 2000);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    useEffect(
        () => {
            if (!url || !url.trim()) {
                return;
            }

            getPost(url);
        },
        [url]
    );

    return (
        <div className={styles.Post}>
            <div className={styles.PostHeader}>
                <input
                    className={styles.PostTextField}
                    name="url"
                    placeholder="Insert the Instagram post link"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleChange}
                />

                {post && (
                    <div className={styles.PostMeta}>
                        <p>

                        </p>
                        <p>

                        </p>
                    </div>
                )}
            </div>

            {post && (
                <img alt="" className={styles.PostThumbnail} />
            )}
        </div>
    );
};

export default Post;
