import { useState } from "react";
import { type Project, uid } from "../../store";
import { Card, Label, Input, Select, Btn, SectionHeader, ImagePreview, Divider } from "../ui";

const BLANK: Omit<Project, "id"> = {
  title: "",
  img: "",
  href: "",
  span: "md:col-span-7",
  aspect: "aspect-[16/10]",
};

const SPAN_OPTIONS = [
  { value: "md:col-span-7", label: "Wide (7/12)" },
  { value: "md:col-span-5", label: "Narrow (5/12)" },
];

const ASPECT_OPTIONS = [
  { value: "aspect-[16/10]", label: "Landscape 16:10" },
  { value: "aspect-[4/5]", label: "Portrait 4:5" },
];

function ProjectCard({
  project,
  index,
  total,
  onChange,
  onDelete,
  onMove,
}: {
  project: Project;
  index: number;
  total: number;
  onChange: (p: Project) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const set = (key: keyof Project, value: string) =>
    onChange({ ...project, [key]: value });

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-stroke/60 text-xs flex items-center justify-center text-muted font-mono">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-text-primary">{project.title || "Untitled"}</span>
        </div>
        <div className="flex gap-1">
          <Btn size="sm" variant="ghost" onClick={() => onMove(-1)} className={index === 0 ? "opacity-30 pointer-events-none" : ""}>↑</Btn>
          <Btn size="sm" variant="ghost" onClick={() => onMove(1)} className={index === total - 1 ? "opacity-30 pointer-events-none" : ""}>↓</Btn>
          <Btn size="sm" variant="danger" onClick={onDelete}>Delete</Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input value={project.title} onChange={(v) => set("title", v)} placeholder="Project title" />
        </div>
        <div>
          <Label>Project link (website / GitHub)</Label>
          <Input value={project.href} onChange={(v) => set("href", v)} placeholder="https://github.com/…" />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input value={project.img} onChange={(v) => set("img", v)} placeholder="https://…" />
          <ImagePreview src={project.img} />
        </div>
        <div className="space-y-4">
          <div>
            <Label>Column width</Label>
            <Select value={project.span} onChange={(v) => set("span", v as Project["span"])} options={SPAN_OPTIONS} />
          </div>
          <div>
            <Label>Aspect ratio</Label>
            <Select value={project.aspect} onChange={(v) => set("aspect", v as Project["aspect"])} options={ASPECT_OPTIONS} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ProjectsAdmin({
  data,
  onChange,
}: {
  data: Project[];
  onChange: (d: Project[]) => void;
}) {
  const add = () => onChange([...data, { id: uid(), ...BLANK }]);

  const update = (id: string, p: Project) =>
    onChange(data.map((x) => (x.id === id ? p : x)));

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
        title="Selected Works"
        subtitle="Manage bento grid projects. Order determines layout — wide+narrow pairs alternate."
      />

      <div className="space-y-4 mb-4">
        {data.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={data.length}
            onChange={(updated) => update(p.id, updated)}
            onDelete={() => remove(p.id)}
            onMove={(dir) => move(i, dir)}
          />
        ))}
      </div>

      <Btn onClick={add} variant="secondary" className="w-full justify-center py-3">
        + Add project
      </Btn>
    </div>
  );
}
