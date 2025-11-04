document.addEventListener("DOMContentLoaded", () => {
  const videos = Array.from(document.querySelectorAll(".video-elm"));

  // Lazy load when element is intersecting viewport
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const v = entry.target;
          // If data-src exists, set it as src and load
          const src = v.getAttribute("data-src");
          if (src && !v.src) {
            // create source element
            v.src = src;               // works for <video src="...">
            // If you prefer <source>, create and append:
            // const s = document.createElement('source'); s.src = src; s.type = 'video/mp4'; v.appendChild(s);
            v.load();
          }
          io.unobserve(v);
        }
      });
    }, { rootMargin: "300px 0px" });
    videos.forEach(v => io.observe(v));
  } else {
    // Fallback: eager load
    videos.forEach(v => {
      const src = v.getAttribute("data-src");
      if (src) { v.src = src; v.load(); }
    });
  }

  // Play on hover on desktop, click to play on mobile
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  videos.forEach(v => {
    // ensure v is a <video> element
    v.addEventListener("mouseover", () => {
      if (!isTouch) {
        v.play().catch(()=>{/* autoplay blocked; user must interact */});
      }
    });
    v.addEventListener("mouseout", () => {
      if (!isTouch) {
        v.pause();
        v.currentTime = 0;
      }
    });

    // For mobile/touch: toggle play on tap
    v.addEventListener("click", () => {
      if (isTouch) {
        if (v.paused) v.play().catch(()=>{});
        else { v.pause(); v.currentTime = 0; }
      }
    });

    // Stop audio if any (videos are muted by default)
    v.muted = true;
    v.setAttribute("playsinline", "");
  });
});
