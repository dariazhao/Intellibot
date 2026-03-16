'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  type: 'competitor_alert' | 'competitor_news' | 'account_risk' | 'deal_update' | 'battlecard_stale';
  title: string;
  description: string;
  time: string;
  arrivedAt?: number;
}

const TYPE_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  competitor_news: { label: 'NEWS', color: '#f2762e', icon: '📰' },
  competitor_alert: { label: 'COMP ALERT', color: '#da545b', icon: '⚔️' },
  account_risk: { label: 'RISK', color: '#e5a00d', icon: '⚠️' },
  deal_update: { label: 'DEAL', color: '#1a8dff', icon: '💼' },
  battlecard_stale: { label: 'STALE', color: '#9b59b6', icon: '📋' },
};

// Notifications that "arrive" over time after page load
const INCOMING_NOTIFICATIONS: Notification[] = [
  {
    id: 'live-1',
    type: 'competitor_news',
    title: 'Synthetica AI raises $180M Series C',
    description: 'Valuation reaches $2.1B — expanding enterprise sales team by 3x this quarter.',
    time: 'Just now',
  },
  {
    id: 'live-2',
    type: 'competitor_alert',
    title: 'Lakehouse.io detected in Meridian tech stack',
    description: 'SDK references found in public GitHub repos. Possible unauthorized POC underway.',
    time: '1m ago',
  },
  {
    id: 'live-3',
    type: 'account_risk',
    title: 'Apex Healthcare health score dropped to 65',
    description: 'Key champion Dr. Rachel Kim has gone quiet — no Gong activity in 21 days.',
    time: '3m ago',
  },
  {
    id: 'live-4',
    type: 'deal_update',
    title: 'Quantum Logistics moved to Negotiation',
    description: '$1.2M deal advanced from Technical Eval. Procurement deck requested.',
    time: '8m ago',
  },
  {
    id: 'live-5',
    type: 'competitor_news',
    title: 'NeuralEdge launches healthcare LLM',
    description: 'HIPAA-compliant MedLLM-3 targets clinical workflows — direct threat to our HC vertical.',
    time: '15m ago',
  },
  {
    id: 'live-6',
    type: 'battlecard_stale',
    title: 'Synthetica AI battlecard is 14 days old',
    description: '3 new competitive signals detected since last refresh. Auto-regeneration recommended.',
    time: '22m ago',
  },
  {
    id: 'live-7',
    type: 'competitor_alert',
    title: 'Synthetica AI running POC at Quantum Logistics',
    description: 'Detected via Gong transcript analysis — rep mentioned "evaluating alternatives".',
    time: '45m ago',
  },
  {
    id: 'live-8',
    type: 'deal_update',
    title: 'TerraVerde Energy: new stakeholder added',
    description: 'VP of Data Engineering joined evaluation. Technical deep-dive meeting scheduled.',
    time: '1h ago',
  },
];

// Arrival delays in ms — first few arrive quickly, then taper off
const ARRIVAL_DELAYS = [2000, 5000, 9000, 15000, 22000, 30000, 40000, 55000];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [read, setRead] = useState<Set<string>>(new Set());
  const [shake, setShake] = useState(false);

  // Drip-feed notifications after mount
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    INCOMING_NOTIFICATIONS.forEach((notif, i) => {
      const timeout = setTimeout(() => {
        setNotifications(prev => [{ ...notif, arrivedAt: Date.now() }, ...prev]);
        // Trigger bell shake
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }, ARRIVAL_DELAYS[i]);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const unreadCount = notifications.filter(n => !read.has(n.id)).length;

  const markAllRead = useCallback(() => {
    setRead(new Set(notifications.map(n => n.id)));
  }, [notifications]);

  const markRead = useCallback((id: string) => {
    setRead(prev => new Set([...prev, id]));
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <motion.div
          animate={shake ? { rotate: [0, -12, 10, -8, 6, -3, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </motion.div>
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 min-w-4 h-4 rounded-full bg-[#da545b] text-white text-[9px] font-bold flex items-center justify-center px-1"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-[360px] bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold text-white bg-[#da545b] rounded-full px-1.5 py-0.5 leading-none">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] text-primary hover:underline font-medium">
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification list */}
              <div className="max-h-[420px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <div className="text-2xl mb-2">🔔</div>
                    <div className="text-xs text-muted-foreground">No notifications yet — alerts will appear here as they arrive.</div>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {notifications.map(n => {
                      const isUnread = !read.has(n.id);
                      const config = TYPE_CONFIG[n.type];
                      return (
                        <motion.div
                          key={n.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          onClick={() => markRead(n.id)}
                          className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-accent/50 ${
                            isUnread ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="px-3 py-2.5">
                            <div className="flex items-start gap-2.5">
                              {/* Unread indicator */}
                              <div className="mt-1 shrink-0">
                                {isUnread ? (
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color, boxShadow: `0 0 6px ${config.color}50` }} />
                                ) : (
                                  <div className="w-2 h-2" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                {/* Type badge + time */}
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-[9px]">{config.icon}</span>
                                  <span
                                    className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                                    style={{ color: config.color, backgroundColor: `${config.color}15` }}
                                  >
                                    {config.label}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground/60 ml-auto">{n.time}</span>
                                </div>

                                {/* Content */}
                                <div className={`text-[12px] font-medium leading-snug ${isUnread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {n.title}
                                </div>
                                <div className="text-[11px] text-muted-foreground/70 mt-0.5 leading-snug line-clamp-2">
                                  {n.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer with legend */}
              {notifications.length > 0 && (
                <div className="px-3 py-2 border-t border-border bg-muted/30">
                  <div className="flex items-center gap-3 flex-wrap">
                    {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                      <div key={key} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                        <span className="text-[9px] text-muted-foreground">{cfg.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
