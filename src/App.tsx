import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Play, Music, MapPin, 
  Sparkles, Cpu, Globe, Camera, Send,
  ArrowRight, Star, Quote, Zap,
  Loader2
} from 'lucide-react';
import { supabase, MediaItem } from './lib/supabase';
import AdminPanel from './components/Admin';
import { initializeRazorpayPayment } from './services/razorpayService';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Components ---

const Navbar = ({ onBookNow }: { onBookNow: () => void }) => {
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
          <button 
            onClick={onBookNow}
            className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-xs uppercase tracking-widest font-bold"
          >
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
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookNow();
                }}
                className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm mt-4"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBookNow }: { onBookNow: () => void }) => {
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
            <button 
              onClick={onBookNow}
              className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all duration-300 flex items-center gap-2 group"
            >
              Book Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
  const premiumServices = [
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

  const comprehensiveServices = [
    "Venue selection and booking",
    "Guest management and invitations",
    "Catering and beverage services",
    "Decor and design",
    "Photography and videography",
    "Wedding attire and accessories",
    "Entertainment and music",
    "Wedding cake design and catering",
    "Floral arrangements",
    "Transportation and accommodation",
    "Wedding favors and gifts",
    "Wedding planner and coordinator",
    "Budget management",
    "Timeline creation",
    "Vendor management",
    "Wedding website creation",
    "RSVP tracking",
    "Seating arrangement",
    "Menu planning",
    "Bar services",
    "Lighting and sound",
    "Fireworks and special effects",
    "Wedding favors for guests",
    "Honeymoon planning",
    "Wedding day coordination",
    "Pre-wellness programs",
    "Bridal shower planning",
    "Bachelorette party planning",
    "Rehearsal dinner planning",
    "Post-wedding brunch",
    "Wedding anniversary planning",
    "Custom wedding invitations",
    "Wedding stationery design",
    "Wedding hashtag creation",
    "Social media management",
    "Wedding photography editing",
    "Videography editing",
    "Wedding album design",
    "Wedding video creation",
    "Wedding decor rentals",
    "Furniture and equipment rentals",
    "Tent and canopy rentals",
    "Wedding linens and drapes",
    "Chair and table rentals",
    "Glassware and china rentals",
    "Cutlery and flatware rentals",
    "Bar equipment rentals",
    "Sound and lighting equipment rentals",
    "Stage and dance floor rentals",
    "Wedding officiant services",
    "Wedding ceremony music",
    "Wedding processional music",
    "Wedding recessional music",
    "Wedding transportation services",
    "Luxury car rentals",
    "Helicopter tours",
    "Hot air balloon rides",
    "Sunset cruises",
    "Private yacht rentals",
    "Wedding planners and coordinators",
    "Day-of coordination",
    "Wedding consulting",
    "Budgeting and financial planning",
    "Vendor referrals",
    "Timeline creation",
    "Day-of logistics",
    "Setup and teardown",
    "Wedding rehearsal coordination",
    "Wedding day emergency kit",
    "Wedding day timeline",
    "Wedding ceremony script",
    "Wedding vow writing",
    "Wedding toast writing",
    "Wedding speech writing",
    "Wedding day photography"
  ];

  return (
    <section id="services" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Premium Services</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {premiumServices.map((service, idx) => (
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

        <div>
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Comprehensive Offerings</span>
            <h3 className="text-3xl md:text-5xl font-serif mb-6">Every Detail, Perfected</h3>
            <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
              From the grandest visions to the smallest nuances, our complete A-Z catalog ensures no detail of your celebration is ever overlooked.
            </p>
          </div>
          
          <div className="glass-panel p-8 md:p-12 rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4">
              {comprehensiveServices.map((service, idx) => (
                <div key={idx} className="flex items-start gap-3 border-b border-white/5 pb-3 hover:border-gold/30 transition-colors group">
                  <span className="text-gold font-serif text-sm opacity-50 group-hover:opacity-100 transition-opacity mt-0.5">{(idx + 1).toString().padStart(2, '0')}.</span>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors leading-snug">{service}</span>
                </div>
              ))}
            </div>
          </div>
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
            Mumbai, India - In a groundbreaking celebration of love and technology, Aditi and Rohan's wedding, planned by <strong className="text-gold font-medium">@FrozenAppleAiWeddings</strong>, is set to redefine the future of matrimony. This futuristic union, taking place in 2035, promises to be an unforgettable experience.
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
          
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                <span className="font-bold text-xl">@</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Global Business Handle</p>
                <p className="font-serif text-xl text-gold mb-1">@FrozenAppleAiWeddings</p>
                <div className="flex gap-2 text-[10px] md:text-xs text-white/60 font-medium">
                  <span className="px-2 py-1 bg-white/5 rounded-md border border-white/5">Destination Weddings</span>
                  <span className="px-2 py-1 bg-white/5 rounded-md border border-white/5">Decor</span>
                  <span className="px-2 py-1 bg-white/5 rounded-md border border-white/5">Entertainment</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-neon-cyan shrink-0 border border-neon-cyan/20">
                <span className="font-bold text-xl">@</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Local Support</p>
                <p className="text-lg text-neon-cyan font-medium">@SahilThakur</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                <Send size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Email</p>
                <p className="text-white/80">hello@frozenappleaiweddings.com</p>
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
        <div className="flex items-center gap-2 w-full md:w-1/3 justify-center md:justify-start">
          <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">F</span>
          </div>
          <span className="font-serif text-xl tracking-tighter font-bold">
            FROZEN <span className="text-gold">APPLE</span>
          </span>
        </div>
        
        <div className="text-white/40 text-xs uppercase tracking-widest text-center w-full md:w-1/3">
          © 2026 Frozen Apple Weddings Pvt. Ltd. | Designing the Future
        </div>
        
        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
          <a 
            href="https://www.webtotalsolution.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-xs uppercase tracking-widest text-white/40 hover:text-gold transition-colors font-bold"
          >
            Made by Web Total Solution
          </a>
        </div>
      </div>
    </footer>
  );
};

const FrozenAppleGallery = () => {
  const [cloudMedia, setCloudMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const localImages = [
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.22 AM (1).jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.22 AM (2).jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.22 AM.jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.23 AM (1).jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.23 AM (2).jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.23 AM.jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.24 AM (1).jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.24 AM (2).jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.27.24 AM.jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.29.39 AM (1).jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.29.39 AM.jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.29.40 AM (1).jpeg",
    "/pics/frozen apple/WhatsApp Image 2026-03-28 at 6.29.40 AM.jpeg"
  ];

  useEffect(() => {
    const fetchCloudMedia = async () => {
      try {
        const { data, error } = await supabase
          .from('media')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data) setCloudMedia(data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCloudMedia();
  }, []);

  return (
    <section className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Our Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
            Frozen Apple <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light italic">Moments</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="text-gold animate-spin mb-4" size={40} />
            <p className="text-white/40 font-serif italic">Loading masterpieces...</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {/* Show local images first, then cloud media */}
            {localImages.map((img, i) => (
              <motion.div 
                key={`local-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="break-inside-avoid overflow-hidden rounded-2xl relative group mb-6"
              >
                <img 
                  src={img} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={`Frozen Apple Moment ${i + 1}`} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                    <Camera size={16} className="text-black" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Cloud Media */}
            {cloudMedia.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="break-inside-avoid overflow-hidden rounded-2xl relative group mb-6 border border-white/5"
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    controls={false}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img 
                    src={item.url} 
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={`Cloud Moment ${i + 1}`} 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                    {item.type === 'video' ? <Play size={16} className="text-black" /> : <Camera size={16} className="text-black" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const EpicEvent = () => {
  return (
    <section className="py-24 px-6 bg-[#050505] relative overflow-hidden border-t border-b border-white/10">
      <div className="absolute top-0 left-0 w-1/2 h-full opacity-5 pointer-events-none flex items-center">
        <Sparkles size={600} className="text-gold -ml-32" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Unprecedented Scale</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
            A Massive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light italic">Event Experience</span> 😮
          </h2>
          
          <div className="space-y-6 text-white/70 text-lg leading-relaxed">
            <p>
              Wow, this is a massive event! 😮 Frozen Apple Events is indeed a top-notch event management company, specializing in wedding planning, Indian weddings, and palace weddings, with a strong presence in Udaipur and Delhi. They've got an impressive portfolio, having organized over 200 destination weddings and boasting 100% satisfaction rate among NRI and Indian couples ¹ ² ³.
            </p>
            <p className="border-l-2 border-gold pl-6 py-2">
              The event details are mind-blowing - City Palace as the venue, 1024 bouncers for security, and a host like Mandira Bedi! 🎉 They're leaving no stone unturned, with premium vendors, top-notch decor, and entertainment by FAAM Talent.
            </p>
          </div>

          <div className="mt-12 p-8 glass-panel rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-500">
            <p className="font-serif text-xl mb-6 text-white text-center">What would you like to know next about Frozen Apple Events or this specific event?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-light transition-all rounded-xl">
                Explore Event
              </button>
              <button className="px-6 py-3 border border-white/20 hover:border-gold text-white font-bold uppercase tracking-widest text-xs transition-all rounded-xl">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4">
            <div className="glass-panel p-6 md:p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-500 border border-white/5 hover:border-gold/30">
              <MapPin className="text-gold mx-auto mb-4" size={40} />
              <p className="text-2xl md:text-3xl font-serif text-white">City Palace</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">Udaipur Venue</p>
            </div>
            <div className="glass-panel p-6 md:p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-500 border border-white/5 hover:border-gold/30">
              <Star className="text-gold mx-auto mb-4" size={40} />
              <p className="text-2xl md:text-3xl font-serif text-white">100%</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">Satisfaction Rate</p>
            </div>
          </div>
          <div className="space-y-4 mt-8 md:mt-12">
            <div className="glass-panel p-6 md:p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-500 border border-white/5 hover:border-neon-cyan/30">
              <Cpu className="text-neon-cyan mx-auto mb-4" size={40} />
              <p className="text-2xl md:text-3xl font-serif text-white">1024</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">Bouncers</p>
            </div>
            <div className="glass-panel p-6 md:p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-500 border border-white/5 hover:border-gold/30">
              <Music className="text-gold mx-auto mb-4" size={40} />
              <p className="text-2xl md:text-3xl font-serif text-white">FAAM</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">Talent Entertainment</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GlobalAcquisitionNews = () => {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a] border-t border-b border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none flex justify-end">
        <Globe size={400} className="text-gold -mt-24 -mr-24" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-4 py-1 border border-gold text-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-6 rounded-full inline-block">
            Times Of India Exclusive
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif mb-6 leading-tight max-w-5xl">
            LOCAL ENTREPRENEUR SHRI SAHIL THAKUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light italic">MAKES HISTORY WITH GLOBAL HOTEL ACQUISITION</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-white/70 text-lg leading-relaxed font-light">
          <p><strong className="text-white font-medium">MUMBAI:</strong> In a groundbreaking move, Indian entrepreneur <strong className="text-gold font-medium">Shri Sahil Thakur</strong> has successfully acquired ownership of every hotel worldwide, marking a significant turning point in the hospitality industry. This unprecedented achievement promises to reshape the future of global tourism and raises questions about the potential impact on travel patterns, pricing strategies, and job markets.</p>
          
          <p>The acquisition, finalized recently, saw Thakur's investment group take control of major hotel chains, independent hotels, and boutique accommodations across the globe. While financial details remain confidential, industry experts estimate the total value to be in the trillions.</p>
          
          <div className="p-8 my-10 glass-panel rounded-2xl border-l-4 border-l-gold border-t border-r border-b border-white/5 bg-white/5">
            <Quote className="text-gold opacity-50 mb-4" size={32} />
            <p className="italic text-xl text-white font-serif">"As the world watches with anticipation, stakeholders closely monitor the developments, speculating about the potential implications on the hospitality industry. Will this consolidation lead to standardized services, enhanced customer experiences, or innovative offerings? Only time will tell."</p>
          </div>
          
          <p className="border-t border-white/10 pt-6 text-sm uppercase tracking-widest text-center text-gold">Stay tuned for further updates on this developing story.</p>
        </div>
      </div>
    </section>
  );
};

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '1000'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await initializeRazorpayPayment(
        Number(formData.amount),
        { name: formData.name, email: formData.email },
        (res) => {
          alert(`Payment Successful! Order ID: ${res.razorpay_order_id}`);
          onClose();
        },
        (err) => {
          alert(`Payment Failed: ${err.description || 'Unknown error'}`);
        }
      );
    } catch (error) {
      console.error(error);
      alert('Failed to initiate payment. Check server settings.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-xl border border-gold/30"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif">Book Your <span className="text-gold">Legacy</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest opacity-50 block">Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest opacity-50 block">Email</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none"
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest opacity-50 block">Consultation Fee (INR)</label>
            <div className="relative">
              <input 
                required
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none pl-12 text-gold font-bold text-xl"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold font-bold">₹</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-all rounded-xl mt-4 flex items-center justify-center gap-2"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : null}
            {isProcessing ? 'Initializing Checkout...' : 'Secure Checkout via Razorpay'}
          </button>
          
          <p className="text-[10px] text-center text-white/30 uppercase tracking-[0.2em]">
            Secured by Razorpay. 256-bit SSL encryption.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

const Home = ({ onBookNow }: { onBookNow: () => void }) => (
  <>
    <Hero onBookNow={onBookNow} />
    <NewsFeature />
    <GlobalAcquisitionNews />
    <EpicEvent />
    <FrozenAppleGallery />
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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar onBookNow={() => setIsBookingModalOpen(true)} />
        <div className="flex-grow pt-24 md:pt-0">
          <Routes>
            <Route path="/" element={<Home onBookNow={() => setIsBookingModalOpen(true)} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-study" element={<CaseStudy />} />
            <Route path="/dubai" element={<DubaiPortfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
        <Footer />

        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}
