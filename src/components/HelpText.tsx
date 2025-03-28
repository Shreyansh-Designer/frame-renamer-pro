
import React from 'react';
import { Separator } from '@/components/ui/separator';

const HelpText = () => {
  return (
    <div className="mt-6">
      <Separator className="mb-3" />
      <h3 className="text-sm font-medium mb-2 text-figma-text">How It Works</h3>
      <ul className="text-xs text-gray-600 space-y-1">
        <li>• Plugin finds the largest text or named title layer in each frame</li>
        <li>• Frames are renamed to match the text content</li>
        <li>• Non-title text (buttons, paragraphs) are ignored</li>
        <li>• Use Undo if you need to revert changes</li>
      </ul>
    </div>
  );
};

export default HelpText;
