from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "artifacts/openai-stock-pipeline"
SRC = ROOT / "public/assets/game/stock/source/openai-layered"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/STHeiti Medium.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    ]
    for path in candidates:
        if path and Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def save_both(img: Image.Image, name: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    SRC.mkdir(parents=True, exist_ok=True)
    for folder in [OUT, SRC]:
        img.save(folder / name)


def phone_ui() -> Image.Image:
    img = Image.new("RGBA", (360, 640), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 0, 360, 640), radius=42, fill=(15, 20, 20, 255))
    d.rounded_rectangle((18, 20, 342, 620), radius=28, fill=(18, 29, 27, 255))
    d.text((34, 42), "同花顺", fill=(220, 226, 218, 255), font=font(26, True))
    d.text((34, 85), "3091.86", fill=(230, 82, 64, 255), font=font(38, True))
    d.text((214, 96), "+0.47%", fill=(230, 82, 64, 255), font=font(22, True))
    d.text((34, 136), "红星科技  买入确认", fill=(152, 166, 157, 255), font=font(19))
    for y in [210, 270, 330, 390]:
        d.line((34, y, 326, y), fill=(36, 54, 48, 255), width=2)
    pts = [(38, 420), (70, 400), (102, 414), (132, 360), (164, 376), (196, 310), (228, 330), (264, 246), (314, 204)]
    d.line(pts, fill=(229, 62, 50, 255), width=8, joint="curve")
    for x, y in pts[::2]:
        d.ellipse((x - 4, y - 4, x + 4, y + 4), fill=(229, 62, 50, 255))
    d.rounded_rectangle((36, 510, 162, 568), radius=10, fill=(185, 65, 51, 255))
    d.rounded_rectangle((198, 510, 324, 568), radius=10, fill=(52, 122, 75, 255))
    d.text((74, 526), "买入", fill=(255, 245, 232, 255), font=font(27, True))
    d.text((236, 526), "卖出", fill=(238, 255, 236, 255), font=font(27, True))
    return img


def monitor_ui() -> Image.Image:
    img = Image.new("RGBA", (900, 520), (18, 26, 24, 255))
    d = ImageDraw.Draw(img)
    d.text((36, 22), "热门榜", fill=(220, 226, 218, 255), font=font(36, True))
    rows = [
        ("红星科技", "10.02%"),
        ("蓝星股份", "7.63%"),
        ("天宇通信", "6.41%"),
        ("新易盛", "5.28%"),
        ("寒武纪", "4.87%"),
        ("海光信息", "4.22%"),
        ("志特新材", "3.95%"),
    ]
    for index, (name, pct) in enumerate(rows):
        y = 92 + index * 50
        fill = (82, 35, 31, 255) if index == 0 else (25, 36, 32, 255)
        d.rounded_rectangle((28, y - 30, 548, y + 12), radius=6, fill=fill)
        d.text((48, y - 20), str(index + 1), fill=(230, 232, 224, 255), font=font(24, True))
        d.text((104, y - 20), name, fill=(230, 232, 224, 255), font=font(24))
        d.text((410, y - 20), pct, fill=(232, 96, 80, 255), font=font(24, True))
    d.rounded_rectangle((590, 86, 850, 386), radius=10, fill=(14, 22, 21, 255), outline=(38, 53, 48, 255), width=2)
    pts = [(610, 320), (638, 300), (666, 314), (694, 252), (722, 270), (752, 210), (782, 230), (818, 166), (846, 128)]
    d.line(pts, fill=(229, 62, 50, 255), width=7, joint="curve")
    d.text((612, 42), "3091.86  +0.47%", fill=(230, 82, 64, 255), font=font(24, True))
    return img


def repayment_paper() -> Image.Image:
    img = Image.new("RGBA", (720, 420), (217, 196, 160, 255))
    d = ImageDraw.Draw(img)
    d.text((44, 36), "还款提醒单", fill=(54, 43, 32, 255), font=font(38, True))
    lines = [
        "本期应还：¥ 7,198.65",
        "扣款日期：6月23日",
        "账户余额不足，请及时处理",
    ]
    for index, line in enumerate(lines):
        d.text((44, 108 + index * 48), line, fill=(87, 70, 54, 255), font=font(25))
    d.ellipse((474, 132, 622, 280), outline=(164, 66, 53, 190), width=10)
    d.text((500, 188), "待处理", fill=(164, 66, 53, 255), font=font(33, True))
    return img


def main() -> None:
    save_both(phone_ui(), "stock-phone-trading-ui.png")
    save_both(monitor_ui(), "stock-monitor-hotlist-ui.png")
    save_both(repayment_paper(), "stock-repayment-paper-ui.png")
    print(f"wrote overlays to {OUT} and {SRC}")


if __name__ == "__main__":
    main()
