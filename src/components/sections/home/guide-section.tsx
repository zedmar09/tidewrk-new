import { SectionHeading } from "./section-heading";

// Client names stay out until each client gives permission (see Website Direction §7).
// TODO(client): Proof 3 "Our people stay" needs a confirmed retention number before it goes live.
const proofPoints = [
  {
    title: "We fix what others abandon.",
    body: "A previous vendor walked off a client project mid-stream. We took it over, stabilized it, and the engagement has grown since.",
  },
  {
    title: "We hold up under scrutiny.",
    body: "One client sent six of their own programmers to evaluate our team before they engaged. Another client’s CEO is famously and self-admittedly hard to satisfy, and we built their platform end to end.",
  },
  {
    title: "Clients send us clients.",
    body: "One client came through a referral and named us vendor of choice quickly. Another came through a board member. Most of our growth has come from someone vouching for us.",
  },
];

export function GuideSection() {
  return (
    <section className="relative overflow-hidden bg-[#02050a] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(0,63,114,0.32),transparent_40%)]"
      />
      <div className="relative mx-auto max-w-[1500px]">
        <SectionHeading
          description="We don’t send people and wait for instructions. We’re in the room where decisions get made, working in your tools, on your schedule, to your standard. That’s the difference between a vendor and a team."
          eyebrow="Why companies bet on us"
          title="We’ve been the team companies bet on. We build so that bet is safe."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {proofPoints.map((point) => (
            <article
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6 sm:p-7"
              key={point.title}
            >
              <h3 className="text-2xl font-semibold leading-tight text-white">
                {point.title}
              </h3>
              <p className="mt-4 text-lg leading-8 text-white/64">{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
