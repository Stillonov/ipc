import React, { useState } from 'react';
import { useDebouncedFn } from 'beautiful-react-hooks';
import { IPostInfo, IThumbnail } from '../../interfaces';
import styles from './Post.module.css';

const FB_ID: string = process.env.REACT_APP_FB_ID || '';
const FB_ACCESS_TOKEN: string = process.env.REACT_APP_FB_ACCESS_TOKEN || '';

const Post: React.FC = () => {
    const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
    const [error, setError] = useState(false);

    const handleChange = useDebouncedFn(
        async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
            const url = event.target.value;

            if (!url || !url.trim()) {
                setThumbnail(null);

                return;
            }

            const response: Response = await fetch(
                `https://graph.facebook.com/v11.0/instagram_oembed?url=${url}&access_token=${FB_ID}|${FB_ACCESS_TOKEN}`
            );

            if (response.ok) {
                const data = (await response.json()) as IPostInfo;

                setError(false);

                setThumbnail({
                    width: data.thumbnail_width,
                    height: data.thumbnail_height,
                    url: data.thumbnail_url,
                });
            } else {
                setError(true);
            }
        },
        300
    );

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.target.select();
    };

    return (
        <div className={styles.Post}>
            <div className={styles.PostHeader}>
                <input
                    className={`${styles.PostTextField} ${
                        error ? styles.PostTextFieldError : ''
                    }`}
                    name="url"
                    placeholder="Insert the Instagram post link"
                    onChange={handleChange}
                    onFocus={handleFocus}
                />

                {!error && thumbnail && thumbnail.width && thumbnail.height && (
                    <div className={styles.PostMeta}>
                        <p>
                            size: {thumbnail.width} x {thumbnail.height}
                        </p>
                        <p>
                            ratio:{' '}
                            {(thumbnail.width / thumbnail.height).toFixed(3)}
                        </p>
                    </div>
                )}
            </div>

            {!error && thumbnail && thumbnail.url && (
                <img
                    alt=""
                    className={styles.PostThumbnail}
                    src={thumbnail.url}
                />
            )}
        </div>
    );
};

export default Post;
