import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";
import Header from "../../components/Header";
import styled from "styled-components";
import Button from "../../components/Button";

export const getServerSideProps = async (pageContext) => {
  // pageContext = the slug is the keyword for fetching in Sanity.

  const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const pageSlug = pageContext.query.slug;
  // The pageContext.query.slug === the slug of the Sanity.io blog.

  if (!pageSlug) {
    return {
      notFound: true,
      // redirects to Next.js's 404 page if the slug is incorrect.
    };
  }

  const query = encodeURIComponent(
    // This is GROQ language, similar to GraphQL.
    `*[ _type == "post" && slug.current == "${pageSlug}"]`
  );

  const url = `https://${projectID}.api.sanity.io/v1/data/query/${dataset}?query=${query}`;
  // The URL where the content of Sanity.io is.

  try {
    const response = await fetch(url);
    const result = await response.json();
    const post = result.result[0];
    // The property is called result.

    if (!post) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: {
          title: post.title,
          image: post.mainImage,
          body: post.body,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export default function Post({ title, image, body }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imgCreator = imageUrlBuilder({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    });

    setImageUrl(imgCreator.image(image));
  }, [image]);
  // This is needed in order to create a URL for the image, and then displaying it in the component.
  // imageUrlBuilder it's a component from Sanity.

  const BlogContainer = styled.main`
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    background-color: var(--light-blue);
    border-radius: 0.4rem;
    box-shadow: rgba(0, 0, 0, 0.9) 6px 6px 0px;
    border: 0.2rem solid var(--white);
    justify-content: space-between;
    display: flex;
  `;

  return (
    <Fragment>
      <Head>
        <title>Joan Segovia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <BlogContainer>
        <section>
          <h2>{title}</h2>
          {imageUrl && (
            <Image
              src={`${imageUrl}`}
              alt={`Image of ${title}`}
              width={100}
              height={100}
              quality={100}
              layout="responsive"
              loading="lazy"
            />
          )}
        </section>
        <section>
          <BlockContent blocks={body} />
        </section>
      </BlogContainer>
      <Link passHref href="/posts">
        <a>
          <Button text="Volver" />
        </a>
      </Link>
    </Fragment>
  );
}