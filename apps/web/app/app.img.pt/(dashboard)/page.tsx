import CreateProjectButton from "@/ui/projects/create-project-button";
import { MaxWidthWrapper } from "@imgpt/ui";

export default function App() {
  return (
    <>
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <CreateProjectButton />
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <div className="my-10 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3"></div>
      </MaxWidthWrapper>
    </>
  );
}
