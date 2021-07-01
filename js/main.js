const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();


const geometry = new THREE.PlaneGeometry(5, 3, 15, 9);
const material = new THREE.MeshBasicMaterial({
    map: loader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1280px-Flag_of_Turkey.svg.png'),
});
const bayrak = new THREE.Mesh(geometry, material);
scene.add(bayrak);

camera.position.z = 5;

const clock = new THREE.Clock();

var hız = 2;

animate();

function animate() {
    const t = clock.getElapsedTime()

    let positionAttribute = geometry.getAttribute("position");
    let v = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
        v.fromBufferAttribute(positionAttribute, i);
        const waveX1 = 0.75 * Math.sin(v.x * 2 + t * hız);
        const waveX2 = 0.25 * Math.sin(v.x * 3 + t * (hız - 1));
        const waveY1 = 0.1 * Math.sin(v.y * 5 + t * ((hız - 1) / 4));
        const multi = (v.x + 2.5) / 5;

        positionAttribute.setZ(i, (waveX1 + waveX2 + waveY1) * multi);
    }

    geometry.attributes.position.needsUpdate = true;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.addEventListener('keydown', ondDocumentKeyDown, false);

function ondDocumentKeyDown(event) {
    var keyCode = event.which;

    if (keyCode == 38) //38 javascriptte yukarı yön tuşuna denktir.
    {
        hız += 1;
    }
    if (keyCode == 40) { //40 javascriptte aşağı yön tuşuna denktir.
        hız--;
    }

    renderer.render(scene, camera);
}