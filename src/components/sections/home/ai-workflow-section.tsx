import { SectionHeading } from "./section-heading";

// The one homepage section about AI. AI stays out of every other section.
// TODO(client): the three lists (where AI helps / where a person decides /
// what never ships unreviewed) and the tools list need confirmation from
// Jay and the delivery team before they go live. Until then they stay off the page.

export function AiWorkflowSection() {
  return (
    <section className="relative overflow-hidden bg-[#02050a] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,63,114,0.55),transparent_38%)]"
      />

      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading
          eyebrow="How we use AI"
          title={
            <>
              AI-supported tools,{" "}
              <span className="tidewrk-glow-text">human-led execution.</span>
            </>
          }
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <p className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
            The tide lifts. It doesn&apos;t steer.
          </p>

          <div className="space-y-6 text-pretty text-xl leading-9 text-white/68">
            <p>
              We use AI where it makes the work faster and more consistent:
              drafting, testing, research, the repetitive middle of a task. We
              don&apos;t use it where judgment is the point.
            </p>
            <p>
              Every piece of work has a named person accountable for it. A
              model can speed up what they do. It doesn&apos;t replace their
              review, and nothing reaches you without a person having looked
              at it and signed off.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-4xl rounded-full border border-white/10 bg-white/[0.045] px-6 py-4 text-center text-base leading-7 text-white/72 sm:text-lg">
          We work in the tools you already run: Jira, Slack, Notion, Microsoft
          Teams, and more.
        </p>
      </div>
    </section>
  );
}
