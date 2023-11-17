
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var scene = new THREE.Scene();

let selectedNodeIndex;

// Create a camera
var camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
camera.position.z = 1;

// Create a renderer
var renderer = new THREE.WebGLRenderer();
const width = document.getElementById("editPreview_card").offsetWidth
renderer.setSize(width, width / 2, true);
document.getElementById("editPreview_card").replaceWith(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
// Load the 360-degree image
var loader = new THREE.TextureLoader();
var geometry = new THREE.SphereGeometry(40, 20, 15);
// The sphere geometry is inside out by default to make it visible from the outside.
geometry.scale(-1, 1, 1);

// Create a basic mesh material and apply the texture to it.
var material = new THREE.MeshBasicMaterial({
    color: new THREE.Color("red")
});

// Create a mesh with the geometry and material
var mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);
animate();
function handleImageSelection(id) {
    const nodeIndex = arr.findIndex((e) => e.id === id);
    loader.load(arr[nodeIndex].img, function (texture) {
        // Create a basic mesh material and apply the texture to it.
        var material = new THREE.MeshBasicMaterial({
            map: texture
        });
        mesh.material = material
        // Render the scene
        animate();
    });
    //update all values
    const editInnerHtml =
        `
    <div id="editNode">
        <ul class="list-group">
        <li class="list-group-item" style=" display: flex; justify-content: space-between; align-content: center;"><h1 class="display-3" style="display: inline;">${arr[nodeIndex].id}</h1><button type="button" class="btn btn-outline-primary" id="updateButton">Update Node</button></li>
        <li class="list-group-item">
            <div class="form-floating mb-3">
                <input type="email" direction="north" class="direc form-control" id="floatingInput" value="${arr[nodeIndex].north}">
                <label for="floatingInput">North</label>
            </div>
        </li>
        <li class="list-group-item">
        <div class="form-floating mb-3">
          <input type="email" class="form-control direc" direction="east" id="floatingInput" value="${arr[nodeIndex].east}">
          <label for="floatingInput">East</label>
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-floating mb-3">
          <input type="email" class="form-control direc" direction="south" id="floatingInput" value="${arr[nodeIndex].south}">
          <label for="floatingInput">South</label>
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-floating mb-3">
          <input type="email" class="form-control direc" direction="west" id="floatingInput" value="${arr[nodeIndex].west}">
          <label for="floatingInput">West</label>
        </div>
      </li>
    </ul>
  </div>
`
    selectedNodeIndex=nodeIndex;
    var tempEle=document.createElement('div');
    tempEle.innerHTML=editInnerHtml;
    tempEle=tempEle.firstElementChild;
    console.log(tempEle);
    document.getElementById("editNode").replaceWith(tempEle);
    document.getElementById("updateButton").addEventListener("click",updateNode);

}

function updateNode(){
    const values=document.getElementsByClassName("direc")
    arr[selectedNodeIndex].north=values[0].value;
    arr[selectedNodeIndex].east=values[1].value;
    arr[selectedNodeIndex].south=values[2].value;
    arr[selectedNodeIndex].west=values[3].value;
    console.log(arr[selectedNodeIndex]);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
const files = document.getElementById("fileIn")


const arr = []
const fr = new FileReader();


files.addEventListener("change", newFileAdded);

function newFileAdded() {
    fr.readAsDataURL(files.files[0]);
    fr.onloadend = () => {
        console.log('file loaded successfully');
        //upload and get id
        const id = Date.now().toString();
        uploadImageDB(fr.result,id);
        const newNode = new Node(fr.result, id,"","","","");
        arr.push(newNode);
        console.log(arr);
        addNodeHTML(newNode);
        handleImageSelection(id);
        //show in filePreview
        //reload all nodes view 
    }
}


function addNodeHTML(node) {
    var html = `
    <div  class="col nodeCell">
    <div class="card">
      <img src="${node.img}" id="nodeCell" nodeId="${node.id}" class="card-img-top" alt="...">
      <div class="card-body" >
        <h5 class="card-title">${node.id}</h5>
</div>
    </div>
  </div>
  `
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    const divElement = wrapper.firstElementChild;
    console.log(divElement.firstChild);
    const ele = document.getElementById("nodeCollection")
    ele.insertBefore(divElement, ele.lastElementChild)
    var container = document.getElementsByClassName('nodeCell');
    Array.from(container).forEach(c => {
        console.log(c);
        c.addEventListener('click', function (event) {
            handleImageSelection(event.target.getAttribute('nodeId'));
        })
    
    });

}

class Node {
    constructor(img, id, north, east, west, south) {
        this.img = img;
        this.id = id
        this.north = north;
        this.east = east;
        this.west = west;
        this.south = south;
    }
}


//************************************apis calls**********************************//

const baseUrl="http://127.0.0.1:8080/"
function uploadImageDB(img,id){
    fetch(baseUrl+"upload",{
        method:'POST',
        body: JSON.stringify({img:img,id:id}),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
        
    }).then(response =>console.log(response))
    .catch(err=>console.log(err));
}

