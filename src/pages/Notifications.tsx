import { Heart, MessageCircle, UserPlus, Bell } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

export default function Notifications() {
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: 'urban_explorer_93',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      action: 'понравился ваш пост',
      target: 'Завод "Красный Октябрь"',
      timestamp: '2 минуты назад',
      image:
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/5729e5b9-a58a-490e-90a4-ec56d7fda7ea.jpg',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      user: 'stalker_moscow',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
      action: 'прокомментировал',
      target: 'Больница им. Семашко',
      comment: 'Невероятное место! Когда планируете следующий выезд?',
      timestamp: '15 минут назад',
      image:
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/401ea866-b67d-41ea-953c-720ac3f10ada.jpg',
      read: false,
    },
    {
      id: '3',
      type: 'follow',
      user: 'abandoned_hunter',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
      action: 'подписался на вас',
      timestamp: '1 час назад',
      read: false,
    },
    {
      id: '4',
      type: 'like',
      user: 'darkplaces_lover',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
      action: 'понравился ваш пост',
      target: 'Усадьба Марфино',
      timestamp: '3 часа назад',
      image:
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/2dfb661c-14d4-4e5f-b75e-0add5c2a3c28.jpg',
      read: true,
    },
    {
      id: '5',
      type: 'comment',
      user: 'history_buff',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user5',
      action: 'прокомментировал',
      target: 'Усадьба Марфино',
      comment: 'Отличная историческая справка! Добавил в избранное.',
      timestamp: '5 часов назад',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-destructive fill-destructive" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-primary" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-secondary" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Уведомления</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 mb-2 border-b border-border ${
              notification.read ? 'bg-card' : 'bg-primary/5'
            } hover:bg-muted/50 transition-colors cursor-pointer`}
          >
            <div className="flex gap-3">
              <div className="relative flex-shrink-0">
                <Avatar className="h-12 w-12 border-2 border-primary/30">
                  <AvatarImage src={notification.avatar} alt={notification.user} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {notification.user.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1 border border-border">
                  {getIcon(notification.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="font-semibold text-foreground">{notification.user}</span>
                    <span className="text-foreground ml-1">{notification.action}</span>
                    {notification.target && (
                      <span className="text-primary ml-1">"{notification.target}"</span>
                    )}
                  </div>
                  {notification.image && (
                    <div className="w-12 h-12 rounded overflow-hidden bg-black flex-shrink-0">
                      <img
                        src={notification.image}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {notification.comment && (
                  <p className="text-sm text-muted-foreground mb-2">{notification.comment}</p>
                )}

                <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
              </div>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
