import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Button, IconEdit, IconSave, IconTrash2, IconX } from "@supabase/ui";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import { Title } from "src/components/titleList";
import { client } from "src/libs/supabaseClient";

type Props = {
  title: Title;
  getSubtitleList: VoidFunction;
};
export const EditTitle = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.title.title);
  const [author, setAuthor] = useState<string>(props.title.author);

  const router = useRouter();

  // ダイアログを開く
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  // ダイアログを閉じる
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 修正内容の保存
  const handleSave = useCallback(async () => {
    if (title == "") {
      alert("Input title.");
      return;
    }
    const { error } = await client.from("book_title").upsert([
      {
        id: props.title.id,
        user_id: props.title.user_id,
        title: title,
        author: author,
        image_url: props.title.image_url,
      },
    ]);
    if (error) {
      alert(error);
    } else {
      props.getSubtitleList();
      closeModal();
    }
  }, [title, props, author, closeModal]);

  // 漫画タイトルの削除
  const handleRemove = useCallback(async () => {
    let { error } = await client
      .from("book_subtitle")
      .delete()
      .eq("title_id", props.title.id);
    if (error) {
      alert(error);
    }
    ({ error } = await client
      .from("book_title")
      .delete()
      .eq("id", props.title.id));
    if (error) {
      alert(error);
    }
    router.push("/");
  }, [props, router]);
  return (
    <>
      <Button block size="medium" icon={<IconEdit />} onClick={openModal}>
        EDIT
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10"
          onClose={closeModal}
        >
          <div className="px-4 min-h-screen text-center border-2">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block overflow-hidden p-6 my-8 w-full max-w-md text-left align-middle bg-gray-50 rounded-xl border border-gray-300 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-center text-gray-900"
                >
                  Add Title
                </Dialog.Title>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">Title</div>
                  <input
                    className="col-span-3 p-2 w-full h-10 bg-white rounded border border-gray-300 hover:border-gray-700 shadow appearance-none"
                    value={title}
                    onChange={(e) => {
                      return setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">Author</div>
                  <input
                    className="col-span-3 p-2 w-full h-10 bg-white rounded border border-gray-300 hover:border-gray-700 shadow appearance-none"
                    value={author}
                    onChange={(e) => {
                      return setAuthor(e.target.value);
                    }}
                  />
                </div>
                <div className="mx-4 mt-4 bg-blue-50">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between py-2 px-4 w-full text-sm font-medium text-left text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-blue-500">
                          <span>REMOVE THIS</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "transform rotate-180" : ""
                            } w-5 h-5 text-blue-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-4 text-base text-gray-500">
                          <Button
                            block
                            onClick={handleRemove}
                            icon={<IconTrash2 />}
                          >
                            REMOVE
                          </Button>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="p-2 w-32">
                    <Button
                      block
                      type="default"
                      size="large"
                      icon={<IconX />}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="p-2 w-32">
                    <Button
                      block
                      size="large"
                      icon={<IconSave />}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
