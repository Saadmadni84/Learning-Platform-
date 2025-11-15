'use client';

import { useState } from 'react';
import { SubjectSource } from '@/data/schoolData';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Textarea replaced with native HTML textarea
// Select components replaced with native HTML select
// Dialog components replaced with simple modals
import { 
  Plus, 
  Search, 
  Filter, 
  SortAsc, 
  Youtube, 
  FileText, 
  Globe, 
  Video,
  ExternalLink
} from 'lucide-react';
import SourceCard from './SourceCard';

interface SourcesSectionProps {
  sources: SubjectSource[];
  onAddSource?: (source: Omit<SubjectSource, 'id'>) => void;
  onEditSource?: (source: SubjectSource) => void;
  onDeleteSource?: (sourceId: string) => void;
  onReorderSources?: (sourceIds: string[]) => void;
  isEditable?: boolean;
  subjectName?: string;
}

export function SourcesSection({ 
  sources, 
  onAddSource, 
  onEditSource, 
  onDeleteSource, 
  onReorderSources,
  isEditable = false,
  subjectName = 'Subject'
}: SourcesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('order');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<SubjectSource | null>(null);
  const [newSource, setNewSource] = useState({
    title: '',
    url: '',
    type: 'youtube' as const,
    description: '',
    duration: 0,
    isRequired: false,
    order: sources.length
  });

  const filteredSources = sources
    .filter(source => {
      const matchesSearch = source.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           source.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || source.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'duration':
          return (a.duration || 0) - (b.duration || 0);
        case 'order':
        default:
          return a.order - b.order;
      }
    });

  const handleAddSource = () => {
    if (newSource.title && newSource.url) {
      onAddSource?.(newSource);
      setNewSource({
        title: '',
        url: '',
        type: 'youtube',
        description: '',
        duration: 0,
        isRequired: false,
        order: sources.length
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditSource = (source: SubjectSource) => {
    setEditingSource(source);
    setIsEditDialogOpen(true);
  };

  const handleUpdateSource = () => {
    if (editingSource) {
      onEditSource?.(editingSource);
      setIsEditDialogOpen(false);
      setEditingSource(null);
    }
  };

  const getSourceTypeIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-500" />;
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

  const sourceTypeCounts = sources.reduce((acc, source) => {
    acc[source.type] = (acc[source.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Learning Resources
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {sources.length} resources available for {subjectName}
          </p>
        </div>
        {isEditable && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Add a new learning resource for {subjectName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newSource.title}
                    onChange={(e) => setNewSource({ ...newSource, title: e.target.value })}
                    placeholder="Resource title"
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={newSource.url}
                    onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newSource.type} onValueChange={(value: any) => setNewSource({ ...newSource, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube Video</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newSource.description}
                    onChange={(e) => setNewSource({ ...newSource, description: e.target.value })}
                    placeholder="Brief description of the resource"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newSource.duration}
                      onChange={(e) => setNewSource({ ...newSource, duration: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="isRequired"
                      checked={newSource.isRequired}
                      onChange={(e) => setNewSource({ ...newSource, isRequired: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="isRequired">Required</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSource}>
                  Add Resource
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="website">Websites</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">Order</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Source Type Summary */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(sourceTypeCounts).map(([type, count]) => (
          <Badge key={type} variant="outline" className="gap-1">
            {getSourceTypeIcon(type)}
            {type.charAt(0).toUpperCase() + type.slice(1)} ({count})
          </Badge>
        ))}
      </div>

      {/* Sources Grid */}
      {filteredSources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              onEdit={handleEditSource}
              onDelete={onDeleteSource}
              isEditable={isEditable}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <FileText className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No learning resources have been added yet'
                }
              </p>
              {isEditable && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Resource
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
            <DialogDescription>
              Update the learning resource details
            </DialogDescription>
          </DialogHeader>
          {editingSource && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingSource.title}
                  onChange={(e) => setEditingSource({ ...editingSource, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-url">URL</Label>
                <Input
                  id="edit-url"
                  value={editingSource.url}
                  onChange={(e) => setEditingSource({ ...editingSource, url: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Select 
                  value={editingSource.type} 
                  onValueChange={(value: any) => setEditingSource({ ...editingSource, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube Video</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingSource.description || ''}
                  onChange={(e) => setEditingSource({ ...editingSource, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={editingSource.duration || 0}
                    onChange={(e) => setEditingSource({ ...editingSource, duration: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="edit-isRequired"
                    checked={editingSource.isRequired || false}
                    onChange={(e) => setEditingSource({ ...editingSource, isRequired: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="edit-isRequired">Required</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSource}>
              Update Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SourcesSection;
