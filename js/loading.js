// Initialize Three.js scene
const scene = new THREE.Scene();
const canvas = document.getElementById("sphere-canvas");
const container = document.getElementById("loading-sphere");
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});

// Configure renderer
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

// Create sphere
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshPhongMaterial({
  color: 0x00ff88,
  emissive: 0x003311,
  specular: 0x00ff88,
  shininess: 100,
  wireframe: true,
  transparent: true,
  opacity: 0.9,
});

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Position camera
camera.position.z = 6;

// Animation function
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Start animation
animate();

// Loading simulation and progress bar
function simulateLoading() {
  const loadingBar = document.getElementById("loading-bar");
  const loadingText = document.getElementById("loading-text");
  const loadingOverlay = document.getElementById("loading-overlay");
  const mainContent = document.getElementById("main-content");

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 100) progress = 100;

    loadingBar.style.width = `${progress}%`;
    loadingText.textContent = `Loading... ${Math.round(progress)}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingOverlay.style.opacity = "0";
        mainContent.style.opacity = "1";
        setTimeout(() => {
          loadingOverlay.style.display = "none";
        }, 500);
      }, 500);
    }
  }, 500);
}

// Start loading when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Handle window resize
  function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener("resize", onWindowResize);

  // Start loading simulation
  simulateLoading();
});

// Wait for all resources to load
window.addEventListener("load", () => {
  const loadingOverlay = document.getElementById("loading-overlay");
  const mainContent = document.getElementById("main-content");

  // If loading takes too long, force hide the loading screen
  setTimeout(() => {
    if (loadingOverlay.style.display !== "none") {
      loadingOverlay.style.opacity = "0";
      mainContent.style.opacity = "1";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 500);
    }
  }, 10000); // 10 second timeout
});
