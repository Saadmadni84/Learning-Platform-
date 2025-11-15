// Class 6 Science Chapter Structure with YouTube Video Integration
// Based on NCERT/UP Board syllabus

export interface ScienceChapter {
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

// Class 6 Science Chapters with YouTube Video Integration
export const class6ScienceChapters: ScienceChapter[] = [
  {
    id: 'food-where-does-it-come-from',
    title: 'Food: Where Does It Come From?',
    titleHindi: 'भोजन: यह कहाँ से आता है?',
    description: 'Learn about different sources of food - plants and animals',
    descriptionHindi: 'भोजन के विभिन्न स्रोतों के बारे में सीखें - पौधे और जानवर',
    topics: [
      'Sources of Food',
      'Plant Parts as Food',
      'Animal Products as Food',
      'Food Habits',
      'Nutritional Value'
    ],
    difficulty: 'beginner',
    estimatedHours: 6,
    exercises: 12,
    icon: '🌱',
    videos: [
      {
        id: 'food-sources-intro',
        title: 'Food: Where Does It Come From? - Complete Chapter',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 25,
        description: 'Complete chapter covering all sources of food, plant parts as food, and animal products',
        isRequired: true,
        chapterId: 'food-where-does-it-come-from',
        order: 1
      }
    ]
  },
  {
    id: 'components-of-food',
    title: 'Components of Food',
    titleHindi: 'भोजन के घटक',
    description: 'Understanding nutrients and their importance in our diet',
    descriptionHindi: 'पोषक तत्वों और हमारे आहार में उनके महत्व की समझ',
    topics: [
      'Nutrients and their Types',
      'Carbohydrates',
      'Proteins',
      'Fats and Oils',
      'Vitamins and Minerals',
      'Balanced Diet'
    ],
    difficulty: 'beginner',
    estimatedHours: 8,
    exercises: 15,
    icon: '🥗',
    videos: [
      {
        id: 'nutrients-basics',
        title: 'Introduction to Nutrients',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 20,
        description: 'Basic understanding of different nutrients and their functions',
        isRequired: true,
        chapterId: 'components-of-food',
        order: 1
      },
      {
        id: 'balanced-diet',
        title: 'Balanced Diet and Nutrition',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 18,
        description: 'Understanding what makes a balanced diet',
        isRequired: true,
        chapterId: 'components-of-food',
        order: 2
      }
    ]
  },
  {
    id: 'fibre-to-fabric',
    title: 'Fibre to Fabric',
    titleHindi: 'तंतु से वस्त्र तक',
    description: 'Journey from natural fibres to finished fabrics',
    descriptionHindi: 'प्राकृतिक तंतुओं से तैयार वस्त्रों तक की यात्रा',
    topics: [
      'Natural Fibres',
      'Plant Fibres - Cotton and Jute',
      'Animal Fibres - Wool and Silk',
      'Processing Fibres',
      'Making Fabric'
    ],
    difficulty: 'beginner',
    estimatedHours: 6,
    exercises: 10,
    icon: '🧵',
    videos: [
      {
        id: 'natural-fibres',
        title: 'Natural Fibres - Cotton and Jute',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 22,
        description: 'Understanding plant fibres and their properties',
        isRequired: true,
        chapterId: 'fibre-to-fabric',
        order: 1
      },
      {
        id: 'animal-fibres',
        title: 'Animal Fibres - Wool and Silk',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 20,
        description: 'Learning about wool and silk production',
        isRequired: true,
        chapterId: 'fibre-to-fabric',
        order: 2
      }
    ]
  },
  {
    id: 'sorting-materials',
    title: 'Sorting Materials into Groups',
    titleHindi: 'सामग्री को समूहों में छाँटना',
    description: 'Classifying materials based on their properties',
    descriptionHindi: 'सामग्रियों के गुणों के आधार पर उनका वर्गीकरण',
    topics: [
      'Properties of Materials',
      'Appearance and Texture',
      'Hardness and Softness',
      'Solubility',
      'Transparency',
      'Conductivity'
    ],
    difficulty: 'beginner',
    estimatedHours: 6,
    exercises: 12,
    icon: '🔬',
    videos: [
      {
        id: 'material-properties',
        title: 'Properties of Materials',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 24,
        description: 'Understanding different properties used to classify materials',
        isRequired: true,
        chapterId: 'sorting-materials',
        order: 1
      },
      {
        id: 'material-classification',
        title: 'Classifying Materials',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 18,
        description: 'How to sort and group materials based on their properties',
        isRequired: true,
        chapterId: 'sorting-materials',
        order: 2
      }
    ]
  },
  {
    id: 'separation-of-substances',
    title: 'Separation of Substances',
    titleHindi: 'पदार्थों का पृथक्करण',
    description: 'Methods to separate different substances from mixtures',
    descriptionHindi: 'मिश्रणों से विभिन्न पदार्थों को अलग करने की विधियाँ',
    topics: [
      'Why Do We Need to Separate Substances?',
      'Methods of Separation',
      'Hand Picking',
      'Threshing',
      'Winnowing',
      'Sieving',
      'Sedimentation and Decantation',
      'Filtration',
      'Evaporation',
      'Distillation'
    ],
    difficulty: 'intermediate',
    estimatedHours: 8,
    exercises: 16,
    icon: '⚗️',
    videos: [
      {
        id: 'separation-methods',
        title: 'Methods of Separation',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 26,
        description: 'Various methods used to separate substances from mixtures',
        isRequired: true,
        chapterId: 'separation-of-substances',
        order: 1
      },
      {
        id: 'filtration-evaporation',
        title: 'Filtration and Evaporation',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 22,
        description: 'Advanced separation techniques using filtration and evaporation',
        isRequired: true,
        chapterId: 'separation-of-substances',
        order: 2
      }
    ]
  },
  {
    id: 'changes-around-us',
    title: 'Changes Around Us',
    titleHindi: 'हमारे आस-पास के परिवर्तन',
    description: 'Understanding different types of changes in our surroundings',
    descriptionHindi: 'हमारे आस-पास होने वाले विभिन्न प्रकार के परिवर्तनों को समझना',
    topics: [
      'Types of Changes',
      'Reversible Changes',
      'Irreversible Changes',
      'Physical Changes',
      'Chemical Changes',
      'Examples of Changes'
    ],
    difficulty: 'intermediate',
    estimatedHours: 6,
    exercises: 14,
    icon: '🔄',
    videos: [
      {
        id: 'types-of-changes',
        title: 'Types of Changes Around Us',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 28,
        description: 'Understanding reversible and irreversible changes',
        isRequired: true,
        chapterId: 'changes-around-us',
        order: 1
      },
      {
        id: 'physical-chemical-changes',
        title: 'Physical vs Chemical Changes',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 24,
        description: 'Difference between physical and chemical changes',
        isRequired: true,
        chapterId: 'changes-around-us',
        order: 2
      }
    ]
  },
  {
    id: 'getting-to-know-plants',
    title: 'Getting to Know Plants',
    titleHindi: 'पौधों को जानिए',
    description: 'Exploring the world of plants and their parts',
    descriptionHindi: 'पौधों की दुनिया और उनके भागों का अन्वेषण',
    topics: [
      'Parts of Plants',
      'Roots',
      'Stems',
      'Leaves',
      'Flowers',
      'Fruits and Seeds',
      'Types of Plants',
      'Photosynthesis'
    ],
    difficulty: 'beginner',
    estimatedHours: 8,
    exercises: 18,
    icon: '🌿',
    videos: [
      {
        id: 'plant-parts',
        title: 'Parts of Plants',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 30,
        description: 'Understanding different parts of plants and their functions',
        isRequired: true,
        chapterId: 'getting-to-know-plants',
        order: 1
      },
      {
        id: 'plant-types',
        title: 'Types of Plants',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 25,
        description: 'Classification of plants based on different criteria',
        isRequired: true,
        chapterId: 'getting-to-know-plants',
        order: 2
      }
    ]
  },
  {
    id: 'body-movements',
    title: 'Body Movements',
    titleHindi: 'शरीर की गतियाँ',
    description: 'Understanding how different animals move',
    descriptionHindi: 'विभिन्न जानवरों की गति को समझना',
    topics: [
      'Human Body Movements',
      'Joints and Bones',
      'Muscles',
      'Movement in Animals',
      'Movement in Birds',
      'Movement in Fish',
      'Movement in Snakes'
    ],
    difficulty: 'beginner',
    estimatedHours: 6,
    exercises: 12,
    icon: '🏃‍♂️',
    videos: [
      {
        id: 'human-movements',
        title: 'Human Body Movements',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 26,
        description: 'Understanding joints, bones, and muscles in human body',
        isRequired: true,
        chapterId: 'body-movements',
        order: 1
      },
      {
        id: 'animal-movements',
        title: 'Movement in Different Animals',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 24,
        description: 'How different animals move in their environment',
        isRequired: true,
        chapterId: 'body-movements',
        order: 2
      }
    ]
  },
  {
    id: 'living-organisms',
    title: 'The Living Organisms and Their Surroundings',
    titleHindi: 'सजीव एवं उनका परिवेश',
    description: 'Understanding living organisms and their environment',
    descriptionHindi: 'सजीवों और उनके पर्यावरण को समझना',
    topics: [
      'Characteristics of Living Things',
      'Habitat',
      'Adaptation',
      'Aquatic Habitat',
      'Terrestrial Habitat',
      'Adaptations in Animals',
      'Adaptations in Plants'
    ],
    difficulty: 'intermediate',
    estimatedHours: 8,
    exercises: 16,
    icon: '🌍',
    videos: [
      {
        id: 'living-characteristics',
        title: 'Characteristics of Living Things',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 28,
        description: 'Understanding what makes something living',
        isRequired: true,
        chapterId: 'living-organisms',
        order: 1
      },
      {
        id: 'habitat-adaptation',
        title: 'Habitat and Adaptation',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 30,
        description: 'How organisms adapt to their surroundings',
        isRequired: true,
        chapterId: 'living-organisms',
        order: 2
      }
    ]
  },
  {
    id: 'motion-and-measurement',
    title: 'Motion and Measurement of Distances',
    titleHindi: 'गति एवं दूरियों का मापन',
    description: 'Understanding motion and how to measure distances',
    descriptionHindi: 'गति को समझना और दूरियों को मापने की विधियाँ',
    topics: [
      'Types of Motion',
      'Rectilinear Motion',
      'Circular Motion',
      'Periodic Motion',
      'Measurement of Length',
      'Units of Measurement',
      'Measuring Instruments'
    ],
    difficulty: 'intermediate',
    estimatedHours: 6,
    exercises: 14,
    icon: '📏',
    videos: [
      {
        id: 'types-of-motion',
        title: 'Types of Motion',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 26,
        description: 'Understanding different types of motion around us',
        isRequired: true,
        chapterId: 'motion-and-measurement',
        order: 1
      },
      {
        id: 'measurement-distance',
        title: 'Measurement of Distances',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 24,
        description: 'How to measure distances and use measuring instruments',
        isRequired: true,
        chapterId: 'motion-and-measurement',
        order: 2
      }
    ]
  },
  {
    id: 'light-shadows-reflection',
    title: 'Light, Shadows and Reflections',
    titleHindi: 'प्रकाश, छायाएँ एवं परावर्तन',
    description: 'Understanding light, how shadows are formed, and reflection',
    descriptionHindi: 'प्रकाश को समझना, छायाओं का निर्माण और परावर्तन',
    topics: [
      'Sources of Light',
      'Transparent, Translucent and Opaque Objects',
      'Shadows',
      'Pinhole Camera',
      'Mirrors and Reflections',
      'Lateral Inversion'
    ],
    difficulty: 'intermediate',
    estimatedHours: 8,
    exercises: 16,
    icon: '💡',
    videos: [
      {
        id: 'light-sources',
        title: 'Sources of Light and Properties',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 28,
        description: 'Understanding different sources of light and their properties',
        isRequired: true,
        chapterId: 'light-shadows-reflection',
        order: 1
      },
      {
        id: 'shadows-reflection',
        title: 'Shadows and Reflections',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 26,
        description: 'How shadows are formed and understanding reflections',
        isRequired: true,
        chapterId: 'light-shadows-reflection',
        order: 2
      }
    ]
  },
  {
    id: 'electricity-circuits',
    title: 'Electricity and Circuits',
    titleHindi: 'विद्युत तथा परिपथ',
    description: 'Basic concepts of electricity and electrical circuits',
    descriptionHindi: 'विद्युत और विद्युत परिपथ की मूल अवधारणाएँ',
    topics: [
      'Electric Cell',
      'Electric Bulb',
      'Electric Circuit',
      'Conductors and Insulators',
      'Switch',
      'Electric Current',
      'Safety Measures'
    ],
    difficulty: 'advanced',
    estimatedHours: 8,
    exercises: 18,
    icon: '⚡',
    videos: [
      {
        id: 'electric-basics',
        title: 'Electricity Basics',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 30,
        description: 'Basic concepts of electricity and electrical components',
        isRequired: true,
        chapterId: 'electricity-circuits',
        order: 1
      },
      {
        id: 'electric-circuits',
        title: 'Electric Circuits and Safety',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 28,
        description: 'Understanding circuits and electrical safety measures',
        isRequired: true,
        chapterId: 'electricity-circuits',
        order: 2
      }
    ]
  },
  {
    id: 'fun-with-magnets',
    title: 'Fun with Magnets',
    titleHindi: 'चुंबकों द्वारा मनोरंजन',
    description: 'Understanding magnets and their properties',
    descriptionHindi: 'चुंबकों और उनके गुणों को समझना',
    topics: [
      'What are Magnets?',
      'Types of Magnets',
      'Properties of Magnets',
      'Magnetic and Non-magnetic Materials',
      'Poles of a Magnet',
      'Making a Magnet',
      'Uses of Magnets'
    ],
    difficulty: 'beginner',
    estimatedHours: 6,
    exercises: 12,
    icon: '🧲',
    videos: [
      {
        id: 'magnet-properties',
        title: 'Properties of Magnets',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 26,
        description: 'Understanding what magnets are and their properties',
        isRequired: true,
        chapterId: 'fun-with-magnets',
        order: 1
      },
      {
        id: 'magnet-uses',
        title: 'Uses of Magnets',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 24,
        description: 'How magnets are used in daily life and technology',
        isRequired: true,
        chapterId: 'fun-with-magnets',
        order: 2
      }
    ]
  },
  {
    id: 'water',
    title: 'Water',
    titleHindi: 'जल',
    description: 'Understanding the importance of water and water cycle',
    descriptionHindi: 'जल के महत्व और जल चक्र को समझना',
    topics: [
      'Sources of Water',
      'Water Cycle',
      'Evaporation',
      'Condensation',
      'Precipitation',
      'Water Conservation',
      'Rainwater Harvesting'
    ],
    difficulty: 'beginner',
    estimatedHours: 6,
    exercises: 14,
    icon: '💧',
    videos: [
      {
        id: 'water-cycle',
        title: 'Water Cycle',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 28,
        description: 'Understanding the continuous water cycle in nature',
        isRequired: true,
        chapterId: 'water',
        order: 1
      },
      {
        id: 'water-conservation',
        title: 'Water Conservation',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 24,
        description: 'Importance of water conservation and rainwater harvesting',
        isRequired: true,
        chapterId: 'water',
        order: 2
      }
    ]
  },
  {
    id: 'air-around-us',
    title: 'Air Around Us',
    titleHindi: 'हमारे चारों ओर वायु',
    description: 'Understanding air and its importance for life',
    descriptionHindi: 'वायु और जीवन के लिए इसके महत्व को समझना',
    topics: [
      'Composition of Air',
      'Oxygen in Air',
      'Nitrogen in Air',
      'Carbon Dioxide in Air',
      'Water Vapour in Air',
      'Importance of Air',
      'Air Pollution'
    ],
    difficulty: 'beginner',
    estimatedHours: 6,
    exercises: 12,
    icon: '🌬️',
    videos: [
      {
        id: 'air-composition',
        title: 'Composition of Air',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 26,
        description: 'Understanding the different components of air',
        isRequired: true,
        chapterId: 'air-around-us',
        order: 1
      },
      {
        id: 'air-importance',
        title: 'Importance of Air',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 22,
        description: 'Why air is important for life and effects of air pollution',
        isRequired: true,
        chapterId: 'air-around-us',
        order: 2
      }
    ]
  },
  {
    id: 'garbage-in-garbage-out',
    title: 'Garbage In, Garbage Out',
    titleHindi: 'कचरा-संग्रहण एवं निपटान',
    description: 'Understanding waste management and environmental protection',
    descriptionHindi: 'कचरा प्रबंधन और पर्यावरण संरक्षण को समझना',
    topics: [
      'Types of Waste',
      'Biodegradable and Non-biodegradable Waste',
      'Waste Management',
      'Composting',
      'Recycling',
      'Effects of Waste on Environment',
      '3Rs - Reduce, Reuse, Recycle'
    ],
    difficulty: 'beginner',
    estimatedHours: 6,
    exercises: 12,
    icon: '♻️',
    videos: [
      {
        id: 'waste-types',
        title: 'Types of Waste',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 24,
        description: 'Understanding different types of waste and their classification',
        isRequired: true,
        chapterId: 'garbage-in-garbage-out',
        order: 1
      },
      {
        id: 'waste-management',
        title: 'Waste Management and 3Rs',
        url: 'https://youtu.be/5tdqsng76Fo?si=pwJB_nPdb-6vOitT',
        duration: 26,
        description: 'Proper waste management and the concept of Reduce, Reuse, Recycle',
        isRequired: true,
        chapterId: 'garbage-in-garbage-out',
        order: 2
      }
    ]
  }
];

// Helper functions
export const getScienceChapterById = (chapterId: string): ScienceChapter | undefined => {
  return class6ScienceChapters.find(chapter => chapter.id === chapterId);
};

export const getScienceVideosByChapter = (chapterId: string): YouTubeVideo[] => {
  const chapter = getScienceChapterById(chapterId);
  return chapter ? chapter.videos : [];
};

export const getAllScienceVideos = (): YouTubeVideo[] => {
  return class6ScienceChapters.flatMap(chapter => chapter.videos);
};

export const getTotalScienceDuration = (): number => {
  return class6ScienceChapters.reduce((total, chapter) => {
    return total + chapter.videos.reduce((chapterTotal, video) => chapterTotal + video.duration, 0);
  }, 0);
};

export const getTotalScienceExercises = (): number => {
  return class6ScienceChapters.reduce((total, chapter) => total + chapter.exercises, 0);
};

// Chapter statistics
export const class6ScienceStats = {
  totalChapters: class6ScienceChapters.length,
  totalVideos: getAllScienceVideos().length,
  totalDuration: getTotalScienceDuration(),
  totalExercises: getTotalScienceExercises(),
  estimatedHours: class6ScienceChapters.reduce((total, chapter) => total + chapter.estimatedHours, 0),
  difficultyDistribution: {
    beginner: class6ScienceChapters.filter(c => c.difficulty === 'beginner').length,
    intermediate: class6ScienceChapters.filter(c => c.difficulty === 'intermediate').length,
    advanced: class6ScienceChapters.filter(c => c.difficulty === 'advanced').length
  }
};
