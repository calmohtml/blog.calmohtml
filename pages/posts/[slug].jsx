import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";
import Header from "../../components/Header";
import styled from "styled-components";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

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
          publishedAt: post.publishedAt,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export default function Post({ title, image, body, publishedAt }) {
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
    padding: 2rem 0px;
    gap: 1rem;
  `;

  const Blog = styled.section`
    display: flex;
    padding: 1rem 0px;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--light-blue);
    border: 0.2rem solid var(--white);
    border-radius: 0.4rem;
    box-shadow: rgba(0, 0, 0, 0.9) 6px 6px 0px;
  `;

  const BlogTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;

    h2 {
      color: var(--grey);
      font-size: var(--h2);
      font-family: var(--text);
    }
  `;

  const BlogMedia = styled.div`
    text-align: center;
  `;

  const BlogImage = styled.figure`
    @media (min-width: 320px) and (max-width: 767px) {
      img {
        width: 16.313rem;
      }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      img {
        width: 9.75rem;
      }
    }

    padding: 0 2rem;
    img {
      width: 3.25rem;
    }
  `;

  const BlogContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;

    h2 {
      color: var(--grey);
      font-size: var(--h2);
      font-family: var(--text);
      margin: 1rem 0;
    }

    h3 {
      font-size: var(--h3);
      margin: 1rem 0;
    }

    p {
      font-size: var(--h6);
      margin: 1.25rem 0;
    }

    ul {
      li {
        list-style: inside;
        margin: 0.5rem 0;

        a {
          color: var(--white);
        }
      }
    }

    blockquote {
      background: var(--blue);
      padding: 1rem 0.5rem;
      border-radius: 0.4rem;
    }
  `;

  const BackButton = styled.a`
    display: flex;
    justify-content: center;
    text-decoration: none;
  `;

  return (
    <Fragment>
      <Head>
        <meta name="description" content={`${title} - Joan Segovia`} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - Joan Segovia</title>
      </Head>
      <Header />
      <BlogContainer>
        <Blog>
          <BlogTitle>
            <h2>{title}</h2>
            <p>
              Publicado:{" "}
              {new Date(publishedAt).toLocaleDateString("es-ar", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              .
            </p>
          </BlogTitle>
          {imageUrl && (
            <BlogMedia>
              <BlogImage>
                <Image
                  src={`${imageUrl}`}
                  alt={`Image of ${title}`}
                  width={300}
                  height={300}
                  quality={100}
                  layout="responsive"
                  loading="lazy"
                  objectFit="cover"
                />
              </BlogImage>
            </BlogMedia>
          )}
          <BlogContent>
            <BlockContent blocks={body} />
          </BlogContent>
          <Link passHref href="/posts">
            <BackButton>
              <Button text="Volver a inicio" />
            </BackButton>
          </Link>
        </Blog>
      </BlogContainer>
      <Footer />
    </Fragment>
  );
}
