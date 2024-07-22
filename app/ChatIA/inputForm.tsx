import { Loader2, Plus, Send } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import SelectedImages from "./selectedImages";
import { ChatRequestOptions } from "ai";


type Props = {
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
};

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop,
}: Props) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageSelection = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;
    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      imagePromises.push(
        new Promise<string>((resolve, reject) => {
          reader.onload = (e) => {
            const base64String = e.target?.result?.toString();
            resolve(base64String as string);
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
      );
    }

    try {
      const base64Strings = await Promise.all(imagePromises);
      setImages((prevImages: string[]) => {
        const updatedImages: string[] = [...prevImages, ...(base64Strings as string[])];
        return updatedImages;
      });
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event, {
          data: {
            images: JSON.stringify(images),
          },
        });
      }}
      className="w-full flex flex-col gap-2 md:flex-row items-stretch md:items-center mt-5"
    >
      <div className="relative flex items-center w-full">
        <input
          type="text"
          placeholder={isLoading ? "Criando sua Resposta ..." : "Faça sua Pergunta ..."}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="border-b border-gray-300 outline-none flex-1 py-2 pr-3 text-[#111827] placeholder:text-[#233150] focus:placeholder-transparent disabled:bg-transparent"
        />
        <Plus
          onClick={() => document.getElementById("fileInput")?.click()} // Click event handler
          className="absolute right-0 mr-2 cursor-pointer p-3 h-10 w-10 text-black"
        />
      </div>
      <input
        className="hidden"
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageSelection}
      />
      <button
        type="submit"
        className="rounded-full shadow-md border flex items-center justify-center mt-2 md:mt-0"
      >
        {isLoading ? (
          <Loader2
            onClick={stop}
            className="p-3 h-10 w-10 stroke-stone-800 animate-spin"
          />
        ) : (
          <Send className=" p-3 h-10 w-10 stroke-stone-900" />
        )}
      </button>
    </form>
  );
};

export default InputForm;
