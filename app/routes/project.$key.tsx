import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import Markdown from "react-markdown";

import styles from "~/index.module.css";
import { getProject } from "~/models/api.server";

type LoaderData = Awaited<ReturnType<typeof getProject>>;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.key === undefined) throw new Error("key is undefined");
  try {
    const data = await getProject(params.key);
    return json<LoaderData>(data);
  } catch (e) {
    throw new Response(null, {
      status: 404,
      statusText: "project not found",
    });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data === undefined) throw new Error("data is undefined");

  return [
    { title: data.info.name },
    {
      name: "description",
      content: data.info.description,
    },
  ];
};

const Project = () => {
  const { info, content } = useLoaderData() as LoaderData;

  console.log(info, content);

  return (
    <div className={styles.scroll}>
      <p>
        {info.name} : {info.description}
      </p>
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default Project;
