import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import acceptLanguage from "accept-language-parser";

import styles from "~/index.module.css";
import { getPortfolio } from "~/models/api.server";

import skills from "~/data/skills.json";
import links from "~/data/links.json";
import strings from "~/data/strings.json";

type LoaderData = Awaited<ReturnType<typeof getPortfolio>> & {
  language: "ko" | "en";
};

type Name = "name" | "name_en";
type Description = "description" | "description_en";

export const loader: LoaderFunction = async ({ request }) => {
  const languages = acceptLanguage.parse(
    request.headers.get("Accept-Language") as string,
  );
  const language = languages[0]?.code
    ? languages[0].code === "ko"
      ? "ko"
      : "en"
    : "ko";

  return json<LoaderData>({
    ...(await getPortfolio()),
    language: language,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { language } = data as LoaderData;
  console.log(language);

  return [
    { title: strings.meta_title[language] },
    {
      name: "description",
      content: strings.introduction_title[language],
    },
    {
      property: "og:title",
      content: strings.meta_title[language],
    },
    {
      property: "og:description",
      content: strings.introduction_title[language],
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
  const { projects, awards, language } = useLoaderData() as LoaderData;

  return (
    <div className={styles.scroll}>
      <div className={styles.container}>
        <div className={styles.top}>
          <p>{strings.portfolio[language]}</p>
        </div>
        <div className={styles.window}>
          <div className={styles.side}>
            <div className={styles.mix}>
              <div className={styles.header}>
                <img alt="profile" src="https://assets.isamin.kr/profile.png" />
                <div>
                  <p>{strings.hello[language]}</p>
                  <p>{strings.name[language]}</p>
                </div>
              </div>
              <div className={styles.section}>
                <p className={styles.title}>{strings.skills[language]}</p>
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
              <p className={styles.title}>{strings.links[language]}</p>
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
                <p className={styles.title}>{strings.introduction[language]}</p>
                <div className={styles.introduction}>
                  <p className={styles.slogun}>
                    {strings.introduction_title[language]}
                  </p>
                  <p className={styles.description}>
                    {strings.introduction_content[language]}
                  </p>
                </div>
              </div>
              <div className={styles.section}>
                <p className={styles.title}>{strings.projects[language]}</p>
                <div className={styles.projects}>
                  {/* TODO: split component */}
                  {projects.map((project) => {
                    return (
                      <a
                        key={project.id}
                        className={styles.project}
                        href={`https://notion.isamin.kr/${project.id.replaceAll(
                          "-",
                          "",
                        )}`}
                        target="_blank"
                        rel="noreferrer">
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
                            <p className={styles.name}>
                              {project[strings.key_name[language] as Name]}
                            </p>
                            <p className={styles.description}>
                              {
                                project[
                                  strings.key_description[
                                    language
                                  ] as Description
                                ]
                              }
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className={styles.section}>
                <p className={styles.title}>{strings.awards[language]}</p>
                <div className={styles.awards}>
                  {/* TODO: split component */}
                  {awards.map((award) => {
                    return (
                      <a
                        key={award.id}
                        className={styles.award}
                        href={`https://notion.isamin.kr/${award.id.replaceAll(
                          "-",
                          "",
                        )}`}
                        target="_blank"
                        rel="noreferrer">
                        <p className={styles.name}>
                          {award.name} {award.period}
                        </p>
                        <div className={styles.description}>
                          {[
                            [
                              award.teams[0]?.[
                                strings.key_name[language] as Name
                              ],
                              award.projects[0]?.[
                                strings.key_name[language] as Name
                              ],
                            ]
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
