import { useEffect, useRef, useState } from "react";

interface SequenceBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  frameCount: number;
}

export function SequenceBackground({
  containerRef,
  frameCount,
}: SequenceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [visible, setVisible] = useState(true);

  // Use import.meta.glob to get all images from src/assets/bg
  // Note: Adjust the pattern if your images are named differently
  // We'll create a sorted array of URLs
  const imageUrls = Object.values(
    import.meta.glob("../assets/bg/*.jpg", { eager: true, query: "?url" })
  ).map((mod: any) => mod.default || mod);

  useEffect(() => {
    // Basic sorting to ensure frames are in order (ezgif-frame-001.jpg etc)
    imageUrls.sort();

    const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    imagesRef.current = images;

    // Progressive loading strategy
    // 1. Keyframes first (every 20th)
    // 2. Midframes (every 5th)
    // 3. Rest
    const loadQueue: number[] = [];
    
    // Tier 1: Every 20th
    for (let i = 0; i < frameCount; i += 20) loadQueue.push(i);
    // Tier 2: Every 5th
    for (let i = 0; i < frameCount; i += 5) {
      if (!loadQueue.includes(i)) loadQueue.push(i);
    }
    // Tier 3: Everything else
    for (let i = 0; i < frameCount; i++) {
        if (!loadQueue.includes(i)) loadQueue.push(i);
    }

    let loaded = 0;
    const batchSize = 10; // Load in batches to be gentle on the browser

    const loadBatch = (startIndex: number) => {
        const end = Math.min(startIndex + batchSize, loadQueue.length);
        for (let i = startIndex; i < end; i++) {
            const frameIdx = loadQueue[i];
            const img = new Image();
            img.src = imageUrls[frameIdx];
            img.onload = () => {
                images[frameIdx] = img;
                loaded++;
                if (frameIdx === 0 || loaded % 10 === 0) {
                    setLoadedCount(prev => prev + 1);
                    renderFrame(); // Render immediately if first frame or progress made
                }
                if (loaded === loadQueue.length) {
                    console.log("All frames loaded");
                }
            };
        }
        if (end < loadQueue.length) {
            setTimeout(() => loadBatch(end), 50); // Small delay between batches
        }
    };

    loadBatch(0);
  }, []);

  const renderFrame = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Total scrollable height for the first 3 sections is roughly 3 * window height
    // But let's be more precise based on the snapping container
    const scrollPos = container.scrollTop;
    const maxScroll = window.innerHeight * 2.5; // End animation halfway through section 3
    const progress = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
    
    const frameIndex = Math.floor(progress * (frameCount - 1));
    
    // Find the nearest loaded frame if the current one isn't loaded yet
    let img = imagesRef.current[frameIndex];
    if (!img) {
        // Search outwards for the nearest loaded frame
        for (let i = 1; i < frameCount; i++) {
            if (imagesRef.current[frameIndex + i]) {
                img = imagesRef.current[frameIndex + i];
                break;
            }
            if (imagesRef.current[frameIndex - i]) {
                img = imagesRef.current[frameIndex - i];
                break;
            }
        }
    }

    if (img && img.complete) {
      // Cover effect for canvas
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawW = canvas.width;
        drawH = canvas.width / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawW = canvas.height * imgAspect;
        drawH = canvas.height;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // Hide if scrolled past the 3rd section
    const isVisible = scrollPos < window.innerHeight * 3;
    if (isVisible !== visible) setVisible(isVisible);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      requestAnimationFrame(renderFrame);
    };

    container.addEventListener("scroll", handleScroll);
    
    // Initial resize
    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            renderFrame();
        }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, visible]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 h-screen w-full object-cover transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
}
