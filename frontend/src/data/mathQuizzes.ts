// Math Quiz Data for Classes 6-12
export interface MathQuestion {
  id: string;
  question: string;
  options: (number | string)[];
  answer: number | string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MathQuiz {
  class: number;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  questions: MathQuestion[];
}

// Class 6 Math Quiz - Basic Arithmetic
export const class6Quiz: MathQuiz = {
  class: 6,
  title: "Class 6 Mathematics - Basic Operations",
  description: "Test your basic arithmetic skills with addition, subtraction, multiplication, and division",
  timeLimit: 300, // 5 minutes
  questions: [
    {
      id: "6-1",
      question: "What is 45 + 37?",
      options: [82, 72, 92, 102],
      answer: 82,
      explanation: "45 + 37 = 82",
      difficulty: "easy"
    },
    {
      id: "6-2",
      question: "What is 156 - 89?",
      options: [67, 77, 57, 87],
      answer: 67,
      explanation: "156 - 89 = 67",
      difficulty: "easy"
    },
    {
      id: "6-3",
      question: "What is 12 × 8?",
      options: [96, 86, 106, 76],
      answer: 96,
      explanation: "12 × 8 = 96",
      difficulty: "medium"
    },
    {
      id: "6-4",
      question: "What is 144 ÷ 12?",
      options: [12, 11, 13, 14],
      answer: 12,
      explanation: "144 ÷ 12 = 12",
      difficulty: "medium"
    },
    {
      id: "6-5",
      question: "What is 25% of 80?",
      options: [20, 25, 30, 35],
      answer: 20,
      explanation: "25% of 80 = 0.25 × 80 = 20",
      difficulty: "hard"
    }
  ]
};

// Class 7 Math Quiz - Fractions and Decimals
export const class7Quiz: MathQuiz = {
  class: 7,
  title: "Class 7 Mathematics - Fractions & Decimals",
  description: "Master fractions, decimals, and basic algebra concepts",
  timeLimit: 360, // 6 minutes
  questions: [
    {
      id: "7-1",
      question: "What is 3/4 + 1/2?",
      options: [5/4, 4/6, 3/6, 2/4],
      answer: 5/4,
      explanation: "3/4 + 1/2 = 3/4 + 2/4 = 5/4",
      difficulty: "easy"
    },
    {
      id: "7-2",
      question: "What is 0.75 × 8?",
      options: [6, 5.5, 6.5, 7],
      answer: 6,
      explanation: "0.75 × 8 = 6",
      difficulty: "medium"
    },
    {
      id: "7-3",
      question: "What is 2/3 of 90?",
      options: [60, 50, 70, 80],
      answer: 60,
      explanation: "2/3 of 90 = (2/3) × 90 = 60",
      difficulty: "medium"
    },
    {
      id: "7-4",
      question: "What is 15% of 200?",
      options: [30, 25, 35, 40],
      answer: 30,
      explanation: "15% of 200 = 0.15 × 200 = 30",
      difficulty: "hard"
    },
    {
      id: "7-5",
      question: "If x + 5 = 12, what is x?",
      options: [7, 6, 8, 9],
      answer: 7,
      explanation: "x + 5 = 12, so x = 12 - 5 = 7",
      difficulty: "hard"
    }
  ]
};

// Class 8 Math Quiz - Algebra and Geometry
export const class8Quiz: MathQuiz = {
  class: 8,
  title: "Class 8 Mathematics - Algebra & Geometry",
  description: "Explore algebraic expressions, equations, and basic geometry",
  timeLimit: 420, // 7 minutes
  questions: [
    {
      id: "8-1",
      question: "What is 2x + 3x when x = 4?",
      options: [20, 24, 28, 32],
      answer: 20,
      explanation: "2x + 3x = 5x = 5 × 4 = 20",
      difficulty: "easy"
    },
    {
      id: "8-2",
      question: "What is the area of a rectangle with length 8 cm and width 5 cm?",
      options: [40, 35, 45, 50],
      answer: 40,
      explanation: "Area = length × width = 8 × 5 = 40 cm²",
      difficulty: "medium"
    },
    {
      id: "8-3",
      question: "What is 3² + 4²?",
      options: [25, 24, 26, 27],
      answer: 25,
      explanation: "3² + 4² = 9 + 16 = 25",
      difficulty: "medium"
    },
    {
      id: "8-4",
      question: "What is the value of x in 2x - 7 = 11?",
      options: [9, 8, 10, 11],
      answer: 9,
      explanation: "2x - 7 = 11, so 2x = 18, therefore x = 9",
      difficulty: "hard"
    },
    {
      id: "8-5",
      question: "What is the perimeter of a square with side 6 cm?",
      options: [24, 20, 28, 32],
      answer: 24,
      explanation: "Perimeter = 4 × side = 4 × 6 = 24 cm",
      difficulty: "hard"
    }
  ]
};

// Class 9 Math Quiz - Advanced Algebra
export const class9Quiz: MathQuiz = {
  class: 9,
  title: "Class 9 Mathematics - Advanced Algebra",
  description: "Quadratic equations, polynomials, and coordinate geometry",
  timeLimit: 480, // 8 minutes
  questions: [
    {
      id: "9-1",
      question: "What is (x + 3)(x - 2)?",
      options: ["x² + x - 6", "x² - x - 6", "x² + 5x - 6", "x² - 5x - 6"],
      answer: "x² + x - 6",
      explanation: "(x + 3)(x - 2) = x² - 2x + 3x - 6 = x² + x - 6",
      difficulty: "medium"
    },
    {
      id: "9-2",
      question: "What is the slope of the line passing through (2, 3) and (4, 7)?",
      options: [2, 1, 3, 4],
      answer: 2,
      explanation: "Slope = (7-3)/(4-2) = 4/2 = 2",
      difficulty: "hard"
    },
    {
      id: "9-3",
      question: "What is √144?",
      options: [12, 11, 13, 14],
      answer: 12,
      explanation: "√144 = 12 (since 12² = 144)",
      difficulty: "easy"
    },
    {
      id: "9-4",
      question: "What is the discriminant of x² - 5x + 6 = 0?",
      options: [1, -1, 0, 25],
      answer: 1,
      explanation: "Discriminant = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1",
      difficulty: "hard"
    },
    {
      id: "9-5",
      question: "What is the distance between (0, 0) and (3, 4)?",
      options: [5, 4, 6, 7],
      answer: 5,
      explanation: "Distance = √(3² + 4²) = √(9 + 16) = √25 = 5",
      difficulty: "hard"
    }
  ]
};

// Class 10 Math Quiz - Trigonometry and Statistics
export const class10Quiz: MathQuiz = {
  class: 10,
  title: "Class 10 Mathematics - Trigonometry & Statistics",
  description: "Trigonometric ratios, statistics, and probability",
  timeLimit: 540, // 9 minutes
  questions: [
    {
      id: "10-1",
      question: "What is sin 30°?",
      options: [0.5, 0.866, 0.707, 1],
      answer: 0.5,
      explanation: "sin 30° = 1/2 = 0.5",
      difficulty: "easy"
    },
    {
      id: "10-2",
      question: "What is the mean of 2, 4, 6, 8, 10?",
      options: [6, 5, 7, 8],
      answer: 6,
      explanation: "Mean = (2+4+6+8+10)/5 = 30/5 = 6",
      difficulty: "medium"
    },
    {
      id: "10-3",
      question: "What is cos 60°?",
      options: [0.5, 0.866, 0.707, 1],
      answer: 0.5,
      explanation: "cos 60° = 1/2 = 0.5",
      difficulty: "medium"
    },
    {
      id: "10-4",
      question: "What is the mode of 1, 2, 2, 3, 3, 3, 4?",
      options: [3, 2, 4, 1],
      answer: 3,
      explanation: "Mode is the most frequent value, which is 3",
      difficulty: "easy"
    },
    {
      id: "10-5",
      question: "What is tan 45°?",
      options: [1, 0, 0.707, 0.866],
      answer: 1,
      explanation: "tan 45° = 1",
      difficulty: "medium"
    }
  ]
};

// Class 11 Math Quiz - Calculus and Advanced Topics
export const class11Quiz: MathQuiz = {
  class: 11,
  title: "Class 11 Mathematics - Calculus & Advanced Topics",
  description: "Limits, derivatives, and advanced mathematical concepts",
  timeLimit: 600, // 10 minutes
  questions: [
    {
      id: "11-1",
      question: "What is the derivative of x²?",
      options: ["2x", "x", "2", "x²"],
      answer: "2x",
      explanation: "d/dx(x²) = 2x",
      difficulty: "medium"
    },
    {
      id: "11-2",
      question: "What is lim(x→0) sin(x)/x?",
      options: [1, 0, -1, "undefined"],
      answer: 1,
      explanation: "This is a fundamental limit: lim(x→0) sin(x)/x = 1",
      difficulty: "hard"
    },
    {
      id: "11-3",
      question: "What is the derivative of 3x³ + 2x² - 5x + 1?",
      options: ["9x² + 4x - 5", "9x² + 4x + 5", "9x² - 4x - 5", "9x² - 4x + 5"],
      answer: "9x² + 4x - 5",
      explanation: "d/dx(3x³ + 2x² - 5x + 1) = 9x² + 4x - 5",
      difficulty: "hard"
    },
    {
      id: "11-4",
      question: "What is ∫(2x + 3)dx?",
      options: ["x² + 3x + C", "2x² + 3x + C", "x² + 3x", "2x² + 3x"],
      answer: "x² + 3x + C",
      explanation: "∫(2x + 3)dx = x² + 3x + C",
      difficulty: "hard"
    },
    {
      id: "11-5",
      question: "What is the value of e⁰?",
      options: [1, 0, Math.E, "undefined"],
      answer: 1,
      explanation: "Any number raised to the power of 0 equals 1",
      difficulty: "easy"
    }
  ]
};

// Class 12 Math Quiz - Advanced Calculus and Vectors
export const class12Quiz: MathQuiz = {
  class: 12,
  title: "Class 12 Mathematics - Advanced Calculus & Vectors",
  description: "Integration, vectors, and complex mathematical problems",
  timeLimit: 720, // 12 minutes
  questions: [
    {
      id: "12-1",
      question: "What is ∫(x² + 2x + 1)dx?",
      options: ["x³/3 + x² + x + C", "x³/3 + x² + x", "x³ + x² + x + C", "x³/3 + 2x² + x + C"],
      answer: "x³/3 + x² + x + C",
      explanation: "∫(x² + 2x + 1)dx = x³/3 + x² + x + C",
      difficulty: "hard"
    },
    {
      id: "12-2",
      question: "What is the magnitude of vector (3, 4)?",
      options: [5, 7, 12, 25],
      answer: 5,
      explanation: "|(3, 4)| = √(3² + 4²) = √(9 + 16) = √25 = 5",
      difficulty: "medium"
    },
    {
      id: "12-3",
      question: "What is ∫₀¹ x² dx?",
      options: [1/3, 1/2, 1, 2/3],
      answer: 1/3,
      explanation: "∫₀¹ x² dx = [x³/3]₀¹ = 1/3 - 0 = 1/3",
      difficulty: "hard"
    },
    {
      id: "12-4",
      question: "What is the dot product of (1, 2) and (3, 4)?",
      options: [11, 10, 12, 13],
      answer: 11,
      explanation: "(1, 2) · (3, 4) = 1×3 + 2×4 = 3 + 8 = 11",
      difficulty: "medium"
    },
    {
      id: "12-5",
      question: "What is the derivative of ln(x)?",
      options: ["1/x", "x", "1", "ln(x)"],
      answer: "1/x",
      explanation: "d/dx(ln(x)) = 1/x",
      difficulty: "hard"
    }
  ]
};

// All quizzes array
export const allMathQuizzes: MathQuiz[] = [
  class6Quiz,
  class7Quiz,
  class8Quiz,
  class9Quiz,
  class10Quiz,
  class11Quiz,
  class12Quiz
];

// Function to get quiz by class
export const getQuizByClass = (classNumber: number): MathQuiz | undefined => {
  return allMathQuizzes.find(quiz => quiz.class === classNumber);
};

// Function to get all available classes
export const getAvailableClasses = (): number[] => {
  return allMathQuizzes.map(quiz => quiz.class);
};
