import Image from "next/image";

import { AiBackdrop } from "./ai/ai-backdrop";
import { SectionHeading } from "./section-heading";

export function AiWorkflowSection() {
  return (
    <section className="relative isolate -mt-px overflow-hidden bg-[#061F46] px-5 pb-24 pt-24 text-white sm:px-8 sm:pb-28 sm:pt-28 md:pb-32 md:pt-32 lg:px-[2.5vw] lg:pt-28">
      <AiBackdrop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(21,80,140,0.18),transparent_42%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1540px]">
        <SectionHeading
          className="max-w-[1140px]"
          description="We use AI where it makes the work faster and more consistent. Every piece of work still has a named person accountable for it, and nothing reaches you without human review."
          eyebrow="How we use AI"
          title={
            <>
              AI-supported tools,{" "}
              <span className="text-[#f18a73]">human-led execution.</span>
            </>
          }
        />

        <div className="mx-auto mt-12 w-full max-w-[1500px] sm:mt-14">
          <Image
            alt="Project Atlas workflow showing AI-assisted research, implementation, testing, and human release approval."
            className="h-auto w-full object-contain"
            height={819}
            sizes="(min-width: 1600px) 1500px, (min-width: 1024px) 95vw, 100vw"
            src="/images/ai/how-we-use-ai-project-workflow.svg"
            unoptimized
            width={1920}
          />
        </div>
      </div>
    </section>
  );
}
