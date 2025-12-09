import Image from "next/image";

export default function ProjectCard({
  title,
  description,
  image,
  className,
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
}) {
  return (
    <div
      className={`relative group/card bg-secondary-100 max-w-[320px] h-[300px] min-h-[250px] min-w-[250px] w-full rounded-2xl flex items-end overflow-hidden transition-all duration-400 cursor-navigation
        ${className}`}
    >
      <Image
        src={"/images/person.png"}
        alt="Person"
        width={320}
        height={320}
        className="w-full h-full object-cover rounded-2xl absolute top-0 left-0 z"
      />
      <div className="flex flex-col z-10 gap-1 p-4 transition-all duration-400 translate-y-[200px] group-hover/card:translate-y-0">
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <p className="text-sm text-white">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 rounded-2xl w-full h-full bg-black opacity-0 group-hover/card:opacity-10 transition-all duration-300" />
    </div>
  );
}
