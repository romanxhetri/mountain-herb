
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, MessageCircle, Share2, Calendar, Check } from 'lucide-react';
import { useData } from '../App';
import { RichTextRenderer } from '../components/RichTextRenderer';
import { Seo } from '../components/Seo';

export const BlogPostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = useData();
  const [copied, setCopied] = useState(false);

  const post = posts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Post not found</h2>
        <Link to="/blog" className="text-emerald-600 font-bold hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Read this article: ${post.title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    }
  };

  return (
    <div className="min-h-screen py-12 animate-fade-in-up">
      <Seo title={post.title} description={post.content.substring(0, 160)} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-stone-500 hover:text-emerald-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
        </Link>

        <article className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
          {post.image && (
            <div className="h-64 md:h-96 w-full relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                     <div className="flex items-center space-x-4 mb-4 text-sm font-medium">
                        <span className="bg-emerald-600 px-3 py-1 rounded-full">Article</span>
                        <span className="flex items-center"><Calendar className="h-4 w-4 mr-1"/> {post.timestamp}</span>
                     </div>
                     <h1 className="text-3xl md:text-5xl font-bold leading-tight font-serif shadow-black drop-shadow-lg">{post.title}</h1>
                </div>
            </div>
          )}

          <div className="p-8 md:p-12">
            {!post.image && (
                 <h1 className="text-3xl md:text-5xl font-bold leading-tight font-serif text-stone-900 mb-8">{post.title}</h1>
            )}

            <div className="flex items-center justify-between border-b border-stone-100 pb-8 mb-8">
                <div className="flex items-center space-x-3">
                    <img src={post.avatar || `https://ui-avatars.com/api/?name=${post.author}`} alt={post.author} className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div>
                        <p className="font-bold text-stone-900">{post.author}</p>
                        <p className="text-xs text-stone-500">Author</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                     <button 
                      onClick={handleShare}
                      className={`p-2 rounded-full transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                      title="Share"
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <div className="prose prose-stone max-w-none">
                <RichTextRenderer content={post.content} />
            </div>

            <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between">
                <div className="flex space-x-6">
                    <button className="flex items-center space-x-2 text-stone-500 hover:text-red-500 transition-colors">
                        <ThumbsUp className="h-5 w-5" />
                        <span className="font-bold">{post.likes} Likes</span>
                    </button>
                     <button className="flex items-center space-x-2 text-stone-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-bold">{post.comments} Comments</span>
                    </button>
                </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
