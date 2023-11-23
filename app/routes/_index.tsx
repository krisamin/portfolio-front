import type { MetaFunction } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import styles from "~/index.module.css";
import { getPortfolio } from "~/models/api.server";

import skills from "~/data/skills.json";
import links from "~/data/links.json";

type LoaderData = Awaited<ReturnType<typeof getPortfolio>>;

export const loader = async () => {
  return json<LoaderData>(await getPortfolio());
};

export const meta: MetaFunction = () => {
  return [
    { title: "SeongMin Park • Portfolio" },
    {
      name: "description",
      content: "Beyond Experience, Embark on a Journey of Growth Together.",
    },
    {
      property: "og:title",
      content: "SeongMin Park • Portfolio",
    },
    {
      property: "og:description",
      content: "Beyond Experience, Embark on a Journey of Growth Together.",
    },
    {
      property: "og:url",
      content: "https://portfolio.isamin.kr",
    },
    {
      property: "og:image",
      content: "https://assets.isamin.kr/profile.png",
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
    {
      property: "og:image:width",
      content: "512",
    },
    {
      property: "og:image:height",
      content: "512",
    },
  ];
};

const Index = () => {
  const { projects, awards } = useLoaderData() as LoaderData;

  return (
    <div className={styles.scroll}>
      <div className={styles.container}>
        <div className={styles.top}>
          <p>Portfolio</p>
        </div>
        <div className={styles.window}>
          <div className={styles.side}>
            <div className={styles.mix}>
              <div className={styles.header}>
                <img alt="profile" src="https://assets.isamin.kr/profile.png" />
                <div>
                  <p>Hello, I'm</p>
                  <p>SeongMin Park</p>
                </div>
              </div>
              <div className={styles.section}>
                <p className={styles.title}>Skills</p>
                <div className={styles.icons}>
                  {/* TODO: split component */}
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className={styles.icon}
                      style={{
                        maskImage: `url("/icon/${skill.icon}.svg")`,
                        WebkitMaskImage: `url("/icon/${skill.icon}.svg")`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <p className={styles.title}>Links</p>
              <div className={styles.links}>
                {/* TODO: split component */}
                {links.map((link, index) => (
                  <a
                    key={index}
                    className={styles.link}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer">
                    <div
                      className={styles.icon}
                      style={{
                        maskImage: `url("/icon/${link.icon}.svg")`,
                        WebkitMaskImage: `url("/icon/${link.icon}.svg")`,
                      }}
                    />
                    <p>{link.name}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.inner}>
              <div className={styles.section}>
                <p className={styles.title}>Introduction</p>
                <div className={styles.introduction}>
                  <p className={styles.slogun}>
                    Beyond Experience, Embark on a Journey of Growth Together.
                  </p>
                  <p className={styles.description}>
                    Hello, I am Park Seong Min, a second-year student at KDMHS,
                    currently active as a leader of DIMIGOIN. After awarding 1st
                    prize in KCF Hackathon, I founded a team called "Semicolon".
                    During the Corona period, We participated in civic-hacking
                    by conducting projects such as “Uvirus” and “Mask Finder.”
                    Through this, I gained various experiences and communicated
                    with many people. I want to continue to grow through various
                    experiences in the future.
                  </p>
                </div>
              </div>
              <div className={styles.section}>
                <p className={styles.title}>Projects</p>
                <div className={styles.projects}>
                  {/* TODO: split component */}
                  {projects.map((project) => {
                    return (
                      <a key={project.id} className={styles.project} href={`https://notion.isamin.kr/${project.id.replaceAll("-", "")}`} target="_blank" rel="noreferrer">
                        <div
                          className={styles.preview}
                          style={{
                            backgroundImage: `url(https://assets.isamin.kr/cover/${project.key}.webp)`,
                          }}
                        />
                        <div className={styles.info}>
                          <img
                            className={styles.thumbnail}
                            alt={`${project.key} thumbnail`}
                            src={`https://assets.isamin.kr/project/${project.key}.webp`}
                          />
                          <div className={styles.text}>
                            <p className={styles.name}>{project.name}</p>
                            <p className={styles.description}>
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className={styles.section}>
                <p className={styles.title}>Awards</p>
                <div className={styles.awards}>
                  {/* TODO: split component */}
                  {awards.map((award) => {
                    return (
                      <a key={award.id} className={styles.award} href={`https://notion.isamin.kr/${award.id.replaceAll("-", "")}`} target="_blank" rel="noreferrer">
                        <p className={styles.name}>
                          {award.name} {award.period}
                        </p>
                        <div className={styles.description}>
                          {[
                            [award.teams[0]?.name, award.projects[0]?.name]
                              .filter((v) => v)
                              .join(" - "),
                            award.by,
                            award.date.replace("0000-00-00", ""),
                          ]
                            .filter((v) => v)
                            .map((value, index) => {
                              if (index !== 0) {
                                return (
                                  <div
                                    key={index}
                                    className={styles.description}>
                                    <p className={styles.divider}> / </p>
                                    <p>{value}</p>
                                  </div>
                                );
                              } else {
                                return <p key={index}>{value}</p>;
                              }
                            })}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
