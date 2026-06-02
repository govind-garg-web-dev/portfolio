import { useState } from "react";
import { type HeroSettings } from "../../store";
import { Card, Label, Input, Textarea, Btn, SectionHeader, Divider } from "../ui";

export default function HeroAdmin({
  data,
  onChange,
}: {
  data: HeroSettings;
  onChange: (d: HeroSettings) => void;
}) {
  const [newRole, setNewRole] = useState("");

  const set = (key: keyof HeroSettings, value: string) =>
    onChange({ ...data, [key]: value });

  const addRole = () => {
    const trimmed = newRole.trim();
    if (!trimmed) return;
    onChange({ ...data, roles: [...data.roles, trimmed] });
    setNewRole("");
  };

  const removeRole = (i: number) =>
    onChange({ ...data, roles: data.roles.filter((_, idx) => idx !== i) });

  return (
    <div>
      <SectionHeader title="Hero Section" subtitle="Edit the headline, roles, description and CTA buttons." />

      <Card className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label>Eyebrow text</Label>
            <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} placeholder="COLLECTION '26" />
          </div>
          <div>
            <Label>City</Label>
            <Input value={data.city} onChange={(v) => set("city", v)} placeholder="Chicago" />
          </div>
        </div>

        <div>
          <Label>Name (large headline)</Label>
          <Input value={data.name} onChange={(v) => set("name", v)} placeholder="Michael Smith" />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea value={data.description} onChange={(v) => set("description", v)} rows={2} />
        </div>

        <Divider />

        <div>
          <Label>Cycling roles</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {data.roles.map((role, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-stroke/50 text-text-primary text-xs rounded-full px-3 py-1"
              >
                <em className="font-display italic">{role}</em>
                <button
                  onClick={() => removeRole(i)}
                  className="text-muted hover:text-red-400 transition-colors leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newRole} onChange={setNewRole} placeholder="Add a role…" />
            <Btn onClick={addRole} variant="secondary">Add</Btn>
          </div>
        </div>

        <Divider />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label>Primary CTA label</Label>
            <Input value={data.ctaPrimaryLabel} onChange={(v) => set("ctaPrimaryLabel", v)} />
          </div>
          <div>
            <Label>Primary CTA link</Label>
            <Input value={data.ctaPrimaryHref} onChange={(v) => set("ctaPrimaryHref", v)} placeholder="#works" />
          </div>
          <div>
            <Label>Secondary CTA label</Label>
            <Input value={data.ctaSecondaryLabel} onChange={(v) => set("ctaSecondaryLabel", v)} />
          </div>
          <div>
            <Label>Secondary CTA link</Label>
            <Input value={data.ctaSecondaryHref} onChange={(v) => set("ctaSecondaryHref", v)} placeholder="mailto:…" />
          </div>
        </div>
      </Card>
    </div>
  );
}
