import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';

export default function RichTextEditor({ value, onChange }) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current && contentRef.current.innerHTML !== value && document.activeElement !== contentRef.current) {
            contentRef.current.innerHTML = value || '';
        }
    }, [value]);

    const handleInput = (e) => {
        if (contentRef.current) {
            onChange(contentRef.current.innerHTML);
        }
    };

    const exec = (command, val = null) => {
        document.execCommand(command, false, val);
        if (contentRef.current) {
            contentRef.current.focus();
        }
    };

    return (
        <div className="rich-text-editor" style={{
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            background: 'rgba(0,0,0,0.2)',
            overflow: 'hidden'
        }}>
            <div className="toolbar" style={{
                display: 'flex',
                gap: '4px',
                padding: '8px',
                background: 'rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <button onMouseDown={(e) => { e.preventDefault(); exec('bold'); }} className="btn-icon" title="Bold">
                    <Bold size={16} />
                </button>
                <button onMouseDown={(e) => { e.preventDefault(); exec('italic'); }} className="btn-icon" title="Italic">
                    <Italic size={16} />
                </button>
                <button onMouseDown={(e) => { e.preventDefault(); exec('underline'); }} className="btn-icon" title="Underline">
                    <Underline size={16} />
                </button>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
                <button onMouseDown={(e) => { e.preventDefault(); exec('insertUnorderedList'); }} className="btn-icon" title="Bullet List">
                    <List size={16} />
                </button>
                <button onMouseDown={(e) => { e.preventDefault(); exec('insertOrderedList'); }} className="btn-icon" title="Numbered List">
                    <ListOrdered size={16} />
                </button>
            </div>
            <div
                ref={contentRef}
                contentEditable
                onInput={handleInput}
                suppressContentEditableWarning={true}
                className="editor-content"
                style={{
                    minHeight: '150px',
                    padding: '12px',
                    outline: 'none',
                    color: 'var(--text-main)', // Use theme color or white for editor context
                    color: '#e2e8f0', // Override since we are in dark editor panel
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}
            />
            <style>{`
        .btn-icon {
          background: transparent;
          border: none;
          color: #94a3b8;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-icon:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .editor-content ul, .editor-content ol {
          padding-left: 20px;
          margin: 0.5em 0;
        }
        .editor-content li {
            margin-bottom: 4px;
        }
      `}</style>
        </div>
    );
}
