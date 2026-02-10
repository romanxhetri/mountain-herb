
import React from 'react';

// Helper to parse inline styles like **bold** and *italic*
const parseInline = (text: string): React.ReactNode[] => {
  // Split by bold (**...**) or italic (*...*) markers
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-stone-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic text-stone-800">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

export const RichTextRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return <p className="text-stone-400 italic">Start typing to see preview...</p>;

  // Split by new lines to handle blocks
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2 text-stone-700 leading-relaxed font-sans">
      {lines.map((line, index) => {
        // Handle Headings
        if (line.startsWith('# ')) return <h3 key={index} className="text-2xl font-bold text-stone-900 mt-4 mb-2">{line.replace('# ', '')}</h3>;
        if (line.startsWith('## ')) return <h4 key={index} className="text-xl font-bold text-stone-800 mt-3 mb-2">{line.replace('## ', '')}</h4>;
        if (line.startsWith('### ')) return <h5 key={index} className="text-lg font-bold text-stone-800 mt-2 mb-1">{line.replace('### ', '')}</h5>;
        
        // Handle Quotes
        if (line.startsWith('> ')) return <blockquote key={index} className="border-l-4 border-emerald-500 pl-4 italic text-stone-600 my-4 bg-stone-50 py-2">{line.replace('> ', '')}</blockquote>;
        
        // Handle Lists
        if (line.startsWith('- ')) return <li key={index} className="list-disc list-inside ml-4">{parseInline(line.replace('- ', ''))}</li>;
        if (line.match(/^\d+\. /)) return <li key={index} className="list-decimal list-inside ml-4">{parseInline(line.replace(/^\d+\. /, ''))}</li>;

        // Empty lines
        if (line.trim() === '') return <br key={index} />;

        return <p key={index}>{parseInline(line)}</p>;
      })}
    </div>
  );
};
