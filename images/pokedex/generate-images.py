#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

def create_pokedex_image(width, height, title, pokemon_name, pokemon_number, types, is_mobile=False):
    # Create image with dark background
    img = Image.new('RGB', (width, height), color='#1a1a1a')
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font, fallback to basic if not available
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
        font_medium = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 16)
        font_small = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 12)
    except:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    if is_mobile:
        # Mobile layout
        # Header
        draw.rectangle([0, 0, width, 60], fill='#2a2a2a')
        draw.text((20, 20), "Pokédex", fill='#00d4ff', font=font_large)
        
        # Search bar
        draw.rectangle([20, 40, width-20, 55], fill='#333333', outline='#555555')
        draw.text((25, 42), "E.g. 001 or Bulba...", fill='#888888', font=font_small)
        
        # Pokemon info
        y_pos = 80
        draw.text((20, y_pos), f"#{pokemon_number}", fill='#888888', font=font_medium)
        y_pos += 25
        draw.text((20, y_pos), pokemon_name, fill='white', font=font_large)
        y_pos += 30
        
        # Type tags
        x_pos = 20
        for i, type_name in enumerate(types):
            color = '#4CAF50' if 'grass' in type_name.lower() else '#FF5722' if 'fire' in type_name.lower() else '#2196F3'
            draw.rectangle([x_pos, y_pos, x_pos + 60, y_pos + 20], fill=color)
            draw.text((x_pos + 5, y_pos + 2), type_name, fill='white', font=font_small)
            x_pos += 70
        
        # Pokemon image placeholder
        y_pos += 40
        draw.rectangle([width//2 - 75, y_pos, width//2 + 75, y_pos + 150], fill='#333333', outline='#555555')
        draw.text((width//2 - 20, y_pos + 60), "🌱", fill='white', font=font_large)
        
    else:
        # Desktop layout
        # Sidebar
        sidebar_width = 200
        draw.rectangle([0, 0, sidebar_width, height], fill='#2a2a2a')
        
        # Pokédex title
        draw.text((20, 20), "Pokédex", fill='#00d4ff', font=font_large)
        
        # Search bar
        draw.rectangle([20, 50, sidebar_width-20, 70], fill='#333333', outline='#555555')
        draw.text((25, 55), "E.g. 001 or Bulba...", fill='#888888', font=font_small)
        
        # Pokemon list
        y_pos = 90
        pokemon_list = ["001 Bulbasaur", "002 Ivysaur", "003 Venusaur", "004 Charmander", "005 Charmeleon", "006 Charizard", "007 Squirtle", "008 Wartortle", "009 Blastoise"]
        for i, pokemon in enumerate(pokemon_list):
            if i == 0:  # Selected item
                draw.rectangle([10, y_pos-5, sidebar_width-10, y_pos+15], fill='#00d4ff')
                draw.text((15, y_pos), pokemon, fill='black', font=font_small)
            else:
                draw.text((15, y_pos), pokemon, fill='white', font=font_small)
            y_pos += 20
        
        # Main content area
        x_pos = sidebar_width + 20
        draw.text((x_pos, 20), f"#{pokemon_number}", fill='#888888', font=font_medium)
        draw.text((x_pos, 45), pokemon_name, fill='white', font=font_large)
        
        # Type tags
        y_pos = 80
        x_pos = sidebar_width + 20
        for i, type_name in enumerate(types):
            color = '#4CAF50' if 'grass' in type_name.lower() else '#FF5722' if 'fire' in type_name.lower() else '#2196F3'
            draw.rectangle([x_pos, y_pos, x_pos + 60, y_pos + 20], fill=color)
            draw.text((x_pos + 5, y_pos + 2), type_name, fill='white', font=font_small)
            x_pos += 70
        
        # Pokemon image placeholder
        y_pos += 40
        x_pos = sidebar_width + 20
        draw.rectangle([x_pos, y_pos, x_pos + 200, y_pos + 200], fill='#333333', outline='#555555')
        draw.text((x_pos + 80, y_pos + 80), "🌱", fill='white', font=font_large)
        
        # Thumbnails
        y_pos += 220
        for i in range(4):
            draw.rectangle([x_pos + i*50, y_pos, x_pos + i*50 + 40, y_pos + 40], fill='#333333', outline='#555555')
            draw.text((x_pos + i*50 + 15, y_pos + 10), "🌱", fill='white', font=font_small)
    
    return img

# Create the images
images = [
    ("overview.png", 800, 500, "Main Interface", "bulbasaur", "001", ["grass", "poison"]),
    ("search.png", 800, 500, "Search Functionality", "charmeleon", "005", ["fire"]),
    ("details.png", 800, 500, "Detailed Information", "charizard", "006", ["fire", "flying"]),
    ("modal.png", 800, 500, "Modal System", "charmeleon", "005", ["fire"]),
    ("mobile.png", 400, 600, "Mobile Version", "butterfree", "012", ["bug", "flying"], True)
]

for filename, width, height, title, pokemon_name, pokemon_number, types, *mobile in images:
    is_mobile = len(mobile) > 0 and mobile[0]
    img = create_pokedex_image(width, height, title, pokemon_name, pokemon_number, types, is_mobile)
    img.save(filename)
    print(f"Created {filename}")

print("All Pokédex images created successfully!")
