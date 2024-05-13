import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed bg-white/50 dark:bg-black/50 top-0 left-0 w-[100%] h-[100%]">
      <Loader2
        size="50"
        className="animate-spin absolute top-1/2 left-1/2 ml-[-25px] mt-[-25px]"
      />
    </div>
  );
};

export default Loading;
