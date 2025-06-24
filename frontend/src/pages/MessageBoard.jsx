import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/bulletinboard';

export const getMessages = () => axios.get(API_BASE_URL);
export const postMessage = (data) => axios.post(API_BASE_URL, data);

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: '', subject: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // 取得留言列表
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getMessages();
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('載入留言失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // 處理表單輸入
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 送出留言
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.content.trim()) {
      setError('請填寫所有欄位');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await postMessage(form);
      setForm({ name: '', subject: '', content: '' });
      setSuccess('留言成功！');
      fetchMessages();
    } catch (err) {
      setError('留言失敗');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(''), 2000);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100%' }}>
      <h2>留言板</h2>
      
      {/* 留言列表 */}
      <div style={{ marginBottom: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 16px', textAlign: 'left', border: '1px solid #ddd', width: '15%' }}>姓名</th>
              <th style={{ padding: '8px 16px', textAlign: 'left', border: '1px solid #ddd', width: '60%' }}>主題</th>
              <th style={{ padding: '8px 16px', textAlign: 'left', border: '1px solid #ddd', width: '25%' }}>留言時間</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td style={{ padding: '8px 16px', border: '1px solid #ddd' }}>{msg.name}</td>
                <td
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    color: '#1976d2',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={() => setSelectedMessage(msg)}
                >
                  {msg.subject}
                </td>
                <td style={{ padding: '8px 16px', border: '1px solid #ddd' }}>
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString('zh-TW') : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for message content */}
      {selectedMessage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: 32,
            borderRadius: 8,
            minWidth: 320,
            maxWidth: 480,
            boxShadow: '0 2px 16px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: 16 }}>留言內容</h3>
            <div style={{ marginBottom: 24, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {selectedMessage.content}
            </div>
            <button
              onClick={() => setSelectedMessage(null)}
              style={{
                padding: '8px 24px',
                background: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              完成
            </button>
          </div>
        </div>
      )}

      {/* 留言表單 */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>姓名</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{
                width: '200px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="請輸入姓名"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>主題</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="請輸入主題"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>留言內容</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                minHeight: '100px',
                resize: 'vertical'
              }}
              placeholder="請輸入留言內容"
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            disabled={loading}
          >
            送出
          </button>
        </div>
      </form>
      
      {error && <div style={{ color: 'red', marginTop: '12px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: '12px' }}>{success}</div>}
    </div>
  );
};

export default MessageBoard; 