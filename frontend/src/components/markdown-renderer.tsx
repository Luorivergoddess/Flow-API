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
        className="p-5 overflow-x-auto bg-muted rounded-md border border-border text-sm"
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
          // 段落样式增强
          p: ({ className, children, ...props }: MarkdownComponentProps) => (
            <p 
              className={cn("my-6 leading-7", className)} 
              {...props}
            >
              {children}
            </p>
          ),
          
          // 表格相关自定义渲染
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
          
          // 代码块自定义渲染 - 增强版rehype-highlight
          pre: ({ node, className, children, ...props }: MarkdownComponentProps) => {
            // 尝试提取代码内容和语言信息
            const codeEl = node?.children?.[0];
            // 从类名中提取语言信息
            const className1 = codeEl?.properties?.className?.[0] || '';
            // 语言信息通常在 'language-xxx' 形式的类名中
            const language = (className1 ? String(className1).split('-')[1] : '') || '';
            
            // 尝试从不同位置获取原始代码
            let rawCode = '';
            if (codeEl?.children?.[0]?.value) {
              // 直接值
              rawCode = String(codeEl.children[0].value);
            } else if (typeof children === 'string') {
              // 如果children是字符串
              rawCode = children;
            } else if (children && React.isValidElement(children)) {
              // 如果children是React元素
              const childrenProps = children.props as any;
              if (typeof childrenProps?.children === 'string') {
                rawCode = childrenProps.children;
              }
            }
            
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
          
          // 代码块自定义渲染 - rehype-highlight版本
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
            return <code className={className} {...props}>{children}</code>;
          },
          
          // 其他元素样式增强
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
          // 水平线样式
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
