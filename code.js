
// This is the main entry point for the Figma plugin
// It contains the code that will run in the Figma environment

// Show the UI
figma.showUI(__html__, { width: 320, height: 480 });

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'rename-selected') {
    // Handle rename selected frames
    const result = await renameSelectedFrames();
    figma.ui.postMessage({
      type: 'rename-result',
      action: 'selected',
      result
    });
  } 
  else if (msg.type === 'rename-all') {
    // Handle rename all frames
    const result = await renameAllFrames();
    figma.ui.postMessage({
      type: 'rename-result',
      action: 'all',
      result
    });
  }
  else if (msg.type === 'undo') {
    // Handle undo operation
    const undoCount = undoRenameOperations();
    figma.ui.postMessage({
      type: 'undo-result',
      count: undoCount
    });
  }
  else if (msg.type === 'get-stats') {
    // Get frame statistics
    const stats = getFrameStats();
    figma.ui.postMessage({
      type: 'stats-result',
      stats
    });
  }
};

// Store original names for undo functionality
const originalNames = new Map();

// Get frame statistics
function getFrameStats() {
  const allFrames = figma.currentPage.findAllWithCriteria({
    types: ['FRAME']
  });
  
  return {
    total: allFrames.length,
    selected: figma.currentPage.selection.filter(node => node.type === 'FRAME').length
  };
}

// Find the title text node in a frame
function findTitleTextNode(frame) {
  // Get all text nodes in the frame
  const textNodes = frame.findAllWithCriteria({
    types: ['TEXT']
  });
  
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
  // We need to load the font to get font size
  let largestTextNode = textNodes[0];
  let largestFontSize = 0;
  
  for (const node of textNodes) {
    // Get the font size (this is a simplification, in reality we need to handle
    // text with multiple font sizes)
    try {
      const fontSize = node.fontSize;
      if (typeof fontSize === 'number' && fontSize > largestFontSize) {
        largestFontSize = fontSize;
        largestTextNode = node;
      }
    } catch (e) {
      // Some text nodes might have mixed styles
      continue;
    }
  }
  
  // Only return it if it's reasonably large (assume titles are at least 16px)
  return largestFontSize >= 16 ? largestTextNode : null;
}

// Rename a single frame
async function renameFrame(frame) {
  // Find the title text node
  const titleNode = findTitleTextNode(frame);
  
  if (!titleNode) return false;
  
  // We need to load the font to access text content
  await figma.loadFontAsync(titleNode.fontName);
  
  // Store original name before changing
  originalNames.set(frame.id, frame.name);
  
  // Update the frame name
  frame.name = titleNode.characters;
  
  return true;
}

// Rename selected frames
async function renameSelectedFrames() {
  const selectedFrames = figma.currentPage.selection.filter(
    node => node.type === 'FRAME'
  );
  
  let success = 0;
  let failed = 0;
  
  for (const frame of selectedFrames) {
    if (await renameFrame(frame)) {
      success++;
    } else {
      failed++;
    }
  }
  
  return { success, failed };
}

// Rename all frames
async function renameAllFrames() {
  const allFrames = figma.currentPage.findAllWithCriteria({
    types: ['FRAME']
  });
  
  let success = 0;
  let failed = 0;
  
  for (const frame of allFrames) {
    if (await renameFrame(frame)) {
      success++;
    } else {
      failed++;
    }
  }
  
  return { success, failed };
}

// Undo rename operations
function undoRenameOperations() {
  let undoCount = 0;
  
  for (const [id, originalName] of originalNames.entries()) {
    // Try to find the node by ID
    const node = figma.getNodeById(id);
    
    // Check if the node still exists and is a frame
    if (node && node.type === 'FRAME') {
      node.name = originalName;
      undoCount++;
    }
  }
  
  // Clear the stored names after undo
  originalNames.clear();
  
  return undoCount;
}
