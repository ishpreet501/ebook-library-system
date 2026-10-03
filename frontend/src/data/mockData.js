// =====================================================================
// INITIAL MOCK DATA FOR DIGITAL E-BOOK LIBRARY
// Used as fallback and offline resilience if backend database is offline
// =====================================================================

export const DEFAULT_CATEGORIES = [
  { 
    _id: 'cat-1', 
    name: 'Computer Science', 
    slug: 'computer-science', 
    description: 'Clean code, architecture patterns, algorithms, and software craftsmanship.', 
    icon: 'Code', 
    bookCount: 2 
  },
  { 
    _id: 'cat-2', 
    name: 'Philosophy', 
    slug: 'philosophy', 
    description: 'Classical Stoicism, ethics, mental models, and timeless human duty.', 
    icon: 'Compass', 
    bookCount: 1 
  },
  { 
    _id: 'cat-3', 
    name: 'Science Fiction', 
    slug: 'science-fiction', 
    description: 'Psychohistory, galactic civilizations, and speculative technological futures.', 
    icon: 'Rocket', 
    bookCount: 1 
  },
  { 
    _id: 'cat-4', 
    name: 'Design & Human UX', 
    slug: 'design-ux', 
    description: 'Cognitive psychology, physical affordances, signifiers, and intuitive systems.', 
    icon: 'Layout', 
    bookCount: 1 
  }
];

export const DEFAULT_AUTHORS = [
  { 
    _id: 'auth-1', 
    name: 'Robert C. Martin', 
    nationality: 'American', 
    bornYear: '1952', 
    biography: 'Affectionately known as Uncle Bob. Software engineer, Agile Manifesto co-author, and author of Clean Code.', 
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 
    bookCount: 1 
  },
  { 
    _id: 'auth-2', 
    name: 'Martin Fowler', 
    nationality: 'British', 
    bornYear: '1963', 
    biography: 'Chief Scientist at ThoughtWorks. International keynote author on refactoring and software architecture.', 
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 
    bookCount: 1 
  },
  { 
    _id: 'auth-3', 
    name: 'Marcus Aurelius', 
    nationality: 'Roman', 
    bornYear: '121 AD', 
    biography: 'Roman emperor and Stoic philosopher. Wrote personal introspective notebooks, published as Meditations.', 
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', 
    bookCount: 1 
  },
  { 
    _id: 'auth-4', 
    name: 'Isaac Asimov', 
    nationality: 'American', 
    bornYear: '1920', 
    biography: 'Legendary sci-fi titan and biochemistry professor. Creator of the Foundation epic and Three Laws of Robotics.', 
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', 
    bookCount: 1 
  },
  { 
    _id: 'auth-5', 
    name: 'Don Norman', 
    nationality: 'American', 
    bornYear: '1935', 
    biography: 'Cognitive usability pioneer, former VP at Apple, and author of The Design of Everyday Things.', 
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 
    bookCount: 1 
  }
];

export const DEFAULT_BOOKS = [
  {
    _id: 'book-1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    subtitle: 'Principles, patterns, and practical guides for writing clean, resilient code.',
    author: DEFAULT_AUTHORS[0],
    category: DEFAULT_CATEGORIES[0],
    description: 'Even bad code can function. But if code is not clean, it can bring a development organization to its knees. Clean Code gives you pragmatic rules for meaningful naming, small functions, and clean tests.',
    isbn: '978-0132350884',
    publishedYear: 2008,
    pageCount: 464,
    language: 'English',
    rating: 4.9,
    downloadsCount: 1420,
    readsCount: 3890,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    chapters: [
      {
        title: 'Chapter 1: Meaningful Names',
        content: `Names are everywhere in software. We name our variables, functions, arguments, classes, and packages. Because we do so much of it, we’d better do it well. Use intention-revealing names: if a name requires a comment, then the name does not reveal its intent.`
      },
      {
        title: 'Chapter 2: Small & Focused Functions',
        content: `The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that. Functions should do one thing. They should do it well. They should do it only.`
      }
    ]
  },
  {
    _id: 'book-2',
    title: 'Refactoring: Improving the Design of Existing Code',
    subtitle: 'Systematically restructuring code without altering external observable behavior.',
    author: DEFAULT_AUTHORS[1],
    category: DEFAULT_CATEGORIES[0],
    description: 'Refactoring is a controlled technique for improving the design of existing code without changing its external behavior. Learn how to identify code smells, safely extract methods, and write enterprise software.',
    isbn: '978-0134757599',
    publishedYear: 2018,
    pageCount: 448,
    language: 'English',
    rating: 4.8,
    downloadsCount: 1190,
    readsCount: 2950,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    chapters: [
      {
        title: 'Chapter 1: A First Refactoring Example',
        content: `When you have to add a feature to a program, and the code is not structured in a convenient way, first refactor the program to make it easy to add the feature, then add the feature.`
      }
    ]
  },
  {
    _id: 'book-3',
    title: 'Meditations',
    subtitle: 'The Philosophy of Marcus Aurelius',
    author: DEFAULT_AUTHORS[2],
    category: DEFAULT_CATEGORIES[1],
    description: 'Personal private journals of Roman Emperor Marcus Aurelius. Written while on military campaign along the Danube, it offers unflinching reflections on stoic virtue, mortality, and inner tranquility.',
    isbn: '978-0812968255',
    publishedYear: 180,
    pageCount: 254,
    language: 'English',
    rating: 4.9,
    downloadsCount: 3410,
    readsCount: 7800,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    chapters: [
      {
        title: 'Book 2: On Waking Up',
        content: `When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, and surly. They are like this because they cannot distinguish good from evil. But I have seen the beauty of good, and recognize that none of them can hurt me.`
      }
    ]
  },
  {
    _id: 'book-4',
    title: 'Foundation',
    subtitle: 'The Epic Saga of Hari Seldon',
    author: DEFAULT_AUTHORS[3],
    category: DEFAULT_CATEGORIES[2],
    description: 'For twelve thousand years the Galactic Empire has ruled supreme. Only Hari Seldon, creator of psychohistory, foresees its fall. To preserve human knowledge, he establishes the Foundation.',
    isbn: '978-0553293357',
    publishedYear: 1951,
    pageCount: 256,
    language: 'English',
    rating: 4.9,
    downloadsCount: 2310,
    readsCount: 5200,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    chapters: [
      {
        title: 'Chapter 1: The Psychohistorians',
        content: `Hari Seldon sat in his study with Gaal Dornick. "Psychohistory cannot predict the actions of single individuals," Seldon explained. "But when you aggregate billions of people over thousands of years, human civilization behaves with mathematical certainty."`
      }
    ]
  },
  {
    _id: 'book-5',
    title: 'The Design of Everyday Things',
    subtitle: 'Psychology of Intuitive Interactions',
    author: DEFAULT_AUTHORS[4],
    category: DEFAULT_CATEGORIES[3],
    description: 'Why do smart people struggle with confusing door handles and light switches? Don Norman reveals how good design uses natural affordances and signifiers that bridge the gap between intuition and technology.',
    isbn: '978-0465050659',
    publishedYear: 2013,
    pageCount: 368,
    language: 'English',
    rating: 4.8,
    downloadsCount: 1650,
    readsCount: 4120,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=600&q=80',
    chapters: [
      {
        title: 'Chapter 1: Everyday Design',
        content: `If a door needs a sign telling you whether to push or pull, it is poorly designed. Two of the most important characteristics of good design are discoverability and understanding.`
      }
    ]
  }
];
