import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({ title, description, image = "/empty.svg" }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <Image src={image} alt="Empty" width={240} height={240}/>
      <div className="flex flex-col gap-y-2 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium pt-2">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
