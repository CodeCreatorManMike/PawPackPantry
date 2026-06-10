/* Decorative scattered stickers — purely visual */
import Image from "next/image";

type Piece = {
  src: string;
  style: React.CSSProperties;
};

const PIECES: Piece[] = [
  { src: "/stickers/paw-blush.png",   style: { top: "8%",  left: "4%",   width: 60, transform: "rotate(-18deg)", opacity: .45 } },
  { src: "/stickers/bone-peach.png",  style: { top: "14%", right: "5%",  width: 70, transform: "rotate(22deg)",  opacity: .4  } },
  { src: "/stickers/paw-sage.png",    style: { top: "42%", left: "2%",   width: 50, transform: "rotate(30deg)",  opacity: .35 } },
  { src: "/stickers/star-peach.png",  style: { top: "26%", right: "12%", width: 48, transform: "rotate(-10deg)", opacity: .4  } },
  { src: "/stickers/paw-sky.png",     style: { bottom:"20%", left: "8%", width: 55, transform: "rotate(12deg)",  opacity: .38 } },
  { src: "/stickers/heart-blush.png", style: { bottom:"10%", right:"6%", width: 52, transform: "rotate(-22deg)", opacity: .42 } },
];

export default function PawScatter() {
  return (
    <>
      {PIECES.map((p, i) => (
        <span
          key={i}
          style={{ position: "absolute", pointerEvents: "none", zIndex: 0, ...p.style }}
        >
          <Image src={p.src} alt="" width={Number(p.style.width) || 60} height={Number(p.style.width) || 60} style={{ display: "block" }} />
        </span>
      ))}
    </>
  );
}
