import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart } from 'lucide-react';

interface Comment {
  id: string;
  username: string;
  userAvatar: string;
  text: string;
  likes: number;
  timestamp: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

export default function CommentSection({ comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      username: 'Вы',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      text: newComment,
      likes: 0,
      timestamp: 'только что',
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="bg-card border-t border-border">
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-4">
          Комментарии ({comments.length})
        </h3>

        <div className="flex gap-2 mb-4">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Добавьте комментарий..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
          />
          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
            Отправить
          </Button>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={comment.userAvatar} alt={comment.username} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {comment.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="font-semibold text-sm text-foreground">
                    {comment.username}
                  </p>
                  <p className="text-sm text-foreground mt-1">{comment.text}</p>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <span>{comment.timestamp}</span>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart className="h-3 w-3" />
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                  </button>
                  <button className="hover:text-primary transition-colors">Ответить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
