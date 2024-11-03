// Set up scene
const scene = new THREE.Scene();

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initSphere();
});

function initSphere() {
  const container = document.getElementById("sphere-container");
  if (!container) {
    console.error("Sphere container not found");
    return;
  }

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  // Configure renderer
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Create sphere geometry with higher detail
  const geometry = new THREE.SphereGeometry(3, 64, 64);

  // Create more sophisticated material
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
  camera.position.z = 8;

  // Handle window resize
  function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener("resize", onWindowResize);

  // Animation function
  function animate() {
    requestAnimationFrame(animate);

    // Rotate sphere only on Y axis (left to right)
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  // Start animation
  animate();
}

// Add some CSS to the page
const style = document.createElement("style");
style.textContent = `
    .sphere-container {
        width: 600px;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 768px) {
        .sphere-container {
            width: 300px;
            height: 300px;
        }
    }
`;
document.head.appendChild(style);
