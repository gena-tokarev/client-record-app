"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

const AuthPageClient = () => {
  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <div className="m-6">
        <Tabs defaultValue="signin" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <Card className="max-w-[450px] flex-[1]">
            <TabsContent value="signin">
              <SignIn />
            </TabsContent>
            <TabsContent value="signup">
              <SignUp />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPageClient;
