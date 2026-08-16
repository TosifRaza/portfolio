import React, { useState, useEffect, useCallback } from 'react';
import { messagesApi } from '../../api/endpoints';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Mail, Archive, Eye, Trash2, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const statusTabs = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
  { key: 'replied', label: 'Replied' },
  { key: 'archived', label: 'Archived' },
];

const statusBadge = (status) => {
  const styles = {
    unread: 'bg-blue-100 text-blue-700',
    read: 'bg-gray-100 text-gray-700',
    replied: 'bg-green-100 text-green-700',
    archived: 'bg-yellow-100 text-yellow-700',
  };
  return styles[status] || styles.read;
};

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchMessages = useCallback(async (status = 'all') => {
    setLoading(true);
    try {
      const [msgsRes, countsRes] = await Promise.allSettled([
        messagesApi.getAll(status !== 'all' ? { status } : {}),
        messagesApi.getCounts(),
      ]);
      if (msgsRes.status === 'fulfilled' && msgsRes.value.data?.success) {
        setMessages(msgsRes.value.data.data || []);
      }
      if (countsRes.status === 'fulfilled' && countsRes.value.data?.success) {
        setCounts(countsRes.value.data.data || {});
      }
    } catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchMessages(activeTab); }, [fetchMessages, activeTab]);

  const selectMessage = async (msg) => {
    setSelectedMessage(msg);
    setReplyText(msg.reply || '');
    if (msg.status === 'unread') {
      try {
        await messagesApi.updateStatus(msg._id, 'read');
        fetchMessages(activeTab);
      } catch { /* silent */ }
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    setReplying(true);
    try {
      const res = await messagesApi.reply(selectedMessage._id, replyText);
      if (res.data?.success) {
        toast.success('Reply sent');
        fetchMessages(activeTab);
      }
    } catch { toast.error('Failed to send reply'); }
    finally { setReplying(false); }
  };

  const updateStatus = async (messageId, status) => {
    try {
      const res = await messagesApi.updateStatus(messageId, status);
      if (res.data?.success) {
        toast.success('Status updated');
        fetchMessages(activeTab);
        if (selectedMessage?._id === messageId) {
          setSelectedMessage((prev) => ({ ...prev, status }));
        }
      }
    } catch { toast.error('Failed to update status'); }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const res = await messagesApi.delete(confirmDelete);
      if (res.data?.success) {
        toast.success('Message deleted');
        fetchMessages(activeTab);
        if (selectedMessage?._id === confirmDelete) setSelectedMessage(null);
      }
    } catch { toast.error('Failed to delete'); }
    finally { setConfirmDelete(null); }
  };

  if (loading && messages.length === 0) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="space-y-4">
      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            {counts[tab.key] > 0 && (
              <span className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs ${
                activeTab === tab.key ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {counts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Inbox Layout */}
      <div className="flex gap-4" style={{ minHeight: '500px' }}>
        {/* Message List */}
        <div className="w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm lg:w-2/5">
          <div className="max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                <Mail className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm">No messages found</p>
              </div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => selectMessage(msg)}
                  className={`w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 ${
                    selectedMessage?._id === msg._id ? 'bg-indigo-50' : ''
                  } ${msg.status === 'unread' ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`truncate text-sm ${msg.status === 'unread' ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {msg.name}
                        </p>
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${statusBadge(msg.status)}`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="truncate text-sm text-gray-700">{msg.subject || 'No subject'}</p>
                      <p className="truncate text-xs text-gray-500">{msg.email} · {new Date(msg.createdAt).toLocaleDateString()}</p>
                    </div>
                    {msg.status === 'unread' && (
                      <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-indigo-600" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="hidden flex-1 rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
          {selectedMessage ? (
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.subject || 'No Subject'}</h3>
                    <p className="text-sm text-gray-500">
                      From: <span className="font-medium text-gray-700">{selectedMessage.name}</span> ({selectedMessage.email}) · {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <p className="whitespace-pre-wrap text-sm text-gray-700">{selectedMessage.message}</p>

                {selectedMessage.reply && (
                  <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4">
                    <p className="mb-1 text-xs font-medium text-green-700">Your Reply:</p>
                    <p className="whitespace-pre-wrap text-sm text-green-800">{selectedMessage.reply}</p>
                  </div>
                )}
              </div>

              {/* Actions & Reply */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="mb-3 flex items-center gap-2">
                  {selectedMessage.status !== 'read' && selectedMessage.status !== 'replied' && (
                    <button onClick={() => updateStatus(selectedMessage._id, 'read')} className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                      <Eye className="h-3.5 w-3.5" /> Mark Read
                    </button>
                  )}
                  <button onClick={() => updateStatus(selectedMessage._id, 'archived')} className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                    <Archive className="h-3.5 w-3.5" /> Archive
                  </button>
                  <button onClick={() => setConfirmDelete(selectedMessage._id)} className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
                <div className="flex gap-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={2}
                    placeholder="Type your reply..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    onClick={handleReply}
                    disabled={replying || !replyText.trim()}
                    className="flex items-center gap-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-gray-400">
                <Mail className="mx-auto mb-2 h-12 w-12" />
                <p>Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog isOpen={!!confirmDelete} title="Delete Message" message="Are you sure you want to delete this message?" confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} type="danger" />
    </div>
  );
};

export default MessagesPage;
