"use client";

import React from "react";
import { Article } from "./Articles";
import Image from "next/image";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <div className="w-[400px] h-[450px] flex flex-col justify-between rounded-lg shadow-md hover:cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className="relative w-full h-[300px]">
        {article.images && (
          <Image
            src={article.images}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        )}
        <div className="absolute top-0 right-0 bg-red-500 text-white px-5 py-1 rounded-bl-lg">
          <p>{article.category.name}</p>
        </div>
      </div>
      <div className="border border-gray-300 rounded-b-lg px-4 py-3 flex-grow flex flex-col justify-between bg-white">
        <div>
          <h1 className="text-4xl font-bold">{article.title}</h1>

          <p className="text-gray-600 text-sm mt-2">
            {article.content.length > 20 ? (
              <>
                {article.content.substring(0, 105)}{" "}
                <span className="text-blue-600">more..</span>
              </>
            ) : (
              article.content
            )}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between mt-4">
          <p className="text-gray-700 text-sm">
            Author: {article.author.username}
          </p>
          <p className=" text-sm text-gray-500 ">
            {article.created_at.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
