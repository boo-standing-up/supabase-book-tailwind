import { Disclosure } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { RingLoader } from "react-spinners";
import { BookList } from "src/components/bookList";
import { Title } from "src/components/titleList";
import { bookData } from "src/pages/api/rakuten";

type Props = {
  title: Title;
  setIsbn: Dispatch<SetStateAction<string>>;
};

export const SearchSubtitle = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>(props.title.title);
  const [bookList, setBookList] = useState<bookData[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 検索実⾏
  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch("/api/rakuten?title=" + text);
    const bookList = await res.json();
    if (bookList) {
      if (bookList.size == 0) {
        alert("Not found the books.");
      } else {
        setBookList(bookList.data);
      }
      setIsLoading(false);
    }
  }, [text]);

  return (
    <div className="mt-4 ml-4">
      <div className="w-full bg-blue-50 rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className="flex justify-between py-2 px-4 w-full text-sm font-medium text-left text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
                ref={buttonRef}
              >
                <span>Search ISBN number by title.</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="p-4 text-base text-gray-500">
                <div className="grid grid-cols-6 gap-2">
                  <input
                    className="col-span-5 p-2 w-full h-10 bg-white rounded border border-gray-300 hover:border-gray-700 shadow appearance-none"
                    value={text}
                    onChange={(e) => {
                      return setText(e.target.value);
                    }}
                  />
                  <div className="col-span-1 w-10 h-10">
                    <SearchIcon
                      className="cursor-pointer"
                      onClick={handleSearch}
                    />
                  </div>
                </div>
                {isLoading ? (
                  <div>
                    <div className="flex justify-center mt-4">
                      <RingLoader color="#aaddff" size={50} />
                    </div>
                    <p className="text-center">Loading...</p>
                  </div>
                ) : (
                  <BookList
                    bookList={bookList}
                    setIsbn={props.setIsbn}
                    close={buttonRef}
                  />
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
