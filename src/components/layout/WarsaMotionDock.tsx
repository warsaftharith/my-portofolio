import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";
import type { NavConfig } from "../../context/NavigationAppearanceContext";
import "../../styles/warsa-motion-dock-357.css";
/* WARSA_DOCK_REFERENCE_VISUAL_V358 */
import "../../styles/warsa-motion-dock-358.css";

/**
 * WARSA V3.5.7 — Reference-based dock UI.
 * Apple = Jelly; Capsule = Elastic; Liquid Glass = press-and-drag lens.
 * Only presentation is new. Navigation, Appearance and persisted settings stay unchanged.
 */
type DockStyle = "apple" | "liquid" | "capsule";
type DockIcon = import("lucide-react").LucideIcon;

export type WarsaDockLink = {
  section: string;
  label: string;
  icon: DockIcon;
};

type Rect = { start: number; size: number };

type Props = {
  items: WarsaDockLink[];
  value: string;
  onSelect: (section: string) => void;
  config: NavConfig;
  mobile: boolean;
  hidden: boolean;
};

function useGeometry(
  rootRef: RefObject<HTMLElement | null>,
  itemRefs: RefObject<(HTMLButtonElement | null)[]>,
  vertical: boolean,
  itemCount: number,
) {
  const [rects, setRects] = useState<Rect[]>([]);
  const measure = useCallback(() => {
    const next = itemRefs.current.map((item) => ({
      start: item ? (vertical ? item.offsetTop : item.offsetLeft) : 0,
      size: item ? (vertical ? item.offsetHeight : item.offsetWidth) : 0,
    }));
    setRects((old) =>
      old.length === next.length && old.every((r, i) => r.start === next[i].start && r.size === next[i].size)
        ? old : next,
    );
  }, [itemRefs, vertical]);

  useLayoutEffect(() => {
    measure();
    const nav = rootRef.current;
    if (!nav) return;
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(nav);
    itemRefs.current.forEach((item) => item && observer?.observe(item));
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [itemCount, rootRef, itemRefs, measure]);
  return rects;
}

function Jelly({ position, length, vertical, reduced }: {
  position: number; length: number; vertical: boolean; reduced: boolean;
}) {
  const p = useSpring(position, reduced
    ? { stiffness: 2000, damping: 130 }
    : { stiffness: 320, damping: 26, mass: 0.9 });
  const l = useSpring(length, reduced
    ? { stiffness: 2000, damping: 130 }
    : { stiffness: 300, damping: 28 });
  useEffect(() => { p.set(position); l.set(length); }, [position, length, p, l]);
  const velocity = useVelocity(p);
  const stretch = useTransform(velocity, [-2600, 0, 2600], [1.14, 1, 1.14]);
  const squeeze = useTransform(velocity, [-2600, 0, 2600], [0.92, 1, 0.92]);
  return (
    <motion.span
      aria-hidden="true"
      className="wa357-indicator wa357-indicator-jelly"
      style={vertical
        ? { top: 0, y: p, height: l, scaleY: reduced ? 1 : stretch, scaleX: reduced ? 1 : squeeze }
        : { left: 0, x: p, width: l, scaleX: reduced ? 1 : stretch, scaleY: reduced ? 1 : squeeze }}
    >
      <span className="wa357-shine" />
    </motion.span>
  );
}

function Elastic({ position, length, direction, vertical, reduced }: {
  position: number; length: number; direction: 1 | -1; vertical: boolean; reduced: boolean;
}) {
  const leading = useMotionValue(position);
  const trailing = useMotionValue(position + length);
  const size = useTransform([leading, trailing], ([a, b]) => Math.max(Number(b) - Number(a), 0));
  const controls = useRef<AnimationPlaybackControls[]>([]);
  const first = useRef(true);

  useEffect(() => {
    controls.current.forEach((controller) => controller.stop());
    controls.current = [];
    const end = position + length;
    if (reduced || first.current) {
      first.current = false;
      leading.set(position);
      trailing.set(end);
      return;
    }
    const leadSpring = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;
    const trailSpring = { type: "spring", stiffness: 150, damping: 21, mass: 0.9 } as const;
    controls.current = [
      animate(leading, position, direction > 0 ? trailSpring : leadSpring),
      animate(trailing, end, direction > 0 ? leadSpring : trailSpring),
    ];
    return () => { controls.current.forEach((controller) => controller.stop()); };
  }, [position, length, direction, reduced, leading, trailing]);

  return (
    <motion.span
      aria-hidden="true"
      className="wa357-indicator wa357-indicator-elastic"
      style={vertical
        ? { top: 0, y: leading, height: size }
        : { left: 0, x: leading, width: size }}
    >
      <span className="wa357-shine" />
    </motion.span>
  );
}

function LiquidLens({ position, length, vertical, pressed, reduced }: {
  position: number; length: number; vertical: boolean; pressed: boolean; reduced: boolean;
}) {
  const p = useMotionValue(position);
  const l = useMotionValue(length);
  const animations = useRef<AnimationPlaybackControls[]>([]);
  const initialized = useRef(false);
  useEffect(() => {
    animations.current.forEach((ctrl) => ctrl.stop());
    animations.current = [];
    if (!initialized.current || reduced) {
      p.set(position);
      l.set(length);
      initialized.current = true;
      return;
    }
    const spring = pressed
      ? { type: "spring", stiffness: 280, damping: 28, mass: 0.95 } as const
      : { type: "spring", stiffness: 95, damping: 20, mass: 1 } as const;
    animations.current = [animate(p, position, spring), animate(l, length, spring)];
    return () => animations.current.forEach((ctrl) => ctrl.stop());
  }, [position, length, pressed, reduced, p, l]);

  const velocity = useVelocity(p);
  const stretch = useTransform(velocity, [-1800, 0, 1800], [1.1, 1, 1.1]);
  const shrink = useTransform(velocity, [-1800, 0, 1800], [0.96, 1, 0.96]);
  return (
    <motion.span
      aria-hidden="true"
      className="wa357-indicator wa357-indicator-liquid"
      animate={{ scale: pressed && !reduced ? 1.12 : 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 22 }}
      style={vertical
        ? { top: 0, y: p, height: l, scaleY: reduced ? 1 : stretch, scaleX: reduced ? 1 : shrink }
        : { left: 0, x: p, width: l, scaleX: reduced ? 1 : stretch, scaleY: reduced ? 1 : shrink }}
    >
      <span className="wa357-shine" />
    </motion.span>
  );
}

export default function WarsaMotionDock({ items, value, onSelect, config, mobile, hidden }: Props) {
  const style = config.style as DockStyle;
  const vertical = config.position !== "bottom";
  const reduced = Boolean(useReducedMotion()) || !config.animate;
  const navRef = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const rects = useGeometry(navRef, buttons, vertical, items.length);
  const activeIdx = Math.max(0, items.findIndex((item) => item.section === value));
  const previousIdx = useRef(activeIdx);
  const direction = useRef<1 | -1>(1);
  if (previousIdx.current !== activeIdx) {
    direction.current = activeIdx > previousIdx.current ? 1 : -1;
    previousIdx.current = activeIdx;
  }

  const [dragging, setDragging] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const gesture = useRef<{ id: number; start: number; latest: number } | null>(null);
  const visualIdx = dragging && hoverIdx !== null ? hoverIdx : activeIdx;
  const visualRect = rects[visualIdx];
  const [dragPoint, setDragPoint] = useState<number | null>(null);
  const lensPosition = style === "liquid" && dragging && dragPoint !== null && visualRect
    ? Math.max(6, Math.min(dragPoint - visualRect.size / 2,
      ((vertical ? navRef.current?.scrollHeight : navRef.current?.scrollWidth) ?? 0) - visualRect.size - 6))
    : visualRect?.start ?? 0;

  const getLocal = (event: ReactPointerEvent<HTMLElement>) => {
    const root = event.currentTarget.getBoundingClientRect();
    return vertical ? event.clientY - root.top + event.currentTarget.scrollTop
      : event.clientX - root.left + event.currentTarget.scrollLeft;
  };
  const findNearest = (point: number) => {
    if (!rects.length) return activeIdx;
    let nearest = 0;
    let distance = Infinity;
    rects.forEach((r, i) => {
      const next = Math.abs(point - r.start - r.size / 2);
      if (next < distance) { nearest = i; distance = next; }
    });
    return nearest;
  };
  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (style !== "liquid" || event.button !== 0 || hidden) return;
    const local = getLocal(event);
    gesture.current = { id: event.pointerId, start: local, latest: local };
    setHoverIdx(findNearest(local));
    setDragPoint(local);
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!gesture.current || gesture.current.id !== event.pointerId) return;
    const local = getLocal(event);
    const next = findNearest(local);
    if (next !== hoverIdx && Math.abs(local - gesture.current.latest) > 3) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(6);
    }
    gesture.current.latest = local;
    setHoverIdx(next);
    setDragPoint(local);
  };
  const finish = (event: ReactPointerEvent<HTMLElement>, cancelled = false) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const chosen = findNearest(getLocal(event));
    gesture.current = null;
    setDragging(false);
    setHoverIdx(null);
    setDragPoint(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!cancelled && items[chosen]) onSelect(items[chosen].section);
  };

  const baseW = { compact: 48, normal: 60, large: 74 }[config.size];
  const baseH = { compact: 51, normal: 57, large: 70 }[config.size];
  const vars = {
    "--wa357-width": `${Math.round(baseW * config.width / 100)}px`,
    "--wa357-height": `${Math.round(baseH * config.height / 100)}px`,
    "--wa357-gap": `${config.spacing}px`,
    "--wa357-font": `${config.labelSize}px`,
    "--wa357-blur": `${config.blur}px`,
    "--wa357-opacity": config.transparency / 100,
  } as CSSProperties;

  return (
    <motion.nav
      ref={navRef}
      className={`wa-motion-dock-357 wa357-${style} wa357-${config.position}${mobile ? " wa357-mobile" : ""}${config.labels ? " wa357-labels" : ""}`}
      style={{ ...vars, pointerEvents: hidden ? "none" : "auto" }}
      aria-label="Navigasi portfolio"
      aria-hidden={hidden}
      inert={hidden}
      initial={config.animate && !reduced ? { opacity: 0, scale: 0.96 } : false}
      animate={{
        opacity: hidden ? 0 : 1,
        x: hidden && vertical ? (config.position === "left" ? -135 : 135) : 0,
        y: hidden && !vertical ? 120 : 0,
        scale: hidden ? 0.98 : 1,
      }}
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 330, damping: 30 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(event) => finish(event)}
      onPointerCancel={(event) => finish(event, true)}
      onLostPointerCapture={() => {
        gesture.current = null;
        setDragging(false);
        setHoverIdx(null);
        setDragPoint(null);
      }}
    >
      {visualRect && visualRect.size > 0 && (
        style === "apple" ? (
          <Jelly position={visualRect.start} length={visualRect.size} vertical={vertical} reduced={reduced}/>
        ) : style === "capsule" ? (
          <Elastic position={visualRect.start} length={visualRect.size} direction={direction.current} vertical={vertical} reduced={reduced}/>
        ) : (
          <LiquidLens position={lensPosition} length={visualRect.size} vertical={vertical} pressed={dragging} reduced={reduced}/>
        )
      )}
      {items.map(({ section, label, icon: Icon }, index) => {
        const selected = section === value;
        const onLens = index === visualIdx;
        return (
          <motion.button
            key={section}
            type="button"
            ref={(el) => { buttons.current[index] = el; }}
            className={`wa357-item${selected ? " wa357-selected" : ""}${onLens ? " wa357-under-lens" : ""}`}
            aria-label={label}
            aria-current={selected ? "location" : undefined}
            title={label}
            onClick={(event) => {
              if (style !== "liquid" || event.detail === 0) onSelect(section);
            }}
            whileTap={reduced || style === "liquid" ? undefined : { scale: 0.94 }}
          >
            <motion.span
              className="wa357-icon"
              animate={reduced ? undefined : style === "liquid"
                ? { scale: dragging && onLens && config.magnify ? 1.2 : 1 }
                : { scale: selected && config.magnify ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <Icon size={mobile ? 20 : 21} strokeWidth={1.9} aria-hidden />
            </motion.span>
            {config.labels && <span className="wa357-label">{label}</span>}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
