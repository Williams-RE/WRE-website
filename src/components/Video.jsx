import { useEffect, useRef, Suspense } from "react";
import "./Video.css";

const Video = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log("Auto-play failed, user interaction might be needed");
      });
    }
  }, []);

  return (
    <div className="video-background">
      <Suspense fallback={<div>Loading...</div>}>
        <video ref={videoRef} muted autoPlay loop playsInline>
          <source
            src="https://res.cloudinary.com/dnzzm3cnf/video/upload/v1726190825/WRE_Vid_1_k0gomq_c9cdcc.mp4"
            type="video/mp4"
          />
        </video>
      </Suspense>
    </div>
  );
};

export default Video;
