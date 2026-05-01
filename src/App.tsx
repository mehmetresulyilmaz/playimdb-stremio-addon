/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Download, Github, ShieldCheck, Zap, Info, ExternalLink, Menu } from 'lucide-react';

export default function App() {
  const [manifestUrl, setManifestUrl] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Determine manifest URL based on current host
    const url = window.location.origin + '/manifest.json';
    const stremioUrl = url.replace(/^https?:\/\//, 'stremio://');
    setManifestUrl(stremioUrl);
  }, []);

  const copyToClipboard = () => {
    const url = manifestUrl.replace('stremio://', 'https://');
    navigator.clipboard.writeText(url);
    alert('Manifest URL copied to clipboard!');
  };

  const navLinks = [
    { label: 'Manifest', href: '/manifest.json', target: '_blank' },
    { label: 'Documentation', href: '#' },
    { label: 'Source Code', href: 'https://github.com', icon: <Github className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans flex flex-col selection:bg-[#F5C518]/30">
      {/* Navigation Bar */}
      <nav className="h-16 px-6 lg:px-10 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F5C518] rounded flex items-center justify-center font-black text-black text-xs">IMDb</div>
          <span className="text-lg font-semibold tracking-tight text-white">Play<span className="text-[#F5C518]">Addon</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          {navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              target={link.target} 
              className="hover:text-[#F5C518] transition-colors flex items-center gap-2"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
          <div className="w-px h-4 bg-white/20"></div>
          <span className="text-white/40">v1.0.0-stable</span>
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/60 p-2 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b border-white/10 bg-black/90 backdrop-blur-xl absolute top-16 left-0 w-full z-40 p-6 space-y-6"
        >
          {navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              target={link.target}
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-medium text-white/80 hover:text-[#F5C518]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40 tracking-widest">
            <span>VERSION 1.0.0</span>
            <span className="text-[#F5C518]">STABLE</span>
          </div>
        </motion.div>
      )}

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Installation & Hero */}
        <div className="flex-1 lg:w-3/5 p-8 lg:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/20 mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#F5C518]">Community Addon</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 leading-tight tracking-tight">
              Direct Stream <br/><span className="font-bold">from IMDb</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/50 mb-10 leading-relaxed max-w-xl font-light">
              Integrate the seamless PlayIMDb experience directly into your Stremio client. Access high-quality global streams with zero configuration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={manifestUrl}
                className="w-fit px-8 py-4 bg-[#F5C518] hover:bg-[#d4a914] text-black font-bold text-lg rounded-xl shadow-2xl shadow-[#F5C518]/10 transition-all flex items-center gap-3 active:scale-95"
              >
                <span>Install Addon to Stremio</span>
                <Play className="w-5 h-5 fill-current" />
              </a>
              
              <button 
                onClick={copyToClipboard}
                className="w-fit px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all flex items-center gap-3"
              >
                <Download className="w-4 h-4" />
                <span>Copy Manifest URL</span>
              </button>
            </div>
            
            <p className="mt-6 text-xs text-white/30 font-mono break-all">
              MANIFEST: {manifestUrl.replace('stremio://', 'https://')}
            </p>
          </motion.div>
        </div>

        {/* Right: Technical Details Panel */}
        <div className="lg:w-2/5 bg-white/2 border-t lg:border-t-0 lg:border-l border-white/10 p-8 lg:p-12 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 space-y-12"
          >
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40 mb-8">Addon Capabilities</h3>
              
              <div className="space-y-8">
                {[
                  {
                    icon: <Zap className="w-5 h-5" />,
                    title: "Instant Playback",
                    desc: "Auto-resolution selecting based on your IMDb ID query."
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5" />,
                    title: "Secure Proxy",
                    desc: "HTTPS enabled streaming tunnels with zero logging."
                  },
                  {
                    icon: <Info className="w-5 h-5" />,
                    title: "IMDb Mapping",
                    desc: "Direct link resolution using global 'tt' identifiers."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F5C518]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4 text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-white/30">Current Manifest</span>
                  <span className="text-[#F5C518] font-mono">JSON-STREMIO</span>
                </div>
                <pre className="text-[11px] font-mono text-white/40 leading-tight overflow-x-auto">
{`{
  "id": "org.playimdb.stremio",
  "version": "1.0.0",
  "name": "PlayIMDB Addon",
  "resources": ["stream"],
  "types": ["movie", "series"]
}`}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bar */}
      <footer className="h-auto md:h-12 px-6 lg:px-10 py-4 md:py-0 flex flex-col md:flex-row items-center justify-between border-t border-white/5 bg-black/60 gap-4">
        <p className="text-[11px] text-white/30 text-center">This addon is not affiliated with IMDb.com. Generated streams are provided by third-party links.</p>
        <div className="flex gap-6 items-center">
          <span className="text-[11px] font-medium text-[#F5C518]/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Uptime: 99.9%
          </span>
          <a href="https://github.com" className="text-[11px] font-medium text-white/30 hover:text-white transition-colors flex items-center gap-1">
            <Github className="w-3 h-3" /> GITHUB
          </a>
        </div>
      </footer>
    </div>
  );
}


