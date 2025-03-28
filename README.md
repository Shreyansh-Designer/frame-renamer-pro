
# Frame Renamer Pro - Figma Plugin

A powerful Figma plugin that automatically renames frames based on their title text layers, helping you maintain consistent naming conventions throughout your design files.

## Features

- **Smart Title Detection**: Identifies the main title text in each frame based on size and name
- **Batch Renaming**: Process multiple frames at once with a single click
- **Selective Renaming**: Choose between renaming selected frames or all frames
- **Undo Safety**: Easily revert changes if needed
- **Performance Optimized**: Handles large design files efficiently

## How It Works

1. The plugin analyzes each frame to find text layers that are likely to be titles
2. It intelligently identifies titles by looking for:
   - Text layers named "Title", "Heading", "H1", etc.
   - The largest text in the frame (generally titles are bigger)
   - Text positioned near the top of the frame
3. Frames are renamed to match the content of the identified title text
4. Smaller text elements like labels, paragraphs, and button text are ignored

## Usage

1. Select the frames you want to rename (or select none to enable the "Rename All" option)
2. Run the Frame Renamer Pro plugin from the Figma plugins menu
3. Click "Rename Selected Frames" or "Rename All Frames"
4. Review the results, and use the "Undo Rename" button if needed

## Best Practices

- Name your title text layers consistently (e.g., "Title", "H1", "Screen Name")
- Make sure your titles are larger than regular text for better detection
- Review the changes after running the plugin

## Development

This plugin is built with React, TypeScript and uses the Figma Plugin API.

## License

MIT

