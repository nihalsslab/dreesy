// 🎥 Start each video from different timestamp
document.querySelectorAll(".mf-video").forEach(video => {
  const startTime = parseFloat(video.dataset.start) || 0;

  video.addEventListener("loadedmetadata", () => {
    if (video.duration > startTime) {
      video.currentTime = startTime;
    }
  });

  // Reset start position each loop
  video.addEventListener("ended", () => {
    video.currentTime = startTime;
    video.play();
  });
});
