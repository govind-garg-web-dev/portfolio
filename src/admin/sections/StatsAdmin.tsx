import { type Stat, uid } from "../../store";
import { Card, Label, Input, Btn, SectionHeader } from "../ui";

export default function StatsAdmin({
  data,
  onChange,
}: {
  data: Stat[];
  onChange: (d: Stat[]) => void;
}) {
  const add = () => onChange([...data, { id: uid(), value: "", label: "" }]);
  const update = (id: string, key: keyof Stat, value: string) =>
    onChange(data.map((x) => (x.id === id ? { ...x, [key]: value } : x)));
  const remove = (id: string) => onChange(data.filter((x) => x.id !== id));

  return (
    <div>
      <SectionHeader title="Stats" subtitle="Numbers displayed in the full-width stats strip." />

      <div className="space-y-3 mb-4">
        {data.map((stat) => (
          <Card key={stat.id}>
            <div className="flex gap-4 items-end">
              <div className="w-32">
                <Label>Value</Label>
                <Input
                  value={stat.value}
                  onChange={(v) => update(stat.id, "value", v)}
                  placeholder="20+"
                />
              </div>
              <div className="flex-1">
                <Label>Label</Label>
                <Input
                  value={stat.label}
                  onChange={(v) => update(stat.id, "label", v)}
                  placeholder="Years Experience"
                />
              </div>
              <Btn size="sm" variant="danger" onClick={() => remove(stat.id)}>Delete</Btn>
            </div>
          </Card>
        ))}
      </div>

      <Btn onClick={add} variant="secondary" className="w-full justify-center py-3">
        + Add stat
      </Btn>
    </div>
  );
}
