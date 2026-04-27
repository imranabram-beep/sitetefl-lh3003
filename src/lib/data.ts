// ================= TYPES =================

export type ActivityOption = {
  id: string;
  text: string;
};

export type ContentBlock =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "info";
      title: string;
      content: string[];
    }
  | {
      type: "bullets";
      items: string[];
    }
  | {
      type: "activity_intro";
      title: string;
      content: string;
    };

export type VideoBlock = {
  videoSrc: string;
  transcript?: string[];
  downloadable?: boolean;
};

export type MultipleChoiceQuestion = {
  id: string;
  question: string;
  options: ActivityOption[];
  correctAnswerId: string;
  explanation?: string;
};

export type TrueFalseQuestion = {
  id: string;
  question: string;
  correctAnswer: boolean;
  explanation?: string;
};

export type DropdownQuestion = {
  id: string;
  prompt: string;
  helperText?: string;
  options: ActivityOption[];
  correctAnswerId: string;
};

export type ClickRevealItem = {
  id: string;
  text: string;
  isCorrect: boolean;
  reveal?: string; // optional definition/explanation shown on click
};

export type LessonActivity =
  | {
      type: "quiz_multiple_choice";
      title?: string;
      passPercent?: number;
      questions: MultipleChoiceQuestion[];
    }
  | {
      type: "quiz_true_false";
      title?: string;
      passPercent?: number;
      questions: TrueFalseQuestion[];
    }
  | {
      type: "activity_dropdown";
      title?: string;
      description?: string;
      questions: DropdownQuestion[];
    }
  | {
      type: "activity_click_reveal";
      title?: string;
      description?: string;
      instruction?: string;
      items: ClickRevealItem[];
    }
  | {
      type: "activity_timer";
      title?: string;
      prompt: string;           // e.g. "Name 5 qualities that a teacher should have"
      durationSeconds: number;  // e.g. 120
    }
  | {
      type: "activity_sort";
      title?: string;
      instruction?: string;
      items: string[];          // items in scrambled order
      correctOrder: string[];   // correct order to check against
    };

export type CourseModule = {
  slug: string;
  title: string;
  kind: "lesson" | "activity" | "quiz";
  overview?: string;
  duration?: string;
  video?: VideoBlock;
  contentBlocks?: ContentBlock[];
  activity?: LessonActivity;
};

export type CourseUnit = {
  slug: string;
  title: string;
  overview?: string;
  modules: CourseModule[];
};

export type Course = {
  slug: string;
  title: string;
  description?: string;
  shortDescription?: string;
  price?: string;
  level?: string;
  duration?: string;
  certificate?: string;
  featured?: boolean;
  units: CourseUnit[];
};

export type Destination = {
  slug: string;
  country: string;
  city: string;
  flag: string;
  region: string;
  salary: string;
  salaryUsd: string;
  visa: string;
  demand: string;
  cost: string;
  overview: string;
  reasons: string[];
  sectors: string[];
  highlights: string[];
  bestFor: string;
};

// ================= COURSES =================

export const courses: Course[] = [
  {
    slug: "120-hour-premier-online-tefl-course",
    title: "120-Hour Premier Online TEFL Course",
    shortDescription:
      "A flexible online TEFL course with structured grammar lessons, videos, transcripts, quizzes, and teaching support.",
    description:
      "A structured TEFL course with lessons, activities, quizzes, videos, and transcripts designed for learners preparing to teach English abroad or online.",
    price: "£149",
    level: "Beginner to intermediate",
    duration: "120 hours",
    certificate: "Digital certificate included",
    featured: true,
    units: [
      {
        slug: "unit-1-grammar",
        title: "Unit 1: Grammar",
        overview:
          "Build a strong understanding of nouns, how they are classified, and how to teach them clearly to English learners.",
        modules: [
          {
            slug: "introduction-what-are-nouns",
            title: "Introduction: What are nouns?",
            kind: "lesson",
            duration: "6 min",
            video: {
              videoSrc: "/videos/grammar/unit-2/introduction-what-are-nouns.mp4",
              downloadable: true,
              transcript: [
                "In this unit we are going to look at our first part of speech: nouns.",
                "We have many different types of nouns in the English language: concrete nouns, proper nouns, abstract nouns and collective nouns.",
                "Once you have mastered those, you can move on to possessive nouns, plural nouns, countable nouns and uncountable nouns.",
                "Nouns can also be classified in more than one way. For instance, something can be a concrete noun and a countable noun at the same time.",
                "Hopefully you are beginning to understand how difficult this can be for students when trying to master the English language for themselves.",
                "Once you are more familiar with the different types of nouns we have in English, you will be in a great position to start helping students to learn about them too.",
                "Let’s get started then finding out all about nouns.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "In this unit we are going to look at our first part of speech: nouns. Sounds nice and simple, right?",
              },
              {
                type: "text",
                content:
                  "Well yes – once you know what they are. We have many different types of nouns in the English language: concrete nouns, proper nouns, abstract nouns and collective nouns. Once you’ve mastered those, you can move on to possessive nouns, plural nouns, countable nouns and uncountable nouns.",
              },
              {
                type: "text",
                content:
                  "Nouns can also be classified in more than one way, for instance: something can be a concrete noun and a countable noun at the same time. This makes things a little more complicated than you might realise.",
              },
              {
                type: "text",
                content:
                  "Hopefully you are beginning to understand how difficult this can be for students to get their heads around when trying to master the English language for themselves.",
              },
              {
                type: "text",
                content:
                  "Once you are more familiar with the different types of nouns we have in English, you will be in a great position to start helping students to learn about them too.",
              },
              {
                type: "text",
                content: "Let’s get started then finding out all about nouns!",
              },
            ],
          },

          {
            slug: "types-of-nouns",
            title: "Types of nouns",
            kind: "lesson",
            duration: "7 min",
            video: {
              videoSrc: "/videos/grammar/unit-2/types-of-nouns.mp4",
              downloadable: true,
              transcript: [
                "A noun is a word used to identify either a class of people, places, or things or to name a single one of these.",
                "Students often struggle with recognising and using different types of nouns, forming plurals, showing possessive forms, and using countable and uncountable nouns correctly.",
                "In this unit, we are going to look at the following types of nouns: concrete nouns, proper nouns, abstract nouns, collective nouns, possessive nouns, plural nouns, and countable and uncountable nouns.",
              ],
            },
            contentBlocks: [
              {
                type: "info",
                title: "Noun",
                content: [
                  "/naʊn/",
                  "A word used to identify either a class of people, places, or things or to name a single one of these.",
                  "Students struggle with: recognising and using different types of nouns, forming plurals, showing possessive forms, using countable and uncountable nouns correctly.",
                ],
              },
              {
                type: "text",
                content:
                  "In this unit, we are going to look at the following types of nouns:",
              },
              {
                type: "bullets",
                items: [
                  "Concrete nouns",
                  "Proper nouns",
                  "Abstract nouns",
                  "Collective nouns",
                  "Possessive nouns",
                  "Plural nouns",
                  "Countable and uncountable nouns",
                ],
              },
              {
                type: "text",
                content: "But first, what do you know about nouns already?",
              },
            ],
          },

          {
            slug: "types-of-nouns-activity",
            title: "Types of nouns: Activity",
            kind: "activity",
            duration: "5 min",
            contentBlocks: [
              {
                type: "activity_intro",
                title: "Activity:",
                content:
                  "Have a look at the following definitions and decide which type of noun they are describing. Once you have figured out what they are, choose the option from the dropdown box.",
              },
            ],
            activity: {
              type: "activity_dropdown",
              title: "Classify the noun type",
              questions: [
                {
                  id: "noun-type-1",
                  prompt:
                    "This is a noun that can be identified through the five senses – sight, smell, sound, taste and touch. Examples include: music, pie, tornado, flower, dog, milk, team.",
                  options: [
                    { id: "concrete", text: "Concrete noun" },
                    { id: "abstract", text: "Abstract noun" },
                    { id: "possessive", text: "Possessive noun" },
                    { id: "proper", text: "Proper noun" },
                    { id: "collective", text: "Collective noun" },
                    { id: "plural", text: "Plural noun" },
                    { id: "countable", text: "Countable noun" },
                    { id: "uncountable", text: "Uncountable noun" },
                  ],
                  correctAnswerId: "concrete",
                },
                {
                  id: "noun-type-2",
                  prompt:
                    "These are nouns that you cannot see, hear, taste, touch or smell. They refer to emotions, ideas, concepts, beliefs or a state of being. Examples include: love, hate, acceptance, safety, evil, happiness, education, patience.",
                  options: [
                    { id: "concrete", text: "Concrete noun" },
                    { id: "abstract", text: "Abstract noun" },
                    { id: "possessive", text: "Possessive noun" },
                    { id: "proper", text: "Proper noun" },
                    { id: "collective", text: "Collective noun" },
                    { id: "plural", text: "Plural noun" },
                    { id: "countable", text: "Countable noun" },
                    { id: "uncountable", text: "Uncountable noun" },
                  ],
                  correctAnswerId: "abstract",
                },
                {
                  id: "noun-type-3",
                  prompt:
                    "These nouns demonstrate ownership over something else and they typically include an apostrophe. Examples include: Tony’s car, the dog’s bone, my mother’s recipe.",
                  options: [
                    { id: "concrete", text: "Concrete noun" },
                    { id: "abstract", text: "Abstract noun" },
                    { id: "possessive", text: "Possessive noun" },
                    { id: "proper", text: "Proper noun" },
                    { id: "collective", text: "Collective noun" },
                    { id: "plural", text: "Plural noun" },
                    { id: "countable", text: "Countable noun" },
                    { id: "uncountable", text: "Uncountable noun" },
                  ],
                  correctAnswerId: "possessive",
                },
                {
                  id: "noun-type-4",
                  prompt:
                    "These nouns refer to one person, place, thing or idea in particular. They start with a capital letter and can be names of people, places, buildings, books, movies, months, days and organisations.",
                  options: [
                    { id: "concrete", text: "Concrete noun" },
                    { id: "abstract", text: "Abstract noun" },
                    { id: "possessive", text: "Possessive noun" },
                    { id: "proper", text: "Proper noun" },
                    { id: "collective", text: "Collective noun" },
                    { id: "plural", text: "Plural noun" },
                    { id: "countable", text: "Countable noun" },
                    { id: "uncountable", text: "Uncountable noun" },
                  ],
                  correctAnswerId: "proper",
                },
                {
                  id: "noun-type-5",
                  prompt:
                    "This noun refers to a group of people, animals or things and is used in a singular form. Examples include: a flock, a herd, a bunch, a set.",
                  options: [
                    { id: "concrete", text: "Concrete noun" },
                    { id: "abstract", text: "Abstract noun" },
                    { id: "possessive", text: "Possessive noun" },
                    { id: "proper", text: "Proper noun" },
                    { id: "collective", text: "Collective noun" },
                    { id: "plural", text: "Plural noun" },
                    { id: "countable", text: "Countable noun" },
                    { id: "uncountable", text: "Uncountable noun" },
                  ],
                  correctAnswerId: "collective",
                },
              ],
            },
          },

          {
            slug: "how-do-we-classify-nouns",
            title: "How do we classify nouns?",
            kind: "lesson",
            duration: "5 min",
            video: {
              videoSrc: "/videos/grammar/unit-2/how-do-we-classify-nouns.mp4",
              downloadable: true,
              transcript: [
                "The definitions in that last exercise should hopefully have given you an idea of the variety of nouns we have in English.",
                "However, you’ll often find that nouns fall into more than one category.",
                "For example: flour is a concrete noun, as we can taste it, but it is also an uncountable noun as it has no plural and we can’t count the number of flour.",
                "Time is an abstract noun, as it is a concept, but it is also an uncountable noun as we can’t actually count it – well, you can count minutes, seconds, days etc. but not time itself.",
                "We will now go through the individual types of nouns in turn to teach you more about them.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "The definitions in that last exercise should hopefully have given you an idea of the variety of nouns we have in English. However, you’ll often find that nouns fall into more than one category.",
              },
              {
                type: "text",
                content:
                  "For example: flour is a concrete noun, as we can taste it, but it is also an uncountable noun as it has no plural and we can’t count the number of flour.",
              },
              {
                type: "text",
                content:
                  "Time is an abstract noun, as it is a concept, but it is also an uncountable noun as we can’t actually count it – well, you can count minutes, seconds, days etc. but not “time” itself!",
              },
              {
                type: "text",
                content:
                  "We will now go through the individual types of nouns in turn to teach you more about them.",
              },
            ],
          },

          {
            slug: "concrete-nouns",
            title: "Concrete nouns",
            kind: "lesson",
            duration: "7 min",
            video: {
              videoSrc: "/videos/grammar/unit-2/concrete-nouns.mp4",
              downloadable: true,
              transcript: [
                "Concrete nouns are objects or substances that can be felt through our five senses.",
                "We can see, hear, taste, smell or feel them.",
                "The first thing to know about concrete nouns is that they make up the vast majority of nouns in English, so they are one of the easiest types to identify.",
              ],
            },
            contentBlocks: [
              {
                type: "info",
                title: "Concrete Nouns",
                content: [
                  "An object or substance that can be felt through our five senses.",
                  "We can see, hear, taste, smell or feel it.",
                ],
              },
              {
                type: "text",
                content:
                  "The first thing to know about concrete nouns is that they make up the vast majority of nouns in English, so they are one of the easiest types to identify.",
              },
              {
                type: "text",
                content:
                  "This becomes more obvious when you think about it. All animals, plants and people can be touched, felt, heard and seen. The same goes for objects as well. We also see all the places we visit and we feel heat, light and the effects of electricity.",
              },
              {
                type: "text",
                content:
                  "To help you work out if something is a concrete noun or not, ask yourself the following questions:",
              },
              {
                type: "bullets",
                items: [
                  "Can I touch it?",
                  "Is it real?",
                  "Does it affect me in some way physically?",
                  "Can I see the effects of it in my life?",
                ],
              },
              {
                type: "text",
                content:
                  "This is an easy and concrete way of finding out whether something is a concrete noun.",
              },
            ],
          },

          {
            slug: "concrete-nouns-activity",
            title: "Concrete nouns: Activity",
            kind: "activity",
            duration: "4 min",
            contentBlocks: [
              {
                type: "activity_intro",
                title: "Activity:",
                content:
                  "Have a look at the table of nouns below and decide for yourself if they are concrete nouns or not. Click on the word if you think it is a concrete noun, and then click on the answers button when you think you have found them all.",
              },
            ],
            activity: {
              type: "activity_click_reveal",
              title: "Select the concrete nouns",
              instruction: "Click each word you think is a concrete noun.",
              items: [
                { id: "table", text: "TABLE", isCorrect: true },
                { id: "electricity", text: "ELECTRICITY", isCorrect: true },
                { id: "flower", text: "FLOWER", isCorrect: true },
                { id: "classroom", text: "CLASSROOM", isCorrect: true },
                { id: "fire", text: "FIRE", isCorrect: true },
                { id: "bed", text: "BED", isCorrect: true },
                { id: "road", text: "ROAD", isCorrect: true },
                { id: "grass", text: "GRASS", isCorrect: true },
                { id: "sofa", text: "SOFA", isCorrect: true },
                { id: "air", text: "AIR", isCorrect: true },
                { id: "cheetah", text: "CHEETAH", isCorrect: true },
                { id: "phone", text: "PHONE", isCorrect: true },
              ],
            },
          },

          {
            slug: "concrete-nouns-quiz",
            title: "Concrete nouns: Quiz",
            kind: "quiz",
            duration: "5 min",
            overview:
              "For each of the questions we’ll state that a given word is a concrete noun; answer true if you think it is, and answer false if you think it is not a concrete noun.",
            activity: {
              type: "quiz_true_false",
              title: "Quiz overview",
              passPercent: 80,
              questions: [
                {
                  id: "concrete-q1",
                  question: "Friend is a concrete noun.",
                  correctAnswer: true,
                  explanation: "Friend refers to a person, so it is concrete.",
                },
                {
                  id: "concrete-q2",
                  question: "Education is a concrete noun.",
                  correctAnswer: false,
                  explanation: "Education is abstract.",
                },
                {
                  id: "concrete-q3",
                  question: "Life is a concrete noun.",
                  correctAnswer: false,
                  explanation: "Life is abstract in this classification task.",
                },
                {
                  id: "concrete-q4",
                  question: "Meal is a concrete noun.",
                  correctAnswer: true,
                  explanation: "A meal is a thing you can experience physically.",
                },
                {
                  id: "concrete-q5",
                  question: "Perfume is a concrete noun.",
                  correctAnswer: true,
                  explanation: "You can smell perfume, so it is concrete.",
                },
                {
                  id: "concrete-q6",
                  question: "Elbow is a concrete noun.",
                  correctAnswer: true,
                  explanation: "Elbow is a physical body part.",
                },
                {
                  id: "concrete-q7",
                  question: "Friendship is a concrete noun.",
                  correctAnswer: false,
                  explanation: "Friendship is abstract.",
                },
                {
                  id: "concrete-q8",
                  question: "Artist is a concrete noun.",
                  correctAnswer: true,
                  explanation: "Artist refers to a person.",
                },
                {
                  id: "concrete-q9",
                  question: "Love is a concrete noun.",
                  correctAnswer: false,
                  explanation: "Love is abstract.",
                },
                {
                  id: "concrete-q10",
                  question: "Charity is a concrete noun.",
                  correctAnswer: false,
                  explanation: "Charity is abstract in this usage.",
                },
              ],
            },
          },

          {
            slug: "proper-nouns-introduction",
            title: "Proper nouns: Introduction",
            kind: "lesson",
            duration: "4 min",
            video: {
              videoSrc: "/videos/grammar/unit-2/proper-nouns-introduction.mp4",
              downloadable: true,
              transcript: [
                "We’re now going to look at proper nouns, which are names that we use for people, places and organisations.",
                "They’re easy to identify, as they’ll usually have a capital letter at the start.",
                "Examples include: France, Peter, Edinburgh and TEFL Org UK.",
              ],
            },
            contentBlocks: [
              {
                type: "info",
                title: "Proper noun",
                content: [
                  "A name used for an individual person, place, or organisation, spelled with an initial capital letter.",
                ],
              },
              {
                type: "text",
                content:
                  "We’re now going to look at proper nouns, which are names that we use for people, places and organisations.",
              },
              {
                type: "text",
                content:
                  "They’re easy to identify, as they’ll usually have a capital letter at the start.",
              },
              {
                type: "text",
                content:
                  "Examples include: France, Peter, Edinburgh and TEFL Org UK.",
              },
            ],
          },
        ],
      },
      // ── Unit 2: Methodology ─────────────────────────────────────
      // Full content populated in Stage 2.
      // ── Unit 2: Methodology ─────────────────────────────────────
      // Locked by drip until Unit 1 (Grammar) is complete.
      // Content sourced from TEFL Methodology Course PDF (©2021 tefl.org)
      {
        slug: "unit-2-methodology",
        title: "Unit 2: Methodology",
        overview:
          "Cover all you need to know about teaching methods and strategies so you can step in front of a class as a confident EFL teacher.",
        modules: [

          // ── Lesson 1: Welcome to the course ──────────────────────
          {
            slug: "meth-welcome-to-the-course",
            title: "Welcome to the course",
            kind: "lesson",
            duration: "5 min",
            video: {
              videoSrc: "/videos/methodology/unit-1/welcome-to-the-course.mp4",
              downloadable: true,
              transcript: [
                "Hi there, and welcome to unit 1 of our methodology course. This is where you'll really get to grips with what it means to be a teacher and cover all of the theory necessary to step in front of a class and teach English as a foreign language.",
                "This course is packed with information, and there's a lot to learn. Some of the key things you'll cover are: structuring a lesson with different methods, managing your students and getting them involved, teaching age groups from young learners to adults, teaching general English and more specific English, teaching one-to-one and teaching larger classes.",
                "That might sound overwhelming, but we're going to give you lots of handy tips that will help you make the most of your teaching skills. We'll show you how to write great lesson plans, set up your lessons clearly and effectively, and how to run some really useful and engaging activities to get your students involved and help them progress. We'll even teach you how to deal with those unruly students, who could be adults too by the way!",
                "By the end of the course you will have mastered the methodology of TEFL and will feel much more confident about your teaching abilities.",
                "It's time to get started, click on to the next lesson to start the course.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Welcome to the Methodology course. This is where you'll really get to grips with what it means to be a teacher and cover all of the theory necessary to step in front of a class and teach English as a foreign language.",
              },
              {
                type: "text",
                content:
                  "By the end of the course you will have mastered the methodology of TEFL and will feel much more confident about your teaching abilities.",
              },
            ],
          },

          // ── Lesson 2: Welcome to Unit 1 ──────────────────────────
          {
            slug: "meth-welcome-to-unit-1",
            title: "Welcome to Unit 1",
            kind: "lesson",
            duration: "5 min",
            video: {
              videoSrc: "/videos/methodology/unit-1/welcome-to-unit-1.mp4",
              downloadable: true,
              transcript: [
                "Hi there, we're about to start the methodology course – but let's have a think for a moment: what exactly is methodology? You've already covered grammar, which is the nuts and bolts, if you like, of the English language, so now with methodology you're going to learn about what you should be doing in the classroom to impart that knowledge to your students.",
                "We've already shown you all of the things that we're going to teach you so you can be as effective as possible when you've got your own class of students. But before moving on to all of that though, we're going to focus on you and what your role will be as a teacher in the classroom. It's not quite as simple as just being a teacher and that's it!",
                "Teachers have to fulfil all sorts of roles at once, like organiser or controller, elicitor or assessor. Your students will also have their own roles to play, so it's important that you learn what lies ahead of you as a teacher so you can do the best job possible of teaching your students.",
                "Let's get on with it then, shall we? First up, we're going to find out what it is that makes a good teacher.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "What exactly is methodology? You've already covered grammar, which is the nuts and bolts of the English language, so now with methodology you're going to learn about what you should be doing in the classroom to impart that knowledge to your students.",
              },
              {
                type: "text",
                content:
                  "Teachers have to fulfil all sorts of roles at once, like organiser or controller, elicitor or assessor. Your students will also have their own roles to play, so it's important that you learn what lies ahead of you as a teacher so you can do the best job possible of teaching your students.",
              },
            ],
          },

          // ── Lesson 3: What makes a good teacher? ─────────────────
          {
            slug: "meth-what-makes-a-good-teacher",
            title: "What makes a good teacher?",
            kind: "activity",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Good teachers make a massive difference in students' lives, and we're sure that you'll have an idea of what characteristics are required of someone to manage a class and help students learn effectively.",
              },
              {
                type: "activity_intro",
                title: "Activity:",
                content:
                  "To start off, have a think for a minute about the qualities that make a good teacher and try to write down the first five things that come to mind.",
              },
            ],
            activity: {
              type: "activity_timer",
              title: "Activity",
              prompt: "Name 5 qualities that a teacher should have.",
              durationSeconds: 60,
            },
          },

          // ── Lesson 4: The role of the teacher ────────────────────
          {
            slug: "meth-role-of-the-teacher",
            title: "The role of the teacher",
            kind: "lesson",
            duration: "6 min",
            video: {
              videoSrc: "/videos/methodology/unit-1/role-of-the-teacher.mp4",
              downloadable: true,
              transcript: [
                "A lot of students, and even some teachers, don't fully understand what role teachers play in the classroom. Is teaching simply about transmitting knowledge from the teacher to the student, or is it more about creating an environment where students can learn for themselves?",
                "In a classroom, where would you expect to find a teacher? Standing at the front of the class controlling the students, or moving around trying to respond to students' individual needs and questions?",
                "There's no right or wrong answer to these questions in general, but it all depends on the group of students you are teaching, and that flexibility in your teaching repertoire is what you'll need to focus on to help students learn as much as they can.",
                "It also gives you the amazing opportunities you'll find as a teacher to go anywhere in the world and teach any set of students. If you get a job in a private language school, you may find that you need to become more chameleonic, adapting your approach to suit each class that comes through the door.",
                "That's why it's important to understand the students you'll be teaching, their motivations for learning English and their level of ability. This knowledge will show you the roles you'll need to fulfil for them, and then you can plan your lessons accordingly.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "A lot of students, and even some teachers, don't fully understand what role teachers play in the classroom. Is teaching simply about transmitting knowledge from the teacher to the student, or is it more about creating an environment where students can learn for themselves?",
              },
              {
                type: "text",
                content:
                  "There's no right or wrong answer to these questions in general, but it all depends on the group of students you are teaching. That flexibility in your teaching repertoire is what you'll need to focus on to help students learn as much as they can.",
              },
              {
                type: "text",
                content:
                  "That's why it's important to understand the students you'll be teaching, their motivations for learning English and their level of ability. When you decide your roles and plan your lessons, always keep in mind whether it's appropriate for your students' age, ability, motivations and learning needs.",
              },
            ],
          },

          // ── Lesson 5: Teacher-centred or Student-centred? ─────────
          {
            slug: "meth-teacher-centred-or-student-centred",
            title: "Teacher-centred or Student-centred?",
            kind: "lesson",
            duration: "7 min",
            video: {
              videoSrc: "/videos/methodology/unit-1/teacher-centred-or-student-centred.mp4",
              downloadable: true,
              transcript: [
                "Over the years, the teaching style that we use in TEFL lessons has shifted towards being student-centred rather than teacher-centred. But what does this actually mean?",
                "Well, teacher-centred lessons usually consist of the teacher being involved in most of the lesson's activities; doing most of the talking, explaining grammar and vocabulary and the like, while students listen and take notes.",
                "Can you think of why this might not be the best? Generally, if the teacher is the only one actually using the language, with the students taking a more passive role, the students might develop a pretty good understanding of the language, but no great ability to use it themselves. And helping students use English is the aim of the lesson in the end, isn't it?",
                "It's also worth considering that if there is too much teacher talking time (TTT) compared to student talking time (STT), then students will get bored and lose attention.",
                "So what's the difference with student-centred lessons? Here, the teacher is still present and involved, but they encourage the students to use the language themselves as much as possible, and to discover grammar rules and vocabulary on their own.",
                "Rather than a lecturer, the teacher becomes a guide to the English language; eliciting responses from the students rather than dictating to them. This all adds up to a much more memorable learning experience for the students.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Over the years, the teaching style used in TEFL lessons has shifted towards being student-centred rather than teacher-centred. Teacher-centred lessons consist of the teacher doing most of the talking, explaining grammar and vocabulary, while students listen and take notes.",
              },
              {
                type: "text",
                content:
                  "In student-centred lessons, the teacher encourages students to use the language themselves as much as possible, and to discover grammar rules and vocabulary on their own. Rather than a lecturer, the teacher becomes a guide — eliciting responses from students rather than dictating to them.",
              },
            ],
          },

          // ── Quiz: Teacher-centred vs Student-centred ──────────────
          {
            slug: "meth-teacher-student-centred-quiz",
            title: "Teacher-centred vs Student-centred: Quiz",
            kind: "quiz",
            duration: "8 min",
            activity: {
              type: "quiz_multiple_choice",
              title: "Teacher-centred vs Student-centred",
              passPercent: 70,
              questions: [
                {
                  id: "tc-q1",
                  question: "There is lots of group work and pair work activities that students do whilst the teacher monitors.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "sc",
                  explanation: "Group and pair work with the teacher monitoring is student-centred — students are doing the talking and learning actively.",
                },
                {
                  id: "tc-q2",
                  question: "The students answer each other's questions and refer to the teacher for information if needed.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "sc",
                  explanation: "Students interacting with each other and using the teacher as a resource is student-centred.",
                },
                {
                  id: "tc-q3",
                  question: "The teacher writes new vocabulary on the board and students copy it down.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "tc",
                  explanation: "The teacher controlling the content and students passively copying is teacher-centred.",
                },
                {
                  id: "tc-q4",
                  question: "The teacher explains grammar rules with the use of the board and a timeline.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "tc",
                  explanation: "The teacher explaining grammar rules directly is teacher-centred.",
                },
                {
                  id: "tc-q5",
                  question: "Students identify common patterns they can see in sentences to try to identify the form of a tense.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "sc",
                  explanation: "Students discovering language rules for themselves is student-centred.",
                },
                {
                  id: "tc-q6",
                  question: "The teacher asks guiding questions to students to see if they can decide when to use a tense.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "sc",
                  explanation: "Eliciting responses through guiding questions encourages students to think for themselves — student-centred.",
                },
                {
                  id: "tc-q7",
                  question: "After a speaking activity, the teacher corrects all the students' mistakes.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "tc",
                  explanation: "The teacher taking full control of error correction is teacher-centred.",
                },
                {
                  id: "tc-q8",
                  question: "After a speaking activity, the teacher encourages the students to identify any mistakes they heard and try to correct them.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "sc",
                  explanation: "Getting students to identify and self-correct mistakes is student-centred.",
                },
                {
                  id: "tc-q9",
                  question: "The teacher models a language point and then students try it out for themselves.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "sc",
                  explanation: "Brief modelling followed by student practice is student-centred — the students are doing the work.",
                },
                {
                  id: "tc-q10",
                  question: "The classroom is usually quiet.",
                  options: [
                    { id: "tc", text: "Teacher-centred" },
                    { id: "sc", text: "Student-centred" },
                  ],
                  correctAnswerId: "tc",
                  explanation: "A quiet classroom suggests students are passively listening rather than actively using the language — teacher-centred.",
                },
              ],
            },
          },

          // ── Lesson 6: Teacher roles: Introduction ─────────────────
          {
            slug: "meth-teacher-roles-introduction",
            title: "Teacher roles: Introduction",
            kind: "lesson",
            duration: "4 min",
            video: {
              videoSrc: "/videos/methodology/unit-1/teacher-roles-introduction.mp4",
              downloadable: true,
              transcript: [
                "Being a teacher isn't simply about standing in front of a class and giving a lesson; sometimes you'll have to play other different roles in the classroom.",
                "We're now going to show you 9 roles you might play as a teacher.",
                "Have a think about what the role could entail, and then click to reveal the definition.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Being a teacher isn't simply about standing in front of a class and giving a lesson; sometimes you'll have to play other different roles in the classroom.",
              },
              {
                type: "text",
                content:
                  "We're now going to show you 9 roles you might play as a teacher. Have a think about what each role could entail, and then click to reveal the definition.",
              },
            ],
          },

          // ── Activity: Teacher roles (click-reveal) ────────────────
          {
            slug: "meth-teacher-roles",
            title: "Teacher roles",
            kind: "activity",
            duration: "6 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Now let's look at some of the specific roles you will play as the teacher. Click on the boxes below to see an explanation of what each role entails.",
              },
            ],
            activity: {
              type: "activity_click_reveal",
              title: "Teacher roles",
              instruction: "Click each role to reveal what it means.",
              items: [
                {
                  id: "controller",
                  text: "Controller",
                  isCorrect: true,
                  reveal: "Presents explanations in the lesson and takes charge of the class and activity. There will be a lot of TTT (teacher talking time) and you will need to snap into this role if the activity isn't going to plan. Best to keep this to a minimum.",
                },
                {
                  id: "organiser",
                  text: "Organiser",
                  isCorrect: true,
                  reveal: "Gives instructions, organises students into groups or pairs, initiates activities or brings them to a close, and organises feedback. This is one of the most important roles, as students need to be confident as to how the activities will work or how the groups are supposed to function so that they are not confused.",
                },
                {
                  id: "assessor",
                  text: "Assessor",
                  isCorrect: true,
                  reveal: "Gives feedback and correction to students as well as evaluating and grading their abilities. Students are usually very keen to find out how they are doing, but try not to correct every mistake you hear as that could discourage them.",
                },
                {
                  id: "elicitor",
                  text: "Elicitor",
                  isCorrect: true,
                  reveal: "Prompts the students into working things out for themselves and giving a response. The teacher can ask guiding questions or give activities and tasks designed to allow students to discover things by themselves rather than be told.",
                },
                {
                  id: "participant",
                  text: "Participant",
                  isCorrect: true,
                  reveal: "Participates in an activity as an equal, rather than as the teacher. This livens up an activity from inside the group, rather than prompting from outside. However, you need to make sure you don't dominate or take over the activity.",
                },
                {
                  id: "tutor",
                  text: "Tutor",
                  isCorrect: true,
                  reveal: "Provides guidance, support or encouragement – more suited to a one-to-one role when students are working individually or in pairs. Be careful to give equal attention to all students and not to intrude too much.",
                },
                {
                  id: "resource",
                  text: "Resource",
                  isCorrect: true,
                  reveal: "Models the language for students and helps them look up meaning or explanations. As a native or high-level English speaker, you are likely to be the main resource in the classroom. Rather than spoon-feeding answers, encourage students to work things out on their own whenever possible.",
                },
                {
                  id: "observer",
                  text: "Observer",
                  isCorrect: true,
                  reveal: "Monitors to see how activities are progressing, to get an idea of how long it will take and how successful it has been. Try not to distract the students when you are observing.",
                },
                {
                  id: "facilitator",
                  text: "Facilitator",
                  isCorrect: true,
                  reveal: "Facilitates communication between students in the classroom. English teaching is often regarded as facilitating, as it is about encouraging the students to communicate successfully in the classroom.",
                },
              ],
            },
          },

          // ── Lesson 7: Which role and when? ────────────────────────
          {
            slug: "meth-which-role-and-when",
            title: "Which role and when?",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "As you'll have seen, the role you take on in the classroom depends on what type of activity you are doing, what stage of a lesson you are in and what you find yourself having to respond to.",
              },
              {
                type: "text",
                content:
                  "Some stages of a lesson will require you to be more controlling and in charge, while others will see you taking more of a back-seat role. It's important to be able to switch between these roles appropriately so your teaching is at its most effective throughout the lesson.",
              },
              {
                type: "text",
                content:
                  "In the following quiz, each question will feature a clue about a real lesson. Read the clue and try to decide which role the teacher is fulfilling, then choose the correct role from the options provided.",
              },
            ],
          },

          // ── Quiz: Teacher Roles ───────────────────────────────────
          {
            slug: "meth-teacher-roles-quiz",
            title: "Teacher Roles: Quiz",
            kind: "quiz",
            duration: "8 min",
            activity: {
              type: "quiz_multiple_choice",
              title: "Teacher Roles: Quiz",
              passPercent: 70,
              questions: [
                {
                  id: "tr-q1",
                  question: "From 3:26 in the video the teacher is giving feedback on student work. Which role is the teacher performing?",
                  options: [
                    { id: "assessor", text: "Assessor" },
                    { id: "observer", text: "Observer" },
                  ],
                  correctAnswerId: "assessor",
                  explanation: "Giving feedback and correction to students is the Assessor role.",
                },
                {
                  id: "tr-q2",
                  question: "Up to 1:37 the teacher is explaining an activity to the class. Which role is the teacher playing?",
                  options: [
                    { id: "controller", text: "Controller" },
                    { id: "participant", text: "Participant" },
                  ],
                  correctAnswerId: "controller",
                  explanation: "Explaining an activity and taking charge of the class is the Controller role.",
                },
                {
                  id: "tr-q3",
                  question: "The teacher is extracting answers from students using guiding questions. Which role is the teacher playing?",
                  options: [
                    { id: "assessor", text: "Assessor" },
                    { id: "elicitor", text: "Elicitor" },
                  ],
                  correctAnswerId: "elicitor",
                  explanation: "Prompting students to work things out for themselves and give responses is the Elicitor role.",
                },
                {
                  id: "tr-q4",
                  question: "From 1:14 the teacher is putting students into groups for an activity. Which role is the teacher playing?",
                  options: [
                    { id: "organiser", text: "Organiser" },
                    { id: "resource", text: "Resource" },
                  ],
                  correctAnswerId: "organiser",
                  explanation: "Organising students into groups and setting up activities is the Organiser role.",
                },
                {
                  id: "tr-q5",
                  question: "At 5:20 and after, the teacher joins in with the students' activity as an equal. Which role is the teacher playing?",
                  options: [
                    { id: "participant", text: "Participant" },
                    { id: "tutor", text: "Tutor" },
                  ],
                  correctAnswerId: "participant",
                  explanation: "Participating in an activity as an equal rather than as the teacher is the Participant role.",
                },
                {
                  id: "tr-q6",
                  question: "From 0:13 the teacher gives a student an answer to help them with a language point. Which role is the teacher playing?",
                  options: [
                    { id: "observer", text: "Observer" },
                    { id: "resource", text: "Resource" },
                  ],
                  correctAnswerId: "resource",
                  explanation: "Modelling language and providing answers as a source of knowledge is the Resource role.",
                },
                {
                  id: "tr-q7",
                  question: "From 0:37 the teacher prompts students to speak without taking over the conversation. Which role is the teacher playing?",
                  options: [
                    { id: "controller", text: "Controller" },
                    { id: "facilitator", text: "Facilitator" },
                  ],
                  correctAnswerId: "facilitator",
                  explanation: "Facilitating communication between students without dominating is the Facilitator role.",
                },
                {
                  id: "tr-q8",
                  question: "From 1:00 the teacher helps an individual student who is struggling, working with them one-to-one. Which role is the teacher playing?",
                  options: [
                    { id: "participant", text: "Participant" },
                    { id: "tutor", text: "Tutor" },
                  ],
                  correctAnswerId: "tutor",
                  explanation: "Providing individual guidance and support to a student is the Tutor role.",
                },
                {
                  id: "tr-q9",
                  question: "The teacher is quietly walking around checking students' work without intervening. Which role is the teacher playing?",
                  options: [
                    { id: "observer", text: "Observer" },
                    { id: "resource", text: "Resource" },
                  ],
                  correctAnswerId: "observer",
                  explanation: "Monitoring activities without interfering is the Observer role.",
                },
              ],
            },
          },

          // ── Lesson 8: Student roles: Introduction ─────────────────
          {
            slug: "meth-student-roles-introduction",
            title: "Student roles: Introduction",
            kind: "lesson",
            duration: "4 min",
            video: {
              videoSrc: "/videos/methodology/unit-1/student-roles-introduction.mp4",
              downloadable: true,
              transcript: [
                "We now know about all the various roles a teacher might have in the classroom, so let's look at what students will have to do as well.",
                "To learn effectively, students need to do a lot more than just turn up to class.",
                "To start off, give yourself a minute to think about which things a student should be willing to do to help their own learning.",
                "We think you can name 6, so have a go!",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "We now know about all the various roles a teacher might have in the classroom, so let's look at what students will have to do as well. To learn effectively, students need to do a lot more than just turn up to class.",
              },
            ],
          },

          // ── Lesson 9: Student roles ───────────────────────────────
          {
            slug: "meth-student-roles",
            title: "Student roles",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "We hope you managed to think of a few student qualities on your own. Hopefully some of these ideas below were on your list:",
              },
              {
                type: "bullets",
                items: [
                  "A willingness to listen to the language.",
                  "A desire to experiment with the language.",
                  "A willingness to ask questions.",
                  "An ability to think about their own learning process and methods.",
                  "An acceptance of error correction.",
                  "A desire to learn.",
                  "A willingness to attend lessons regularly.",
                ],
              },
              {
                type: "text",
                content:
                  "When we try to decide how to teach our English students, we need to consider a number of factors such as: age, culture, language ability and motivation for learning.",
              },
              {
                type: "text",
                content:
                  "One mistake new teachers can sometimes make is to regard students that don't grasp the language well or quickly as slow or stupid. This isn't the case at all, as students could excel in other subjects but not be natural linguists. Another reason a student might not be performing to expectations is because they have a different way of learning than what a teacher offers.",
              },
            ],
          },

          // ── Lesson 10: Adult and Young Learners ───────────────────
          {
            slug: "meth-adult-and-young-learners",
            title: "Adult and Young Learners",
            kind: "lesson",
            duration: "7 min",
            video: {
              videoSrc: "/videos/methodology/unit-1/adult-and-young-learners.mp4",
              downloadable: true,
              transcript: [
                "We're now going to look at adult learners and young learners. As a teacher, you could end up with classes of adults or classes of children, and there are some key differences in the way you go about teaching them. Let's outline some of the factors you'll need to bear in mind.",
                "Nervousness. Nerves can be an issue for some students when getting to grips with English, which is a language they might not be familiar with. Adult learners tend to be more nervous learners, as they are often more anxious about new learning experiences and more concerned about losing face or feeling embarrassed by making mistakes.",
                "Learning experience. Naturally, adult learners will have spent more time in education than younger learners and have more experience of the learning process – but this can bring a lot of baggage with it. Adults might be stuck in their ways about how languages should be learnt or how a lesson should be conducted. You'll find younger learners are much more open to new ideas and teaching methods.",
                "Life experience. Related to the concept of learning experience, adults also have more life experience to bring into the classroom. This can make lessons more interesting and varied, as you can have more detailed conversations and build rapport with them more easily.",
                "Language awareness. Adult learners have a more consolidated sense of how language works for them, and this means they often try to translate new terms in a foreign language into their own. This can create problems, especially where direct translations don't exist! Younger learners usually absorb language from context and usage, the same way they learnt their own language.",
                "Culture and first language. On a similar note, different cultures will have different learning approaches. Asian students, for example, are often noted for being serious about their learning and very respectful, but perhaps more accustomed to plain writing tasks than creative activities.",
                "Behaviour. Unruly students; bad behaviour; discipline issues. Whatever you want to call it, most new teachers worry about these things on some level. Adults tend to have a better attention span than younger learners, but that doesn't mean they're always better behaved.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "As a teacher, you could end up with classes of adults or classes of children, and there are some key differences in the way you go about teaching them.",
              },
              {
                type: "info",
                title: "Key differences to consider:",
                content: [
                  "Nervousness — adults tend to be more anxious about making mistakes.",
                  "Learning experience — adults have more experience but may be set in their ways; younger learners are more open to new methods.",
                  "Life experience — adults bring richer real-world knowledge into the classroom.",
                  "Language awareness — adults often translate; younger learners absorb from context.",
                  "Culture and first language — different cultures approach learning differently.",
                  "Behaviour — adults have longer attention spans but discipline can still be an issue.",
                ],
              },
            ],
          },

          // ── Lesson 11: Student levels ─────────────────────────────
          {
            slug: "meth-student-levels",
            title: "Student levels",
            kind: "activity",
            duration: "6 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Now that we've covered the roles you'll face as a teacher, and taken a look at what affects our students' attitudes to learning English, we're now going to show you the different student ability levels you may end up teaching.",
              },
              {
                type: "text",
                content:
                  "When students join a language school, they are typically given a series of tests to determine their starting English level. There are 7 levels. In general, it will take a student an academic year to progress from one level to another.",
              },
              {
                type: "activity_intro",
                title: "Activity:",
                content:
                  "Here are the 7 levels of study – have a go and see if you can put them into the right order from beginner to most advanced.",
              },
            ],
            activity: {
              type: "activity_sort",
              title: "Order the student levels",
              instruction: "Drag or use the arrows to put these levels in order from beginner to most advanced.",
              items: [
                "Lower intermediate (Pre-intermediate)",
                "Beginner",
                "Proficiency",
                "Upper intermediate",
                "Elementary",
                "Advanced",
                "Intermediate",
              ],
              correctOrder: [
                "Beginner",
                "Elementary",
                "Lower intermediate (Pre-intermediate)",
                "Intermediate",
                "Upper intermediate",
                "Advanced",
                "Proficiency",
              ],
            },
          },

          // ── Lesson 12: Student levels explained ───────────────────
          {
            slug: "meth-student-levels-explained",
            title: "Student levels explained",
            kind: "lesson",
            duration: "8 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "We've shown you what the seven student levels are, but it's time to go into a little more depth about what each level actually entails. Click on each level to find out what the students can do and what they should be learning.",
              },
            ],
            activity: {
              type: "activity_click_reveal",
              title: "Student levels explained",
              instruction: "Click each level to find out what students can do and what they should be learning.",
              items: [
                {
                  id: "beginner",
                  text: "Beginner",
                  isCorrect: true,
                  reveal: "What they can do: Students' knowledge will range from knowing absolutely nothing to having picked up a few words or phrases. They will have no knowledge of how to structure the language correctly. What they should learn: Personal basic information and introductions, colours, numbers 1-100, asking about names and jobs, yes/no questions and short answers, present simple, telling the time.",
                },
                {
                  id: "elementary",
                  text: "Elementary",
                  isCorrect: true,
                  reveal: "What they can do: Improving quickly, getting to grips with basic tenses and able to communicate simply about general topics. There will still be lots of errors. What they should learn: The verb 'to be', basic common adjectives, personal pronouns, possessive adjectives, present simple, articles, past simple, comparatives and superlatives, adverbs of frequency.",
                },
                {
                  id: "lower-intermediate",
                  text: "Lower intermediate (Pre-intermediate)",
                  isCorrect: true,
                  reveal: "What they can do: Can communicate on a range of familiar topics with some confidence. Beginning to use more complex structures. What they should learn: Present perfect, past continuous, modal verbs for ability and possibility, relative clauses, reported speech basics, conditionals (1st).",
                },
                {
                  id: "intermediate",
                  text: "Intermediate",
                  isCorrect: true,
                  reveal: "What they can do: Can hold conversations on a wide range of topics with reasonable fluency. Makes errors but can often self-correct. What they should learn: All past tenses, conditionals (2nd and 3rd), passive voice, reported speech, modal verbs for deduction, complex sentence structures.",
                },
                {
                  id: "upper-intermediate",
                  text: "Upper intermediate",
                  isCorrect: true,
                  reveal: "What they can do: Fluent in most situations, makes occasional errors. Can understand most native-speed speech. What they should learn: Advanced grammar revision, idiomatic expressions, complex writing skills, discourse markers, nuanced vocabulary.",
                },
                {
                  id: "advanced",
                  text: "Advanced",
                  isCorrect: true,
                  reveal: "What they can do: Near-native fluency, understands complex and abstract topics, rarely makes grammatical errors. What they should learn: Nuanced grammar points, advanced writing styles, specialised vocabulary, cultural references and idioms.",
                },
                {
                  id: "proficiency",
                  text: "Proficiency",
                  isCorrect: true,
                  reveal: "What they can do: Effectively equivalent to a native speaker. Can understand virtually everything heard or read and can express themselves fluently and precisely. What they should learn: Highly specialised vocabulary, subtle cultural nuances, advanced academic or professional writing.",
                },
              ],
            },
          },

        ],
      },

      // ── Unit 3: Teaching Structures, Strategies and Methods ──────
      // PDF Unit 2 (pages 33–79). Locked by drip until Unit 2 complete.
      {
        slug: "unit-3-teaching-structures",
        title: "Unit 3: Teaching Structures, Strategies and Methods",
        overview:
          "Learn the PPP and ESA lesson structures and a range of teaching methods so you can plan and deliver engaging, effective lessons for any class.",
        modules: [

          // ── Lesson 1: Welcome to Unit 2 ──────────────────────────
          {
            slug: "meth2-welcome-to-unit-2",
            title: "Welcome to Unit 2",
            kind: "lesson",
            duration: "4 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/welcome-to-unit-2.mp4",
              downloadable: true,
              transcript: [
                "Hi there, and welcome to the second unit! This time we're going to have our first look at how to plan a lesson.",
                "Obviously, you'll need to mould your lesson plans to suit each individual class you teach; bearing in mind the students' ages, the size of the class and lots of other factors that we discussed in Unit 1.",
                "What we're going to show you here are the structures, strategies and the methods that are used in planning an effective lesson, no matter who you are teaching.",
                "In a sense, this bit is hidden from the students, but without it your lessons won't teach the students much and it'll be a lot harder for you to figure out what you're doing when you're up there in front of a class.",
                "Your goal as a teacher is to have students leave the class not only understanding the language points you're teaching them, but feeling confident in using them — so that's why we plan our lessons thoroughly beforehand!",
                "You're going to come across lots of acronyms in this unit: PPP, ESA and STT are just some of them, but don't worry! We're going to teach you all about them so you can deliver fantastic and engaging lessons.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Welcome to Unit 2. This time we're going to have our first look at how to plan a lesson. We'll cover the structures, strategies and methods that are used in planning an effective lesson, no matter who you are teaching.",
              },
            ],
          },

          // ── Lesson 2: Why do we need a structure, strategy or method? ──
          {
            slug: "meth2-why-do-we-need-a-structure",
            title: "Why do we need a structure, strategy or method?",
            kind: "lesson",
            duration: "5 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/why-do-we-need-a-structure.mp4",
              downloadable: true,
              transcript: [
                "Think for a second about what it will be like to teach your first lesson with a real class of students. We know they are there to learn English, and that you are the one responsible for teaching them. But what exactly are you going to do?",
                "Are you going to teach them some grammar or vocabulary, and how are you going to do that? Or maybe you can focus on reading or listening practice instead?",
                "What about engaging the students? How are you going to make sure they pay attention for the whole lesson and understand what you're saying, what they're supposed to do and what they are supposed to learn? How are you going to make sure they're motivated enough and feel like they've improved their English ability at the end of lesson?",
                "All of these questions naturally spring to mind when you first think about teaching, but as challenging as it may seem, a good understanding of lesson planning can just about answer them all.",
                "Lessons can't just be improvised; you need to put careful thought into how to match up the ability of your students and what they need to learn, and do so in a way that's both engaging and educational.",
                "Really successful lessons begin outside of the classroom, when you prepare the plans for them. That's why we're going to teach you all about structures, strategies and methods that will make this all become clear to you.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Lessons can't just be improvised. You need to put careful thought into how to match up the ability of your students and what they need to learn, and do so in a way that's both engaging and educational.",
              },
              {
                type: "text",
                content:
                  "Really successful lessons begin outside of the classroom, when you prepare the plans for them. That's why we're going to teach you all about structures, strategies and methods.",
              },
            ],
          },

          // ── Lesson 3: What structures, strategies or methods can we use? ─
          {
            slug: "meth2-what-structures-can-we-use",
            title: "What structures, strategies or methods can we use?",
            kind: "lesson",
            duration: "5 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/what-structures-can-we-use.mp4",
              downloadable: true,
              transcript: [
                "There are a number of lesson preparation structures, strategies and methods that we can use in the classroom — but they all have the same end goal: to get the students to use the language for themselves!",
                "For many years, the approach in schools was for the teacher to use the language, leaving the students to listen attentively and take notes to build their awareness of grammar, vocabulary and so on.",
                "You'll understand though that you won't learn a language effectively by listening to just one person using it, you'll need to use it for yourself!",
                "All of the approaches to lesson planning that we'll show you have that student-centred approach in common — helping the student speak, read, write, listen and eventually think in English.",
                "All students learn in different ways depending on their ability, their culture and even their personalities, so the structures, strategies and methods we'll use are eclectic by nature so we can adapt what we do to the students' own needs.",
                "We'll now look at two of the structures you can use: PPP and ESA. The way we use these structures will focus on teaching grammar and vocabulary but we'll cover how to plan reading, writing, listening and speaking lessons later on in the course.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "There are a number of lesson preparation structures, strategies and methods that we can use in the classroom — but they all have the same end goal: to get the students to use the language for themselves.",
              },
              {
                type: "text",
                content:
                  "We'll now look at two of the structures you can use: PPP and ESA. The way we use these structures will focus on teaching grammar and vocabulary, but we'll cover how to plan reading, writing, listening and speaking lessons later on in the course.",
              },
            ],
          },

          // ── Lesson 4: PPP lesson structure: Introduction ──────────
          {
            slug: "meth2-ppp-introduction",
            title: "PPP lesson structure: Introduction",
            kind: "lesson",
            duration: "4 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/ppp-introduction.mp4",
              downloadable: true,
              transcript: [
                "We're going to start by showing you the PPP lesson plan structure, which is a great method for new teachers as it is flexible enough to work for any lesson and any type of student.",
                "You could use it for: teaching animal vocabulary to beginners, the present perfect simple tense to pre-intermediate students, or idioms to advanced learners. The PPP method works for them all.",
                "PPP stands for the key stages of the lesson: presentation, practice and production, which we'll explain more to you in the following pages.",
                "The PPP format is ideal for guiding students towards using the target language themselves, progressing from controlled exercises to free practices.",
                "This lesson format also maximises STT (student talking time), as the students are the ones that need the practice, not you!",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "PPP stands for the key stages of the lesson: Presentation, Practice and Production. It is a great method for new teachers as it is flexible enough to work for any lesson and any type of student.",
              },
              {
                type: "text",
                content:
                  "The PPP format is ideal for guiding students towards using the target language themselves, progressing from controlled exercises to free practices. It also maximises STT (student talking time).",
              },
            ],
          },

          // ── Lesson 5: PPP lesson structure (click-reveal) ─────────
          {
            slug: "meth2-ppp-structure",
            title: "PPP lesson structure",
            kind: "lesson",
            duration: "8 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "We're now going to outline what is included in each stage of a PPP lesson. Click each stage to learn what it involves.",
              },
              {
                type: "info",
                title: "The PPP lesson at a glance:",
                content: [
                  "Lead-in: 5% of lesson time — grab students' attention and introduce the topic.",
                  "Presentation: 10–30% — teach Meaning, Pronunciation and Form of the target language.",
                  "Practice (controlled): 20–30% — structured activities focused on accuracy.",
                  "Production (free): 30–50% — fluency activities where students use the language freely.",
                ],
              },
            ],
            activity: {
              type: "activity_click_reveal",
              title: "PPP stages explained",
              instruction: "Click each stage to reveal what it involves.",
              items: [
                {
                  id: "lead-in",
                  text: "Lead-in",
                  isCorrect: true,
                  reveal: "This first stage of the lesson is vital in grabbing the students' attention and engaging them from the get-go. Here you will discover what they already know about the TL (target language) and warm them up for the lesson. The goal here isn't to teach the students anything new — that happens later. This simply sets the scene for the topics we're going to present using the new language. You should be only spending up to 5% of the lesson on this stage.",
                },
                {
                  id: "presentation",
                  text: "Presentation",
                  isCorrect: true,
                  reveal: "Either you or the students will start using the TL here and we need to teach three different things: 1. Meaning — find a way for students to discover the meaning themselves (guided discovery). 2. Pronunciation — drill the students so they get a feel for pronouncing what you're teaching. 3. Form — write the new phrase or word on the board so students can see how it is built or spelled. This stage should take up about 10–30% of the full lesson. Around 50% of it will be you explaining the language, but you should aim to involve students through eliciting and building on prior knowledge.",
                },
                {
                  id: "practice",
                  text: "Practice (controlled)",
                  isCorrect: true,
                  reveal: "Here students practise using the language they have learnt through structured activities that look at the meaning, pronunciation and form of the TL. This should be done with as few mistakes as possible, with the focus of this stage being on accuracy rather than fluency. Activities you can use here could include pair work, with writing and speaking exercises to fill in sentence gaps or fix incorrect sentences. This stage should take up 20–30% of the total lesson time, and be as student-centred as possible. About 60–80% of this stage should be made up of student talking time (STT).",
                },
                {
                  id: "production",
                  text: "Production (free)",
                  isCorrect: true,
                  reveal: "This stage continues on from the practice stage, and you can reach this stage when you're happy that the students have grasped what you have presented and have practised it with little difficulty. The activities in the production stage allow them to practise their new TL with all their previous knowledge of English brought in. This will help them feel more natural using what they've learned, which is the focus of this stage. We are now aiming to improve students' fluency rather than their accuracy. The production stage should take up about 30–50% of the full lesson, or as long as you have left. The STT here should be about 90%.",
                },
              ],
            },
          },

          // ── Lesson 6: PPP Lead-in classroom example ───────────────
          {
            slug: "meth2-ppp-lead-in-example",
            title: "PPP lesson: Lead-in classroom example",
            kind: "lesson",
            duration: "6 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/ppp-lead-in-classroom-example.mp4",
              downloadable: true,
              transcript: [
                "OK, so ladies and gentlemen, good afternoon once again. I want to talk about holidays. Do you know what I mean by holiday?",
                "Holiday — take a rest, relaxing.",
                "Visit to different country.",
                "We visit different countries, we travel. So, as I have a picture of a globe on the board, I'm going to talk about holidays today, shall we?",
                "So Rapha, where would you like to visit? I would like to visit Japan.",
                "Japan — sounds like a good plan. Frankie, where do you dream of visiting? Thailand.",
                "Thailand — it's a nice place to visit. Elizabeth, what would you like to visit? Australia!",
                "Australia! You would like to visit Australia and hang out with koalas and kangaroos. Great place.",
                "I would love to go to Tibet, and climb the Himalayas.",
                "Oh blimey! Tibet and climb the Himalayas, that sounds like a plan.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This classroom video shows a lead-in stage of a PPP lesson. Notice how the teacher gets students engaged and talking about the topic (holidays) before any new language is introduced. The goal is to warm up the students and find out what they already know.",
              },
            ],
          },

          // ── Lesson 7: PPP Presentation classroom example ──────────
          {
            slug: "meth2-ppp-presentation-example",
            title: "PPP lesson: Presentation classroom example",
            kind: "lesson",
            duration: "8 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/ppp-presentation-classroom-example.mp4",
              downloadable: true,
              transcript: [
                "A place I would like to visit is — can you see this island I'm pointing at, just to the right of Africa? Does anyone know the name of this country? Madagascar?",
                "Madagascar it is! Very good, Rafa. So, have you heard of Madagascar? No. Yes.",
                "You have heard of Madagascar. So tell us about Madagascar.",
                "Madagascar is a big island. And they have some animals called lemurs?",
                "They do. And they have loads of spices.",
                "Now, I've never visited Madagascar. But it's a dream. One day, I want to go to Madagascar. So, some of us have heard of Madagascar.",
                "So, we're about to look at something called the second conditional. When we're talking about conditionals, all we're talking about are dreams, things that we're imagining. So they're not the past. They're not the present. They're not the future. They are just inside our heads.",
                "So if Innes visited Madagascar, she would see a lemur. So let's try some of our own.",
                "If I visited Australia, I would walk along a forest.",
                "If I visited Brazil, I would be a part of a street festival.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This classroom video shows the presentation stage of a PPP lesson. The teacher introduces the second conditional using a real-world context (imaginary holidays). Notice how the teacher elicits responses from students and uses guided discovery rather than simply explaining the grammar rule.",
              },
            ],
          },

          // ── Lesson 8: PPP Practice (controlled) example 1 ─────────
          {
            slug: "meth2-ppp-practice-example-1",
            title: "PPP lesson: Practice (controlled) example 1",
            kind: "lesson",
            duration: "7 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/ppp-practice-controlled-example-1.mp4",
              downloadable: true,
              transcript: [
                "So we're going to try one more thing. We're going to play a little game. And our game is, you see what Katie has around her neck, do you know what it's called? A necklace.",
                "Or another word for a necklace, is it a — chain.",
                "A chain. It's a kind of jewelry, yes. So it's a chain. So we're going to play a chain game. A chain game.",
                "We're going to make up a chain with words. OK. So I'm going to say something, and to finish our chain, you're going to add to it.",
                "So I'm going to start something with 'if'. You're going to take my thing with the 'if' and add a word to it.",
                "So I'll start again. If I were a koala, I would sleep 18 hours a day.",
                "If I slept eight hours a day, I wouldn't eat lot.",
                "If I would eat a lot, I would be fat. If I would be fat, I would be slow.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This classroom video shows controlled practice of the second conditional. The teacher uses a chain game — a structured activity where students build on each other's sentences using 'if + would'. Notice how the focus is on accuracy, with the teacher gently correcting errors.",
              },
            ],
          },

          // ── Lesson 9: PPP Practice (controlled) example 2 ─────────
          {
            slug: "meth2-ppp-practice-example-2",
            title: "PPP lesson: Practice (controlled) example 2",
            kind: "lesson",
            duration: "6 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/ppp-practice-controlled-example-2.mp4",
              downloadable: true,
              transcript: [
                "So let's do a little practice exercise. In fact, for our practice exercise, why don't we stand up for it? Do you know what a superhero is? Like Superman? Batman?",
                "So Batman is a superhero. Can you think of other superheroes? Spider-Man. Ironman. Catwoman.",
                "So I want you to imagine, I want you to make up your own superhero. Give him or her any name you'd like.",
                "Fair-Woman. Invisible-Woman.",
                "So you're Fair-Woman. So we have Fair-Woman, we've got the Invisible Woman.",
                "Every superhero has special powers. So Spider-Man has special powers. He can catch people. He can fly on the sky.",
                "So now tell me, if you were Invisible Lady, I would... and if I were Iceman, I would...",
                "If I had money enough, I would open an animal shelter.",
                "If I were Firewoman, I would destroy the places where they do bullfighting.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This second controlled practice example uses a superhero activity to get students using the second conditional in a fun, creative context. Students invent their own superhero and describe what they would do using 'If I were..., I would...'",
              },
            ],
          },

          // ── Lesson 10: PPP Production (free) example ──────────────
          {
            slug: "meth2-ppp-production-example",
            title: "PPP lesson: Production (free) example",
            kind: "lesson",
            duration: "8 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/ppp-production-free-example.mp4",
              downloadable: true,
              transcript: [
                "So let's do a role play activity. I'm going to give each of you a card with a problem on it.",
                "'I bought an iPhone 7, but lost it the next day.' OK. Let's hear your conversation.",
                "Well, if I would have to — bought an iPhone 7 but lost it the next day, I would be devastated.",
                "But if I had insurance, I would buy — take another one.",
                "Yeah. Then if I wouldn't have an insurance, I would force myself to try to find a phone.",
                "Good luck for you.",
                "Very good. OK. So Rafa, what was on your card, please? 'My boss heard me say I didn't like him.'",
                "So what would you say if your boss heard that you didn't like him? I would tell boss we need communication.",
                "Then he would be — understand why I said I didn't like him.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This production stage example shows students using the second conditional freely in a role play. Each student has a card with a problem and must discuss what they would do. Notice the teacher's focus is on fluency — encouraging students to communicate, not correcting every mistake.",
              },
            ],
          },

          // ── Lesson 11: ESA lesson structure: Introduction ──────────
          {
            slug: "meth2-esa-introduction",
            title: "ESA lesson structure: Introduction",
            kind: "lesson",
            duration: "4 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/esa-introduction.mp4",
              downloadable: true,
              transcript: [
                "Now we're familiar with one type of lesson planning, PPP, let's look at another type: ESA.",
                "ESA stands for Engage, Study, Activate, and while broadly similar to the PPP lesson structure, it allows you to move backwards and forwards between stages if you need to, unlike PPP.",
                "We use ESA to focus on grammar and vocabulary lessons, as it can be useful to allow for lots of eliciting, which creates high levels of STT.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "ESA stands for Engage, Study, Activate. While broadly similar to the PPP lesson structure, it allows you to move backwards and forwards between stages if you need to, unlike PPP. We use ESA to focus on grammar and vocabulary lessons.",
              },
            ],
          },

          // ── Lesson 12: ESA lesson structure (click-reveal) ─────────
          {
            slug: "meth2-esa-structure",
            title: "ESA lesson structure",
            kind: "lesson",
            duration: "6 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Let's break down what the Engage, Study and Activate stages actually mean. Click each stage to find out.",
              },
              {
                type: "text",
                content:
                  "Remember: unlike PPP, you can go backwards and forwards between ESA stages during a lesson. ESA is more flexible than PPP, so remember it can come in handy for certain types of lesson.",
              },
            ],
            activity: {
              type: "activity_click_reveal",
              title: "ESA stages explained",
              instruction: "Click each stage to reveal what it means.",
              items: [
                {
                  id: "engage",
                  text: "Engage",
                  isCorrect: true,
                  reveal: "In this stage, the teacher gets the students interested and involved in the lesson so that it is more stimulating and fun. By reducing inhibitions and relaxing students, it creates an environment that is more conducive to learning. It is essential that students engage with the topic and the target language (TL) here, as they will be working with it in other stages of the lesson. Use: games, discussions, music, pictures, stories, etc.",
                },
                {
                  id: "study",
                  text: "Study",
                  isCorrect: true,
                  reveal: "Here, students focus on the language and how it is constructed. The teacher will elicit the TL from students and give them the chance to discover it for themselves. Use: eliciting questions/tasks, group and pair work, texts to study vocabulary or speaking styles, etc.",
                },
                {
                  id: "activate",
                  text: "Activate",
                  isCorrect: true,
                  reveal: "Students should be encouraged at this stage to use any English they know, using it as freely and communicatively as possible. The focus here is more on fluency than accuracy, as there are no restrictions on language use. Use: role plays, communication games, debates, discussions, story writing, etc.",
                },
              ],
            },
          },

          // ── Lesson 13: ESA classroom example ──────────────────────
          {
            slug: "meth2-esa-classroom-example",
            title: "ESA lesson: Classroom example",
            kind: "lesson",
            duration: "10 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/esa-classroom-example.mp4",
              downloadable: true,
              transcript: [
                "Good afternoon, ladies and gentlemen. Did you enjoy your lunch? Today, I'm going to be talking about health and lifestyle. Things we do that are good for us, things with you that are not good for us.",
                "So I'm going to tell you a little about my lifestyle, how I spend my time. I like this stuff. It's an Easter egg. I really, really like you guys like this. Pizza. I like pizza.",
                "Is drinking a lot healthy? If you drink water, if it's water, it is healthy. But if it is something like cider, it would be unhealthy.",
                "So now what I want you to do is I'd like you to go through your text and I want you to underline any example of anything healthy.",
                "Join the gym. Yes, that is mentioned somewhere. Yes, I'm going to join the gym.",
                "Fruits and vegetables. Yes, he mentions those. I'm going to eat five portions of fruits and vegetables.",
                "Stop smoking. I'm going to stop smoking. Drink water and fresh juice.",
                "So all your pieces of paper, you have a number of questions. Do you have a healthy lifestyle? Do you want to do things differently in your life? And they're designed for you to have an interview.",
                "So for the first time round, I want one of you to present you are very unhealthy. The other one needs to be healthy.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This classroom video shows a full ESA lesson in action on the topic of health and lifestyle. Notice how the teacher moves between Engage (discussion about food and health), Study (reading a text to identify 'going to' structures) and Activate (role-play conversations between healthy and unhealthy students).",
              },
            ],
          },

          // ── Quiz: PPP & ESA ────────────────────────────────────────
          {
            slug: "meth2-ppp-esa-quiz",
            title: "PPP & ESA: Quiz",
            kind: "quiz",
            duration: "6 min",
            activity: {
              type: "quiz_true_false",
              title: "PPP & ESA: True or False",
              passPercent: 70,
              questions: [
                {
                  id: "ppp-esa-q1",
                  question: "You should always use a structure, strategy or method to prepare your lessons.",
                  correctAnswer: true,
                  explanation: "True — a good structure ensures your lessons are purposeful, engaging and effective. Improvising rarely produces the best results.",
                },
                {
                  id: "ppp-esa-q2",
                  question: "You can teach and practise anything with your students using PPP or ESA.",
                  correctAnswer: true,
                  explanation: "True — both PPP and ESA are flexible enough to be used for grammar, vocabulary, functional language and more.",
                },
                {
                  id: "ppp-esa-q3",
                  question: "ESA and PPP lesson structures are the same.",
                  correctAnswer: false,
                  explanation: "False — while similar in aim, ESA allows you to move backwards and forwards between stages, whereas PPP follows a fixed order.",
                },
                {
                  id: "ppp-esa-q4",
                  question: "PPP has just 3 stages — presentation, practice, production.",
                  correctAnswer: false,
                  explanation: "False — PPP has 4 stages: Lead-in, Presentation, Practice (controlled), and Production (free).",
                },
                {
                  id: "ppp-esa-q5",
                  question: "With ESA it is essential to grab the students' interest and attention straight away.",
                  correctAnswer: true,
                  explanation: "True — the Engage stage at the start of an ESA lesson is vital for getting students interested and creating a relaxed, stimulating environment.",
                },
                {
                  id: "ppp-esa-q6",
                  question: "With PPP you can move backwards and forwards through the stages.",
                  correctAnswer: false,
                  explanation: "False — PPP follows a fixed order. It is ESA that allows movement backwards and forwards between stages.",
                },
                {
                  id: "ppp-esa-q7",
                  question: "It is important to elicit in both the PPP and ESA methods.",
                  correctAnswer: true,
                  explanation: "True — eliciting keeps lessons student-centred in both methods, drawing out language and knowledge from students rather than simply telling them.",
                },
                {
                  id: "ppp-esa-q8",
                  question: "With PPP you do controlled activities like gap fills and error correction, followed by free activities like role plays and discussions.",
                  correctAnswer: true,
                  explanation: "True — the Practice stage uses controlled activities focused on accuracy, while the Production stage uses freer activities focused on fluency.",
                },
                {
                  id: "ppp-esa-q9",
                  question: "You should only use these lesson plan structures to teach grammar.",
                  correctAnswer: false,
                  explanation: "False — PPP and ESA can be used to teach vocabulary, functional language, speaking and more, not just grammar.",
                },
                {
                  id: "ppp-esa-q10",
                  question: "One of these methods is better than the other.",
                  correctAnswer: false,
                  explanation: "False — neither PPP nor ESA is superior. Each suits different types of lessons and different teaching situations. The best teachers use both.",
                },
              ],
            },
          },

          // ── Lesson 14: Other teaching methods ─────────────────────
          {
            slug: "meth2-other-teaching-methods",
            title: "Other teaching methods",
            kind: "lesson",
            duration: "8 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Structures are the ways in which we build our lesson plans, but methods are just as important — as these are the ways in which we deliver those plans. We're going to outline some of the more important methods that you might want to use when teaching to add variety to your lessons, or focus on particular areas with your students.",
              },
            ],
            activity: {
              type: "activity_click_reveal",
              title: "Teaching methods",
              instruction: "Click each method to find out what it involves and when to use it.",
              items: [
                {
                  id: "task-based",
                  text: "Task-based learning",
                  isCorrect: true,
                  reveal: "This method focusses more on a task than the language. Students are given a task to complete in English. After they have completed the task, the teacher can then provide some language study to help clear up any problems they ran into. This method can be very effective as it engages the students' imagination by letting them solve a problem and complete their task, whilst using English to do so. It's also great for building co-operation in a class. Useful for: applied learning, engaging students' imagination, building vocabulary.",
                },
                {
                  id: "clt",
                  text: "Communicative Language Teaching",
                  isCorrect: true,
                  reveal: "This method stresses the importance of language functions (e.g. agreeing, inviting, suggesting, etc.) as opposed to reliance on grammar and vocabulary alone. Communicative Language Teaching suggests that if students have enough exposure to the language and opportunity to use it, they will be able to learn the language through this alone. Activities typically require students to use the TL in real-life situations, so this is best suited to role plays and simulations. There is far more emphasis on the completion of the task than the accuracy of the language. Useful for: Business English, everyday use.",
                },
                {
                  id: "cll",
                  text: "Community Language Learning",
                  isCorrect: true,
                  reveal: "This method involves students deciding what to talk about themselves and building their knowledge around that. It normally involves students sitting in a circle discussing things they want to, with the teacher outside the circle and helping when necessary with problems the students have during the discussion. These are student-centred activities that let students learn the topics and language they want to while the teacher can focus on what the students need. This can make a nice change for your class and is more effective for mid-level and higher-level students. Useful for: letting students control their learning, building vocabulary, refreshing classes.",
                },
                {
                  id: "minimal-ttt",
                  text: "Minimal TTT",
                  isCorrect: true,
                  reveal: "This method is where the teacher speaks as little as possible, letting students be the focus. Having as much STT as possible allows the students to discover the language for themselves. Teachers can find this unnatural in application, but this can be overcome by starting the lesson with the students discovering a grammar point and letting the students discuss it among themselves. The teacher should only intervene when no-one can answer. Useful for: improving students' confidence, discovering language points.",
                },
              ],
            },
          },

          // ── Lesson 15: Which structure or method should you use? ───
          {
            slug: "meth2-which-structure-to-use",
            title: "Which structure or method should you use?",
            kind: "lesson",
            duration: "5 min",
            video: {
              videoSrc: "/videos/methodology/unit-2/which-structure-to-use.mp4",
              downloadable: true,
              transcript: [
                "Hi there, we've now looked at some of the structures and methods that are available to you when you start teaching, but you might now be wondering: which ones should I actually use?",
                "Most teachers have used a range of the methods and structures at some point or another. You may start doing a PPP lesson with a communicative format, but you can decide to adopt some of the other methods to make your lessons more interesting and varied for your students.",
                "Whatever you do, make sure you choose a structure and prepare a proper lesson plan before going into the classroom. This plan is your single most important tool as a teacher, as it will give you the confidence to step in front of the class and know what you're talking about. It also makes sure that your students aren't subjected to a chaotic, ineffective lesson.",
                "Before you start thinking about what you want to teach a class, remember the things you need to know: the students' level, their reasons for learning English and, of course, the length of the lesson.",
                "You'll then decide what the subject of the lesson will be: whether it is vocabulary, functional phrases, a grammar point or a tense.",
                "Then once you're in the class, it'll be a piece of cake! You will lead the students in to the lesson and warm them up. Then you give them the language you want to teach and let them practise to see if they understand.",
                "Use your structures and methods right, and teaching will be as simple as PPP. Or ESA!",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Most teachers use a range of methods and structures. Whatever you do, make sure you choose a structure and prepare a proper lesson plan before going into the classroom. This plan is your single most important tool as a teacher.",
              },
              {
                type: "text",
                content:
                  "Before you start thinking about what you want to teach, remember the key things you need to know: the students' level, their reasons for learning English and the length of the lesson. Then decide the subject — vocabulary, functional phrases, a grammar point or a tense.",
              },
            ],
          },

          // ── Quiz: End of Unit 2 ────────────────────────────────────
          {
            slug: "meth2-end-of-unit-quiz",
            title: "Unit 2: End of Unit Quiz",
            kind: "quiz",
            duration: "8 min",
            activity: {
              type: "quiz_multiple_choice",
              title: "Unit 2: End of Unit Quiz",
              passPercent: 70,
              questions: [
                {
                  id: "u2-q1",
                  question: "Which stage of a PPP lesson is the teacher showing the students in the following scenario: The teacher writes 'I would go to Japan if I could' on the board and explains what each part means.",
                  options: [
                    { id: "a", text: "Lead-in" },
                    { id: "b", text: "Presentation" },
                    { id: "c", text: "Practice (controlled)" },
                    { id: "d", text: "Production (free)" },
                  ],
                  correctAnswerId: "b",
                  explanation: "Writing the target language on the board and explaining its meaning, pronunciation and form is the Presentation stage.",
                },
                {
                  id: "u2-q2",
                  question: "A teacher asks students to discuss in pairs where they would travel if they had unlimited money. Which stage of a PPP lesson is this?",
                  options: [
                    { id: "a", text: "Lead-in" },
                    { id: "b", text: "Presentation" },
                    { id: "c", text: "Practice (controlled)" },
                    { id: "d", text: "Production (free)" },
                  ],
                  correctAnswerId: "d",
                  explanation: "Asking students to use the language freely in a discussion is the Production (free) stage — focus is on fluency, not accuracy.",
                },
                {
                  id: "u2-q3",
                  question: "A teacher starts the lesson by showing pictures of different countries and asking students which they have visited. Which stage is this?",
                  options: [
                    { id: "a", text: "Lead-in" },
                    { id: "b", text: "Presentation" },
                    { id: "c", text: "Practice (controlled)" },
                    { id: "d", text: "Production (free)" },
                  ],
                  correctAnswerId: "a",
                  explanation: "Using pictures to engage students and warm them up before any new language is introduced is the Lead-in stage.",
                },
                {
                  id: "u2-q4",
                  question: "Students fill in gaps in sentences using the correct form of the second conditional. Which stage is this?",
                  options: [
                    { id: "a", text: "Lead-in" },
                    { id: "b", text: "Presentation" },
                    { id: "c", text: "Practice (controlled)" },
                    { id: "d", text: "Production (free)" },
                  ],
                  correctAnswerId: "c",
                  explanation: "A gap fill exercise focused on accurate use of the target language is the Practice (controlled) stage.",
                },
                {
                  id: "u2-q5",
                  question: "What does ESA stand for?",
                  options: [
                    { id: "a", text: "Engage, Study, Activate" },
                    { id: "b", text: "Explain, Study, Apply" },
                    { id: "c", text: "Engage, Speak, Assess" },
                    { id: "d", text: "Elicit, Study, Activate" },
                  ],
                  correctAnswerId: "a",
                  explanation: "ESA stands for Engage, Study, Activate.",
                },
                {
                  id: "u2-q6",
                  question: "What is the key difference between PPP and ESA?",
                  options: [
                    { id: "a", text: "ESA is only used for vocabulary lessons" },
                    { id: "b", text: "PPP has more stages than ESA" },
                    { id: "c", text: "ESA allows you to move backwards and forwards between stages" },
                    { id: "d", text: "PPP creates more student talking time than ESA" },
                  ],
                  correctAnswerId: "c",
                  explanation: "The key difference is flexibility — ESA allows movement between stages, whereas PPP follows a fixed order.",
                },
                {
                  id: "u2-q7",
                  question: "Which teaching method involves students sitting in a circle deciding what they want to discuss, while the teacher assists from outside?",
                  options: [
                    { id: "a", text: "Task-based learning" },
                    { id: "b", text: "Communicative Language Teaching" },
                    { id: "c", text: "Community Language Learning" },
                    { id: "d", text: "Minimal TTT" },
                  ],
                  correctAnswerId: "c",
                  explanation: "Community Language Learning involves students choosing their own topics in a circle, with the teacher helping from the outside.",
                },
                {
                  id: "u2-q8",
                  question: "Which teaching method focuses on a task first, with language study following afterwards to address any issues?",
                  options: [
                    { id: "a", text: "Minimal TTT" },
                    { id: "b", text: "Task-based learning" },
                    { id: "c", text: "Communicative Language Teaching" },
                    { id: "d", text: "Community Language Learning" },
                  ],
                  correctAnswerId: "b",
                  explanation: "Task-based learning has students complete a task first, then the teacher provides language study to address any problems encountered.",
                },
              ],
            },
          },

        ],
      },

      // ── Unit 4: Activities in the Classroom ──────────────────────
      // PDF Unit 3 (pages 80–110). Locked by drip until Unit 3 complete.
      {
        slug: "unit-4-activities-in-the-classroom",
        title: "Unit 4: Activities in the Classroom",
        overview:
          "Learn how to make grammar lessons fun and engaging using songs, games, stories and real-life situations, and how to give clear instructions and concept-check effectively.",
        modules: [

          // ── Lesson 1: Welcome to Unit 3 ──────────────────────────
          {
            slug: "meth3-welcome-to-unit-3",
            title: "Welcome to Unit 3",
            kind: "lesson",
            duration: "4 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/welcome-to-unit-3.mp4",
              downloadable: true,
              transcript: [
                "Hi there, and welcome to the next unit in your methodology course. We've already learnt about the role of the teacher and the students in the classroom, and we've also looked at some of the lesson plan structures and methods you can use to create fantastic lessons.",
                "For Unit 3 we're going to focus on the actual activities you'll be using in class, in particular when presenting grammar. We're going to show you that even though students might think it's a boring subject, you can make fun, engaging and educational lessons if you choose the right activities.",
                "We're also going to look at some other activities you can use for other topics, and how to make sure you set up your activities correctly so that it's clear to the students what they're supposed to be doing.",
                "Good activities will make your job as a teacher a whole lot easier, and give your students a head-start with their learning of English. So, let's find out some more!",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Welcome to Unit 3. We're going to focus on the actual activities you'll be using in class — how to make grammar fun, how to give clear instructions, and how to check students really understand what you've taught.",
              },
            ],
          },

          // ── Lesson 2: Teaching grammar ────────────────────────────
          {
            slug: "meth3-teaching-grammar",
            title: "Teaching grammar",
            kind: "lesson",
            duration: "7 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/teaching-grammar.mp4",
              downloadable: true,
              transcript: [
                "The first thing we're going to look at in this unit is how to teach grammar. For this, we're going to use the PPP structure we looked at in the last unit. Let's have a quick recap on what we need to include.",
                "To start with, we'll have the lead-in. We want to grab students' attention and find out what they already know about the grammar points we're going to teach. We also want to warm them up so they're ready to learn.",
                "What you can do here perhaps is act out a conversation, tell a story or use flashcards to elicit the target language from the students that know it already. Make sure to get everyone involved here or you'll lose their attention early on!",
                "Next up is the presentation stage. This is also called the teaching stage, as this is where you'll go through the actual process of sharing knowledge with the students. Once you know what the students know already, you can start covering the meaning or use of the grammar point, going over the pronunciation that the construct uses and then explaining the form it takes.",
                "Remember to elicit here as much as possible to see if they know the grammar rules already, rather than just telling them.",
                "Once you've covered the meaning, then pronunciation, then showed them the form or grammatical structure, it's time to move onto concept checking. This is where you ask students questions to test if they have really understood the topic.",
                "After that it's time for you to let the students use the language you've taught them! The practice stage will have some controlled activities so you can check what they have learnt in the presentation stage.",
                "The final stage is the production stage. This is where you use a free activity where the students can use the target language more naturally. This should be mainly a speaking activity, like a role play game, or a discussion or maybe a chain story.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Teaching grammar follows the PPP structure. The lead-in warms students up and elicits what they already know. The presentation covers meaning, pronunciation and form. Concept checking confirms understanding. Practice gives controlled activities. Production gives free activities.",
              },
            ],
          },

          // ── Lesson 3: Teaching grammar: Points to remember ────────
          {
            slug: "meth3-grammar-points-to-remember",
            title: "Teaching grammar: Points to remember",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "When you teach a grammar lesson, there are some key things you need to remember to make sure that the students understand what you're teaching and feel engaged in the topic too.",
              },
              {
                type: "info",
                title: "Nine rules to remember when you teach grammar:",
                content: [
                  "1. Allow plenty of time for students to write down and memorise the grammatical structure being used.",
                  "2. Avoid mixing the target structure with other structures too much.",
                  "3. Personalise the TL by using real examples that relate to the students' lives and experiences.",
                  "4. Keep checking the students have fully understood the structure.",
                  "5. Teach meaning and pronunciation before form.",
                  "6. Elicit first, don't dictate the grammar rules to students.",
                  "7. Use examples rather than long explanations.",
                  "8. Use practice activities to consolidate and fix the language in your students' minds.",
                  "9. Avoid overly complicated vocabulary as this could distract from the TL.",
                ],
              },
            ],
          },

          // ── Lesson 4: Making grammar fun ──────────────────────────
          {
            slug: "meth3-making-grammar-fun",
            title: "Making grammar fun",
            kind: "lesson",
            duration: "5 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/making-grammar-fun.mp4",
              downloadable: true,
              transcript: [
                "Unless your students are passionate about linguistics and language, most of them probably won't choose grammar as their favourite subject of their English lessons.",
                "However, in other schools teaching grammar will be an essential part of the curriculum. In these schools, grammar can often be a big part of students' exams, and if that's the case then it's going to be crucial that you teach them about the different points they could be tested on so that they can do well.",
                "Teaching grammar doesn't have to be dull, you just need to remember that students will have their own learning styles — some taking a more analytical approach where they work things out themselves, while others like to be led by the teacher.",
                "To add variety into your lesson, you can use different games or use grammar in real-life situations. You could use songs or stories to involve students in a more cultural way.",
                "However you want to go about it — there's lots of opportunity for you to teach grammar to your students in both an effective and fun way. So let's show you how it's done!",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Teaching grammar doesn't have to be dull. To add variety, you can use games, real-life situations, songs or stories. There are four main categories of resources you can use: songs, games, stories and real-life situations.",
              },
            ],
          },

          // ── Activity: Using resources (timer) ─────────────────────
          {
            slug: "meth3-using-resources",
            title: "Using resources",
            kind: "activity",
            duration: "4 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Resources don't have to be boring worksheets full of rules and examples — they can be living things that students will come across in their day-to-day lives. There are four main categories you can use in the classroom to make grammar lessons more fun: songs, games, stories and real-life situations.",
              },
              {
                type: "activity_intro",
                title: "Activity:",
                content:
                  "Take a minute and think of two different ways you could use each resource in a grammar lesson. Remember to think about what the focus of the lesson would be, and what topic you would be teaching or practising.",
              },
            ],
            activity: {
              type: "activity_timer",
              title: "Activity",
              prompt: "How can you use songs, games, stories and real-life situations as resources?",
              durationSeconds: 120,
            },
          },

          // ── Lesson 5: Using songs ─────────────────────────────────
          {
            slug: "meth3-using-songs",
            title: "Using songs",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Songs are a fantastic way of introducing students to grammar points, as these can allow students to connect knowledge they already have with new target language, and allow them to access and enjoy more songs in English.",
              },
              {
                type: "info",
                title: "Four easy ways to use songs in your grammar lessons:",
                content: [
                  "Choose a song that mainly uses a single grammar structure or one that uses several different tenses or grammar points. Students can identify and practise these by looking at the lyrics or listening to the song.",
                  "Get students to listen out for particular language points in the song, e.g. adjectives, adverbs. Now get them to replace them with synonyms or antonyms and try out how the song sounds then.",
                  "Do a lyrics gap fill activity and take out all of the verbs. Students can then listen and fill in the verbs with the correct form. You could get them to predict which verbs are missing first too.",
                  "Choose individuals to say or sing a verse from the song but change the tense. This way they can practise using different tenses and verb forms, but in a more light-hearted way.",
                ],
              },
            ],
          },

          // ── Lesson 6: Teaching grammar using songs: Classroom example ─
          {
            slug: "meth3-songs-classroom-example",
            title: "Teaching grammar using songs: Classroom example",
            kind: "lesson",
            duration: "8 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/songs-classroom-example.mp4",
              downloadable: true,
              transcript: [
                "OK guys. So now we're going to listen to a song. You know them? You do? OK great. The song is called 'All My Loving.' I'm going to hand you out the lyrics. But some of the lyrics have gaps missing.",
                "So you need a pen, one each. Everyone got a pen? OK. Yeah, you can look now. Just have 30 seconds just to quickly look through. Think about what you're listening for. OK. So now we're going to listen.",
                "And what you have to do with the gaps? Fill them in with anything you want or what you hear. And what tense are we going to be looking out for? Future simple.",
                "OK. Fantastic. [MUSIC PLAYS]",
                "Did we get it? Yeah? OK. Let's go through quickly then. So we'll start over here. We'll do line by line. OK. Let's see if we missed any.",
                "Close my eyes and I'll kiss you. Good. Was it close my eyes and I — I'll. I'll. Lovely. Well done.",
                "Tomorrow I'll miss you. Tomorrow — I will miss. I'll miss you. Remember I'll always be true.",
                "I'll write home every day. And I will send all my loving to you.",
                "OK. So it's the future simple — I will, I'll. The contraction is I'll.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This classroom video shows a songs-based grammar lesson using a gap fill activity. Students listen to a song and fill in missing verbs in the future simple tense. Notice how the teacher uses the song to make grammar practice engaging and memorable.",
              },
            ],
          },

          // ── Lesson 7: Using games ─────────────────────────────────
          {
            slug: "meth3-using-games",
            title: "Using games",
            kind: "lesson",
            duration: "6 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Games are a classic way of injecting some fun into lessons, and there are thousands of variations of common games that you can use to liven up grammar for your students.",
              },
              {
                type: "info",
                title: "Key principles when using games:",
                content: [
                  "Using games makes learning easier for all students, whether they're children or adults. It gets students to be more active in their learning, with more STT, and it also adds more fun and enthusiasm to the learning process.",
                  "Competitive games can motivate students to get the answer right and help them learn the correct way faster. However, competitive games don't always work well for younger children, or cultures that don't enjoy competition — so don't force them.",
                  "You shouldn't force a student to participate in a game. Some learners may not want to for personal reasons, and making them take part against their will can disengage them.",
                  "Well-chosen games at the right stage of a lesson will give students a break and allow them to practise language skills too.",
                  "Games should be thought of as supplementary activities, not as the main event. They're a great way of helping students learn, but they're no substitute for showing students the correct forms.",
                  "Make sure your games are appropriate for the class in terms of their ability, target language and the type of participation you want.",
                  "A game that looks great on paper doesn't always turn out that way in the classroom. If the students are looking tired or disengaged, try something different.",
                ],
              },
            ],
          },

          // ── Lesson 8: Teaching grammar using games: Demonstration ─
          {
            slug: "meth3-games-demonstration",
            title: "Teaching grammar using games: Demonstration",
            kind: "lesson",
            duration: "6 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Here are four classic classroom games you can use to practise grammar. Each one can be adapted for different grammar points and student levels.",
              },
            ],
            activity: {
              type: "activity_click_reveal",
              title: "Grammar games",
              instruction: "Click each game to see how to play it.",
              items: [
                {
                  id: "blackboard-race",
                  text: "1. Blackboard race",
                  isCorrect: true,
                  reveal: "Divide the board in two halves. Split the class into two teams. You can decide what the theme will be. The students need to race to the board one by one and write as many related words as possible (one at a time). These could be grammar or vocabulary related — you could go for irregular past verbs for example. Remember to set a time limit. Students who like competitions love this. With larger classes, you could have them work in teams using flipchart paper.",
                },
                {
                  id: "tic-tac-toe",
                  text: "2. Tic-tac-toe",
                  isCorrect: true,
                  reveal: "To play this game, draw a tic-tac-toe grid on the board. Fill each square with a grammar point you want to practise — for example, 2nd conditional sentences. You could fill the grids with two verbs in their infinitive form. Students work in teams. The first team picks a square, confer in their group, and need to come up with a correct 2nd conditional sentence. If they get it right, they can claim the square; if not they 'lose' the square. The game goes on until one team scores a tic-tac-toe.",
                },
                {
                  id: "hot-potato",
                  text: "3. Hot potato",
                  isCorrect: true,
                  reveal: "You could use a soft ball or a soft toy. The objective of the game is to pass the ball in a circle as fast as possible. It's a very flexible game — you can adapt it based on what grammar point you want to practise. It could be based on words, like verb forms, or full sentences — maybe comparatives. You could use it as a warmer, controlled practice or review stage of the lesson.",
                },
                {
                  id: "sentence-matching",
                  text: "4. Sentence matching game",
                  isCorrect: true,
                  reveal: "You will need cards — the same number as the number of students in the group so that every learner can have one card. On each card write a subject, verb or object/prepositional phrase. Distribute the cards and play some music. The students have to walk freely around the classroom. When the music stops, they have to get into groups and create correct sentences. You can use this as a controlled practice if the sentences are set. It would be a production (free) activity if students use the prompts to make up sentences themselves.",
                },
              ],
            },
          },

          // ── Lesson 9: Using stories ───────────────────────────────
          {
            slug: "meth3-using-stories",
            title: "Using stories",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "There's very little that captures our imagination in the way that stories do, so that makes them ideal candidates for classroom activities.",
              },
              {
                type: "info",
                title: "Ways to use stories to highlight grammar points:",
                content: [
                  "Use spoken or written stories to make grammar more fun. Students can visualise what's being said in their heads which will help them understand and assimilate the new grammatical structures they're being taught.",
                  "Focus on grammatical structures in stories, or summarise and report about a favourite story taking place as though it was on the news.",
                  "Students can choose a character from a story to describe, which could let them practise the present simple (through routines), adjectives, adverbs of frequency, etc. Make sure you correct students at the end of the exercise.",
                  "Use a chain story, where every student takes a turn to contribute a line to the story. You can direct them to use almost anything grammatical here — e.g. irregular verbs or a particular tense.",
                ],
              },
            ],
          },

          // ── Lesson 10: Teaching grammar using stories: Classroom example
          {
            slug: "meth3-stories-classroom-example",
            title: "Teaching grammar using stories: Classroom example",
            kind: "lesson",
            duration: "8 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/stories-classroom-example.mp4",
              downloadable: true,
              transcript: [
                "OK, what's this? A shopping bag. A shopping bag. So where did I go this morning? Shopping. Supermarket.",
                "I went shopping, yes. I went shopping. A few things happened while I was shopping, OK? So, I went to the shop to buy apples. I went to the shop to buy apples, and I bumped into someone I knew. But someone I knew, but I forgot to bring the money.",
                "I borrowed the money from that guy. After that, I went home. I went home. But I still forgot to buy the bananas.",
                "OK, good. It was a great chain story. So remind me, what we were using there? What we just learned and talked about? Conjunctions! Good job. Well done.",
                "OK, look. What can you see in the picture? Forest. Forest, yeah? Where is it? My dreams.",
                "So let's stand up for this one. OK, so yesterday, I went out walking. And I walked through a beautiful, sunlit forest. And suddenly, I saw one big thing coming — came up to me. I said — I see it. Saw. Yes, saw. I saw some animal, but I don't know what that was.",
                "I felt so scared that I ran away. I expected to meet a monster called a gruffalo. But I didn't see it. Then I found nothing. It was dog. Big dog. And this big dog chased after me. And I ran and ran and ran, and then woke up. It was a dream!",
                "OK, so in this story, what were we practicing? Past tense. Past simple.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This classroom video shows three different chain stories used to practise different grammar points: conjunctions, past simple, and first conditional. Notice how the teacher uses props and images to set the scene and keep students engaged.",
              },
            ],
          },

          // ── Lesson 11: Using real-life situations ─────────────────
          {
            slug: "meth3-using-real-life-situations",
            title: "Using real-life situations",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Bringing in real-life situations to your lessons makes perfect sense, as it allows your students to engage with the target language in a way they can relate to. Real-life contexts are also really useful to give students a functional grasp of English — vocabulary and grammar constructs that they can start using outside of the classroom as soon as they leave.",
              },
              {
                type: "info",
                title: "Real-life situations that work well in grammar lessons:",
                content: [
                  "Use personalised topics to make students more interested and engaged, which will lead to the lesson having more STT.",
                  "Use comparative adjectives to compare two films that students like.",
                  "Use modal verbs to give advice to students — for example: what to do on a trip to your home town or city.",
                  "Use the past simple tense to talk about a recent holiday, event or celebration.",
                  "Use the future simple to speculate on what life will be like 6 months, 5 years or 10 years from now.",
                  "Use the present perfect to find out what amazing experiences your students have had!",
                ],
              },
            ],
          },

          // ── Lesson 12: Teaching grammar using real-life situations: Example
          {
            slug: "meth3-real-life-classroom-example",
            title: "Teaching grammar using real-life situations: Classroom example",
            kind: "lesson",
            duration: "8 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/real-life-classroom-example.mp4",
              downloadable: true,
              transcript: [
                "OK. So, guys, have you heard that our really good friend, Claire, is leaving? Aw. She's going. She's going somewhere else. But we really like Claire, don't we? We love her, don't we?",
                "You do, yes. So what do we need to do for her to celebrate, say goodbye? We're going to have a farewell party!",
                "Yeah, farewell party, great. So what we're going to do is we're going to plan a really, really great party to say goodbye to Claire.",
                "Place. The place. Or a different word for place? Venue? Venue, or the place, yeah. Time. Music. Food, or catering. Drink. Gifts. Decorations. Dress code.",
                "So all your pieces of paper, you have a number of questions. Do you have a healthy lifestyle? Do you want to do things differently in your life? And they're designed for you to have an interview.",
                "So for the first time round, I want one of you to present you are very unhealthy. The other one needs to be healthy.",
                "OK. We are going to have a party at a beach. And we are going to decorate the beach with candles. And we are going to set a big gazebo, in case it rains. And for food, Elizabeth is going to buy the food, fruits, drinking. And for music, we're going to just pick all sort of superhero music.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This classroom video shows a real-life situation (planning a farewell party) used as a production activity to practise the future with 'going to'. Students work in groups to plan different parties and present their ideas. Notice how the real-life context creates genuine communication.",
              },
            ],
          },

          // ── Quiz: Classroom activities ────────────────────────────
          {
            slug: "meth3-classroom-activities-quiz",
            title: "Classroom activities: Quiz",
            kind: "quiz",
            duration: "5 min",
            activity: {
              type: "quiz_true_false",
              title: "Classroom activities: True or False",
              passPercent: 70,
              questions: [
                {
                  id: "ca-q1",
                  question: "You should use competitive games to practise grammar with all age ranges.",
                  correctAnswer: false,
                  explanation: "False — competitive games don't always work well for younger children or for cultures that don't enjoy competition.",
                },
                {
                  id: "ca-q2",
                  question: "Personalised activities, like real-life situations, motivate students and increase STT.",
                  correctAnswer: true,
                  explanation: "True — personalised topics make students more interested and engaged, which leads to more student talking time.",
                },
                {
                  id: "ca-q3",
                  question: "A chain story is a written activity.",
                  correctAnswer: false,
                  explanation: "False — a chain story is a spoken activity where every student takes a turn to contribute a line.",
                },
                {
                  id: "ca-q4",
                  question: "You should never use more than one tense in an activity.",
                  correctAnswer: false,
                  explanation: "False — you can mix tenses in activities, especially in production stages. Songs and stories often use multiple tenses.",
                },
                {
                  id: "ca-q5",
                  question: "You can only use games, songs, stories and real-life situations to practise tenses.",
                  correctAnswer: false,
                  explanation: "False — these resources can be used to practise a wide range of grammar points, not just tenses.",
                },
              ],
            },
          },

          // ── Lesson 13: Other classroom activities ─────────────────
          {
            slug: "meth3-other-classroom-activities",
            title: "Other classroom activities",
            kind: "lesson",
            duration: "5 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/other-classroom-activities.mp4",
              downloadable: true,
              transcript: [
                "We hope that you're now full to the brim with classroom activity ideas and buzzing with anticipation to use them in an actual classroom!",
                "We've got some more activities that you might want to use though, for different types of lesson that focus on something other than grammar, or as part of a different lesson type than the usual PPP or ESA class you give.",
                "All of the activity types we've shown you are great and really effective, but there are plenty more activities out there that can be used during different stages of a lesson: as a warm-up, cool-down, consolidation or revision exercise.",
                "These activities can give students a mental break from learning full-on, which is helpful in keeping lessons varied and keeping students engaged.",
                "These other activities include icebreakers, warmers, discovery tasks, tests, drilling and skills-based activities which help make your lessons richer.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Beyond games, songs, stories and real-life situations, there are many other activity types you can use at different stages of a lesson: icebreakers, warmers, discovery tasks, tests, drilling and skills-based activities.",
              },
              {
                type: "text",
                content:
                  "These activities can be used as warm-ups, cool-downs, consolidation or revision exercises. They give students a mental break from full-on learning and help keep lessons varied and students engaged.",
              },
            ],
          },

          // ── Lesson 14: Giving instructions ───────────────────────
          {
            slug: "meth3-giving-instructions",
            title: "Giving instructions",
            kind: "lesson",
            duration: "4 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/giving-instructions.mp4",
              downloadable: true,
              transcript: [
                "We've now got a grasp on all the activities we can use in our grammar lesson, but now it's time to think about how we are going to make sure that the students understand what we want them to do.",
                "There's no real trick to this, we just need to give students clear, simple instructions.",
                "Even if we have a complex activity, if we explain it in a clear and concise way this shouldn't matter and the students will fully grasp what they're asked to do. It's important to use language that the students understand here, and avoid being too wordy, otherwise students will get confused and start to switch off.",
                "Remember though, that giving instructions isn't a one-step process. Once you've told the students what to do, you need to make sure they understand, so that's where concept checking comes in.",
                "These steps will make sure your lessons and activities start off on the right foot so that you can spend less time explaining and your students spend more time learning.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Giving clear instructions is one of the most important skills a teacher can have. Even complex activities can be explained simply. Use clear language, avoid being too wordy, and always check understanding after giving instructions.",
              },
            ],
          },

          // ── Lesson 15: Giving clear instructions ─────────────────
          {
            slug: "meth3-giving-clear-instructions",
            title: "Giving clear instructions",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "One of the first things you'll need to master as a teacher is giving clear, simple instructions to your students and making sure that they fully understand what you're asking them to do. Although you might think it helps, too much repetition and rephrasing can actually leave them feeling more confused.",
              },
              {
                type: "info",
                title: "Useful tips for giving clear instructions:",
                content: [
                  "Speak clearly",
                  "Grade or simplify your language to a level students will understand",
                  "Use as few words as possible",
                  "Use gestures and visuals to help",
                  "Demonstrate tasks",
                  "Check that students understand what they're being asked to do",
                  "Establish procedures and routines for yourself to help provide effective, consistent instructions",
                  "Write your instructions into your lesson plan at first so you remember them, although you won't need them as much when you acquire more experience",
                ],
              },
            ],
          },

          // ── Lesson 16: Giving clear instructions: Demonstration ───
          {
            slug: "meth3-giving-instructions-demonstration",
            title: "Giving clear instructions: Demonstration",
            kind: "lesson",
            duration: "6 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/giving-instructions-demonstration.mp4",
              downloadable: true,
              transcript: [
                "As you may know already, giving clear instructions is a key factor in teaching and it's not only relevant to lower levels! When it comes to instructions, you need to be clear and concise at any level, even with more advanced students. It's a good idea to plan your instructions beforehand and practise them.",
                "Let me show you a few demonstrations and ideas.",
                "Ask students to stand up: First of all you need to get their attention. You need to make sure your students are listening and focussed. You can say something like: 'pens down please', and then another gesture with your hands to stand up.",
                "To get them into pairs, get their attention and gesture pairs — to every pair, saying 'pairwork, two, two, two, etc.'",
                "Now let's look at running a 'Find someone who...' activity. Firstly, get the students' attention. Show the students the handout or part of the handout on the board. E.g. 12 squares with experiences: eat sushi, swim in the sea, etc.",
                "Then elicit: Ask a question about an experience. Point to one square. Student: 'Have you ever eaten sushi?' Praise a student and ask another or the same student, 'Have you ever eaten sushi?'",
                "Remember, when you give your students instructions, try to keep things as simple and as visual as necessary. A visual demonstration will always work much better than a lengthy verbal explanation. So keep it short, keep it visual, and only give instructions when your students need to know something!",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "This demonstration shows how to give instructions for common classroom activities using gesture, visual demonstration and minimal language. The key principle: keep it short, keep it visual.",
              },
            ],
          },

          // ── Lesson 17: Concept questions: Demonstration ───────────
          {
            slug: "meth3-concept-questions",
            title: "Concept questions: Demonstration",
            kind: "lesson",
            duration: "7 min",
            video: {
              videoSrc: "/videos/methodology/unit-3/concept-questions.mp4",
              downloadable: true,
              transcript: [
                "It is important to make sure your students understand the target language clearly. However, it's not only the target language that you need to be concept checking regularly.",
                "Your students should understand task instructions, special announcements, like a cancelled class, exam dates, change in class times, and so on, as well as their progress and ways of improvement.",
                "Well-structured concept questions will let you find out whether your students have understood the message you want to convey. It's no use asking: 'Do you understand?' — your students might simply nod because they think it's embarrassing not to understand.",
                "Make sure the questions use simple vocabulary and words that your learners know. It should be possible to answer them using yes or no, so keep them as closed questions.",
                "For example, if the target language is present perfect, 'I have been to Japan'. Incorrect concept questions would be: 'Where have you been?' or 'Have you eaten sushi?' — these don't check understanding of the tense.",
                "Here are some good concept questions for 'He cooked dinner': 'Am I talking about now? No. Is he still cooking? No. Is the action finished? Yes. Am I talking about the past? Yes.'",
                "For 'They speak French': 'Are they speaking French at the moment? No. Do they know how to speak French? Yes.'",
                "Be careful not to concept check every single new word though. Some concepts can be easily understood using other means, like context or images.",
              ],
            },
            contentBlocks: [
              {
                type: "text",
                content:
                  "Concept checking questions (CCQs) are closed yes/no questions that check whether students have truly understood the target language. Never ask 'Do you understand?' — use specific questions that can only be answered correctly if they understand.",
              },
              {
                type: "info",
                title: "Examples of good concept questions:",
                content: [
                  "For 'He cooked dinner' (past simple): Am I talking about now? (No) — Is he still cooking? (No) — Is the action finished? (Yes) — Am I talking about the past? (Yes)",
                  "For 'They speak French' (present simple habit): Are they speaking French at the moment? (No) — Do they know how to speak French? (Yes)",
                  "For 'The house is huge' (vocabulary): Is the house small? (No) — Is it big? (Yes) — Is the house very, very big? (Yes)",
                  "For instructions 'work in pairs on questions 1–6': Are you going to work on your own? (No) — Are you going to answer all the questions? (No) — Are you going to answer questions 1 to 6? (Yes) — Are you going to speak? (Yes)",
                ],
              },
            ],
          },

          // ── Quiz: Unit 3 End of Unit ──────────────────────────────
          {
            slug: "meth3-end-of-unit-quiz",
            title: "Unit 3: End of Unit Quiz",
            kind: "quiz",
            duration: "8 min",
            activity: {
              type: "quiz_multiple_choice",
              title: "Unit 3: End of Unit Quiz",
              passPercent: 70,
              questions: [
                {
                  id: "u3-q1",
                  question: "When teaching grammar, the most important thing for students to memorise is the ________.",
                  options: [
                    { id: "a", text: "Lead-in" },
                    { id: "b", text: "Target structure" },
                    { id: "c", text: "Homework" },
                  ],
                  correctAnswerId: "b",
                  explanation: "The target structure — the specific grammar point being taught — is what students need to memorise and be able to use.",
                },
                {
                  id: "u3-q2",
                  question: "You should avoid mixing the grammar point you are teaching with too many ________.",
                  options: [
                    { id: "a", text: "Other structures" },
                    { id: "b", text: "Examples" },
                    { id: "c", text: "Exercises" },
                  ],
                  correctAnswerId: "a",
                  explanation: "Mixing too many grammar structures at once confuses students. Keep the focus on one target structure at a time.",
                },
                {
                  id: "u3-q3",
                  question: "You should ideally try to ________ the grammar rules first.",
                  options: [
                    { id: "a", text: "Dictate" },
                    { id: "b", text: "Elicit" },
                    { id: "c", text: "Explain" },
                  ],
                  correctAnswerId: "b",
                  explanation: "Eliciting — drawing out knowledge from students — is preferred over dictating or simply explaining, as it is more student-centred.",
                },
                {
                  id: "u3-q4",
                  question: "When teaching grammar, you teach ________.",
                  options: [
                    { id: "a", text: "Form, meaning and then pronunciation" },
                    { id: "b", text: "Pronunciation, form and then meaning" },
                    { id: "c", text: "Meaning, pronunciation and then form" },
                  ],
                  correctAnswerId: "c",
                  explanation: "The correct order is Meaning first, then Pronunciation, then Form — this is the MPF sequence used in the presentation stage.",
                },
                {
                  id: "u3-q5",
                  question: "Use resources like ________ to make grammar more fun.",
                  options: [
                    { id: "a", text: "Games and real-life situations" },
                    { id: "b", text: "Songs and stories" },
                    { id: "c", text: "Either of the above" },
                  ],
                  correctAnswerId: "c",
                  explanation: "All of these — games, real-life situations, songs and stories — are valid resources for making grammar more engaging.",
                },
                {
                  id: "u3-q6",
                  question: "Instructions should be ________.",
                  options: [
                    { id: "a", text: "Repeated until students understand them" },
                    { id: "b", text: "Clear and simple and graded to the level of language your students use" },
                    { id: "c", text: "Given and then repeated by the students" },
                  ],
                  correctAnswerId: "b",
                  explanation: "Clear, simple and graded instructions reduce confusion. Too much repetition and rephrasing can actually make things worse.",
                },
                {
                  id: "u3-q7",
                  question: "Tasks will work better if you ________.",
                  options: [
                    { id: "a", text: "Demonstrate them for the students" },
                    { id: "b", text: "Don't use too many different types of activities" },
                    { id: "c", text: "Always use the same activities in every lesson" },
                  ],
                  correctAnswerId: "a",
                  explanation: "Demonstrating a task visually is much more effective than lengthy verbal explanations.",
                },
                {
                  id: "u3-q8",
                  question: "Using ________ makes learning grammar much easier.",
                  options: [
                    { id: "a", text: "Homework" },
                    { id: "b", text: "Teacher-centred lessons" },
                    { id: "c", text: "Games" },
                  ],
                  correctAnswerId: "c",
                  explanation: "Games increase student talking time, add engagement and make grammar practice more memorable.",
                },
                {
                  id: "u3-q9",
                  question: "Concept questions should always be ________ questions.",
                  options: [
                    { id: "a", text: "Open" },
                    { id: "b", text: "Closed" },
                    { id: "c", text: "True or False" },
                  ],
                  correctAnswerId: "b",
                  explanation: "Concept questions should be closed (yes/no) questions, so students can only answer correctly if they've understood the target language.",
                },
                {
                  id: "u3-q10",
                  question: "Which one of the following is NOT a concept question?",
                  options: [
                    { id: "a", text: "Are you working in pairs or individually?" },
                    { id: "b", text: "Do you have to fill in the gaps on the handout?" },
                    { id: "c", text: "Are you choosing true or false for each question?" },
                  ],
                  correctAnswerId: "a",
                  explanation: "'Are you working in pairs or individually?' is not a concept question — it's an open instruction-checking question that doesn't test understanding of target language.",
                },
              ],
            },
          },

        ],
      },
    ],
  },

  {
    slug: "168-hour-level-5-tefl-diploma",
    title: "168-Hour Level 5 TEFL Diploma",
    shortDescription:
      "A deeper qualification path with grammar, methodology, classroom planning, and practical teaching preparation.",
    description:
      "A more advanced TEFL pathway for students who want stronger credentials, more confidence with grammar, and better classroom preparation.",
    price: "£299",
    level: "Intermediate",
    duration: "168 hours",
    certificate: "Level 5 style diploma pathway",
    featured: true,
    units: [
      {
        slug: "diploma-unit-1-introduction",
        title: "Unit 1: Introduction",
        overview: "An introduction to the Level 5 TEFL Diploma pathway.",
        modules: [
          {
            slug: "diploma-welcome",
            title: "Welcome to the Level 5 Diploma",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "Welcome to the 168-Hour Level 5 TEFL Diploma. This course builds on core TEFL skills with advanced methodology, lesson planning, and classroom management.",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "30-hour-teach-english-online-course",
    title: "30-Hour Teach English Online Course",
    shortDescription:
      "A focused course for online teaching, digital classroom tools, student engagement, and remote lesson delivery.",
    description:
      "A short specialist course aimed at teachers who want to teach English online with confidence, structure, and professional presentation.",
    price: "£59",
    level: "All levels",
    duration: "30 hours",
    certificate: "Digital specialist certificate",
    featured: true,
    units: [
      {
        slug: "online-teaching-foundations",
        title: "Unit 1: Online Teaching Foundations",
        overview:
          "Understand how online classrooms work and how to keep learners engaged in remote sessions.",
        modules: [
          {
            slug: "setting-up-your-online-classroom",
            title: "Setting up your online classroom",
            kind: "lesson",
            duration: "5 min",
            contentBlocks: [
              {
                type: "text",
                content:
                  "A professional online setup includes stable lighting, clear audio, a quiet background, and tools that help students follow the lesson easily.",
              },
            ],
          },
          {
            slug: "keeping-learners-engaged-online",
            title: "Keeping learners engaged online",
            kind: "lesson",
            duration: "6 min",
            contentBlocks: [
              {
                type: "bullets",
                items: [
                  "Use clear visuals",
                  "Break lessons into short stages",
                  "Check comprehension often",
                  "Include frequent speaking turns",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// ================= DESTINATIONS =================

export const destinations: Destination[] = [

  // ── SOUTH EAST ASIA ──────────────────────────────────
  {
    slug: "thailand", flag: "🇹🇭", country: "Thailand", city: "Bangkok", region: "South East Asia",
    salary: "THB 35,000–60,000 / month", salaryUsd: "$1,000–1,800 / month",
    visa: "Bachelor's degree usually required", demand: "Very High", cost: "Low to medium",
    bestFor: "First-time teachers, lifestyle seekers, gap year",
    overview: "Thailand remains the entry point for many TEFL teachers thanks to strong demand, lifestyle appeal, and broad access to first teaching roles. Bangkok is the hub but opportunities exist across the whole country.",
    highlights: ["Largest TEFL market in SE Asia", "Low cost of living", "Great travel base", "Year-round hiring"],
    reasons: ["Large academy and language centre market", "High demand for native and near-native speakers", "Excellent lifestyle and travel opportunities", "Strong expat teaching community"],
    sectors: ["Language centres", "Public schools", "International schools", "Private tutoring"],
  },
  {
    slug: "vietnam", flag: "🇻🇳", country: "Vietnam", city: "Ho Chi Minh City", region: "South East Asia",
    salary: "USD 1,200–2,000 / month", salaryUsd: "$1,200–2,000 / month",
    visa: "Degree and TEFL usually expected", demand: "Very High", cost: "Low",
    bestFor: "Teachers wanting strong savings, urban lifestyle",
    overview: "Vietnam is a strong option for TEFL teachers seeking a good balance between competitive salary, savings potential, and an active city life. Ho Chi Minh City and Hanoi are the main hubs.",
    highlights: ["Strong savings potential", "Vibrant city life", "Growing demand", "TEFL premium salaries"],
    reasons: ["Strong urban hiring market in HCMC and Hanoi", "Competitive salaries relative to cost of living", "Popular with both new and experienced teachers", "Growing private English education sector"],
    sectors: ["Language centres", "Public schools", "Private tutoring", "International schools"],
  },
  {
    slug: "cambodia", flag: "🇰🇭", country: "Cambodia", city: "Phnom Penh", region: "South East Asia",
    salary: "USD 900–1,500 / month", salaryUsd: "$900–1,500 / month",
    visa: "Often more flexible than neighbouring markets", demand: "High", cost: "Low",
    bestFor: "First-time teachers, NGO work, low-cost living",
    overview: "Cambodia offers an accessible entry route into SE Asia teaching with lower requirements, very low living costs and a warm, welcoming environment for new teachers.",
    highlights: ["Low entry requirements", "Very low cost of living", "NGO opportunities", "Relaxed pace of life"],
    reasons: ["Accessible market for first-time teachers", "Growing English demand", "Lower living costs than neighbouring countries", "Strong NGO and charity sector"],
    sectors: ["Language centres", "NGO education", "Private schools", "Community programmes"],
  },
  {
    slug: "indonesia", flag: "🇮🇩", country: "Indonesia", city: "Jakarta", region: "South East Asia",
    salary: "USD 1,000–2,000 / month", salaryUsd: "$1,000–2,000 / month",
    visa: "KITAS work permit required", demand: "High", cost: "Low",
    bestFor: "Teachers wanting diversity, Bali lifestyle option",
    overview: "Indonesia is a large and growing market across thousands of islands. Jakarta offers corporate English roles while Bali has become a hub for online and boutique teaching.",
    highlights: ["Large diverse market", "Bali lifestyle option", "Growing corporate sector", "Low cost of living"],
    reasons: ["Large archipelago with varied opportunities", "Strong corporate English demand in Jakarta", "Bali popular for lifestyle teaching roles", "Low cost of living outside major cities"],
    sectors: ["Language centres", "International schools", "Corporate training", "Private tutoring"],
  },
  {
    slug: "malaysia", flag: "🇲🇾", country: "Malaysia", city: "Kuala Lumpur", region: "South East Asia",
    salary: "MYR 3,500–6,000 / month", salaryUsd: "$750–1,300 / month",
    visa: "Employment pass required", demand: "Medium", cost: "Low to medium",
    bestFor: "Teachers wanting an English-speaking environment",
    overview: "Malaysia's multicultural, English-friendly environment and growing private school sector make it a comfortable and accessible destination for TEFL teachers.",
    highlights: ["English widely spoken", "Multicultural society", "Modern infrastructure", "Growing private sector"],
    reasons: ["English widely used in daily life", "Multicultural and welcoming society", "Strong private international school sector", "Good quality of life at low cost"],
    sectors: ["International schools", "Language centres", "Private tutoring", "Corporate training"],
  },
  {
    slug: "singapore", flag: "🇸🇬", country: "Singapore", city: "Singapore", region: "South East Asia",
    salary: "SGD 2,500–4,500 / month", salaryUsd: "$1,900–3,400 / month",
    visa: "Employment pass required", demand: "High", cost: "High",
    bestFor: "Experienced teachers, premium international schools",
    overview: "Singapore is the premium TEFL destination in SE Asia — high salaries, world-class schools and a clean, safe city. Competition is strong and qualifications matter.",
    highlights: ["Highest salaries in SEA", "World-class schools", "Safe modern city", "Strong career path"],
    reasons: ["Premium international school market", "High salaries offset high living costs", "Safe, clean and well-organised city", "Excellent career progression opportunities"],
    sectors: ["International schools", "Language centres", "Corporate training", "Tuition centres"],
  },
  {
    slug: "philippines", flag: "🇵🇭", country: "Philippines", city: "Manila", region: "South East Asia",
    salary: "USD 700–1,200 / month", salaryUsd: "$700–1,200 / month",
    visa: "Alien Employment Permit required", demand: "High", cost: "Low",
    bestFor: "Online teaching hub, BPO English training",
    overview: "The Philippines is a major hub for online English teaching and BPO English training, with Manila and Cebu offering the most opportunities.",
    highlights: ["Online teaching hub", "English widely spoken", "Low cost of living", "Warm welcoming culture"],
    reasons: ["Strong online teaching industry", "English is an official language", "Large BPO sector creates training demand", "Low cost of living"],
    sectors: ["Online teaching platforms", "BPO English training", "Language schools", "International schools"],
  },
  {
    slug: "laos", flag: "🇱🇦", country: "Laos", city: "Vientiane", region: "South East Asia",
    salary: "USD 700–1,200 / month", salaryUsd: "$700–1,200 / month",
    visa: "Work permit required", demand: "Medium", cost: "Low",
    bestFor: "Off the beaten track, relaxed lifestyle",
    overview: "Laos is a quieter, slower-paced alternative to neighbouring markets. Vientiane and Luang Prabang offer opportunities for teachers wanting a more authentic SE Asian experience.",
    highlights: ["Very low cost of living", "Relaxed lifestyle", "Authentic SE Asia", "Small expat community"],
    reasons: ["Very low cost of living", "Relaxed pace of life", "Growing demand for English", "Unique cultural experience"],
    sectors: ["NGO programmes", "Language schools", "Private tutoring", "Universities"],
  },
  {
    slug: "myanmar", flag: "🇲🇲", country: "Myanmar", city: "Yangon", region: "South East Asia",
    salary: "USD 800–1,400 / month", salaryUsd: "$800–1,400 / month",
    visa: "Work permit required — check current conditions", demand: "Medium", cost: "Low",
    bestFor: "Adventurous teachers, frontier market",
    overview: "Myanmar is a developing TEFL market. Check current political and safety conditions carefully before committing. Opportunities exist primarily in Yangon.",
    highlights: ["Low cost of living", "Frontier market", "Unique culture", "Check conditions first"],
    reasons: ["Growing English demand in urban areas", "Very low cost of living", "Rich cultural heritage", "Limited competition for roles"],
    sectors: ["Language schools", "Private tutoring", "NGO programmes", "Universities"],
  },

  // ── EAST ASIA ─────────────────────────────────────────
  {
    slug: "south-korea", flag: "🇰🇷", country: "South Korea", city: "Seoul", region: "East Asia",
    salary: "KRW 2,100,000–3,000,000 / month", salaryUsd: "$1,600–2,300 / month",
    visa: "E-2 visa — degree + criminal background check", demand: "High", cost: "Medium",
    bestFor: "Structured packages, strong savings, modern city life",
    overview: "South Korea offers some of the most structured and rewarding TEFL packages in Asia — housing allowances, return flights and strong salaries make it a top choice for serious teachers.",
    highlights: ["Housing often included", "Return flight provided", "Strong savings potential", "Organised hagwon system"],
    reasons: ["Higher salary packages than most Asian markets", "Housing allowance standard in most roles", "Well-organised private academy system", "Modern, safe and exciting cities"],
    sectors: ["Private academies (hagwons)", "Public school programmes (EPIK)", "International schools", "University English departments"],
  },
  {
    slug: "japan", flag: "🇯🇵", country: "Japan", city: "Tokyo", region: "East Asia",
    salary: "JPY 250,000–350,000 / month", salaryUsd: "$1,700–2,400 / month",
    visa: "Instructor visa — degree required", demand: "High", cost: "Medium to high",
    bestFor: "Culture seekers, JET programme applicants",
    overview: "Japan's iconic culture, clean cities and the prestigious JET programme make it a bucket-list destination. Competition is strong but rewards are high for successful applicants.",
    highlights: ["JET programme route", "Rich cultural experience", "Safe and organised", "Strong school system"],
    reasons: ["Iconic culture and lifestyle", "JET programme provides structured placement", "Safe and well-organised working environment", "Strong demand in conversation schools"],
    sectors: ["JET programme", "Eikaiwa conversation schools", "International schools", "Corporate English training"],
  },
  {
    slug: "china", flag: "🇨🇳", country: "China", city: "Shanghai", region: "East Asia",
    salary: "CNY 12,000–25,000 / month", salaryUsd: "$1,700–3,500 / month",
    visa: "Z work visa — degree required", demand: "Very High", cost: "Low to medium",
    bestFor: "High earners, diverse opportunities, long-term career",
    overview: "China is the world's largest English learning market with enormous demand across every tier of city. Housing allowances and flight reimbursements are common in top roles.",
    highlights: ["Enormous market", "High demand nationwide", "Housing often included", "Varied role types"],
    reasons: ["World's largest English learning market", "High salaries especially in Tier 1 cities", "Housing and flight benefits common", "Huge variety of roles and locations"],
    sectors: ["Training centres", "International schools", "Public schools", "Universities", "Corporate training"],
  },
  {
    slug: "taiwan", flag: "🇹🇼", country: "Taiwan", city: "Taipei", region: "East Asia",
    salary: "TWD 55,000–80,000 / month", salaryUsd: "$1,800–2,600 / month",
    visa: "Resident visa with work permit", demand: "Medium", cost: "Medium",
    bestFor: "Teachers wanting a safe, welcoming East Asian experience",
    overview: "Taiwan is consistently rated one of the most teacher-friendly destinations in Asia — safe, welcoming, affordable and with a strong demand for English in private schools.",
    highlights: ["Very safe and welcoming", "Strong private school market", "Excellent food culture", "Good work-life balance"],
    reasons: ["Safe and extremely welcoming to foreigners", "Strong cram school (buxiban) market", "Good quality of life", "Easier visa process than some neighbours"],
    sectors: ["Cram schools (buxibans)", "Kindergartens", "International schools", "Private tutoring"],
  },
  {
    slug: "hong-kong", flag: "🇭🇰", country: "Hong Kong", city: "Hong Kong", region: "East Asia",
    salary: "HKD 18,000–30,000 / month", salaryUsd: "$2,300–3,800 / month",
    visa: "Work visa required", demand: "Medium", cost: "High",
    bestFor: "Premium roles, international schools, experienced teachers",
    overview: "Hong Kong offers high salaries and premium international school roles but comes with a very high cost of living. Best suited to experienced teachers with strong credentials.",
    highlights: ["High salaries", "Premium schools", "Dynamic city", "Strong finance sector demand"],
    reasons: ["High salaries in international schools", "World-class city and lifestyle", "Strong corporate English demand", "Gateway to broader Asia career"],
    sectors: ["International schools", "Language centres", "Corporate training", "Private tutoring"],
  },

  // ── MIDDLE EAST ───────────────────────────────────────
  {
    slug: "uae", flag: "🇦🇪", country: "UAE", city: "Dubai", region: "Middle East",
    salary: "AED 8,000–15,000 / month", salaryUsd: "$2,200–4,100 / month",
    visa: "Employer-sponsored residence visa", demand: "High", cost: "Medium",
    bestFor: "High earners, tax-free income, premium schools",
    overview: "The UAE offers some of the highest TEFL salaries in the world — tax-free, with flights and accommodation often included. Dubai and Abu Dhabi lead the market.",
    highlights: ["Tax-free salary", "Flights + housing included", "Modern luxury lifestyle", "Top international schools"],
    reasons: ["Tax-free income significantly boosts take-home pay", "Full package roles standard in top schools", "Modern, safe and well-organised cities", "Strong demand in international and private schools"],
    sectors: ["International schools", "Language institutes", "Corporate training", "Government school programmes"],
  },
  {
    slug: "qatar", flag: "🇶🇦", country: "Qatar", city: "Doha", region: "Middle East",
    salary: "QAR 6,000–14,000 / month", salaryUsd: "$1,600–3,800 / month",
    visa: "Employer-sponsored work visa", demand: "High", cost: "Medium",
    bestFor: "Tax-free income, growing education sector",
    overview: "Qatar's rapid investment in education and tax-free salaries make it an increasingly attractive TEFL destination. Doha is modern, safe and well-resourced.",
    highlights: ["Tax-free income", "Strong benefit packages", "Growing education sector", "Safe modern city"],
    reasons: ["Tax-free income", "Strong government investment in education", "Safe and modern capital city", "Good benefits packages including housing"],
    sectors: ["International schools", "Qatar Foundation schools", "Language institutes", "Corporate training"],
  },
  {
    slug: "saudi-arabia", flag: "🇸🇦", country: "Saudi Arabia", city: "Riyadh", region: "Middle East",
    salary: "SAR 5,000–12,000 / month", salaryUsd: "$1,300–3,200 / month",
    visa: "Employer-sponsored Iqama", demand: "High", cost: "Low to medium",
    bestFor: "Very high savings, full package roles",
    overview: "Saudi Arabia is rapidly opening up and investing heavily in English education. Tax-free salaries with full packages offer exceptional savings potential.",
    highlights: ["Tax-free income", "Full packages standard", "Rapidly modernising", "Very high savings potential"],
    reasons: ["Tax-free income with full accommodation and flights", "Massive government investment in English education", "Vision 2030 driving huge demand for teachers", "Very high savings potential"],
    sectors: ["Saudi Aramco schools", "International schools", "Universities", "Language institutes"],
  },
  {
    slug: "kuwait", flag: "🇰🇼", country: "Kuwait", city: "Kuwait City", region: "Middle East",
    salary: "KWD 400–900 / month", salaryUsd: "$1,300–3,000 / month",
    visa: "Employer-sponsored work visa", demand: "Medium", cost: "Medium",
    bestFor: "Stable long-term roles, full benefit packages",
    overview: "Kuwait offers stable, well-paid TEFL roles with full benefit packages. The market is smaller than UAE or Saudi but offers consistent demand particularly in private schools.",
    highlights: ["Tax-free income", "Stable market", "Good benefit packages", "Safe environment"],
    reasons: ["Tax-free income", "Stable employment market", "Good housing and flight benefits", "Safe working environment"],
    sectors: ["Private schools", "Language institutes", "Universities", "Corporate training"],
  },
  {
    slug: "bahrain", flag: "🇧🇭", country: "Bahrain", city: "Manama", region: "Middle East",
    salary: "BHD 600–1,200 / month", salaryUsd: "$1,600–3,200 / month",
    visa: "Employer-sponsored work permit", demand: "Medium", cost: "Medium",
    bestFor: "Relaxed Gulf lifestyle, smaller expat community",
    overview: "Bahrain is the most relaxed and liberal of the Gulf states — smaller than UAE but with a genuine expat community and solid teaching opportunities in private schools.",
    highlights: ["Liberal Gulf state", "Relaxed lifestyle", "Tax-free income", "Close to Saudi Arabia"],
    reasons: ["Most liberal of the Gulf states", "Relaxed lifestyle compared to neighbours", "Tax-free income", "Strong private school sector"],
    sectors: ["Private schools", "Language institutes", "Corporate training", "International schools"],
  },
  {
    slug: "oman", flag: "🇴🇲", country: "Oman", city: "Muscat", region: "Middle East",
    salary: "OMR 600–1,200 / month", salaryUsd: "$1,600–3,100 / month",
    visa: "Employer-sponsored work visa", demand: "Medium", cost: "Medium",
    bestFor: "Peaceful lifestyle, authentic Gulf experience",
    overview: "Oman is the most peaceful and traditional of the Gulf states — beautiful scenery, friendly locals and a growing demand for English across schools and universities.",
    highlights: ["Beautiful scenery", "Peaceful safe environment", "Tax-free income", "Friendly locals"],
    reasons: ["Safe and peaceful working environment", "Beautiful natural landscape", "Tax-free income", "Growing investment in English education"],
    sectors: ["Private schools", "Universities", "Language institutes", "Corporate training"],
  },

  // ── EUROPE ───────────────────────────────────────────
  {
    slug: "uk", flag: "🇬🇧", country: "United Kingdom", city: "London", region: "Europe",
    salary: "£24,000–35,000 / year", salaryUsd: "$30,000–44,000 / year",
    visa: "Right to work in the UK required", demand: "Medium", cost: "High",
    bestFor: "CELTA qualified teachers, accredited EFL career path",
    overview: "The UK has a well-established EFL sector with strong demand in London and major cities. CELTA is highly valued and opens doors to quality language schools and universities.",
    highlights: ["CELTA highly valued", "London EFL hub", "Reputable qualifications", "Clear career progression"],
    reasons: ["Home of ELT — globally recognised qualifications", "Strong language school sector in London", "University EAP opportunities", "Clear professional career path"],
    sectors: ["Language schools", "University EAP", "Further education colleges", "Corporate English training"],
  },
  {
    slug: "germany", flag: "🇩🇪", country: "Germany", city: "Berlin", region: "Europe",
    salary: "EUR 2,000–3,500 / month", salaryUsd: "$2,200–3,800 / month",
    visa: "EU right to work or German work visa", demand: "Medium", cost: "Medium",
    bestFor: "Business English, corporate sector, Berlin lifestyle",
    overview: "Business English is in high demand across Germany's corporate sector. Berlin and Munich lead the market and offer a high quality of life for English teachers.",
    highlights: ["Strong corporate demand", "High quality of life", "Berlin & Munich hubs", "Good work-life balance"],
    reasons: ["Strong demand for business English in corporate sector", "Berlin's creative expat community", "Good salaries relative to cost of living", "Strong language school network"],
    sectors: ["Corporate English training", "Language schools", "International schools", "Universities"],
  },
  {
    slug: "france", flag: "🇫🇷", country: "France", city: "Paris", region: "Europe",
    salary: "EUR 1,800–3,000 / month", salaryUsd: "$2,000–3,300 / month",
    visa: "EU right to work or French work visa", demand: "Medium", cost: "Medium to high",
    bestFor: "Lifestyle seekers, language assistants, Paris dream",
    overview: "France offers the TAPIF language assistant programme for new teachers alongside private language schools in Paris and major cities.",
    highlights: ["TAPIF assistant programme", "Paris lifestyle", "Language school network", "Cultural immersion"],
    reasons: ["TAPIF programme provides structured entry route", "Strong private language school market", "Exceptional lifestyle and culture", "Business English demand in Paris"],
    sectors: ["TAPIF language assistants", "Language schools", "Corporate training", "International schools"],
  },
  {
    slug: "spain", flag: "🇪🇸", country: "Spain", city: "Madrid", region: "Europe",
    salary: "EUR 1,200–2,200 / month", salaryUsd: "$1,300–2,400 / month",
    visa: "EU right to work or Spanish work visa", demand: "Medium", cost: "Medium",
    bestFor: "Lifestyle, language academies, long-term expat life",
    overview: "Spain has a huge network of language academies with consistent demand. Madrid and Barcelona are the main markets — the lifestyle appeal keeps teachers returning year after year.",
    highlights: ["Language academy network", "Excellent lifestyle", "Madrid & Barcelona hubs", "Great weather and culture"],
    reasons: ["Large and established language academy market", "Excellent lifestyle and culture", "Strong demand in Madrid and Barcelona", "Popular with long-term expat teachers"],
    sectors: ["Language academies", "International schools", "Private tutoring", "Corporate training"],
  },
  {
    slug: "italy", flag: "🇮🇹", country: "Italy", city: "Rome", region: "Europe",
    salary: "EUR 1,200–2,200 / month", salaryUsd: "$1,300–2,400 / month",
    visa: "EU right to work or Italian work visa", demand: "Medium", cost: "Medium",
    bestFor: "Culture and lifestyle, language schools",
    overview: "Italy's language school network and cultural appeal attract many TEFL teachers. Rome, Milan and Florence offer the strongest opportunities.",
    highlights: ["Rich culture and lifestyle", "Language school network", "Rome Milan Florence hubs", "Business English demand"],
    reasons: ["Strong language school market in major cities", "Exceptional culture and lifestyle", "Business English demand in Milan's financial district", "Warm welcoming culture"],
    sectors: ["Language schools", "Corporate training", "International schools", "Private tutoring"],
  },
  {
    slug: "turkey", flag: "🇹🇷", country: "Turkey", city: "Istanbul", region: "Europe",
    salary: "USD 800–1,500 / month", salaryUsd: "$800–1,500 / month",
    visa: "Work permit required", demand: "High", cost: "Low",
    bestFor: "Adventure, East-meets-West culture, affordable living",
    overview: "Istanbul is one of the world's most exciting cities with a booming English education market. Low costs, high demand and an incredible cultural experience await.",
    highlights: ["Very low cost of living", "High demand", "Incredible culture", "East meets West"],
    reasons: ["High demand for English teachers", "Very low cost of living", "Istanbul is one of the world's most exciting cities", "Strong private school and dershane market"],
    sectors: ["Private schools (dershanes)", "Language institutes", "International schools", "Corporate training"],
  },
  {
    slug: "netherlands", flag: "🇳🇱", country: "Netherlands", city: "Amsterdam", region: "Europe",
    salary: "EUR 2,200–3,500 / month", salaryUsd: "$2,400–3,800 / month",
    visa: "EU right to work or Dutch work visa", demand: "Medium", cost: "High",
    bestFor: "Business English, highly educated market",
    overview: "The Netherlands has one of Europe's most English-friendly populations but still maintains strong demand for formal business English training in the corporate sector.",
    highlights: ["High English proficiency population", "Strong corporate market", "Excellent infrastructure", "International business hub"],
    reasons: ["Strong corporate business English demand", "Amsterdam is a major international business hub", "High salaries relative to European average", "Excellent quality of life"],
    sectors: ["Corporate training", "Language schools", "International schools", "Universities"],
  },
  {
    slug: "poland", flag: "🇵🇱", country: "Poland", city: "Warsaw", region: "Europe",
    salary: "PLN 4,000–7,000 / month", salaryUsd: "$1,000–1,700 / month",
    visa: "EU right to work or Polish work visa", demand: "Medium", cost: "Low to medium",
    bestFor: "Low cost European base, growing market",
    overview: "Poland is one of Europe's fastest-growing English markets with low living costs and strong demand particularly in Warsaw and Kraków.",
    highlights: ["Low cost of living", "Growing market", "Warsaw & Kraków hubs", "EU access"],
    reasons: ["Fast-growing English education market", "Low cost of living for Europe", "Strong private school and language school sector", "Good quality of life"],
    sectors: ["Language schools", "International schools", "Corporate training", "Private tutoring"],
  },

  // ── AMERICAS ─────────────────────────────────────────
  {
    slug: "usa", flag: "🇺🇸", country: "United States", city: "New York", region: "Americas",
    salary: "$30,000–55,000 / year", salaryUsd: "$30,000–55,000 / year",
    visa: "Work authorisation required", demand: "Medium", cost: "High",
    bestFor: "ESL in diverse communities, adult education",
    overview: "ESL teaching in the US spans community colleges, language schools and adult education centres. New York, Los Angeles and Chicago lead the market.",
    highlights: ["ESL in diverse communities", "College and language school roles", "Varied locations", "Strong credentials valued"],
    reasons: ["Large immigrant ESL market", "Community college adult education sector", "Language school market in major cities", "Intensive English programme (IEP) roles at universities"],
    sectors: ["Community colleges", "Language schools", "Adult education centres", "University IEP programmes"],
  },
  {
    slug: "canada", flag: "🇨🇦", country: "Canada", city: "Toronto", region: "Americas",
    salary: "CAD 35,000–55,000 / year", salaryUsd: "$26,000–41,000 / year",
    visa: "Work permit or citizenship required", demand: "Medium", cost: "High",
    bestFor: "ESL sector, high immigration market",
    overview: "Canada's high immigration rate drives strong ESL demand particularly in Toronto, Vancouver and Montreal. TESL Canada certification is highly valued.",
    highlights: ["Strong immigration-driven demand", "TESL Canada valued", "Toronto Vancouver Montreal", "High quality of life"],
    reasons: ["High immigration creates sustained ESL demand", "Strong language school market", "TESL Canada provides clear certification path", "High quality of life"],
    sectors: ["Language schools", "Settlement ESL programmes", "Community colleges", "Private tutoring"],
  },
  {
    slug: "brazil", flag: "🇧🇷", country: "Brazil", city: "São Paulo", region: "Americas",
    salary: "BRL 3,000–6,000 / month", salaryUsd: "$600–1,200 / month",
    visa: "Work visa required", demand: "Medium", cost: "Low to medium",
    bestFor: "Business English, large urban market",
    overview: "Brazil has a large and growing EFL market with São Paulo and Rio offering the most opportunities, especially for business English in the corporate sector.",
    highlights: ["Large growing market", "Business English demand", "São Paulo hub", "Vibrant culture"],
    reasons: ["Large and growing English education market", "Strong business English demand in São Paulo", "Low cost of living", "Rich culture and lifestyle"],
    sectors: ["Language institutes (CNA, CCAA)", "Corporate training", "International schools", "Private tutoring"],
  },
  {
    slug: "colombia", flag: "🇨🇴", country: "Colombia", city: "Bogotá", region: "Americas",
    salary: "USD 600–1,200 / month", salaryUsd: "$600–1,200 / month",
    visa: "Work visa required", demand: "Medium", cost: "Low",
    bestFor: "Adventure, growing market, low cost of living",
    overview: "Colombia's booming economy is driving English demand with Bogotá and Medellín both becoming popular TEFL destinations with low costs and high quality of life.",
    highlights: ["Growing rapidly", "Low cost of living", "Medellín & Bogotá", "Warm welcoming culture"],
    reasons: ["Rapidly growing English education market", "Very low cost of living", "Medellín rated one of world's most innovative cities", "Warm and welcoming culture"],
    sectors: ["Language institutes", "International schools", "Corporate training", "Private tutoring"],
  },
  {
    slug: "mexico", flag: "🇲🇽", country: "Mexico", city: "Mexico City", region: "Americas",
    salary: "MXN 12,000–22,000 / month", salaryUsd: "$700–1,300 / month",
    visa: "FM3 work visa required", demand: "Medium", cost: "Low",
    bestFor: "Spanish immersion, large urban market, low cost",
    overview: "Mexico City and Guadalajara offer strong English teaching markets with very low living costs and an incredible cultural experience.",
    highlights: ["Very low cost of living", "Large urban market", "Rich culture", "Spanish immersion"],
    reasons: ["Large private language school market", "Very low cost of living", "Rich culture and cuisine", "Growing corporate English demand"],
    sectors: ["Language institutes (Harmon Hall, Quick Learning)", "International schools", "Corporate training", "Private tutoring"],
  },
  {
    slug: "argentina", flag: "🇦🇷", country: "Argentina", city: "Buenos Aires", region: "Americas",
    salary: "USD 500–1,000 / month", salaryUsd: "$500–1,000 / month",
    visa: "Work visa required", demand: "Medium", cost: "Low",
    bestFor: "Cultural experience, Buenos Aires lifestyle, low cost",
    overview: "Buenos Aires is one of Latin America's most cultured and vibrant cities with a strong English teaching market and exceptionally low cost of living.",
    highlights: ["Very low cost of living", "Vibrant city culture", "Strong tango culture", "Growing market"],
    reasons: ["Buenos Aires is one of Latin America's most exciting cities", "Very low cost of living", "Strong private English school market", "Rich European-influenced culture"],
    sectors: ["Language institutes", "International schools", "Corporate training", "Private tutoring"],
  },

  // ── OTHER ────────────────────────────────────────────
  {
    slug: "australia", flag: "🇦🇺", country: "Australia", city: "Sydney", region: "Other",
    salary: "AUD 55,000–80,000 / year", salaryUsd: "$36,000–53,000 / year",
    visa: "Work rights required", demand: "Medium", cost: "High",
    bestFor: "ELICOS sector, qualified teachers, high standards",
    overview: "Australia has a well-established ELICOS sector with language schools in Sydney, Melbourne and Brisbane. High standards and strong qualifications are expected.",
    highlights: ["ELICOS sector", "High qualifications valued", "Sydney & Melbourne", "High quality of life"],
    reasons: ["Well-established ELICOS language school sector", "Strong qualifications valued and rewarded", "High quality of life", "Major student visa market drives demand"],
    sectors: ["ELICOS language schools", "TAFE colleges", "Universities EAP", "International schools"],
  },
  {
    slug: "new-zealand", flag: "🇳🇿", country: "New Zealand", city: "Auckland", region: "Other",
    salary: "NZD 45,000–65,000 / year", salaryUsd: "$27,000–39,000 / year",
    visa: "Work visa required", demand: "Medium", cost: "High",
    bestFor: "Quality lifestyle, ELICOS, smaller market",
    overview: "New Zealand's ELICOS sector is smaller than Australia but offers high quality of life and strong working conditions for qualified English teachers.",
    highlights: ["High quality of life", "Beautiful country", "ELICOS sector", "Safe environment"],
    reasons: ["High quality of life", "Beautiful natural environment", "Strong ELICOS language school market", "Safe and welcoming country"],
    sectors: ["Language schools", "Universities EAP", "Private schools", "TAFE equivalents"],
  },
  {
    slug: "south-africa", flag: "🇿🇦", country: "South Africa", city: "Cape Town", region: "Other",
    salary: "ZAR 15,000–25,000 / month", salaryUsd: "$820–1,370 / month",
    visa: "Work permit required", demand: "Medium", cost: "Low",
    bestFor: "Volunteer work, community ESL, unique experience",
    overview: "South Africa offers a unique English teaching experience with opportunities in language schools, international schools and community ESL programmes across Cape Town and Johannesburg.",
    highlights: ["Low cost of living", "Unique experience", "Cape Town lifestyle", "Community work"],
    reasons: ["Low cost of living", "Beautiful country with unique culture", "International school market", "Community ESL volunteer opportunities"],
    sectors: ["International schools", "Language schools", "Community ESL programmes", "Corporate training"],
  },
  {
    slug: "india", flag: "🇮🇳", country: "India", city: "Mumbai", region: "Other",
    salary: "INR 25,000–60,000 / month", salaryUsd: "$300–720 / month",
    visa: "Employment visa required", demand: "High", cost: "Low",
    bestFor: "Unique immersive experience, growing corporate market",
    overview: "India has an enormous and growing English education market. Mumbai, Delhi and Bangalore offer the strongest opportunities particularly in the corporate and international school sectors.",
    highlights: ["Enormous market", "Low cost of living", "Corporate sector demand", "Unique experience"],
    reasons: ["Enormous and growing English education market", "Very low cost of living", "Strong corporate business English demand", "Unique and immersive cultural experience"],
    sectors: ["Corporate training", "International schools", "Language institutes", "Universities"],
  },
];

// ================= HELPERS =================

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getFeaturedCourses() {
  return courses.filter((course) => course.featured);
}

export function getAllModules(courseSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) return [];

  return course.units.flatMap((unit) =>
    unit.modules.map((module) => ({
      ...module,
      unitSlug: unit.slug,
      unitTitle: unit.title,
    })),
  );
}

// ================= MISC =================

export const siteStats = [
  { label: "Teachers trained", value: "205k+" },
  { label: "SEA partner schools", value: "320+" },
  { label: "Job support response", value: "24 hrs" },
  { label: "Student rating", value: "4.8/5" },
];

export const paymentPlans = [
  {
    name: "Full payment",
    detail: "Pay once by card or bank transfer and unlock the course instantly.",
  },
  {
    name: "3-part instalments",
    detail:
      "Split your total over 3 monthly payments for selected diploma and combined courses.",
  },
  {
    name: "SEA local payment rails",
    detail:
      "Supports cards plus FPX, PromptPay, GCash, GrabPay, and selected bank transfer methods.",
  },
];

export const adminMetrics = [
  { label: "New leads", value: "184" },
  { label: "Paid enrolments", value: "46" },
  { label: "Conversion rate", value: "24.9%" },
  { label: "Partner schools", value: "58" },
];