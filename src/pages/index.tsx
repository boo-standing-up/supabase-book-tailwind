import type { NextPage } from "next";
// import Image from "next/image";
import { Auth, Button, IconLogOut } from "@supabase/ui";
import type { ReactNode } from "react";
import React from "react";
import { LayoutWrapper } from "../components/layoutWrapper";
import { client } from "../libs/supabaseClient";
import { Header } from "../components/header";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const { user } = Auth.useUser();
  // ログインしている場合
  if (user) {
    return (
      <div>

        <div className="flex justify-center my-4 mx-2">
          <Button
          size="large"
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
  return <>{props.children}</>;
};

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <Header />
      <Auth.UserContextProvider supabaseClient={client}>
        <Container>
          <div className="flex justify-center pt-8 ">
            <div className="w-full sm:w-96">
              <Auth
                supabaseClient={client}
                providers={['google', 'github']} 
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