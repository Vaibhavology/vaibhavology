"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Hey! 👋 I'm Vaibhav's portfolio assistant. Ask me anything about his skills, experience, or projects!",
  },
];

const SUGGESTIONS = [
  "What does Vaibhav do?",
  "Tell me about his projects",
  "What's his tech stack?",
  "How can I contact him?",
];

function ChatBot(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasUnread(false);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: Message = { role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: messages.slice(-10),
          }),
        });

        const data = await response.json();
        const assistantMessage: Message = {
          role: "assistant",
          content: data.reply || "Sorry, something went wrong.",
        };

        setMessages((prev) => [...prev, assistantMessage]);
        if (!isOpen) setHasUnread(true);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Network error. Please check your connection and try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, isOpen]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
    },
    [sendMessage]
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Simple markdown-like rendering for bot messages
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      // Bold
      const boldParsed = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Links
      const linkParsed = boldParsed.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="chatbot-link">$1</a>'
      );
      // Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        return (
          <div key={i} className="flex items-start gap-2 ml-1">
            <span className="mt-2 w-1 h-1 rounded-full bg-current flex-shrink-0 opacity-50" />
            <span
              dangerouslySetInnerHTML={{
                __html: linkParsed.replace(/^[\s]*[-•]\s*/, ""),
              }}
            />
          </div>
        );
      }
      if (line.trim() === "") return <br key={i} />;
      return (
        <span
          key={i}
          className="block"
          dangerouslySetInnerHTML={{ __html: linkParsed }}
        />
      );
    });
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`chatbot-panel ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Chat with Vaibhav's AI assistant"
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white text-sm font-bold shadow-lg">
              V
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Vaibhav&apos;s Assistant
              </p>
              <p className="text-xs text-[var(--accent-green)] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] inline-block animate-pulse" />
                Online
              </p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--background-tertiary)] transition-colors"
            aria-label="Close chat"
          >
            <svg
              className="w-4 h-4 text-[var(--foreground-tertiary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chatbot-message ${msg.role}`}
            >
              {msg.role === "assistant" && (
                <div className="chatbot-avatar">V</div>
              )}
              <div className={`chatbot-bubble ${msg.role}`}>
                {renderContent(msg.content)}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="chatbot-message assistant">
              <div className="chatbot-avatar">V</div>
              <div className="chatbot-bubble assistant">
                <div className="chatbot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          {/* Suggestions (show only at start) */}
          {messages.length <= 1 && !isLoading && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="chatbot-suggestion"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="chatbot-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="chatbot-send"
            aria-label="Send message"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19V5m0 0l-7 7m7-7l7 7"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`chatbot-toggle ${isOpen ? "open" : ""}`}
        aria-label="Toggle chat"
      >
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent-pink)] border-2 border-[var(--background)] animate-pulse" />
        )}
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        )}
      </button>
    </>
  );
}

export default memo(ChatBot);
