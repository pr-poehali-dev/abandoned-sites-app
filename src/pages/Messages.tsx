import { useState } from 'react';
import { Search, Send } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const chats = [
    {
      id: '1',
      user: 'urban_explorer_93',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      lastMessage: 'Привет! Когда планируешь новую локацию?',
      timestamp: '10 мин назад',
      unread: 2,
    },
    {
      id: '2',
      user: 'stalker_moscow',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
      lastMessage: 'Отправил координаты в личку',
      timestamp: '1 час назад',
      unread: 0,
    },
    {
      id: '3',
      user: 'abandoned_hunter',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
      lastMessage: 'Спасибо за информацию!',
      timestamp: '2 часа назад',
      unread: 0,
    },
    {
      id: '4',
      user: 'darkplaces_lover',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
      lastMessage: 'Интересная локация, можно с тобой?',
      timestamp: 'вчера',
      unread: 1,
    },
  ];

  const messages = [
    {
      id: '1',
      sender: 'urban_explorer_93',
      text: 'Привет! Когда планируешь новую локацию?',
      timestamp: '10:30',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'STALK_ZKTMO',
      text: 'Привет! На следующей неделе думаю поехать в заброшенный санаторий.',
      timestamp: '10:32',
      isOwn: true,
    },
    {
      id: '3',
      sender: 'urban_explorer_93',
      text: 'Круто! Можно с тобой?',
      timestamp: '10:33',
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setMessageText('');
  };

  if (selectedChat) {
    const chat = chats.find((c) => c.id === selectedChat);
    return (
      <div className="flex flex-col h-screen bg-background">
        <header className="sticky top-0 z-40 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
          <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
            <button onClick={() => setSelectedChat(null)} className="text-primary">
              ← Назад
            </button>
            <Avatar className="h-10 w-10 border-2 border-primary/30">
              <AvatarImage src={chat?.avatar} alt={chat?.user} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {chat?.user.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{chat?.user}</h2>
              <p className="text-xs text-muted-foreground">онлайн</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.isOwn
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  } rounded-2xl px-4 py-2`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="sticky bottom-0 bg-card border-t border-border p-4 max-w-md mx-auto w-full">
          <div className="flex gap-2">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} size="icon" disabled={!messageText.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
        <div className="max-w-md mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-primary mb-3">Сообщения</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Поиск чатов..." className="pl-10" />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {chats.map((chat) => (
          <Card
            key={chat.id}
            className="p-4 mb-2 border-b border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => setSelectedChat(chat.id)}
          >
            <div className="flex gap-3">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-primary/30">
                  <AvatarImage src={chat.avatar} alt={chat.user} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {chat.user.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-foreground">{chat.user}</h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full px-2 py-0.5 flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
