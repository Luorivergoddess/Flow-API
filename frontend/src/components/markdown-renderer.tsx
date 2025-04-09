"use client"

import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import { Check, Clipboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface MarkdownRendererProps {
  content: string
  className?: string
}

type MarkdownComponentProps = {
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

interface CodeBlockWrapperProps {
  children: React.ReactNode
  language?: string
  rawCode: string
  className?: string
}

function CodeBlockWrapper({ children, language, rawCode, className }: CodeBlockWrapperProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopy = async () => {
    if (!rawCode) return;
    try {
      await navigator.clipboard.writeText(rawCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={cn("relative group my-8", className)}>
      {language && (
        <span className="absolute top-2 right-14 px-2 py-0.5 text-xs text-muted-foreground bg-background rounded-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity">
          {language}
        </span>
      )}
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:bg-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {isCopied ? <Check size={14} /> : <Clipboard size={14} />}
      </Button>
      
      <pre
        className="p-5 overflow-x-auto rounded-md border border-border bg-transparent text-sm leading-relaxed"
      >
        {children}
      </pre>
    </div>
  );
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose dark:prose-invert max-w-none space-y-6", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Enhanced paragraph styling
          p: ({ className, children, ...props }: MarkdownComponentProps) => (
            <p 
              className={cn("my-6 leading-7", className)} 
              {...props}
            >
              {children}
            </p>
          ),
          
          // Custom rendering for tables
          table: ({ className, children, ...props }: MarkdownComponentProps) => (
            <Table className={cn("my-8 border rounded-lg overflow-hidden", className)} {...props}>
              {children}
            </Table>
          ),
          thead: ({ className, children, ...props }: MarkdownComponentProps) => (
            <TableHeader className={className} {...props}>
              {children}
            </TableHeader>
          ),
          tbody: ({ className, children, ...props }: MarkdownComponentProps) => (
            <TableBody className={className} {...props}>
              {children}
            </TableBody>
          ),
          tr: ({ className, children, ...props }: MarkdownComponentProps) => (
            <TableRow className={className} {...props}>
              {children}
            </TableRow>
          ),
          th: ({ className, children, ...props }: MarkdownComponentProps) => (
            <TableHead 
              className={cn("border-b bg-muted/50 p-3 text-left font-semibold", className)} 
              {...props}
            >
              {children}
            </TableHead>
          ),
          td: ({ className, children, ...props }: MarkdownComponentProps) => (
            <TableCell 
              className={cn("border-b p-3", className)} 
              {...props}
            >
              {children}
            </TableCell>
          ),
          
          // Custom code block rendering - enhanced rehype-highlight
          pre: ({ node, className, children, ...props }: MarkdownComponentProps) => {
            // Try to extract code content and language information
            const codeEl = node?.children?.[0];
            // Extract language information from class name
            const className1 = codeEl?.properties?.className?.[0] || '';
            // Language information is usually in 'language-xxx' format class name
            const language = (className1 ? String(className1).split('-')[1] : '') || '';
            
            // Improved code extraction logic
            const getCode = (element: any): string => {
              // If it's a string, return directly
              if (typeof element === 'string') {
                return element;
              }
              
              // If it's a React element
              if (React.isValidElement(element)) {
                const props = element.props as any;
                
                // If children is a string, return it
                if (typeof props.children === 'string') {
                  return props.children;
                }
                
                // If children is an array, recursively process each child element and concatenate
                if (Array.isArray(props.children)) {
                  return props.children.map(getCode).join('');
                }
                
                // Recursively process child elements
                return getCode(props.children);
              }
              
              // If it's an array, process each element and concatenate
              if (Array.isArray(element)) {
                return element.map(getCode).join('');
              }
              
              // If it has a value property (like AST node)
              if (element && typeof element === 'object' && 'value' in element) {
                return String(element.value);
              }
              
              // Default return empty string
              return '';
            };
            
            // Get code content
            const rawCode = getCode(children);
            
            return (
              <CodeBlockWrapper 
                language={language} 
                rawCode={rawCode}
                className={className}
              >
                {children}
              </CodeBlockWrapper>
            );
          },
          
          // Custom code block rendering - rehype-highlight version
          code: ({ className, children, inline, ...props }: MarkdownComponentProps & { inline?: boolean }) => {
            if (inline) {
              return (
                <code 
                  className={cn(
                    "px-1 py-0.5 rounded bg-muted/50 font-mono text-sm", 
                    className
                  )} 
                  {...props}
                >
                  {children}
                </code>
              );
            }
            // Ensure code has hljs class to apply highlight styles
            return <code className={cn("hljs font-mono text-sm", className)} {...props}>{children}</code>;
          },
          
          // Enhanced styling for other elements
          a: ({ className, children, ...props }: MarkdownComponentProps) => (
            <a
              className={cn(
                "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",
                className
              )}
              {...props}
            >
              {children}
            </a>
          ),
          h1: ({ className, children, ...props }: MarkdownComponentProps) => (
            <h1 
              className={cn("scroll-m-20 text-4xl font-bold tracking-tight mt-10 mb-6", className)} 
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ className, children, ...props }: MarkdownComponentProps) => (
            <h2 
              className={cn("scroll-m-20 text-2xl font-semibold tracking-tight mt-12 mb-6", className)} 
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ className, children, ...props }: MarkdownComponentProps) => (
            <h3 
              className={cn("scroll-m-20 text-xl font-semibold tracking-tight mt-10 mb-6", className)} 
              {...props}
            >
              {children}
            </h3>
          ),
          ul: ({ className, children, ...props }: MarkdownComponentProps) => (
            <ul 
              className={cn("my-8 ml-6 list-disc [&>li]:mt-3 space-y-2", className)} 
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ className, children, ...props }: MarkdownComponentProps) => (
            <ol 
              className={cn("my-8 ml-6 list-decimal [&>li]:mt-3 space-y-2", className)} 
              {...props}
            >
              {children}
            </ol>
          ),
          blockquote: ({ className, children, ...props }: MarkdownComponentProps) => (
            <blockquote 
              className={cn("my-8 border-l-2 border-primary pl-6 italic text-muted-foreground py-2", className)} 
              {...props}
            >
              {children}
            </blockquote>
          ),
          // Horizontal rule styling
          hr: ({ className, ...props }: MarkdownComponentProps) => (
            <hr 
              className={cn("my-8 border-t-2", className)} 
              {...props} 
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
