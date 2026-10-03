const seedCategories = [
  {
    name: 'Computer Science',
    slug: 'computer-science',
    description: 'Software engineering, algorithms, system design, and coding architecture.',
    icon: 'Terminal',
  },
  {
    name: 'Science Fiction',
    slug: 'science-fiction',
    description: 'Futuristic science, space exploration, and speculative universe tales.',
    icon: 'Rocket',
  },
  {
    name: 'Philosophy & Wisdom',
    slug: 'philosophy-wisdom',
    description: 'Classical stoicism, ethical inquiries, and timeless lessons for living well.',
    icon: 'Compass',
  },
  {
    name: 'Design & Architecture',
    slug: 'design-architecture',
    description: 'Human-centered design, user psychology, and intuitive interface patterns.',
    icon: 'Layout',
  },
  {
    name: 'Business & Leadership',
    slug: 'business-leadership',
    description: 'Organizational strategy, tech leadership, and continuous innovation.',
    icon: 'TrendingUp',
  },
];

const seedAuthors = [
  {
    name: 'Robert C. Martin',
    nationality: 'American',
    bornYear: '1952',
    biography: 'Known colloquially as Uncle Bob, is an American software engineer and instructor. Best known for authoring Agile Software Development and Clean Code.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Martin Fowler',
    nationality: 'British',
    bornYear: '1963',
    biography: 'British software engineer, author, and international speaker on software development, specializing in object-oriented analysis, refactoring, and microservices.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Isaac Asimov',
    nationality: 'American',
    bornYear: '1920',
    biography: 'Prolific science fiction author and biochemist, famed for the Foundation series and the Three Laws of Robotics.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Marcus Aurelius',
    nationality: 'Roman',
    bornYear: '121 AD',
    biography: 'Roman emperor from 161 to 180 AD and a celebrated Stoic philosopher whose personal private notebook was later published as Meditations.',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Don Norman',
    nationality: 'American',
    bornYear: '1935',
    biography: 'Cognitive scientist and usability engineer, co-founder of the Nielsen Norman Group and pioneer of user-centered design and emotional ergonomics.',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
];

const seedBooks = [
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    subtitle: 'Principles, patterns, and practical guides for writing clean, resilient code.',
    authorIndex: 0,
    categoryIndex: 0,
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. Clean Code gives you pragmatic insights into craft, readability, and maintainability.',
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
        title: 'Chapter 1: Clean Code & Meaningful Names',
        content: `What is clean code? Bjarne Stroustrup, inventor of C++, said: "I like my code to be elegant and efficient. The logic should be straightforward to make it hard for bugs to hide, the dependencies minimal to ease maintenance, error handling complete according to an articulated strategy, and performance close to optimal so as not to tempt people to make the code messy with unprincipled optimizations."\n\nNames are everywhere in software. We name our variables, our functions, our arguments, classes, and packages. We name our source files and the directories that contain them. We name, name, name. Because we do so much of it, we’d better do it well. Use intention-revealing names: if a name requires a comment, then the name does not reveal its intent.`
      },
      {
        title: 'Chapter 2: Functions & Single Responsibility',
        content: `The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that. Functions should do one thing. They should do it well. They should do it only.\n\nTo make sure that our functions are doing "one thing", we need to make sure that the statements within our function are all at the same level of abstraction. Mixing levels of abstraction within a function is always confusing. Readers may not be able to tell whether a particular expression is an essential concept or a minor detail.`
      },
      {
        title: 'Chapter 3: Comments, Formatting, and Error Handling',
        content: `Don't comment bad code—rewrite it. Clear and expressive code with few comments is far superior to cluttered and complex code with lots of comments. Rather than spend your time writing comments that explain the mess you've made, spend your time cleaning that mess up.\n\nError handling is important, but if it obscures logic, it's wrong. Prefer exceptions to returning error codes. When you throw an exception in your code, you create a separation between business logic and error recovery.`
      }
    ]
  },
  {
    title: 'Refactoring: Improving the Design of Existing Code',
    subtitle: 'The definitive guide to systematically restructuring code without altering behavior.',
    authorIndex: 1,
    categoryIndex: 0,
    description: 'Refactoring is about improving the design of existing code. It is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure. With refactoring, you can take a bad design and rework it into well-crafted code.',
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
        title: 'Chapter 1: Refactoring, a First Example',
        content: `Consider a company of theatrical players who go out into the countryside and give performances of plays. The customers request plays, and the company charges them based on the size of the audience and the kind of play they perform. Currently there are two kinds of plays: tragedies and comedies...\n\nWhen you find you have to add a feature to a program, and the program's code is not structured in a convenient way to add the feature, first refactor the program to make it easy to add the feature, then add the feature.`
      },
      {
        title: 'Chapter 2: Principles in Refactoring',
        content: `Refactoring is a controlled technique for improving the design of an existing code base. Its essence is applying a series of small behavior-preserving steps, each of which is too small to be worth doing, but the cumulative effect is a radical improvement.\n\nBy keeping the steps small, you minimize the chance of introducing bugs. You also avoid spending hours debugging when code breaks.`
      }
    ]
  },
  {
    title: 'Foundation',
    subtitle: 'The epic saga of psychohistory, Galactic Empire collapse, and galactic rebirth.',
    authorIndex: 2,
    categoryIndex: 1,
    description: 'For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. But only Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future—a dark age of ignorance and barbarism that will last thirty thousand years. To preserve knowledge, he gathers the best minds of the empire on Terminus.',
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
        content: `Hari Seldon was sitting in his study with Gaal Dornick. The great dome of the Imperial Palace shimmered in the twilight of Trantor, capital of a million inhabited worlds.\n\n"You see," Seldon remarked quietly, "psychohistory cannot predict the actions of single individuals. A human being is too unpredictable. But when you aggregate billions of people over thousands of years, human civilization behaves like gas molecules under thermodynamic pressure. The collapse is mathematically certain."`
      },
      {
        title: 'Chapter 2: The Encyclopedists',
        content: `Fifty years had elapsed on the lonely world of Terminus. The Foundation had labored tirelessly compiling the Encyclopedia Galactica, convinced their duty was merely academic.\n\nThen the vault of Hari Seldon opened for the first time. The holographic projection of the ancient mathematician appeared in the wheelchair: "Greetings, people of Terminus. You believe your purpose was the encyclopedia. That was a fraud—a gentle fraud to place you where you must stand..."`
      }
    ]
  },
  {
    title: 'Meditations: A New Translation',
    subtitle: 'Personal writings of the Roman Emperor Marcus Aurelius on duty, humility, and reason.',
    authorIndex: 3,
    categoryIndex: 2,
    description: 'Written in Greek by the only Roman emperor who was also a philosopher, without any intention of publication, the Meditations of Marcus Aurelius offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe.',
    isbn: '978-0812968255',
    publishedYear: 180,
    pageCount: 304,
    language: 'English',
    rating: 4.9,
    downloadsCount: 3410,
    readsCount: 7800,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    chapters: [
      {
        title: 'Book 1: Debts and Lessons',
        content: `From my grandfather Verus: character and self-control.\nFrom what I heard and remember of my father: integrity and manliness.\nFrom my mother: piety and generosity, and to avoid not only doing evil, but even the thought of it; and simplicity in my way of living, far removed from the habits of the rich.\nFrom my tutor: not to become a Green or Blue partisan at the races, nor a supporter of the lightly armed or heavily armed gladiators at the circus.`
      },
      {
        title: 'Book 2: On the River Gran, Among the Quadi',
        content: `When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil. But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own.\n\nNone of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my fellow human, nor hate him. We were made to work together like hands, like feet, like the rows of the upper and lower teeth.`
      }
    ]
  },
  {
    title: 'The Design of Everyday Things',
    subtitle: 'The fundamental psychologies of user experience, signifiers, and intuitive interaction.',
    authorIndex: 4,
    categoryIndex: 3,
    description: 'Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The fault, argues this ingenious-even liberating-book, lies not in ourselves, but in product design that ignores the needs of users and the principles of cognitive psychology.',
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
        title: 'Chapter 1: The Psychopathology of Everyday Things',
        content: `If a door needs a sign telling you whether to push or pull, it is poorly designed. Two of the most important characteristics of good design are discoverability and understanding.\n\nDiscoverability: Is it possible to even figure out what actions are possible and where and how to perform them?\nUnderstanding: What does it all mean? How is the product supposed to be used? What do all the different controls and settings specify?\n\nDesign is concerned with how things work, how they are controlled, and the nature of the interaction between people and technology.`
      },
      {
        title: 'Chapter 2: Seven Fundamental Principles of Design',
        content: `The design of everyday things should follow 7 fundamental principles:\n1. Discoverability\n2. Feedback\n3. Conceptual Model\n4. Affordances\n5. Signifiers\n6. Mappings\n7. Constraints\n\nWhen these principles are applied effectively, users can accomplish their tasks smoothly without frustration or error.`
      }
    ]
  }
];

module.exports = {
  seedCategories,
  seedAuthors,
  seedBooks,
};
