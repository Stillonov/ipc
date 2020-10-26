import React, { useState, useEffect } from 'react';
import { useDebouncedFn } from 'beautiful-react-hooks';
import styles from './Post.module.css';

interface IThumbnail {
    width: number,
    height: number,
    url: string,
}

const Post: React.FC = () => {
    const [url, setUrl] = useState('');
    const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);

    const getPost = useDebouncedFn(async (postUrl: string) => {
        const response = await fetch(
            `https://graph.facebook.com/v8.0/instagram_oembed?url=${postUrl}&access_token=${process.env.REACT_APP_FB_ID}|${process.env.REACT_APP_FB_ACCESS_TOKEN}`
        );

        if (response.ok) {
            const postInfo = await response.json();

            setThumbnail({
                width: postInfo.thumbnail_width,
                height: postInfo.thumbnail_height,
                url: postInfo.thumbnail_url,
            });
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

    console.log(thumbnail);

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

                {
                    thumbnail &&
                    thumbnail.width &&
                    thumbnail.height && (
                        <div className={styles.PostMeta}>
                            <p>
                                размеры фото: {thumbnail.width} x {thumbnail.height}
                            </p>
                            <p>
                                соотношение сторон фото: {(thumbnail.width / thumbnail.height).toFixed(3)}
                            </p>
                        </div>
                    )
                }
            </div>

            {
                thumbnail &&
                thumbnail.url && (
                    <img alt="" className={styles.PostThumbnail} src={thumbnail.url} />
                )
            }
        </div>
    );
};

export default Post;
