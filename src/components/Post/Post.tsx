import React, { useState, useEffect } from 'react';
import { useDebouncedFn } from 'beautiful-react-hooks';
import { IPostInfo, IThumbnail } from '../../interfaces';
import styles from './Post.module.css';

const getPost = async (postUrl: string) => {
    const response = await fetch(
        `https://graph.facebook.com/v8.0/instagram_oembed?url=${postUrl}&access_token=${process.env.REACT_APP_FB_ID}|${process.env.REACT_APP_FB_ACCESS_TOKEN}`
    );

    if (response.ok) {
        return await response.json();
    } else {
        console.log(`Ошибка HTTP: ${response.status}`);
    }
};

const Post: React.FC = () => {
    const [url, setUrl] = useState('');
    const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
    const [error, setError] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    useEffect(
        () => {
            if (!url || !url.trim()) {
                return;
            }

            getPost(url)
                .then((postInfo:IPostInfo) => {
                    setError(false);

                    setThumbnail({
                        width: postInfo.thumbnail_width,
                        height: postInfo.thumbnail_height,
                        url: postInfo.thumbnail_url,
                    });
                })
                .catch(() => {
                    setError(true);
                });
        },
        [url]
    );

    return (
        <div className={styles.Post}>
            <div className={styles.PostHeader}>
                <input
                    className={`${styles.PostTextField} ${(error) ? styles.PostTextFieldError : ''}`}
                    name="url"
                    placeholder="Insert the Instagram post link"
                    value={url}
                    onChange={handleChange}
                />

                {
                    !error &&
                    thumbnail &&
                    thumbnail.width &&
                    thumbnail.height && (
                        <div className={styles.PostMeta}>
                            <p>
                                size: {thumbnail.width} x {thumbnail.height}
                            </p>
                            <p>
                                ratio: {(thumbnail.width / thumbnail.height).toFixed(3)}
                            </p>
                        </div>
                    )
                }
            </div>

            {
                !error &&
                thumbnail &&
                thumbnail.url && (
                    <img alt="" className={styles.PostThumbnail} src={thumbnail.url} />
                )
            }
        </div>
    );
};

export default Post;
