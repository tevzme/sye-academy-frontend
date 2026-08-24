import React from 'react';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  if (!content) return null;

  // Render content safely by processing markdown patterns
  const formatMarkdown = (text: string) => {
    // 1. Process fenced code blocks
    let html = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_match, lang, code) => {
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `
        <div class="my-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
          <div class="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
            <span class="font-bold text-slate-300 uppercase">${lang || 'CODE'}</span>
            <span>SYNTAX FORMAT</span>
          </div>
          <pre class="p-4 text-xs md:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed"><code>${escapedCode}</code></pre>
        </div>
      `;
    });

    // 2. Process Markdown tables
    html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (match) => {
      const rows = match.trim().split('\n').map(r => r.trim());
      if (rows.length < 2) return match;

      let tableHtml = '<div class="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-xs"><table class="min-w-full divide-y divide-slate-200 text-left text-sm">';
      let isHeader = true;

      for (const row of rows) {
        if (row.includes('---')) {
          isHeader = false;
          continue;
        }
        const cols = row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
        if (isHeader) {
          tableHtml += '<thead class="bg-slate-50"><tr>';
          cols.forEach(c => {
            tableHtml += `<th class="px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-wider">${c}</th>`;
          });
          tableHtml += '</tr></thead><tbody class="divide-y divide-slate-100 bg-white">';
          isHeader = false;
        } else {
          tableHtml += '<tr class="hover:bg-slate-50/70 transition-colors">';
          cols.forEach(c => {
            tableHtml += `<td class="px-4 py-3 text-slate-600 text-sm">${c}</td>`;
          });
          tableHtml += '</tr>';
        }
      }
      tableHtml += '</tbody></table></div>';
      return tableHtml;
    });

    // 3. Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-900 mt-6 mb-2 tracking-tight">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-8 mb-3 tracking-tight border-b border-slate-100 pb-2">$1</h2>');

    // 4. Bold and Inline Code
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
    html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-blue-700 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200/60">$1</code>');

    // 5. Unordered Lists
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-600 mb-1 leading-relaxed">$1</li>');

    // 6. Ordered Lists
    html = html.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-slate-600 mb-1 leading-relaxed"><strong class="text-slate-800">$1.</strong> $2</li>');

    // 7. Paragraphs (lines not wrapped)
    return html;
  };

  return (
    <div 
      className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base space-y-3"
      dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
    />
  );
};
