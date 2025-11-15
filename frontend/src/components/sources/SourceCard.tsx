'use client';

import { useState } from 'react';
import { SubjectSource } from '@/data/schoolData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  ExternalLink, 
  Play, 
  FileText, 
  Globe, 
  Video, 
  MoreHorizontal,
  Edit,
  Trash2,
  Clock,
  Star
} from 'lucide-react';
// Dropdown menu replaced with simple buttons

interface SourceCardProps {
  source: SubjectSource;
  onEdit?: (source: SubjectSource) => void;
  onDelete?: (sourceId: string) => void;
  isEditable?: boolean;
}

export function SourceCard({ source, onEdit, onDelete, isEditable = false }: SourceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Play className="h-4 w-4 text-red-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'website':
        return <Globe className="h-4 w-4 text-green-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-purple-500" />;
      default:
        return <ExternalLink className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'youtube':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'document':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'website':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'video':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSourceClick = () => {
    window.open(source.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className={`transition-all duration-200 cursor-pointer hover:shadow-md ${
        isHovered ? 'ring-2 ring-blue-200' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSourceClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1">
            {getSourceIcon(source.type)}
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
              {source.title}
            </CardTitle>
          </div>
          {isEditable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(source); }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => { e.stopPropagation(); onDelete?.(source.id); }}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Source Type Badge */}
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs ${getSourceTypeColor(source.type)}`}
            >
              {source.type.charAt(0).toUpperCase() + source.type.slice(1)}
            </Badge>
            {source.isRequired && (
              <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                <Star className="h-3 w-3 mr-1" />
                Required
              </Badge>
            )}
          </div>

          {/* Description */}
          {source.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {source.description}
            </p>
          )}

          {/* Duration */}
          {source.duration && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{source.duration} min</span>
            </div>
          )}

          {/* URL Preview */}
          <div className="text-xs text-gray-500 truncate">
            {source.url}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SourceCard;
