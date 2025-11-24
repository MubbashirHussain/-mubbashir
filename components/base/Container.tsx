import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
}

// temp

const Container: React.FC<ContainerProps> = (props) => {
  const { children, className, style, innerStyle, innerClassName } = props;
  return (
    <section
      style={style}
      className={`w-full bg-background flex justify-center items-center ${className}`}
    >
      <div
        style={innerStyle}
        className={`w-full max-w-[1440px] px-3 relative ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Container;