// Plain band: no cards, no icons. The villain is the transactional vendor, never distance.
export function ProblemSection() {
  return (
    <section className="relative bg-[#02050a] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[6vw]">
      <div className="mx-auto max-w-4xl">
        <span className="tidewrk-glow-badge inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
          What we were built against
        </span>
        <h2 className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.05] tracking-normal text-white sm:text-6xl lg:text-[4.2rem]">
          You&apos;re not struggling. You&apos;re constrained.
        </h2>

        <div className="mt-8 space-y-6 text-pretty text-xl leading-9 text-white/68 sm:text-2xl sm:leading-10">
          <p className="font-semibold text-white">
            You know what needs to happen. The gap is people.
          </p>
          <p>
            Hiring is slow, expensive, and competitive, and every hire is a bet
            you&apos;re the one who has to answer for. Meanwhile everything that
            matters depends on too few people, and you know exactly which ones.
          </p>
          <p>
            The usual answer makes it worse. A vendor sends people, takes
            direction, owns nothing, and rotates them out when it suits them.
            Six months later you&apos;re re-explaining your own business to
            someone new, or finding out the hard way who owns the code.
          </p>
          <p className="font-semibold text-white">
            Building a company shouldn&apos;t force a choice between what you
            can afford and what you can trust.
          </p>
        </div>
      </div>
    </section>
  );
}
