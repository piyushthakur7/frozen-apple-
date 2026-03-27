import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Play, Music, MapPin, 
  Sparkles, Cpu, Globe, Camera, Send,
  ArrowRight, Star, Quote, Zap
} from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Case Study', path: '/case-study' },
    { name: 'Dubai', path: '/dubai' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-luxury-black/90 backdrop-blur-lg py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xl">F</span>
          </div>
          <span className="font-serif text-2xl tracking-tighter font-bold">
            FROZEN <span className="text-gold">APPLE</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          <button className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-xs uppercase tracking-widest font-bold">
            Book Now
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-luxury-black z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-serif hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/pics/image.png" 
          className="w-full h-full object-cover opacity-60 scale-110"
          alt="Luxury Wedding"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold tracking-[0.5em] uppercase text-sm font-bold mb-6 block">
            The Future of Luxury
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">
            Designing Weddings <br /> 
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">Beyond Imagination</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Where timeless tradition meets futuristic innovation. We craft cinematic experiences that redefine the essence of celebration.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all duration-300 flex items-center gap-2 group">
              Explore Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 border border-white/20 hover:border-gold transition-all duration-300 flex items-center gap-2 uppercase tracking-widest text-sm font-bold">
              <Play size={18} fill="currentColor" /> Watch Film
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent"></div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-luxury-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="/pics/image copy.png" 
              className="w-full h-full object-cover"
              alt="CEO Aditi Sharma"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 glass-panel p-8 rounded-xl max-w-xs">
            <Quote className="text-gold mb-4" size={32} />
            <p className="text-sm italic text-white/80 leading-relaxed mb-4">
              "We don't just plan events; we architect legacies. Every wedding is a universe waiting to be born."
            </p>
            <p className="font-serif text-lg">Aditi Sharma</p>
            <p className="text-xs text-gold uppercase tracking-widest">CEO & Visionary</p>
          </div>
        </div>

        <div>
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
            A Legacy of <span className="text-gold">Innovation</span> & Elegance
          </h2>
          <div className="space-y-6 text-white/60 leading-relaxed">
            <p>
              Frozen Apple Weddings Pvt. Ltd. was founded with a singular mission: to push the boundaries of what is possible in the world of luxury events. Under the leadership of CEO Aditi Sharma, we have transformed from a boutique agency into a global powerhouse.
            </p>
            <p>
              With Brand Ambassador Katrina Kaif representing our commitment to grace and stardom, we blend high-fashion aesthetics with cutting-edge technology to create weddings that are truly out of this world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <p className="text-3xl font-serif text-gold mb-1">2035</p>
              <p className="text-xs uppercase tracking-widest opacity-50">Visionary Future</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-gold mb-1">500+</p>
              <p className="text-xs uppercase tracking-widest opacity-50">Global Weddings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Sparkles className="text-gold" size={32} />,
      title: "Luxury Planning",
      desc: "End-to-end bespoke planning for the world's most discerning couples."
    },
    {
      icon: <Cpu className="text-neon-cyan" size={32} />,
      title: "Futuristic Tech",
      desc: "VR guest zones, AI-generated décor, and holographic storytelling."
    },
    {
      icon: <Globe className="text-gold" size={32} />,
      title: "Global Venues",
      desc: "Exclusive access to our portfolio of 26,000+ luxury properties in Dubai."
    },
    {
      icon: <Zap className="text-neon-cyan" size={32} />,
      title: "Drone Shows",
      desc: "Breathtaking aerial light displays choreographed to your love story."
    }
  ];

  return (
    <section id="services" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Premium Services</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="glass-panel p-10 rounded-2xl transition-all duration-300 hover:border-gold/50 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
              <h3 className="text-xl font-serif mb-4">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsFeature = () => {
  return (
    <section className="py-24 px-6 bg-[#050505] border-t border-b border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none flex justify-end">
        <Star size={400} className="text-gold -mt-24 -mr-24" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-4 py-1 border border-gold text-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-6 rounded-full inline-block">
            Times Of India Exclusive
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
            FUTURISTIC WEDDING EXTRAVAGANZA: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light italic">ADITI AND ROHAN'S 2035 UNION</span>
          </h2>
          <p className="text-white/60 max-w-3xl leading-relaxed md:text-lg">
            Mumbai, India - In a groundbreaking celebration of love and technology, Aditi and Rohan's wedding, planned by <strong className="text-gold font-medium">@FrozenAppleWeddings</strong>, is set to redefine the future of matrimony. This futuristic union, taking place in 2035, promises to be an unforgettable experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl border-t border-gold/30 hover:border-gold/60 transition-colors">
            <h3 className="text-xl font-serif text-gold mb-6 flex items-center gap-3"><Zap size={20} /> Innovative Features</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li><strong className="text-white">Virtual Reality Experience:</strong> Guests will be transported to new dimensions with immersive VR experiences.</li>
              <li><strong className="text-white">AI-Powered Decor:</strong> The venue will be transformed with AI-designed themes and patterns.</li>
              <li><strong className="text-white">Drone Light Show:</strong> A mesmerizing drone display will illuminate the ceremony and reception.</li>
              <li><strong className="text-white">Personalized Wedding Cake:</strong> A 3D-printed masterpiece tailored to the couple's preferences.</li>
            </ul>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl border-t border-gold/30 hover:border-gold/60 transition-colors">
            <h3 className="text-xl font-serif text-gold mb-6 flex items-center gap-3"><Star size={20} /> A Luxurious Affair</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li><strong className="text-white">Futuristic Venue:</strong> The ceremony will take place in a state-of-the-art venue with breathtaking views.</li>
              <li><strong className="text-white">Tech-Infused Attire:</strong> Aditi's stunning wedding dress and Rohan's sleek suit will showcase the latest in fashion technology.</li>
              <li><strong className="text-white">Modern Twists:</strong> Traditional rituals will be reimagined with virtual reality experiences and holographic projections.</li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-2xl border-t border-gold/30 hover:border-gold/60 transition-colors">
            <h3 className="text-xl font-serif text-gold mb-6 flex items-center gap-3"><Cpu size={20} /> Reception Highlights</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li><strong className="text-white">Culinary Innovation:</strong> Advanced culinary technology will prepare a range of cuisines, including vegan and gluten-free options.</li>
              <li><strong className="text-white">Entertainment:</strong> Live music, drone performances, and holographic tributes will make the reception unforgettable.</li>
              <li><strong className="text-white">3D-Printed Favors:</strong> Guests will receive customized, 3D-printed gifts as tokens of appreciation.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const CaseStudy = () => {
  const ceremonyImages = [
    "/pics/image copy 2.png",
    "/pics/image copy 3.png",
    "/pics/image copy 4.png",
    "/pics/image copy 5.png"
  ];

  const receptionImages = [
    "/pics/image copy 6.png",
    "/pics/image copy 7.png",
    "/pics/image copy 8.png",
    "/pics/image copy 9.png"
  ];

  return (
    <section id="case-study" className="py-24 px-6 bg-luxury-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Featured Case Study</span>
            <h2 className="text-4xl md:text-6xl font-serif">Aditi & Rohan <br /><span className="text-white/40 italic">Wedding 2035</span></h2>
          </div>
          <div className="max-w-md text-white/50 text-sm leading-relaxed">
            A cinematic masterpiece blending traditional rituals with 2030s tech. Holographic storytelling met ancient palace grandeur.
          </div>
        </div>

        <div className="space-y-24">
          {/* Ceremony */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gold"></div>
              <h3 className="text-2xl font-serif">The Ceremony Vision</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {ceremonyImages.map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Ceremony" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Reception */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-neon-cyan"></div>
              <h3 className="text-2xl font-serif">The Reception Experience</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {receptionImages.map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-xl ${i === 1 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Reception" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MehendiModule = () => {
  const playlist = [
    { title: "Mehendi Laga Ke Rakhna", cat: "Traditional" },
    { title: "Bhangra Mix 2035", cat: "Punjabi" },
    { title: "London Thumakda (AI Remix)", cat: "Bollywood" },
    { title: "Gidda Beats", cat: "Punjabi" }
  ];

  const decorImages = [
    "/pics/image copy 10.png",
    "/pics/image copy 11.png",
    "/pics/image copy 12.png",
    "/pics/image copy 2.png"
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div className="glass-panel p-10 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Music className="text-gold" />
            <h3 className="text-2xl font-serif">Mehendi Beats</h3>
          </div>
          <div className="space-y-4">
            {playlist.map((song, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors">
                    <Play size={16} className="text-gold group-hover:text-black" />
                  </div>
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest">{song.cat}</p>
                  </div>
                </div>
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-gold"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-serif mb-8">Mehendi Décor Visualization</h3>
          <div className="grid grid-cols-2 gap-4">
            {decorImages.map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                <img src={img} className="w-full h-full object-cover" alt="Mehendi Decor" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DubaiPortfolio = () => {
  return (
    <section id="dubai" className="py-24 px-6 bg-luxury-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <Globe size={800} className="text-gold -mr-64" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl">
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Global Acquisition</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Dubai Portfolio <br /><span className="text-white/40 italic">Hospitality Dominance</span></h2>
          <p className="text-white/60 leading-relaxed mb-12">
            Frozen Apple Weddings has officially acquired a massive hospitality network in Dubai, offering our clients unparalleled access to the city's most prestigious venues.
          </p>
          
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <p className="text-5xl font-serif text-gold mb-2">26,531+</p>
              <p className="text-sm uppercase tracking-widest opacity-50 font-bold">Luxury Hotels</p>
            </div>
            <div>
              <p className="text-5xl font-serif text-gold mb-2">Multi-Tier</p>
              <p className="text-sm uppercase tracking-widest opacity-50 font-bold">Luxury Options</p>
            </div>
          </div>
          
          <button className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gold transition-all duration-300">
            View Dubai Map
          </button>
        </div>
      </div>
    </section>
  );
};

const BudgetEstimator = () => {
  const [guests, setGuests] = useState(100);
  const [luxuryLevel, setLuxuryLevel] = useState(2); // 1: Premium, 2: Ultra, 3: Galactic

  const basePrice = guests * (luxuryLevel === 1 ? 500 : luxuryLevel === 2 ? 1500 : 5000);

  return (
    <div className="glass-panel p-8 rounded-3xl mt-12 text-left">
      <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
        <Zap className="text-gold" size={20} /> Budget Estimator 2035
      </h3>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between text-sm uppercase tracking-widest opacity-50">
            <span>Guest Count</span>
            <span>{guests} Guests</span>
          </div>
          <input 
            type="range" min="50" max="2000" step="50" 
            value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full accent-gold h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 1, label: "Premium", price: "$500/pp" },
            { id: 2, label: "Ultra", price: "$1500/pp" },
            { id: 3, label: "Galactic", price: "$5000/pp" }
          ].map((level) => (
            <button 
              key={level.id}
              onClick={() => setLuxuryLevel(level.id)}
              className={`p-4 rounded-xl border transition-all ${luxuryLevel === level.id ? 'border-gold bg-gold/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
            >
              <p className="text-xs uppercase tracking-widest font-bold mb-1">{level.label}</p>
              <p className="text-[10px] opacity-50">{level.price}</p>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-end">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Estimated Investment</p>
            <p className="text-4xl font-serif text-gold">${basePrice.toLocaleString()}</p>
          </div>
          <button className="text-xs uppercase tracking-widest font-bold text-gold hover:text-white transition-colors">
            Detailed Quote →
          </button>
        </div>
      </div>
    </div>
  );
};

const VRSimulator = () => {
  return (
    <div className="relative group cursor-crosshair rounded-3xl overflow-hidden border border-white/10 aspect-video mb-12">
      <img 
        src="/pics/image copy 4.png" 
        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
        alt="VR Simulation"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
        <div className="w-20 h-20 rounded-full border-2 border-neon-cyan flex items-center justify-center mb-4 animate-pulse">
          <Cpu className="text-neon-cyan" size={32} />
        </div>
        <h3 className="text-2xl font-serif mb-2">Guest Experience Simulator</h3>
        <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan font-bold">Launch VR Preview</p>
      </div>
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="px-3 py-1 bg-red-500/80 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div> Live Simulation
        </div>
      </div>
    </div>
  );
};



const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-luxury-black">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Get in Touch</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Start Your <br /><span className="text-gold">Legacy</span></h2>
          <p className="text-white/60 mb-12 leading-relaxed">
            Ready to design a wedding that transcends time? Our team of visionary architects is ready to bring your dream to life.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40">Global HQ</p>
                <p>Dubai & Mumbai</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold">
                <Send size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40">Email</p>
                <p>hello@frozenappleaiweddings.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-3xl">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest opacity-50">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest opacity-50">Email Address</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest opacity-50">Budget Range</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none appearance-none">
                  <option className="bg-luxury-black">$100k - $500k</option>
                  <option className="bg-luxury-black">$500k - $2M</option>
                  <option className="bg-luxury-black">$2M+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest opacity-50">Event Type</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none" placeholder="e.g. Destination Wedding" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest opacity-50">Your Vision</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none min-h-[120px]"></textarea>
            </div>
            <button className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all rounded-xl">
              Plan My Wedding
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-luxury-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">F</span>
          </div>
          <span className="font-serif text-xl tracking-tighter font-bold">
            FROZEN <span className="text-gold">APPLE</span>
          </span>
        </div>
        
        <div className="text-white/40 text-xs uppercase tracking-widest">
          © 2026 Frozen Apple Weddings Pvt. Ltd. | Designing the Future
        </div>
        
        <div className="flex gap-6">
          <Camera size={20} className="text-white/40 hover:text-gold cursor-pointer transition-colors" />
          <Globe size={20} className="text-white/40 hover:text-gold cursor-pointer transition-colors" />
          <Zap size={20} className="text-white/40 hover:text-gold cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
};

const Home = () => (
  <>
    <Hero />
    <NewsFeature />
    <MehendiModule />
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <VRSimulator />
        <BudgetEstimator />
      </div>
    </section>
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow pt-24 md:pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-study" element={<CaseStudy />} />
            <Route path="/dubai" element={<DubaiPortfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
