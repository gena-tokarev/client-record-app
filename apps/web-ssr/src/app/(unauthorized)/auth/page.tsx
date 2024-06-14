import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPageClient = () => {
  return (
    <div className="flex items-center justify-center h-[100%] bg-background">
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
