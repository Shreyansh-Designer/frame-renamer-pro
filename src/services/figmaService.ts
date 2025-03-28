
// This is a mock Figma API service for the demo
// In a real Figma plugin, this would interact with the actual Figma API

export interface TextNode {
  id: string;
  type: 'TEXT';
  name: string;
  characters: string;
  fontSize: number;
  x: number;
  y: number;
  parent?: FrameNode;
}

export interface FrameNode {
  id: string;
  type: 'FRAME';
  name: string;
  children: (TextNode | OtherNode)[];
  x: number;
  y: number;
}

export interface OtherNode {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
}

type Node = TextNode | FrameNode | OtherNode;

// Mock data for our Figma frames
const mockFrames: FrameNode[] = [
  {
    id: 'frame-1',
    type: 'FRAME',
    name: 'Frame 1',
    x: 0,
    y: 0,
    children: [
      {
        id: 'text-1',
        type: 'TEXT',
        name: 'H1',
        characters: 'Dashboard',
        fontSize: 24,
        x: 20,
        y: 20,
      },
      {
        id: 'text-2',
        type: 'TEXT',
        name: 'Paragraph',
        characters: 'Welcome to your dashboard',
        fontSize: 14,
        x: 20,
        y: 60,
      },
      {
        id: 'button-1',
        type: 'RECTANGLE',
        name: 'Button',
        x: 20,
        y: 100,
      }
    ]
  },
  {
    id: 'frame-2',
    type: 'FRAME',
    name: 'Frame 2',
    x: 0,
    y: 800,
    children: [
      {
        id: 'text-3',
        type: 'TEXT',
        name: 'Title',
        characters: 'User Profile',
        fontSize: 20,
        x: 20,
        y: 20,
      },
      {
        id: 'text-4',
        type: 'TEXT',
        name: 'Label',
        characters: 'Name:',
        fontSize: 12,
        x: 20,
        y: 60,
      }
    ]
  },
  {
    id: 'frame-3',
    type: 'FRAME',
    name: 'Frame 3',
    x: 800,
    y: 0,
    children: [
      {
        id: 'text-5',
        type: 'TEXT',
        name: 'Screen Name',
        characters: 'Settings',
        fontSize: 22,
        x: 20,
        y: 20,
      },
      {
        id: 'group-1',
        type: 'GROUP',
        name: 'Settings Group',
        x: 20,
        y: 60,
      }
    ]
  },
  {
    id: 'frame-4',
    type: 'FRAME',
    name: 'Frame 4',
    x: 800,
    y: 800,
    children: [
      {
        id: 'text-6',
        type: 'TEXT',
        name: 'Page Title',
        characters: 'Notifications',
        fontSize: 24,
        x: 20,
        y: 20,
      },
      {
        id: 'text-7',
        type: 'TEXT',
        name: 'Notification Item',
        characters: 'New message from John',
        fontSize: 14,
        x: 20,
        y: 60,
      }
    ]
  }
];

// Store the original frame names for undo functionality
let originalFrameNames: Map<string, string> = new Map();

// Simulate getting all frames from the current page
export const getAllFrames = (): FrameNode[] => {
  return [...mockFrames];
};

// Simulate getting selected frames
export const getSelectedFrames = (): FrameNode[] => {
  // For demo purposes, let's return 2 frames as selected
  return [mockFrames[0], mockFrames[3]];
};

// Find the title text node in a frame based on some heuristics
export const findTitleTextNode = (frame: FrameNode): TextNode | null => {
  const textNodes = frame.children.filter(
    node => node.type === 'TEXT'
  ) as TextNode[];
  
  if (textNodes.length === 0) return null;
  
  // First try to find text nodes with names that suggest they're titles
  const titleKeywords = ['title', 'heading', 'h1', 'h2', 'screen', 'page'];
  const namedTitleNode = textNodes.find(node => 
    titleKeywords.some(keyword => 
      node.name.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  if (namedTitleNode) return namedTitleNode;
  
  // If no explicitly named title, get the largest text node
  const largestTextNode = textNodes.reduce((largest, current) => 
    (current.fontSize > largest.fontSize) ? current : largest
  , textNodes[0]);
  
  // Only return it if it's reasonably large (assume titles are at least 16px)
  return largestTextNode.fontSize >= 16 ? largestTextNode : null;
};

// Rename a frame based on its title text node
export const renameFrame = (frame: FrameNode): boolean => {
  const titleNode = findTitleTextNode(frame);
  
  if (!titleNode) return false;
  
  // Store original name before changing
  originalFrameNames.set(frame.id, frame.name);
  
  // Update the frame name
  frame.name = titleNode.characters;
  
  return true;
};

// Rename all selected frames
export const renameSelectedFrames = (): {success: number, failed: number} => {
  const selectedFrames = getSelectedFrames();
  let success = 0;
  let failed = 0;
  
  selectedFrames.forEach(frame => {
    if (renameFrame(frame)) {
      success++;
    } else {
      failed++;
    }
  });
  
  return { success, failed };
};

// Rename all frames in the current page
export const renameAllFrames = (): {success: number, failed: number} => {
  const allFrames = getAllFrames();
  let success = 0;
  let failed = 0;
  
  allFrames.forEach(frame => {
    if (renameFrame(frame)) {
      success++;
    } else {
      failed++;
    }
  });
  
  return { success, failed };
};

// Undo all rename operations
export const undoRenameOperations = (): number => {
  let undoCount = 0;
  
  mockFrames.forEach(frame => {
    if (originalFrameNames.has(frame.id)) {
      frame.name = originalFrameNames.get(frame.id)!;
      undoCount++;
    }
  });
  
  // Clear the stored names after undo
  originalFrameNames.clear();
  
  return undoCount;
};

export const getFrameStats = (): { total: number, selected: number } => {
  return {
    total: mockFrames.length,
    selected: getSelectedFrames().length
  };
};
