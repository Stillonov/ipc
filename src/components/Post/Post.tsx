import React, { useState, useEffect, SyntheticEvent } from 'react';
import styles from './Post.module.css';
// import { useThrottledFn } from 'beautiful-react-hooks';
// import InstagramEmbed from 'react-instagram-embed';

function Post() {
    const [url, setUrl] = useState('');
    const [post, setPost] = useState({});

    const getPost = async (postUrl: string) => {
        const access_token = '722246511978459|87a7cd3f13b5d943b63456262f0074e3';
        const response = await fetch(
            `https://graph.facebook.com/v8.0/instagram_oembed?url=${postUrl}&access_token=${access_token}`
        );

        if (response.ok) {
            const postInfo = await response.json();

            setPost(postInfo);
        } else {
            console.log(`Ошибка HTTP: ${response.status}`);
        }
    };

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
                            size: {post.thumbnail_width} x {post.thumbnail_height}
                        </p>
                        <p>
                            ratio: {(post.thumbnail_width / post.thumbnail_height).toFixed(3)}
                        </p>
                    </div>
                )}
            </div>

            {post && (
                <img alt="" className={styles.PostThumbnail} src={post.thumbnail_url} />
            )}
        </div>
    );
};

export default Post;
