import sys

ESC = "\x1b["
RESET = ESC + "0m"

def bg(i):
	return f"{ESC}48;5;{i}m"

def fg(i):
	return f"{ESC}38;5;{i}m"

def idx_to_rgb(i):
	"""xterm 256 color index -> approximate (r,g,b) in 0..255"""
	if 0 <= i <= 15:
		# standard colors (0-7 normal, 8-15 bright)
		# table from common xterm mapping
		table = [
			(0,0,0),(128,0,0),(0,128,0),(128,128,0),
			(0,0,128),(128,0,128),(0,128,128),(192,192,192),
			(128,128,128),(255,0,0),(0,255,0),(255,255,0),
			(0,0,255),(255,0,255),(0,255,255),(255,255,255),
		]
		return table[i]
	if 16 <= i <= 231:
		# 6x6x6 cube
		c = i - 16
		r = c // 36
		g = (c % 36) // 6
		b = c % 6
		# map 0..5 -> actual 0..255 using 0,95,135,175,215,255
		vals = [0,95,135,175,215,255]
		return (vals[r], vals[g], vals[b])
	if 232 <= i <= 255:
		# grayscale ramp 232..255 -> 8..238 step 10
		v = 8 + (i - 232) * 10
		return (v, v, v)
	raise ValueError("color index out of range")

def print_header():
	print("xterm-256color palette (0-255). Make sure TERM=xterm-256color")
	print()

def show_block(i, text="   "):
	"""Return a colored block string with bg color i and readable fg for numbers."""
	r,g,b = idx_to_rgb(i)
	# choose black or white foreground for contrast (use luminance)
	luminance = 0.2126*r + 0.7152*g + 0.0722*b
	fore = 15 if luminance < 128 else 0  # 15 white, 0 black (xterm indices)
	return f"{bg(i)}{fg(fore)}{text}{RESET}"

def demo_0_15():
	print("Colors 0..15 (standard):")
	line = ""
	for i in range(0,16):
		block = show_block(i, f" {i:2d} ")
		line += block + " "
	print(line)
	print()

def demo_6cube():
	print("Colors 16..231 (6x6x6 color cube). Layout: rows = red (0..5), columns grouped by green blocks (6 blocks of 6 columns each).")
	for r in range(6):
		for g_block in range(6):  # produce groups of 6 columns for readability
			row = ""
			for b in range(6):
				i = 16 + 36*r + 6*g_block + b
				row += show_block(i, "   ")
			row += "  "  # gap between blocks
			sys.stdout.write(row)
		sys.stdout.write("\n")
	print()
	# show indices under the last row for reference (one full line)
	# print indices in a single row (36 columns per red row)
	for r in range(6):
		idx_line = ""
		for g in range(6):
			for b in range(6):
				i = 16 + 36*r + 6*g + b
				idx_line += f"{i:4d}"
			idx_line += "  "
		print(idx_line)
	print()

def demo_gray():
	print("Colors 232..255 (grayscale ramp):")
	line = ""
	for i in range(232, 256):
		block = show_block(i, f" {i-232:2d} ")
		line += block + " "
	print(line)
	print()

def show_rgb_list():
	print("Index -> (R,G,B)")
	for i in range(0,256):
		r,g,b = idx_to_rgb(i)
		print(f"{i:3d}: ({r:3d},{g:3d},{b:3d})")
	print()

def main():
	print_header()
	demo_0_15()
	demo_6cube()
	demo_gray()
	# Optional: list RGBs (comment out if too verbose)
	# show_rgb_list()

if __name__ == "__main__":
	main()
