// Class 6 Mathematics Chapter Structure with YouTube Playlist Integration
// Based on NCERT/UP Board syllabus

export interface MathChapter {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  videos: YouTubeVideo[];
  exercises: number;
  icon: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  duration: number; // in minutes
  description: string;
  isRequired: boolean;
  chapterId: string;
  order: number;
  thumbnail?: string;
  cloudinaryUrl?: string;
}

// Class 6 Mathematics Chapters with YouTube Playlist Integration
export const class6MathChapters: MathChapter[] = [
  {
    id: 'knowing-our-numbers',
    title: 'Knowing Our Numbers',
    titleHindi: 'अपनी संख्याओं की जानकारी',
    description: 'Learn about large numbers, place value, and number comparison',
    descriptionHindi: 'बड़ी संख्याएं, स्थानीय मान और संख्या की तुलना के बारे में सीखें',
    topics: [
      'Introduction to Large Numbers',
      'Place Value System',
      'Number Comparison',
      'Estimation',
      'Rounding off Numbers'
    ],
    difficulty: 'beginner',
    estimatedHours: 8,
    exercises: 15,
    icon: '🔢',
    videos: [
      {
        id: 'large-numbers-intro',
        title: 'Introduction to Large Numbers',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=0',
        duration: 15,
        description: 'Understanding large numbers and place value system',
        isRequired: true,
        chapterId: 'knowing-our-numbers',
        order: 1
      },
      {
        id: 'place-value-system',
        title: 'Place Value System Explained',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=900',
        duration: 20,
        description: 'Detailed explanation of place value system',
        isRequired: true,
        chapterId: 'knowing-our-numbers',
        order: 2
      },
      {
        id: 'number-comparison',
        title: 'Comparing Numbers',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=2100',
        duration: 18,
        description: 'How to compare large numbers effectively',
        isRequired: true,
        chapterId: 'knowing-our-numbers',
        order: 3
      }
    ]
  },
  {
    id: 'whole-numbers',
    title: 'Whole Numbers',
    titleHindi: 'पूर्ण संख्याएं',
    description: 'Properties and operations with whole numbers',
    descriptionHindi: 'पूर्ण संख्याओं के गुण और संक्रियाएं',
    topics: [
      'Properties of Whole Numbers',
      'Number Line',
      'Addition and Subtraction',
      'Multiplication and Division',
      'Word Problems'
    ],
    difficulty: 'beginner',
    estimatedHours: 10,
    exercises: 20,
    icon: '🔢',
    videos: [
      {
        id: 'whole-numbers-properties',
        title: 'Properties of Whole Numbers',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=3300',
        duration: 22,
        description: 'Understanding closure, commutative, associative properties',
        isRequired: true,
        chapterId: 'whole-numbers',
        order: 1
      },
      {
        id: 'number-line-basics',
        title: 'Number Line Fundamentals',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=4500',
        duration: 16,
        description: 'Representing whole numbers on number line',
        isRequired: true,
        chapterId: 'whole-numbers',
        order: 2
      },
      {
        id: 'operations-whole-numbers',
        title: 'Operations with Whole Numbers',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=5460',
        duration: 25,
        description: 'Basic arithmetic operations with whole numbers',
        isRequired: true,
        chapterId: 'whole-numbers',
        order: 3
      }
    ]
  },
  {
    id: 'playing-with-numbers',
    title: 'Playing with Numbers',
    titleHindi: 'संख्याओं के साथ खेलना',
    description: 'Factors, multiples, prime and composite numbers',
    descriptionHindi: 'गुणनखंड, गुणज, अभाज्य और भाज्य संख्याएं',
    topics: [
      'Factors and Multiples',
      'Prime and Composite Numbers',
      'Divisibility Tests',
      'LCM and HCF',
      'Number Patterns'
    ],
    difficulty: 'intermediate',
    estimatedHours: 12,
    exercises: 25,
    icon: '🎲',
    videos: [
      {
        id: 'factors-multiples',
        title: 'Factors and Multiples',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=6960',
        duration: 28,
        description: 'Understanding factors and multiples with examples',
        isRequired: true,
        chapterId: 'playing-with-numbers',
        order: 1
      },
      {
        id: 'prime-composite',
        title: 'Prime and Composite Numbers',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=8640',
        duration: 20,
        description: 'Identifying prime and composite numbers',
        isRequired: true,
        chapterId: 'playing-with-numbers',
        order: 2
      },
      {
        id: 'divisibility-tests',
        title: 'Divisibility Tests',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=9840',
        duration: 24,
        description: 'Quick divisibility tests for 2, 3, 4, 5, 6, 9, 10',
        isRequired: true,
        chapterId: 'playing-with-numbers',
        order: 3
      }
    ]
  },
  {
    id: 'basic-geometrical-ideas',
    title: 'Basic Geometrical Ideas',
    titleHindi: 'बुनियादी ज्यामितीय विचार',
    description: 'Points, lines, angles and basic shapes',
    descriptionHindi: 'बिंदु, रेखाएं, कोण और बुनियादी आकार',
    topics: [
      'Points, Lines and Line Segments',
      'Rays and Angles',
      'Types of Angles',
      'Triangles and Quadrilaterals',
      'Circles'
    ],
    difficulty: 'beginner',
    estimatedHours: 10,
    exercises: 18,
    icon: '📐',
    videos: [
      {
        id: 'points-lines-segments',
        title: 'Points, Lines and Line Segments',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=11280',
        duration: 18,
        description: 'Fundamental concepts of points, lines and segments',
        isRequired: true,
        chapterId: 'basic-geometrical-ideas',
        order: 1
      },
      {
        id: 'rays-angles',
        title: 'Rays and Angles',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=12360',
        duration: 22,
        description: 'Understanding rays and different types of angles',
        isRequired: true,
        chapterId: 'basic-geometrical-ideas',
        order: 2
      },
      {
        id: 'basic-shapes',
        title: 'Basic Geometric Shapes',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=13560',
        duration: 20,
        description: 'Introduction to triangles, quadrilaterals and circles',
        isRequired: true,
        chapterId: 'basic-geometrical-ideas',
        order: 3
      }
    ]
  },
  {
    id: 'understanding-elementary-shapes',
    title: 'Understanding Elementary Shapes',
    titleHindi: 'प्राथमिक आकृतियों की समझ',
    description: 'Detailed study of geometric shapes and their properties',
    descriptionHindi: 'ज्यामितीय आकृतियों और उनके गुणों का विस्तृत अध्ययन',
    topics: [
      'Types of Triangles',
      'Types of Quadrilaterals',
      'Polygons',
      '3D Shapes',
      'Symmetry'
    ],
    difficulty: 'intermediate',
    estimatedHours: 12,
    exercises: 22,
    icon: '🔺',
    videos: [
      {
        id: 'triangle-types',
        title: 'Types of Triangles',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=14760',
        duration: 25,
        description: 'Classification of triangles by sides and angles',
        isRequired: true,
        chapterId: 'understanding-elementary-shapes',
        order: 1
      },
      {
        id: 'quadrilateral-types',
        title: 'Types of Quadrilaterals',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=16260',
        duration: 28,
        description: 'Understanding squares, rectangles, parallelograms',
        isRequired: true,
        chapterId: 'understanding-elementary-shapes',
        order: 2
      },
      {
        id: 'polygons-3d-shapes',
        title: 'Polygons and 3D Shapes',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=17880',
        duration: 24,
        description: 'Introduction to polygons and basic 3D shapes',
        isRequired: true,
        chapterId: 'understanding-elementary-shapes',
        order: 3
      }
    ]
  },
  {
    id: 'integers',
    title: 'Integers',
    titleHindi: 'पूर्णांक',
    description: 'Introduction to negative numbers and operations',
    descriptionHindi: 'ऋणात्मक संख्याओं और संक्रियाओं का परिचय',
    topics: [
      'Introduction to Integers',
      'Representation on Number Line',
      'Addition of Integers',
      'Subtraction of Integers',
      'Properties of Integers'
    ],
    difficulty: 'intermediate',
    estimatedHours: 10,
    exercises: 20,
    icon: '➖',
    videos: [
      {
        id: 'integers-intro',
        title: 'Introduction to Integers',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=19500',
        duration: 20,
        description: 'Understanding positive and negative numbers',
        isRequired: true,
        chapterId: 'integers',
        order: 1
      },
      {
        id: 'integers-number-line',
        title: 'Integers on Number Line',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=20700',
        duration: 18,
        description: 'Representing integers on number line',
        isRequired: true,
        chapterId: 'integers',
        order: 2
      },
      {
        id: 'integer-operations',
        title: 'Operations with Integers',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=21780',
        duration: 26,
        description: 'Adding and subtracting integers',
        isRequired: true,
        chapterId: 'integers',
        order: 3
      }
    ]
  },
  {
    id: 'fractions',
    title: 'Fractions',
    titleHindi: 'भिन्न',
    description: 'Understanding fractions and their operations',
    descriptionHindi: 'भिन्नों की समझ और उनकी संक्रियाएं',
    topics: [
      'What are Fractions',
      'Types of Fractions',
      'Equivalent Fractions',
      'Comparing Fractions',
      'Operations on Fractions'
    ],
    difficulty: 'intermediate',
    estimatedHours: 14,
    exercises: 28,
    icon: '🍰',
    videos: [
      {
        id: 'fractions-basics',
        title: 'Understanding Fractions',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=23460',
        duration: 24,
        description: 'Basic concepts of fractions and their representation',
        isRequired: true,
        chapterId: 'fractions',
        order: 1
      },
      {
        id: 'types-of-fractions',
        title: 'Types of Fractions',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=24900',
        duration: 22,
        description: 'Proper, improper, mixed fractions and their properties',
        isRequired: true,
        chapterId: 'fractions',
        order: 2
      },
      {
        id: 'equivalent-fractions',
        title: 'Equivalent Fractions',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=26220',
        duration: 20,
        description: 'Finding and comparing equivalent fractions',
        isRequired: true,
        chapterId: 'fractions',
        order: 3
      },
      {
        id: 'fraction-operations',
        title: 'Operations on Fractions',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=27420',
        duration: 28,
        description: 'Adding, subtracting, multiplying and dividing fractions',
        isRequired: true,
        chapterId: 'fractions',
        order: 4
      }
    ]
  },
  {
    id: 'decimals',
    title: 'Decimals',
    titleHindi: 'दशमलव',
    description: 'Understanding decimal numbers and operations',
    descriptionHindi: 'दशमलव संख्याओं और संक्रियाओं की समझ',
    topics: [
      'Introduction to Decimals',
      'Place Value in Decimals',
      'Comparing Decimals',
      'Addition and Subtraction of Decimals',
      'Multiplication and Division of Decimals'
    ],
    difficulty: 'intermediate',
    estimatedHours: 12,
    exercises: 24,
    icon: '🔢',
    videos: [
      {
        id: 'decimals-intro',
        title: 'Introduction to Decimals',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=29460',
        duration: 20,
        description: 'Understanding decimal system and place value',
        isRequired: true,
        chapterId: 'decimals',
        order: 1
      },
      {
        id: 'decimal-place-value',
        title: 'Place Value in Decimals',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=30660',
        duration: 18,
        description: 'Understanding tenths, hundredths, thousandths',
        isRequired: true,
        chapterId: 'decimals',
        order: 2
      },
      {
        id: 'comparing-decimals',
        title: 'Comparing Decimals',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=31740',
        duration: 16,
        description: 'How to compare decimal numbers',
        isRequired: true,
        chapterId: 'decimals',
        order: 3
      },
      {
        id: 'decimal-operations',
        title: 'Operations with Decimals',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=32700',
        duration: 30,
        description: 'Adding, subtracting, multiplying and dividing decimals',
        isRequired: true,
        chapterId: 'decimals',
        order: 4
      }
    ]
  },
  {
    id: 'data-handling',
    title: 'Data Handling',
    titleHindi: 'आंकड़ों का प्रबंधन',
    description: 'Collection, organization and representation of data',
    descriptionHindi: 'आंकड़ों का संग्रह, संगठन और निरूपण',
    topics: [
      'What is Data',
      'Collection of Data',
      'Organization of Data',
      'Pictographs',
      'Bar Graphs'
    ],
    difficulty: 'beginner',
    estimatedHours: 8,
    exercises: 16,
    icon: '📊',
    videos: [
      {
        id: 'data-intro',
        title: 'Introduction to Data',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=34800',
        duration: 18,
        description: 'Understanding what is data and its importance',
        isRequired: true,
        chapterId: 'data-handling',
        order: 1
      },
      {
        id: 'data-collection',
        title: 'Collection and Organization of Data',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=35880',
        duration: 20,
        description: 'Methods of collecting and organizing data',
        isRequired: true,
        chapterId: 'data-handling',
        order: 2
      },
      {
        id: 'pictographs-bar-graphs',
        title: 'Pictographs and Bar Graphs',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=37080',
        duration: 24,
        description: 'Representing data using pictographs and bar graphs',
        isRequired: true,
        chapterId: 'data-handling',
        order: 3
      }
    ]
  },
  {
    id: 'mensuration',
    title: 'Mensuration',
    titleHindi: 'क्षेत्रमिति',
    description: 'Perimeter and area of simple geometric figures',
    descriptionHindi: 'सरल ज्यामितीय आकृतियों का परिमाप और क्षेत्रफल',
    topics: [
      'Perimeter',
      'Area of Rectangle',
      'Area of Square',
      'Area of Triangle',
      'Area of Circle'
    ],
    difficulty: 'intermediate',
    estimatedHours: 10,
    exercises: 20,
    icon: '📏',
    videos: [
      {
        id: 'perimeter-basics',
        title: 'Understanding Perimeter',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=39360',
        duration: 16,
        description: 'Concept of perimeter and its calculation',
        isRequired: true,
        chapterId: 'mensuration',
        order: 1
      },
      {
        id: 'area-rectangle-square',
        title: 'Area of Rectangle and Square',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=40320',
        duration: 22,
        description: 'Calculating area of rectangles and squares',
        isRequired: true,
        chapterId: 'mensuration',
        order: 2
      },
      {
        id: 'area-triangle-circle',
        title: 'Area of Triangle and Circle',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=41520',
        duration: 26,
        description: 'Understanding area formulas for triangle and circle',
        isRequired: true,
        chapterId: 'mensuration',
        order: 3
      }
    ]
  },
  {
    id: 'algebra',
    title: 'Algebra',
    titleHindi: 'बीजगणित',
    description: 'Introduction to variables, expressions and equations',
    descriptionHindi: 'चर, व्यंजक और समीकरणों का परिचय',
    topics: [
      'Introduction to Variables',
      'Algebraic Expressions',
      'Simple Equations',
      'Solving Equations',
      'Word Problems'
    ],
    difficulty: 'advanced',
    estimatedHours: 12,
    exercises: 25,
    icon: '🔤',
    videos: [
      {
        id: 'variables-intro',
        title: 'Introduction to Variables',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=43680',
        duration: 20,
        description: 'Understanding variables and constants in algebra',
        isRequired: true,
        chapterId: 'algebra',
        order: 1
      },
      {
        id: 'algebraic-expressions',
        title: 'Algebraic Expressions',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=44880',
        duration: 24,
        description: 'Forming and simplifying algebraic expressions',
        isRequired: true,
        chapterId: 'algebra',
        order: 2
      },
      {
        id: 'simple-equations',
        title: 'Simple Equations',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=46200',
        duration: 28,
        description: 'Solving simple linear equations',
        isRequired: true,
        chapterId: 'algebra',
        order: 3
      }
    ]
  },
  {
    id: 'ratio-proportion',
    title: 'Ratio and Proportion',
    titleHindi: 'अनुपात और समानुपात',
    description: 'Understanding ratios, proportions and unitary method',
    descriptionHindi: 'अनुपात, समानुपात और एकिक नियम की समझ',
    topics: [
      'Understanding Ratio',
      'Equivalent Ratios',
      'Proportion',
      'Unitary Method',
      'Applications'
    ],
    difficulty: 'intermediate',
    estimatedHours: 10,
    exercises: 20,
    icon: '⚖️',
    videos: [
      {
        id: 'ratio-basics',
        title: 'Understanding Ratio',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=48480',
        duration: 22,
        description: 'Basic concepts of ratio and its applications',
        isRequired: true,
        chapterId: 'ratio-proportion',
        order: 1
      },
      {
        id: 'equivalent-ratios',
        title: 'Equivalent Ratios',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=49800',
        duration: 18,
        description: 'Finding and working with equivalent ratios',
        isRequired: true,
        chapterId: 'ratio-proportion',
        order: 2
      },
      {
        id: 'proportion-unitary-method',
        title: 'Proportion and Unitary Method',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=50880',
        duration: 26,
        description: 'Understanding proportion and solving problems using unitary method',
        isRequired: true,
        chapterId: 'ratio-proportion',
        order: 3
      }
    ]
  },
  {
    id: 'symmetry',
    title: 'Symmetry',
    titleHindi: 'सममिति',
    description: 'Understanding line symmetry and rotational symmetry',
    descriptionHindi: 'रेखीय सममिति और घूर्णी सममिति की समझ',
    topics: [
      'Line Symmetry',
      'Lines of Symmetry',
      'Rotational Symmetry',
      'Order of Rotation',
      'Applications'
    ],
    difficulty: 'beginner',
    estimatedHours: 8,
    exercises: 15,
    icon: '🦋',
    videos: [
      {
        id: 'line-symmetry',
        title: 'Line Symmetry',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=53100',
        duration: 20,
        description: 'Understanding line symmetry and lines of symmetry',
        isRequired: true,
        chapterId: 'symmetry',
        order: 1
      },
      {
        id: 'rotational-symmetry',
        title: 'Rotational Symmetry',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=54300',
        duration: 22,
        description: 'Understanding rotational symmetry and order of rotation',
        isRequired: true,
        chapterId: 'symmetry',
        order: 2
      }
    ]
  },
  {
    id: 'practical-geometry',
    title: 'Practical Geometry',
    titleHindi: 'व्यावहारिक ज्यामिति',
    description: 'Construction of basic geometric figures using compass and ruler',
    descriptionHindi: 'कम्पास और रूलर का उपयोग करके बुनियादी ज्यामितीय आकृतियों का निर्माण',
    topics: [
      'Construction Tools',
      'Construction of Line Segments',
      'Construction of Angles',
      'Construction of Triangles',
      'Construction of Circles'
    ],
    difficulty: 'intermediate',
    estimatedHours: 12,
    exercises: 18,
    icon: '🔧',
    videos: [
      {
        id: 'construction-tools',
        title: 'Construction Tools and Basics',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=56400',
        duration: 18,
        description: 'Introduction to compass, ruler and protractor',
        isRequired: true,
        chapterId: 'practical-geometry',
        order: 1
      },
      {
        id: 'construction-line-segments',
        title: 'Construction of Line Segments',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=57480',
        duration: 16,
        description: 'Constructing line segments of given lengths',
        isRequired: true,
        chapterId: 'practical-geometry',
        order: 2
      },
      {
        id: 'construction-angles',
        title: 'Construction of Angles',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=58560',
        duration: 24,
        description: 'Constructing angles of given measures',
        isRequired: true,
        chapterId: 'practical-geometry',
        order: 3
      },
      {
        id: 'construction-triangles',
        title: 'Construction of Triangles',
        url: 'https://www.youtube.com/live/hgUPZ7eWnvw?si=-SUtlyky8_yFWiwK&t=60000',
        duration: 28,
        description: 'Constructing triangles with given conditions',
        isRequired: true,
        chapterId: 'practical-geometry',
        order: 4
      }
    ]
  }
];

// Helper functions
export const getChapterById = (chapterId: string): MathChapter | undefined => {
  return class6MathChapters.find(chapter => chapter.id === chapterId);
};

export const getVideosByChapter = (chapterId: string): YouTubeVideo[] => {
  const chapter = getChapterById(chapterId);
  return chapter ? chapter.videos : [];
};

export const getAllVideos = (): YouTubeVideo[] => {
  return class6MathChapters.flatMap(chapter => chapter.videos);
};

export const getTotalDuration = (): number => {
  return class6MathChapters.reduce((total, chapter) => {
    return total + chapter.videos.reduce((chapterTotal, video) => chapterTotal + video.duration, 0);
  }, 0);
};

export const getTotalExercises = (): number => {
  return class6MathChapters.reduce((total, chapter) => total + chapter.exercises, 0);
};

// Chapter statistics
export const class6MathStats = {
  totalChapters: class6MathChapters.length,
  totalVideos: getAllVideos().length,
  totalDuration: getTotalDuration(),
  totalExercises: getTotalExercises(),
  estimatedHours: class6MathChapters.reduce((total, chapter) => total + chapter.estimatedHours, 0),
  difficultyDistribution: {
    beginner: class6MathChapters.filter(c => c.difficulty === 'beginner').length,
    intermediate: class6MathChapters.filter(c => c.difficulty === 'intermediate').length,
    advanced: class6MathChapters.filter(c => c.difficulty === 'advanced').length
  }
};
