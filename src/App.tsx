import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Icon from '@/components/ui/icon';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Post {
  id: number;
  image: string;
  location: string;
  description: string;
  history: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'feed' | 'search' | 'profile' | 'notifications'>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      image: 'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/df468513-f6e8-4221-a5cf-fd4fc56729ba.jpg',
      location: 'Завод "Красный Октябрь"',
      description: 'Промышленный гигант советской эпохи, заброшенный в начале 2000-х',
      history: 'Построен в 1952 году как один из крупнейших металлургических заводов СССР. В период расцвета здесь работало более 5000 человек. Закрыт в 2003 году из-за экономического кризиса.',
      likes: 342,
      comments: [
        { id: 1, author: 'urban_explorer', avatar: '', text: 'Невероятная атмосфера! Был там в прошлом месяце', timestamp: '2 часа назад' },
        { id: 2, author: 'stalker_pro', avatar: '', text: 'Осторожно, там охрана патрулирует', timestamp: '1 час назад' }
      ],
      timestamp: '3 дня назад'
    },
    {
      id: 2,
      image: 'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/b597a2cf-e288-4b85-84a1-115118addfae.jpg',
      location: 'Больница имени Семашко',
      description: 'Заброшенная больница с сохранившимся медицинским оборудованием',
      history: 'Открыта в 1967 году, закрыта в 2015 из-за нехватки финансирования. Известна своей архитектурой в стиле позднего советского модернизма.',
      likes: 521,
      comments: [
        { id: 1, author: 'photo_hunt', avatar: '', text: 'Жуткое место, особенно вечером', timestamp: '5 часов назад' }
      ],
      timestamp: '1 неделю назад'
    },
    {
      id: 3,
      image: 'https://cdn.poehali.dev/projects/bf17d2b3-cb7f-43f3-b502-b366b6b380ac/files/1441309b-5a42-4328-aded-bcaef16f29d8.jpg',
      location: 'Санаторий "Зелёный бор"',
      description: 'Разрушающийся санаторий с видом на море',
      history: 'Построен в 1978 году для отдыха партийной элиты. Закрыт после распада СССР в 1991 году. Считается одним из самых атмосферных заброшенных объектов региона.',
      likes: 687,
      comments: [],
      timestamp: '2 недели назад'
    }
  ]);

  const [notifications] = useState([
    { id: 1, text: 'urban_explorer прокомментировал ваш пост', time: '10 мин назад', read: false },
    { id: 2, text: 'stalker_pro начал за вами следить', time: '1 час назад', read: false },
    { id: 3, text: 'Ваш пост набрал 500 лайков', time: '3 часа назад', read: true }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: Date.now(),
      author: 'admin',
      avatar: '',
      text: newComment,
      timestamp: 'только что'
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newCommentObj] }
        : post
    ));
    
    setNewComment('');
  };

  const filteredPosts = posts.filter(post => 
    post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Ghost" className="text-primary" size={28} />
            <h1 className="text-xl font-bold">Abandoned Sites</h1>
            <Badge variant="destructive" className="text-xs">18+</Badge>
          </div>
          <div className="flex items-center gap-1">
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge variant="default" className="absolute top-2 right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {activeTab === 'feed' && (
          <div className="space-y-6 animate-fade-in">
            {posts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.location}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{post.location}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{post.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-2">{post.timestamp}</Badge>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-secondary hover:text-secondary hover:bg-secondary/10"
                        onClick={() => setSelectedPost(post)}
                      >
                        <Icon name="BookOpen" size={16} className="mr-2" />
                        История места
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>{post.location}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <img 
                          src={post.image} 
                          alt={post.location}
                          className="w-full rounded-lg"
                        />
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">Историческая справка</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{post.history}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="flex items-center gap-4 pt-2 border-t border-border">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="hover:text-primary"
                    >
                      <Icon name="Heart" size={20} className="mr-1" />
                      {post.likes}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="hover:text-accent">
                          <Icon name="MessageCircle" size={20} className="mr-1" />
                          {post.comments.length}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Комментарии</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {post.comments.map(comment => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{comment.author[0].toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-muted rounded-lg p-3">
                                  <p className="font-semibold text-sm">{comment.author}</p>
                                  <p className="text-sm mt-1">{comment.text}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{comment.timestamp}</p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="flex gap-2 pt-4 border-t border-border">
                            <Textarea
                              placeholder="Добавить комментарий..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="min-h-[60px]"
                            />
                            <Button 
                              onClick={() => handleAddComment(post.id)}
                              size="icon"
                              className="shrink-0"
                            >
                              <Icon name="Send" size={18} />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" className="hover:text-accent">
                      <Icon name="Share2" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-6 animate-fade-in">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск по локациям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-all" onClick={() => setActiveTab('feed')}>
                  <div className="flex gap-4">
                    <img src={post.image} alt={post.location} className="w-24 h-24 object-cover" />
                    <div className="flex-1 p-3">
                      <h3 className="font-bold">{post.location}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">A</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">STALK_ZKTMO</h2>
                  <Badge variant="secondary" className="mt-1">Главный Админ</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{posts.length}</p>
                  <p className="text-sm text-muted-foreground">Постов</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">1.2K</p>
                  <p className="text-sm text-muted-foreground">Подписчиков</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">856</p>
                  <p className="text-sm text-muted-foreground">Лайков</p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="text-lg font-bold mb-4">Мои посты</h3>
              <div className="grid grid-cols-3 gap-2">
                {posts.map(post => (
                  <div key={post.id} className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={post.image} 
                      alt={post.location}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3 animate-fade-in">
            {notifications.map(notif => (
              <Card key={notif.id} className={`p-4 ${!notif.read ? 'bg-muted/50' : ''}`}>
                <div className="flex items-start gap-3">
                  <Icon name="Bell" size={20} className="text-primary mt-1" />
                  <div className="flex-1">
                    <p className="text-sm">{notif.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-3 flex items-center justify-around max-w-2xl">
          <Button 
            variant={activeTab === 'feed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('feed')}
          >
            <Icon name="Home" size={22} />
          </Button>
          <Button 
            variant={activeTab === 'search' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('search')}
          >
            <Icon name="Search" size={22} />
          </Button>
          <Button 
            variant={activeTab === 'notifications' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('notifications')}
            className="relative"
          >
            <Icon name="Bell" size={22} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </Button>
          <Button 
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('profile')}
          >
            <Icon name="User" size={22} />
          </Button>
        </div>
      </nav>

      <Toaster />
    </div>
  );
}

export default App;
