import React, { useState } from 'react';
import { useDebouncedFn } from 'beautiful-react-hooks';
import { IPostInfo, IThumbnail } from '../../interfaces';
import styles from './Post.module.css';

const FB_ID: string = process.env.REACT_APP_FB_ID || '';
const FB_ACCESS_TOKEN: string = process.env.REACT_APP_FB_ACCESS_TOKEN || '';

// const getPost = async (postUrl: string): Promise<IPostInfo> => {
//     const response = await fetch(
//         `https://graph.facebook.com/v8.0/instagram_oembed?url=${postUrl}&access_token=${FB_ID}|${FB_ACCESS_TOKEN}`
//     );
//
//     if (response.ok) {
//         return (await response.json()) as IPostInfo;
//     } else {
//         console.log(`Ошибка HTTP: ${response.status}`);
//     }
// };

function api<T>(url: string): Promise<T> {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json<T>();
    });
}

api<{ title: string; message: string }>('v1/posts/1')
    .then(({ title, message }) => {
        console.log(title, message);
    })
    .catch((error) => {
        /* show error message */
    });

const Post: React.FC = () => {
    const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
    const [error, setError] = useState(false);

    const handleChange = useDebouncedFn(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const url = event.target.value;

            if (!url || !url.trim()) {
                setThumbnail(null);

                return;
            }

            getPost(url)
                .then((postInfo) => {
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
        300
    );

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
