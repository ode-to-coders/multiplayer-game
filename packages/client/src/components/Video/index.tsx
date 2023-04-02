import styles from './index.module.scss';

function Video() {
  return (
    <div className={styles.video}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/fO0C3kmzG2w" 
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

export default Video;
