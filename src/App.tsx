/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  Phone, 
  Upload, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  MessageSquare,
  Camera,
  MapPin,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Plus, 
  Heart, 
  Pill,
  Clock,
  CheckCircle2,
  X,
  Droplets,
  Zap,
  Info
} from 'lucide-react';

// Types
interface Medicine {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  description: string;
  dosage?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

// Data
const MEDICINES: Medicine[] = [
  {
    id: '1',
    name: 'Panadol Extra',
    brand: 'GlaxoSmithKline',
    price: 12.50,
    image: 'https://picsum.photos/seed/panadol/400/400',
    category: 'OTC Meds',
    description: 'Effective pain relief and gentle on stomachs.',
    dosage: '500mg'
  },
  {
    id: '2',
    name: 'Neurobion Forte',
    brand: 'Procter & Gamble',
    price: 8.90,
    image: 'https://picsum.photos/seed/neurobion/400/400',
    category: 'Vitamins',
    description: 'Vitamin B complex for nerve health.',
    dosage: 'Standard'
  },
  {
    id: '3',
    name: 'Cetirizine HCI',
    brand: 'Apothecary Labs',
    price: 15.20,
    image: 'https://picsum.photos/seed/allergy/400/400',
    category: 'OTC Meds',
    description: '24-hour relief from indoor and outdoor allergies.',
    dosage: '10mg'
  },
  {
    id: '4',
    name: 'Multivitamin Gold',
    brand: 'BioHealth',
    price: 45.00,
    image: 'https://picsum.photos/seed/vitamins/400/400',
    category: 'Vitamins',
    description: 'Premium daily multivitamin for immunity boost.',
    dosage: '60 Capsules'
  },
  {
    id: '5',
    name: 'Gentle Baby Lotion',
    brand: 'NurtureCare',
    price: 22.15,
    image: 'https://picsum.photos/seed/baby/400/400',
    category: 'Baby Care',
    description: 'Hypoallergenic lotion for sensitive skin.',
    dosage: '300ml'
  },
  {
    id: '6',
    name: 'Antiseptic Solution',
    brand: 'CleanSafe',
    price: 4.50,
    image: 'https://picsum.photos/seed/clean/400/400',
    category: 'Daily Needs',
    description: 'Essential for first aid and surface sterilization.',
    dosage: '100ml'
  },
  {
    id: '7',
    name: 'Fish Oil Omega-3',
    brand: 'NutureMax',
    price: 29.99,
    image: 'https://picsum.photos/seed/fishoil/400/400',
    category: 'Vitamins',
    description: 'Heart and brain health support with high-potency EPA/DHA.',
    dosage: '1000mg'
  },
  {
    id: '8',
    name: 'Infant Formula',
    brand: 'BabyGrow',
    price: 34.50,
    image: 'https://picsum.photos/seed/formula/400/400',
    category: 'Baby Care',
    description: 'Complete nutrition for infants 0-6 months.',
    dosage: '400g'
  },
  {
    id: '9',
    name: 'Hand Sanitizer',
    brand: 'PureHands',
    price: 3.25,
    image: 'https://picsum.photos/seed/sanitizer/400/400',
    category: 'Daily Needs',
    description: 'Kill 99.9% of germs instantly without water.',
    dosage: '50ml'
  },
  {
    id: '10',
    name: 'Ibuprofen',
    brand: 'ReliefCo',
    price: 11.00,
    image: 'https://picsum.photos/seed/ibuprofen/400/400',
    category: 'OTC Meds',
    description: 'Fast-acting anti-inflammatory and pain reliever.',
    dosage: '200mg'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Chronic Patient",
    text: "Pharmacity has changed the way I manage my medicines. The direct upload for prescriptions is a lifesaver!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Local Resident",
    text: "Fastest delivery in town. I received my order in less than 20 minutes. Highly recommended!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: 3,
    name: "Eleanor Rigby",
    role: "Elderly Patient",
    text: "The website is so easy to use even for someone who isn't tech-savvy. The support team is wonderful too.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=eleanor"
  }
];

export default function App() {
  const [cartCount, setCartCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMedicines = useMemo(() => {
    return MEDICINES.filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          med.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const simulateUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => setUploadStatus('success'), 2000);
    setTimeout(() => setUploadStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-surface selection:bg-brand-blue/10">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-border h-16 flex items-center px-4 sm:px-8 justify-between shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedCategory('All')}>
          <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white">
            <Plus className="w-6 h-6 stroke-[3px]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Pharma<span className="text-brand-emerald">city</span>
          </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-10">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search medicine, health products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-full px-5 py-2 text-sm focus:ring-2 focus:ring-brand-blue transition-all outline-none text-slate-700"
            />
            <Search className="absolute right-3 top-2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="relative group cursor-pointer p-2 rounded-full hover:bg-slate-50 transition-colors">
            <ShoppingBag className="w-6 h-6 text-slate-600" />
            <span className="absolute top-0.5 right-0.5 bg-brand-emerald text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
              {cartCount}
            </span>
          </div>
          <button className="btn-minimal-urgent hidden sm:block">
            Urgent Call: 911
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Main Hero & Action Section */}
        <div className="container mx-auto px-4 sm:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (7/12) */}
            <div className="md:col-span-7 space-y-12">
              
              {/* Hero Copy */}
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-xs font-bold px-4 py-1.5 rounded-full"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Licensed & Verified Pharmacy
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.05]"
                >
                  Your Trusted Neighborhood <br />
                  <span className="text-brand-blue">Pharmacy, Delivered.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-500 text-lg max-w-lg leading-relaxed"
                >
                  Quality healthcare essentials and expert medical advice, delivered to your doorstep in 30 minutes. 
                  Your health is our priority.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <button className="btn-minimal-primary" onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })}>
                    Shop Medicines
                  </button>
                  <button className="btn-minimal-outline">
                    Check Rewards
                  </button>
                </motion.div>
              </div>

              {/* Quick Categories Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {[
                  { name: 'Baby Care', color: 'orange', icon: ShoppingBag },
                  { name: 'Vitamins', color: 'purple', icon: Heart },
                  { name: 'Daily Needs', color: 'blue', icon: Pill },
                  { name: 'OTC Meds', color: 'emerald', icon: ShieldCheck }
                ].map((category, i) => (
                  <motion.div 
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`card-minimal flex flex-col items-center text-center gap-3 group cursor-pointer border-2 ${selectedCategory === category.name ? 'border-brand-blue bg-blue-50/50' : 'border-slate-border-light'}`}
                  >
                    <div className={`w-12 h-12 bg-${category.name === 'OTC Meds' ? 'emerald' : category.color}-100 text-${category.name === 'OTC Meds' ? 'emerald' : category.color}-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-tighter">
                      {category.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column (5/12) */}
            <div className="md:col-span-5 flex flex-col gap-8">
              
              {/* Prescription Upload Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-brand-emerald rounded-[2rem] p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl flex-1 flex flex-col justify-center min-h-[450px]"
              >
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-3xl lg:text-4xl font-bold">Upload Prescription</h2>
                    <p className="text-emerald-50 opacity-90 leading-relaxed">
                      Frictionless reordering. Simply snap a photo or drop your file here 
                      to get your meds instantly.
                    </p>
                  </div>

                  <div 
                    onClick={simulateUpload}
                    className={`relative border-2 border-dashed rounded-2xl py-12 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${
                      uploadStatus === 'idle' ? 'border-white/30 bg-white/10 hover:bg-white/20' : 
                      uploadStatus === 'uploading' ? 'border-brand-blue bg-white/30 animate-pulse' :
                      'border-white bg-white/40'
                    }`}
                  >
                    {uploadStatus === 'idle' && (
                      <>
                        <Upload className="w-8 h-8 text-white/60 group-hover:text-white transition-colors" />
                        <div className="text-center">
                          <span className="block text-sm font-medium">Click to upload or drag & drop</span>
                          <span className="block text-[10px] uppercase tracking-widest opacity-60 mt-1">JPG, PNG or PDF (Max 10MB)</span>
                        </div>
                      </>
                    )}
                    {uploadStatus === 'uploading' && (
                      <div className="text-center space-y-2">
                        <Clock className="w-8 h-8 text-white mx-auto animate-spin" />
                        <span className="block text-sm font-bold uppercase tracking-widest">Processing...</span>
                      </div>
                    )}
                    {uploadStatus === 'success' && (
                      <div className="text-center space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-white mx-auto" />
                        <span className="block text-sm font-bold uppercase tracking-widest">Rx Received!</span>
                        <span className="block text-[10px] opacity-80">Our pharmacist will call you soon.</span>
                      </div>
                    )}
                  </div>

                  <button 
                    disabled={uploadStatus === 'uploading'}
                    className="w-full bg-white text-brand-emerald py-5 rounded-xl font-black text-lg shadow-xl shadow-emerald-900/20 transform transition-transform hover:scale-[1.02] active:scale-100 disabled:opacity-50 disabled:scale-100"
                  >
                    Request Medicine Now
                  </button>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              </motion.div>

              {/* Trust Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="card-minimal flex items-center justify-between py-5 px-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <img src={TESTIMONIALS[0].avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" referrerPolicy="no-referrer" alt="" />
                    <img src={TESTIMONIALS[1].avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" referrerPolicy="no-referrer" alt="" />
                    <img src={TESTIMONIALS[2].avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" referrerPolicy="no-referrer" alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">12k+ Happy Patients</p>
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-brand-emerald font-bold tracking-tighter">★★★★★ 4.9/5 Rating</p>
                    </div>
                  </div>
                </div>
                
                <div className="h-10 w-[1px] bg-slate-100 hidden sm:block"></div>
                
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Verified Secure</p>
                  <div className="flex gap-2 justify-end">
                    <ShieldCheck className="w-5 h-5 text-brand-blue" />
                    <ShieldCheck className="w-5 h-5 text-brand-emerald" />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>

        {/* Featured Products Carousel */}
        <section id="featured-products" className="py-20 bg-white overflow-hidden">
          <div className="section-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-4">
                <span className="text-brand-blue font-black uppercase tracking-widest text-[10px]">Stock up essentials</span>
                <h2 className="text-4xl font-black text-slate-900">Featured Health Items</h2>
              </div>
              <div className="flex gap-2">
                {['All', 'OTC Meds', 'Vitamins', 'Baby Care', 'Daily Needs'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredMedicines.map((med) => (
                  <motion.div
                    layout
                    key={med.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="card-minimal flex flex-col group"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl mb-4 bg-slate-50">
                      <img 
                        src={med.image} 
                        alt={med.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      {med.dosage && (
                        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                          {med.dosage}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-grow space-y-1">
                      <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">{med.brand}</p>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">{med.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{med.description}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                      <div>
                        <span className="text-xl font-black text-slate-900 px-1">$</span>
                        <span className="text-2xl font-black text-slate-900 leading-none">{med.price.toFixed(2).split('.')[0]}</span>
                        <span className="text-sm font-bold text-slate-900">.{med.price.toFixed(2).split('.')[1]}</span>
                      </div>
                      <button 
                        onClick={handleAddToCart}
                        className="w-10 h-10 bg-brand-blue text-white rounded-lg flex items-center justify-center hover:bg-brand-blue-dark transition-all transform active:scale-90"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredMedicines.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <Search className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">No results found</h3>
                  <p className="text-slate-500">Try adjusting your search or category filters.</p>
                </div>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="text-brand-blue font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 bg-slate-50">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-white rounded-2xl flex items-center justify-center text-brand-emerald shadow-sm">
                  <Truck className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">Lighning Fast Delivery</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Doorstep delivery within 30 minutes in city areas. Track your rider in real-time.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">24/7 Pharmacist Chat</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Free medical consultations with verified professionals anytime, day or night.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">Tested & Certified</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Every bottle is tracked from production to your pocket. 100% original guaranteed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Social Proof */}
        <section id="trust-social" className="py-24 bg-white">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-brand-emerald font-black uppercase tracking-widest text-[10px]">Real Stories</span>
              <h2 className="text-4xl font-black text-slate-900">Loved by 12,000+ Families</h2>
              <p className="text-slate-500">Don't just take our word for it. Here is what our community is saying about Pharmacity.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="card-minimal flex flex-col gap-6 relative">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 italic leading-relaxed font-medium">"{t.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 leading-none">{t.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{t.role}</p>
                    </div>
                  </div>
                  <X className="absolute top-4 right-4 w-4 h-4 text-slate-100" />
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="mt-24 pt-12 border-t border-slate-100 flex flex-wrap justify-center gap-12 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2 font-black text-slate-900"><Droplets className="w-5 h-5" /> PHARMA COUNCIL</div>
              <div className="flex items-center gap-2 font-black text-slate-900"><Zap className="w-5 h-5" /> FDA APPROVED</div>
              <div className="flex items-center gap-2 font-black text-slate-900"><ShieldCheck className="w-5 h-5" /> SECURE HEALTH</div>
              <div className="flex items-center gap-2 font-black text-slate-900"><CheckCircle2 className="w-5 h-5" /> VERIFIED SITE</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-slate-900 text-white pt-20 pb-10">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center text-white">
                  <Plus className="w-5 h-5 stroke-[3px]" />
                </div>
                <span className="text-xl font-bold tracking-tight">Pharmacity</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering neighborhoods with accessible healthcare. We are more than a pharmacy; we are your health partners.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-blue transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-blue transition-colors"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-blue transition-colors"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-sm uppercase tracking-widest text-slate-500">Quick Links</h5>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Medicines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vitamins & Supps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Personal Care</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-sm uppercase tracking-widest text-slate-500">Support</h5>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refunds & Returns</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-sm uppercase tracking-widest text-slate-500">Newsletter</h5>
              <p className="text-xs text-slate-400">Get healthy tips and exclusive discounts every week.</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Your email" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm flex-grow outline-none focus:ring-1 focus:ring-brand-blue" />
                <button className="bg-brand-blue p-2 rounded-lg hover:bg-brand-blue-dark transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-600">
                <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> 123 Health Ave, NY</span>
                <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> +1 800-PHARMA</span>
              </div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest font-black flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> NO MEDICAL ADVICE INTENDED
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-700 leading-relaxed max-w-3xl mx-auto">
                DISCLAIMER: Information provided on this platform is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-6 right-6 z-[60]"
      >
        <button className="w-14 h-14 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-xl shadow-brand-blue/30 hover:scale-110 active:scale-95 transition-all group relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -left-1 w-4 h-4 bg-brand-emerald rounded-full border-2 border-white animate-pulse"></span>
          <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold text-xs">
            Chat with Pharmacist
          </div>
        </button>
      </motion.div>
    </div>
  );
}
