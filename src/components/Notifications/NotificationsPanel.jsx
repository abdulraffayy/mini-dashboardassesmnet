import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPanel({
  notifications = [],
  onToggleRead = () => { },
  onClearAll = () => { }
}) {
  const unreadCount = notifications.filter(note => !note.read).length;

  const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const notificationIcons = {
    comment: (
      <span className="bg-blue-400 rounded-lg flex items-center justify-center w-10 h-10">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    ),
    update: (
      <span className="bg-orange-300 rounded-lg flex items-center justify-center w-10 h-10">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/></svg>
      </span>
    ),
    password: (
      <span className="bg-emerald-300 rounded-lg flex items-center justify-center w-10 h-10">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 11V9a3 3 0 116 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    ),
  };

  function getIcon(type) {
    if (type === 'comment') return notificationIcons.comment;
    if (type === 'update') return notificationIcons.update;
    if (type === 'password') return notificationIcons.password;
    return null;
  }

  const DEFAULT_NOTIFICATIONS = [
    { id: '1', type: 'comment', text: 'New comment', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
    { id: '2', type: 'update', text: 'System update', timestamp: new Date(Date.now() - 60 * 60 * 1000) },
    { id: '3', type: 'password', text: 'Password changed', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  ];
  const displayNotifications = notifications && notifications.length > 0 ? notifications : DEFAULT_NOTIFICATIONS;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">Notifications</h2>
      {displayNotifications.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No notifications
        </div>
      ) : (
        <ul>
          {displayNotifications
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((note, idx, arr) => (
              <li key={note.id}>
                <div className="flex items-start gap-4 pb-4">
                  {getIcon(note.type)}
                  <div className="flex flex-col">
                    <span className="font-bold text-base text-gray-900">{note.text}</span>
                    <span className="text-xs text-gray-500 mt-1">{formatTimestamp(note.timestamp)}</span>
                  </div>
                </div>
                {idx !== arr.length - 1 && <hr className="border-gray-200 mb-4" />}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
