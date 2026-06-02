import { useState } from "react";
import { type BlogPost, uid } from "../../store";
import { Card, Label, Input, Textarea, Btn, SectionHeader, ImagePreview, Divider, Badge } from "../ui";

const BLANK: Omit<BlogPost, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImg: "",
  date: "",
  readTime: "",
  tags: [],
  published: false,
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ── Toolbar button ────────────────────────────────────────────────────────────
function ToolbarBtn({
  label,
  title,
  onClick,
}: {
  label: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="px-2 py-1 text-xs text-muted hover:text-text-primary hover:bg-stroke/60 rounded transition-colors font-mono"
    >
      {label}
    </button>
  );
}

// ── Markdown toolbar ──────────────────────────────────────────────────────────
function MarkdownToolbar({ onInsert }: { onInsert: (before: string, after?: string) => void }) {
  return (
    <div className="flex flex-wrap gap-0.5 px-2 py-1.5 bg-bg border border-stroke rounded-t-xl border-b-0">
      <ToolbarBtn label="H2" title="Heading 2" onClick={() => onInsert("## ")} />
      <ToolbarBtn label="H3" title="Heading 3" onClick={() => onInsert("### ")} />
      <span className="w-px h-5 bg-stroke self-center mx-1" />
      <ToolbarBtn label="B" title="Bold" onClick={() => onInsert("**", "**")} />
      <ToolbarBtn label="I" title="Italic" onClick={() => onInsert("*", "*")} />
      <ToolbarBtn label="~~" title="Strikethrough" onClick={() => onInsert("~~", "~~")} />
      <ToolbarBtn label="`" title="Inline code" onClick={() => onInsert("`", "`")} />
      <span className="w-px h-5 bg-stroke self-center mx-1" />
      <ToolbarBtn label="Link" title="Link" onClick={() => onInsert("[", "](url)")} />
      <ToolbarBtn label="Img" title="Image" onClick={() => onInsert("![alt](", ")")} />
      <span className="w-px h-5 bg-stroke self-center mx-1" />
      <ToolbarBtn label=">" title="Blockquote" onClick={() => onInsert("> ")} />
      <ToolbarBtn label="1." title="Ordered list" onClick={() => onInsert("1. ")} />
      <ToolbarBtn label="—" title="Bullet list" onClick={() => onInsert("- ")} />
      <span className="w-px h-5 bg-stroke self-center mx-1" />
      <ToolbarBtn label="```" title="Code block" onClick={() => onInsert("```\n", "\n```")} />
      <ToolbarBtn label="---" title="Divider" onClick={() => onInsert("\n---\n")} />
    </div>
  );
}

// ── Post editor ───────────────────────────────────────────────────────────────
function PostEditor({
  post,
  onChange,
  onBack,
}: {
  post: BlogPost;
  onChange: (p: BlogPost) => void;
  onBack: () => void;
}) {
  const [newTag, setNewTag] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const set = (key: keyof BlogPost, value: unknown) =>
    onChange({ ...post, [key]: value });

  const handleTitleBlur = () => {
    if (!post.slug) set("slug", slugify(post.title));
  };

  const addTag = () => {
    const t = newTag.trim();
    if (!t || post.tags.includes(t)) return;
    set("tags", [...post.tags, t]);
    setNewTag("");
  };

  const removeTag = (t: string) =>
    set("tags", post.tags.filter((x) => x !== t));

  // Insert markdown at cursor position
  const insertMarkdown = (before: string, after = "") => {
    const ta = document.getElementById("md-editor") as HTMLTextAreaElement;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.slice(start, end);
    const newValue =
      ta.value.slice(0, start) + before + selected + after + ta.value.slice(end);
    set("content", newValue);
    // Restore cursor after React re-render
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    });
  };

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted hover:text-text-primary mb-6 transition-colors"
      >
        ← All posts
      </button>

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex-1 truncate">
          {post.title || "New post"}
        </h2>
        <Badge color={post.published ? "green" : "default"}>
          {post.published ? "Published" : "Draft"}
        </Badge>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <Card>
          <Label>Title</Label>
          <input
            value={post.title}
            onChange={(e) => set("title", e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Your post title…"
            className="w-full bg-transparent text-2xl font-display italic text-text-primary placeholder:text-muted/40 focus:outline-none border-b border-stroke pb-2"
          />
        </Card>

        {/* Meta row */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Slug (URL)</Label>
              <Input
                value={post.slug}
                onChange={(v) => set("slug", v)}
                placeholder="my-post-slug"
              />
              <p className="text-xs text-muted mt-1">/blog/{post.slug || "slug"}</p>
            </div>
            <div>
              <Label>Date</Label>
              <Input value={post.date} onChange={(v) => set("date", v)} placeholder="Mar 2026" />
            </div>
            <div>
              <Label>Read time</Label>
              <Input value={post.readTime} onChange={(v) => set("readTime", v)} placeholder="5 min read" />
            </div>
          </div>
        </Card>

        {/* Cover image */}
        <Card>
          <Label>Cover image URL</Label>
          <Input value={post.coverImg} onChange={(v) => set("coverImg", v)} placeholder="https://…" />
          <ImagePreview src={post.coverImg} />
        </Card>

        {/* Excerpt */}
        <Card>
          <Label>Excerpt (shown in journal list)</Label>
          <Textarea
            value={post.excerpt}
            onChange={(v) => set("excerpt", v)}
            placeholder="A short summary of the post…"
            rows={2}
          />
        </Card>

        {/* Tags */}
        <Card>
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 bg-stroke/50 text-text-primary text-xs rounded-full px-3 py-1">
                {t}
                <button onClick={() => removeTag(t)} className="text-muted hover:text-red-400 transition-colors leading-none">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newTag} onChange={setNewTag} placeholder="Add tag…" />
            <Btn onClick={addTag} variant="secondary">Add</Btn>
          </div>
        </Card>

        {/* Content editor */}
        <Card className="!p-0 overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center gap-0 border-b border-stroke px-4">
            {(["write", "preview"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs uppercase tracking-[0.15em] transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "text-text-primary border-[#89AACC]"
                    : "text-muted border-transparent hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
            <span className="flex-1" />
            <span className="text-xs text-muted font-mono">Markdown</span>
          </div>

          {activeTab === "write" ? (
            <>
              <MarkdownToolbar onInsert={insertMarkdown} />
              <textarea
                id="md-editor"
                value={post.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder={`## Introduction\n\nStart writing your post in **Markdown**…`}
                rows={22}
                spellCheck
                className="w-full bg-bg border border-stroke rounded-b-xl px-5 py-4 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors resize-y font-mono leading-relaxed"
              />
            </>
          ) : (
            <MarkdownPreview content={post.content} />
          )}
        </Card>

        {/* Publish toggle */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                {post.published ? "Published" : "Draft"}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {post.published
                  ? "This post is live on the journal."
                  : "Only published posts appear in the journal."}
              </p>
            </div>
            <button
              onClick={() => set("published", !post.published)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                post.published ? "bg-[#89AACC]" : "bg-stroke"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  post.published ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Inline markdown preview ───────────────────────────────────────────────────
function MarkdownPreview({ content }: { content: string }) {
  // Lazy-load react-markdown to avoid SSR issues
  const [Md, setMd] = useState<React.ComponentType<{ children: string; className?: string }> | null>(null);

  useState(() => {
    import("react-markdown").then((m) => setMd(() => m.default));
  });

  if (!Md) return <div className="px-5 py-4 text-sm text-muted">Loading preview…</div>;

  return (
    <div className="px-5 py-6 prose prose-sm max-w-none blog-preview border border-stroke rounded-b-xl bg-bg min-h-[400px]">
      <Md>{content}</Md>
    </div>
  );
}

// ── Post list ─────────────────────────────────────────────────────────────────
function PostList({
  posts,
  onSelect,
  onNew,
  onDelete,
  onTogglePublish,
}: {
  posts: BlogPost[];
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Blog Posts</h2>
          <p className="text-sm text-muted mt-1">
            {posts.filter((p) => p.published).length} published · {posts.filter((p) => !p.published).length} drafts
          </p>
        </div>
        <Btn onClick={onNew} variant="primary">+ New post</Btn>
      </div>

      {posts.length === 0 ? (
        <Card className="text-center py-16">
          <p className="text-4xl mb-4 opacity-20">✦</p>
          <p className="text-muted text-sm">No posts yet. Click "New post" to get started.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="!p-0 overflow-hidden">
              <div className="flex items-stretch">
                {/* Cover thumbnail */}
                {post.coverImg ? (
                  <div
                    className="w-20 flex-shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.coverImg})` }}
                  />
                ) : (
                  <div className="w-20 flex-shrink-0 bg-stroke/30 flex items-center justify-center text-muted/30 text-2xl">
                    ✦
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 px-4 py-3 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-medium text-text-primary truncate">
                      {post.title || "Untitled"}
                    </span>
                    <Badge color={post.published ? "green" : "default"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted truncate mb-1.5">{post.excerpt || "No excerpt"}</p>
                  <div className="flex items-center gap-3 text-xs text-muted/60">
                    {post.date && <span>{post.date}</span>}
                    {post.readTime && <span>·</span>}
                    {post.readTime && <span>{post.readTime}</span>}
                    {post.tags.length > 0 && <span>·</span>}
                    {post.tags.slice(0, 3).map((t) => (
                      <span key={t} className="bg-stroke/40 rounded px-1.5 py-0.5">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1 p-2 flex-shrink-0 justify-center border-l border-stroke">
                  <Btn size="sm" variant="secondary" onClick={() => onSelect(post.id)}>Edit</Btn>
                  <Btn
                    size="sm"
                    variant="ghost"
                    onClick={() => onTogglePublish(post.id)}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </Btn>
                  <Btn
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      if (confirm(`Delete "${post.title || "this post"}"?`)) onDelete(post.id);
                    }}
                  >
                    Delete
                  </Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────
export default function BlogAdmin({
  data,
  onChange,
}: {
  data: BlogPost[];
  onChange: (d: BlogPost[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingPost = data.find((p) => p.id === editingId) ?? null;

  const handleNew = () => {
    const post: BlogPost = { id: uid(), ...BLANK };
    onChange([...data, post]);
    setEditingId(post.id);
  };

  const handleUpdate = (updated: BlogPost) =>
    onChange(data.map((p) => (p.id === updated.id ? updated : p)));

  const handleDelete = (id: string) => {
    onChange(data.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleTogglePublish = (id: string) =>
    onChange(data.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));

  if (editingPost) {
    return (
      <PostEditor
        post={editingPost}
        onChange={handleUpdate}
        onBack={() => setEditingId(null)}
      />
    );
  }

  return (
    <PostList
      posts={data}
      onSelect={setEditingId}
      onNew={handleNew}
      onDelete={handleDelete}
      onTogglePublish={handleTogglePublish}
    />
  );
}
