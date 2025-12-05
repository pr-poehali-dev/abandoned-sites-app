import { Camera, MapPin, Calendar, Users } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Profile() {
  const userPosts = [
    'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/5729e5b9-a58a-490e-90a4-ec56d7fda7ea.jpg',
    'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/401ea866-b67d-41ea-953c-720ac3f10ada.jpg',
    'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/2dfb661c-14d4-4e5f-b75e-0add5c2a3c28.jpg',
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Профиль</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-20 w-20 border-4 border-primary">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="STALK_ZKTMO"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                S
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">STALK_ZKTMO</h2>
              <p className="text-sm text-muted-foreground mb-3">Главный администратор</p>
              <Button className="w-full" variant="default">
                Редактировать профиль
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4 text-center bg-muted/50 border-primary/20">
              <p className="text-2xl font-bold text-primary">342</p>
              <p className="text-xs text-muted-foreground">Публикации</p>
            </Card>
            <Card className="p-4 text-center bg-muted/50 border-primary/20">
              <p className="text-2xl font-bold text-primary">15.2K</p>
              <p className="text-xs text-muted-foreground">Подписчики</p>
            </Card>
            <Card className="p-4 text-center bg-muted/50 border-primary/20">
              <p className="text-2xl font-bold text-primary">89</p>
              <p className="text-xs text-muted-foreground">Подписки</p>
            </Card>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-foreground">
              🔎 Исследователь заброшенных мест
              <br />
              📍 Москва | СПб | Подмосковье
              <br />
              ⚠️ Только для 18+
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Дата создания: Январь 2024
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                156 мест исследовано
              </span>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Публикации
            </h3>
            <Button variant="ghost" size="sm" className="text-primary">
              Все
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {userPosts.map((post, idx) => (
              <div
                key={idx}
                className="aspect-square bg-black rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img src={post} alt={`Post ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <Card className="mt-6 p-4 bg-primary/10 border-primary/30">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">Правила сообщества</p>
                <p className="text-sm text-muted-foreground">
                  Помните о безопасности при посещении заброшенных объектов. Уважайте историю и не
                  причиняйте вред.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
