import Image from "next/image";
import Link from "next/link";
import noImage from "src/public/no_image.png";
import React from "react";
import { AddTitle } from "src/components/addTitle";

export type Title = {
  id: number;
  user_id: string;
  title: string;
  author: string;
  price: string;
  image_url: string;
};
type TitlesProps = {
  titles: Title[];
  uuid: string;
  getTitleList: VoidFunction;
  filterText: string;
};

export const TitleList = (props: TitlesProps) => {
  // 漫画タイトルのフィルタリング
  const filteredTitle = props.titles.filter((title) => {
    let searchContent = title.title + " " + title.author + " " + title.price;
    return searchContent.toLowerCase().includes(props.filterText.toLowerCase());
  });

  return (
    <div className="grid grid-cols-3 gap-2 m-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
      <AddTitle uuid={props.uuid} getTitleList={props.getTitleList} />
      {filteredTitle.map((title) => {
        return (
          <Link key={title.id} href={`/title?id=${title.id}`} passHref>
            <div className="p-2 border cursor-pointer">
              <div className="flex justify-center">
                {title.image_url ? (
                  <Image
                    src={title.image_url}
                    alt="thumbnail"
                    width={126}
                    height={200}
                  />
                ) : (
                  <Image
                    src={noImage}
                    alt="thumbnail"
                    width={126}
                    height={200}
                  />
                )}
              </div>
              <div className="mt-2 text-center">{title.title}</div>
              <div className="mt-2 text-center">{title.price}円</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
