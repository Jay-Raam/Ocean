import { useEffect, useMemo, useRef, useState } from "react";
import type { SVGProps } from "react";
import { formatDate, nightsBetween } from "./data";

/* ------------------------- Icons ------------------------- */

type IconProps = SVGProps<SVGSVGElement>;

const CalendarIcon = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <rect x="3" y="4.5" width="18" height="17" rx="3" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
  </svg>
);

const ChevronIcon = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M9.5 6l6 6-6 6" />
  </svg>
);

/* ------------------------- Calendar helpers ------------------------- */

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const toISO = (y: number, m: number, d: number) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${y}-${pad(m + 1)}-${pad(d)}`;
};

interface DayCell {
  iso: string;
  day: number;
  disabled: boolean;
  inView: boolean;
}

function monthCells(year: number, month: number, minISO: string): DayCell[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: DayCell[] = [];
  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ iso: "", day: 0, disabled: true, inView: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = toISO(year, month, d);
    cells.push({ iso, day: d, disabled: iso < minISO, inView: true });
  }
  return cells;
}

/* ------------------------- Component ------------------------- */

export function DateRangePicker({
  checkin,
  checkout,
  onChange,
}: {
  checkin: string;
  checkout: string;
  onChange: (checkin: string, checkout: string) => void;
}) {
  const today = useMemo(() => {
    const now = new Date();
    return toISO(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const start = checkin ? new Date(checkin + "T00:00:00") : null;
  const [viewYear, setViewYear] = useState(start ? start.getFullYear() : new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(start ? start.getMonth() : new Date().getMonth());
  const [open, setOpen] = useState(false);
  const [hoverISO, setHoverISO] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keep the calendar aligned to the current selection when it changes.
  useEffect(() => {
    if (start) {
      setViewYear(start.getFullYear());
      setViewMonth(start.getMonth());
    }
  }, [checkin]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const nights = checkin && checkout ? nightsBetween(checkin, checkout) : 0;
  const fullRange = Boolean(checkin && checkout);

  const months = [
    { year: viewYear, month: viewMonth },
    { year: viewMonth === 11 ? viewYear + 1 : viewYear, month: viewMonth === 11 ? 0 : viewMonth + 1 },
  ];

  const inRange = (iso: string) => {
    if (!checkin || !checkout) return false;
    return iso > checkin && iso < checkout;
  };

  const hoverPreviewEnd = fullRange ? null : hoverISO;
  const isSelected = (iso: string) => iso === checkin || iso === checkout;
  const isRangeStart = (iso: string) => iso === checkin;
  const isRangeEnd = (iso: string) => iso === checkout;
  const isHoverEnd = (iso: string) => !fullRange && checkin && hoverISO && iso === hoverISO;

  const pick = (iso: string) => {
    if (iso < today) return;
    // Both dates set -> start a fresh range from this date.
    if (fullRange) {
      onChange(iso, "");
      return;
    }
    // Start date already picked -> complete the range.
    if (checkin) {
      if (iso <= checkin) {
        onChange(iso, ""); // picked a date before/equal the start: restart
      } else {
        onChange(checkin, iso);
      }
      return;
    }
    onChange(iso, "");
  };

  const apply = () => {
    if (fullRange) setOpen(false);
  };

  const label = fullRange ? `${formatDate(checkin)} → ${formatDate(checkout)}` : "Select dates";

  const cellClass = (c: DayCell) => {
    const classes = ["bk-dp-day"];
    if (!c.inView || c.disabled) classes.push("is-muted");
    if (c.disabled) classes.push("is-disabled");
    if (c.inView && !c.disabled && isSelected(c.iso)) classes.push("is-selected");
    if (c.inView && !c.disabled && isRangeStart(c.iso)) classes.push("is-start");
    if (c.inView && !c.disabled && isRangeEnd(c.iso)) classes.push("is-end");
    if (c.inView && !c.disabled && (inRange(c.iso) || (checkin && hoverPreviewEnd && c.iso > checkin && c.iso < hoverPreviewEnd)))
      classes.push("is-range");
    if (c.inView && !c.disabled && isHoverEnd(c.iso)) classes.push("is-hover-end");
    return classes.join(" ");
  };

  return (
    <div className="bk-datepicker" ref={wrapRef}>
      <button
        type="button"
        className={`bk-dp-trigger ${fullRange ? "has-value" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <CalendarIcon className="bk-dp-trigger-icon" width={17} height={17} />
        <span className="bk-dp-trigger-label">{label}</span>
        <span className="bk-dp-trigger-chevron">
          <ChevronIcon width={14} height={14} className={open ? "is-open" : ""} />
        </span>
      </button>

      {open && (
        <div className="bk-dp-popover" role="dialog" aria-label="Select dates">
          <div className="bk-dp-months">
            {months.map(({ year, month }, idx) => (
              <div className="bk-dp-month" key={`${year}-${month}`}>
                <div className="bk-dp-month-head">
                  {idx === 0 && (
                    <button
                      type="button"
                      className="bk-dp-nav"
                      onClick={() => {
                        if (viewMonth === 0) {
                          setViewMonth(11);
                          setViewYear((y) => y - 1);
                        } else {
                          setViewMonth((m) => m - 1);
                        }
                      }}
                      aria-label="Previous month"
                    >
                      <ChevronIcon width={15} height={15} className="flip" />
                    </button>
                  )}
                  <span className="bk-dp-month-title">
                    {MONTHS[month]} {year}
                  </span>
                  {idx === 1 && (
                    <button
                      type="button"
                      className="bk-dp-nav"
                      onClick={() => {
                        if (viewMonth === 11) {
                          setViewMonth(0);
                          setViewYear((y) => y + 1);
                        } else {
                          setViewMonth((m) => m + 1);
                        }
                      }}
                      aria-label="Next month"
                    >
                      <ChevronIcon width={15} height={15} />
                    </button>
                  )}
                </div>
                <div className="bk-dp-weekdays">
                  {WEEKDAYS.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
                <div className="bk-dp-grid">
                  {monthCells(year, month, today).map((c, i) =>
                    c.inView ? (
                      <button
                        type="button"
                        key={c.iso}
                        className={cellClass(c)}
                        disabled={c.disabled}
                        onClick={() => pick(c.iso)}
                        onMouseEnter={() => !c.disabled && setHoverISO(c.iso)}
                        onFocus={() => !c.disabled && setHoverISO(c.iso)}
                      >
                        {c.day}
                      </button>
                    ) : (
                      <span className="bk-dp-day is-muted" key={`blank-${i}`} />
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bk-dp-footer">
            <span className="bk-dp-nights">
              {nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : "Select your dates"}
            </span>
            <button type="button" className="bk-btn-primary bk-btn-small" disabled={!fullRange} onClick={apply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
