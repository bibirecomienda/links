#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import urllib.request, io, os

# ── Colores del sitio ────────────────────────────────────────
BG      = "#F4DDD7"
SURFACE = "#FBEAE4"
CREAM   = "#FAF1E8"
INK     = "#3B2521"
MUTED   = "#9C7A6F"
ACCENT  = "#A04A36"
RULE    = "#E5C9C0"
GOLD    = "#C9985E"
WHITE   = "#FFFFFF"

def hex2rgb(h, a=None):
    h = h.lstrip('#')
    t = tuple(int(h[i:i+2],16) for i in (0,2,4))
    return t + (a,) if a is not None else t

W, H = 1080, 1920

ARIAL    = "/System/Library/Fonts/Supplemental/Arial.ttf"
ARIAL_B  = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ARIAL_BK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
GEORGIA  = "/System/Library/Fonts/Supplemental/Georgia.ttf"
GEORGIA_B= "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"

def fnt(path, size):
    try: return ImageFont.truetype(path, size)
    except: return ImageFont.load_default()

def tw(draw, txt, f):
    bb = draw.textbbox((0,0), txt, font=f)
    return bb[2]-bb[0], bb[3]-bb[1]

def rr(draw, xy, r, fill=None, outline=None, lw=2):
    draw.rounded_rectangle(xy, radius=r,
        fill=hex2rgb(fill) if fill else None,
        outline=hex2rgb(outline) if outline else None,
        width=lw)

def fetch(url, size):
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
        data = urllib.request.urlopen(req, timeout=12).read()
        im = Image.open(io.BytesIO(data)).convert("RGBA")
        im.thumbnail(size, Image.LANCZOS)
        c = Image.new("RGBA", size, (255,255,255,255))
        c.paste(im, ((size[0]-im.width)//2, (size[1]-im.height)//2), im)
        return c
    except Exception as e:
        print(f"img: {e}"); return None

# ── Canvas ────────────────────────────────────────────────────
img  = Image.new("RGB", (W, H), hex2rgb(BG))
draw = ImageDraw.Draw(img, "RGBA")

# Gradiente suave
for i in range(H):
    t = i / H
    r0,g0,b0 = hex2rgb(BG)
    r1,g1,b1 = hex2rgb(SURFACE)
    c = (int(r0*(1-t*0.25)+r1*t*0.25),
         int(g0*(1-t*0.25)+g1*t*0.25),
         int(b0*(1-t*0.25)+b1*t*0.25))
    draw.line([(0,i),(W,i)], fill=c)

# Círculos decorativos
draw.ellipse([-200, -200, 400, 400], fill=hex2rgb(GOLD, 14))
draw.ellipse([700, 1500, 1300, 2100], fill=hex2rgb(ACCENT, 10))

PAD = 60

# ────────────────────────────────────────────────────────────
# HEADER
# ────────────────────────────────────────────────────────────
AV = 96
AV_X, AV_Y = PAD, 56

try:
    av = Image.open(os.path.join(os.path.dirname(__file__),'..','bibirecomiendaimage.jpg')).convert("RGBA")
    av = av.resize((AV*2, AV*2), Image.LANCZOS)
    mask = Image.new("L",(AV*2,AV*2),0)
    ImageDraw.Draw(mask).ellipse([0,0,AV*2,AV*2],fill=255)
    img.paste(av,(AV_X,AV_Y),mask)
except: pass
draw.ellipse([AV_X-4,AV_Y-4,AV_X+AV*2+4,AV_Y+AV*2+4], outline=hex2rgb(GOLD), width=4)

fn_name = fnt(GEORGIA_B, 52)
fn_sub  = fnt(ARIAL, 30)
draw.text((AV_X+AV*2+30, AV_Y+10), "Bibi Recomienda", font=fn_name, fill=hex2rgb(INK))
draw.text((AV_X+AV*2+30, AV_Y+72), "@bibi.recomienda", font=fn_sub, fill=hex2rgb(MUTED))

# Badge sin emoji (evita carácter raro)
fn_badge = fnt(ARIAL_B, 30)
bt = "Mascotas"
bw2, bh2 = tw(draw, bt, fn_badge)
bx = W - PAD - bw2 - 56
by = AV_Y + 30
rr(draw, [bx, by, bx+bw2+56, by+bh2+24], 30, fill=ACCENT)
draw.text((bx+28, by+12), bt, font=fn_badge, fill=hex2rgb(WHITE))

# Divisor
DIV_Y = AV_Y + AV*2 + 20
draw.line([(PAD, DIV_Y),(W-PAD, DIV_Y)], fill=hex2rgb(RULE), width=2)

# ────────────────────────────────────────────────────────────
# IMAGEN PRODUCTO — más grande
# ────────────────────────────────────────────────────────────
IMG_S = 820
IMX   = (W - IMG_S) // 2
IMY   = DIV_Y + 36

# Sombra
draw.rounded_rectangle([IMX+14,IMY+14,IMX+IMG_S+14,IMY+IMG_S+14],
    radius=40, fill=hex2rgb(INK, 30))
# Card
rr(draw, [IMX,IMY,IMX+IMG_S,IMY+IMG_S], 40, fill=WHITE)

pim = fetch("https://m.media-amazon.com/images/I/616zZxB0g1L._AC_SL1500_.jpg",
            (IMG_S-48, IMG_S-48))
if pim:
    img.paste(pim.convert("RGB"), (IMX+24, IMY+24))

# Badge rating — solo texto, sin emojis
fn_rat = fnt(ARIAL_B, 30)
rat = "4.1 / 5  ·  1K+ opiniones"
rw2, rh2 = tw(draw, rat, fn_rat)
rx1, ry1 = IMX+24, IMY+24
rx2, ry2 = rx1+rw2+44, ry1+rh2+22
rr(draw, [rx1,ry1,rx2,ry2], 22, fill=ACCENT)
draw.text((rx1+22, ry1+11), rat, font=fn_rat, fill=hex2rgb(WHITE))

# ────────────────────────────────────────────────────────────
# TÍTULO
# ────────────────────────────────────────────────────────────
TY = IMY + IMG_S + 44
fn_tit = fnt(GEORGIA_B, 54)
for line in ["Caja de arena", "autolimpiante para gatos"]:
    lw2, lh2 = tw(draw, line, fn_tit)
    draw.text(((W-lw2)//2, TY), line, font=fn_tit, fill=hex2rgb(INK))
    TY += lh2 + 12
TY += 20

# ────────────────────────────────────────────────────────────
# BLOQUE PRECIO
# ────────────────────────────────────────────────────────────
BW = W - PAD*2
fn_lbl  = fnt(ARIAL_B, 27)
fn_prc  = fnt(ARIAL_BK, 90)

p_txt = "COP $465.165"
pw2, ph2 = tw(draw, p_txt, fn_prc)
lbl_h = tw(draw, "P", fn_lbl)[1]
PBH = lbl_h + ph2 + 52   # altura total del bloque precio
rr(draw, [PAD, TY, PAD+BW, TY+PBH], 32, fill=ACCENT)

# "PRECIO" centrado arriba
lbl_w = tw(draw, "PRECIO", fn_lbl)[0]
draw.text(((W-lbl_w)//2, TY+16), "PRECIO", font=fn_lbl, fill=hex2rgb(WHITE, 160))
# Precio centrado abajo
draw.text(((W-pw2)//2, TY+16+lbl_h+8), p_txt, font=fn_prc, fill=hex2rgb(WHITE))

TY += PBH + 16

# ────────────────────────────────────────────────────────────
# FILA ENVÍO
# ────────────────────────────────────────────────────────────
fn_row_lbl = fnt(ARIAL, 30)
fn_row_val = fnt(ARIAL_B, 44)

def draw_row(y, label, value, bg=SURFACE, val_color=INK):
    _, lh3 = tw(draw, "Ag", fn_row_lbl)
    _, vh3 = tw(draw, "Ag", fn_row_val)
    RH = max(lh3, vh3) + 46
    rr(draw, [PAD, y, PAD+BW, y+RH], 26, fill=bg, outline=RULE, lw=2)
    # texto izq centrado vertical
    draw.text((PAD+40, y+(RH-lh3)//2), label, font=fn_row_lbl, fill=hex2rgb(MUTED))
    # texto der centrado vertical
    vw3, _ = tw(draw, value, fn_row_val)
    draw.text((PAD+BW-vw3-40, y+(RH-vh3)//2), value, font=fn_row_val, fill=hex2rgb(val_color))
    return y + RH + 14

TY = draw_row(TY, "Envio internacional a Colombia", "+ COP $301.004")
TY = draw_row(TY, "Total estimado con envio", "≈ COP $766.169", bg=CREAM, val_color=ACCENT)

TY += 10

# ────────────────────────────────────────────────────────────
# ÁREA STICKER — ocupa el resto
# ────────────────────────────────────────────────────────────
STICKER_H = H - TY - PAD
rr(draw, [PAD, TY, PAD+BW, TY+STICKER_H], 36, fill=SURFACE, outline=RULE, lw=3)

fn_sh  = fnt(ARIAL_B, 32)
fn_sh2 = fnt(ARIAL, 24)

sh_txt = "Sticker de link aqui"
shw, shh = tw(draw, sh_txt, fn_sh)
draw.text(((W-shw)//2, TY+(STICKER_H-shh)//2 - 20), sh_txt, font=fn_sh, fill=hex2rgb(MUTED))

sh2 = "arrastra el sticker de enlace sobre esta zona"
sh2w, sh2h = tw(draw, sh2, fn_sh2)
draw.text(((W-sh2w)//2, TY+(STICKER_H+shh)//2 + 6), sh2, font=fn_sh2, fill=hex2rgb(RULE))

# ── Guardar ──────────────────────────────────────────────────
out = os.path.join(os.path.dirname(__file__), 'historia-caja-arena.png')
img.save(out, "PNG")
print(f"Guardada: {out}  ({W}x{H})")
