const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();


var star_background = new THREE.TextureLoader().load("earth-maps/star_map.png");
star_background.mapping = THREE.EquirectangularReflectionMapping;
scene.background = star_background;


const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
// create earth (sphere) and map texture image to it
const sphere = new THREE.SphereGeometry(5, 32, 32);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('earth-maps/med_res_earth.jpg');
// Thicc image file but looks crisp
const earth_material = new THREE.MeshPhongMaterial({
  // map of earth's surface directions (normal vectors) to make it look 3D with reflections
  normalMap: textureLoader.load('earth-maps/earth_normals.png'),
  normalScale: new THREE.Vector2(5, 5), // make the normal map more pronounced

  // add map of night lights to make the dark side of the earth glow
  emissiveMap: textureLoader.load('earth-maps/earth_emissions.jpg'),
  emissive: 0xBD9977, // earth lights glow colour - slightly yellow and not too bright
  emissiveIntensity: 1, // make the glow less intense

  //specularMap: textureLoader.load('earth-maps//earth_speculars.png'),
  shininess: 30,
  map: texture
});

const globe = new THREE.Mesh(sphere, earth_material);
scene.add(globe);

// ambient light so we can see dark side of the globe
const softLightColour = 0x404040;
const ambientLight = new THREE.AmbientLight(softLightColour, 0.6);
scene.add(ambientLight);


// directional light to simulate sunlight
const sunlightColour = 0xffefc9;
const light = new THREE.DirectionalLight(sunlightColour, 2);
light.position.set(30, -5, 0); // Position the (sun) light to the right of & slightly below camera - to match sun position in background
light.target = globe;
scene.add(light);

const radius = 15; // distance from camera to center
var angle = -1.4; //start at sunrise

camera.position.y = 4; // move camera up slightly to see more land (looking at northern hemisphere)
camera.position.z = radius;



const animate = function () {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.0033; // rotate the globe

  // rotate camera around earth
  camera.position.x = radius * Math.sin(angle);
  camera.position.z = radius * Math.cos(angle);
  camera.lookAt(globe.position);
  angle += 0.001;

  renderer.render(scene, camera);
};

window.addEventListener('resize', function () {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

animate();