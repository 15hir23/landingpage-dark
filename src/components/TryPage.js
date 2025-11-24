import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Search, Mic, ArrowUp, Zap, MessageSquare, Image, Plus, Menu } from 'lucide-react';
import './TryPage.css';

const TryPage = () => {
    const canvasRef = useRef(null);
    const [showIntro, setShowIntro] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
    const [currentDescSlide, setCurrentDescSlide] = useState(0);

    // Feature Typing Animation State
    const [featureTitle, setFeatureTitle] = useState('');
    const [featureDesc, setFeatureDesc] = useState('');
    const [featureIcon, setFeatureIcon] = useState(null);
    const [featureOpacity, setFeatureOpacity] = useState(1);

    const introContainerRef = useRef(null);
    const mainContentRef = useRef(null);

    const features = [
        {
            icon: <Zap className="text-white" size={16} />,
            title: 'AI-Powered Supplier Discovery',
            description: 'Find the perfect suppliers with intelligent matching algorithms'
        },
        {
            icon: <MessageSquare className="text-white" size={16} />,
            title: 'Automated RFQ Management',
            description: 'Streamline your request for quotation process end-to-end'
        },
        {
            icon: <div className="w-4 h-4 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m5.2-13.2-4.2 4.2m0 6 4.2 4.2M1 12h6m6 0h6m-13.2-5.2 4.2 4.2m0 6-4.2 4.2"></path></svg></div>,
            title: 'Real-Time Analytics Dashboard',
            description: 'Visualize procurement data and make informed decisions instantly'
        },
        {
            icon: <div className="w-4 h-4 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>,
            title: 'Cost Optimization Engine',
            description: 'Identify savings opportunities and reduce procurement costs by up to 30%'
        }
    ];

    // Three.js Scene Setup
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
            // Clean up scene
        };
    }, []);

    // Intro Slides Logic
    useEffect(() => {
        if (!showIntro) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => {
                if (prev < 3) return prev + 1;
                clearInterval(interval);
                setTimeout(() => {
                    setShowIntro(false);
                }, 1000);
                return prev;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [showIntro]);

    const skipIntro = () => {
        setShowIntro(false);
    };

    // Feature Typing Animation
    useEffect(() => {
        if (showIntro) return;

        let isTyping = false;
        let timeoutId;

        const typeText = async (text, setter, speed = 30) => {
            setter('');
            for (let i = 0; i < text.length; i++) {
                await new Promise(resolve => setTimeout(resolve, speed));
                setter(prev => prev + text.charAt(i));
            }
        };

        const runAnimation = async () => {
            if (isTyping) return;
            isTyping = true;

            const feature = features[currentFeatureIndex];
            setFeatureIcon(feature.icon);
            setFeatureOpacity(1);

            await typeText(feature.title, setFeatureTitle, 40);
            await new Promise(resolve => setTimeout(resolve, 200));
            await typeText(feature.description, setFeatureDesc, 25);
            await new Promise(resolve => setTimeout(resolve, 2500));

            setFeatureOpacity(0);
            await new Promise(resolve => setTimeout(resolve, 500));

            setFeatureTitle('');
            setFeatureDesc('');
            setCurrentFeatureIndex(prev => (prev + 1) % features.length);
            isTyping = false;
        };

        runAnimation();

        return () => {
            // Cleanup logic if needed
        };
    }, [currentFeatureIndex, showIntro]);

    // Description Slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDescSlide(prev => (prev + 1) % 5);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black text-white font-sans antialiased overflow-x-hidden min-h-screen relative">
            <canvas ref={canvasRef} id="three-canvas" />

            {/* Intro Container */}
            <div
                id="intro-container"
                ref={introContainerRef}
                className={!showIntro ? 'hidden' : ''}
            >
                <button
                    onClick={skipIntro}
                    className="fixed top-8 right-8 z-[110] px-6 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/30 hover:border-white/50 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-105"
                >
                    Skip Intro →
                </button>

                <div className="intro-viewport">
                    {[0, 1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className={`intro-slide ${currentSlide === index ? 'active' : currentSlide > index ? 'exit' : ''}`}
                        >
                            <div className="intro-content">
                                {index === 0 && (
                                    <>
                                        <h1 className="text-7xl md:text-8xl font-extrabold mb-6 tracking-tighter fade-in leading-tight">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                                                Welcome to<br />SourceSmart AI
                                            </span>
                                        </h1>
                                        <p className="text-2xl text-gray-300 fade-in" style={{ animationDelay: '0.3s' }}>The Future of Procurement</p>
                                    </>
                                )}
                                {index === 1 && (
                                    <>
                                        <h2 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight fade-in leading-tight">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                                                Intelligent Procurement
                                            </span>
                                        </h2>
                                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed fade-in" style={{ animationDelay: '0.2s' }}>
                                            Harness the power of AI to streamline supplier discovery, automate RFQ management, and make data-driven decisions that transform your supply chain.
                                        </p>
                                    </>
                                )}
                                {index === 2 && (
                                    <>
                                        <h2 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight fade-in leading-tight">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                                                Reduce Costs, Maximize Value
                                            </span>
                                        </h2>
                                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed fade-in" style={{ animationDelay: '0.2s' }}>
                                            Our advanced analytics engine identifies cost-saving opportunities, optimizes supplier relationships, and delivers actionable insights in real-time.
                                        </p>
                                    </>
                                )}
                                {index === 3 && (
                                    <>
                                        <h2 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight fade-in leading-tight">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                                                Your Supply Chain, Reimagined
                                            </span>
                                        </h2>
                                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed fade-in" style={{ animationDelay: '0.2s' }}>
                                            From procurement to delivery, SourceSmart AI provides end-to-end visibility and control, empowering you to build a resilient, efficient supply chain.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* UI Overlay */}
            <div
                id="ui-overlay"
                ref={mainContentRef}
                className={`min-h-screen p-4 main-content flex flex-col ${!showIntro ? 'show' : ''}`}
            >
                <header className="flex justify-between items-center py-4 px-8 relative z-20">
                    <div className="text-2xl font-bold tracking-wider">
                        SourceSmart AI
                    </div>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('ui-overlay')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-gray-400 transition-colors">Home</a>
                        <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-gray-400 transition-colors">Features</a>
                        <a href="#advanced-features" onClick={(e) => { e.preventDefault(); document.getElementById('advanced-features')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-gray-400 transition-colors">Capabilities</a>
                        <a href="#cta" onClick={(e) => { e.preventDefault(); document.querySelector('.cta')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-gray-400 transition-colors">Get Started</a>
                    </nav>
                    <div className="flex space-x-4 items-center">
                        <button className="text-sm font-medium hover:text-gray-400 transition-colors hidden md:block">Sign In</button>
                        <button className="px-4 py-2 text-sm font-semibold rounded-md bg-white text-black hover:bg-gray-200 transition-colors hidden md:block">Start Free Trial</button>
                        <button 
                            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => {
                                const menu = document.getElementById('mobile-menu');
                                if (menu) menu.classList.toggle('hidden');
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Mobile Menu */}
                <div id="mobile-menu" className="hidden md:hidden fixed top-0 left-0 w-full h-full bg-black/95 backdrop-blur-lg z-50 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-2xl font-bold tracking-wider">SourceSmart AI</div>
                        <button 
                            onClick={() => {
                                const menu = document.getElementById('mobile-menu');
                                if (menu) menu.classList.add('hidden');
                            }}
                            className="p-2 hover:bg-white/10 rounded-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-6 text-lg font-medium">
                        <a 
                            href="#home" 
                            className="hover:text-gray-400 transition-colors py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('ui-overlay')?.scrollIntoView({ behavior: 'smooth' });
                                document.getElementById('mobile-menu')?.classList.add('hidden');
                            }}
                        >
                            Home
                        </a>
                        <a 
                            href="#features" 
                            className="hover:text-gray-400 transition-colors py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                                document.getElementById('mobile-menu')?.classList.add('hidden');
                            }}
                        >
                            Features
                        </a>
                        <a 
                            href="#advanced-features" 
                            className="hover:text-gray-400 transition-colors py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('advanced-features')?.scrollIntoView({ behavior: 'smooth' });
                                document.getElementById('mobile-menu')?.classList.add('hidden');
                            }}
                        >
                            Capabilities
                        </a>
                        <a 
                            href="#cta" 
                            className="hover:text-gray-400 transition-colors py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('.cta')?.scrollIntoView({ behavior: 'smooth' });
                                document.getElementById('mobile-menu')?.classList.add('hidden');
                            }}
                        >
                            Get Started
                        </a>
                        <div className="pt-4 border-t border-gray-700">
                            <button className="w-full text-left py-2 hover:text-gray-400 transition-colors">Sign In</button>
                            <button className="w-full mt-4 px-6 py-3 text-sm font-semibold rounded-md bg-white text-black hover:bg-gray-200 transition-colors">Start Free Trial</button>
                        </div>
                    </nav>
                </div>

                <div className="flex-1 flex items-center justify-center z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

                        {/* Left Column */}
                        <main className="text-left relative z-20">
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-sm">
                                    Modernize Your <br /> Procurement & Supply Chain
                                </span>
                            </h1>

                            <div className="description-viewport max-w-2xl mr-auto mb-8">
                                {[
                                    "SourceSmart AI is a data-driven procurement platform that streamlines supplier discovery, RFQ management, and more—helping you reduce costs and optimize your supply chain with AI..",
                                    "Transform your procurement process with AI-driven insights. Automate repetitive tasks, identify risks early, and negotiate better deals with real-time market data at your fingertips.",
                                    "Connect with top-tier suppliers globally. Our intelligent matching algorithms ensure you find the right partners for your specific needs, reducing sourcing time by up to 70%.",
                                    "Gain complete visibility into your supply chain. Track performance, monitor compliance, and predict disruptions before they impact your business with our advanced analytics dashboard.",
                                    "Empower your team with smart tools. From automated RFQs to contract management, SourceSmart AI handles the heavy lifting so you can focus on strategic decision-making."
                                ].map((text, idx) => (
                                    <div
                                        key={idx}
                                        className={`description-slide justify-start text-left ${currentDescSlide === idx ? 'active' : currentDescSlide === (idx + 1) % 5 ? 'exit' : ''}`}
                                    >
                                        <p className="text-lg text-gray-400">{text}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="px-8 py-3 text-lg font-semibold rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors">
                                Start Free Trial
                            </button>
                        </main>

                        {/* Right Column: Chat Interface */}
                        <section className="relative flex justify-center lg:justify-end z-20">
                            <div className="w-full max-w-xl relative">
                                <div className="bg-black/10 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-gray-700/30 relative">

                                    <div
                                        id="feature-message"
                                        className="mb-3 min-h-[50px] flex items-start space-x-3"
                                        style={{ opacity: featureOpacity, transition: 'opacity 0.5s' }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                                            {featureIcon}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <h3 className="font-semibold text-sm mb-0.5">{featureTitle}</h3>
                                            <p className="text-xs text-gray-300 leading-snug">{featureDesc}</p>
                                        </div>
                                    </div>

                                    <textarea
                                        className="w-full h-10 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none resize-none leading-relaxed"
                                        placeholder="Ask me anything..."
                                    ></textarea>

                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent my-3"></div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110 backdrop-blur-sm">
                                                <Plus className="w-3.5 h-3.5 text-white" />
                                            </button>
                                            <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-105 backdrop-blur-sm">
                                                <Search className="w-3.5 h-3.5 text-white" />
                                                <span className="text-[10px] font-medium uppercase tracking-wide">Search</span>
                                            </button>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110 backdrop-blur-sm">
                                                <Mic className="w-3.5 h-3.5 text-white" />
                                            </button>
                                            <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110 backdrop-blur-sm">
                                                <ArrowUp className="w-3.5 h-3.5 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 cursor-pointer hover:text-white transition-colors"
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <ArrowUp className="w-8 h-8 rotate-180 text-gray-500 mb-1 animate-bounce-slow" />
                    <p className="text-sm text-gray-400">Scroll down ↓</p>
                </div>
            </div>
        </div>
    );
};

export default TryPage;
