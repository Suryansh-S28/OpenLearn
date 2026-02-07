# Data Structure Documentation

## Overview
This document explains the structure of `data.json` which contains all course/resource information for the OpenLearn platform.

---

## File: `data.json`

### Purpose
Contains an array of course objects that are loaded and displayed on the Courses page. This file is fetched dynamically by JavaScript to populate the course grid, tag filters, and search functionality.

### JSON Structure

```json
[
  {
    "title": "Course Name",
    "description": "Brief description of what you'll learn",
    "level": "Beginner|Intermediate|Advanced",
    "lessons": 5,
    "link": "URL or internal link to course",
    "tags": ["category1", "category2", "category3"]
  }
]
```

### Field Descriptions

#### `title` (String, Required)
- **Purpose**: The name of the course
- **Example**: `"JavaScript Essentials"`
- **Used for**: Course card heading, search results
- **Important**: Should be concise (3-5 words recommended) for better display

#### `description` (String, Required)
- **Purpose**: Short overview of the course content
- **Example**: `"Learn core JavaScript concepts with hands-on exercises"`
- **Used for**: Course card subtitle, search indexing
- **Important**: Keep under 100 characters for optimal display on cards

#### `level` (String, Required)
- **Valid Values**: `"Beginner"`, `"Intermediate"`, `"Advanced"`
- **Purpose**: Indicates difficulty level for filtering
- **Used for**: Level filter dropdown, course card metadata
- **Important**: Must match exactly (capitalization matters)
- **Example**: `"Beginner"`

#### `lessons` (Number, Required)
- **Purpose**: Number of lessons in the course
- **Type**: Integer
- **Example**: `8`
- **Used for**: Displayed as "X lessons" on course cards and resources
- **Important**: Helps users understand course scope and time commitment

#### `link` (String, Required)
- **Purpose**: URL where users click "Open" to access the course
- **Example**: `"Courses.html#javascript-essentials"` or `"https://example.com/javascript"`
- **Used for**: Open button on course cards
- **Important**: Can be internal (same site) or external (other websites)

#### `tags` (Array of Strings, Required)
- **Purpose**: Categories/topics for filtering and organization
- **Example**: `["javascript", "programming", "web"]`
- **Used for**: Tag filter chips, search matching
- **Important**: 
  - Use lowercase (applies to all searches)
  - 2-5 tags per course recommended
  - Keep tag names short (1-2 words)
  - Use consistent naming across all courses

---

## How Data is Used

### 1. Loading Data
When the Courses page loads, JavaScript (`Courses.html`):
```javascript
const res = await fetch('data.json');
const data = await res.json();
```

### 2. Rendering Courses
Each course object is converted to a card:
- Title appears as a link
- Description shows below title
- Tags appear as clickable chips
- Level and lessons shown as metadata
- Open button links to the course

### 3. Filtering & Search
All filters use data from these fields:
- **Text Search**: Searches in `title` + `description`
- **Level Filter**: Matches against `level` field
- **Tag Filter**: Matches against items in `tags` array
- **Tag Generation**: Automatically counts courses per tag

---

## Adding New Courses

### Step 1: Add to `data.json`
Add a new course object to the array:

```json
{
  "title": "Express.js Backend Development",
  "description": "Learn to build REST APIs and server applications with Express.js",
  "level": "Intermediate",
  "lessons": 12,
  "link": "https://example.com/expressjs-course",
  "tags": ["javascript", "backend", "nodejs", "api"]
}
```

### Step 2: Best Practices
- ✅ Use exact capitalization for `level` field
- ✅ Keep `tags` lowercase and consistent
- ✅ Use short, descriptive titles (3-7 words)
- ✅ Keep descriptions under 100 characters
- ✅ Remove duplicates (check existing tags first)
- ❌ Don't add extra fields not in the schema
- ❌ Don't leave fields empty
- ❌ Don't break JSON syntax

### Step 3: Testing
1. Save `data.json`
2. Refresh the Courses page in browser
3. Verify new course appears in grid
4. Check that new tags appear in filter
5. Test search with course title keywords
6. Test level filter includes course at correct level

---

## Common Mistakes & Solutions

### Problem: Course doesn't appear
- **Check**: JSON syntax (use JSON validator)
- **Check**: All required fields are present
- **Check**: Browser console for fetch errors
- **Solution**: Refresh page with Ctrl+F5 (hard refresh)

### Problem: Tags don't filter correctly
- **Check**: Tags are lowercase
- **Check**: Tag names match across courses
- **Solution**: Standardize tag naming (e.g., use "ml" not "machine-learning")

### Problem: Search doesn't find course
- **Check**: Keywords in title or description
- **Check**: Exact spelling matches search term
- **Note**: Search is case-insensitive, matches partial words

### Problem: Level filter shows wrong level
- **Check**: `level` field matches exactly: "Beginner", "Intermediate", or "Advanced"
- **Fix**: Correct capitalization if needed

---

## Example: Complete Course Entry

```json
{
  "title": "Python for Data Science",
  "description": "Learn Python programming with focus on data analysis and visualization",
  "level": "Intermediate",
  "lessons": 9,
  "link": "https://example.com/python-data-science",
  "tags": ["python", "data", "analysis", "pandas"]
}
```

### This course:
- ✅ Has descriptive, searchable title
- ✅ Includes relevant tags for filtering
- ✅ Specifies appropriate difficulty level
- ✅ Shows realistic lesson count
- ✅ Has valid external link (opens in new tab)
- ✅ Clear description under 100 chars

---

## Tech Notes for Developers

### Fetching Data
```javascript
// Data is fetched dynamically
const response = await fetch('data.json');
const courses = await response.json();
```

### Filtering Algorithm
```javascript
// Courses must match ALL active filters:
const filtered = courses.filter(course => {
  const matchesSearch = searchText === '' || 
    (course.title + course.description).includes(searchText);
  const matchesLevel = levelFilter === '' || 
    course.level === levelFilter;
  const matchesTags = selectedTags.length === 0 || 
    course.tags.some(t => selectedTags.includes(t));
  
  return matchesSearch && matchesLevel && matchesTags;
});
```

### Tag Counting
```javascript
// Count courses per tag (used in filter UI)
const tagCounts = {};
courses.forEach(course => {
  course.tags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
});
```

---

## Future Enhancements

Potential fields to add in future versions:
- `instructor`: Author/instructor name
- `duration`: Estimated hours to complete
- `price`: Cost (free/paid)
- `rating`: User rating (1-5 stars)
- `students`: Number of students enrolled
- `image`: Course preview image URL
- `prerequisites`: Required prior knowledge
- `certificate`: Whether course offers certificate

---

## Questions?

For issues or questions about the data structure, check:
1. Browser console for errors
2. `DATA_STRUCTURE.md` (this file)
3. Comments in `Courses.html` JavaScript section
4. Comments in `Courses_Style.css`
