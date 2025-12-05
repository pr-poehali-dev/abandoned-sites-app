import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  id: string;
  username: string;
  userAvatar: string;
  location: string;
  locationInfo: string;
  images: string[];
  description: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export default function PostCard({
  username,
  userAvatar,
  location,
  locationInfo,
  images,
  description,
  likes: initialLikes,
  comments,
  timestamp,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <Card className="bg-card border-border overflow-hidden mb-4">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{username}</p>
            <p className="text-sm text-primary">{location}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative aspect-square bg-black">
        <img
          src={images[currentImageIndex]}
          alt={location}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex
                    ? 'w-6 bg-primary'
                    : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={liked ? 'text-destructive' : 'text-foreground'}
            >
              <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSaved(!saved)}
            className={saved ? 'text-primary' : 'text-foreground'}
          >
            <Bookmark className={`h-6 w-6 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <p className="font-semibold text-foreground mb-1">{likes} отметок "Нравится"</p>
        
        <div className="mb-2">
          <span className="font-semibold text-foreground mr-2">{username}</span>
          <span className="text-foreground">{description}</span>
        </div>

        <div className="bg-muted/50 p-3 rounded-lg mb-2 border border-primary/20">
          <p className="text-xs font-semibold text-primary mb-1">📍 ИСТОРИЧЕСКАЯ СПРАВКА</p>
          <p className="text-sm text-muted-foreground">{locationInfo}</p>
        </div>

        {comments > 0 && (
          <button className="text-sm text-muted-foreground mb-2">
            Посмотреть все комментарии ({comments})
          </button>
        )}
        
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </Card>
  );
}
