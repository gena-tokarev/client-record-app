import { FC, PropsWithChildren } from "react";

const UnauthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default UnauthorizedLayout;
