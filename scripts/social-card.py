"""Optional asset regeneration: python -m pip install Pillow; python scripts/social-card.py."""
from PIL import Image, ImageDraw, ImageFont
im = Image.new('RGB', (1200, 630), '#FAF9F6')
d = ImageDraw.Draw(im)
f = 'assets/fonts/manrope-bold.ttf'
b = 'assets/fonts/dm-sans-regular.ttf'
d.rounded_rectangle((880, 55, 1145, 575), 100, fill='#DED5ED')
d.ellipse((895, 215, 1130, 450), fill='#F2D783')
d.text((58, 55), 'THE JOY OF WORKING', font=ImageFont.truetype(f, 20), fill='#25262B')
d.multiline_text((54, 135), 'There’s room for\nmore joy at work.', font=ImageFont.truetype(f, 78), fill='#25262B', spacing=4)
d.line((65, 345, 685, 345), fill='#F3AA93', width=7)
d.text((60, 422), 'Know yourself. Make intentional choices.', font=ImageFont.truetype(b, 27), fill='#25262B')
d.text((60, 465), 'Create room for people to flourish.', font=ImageFont.truetype(b, 27), fill='#25262B')
d.text((60, 558), 'With Sharda Mohammed', font=ImageFont.truetype(b, 20), fill='#626369')
im.save('assets/social-card.png', optimize=True)
