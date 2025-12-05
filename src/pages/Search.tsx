import { useState } from 'react';
import { Search as SearchIcon, MapPin, Clock, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingLocations = [
    {
      id: '1',
      name: 'Завод "Красный Октябрь"',
      city: 'Москва',
      posts: 128,
      image:
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/5729e5b9-a58a-490e-90a4-ec56d7fda7ea.jpg',
    },
    {
      id: '2',
      name: 'Больница им. Семашко',
      city: 'Санкт-Петербург',
      posts: 96,
      image:
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/401ea866-b67d-41ea-953c-720ac3f10ada.jpg',
    },
    {
      id: '3',
      name: 'Усадьба Марфино',
      city: 'Подмосковье',
      posts: 84,
      image:
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/2dfb661c-14d4-4e5f-b75e-0add5c2a3c28.jpg',
    },
  ];

  const recentSearches = [
    'Заброшенные больницы',
    'Индустриальные объекты',
    'Усадьбы 19 века',
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск заброшенных мест..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        {!searchQuery && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">Недавние запросы</h2>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, idx) => (
                  <Card
                    key={idx}
                    className="p-3 bg-muted/50 border-border cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => setSearchQuery(search)}
                  >
                    <p className="text-sm text-foreground">{search}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">Популярные места</h2>
              </div>
              <div className="space-y-3">
                {trendingLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="p-3 bg-card border-border cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-black flex-shrink-0">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">{location.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          <span>{location.city}</span>
                        </div>
                        <div className="inline-flex items-center gap-1 bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">
                          <TrendingUp className="h-3 w-3" />
                          {location.posts} постов
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {searchQuery && (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Результаты поиска для "{searchQuery}" появятся здесь
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
