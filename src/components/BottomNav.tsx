import { Home, Search, User, Bell, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Лента', path: '/' },
    { icon: Search, label: 'Поиск', path: '/search' },
    { icon: Bell, label: 'Уведомления', path: '/notifications' },
    { icon: MessageSquare, label: 'Сообщения', path: '/messages' },
    { icon: User, label: 'Профиль', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
