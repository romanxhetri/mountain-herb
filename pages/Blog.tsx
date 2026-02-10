
import React, { useState, useRef, useEffect } from 'react';
import { ThumbsUp, MessageCircle, Share2, Image as ImageIcon, Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Undo2, Redo2, Eye, Link as LinkIcon, X, Check, ArrowRight } from 'lucide-react';
import { useData, useAuth } from '../App';
import { BlogPost } from '../types';
import { useLocation, Link } from 'react-router-dom';
import { RichTextRenderer } from '../components/RichTextRenderer';

export const Blog: React.FC = () => {
  const { posts, addPost } = useData();
  const { user } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();
  
  // Cover Image State
  const [coverImage, setCoverImage] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  
  // History for Undo/Redo
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Scroll to post if query param exists
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const postId = params.get('postId');
    if (postId) {
      // Delay slightly to ensure rendering
      setTimeout(() => {
        const element = document.getElementById(postId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add highlight effect
          element.classList.add('ring-2', 'ring-emerald-500', 'ring-offset-4');
          setTimeout(() => element.classList.remove('ring-2', 'ring-emerald-500', 'ring-offset-4'), 2000);
        }
      }, 500);
    }
  }, [location.search, posts]);

  // Update content and push to history
  const updateContent = (val: string) => {
    setNewPostContent(val);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(val);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setNewPostContent(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setNewPostContent(history[historyIndex + 1]);
    }
  };

  // Formatting Logic
  const applyFormat = (type: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = newPostContent;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    let newText = text;
    let newSelectionStart = start;
    let newSelectionEnd = end;

    if (type === 'bold' || type === 'italic') {
        const marker = type === 'bold' ? '**' : '*';
        const markerLen = marker.length;

        // Handle Multiline Selection by wrapping each line
        if (selected.includes('\n')) {
            const lines = selected.split('\n');
            const formattedLines = lines.map(line => line.trim() ? `${marker}${line}${marker}` : line);
            const formattedBlock = formattedLines.join('\n');
            newText = before + formattedBlock + after;
            newSelectionStart = start;
            newSelectionEnd = start + formattedBlock.length;
        }
        // Single line handling
        else if (selected.startsWith(marker) && selected.endsWith(marker) && selected.length >= 2 * markerLen) {
            // Unwrap selection
            newText = before + selected.substring(markerLen, selected.length - markerLen) + after;
            newSelectionStart = start;
            newSelectionEnd = end - (2 * markerLen);
        } else if (before.endsWith(marker) && after.startsWith(marker)) {
            // Unwrap surrounding markers
            newText = before.substring(0, before.length - markerLen) + selected + after.substring(markerLen);
            newSelectionStart = start - markerLen;
            newSelectionEnd = end - markerLen;
        } else {
            // Wrap with markers
            newText = before + marker + selected + marker + after;
            newSelectionStart = start + markerLen;
            newSelectionEnd = end + markerLen;
        }
    } else {
        let prefix = '';
        switch (type) {
            case 'list': prefix = '\n- '; break;
            case 'ordered': prefix = '\n1. '; break;
            case 'quote': prefix = '\n> '; break;
            case 'h1': prefix = '\n# '; break;
            case 'h2': prefix = '\n## '; break;
            case 'h3': prefix = '\n### '; break;
        }
        newText = before + prefix + selected + after;
        newSelectionStart = start + prefix.length;
        newSelectionEnd = end + prefix.length;
    }

    updateContent(newText);
    
    setTimeout(() => {
        if(textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(newSelectionStart, newSelectionEnd);
        }
    }, 0);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    if (!user) {
        alert("Please login to post.");
        return;
    }

    setLoading(true);
    const newPost: BlogPost = {
      id: '', // Generated by DB
      title: newPostTitle || 'Community Post',
      author: user.name,
      avatar: `https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff`,
      content: newPostContent,
      image: coverImage, // Include the cover image
      likes: 0,
      comments: 0,
      timestamp: new Date().toLocaleDateString()
    };

    try {
        await addPost(newPost);
        setNewPostContent('');
        setNewPostTitle('');
        setCoverImage('');
        setShowImageInput(false);
        setHistory(['']);
        setHistoryIndex(0);
    } catch (err) {
        alert("Failed to post");
    } finally {
        setLoading(false);
    }
  };

  const handleShare = async (post: BlogPost) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/blog/${post.id}`;
    
    const shareData = {
      title: post.title || 'Mountain Herbs Nepal Blog',
      text: `Check out this post by ${post.author}: ${post.title}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(post.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  // Helper to create a preview snippet from content
  const getPreview = (content: string) => {
      // Get first 3 lines or first 250 characters
      const lines = content.split('\n').filter(l => l.trim() !== '');
      if (lines.length > 3) {
          return lines.slice(0, 3).join('\n') + '...';
      }
      if (content.length > 250) {
          return content.substring(0, 250) + '...';
      }
      return content;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-md">Community Blog</h1>

        {/* Create Post Editor */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-stone-100">
           <div className="bg-stone-50 p-4 border-b border-stone-200">
              <h3 className="font-bold text-stone-700">Create a Post</h3>
           </div>
           
           <div className="p-6">
              <input 
                 className="w-full text-xl font-bold placeholder-stone-400 border-none focus:ring-0 px-0 mb-4 text-stone-900" 
                 placeholder="Post Title (Optional)"
                 value={newPostTitle}
                 onChange={e => setNewPostTitle(e.target.value)}
              />

              {/* Rich Text Toolbar */}
              <div className="flex flex-wrap gap-2 mb-4 p-2 bg-stone-100/50 rounded-xl border border-stone-200">
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('bold')} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600" title="Bold"><Bold className="h-4 w-4" /></button>
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('italic')} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600" title="Italic"><Italic className="h-4 w-4" /></button>
                 
                 <div className="w-px h-6 bg-stone-300 self-center mx-1"></div>
                 
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('list')} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600" title="Bullet List"><List className="h-4 w-4" /></button>
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('ordered')} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600" title="Numbered List"><ListOrdered className="h-4 w-4" /></button>
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('quote')} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600" title="Quote"><Quote className="h-4 w-4" /></button>
                 
                 <div className="w-px h-6 bg-stone-300 self-center mx-1"></div>
                 
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('h1')} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600" title="Heading 1"><Heading1 className="h-4 w-4" /></button>
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('h2')} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600" title="Heading 2"><Heading2 className="h-4 w-4" /></button>
                 <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('h3')} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600" title="Heading 3"><Heading3 className="h-4 w-4" /></button>
                 
                 <div className="w-px h-6 bg-stone-300 self-center mx-1"></div>
                 
                 <button onMouseDown={(e) => e.preventDefault()} onClick={handleUndo} disabled={historyIndex <= 0} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600 disabled:opacity-30" title="Undo"><Undo2 className="h-4 w-4" /></button>
                 <button onMouseDown={(e) => e.preventDefault()} onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="p-2 hover:bg-white rounded-lg transition-colors text-stone-600 disabled:opacity-30" title="Redo"><Redo2 className="h-4 w-4" /></button>
              </div>

              {/* Text Area */}
              <div className="w-full mb-6">
                <textarea
                  ref={textareaRef}
                  value={newPostContent}
                  onChange={(e) => updateContent(e.target.value)}
                  placeholder={user ? "Share your thoughts, experiences, or questions... (Use Markdown)" : "Please log in to share your thoughts..."}
                  disabled={!user}
                  className="w-full bg-transparent border-none focus:ring-0 resize-none h-64 text-stone-800 placeholder-stone-400 p-0 text-lg leading-relaxed font-sans font-medium"
                />
              </div>

              {/* Image Input (Visible on toggle) */}
              {showImageInput && (
                 <div className="mb-6 p-4 bg-stone-50 rounded-xl border border-stone-200 animate-fade-in">
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Cover Image URL</label>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <input 
                                type="url"
                                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
                                placeholder="https://example.com/image.jpg"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                            />
                            <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                        </div>
                        {coverImage && (
                            <div className="h-10 w-10 rounded-lg overflow-hidden border border-stone-200 bg-white flex-shrink-0">
                                <img 
                                    src={coverImage} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => (e.currentTarget.style.display = 'none')} 
                                />
                            </div>
                        )}
                        <button 
                            onClick={() => { setShowImageInput(false); setCoverImage(''); }}
                            className="p-2 hover:bg-red-100 text-stone-400 hover:text-red-500 rounded-lg transition-colors"
                            title="Remove Image"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                 </div>
              )}

              {/* Live Preview */}
              {(newPostContent || coverImage) && (
                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                      <div className="flex items-center text-xs font-bold text-stone-400 uppercase mb-2">
                          <Eye className="h-3 w-3 mr-1" /> Live Preview
                      </div>
                      {coverImage && (
                          <div className="mb-4 rounded-lg overflow-hidden shadow-sm">
                              <img src={coverImage} alt="Cover" className="w-full h-48 object-cover" />
                          </div>
                      )}
                      <RichTextRenderer content={newPostContent} />
                  </div>
              )}
           </div>

           <div className="bg-stone-50 p-4 border-t border-stone-200 flex justify-between items-center">
              <button 
                type="button" 
                onClick={() => setShowImageInput(!showImageInput)}
                className={`flex items-center text-sm font-bold px-4 py-2 rounded-lg border shadow-sm transition-all hover:shadow ${
                    showImageInput || coverImage ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-stone-500 hover:text-emerald-600 border-stone-200'
                }`}
              >
                <ImageIcon className="h-4 w-4 mr-2" /> {coverImage ? 'Change Cover Image' : 'Add Cover Image'}
              </button>
              <button 
                onClick={handlePostSubmit}
                disabled={!newPostContent.trim() || loading || !user}
                className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200"
              >
                {loading ? 'Publishing...' : 'Publish Blog Post'}
              </button>
           </div>
        </div>

        {/* Feed */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} id={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-fade-in border border-stone-100 hover:shadow-md transition-shadow transition-all duration-300">
              <div className="p-6">
                 {/* Author Header */}
                 <div className="flex items-center space-x-3 mb-4">
                    <img src={post.avatar || `https://ui-avatars.com/api/?name=${post.author}`} alt={post.author} className="h-10 w-10 rounded-full object-cover border border-stone-100" />
                    <div>
                      <h3 className="font-bold text-stone-900">{post.author}</h3>
                      <span className="text-xs text-stone-400 font-medium">{post.timestamp}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <Link to={`/blog/${post.id}`} className="block group">
                      <h2 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-emerald-600 transition-colors">{post.title}</h2>
                      
                      {post.image && (
                        <div className="rounded-xl overflow-hidden mb-4 shadow-sm">
                          <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-96 group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                  </Link>

                  <div className="text-stone-700 mb-4 relative">
                      {/* Truncated view for feed */}
                      <RichTextRenderer content={getPreview(post.content)} />
                      <div className="mt-4">
                           <Link to={`/blog/${post.id}`} className="text-emerald-600 font-bold hover:underline inline-flex items-center text-sm">
                                Read Full Post <ArrowRight className="h-4 w-4 ml-1" />
                           </Link>
                      </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div className="flex space-x-6">
                      <button className="flex items-center space-x-2 text-stone-500 hover:text-red-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                           <ThumbsUp className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <Link to={`/blog/${post.id}`} className="flex items-center space-x-2 text-stone-500 hover:text-blue-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                           <MessageCircle className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium">{post.comments}</span>
                      </Link>
                    </div>
                    <button 
                      onClick={() => handleShare(post)}
                      className={`flex items-center space-x-2 transition-all p-2 rounded-full ${copiedId === post.id ? 'text-emerald-600 bg-emerald-50' : 'text-stone-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                      title={copiedId === post.id ? "Link Copied!" : "Share Post"}
                    >
                      {copiedId === post.id ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
                      {copiedId === post.id && <span className="text-xs font-bold">Copied!</span>}
                    </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
