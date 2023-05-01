#!/usr/bin/env bash

# Create a gif using ffmpeg from a series of images.
# Usage: create-gif.sh <path-to-images> [output] [fps]

help() {
    echo "Usage: create-gif.sh <path-to-images> [pattern] [output] [fps]"
    echo ""
    echo "Examples: "
    echo "  ${0} ./images"
    echo "  ${0} ./images 'file-%d.png'"
    echo "  ${0} ./images 'file-%d.png' ./output.gif"
    echo "  ${0} ./images 'file-%d.png' ./output.gif 10"
    echo ""
    echo "Options: "
    echo "  path-to-images: Path to the folder containing the images"
    echo "  pattern: Pattern to use to find the images, default to '%d.png'"
    echo "  output: Output file, default to folder name + .gif"
    echo "  fps: Frames per second, default to 10"
    echo ""
}

# Input folder
INPUT_FOLDER=$1

# Check if input is a folder
if [ ! -d "$INPUT_FOLDER" ]; then
    echo "Error: $INPUT_FOLDER is not a folder"
    echo ""
    help
    exit 1
fi

# Pattern is optional, default to "folder_name/folder-name-%d.png"
INPUT_FOLDER_NAME=$(basename "$INPUT_FOLDER")
PATTERN=${2:-"$INPUT_FOLDER_NAME-%d.png"}

# Input files
INPUT="$INPUT_FOLDER_NAME/$PATTERN"

# Output is optional, default to "folder_name/folder_name.gif"
OUTPUT=${3:-"$INPUT_FOLDER_NAME/$INPUT_FOLDER_NAME.gif"}

# FPS is optional, default to 10
FPS=${3:-10}

# # echo for debugging
# echo "Input: $INPUT"
# echo "Pattern: $PATTERN"
# echo "Output: $OUTPUT"
# echo "FPS: $FPS"
# echo ""

# Create a palette for the gif
ffmpeg \
    -loglevel error \
    -hide_banner \
    -nostats \
    -y \
    -i "$INPUT" \
    -vf palettegen \
    "$INPUT_FOLDER_NAME/palette.png"

# Run the script with no output unless there is an error

ffmpeg \
    -loglevel warning \
    -hide_banner \
    -nostats \
    -y \
    -framerate "$FPS" \
    -i "$INPUT" \
    -i "$INPUT_FOLDER_NAME/palette.png" \
    -filter_complex "paletteuse" \
    "$OUTPUT"

# Remove the palette
rm "$INPUT_FOLDER_NAME/palette.png"
