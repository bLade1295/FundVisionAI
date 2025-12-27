
import React from 'react';
import { Notification } from '../types';

interface NotificationsProps {
  items: Notification[];
  onMarkRead: (id: string) => void;
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ items, onMarkRead, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop Overlay to prevent background clicks */}
      <div className="fixed inset-0 bg-transparent z-[90] md:hidden" onClick={onClose} />
      
      <div className="fixed md:absolute top-16 md:top-auto right-4 md:right-0 mt-3 w-[calc(100vw-2rem)] md:w-96 bg-white rounded-2xl shadow-2xl border border-orange-100 z-[100] overflow-hidden animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
        <div className="p-4 border-b border-orange-50 bg-orange-50/30 flex justify-between items-center">
          <h4 className="font-bold text-slate-800 text-sm md:text-base">Alerts & Insights</h4>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 bg-white rounded-full shadow-sm">
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
        
        <div className="max-h-[60vh] md:max-h-[400px] overflow-y-auto overscroll-contain">
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <i className="fas fa-bell-slash text-slate-200 text-3xl mb-3"></i>
              <p className="text-slate-400 text-sm">All caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-orange-50">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 hover:bg-orange-50/30 transition-colors cursor-pointer relative ${!item.isRead ? 'bg-orange-50/10' : ''}`}
                  onClick={() => onMarkRead(item.id)}
                >
                  {!item.isRead && (
                    <span className="absolute top-5 right-5 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white"></span>
                  )}
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                      item.type === 'alert' ? 'bg-red-50 text-red-500' : 
                      item.type === 'tip' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                    }`}>
                      <i className={`fas ${
                        item.type === 'alert' ? 'fa-exclamation-triangle' : 
                        item.type === 'tip' ? 'fa-lightbulb' : 'fa-check-circle'
                      }`}></i>
                    </div>
                    <div className="flex-1 pr-4">
                      <h5 className="text-sm font-bold text-slate-800">{item.title}</h5>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.message}</p>
                      <span className="text-[10px] text-slate-400 mt-2 block font-bold uppercase tracking-widest">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-3 bg-slate-50 border-t border-orange-50 text-center">
          <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:text-orange-700 py-2 w-full">
            Clear All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default Notifications;
