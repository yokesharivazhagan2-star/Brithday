import { photo1, photo2, photo3, photo4, photo5 } from './photos';

export interface MemoryPhoto {
  id: string;
  image: string;
  fallbackImage?: string;
  number: string;
  caption: string;
  secondaryText: string;
  tag: string;
  date?: string;
  specialEffect?: 'butterfly' | 'sunlight' | 'gold_spotlight' | 'garden_leaves' | 'classic';
  rotation?: number;
}

export interface BouquetMessage {
  id: string;
  flower: string;
  color: string;
  title: string;
  message: string;
  x: number;
  y: number;
  isSecret?: boolean;
}

export interface SecretMessageItem {
  id: string;
  teaser: string;
  message: string;
  emoji: string;
  unlocked?: boolean;
}

export interface BirthdayConfig {
  name: string;
  relationship: string;
  relationshipName: string;
  tagline: string;
  introMessage: string;
  reasons: Array<{
    number: string;
    title: string;
    description: string;
    emoji: string;
    accentColor: string;
  }>;
  checklist: Array<{
    id: string;
    label: string;
    checked: boolean;
  }>;
  checklistConclusion: {
    punchline: string;
    warmNote: string;
  };
  memories: MemoryPhoto[];
  bouquetMessages: BouquetMessage[];
  secretMessages: SecretMessageItem[];
  letter: {
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    postscript?: string;
  };
  thingsIDontSayEnough: Array<{
    id: string;
    text: string;
    subtext: string;
    emoji: string;
  }>;
  finalMessage: string;
  finalSubmessage: string;
  characterName: string;
  easterEggs: {
    hiddenStarMessage: string;
    mascotBullyMessage: string;
    secretNoteMessage: string;
    secretConfession: string;
  };
}

export const birthdayData: BirthdayConfig = {
  name: "Kanii🦋",
  relationship: "Big Sister",
  relationshipName: "Akka",
  tagline: "For the sister who was there through it all.",
  introMessage: "A little surprise for someone very special...",
  
  checklist: [
    { id: "c1", label: "Gives advice before I even ask", checked: true },
    { id: "c2", label: "Protects me no matter what", checked: true },
    { id: "c3", label: "Remembers literally everything", checked: true },
    { id: "c4", label: "Gets annoyed at me for no reason", checked: true },
    { id: "c5", label: "Somehow still puts up with me every day", checked: true },
    { id: "c6", label: "Always has my back through thick and thin", checked: true },
    { id: "c7", label: "Pretends she isn't worried when she totally is", checked: true },
  ],
  checklistConclusion: {
    punchline: "Yep. That's definitely Kanii🦋. 😂",
    warmNote: "Wouldn't trade you for anyone in this world.",
  },

  reasons: [
    {
      number: "01",
      title: "You Always Know",
      description: "You always know when something is wrong without me having to explain a single word.",
      emoji: "🛡️",
      accentColor: "from-purple-500/20 to-indigo-500/30"
    },
    {
      number: "02",
      title: "Always Having My Back",
      description: "You always have my back, whether in front of the whole family or against the whole world.",
      emoji: "🌟",
      accentColor: "from-lavender-500/20 to-pink-500/30"
    },
    {
      number: "03",
      title: "The Sibling Telepathy",
      description: "You somehow give the exact advice I need before I even manage to ask for it.",
      emoji: "💡",
      accentColor: "from-amber-500/20 to-orange-500/30"
    },
    {
      number: "04",
      title: "Turning Ordinary Into Magic",
      description: "You make ordinary family moments, festive celebrations, and chaotic days truly special.",
      emoji: "✨",
      accentColor: "from-fuchsia-500/20 to-purple-500/30"
    },
    {
      number: "05",
      title: "Your Unwavering Faith",
      description: "You believe in me even when I don't believe in myself, pushing me to be better every day.",
      emoji: "🦋",
      accentColor: "from-sky-500/20 to-purple-500/30"
    },
    {
      number: "06",
      title: "The 5-Minute Magic",
      description: "You can annoy me and make me laugh uncontrollably within the same five minutes.",
      emoji: "😂",
      accentColor: "from-rose-500/20 to-amber-500/30"
    },
    {
      number: "07",
      title: "Forever My Akka",
      description: "No matter how much we grow up, travel, or change, you'll always be my amazing big sister.",
      emoji: "👑",
      accentColor: "from-violet-500/20 to-fuchsia-500/30"
    }
  ],

  memories: [
    {
      id: "mem-01",
      image: photo1,
      number: "01",
      tag: "Sibling Bond",
      caption: "One of those moments I'll always remember.",
      secondaryText: "Some memories don't need a reason to stay.",
      specialEffect: "butterfly",
      rotation: -2.5
    },
    {
      id: "mem-02",
      image: photo2,
      number: "02",
      tag: "Garden Whisper",
      caption: "Surrounded by blooms, shining brightest.",
      secondaryText: "Some memories belong outside the photo.",
      specialEffect: "garden_leaves",
      rotation: 2
    },
    {
      id: "mem-03",
      image: photo3,
      number: "03",
      tag: "Classic Akka",
      caption: "Grace, confidence and that classic Akka look.",
      secondaryText: "Another memory worth keeping forever.",
      specialEffect: "gold_spotlight",
      rotation: -1.5
    },
    {
      id: "mem-04",
      image: photo4,
      number: "04",
      tag: "Pure Joy & Chaos",
      caption: "That smile deserves its own memory.",
      secondaryText: "Some pictures just feel like happiness & laughter.",
      specialEffect: "sunlight",
      rotation: 2.5
    },
    {
      id: "mem-05",
      image: photo5,
      number: "05",
      tag: "With Love",
      caption: "Sorry for being annoying sometimes… here's a flower for you.",
      secondaryText: "(With all my love, always!) 🐻💐",
      specialEffect: "classic",
      rotation: -2
    }
  ],

  bouquetMessages: [
    {
      id: "bm-1",
      flower: "🌸",
      color: "#c084fc",
      title: "Looking Out",
      message: "Thank you for always looking out for me.",
      x: 20,
      y: 28
    },
    {
      id: "bm-2",
      flower: "🌷",
      color: "#f472b6",
      title: "Believing In Me",
      message: "Thank you for believing in me.",
      x: 80,
      y: 26
    },
    {
      id: "bm-3",
      flower: "🌼",
      color: "#fbbf24",
      title: "The Little Things",
      message: "Thank you for all the little things.",
      x: 18,
      y: 72
    },
    {
      id: "bm-4",
      flower: "🌺",
      color: "#e879f9",
      title: "Always There",
      message: "Thank you for being there when I need you.",
      x: 82,
      y: 70
    },
    {
      id: "bm-5",
      flower: "🦋",
      color: "#38bdf8",
      title: "Lucky Sibling",
      message: "I'm lucky to have you as my big sister.",
      x: 50,
      y: 15,
      isSecret: true
    }
  ],

  secretMessages: [
    {
      id: "sm-1",
      teaser: "A quiet thank you",
      message: "Thanks for looking out for me when things get tough.",
      emoji: "🛡️"
    },
    {
      id: "sm-2",
      teaser: "The honest truth",
      message: "Thanks for all the advice (even when I pretended not to listen 😂).",
      emoji: "💡"
    },
    {
      id: "sm-3",
      teaser: "Patience award",
      message: "Thanks for being patient with me throughout all these years.",
      emoji: "🏆"
    },
    {
      id: "sm-4",
      teaser: "The biggest secret",
      message: "And yes... I'll officially admit that you're usually right. 😂",
      emoji: "🤫"
    },
    {
      id: "sm-5",
      teaser: "Don't tell anyone",
      message: "Don't tell anyone I said this... You're actually pretty awesome.",
      emoji: "🦋"
    }
  ],

  letter: {
    greeting: "Dear Kanii🦋,",
    paragraphs: [
      "Thank you for always being there for me.",
      "You've been my big sister, my supporter, my advice-giver, and sometimes... the person who annoys me the most 😂.",
      "But honestly, I wouldn't change any of it.",
      "I'm lucky to have you as my sister.",
      "Thank you for all the little things you probably don't even realize matter.",
      "Thank you for checking on me. Thank you for believing in me. Thank you for helping me. Thank you for making ordinary moments memorable.",
      "No matter how much we grow up, you'll always be my big sister."
    ],
    closing: "Happy Birthday, Kanii🦋 ❤️",
    signature: "From Your Younger Sibling",
    postscript: "P.S. Yes, today you officially win every argument! 🎉"
  },

  thingsIDontSayEnough: [
    {
      id: "t1",
      text: "Thank you.",
      subtext: "For the countless silent sacrifices and constant care.",
      emoji: "🙏"
    },
    {
      id: "t2",
      text: "I'm proud to call you my sister.",
      subtext: "Seeing how strong, kind, and inspiring you are every day.",
      emoji: "👑"
    },
    {
      id: "t3",
      text: "I appreciate everything you do.",
      subtext: "Even the little daily gestures that go unnoticed.",
      emoji: "💫"
    },
    {
      id: "t4",
      text: "You've helped me more than you realize.",
      subtext: "Your guidance has shaped who I am.",
      emoji: "🌟"
    },
    {
      id: "t5",
      text: "I'm lucky to have you.",
      subtext: "The best Akka anyone could ever ask for.",
      emoji: "🦋"
    }
  ],

  finalMessage: "HAPPY BIRTHDAY",
  finalSubmessage: "To my amazing big sister, Kanii🦋 ❤️",
  characterName: "Lumi the Sibling Mascot",
  easterEggs: {
    hiddenStarMessage: "Okay... you're officially the favourite today. 😂",
    mascotBullyMessage: "Stop bullying me, Akka 😂",
    secretNoteMessage: "Fine. You were right all along.",
    secretConfession: "Don't tell anyone I said this... You're actually pretty awesome."
  }
};
