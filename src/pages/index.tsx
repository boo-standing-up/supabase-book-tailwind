import type { NextPage } from "next";
// import Image from "next/image";
import { Auth, Button, IconLogOut } from "@supabase/ui";
import { Title, TitleList } from "src/components/titleList";
import { LayoutWrapper } from "src/components/layoutWrapper";
import { client } from "src/libs/supabaseClient";
import { TopImage } from "src/components/topImage";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { TopFooter } from "src/components/topfooter";

type Props = {
  children: ReactNode;
};

// DBから漫画タイトルを取得
const getTitles = async () => {
  const { data, error } = await client
    .from("book_title")
    .select("*")
    .order("title");
  if (!error && data) {
    return data;
  }
  return [];
};

const Container = (props: Props) => {
  const { user } = Auth.useUser();
  const [text, setText] = useState<string>("");
  const [titles, setTitles] = useState<Title[]>([]);

  // DBから取得した漫画タイトルをセット
  const getTitleList = useCallback(async () => {
    const data = await getTitles();
    setTitles(data);
  }, []);

  useEffect(() => {
    getTitleList();
  }, [user, getTitleList]);

  // ログインしている場合
  if (user) {
    return (
      <div>
        <div className="flex gap-2 justify-center p-4">
          <input
            className="px-4 w-full h-12 bg-white rounded border border-gray-300 hover:border-gray-700 shadow appearance-none"
            placeholder="Filtering text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <TitleList
          titles={titles}
          uuid={user.id}
          getTitleList={getTitleList}
          filterText={text}
        />
        <div className="flex justify-end my-4 mx-2">
          <Button
            size="medium"
            icon={<IconLogOut />}
            onClick={() => client.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }
  // ログインしていない場合
  return (
    <>
      <TopImage />
      {props.children}
      <TopFooter />
    </>
  );
};

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <Auth.UserContextProvider supabaseClient={client}>
        <Container>
          <div className="flex justify-center py-8 ">
            <div className="w-full sm:w-96">
              <Auth
                supabaseClient={client}
                providers={["google", "github"]}
                socialColors={true}
              />
            </div>
          </div>
        </Container>
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};
export default Home;
