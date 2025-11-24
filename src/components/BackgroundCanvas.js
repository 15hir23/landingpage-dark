import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './BackgroundCanvas.css';

const BackgroundCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.sortObjects = true;
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.Fog(0x000000, 8, 20);

        camera.position.z = 5;

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 10, 5);
        scene.add(directionalLight);

        // Torus Knot
        const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
        const material = new THREE.MeshPhongMaterial({
            color: 0x2a2a2a,
            emissive: 0x111111,
            specular: 0x444444,
            shininess: 40,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        torusKnot.renderOrder = 1;
        scene.add(torusKnot);

        // Pentagonal Container
        const pentagonRadius = 3.5;
        const pentagonHeight = 8;
        const pentagonVertices = [];
        for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
            pentagonVertices.push(new THREE.Vector3(
                Math.cos(angle) * pentagonRadius,
                Math.sin(angle) * pentagonRadius,
                0
            ));
        }

        const pentagonContainer = {
            vertices: pentagonVertices,
            center: new THREE.Vector3(0, 0, 0),
            height: pentagonHeight,
            radius: pentagonRadius,
            rotation: 0
        };

        const pentagonShape = new THREE.Shape();
        pentagonShape.moveTo(pentagonVertices[0].x, pentagonVertices[0].y);
        for (let i = 1; i < pentagonVertices.length; i++) {
            pentagonShape.lineTo(pentagonVertices[i].x, pentagonVertices[i].y);
        }
        pentagonShape.lineTo(pentagonVertices[0].x, pentagonVertices[0].y);

        const pentagonGeometry = new THREE.ShapeGeometry(pentagonShape);
        const pentagonMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide
        });
        const pentagonMesh = new THREE.Mesh(pentagonGeometry, pentagonMaterial);
        pentagonMesh.renderOrder = -10;
        scene.add(pentagonMesh);

        function isPointInsidePentagon(point) {
            if (Math.abs(point.z) > pentagonHeight / 2) return false;
            const angle = -pentagonContainer.rotation;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const localX = point.x * cos - point.y * sin;
            const localY = point.x * sin + point.y * cos;

            let inside = false;
            const vertices = pentagonContainer.vertices;
            for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
                const xi = vertices[i].x, yi = vertices[i].y;
                const xj = vertices[j].x, yj = vertices[j].y;
                const intersect = ((yi > localY) !== (yj > localY)) &&
                    (localX < (xj - xi) * (localY - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
            return inside;
        }

        function lineIntersectsPentagon(p1, p2) {
            if (isPointInsidePentagon(p1) || isPointInsidePentagon(p2)) return true;
            const steps = 30;
            for (let i = 1; i < steps; i++) {
                const t = i / steps;
                const point = new THREE.Vector3().lerpVectors(p1, p2, t);
                if (isPointInsidePentagon(point)) return true;
            }
            const lineDir = new THREE.Vector3().subVectors(p2, p1).normalize();
            const toCenter = new THREE.Vector3().subVectors(pentagonContainer.center, p1);
            const projection = toCenter.dot(lineDir);
            const closestPoint = new THREE.Vector3().copy(p1).add(lineDir.multiplyScalar(Math.max(0, Math.min(projection, p1.distanceTo(p2)))));
            if (isPointInsidePentagon(closestPoint)) return true;
            return false;
        }

        // Stars
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xcccccc,
            size: 0.05,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.6
        });
        const starVertices = [];
        for (let i = 0; i < 5000; i++) {
            starVertices.push((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200);
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        stars.renderOrder = -2;
        scene.add(stars);

        // Nodes
        const nodeCount = 250;
        const nodes = [];
        const connections = [];

        for (let i = 0; i < nodeCount; i++) {
            let validPosition = false;
            let attempts = 0;
            let node;
            while (!validPosition && attempts < 50) {
                const radius = 3 + Math.random() * 8;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                const testPosition = new THREE.Vector3(
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    (radius * Math.cos(phi)) - 3
                );
                if (!isPointInsidePentagon(testPosition)) {
                    validPosition = true;
                    node = {
                        position: testPosition,
                        velocity: {
                            x: (Math.random() - 0.5) * 0.0015,
                            y: (Math.random() - 0.5) * 0.0015,
                            z: (Math.random() - 0.5) * 0.002
                        }
                    };
                }
                attempts++;
            }
            if (validPosition) nodes.push(node);
        }

        function updateConnections() {
            connections.forEach(conn => scene.remove(conn));
            connections.length = 0;
            const maxDistance = 3.0;
            for (let i = 0; i < nodes.length; i++) {
                let connectionsCount = 0;
                if (isPointInsidePentagon(nodes[i].position)) continue;
                for (let j = i + 1; j < nodes.length; j++) {
                    if (connectionsCount >= 6) break;
                    if (isPointInsidePentagon(nodes[j].position)) continue;
                    const distance = nodes[i].position.distanceTo(nodes[j].position);
                    if (distance < maxDistance) {
                        if (!lineIntersectsPentagon(nodes[i].position, nodes[j].position)) {
                            const geometry = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position]);
                            const avgZ = (nodes[i].position.z + nodes[j].position.z) / 2;
                            let depthOpacity = avgZ > -3 ? Math.max(0.15, Math.min(0.3, (avgZ + 5) / 8)) : Math.max(0.06, Math.min(0.18, (avgZ + 12) / 12));
                            const lineMaterial = new THREE.LineBasicMaterial({
                                color: 0x444444,
                                transparent: true,
                                opacity: depthOpacity
                            });
                            const line = new THREE.Line(geometry, lineMaterial);
                            line.renderOrder = 0;
                            connections.push(line);
                            scene.add(line);
                            connectionsCount++;
                        }
                    }
                }
            }
        }

        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            targetRotationX = mouseY * 0.1;
            targetRotationY = mouseX * 0.1;
        };
        document.addEventListener('mousemove', handleMouseMove);

        let frame = 0;
        let animationId;

        function animate() {
            animationId = requestAnimationFrame(animate);
            frame++;

            torusKnot.rotation.x += 0.001;
            torusKnot.rotation.y += 0.002;
            pentagonContainer.rotation += 0.002;
            pentagonMesh.rotation.z = pentagonContainer.rotation;

            torusKnot.rotation.x += (targetRotationX - torusKnot.rotation.x) * 0.02;
            torusKnot.rotation.y += (targetRotationY - torusKnot.rotation.y) * 0.02;
            stars.rotation.y += 0.0001;

            nodes.forEach((node, index) => {
                node.position.x += node.velocity.x;
                node.position.y += node.velocity.y;
                node.position.z += node.velocity.z;
                const wavePhase = frame * 0.008 + index * 0.05;
                node.position.z += Math.sin(wavePhase) * 0.008;
                node.position.x += Math.cos(wavePhase * 0.5) * 0.002;
                node.position.y += Math.sin(wavePhase * 0.5) * 0.002;

                if (isPointInsidePentagon(node.position)) {
                    const direction = node.position.clone().normalize();
                    const pushDistance = pentagonRadius + 0.5;
                    node.position.copy(direction.multiplyScalar(pushDistance));
                    node.velocity.x *= -1.2;
                    node.velocity.y *= -1.2;
                    node.velocity.z *= -1.2;
                }

                if (Math.abs(node.position.x) > 12) node.velocity.x *= -1;
                if (Math.abs(node.position.y) > 12) node.velocity.y *= -1;
                if (node.position.z > 3) { node.position.z = 3; node.velocity.z *= -1; }
                if (node.position.z < -12) { node.position.z = -12; node.velocity.z *= -1; }
            });

            if (frame % 4 === 0) updateConnections();

            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();
        updateConnections();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} id="three-canvas" />;
};

export default BackgroundCanvas;

