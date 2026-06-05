from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "art"
W, H = 1536, 768
random.seed(42)


def rgb(hex_color: str) -> tuple[int, int, int]:
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(round(a[i] * (1 - t) + b[i] * t) for i in range(3))


def shade(color: tuple[int, int, int], amount: float) -> tuple[int, int, int]:
    target = (255, 245, 210) if amount > 0 else (12, 10, 12)
    return mix(color, target, abs(amount))


def gradient(size: tuple[int, int], top: str, bottom: str) -> Image.Image:
    w, h = size
    a, b = rgb(top), rgb(bottom)
    img = Image.new("RGB", size)
    pix = img.load()
    for y in range(h):
        t = y / max(1, h - 1)
        c = mix(a, b, t)
        for x in range(w):
            pix[x, y] = c
    return img


def glow(img: Image.Image, box: tuple[int, int, int, int], color: str, blur: int = 34, alpha: int = 120) -> None:
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse(box, fill=(*rgb(color), alpha))
    img.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))


def texture(img: Image.Image, alpha: int = 22) -> None:
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(900):
        x = random.randrange(img.width)
        y = random.randrange(img.height)
        v = random.randrange(160, 245)
        d.point((x, y), fill=(v, v, v, random.randrange(5, alpha)))
    img.alpha_composite(layer)


def stones(draw: ImageDraw.ImageDraw, base: tuple[int, int, int]) -> None:
    for row, y in enumerate(range(18, H - 150, 92)):
        offset = -90 if row % 2 else -20
        for x in range(offset, W, 190):
            w = random.randint(122, 208)
            h = random.randint(54, 88)
            c = shade(base, random.uniform(-0.18, 0.22))
            draw.rounded_rectangle((x, y, x + w, y + h), radius=28, fill=(*c, 84), outline=(*shade(c, -0.25), 70), width=3)


def beam(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle((120, 38, W - 120, 82), radius=24, fill=(68, 42, 28, 220), outline=(170, 119, 55, 150), width=5)
    for x in range(210, W - 180, 260):
        draw.rounded_rectangle((x, 30, x + 70, 92), radius=18, fill=(176, 126, 48, 210), outline=(89, 53, 28, 120), width=4)


def floor(draw: ImageDraw.ImageDraw, color: str = "#211817") -> None:
    top = H - 160
    draw.rectangle((0, top, W, H), fill=rgb(color) + (232,))
    for y in range(top + 16, H, 38):
        draw.line((0, y, W, y + random.randint(-4, 4)), fill=(255, 220, 130, 42), width=3)
    draw.rectangle((0, top, W, top + 16), fill=(10, 9, 8, 230))


def arch(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, color: str, scale: float = 1) -> None:
    w = int(w * scale)
    h = int(h * scale)
    draw.rounded_rectangle((x, y + h // 3, x + w, y + h), radius=28, fill=(26, 19, 18, 140))
    draw.arc((x, y, x + w, y + h), 180, 360, fill=rgb(color) + (170,), width=max(18, int(34 * scale)))
    draw.line((x, y + h // 2, x, y + h), fill=rgb(color) + (150,), width=max(16, int(28 * scale)))
    draw.line((x + w, y + h // 2, x + w, y + h), fill=rgb(color) + (150,), width=max(16, int(28 * scale)))


def lamp(draw: ImageDraw.ImageDraw, x: int, y: int, size: int = 34) -> None:
    draw.line((x, y - 52, x, y), fill=(82, 48, 26, 180), width=5)
    draw.ellipse((x - size, y - size // 2, x + size, y + size), fill=(244, 169, 55, 235), outline=(255, 237, 150, 180), width=3)
    draw.ellipse((x - size // 2, y - size // 4, x + size // 4, y + size // 3), fill=(255, 244, 154, 210))


def banner(draw: ImageDraw.ImageDraw, x: int, y: int, color: str = "#c82025") -> None:
    c = rgb(color)
    draw.rectangle((x, y, x + 68, y + 206), fill=(*c, 232))
    draw.polygon((x, y + 206, x + 34, y + 250, x + 68, y + 206), fill=(*c, 232))
    draw.rectangle((x + 24, y + 54, x + 44, y + 145), fill=(245, 194, 63, 215))
    draw.polygon((x + 8, y + 132, x + 34, y + 104, x + 60, y + 132), fill=(245, 194, 63, 215))


def base_room(top: str, bottom: str, stone: str) -> Image.Image:
    img = gradient((W, H), top, bottom).convert("RGBA")
    d = ImageDraw.Draw(img, "RGBA")
    glow(img, (120, 30, 590, 460), "#ffe08a", 55, 82)
    glow(img, (880, 60, 1450, 540), "#7fe6ff", 70, 54)
    stones(d, rgb(stone))
    beam(d)
    arch(d, 160, 305, 360, 285, "#d0b685", 1.0)
    arch(d, 1060, 290, 330, 295, "#d0b685", 0.92)
    lamp(d, 560, 162, 34)
    lamp(d, 1016, 174, 30)
    floor(d)
    texture(img)
    return img


def save(img: Image.Image, name: str) -> None:
    path = OUT / name
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix.lower() == ".webp":
        img.convert("RGB").save(path, "WEBP", quality=88, method=6)
    else:
        img.save(path)


def room_lobby() -> Image.Image:
    img = base_room("#8a744e", "#232522", "#7a674f")
    d = ImageDraw.Draw(img, "RGBA")
    banner(d, 265, 128)
    banner(d, 1185, 128)
    d.polygon((604, H - 164, 932, H - 164, 1070, H, 466, H), fill=(126, 21, 23, 225))
    d.polygon((590, H - 95, 946, H - 95, 880, H - 62, 656, H - 62), fill=(225, 156, 46, 160))
    d.rounded_rectangle((628, 272, 900, 616), radius=110, fill=(150, 28, 31, 236), outline=(250, 166, 51, 210), width=16)
    d.rectangle((566, 590, 966, 650), fill=(60, 25, 20, 230))
    return img


def room_dwelling() -> Image.Image:
    img = base_room("#92aeb0", "#203243", "#597073")
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle((620, 472, 950, 610), radius=30, fill=(213, 171, 94, 230))
    d.rounded_rectangle((650, 420, 760, 520), radius=34, fill=(248, 234, 203, 235))
    d.rounded_rectangle((900, 430, 1230, 610), radius=32, fill=(143, 73, 50, 230))
    d.rounded_rectangle((930, 386, 1040, 502), radius=35, fill=(245, 228, 194, 235))
    d.rounded_rectangle((228, 220, 300, 610), radius=34, fill=(178, 31, 37, 230))
    d.rounded_rectangle((1290, 220, 1362, 610), radius=34, fill=(116, 25, 32, 230))
    return img


def room_food() -> Image.Image:
    img = base_room("#c46a4e", "#2c1d24", "#8a4b3c")
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle((760, 254, 1035, 545), radius=42, fill=(90, 44, 26, 235))
    d.pieslice((810, 260, 985, 450), 180, 360, fill=(35, 22, 18, 210))
    d.ellipse((850, 382, 1025, 450), fill=(237, 133, 47, 180))
    d.rounded_rectangle((470, 505, 1310, 602), radius=22, fill=(151, 82, 42, 235), outline=(244, 179, 71, 120), width=6)
    for x in (540, 880, 1160):
        d.ellipse((x, 458, x + 160, 520), fill=(242, 195, 85, 235))
        d.rectangle((x + 12, 493, x + 148, 520), fill=(102, 64, 28, 220))
        d.rectangle((x + 22, 485, x + 138, 498), fill=(110, 184, 81, 230))
    return img


def room_service() -> Image.Image:
    img = base_room("#718c58", "#1c2d2d", "#596c4f")
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle((500, 490, 1180, 600), radius=24, fill=(210, 222, 217, 232), outline=(118, 82, 46, 150), width=6)
    for x, c in ((568, "#f4d35e"), (635, "#ec6f5d"), (704, "#64c4b0")):
        d.ellipse((x, 438, x + 52, 505), fill=rgb(c) + (230,))
        d.rectangle((x + 22, 500, x + 34, 555), fill=(58, 121, 64, 230))
    d.ellipse((1020, 306, 1140, 426), fill=(246, 230, 173, 230), outline=(115, 82, 49, 220), width=14)
    d.line((1080, 366, 1080, 326), fill=(74, 55, 45, 220), width=8)
    d.line((1080, 366, 1112, 386), fill=(74, 55, 45, 220), width=8)
    return img


def room_craft() -> Image.Image:
    img = base_room("#9a7548", "#252030", "#6c5342")
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle((860, 450, 1230, 600), radius=20, fill=(111, 74, 42, 235))
    d.rounded_rectangle((420, 470, 590, 555), radius=18, fill=(91, 103, 112, 235))
    d.polygon((350, 560, 655, 560, 598, 620, 415, 620), fill=(52, 47, 48, 230))
    d.ellipse((715, 388, 850, 520), fill=(238, 147, 42, 180))
    d.rounded_rectangle((676, 484, 888, 606), radius=18, fill=(76, 42, 33, 230))
    for x in (1010, 1108, 1202):
        d.ellipse((x, 330, x + 84, 414), outline=(219, 169, 70, 220), width=12)
    return img


def room_entertainment() -> Image.Image:
    img = base_room("#76599d", "#20223c", "#574a73")
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle((420, 548, 1110, 620), radius=34, fill=(52, 32, 42, 240), outline=(242, 184, 75, 110), width=8)
    d.rounded_rectangle((520, 370, 1015, 552), radius=42, fill=(104, 44, 69, 220))
    for x, c in ((420, "#f5c557"), (540, "#64c4b0"), (660, "#ec6f5d"), (780, "#6ea8e6"), (900, "#f5c557")):
        d.line((x, 118, x, 270), fill=(142, 65, 41, 185), width=5)
        d.polygon((x, 270, x + 24, 320, x - 24, 320), fill=rgb(c) + (230,))
    d.ellipse((1070, 340, 1210, 480), outline=(245, 197, 87, 210), width=18)
    return img


def room_kingdom() -> Image.Image:
    img = base_room("#bd9253", "#2b3040", "#75634e")
    d = ImageDraw.Draw(img, "RGBA")
    banner(d, 260, 120)
    banner(d, 1210, 120)
    d.polygon((610, H - 164, 930, H - 164, 1070, H, 470, H), fill=(133, 23, 26, 230))
    d.rounded_rectangle((600, 220, 934, 604), radius=120, fill=(154, 32, 35, 238), outline=(245, 183, 54, 220), width=18)
    d.polygon((760, 172, 705, 260, 815, 260), fill=(245, 197, 87, 230))
    return img


def room_alchemy() -> Image.Image:
    img = base_room("#3f8b78", "#1d223c", "#3d5c60")
    d = ImageDraw.Draw(img, "RGBA")
    glow(img, (560, 305, 965, 680), "#7fffe0", 45, 100)
    d.ellipse((650, 440, 900, 630), fill=(40, 41, 47, 240), outline=(118, 255, 224, 170), width=10)
    d.rectangle((675, 430, 875, 500), fill=(41, 48, 58, 235))
    for x, c in ((455, "#7fffe0"), (1040, "#a983d8"), (1168, "#f5c557")):
        d.rounded_rectangle((x, 365, x + 60, 540), radius=22, fill=rgb(c) + (160,), outline=(230, 255, 240, 150), width=5)
        d.rectangle((x + 18, 320, x + 42, 370), fill=(230, 255, 240, 120))
    for x in (530, 980, 1220):
        d.ellipse((x, 520, x + 90, 610), fill=(231, 111, 93, 215))
        d.rectangle((x + 35, 575, x + 55, 628), fill=(92, 57, 42, 230))
    return img


def room_training() -> Image.Image:
    img = base_room("#9a6742", "#241a22", "#735445")
    d = ImageDraw.Draw(img, "RGBA")
    banner(d, 260, 130, "#b62a23")
    d.ellipse((1020, 300, 1235, 515), fill=(240, 234, 213, 240), outline=(245, 197, 87, 240), width=18)
    d.ellipse((1075, 355, 1180, 460), outline=(236, 111, 93, 240), width=24)
    d.ellipse((1115, 395, 1140, 420), fill=(236, 111, 93, 240))
    d.rounded_rectangle((610, 350, 705, 605), radius=38, fill=(192, 114, 50, 230))
    d.ellipse((595, 300, 720, 405), fill=(242, 203, 151, 230))
    d.rectangle((535, 430, 780, 460), fill=(112, 68, 35, 220))
    return img


def room_treasure() -> Image.Image:
    img = base_room("#bd9148", "#201a20", "#6d5c4a")
    d = ImageDraw.Draw(img, "RGBA")
    glow(img, (630, 300, 1100, 680), "#ffe66d", 50, 115)
    d.rounded_rectangle((710, 440, 1070, 620), radius=26, fill=(136, 73, 29, 245), outline=(245, 197, 87, 230), width=12)
    d.arc((710, 330, 1070, 560), 180, 360, fill=(245, 197, 87, 240), width=36)
    d.rectangle((870, 440, 910, 620), fill=(247, 215, 89, 230))
    d.polygon((1130, 555, 1200, 430, 1275, 555), fill=(202, 196, 176, 230))
    d.ellipse((1155, 382, 1245, 470), fill=(211, 205, 184, 230))
    for x, c in ((510, "#7fe6ff"), (560, "#a983d8"), (610, "#f5c557"), (1220, "#64c4b0")):
        d.polygon((x, 600, x + 35, 545, x + 70, 600), fill=rgb(c) + (235,))
    return img


def room_build(sky: bool) -> Image.Image:
    if sky:
        img = base_room("#6177b4", "#232a4a", "#5b6789")
        d = ImageDraw.Draw(img, "RGBA")
        glow(img, (110, 0, W - 110, 340), "#cbe9ff", 70, 90)
        beam(d)
        for x in (360, 620, 900, 1180):
            d.line((x, 190, x + 80, 585), fill=(144, 91, 45, 230), width=18)
            d.line((x + 140, 180, x - 60, 585), fill=(144, 91, 45, 230), width=14)
        d.rounded_rectangle((360, 560, 1210, 625), radius=18, fill=(107, 68, 42, 235))
    else:
        img = base_room("#6d5845", "#25252a", "#584838")
        d = ImageDraw.Draw(img, "RGBA")
        glow(img, (430, 280, 1160, 700), "#f5c557", 60, 115)
        for x in (330, 560, 790, 1020):
            d.rounded_rectangle((x, 260, x + 120, 590), radius=18, fill=(118, 77, 42, 235))
            d.line((x - 35, 410, x + 155, 305), fill=(103, 66, 35, 235), width=15)
        for x in (510, 785, 1080):
            lamp(d, x, 250, 30)
    return img


def guide_jester() -> Image.Image:
    img = gradient((1024, 1024), "#f0d590", "#9a6834").convert("RGBA")
    d = ImageDraw.Draw(img, "RGBA")
    glow(img, (120, 60, 930, 780), "#fff5c8", 90, 120)
    d.ellipse((260, 270, 760, 760), fill=(246, 210, 178, 255), outline=(110, 65, 42, 90), width=12)
    d.ellipse((365, 435, 425, 505), fill=(34, 98, 190, 255))
    d.ellipse((595, 435, 655, 505), fill=(34, 98, 190, 255))
    d.ellipse((382, 450, 408, 476), fill=(255, 255, 255, 180))
    d.ellipse((612, 450, 638, 476), fill=(255, 255, 255, 180))
    d.arc((430, 510, 600, 650), 20, 160, fill=(126, 44, 34, 255), width=18)
    d.polygon((122, 372, 245, 104, 410, 332, 512, 78, 614, 332, 779, 104, 902, 372, 690, 340, 512, 430, 334, 340), fill=(114, 51, 146, 255))
    d.polygon((250, 112, 410, 332, 512, 78, 614, 332, 770, 112, 650, 376, 512, 430, 374, 376), fill=(194, 54, 66, 245))
    for x, y in ((130, 370), (250, 116), (512, 82), (774, 116), (895, 370)):
        d.ellipse((x - 42, y - 42, x + 42, y + 42), fill=(245, 197, 87, 255), outline=(126, 74, 33, 120), width=8)
    d.rounded_rectangle((350, 710, 680, 940), radius=82, fill=(189, 54, 56, 255), outline=(245, 197, 87, 165), width=14)
    d.polygon((350, 720, 520, 910, 680, 720), fill=(121, 58, 143, 225))
    return img


def ui_wood() -> Image.Image:
    img = gradient((1536, 768), "#6f4324", "#2a1814").convert("RGBA")
    d = ImageDraw.Draw(img, "RGBA")
    for y in range(0, 768, 120):
        d.rounded_rectangle((0, y + 12, 1536, y + 102), radius=26, fill=(82, 48, 28, 210), outline=(214, 154, 55, 160), width=8)
        for x in range(110, 1536, 260):
            d.rounded_rectangle((x, y, x + 96, y + 112), radius=22, fill=(194, 129, 35, 190), outline=(255, 220, 115, 120), width=5)
    texture(img, 18)
    return img


def app_icon() -> Image.Image:
    img = gradient((1024, 1024), "#251814", "#101615").convert("RGBA")
    d = ImageDraw.Draw(img, "RGBA")
    glow(img, (105, 45, 920, 880), "#f5c557", 88, 95)
    d.rounded_rectangle((96, 96, 928, 928), radius=190, outline=(239, 184, 72, 255), width=28)
    d.polygon((230, 760, 230, 370, 342, 430, 418, 258, 512, 444, 606, 258, 682, 430, 794, 370, 794, 760), fill=(245, 197, 87, 255))
    d.rounded_rectangle((296, 472, 728, 760), radius=36, fill=(116, 59, 39, 255))
    d.rounded_rectangle((410, 568, 614, 760), radius=80, fill=(36, 31, 44, 255))
    d.rectangle((338, 545, 418, 650), fill=(112, 190, 174, 255))
    d.rectangle((606, 545, 686, 650), fill=(112, 190, 174, 255))
    d.polygon((470, 188, 512, 82, 554, 188), fill=(255, 236, 139, 255))
    d.polygon((388, 220, 440, 118, 490, 244), fill=(255, 236, 139, 255))
    d.polygon((536, 244, 584, 118, 636, 220), fill=(255, 236, 139, 255))
    d.polygon((512, 725, 565, 832, 512, 792, 459, 832), fill=(64, 196, 176, 255))
    return img


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    assets = {
        "room-lobby.webp": room_lobby(),
        "room-dwelling.webp": room_dwelling(),
        "room-food.webp": room_food(),
        "room-service.webp": room_service(),
        "room-craft.webp": room_craft(),
        "room-entertainment.webp": room_entertainment(),
        "room-kingdom.webp": room_kingdom(),
        "room-alchemy.webp": room_alchemy(),
        "room-training.webp": room_training(),
        "room-treasure.webp": room_treasure(),
        "room-sky-build.webp": room_build(True),
        "room-depth-build.webp": room_build(False),
        "guide-jester.webp": guide_jester(),
        "ui-wood-gold.webp": ui_wood(),
        "app-icon.png": app_icon(),
    }
    for name, image in assets.items():
        save(image, name)
        print(f"wrote {OUT / name}")


if __name__ == "__main__":
    main()
