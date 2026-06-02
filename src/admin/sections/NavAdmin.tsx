import { useState } from "react";
import { type NavSettings } from "../../store";
import { Card, Label, Input, Btn, SectionHeader, Divider } from "../ui";

export default function NavAdmin({
  data,
  onChange,
}: {
  data: NavSettings;
  onChange: (d: NavSettings) => void;
}) {
  const [newLabel, setNewLabel] = useState("");
  const [newSection, setNewSection] = useState("");

  const addLink = () => {
    if (!newLabel.trim()) return;
    onChange({
      ...data,
      links: [...data.links, { label: newLabel.trim(), sectionId: newSection.trim() }],
    });
    setNewLabel("");
    setNewSection("");
  };

  const removeLink = (i: number) =>
    onChange({ ...data, links: data.links.filter((_, idx) => idx !== i) });

  const updateLink = (i: number, key: "label" | "sectionId", value: string) =>
    onChange({
      ...data,
      links: data.links.map((l, idx) => (idx === i ? { ...l, [key]: value } : l)),
    });

  return (
    <div>
      <SectionHeader title="Navigation" subtitle="Configure logo text and nav links." />

      <Card className="space-y-5">
        <div>
          <Label>Logo text</Label>
          <Input
            value={data.logoText}
            onChange={(v) => onChange({ ...data, logoText: v })}
            placeholder="JA"
          />
          <p className="text-xs text-muted mt-1">Shown inside the gradient ring in the navbar.</p>
        </div>

        <Divider />

        <div>
          <Label>Nav links</Label>
          <div className="space-y-2 mb-3">
            {data.links.map((link, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input
                  value={link.label}
                  onChange={(v) => updateLink(i, "label", v)}
                  placeholder="Label"
                />
                <Input
                  value={link.sectionId}
                  onChange={(v) => updateLink(i, "sectionId", v)}
                  placeholder="section-id"
                />
                <Btn variant="danger" size="sm" onClick={() => removeLink(i)}>✕</Btn>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newLabel} onChange={setNewLabel} placeholder="Label" />
            <Input value={newSection} onChange={setNewSection} placeholder="section-id" />
            <Btn onClick={addLink} variant="secondary">Add</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}
