"use client";

import { baseUrl } from "@/constants/BaseUrl";
import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

export interface authorProps {
  id: number;
  username: string;
}

export interface categoryProps {
  description: string;
  id: number;
  name: string;
}

export interface Article {
  author: authorProps;
  category: categoryProps;
  content: string;
  created_at: string;
  id: number;
  title: string;
  updated_at: string;
  images: string;
}

const Articles = () => {
  const [article, setArticle] = useState<Array<Article> | []>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${baseUrl}/article/get/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setArticle(data.message);
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <div className="px-5 py-5 flex gap-10 flex-wrap">
        {article.map((a, index) => (
          <ArticleCard article={a} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
