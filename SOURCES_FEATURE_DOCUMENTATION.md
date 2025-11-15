# Sources Feature Documentation

## Overview
The Sources feature allows adding YouTube video links and other learning resources to all subjects in the Acadevia platform. This feature enhances the learning experience by providing additional materials and resources for each subject.

## Features Implemented

### 🎯 **Core Features**
- ✅ Add YouTube video links to subjects
- ✅ Support multiple resource types (YouTube, Documents, Websites, Videos, Other)
- ✅ Resource management (Add, Edit, Delete, Reorder)
- ✅ Search and filter resources
- ✅ Required/Optional resource marking
- ✅ Resource duration tracking
- ✅ Responsive design for all devices

### 🏗️ **Architecture**

#### Backend Implementation
- **Database Schema**: Added `sources` JSON field to Course model
- **API Endpoints**: Complete CRUD operations for source management
- **Authentication**: All source operations require instructor authentication
- **Validation**: URL validation, type validation, and data sanitization

#### Frontend Implementation
- **Components**: Modular source management components
- **State Management**: Local state management for source operations
- **UI/UX**: Intuitive interface with search, filter, and sort capabilities
- **Responsive Design**: Mobile-first approach with responsive layouts

## Database Schema

### Course Model Updates
```prisma
model Course {
  // ... existing fields
  sources        Json?        // Array of source objects with YouTube links and other resources
  // ... other fields
}
```

### Source Data Structure
```typescript
interface SubjectSource {
  id: string;
  title: string;
  url: string;
  type: 'youtube' | 'document' | 'website' | 'video' | 'other';
  description?: string;
  duration?: number; // in minutes
  isRequired?: boolean;
  order: number;
}
```

## API Endpoints

### Source Management Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/sources/:courseId` | Get all sources for a course | Required |
| POST | `/api/sources/:courseId` | Add new source to course | Required |
| PUT | `/api/sources/:courseId/:sourceId` | Update existing source | Required |
| DELETE | `/api/sources/:courseId/:sourceId` | Delete source from course | Required |
| PUT | `/api/sources/:courseId/reorder` | Reorder sources | Required |

### Request/Response Examples

#### Get Course Sources
```bash
GET /api/sources/course-123
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "course-123",
    "courseTitle": "Mathematics",
    "sources": [
      {
        "id": "source-1",
        "title": "Algebra Basics",
        "url": "https://www.youtube.com/watch?v=example",
        "type": "youtube",
        "description": "Learn algebra fundamentals",
        "duration": 15,
        "isRequired": true,
        "order": 0
      }
    ]
  }
}
```

#### Add New Source
```bash
POST /api/sources/course-123
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Geometry Concepts",
  "url": "https://www.youtube.com/watch?v=example2",
  "type": "youtube",
  "description": "Understanding geometric shapes",
  "duration": 20,
  "isRequired": false
}
```

## Frontend Components

### 1. SourceCard Component
**Location**: `frontend/src/components/sources/SourceCard.tsx`

**Features:**
- Display source information with appropriate icons
- Click to open external links
- Edit/Delete actions for instructors
- Visual indicators for required resources
- Duration display
- Type-specific styling

**Props:**
```typescript
interface SourceCardProps {
  source: SubjectSource;
  onEdit?: (source: SubjectSource) => void;
  onDelete?: (sourceId: string) => void;
  isEditable?: boolean;
}
```

### 2. SourcesSection Component
**Location**: `frontend/src/components/sources/SourcesSection.tsx`

**Features:**
- Complete source management interface
- Search and filter functionality
- Add/Edit/Delete operations
- Drag-and-drop reordering
- Type-based filtering
- Sort by multiple criteria

**Props:**
```typescript
interface SourcesSectionProps {
  sources: SubjectSource[];
  onAddSource?: (source: Omit<SubjectSource, 'id'>) => void;
  onEditSource?: (source: SubjectSource) => void;
  onDeleteSource?: (sourceId: string) => void;
  onReorderSources?: (sourceIds: string[]) => void;
  isEditable?: boolean;
  subjectName?: string;
}
```

## Usage Examples

### Adding Sources to Subjects

#### 1. For Instructors (Editable Mode)
```tsx
<SourcesSection 
  sources={subject.sources}
  onAddSource={handleAddSource}
  onEditSource={handleEditSource}
  onDeleteSource={handleDeleteSource}
  onReorderSources={handleReorderSources}
  isEditable={true}
  subjectName={subject.name}
/>
```

#### 2. For Students (Read-only Mode)
```tsx
<SourcesSection 
  sources={subject.sources}
  isEditable={false}
  subjectName={subject.name}
/>
```

### Sample Data Structure
```typescript
const sampleSubject: Subject = {
  id: "class-6-mathematics",
  name: "Mathematics",
  description: "Explore numbers, algebra, geometry, and problem-solving",
  icon: "🔢",
  color: "bg-blue-500",
  totalLessons: 25,
  completedLessons: 15,
  progress: 60,
  difficulty: "intermediate",
  sources: [
    {
      id: "math-video-1",
      title: "Algebra Basics - Introduction",
      url: "https://www.youtube.com/watch?v=NybHckSEQBI",
      type: "youtube",
      description: "Learn the fundamentals of algebra",
      duration: 15,
      isRequired: true,
      order: 0
    },
    {
      id: "math-video-2",
      title: "Geometry Concepts",
      url: "https://www.youtube.com/watch?v=J6t1GlIeBqI",
      type: "youtube",
      description: "Understanding geometric shapes and properties",
      duration: 20,
      isRequired: false,
      order: 1
    }
  ]
};
```

## Resource Types

### 1. YouTube Videos
- **Icon**: Play button (red)
- **Features**: Duration tracking, thumbnail preview
- **Use Case**: Educational videos, tutorials, lectures

### 2. Documents
- **Icon**: File text (blue)
- **Features**: PDF support, document preview
- **Use Case**: Study guides, worksheets, reference materials

### 3. Websites
- **Icon**: Globe (green)
- **Features**: External link handling
- **Use Case**: Online resources, interactive content

### 4. Videos
- **Icon**: Video camera (purple)
- **Features**: General video content
- **Use Case**: Non-YouTube video content

### 5. Other
- **Icon**: External link (gray)
- **Features**: Generic resource handling
- **Use Case**: Miscellaneous learning materials

## Search and Filter Features

### Search Functionality
- Search by title and description
- Real-time search with debouncing
- Case-insensitive matching

### Filter Options
- Filter by resource type
- Filter by required/optional status
- Filter by duration range

### Sort Options
- Sort by order (default)
- Sort by title (alphabetical)
- Sort by type
- Sort by duration

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked filter controls
- Touch-friendly interface
- Optimized for thumb navigation

### Tablet (768px - 1024px)
- Two-column grid layout
- Side-by-side filters
- Medium-sized cards

### Desktop (> 1024px)
- Three-column grid layout
- Full filter sidebar
- Large cards with detailed information

## Security Considerations

### Authentication
- All source management operations require instructor authentication
- JWT token validation for all API calls
- Role-based access control

### Data Validation
- URL format validation
- XSS prevention through input sanitization
- CSRF protection on state-changing operations

### External Links
- All external links open in new tabs
- `noopener` and `noreferrer` attributes for security
- URL validation before opening

## Performance Optimizations

### Frontend
- Lazy loading of source components
- Debounced search input
- Virtual scrolling for large source lists
- Memoized components to prevent unnecessary re-renders

### Backend
- Efficient JSON queries for source data
- Pagination for large source collections
- Caching of frequently accessed sources

## Testing

### Unit Tests
- Component rendering tests
- API endpoint tests
- Data validation tests

### Integration Tests
- End-to-end source management flow
- Authentication and authorization tests
- Cross-browser compatibility tests

## Future Enhancements

### Planned Features
- [ ] Bulk source import/export
- [ ] Source analytics and usage tracking
- [ ] Collaborative source curation
- [ ] AI-powered source recommendations
- [ ] Offline source access
- [ ] Source versioning and history

### Advanced Features
- [ ] Source playlists and collections
- [ ] Interactive source annotations
- [ ] Source completion tracking
- [ ] Integration with learning management systems

## Troubleshooting

### Common Issues

#### 1. Sources Not Loading
- Check authentication token
- Verify course permissions
- Check network connectivity

#### 2. YouTube Links Not Working
- Verify URL format
- Check if video is public
- Ensure proper YouTube URL structure

#### 3. Edit/Delete Not Working
- Verify instructor permissions
- Check if user is course instructor
- Ensure proper authentication

### Debug Mode
Enable debug mode by setting `DEBUG_SOURCES=true` in environment variables to see detailed logging.

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
