// Gemini 2.0 Flash Interactive Hero Component with Timeline
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, X, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  name: string;
  description: string;
  fundingPercentage: number;
  impactCount: number;
  color: string;
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'impact' | 'funding' | 'media';
}

const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Proyecto Indigo Azul',
    description: 'Water systems for 7 generations',
    fundingPercentage: 85,
    impactCount: 342,
    color: '#00d9ff',
    timeline: [
      {
        date: 'Jan 2024',
        title: 'First Well Built',
        description: 'Completed inaugural water system',
        type: 'milestone',
      },
      {
        date: 'Mar 2024',
        title: '$85K Raised',
        description: 'Community reached funding milestone',
        type: 'funding',
      },
      {
        date: 'Jul 2024',
        title: '342 Lives Impacted',
        description: 'Water system serving full community',
        type: 'impact',
      },
    ],
  },
  {
    id: '2',
    name: 'Culture Shock',
    description: 'Food sovereignty and agriculture',
    fundingPercentage: 72,
    impactCount: 156,
    color: '#a855f7',
    timeline: [
      {
        date: 'Feb 2024',
        title: 'Farm Established',
        description: 'First agricultural plots planted',
        type: 'milestone',
      },
      {
        date: 'Jun 2024',
        title: 'First Harvest',
        description: 'Yielding sustainable food sources',
        type: 'impact',
      },
    ],
  },
  {
    id: '3',
    name: 'Energy for All',
    description: 'Renewable energy infrastructure',
    fundingPercentage: 45,
    impactCount: 89,
    color: '#22c55e',
    timeline: [
      {
        date: 'Apr 2024',
        title: 'Solar Panels Installed',
        description: 'Clean energy system operational',
        type: 'milestone',
      },
    ],
  },
];

/**
 * Particle system for animated stars
 */
class ParticleSystem {
  particles: Array<{ x: number; y: number; z: number; vx: number; vy: number; vz: number }> = [];
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 5;

    this.initializeParticles();
    this.animate();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  initializeParticles() {
    for (let i = 0; i < 10000; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
      });
    }

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particles.flatMap((p) => [p.x, p.y, p.z]));
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00d9ff,
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Update particle positions
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      if (p.x > 50) p.x = -50;
      if (p.x < -50) p.x = 50;
      if (p.y > 50) p.y = -50;
      if (p.y < -50) p.y = 50;
    });

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

/**
 * Render a centered modal that displays a project's timeline, description, and key stats.
 *
 * The modal overlays the page with a backdrop, supports animated entry/exit, closes when the
 * backdrop or close button is clicked, and prevents backdrop clicks when interacting with the modal content.
 *
 * @param project - The project whose details and timeline are displayed.
 * @param isOpen - Controls whether the modal is visible.
 * @param onClose - Callback invoked to request closing the modal.
 * @returns The modal element when `isOpen` is true, `null` otherwise.
 */
function ProjectTimelineModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative w-full max-w-2xl max-h-96 overflow-y-auto bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg transition-all"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <h2 className="text-3xl font-bold mb-2" style={{ color: project.color }}>
          {project.name}
        </h2>
        <p className="text-slate-400 mb-8">{project.description}</p>

        {/* Timeline */}
        <div className="space-y-6">
          {project.timeline.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                {idx < project.timeline.length - 1 && (
                  <div
                    className="w-0.5 h-12 mt-2"
                    style={{ backgroundColor: project.color, opacity: 0.3 }}
                  />
                )}
              </div>
              <div>
                <div className="font-semibold text-white">{event.title}</div>
                <div className="text-sm text-slate-400">{event.date}</div>
                <div className="text-sm text-slate-300 mt-1">{event.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 pt-8 border-t border-slate-700">
          <div>
            <div className="text-sm text-slate-400">Funding Progress</div>
            <div className="text-2xl font-bold text-white">{project.fundingPercentage}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Lives Impacted</div>
            <div className="text-2xl font-bold" style={{ color: project.color }}>
              {project.impactCount}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Interactive hero section that combines a 3D particle background, parallax project cards, voice-driven project selection, and a per-project timeline modal.
 *
 * Renders a full-screen hero with:
 * - a Three.js particle starfield background,
 * - a title, voice command button (accepts "water", "food", "energy") that selects and opens a project,
 * - GSAP ScrollTrigger-driven parallax for project cards and a scroll-based subtle transform,
 * - project cards showing funding progress, lives impacted, and a short timeline preview,
 * - a donation/impact ticker,
 * - a modal that displays the selected project's timeline and stats.
 *
 * @returns A JSX element containing the interactive hero UI.
 */
export default function GeminiInteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isListening, setIsListening] = useState(false);

  // Initialize particle system
  useEffect(() => {
    if (!canvasRef.current) return;
    new ParticleSystem(canvasRef.current);
  }, []);

  // Setup GSAP ScrollTrigger parallax
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to('.hero-card', {
      scrollTrigger: {
        trigger: '.hero-card',
        start: 'top center',
        scrub: 1,
      },
      y: -100,
      opacity: 0.5,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Scroll listener for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Voice command handler
  const handleVoiceCommand = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice control not supported in your browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();

      // Simple voice command matching
      if (transcript.includes('water')) {
        setActiveProject(PROJECTS[0]);
      } else if (transcript.includes('food')) {
        setActiveProject(PROJECTS[1]);
      } else if (transcript.includes('energy')) {
        setActiveProject(PROJECTS[2]);
      }

      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      {/* Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 py-20">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Building for 7 Generations
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Explore our projects creating lasting impact in food, water, energy & shelter
          </p>

          {/* Voice Command Button */}
          <button
            onClick={handleVoiceCommand}
            className={`flex items-center gap-2 mx-auto px-6 py-3 rounded-xl font-semibold transition-all ${
              isListening
                ? 'bg-red-500/50 text-white animate-pulse'
                : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/40'
            }`}
          >
            <Mic className="w-5 h-5" />
            {isListening ? 'Listening...' : 'Say "water", "food", or "energy"'}
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center mb-12"
        >
          <ChevronDown className="w-6 h-6 mx-auto text-cyan-400/50" />
        </motion.div>

        {/* Projects Grid with Timeline Cards */}
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              onClick={() => setActiveProject(project)}
              className="hero-card group cursor-pointer"
              style={{ transform: `translateY(${scrollY * 0.5 * (idx - 1)}px)` }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 hover:border-cyan-500/50 transition-all h-full">
                {/* Background gradient */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: project.color }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-slate-300 mb-6">{project.description}</p>

                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Funding</span>
                      <span style={{ color: project.color }}>
                        {project.fundingPercentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.fundingPercentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className="h-full"
                        style={{ backgroundColor: project.color }}
                      />
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="text-sm text-slate-300">
                    <span style={{ color: project.color }}>
                      {project.impactCount}
                    </span>
                    {' lives impacted'}
                  </div>

                  {/* Timeline Preview */}
                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <div className="text-xs text-slate-400 mb-2">Latest Updates</div>
                    {project.timeline.slice(0, 2).map((event, i) => (
                      <div key={i} className="text-xs text-slate-400 mb-1">
                        {event.date}: {event.title}
                      </div>
                    ))}
                  </div>

                  {/* Click to expand hint */}
                  <div className="mt-6 text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                    Click to view timeline →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Donation Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6 text-center"
        >
          <div className="text-sm text-slate-400 mb-2">Total Impact This Week</div>
          <motion.div
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            $45,280 Raised
          </motion.div>
          <div className="text-sm text-slate-400 mt-2">587 lives directly impacted</div>
        </motion.div>
      </div>

      {/* Timeline Modal */}
      {activeProject && (
        <ProjectTimelineModal
          project={activeProject}
          isOpen={!!activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}