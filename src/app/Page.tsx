import React, { PropsWithoutRef, ReactPropTypes } from "react";

interface PageProps {
    children: React.ReactNode;
}

const Page = (props:PageProps) => {
    return <div className="page">{props.children}</div>;
};

export default Page;