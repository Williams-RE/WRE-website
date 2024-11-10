import { useEffect, useRef, Suspense } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { video } from "@cloudinary/url-gen/qualifiers/source";
import "./Video.css";

const Video = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.log("Auto-play failed, user interaction might be needed");
      });
    }
  }, []);

  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dnzzm3cnf",
    },
  });

  // Generate the video URL
  const videoUrl = cld.video("WRE_Vid_1_k0gomq_c9cdcc").toURL();

  return (
    <div className="video-background">
      <Suspense fallback={<div>Loading...</div>}>
        <video ref={videoRef} src={videoUrl} muted autoPlay loop playsInline>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Suspense>
    </div>
  );
};

export default Video;
