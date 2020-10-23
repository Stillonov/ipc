import React, { useState } from "react";
import "./Instapost.css";
import InstagramEmbed from "react-instagram-embed";

export default function Instapost() {
  const [url, setUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [thumbnailSize, setThumbnailSize] = useState({ width: 0, height: 0 });
  const visibleClass = isVisible ? "instapost__embed--visible" : "";
  const hasErrorClass = hasError ? "instapost__textfield--error" : "";

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  if (isVisible && (!url || !url.trim())) {
    setIsVisible(false);
  }

  if (hasError && (!url || !url.trim())) {
    setHasError(false);
  }

  const getRatio = () =>
    (thumbnailSize.width / thumbnailSize.height).toFixed(3);

  return (
    <div className="instapost">
      <div className="instapost__header">
        <input
          className={`instapost__textfield ${hasErrorClass}`}
          placeholder="Вставьте ссылку на пост в Instagram"
          onChange={handleChange}
          onBlur={handleChange}
          value={url}
        />
        {isVisible && (
          <div className="instapost__meta">
            <p>
              размеры фото: {thumbnailSize.width} x {thumbnailSize.height}
            </p>
            <p>соотношение сторон фото: {getRatio()}</p>
          </div>
        )}
      </div>

      {url && (
        <InstagramEmbed
          className={`instapost__embed ${visibleClass}`}
          url={url}
          maxWidth={388}
          hideCaption={true}
          containerTagName="div"
          protocol=""
          injectScript
          onSuccess={(element) => {
            setHasError(false);
            setThumbnailSize({
              width: element.thumbnail_width,
              height: element.thumbnail_height
            });
          }}
          onAfterRender={() => {
            setIsVisible(true);
          }}
          onFailure={() => {
            setIsVisible(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}
