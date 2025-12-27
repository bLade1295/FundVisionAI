
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [proactiveAI, setProactiveAI] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+91 98765 43210'
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
      // Implementation for logout would go here
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/sarah/120/120" 
              className="w-24 h-24 rounded-full ring-4 ring-orange-100 object-cover" 
              alt="Profile" 
            />
            <button className="absolute bottom-0 right-0 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-orange-600 transition-colors">
              <i className="fas fa-camera text-xs"></i>
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-3">
                <input 
                  type="text" 
                  className="block w-full px-3 py-2 bg-orange-50 border border-orange-400 rounded-lg text-sm font-bold text-orange-900 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  placeholder="Enter Name"
                />
                <input 
                  type="email" 
                  className="block w-full px-3 py-2 bg-orange-50 border border-orange-400 rounded-lg text-sm font-bold text-orange-900 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  placeholder="Enter Email"
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-800">{userInfo.name}</h2>
                <p className="text-slate-500 text-sm">{userInfo.email}</p>
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Pro Member
                </div>
              </>
            )}
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 border border-orange-200 rounded-xl text-sm font-bold text-orange-600 hover:bg-orange-50 transition-colors shadow-sm active:translate-y-0.5"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <i className="fas fa-user-shield mr-3 text-orange-500"></i>
            Account & Security
          </h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 hover:bg-orange-50 rounded-2xl transition-colors group text-left">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white transition-colors">
                  <i className="fas fa-lock text-slate-500 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Change Password</p>
                  <p className="text-[10px] text-slate-400">Update your account password</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-slate-300 text-xs"></i>
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-orange-50 rounded-2xl transition-colors group text-left">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white transition-colors">
                  <i className="fas fa-fingerprint text-slate-500 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Two-Factor Auth</p>
                  <p className="text-[10px] text-slate-400">Add an extra layer of security</p>
                </div>
              </div>
              <div className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Setup</div>
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <i className="fas fa-sliders-h mr-3 text-orange-500"></i>
            App Preferences
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-700">Push Notifications</p>
                <p className="text-[10px] text-slate-400">Alerts for unusual spending</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-11 h-6 rounded-full transition-colors relative ${notifications ? 'bg-orange-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-5' : ''}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-700">AI Proactive Insights</p>
                <p className="text-[10px] text-slate-400">Get automated advice as you spend</p>
              </div>
              <button 
                onClick={() => setProactiveAI(!proactiveAI)}
                className={`w-11 h-6 rounded-full transition-colors relative ${proactiveAI ? 'bg-orange-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${proactiveAI ? 'translate-x-5' : ''}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-700">Primary Currency</p>
                <p className="text-[10px] text-slate-400">Currently set to Rupees</p>
              </div>
              <span className="text-sm font-bold text-slate-900">INR (₹)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-6">
        <h3 className="text-lg font-bold text-red-600 mb-6 flex items-center">
          <i className="fas fa-exclamation-triangle mr-3"></i>
          Account Actions
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
          <button className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors flex items-center justify-center">
            <i className="fas fa-trash-alt mr-2"></i>
            Delete Account
          </button>
        </div>
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-slate-400 font-medium tracking-wide">
          FundVision v2.4.0 • Built with ❤️ for Financial Freedom
        </p>
      </div>
    </div>
  );
};

export default Settings;
