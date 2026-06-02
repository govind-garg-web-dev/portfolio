import { type JournalEntry, uid } from "../../store";
import { Card, Label, Input, Btn, SectionHeader, ImagePreview } from "../ui";

const BLANK: Omit<JournalEntry, "id"> = {
  title: "",
  img: "",
  readTime: "",
  date: "",
  href: "#",
};

function EntryCard({
  entry,
  index,
  total,
  onChange,
  onDelete,
  onMove,
}: {
  entry: JournalEntry;
  index: number;
  total: number;
  onChange: (e: JournalEntry) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const set = (key: keyof JournalEntry, value: string) =>
    onChange({ ...entry, [key]: value });

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-stroke/60 text-xs flex items-center justify-center text-muted font-mono">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-text-primary line-clamp-1 max-w-xs">
            {entry.title || "Untitled"}
          </span>
        </div>
        <div className="flex gap-1">
          <Btn size="sm" variant="ghost" onClick={() => onMove(-1)} className={index === 0 ? "opacity-30 pointer-events-none" : ""}>↑</Btn>
          <Btn size="sm" variant="ghost" onClick={() => onMove(1)} className={index === total - 1 ? "opacity-30 pointer-events-none" : ""}>↓</Btn>
          <Btn size="sm" variant="danger" onClick={onDelete}>Delete</Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label>Title</Label>
          <Input value={entry.title} onChange={(v) => set("title", v)} placeholder="Article title" />
        </div>
        <div>
          <Label>Thumbnail URL</Label>
          <Input value={entry.img} onChange={(v) => set("img", v)} placeholder="https://…" />
          <ImagePreview src={entry.img} />
        </div>
        <div className="space-y-4">
          <div>
            <Label>Read time</Label>
            <Input value={entry.readTime} onChange={(v) => set("readTime", v)} placeholder="5 min read" />
          </div>
          <div>
            <Label>Date</Label>
            <Input value={entry.date} onChange={(v) => set("date", v)} placeholder="Mar 2026" />
          </div>
          <div>
            <Label>Link (href)</Label>
            <Input value={entry.href} onChange={(v) => set("href", v)} placeholder="https://… or #" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function JournalAdmin({
  data,
  onChange,
}: {
  data: JournalEntry[];
  onChange: (d: JournalEntry[]) => void;
}) {
  const add = () => onChange([...data, { id: uid(), ...BLANK }]);
  const update = (id: string, e: JournalEntry) =>
    onChange(data.map((x) => (x.id === id ? e : x)));
  const remove = (id: string) => onChange(data.filter((x) => x.id !== id));
  const move = (index: number, dir: -1 | 1) => {
    const next = [...data];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div>
      <SectionHeader title="Journal" subtitle="Manage blog entries shown as horizontal pill rows." />

      <div className="space-y-4 mb-4">
        {data.map((entry, i) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            index={i}
            total={data.length}
            onChange={(updated) => update(entry.id, updated)}
            onDelete={() => remove(entry.id)}
            onMove={(dir) => move(i, dir)}
          />
        ))}
      </div>

      <Btn onClick={add} variant="secondary" className="w-full justify-center py-3">
        + Add entry
      </Btn>
    </div>
  );
}
