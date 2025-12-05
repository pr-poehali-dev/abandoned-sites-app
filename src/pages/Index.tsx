import PostCard from '@/components/PostCard';
import BottomNav from '@/components/BottomNav';

export default function Index() {
  const posts = [
    {
      id: '1',
      username: 'STALK_ZKTMO',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      location: 'Завод "Красный Октябрь", Москва',
      locationInfo:
        'Промышленное предприятие основано в 1867 году. Закрыто в 2007 году в рамках программы реорганизации промзон. Здание представляет собой уникальный образец промышленной архитектуры XIX века.',
      images: [
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/5729e5b9-a58a-490e-90a4-ec56d7fda7ea.jpg',
      ],
      description:
        'Впечатляющая заброшенная промзона. Невероятная атмосфера времени и истории.',
      likes: 342,
      comments: 28,
      timestamp: '2 часа назад',
    },
    {
      id: '2',
      username: 'STALK_ZKTMO',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      location: 'Больница им. Семашко, Санкт-Петербург',
      locationInfo:
        'Психиатрическая больница построена в 1901 году. Работала до 2013 года, после чего была закрыта из-за аварийного состояния здания. Памятник архитектуры федерального значения.',
      images: [
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/401ea866-b67d-41ea-953c-720ac3f10ada.jpg',
      ],
      description: 'Жуткое, но завораживающее место. Коридоры хранят множество историй.',
      likes: 289,
      comments: 45,
      timestamp: '5 часов назад',
    },
    {
      id: '3',
      username: 'STALK_ZKTMO',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      location: 'Усадьба Марфино, Подмосковье',
      locationInfo:
        'Дворянская усадьба XVIII века. Принадлежала роду Салтыковых. Разрушена в советское время, восстановление планировалось несколько раз, но так и не было завершено. Архитектурный стиль - псевдоготика.',
      images: [
        'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/2dfb661c-14d4-4e5f-b75e-0add5c2a3c28.jpg',
      ],
      description: 'Природа постепенно забирает назад эту величественную усадьбу.',
      likes: 456,
      comments: 37,
      timestamp: '1 день назад',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Abandoned Sites</h1>
          <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded">
            18+
          </span>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
