import { type FooterSettings, type SocialLink, uid } from "../../store";
import { Card, Label, Input, Textarea, Btn, SectionHeader, Divider } from "../ui";

export default function FooterAdmin({
  footer,
  socials,
  onFooterChange,
  onSocialsChange,
}: {
  footer: FooterSettings;
  socials: SocialLink[];
  onFooterChange: (d: FooterSettings) => void;
  onSocialsChange: (d: SocialLink[]) => void;
}) {
  const setFooter = (key: keyof FooterSettings, value: string) =>
    onFooterChange({ ...footer, [key]: value });

  const addSocial = () =>
    onSocialsChange([...socials, { id: uid(), label: "", href: "#" }]);

  const updateSocial = (id: string, key: keyof SocialLink, value: string) =>
    onSocialsChange(socials.map((s) => (s.id === id ? { ...s, [key]: value } : s)));

  const removeSocial = (id: string) =>
    onSocialsChange(socials.filter((s) => s.id !== id));

  return (
    <div>
      <SectionHeader title="Footer & Contact" subtitle="Marquee text, CTA headline, email and social links." />

      <Card className="space-y-5 mb-6">
        <div>
          <Label>Marquee text</Label>
          <Input
            value={footer.marqueeText}
            onChange={(v) => setFooter("marqueeText", v)}
            placeholder="BUILDING THE FUTURE • "
          />
          <p className="text-xs text-muted mt-1">Repeated horizontally across the footer. Include trailing space + bullet.</p>
        </div>

        <div>
          <Label>CTA headline</Label>
          <Textarea
            value={footer.headline}
            onChange={(v) => setFooter("headline", v)}
            placeholder={"Let's build something\nremarkable"}
            rows={2}
          />
          <p className="text-xs text-muted mt-1">Use \n for line breaks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label>Contact email</Label>
            <Input
              value={footer.email}
              onChange={(v) => setFooter("email", v)}
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <Label>Availability status text</Label>
            <Input
              value={footer.availableText}
              onChange={(v) => setFooter("availableText", v)}
              placeholder="Available for projects"
            />
          </div>
        </div>
      </Card>

      <SectionHeader title="Social Links" subtitle="Shown in the footer bar." />

      <div className="space-y-3 mb-4">
        {socials.map((s) => (
          <Card key={s.id}>
            <div className="flex gap-4 items-end">
              <div className="w-40">
                <Label>Label</Label>
                <Input
                  value={s.label}
                  onChange={(v) => updateSocial(s.id, "label", v)}
                  placeholder="Twitter"
                />
              </div>
              <div className="flex-1">
                <Label>URL</Label>
                <Input
                  value={s.href}
                  onChange={(v) => updateSocial(s.id, "href", v)}
                  placeholder="https://twitter.com/…"
                />
              </div>
              <Btn size="sm" variant="danger" onClick={() => removeSocial(s.id)}>Delete</Btn>
            </div>
          </Card>
        ))}
      </div>

      <Btn onClick={addSocial} variant="secondary" className="w-full justify-center py-3">
        + Add social link
      </Btn>
    </div>
  );
}
