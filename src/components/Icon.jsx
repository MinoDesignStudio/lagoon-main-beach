// Replaces the original standalone Icon, which mutated the DOM via the global
// window.lucide runtime. Here the five icons the pages actually use are pulled
// from lucide-react so they render server-side into the static HTML.
import { ChevronLeft, ChevronRight, MapPin, Menu, X } from 'lucide-react';

const ICONS = {
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'map-pin': MapPin,
  menu: Menu,
  x: X,
};

export function Icon({ name, size = 26, stroke = 1.4, color = 'currentColor', style }) {
  const Glyph = ICONS[name];
  return (
    <span style={{ display: 'inline-flex', lineHeight: 0, color, ...style }}>
      {Glyph ? <Glyph size={size} strokeWidth={stroke} color={color} /> : null}
    </span>
  );
}
