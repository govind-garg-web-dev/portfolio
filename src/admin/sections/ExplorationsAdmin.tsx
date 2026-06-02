import { type ExplorationItem, uid } from "../../store";
import { Card, Label, Input, Select, Btn, SectionHeader, ImagePreview } from "../ui";

const BLANK: Omit<ExplorationItem, "id"> = {
  img: "",
  label: "",
  col: 0,
  rotation: 0,
};

const COL_OPTIONS = [
  { value: "0", label: "Left column" },
  { value: "1", label: "Right column" },
];

function ItemCard({
  item,
  index,
  total,
  onChange,
  onDelete,
  onMove,
}: {
  item: ExplorationItem;
  index: number;
  total: number;
  onChange: (e: ExplorationItem) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-stroke/60 text-xs flex items-center justify-center text-muted font-mono">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-text-primary">{item.label || "Unlabeled"}</span>
        </div>
        <div className="flex gap-1">
          <Btn size="sm" variant="ghost" onClick={() => onMove(-1)} className={index === 0 ? "opacity-30 pointer-events-none" : ""}>↑</Btn>
          <Btn size="sm" variant="ghost" onClick={() => onMove(1)} className={index === total - 1 ? "opacity-30 pointer-events-none" : ""}>↓</Btn>
          <Btn size="sm" variant="danger" onClick={onDelete}>Delete</Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Image URL</Label>
          <Input
            value={item.img}
            onChange={(v) => onChange({ ...item, img: v })}
            placeholder="https://…"
          />
          <ImagePreview src={item.img} />
        </div>
        <div className="space-y-4">
          <div>
            <Label>Label</Label>
            <Input
              value={item.label}
              onChange={(v) => onChange({ ...item, label: v })}
              placeholder="Geometry"
            />
          </div>
          <div>
            <Label>Column</Label>
            <Select
              value={String(item.col)}
              onChange={(v) => onChange({ ...item, col: Number(v) as 0 | 1 })}
              options={COL_OPTIONS}
            />
          </div>
          <div>
            <Label>Rotation (degrees)</Label>
            <Input
              type="number"
              value={String(item.rotation)}
              onChange={(v) => onChange({ ...item, rotation: Number(v) })}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ExplorationsAdmin({
  data,
  onChange,
}: {
  data: ExplorationItem[];
  onChange: (d: ExplorationItem[]) => void;
}) {
  const add = () => onChange([...data, { id: uid(), ...BLANK }]);
  const update = (id: string, item: ExplorationItem) =>
    onChange(data.map((x) => (x.id === id ? item : x)));
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
      <SectionHeader
        title="Explorations"
        subtitle="Parallax gallery images. Assign to left or right column and set tilt rotation."
      />

      <div className="space-y-4 mb-4">
        {data.map((item, i) => (
          <ItemCard
            key={item.id}
            item={item}
            index={i}
            total={data.length}
            onChange={(updated) => update(item.id, updated)}
            onDelete={() => remove(item.id)}
            onMove={(dir) => move(i, dir)}
          />
        ))}
      </div>

      <Btn onClick={add} variant="secondary" className="w-full justify-center py-3">
        + Add image
      </Btn>
    </div>
  );
}
