export const posts = [
  {
    id: '1',
    type: 'help',
    title: 'Feed my cat for 2–3 days',
    description:
      'I will be away for a few days and need someone in the building to feed my cat once a day and check water. I’ll leave food and instructions.',
    author: 'Pamela (323)',
    createdAt: '2 days ago',
  },
  {
    id: '2',
    type: 'sharing',
    title: 'Drill available this weekend',
    description: 'I need a drill this weekend. Thank you in advance!',
    author: 'Mark (357)',
    createdAt: 'Yesterday',
  },
  {
    id: '3',
    type: 'initiative',
    title: 'Courtyard picnic to meet neighbours',
    description:
      'Let’s have an informal picnic in the courtyard on Sunday 20 July, 15:00–17:00. Bring something small to share if you like.',
    author: 'Julia (343)',
    createdAt: 'Today',
    joinedNeighbours: ['Mark (357)', 'Pamela (323)', 'Joris (338)'],
  },
  {
    id: '4',
    type: 'initiative',
    title: 'Fixing broken parking barriers together',
    description:
      "Several parking barriers in our parking area are broken. Let's coordinate the order of the new ones. Join the initiative if it is relevant to you.",
    author: 'Joris (338)',
    createdAt: '3 days ago',
    joinedNeighbours: ['Wilko (347)', 'Mark (357)'],
  },
];

export const comments = [
  {
    id: 'c1',
    postId: '1',
    author: 'Anna (333)',
    createdAt: '1 day ago',
    text: 'I can help with feeding your cat on Friday and Saturday.',
  },
  {
    id: 'c2',
    postId: '3',
    author: 'Mark (357)',
    createdAt: 'Today',
    text: 'Sounds great! I can bring some snacks.',
  },
  {
    id: 'c3',
    postId: '3',
    author: 'Leo (301)',
    createdAt: 'Today',
    text: 'Does anyone have a party tent?:)',
  },
  {
    id: 'c4',
    postId: '4',
    author: 'Sara (215)',
    createdAt: 'Yesterday',
    text: 'The same problem. I am in!',
  },
];

export const getPostById = (id) => posts.find((post) => post.id === id);
export const getCommentsForPost = (postId) =>
  comments.filter((comment) => comment.postId === postId);
