import Image from "next/image";
import Link from "next/link";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiApacheairflow,
  SiApacheecharts,
  SiApachejmeter,
  SiApachekafka,
  SiApachespark,
  SiApachesuperset,
  SiApple,
  SiCypress,
  SiDatabricks,
  SiDbt,
  SiDocker,
  SiElectron,
  SiFlutter,
  SiGooglecloud,
  SiGooglesheets,
  SiGrafana,
  SiHuggingface,
  SiJest,
  SiJupyter,
  SiKeras,
  SiKotlin,
  SiKubernetes,
  SiLaravel,
  SiLooker,
  SiMetabase,
  SiNextdotjs,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPlotly,
  SiPostman,
  SiPython,
  SiPytorch,
  SiQlik,
  SiReact,
  SiScikitlearn,
  SiScipy,
  SiSelenium,
  SiSnowflake,
  SiSwift,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiVitest,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

import { SectionHeading } from "@/components/sections/home/section-heading";
import { SoftWaveJoin } from "@/components/sections/home/shared/soft-wave-join";
import type { RoutePageContent } from "@/constants/route-pages";

type IncludedContent = NonNullable<RoutePageContent["included"]>;

type Tool = {
  name: string;
  icon: IconType;
  color: string;
};

const toolGroups: Record<string, Tool[]> = {
  "/web-desktop-application-development": [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "TypeScript", icon: SiTypescript, color: "#4C9BE8" },
    { name: "Laravel", icon: SiLaravel, color: "#FF6A5B" },
    { name: "Python", icon: SiPython, color: "#FFD66B" },
    { name: "Electron", icon: SiElectron, color: "#8BE2E8" },
  ],
  "/mobile-application-development": [
    { name: "Android", icon: SiAndroid, color: "#62E59B" },
    { name: "iOS", icon: SiApple, color: "#FFFFFF" },
    { name: "Swift", icon: SiSwift, color: "#FF795D" },
    { name: "Kotlin", icon: SiKotlin, color: "#A989FF" },
    { name: "React Native", icon: SiReact, color: "#61DAFB" },
    { name: "Flutter", icon: SiFlutter, color: "#58B7F7" },
  ],
  "/qa-testing-and-engineering": [
    { name: "Cypress", icon: SiCypress, color: "#FFFFFF" },
    { name: "Selenium", icon: SiSelenium, color: "#59C36A" },
    { name: "Postman", icon: SiPostman, color: "#FF7A59" },
    { name: "Jest", icon: SiJest, color: "#E46E83" },
    { name: "JMeter", icon: SiApachejmeter, color: "#E97451" },
    { name: "Vitest", icon: SiVitest, color: "#A7D94C" },
  ],
  "/cloud-services": [
    { name: "AWS", icon: FaAws, color: "#FFB84D" },
    { name: "Azure", icon: VscAzure, color: "#55B7F3" },
    { name: "Google Cloud", icon: SiGooglecloud, color: "#76A7FA" },
    { name: "Docker", icon: SiDocker, color: "#52A8F8" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#5D8DF6" },
    { name: "Terraform", icon: SiTerraform, color: "#A98BF5" },
  ],
  "/data-engineering": [
    { name: "Spark", icon: SiApachespark, color: "#F07B3F" },
    { name: "Kafka", icon: SiApachekafka, color: "#FFFFFF" },
    { name: "Airflow", icon: SiApacheairflow, color: "#49A6E9" },
    { name: "dbt", icon: SiDbt, color: "#FF7A66" },
    { name: "Snowflake", icon: SiSnowflake, color: "#5AC8F5" },
    { name: "Databricks", icon: SiDatabricks, color: "#FF5B4D" },
  ],
  "/business-intelligence": [
    { name: "Looker", icon: SiLooker, color: "#73A7F7" },
    { name: "Metabase", icon: SiMetabase, color: "#70B7EA" },
    { name: "Grafana", icon: SiGrafana, color: "#F79545" },
    { name: "Qlik", icon: SiQlik, color: "#5BC78C" },
    { name: "Superset", icon: SiApachesuperset, color: "#43C6D9" },
    { name: "Google Sheets", icon: SiGooglesheets, color: "#5AC982" },
  ],
  "/data-science": [
    { name: "Jupyter", icon: SiJupyter, color: "#F79955" },
    { name: "Pandas", icon: SiPandas, color: "#E875CE" },
    { name: "NumPy", icon: SiNumpy, color: "#6BA7E8" },
    { name: "SciPy", icon: SiScipy, color: "#9CC5F5" },
    { name: "Plotly", icon: SiPlotly, color: "#B1B9DD" },
    { name: "ECharts", icon: SiApacheecharts, color: "#E2788E" },
  ],
  "/machine-learning": [
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF9A4D" },
    { name: "PyTorch", icon: SiPytorch, color: "#F46F58" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#F5AD5F" },
    { name: "Hugging Face", icon: SiHuggingface, color: "#FFD85B" },
    { name: "OpenAI", icon: SiOpenai, color: "#FFFFFF" },
    { name: "Keras", icon: SiKeras, color: "#F15B64" },
  ],
};

const roleAvatars: Record<string, string> = {
  "Front-End": "/images/build-your-product/team-role-frontend.svg",
  "Back-End": "/images/build-your-product/team-role-backend.svg",
  DevOps: "/images/build-your-product/team-role-devops.svg",
  "Business Analyst":
    "/images/build-your-product/team-role-business-analyst.svg",
  QA: "/images/build-your-product/team-role-qa.svg",
  "Project Manager":
    "/images/build-your-product/team-role-project-manager.svg",
};

export function IncludedTeamSection({
  included,
  linkCapabilities = false,
  topColor = "#061F46",
}: {
  included: IncludedContent;
  linkCapabilities?: boolean;
  topColor?: string;
}) {
  return (
    <section className="relative isolate -mt-px overflow-hidden bg-[#061F46] px-5 pb-24 pt-32 text-white sm:px-8 sm:pb-28 sm:pt-36 md:pb-32 md:pt-40 lg:px-[4vw]">
      <SoftWaveJoin
        body="#061F46"
        id="build-product-included-join"
        top={topColor}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(15,75,146,0.22),transparent_48%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1540px]">
        <SectionHeading
          description={included.description}
          eyebrow="What’s included"
          title={included.title}
        />

        {included.roleTags && (
          <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 xl:mx-0 xl:grid xl:grid-cols-6 xl:gap-5 xl:overflow-visible xl:px-0 xl:pb-0">
            {included.roleTags.map((role) => {
              const avatar = roleAvatars[role];

              return (
                <li
                  className="min-w-[10.5rem] snap-center text-center sm:min-w-[11.5rem] xl:min-w-0"
                  key={role}
                >
                  <div className="relative mx-auto aspect-square w-full max-w-[11rem] overflow-hidden rounded-full bg-[#071A3A] shadow-[0_18px_45px_rgba(0,18,55,0.24)]">
                    {avatar && (
                      <Image
                        alt=""
                        aria-hidden="true"
                        className="scale-[1.22] object-cover"
                        draggable={false}
                        fill
                        sizes="11rem"
                        src={avatar}
                        unoptimized
                      />
                    )}
                  </div>
                  <p className="mt-4 text-base font-semibold leading-tight text-white sm:text-lg">
                    {role}
                  </p>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-16 grid gap-4 sm:mt-20 lg:grid-cols-2">
          {included.capabilities.map((capability) => {
            const tools = toolGroups[capability.href] ?? [];
            const cardClassName = `flex flex-col rounded-[1.5rem] border border-[#9fb2ca]/30 bg-[#071A3A]/88 px-6 py-7 sm:px-8 sm:py-8 xl:px-10 ${
              linkCapabilities
                ? "transition hover:border-[#8cc9ff]/60 hover:bg-[#0A2148] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cc9ff]/80"
                : ""
            }`;
            const cardContent = (
              <>
                <h3 className="text-[clamp(1.35rem,2vw,1.85rem)] font-semibold leading-tight text-white">
                  {capability.title}
                </h3>
                <p className="mt-3 max-w-[34rem] text-base leading-7 text-[#d8e2ef] sm:text-lg sm:leading-8">
                  {capability.description}
                </p>

                <div className="mt-7 grid grid-cols-3 gap-2.5">
                  {tools.map((tool) => {
                    const ToolIcon = tool.icon;

                    return (
                      <div
                        className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-[0.9rem] border border-white/10 bg-white/[0.035] px-2.5 py-3 text-center"
                        key={tool.name}
                      >
                        <ToolIcon
                          aria-hidden="true"
                          className="size-6 sm:size-7"
                          style={{ color: tool.color }}
                        />
                        <span className="text-xs font-medium leading-tight text-white/72">
                          {tool.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            );

            return linkCapabilities ? (
              <Link
                className={cardClassName}
                href={capability.href}
                key={capability.href}
              >
                {cardContent}
              </Link>
            ) : (
              <article
                className={cardClassName}
                key={capability.href}
              >
                {cardContent}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
