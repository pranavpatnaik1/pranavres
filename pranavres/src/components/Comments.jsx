import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const formatDisplayDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export default function Comments({ entryDate }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    loadComments();
  }, [entryDate]);

  const loadComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('entry_date', entryDate)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading comments:', error);
      return;
    }

    setComments(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    const { error } = await supabase
      .from('comments')
      .insert([
        {
          name: name,
          content: newComment,
          entry_date: entryDate,
        }
      ]);

    if (error) {
      console.error('Error adding comment:', error);
      return;
    }

    setNewComment('');
    loadComments();
  };

  return (
    <div className="comments-section">
      <h3><u>comments</u></h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          required
          className="comment-input"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="add your thoughts here."
          required
          className="comment-textarea"
        />
        <button type="submit" className="comment-submit">post</button>
      </form>

      

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.name}</strong>
              <span className="comment-date">
                {formatDisplayDate(new Date(comment.created_at))}
              </span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 